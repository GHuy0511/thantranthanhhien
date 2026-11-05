/**
 * ========================================================
 * COUPLE NETWORK - HỆ THỐNG ĐỒNG BỘ TRỰC TUYẾN P2P ĐA LỚP CHO HAI NGƯỜI
 * - Nhận diện vai trò tự động qua URL: ?role=hien / ?role=huy
 * - Mời người yêu 1 chạm (Copy Link / Share Zalo, Messenger): ?role=hien&game=...&room=...
 * - Đồng bộ Đa Tầng Siêu Mạnh (Triple-Layer Resilient Network):
 *    1. BroadcastChannel: Đồng bộ tức thì 0ms giữa 2 tab cùng trình duyệt/máy.
 *    2. WebRTC P2P (PeerJS): Kết nối ngang hàng trực tiếp qua Google STUN & OpenRelay TURN.
 *    3. Cloud WebSocket Relay (MQTT 3.1.1 over WSS): Dự phòng thời gian thực, đảm bảo
 *       xuyên thủng 100% Symmetric NAT trên 4G Viettel, Vinaphone, MobiFone và mọi Wi-Fi!
 * - Hỗ trợ toàn diện 3 game: Cờ Tỷ Phú, Block Blast, Cờ Caro.
 * ========================================================
 */

window.CoupleNetwork = (function () {
    'use strict';

    // 1. Phân tích URL Parameters khi mở web
    const urlParams = new URLSearchParams(window.location.search);
    const paramRole = urlParams.get('role');
    const paramRoom = urlParams.get('room');
    const paramGame = urlParams.get('game');

    const DEFAULT_ROOM = 'thantranthanhhien';
    const roomId = paramRoom && paramRoom.trim() ? paramRoom.trim().toLowerCase() : DEFAULT_ROOM;

    // Thiết lập vai trò ban đầu từ URL hoặc localStorage
    let myRole = 'huy';
    if (paramRole === 'hien' || paramRole === 'huy') {
        myRole = paramRole;
        try { localStorage.setItem('couple_user_role', myRole); } catch (e) {}
    } else {
        try {
            const saved = localStorage.getItem('couple_user_role');
            if (saved === 'hien' || saved === 'huy') myRole = saved;
        } catch (e) {}
    }

    const PEER_PREFIX = `love_${roomId}_`;
    const HEARTBEAT_INTERVAL = 2500;
    const OFFLINE_TIMEOUT = 6500;

    const ICE_SERVERS = [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
        { urls: 'stun:global.stun.twilio.com:3478' },
        // OpenRelay Free Public TURN Servers (Metered)
        { urls: 'turn:openrelay.metered.ca:80', username: 'openrelay', credential: 'openrelay' },
        { urls: 'turn:openrelay.metered.ca:443', username: 'openrelay', credential: 'openrelay' },
        { urls: 'turn:openrelay.metered.ca:443?transport=tcp', username: 'openrelay', credential: 'openrelay' }
    ];

    let peer = null;
    let peerConn = null;
    let broadcastChan = null;
    let wsRelay = null;
    let partnerOnline = false;
    let lastPartnerHeartbeat = 0;
    let heartbeatTimer = null;
    let checkOfflineTimer = null;
    let wsReconnectTimer = null;
    const listeners = [];
    const recentPacketIds = new Set();

    function init() {
        initBroadcastChannel();
        initCloudRelay();
        initPeerJS();
        startHeartbeat();
        updatePresenceUI();
        setupInviteButton();

        // Tự động chuyển tab game nếu có ?game=...
        if (paramGame) {
            setTimeout(() => {
                const tabBtn = document.querySelector(`.game-nav-tab[data-game="${paramGame}"]`);
                if (tabBtn) tabBtn.click();
            }, 300);
        }
    }

    // ========================================================
    // TẦNG 1: BROADCAST CHANNEL (CÙNG MÁY / 2 TAB)
    // ========================================================
    function initBroadcastChannel() {
        if ('BroadcastChannel' in window) {
            try {
                broadcastChan = new BroadcastChannel(`couple_channel_${roomId}`);
                broadcastChan.onmessage = (event) => {
                    handleIncomingPacket(event.data, 'broadcast');
                };
            } catch (e) {
                console.warn('BroadcastChannel error:', e);
            }
        }
    }

    // ========================================================
    // TẦNG 2: CLOUD WEBSOCKET RELAY (MQTT 3.1.1 QUA WSS)
    // Dự phòng tức thì khi 2 máy ở xa, xuyên qua 100% NAT 4G
    // ========================================================
    function initCloudRelay() {
        if (wsRelay && wsRelay.readyState === WebSocket.OPEN) return;
        try {
            const brokerUrl = "wss://broker.emqx.io:8084/mqtt";
            wsRelay = new WebSocket(brokerUrl, ["mqtt"]);
            wsRelay.binaryType = "arraybuffer";

            const clientId = `agy_${roomId}_${myRole}_${Math.random().toString(36).substr(2, 6)}`;
            const topic = `love/${roomId}/p2p`;

            wsRelay.onopen = () => {
                wsRelay.send(mqttConnectPacket(clientId));
            };

            wsRelay.onmessage = (e) => {
                const data = new Uint8Array(e.data);
                const type = data[0] >> 4;
                if (type === 2) { // CONNACK
                    wsRelay.send(mqttSubscribePacket(topic));
                } else if (type === 3) { // PUBLISH
                    let offset = 1;
                    while (data[offset] & 128) offset++;
                    offset++;
                    const topicLen = (data[offset] << 8) | data[offset + 1];
                    offset += 2 + topicLen;
                    const payloadBytes = data.slice(offset);
                    const msgStr = new TextDecoder().decode(payloadBytes);
                    try {
                        const packet = JSON.parse(msgStr);
                        handleIncomingPacket(packet, 'cloud_relay');
                    } catch (err) {}
                }
            };

            wsRelay.onclose = () => {
                scheduleWsReconnect();
            };

            wsRelay.onerror = () => {
                try { wsRelay.close(); } catch (e) {}
            };
        } catch (e) {
            scheduleWsReconnect();
        }
    }

    function scheduleWsReconnect() {
        if (wsReconnectTimer) clearTimeout(wsReconnectTimer);
        wsReconnectTimer = setTimeout(() => {
            initCloudRelay();
        }, 5000);
    }

    // Mini MQTT Packet Helpers (Pure JS, zero library dependency)
    function mqttEncodeRemLen(len) {
        const bytes = [];
        do {
            let enc = len % 128;
            len = Math.floor(len / 128);
            if (len > 0) enc |= 128;
            bytes.push(enc);
        } while (len > 0);
        return bytes;
    }

    function mqttConnectPacket(clientId) {
        const proto = [0x00, 0x04, 0x4d, 0x51, 0x54, 0x54, 0x04, 0x02, 0x00, 0x3c]; // MQTT 3.1.1, CleanSession, 60s
        const idBytes = new TextEncoder().encode(clientId);
        const payload = [idBytes.length >> 8, idBytes.length & 0xff, ...idBytes];
        const body = [...proto, ...payload];
        return new Uint8Array([0x10, ...mqttEncodeRemLen(body.length), ...body]);
    }

    function mqttSubscribePacket(topic) {
        const tBytes = new TextEncoder().encode(topic);
        const body = [0x00, 0x01, tBytes.length >> 8, tBytes.length & 0xff, ...tBytes, 0x00];
        return new Uint8Array([0x82, ...mqttEncodeRemLen(body.length), ...body]);
    }

    function mqttPublishPacket(topic, payloadStr) {
        const tBytes = new TextEncoder().encode(topic);
        const mBytes = new TextEncoder().encode(payloadStr);
        const body = [tBytes.length >> 8, tBytes.length & 0xff, ...tBytes, ...mBytes];
        return new Uint8Array([0x30, ...mqttEncodeRemLen(body.length), ...body]);
    }

    // ========================================================
    // TẦNG 3: WEBRTC P2P NGANG HÀNG TRỰC TIẾP (PEERJS)
    // ========================================================
    function initPeerJS() {
        if (typeof window.Peer === 'undefined') {
            console.warn('PeerJS chưa nạp, sử dụng Cloud Relay và BroadcastChannel');
            return;
        }

        const myPeerId = `${PEER_PREFIX}${myRole}`;
        const partnerPeerId = `${PEER_PREFIX}${getPartnerRole()}`;

        try {
            peer = new window.Peer(myPeerId, {
                debug: 0,
                config: { iceServers: ICE_SERVERS }
            });

            peer.on('open', (id) => {
                tryConnectPartner(partnerPeerId);
            });

            peer.on('connection', (conn) => {
                setupConnection(conn);
            });

            peer.on('error', (err) => {
                if (err.type === 'unavailable-id') {
                    // ID đang bận, sẽ tự động kết nối qua Cloud Relay
                }
            });
        } catch (e) {
            console.warn('PeerJS error:', e);
        }
    }

    function tryConnectPartner(targetId) {
        if (!peer || peer.destroyed) return;
        if (peerConn && peerConn.open) return;

        try {
            const conn = peer.connect(targetId, { reliable: true });
            setupConnection(conn);
        } catch (e) {}
    }

    function setupConnection(conn) {
        peerConn = conn;

        conn.on('open', () => {
            sendPacket({ type: 'heartbeat', from: myRole, timestamp: Date.now() });
        });

        conn.on('data', (data) => {
            handleIncomingPacket(data, 'webrtc');
        });

        conn.on('close', () => { peerConn = null; });
        conn.on('error', () => { peerConn = null; });
    }

    // ========================================================
    // QUẢN LÝ GÓI TIN & KHỬ TRÙNG LẶP (DEDUPLICATION)
    // ========================================================
    function handleIncomingPacket(packet, source) {
        if (!packet || typeof packet !== 'object') return;
        if (packet.from === myRole) return; // Bỏ qua gói tin do chính vai mình phát

        // Khử trùng lặp qua ID gói tin (do nhận đồng thời từ cả WebRTC và Cloud Relay)
        const packetId = packet._id || `${packet.type}_${packet.timestamp}_${packet.from}`;
        if (recentPacketIds.has(packetId)) return;
        recentPacketIds.add(packetId);
        if (recentPacketIds.size > 200) {
            const first = recentPacketIds.values().next().value;
            recentPacketIds.delete(first);
        }

        if (packet.type === 'heartbeat') {
            lastPartnerHeartbeat = Date.now();
            if (!partnerOnline) {
                partnerOnline = true;
                updatePresenceUI();
                showPartnerToast(`🎉 Người yêu (${getPartnerName()}) đã vào phòng!`);
                notifyListeners({ type: 'presence_change', partnerRole: getPartnerRole(), online: true });
            }
            return;
        }

        notifyListeners(packet);
    }

    function sendPacket(data) {
        if (!data || typeof data !== 'object') return;
        data.from = myRole;
        data.timestamp = Date.now();
        data._id = `${data.type}_${data.timestamp}_${Math.random().toString(36).substr(2, 5)}`;

        // 1. Gửi qua BroadcastChannel (cho tab cùng máy)
        if (broadcastChan) {
            try { broadcastChan.postMessage(data); } catch (e) {}
        }

        // 2. Gửi qua WebRTC P2P (trực tiếp nếu kết nối mở)
        if (peerConn && peerConn.open) {
            try { peerConn.send(data); } catch (e) {}
        }

        // 3. Gửi qua Cloud WebSocket Relay (dự phòng mọi lúc)
        if (wsRelay && wsRelay.readyState === WebSocket.OPEN) {
            try {
                const topic = `love/${roomId}/p2p`;
                wsRelay.send(mqttPublishPacket(topic, JSON.stringify(data)));
            } catch (e) {}
        }
    }

    // ========================================================
    // HEARTBEAT & PHÁT HIỆN ONLINE/OFFLINE
    // ========================================================
    function startHeartbeat() {
        if (heartbeatTimer) clearInterval(heartbeatTimer);
        heartbeatTimer = setInterval(() => {
            sendPacket({ type: 'heartbeat', from: myRole, timestamp: Date.now() });

            // Thử kết nối WebRTC nếu chưa thông
            if (peer && (!peerConn || !peerConn.open)) {
                tryConnectPartner(`${PEER_PREFIX}${getPartnerRole()}`);
            }
        }, HEARTBEAT_INTERVAL);

        if (checkOfflineTimer) clearInterval(checkOfflineTimer);
        checkOfflineTimer = setInterval(() => {
            const now = Date.now();
            if (partnerOnline && (now - lastPartnerHeartbeat > OFFLINE_TIMEOUT)) {
                partnerOnline = false;
                updatePresenceUI();
                showPartnerToast(`⚠️ ${getPartnerName()} tạm ngắt kết nối`);
                notifyListeners({ type: 'presence_change', partnerRole: getPartnerRole(), online: false });
            }
        }, 1500);
    }

    // ========================================================
    // TÍNH NĂNG MỜI NGƯỜI YÊU (SHARE LINK 1-CHẠM)
    // ========================================================
    function getInviteLink(targetRole, gameId) {
        const url = new URL(window.location.href);
        url.searchParams.set('role', targetRole || getPartnerRole());
        url.searchParams.set('room', roomId);
        if (gameId) url.searchParams.set('game', gameId);
        return url.toString();
    }

    function copyInviteLink(customGame) {
        const partnerName = getPartnerName();
        const activeGame = customGame || getCurrentActiveGame();
        const link = getInviteLink(getPartnerRole(), activeGame);

        if (navigator.share) {
            navigator.share({
                title: 'Chơi game cùng người yêu 💕',
                text: `Cùng chơi ${getGameTitle(activeGame)} với mình nhé!`,
                url: link
            }).catch(() => fallbackCopy(link, partnerName));
        } else {
            fallbackCopy(link, partnerName);
        }
    }

    function fallbackCopy(link, partnerName) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(link).then(() => {
                showPartnerToast(`💌 Đã sao chép link mời ${partnerName}! Gửi qua Zalo/Messenger nhé 💕`);
            }).catch(() => promptCopy(link));
        } else {
            promptCopy(link);
        }
    }

    function promptCopy(link) {
        window.prompt('Sao chép đường link này và gửi cho người yêu nhé:', link);
    }

    function getCurrentActiveGame() {
        const activeTab = document.querySelector('.game-nav-tab.active');
        return activeTab ? (activeTab.getAttribute('data-game') || 'monopoly') : 'monopoly';
    }

    function getGameTitle(gameKey) {
        if (gameKey === 'caro') return 'Cờ Caro';
        if (gameKey === 'blockblast') return 'Block Blast';
        return 'Cờ Tỷ Phú';
    }

    function setupInviteButton() {
        const btnInvite = document.getElementById('btnInvitePartner');
        if (btnInvite) {
            btnInvite.addEventListener('click', () => {
                copyInviteLink();
            });
        }
    }

    function showPartnerToast(msg) {
        let toast = document.getElementById('networkToastNotice');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'networkToastNotice';
            toast.className = 'network-toast-notice';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }

    // ========================================================
    // QUẢN LÝ VAI TRÒ (ROLE)
    // ========================================================
    function getMyRole() { return myRole; }
    function getPartnerRole() { return myRole === 'huy' ? 'hien' : 'huy'; }
    function getPartnerName() { return myRole === 'huy' ? 'Hiền ✈️' : 'Huy 🚗'; }

    function setMyRole(role) {
        if (role !== 'huy' && role !== 'hien') return;
        if (myRole === role) return;

        myRole = role;
        try { localStorage.setItem('couple_user_role', myRole); } catch (e) {}

        if (peerConn) { peerConn.close(); peerConn = null; }
        if (peer) { peer.destroy(); peer = null; }

        partnerOnline = false;
        lastPartnerHeartbeat = 0;

        initPeerJS();
        updatePresenceUI();
        notifyListeners({ type: 'my_role_changed', newRole: myRole });
    }

    function toggleRole() {
        setMyRole(myRole === 'huy' ? 'hien' : 'huy');
    }

    function updatePresenceUI() {
        const dotHuy = document.getElementById('dotHuy');
        const dotHien = document.getElementById('dotHien');
        const labelHuy = document.getElementById('labelHuy');
        const labelHien = document.getElementById('labelHien');
        const myRoleLabel = document.getElementById('myRoleLabel');
        const badgeHuy = document.getElementById('presenceBadgeHuy');
        const badgeHien = document.getElementById('presenceBadgeHien');
        const btnInvite = document.getElementById('btnInvitePartner');

        const isHuyOn = myRole === 'huy' ? true : partnerOnline;
        const isHienOn = myRole === 'hien' ? true : partnerOnline;

        if (dotHuy) dotHuy.className = `status-indicator-dot ${isHuyOn ? 'on' : 'off'}`;
        if (dotHien) dotHien.className = `status-indicator-dot ${isHienOn ? 'on' : 'off'}`;

        if (labelHuy) labelHuy.textContent = isHuyOn ? 'Online' : 'Offline';
        if (labelHien) labelHien.textContent = isHienOn ? 'Online' : 'Offline';

        if (badgeHuy) badgeHuy.classList.toggle('is-me', myRole === 'huy');
        if (badgeHien) badgeHien.classList.toggle('is-me', myRole === 'hien');

        if (myRoleLabel) {
            myRoleLabel.textContent = myRole === 'huy' ? 'Tôi: Huy 🚗' : 'Tôi: Hiền ✈️';
        }

        if (btnInvite) {
            btnInvite.innerHTML = `💌 Mời ${getPartnerName()}`;
            btnInvite.title = `Sao chép link mời ${getPartnerName()} cùng chơi`;
        }
    }

    function onMessage(cb) {
        if (typeof cb === 'function') listeners.push(cb);
    }

    function notifyListeners(packet) {
        listeners.forEach(cb => {
            try { cb(packet); } catch (e) { console.error('Listener error:', e); }
        });
    }

    function isPartnerOnline() {
        return partnerOnline;
    }

    return {
        init,
        getMyRole,
        getPartnerRole,
        getPartnerName,
        setMyRole,
        toggleRole,
        send: sendPacket,
        onMessage,
        isPartnerOnline,
        updatePresenceUI,
        copyInviteLink,
        getInviteLink,
        showToast: showPartnerToast
    };
})();
