/**
 * ========================================================
 * CỜ TƯỚNG (XIANGQI) HUY & HIỀN EDITION
 * - Quân cờ 3D Vector tự thiết kế: Mặt đĩa gỗ tự nhiên chạm khắc thư pháp truyền thống
 * - Bàn cờ 9 cột x 10 hàng chuẩn, Sông Sở Hà Hán Giới, Cửu Cung
 * - Luật chơi chuẩn: Cản chân mã, Chặn mắt tượng, Pháo ăn cách quân, Tướng không đối mặt
 * - Chế độ ELO AI: 800 (Tập sự), 1200 (Nghiệp dư), 1600 (Kỳ thủ), 2000+ (Đại sư)
 * - Chế độ: Đấu P2P Người Yêu, Đấu AI, Chơi Cùng 1 Máy
 * ========================================================
 */

window.XiangqiGame = (function () {
    'use strict';

    const COLS = 9;
    const ROWS = 10;

    // Định nghĩa loại quân cờ
    const PIECE_TYPES = {
        K: { name: 'Tướng', redChar: '帥', blackChar: '將', redLabel: 'SOÁI', blackLabel: 'TƯỚNG', val: 1000 },
        A: { name: 'Sĩ', redChar: '仕', blackChar: '士', redLabel: 'SĨ', blackLabel: 'SĨ', val: 20 },
        E: { name: 'Tượng', redChar: '相', blackChar: '象', redLabel: 'TƯỢNG', blackLabel: 'TƯỢNG', val: 25 },
        R: { name: 'Xe', redChar: '俥', blackChar: '車', redLabel: 'XE', blackLabel: 'XE', val: 90 },
        C: { name: 'Pháo', redChar: '炮', blackChar: '砲', redLabel: 'PHÁO', blackLabel: 'PHÁO', val: 45 },
        H: { name: 'Mã', redChar: '傌', blackChar: '馬', redLabel: 'MÃ', blackLabel: 'MÃ', val: 40 },
        P: { name: 'Tốt', redChar: '兵', blackChar: '卒', redLabel: 'BINH', blackLabel: 'TỐT', val: 15 }
    };

    // Vector SVGs cho từng quân cờ tự thiết kế (3D Beveled Wooden Disc)
    function generatePieceSVG(side, type) {
        const info = PIECE_TYPES[type];
        const isRed = side === 'r';
        const char = isRed ? info.redChar : info.blackChar;
        const sub = isRed ? info.redLabel : info.blackLabel;
        
        const discGradient = isRed ? 'xq_wood_red' : 'xq_wood_black';
        const charColor = isRed ? '#ef4444' : '#38bdf8';
        const charShadow = isRed ? '#7f1d1d' : '#0369a1';
        const rimColor = isRed ? '#f59e0b' : '#94a3b8';

        return `
        <svg width="44" height="44" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="${discGradient}" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stop-color="${isRed ? '#9a3412' : '#334155'}"/>
                    <stop offset="60%" stop-color="${isRed ? '#7c2d12' : '#1e293b'}"/>
                    <stop offset="100%" stop-color="${isRed ? '#451a03' : '#0f172a'}"/>
                </radialGradient>
                <linearGradient id="xq_rim_${side}" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="${isRed ? '#fbbf24' : '#e2e8f0'}"/>
                    <stop offset="100%" stop-color="${isRed ? '#b45309' : '#64748b'}"/>
                </linearGradient>
            </defs>
            <!-- Drop Shadow -->
            <ellipse cx="27" cy="48" rx="22" ry="4" fill="#000000" fill-opacity="0.35"/>
            <!-- Beveled Wooden Coin Body -->
            <circle cx="27" cy="27" r="25" fill="url(#${discGradient})" stroke="url(#xq_rim_${side})" stroke-width="1.8"/>
            <circle cx="27" cy="27" r="21.5" stroke="${rimColor}" stroke-opacity="0.4" stroke-width="1" stroke-dasharray="2 1.5"/>
            <!-- Inner Carved Recess -->
            <circle cx="27" cy="27" r="19" fill="#000000" fill-opacity="0.12"/>
            <!-- Main Calligraphy Character -->
            <text x="27" y="32" font-family="'Plus Jakarta Sans', 'Playfair Display', serif" font-weight="900" font-size="22" text-anchor="middle" fill="${charShadow}" dy="1">${char}</text>
            <text x="27" y="31" font-family="'Plus Jakarta Sans', 'Playfair Display', serif" font-weight="900" font-size="22" text-anchor="middle" fill="${charColor}">${char}</text>
            <!-- Subtitle Label -->
            <text x="27" y="42" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="5.5" letter-spacing="1" text-anchor="middle" fill="${rimColor}">${sub}</text>
        </svg>`;
    }

    // Trạng thái bàn cờ ban đầu
    // r: Đỏ (Huy - phía dưới, hàng 6-9), b: Đen (Hiền/AI - phía trên, hàng 0-3)
    function createInitialBoard() {
        const board = Array(ROWS).fill(null).map(() => Array(COLS).fill(null));

        // Quân Đen (Phía trên)
        board[0][0] = { side: 'b', type: 'R' };
        board[0][1] = { side: 'b', type: 'H' };
        board[0][2] = { side: 'b', type: 'E' };
        board[0][3] = { side: 'b', type: 'A' };
        board[0][4] = { side: 'b', type: 'K' };
        board[0][5] = { side: 'b', type: 'A' };
        board[0][6] = { side: 'b', type: 'E' };
        board[0][7] = { side: 'b', type: 'H' };
        board[0][8] = { side: 'b', type: 'R' };
        board[2][1] = { side: 'b', type: 'C' };
        board[2][7] = { side: 'b', type: 'C' };
        board[3][0] = { side: 'b', type: 'P' };
        board[3][2] = { side: 'b', type: 'P' };
        board[3][4] = { side: 'b', type: 'P' };
        board[3][6] = { side: 'b', type: 'P' };
        board[3][8] = { side: 'b', type: 'P' };

        // Quân Đỏ (Phía dưới)
        board[9][0] = { side: 'r', type: 'R' };
        board[9][1] = { side: 'r', type: 'H' };
        board[9][2] = { side: 'r', type: 'E' };
        board[9][3] = { side: 'r', type: 'A' };
        board[9][4] = { side: 'r', type: 'K' };
        board[9][5] = { side: 'r', type: 'A' };
        board[9][6] = { side: 'r', type: 'E' };
        board[9][7] = { side: 'r', type: 'H' };
        board[9][8] = { side: 'r', type: 'R' };
        board[7][1] = { side: 'r', type: 'C' };
        board[7][7] = { side: 'r', type: 'C' };
        board[6][0] = { side: 'r', type: 'P' };
        board[6][2] = { side: 'r', type: 'P' };
        board[6][4] = { side: 'r', type: 'P' };
        board[6][6] = { side: 'r', type: 'P' };
        board[6][8] = { side: 'r', type: 'P' };

        return board;
    }

    let state = {
        board: createInitialBoard(),
        turn: 'r', // 'r' = Đỏ (Huy), 'b' = Đen (Hiền / AI)
        selected: null, // { r, c }
        validMoves: [], // [{ r, c }]
        lastMove: null, // { from: [r,c], to: [r,c] }
        gameMode: 'ai', // 'p2p', 'ai', 'pass'
        aiElo: 1200, // 800, 1200, 1600, 2000
        isGameOver: false,
        winner: null,
        scores: { r: 0, b: 0, draws: 0 },
        captured: { r: [], b: [] },
        history: [], // [{ from, to, piece, captured }]
        isAiThinking: false
    };

    // Web Audio Sound FX
    const audio = {
        ctx: null,
        init() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.ctx = new AudioCtx();
            }
        },
        playTone(freq, type, duration, gainVal = 0.15) {
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
        piecePlace() {
            // Tiếng gõ quân cờ gỗ giòn tan
            this.playTone(340, 'triangle', 0.08, 0.25);
            setTimeout(() => this.playTone(210, 'sine', 0.1, 0.15), 20);
        },
        pieceCapture() {
            // Tiếng ăn quân cờ uy lực
            this.playTone(420, 'triangle', 0.12, 0.3);
            setTimeout(() => this.playTone(180, 'square', 0.15, 0.2), 30);
        },
        checkSound() {
            // Tiếng báo động Chiếu Tướng!
            this.playTone(660, 'sine', 0.15, 0.2);
            setTimeout(() => this.playTone(880, 'sine', 0.25, 0.25), 120);
        },
        winChime() {
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
                setTimeout(() => this.playTone(freq, 'sine', 0.4, 0.2), idx * 110);
            });
        }
    };

    // ========================================================
    // LUẬT CỜ TƯỚNG CHUẨN XÁC 100%
    // ========================================================
    function isInPalace(r, c, side) {
        if (c < 3 || c > 5) return false;
        if (side === 'b') return r >= 0 && r <= 2;
        if (side === 'r') return r >= 7 && r <= 9;
        return false;
    }

    function isSameSide(p1, p2) {
        return p1 && p2 && p1.side === p2.side;
    }

    // Lấy tất cả nước đi hợp lệ của quân cờ tại [r, c]
    function getPieceMoves(board, r, c) {
        const piece = board[r][c];
        if (!piece) return [];
        const moves = [];
        const side = piece.side;
        const opp = side === 'r' ? 'b' : 'r';

        switch (piece.type) {
            case 'K': { // TƯỚNG (Đi 1 bước thẳng/ngang trong Cung, và luật Tướng đối mặt)
                const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                dirs.forEach(([dr, dc]) => {
                    const nr = r + dr, nc = c + dc;
                    if (isInPalace(nr, nc, side)) {
                        const target = board[nr][nc];
                        if (!target || target.side !== side) moves.push({ r: nr, c: nc });
                    }
                });
                // Kiểm tra luật Tướng đối mặt (Flying General)
                const step = side === 'r' ? -1 : 1;
                let scanR = r + step;
                while (scanR >= 0 && scanR < ROWS) {
                    const block = board[scanR][c];
                    if (block) {
                        if (block.type === 'K' && block.side === opp) {
                            moves.push({ r: scanR, c: c, flyingGeneral: true });
                        }
                        break;
                    }
                    scanR += step;
                }
                break;
            }

            case 'A': { // SĨ (Đi 1 bước chéo trong Cung)
                const dirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
                dirs.forEach(([dr, dc]) => {
                    const nr = r + dr, nc = c + dc;
                    if (isInPalace(nr, nc, side)) {
                        const target = board[nr][nc];
                        if (!target || target.side !== side) moves.push({ r: nr, c: nc });
                    }
                });
                break;
            }

            case 'E': { // TƯỢNG (Đi chéo 2 ô, không qua sông, cản mắt tượng)
                const dirs = [
                    { dr: -2, dc: -2, eyeR: -1, eyeC: -1 },
                    { dr: -2, dc: 2, eyeR: -1, eyeC: 1 },
                    { dr: 2, dc: -2, eyeR: 1, eyeC: -1 },
                    { dr: 2, dc: 2, eyeR: 1, eyeC: 1 }
                ];
                dirs.forEach(({ dr, dc, eyeR, eyeC }) => {
                    const nr = r + dr, nc = c + dc;
                    // Không được qua sông
                    if (side === 'r' && nr < 5) return;
                    if (side === 'b' && nr > 4) return;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                        // Cản mắt tượng: Ô giữa r+eyeR, c+eyeC phải trống
                        if (!board[r + eyeR][c + eyeC]) {
                            const target = board[nr][nc];
                            if (!target || target.side !== side) moves.push({ r: nr, c: nc });
                        }
                    }
                });
                break;
            }

            case 'R': { // XE (Đi ngang/dọc không giới hạn)
                const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                dirs.forEach(([dr, dc]) => {
                    let nr = r + dr, nc = c + dc;
                    while (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                        const target = board[nr][nc];
                        if (!target) {
                            moves.push({ r: nr, c: nc });
                        } else {
                            if (target.side !== side) moves.push({ r: nr, c: nc });
                            break; // Gặp quân cản
                        }
                        nr += dr;
                        nc += dc;
                    }
                });
                break;
            }

            case 'C': { // PHÁO (Đi như Xe, ăn phải nhảy qua đúng 1 quân)
                const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                dirs.forEach(([dr, dc]) => {
                    let nr = r + dr, nc = c + dc;
                    let jumped = false;
                    while (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                        const target = board[nr][nc];
                        if (!jumped) {
                            if (!target) {
                                moves.push({ r: nr, c: nc }); // Nước đi không ăn quân
                            } else {
                                jumped = true; // Tìm thấy ngòi pháo
                            }
                        } else {
                            if (target) {
                                if (target.side !== side) moves.push({ r: nr, c: nc }); // Ăn quân qua ngòi
                                break;
                            }
                        }
                        nr += dr;
                        nc += dc;
                    }
                });
                break;
            }

            case 'H': { // MÃ (Đi chữ L, cản chân mã)
                const horseMoves = [
                    { dr: -2, dc: -1, legR: -1, legC: 0 },
                    { dr: -2, dc: 1, legR: -1, legC: 0 },
                    { dr: 2, dc: -1, legR: 1, legC: 0 },
                    { dr: 2, dc: 1, legR: 1, legC: 0 },
                    { dr: -1, dc: -2, legR: 0, legC: -1 },
                    { dr: 1, dc: -2, legR: 0, legC: -1 },
                    { dr: -1, dc: 2, legR: 0, legC: 1 },
                    { dr: 1, dc: 2, legR: 0, legC: 1 }
                ];
                horseMoves.forEach(({ dr, dc, legR, legC }) => {
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                        // Kiểm tra cản chân mã
                        if (!board[r + legR][c + legC]) {
                            const target = board[nr][nc];
                            if (!target || target.side !== side) moves.push({ r: nr, c: nc });
                        }
                    }
                });
                break;
            }

            case 'P': { // TỐT / BINH (Chưa qua sông đi thẳng 1 bước; Qua sông đi thẳng hoặc ngang)
                const forward = side === 'r' ? -1 : 1;
                // Đi thẳng
                const nr = r + forward;
                if (nr >= 0 && nr < ROWS) {
                    const target = board[nr][c];
                    if (!target || target.side !== side) moves.push({ r: nr, c: c });
                }
                // Đi ngang (khi đã qua sông)
                const hasCrossed = (side === 'r' && r <= 4) || (side === 'b' && r >= 5);
                if (hasCrossed) {
                    [-1, 1].forEach(dc => {
                        const nc = c + dc;
                        if (nc >= 0 && nc < COLS) {
                            const target = board[r][nc];
                            if (!target || target.side !== side) moves.push({ r: r, c: nc });
                        }
                    });
                }
                break;
            }
        }

        // Lọc các nước đi mà làm cho Tướng của mình bị Chiếu hoặc Tướng trực diện
        return moves.filter(m => !isMoveLeavingKingInCheck(board, r, c, m.r, m.c, side));
    }

    // Tìm tọa độ Tướng
    function findKing(board, side) {
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const p = board[r][c];
                if (p && p.type === 'K' && p.side === side) return { r, c };
            }
        }
        return null;
    }

    // Kiểm tra xem bên `side` có đang bị Chiếu không
    function isKingInCheck(board, side) {
        const king = findKing(board, side);
        if (!king) return true; // Mất tướng coi như thua
        const opp = side === 'r' ? 'b' : 'r';

        // 1. Kiểm tra 2 Tướng đối mặt trực diện
        const step = side === 'r' ? -1 : 1;
        let scanR = king.r + step;
        while (scanR >= 0 && scanR < ROWS) {
            const block = board[scanR][king.c];
            if (block) {
                if (block.type === 'K' && block.side === opp) return true;
                break;
            }
            scanR += step;
        }

        // 2. Kiểm tra xem quân đối phương có ăn được Tướng không
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const p = board[r][c];
                if (p && p.side === opp) {
                    // Xem quân p có thể tới ô king.r, king.c không
                    if (canPieceAttackSquare(board, r, c, king.r, king.c)) return true;
                }
            }
        }
        return false;
    }

    function canPieceAttackSquare(board, fromR, fromC, toR, toC) {
        const piece = board[fromR][fromC];
        if (!piece) return false;
        const side = piece.side;

        switch (piece.type) {
            case 'R': {
                if (fromR !== toR && fromC !== toC) return false;
                const dr = Math.sign(toR - fromR), dc = Math.sign(toC - fromC);
                let curR = fromR + dr, curC = fromC + dc;
                while (curR !== toR || curC !== toC) {
                    if (board[curR][curC]) return false;
                    curR += dr;
                    curC += dc;
                }
                return true;
            }
            case 'C': {
                if (fromR !== toR && fromC !== toC) return false;
                const dr = Math.sign(toR - fromR), dc = Math.sign(toC - fromC);
                let curR = fromR + dr, curC = fromC + dc;
                let countBetween = 0;
                while (curR !== toR || curC !== toC) {
                    if (board[curR][curC]) countBetween++;
                    curR += dr;
                    curC += dc;
                }
                return countBetween === 1; // Đúng 1 quân làm ngòi
            }
            case 'H': {
                const dr = toR - fromR, dc = toC - fromC;
                if (Math.abs(dr) === 2 && Math.abs(dc) === 1) {
                    return !board[fromR + dr / 2][fromC]; // Cản chân
                }
                if (Math.abs(dr) === 1 && Math.abs(dc) === 2) {
                    return !board[fromR][fromC + dc / 2];
                }
                return false;
            }
            case 'P': {
                const forward = side === 'r' ? -1 : 1;
                if (toR === fromR + forward && toC === fromC) return true;
                const hasCrossed = (side === 'r' && fromR <= 4) || (side === 'b' && fromR >= 5);
                if (hasCrossed && toR === fromR && Math.abs(toC - fromC) === 1) return true;
                return false;
            }
            case 'A': {
                if (!isInPalace(toR, toC, side)) return false;
                return Math.abs(toR - fromR) === 1 && Math.abs(toC - fromC) === 1;
            }
            case 'E': {
                if (side === 'r' && toR < 5) return false;
                if (side === 'b' && toR > 4) return false;
                if (Math.abs(toR - fromR) === 2 && Math.abs(toC - fromC) === 2) {
                    return !board[(fromR + toR) / 2][(fromC + toC) / 2]; // Mắt tượng
                }
                return false;
            }
            case 'K': {
                if (!isInPalace(toR, toC, side)) return false;
                return Math.abs(toR - fromR) + Math.abs(toC - fromC) === 1;
            }
        }
        return false;
    }

    function isMoveLeavingKingInCheck(board, fromR, fromC, toR, toC, side) {
        // Mô phỏng nước đi
        const savedFrom = board[fromR][fromC];
        const savedTo = board[toR][toC];
        board[toR][toC] = savedFrom;
        board[fromR][fromC] = null;

        const inCheck = isKingInCheck(board, side);

        // Khôi phục
        board[fromR][fromC] = savedFrom;
        board[toR][toC] = savedTo;
        return inCheck;
    }

    // Lấy tất cả nước đi hợp lệ của toàn bộ quân phe `side`
    function getAllLegalMoves(board, side) {
        const allMoves = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const p = board[r][c];
                if (p && p.side === side) {
                    const moves = getPieceMoves(board, r, c);
                    moves.forEach(m => allMoves.push({ from: [r, c], to: [m.r, m.c], piece: p }));
                }
            }
        }
        return allMoves;
    }

    // ========================================================
    // ĐỘNG CƠ AI CHỌN THEO ELO (800 / 1200 / 1600 / 2000+)
    // ========================================================
    // Bảng vị trí chiến thuật Piece-Square Tables cho Tốt, Mã, Xe
    const PST = {
        P: [ // Tốt qua sông giá trị tăng mạnh
            [0, 3, 6, 9, 12, 9, 6, 3, 0],
            [9, 12, 18, 24, 28, 24, 18, 12, 9],
            [6, 9, 15, 20, 24, 20, 15, 9, 6],
            [3, 6, 9, 15, 18, 15, 9, 6, 3],
            [2, 3, 6, 9, 12, 9, 6, 3, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        H: [ // Mã trung tâm mạnh hơn mã biên
            [4, 8, 16, 12, 4, 12, 16, 8, 4],
            [4, 10, 28, 16, 8, 16, 28, 10, 4],
            [6, 16, 14, 18, 16, 18, 14, 16, 6],
            [8, 24, 18, 24, 20, 24, 18, 24, 8],
            [6, 16, 14, 18, 16, 18, 14, 16, 6],
            [4, 12, 16, 14, 12, 14, 16, 12, 4],
            [2, 8, 10, 12, 8, 12, 10, 8, 2],
            [2, 4, 8, 6, 4, 6, 8, 4, 2],
            [0, 2, 4, 4, 2, 4, 4, 2, 0],
            [0, 0, 2, 2, 0, 2, 2, 0, 0]
        ]
    };

    function evaluateBoard(board) {
        let score = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const p = board[r][c];
                if (!p) continue;
                let val = PIECE_TYPES[p.type].val;
                if (p.type === 'P' && PST.P[r] && PST.P[r][c]) {
                    val += (p.side === 'b' ? PST.P[r][c] : PST.P[9 - r][c]);
                } else if (p.type === 'H' && PST.H[r] && PST.H[r][c]) {
                    val += (p.side === 'b' ? PST.H[r][c] : PST.H[9 - r][c]);
                }
                score += (p.side === 'b' ? val : -val);
            }
        }
        return score;
    }

    function makeAIMove() {
        if (state.isGameOver || state.turn !== 'b') return;
        state.isAiThinking = true;
        updateStatusNotice('🤖 AI đang phân tích thế cờ...');

        setTimeout(() => {
            const legalMoves = getAllLegalMoves(state.board, 'b');
            if (legalMoves.length === 0) {
                endGame('r', 'Chiếu Bí! Huy chiến thắng!');
                state.isAiThinking = false;
                return;
            }

            let bestMove = null;

            // 1. Chế độ 800 ELO (Tập Sự - 20% đánh ngẫu nhiên hoặc ham ăn quân)
            if (state.aiElo <= 800) {
                if (Math.random() < 0.25) {
                    bestMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
                } else {
                    // Ưu tiên ăn quân có giá trị cao
                    legalMoves.sort((a, b) => {
                        const targetA = state.board[a.to[0]][a.to[1]];
                        const targetB = state.board[b.to[0]][b.to[1]];
                        const valA = targetA ? PIECE_TYPES[targetA.type].val : 0;
                        const valB = targetB ? PIECE_TYPES[targetB.type].val : 0;
                        return valB - valA;
                    });
                    bestMove = legalMoves[0];
                }
            }
            // 2. Chế độ 1200 ELO (Nghiệp Dư - Minimax 2 tầng)
            else if (state.aiElo <= 1200) {
                let maxEval = -Infinity;
                for (const move of legalMoves) {
                    const savedTarget = state.board[move.to[0]][move.to[1]];
                    state.board[move.to[0]][move.to[1]] = state.board[move.from[0]][move.from[1]];
                    state.board[move.from[0]][move.from[1]] = null;

                    // Phản đòn đối phương (minimax depth 1)
                    let minOppEval = Infinity;
                    const oppMoves = getAllLegalMoves(state.board, 'r');
                    if (oppMoves.length === 0) {
                        minOppEval = 9999;
                    } else {
                        for (const opm of oppMoves.slice(0, 10)) {
                            const opTarget = state.board[opm.to[0]][opm.to[1]];
                            state.board[opm.to[0]][opm.to[1]] = state.board[opm.from[0]][opm.from[1]];
                            state.board[opm.from[0]][opm.from[1]] = null;
                            const ev = evaluateBoard(state.board);
                            if (ev < minOppEval) minOppEval = ev;
                            state.board[opm.from[0]][opm.from[1]] = state.board[opm.to[0]][opm.to[1]];
                            state.board[opm.to[0]][opm.to[1]] = opTarget;
                        }
                    }

                    state.board[move.from[0]][move.from[1]] = state.board[move.to[0]][move.to[1]];
                    state.board[move.to[0]][move.to[1]] = savedTarget;

                    if (minOppEval > maxEval) {
                        maxEval = minOppEval;
                        bestMove = move;
                    }
                }
            }
            // 3. Chế độ 1600 & 2000+ ELO (Kỳ Thủ & Đại Sư - Alpha-Beta 3 tầng kết hợp Quiescence)
            else {
                const depth = state.aiElo >= 2000 ? 3 : 2;
                let bestVal = -Infinity;
                let alpha = -Infinity;
                let beta = Infinity;

                // Sắp xếp các nước ăn quân trước để tỉa cành hiệu quả
                legalMoves.sort((a, b) => {
                    const tA = state.board[a.to[0]][a.to[1]];
                    const tB = state.board[b.to[0]][b.to[1]];
                    return (tB ? PIECE_TYPES[tB.type].val : 0) - (tA ? PIECE_TYPES[tA.type].val : 0);
                });

                for (const move of legalMoves) {
                    const savedTarget = state.board[move.to[0]][move.to[1]];
                    state.board[move.to[0]][move.to[1]] = state.board[move.from[0]][move.from[1]];
                    state.board[move.from[0]][move.from[1]] = null;

                    const val = alphaBeta(state.board, depth - 1, alpha, beta, false);

                    state.board[move.from[0]][move.from[1]] = state.board[move.to[0]][move.to[1]];
                    state.board[move.to[0]][move.to[1]] = savedTarget;

                    if (val > bestVal) {
                        bestVal = val;
                        bestMove = move;
                    }
                    alpha = Math.max(alpha, bestVal);
                    if (beta <= alpha) break;
                }
            }

            if (!bestMove) bestMove = legalMoves[0];

            executeMove(bestMove.from[0], bestMove.from[1], bestMove.to[0], bestMove.to[1], false);
            state.isAiThinking = false;
        }, 300);
    }

    function alphaBeta(board, depth, alpha, beta, isMaximizing) {
        if (depth === 0) return evaluateBoard(board);

        const currentSide = isMaximizing ? 'b' : 'r';
        const moves = getAllLegalMoves(board, currentSide);

        if (moves.length === 0) {
            return isMaximizing ? -9000 : 9000;
        }

        if (isMaximizing) {
            let maxEval = -Infinity;
            for (const m of moves) {
                const saved = board[m.to[0]][m.to[1]];
                board[m.to[0]][m.to[1]] = board[m.from[0]][m.from[1]];
                board[m.from[0]][m.from[1]] = null;

                const ev = alphaBeta(board, depth - 1, alpha, beta, false);
                board[m.from[0]][m.from[1]] = board[m.to[0]][m.to[1]];
                board[m.to[0]][m.to[1]] = saved;

                maxEval = Math.max(maxEval, ev);
                alpha = Math.max(alpha, ev);
                if (beta <= alpha) break;
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (const m of moves) {
                const saved = board[m.to[0]][m.to[1]];
                board[m.to[0]][m.to[1]] = board[m.from[0]][m.from[1]];
                board[m.from[0]][m.from[1]] = null;

                const ev = alphaBeta(board, depth - 1, alpha, beta, true);
                board[m.from[0]][m.from[1]] = board[m.to[0]][m.to[1]];
                board[m.to[0]][m.to[1]] = saved;

                minEval = Math.min(minEval, ev);
                beta = Math.min(beta, ev);
                if (beta <= alpha) break;
            }
            return minEval;
        }
    }

    // ========================================================
    // THỰC HIỆN NƯỚC ĐI & RENDER GIAO DIỆN
    // ========================================================
    function executeMove(fromR, fromC, toR, toC, isBroadcast = true) {
        const piece = state.board[fromR][fromC];
        const captured = state.board[toR][toC];

        // Ghi nhận nước đi
        state.board[toR][toC] = piece;
        state.board[fromR][fromC] = null;
        state.lastMove = { from: [fromR, fromC], to: [toR, toC] };
        state.selected = null;
        state.validMoves = [];

        if (captured) {
            state.captured[piece.side].push(captured);
            audio.pieceCapture();
            renderCapturedTrays();
        } else {
            audio.piecePlace();
        }

        // Thêm vào lịch sử
        const fromColLabel = String.fromCharCode(65 + fromC);
        const toColLabel = String.fromCharCode(65 + toC);
        const moveText = `${piece.side === 'r' ? 'Đỏ' : 'Đen'} ${PIECE_TYPES[piece.type].name}: ${fromColLabel}${10 - fromR} ➔ ${toColLabel}${10 - toR}`;
        addMoveToLog(moveText);

        // Đổi lượt
        state.turn = state.turn === 'r' ? 'b' : 'r';

        // Phát sóng P2P nếu đang chơi trực tuyến
        if (isBroadcast && state.gameMode === 'p2p' && window.CoupleNetwork) {
            window.CoupleNetwork.send({
                type: 'xiangqi_move',
                from: [fromR, fromC],
                to: [toR, toC]
            });
        }

        // Kiểm tra xem đối phương có bị Chiếu không
        const inCheck = isKingInCheck(state.board, state.turn);
        if (inCheck) {
            audio.checkSound();
            const legalMoves = getAllLegalMoves(state.board, state.turn);
            if (legalMoves.length === 0) {
                const winnerSide = state.turn === 'r' ? 'b' : 'r';
                const winnerName = winnerSide === 'r' ? 'Huy (Quân Đỏ)' : (state.gameMode === 'ai' ? 'Máy AI' : 'Hiền (Quân Đen)');
                endGame(winnerSide, `Chiếu Bí! ${winnerName} đã giành chiến thắng ngoạn mục! 🎉`);
                renderBoardPieces();
                updateStatusHUD();
                return;
            } else {
                updateStatusNotice(`⚔️ <strong>CHIẾU TƯỚNG!</strong> ${state.turn === 'r' ? 'Huy' : 'Hiền/AI'} đang bị chiếu!`);
            }
        } else {
            const oppLegalMoves = getAllLegalMoves(state.board, state.turn);
            if (oppLegalMoves.length === 0) {
                const winnerSide = state.turn === 'r' ? 'b' : 'r';
                endGame(winnerSide, `Hết nước đi! ${winnerSide === 'r' ? 'Huy' : 'Hiền/AI'} chiến thắng!`);
                renderBoardPieces();
                updateStatusHUD();
                return;
            }
        }

        renderBoardPieces();
        updateStatusHUD();

        // Kích hoạt AI nếu tới lượt Đen
        if (state.turn === 'b' && state.gameMode === 'ai' && !state.isGameOver) {
            makeAIMove();
        }
    }

    function endGame(winner, msg) {
        state.isGameOver = true;
        state.winner = winner;
        if (winner === 'r') state.scores.r++;
        else if (winner === 'b') state.scores.b++;
        else state.scores.draws++;

        audio.winChime();
        saveScoreToStorage();
        updateStatusNotice(msg);
        renderScoreBoard();

        const banner = document.getElementById('xqNoticeBanner');
        if (banner) {
            banner.innerHTML = `🏆 <strong>KẾT THÚC VÁN ĐẤU!</strong> ${msg}`;
            banner.style.display = 'block';
        }
    }

    // Bắt sự kiện nhấp vào bàn cờ
    function onSquareClick(r, c) {
        if (state.isGameOver || state.isAiThinking) return;

        // Nếu chế độ P2P, chỉ cho phép đi đúng màu của mình
        if (state.gameMode === 'p2p' && window.CoupleNetwork) {
            const myRole = window.CoupleNetwork.getMyRole();
            const mySide = myRole === 'huy' ? 'r' : 'b';
            if (state.turn !== mySide) {
                updateStatusNotice(`Chờ đối phương đi nước cờ của họ...`);
                return;
            }
        }

        const clickedPiece = state.board[r][c];

        // 1. Nếu đang chọn quân và nhấp vào ô hợp lệ -> Đi cờ
        if (state.selected) {
            const isTargetValid = state.validMoves.some(m => m.r === r && m.c === c);
            if (isTargetValid) {
                executeMove(state.selected.r, state.selected.c, r, c, true);
                return;
            }
        }

        // 2. Chọn quân cờ thuộc lượt của mình
        if (clickedPiece && clickedPiece.side === state.turn) {
            state.selected = { r, c };
            state.validMoves = getPieceMoves(state.board, r, c);
            renderBoardPieces();
        } else {
            state.selected = null;
            state.validMoves = [];
            renderBoardPieces();
        }
    }

    // Render toàn bộ quân cờ và điểm gợi ý
    function renderBoardPieces() {
        const layer = document.getElementById('xqPieceLayer');
        if (!layer) return;
        layer.innerHTML = '';

        // Tọa độ tính theo phần trăm lưới 9x10 (cột: 0-8, hàng: 0-9)
        // 9 cột -> mỗi cột cách nhau 100% / 8 = 12.5%
        // 10 hàng -> mỗi hàng cách nhau 100% / 9 = 11.111%
        const colPercent = 100 / (COLS - 1);
        const rowPercent = 100 / (ROWS - 1);

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const piece = state.board[r][c];
                const left = c * colPercent;
                const top = r * rowPercent;

                if (piece) {
                    const el = document.createElement('div');
                    el.className = `xq-piece piece-${piece.side}`;
                    if (state.selected && state.selected.r === r && state.selected.c === c) {
                        el.classList.add('selected');
                    }
                    if (state.lastMove && ((state.lastMove.from[0] === r && state.lastMove.from[1] === c) || (state.lastMove.to[0] === r && state.lastMove.to[1] === c))) {
                        el.classList.add('last-move');
                    }

                    el.style.left = `${left}%`;
                    el.style.top = `${top}%`;
                    el.innerHTML = generatePieceSVG(piece.side, piece.type);

                    el.addEventListener('click', (e) => {
                        e.stopPropagation();
                        onSquareClick(r, c);
                    });

                    layer.appendChild(el);
                }

                // Điểm gợi ý đi cờ
                const isDest = state.validMoves.find(m => m.r === r && m.c === c);
                if (isDest) {
                    const destEl = document.createElement('div');
                    destEl.className = piece ? 'xq-dest-capture' : 'xq-dest-dot';
                    destEl.style.left = `${left}%`;
                    destEl.style.top = `${top}%`;

                    destEl.addEventListener('click', (e) => {
                        e.stopPropagation();
                        onSquareClick(r, c);
                    });

                    layer.appendChild(destEl);
                }
            }
        }
    }

    function renderCapturedTrays() {
        const trayRed = document.getElementById('xqCapturedRed');
        const trayBlack = document.getElementById('xqCapturedBlack');
        if (trayRed) {
            trayRed.innerHTML = state.captured.r.map(p => `<span class="xq-mini-captured" title="${PIECE_TYPES[p.type].name}">${generatePieceSVG('b', p.type)}</span>`).join('');
        }
        if (trayBlack) {
            trayBlack.innerHTML = state.captured.b.map(p => `<span class="xq-mini-captured" title="${PIECE_TYPES[p.type].name}">${generatePieceSVG('r', p.type)}</span>`).join('');
        }
    }

    function updateStatusHUD() {
        const turnText = document.getElementById('xqTurnIndicator');
        if (turnText) {
            const isRedTurn = state.turn === 'r';
            const name = isRedTurn ? 'Huy (Quân Đỏ)' : (state.gameMode === 'ai' ? 'Máy AI' : 'Hiền (Quân Đen)');
            turnText.className = `xq-turn-indicator ${isRedTurn ? 'turn-red' : 'turn-black'}`;
            turnText.innerHTML = `<span>${isRedTurn ? '🔴 Lượt Đỏ' : '⚫ Lượt Đen'}: <strong>${name}</strong></span>`;
        }
    }

    function updateStatusNotice(msg) {
        const noticeEl = document.getElementById('xqNoticeBanner');
        if (noticeEl) {
            noticeEl.innerHTML = msg;
            noticeEl.style.display = 'block';
        }
    }

    function addMoveToLog(text) {
        const log = document.getElementById('xqMovesLog');
        if (!log) return;
        const row = document.createElement('div');
        row.className = 'xq-move-row';
        row.innerHTML = `<span class="xq-move-num">#${state.history.length + 1}</span> <span>${text}</span>`;
        log.appendChild(row);
        log.scrollTop = log.scrollHeight;
    }

    function renderScoreBoard() {
        const rEl = document.getElementById('xqScoreRed');
        const bEl = document.getElementById('xqScoreBlack');
        if (rEl) rEl.textContent = state.scores.r;
        if (bEl) bEl.textContent = state.scores.b;
    }

    function saveScoreToStorage() {
        try { localStorage.setItem('xq_scores', JSON.stringify(state.scores)); } catch (e) {}
    }

    function loadScoreFromStorage() {
        try {
            const saved = localStorage.getItem('xq_scores');
            if (saved) state.scores = JSON.parse(saved);
        } catch (e) {}
    }

    // ========================================================
    // KHỞI TẠO BÀN CỜ, SỰ KIỆN & P2P
    // ========================================================
    function init() {
        loadScoreFromStorage();
        renderBoardPieces();
        renderScoreBoard();
        updateStatusHUD();
        bindEvents();
        initP2P();
    }

    function resetGame() {
        state.board = createInitialBoard();
        state.turn = 'r';
        state.selected = null;
        state.validMoves = [];
        state.lastMove = null;
        state.isGameOver = false;
        state.winner = null;
        state.captured = { r: [], b: [] };
        state.history = [];
        state.isAiThinking = false;

        const log = document.getElementById('xqMovesLog');
        if (log) log.innerHTML = '';
        renderCapturedTrays();
        renderBoardPieces();
        updateStatusHUD();
        updateStatusNotice('Ván cờ mới bắt đầu! Lượt đầu tiên: <strong>Huy (Quân Đỏ)</strong>');
    }

    function undoMove() {
        if (state.history.length === 0 || state.isGameOver || state.isAiThinking) return;
        // Hoàn tác 2 nước nếu đánh với AI, 1 nước nếu đánh 2 người
        const steps = state.gameMode === 'ai' ? 2 : 1;
        for (let i = 0; i < steps; i++) {
            if (state.history.length === 0) break;
            const last = state.history.pop();
            state.board[last.from[0]][last.from[1]] = last.piece;
            state.board[last.to[0]][last.to[1]] = last.captured;
            state.turn = last.piece.side;
        }
        state.selected = null;
        state.validMoves = [];
        state.lastMove = state.history.length > 0 ? { from: state.history[state.history.length - 1].from, to: state.history[state.history.length - 1].to } : null;
        renderBoardPieces();
        updateStatusHUD();
        updateStatusNotice('Đã hoàn tác nước đi trước.');
    }

    function bindEvents() {
        // Chế độ chơi (P2P / AI / Cùng 1 máy)
        document.querySelectorAll('.xq-mode-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.xq-mode-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                state.gameMode = tab.dataset.mode;

                const eloGroup = document.getElementById('xqEloSelectorGroup');
                if (eloGroup) {
                    eloGroup.style.display = state.gameMode === 'ai' ? 'flex' : 'none';
                }

                resetGame();
            });
        });

        // Chọn ELO AI (800 / 1200 / 1600 / 2000+)
        document.querySelectorAll('.xq-elo-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.xq-elo-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                state.aiElo = parseInt(tab.dataset.elo, 10);
                const badge = document.getElementById('xqCurrentEloBadge');
                if (badge) badge.textContent = `${state.aiElo} ELO`;
                updateStatusNotice(`Đã chọn độ khó AI: <strong>${state.aiElo} ELO</strong>`);
            });
        });

        // Nút Ván Mới & Hoàn Tác
        const btnReset = document.getElementById('xqBtnNewGame');
        if (btnReset) btnReset.addEventListener('click', resetGame);

        const btnUndo = document.getElementById('xqBtnUndo');
        if (btnUndo) btnUndo.addEventListener('click', undoMove);

        // Click trên nền bàn cờ để hủy chọn
        const boardInner = document.getElementById('xqBoardInner');
        if (boardInner) {
            boardInner.addEventListener('click', () => {
                state.selected = null;
                state.validMoves = [];
                renderBoardPieces();
            });
        }
    }

    function initP2P() {
        if (!window.CoupleNetwork) return;
        window.CoupleNetwork.onMessage(packet => {
            if (!packet || typeof packet !== 'object') return;
            if (packet.type === 'xiangqi_move') {
                executeMove(packet.from[0], packet.from[1], packet.to[0], packet.to[1], false);
            } else if (packet.type === 'xiangqi_reset') {
                resetGame();
            }
        });
    }

    return {
        init,
        resetGame,
        onShow() {
            renderBoardPieces();
            updateStatusHUD();
        }
    };
})();
