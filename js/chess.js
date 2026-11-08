/**
 * ========================================================
 * CỜ VUA (INTERNATIONAL CHESS) HUY & HIỀN EDITION
 * - Bộ quân cờ Vector SVG nghệ thuật độc quyền tự thiết kế:
 *   + King (Vua ♔): Vương miện thánh giá hoàng gia, bệ đá tầng
 *   + Queen (Hậu ♕): Vương miện ngọc trai 5 đỉnh nhọn lộng lẫy
 *   + Rook (Xe ♖): Tháp pháo thành cổ kiên cố, khe ngắm bắn
 *   + Bishop (Tượng ♗): Mũ giám mục Mitre với khe chéo kinh điển
 *   + Knight (Mã ♘): Đầu tuấn mã kiêu hãnh với bờm tóc dũng mãnh
 *   + Pawn (Tốt ♙): Ngọc cầu finial, vành đai cổ đôi thanh thoát
 * - Luật chơi chuẩn: Di chuyển, Ăn quân, Nhập thành (O-O, O-O-O),
 *   Phong cấp tốt (Promotion Modal), Bắt tốt qua đường (En Passant),
 *   Kiểm tra Chiếu (Check), Chiếu bí (Checkmate), Hòa cờ (Stalemate).
 * - Động cơ AI Minimax / Alpha-Beta Pruning theo 4 mức ELO:
 *   800 (Tập sự), 1200 (Nghiệp dư), 1600 (Kỳ thủ), 2000+ (Đại sư).
 * - Chế độ: Đấu P2P Người Yêu (Couple Network), Đấu AI, Cùng 1 Máy.
 * ========================================================
 */

window.ChessGame = (function () {
    'use strict';

    // Bảng giá trị quân cờ chuẩn
    const PIECE_VALUES = {
        P: 100,
        N: 320,
        B: 330,
        R: 500,
        Q: 900,
        K: 20000
    };

    // Bảng trọng số vị trí (Piece-Square Tables - White perspective, row 0..7 top to bottom)
    const PST = {
        P: [
            [ 0,  0,  0,  0,  0,  0,  0,  0],
            [50, 50, 50, 50, 50, 50, 50, 50],
            [10, 10, 20, 30, 30, 20, 10, 10],
            [ 5,  5, 10, 25, 25, 10,  5,  5],
            [ 0,  0,  0, 20, 20,  0,  0,  0],
            [ 5, -5,-10,  0,  0,-10, -5,  5],
            [ 5, 10, 10,-20,-20, 10, 10,  5],
            [ 0,  0,  0,  0,  0,  0,  0,  0]
        ],
        N: [
            [-50,-40,-30,-30,-30,-30,-40,-50],
            [-40,-20,  0,  0,  0,  0,-20,-40],
            [-30,  0, 10, 15, 15, 10,  0,-30],
            [-30,  5, 15, 20, 20, 15,  5,-30],
            [-30,  0, 15, 20, 20, 15,  0,-30],
            [-30,  5, 10, 15, 15, 10,  5,-30],
            [-40,-20,  0,  5,  5,  0,-20,-40],
            [-50,-40,-30,-30,-30,-30,-40,-50]
        ],
        B: [
            [-20,-10,-10,-10,-10,-10,-10,-20],
            [-10,  0,  0,  0,  0,  0,  0,-10],
            [-10,  0,  5, 10, 10,  5,  0,-10],
            [-10,  5,  5, 10, 10,  5,  5,-10],
            [-10,  0, 10, 10, 10, 10,  0,-10],
            [-10, 10, 10, 10, 10, 10, 10,-10],
            [-10,  5,  0,  0,  0,  0,  5,-10],
            [-20,-10,-10,-10,-10,-10,-10,-20]
        ],
        R: [
            [ 0,  0,  0,  0,  0,  0,  0,  0],
            [ 5, 10, 10, 10, 10, 10, 10,  5],
            [-5,  0,  0,  0,  0,  0,  0, -5],
            [-5,  0,  0,  0,  0,  0,  0, -5],
            [-5,  0,  0,  0,  0,  0,  0, -5],
            [-5,  0,  0,  0,  0,  0,  0, -5],
            [-5,  0,  0,  0,  0,  0,  0, -5],
            [ 0,  0,  0,  5,  5,  0,  0,  0]
        ],
        Q: [
            [-20,-10,-10, -5, -5,-10,-10,-20],
            [-10,  0,  0,  0,  0,  0,  0,-10],
            [-10,  0,  5,  5,  5,  5,  0,-10],
            [ -5,  0,  5,  5,  5,  5,  0, -5],
            [  0,  0,  5,  5,  5,  5,  0, -5],
            [-10,  5,  5,  5,  5,  5,  0,-10],
            [-10,  0,  5,  0,  0,  0,  0,-10],
            [-20,-10,-10, -5, -5,-10,-10,-20]
        ],
        K: [
            [-30,-40,-40,-50,-50,-40,-40,-30],
            [-30,-40,-40,-50,-50,-40,-40,-30],
            [-30,-40,-40,-50,-50,-40,-40,-30],
            [-30,-40,-40,-50,-50,-40,-40,-30],
            [-20,-30,-30,-40,-40,-30,-30,-20],
            [-10,-20,-20,-20,-20,-20,-20,-10],
            [ 20, 20,  0,  0,  0,  0, 20, 20],
            [ 20, 30, 10,  0,  0, 10, 30, 20]
        ]
    };

    /**
     * BỘ QUÂN CỜ VECTOR SVG NGHỆ THUẬT TỰ THIẾT KẾ ĐỘC QUYỀN
     */
    function getPieceSVG(side, type) {
        const isWhite = side === 'w';
        const gradId = isWhite ? 'chessGradWhite' : 'chessGradBlack';
        const strokeColor = isWhite ? '#b45309' : '#e2e8f0';
        const strokeWidth = '1.6';
        const highlightColor = isWhite ? '#ffffff' : '#94a3b8';
        const darkAccent = isWhite ? '#d97706' : '#0f172a';

        let innerPaths = '';

        if (type === 'K') {
            // Vua: Thánh giá đỉnh vương miện, bệ đá xếp tầng
            innerPaths = `
                <!-- Tiered Base -->
                <path d="M 14 56 C 14 54 20 52 32 52 C 44 52 50 54 50 56 L 48 58 C 48 60 16 60 16 58 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <path d="M 18 52 C 18 48 24 46 32 46 C 40 46 46 48 46 52 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Royal Robe & Pillar -->
                <path d="M 21 46 C 21 34 25 30 25 24 C 28 25 36 25 39 24 C 39 30 43 34 43 46 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Crown Base -->
                <path d="M 19 24 C 23 20 41 20 45 24 C 47 28 17 28 19 24 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Imperial Crown Arches -->
                <path d="M 22 24 C 22 17 28 16 32 16 C 36 16 42 17 42 24" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Imperial Cross -->
                <path d="M 30 8 H 34 V 11 H 37 V 14 H 34 V 18 H 30 V 14 H 27 V 11 H 30 Z" fill="${isWhite ? '#fef08a' : '#cbd5e1'}" stroke="${strokeColor}" stroke-width="1.2" />
                <circle cx="32" cy="13" r="1.5" fill="${isWhite ? '#dc2626' : '#38bdf8'}" />
                <!-- Shimmer highlight -->
                <path d="M 25 30 Q 27 40 25 45" stroke="${highlightColor}" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
            `;
        } else if (type === 'Q') {
            // Hậu: Vương miện ngọc trai 5 đỉnh nhọn, thân thon thanh thoát
            innerPaths = `
                <!-- Tiered Base -->
                <path d="M 14 56 C 14 54 20 52 32 52 C 44 52 50 54 50 56 L 48 58 C 48 60 16 60 16 58 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <path d="M 18 52 C 18 48 24 46 32 46 C 40 46 46 48 46 52 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Hourglass Waist -->
                <path d="M 22 46 C 22 36 28 32 26 25 C 30 26 34 26 38 25 C 36 32 42 36 42 46 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Coronet Tiara with 5 Peaks -->
                <path d="M 17 25 L 20 18 L 26 23 L 32 15 L 38 23 L 44 18 L 47 25 C 44 28 20 28 17 25 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- 5 Pearl Jewels -->
                <circle cx="20" cy="18" r="2.2" fill="${isWhite ? '#fef08a' : '#38bdf8'}" stroke="${strokeColor}" stroke-width="0.8" />
                <circle cx="26" cy="23" r="1.8" fill="${isWhite ? '#fef08a' : '#38bdf8'}" stroke="${strokeColor}" stroke-width="0.8" />
                <circle cx="32" cy="15" r="2.6" fill="${isWhite ? '#fef08a' : '#38bdf8'}" stroke="${strokeColor}" stroke-width="0.8" />
                <circle cx="38" cy="23" r="1.8" fill="${isWhite ? '#fef08a' : '#38bdf8'}" stroke="${strokeColor}" stroke-width="0.8" />
                <circle cx="44" cy="18" r="2.2" fill="${isWhite ? '#fef08a' : '#38bdf8'}" stroke="${strokeColor}" stroke-width="0.8" />
                <!-- Highlight line -->
                <path d="M 28 32 Q 29 40 27 45" stroke="${highlightColor}" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
            `;
        } else if (type === 'R') {
            // Xe: Thành lũy cổ kiên cố, răng cưa pháo đài
            innerPaths = `
                <!-- Tiered Base -->
                <path d="M 16 56 C 16 54 22 52 32 52 C 42 52 48 54 48 56 L 47 58 C 47 60 17 60 17 58 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <path d="M 19 52 L 21 47 L 43 47 L 45 52 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Sturdy Masonry Body -->
                <path d="M 21 47 L 23 27 L 41 27 L 43 47 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Cornice -->
                <path d="M 19 27 L 19 23 L 45 23 L 45 27 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Battlement Crenellations -->
                <path d="M 19 23 L 19 16 L 24 16 L 24 19 L 29 19 L 29 16 L 35 16 L 35 19 L 40 19 L 40 16 L 45 16 L 45 23 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Masonry slit embrasure -->
                <line x1="32" y1="32" x2="32" y2="40" stroke="${darkAccent}" stroke-width="2" stroke-linecap="round" />
                <line x1="28" y1="35" x2="36" y2="35" stroke="${darkAccent}" stroke-width="2" stroke-linecap="round" />
            `;
        } else if (type === 'B') {
            // Tượng: Mũ giám mục mitre với vết chém chéo kinh điển
            innerPaths = `
                <!-- Base -->
                <path d="M 18 56 C 18 54 23 52 32 52 C 41 52 46 54 46 56 L 45 58 C 45 60 19 60 19 58 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <path d="M 21 52 C 21 47 26 46 32 46 C 38 46 43 47 43 52 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Slender Body -->
                <path d="M 24 46 C 24 38 27 34 26 28 C 30 29 34 29 38 28 C 37 34 40 38 40 46 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Mitre Head -->
                <path d="M 22 28 C 20 20 28 14 32 14 C 36 14 44 20 42 28 C 40 32 24 32 22 28 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Mitre Orb Finial -->
                <circle cx="32" cy="12" r="2.5" fill="${isWhite ? '#fef08a' : '#38bdf8'}" stroke="${strokeColor}" stroke-width="1" />
                <!-- Diagonal Mitre Slash Slit -->
                <path d="M 36 18 L 27 26" stroke="${darkAccent}" stroke-width="2.2" stroke-linecap="round" />
                <circle cx="32" cy="24" r="1.6" fill="${darkAccent}" />
            `;
        } else if (type === 'N') {
            // Mã: Đầu chiến mã kiêu hãnh, bờm tóc chạm khắc uy nghi
            innerPaths = `
                <!-- Base -->
                <path d="M 18 56 C 18 54 23 52 32 52 C 41 52 46 54 46 56 L 45 58 C 45 60 19 60 19 58 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Majestic Knight Silhouette -->
                <path d="M 21 52 C 21 46 25 43 27 38 C 24 36 21 34 19 32 C 17 30 18 26 20 25 C 23 23 26 24 28 23 C 28 20 27 16 30 14 C 31 13 33 13 34 16 C 36 14 39 15 41 17 C 44 20 45 25 43 30 C 44 35 44 45 43 52 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Muzzle contour -->
                <path d="M 20 26 C 22 28 25 29 27 28" stroke="${strokeColor}" stroke-width="1.2" fill="none" />
                <!-- Nostril -->
                <circle cx="21" cy="29" r="1.2" fill="${darkAccent}" />
                <!-- Eye -->
                <ellipse cx="28" cy="21" rx="1.6" ry="2.2" fill="${darkAccent}" />
                <circle cx="27.5" cy="20.5" r="0.6" fill="#ffffff" />
                <!-- Mane locks -->
                <path d="M 35 18 C 39 21 38 27 41 30" stroke="${strokeColor}" stroke-width="1.4" fill="none" stroke-linecap="round" />
                <path d="M 37 24 C 41 28 39 34 42 37" stroke="${strokeColor}" stroke-width="1.4" fill="none" stroke-linecap="round" />
                <path d="M 39 32 C 43 36 40 42 42 45" stroke="${strokeColor}" stroke-width="1.4" fill="none" stroke-linecap="round" />
            `;
        } else if (type === 'P') {
            // Tốt: Finial ngọc cầu, cổ áo tròn đôi, thân bệ hài hòa
            innerPaths = `
                <!-- Base -->
                <path d="M 20 56 C 20 54 24 52 32 52 C 40 52 44 54 44 56 L 43 58 C 43 60 21 60 21 58 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Pedestal -->
                <path d="M 23 52 C 23 48 26 44 27 38 C 30 39 34 39 37 38 C 38 44 41 48 41 52 Z" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Double Collar Rings -->
                <ellipse cx="32" cy="37" rx="9" ry="2.5" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="1.2" />
                <ellipse cx="32" cy="34" rx="7.5" ry="2" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="1.2" />
                <!-- Spherical Crown Head -->
                <circle cx="32" cy="24" r="7.5" fill="url(#${gradId})" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
                <!-- Shimmer highlight -->
                <ellipse cx="30" cy="21" rx="2.5" ry="1.5" fill="${highlightColor}" opacity="0.65" transform="rotate(-30 30 21)" />
            `;
        }

        return `
            <svg class="chess-piece-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <!-- White Ivory Gold Gradient -->
                    <linearGradient id="chessGradWhite" x1="20%" y1="10%" x2="80%" y2="90%">
                        <stop offset="0%" stop-color="#ffffff" />
                        <stop offset="45%" stop-color="#fffbeb" />
                        <stop offset="85%" stop-color="#fef3c7" />
                        <stop offset="100%" stop-color="#fde68a" />
                    </linearGradient>
                    <!-- Black Obsidian Slate Gradient -->
                    <linearGradient id="chessGradBlack" x1="20%" y1="10%" x2="80%" y2="90%">
                        <stop offset="0%" stop-color="#64748b" />
                        <stop offset="35%" stop-color="#334155" />
                        <stop offset="80%" stop-color="#1e293b" />
                        <stop offset="100%" stop-color="#0f172a" />
                    </linearGradient>
                </defs>
                ${innerPaths}
            </svg>
        `;
    }

    // Âm thanh Web Audio API
    let audioCtx = null;
    function getAudioCtx() {
        if (!audioCtx) {
            const AudioClass = window.AudioContext || window.webkitAudioContext;
            if (AudioClass) audioCtx = new AudioClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playSound(type) {
        try {
            const ctx = getAudioCtx();
            if (!ctx) return;
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'move') {
                // Tiếng quân cờ gõ mặt bàn gỗ vang ấm
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);
                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
                osc.start(now);
                osc.stop(now + 0.09);
            } else if (type === 'capture') {
                // Tiếng ăn quân va chạm mạnh mẽ
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(260, now);
                osc.frequency.exponentialRampToValueAtTime(80, now + 0.14);
                gain.gain.setValueAtTime(0.4, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
            } else if (type === 'check') {
                // Tiếng chuông cảnh báo Chiếu tướng
                osc.type = 'sine';
                osc.frequency.setValueAtTime(659.25, now); // E5
                osc.frequency.setValueAtTime(880, now + 0.1); // A5
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.start(now);
                osc.stop(now + 0.35);
            } else if (type === 'win') {
                // Hợp âm chiến thắng rạng rỡ
                const freqs = [523.25, 659.25, 783.99, 1046.50];
                freqs.forEach((f, idx) => {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.connect(g);
                    g.connect(ctx.destination);
                    o.type = 'triangle';
                    o.frequency.setValueAtTime(f, now + idx * 0.09);
                    g.gain.setValueAtTime(0.25, now + idx * 0.09);
                    g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.45);
                    o.start(now + idx * 0.09);
                    o.stop(now + idx * 0.09 + 0.45);
                });
            }
        } catch (e) {
            console.warn('[Chess] Audio error:', e);
        }
    }

    /**
     * TRẠNG THÁI TRÒ CHƠI
     */
    let board = [];
    let turn = 'w'; // 'w' (Trắng) hoặc 'b' (Đen)
    let selectedSq = null; // { r, c }
    let validMoves = []; // Mảng các nước đi hợp lệ của ô đang chọn
    let moveHistory = []; // Lịch sử các nước đã đi
    let capturedPieces = { w: [], b: [] }; // Quân bị bắt
    let gameMode = 'ai'; // 'ai' | 'pass' | 'p2p'
    let currentElo = 1200; // 800 | 1200 | 1600 | 2000
    let isGameOver = false;
    let pendingPromotion = null; // Lưu lại nước đi đang chờ chọn quân phong cấp
    let isBoardFlipped = false;
    let hasCastledOrMoved = {
        wK: false, wR_a: false, wR_h: false,
        bK: false, bR_a: false, bR_h: false
    };
    let enPassantTarget = null; // { r, c }

    /**
     * KHỞI TẠO BÀN CỜ CHUẨN QUỐC TẾ
     */
    function createInitialBoard() {
        return [
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
        ];
    }

    function resetGame() {
        board = createInitialBoard();
        turn = 'w';
        selectedSq = null;
        validMoves = [];
        moveHistory = [];
        capturedPieces = { w: [], b: [] };
        isGameOver = false;
        pendingPromotion = null;
        hasCastledOrMoved = {
            wK: false, wR_a: false, wR_h: false,
            bK: false, bR_a: false, bR_h: false
        };
        enPassantTarget = null;

        renderBoard();
        updateUI();
        hideBanner();
    }

    /**
     * KIỂM TRA NƯỚC ĐI CƠ BẢN CỦA TỪNG QUÂN
     */
    function getRawMoves(r, c, bState) {
        const piece = bState[r][c];
        if (!piece) return [];
        const side = piece[0];
        const type = piece[1];
        const moves = [];

        function isInside(row, col) {
            return row >= 0 && row < 8 && col >= 0 && col < 8;
        }

        function addMoveIfValid(toR, toC) {
            if (!isInside(toR, toC)) return false;
            const target = bState[toR][toC];
            if (!target) {
                moves.push({ fromR: r, fromC: c, toR, toC, isCapture: false });
                return true; // Tiếp tục trượt
            } else if (target[0] !== side) {
                moves.push({ fromR: r, fromC: c, toR, toC, isCapture: true, captured: target });
                return false; // Bị chặn sau khi ăn
            }
            return false; // Bị chặn bởi quân cùng phe
        }

        if (type === 'P') {
            const dir = side === 'w' ? -1 : 1;
            const startRow = side === 'w' ? 6 : 1;

            // Đi thẳng 1 bước
            const f1R = r + dir;
            if (isInside(f1R, c) && !bState[f1R][c]) {
                const isPromo = (side === 'w' && f1R === 0) || (side === 'b' && f1R === 7);
                moves.push({ fromR: r, fromC: c, toR: f1R, toC: c, isCapture: false, isPromo });

                // Đi thẳng 2 bước từ vị trí ban đầu
                const f2R = r + dir * 2;
                if (r === startRow && !bState[f2R][c]) {
                    moves.push({ fromR: r, fromC: c, toR: f2R, toC: c, isCapture: false, isPawnDouble: true });
                }
            }

            // Ăn chéo
            [-1, 1].forEach(dCol => {
                const targetC = c + dCol;
                if (isInside(f1R, targetC)) {
                    const enemy = bState[f1R][targetC];
                    const isPromo = (side === 'w' && f1R === 0) || (side === 'b' && f1R === 7);
                    if (enemy && enemy[0] !== side) {
                        moves.push({ fromR: r, fromC: c, toR: f1R, toC: targetC, isCapture: true, captured: enemy, isPromo });
                    } else if (enPassantTarget && enPassantTarget.r === f1R && enPassantTarget.c === targetC) {
                        // En Passant
                        moves.push({ fromR: r, fromC: c, toR: f1R, toC: targetC, isCapture: true, isEnPassant: true });
                    }
                }
            });
        } else if (type === 'N') {
            const nDeltas = [
                [-2, -1], [-2, 1], [-1, -2], [-1, 2],
                [1, -2], [1, 2], [2, -1], [2, 1]
            ];
            nDeltas.forEach(([dr, dc]) => addMoveIfValid(r + dr, c + dc));
        } else if (type === 'B') {
            const diagDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
            diagDirs.forEach(([dr, dc]) => {
                let step = 1;
                while (addMoveIfValid(r + dr * step, c + dc * step)) {
                    step++;
                }
            });
        } else if (type === 'R') {
            const orthoDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            orthoDirs.forEach(([dr, dc]) => {
                let step = 1;
                while (addMoveIfValid(r + dr * step, c + dc * step)) {
                    step++;
                }
            });
        } else if (type === 'Q') {
            const allDirs = [
                [-1, -1], [-1, 1], [1, -1], [1, 1],
                [-1, 0], [1, 0], [0, -1], [0, 1]
            ];
            allDirs.forEach(([dr, dc]) => {
                let step = 1;
                while (addMoveIfValid(r + dr * step, c + dc * step)) {
                    step++;
                }
            });
        } else if (type === 'K') {
            const kingDirs = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],           [0, 1],
                [1, -1],  [1, 0],  [1, 1]
            ];
            kingDirs.forEach(([dr, dc]) => addMoveIfValid(r + dr, c + dc));

            // Nhập thành (Castling)
            if (side === 'w' && r === 7 && c === 4 && !hasCastledOrMoved.wK) {
                // Nhập thành cánh Vua (Kingside O-O: e1 -> g1)
                if (!hasCastledOrMoved.wR_h && !bState[7][5] && !bState[7][6] && bState[7][7] === 'wR') {
                    if (!isSquareAttacked(7, 4, 'b', bState) && !isSquareAttacked(7, 5, 'b', bState) && !isSquareAttacked(7, 6, 'b', bState)) {
                        moves.push({ fromR: 7, fromC: 4, toR: 7, toC: 6, isCastling: 'K' });
                    }
                }
                // Nhập thành cánh Hậu (Queenside O-O-O: e1 -> c1)
                if (!hasCastledOrMoved.wR_a && !bState[7][3] && !bState[7][2] && !bState[7][1] && bState[7][0] === 'wR') {
                    if (!isSquareAttacked(7, 4, 'b', bState) && !isSquareAttacked(7, 3, 'b', bState) && !isSquareAttacked(7, 2, 'b', bState)) {
                        moves.push({ fromR: 7, fromC: 4, toR: 7, toC: 2, isCastling: 'Q' });
                    }
                }
            } else if (side === 'b' && r === 0 && c === 4 && !hasCastledOrMoved.bK) {
                // Nhập thành đen cánh Vua (O-O: e8 -> g8)
                if (!hasCastledOrMoved.bR_h && !bState[0][5] && !bState[0][6] && bState[0][7] === 'bR') {
                    if (!isSquareAttacked(0, 4, 'w', bState) && !isSquareAttacked(0, 5, 'w', bState) && !isSquareAttacked(0, 6, 'w', bState)) {
                        moves.push({ fromR: 0, fromC: 4, toR: 0, toC: 6, isCastling: 'K' });
                    }
                }
                // Nhập thành đen cánh Hậu (O-O-O: e8 -> c8)
                if (!hasCastledOrMoved.bR_a && !bState[0][3] && !bState[0][2] && !bState[0][1] && bState[0][0] === 'bR') {
                    if (!isSquareAttacked(0, 4, 'w', bState) && !isSquareAttacked(0, 3, 'w', bState) && !isSquareAttacked(0, 2, 'w', bState)) {
                        moves.push({ fromR: 0, fromC: 4, toR: 0, toC: 2, isCastling: 'Q' });
                    }
                }
            }
        }

        return moves;
    }

    /**
     * KIỂM TRA Ô CỜ CÓ BỊ TẤN CÔNG BỞI PHE ĐỐI PHƯƠNG KHÔNG
     */
    function isSquareAttacked(sqR, sqC, bySide, bState) {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = bState[r][c];
                if (piece && piece[0] === bySide) {
                    const type = piece[1];

                    // Tốt tấn công
                    if (type === 'P') {
                        const dir = bySide === 'w' ? -1 : 1;
                        if (r + dir === sqR && (c - 1 === sqC || c + 1 === sqC)) {
                            return true;
                        }
                    } else if (type === 'N') {
                        const nDeltas = [
                            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
                            [1, -2], [1, 2], [2, -1], [2, 1]
                        ];
                        for (const [dr, dc] of nDeltas) {
                            if (r + dr === sqR && c + dc === sqC) return true;
                        }
                    } else if (type === 'K') {
                        if (Math.abs(r - sqR) <= 1 && Math.abs(c - sqC) <= 1) return true;
                    } else {
                        // B, R, Q: Trượt
                        let dirs = [];
                        if (type === 'B' || type === 'Q') dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
                        if (type === 'R' || type === 'Q') dirs.push([-1, 0], [1, 0], [0, -1], [0, 1]);

                        for (const [dr, dc] of dirs) {
                            let step = 1;
                            while (true) {
                                const tr = r + dr * step;
                                const tc = c + dc * step;
                                if (tr < 0 || tr >= 8 || tc < 0 || tc >= 8) break;
                                if (tr === sqR && tc === sqC) return true;
                                if (bState[tr][tc]) break; // Bị cản
                                step++;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    /**
     * TÌM VỊ TRÍ VUA CỦA MỘT PHE
     */
    function findKing(side, bState) {
        const target = side + 'K';
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (bState[r][c] === target) return {
        resetScores: resetChessScores,
        resetBrain: () => ChessBrain.reset(), r, c };
            }
        }
        return null;
    }

    /**
     * KIỂM TRA PHE ĐANG BỊ CHIẾU TƯỚNG KHÔNG
     */
    function isInCheck(side, bState) {
        const kPos = findKing(side, bState);
        if (!kPos) return false;
        const enemy = side === 'w' ? 'b' : 'w';
        return isSquareAttacked(kPos.r, kPos.c, enemy, bState);
    }

    /**
     * LỌC NƯỚC ĐI HỢP LỆ (LOẠI BỎ CÁC NƯỚC KHIẾN VUA BỊ CHIẾU)
     */
    function getLegalMoves(r, c, bState) {
        const raw = getRawMoves(r, c, bState);
        const legal = [];
        const piece = bState[r][c];
        if (!piece) return [];
        const side = piece[0];

        raw.forEach(m => {
            // Giả lập nước đi
            const simulatedBoard = bState.map(row => [...row]);
            simulatedBoard[m.toR][m.toC] = simulatedBoard[m.fromR][m.fromC];
            simulatedBoard[m.fromR][m.fromC] = null;

            if (m.isEnPassant) {
                // Xóa con tốt bị ăn qua đường
                const pawnR = m.fromR;
                const pawnC = m.toC;
                simulatedBoard[pawnR][pawnC] = null;
            }

            if (!isInCheck(side, simulatedBoard)) {
                legal.push(m);
            }
        });

        return legal;
    }

    /**
     * LẤY TOÀN BỘ NƯỚC ĐI HỢP LỆ CỦA MỘT PHE
     */
    function getAllLegalMoves(side, bState) {
        const allMoves = [];
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (bState[r][c] && bState[r][c][0] === side) {
                    const pieceLegal = getLegalMoves(r, c, bState);
                    pieceLegal.forEach(m => allMoves.push(m));
                }
            }
        }
        return allMoves;
    }

    /**
     * THỰC HIỆN NƯỚC ĐI
     */
    function makeMove(m, promotionChoice = 'Q') {
        const movingPiece = board[m.fromR][m.fromC];
        const side = movingPiece[0];
        const type = movingPiece[1];

        let notation = '';
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

        // Ghi nhận ăn quân
        if (m.isCapture) {
            const captured = m.captured || board[m.toR][m.toC] || (m.isEnPassant ? (side === 'w' ? 'bP' : 'wP') : null);
            if (captured) {
                capturedPieces[captured[0]].push(captured[1]);
            }
        }

        // Cập nhật bàn cờ
        board[m.toR][m.toC] = movingPiece;
        board[m.fromR][m.fromC] = null;

        // Xử lý En Passant
        if (m.isEnPassant) {
            board[m.fromR][m.toC] = null;
        }

        // Xử lý Nhập Thành
        if (m.isCastling === 'K') {
            notation = 'O-O';
            if (side === 'w') {
                board[7][5] = 'wR';
                board[7][7] = null;
            } else {
                board[0][5] = 'bR';
                board[0][7] = null;
            }
        } else if (m.isCastling === 'Q') {
            notation = 'O-O-O';
            if (side === 'w') {
                board[7][3] = 'wR';
                board[7][0] = null;
            } else {
                board[0][3] = 'bR';
                board[0][0] = null;
            }
        }

        // Xử lý Phong Cấp Tốt
        if (m.isPromo) {
            board[m.toR][m.toC] = side + promotionChoice;
        }

        // Cập nhật cờ nhập thành
        if (movingPiece === 'wK') hasCastledOrMoved.wK = true;
        if (movingPiece === 'bK') hasCastledOrMoved.bK = true;
        if (m.fromR === 7 && m.fromC === 0) hasCastledOrMoved.wR_a = true;
        if (m.fromR === 7 && m.fromC === 7) hasCastledOrMoved.wR_h = true;
        if (m.fromR === 0 && m.fromC === 0) hasCastledOrMoved.bR_a = true;
        if (m.fromR === 0 && m.fromC === 7) hasCastledOrMoved.bR_h = true;

        // Cập nhật En Passant target
        if (m.isPawnDouble) {
            enPassantTarget = { r: (m.fromR + m.toR) / 2, c: m.fromC };
        } else {
            enPassantTarget = null;
        }

        // Tạo ký hiệu cờ SAN
        if (!notation) {
            const pieceChar = type === 'P' ? '' : type;
            const captureChar = m.isCapture ? (type === 'P' ? files[m.fromC] + 'x' : 'x') : '';
            const dest = files[m.toC] + ranks[m.toR];
            const promoChar = m.isPromo ? '=' + promotionChoice : '';
            notation = pieceChar + captureChar + dest + promoChar;
        }

        // Đổi lượt
        const nextSide = side === 'w' ? 'b' : 'w';
        turn = nextSide;
        selectedSq = null;
        validMoves = [];

        // Kiểm tra chiếu / chiếu bí
        const inCheckNow = isInCheck(nextSide, board);
        const nextLegalMoves = getAllLegalMoves(nextSide, board);

        if (inCheckNow) {
            if (nextLegalMoves.length === 0) {
                // Chiếu bí (Checkmate)
                notation += '#';
                isGameOver = true;
                if (side === 'w') chessScores.white++;
                else chessScores.black++;
                saveChessScores();
                updateChessScoreUI();
                if (gameMode === 'ai') {
                    ChessBrain.learnFromGame(side, moveHistory);
                }
                playSound('win');
                showBanner(`Chiếu bí! ${side === 'w' ? 'Bên Trắng' : 'Bên Đen'} đã giành chiến thắng xuất sắc! 👑`, 'win');
            } else {
                // Chiếu tướng
                notation += '+';
                playSound('check');
                showBanner(`Chiếu tướng! ${nextSide === 'w' ? 'Vua Trắng' : 'Vua Đen'} đang bị uy hiếp!`, 'check');
            }
        } else if (nextLegalMoves.length === 0) {
            // Hòa cờ do hết nước đi (Stalemate)
            isGameOver = true;
            playSound('move');
            showBanner(`Hòa cờ (Stalemate)! ${nextSide === 'w' ? 'Bên Trắng' : 'Bên Đen'} không còn nước đi hợp lệ.`, 'draw');
        } else {
            if (m.isCapture) playSound('capture');
            else playSound('move');
            hideBanner();
        }

        // Lưu lịch sử
        moveHistory.push({
            notation,
            side,
            from: { r: m.fromR, c: m.fromC },
            to: { r: m.toR, c: m.toC }
        });

        renderBoard();
        updateUI();

        // Gửi qua P2P nếu đang ở chế độ 2 người
        if (gameMode === 'p2p' && window.CoupleNetwork && window.CoupleNetwork.isConnected()) {
            window.CoupleNetwork.send({
                type: 'chess_move',
                move: m,
                promotionChoice
            });
        }

        // Nếu chế độ AI và tới lượt Đen
        if (!isGameOver && gameMode === 'ai' && turn === 'b') {
            setTimeout(triggerAIMove, 350);
        }
    }

    /**
     * BỘ NÃO ĐỘNG CƠ AI MINIMAX & ALPHA-BETA
     */
    function evaluateBoard(bState) {
        let score = 0;
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = bState[r][c];
                if (piece) {
                    const side = piece[0];
                    const type = piece[1];
                    let val = PIECE_VALUES[type];

                    // Cộng thêm điểm bảng vị trí (PST)
                    const pstRow = side === 'w' ? r : (7 - r);
                    const pstTable = PST[type];
                    if (pstTable) {
                        val += pstTable[pstRow][c];
                    }

                    if (side === 'w') score += val;
                    else score -= val;
                }
            }
        }
        return score;
    }

    function minimax(bState, depth, alpha, beta, isMaximizing) {
        if (depth === 0) {
            return evaluateBoard(bState);
        }

        const currentSide = isMaximizing ? 'w' : 'b';
        const legalMoves = getAllLegalMoves(currentSide, bState);

        if (legalMoves.length === 0) {
            if (isInCheck(currentSide, bState)) {
                return isMaximizing ? -99999 : 99999;
            }
            return 0; // Stalemate
        }

        // Sắp xếp ưu tiên ăn quân để tăng tốc alpha-beta
        legalMoves.sort((a, b) => (b.isCapture ? 1 : 0) - (a.isCapture ? 1 : 0));

        if (isMaximizing) {
            let maxEval = -Infinity;
            for (const m of legalMoves) {
                const sim = bState.map(row => [...row]);
                sim[m.toR][m.toC] = m.isPromo ? 'wQ' : sim[m.fromR][m.fromC];
                sim[m.fromR][m.fromC] = null;
                const ev = minimax(sim, depth - 1, alpha, beta, false);
                maxEval = Math.max(maxEval, ev);
                alpha = Math.max(alpha, ev);
                if (beta <= alpha) break;
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (const m of legalMoves) {
                const sim = bState.map(row => [...row]);
                sim[m.toR][m.toC] = m.isPromo ? 'bQ' : sim[m.fromR][m.fromC];
                sim[m.fromR][m.fromC] = null;
                const ev = minimax(sim, depth - 1, alpha, beta, true);
                minEval = Math.min(minEval, ev);
                beta = Math.min(beta, ev);
                if (beta <= alpha) break;
            }
            return minEval;
        }
    }

    function triggerAIMove() {
        if (isGameOver || turn !== 'b') return;

        const legalMoves = getAllLegalMoves('b', board);
        if (legalMoves.length === 0) return;

        let bestMove = null;
        let bestScore = Infinity;

        // Xác định độ sâu tìm kiếm theo ELO
        let depth = 2;
        if (currentElo <= 800) depth = 1;
        else if (currentElo <= 1200) depth = 2;
        else if (currentElo <= 1600) depth = 3;
        else depth = 3; // 4 nếu máy nhanh

        // Với ELO 800, đôi khi chọn ngẫu nhiên
        if (currentElo <= 800 && Math.random() < 0.35) {
            bestMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
        } else {
            for (const m of legalMoves) {
                const sim = board.map(row => [...row]);
                sim[m.toR][m.toC] = m.isPromo ? 'bQ' : sim[m.fromR][m.fromC];
                sim[m.fromR][m.fromC] = null;

                let score = minimax(sim, depth - 1, -Infinity, Infinity, true);
                const learnedBonus = ChessBrain.getMoveBonus(m);
                score -= learnedBonus; // Bên Đen tối thiểu hóa điểm

                // Thêm chút ngẫu nhiên nhỏ theo ELO để các ván không lặp lại hoàn toàn
                if (currentElo <= 1200) {
                    score += (Math.random() * 20 - 10);
                }

                if (score < bestScore) {
                    bestScore = score;
                    bestMove = m;
                }
            }
        }

        if (bestMove) {
            makeMove(bestMove, 'Q');
        }
    }

    /**
     * TƯƠNG TÁC GIAO DIỆN
     */
    function onCellClick(r, c) {
        if (isGameOver) return;
        if (gameMode === 'ai' && turn === 'b') return;

        const piece = board[r][c];

        // Nếu đã chọn 1 ô trước đó
        if (selectedSq) {
            const move = validMoves.find(m => m.toR === r && m.toC === c);
            if (move) {
                // Kiểm tra nếu là phong cấp tốt
                if (move.isPromo) {
                    pendingPromotion = move;
                    showPromotionModal(piece ? piece[0] : turn);
                    return;
                }
                makeMove(move);
                return;
            }
        }

        // Chọn quân mới của phe hiện tại
        if (piece && piece[0] === turn) {
            selectedSq = { r, c };
            validMoves = getLegalMoves(r, c, board);
            renderBoard();
        } else {
            selectedSq = null;
            validMoves = [];
            renderBoard();
        }
    }

    function showPromotionModal(side) {
        const modal = document.getElementById('chessPromotionModal');
        const choicesEl = document.getElementById('chessPromotionChoices');
        if (!modal || !choicesEl) {
            // Fallback nếu không có modal
            if (pendingPromotion) {
                makeMove(pendingPromotion, 'Q');
                pendingPromotion = null;
            }
            return;
        }

        const pieces = ['Q', 'R', 'B', 'N'];
        const names = { Q: 'Hậu', R: 'Xe', B: 'Tượng', N: 'Mã' };
        choicesEl.innerHTML = '';

        pieces.forEach(p => {
            const btn = document.createElement('button');
            btn.className = 'chess-promo-btn';
            btn.type = 'button';
            btn.innerHTML = `
                <div style="width:40px;height:40px;">${getPieceSVG(side, p)}</div>
                <span>${names[p]}</span>
            `;
            btn.addEventListener('click', () => {
                modal.classList.remove('active');
                if (pendingPromotion) {
                    makeMove(pendingPromotion, p);
                    pendingPromotion = null;
                }
            });
            choicesEl.appendChild(btn);
        });

        modal.classList.add('active');
    }

    function undoMove() {
        if (moveHistory.length === 0 || isGameOver) return;
        // Nếu chơi với AI, đi lại 2 nước (nước của AI + nước của người)
        const undoCount = (gameMode === 'ai' && moveHistory.length >= 2) ? 2 : 1;
        for (let i = 0; i < undoCount; i++) {
            moveHistory.pop();
        }

        // Tái tạo lại bàn cờ từ đầu theo lịch sử
        board = createInitialBoard();
        turn = 'w';
        capturedPieces = { w: [], b: [] };
        hasCastledOrMoved = {
            wK: false, wR_a: false, wR_h: false,
            bK: false, bR_a: false, bR_h: false
        };
        enPassantTarget = null;
        isGameOver = false;

        // Đi lại các nước trong lịch sử
        const histCopy = [...moveHistory];
        moveHistory = [];
        histCopy.forEach(h => {
            const rawMoves = getRawMoves(h.from.r, h.from.c, board);
            const m = rawMoves.find(rm => rm.toR === h.to.r && rm.toC === h.to.c) || {
                fromR: h.from.r, fromC: h.from.c, toR: h.to.r, toC: h.to.c
            };
            // Phục hồi phong cấp nếu có
            let promoChoice = 'Q';
            if (h.notation.includes('=')) {
                promoChoice = h.notation.split('=')[1][0];
            }
            makeMove(m, promoChoice);
        });

        renderBoard();
        updateUI();
        hideBanner();
    }

    /**
     * VẼ BÀN CỜ 8x8 LÊN DOM
     */
    function renderBoard() {
        const boardEl = document.getElementById('chessBoardGrid');
        if (!boardEl) return;

        boardEl.innerHTML = '';
        const lastMove = moveHistory.length > 0 ? moveHistory[moveHistory.length - 1] : null;
        const kingInCheckPos = isInCheck(turn, board) ? findKing(turn, board) : null;

        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

        for (let rowIdx = 0; rowIdx < 8; rowIdx++) {
            for (let colIdx = 0; colIdx < 8; colIdx++) {
                const r = isBoardFlipped ? (7 - rowIdx) : rowIdx;
                const c = isBoardFlipped ? (7 - colIdx) : colIdx;

                const cell = document.createElement('div');
                cell.id = "chessCell_" + r + "_" + c;
                cell.dataset.r = r;
                cell.dataset.c = c;
                const isLight = (r + c) % 2 === 0;
                cell.className = `chess-cell ${isLight ? 'light' : 'dark'}`;

                // Tọa độ
                if (c === (isBoardFlipped ? 7 : 0)) {
                    const rankLabel = document.createElement('span');
                    rankLabel.className = 'chess-coord-rank';
                    rankLabel.textContent = ranks[r];
                    cell.appendChild(rankLabel);
                }
                if (r === (isBoardFlipped ? 0 : 7)) {
                    const fileLabel = document.createElement('span');
                    fileLabel.className = 'chess-coord-file';
                    fileLabel.textContent = files[c];
                    cell.appendChild(fileLabel);
                }

                // Highlight ô đang chọn
                if (selectedSq && selectedSq.r === r && selectedSq.c === c) {
                    cell.classList.add('selected');
                }

                // Highlight nước đi gần nhất
                if (lastMove && ((lastMove.from.r === r && lastMove.from.c === c) || (lastMove.to.r === r && lastMove.to.c === c))) {
                    cell.classList.add('last-move');
                }

                // Highlight vua bị chiếu
                if (kingInCheckPos && kingInCheckPos.r === r && kingInCheckPos.c === c) {
                    cell.classList.add('in-check');
                }

                // Gợi ý nước đi
                const isHint = validMoves.some(m => m.toR === r && m.toC === c);
                if (isHint) {
                    const targetPiece = board[r][c];
                    const isCapture = !!targetPiece || (selectedSq && board[selectedSq.r][selectedSq.c][1] === 'P' && enPassantTarget && enPassantTarget.r === r && enPassantTarget.c === c);
                    if (isCapture) {
                        const capHint = document.createElement('div');
                        capHint.className = 'chess-capture-hint';
                        cell.appendChild(capHint);
                    } else {
                        const hintDot = document.createElement('div');
                        hintDot.className = 'chess-move-hint';
                        cell.appendChild(hintDot);
                    }
                }

                // Vẽ quân cờ
                const piece = board[r][c];
                if (piece) {
                    const pieceWrap = document.createElement('div');
                    pieceWrap.className = 'chess-piece-wrapper';
                    pieceWrap.innerHTML = getPieceSVG(piece[0], piece[1]);
                    cell.appendChild(pieceWrap);
                }

                cell.addEventListener('click', () => onCellClick(r, c));
                boardEl.appendChild(cell);
            }
        }
    }

    /**
     * CẬP NHẬT GIAO DIỆN PHỤ TRỢ (LƯỢT ĐI, QUÂN BỊ BẮT, NHẬT KÝ)
     */
    function updateUI() {
        // Cập nhật lượt đi
        const turnBadge = document.getElementById('chessTurnBadge');
        const turnText = document.getElementById('chessTurnText');
        if (turnBadge && turnText) {
            turnBadge.className = `chess-turn-badge ${turn === 'w' ? 'white' : 'black'}`;
            if (turn === 'w') {
                turnText.textContent = 'Lượt đi: Trắng (Huy)';
            } else {
                const blackName = gameMode === 'ai' ? 'Máy (AI)' : 'Đen (Hiền)';
                turnText.textContent = `Lượt đi: ${blackName}`;
            }
        }

        // Cập nhật khay quân bị bắt
        const trayW = document.getElementById('chessCapturedWhite');
        const trayB = document.getElementById('chessCapturedBlack');
        if (trayW) {
            trayW.innerHTML = capturedPieces.w.map(p => `<div class="chess-captured-mini">${getPieceSVG('w', p)}</div>`).join('');
        }
        if (trayB) {
            trayB.innerHTML = capturedPieces.b.map(p => `<div class="chess-captured-mini">${getPieceSVG('b', p)}</div>`).join('');
        }

        // Cập nhật bảng nhật ký nước đi
        const logBody = document.getElementById('chessMovesTableBody');
        if (logBody) {
            logBody.innerHTML = '';
            if (moveHistory.length === 0) {
                const tr = document.createElement('tr');
                tr.innerHTML = '<td colspan="3" style="text-align: center; color: #a8a29e; font-weight: 500; font-family: inherit; font-size: 11.5px; padding: 24px 0;">Chưa có nước đi nào</td>';
                logBody.appendChild(tr);
            } else {
                for (let i = 0; i < moveHistory.length; i += 2) {
                    const moveNum = Math.floor(i / 2) + 1;
                    const whiteMove = moveHistory[i] ? moveHistory[i].notation : '';
                    const blackMove = moveHistory[i + 1] ? moveHistory[i + 1].notation : '';
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td style="color:#a8a29e; width: 35px;">${moveNum}.</td>
                        <td>${whiteMove}</td>
                        <td>${blackMove}</td>
                    `;
                    logBody.appendChild(tr);
                }
            }
            const scrollContainer = document.getElementById('chessMovesScroll');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
            // Khóa cuộn màn hình tuyệt đối, ngăn nhảy layout
            if (window.scrollY !== 0) window.scrollTo(0, 0);
            const mainEl = document.querySelector('.games-main-container');
            if (mainEl && mainEl.scrollTop !== 0) mainEl.scrollTop = 0;
            const panelEl = document.getElementById('viewChess');
            if (panelEl && panelEl.scrollTop !== 0) panelEl.scrollTop = 0;
        }
    }

    function showBanner(text, type = 'check') {
        const b = document.getElementById('chessNoticeBanner');
        if (!b) return;
        b.textContent = text;
        b.className = `chess-notice-banner active ${type}`;
    }

    function hideBanner() {
        const b = document.getElementById('chessNoticeBanner');
        if (!b) return;
        b.className = 'chess-notice-banner';
    }

    /**
     * KHỞI TẠO EVENT LISTENERS
     */
    
    let chessScores = { white: 0, black: 0, draws: 0 };

    const ChessBrain = {
        STORAGE_KEY: 'couple_chess_brain_memory_v2',
        memory: null,

        init() {
            if (!this.memory) this.load();
            this.updateUI();
        },

        load() {
            try {
                const raw = localStorage.getItem(this.STORAGE_KEY);
                if (raw) this.memory = JSON.parse(raw);
            } catch (e) {}
            if (!this.memory) {
                this.memory = {
                    version: 2,
                    totalGamesLearned: 0,
                    openings: {}
                };
            }
        },

        save() {
            try {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.memory));
                this.updateUI();
            } catch (e) {}
        },

        reset() {
            this.memory = { version: 2, totalGamesLearned: 0, openings: {} };
            this.save();
        },

        learnFromGame(winnerSide, history) {
            if (!history || history.length < 2) return;
            this.memory.totalGamesLearned++;
            history.slice(0, 10).forEach(entry => {
                if (entry && entry.from && entry.to) {
                    const key = `${entry.from.r},${entry.from.c}->${entry.to.r},${entry.to.c}`;
                    this.memory.openings[key] = (this.memory.openings[key] || 0) + (entry.side === 'b' ? 30 : 15);
                }
            });
            this.save();
        },

        getMoveBonus(m) {
            if (!this.memory || !this.memory.openings) return 0;
            const key = `${m.fromR},${m.fromC}->${m.toR},${m.toC}`;
            return (this.memory.openings[key] || 0);
        },

        updateUI() {
            const countEl = document.getElementById('chessBrainLearnedCount');
            if (countEl && this.memory) {
                countEl.textContent = `${this.memory.totalGamesLearned || 0} ván kinh nghiệm`;
            }
        }
    };

    function loadChessScores() {
        try {
            const raw = localStorage.getItem('couple_chess_scores_v2');
            if (raw) chessScores = JSON.parse(raw);
        } catch (e) {}
    }

    function saveChessScores() {
        try {
            localStorage.setItem('couple_chess_scores_v2', JSON.stringify(chessScores));
        } catch (e) {}
    }

    function resetChessScores() {
        chessScores = { white: 0, black: 0, draws: 0 };
        saveChessScores();
        updateChessScoreUI();
        showBanner('✨ Đã đặt lại bảng tỷ số Cờ Vua về 0 - 0!', 'info');
    }

    function updateChessScoreUI() {
        const elW = document.getElementById('chessScoreWhite');
        const elB = document.getElementById('chessScoreBlack');
        if (elW) elW.textContent = chessScores.white;
        if (elB) elB.textContent = chessScores.black;
        ChessBrain.updateUI();
    }

    function init() {
        // Tab chọn chế độ
        document.querySelectorAll('.chess-mode-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.chess-mode-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                gameMode = tab.getAttribute('data-mode');

                const eloGroup = document.getElementById('chessEloSelectorGroup');
                if (eloGroup) {
                    eloGroup.style.display = (gameMode === 'ai') ? 'flex' : 'none';
                }
                resetGame();
            });
        });

        // Tab chọn ELO
        document.querySelectorAll('.chess-elo-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.chess-elo-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentElo = parseInt(tab.getAttribute('data-elo'), 10) || 1200;
                resetGame();
            });
        });

        // Nút Ván mới
        const btnResetScore = document.getElementById('btnChessResetScore');
        if (btnResetScore) {
            btnResetScore.addEventListener('click', () => {
                if (confirm('Bạn có chắc muốn đặt lại tỷ số đối đầu Cờ Vua về 0 - 0?')) {
                    resetChessScores();
                }
            });
        }

        const btnResetBrain = document.getElementById('btnChessResetBrain');
        if (btnResetBrain) {
            btnResetBrain.addEventListener('click', () => {
                if (confirm('Bạn có muốn xóa trí nhớ AI Cờ Vua để học lại từ đầu?')) {
                    ChessBrain.reset();
                    showBanner('🧠 Đã đặt lại bộ não AI Cờ Vua về ban đầu!', 'info');
                }
            });
        }

        const btnNew = document.getElementById('chessBtnNewGame');
        if (btnNew) btnNew.addEventListener('click', resetGame);

        // Nút Đi lại (Undo)
        const btnUndo = document.getElementById('chessBtnUndo');
        if (btnUndo) btnUndo.addEventListener('click', undoMove);

        // Nút Lật bàn cờ
        const btnFlip = document.getElementById('chessBtnFlip');
        if (btnFlip) {
            btnFlip.addEventListener('click', () => {
                isBoardFlipped = !isBoardFlipped;
                renderBoard();
            });
        }

        // Lắng nghe gói tin P2P từ CoupleNetwork
        if (window.CoupleNetwork && typeof window.CoupleNetwork.onMessage === 'function') {
            window.CoupleNetwork.onMessage((packet) => {
                if (!packet || typeof packet !== 'object') return;
                if (gameMode === 'p2p' && packet.type === 'chess_move' && packet.move) {
                    makeMove(packet.move, packet.promotionChoice || 'Q');
                } else if (gameMode === 'p2p' && packet.type === 'chess_reset') {
                    resetGame();
                }
            });
        }

        resetGame();
    }

    return {
        resetScores: resetChessScores,
        resetBrain: () => ChessBrain.reset(),
        init,
        resetGame,
        undoMove,
        getPieceSVG
    };
})();
