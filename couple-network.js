/**
 * ========================================================
 * COUPLE NETWORK - HỆ THỐNG ĐỒNG BỘ TRỰC TUYẾN P2P CHO HAI NGƯỜI
 * - Nhận diện vai trò: Huy 🚗 vs Hiền ✈️
 * - Trạng thái Online / Offline thời gian thực (Chấm xanh 🟢 / Chấm đỏ 🔴)
 * - Tự động kết nối ngang hàng (WebRTC P2P qua PeerJS + BroadcastChannel cho 2 tab)
 * - Đồng bộ hóa nước đi, bàn chơi và đối kháng thời gian thực
 * ========================================================
 */

window.CoupleNetwork = (function () {
    'use strict';

    const PEER_PREFIX = 'thantranthanhhien-room-';
    const HEARTBEAT_INTERVAL = 2500;
    const OFFLINE_TIMEOUT = 6000;

    let myRole = localStorage.getItem('couple_user_role') || 'huy'; // 'huy' hoặc 'hien'
    let peer = null;
    let peerConn = null;
    let broadcastChan = null;
    let partnerOnline = false;
    let lastPartnerHeartbeat = 0;
    let heartbeatTimer = null;
    let checkOfflineTimer = null;
    const listeners = [];

    function init() {
        initBroadcastChannel();
        initPeerJS();
        startHeartbeat();
        updatePresenceUI();
    }

    // 1. KÊNH BROADCAST (Đồng bộ tức thì 0ms giữa 2 tab trên cùng trình duyệt/máy tính)
    function initBroadcastChannel() {
        if ('BroadcastChannel' in window) {
            try {
                broadcastChan = new BroadcastChannel('couple_game_channel');
                broadcastChan.onmessage = (event) => {
                    handleIncomingPacket(event.data);
                };
            } catch (e) {
                console.warn('BroadcastChannel error:', e);
            }
        }
    }

    // 2. KẾT NỐI P2P WEBRTC QUA PEERJS (Đồng bộ giữa 2 điện thoại / thiết bị khác nhau qua Internet)
    function initPeerJS() {
        if (typeof window.Peer === 'undefined') {
            console.warn('PeerJS chưa được tải, sử dụng chế độ BroadcastChannel cục bộ');
            return;
        }

        const myPeerId = `${PEER_PREFIX}${myRole}`;
        const partnerPeerId = `${PEER_PREFIX}${getPartnerRole()}`;

        try {
            peer = new window.Peer(myPeerId, {
                debug: 0,
                config: {
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:global.stun.twilio.com:3478' }
                    ]
                }
            });

            peer.on('open', (id) => {
                // Thử kết nối tới người yêu
                tryConnectPartner(partnerPeerId);
            });

            // Khi người yêu chủ động kết nối tới
            peer.on('connection', (conn) => {
                setupConnection(conn);
            });

            peer.on('error', (err) => {
                if (err.type === 'unavailable-id') {
                    // ID đã tồn tại (có thể tab khác đang dùng vai trò này)
                } else if (err.type === 'peer-unavailable') {
                    // Người yêu chưa online trên PeerJS, sẽ tự thử lại định kỳ
                }
            });
        } catch (e) {
            console.warn('PeerJS initialization error:', e);
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
            handleIncomingPacket(data);
        });

        conn.on('close', () => {
            peerConn = null;
        });

        conn.on('error', () => {
            peerConn = null;
        });
    }

    // 3. HEARTBEAT VÀ KIỂM TRA ONLINE/OFFLINE
    function startHeartbeat() {
        if (heartbeatTimer) clearInterval(heartbeatTimer);
        heartbeatTimer = setInterval(() => {
            sendPacket({ type: 'heartbeat', from: myRole, timestamp: Date.now() });

            // Thử kết nối lại nếu chưa có peerConn
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
                notifyListeners({ type: 'presence_change', partnerRole: getPartnerRole(), online: false });
            }
        }, 1500);
    }

    // 4. XỬ LÝ GÓI TIN ĐẾN
    function handleIncomingPacket(packet) {
        if (!packet || typeof packet !== 'object') return;

        // Bỏ qua gói tin do chính vai của mình gửi ra (nếu dội lại qua broadcast)
        if (packet.from === myRole) return;

        if (packet.type === 'heartbeat') {
            lastPartnerHeartbeat = Date.now();
            if (!partnerOnline) {
                partnerOnline = true;
                updatePresenceUI();
                notifyListeners({ type: 'presence_change', partnerRole: getPartnerRole(), online: true });
            }
            return;
        }

        // Chuyển tiếp các sự kiện game đến các listener
        notifyListeners(packet);
    }

    // 5. GỬI GÓI TIN CHO ĐỐI PHƯƠNG (QUA CẢ WEBRTC VÀ BROADCAST)
    function sendPacket(data) {
        if (!data || typeof data !== 'object') return;
        data.from = myRole;

        // Gửi qua BroadcastChannel
        if (broadcastChan) {
            try {
                broadcastChan.postMessage(data);
            } catch (e) {}
        }

        // Gửi qua WebRTC P2P
        if (peerConn && peerConn.open) {
            try {
                peerConn.send(data);
            } catch (e) {}
        }
    }

    // 6. QUẢN LÝ VAI TRÒ (ROLE)
    function getMyRole() {
        return myRole;
    }

    function getPartnerRole() {
        return myRole === 'huy' ? 'hien' : 'huy';
    }

    function setMyRole(role) {
        if (role !== 'huy' && role !== 'hien') return;
        if (myRole === role) return;

        myRole = role;
        localStorage.setItem('couple_user_role', myRole);

        // Đóng kết nối cũ và tái khởi tạo
        if (peerConn) {
            peerConn.close();
            peerConn = null;
        }
        if (peer) {
            peer.destroy();
            peer = null;
        }

        partnerOnline = false;
        lastPartnerHeartbeat = 0;

        initPeerJS();
        updatePresenceUI();
        notifyListeners({ type: 'my_role_changed', newRole: myRole });
    }

    function toggleRole() {
        setMyRole(myRole === 'huy' ? 'hien' : 'huy');
    }

    // 7. CẬP NHẬT GIAO DIỆN CHẤM XANH/ĐỎ (PRESENCE UI)
    function updatePresenceUI() {
        const dotHuy = document.getElementById('dotHuy');
        const dotHien = document.getElementById('dotHien');
        const labelHuy = document.getElementById('labelHuy');
        const labelHien = document.getElementById('labelHien');
        const myRoleLabel = document.getElementById('myRoleLabel');
        const badgeHuy = document.getElementById('presenceBadgeHuy');
        const badgeHien = document.getElementById('presenceBadgeHien');

        const isHuyOn = myRole === 'huy' ? true : partnerOnline;
        const isHienOn = myRole === 'hien' ? true : partnerOnline;

        if (dotHuy) {
            dotHuy.className = `status-indicator-dot ${isHuyOn ? 'on' : 'off'}`;
        }
        if (dotHien) {
            dotHien.className = `status-indicator-dot ${isHienOn ? 'on' : 'off'}`;
        }

        if (labelHuy) {
            labelHuy.textContent = isHuyOn ? 'Online' : 'Offline';
        }
        if (labelHien) {
            labelHien.textContent = isHienOn ? 'Online' : 'Offline';
        }

        if (badgeHuy) badgeHuy.classList.toggle('is-me', myRole === 'huy');
        if (badgeHien) badgeHien.classList.toggle('is-me', myRole === 'hien');

        if (myRoleLabel) {
            myRoleLabel.textContent = myRole === 'huy' ? 'Tôi: Huy 🚗' : 'Tôi: Hiền ✈️';
        }
    }

    // 8. ĐĂNG KÝ VÀ PHÂN PHỐI SỰ KIỆN GAME
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
        setMyRole,
        toggleRole,
        send: sendPacket,
        onMessage,
        isPartnerOnline,
        updatePresenceUI
    };
})();
