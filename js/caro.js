/**
 * ========================================================
 * CỜ CARO (GOMOKU 15x15) CHO CẶP ĐÔI HUY & HIỀN
 * - Chế độ 1: ⚔️ Đấu P2P Trực Tuyến với Người Yêu (2 máy xa nhau)
 * - Chế độ 2: 🤖 Đấu với AI Thông Minh (Dễ / Vừa / Khó)
 * - Chế độ 3: 👥 Đấu 2 Người Trên Cùng 1 Máy (Pass & Play)
 * - Bàn cờ 15x15 chuẩn quốc tế, tọa độ A-O & 1-15, điểm sao Tengen
 * - Âm thanh gõ cờ Web Audio API sống động
 * - Lịch sử nước đi chi tiết, bảng tỷ số đối đầu & xem lại ván cờ
 * - Đồng bộ hóa nước đi thời gian thực qua CoupleNetwork
 * ========================================================
 */

window.CaroGame = (function () {
    'use strict';

    const BOARD_SIZE = 15; // Lưới 15x15 chuẩn Gomoku
    const COLS_LABEL = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];

    // Màu sắc Pastel trang nhã cho 2 người chơi
    const PLAYERS = {
        X: {
            id: 'huy',
            symbol: 'X',
            name: 'Huy',
            icon: '🚗',
            color: '#b45d43', // Terracotta pastel ấm áp
            glow: 'rgba(180, 93, 67, 0.25)',
            pieceName: 'Quân Đỏ Đất (Huy)'
        },
        O: {
            id: 'hien',
            symbol: 'O',
            name: 'Hiền',
            icon: '✈️',
            color: '#a85d7b', // Vintage Rose pastel dịu dàng
            glow: 'rgba(168, 93, 123, 0.25)',
            pieceName: 'Quân Hồng Rose (Hiền)'
        }
    };

    // Điểm sao chuẩn trên bàn cờ 15x15 (Tengen ở giữa và 4 góc)
    const STAR_POINTS = new Set(['3,3', '3,11', '7,7', '11,3', '11,11']);

    let state = {
        board: Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)),
        currentTurn: 'X', // 'X' hoặc 'O'
        gameMode: 'p2p', // 'p2p' (Người yêu từ xa), 'ai' (Máy), 'pass' (Cùng máy)
        aiDifficulty: 'hard', // 'easy', 'medium', 'hard'
        isGameOver: false,
        winner: null,
        winningLine: [], // Danh sách [r, c] của 5 quân chiến thắng
        movesHistory: [], // Danh sách các nước đi [{ r, c, turn, label, time }]
        scores: { huy: 0, hien: 0, draws: 0 },
        ruleBlockEnds: false, // true = Chặn 2 đầu không thắng, false = Luật tự do
        turnTimerSec: 30,
        timerRemaining: 30,
        timerInterval: null,
        isTimerEnabled: false
    };

    // Hệ thống âm thanh Web Audio API
    const audio = {
        ctx: null,
        init() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.ctx = new AudioCtx();
            }
        },
        playTone(freq, type, duration, gainVal = 0.12) {
            try {
                this.init();
                if (!this.ctx) return;
                if (this.ctx.state === 'suspended') this.ctx.resume();
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            } catch (e) {}
        },
        pieceDrop() {
            // Tiếng gõ quân cờ gỗ lách cách ấm áp
            this.playTone(320, 'triangle', 0.08, 0.22);
            setTimeout(() => this.playTone(180, 'sine', 0.09, 0.15), 25);
        },
        winChime() {
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
                setTimeout(() => this.playTone(freq, 'sine', 0.4, 0.15), idx * 120);
            });
        },
        alertBeep() {
            this.playTone(440, 'sine', 0.15, 0.12);
        }
    };

    // ========================================================
    // KHỞI TẠO BÀN CỜ & SỰ KIỆN
    // ========================================================
    function init() {
        loadScoreFromStorage();
        renderBoardDOM();
        bindUIEvents();
        initP2PNetworkSync();
        resetGame(false);
    }

    function renderBoardDOM() {
        const boardEl = document.getElementById('caroBoardGrid');
        if (!boardEl) return;
        boardEl.innerHTML = '';

        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                const cell = document.createElement('div');
                cell.className = 'caro-cell';
                cell.setAttribute('data-row', r);
                cell.setAttribute('data-col', c);
                cell.setAttribute('role', 'button');
                cell.setAttribute('tabindex', '0');
                cell.setAttribute('aria-label', `Ô ${COLS_LABEL[c]}${15 - r}`);

                // Điểm sao chuẩn
                if (STAR_POINTS.has(`${r},${c}`)) {
                    const star = document.createElement('span');
                    star.className = 'caro-star-point';
                    cell.appendChild(star);
                }

                cell.addEventListener('click', () => handleCellClick(r, c));
                boardEl.appendChild(cell);
            }
        }
    }

    function bindUIEvents() {
        // Chuyển đổi chế độ chơi: P2P / Đấu AI / Cùng máy
        const modeTabs = document.querySelectorAll('.caro-mode-tab');
        modeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                modeTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const mode = tab.getAttribute('data-mode') || 'p2p';
                setGameMode(mode);
            });
        });

        // Nút Ván Mới
        const btnRestart = document.getElementById('btnCaroRestart');
        if (btnRestart) {
            btnRestart.addEventListener('click', () => {
                if (state.gameMode === 'p2p') {
                    if (window.CoupleNetwork && window.CoupleNetwork.isPartnerOnline()) {
                        window.CoupleNetwork.send({ type: 'caro_restart_req' });
                        showStatusNotice('💌 Đã gửi lời mời bắt đầu ván mới cho người yêu...');
                    }
                }
                resetGame(true);
            });
        }

        // Nút Xin Đi Lại (Undo)
        const btnUndo = document.getElementById('btnCaroUndo');
        if (btnUndo) {
            btnUndo.addEventListener('click', handleUndoRequest);
        }

        // Nút Đầu Hàng
        const btnSurrender = document.getElementById('btnCaroSurrender');
        if (btnSurrender) {
            btnSurrender.addEventListener('click', handleSurrender);
        }

        // Nút Mời Người Yêu (Chia sẻ link)
        const btnInvite = document.getElementById('btnCaroInvite');
        if (btnInvite) {
            btnInvite.addEventListener('click', () => {
                if (window.CoupleNetwork) {
                    window.CoupleNetwork.copyInviteLink('caro');
                }
            });
        }

        // Cài đặt AI Độ Khó
        const aiSelect = document.getElementById('caroAiDifficultySelect');
        if (aiSelect) {
            aiSelect.addEventListener('change', (e) => {
                state.aiDifficulty = e.target.value;
                showStatusNotice(`🤖 Đã chuyển AI sang độ khó: ${getAiDifficultyLabel(state.aiDifficulty)}`);
            });
        }

        // Bật/Tắt Luật Chặn 2 Đầu
        const ruleCheck = document.getElementById('caroRuleBlockEnds');
        if (ruleCheck) {
            ruleCheck.addEventListener('change', (e) => {
                state.ruleBlockEnds = e.target.checked;
                showStatusNotice(state.ruleBlockEnds ? '⚖️ Bật luật chặn 2 đầu: 5 quân bị chặn 2 đầu không thắng' : '⚖️ Luật tự do: Đủ 5 quân liên tiếp là thắng');
            });
        }
    }

    // ========================================================
    // ĐỒNG BỘ MẠNG P2P CHO CỜ CARO
    // ========================================================
    function initP2PNetworkSync() {
        if (!window.CoupleNetwork) return;

        window.CoupleNetwork.onMessage((packet) => {
            if (!packet || typeof packet !== 'object') return;

            // 1. Nhận nước đi từ đối phương
            if (packet.type === 'caro_move') {
                if (state.gameMode === 'p2p') {
                    makeMove(packet.r, packet.c, true);
                }
            }
            // 2. Yêu cầu ván mới
            else if (packet.type === 'caro_restart_req') {
                showModalConfirm(`💕 Người yêu (${window.CoupleNetwork.getPartnerName()}) muốn chơi ván mới! Bạn có đồng ý không?`, () => {
                    resetGame(true);
                    window.CoupleNetwork.send({ type: 'caro_restart_ack' });
                });
            }
            else if (packet.type === 'caro_restart_ack') {
                resetGame(true);
                showStatusNotice('✨ Người yêu đã đồng ý, bắt đầu ván mới!');
            }
            // 3. Yêu cầu xin đi lại (Undo)
            else if (packet.type === 'caro_undo_req') {
                showModalConfirm(`🥺 ${window.CoupleNetwork.getPartnerName()} xin phép đi lại nước vừa rồi. Cho người yêu đi lại nhé?`, () => {
                    executeUndo();
                    window.CoupleNetwork.send({ type: 'caro_undo_ack' });
                });
            }
            else if (packet.type === 'caro_undo_ack') {
                executeUndo();
                showStatusNotice('💕 Người yêu đã đồng ý cho bạn đi lại!');
            }
            // 4. Đối phương đầu hàng
            else if (packet.type === 'caro_surrender') {
                const partner = window.CoupleNetwork.getPartnerName();
                handleWin(state.currentTurn === 'X' ? 'O' : 'X', `${partner} đã xin đầu hàng! Bạn chiến thắng 💕`);
            }
            // 5. Thay đổi trạng thái Online/Offline
            else if (packet.type === 'presence_change') {
                updateP2PStatusUI();
            }
        });
    }

    // ========================================================
    // LOGIC ĐÁNH CỜ CHÍNH
    // ========================================================
    function handleCellClick(r, c) {
        if (state.isGameOver) return;
        if (state.board[r][c] !== null) return; // Ô đã có quân

        // Nếu chế độ P2P: kiểm tra xem có phải lượt của mình không
        if (state.gameMode === 'p2p') {
            const myRole = window.CoupleNetwork ? window.CoupleNetwork.getMyRole() : 'huy';
            const expectedTurn = myRole === 'huy' ? 'X' : 'O';
            if (state.currentTurn !== expectedTurn) {
                showStatusNotice(`⏳ Đang tới lượt của ${PLAYERS[state.currentTurn].name}. Vui lòng chờ đối phương!`);
                audio.alertBeep();
                return;
            }
        }

        // Thực hiện nước đi
        const success = makeMove(r, c, false);

        // Nếu ở chế độ AI và chưa kết thúc, cho AI đi tiếp
        if (success && state.gameMode === 'ai' && !state.isGameOver && state.currentTurn === 'O') {
            triggerAIMove();
        }
    }

    function makeMove(r, c, isFromNetwork = false) {
        if (state.board[r][c] !== null) return false;

        const turn = state.currentTurn;
        state.board[r][c] = turn;
        audio.pieceDrop();

        const label = `${COLS_LABEL[c]}${15 - r}`;
        const moveData = {
            r, c,
            turn,
            label,
            moveNum: state.movesHistory.length + 1,
            time: new Date().toLocaleTimeString('vi-VN', { minute: '2-digit', second: '2-digit' })
        };
        state.movesHistory.push(moveData);

        // Vẽ quân cờ lên giao diện
        drawPiece(r, c, turn, true);

        // Phát sóng nước đi cho người yêu nếu chơi P2P
        if (!isFromNetwork && state.gameMode === 'p2p' && window.CoupleNetwork) {
            window.CoupleNetwork.send({
                type: 'caro_move',
                r: r,
                c: c,
                turn: turn
            });
        }

        // Cập nhật bảng nhật ký nước đi
        appendMoveToHistoryUI(moveData);

        // Kiểm tra chiến thắng
        const winResult = checkWin(r, c, turn);
        if (winResult.win) {
            handleWin(turn, winResult.line);
            return true;
        }

        // Kiểm tra hòa cờ (bàn cờ đầy 225 ô)
        if (state.movesHistory.length >= BOARD_SIZE * BOARD_SIZE) {
            handleDraw();
            return true;
        }

        // Đổi lượt
        state.currentTurn = turn === 'X' ? 'O' : 'X';
        updateTurnDisplay();
        restartTurnTimer();
        return true;
    }

    function drawPiece(r, c, turn, isLatest = false) {
        const boardEl = document.getElementById('caroBoardGrid');
        if (!boardEl) return;

        // Bỏ highlight nước cũ
        const oldLatest = boardEl.querySelector('.caro-piece.latest');
        if (oldLatest) oldLatest.classList.remove('latest');

        const index = r * BOARD_SIZE + c;
        const cell = boardEl.children[index];
        if (!cell) return;

        let piece = cell.querySelector('.caro-piece');
        if (!piece) {
            piece = document.createElement('div');
            piece.className = `caro-piece piece-${turn.toLowerCase()} ${isLatest ? 'latest' : ''}`;
            const player = PLAYERS[turn];
            piece.innerHTML = `<span class="piece-symbol">${player.symbol}</span><span class="piece-icon">${player.icon}</span>`;
            cell.appendChild(piece);
        }
    }

    // ========================================================
    // THUẬT TOÁN KIỂM TRA THẮNG THUA
    // Kiểm tra 4 hướng: Ngang, Dọc, Chéo xuôi, Chéo ngược
    // ========================================================
    function checkWin(row, col, playerSymbol) {
        const directions = [
            [0, 1],  // Ngang
            [1, 0],  // Dọc
            [1, 1],  // Chéo chính (\)
            [1, -1]  // Chéo phụ (/)
        ];

        for (const [dr, dc] of directions) {
            let count = 1;
            const line = [[row, col]];

            // Mở rộng về phía trước
            let r = row + dr;
            let c = col + dc;
            while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && state.board[r][c] === playerSymbol) {
                count++;
                line.push([r, c]);
                r += dr;
                c += dc;
            }
            const blockFront = (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && state.board[r][c] !== null && state.board[r][c] !== playerSymbol);

            // Mở rộng về phía sau
            r = row - dr;
            c = col - dc;
            while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && state.board[r][c] === playerSymbol) {
                count++;
                line.push([r, c]);
                r -= dr;
                c -= dc;
            }
            const blockBack = (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && state.board[r][c] !== null && state.board[r][c] !== playerSymbol);

            if (count >= 5) {
                // Nếu bật luật chặn 2 đầu: 5 quân bị chặn cả 2 đầu thì chưa thắng
                if (state.ruleBlockEnds && blockFront && blockBack) {
                    continue;
                }
                return { win: true, line: line };
            }
        }

        return { win: false, line: [] };
    }

    function handleWin(winnerTurn, lineOrMsg) {
        state.isGameOver = true;
        state.winner = winnerTurn;
        stopTurnTimer();
        audio.winChime();

        const winner = PLAYERS[winnerTurn];
        if (winnerTurn === 'X') state.scores.huy++;
        else if (winnerTurn === 'O') state.scores.hien++;
        saveScoreToStorage();
        updateScoreboardUI();

        // Highlight 5 quân chiến thắng
        if (Array.isArray(lineOrMsg)) {
            state.winningLine = lineOrMsg;
            highlightWinningLine(lineOrMsg);
        }

        // Hiển thị Banner chiến thắng
        const banner = document.getElementById('caroWinBanner');
        const winnerNameEl = document.getElementById('caroWinnerName');
        const winnerDescEl = document.getElementById('caroWinnerDesc');
        if (banner) {
            if (winnerNameEl) winnerNameEl.textContent = `${winner.name} (${winner.icon}) Chiến Thắng!`;
            if (winnerDescEl) {
                winnerDescEl.textContent = typeof lineOrMsg === 'string' ? lineOrMsg : `Chúc mừng ${winner.name} đã xuất sắc tạo thành chuỗi 5 quân liên tiếp!`;
            }
            banner.classList.add('show');
        }

        showStatusNotice(`🎉 <strong>${winner.name}</strong> (${winner.icon}) đã chiến thắng ván cờ!`);
    }

    function handleDraw() {
        state.isGameOver = true;
        state.winner = 'draw';
        stopTurnTimer();
        state.scores.draws++;
        saveScoreToStorage();
        updateScoreboardUI();

        showStatusNotice('🤝 Ván cờ hòa! Cả hai kỳ thủ đều ngang tài ngang sức.');
    }

    function highlightWinningLine(line) {
        const boardEl = document.getElementById('caroBoardGrid');
        if (!boardEl) return;

        line.forEach(([r, c]) => {
            const index = r * BOARD_SIZE + c;
            const cell = boardEl.children[index];
            if (cell) {
                cell.classList.add('winning-cell');
            }
        });
    }

    // ========================================================
    // THUẬT TOÁN AI ĐÁNH CỜ CARO (HEURISTIC EVALUATION)
    // ========================================================
    function triggerAIMove() {
        showStatusNotice('🤖 Bạn gái AI đang suy nghĩ nước cờ...');
        setTimeout(() => {
            if (state.isGameOver || state.currentTurn !== 'O') return;
            const bestMove = calculateBestAIMove();
            if (bestMove) {
                makeMove(bestMove.r, bestMove.c, false);
            }
        }, 500);
    }

    function calculateBestAIMove() {
        // Nếu là nước đầu tiên của AI
        if (state.movesHistory.length === 1) {
            const firstMove = state.movesHistory[0];
            const neighbors = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],           [0, 1],
                [1, -1],  [1, 0],  [1, 1]
            ];
            const [dr, dc] = neighbors[Math.floor(Math.random() * neighbors.length)];
            const nr = Math.max(0, Math.min(BOARD_SIZE - 1, firstMove.r + dr));
            const nc = Math.max(0, Math.min(BOARD_SIZE - 1, firstMove.c + dc));
            if (state.board[nr][nc] === null) return { r: nr, c: nc };
        }

        // Chế độ Dễ: 40% đi ngẫu nhiên gần quân cờ có sẵn
        if (state.aiDifficulty === 'easy' && Math.random() < 0.4) {
            const candidateCells = [];
            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    if (state.board[r][c] === null && hasNeighborPiece(r, c, 1)) {
                        candidateCells.push({ r, c });
                    }
                }
            }
            if (candidateCells.length > 0) {
                return candidateCells[Math.floor(Math.random() * candidateCells.length)];
            }
        }

        let bestScore = -Infinity;
        let bestMoves = [];

        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                if (state.board[r][c] !== null) continue;
                if (!hasNeighborPiece(r, c, 2)) continue; // Tối ưu: chỉ xét ô gần quân cờ có sẵn

                const attackScore = evaluateCell(r, c, 'O');
                const defenseScore = evaluateCell(r, c, 'X');

                // Trọng số theo cấp độ
                let totalScore = 0;
                if (state.aiDifficulty === 'hard') {
                    totalScore = attackScore + defenseScore * 1.15; // Khó: ưu tiên chặn nguy hiểm
                } else if (state.aiDifficulty === 'medium') {
                    totalScore = attackScore + defenseScore * 0.95;
                } else {
                    totalScore = attackScore * 0.8 + defenseScore * 0.7;
                }

                // Điểm ưu tiên trung tâm bàn cờ
                const centerDist = Math.abs(r - 7) + Math.abs(c - 7);
                totalScore += (14 - centerDist) * 2;

                if (totalScore > bestScore) {
                    bestScore = totalScore;
                    bestMoves = [{ r, c }];
                } else if (totalScore === bestScore) {
                    bestMoves.push({ r, c });
                }
            }
        }

        return bestMoves.length > 0 ? bestMoves[Math.floor(Math.random() * bestMoves.length)] : { r: 7, c: 7 };
    }

    function hasNeighborPiece(r, c, distance = 2) {
        for (let dr = -distance; dr <= distance; dr++) {
            for (let dc = -distance; dc <= distance; dc++) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
                    if (state.board[nr][nc] !== null) return true;
                }
            }
        }
        return false;
    }

    function evaluateCell(row, col, player) {
        let total = 0;
        const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];

        for (const [dr, dc] of directions) {
            let count = 1;
            let openEnds = 0;

            // Tiến
            let r = row + dr;
            let c = col + dc;
            while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && state.board[r][c] === player) {
                count++;
                r += dr;
                c += dc;
            }
            if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && state.board[r][c] === null) {
                openEnds++;
            }

            // Lùi
            r = row - dr;
            c = col - dc;
            while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && state.board[r][c] === player) {
                count++;
                r -= dr;
                c -= dc;
            }
            if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && state.board[r][c] === null) {
                openEnds++;
            }

            // Điểm số thế cờ Gomoku
            if (count >= 5) total += 200000;
            else if (count === 4) {
                if (openEnds === 2) total += 50000;
                else if (openEnds === 1) total += 8000;
            }
            else if (count === 3) {
                if (openEnds === 2) total += 6000;
                else if (openEnds === 1) total += 600;
            }
            else if (count === 2) {
                if (openEnds === 2) total += 500;
                else if (openEnds === 1) total += 50;
            }
        }

        return total;
    }

    // ========================================================
    // TÍNH NĂNG XIN ĐI LẠI (UNDO) & ĐẦU HÀNG
    // ========================================================
    function handleUndoRequest() {
        if (state.isGameOver) return;
        if (state.movesHistory.length === 0) {
            showStatusNotice('Chưa có nước cờ nào để đi lại!');
            return;
        }

        if (state.gameMode === 'p2p') {
            if (window.CoupleNetwork && window.CoupleNetwork.isPartnerOnline()) {
                window.CoupleNetwork.send({ type: 'caro_undo_req' });
                showStatusNotice('💌 Đã gửi lời xin đi lại cho người yêu...');
            } else {
                executeUndo();
            }
        } else if (state.gameMode === 'ai') {
            // Đi lại cả nước của mình và nước của AI
            executeUndo();
            if (state.movesHistory.length > 0 && state.currentTurn === 'O') {
                executeUndo();
            }
            showStatusNotice('↩️ Đã lùi lại 1 nước cờ!');
        } else {
            executeUndo();
            showStatusNotice('↩️ Đã lùi lại 1 nước cờ!');
        }
    }

    function executeUndo() {
        if (state.movesHistory.length === 0) return;
        const lastMove = state.movesHistory.pop();
        state.board[lastMove.r][lastMove.c] = null;

        // Xóa quân cờ khỏi DOM
        const boardEl = document.getElementById('caroBoardGrid');
        if (boardEl) {
            const index = lastMove.r * BOARD_SIZE + lastMove.c;
            const cell = boardEl.children[index];
            if (cell) cell.innerHTML = STAR_POINTS.has(`${lastMove.r},${lastMove.c}`) ? '<span class="caro-star-point"></span>' : '';
        }

        // Cập nhật lượt
        state.currentTurn = lastMove.turn;
        state.isGameOver = false;
        state.winner = null;

        // Bỏ highlight cũ và highlight nước trước đó (nếu còn)
        if (state.movesHistory.length > 0) {
            const prevMove = state.movesHistory[state.movesHistory.length - 1];
            drawPiece(prevMove.r, prevMove.c, prevMove.turn, true);
        }

        // Cập nhật nhật ký nước đi
        removeLastMoveFromHistoryUI();
        updateTurnDisplay();
        restartTurnTimer();
    }

    function handleSurrender() {
        if (state.isGameOver) return;
        showModalConfirm('Bạn có chắc chắn muốn đầu hàng ván cờ này?', () => {
            const winnerTurn = state.currentTurn === 'X' ? 'O' : 'X';
            if (state.gameMode === 'p2p' && window.CoupleNetwork) {
                window.CoupleNetwork.send({ type: 'caro_surrender' });
            }
            handleWin(winnerTurn, `${PLAYERS[state.currentTurn].name} đã xin đầu hàng.`);
        });
    }

    // ========================================================
    // ĐIỀU HÀNH VÁN ĐẤU & GIAO DIỆN
    // ========================================================
    function resetGame(notify = true) {
        state.board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
        state.currentTurn = 'X';
        state.isGameOver = false;
        state.winner = null;
        state.winningLine = [];
        state.movesHistory = [];

        stopTurnTimer();
        renderBoardDOM();
        clearMoveHistoryUI();
        updateTurnDisplay();
        updateP2PStatusUI();
        updateScoreboardUI();

        const banner = document.getElementById('caroWinBanner');
        if (banner) banner.classList.remove('show');

        if (notify) {
            showStatusNotice('✨ Ván cờ mới bắt đầu! Lượt đầu tiên: Huy (🚗)');
        }
    }

    function setGameMode(mode) {
        state.gameMode = mode;
        const aiControls = document.getElementById('caroAiControlGroup');
        const p2pControls = document.getElementById('caroP2pControlGroup');

        if (aiControls) aiControls.style.display = mode === 'ai' ? 'inline-flex' : 'none';
        if (p2pControls) p2pControls.style.display = mode === 'p2p' ? 'inline-flex' : 'none';

        resetGame(false);
        showStatusNotice(`🎮 Đã chuyển sang chế độ: ${getModeLabel(mode)}`);
    }

    function updateTurnDisplay() {
        const turnTextEl = document.getElementById('caroTurnText');
        const turnDotEl = document.getElementById('caroTurnDot');
        const turnPillEl = document.getElementById('caroTurnPill');
        const current = PLAYERS[state.currentTurn];

        if (turnTextEl) {
            turnTextEl.textContent = `Lượt: ${current.name} (${current.icon})`;
        }
        if (turnDotEl) {
            turnDotEl.style.background = current.color;
        }
        if (turnPillEl) {
            turnPillEl.style.borderColor = current.color;
        }
    }

    function updateP2PStatusUI() {
        const dot = document.getElementById('caroP2pDot');
        const label = document.getElementById('caroP2pStatusLabel');
        const isOnline = window.CoupleNetwork ? window.CoupleNetwork.isPartnerOnline() : false;
        const partnerName = window.CoupleNetwork ? window.CoupleNetwork.getPartnerName() : 'Người yêu';

        if (dot) dot.className = `status-indicator-dot ${isOnline ? 'on' : 'off'}`;
        if (label) label.textContent = isOnline ? `Đã kết nối: ${partnerName}` : `${partnerName} đang Offline`;
    }

    function appendMoveToHistoryUI(m) {
        const list = document.getElementById('caroMovesList');
        if (!list) return;

        const emptyNotice = list.querySelector('.empty-history-notice');
        if (emptyNotice) emptyNotice.remove();

        const item = document.createElement('div');
        item.className = `caro-move-item move-${m.turn.toLowerCase()}`;
        item.innerHTML = `
            <span class="move-num">#${m.moveNum}</span>
            <span class="move-player">${m.turn === 'X' ? '🚗 Huy' : '✈️ Hiền'}</span>
            <strong class="move-coord">${m.label}</strong>
            <span class="move-time">${m.time}</span>
        `;
        list.appendChild(item);
        list.scrollTop = list.scrollHeight;
    }

    function removeLastMoveFromHistoryUI() {
        const list = document.getElementById('caroMovesList');
        if (list && list.lastElementChild) {
            list.lastElementChild.remove();
        }
    }

    function clearMoveHistoryUI() {
        const list = document.getElementById('caroMovesList');
        if (list) {
            list.innerHTML = '<div class="empty-history-notice">Chưa có nước cờ nào. Hãy chọn 1 ô trên bàn cờ để đi!</div>';
        }
    }

    // ========================================================
    // TỶ SỐ ĐỐI ĐẦU & LƯU TRỮ
    // ========================================================
    function loadScoreFromStorage() {
        try {
            const raw = localStorage.getItem('couple_caro_scores');
            if (raw) state.scores = JSON.parse(raw);
        } catch (e) {}
    }

    function saveScoreToStorage() {
        try {
            localStorage.setItem('couple_caro_scores', JSON.stringify(state.scores));
        } catch (e) {}
    }

    function updateScoreboardUI() {
        const scoreHuy = document.getElementById('caroScoreHuy');
        const scoreHien = document.getElementById('caroScoreHien');
        const scoreDraws = document.getElementById('caroScoreDraws');

        if (scoreHuy) scoreHuy.textContent = state.scores.huy;
        if (scoreHien) scoreHien.textContent = state.scores.hien;
        if (scoreDraws) scoreDraws.textContent = state.scores.draws;
    }

    // ========================================================
    // ĐỒNG HỒ ĐẾM NGƯỢC LƯỢT ĐI (TURN TIMER)
    // ========================================================
    function restartTurnTimer() {
        if (!state.isTimerEnabled) return;
        stopTurnTimer();
        state.timerRemaining = state.turnTimerSec;
        updateTimerDisplay();

        state.timerInterval = setInterval(() => {
            state.timerRemaining--;
            updateTimerDisplay();
            if (state.timerRemaining <= 0) {
                stopTurnTimer();
                audio.alertBeep();
                // Hết giờ: tự động chuyển lượt hoặc thua cuộc
                showStatusNotice(`⏰ Hết giờ lượt đi của ${PLAYERS[state.currentTurn].name}!`);
                state.currentTurn = state.currentTurn === 'X' ? 'O' : 'X';
                updateTurnDisplay();
                restartTurnTimer();
            }
        }, 1000);
    }

    function stopTurnTimer() {
        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
    }

    function updateTimerDisplay() {
        const timerEl = document.getElementById('caroTurnTimer');
        if (timerEl) timerEl.textContent = `${state.timerRemaining}s`;
    }

    // ========================================================
    // HỘP THÔNG BÁO & MODAL
    // ========================================================
    function showStatusNotice(msg) {
        const noticeEl = document.getElementById('caroStatusNotice');
        if (!noticeEl) return;
        noticeEl.innerHTML = msg;
        noticeEl.classList.add('flash');
        setTimeout(() => noticeEl.classList.remove('flash'), 1200);
    }

    function showModalConfirm(message, onConfirm) {
        let modal = document.getElementById('caroConfirmModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'caroConfirmModal';
            modal.className = 'game-modal-backdrop';
            modal.innerHTML = `
                <div class="game-modal-box caro-modal-box">
                    <div class="modal-card-icon">💕</div>
                    <h3 class="modal-card-title">Lời Nhắn Từ Người Yêu</h3>
                    <p class="modal-card-desc" id="caroConfirmMsg"></p>
                    <div class="game-modal-actions">
                        <button class="modal-btn-cancel" id="btnCaroModalCancel" type="button">Để sau</button>
                        <button class="modal-btn-confirm" id="btnCaroModalOk" type="button">Đồng Ý Ngay 💕</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        const msgEl = modal.querySelector('#caroConfirmMsg');
        const btnOk = modal.querySelector('#btnCaroModalOk');
        const btnCancel = modal.querySelector('#btnCaroModalCancel');

        if (msgEl) msgEl.textContent = message;
        modal.classList.add('active');

        btnOk.onclick = () => {
            modal.classList.remove('active');
            if (typeof onConfirm === 'function') onConfirm();
        };

        btnCancel.onclick = () => {
            modal.classList.remove('active');
        };
    }

    function getModeLabel(m) {
        if (m === 'p2p') return '⚔️ Đấu Online với Người Yêu';
        if (m === 'ai') return '🤖 Đấu với AI Máy';
        return '👥 Đấu 2 Người Trên Cùng 1 Máy';
    }

    function getAiDifficultyLabel(d) {
        if (d === 'easy') return 'Dễ';
        if (d === 'medium') return 'Vừa';
        return 'Khó';
    }

    return {
        init,
        resetGame,
        setGameMode
    };
})();
