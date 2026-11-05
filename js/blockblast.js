/**
 * ========================================================
 * BLOCK BLAST ENGINE - THIẾT KẾ MỚI TINH GIẢN & ĐỐI KHÁNG THỜI GIAN THỰC
 * 1. Chế độ 1: Xếp Gạch Tự Do (Puzzle Mode) - Lưới 8x8 & khay 3 khối
 * 2. Chế độ 2: Gạch Tự Rơi (Falling / Tetris Mode) - Điều khiển phím mũi tên & cụm phím ảo
 * 3. Chế độ Đối Kháng (VS Mode): Thi đua điểm số, đồng bộ bàn chơi người yêu thời gian thực,
 *    kích nổ gửi gạch rác (Garbage Attack) & Partner AI thông minh khi đối phương chưa online!
 * 4. Bảng màu Pastel hài hòa trang nhã, loại bỏ màu sặc sỡ và chi tiết rườm rà
 * ========================================================
 */

window.BlockBlast = (function () {
    'use strict';

    // 1. BẢNG MÀU PASTEL TRANG NHÃ - ĐỒNG BỘ TUYỆT ĐỐI THEME WEBSITE
    const PASTEL_PALETTE = {
        terracotta: { bg: 'linear-gradient(135deg, #e07a5f 0%, #c46247 100%)', border: '#e88f78', hex: '#e07a5f' },
        sage:       { bg: 'linear-gradient(135deg, #81b29a 0%, #689981 100%)', border: '#9fc2af', hex: '#81b29a' },
        caramel:    { bg: 'linear-gradient(135deg, #f2cc8f 0%, #d8b275 100%)', border: '#fae0b5', hex: '#f2cc8f' },
        slate:      { bg: 'linear-gradient(135deg, #5c677d 0%, #475166 100%)', border: '#78849e', hex: '#5c677d' },
        mauve:      { bg: 'linear-gradient(135deg, #a38995 0%, #876e7a 100%)', border: '#baa3ad', hex: '#a38995' },
        peach:      { bg: 'linear-gradient(135deg, #f4a261 0%, #db8644 100%)', border: '#f7b988', hex: '#f4a261' },
        teal:       { bg: 'linear-gradient(135deg, #6096ba 0%, #467b9e 100%)', border: '#7fb0d1', hex: '#6096ba' },
        clay:       { bg: 'linear-gradient(135deg, #ba7c70 0%, #9e6459 100%)', border: '#d1988d', hex: '#ba7c70' },
        garbage:    { bg: 'linear-gradient(135deg, #8a8d91 0%, #6c6f73 100%)', border: '#a5a8ad', hex: '#8a8d91' }
    };

    // 2. DANH MỤC KHỐI XẾP TỰ DO (PUZZLE)
    const PUZZLE_SHAPES = [
        { name: 'dot', matrix: [[1]], color: 'caramel' },
        { name: 'h2', matrix: [[1, 1]], color: 'teal' },
        { name: 'v2', matrix: [[1], [1]], color: 'teal' },
        { name: 'h3', matrix: [[1, 1, 1]], color: 'sage' },
        { name: 'v3', matrix: [[1], [1], [1]], color: 'sage' },
        { name: 'corner_tl', matrix: [[1, 1], [1, 0]], color: 'peach' },
        { name: 'corner_tr', matrix: [[1, 1], [0, 1]], color: 'peach' },
        { name: 'corner_bl', matrix: [[1, 0], [1, 1]], color: 'peach' },
        { name: 'corner_br', matrix: [[0, 1], [1, 1]], color: 'peach' },
        { name: 'square2x2', matrix: [[1, 1], [1, 1]], color: 'terracotta' },
        { name: 'h4', matrix: [[1, 1, 1, 1]], color: 'slate' },
        { name: 'v4', matrix: [[1], [1], [1], [1]], color: 'slate' },
        { name: 'L_up', matrix: [[1, 0], [1, 0], [1, 1]], color: 'mauve' },
        { name: 'L_down', matrix: [[1, 1], [0, 1], [0, 1]], color: 'mauve' },
        { name: 'J_up', matrix: [[0, 1], [0, 1], [1, 1]], color: 'mauve' },
        { name: 'J_down', matrix: [[1, 1], [1, 0], [1, 0]], color: 'mauve' },
        { name: 'T_up', matrix: [[1, 1, 1], [0, 1, 0]], color: 'clay' },
        { name: 'T_down', matrix: [[0, 1, 0], [1, 1, 1]], color: 'clay' },
        { name: 'Z_h', matrix: [[1, 1, 0], [0, 1, 1]], color: 'peach' },
        { name: 'S_h', matrix: [[0, 1, 1], [1, 1, 0]], color: 'peach' },
        { name: 'plus5', matrix: [[0, 1, 0], [1, 1, 1], [0, 1, 0]], color: 'terracotta' }
    ];

    // 3. DANH MỤC KHỐI GẠCH RƠI (TETRIS)
    const TETROMINOES = [
        { name: 'I', matrix: [[1, 1, 1, 1]], color: 'teal' },
        { name: 'O', matrix: [[1, 1], [1, 1]], color: 'caramel' },
        { name: 'T', matrix: [[0, 1, 0], [1, 1, 1]], color: 'mauve' },
        { name: 'S', matrix: [[0, 1, 1], [1, 1, 0]], color: 'sage' },
        { name: 'Z', matrix: [[1, 1, 0], [0, 1, 1]], color: 'terracotta' },
        { name: 'J', matrix: [[1, 0, 0], [1, 1, 1]], color: 'slate' },
        { name: 'L', matrix: [[0, 0, 1], [1, 1, 1]], color: 'peach' }
    ];

    // TRẠNG THÁI GAME
    const state = {
        // Cấu hình chế độ
        mode: 'puzzle',       // 'puzzle' (tự xếp 8x8) hoặc 'falling' (gạch tự rơi 10x16)
        matchMode: 'solo',    // 'solo' hoặc 'vs' (đối kháng)
        isGameOver: false,
        soundEnabled: true,

        // Dữ liệu bàn chơi chính của người dùng
        score: 0,
        highScore: 0,
        comboCount: 0,
        maxCombo: 0,
        linesCleared: 0,

        // Bàn chơi Puzzle (8x8)
        puzzleGrid: Array(8).fill(null).map(() => Array(8).fill(null)),
        tray: [null, null, null],
        selectedSlot: null,
        drag: { active: false, slotIndex: null, piece: null, cloneEl: null, touchYOffset: 65 },

        // Bàn chơi Falling (10x16)
        fallRows: 16,
        fallCols: 10,
        fallGrid: Array(16).fill(null).map(() => Array(10).fill(null)),
        currentPiece: null,   // { matrix, color, r, c }
        nextPiece: null,
        fallSpeed: 650,       // ms mỗi bước rơi
        fallTimer: null,
        isSoftDrop: false,

        // Bàn chơi Đối Kháng (Đối phương: Live hoặc AI)
        partner: {
            name: 'Người Yêu',
            score: 0,
            combo: 0,
            grid: Array(8).fill(null).map(() => Array(8).fill(null)),
            isAi: true,
            aiTimer: null,
            wins: 0
        },
        myWins: 0
    };

    // 4. ÂM THANH TINH TẾ (WEB AUDIO API)
    class SubtleAudio {
        constructor() { this.ctx = null; }
        init() {
            if (!this.ctx) {
                const AC = window.AudioContext || window.webkitAudioContext;
                if (AC) this.ctx = new AC();
            }
            if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
        }
        play(freq, type = 'sine', duration = 0.08, gainVal = 0.12) {
            if (!state.soundEnabled) return;
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        }
        pop() { this.play(360, 'sine', 0.06, 0.12); }
        place() { this.play(160, 'triangle', 0.08, 0.16); }
        rotate() { this.play(440, 'sine', 0.05, 0.1); }
        blast() {
            this.play(523, 'sine', 0.2, 0.15);
            setTimeout(() => this.play(659, 'sine', 0.22, 0.15), 50);
            setTimeout(() => this.play(784, 'sine', 0.25, 0.15), 100);
        }
        attack() {
            this.play(220, 'sawtooth', 0.18, 0.15);
            setTimeout(() => this.play(330, 'triangle', 0.2, 0.15), 70);
        }
        gameOver() {
            this.play(330, 'sine', 0.2, 0.15);
            setTimeout(() => this.play(261, 'sine', 0.3, 0.15), 150);
        }
    }
    const audio = new SubtleAudio();

    // 5. KHỞI TẠO VÀ CHUYỂN CHẾ ĐỘ
    function init() {
        // Tải điểm kỷ lục
        state.highScore = parseInt(localStorage.getItem('bb_best_score') || '0', 10);
        renderScores();

        // Gắn sự kiện chuyển đổi chế độ
        bindControlTabs();

        // Gắn sự kiện bàn phím cho chế độ Gạch Rơi
        bindKeyboardEvents();

        // Lắng nghe mạng đối kháng P2P
        if (window.CoupleNetwork) {
            window.CoupleNetwork.onMessage(handleNetworkMessage);
        }

        // Bắt đầu ván đầu tiên
        startCurrentMode();
    }

    function bindControlTabs() {
        // Mode Tabs: Tự Xếp vs Gạch Rơi
        const tabPuzzle = document.getElementById('bbTabModePuzzle');
        const tabFalling = document.getElementById('bbTabModeFalling');
        if (tabPuzzle) {
            tabPuzzle.addEventListener('click', () => switchPlayMode('puzzle'));
        }
        if (tabFalling) {
            tabFalling.addEventListener('click', () => switchPlayMode('falling'));
        }

        // Match Tabs: Solo vs Đối Kháng
        const tabSolo = document.getElementById('bbTabMatchSolo');
        const tabVs = document.getElementById('bbTabMatchVs');
        if (tabSolo) {
            tabSolo.addEventListener('click', () => switchMatchMode('solo'));
        }
        if (tabVs) {
            tabVs.addEventListener('click', () => switchMatchMode('vs'));
        }

        // Cụm phím ảo trên điện thoại (Virtual Touch D-Pad)
        bindVirtualDpad();
    }

    function switchPlayMode(newMode) {
        if (state.mode === newMode) return;
        state.mode = newMode;

        document.querySelectorAll('.bb-mode-pill').forEach(btn => {
            const active = btn.dataset.mode === newMode;
            btn.classList.toggle('active', active);
        });

        const puzzleArena = document.getElementById('bbPuzzleArena');
        const fallingArena = document.getElementById('bbFallingArena');
        const virtualPad = document.getElementById('bbVirtualPad');

        if (newMode === 'falling') {
            if (puzzleArena) puzzleArena.style.display = 'none';
            if (fallingArena) fallingArena.style.display = 'flex';
            if (virtualPad) virtualPad.style.display = 'flex';
        } else {
            if (fallingArena) fallingArena.style.display = 'none';
            if (puzzleArena) puzzleArena.style.display = 'flex';
            if (virtualPad) virtualPad.style.display = 'none';
        }

        restartGame();
    }

    function switchMatchMode(newMatch) {
        if (state.matchMode === newMatch) return;
        state.matchMode = newMatch;

        document.querySelectorAll('.bb-match-pill').forEach(btn => {
            const active = btn.dataset.match === newMatch;
            btn.classList.toggle('active', active);
        });

        const vsSidebar = document.getElementById('bbVsSidebar');
        if (vsSidebar) {
            vsSidebar.style.display = newMatch === 'vs' ? 'flex' : 'none';
        }

        if (newMatch === 'vs') {
            initVsOpponent();
        } else {
            stopPartnerAi();
        }

        restartGame();
    }

    // 6. LOGIC CHẾ ĐỘ 1: XẾP GẠCH TỰ DO (PUZZLE MODE 8x8)
    function initPuzzleMode() {
        state.puzzleGrid = Array(8).fill(null).map(() => Array(8).fill(null));
        state.tray = [null, null, null];
        state.selectedSlot = null;

        const boardEl = document.getElementById('bbPuzzleBoard');
        if (!boardEl) return;
        boardEl.innerHTML = '';

        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const cell = document.createElement('div');
                cell.className = 'bb-cell';
                cell.id = `pcell-${r}-${c}`;
                cell.dataset.r = r;
                cell.dataset.c = c;
                cell.addEventListener('click', () => handlePuzzleCellClick(r, c));
                boardEl.appendChild(cell);
            }
        }

        spawnPuzzlePieces();
    }

    function spawnPuzzlePieces() {
        for (let i = 0; i < 3; i++) {
            const shape = PUZZLE_SHAPES[Math.floor(Math.random() * PUZZLE_SHAPES.length)];
            state.tray[i] = {
                id: `p-${Date.now()}-${i}`,
                name: shape.name,
                matrix: shape.matrix,
                color: shape.color
            };
        }

        // Đảm bảo ít nhất 1 khối đặt vừa
        const anyFit = state.tray.some(p => p && canFitPuzzlePiece(p.matrix));
        if (!anyFit) {
            const savior = PUZZLE_SHAPES.find(s => canFitPuzzlePiece(s.matrix));
            if (savior) state.tray[0] = { id: `savior-${Date.now()}`, name: savior.name, matrix: savior.matrix, color: savior.color };
        }

        renderPuzzleTray();
        checkPuzzleGameOver();
    }

    function renderPuzzleTray() {
        for (let i = 0; i < 3; i++) {
            const slotEl = document.getElementById(`bbSlot-${i}`);
            if (!slotEl) continue;
            slotEl.innerHTML = '';

            const piece = state.tray[i];
            if (!piece) {
                slotEl.classList.add('empty');
                continue;
            }

            slotEl.classList.remove('empty');
            const pieceEl = document.createElement('div');
            pieceEl.className = `tray-piece ${state.selectedSlot === i ? 'selected' : ''}`;
            pieceEl.style.gridTemplateRows = `repeat(${piece.matrix.length}, 1fr)`;
            pieceEl.style.gridTemplateColumns = `repeat(${piece.matrix[0].length}, 1fr)`;

            for (let r = 0; r < piece.matrix.length; r++) {
                for (let c = 0; c < piece.matrix[0].length; c++) {
                    const cell = document.createElement('div');
                    cell.className = 'tray-cell';
                    if (piece.matrix[r][c] === 1) {
                        cell.classList.add('filled');
                        cell.style.background = PASTEL_PALETTE[piece.color].bg;
                        cell.style.borderColor = PASTEL_PALETTE[piece.color].border;
                    }
                    pieceEl.appendChild(cell);
                }
            }

            bindPuzzlePieceEvents(pieceEl, i, piece);
            slotEl.appendChild(pieceEl);
        }
    }

    function bindPuzzlePieceEvents(pieceEl, slotIndex, piece) {
        let startTime = 0;
        let startX = 0, startY = 0;

        pieceEl.onpointerdown = (e) => {
            if (state.isGameOver) return;
            startTime = Date.now();
            startX = e.clientX || 0;
            startY = e.clientY || 0;
            audio.pop();

            state.drag.active = true;
            state.drag.slotIndex = slotIndex;
            state.drag.piece = piece;

            const isTouch = e.pointerType === 'touch';
            const yOffset = isTouch ? state.drag.touchYOffset : 0;
            createPuzzleDragClone(piece, startX, startY - yOffset);

            const onMove = (ev) => {
                if (!state.drag.active || !state.drag.cloneEl) return;
                const cx = ev.clientX || 0;
                const cy = ev.clientY || 0;
                state.drag.cloneEl.style.left = `${cx}px`;
                state.drag.cloneEl.style.top = `${cy - yOffset}px`;
                highlightPuzzlePreview(cx, cy - yOffset, piece);
            };

            const onUp = (ev) => {
                window.removeEventListener('pointermove', onMove);
                window.removeEventListener('pointerup', onUp);
                if (!state.drag.active) return;
                state.drag.active = false;

                const elapsed = Date.now() - startTime;
                const dist = Math.hypot(ev.clientX - startX, ev.clientY - startY);

                if (elapsed < 250 && dist < 12) {
                    removePuzzleDragClone();
                    clearPuzzlePreviews();
                    state.selectedSlot = state.selectedSlot === slotIndex ? null : slotIndex;
                    renderPuzzleTray();
                    return;
                }

                const target = document.elementFromPoint(ev.clientX, ev.clientY - yOffset);
                const cell = target ? target.closest('.bb-cell') : null;

                if (cell) {
                    const tr = parseInt(cell.dataset.r, 10);
                    const tc = parseInt(cell.dataset.c, 10);
                    const ar = tr - Math.floor(piece.matrix.length / 2);
                    const ac = tc - Math.floor(piece.matrix[0].length / 2);

                    if (canPlacePuzzlePiece(piece.matrix, ar, ac)) {
                        placePuzzlePiece(slotIndex, ar, ac);
                    } else if (canPlacePuzzlePiece(piece.matrix, tr, tc)) {
                        placePuzzlePiece(slotIndex, tr, tc);
                    }
                }

                removePuzzleDragClone();
                clearPuzzlePreviews();
            };

            window.addEventListener('pointermove', onMove);
            window.addEventListener('pointerup', onUp);
        };
    }

    function createPuzzleDragClone(piece, x, y) {
        removePuzzleDragClone();
        const clone = document.createElement('div');
        clone.className = 'bb-drag-clone';
        clone.id = 'bbDragClone';
        clone.style.gridTemplateRows = `repeat(${piece.matrix.length}, 1fr)`;
        clone.style.gridTemplateColumns = `repeat(${piece.matrix[0].length}, 1fr)`;
        clone.style.left = `${x}px`;
        clone.style.top = `${y}px`;

        for (let r = 0; r < piece.matrix.length; r++) {
            for (let c = 0; c < piece.matrix[0].length; c++) {
                const cell = document.createElement('div');
                cell.className = 'tray-cell';
                if (piece.matrix[r][c] === 1) {
                    cell.classList.add('filled');
                    cell.style.background = PASTEL_PALETTE[piece.color].bg;
                    cell.style.borderColor = PASTEL_PALETTE[piece.color].border;
                }
                clone.appendChild(cell);
            }
        }
        document.body.appendChild(clone);
        state.drag.cloneEl = clone;
    }

    function removePuzzleDragClone() {
        if (state.drag.cloneEl) {
            state.drag.cloneEl.remove();
            state.drag.cloneEl = null;
        }
    }

    function highlightPuzzlePreview(x, y, piece) {
        clearPuzzlePreviews();
        const target = document.elementFromPoint(x, y);
        const cell = target ? target.closest('.bb-cell') : null;
        if (!cell) return;

        const tr = parseInt(cell.dataset.r, 10);
        const tc = parseInt(cell.dataset.c, 10);
        const ar = tr - Math.floor(piece.matrix.length / 2);
        const ac = tc - Math.floor(piece.matrix[0].length / 2);

        let testR = ar, testC = ac;
        let valid = canPlacePuzzlePiece(piece.matrix, testR, testC);
        if (!valid && canPlacePuzzlePiece(piece.matrix, tr, tc)) {
            testR = tr; testC = tc; valid = true;
        }

        for (let r = 0; r < piece.matrix.length; r++) {
            for (let c = 0; c < piece.matrix[0].length; c++) {
                if (piece.matrix[r][c] === 1) {
                    const el = document.getElementById(`pcell-${testR + r}-${testC + c}`);
                    if (el) el.classList.add(valid ? 'preview-valid' : 'preview-invalid');
                }
            }
        }
    }

    function clearPuzzlePreviews() {
        document.querySelectorAll('.bb-cell.preview-valid, .bb-cell.preview-invalid').forEach(el => {
            el.classList.remove('preview-valid', 'preview-invalid');
        });
    }

    function handlePuzzleCellClick(r, c) {
        if (state.selectedSlot === null) return;
        const piece = state.tray[state.selectedSlot];
        if (!piece) return;

        const ar = r - Math.floor(piece.matrix.length / 2);
        const ac = c - Math.floor(piece.matrix[0].length / 2);

        if (canPlacePuzzlePiece(piece.matrix, ar, ac)) {
            placePuzzlePiece(state.selectedSlot, ar, ac);
            state.selectedSlot = null;
            renderPuzzleTray();
        } else if (canPlacePuzzlePiece(piece.matrix, r, c)) {
            placePuzzlePiece(state.selectedSlot, r, c);
            state.selectedSlot = null;
            renderPuzzleTray();
        } else {
            audio.pop();
        }
    }

    function canPlacePuzzlePiece(matrix, startR, startC) {
        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[0].length; c++) {
                if (matrix[r][c] === 1) {
                    const gr = startR + r;
                    const gc = startC + c;
                    if (gr < 0 || gr >= 8 || gc < 0 || gc >= 8) return false;
                    if (state.puzzleGrid[gr][gc] !== null) return false;
                }
            }
        }
        return true;
    }

    function canFitPuzzlePiece(matrix) {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (canPlacePuzzlePiece(matrix, r, c)) return true;
            }
        }
        return false;
    }

    function placePuzzlePiece(slotIndex, startR, startC) {
        const piece = state.tray[slotIndex];
        if (!piece) return;

        audio.place();
        let placedCount = 0;

        for (let r = 0; r < piece.matrix.length; r++) {
            for (let c = 0; c < piece.matrix[0].length; c++) {
                if (piece.matrix[r][c] === 1) {
                    const gr = startR + r;
                    const gc = startC + c;
                    state.puzzleGrid[gr][gc] = { color: piece.color };
                    placedCount++;

                    const cellEl = document.getElementById(`pcell-${gr}-${gc}`);
                    if (cellEl) {
                        cellEl.classList.add('filled');
                        cellEl.style.background = PASTEL_PALETTE[piece.color].bg;
                        cellEl.style.borderColor = PASTEL_PALETTE[piece.color].border;
                    }
                }
            }
        }

        addScore(placedCount * 10);
        state.tray[slotIndex] = null;
        renderPuzzleTray();

        // Kiểm tra nổ hàng
        checkPuzzleBlastLines();

        // Đồng bộ mạng đối kháng
        syncBoardToNetwork();

        // Nếu khay hết, phát đợt khối mới
        if (state.tray.every(p => p === null)) {
            setTimeout(spawnPuzzlePieces, 220);
        } else {
            checkPuzzleGameOver();
        }
    }

    function checkPuzzleBlastLines() {
        const fullRows = [];
        const fullCols = [];

        for (let r = 0; r < 8; r++) {
            if (state.puzzleGrid[r].every(c => c !== null)) fullRows.push(r);
        }
        for (let c = 0; c < 8; c++) {
            let colFull = true;
            for (let r = 0; r < 8; r++) {
                if (state.puzzleGrid[r][c] === null) { colFull = false; break; }
            }
            if (colFull) fullCols.push(c);
        }

        const totalLines = fullRows.length + fullCols.length;

        if (totalLines > 0) {
            state.comboCount++;
            if (state.comboCount > state.maxCombo) state.maxCombo = state.comboCount;
            state.linesCleared += totalLines;

            const baseScore = totalLines * 100;
            const comboBonus = state.comboCount > 1 ? (state.comboCount * 70) : 0;
            addScore(baseScore + comboBonus);

            audio.blast();
            updateComboUI();

            // Kích hoạt tấn công nếu đang ở chế độ Đối Kháng!
            if (state.matchMode === 'vs') {
                sendGarbageAttack(totalLines);
            }

            const cellsToClear = new Set();
            fullRows.forEach(r => { for (let c = 0; c < 8; c++) cellsToClear.add(`${r},${c}`); });
            fullCols.forEach(c => { for (let r = 0; r < 8; r++) cellsToClear.add(`${r},${c}`); });

            cellsToClear.forEach(pos => {
                const [r, c] = pos.split(',').map(Number);
                const el = document.getElementById(`pcell-${r}-${c}`);
                if (el) el.classList.add('blasting');
            });

            setTimeout(() => {
                cellsToClear.forEach(pos => {
                    const [r, c] = pos.split(',').map(Number);
                    state.puzzleGrid[r][c] = null;
                    const el = document.getElementById(`pcell-${r}-${c}`);
                    if (el) {
                        el.className = 'bb-cell';
                        el.style.background = '';
                        el.style.borderColor = '';
                    }
                });
                checkPuzzleGameOver();
                syncBoardToNetwork();
            }, 300);

        } else {
            state.comboCount = 0;
            updateComboUI();
        }
    }

    function checkPuzzleGameOver() {
        const remaining = state.tray.filter(p => p !== null);
        if (remaining.length === 0) return;

        const anyFit = remaining.some(p => canFitPuzzlePiece(p.matrix));
        if (!anyFit) {
            triggerGameOver();
        }
    }

    // 7. LOGIC CHẾ ĐỘ 2: GẠCH TỰ RƠI (FALLING / TETRIS MODE 10x16)
    function initFallingMode() {
        stopFallingTimer();
        state.fallGrid = Array(state.fallRows).fill(null).map(() => Array(state.fallCols).fill(null));
        state.currentPiece = null;
        state.nextPiece = null;

        const boardEl = document.getElementById('bbFallingBoard');
        if (!boardEl) return;
        boardEl.innerHTML = '';

        for (let r = 0; r < state.fallRows; r++) {
            for (let c = 0; c < state.fallCols; c++) {
                const cell = document.createElement('div');
                cell.className = 'bb-cell fall-cell';
                cell.id = `fcell-${r}-${c}`;
                boardEl.appendChild(cell);
            }
        }

        spawnNextFallingPiece();
        spawnNextFallingPiece();
        startFallingTimer();
    }

    function spawnNextFallingPiece() {
        state.currentPiece = state.nextPiece;
        const randomTetro = TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];
        state.nextPiece = {
            matrix: randomTetro.matrix.map(row => [...row]),
            color: randomTetro.color,
            name: randomTetro.name
        };

        renderNextPiecePreview();

        if (state.currentPiece) {
            state.currentPiece.r = 0;
            state.currentPiece.c = Math.floor((state.fallCols - state.currentPiece.matrix[0].length) / 2);

            // Kiểm tra ngay khi xuất hiện nếu đã bị đè -> Game Over
            if (!canPlaceFallingPiece(state.currentPiece.matrix, state.currentPiece.r, state.currentPiece.c)) {
                triggerGameOver();
            } else {
                renderFallingActivePiece();
            }
        }
    }

    function renderNextPiecePreview() {
        const box = document.getElementById('bbNextPieceBox');
        if (!box || !state.nextPiece) return;
        box.innerHTML = '';

        const m = state.nextPiece.matrix;
        box.style.gridTemplateRows = `repeat(${m.length}, 1fr)`;
        box.style.gridTemplateColumns = `repeat(${m[0].length}, 1fr)`;

        for (let r = 0; r < m.length; r++) {
            for (let c = 0; c < m[0].length; c++) {
                const d = document.createElement('div');
                d.className = 'next-mini-cell';
                if (m[r][c] === 1) {
                    d.style.background = PASTEL_PALETTE[state.nextPiece.color].bg;
                    d.style.borderColor = PASTEL_PALETTE[state.nextPiece.color].border;
                }
                box.appendChild(d);
            }
        }
    }

    function startFallingTimer() {
        stopFallingTimer();
        state.fallTimer = setInterval(() => {
            if (state.isGameOver || state.mode !== 'falling') return;
            stepFallingPiece(1, 0);
        }, state.fallSpeed);
    }

    function stopFallingTimer() {
        if (state.fallTimer) {
            clearInterval(state.fallTimer);
            state.fallTimer = null;
        }
    }

    function stepFallingPiece(dr, dc) {
        if (!state.currentPiece || state.isGameOver) return false;

        const nextR = state.currentPiece.r + dr;
        const nextC = state.currentPiece.c + dc;

        if (canPlaceFallingPiece(state.currentPiece.matrix, nextR, nextC)) {
            clearFallingActivePiece();
            state.currentPiece.r = nextR;
            state.currentPiece.c = nextC;
            renderFallingActivePiece();
            if (dc !== 0) audio.pop();
            return true;
        } else {
            // Nếu không thể đi xuống tiếp -> Khóa khối vào bàn cờ
            if (dr > 0) {
                lockFallingPiece();
            }
            return false;
        }
    }

    function rotateFallingPiece() {
        if (!state.currentPiece || state.isGameOver) return;
        const m = state.currentPiece.matrix;
        const rows = m.length;
        const cols = m[0].length;

        // Xoay ma trận 90 độ theo chiều kim đồng hồ
        const rotated = Array(cols).fill(0).map((_, i) =>
            Array(rows).fill(0).map((_, j) => m[rows - 1 - j][i])
        );

        let testC = state.currentPiece.c;
        // Wall-kick nếu xoay sát mép phải
        if (testC + rotated[0].length > state.fallCols) {
            testC = state.fallCols - rotated[0].length;
        }

        if (canPlaceFallingPiece(rotated, state.currentPiece.r, testC)) {
            clearFallingActivePiece();
            state.currentPiece.matrix = rotated;
            state.currentPiece.c = testC;
            renderFallingActivePiece();
            audio.rotate();
        }
    }

    function hardDropFallingPiece() {
        if (!state.currentPiece || state.isGameOver) return;
        while (canPlaceFallingPiece(state.currentPiece.matrix, state.currentPiece.r + 1, state.currentPiece.c)) {
            clearFallingActivePiece();
            state.currentPiece.r++;
            renderFallingActivePiece();
        }
        lockFallingPiece();
    }

    function canPlaceFallingPiece(matrix, startR, startC) {
        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[0].length; c++) {
                if (matrix[r][c] === 1) {
                    const gr = startR + r;
                    const gc = startC + c;
                    if (gr < 0 || gr >= state.fallRows || gc < 0 || gc >= state.fallCols) return false;
                    if (state.fallGrid[gr][gc] !== null) return false;
                }
            }
        }
        return true;
    }

    function renderFallingActivePiece() {
        if (!state.currentPiece) return;
        const m = state.currentPiece.matrix;
        for (let r = 0; r < m.length; r++) {
            for (let c = 0; c < m[0].length; c++) {
                if (m[r][c] === 1) {
                    const gr = state.currentPiece.r + r;
                    const gc = state.currentPiece.c + c;
                    const el = document.getElementById(`fcell-${gr}-${gc}`);
                    if (el) {
                        el.classList.add('falling-block');
                        el.style.background = PASTEL_PALETTE[state.currentPiece.color].bg;
                        el.style.borderColor = PASTEL_PALETTE[state.currentPiece.color].border;
                    }
                }
            }
        }
    }

    function clearFallingActivePiece() {
        if (!state.currentPiece) return;
        const m = state.currentPiece.matrix;
        for (let r = 0; r < m.length; r++) {
            for (let c = 0; c < m[0].length; c++) {
                if (m[r][c] === 1) {
                    const gr = state.currentPiece.r + r;
                    const gc = state.currentPiece.c + c;
                    const el = document.getElementById(`fcell-${gr}-${gc}`);
                    if (el && !state.fallGrid[gr][gc]) {
                        el.className = 'bb-cell fall-cell';
                        el.style.background = '';
                        el.style.borderColor = '';
                    }
                }
            }
        }
    }

    function lockFallingPiece() {
        if (!state.currentPiece) return;
        audio.place();

        const m = state.currentPiece.matrix;
        for (let r = 0; r < m.length; r++) {
            for (let c = 0; c < m[0].length; c++) {
                if (m[r][c] === 1) {
                    const gr = state.currentPiece.r + r;
                    const gc = state.currentPiece.c + c;
                    state.fallGrid[gr][gc] = { color: state.currentPiece.color };
                    const el = document.getElementById(`fcell-${gr}-${gc}`);
                    if (el) {
                        el.className = 'bb-cell fall-cell locked';
                        el.style.background = PASTEL_PALETTE[state.currentPiece.color].bg;
                        el.style.borderColor = PASTEL_PALETTE[state.currentPiece.color].border;
                    }
                }
            }
        }

        addScore(15);
        state.currentPiece = null;

        // Kiểm tra ăn hàng
        checkFallingLines();

        syncBoardToNetwork();

        // Xuất hiện khối tiếp theo
        spawnNextFallingPiece();
    }

    function checkFallingLines() {
        const fullRows = [];
        for (let r = 0; r < state.fallRows; r++) {
            if (state.fallGrid[r].every(c => c !== null)) {
                fullRows.push(r);
            }
        }

        if (fullRows.length > 0) {
            state.linesCleared += fullRows.length;
            state.comboCount++;
            if (state.comboCount > state.maxCombo) state.maxCombo = state.comboCount;

            const baseScore = fullRows.length * 120;
            const comboBonus = state.comboCount > 1 ? (state.comboCount * 80) : 0;
            addScore(baseScore + comboBonus);

            audio.blast();
            updateComboUI();

            if (state.matchMode === 'vs') {
                sendGarbageAttack(fullRows.length);
            }

            // Xóa các hàng và dồn xuống
            fullRows.forEach(r => {
                for (let c = 0; c < state.fallCols; c++) {
                    const el = document.getElementById(`fcell-${r}-${c}`);
                    if (el) el.classList.add('blasting');
                }
            });

            setTimeout(() => {
                fullRows.forEach(clearedR => {
                    for (let r = clearedR; r > 0; r--) {
                        state.fallGrid[r] = [...state.fallGrid[r - 1]];
                    }
                    state.fallGrid[0] = Array(state.fallCols).fill(null);
                });

                // Cập nhật lại toàn bộ DOM Falling
                for (let r = 0; r < state.fallRows; r++) {
                    for (let c = 0; c < state.fallCols; c++) {
                        const el = document.getElementById(`fcell-${r}-${c}`);
                        const data = state.fallGrid[r][c];
                        if (el) {
                            if (data) {
                                el.className = 'bb-cell fall-cell locked';
                                el.style.background = PASTEL_PALETTE[data.color].bg;
                                el.style.borderColor = PASTEL_PALETTE[data.color].border;
                            } else {
                                el.className = 'bb-cell fall-cell';
                                el.style.background = '';
                                el.style.borderColor = '';
                            }
                        }
                    }
                }
                syncBoardToNetwork();
            }, 250);
        } else {
            state.comboCount = 0;
            updateComboUI();
        }
    }

    // 8. ĐIỀU KHIỂN PHÍM MŨI TÊN & PHÍM ẢO CHO GẠCH RƠI
    function bindKeyboardEvents() {
        window.addEventListener('keydown', (e) => {
            if (state.isGameOver || state.mode !== 'falling') return;

            if (e.key === 'ArrowLeft') {
                stepFallingPiece(0, -1);
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                stepFallingPiece(0, 1);
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                stepFallingPiece(1, 0);
                e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                rotateFallingPiece();
                e.preventDefault();
            } else if (e.key === ' ' || e.code === 'Space') {
                hardDropFallingPiece();
                e.preventDefault();
            }
        });
    }

    function bindVirtualDpad() {
        const btnLeft = document.getElementById('btnPadLeft');
        const btnRight = document.getElementById('btnPadRight');
        const btnRotate = document.getElementById('btnPadRotate');
        const btnDown = document.getElementById('btnPadDown');
        const btnDrop = document.getElementById('btnPadDrop');

        if (btnLeft) btnLeft.addEventListener('click', () => stepFallingPiece(0, -1));
        if (btnRight) btnRight.addEventListener('click', () => stepFallingPiece(0, 1));
        if (btnRotate) btnRotate.addEventListener('click', () => rotateFallingPiece());
        if (btnDown) btnDown.addEventListener('click', () => stepFallingPiece(1, 0));
        if (btnDrop) btnDrop.addEventListener('click', () => hardDropFallingPiece());
    }

    // 9. CHẾ ĐỘ ĐỐI KHÁNG (VS MODE) & TẤN CÔNG GẠCH RÁC
    function initVsOpponent() {
        const isPartnerOnline = window.CoupleNetwork && window.CoupleNetwork.isPartnerOnline();
        state.partner.isAi = !isPartnerOnline;
        state.partner.name = window.CoupleNetwork ? (window.CoupleNetwork.getPartnerRole() === 'hien' ? 'Hiền ✈️' : 'Huy 🚗') : 'Đối Thủ';

        const nameEl = document.getElementById('bbPartnerName');
        if (nameEl) nameEl.textContent = state.partner.name;

        // Render lưới mini radar đối thủ (8x8)
        const miniBoard = document.getElementById('bbPartnerMiniBoard');
        if (miniBoard) {
            miniBoard.innerHTML = '';
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    const d = document.createElement('div');
                    d.className = 'mini-cell';
                    d.id = `mcell-${r}-${c}`;
                    miniBoard.appendChild(d);
                }
            }
        }

        if (state.partner.isAi) {
            startPartnerAi();
        }
    }

    function startPartnerAi() {
        stopPartnerAi();
        state.partner.aiTimer = setInterval(() => {
            if (state.isGameOver || state.matchMode !== 'vs') return;

            // AI mô phỏng tích điểm và ăn hàng định kỳ
            state.partner.score += Math.floor(20 + Math.random() * 40);
            renderPartnerStats();

            // Xác suất AI kích nổ và tấn công lại bạn
            if (Math.random() < 0.22) {
                receiveGarbageAttack(1);
            }
        }, 3200);
    }

    function stopPartnerAi() {
        if (state.partner.aiTimer) {
            clearInterval(state.partner.aiTimer);
            state.partner.aiTimer = null;
        }
    }

    function sendGarbageAttack(lines) {
        audio.attack();
        showAttackCue(`⚔️ Bạn đã tung đòn công kích +${lines} hàng sang đối phương!`);

        if (window.CoupleNetwork) {
            window.CoupleNetwork.send({
                type: 'bb_garbage_attack',
                lines: lines
            });
        }
    }

    function receiveGarbageAttack(lines) {
        audio.attack();
        showAttackCue(`⚠️ Bị đối phương dội +${lines} hàng gạch rác vào bàn!`);

        // Đẩy gạch rác vào cuối bàn cờ
        if (state.mode === 'falling') {
            for (let l = 0; l < lines; l++) {
                state.fallGrid.shift(); // Bỏ hàng trên cùng
                const garbageRow = Array(state.fallCols).fill({ color: 'garbage' });
                // Tạo 1 lỗ hổng ngẫu nhiên để có thể phá
                garbageRow[Math.floor(Math.random() * state.fallCols)] = null;
                state.fallGrid.push(garbageRow);
            }
            // Vẽ lại
            for (let r = 0; r < state.fallRows; r++) {
                for (let c = 0; c < state.fallCols; c++) {
                    const el = document.getElementById(`fcell-${r}-${c}`);
                    const data = state.fallGrid[r][c];
                    if (el) {
                        if (data) {
                            el.className = 'bb-cell fall-cell locked';
                            el.style.background = PASTEL_PALETTE[data.color].bg;
                            el.style.borderColor = PASTEL_PALETTE[data.color].border;
                        } else {
                            el.className = 'bb-cell fall-cell';
                            el.style.background = '';
                            el.style.borderColor = '';
                        }
                    }
                }
            }
        }
    }

    function showAttackCue(msg) {
        const cueEl = document.getElementById('bbAttackCue');
        if (!cueEl) return;
        cueEl.textContent = msg;
        cueEl.classList.add('active');
        setTimeout(() => cueEl.classList.remove('active'), 2500);
    }

    function syncBoardToNetwork() {
        if (!window.CoupleNetwork || state.matchMode !== 'vs') return;

        // Nén dữ liệu bàn chơi để truyền tải siêu nhẹ
        const compactGrid = state.mode === 'puzzle'
            ? state.puzzleGrid.map(row => row.map(c => c ? c.color : null))
            : state.fallGrid.slice(8).map(row => row.slice(0, 8).map(c => c ? c.color : null));

        window.CoupleNetwork.send({
            type: 'bb_state_sync',
            score: state.score,
            combo: state.comboCount,
            grid: compactGrid
        });
    }

    function handleNetworkMessage(packet) {
        if (!packet || typeof packet !== 'object') return;

        if (packet.type === 'presence_change') {
            if (packet.online) {
                stopPartnerAi();
                state.partner.isAi = false;
                initVsOpponent();
            } else {
                state.partner.isAi = true;
                startPartnerAi();
            }
            return;
        }

        if (state.matchMode !== 'vs') return;

        if (packet.type === 'bb_state_sync') {
            state.partner.score = packet.score || 0;
            state.partner.combo = packet.combo || 0;
            renderPartnerStats();

            // Cập nhật mini radar
            if (packet.grid && Array.isArray(packet.grid)) {
                for (let r = 0; r < Math.min(8, packet.grid.length); r++) {
                    for (let c = 0; c < Math.min(8, packet.grid[r].length); c++) {
                        const cell = document.getElementById(`mcell-${r}-${c}`);
                        const colorKey = packet.grid[r][c];
                        if (cell) {
                            if (colorKey && PASTEL_PALETTE[colorKey]) {
                                cell.style.background = PASTEL_PALETTE[colorKey].bg;
                            } else {
                                cell.style.background = 'rgba(0,0,0,0.06)';
                            }
                        }
                    }
                }
            }
        } else if (packet.type === 'bb_garbage_attack') {
            receiveGarbageAttack(packet.lines || 1);
        }
    }

    function renderPartnerStats() {
        const scoreEl = document.getElementById('bbPartnerScore');
        if (scoreEl) scoreEl.textContent = state.partner.score.toLocaleString();
    }

    // 10. ĐIỂM SỐ & GAME OVER
    function addScore(pts) {
        state.score += pts;
        if (state.score > state.highScore) {
            state.highScore = state.score;
            localStorage.setItem('bb_best_score', state.highScore);
        }
        renderScores();
    }

    function renderScores() {
        const curEl = document.getElementById('bbCurrentScore');
        const highEl = document.getElementById('bbHighScore');
        if (curEl) curEl.textContent = state.score.toLocaleString();
        if (highEl) highEl.textContent = state.highScore.toLocaleString();
    }

    function updateComboUI() {
        const badge = document.getElementById('bbComboBadge');
        const text = document.getElementById('bbComboText');
        if (!badge || !text) return;

        if (state.comboCount >= 2) {
            badge.style.display = 'inline-flex';
            text.textContent = `Combo x${state.comboCount}`;
        } else {
            badge.style.display = 'none';
        }
    }

    function triggerGameOver() {
        state.isGameOver = true;
        stopFallingTimer();
        stopPartnerAi();
        audio.gameOver();

        const modal = document.getElementById('modalBbGameOver');
        if (!modal) return;

        const endScore = document.getElementById('endBbScore');
        const endHighScore = document.getElementById('endBbHighScore');
        const endLines = document.getElementById('endBbLinesCleared');
        const endCombo = document.getElementById('endBbMaxCombo');

        if (endScore) endScore.textContent = state.score.toLocaleString();
        if (endHighScore) endHighScore.textContent = state.highScore.toLocaleString();
        if (endLines) endLines.textContent = state.linesCleared;
        if (endCombo) endCombo.textContent = `x${state.maxCombo}`;

        modal.classList.add('active');
    }

    function restartGame() {
        const modal = document.getElementById('modalBbGameOver');
        if (modal) modal.classList.remove('active');

        state.score = 0;
        state.comboCount = 0;
        state.maxCombo = 0;
        state.linesCleared = 0;
        state.isGameOver = false;

        renderScores();
        updateComboUI();

        startCurrentMode();
    }

    function startCurrentMode() {
        if (state.mode === 'falling') {
            initFallingMode();
        } else {
            initPuzzleMode();
        }
        if (state.matchMode === 'vs') {
            initVsOpponent();
        }
    }

    function onShow() {
        renderScores();
        if (state.mode === 'falling' && !state.isGameOver) {
            startFallingTimer();
        }
        if (state.matchMode === 'vs') {
            initVsOpponent();
        }
    }

    return {
        init,
        restartGame,
        switchPlayMode,
        switchMatchMode,
        onShow,
        getState: () => state
    };
})();
