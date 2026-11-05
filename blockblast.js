/**
 * ========================================================
 * BLOCK BLAST PUZZLE - CORE ENGINE & GAMEPLAY LOGIC (TÍCH HỢP)
 * - Tích hợp trực tiếp vào games.html
 * - Không xung đột với Cờ Tỷ Phú (Namespaced DOM & State)
 * - Lưới 8x8 chuẩn mực, khối ngọc bóng 3D
 * - Hệ thống Nổ hàng ngang/dọc (Blast) & Combo Streak bùng nổ
 * - Thuật toán sinh khối thông minh (Smart Spawner)
 * - Điều khiển Kéo-Thả (Drag & Drop) mượt mà + Chạm-đặt (Tap-to-Place)
 * - Tối ưu Touch trên mobile với Finger-Offset chống che ngón tay
 * - Tổng hợp âm thanh bằng Web Audio API
 * - Canvas hạt nổ khối (Particles) siêu nhẹ không gây lag
 * ========================================================
 */

window.BlockBlast = (function () {
    'use strict';

    // 1. DANH SÁCH 30+ KHỐI HÌNH ĐA DẠNG CHUẨN BLOCK BLAST
    const SHAPES_LIBRARY = [
        // 1-khối
        { name: 'dot', matrix: [[1]], color: 'amber' },

        // 2-khối
        { name: 'h2', matrix: [[1, 1]], color: 'cyan' },
        { name: 'v2', matrix: [[1], [1]], color: 'cyan' },

        // 3-khối
        { name: 'h3', matrix: [[1, 1, 1]], color: 'emerald' },
        { name: 'v3', matrix: [[1], [1], [1]], color: 'emerald' },
        { name: 'corner_tl', matrix: [[1, 1], [1, 0]], color: 'coral' },
        { name: 'corner_tr', matrix: [[1, 1], [0, 1]], color: 'coral' },
        { name: 'corner_bl', matrix: [[1, 0], [1, 1]], color: 'coral' },
        { name: 'corner_br', matrix: [[0, 1], [1, 1]], color: 'coral' },

        // 4-khối
        { name: 'square2x2', matrix: [[1, 1], [1, 1]], color: 'ruby' },
        { name: 'h4', matrix: [[1, 1, 1, 1]], color: 'sapphire' },
        { name: 'v4', matrix: [[1], [1], [1], [1]], color: 'sapphire' },
        { name: 'L_up', matrix: [[1, 0], [1, 0], [1, 1]], color: 'amethyst' },
        { name: 'L_down', matrix: [[1, 1], [0, 1], [0, 1]], color: 'amethyst' },
        { name: 'J_up', matrix: [[0, 1], [0, 1], [1, 1]], color: 'amethyst' },
        { name: 'J_down', matrix: [[1, 1], [1, 0], [1, 0]], color: 'amethyst' },
        { name: 'L_flat1', matrix: [[1, 0, 0], [1, 1, 1]], color: 'amethyst' },
        { name: 'L_flat2', matrix: [[1, 1, 1], [1, 0, 0]], color: 'amethyst' },
        { name: 'L_flat3', matrix: [[0, 0, 1], [1, 1, 1]], color: 'amethyst' },
        { name: 'L_flat4', matrix: [[1, 1, 1], [0, 0, 1]], color: 'amethyst' },
        { name: 'T_up', matrix: [[1, 1, 1], [0, 1, 0]], color: 'lime' },
        { name: 'T_down', matrix: [[0, 1, 0], [1, 1, 1]], color: 'lime' },
        { name: 'T_left', matrix: [[1, 0], [1, 1], [1, 0]], color: 'lime' },
        { name: 'T_right', matrix: [[0, 1], [1, 1], [0, 1]], color: 'lime' },
        { name: 'Z_h', matrix: [[1, 1, 0], [0, 1, 1]], color: 'coral' },
        { name: 'S_h', matrix: [[0, 1, 1], [1, 1, 0]], color: 'coral' },

        // 5-khối
        { name: 'h5', matrix: [[1, 1, 1, 1, 1]], color: 'indigo' },
        { name: 'v5', matrix: [[1], [1], [1], [1], [1]], color: 'indigo' },
        { name: 'corner3x3_tl', matrix: [[1, 1, 1], [1, 0, 0], [1, 0, 0]], color: 'gold' },
        { name: 'corner3x3_tr', matrix: [[1, 1, 1], [0, 0, 1], [0, 0, 1]], color: 'gold' },
        { name: 'corner3x3_bl', matrix: [[1, 0, 0], [1, 0, 0], [1, 1, 1]], color: 'gold' },
        { name: 'corner3x3_br', matrix: [[0, 0, 1], [0, 0, 1], [1, 1, 1]], color: 'gold' },
        { name: 'plus5', matrix: [[0, 1, 0], [1, 1, 1], [0, 1, 0]], color: 'ruby' },

        // Khối vuông lớn 3x3
        { name: 'square3x3', matrix: [[1, 1, 1], [1, 1, 1], [1, 1, 1]], color: 'gold' }
    ];

    const COLOR_CLASSES = {
        ruby: 'color-ruby',
        sapphire: 'color-sapphire',
        emerald: 'color-emerald',
        amber: 'color-amber',
        amethyst: 'color-amethyst',
        cyan: 'color-cyan',
        coral: 'color-coral',
        lime: 'color-lime',
        indigo: 'color-indigo',
        gold: 'color-gold'
    };

    const COLOR_HEX_MAP = {
        ruby: '#ee5253',
        sapphire: '#2e86de',
        emerald: '#20bf6b',
        amber: '#ff9f43',
        amethyst: '#8854d0',
        cyan: '#01a3a4',
        coral: '#f368e0',
        lime: '#6ab04c',
        indigo: '#0abde3',
        gold: '#ffa801'
    };

    // TRẠNG THÁI RIÊNG CỦA BLOCK BLAST
    const bbState = {
        grid: Array(8).fill(null).map(() => Array(8).fill(null)),
        tray: [null, null, null],
        score: 0,
        highScore: 0,
        comboCount: 0,
        maxCombo: 0,
        linesClearedTotal: 0,
        isGameOver: false,
        soundEnabled: true,
        selectedSlotIndex: null,
        drag: {
            active: false,
            slotIndex: null,
            piece: null,
            cloneEl: null,
            touchYOffset: 65
        }
    };

    // ÂM THANH
    class BbSoundEngine {
        constructor() {
            this.ctx = null;
        }

        init() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }

        playPop() {
            if (!bbState.soundEnabled) return;
            this.init();
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(320, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(540, this.ctx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        }

        playPlace() {
            if (!bbState.soundEnabled) return;
            this.init();
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(180, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.09);

            gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.09);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.09);
        }

        playBlast(lineCount = 1, combo = 0) {
            if (!bbState.soundEnabled) return;
            this.init();
            if (!this.ctx) return;

            const baseFreqs = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
            const pitchShift = Math.min(combo * 1.5, 8);

            for (let i = 0; i < Math.min(lineCount + 1, 4); i++) {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const freq = (baseFreqs[(i + Math.floor(pitchShift)) % baseFreqs.length] || 440) * (1 + (pitchShift * 0.05));

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime + (i * 0.05));
                osc.frequency.exponentialRampToValueAtTime(freq * 1.25, this.ctx.currentTime + (i * 0.05) + 0.22);

                gain.gain.setValueAtTime(0.2, this.ctx.currentTime + (i * 0.05));
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + (i * 0.05) + 0.25);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(this.ctx.currentTime + (i * 0.05));
                osc.stop(this.ctx.currentTime + (i * 0.05) + 0.25);
            }
        }

        playCombo(combo = 2) {
            if (!bbState.soundEnabled) return;
            this.init();
            if (!this.ctx) return;

            const notes = [440, 554.37, 659.25, 880];
            notes.forEach((f, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(f * (1 + combo * 0.08), this.ctx.currentTime + idx * 0.06);

                gain.gain.setValueAtTime(0.18, this.ctx.currentTime + idx * 0.06);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.06 + 0.18);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(this.ctx.currentTime + idx * 0.06);
                osc.stop(this.ctx.currentTime + idx * 0.06 + 0.18);
            });
        }

        playGameOver() {
            if (!bbState.soundEnabled) return;
            this.init();
            if (!this.ctx) return;

            const notes = [440, 392, 349.23, 293.66];
            notes.forEach((f, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, this.ctx.currentTime + idx * 0.12);

                gain.gain.setValueAtTime(0.22, this.ctx.currentTime + idx * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.12 + 0.25);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(this.ctx.currentTime + idx * 0.12);
                osc.stop(this.ctx.currentTime + idx * 0.12 + 0.25);
            });
        }
    }

    const bbSounds = new BbSoundEngine();

    // HẠT SÁNG NỔ KHỐI
    class BbParticleFx {
        constructor() {
            this.canvas = document.getElementById('bbFxCanvas');
            this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
            this.particles = [];
            this.animId = null;
            this.resize();
            window.addEventListener('resize', () => this.resize());
        }

        resize() {
            if (!this.canvas) return;
            const rect = this.canvas.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            this.canvas.width = rect.width * (window.devicePixelRatio || 1);
            this.canvas.height = rect.height * (window.devicePixelRatio || 1);
            if (this.ctx) {
                this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
            }
        }

        spawnDebris(x, y, colorHex) {
            const count = 12;
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 1.5 + Math.random() * 4.5;
                this.particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 1.2,
                    size: 4 + Math.random() * 5,
                    color: colorHex || '#f43f5e',
                    alpha: 1,
                    rot: Math.random() * Math.PI,
                    rotSpeed: (Math.random() - 0.5) * 0.25,
                    life: 1,
                    decay: 0.025 + Math.random() * 0.025
                });
            }
            if (!this.animId) this.loop();
        }

        loop() {
            if (!this.ctx || !this.canvas) return;
            const rect = this.canvas.getBoundingClientRect();
            this.ctx.clearRect(0, 0, rect.width, rect.height);

            for (let i = this.particles.length - 1; i >= 0; i--) {
                const p = this.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.12;
                p.rot += p.rotSpeed;
                p.life -= p.decay;
                p.alpha = Math.max(0, p.life);

                if (p.life <= 0) {
                    this.particles.splice(i, 1);
                    continue;
                }

                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate(p.rot);
                this.ctx.globalAlpha = p.alpha;
                this.ctx.fillStyle = p.color;
                this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                this.ctx.restore();
            }

            if (this.particles.length > 0) {
                this.animId = requestAnimationFrame(() => this.loop());
            } else {
                this.animId = null;
            }
        }
    }

    let bbParticleFx = null;

    // DOM LƯỚI 8x8
    function initGridDOM() {
        const boardEl = document.getElementById('bbGridBoard');
        if (!boardEl) return;
        boardEl.innerHTML = '';

        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const cell = document.createElement('div');
                cell.className = 'bb-cell';
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.id = `bb-cell-${r}-${c}`;

                cell.addEventListener('click', () => handleCellClick(r, c));
                boardEl.appendChild(cell);
            }
        }
    }

    // KIỂM TRA ĐẶT KHỐI
    function canPlacePiece(matrix, targetRow, targetCol) {
        const rows = matrix.length;
        const cols = matrix[0].length;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (matrix[r][c] === 1) {
                    const gr = targetRow + r;
                    const gc = targetCol + c;
                    if (gr < 0 || gr >= 8 || gc < 0 || gc >= 8) return false;
                    if (bbState.grid[gr][gc] !== null) return false;
                }
            }
        }
        return true;
    }

    function canPieceFitAnywhere(matrix) {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (canPlacePiece(matrix, r, c)) {
                    return true;
                }
            }
        }
        return false;
    }

    // SINH KHỐI THÔNG MINH
    function spawnNewPieces() {
        let occupiedCount = 0;
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (bbState.grid[r][c] !== null) occupiedCount++;
            }
        }
        const fillRatio = occupiedCount / 64;

        const smallShapes = SHAPES_LIBRARY.filter(s => {
            const blocks = s.matrix.flat().reduce((a, b) => a + b, 0);
            return blocks <= 3;
        });

        const standardShapes = SHAPES_LIBRARY.filter(s => {
            const blocks = s.matrix.flat().reduce((a, b) => a + b, 0);
            return blocks <= 4;
        });

        for (let i = 0; i < 3; i++) {
            let pool = SHAPES_LIBRARY;
            if (fillRatio > 0.55 && Math.random() < 0.7) {
                pool = smallShapes;
            } else if (fillRatio > 0.40 && Math.random() < 0.5) {
                pool = standardShapes;
            }

            const picked = pool[Math.floor(Math.random() * pool.length)];
            bbState.tray[i] = {
                id: `bb-piece-${Date.now()}-${i}-${Math.random()}`,
                name: picked.name,
                matrix: picked.matrix,
                color: picked.color
            };
        }

        // Đảm bảo ít nhất 1 khối đặt vừa
        let anyFits = bbState.tray.some(p => p && canPieceFitAnywhere(p.matrix));
        if (!anyFits) {
            const fittingShape = SHAPES_LIBRARY.find(s => canPieceFitAnywhere(s.matrix));
            if (fittingShape) {
                bbState.tray[0] = {
                    id: `bb-savior-${Date.now()}`,
                    name: fittingShape.name,
                    matrix: fittingShape.matrix,
                    color: fittingShape.color
                };
            } else {
                triggerGameOver();
                return;
            }
        }

        renderTray();
        checkGameOver();
    }

    // RENDER KHAY KHỐI
    function renderTray() {
        for (let i = 0; i < 3; i++) {
            const slotEl = document.getElementById(`bbSlot-${i}`);
            if (!slotEl) continue;
            slotEl.innerHTML = '';

            const piece = bbState.tray[i];
            if (!piece) {
                slotEl.classList.add('empty');
                continue;
            }

            slotEl.classList.remove('empty');
            const pieceEl = document.createElement('div');
            pieceEl.className = 'tray-piece';
            pieceEl.dataset.slot = i;
            pieceEl.style.gridTemplateRows = `repeat(${piece.matrix.length}, 1fr)`;
            pieceEl.style.gridTemplateColumns = `repeat(${piece.matrix[0].length}, 1fr)`;

            if (bbState.selectedSlotIndex === i) {
                pieceEl.classList.add('selected');
            }

            for (let r = 0; r < piece.matrix.length; r++) {
                for (let c = 0; c < piece.matrix[0].length; c++) {
                    const cell = document.createElement('div');
                    cell.className = 'tray-cell';
                    if (piece.matrix[r][c] === 1) {
                        cell.classList.add('filled', COLOR_CLASSES[piece.color] || 'color-ruby');
                    } else {
                        cell.classList.add('empty');
                    }
                    pieceEl.appendChild(cell);
                }
            }

            bindPieceDragEvents(pieceEl, i, piece);
            slotEl.appendChild(pieceEl);
        }
    }

    // DRAG & DROP + TOUCH
    function bindPieceDragEvents(pieceEl, slotIndex, piece) {
        let pointerDownTime = 0;
        let startX = 0;
        let startY = 0;

        const onPointerDown = (e) => {
            if (bbState.isGameOver) return;
            pointerDownTime = Date.now();
            startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            startY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

            bbSounds.playPop();

            bbState.drag.active = true;
            bbState.drag.slotIndex = slotIndex;
            bbState.drag.piece = piece;

            const isTouch = e.type.startsWith('touch') || (e.pointerType === 'touch');
            const yOffset = isTouch ? bbState.drag.touchYOffset : 0;

            createDragClone(piece, startX, startY - yOffset);

            window.addEventListener('pointermove', onPointerMove, { passive: false });
            window.addEventListener('pointerup', onPointerUp);
            window.addEventListener('pointercancel', onPointerUp);

            if (e.cancelable) e.preventDefault();
        };

        const onPointerMove = (e) => {
            if (!bbState.drag.active || !bbState.drag.cloneEl) return;
            const curX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            const curY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

            const isTouch = e.pointerType === 'touch' || e.type.startsWith('touch');
            const yOffset = isTouch ? bbState.drag.touchYOffset : 0;

            bbState.drag.cloneEl.style.left = `${curX}px`;
            bbState.drag.cloneEl.style.top = `${curY - yOffset}px`;

            updateHoverPreview(curX, curY - yOffset, piece);

            if (e.cancelable) e.preventDefault();
        };

        const onPointerUp = (e) => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);

            if (!bbState.drag.active) return;
            bbState.drag.active = false;

            const elapsed = Date.now() - pointerDownTime;
            const curX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || startX;
            const curY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY) || startY;
            const dist = Math.hypot(curX - startX, curY - startY);

            const isTouch = e.pointerType === 'touch' || e.type.startsWith('touch');
            const yOffset = isTouch ? bbState.drag.touchYOffset : 0;

            // Tap tại chỗ
            if (elapsed < 250 && dist < 12) {
                removeDragClone();
                clearGridPreviews();
                togglePieceSelection(slotIndex);
                return;
            }

            const targetCell = getCellUnderPoint(curX, curY - yOffset);
            if (targetCell) {
                const tr = parseInt(targetCell.dataset.row, 10);
                const tc = parseInt(targetCell.dataset.col, 10);

                const anchorR = tr - Math.floor(piece.matrix.length / 2);
                const anchorC = tc - Math.floor(piece.matrix[0].length / 2);

                let placed = false;
                if (canPlacePiece(piece.matrix, anchorR, anchorC)) {
                    placePiece(slotIndex, anchorR, anchorC);
                    placed = true;
                } else if (canPlacePiece(piece.matrix, tr, tc)) {
                    placePiece(slotIndex, tr, tc);
                    placed = true;
                }

                if (!placed) {
                    bbSounds.playPop();
                }
            } else {
                bbSounds.playPop();
            }

            removeDragClone();
            clearGridPreviews();
        };

        pieceEl.addEventListener('pointerdown', onPointerDown);
    }

    function createDragClone(piece, x, y) {
        removeDragClone();
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
                    cell.classList.add('filled', COLOR_CLASSES[piece.color] || 'color-ruby');
                } else {
                    cell.classList.add('empty');
                }
                clone.appendChild(cell);
            }
        }

        document.body.appendChild(clone);
        bbState.drag.cloneEl = clone;
    }

    function removeDragClone() {
        if (bbState.drag.cloneEl) {
            bbState.drag.cloneEl.remove();
            bbState.drag.cloneEl = null;
        }
    }

    function getCellUnderPoint(x, y) {
        const el = document.elementFromPoint(x, y);
        if (!el) return null;
        return el.closest('.bb-cell');
    }

    function updateHoverPreview(x, y, piece) {
        clearGridPreviews();
        const cell = getCellUnderPoint(x, y);
        if (!cell) return;

        const tr = parseInt(cell.dataset.row, 10);
        const tc = parseInt(cell.dataset.col, 10);

        const anchorR = tr - Math.floor(piece.matrix.length / 2);
        const anchorC = tc - Math.floor(piece.matrix[0].length / 2);

        let testR = anchorR;
        let testC = anchorC;
        let isValid = canPlacePiece(piece.matrix, testR, testC);

        if (!isValid && canPlacePiece(piece.matrix, tr, tc)) {
            testR = tr;
            testC = tc;
            isValid = true;
        }

        for (let r = 0; r < piece.matrix.length; r++) {
            for (let c = 0; c < piece.matrix[0].length; c++) {
                if (piece.matrix[r][c] === 1) {
                    const targetEl = document.getElementById(`bb-cell-${testR + r}-${testC + c}`);
                    if (targetEl) {
                        targetEl.classList.add(isValid ? 'preview-valid' : 'preview-invalid');
                    }
                }
            }
        }
    }

    function clearGridPreviews() {
        const cells = document.querySelectorAll('.bb-cell.preview-valid, .bb-cell.preview-invalid');
        cells.forEach(c => {
            c.classList.remove('preview-valid', 'preview-invalid');
        });
    }

    // CHẾ ĐỘ CHẠM ĐỂ CHỌN & CHẠM ĐỂ ĐẶT
    function togglePieceSelection(slotIndex) {
        if (bbState.selectedSlotIndex === slotIndex) {
            bbState.selectedSlotIndex = null;
            updateTrayHint('Kéo hoặc chạm vào khối gạch để đặt vào bàn chơi');
        } else {
            bbState.selectedSlotIndex = slotIndex;
            updateTrayHint('Đã chọn khối! Hãy chạm vào ô trống trên bàn để đặt ✨');
        }
        renderTray();
    }

    function handleCellClick(targetRow, targetCol) {
        if (bbState.selectedSlotIndex === null) return;
        const piece = bbState.tray[bbState.selectedSlotIndex];
        if (!piece) return;

        const anchorR = targetRow - Math.floor(piece.matrix.length / 2);
        const anchorC = targetCol - Math.floor(piece.matrix[0].length / 2);

        if (canPlacePiece(piece.matrix, anchorR, anchorC)) {
            placePiece(bbState.selectedSlotIndex, anchorR, anchorC);
            bbState.selectedSlotIndex = null;
            renderTray();
            updateTrayHint('Kéo hoặc chạm vào khối gạch để đặt vào bàn chơi');
        } else if (canPlacePiece(piece.matrix, targetRow, targetCol)) {
            placePiece(bbState.selectedSlotIndex, targetRow, targetCol);
            bbState.selectedSlotIndex = null;
            renderTray();
            updateTrayHint('Kéo hoặc chạm vào khối gạch để đặt vào bàn chơi');
        } else {
            const cell = document.getElementById(`bb-cell-${targetRow}-${targetCol}`);
            if (cell) {
                cell.classList.add('preview-invalid');
                setTimeout(() => cell.classList.remove('preview-invalid'), 200);
            }
            bbSounds.playPop();
        }
    }

    function updateTrayHint(text) {
        const el = document.getElementById('bbTrayHintText');
        if (el) el.textContent = text;
    }

    // ĐẶT KHỐI
    function placePiece(slotIndex, startRow, startCol) {
        const piece = bbState.tray[slotIndex];
        if (!piece) return;

        bbSounds.playPlace();

        let blockCount = 0;
        for (let r = 0; r < piece.matrix.length; r++) {
            for (let c = 0; c < piece.matrix[0].length; c++) {
                if (piece.matrix[r][c] === 1) {
                    const gr = startRow + r;
                    const gc = startCol + c;
                    bbState.grid[gr][gc] = { color: piece.color };
                    blockCount++;

                    const cellEl = document.getElementById(`bb-cell-${gr}-${gc}`);
                    if (cellEl) {
                        cellEl.className = `bb-cell filled ${COLOR_CLASSES[piece.color] || 'color-ruby'}`;
                    }
                }
            }
        }

        addScore(blockCount * 10);
        bbState.tray[slotIndex] = null;
        renderTray();

        checkAndBlastLines();

        const allEmpty = bbState.tray.every(p => p === null);
        if (allEmpty) {
            setTimeout(() => {
                spawnNewPieces();
            }, 220);
        } else {
            checkGameOver();
        }
    }

    // NỔ HÀNG & COMBO
    function checkAndBlastLines() {
        const fullRows = [];
        const fullCols = [];

        for (let r = 0; r < 8; r++) {
            let isFull = true;
            for (let c = 0; c < 8; c++) {
                if (bbState.grid[r][c] === null) {
                    isFull = false;
                    break;
                }
            }
            if (isFull) fullRows.push(r);
        }

        for (let c = 0; c < 8; c++) {
            let isFull = true;
            for (let r = 0; r < 8; r++) {
                if (bbState.grid[r][c] === null) {
                    isFull = false;
                    break;
                }
            }
            if (isFull) fullCols.push(c);
        }

        const totalLines = fullRows.length + fullCols.length;

        if (totalLines > 0) {
            bbState.comboCount++;
            if (bbState.comboCount > bbState.maxCombo) {
                bbState.maxCombo = bbState.comboCount;
            }
            bbState.linesClearedTotal += totalLines;

            const baseLineScore = totalLines * 100;
            const multiBonus = totalLines > 1 ? (totalLines - 1) * 150 : 0;
            const comboBonus = bbState.comboCount > 1 ? (bbState.comboCount * 80) : 0;
            const earnedScore = baseLineScore + multiBonus + comboBonus;

            addScore(earnedScore);
            bbSounds.playBlast(totalLines, bbState.comboCount);

            if (bbState.comboCount >= 2) {
                bbSounds.playCombo(bbState.comboCount);
            }

            updateComboUI();
            showFloatingText(totalLines, bbState.comboCount, earnedScore);

            const cellsToClear = new Set();
            fullRows.forEach(r => {
                for (let c = 0; c < 8; c++) cellsToClear.add(`${r},${c}`);
            });
            fullCols.forEach(c => {
                for (let r = 0; r < 8; r++) cellsToClear.add(`${r},${c}`);
            });

            if (totalLines >= 2) {
                const container = document.getElementById('bbGridContainer');
                if (container) {
                    container.style.animation = 'none';
                    void container.offsetWidth;
                    container.style.animation = 'comboPulse 0.35s ease';
                }
            }

            cellsToClear.forEach(pos => {
                const [r, c] = pos.split(',').map(Number);
                const cellEl = document.getElementById(`bb-cell-${r}-${c}`);
                const cellData = bbState.grid[r][c];

                if (cellEl && cellData) {
                    cellEl.classList.add('blasting');

                    const rect = cellEl.getBoundingClientRect();
                    const boardEl = document.getElementById('bbGridBoard');
                    if (boardEl) {
                        const boardRect = boardEl.getBoundingClientRect();
                        const px = rect.left - boardRect.left + rect.width / 2;
                        const py = rect.top - boardRect.top + rect.height / 2;

                        if (bbParticleFx) {
                            bbParticleFx.spawnDebris(px, py, COLOR_HEX_MAP[cellData.color] || '#f43f5e');
                        }
                    }
                }
            });

            setTimeout(() => {
                cellsToClear.forEach(pos => {
                    const [r, c] = pos.split(',').map(Number);
                    bbState.grid[r][c] = null;
                    const cellEl = document.getElementById(`bb-cell-${r}-${c}`);
                    if (cellEl) {
                        cellEl.className = 'bb-cell';
                    }
                });
                checkGameOver();
            }, 340);

        } else {
            bbState.comboCount = 0;
            updateComboUI();
        }
    }

    function addScore(points) {
        bbState.score += points;
        if (bbState.score > bbState.highScore) {
            bbState.highScore = bbState.score;
            localStorage.setItem('blockblast_best_score', bbState.highScore);
        }
        renderScores(true);
    }

    function renderScores(bump = false) {
        const curEl = document.getElementById('bbCurrentScore');
        const highEl = document.getElementById('bbHighScore');

        if (curEl) {
            curEl.textContent = bbState.score.toLocaleString();
            if (bump) {
                curEl.classList.add('bump');
                setTimeout(() => curEl.classList.remove('bump'), 220);
            }
        }
        if (highEl) {
            highEl.textContent = bbState.highScore.toLocaleString();
        }
    }

    function updateComboUI() {
        const badge = document.getElementById('bbComboBadge');
        const text = document.getElementById('bbComboText');
        if (!badge || !text) return;

        if (bbState.comboCount >= 2) {
            badge.style.display = 'inline-flex';
            text.textContent = `Combo x${bbState.comboCount}`;
        } else {
            badge.style.display = 'none';
        }
    }

    function showFloatingText(linesCount, combo, score) {
        const layer = document.getElementById('bbFloatingTextLayer');
        if (!layer) return;

        const div = document.createElement('div');
        div.className = 'bb-float-text';

        let label = `+${score}`;
        if (combo >= 4) {
            label = `UNBELIEVABLE! 🔥 +${score}`;
        } else if (combo === 3) {
            label = `SPECTACULAR! ⚡ +${score}`;
        } else if (combo === 2) {
            label = `AWESOME! ✨ +${score}`;
        } else if (linesCount >= 3) {
            label = `TRIPLE BLAST! 💥 +${score}`;
        } else if (linesCount === 2) {
            label = `DOUBLE BLAST! ✨ +${score}`;
        }

        div.textContent = label;
        div.style.left = '50%';
        div.style.top = '48%';

        layer.appendChild(div);
        setTimeout(() => div.remove(), 900);
    }

    // GAME OVER
    function checkGameOver() {
        const activePieces = bbState.tray.filter(p => p !== null);
        if (activePieces.length === 0) return;

        const anyFit = activePieces.some(p => canPieceFitAnywhere(p.matrix));

        if (!anyFit) {
            bbState.isGameOver = true;
            bbSounds.playGameOver();
            setTimeout(triggerGameOver, 600);
        }
    }

    function triggerGameOver() {
        const modal = document.getElementById('modalBbGameOver');
        if (!modal) return;

        const endScore = document.getElementById('endBbScore');
        const endHighScore = document.getElementById('endBbHighScore');
        const endLines = document.getElementById('endBbLinesCleared');
        const endCombo = document.getElementById('endBbMaxCombo');
        const recordPill = document.getElementById('newBbRecordPill');

        if (endScore) endScore.textContent = bbState.score.toLocaleString();
        if (endHighScore) endHighScore.textContent = bbState.highScore.toLocaleString();
        if (endLines) endLines.textContent = bbState.linesClearedTotal;
        if (endCombo) endCombo.textContent = `x${bbState.maxCombo}`;

        if (recordPill) {
            recordPill.style.display = (bbState.score >= bbState.highScore && bbState.score > 0) ? 'inline-block' : 'none';
        }

        modal.classList.add('active');
    }

    function restartGame() {
        const modal = document.getElementById('modalBbGameOver');
        if (modal) modal.classList.remove('active');

        bbState.grid = Array(8).fill(null).map(() => Array(8).fill(null));
        bbState.tray = [null, null, null];
        bbState.score = 0;
        bbState.comboCount = 0;
        bbState.maxCombo = 0;
        bbState.linesClearedTotal = 0;
        bbState.isGameOver = false;
        bbState.selectedSlotIndex = null;

        initGridDOM();
        renderScores(false);
        updateComboUI();
        updateTrayHint('Kéo hoặc chạm vào khối gạch để đặt vào bàn chơi');

        spawnNewPieces();
    }

    function onShow() {
        if (bbParticleFx) bbParticleFx.resize();
        renderScores(false);
        renderTray();
    }

    function init() {
        const savedBest = localStorage.getItem('blockblast_best_score');
        if (savedBest) bbState.highScore = parseInt(savedBest, 10) || 0;

        const soundPref = localStorage.getItem('blockblast_sound_enabled');
        if (soundPref !== null) {
            bbState.soundEnabled = soundPref === 'true';
        }
        const soundIcon = document.getElementById('bbSoundIcon');
        if (soundIcon) soundIcon.textContent = bbState.soundEnabled ? '🔊' : '🔇';

        const btnSound = document.getElementById('btnBbToggleSound');
        if (btnSound) {
            btnSound.addEventListener('click', () => {
                bbState.soundEnabled = !bbState.soundEnabled;
                localStorage.setItem('blockblast_sound_enabled', bbState.soundEnabled);
                if (soundIcon) soundIcon.textContent = bbState.soundEnabled ? '🔊' : '🔇';
                bbSounds.init();
            });
        }

        const btnRestart = document.getElementById('btnBbRestart');
        if (btnRestart) btnRestart.addEventListener('click', restartGame);

        const btnPlayAgain = document.getElementById('btnBbPlayAgain');
        if (btnPlayAgain) btnPlayAgain.addEventListener('click', restartGame);

        const btnHelp = document.getElementById('btnBbHelp');
        const modalHelp = document.getElementById('modalBbHelp');
        const btnCloseHelp = document.getElementById('btnCloseBbHelp');
        if (btnHelp && modalHelp) {
            btnHelp.addEventListener('click', () => modalHelp.classList.add('active'));
        }
        if (btnCloseHelp && modalHelp) {
            btnCloseHelp.addEventListener('click', () => modalHelp.classList.remove('active'));
        }
        if (modalHelp) {
            modalHelp.addEventListener('click', (e) => {
                if (e.target === modalHelp) modalHelp.classList.remove('active');
            });
        }

        bbParticleFx = new BbParticleFx();
        restartGame();
    }

    return {
        init,
        restartGame,
        onShow,
        getState: () => bbState
    };
})();
