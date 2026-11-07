/**
 * ========================================================
 * SUDOKU VINTAGE LUXURY - HUY & HIỀN EDITION
 * - Bộ tạo đề Sudoku tự động chuẩn thuật toán Backtracking
 * - 4 cấp độ: Dễ (Easy), Vừa (Medium), Khó (Hard), Chuyên Gia (Expert)
 * - Chế độ Ghi chú Bút chì (Pencil Notes 3x3)
 * - Bàn phím số 1-9 thanh lịch + Phím tắt bàn phím vật lý
 * - Tự động Highlight thông minh: Hàng, Cột, Khối 3x3 và các ô cùng số
 * - Bộ đếm thời gian (Timer) & Đếm lỗi sai (Mistakes counter)
 * - Hiệu ứng âm thanh Web Audio API & Banner mừng chiến thắng
 * ========================================================
 */

window.SudokuGame = (function () {
    'use strict';

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

            if (type === 'tap') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
                osc.start(now);
                osc.stop(now + 0.07);
            } else if (type === 'note') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
            } else if (type === 'error') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(180, now);
                osc.frequency.linearRampToValueAtTime(110, now + 0.18);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
                osc.start(now);
                osc.stop(now + 0.19);
            } else if (type === 'win') {
                const notes = [523.25, 659.25, 783.99, 1046.50];
                notes.forEach((f, i) => {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.connect(g);
                    g.connect(ctx.destination);
                    o.type = 'triangle';
                    o.frequency.setValueAtTime(f, now + i * 0.1);
                    g.gain.setValueAtTime(0.25, now + i * 0.1);
                    g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.5);
                    o.start(now + i * 0.1);
                    o.stop(now + i * 0.1 + 0.5);
                });
            }
        } catch (e) {
            console.warn('[Sudoku] Audio error:', e);
        }
    }

    /**
     * THUẬT TOÁN TẠO BÀNG & GIẢI SUDOKU
     */
    function isValidNum(grid, r, c, num) {
        // Kiểm tra hàng và cột
        for (let i = 0; i < 9; i++) {
            if (grid[r][i] === num && i !== c) return false;
            if (grid[i][c] === num && i !== r) return false;
        }
        // Kiểm tra khối 3x3
        const boxR = Math.floor(r / 3) * 3;
        const boxC = Math.floor(c / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const tr = boxR + i;
                const tc = boxC + j;
                if (grid[tr][tc] === num && (tr !== r || tc !== c)) return false;
            }
        }
        return true;
    }

    function solveSudoku(grid) {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (grid[r][c] === 0) {
                    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
                    for (const num of nums) {
                        if (isValidNum(grid, r, c, num)) {
                            grid[r][c] = num;
                            if (solveSudoku(grid)) return true;
                            grid[r][c] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function generateFullSolution() {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        // Điền trước 3 khối đường chéo (chúng độc lập nhau)
        for (let box = 0; box < 9; box += 3) {
            const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
            let idx = 0;
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    grid[box + r][box + c] = nums[idx++];
                }
            }
        }
        solveSudoku(grid);
        return grid;
    }

    function generatePuzzle(difficulty) {
        const solution = generateFullSolution();
        const puzzle = solution.map(row => [...row]);

        let cluesToKeep = 38;
        if (difficulty === 'easy') cluesToKeep = 42;
        else if (difficulty === 'medium') cluesToKeep = 32;
        else if (difficulty === 'hard') cluesToKeep = 26;
        else if (difficulty === 'expert') cluesToKeep = 22;

        const cellsToRemove = 81 - cluesToKeep;
        const positions = [];
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                positions.push([r, c]);
            }
        }
        positions.sort(() => Math.random() - 0.5);

        for (let i = 0; i < cellsToRemove; i++) {
            const [r, c] = positions[i];
            puzzle[r][c] = 0;
        }

        return { solution, puzzle };
    }

    /**
     * TRẠNG THÁI TRÒ CHƠI
     */
    let solutionGrid = [];
    let initialGrid = [];
    let currentGrid = [];
    let notesGrid = []; // Mảng 9x9, mỗi phần tử là Set các số ghi chú
    let selectedCell = null; // { r, c }
    let isPencilMode = false;
    let mistakes = 0;
    let maxMistakes = 3;
    let difficulty = 'easy'; // 'easy' | 'medium' | 'hard' | 'expert'
    let timerInterval = null;
    let timerSeconds = 0;
    let isGameWon = false;
    let actionHistory = []; // Lưu các thao tác để hoàn tác

    function startTimer() {
        clearInterval(timerInterval);
        timerSeconds = 0;
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            if (!isGameWon) {
                timerSeconds++;
                updateTimerDisplay();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const el = document.getElementById('sudokuTimerDisplay');
        if (!el) return;
        const mm = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
        const ss = String(timerSeconds % 60).padStart(2, '0');
        el.textContent = `${mm}:${ss}`;
    }

    function newGame(diff = difficulty) {
        difficulty = diff;
        const generated = generatePuzzle(difficulty);
        solutionGrid = generated.solution;
        initialGrid = generated.puzzle;
        currentGrid = initialGrid.map(row => [...row]);
        notesGrid = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Set()));
        selectedCell = null;
        mistakes = 0;
        isGameWon = false;
        actionHistory = [];

        updateMistakesDisplay();
        hideWinBanner();
        startTimer();
        renderBoard();
    }

    function updateMistakesDisplay() {
        const el = document.getElementById('sudokuMistakesDisplay');
        if (!el) return;
        el.textContent = `${mistakes}/${maxMistakes}`;
    }

    function showWinBanner() {
        const banner = document.getElementById('sudokuNoticeBanner');
        if (!banner) return;
        const mm = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
        const ss = String(timerSeconds % 60).padStart(2, '0');
        banner.innerHTML = `<strong>Chúc Mừng!</strong> Bạn đã giải xong câu đố Sudoku (${difficulty.toUpperCase()}) trong thời gian <strong>${mm}:${ss}</strong>!`;
        banner.className = 'sudoku-notice-banner active';
    }

    function hideWinBanner() {
        const banner = document.getElementById('sudokuNoticeBanner');
        if (!banner) return;
        banner.className = 'sudoku-notice-banner';
    }

    /**
     * VẼ BÀN CỜ 9x9
     */
    function renderBoard() {
        const gridEl = document.getElementById('sudokuBoardGrid');
        if (!gridEl) return;
        gridEl.innerHTML = '';

        const selVal = selectedCell ? currentGrid[selectedCell.r][selectedCell.c] : null;

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const cell = document.createElement('div');
                cell.className = 'sudoku-cell';

                // Đánh dấu đường phân khối 3x3 theo chiều ngang
                if (r === 2 || r === 5) cell.classList.add('row-divider');
                if (r === 8) cell.classList.add('bottom-edge');

                const val = currentGrid[r][c];
                const isClue = initialGrid[r][c] !== 0;

                if (isClue) {
                    cell.classList.add('clue');
                    cell.textContent = val;
                } else if (val !== 0) {
                    cell.classList.add('user-input');
                    cell.textContent = val;

                    // Kiểm tra nếu sai so với lời giải chuẩn
                    if (val !== solutionGrid[r][c]) {
                        cell.classList.add('error');
                    }
                } else {
                    // Nếu ô trống và có ghi chú bút chì
                    const notes = notesGrid[r][c];
                    if (notes && notes.size > 0) {
                        const notesWrap = document.createElement('div');
                        notesWrap.className = 'sudoku-notes-grid';
                        for (let n = 1; n <= 9; n++) {
                            const noteNum = document.createElement('div');
                            noteNum.className = 'sudoku-note-num';
                            if (notes.has(n)) noteNum.textContent = n;
                            notesWrap.appendChild(noteNum);
                        }
                        cell.appendChild(notesWrap);
                    }
                }

                // Highlighting tương tác
                if (selectedCell) {
                    if (selectedCell.r === r && selectedCell.c === c) {
                        cell.classList.add('selected');
                    } else if (
                        selectedCell.r === r ||
                        selectedCell.c === c ||
                        (Math.floor(selectedCell.r / 3) === Math.floor(r / 3) && Math.floor(selectedCell.c / 3) === Math.floor(c / 3))
                    ) {
                        cell.classList.add('peer');
                    }

                    if (selVal && val === selVal && val !== 0) {
                        cell.classList.add('same-number');
                    }
                }

                cell.addEventListener('click', () => onCellSelect(r, c));
                gridEl.appendChild(cell);
            }
        }
    }

    function onCellSelect(r, c) {
        selectedCell = { r, c };
        renderBoard();
    }

    /**
     * NHẬP SỐ VÀO Ô
     */
    function enterNumber(num) {
        if (!selectedCell || isGameWon) return;
        const { r, c } = selectedCell;

        // Không cho sửa các ô đề bài gốc
        if (initialGrid[r][c] !== 0) return;

        if (isPencilMode) {
            // Chế độ bút chì: Thêm hoặc xóa số trong ghi chú
            const set = notesGrid[r][c];
            if (set.has(num)) {
                set.delete(num);
            } else {
                set.add(num);
            }
            playSound('note');
            renderBoard();
            return;
        }

        // Chế độ điền số thường
        const prevVal = currentGrid[r][c];
        if (prevVal === num) return; // Không thay đổi

        actionHistory.push({
            r, c,
            oldVal: prevVal,
            newVal: num,
            oldNotes: new Set(notesGrid[r][c])
        });

        currentGrid[r][c] = num;
        notesGrid[r][c].clear();

        // Kiểm tra đúng hay sai
        if (num !== solutionGrid[r][c]) {
            mistakes++;
            updateMistakesDisplay();
            playSound('error');
        } else {
            playSound('tap');
            checkWinCondition();
        }

        renderBoard();
    }

    function eraseCell() {
        if (!selectedCell || isGameWon) return;
        const { r, c } = selectedCell;
        if (initialGrid[r][c] !== 0) return;

        const prevVal = currentGrid[r][c];
        const prevNotes = new Set(notesGrid[r][c]);

        if (prevVal !== 0 || prevNotes.size > 0) {
            actionHistory.push({
                r, c,
                oldVal: prevVal,
                newVal: 0,
                oldNotes: prevNotes
            });
            currentGrid[r][c] = 0;
            notesGrid[r][c].clear();
            playSound('tap');
            renderBoard();
        }
    }

    function undoAction() {
        if (actionHistory.length === 0 || isGameWon) return;
        const lastAction = actionHistory.pop();
        currentGrid[lastAction.r][lastAction.c] = lastAction.oldVal;
        notesGrid[lastAction.r][lastAction.c] = new Set(lastAction.oldNotes);
        playSound('tap');
        renderBoard();
    }

    function giveHint() {
        if (!selectedCell || isGameWon) return;
        const { r, c } = selectedCell;
        if (initialGrid[r][c] !== 0) return;

        const correctNum = solutionGrid[r][c];
        enterNumber(correctNum);
    }

    function checkWinCondition() {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (currentGrid[r][c] !== solutionGrid[r][c]) {
                    return false;
                }
            }
        }
        isGameWon = true;
        clearInterval(timerInterval);
        playSound('win');
        showWinBanner();
        return true;
    }

    /**
     * KHỞI TẠO BẮT SỰ KIỆN
     */
    function init() {
        // Tab chọn độ khó
        document.querySelectorAll('.sudoku-diff-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.sudoku-diff-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const diff = tab.getAttribute('data-diff');
                newGame(diff);
            });
        });

        // Bàn phím số 1-9
        document.querySelectorAll('.sudoku-num-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const num = parseInt(btn.getAttribute('data-num'), 10);
                if (num >= 1 && num <= 9) {
                    enterNumber(num);
                }
            });
        });

        // Nút Bút chì
        const btnPencil = document.getElementById('sudokuBtnPencil');
        if (btnPencil) {
            btnPencil.addEventListener('click', () => {
                isPencilMode = !isPencilMode;
                btnPencil.classList.toggle('active', isPencilMode);
            });
        }

        // Nút Xóa
        const btnErase = document.getElementById('sudokuBtnErase');
        if (btnErase) btnErase.addEventListener('click', eraseCell);

        // Nút Hoàn tác
        const btnUndo = document.getElementById('sudokuBtnUndo');
        if (btnUndo) btnUndo.addEventListener('click', undoAction);

        // Nút Gợi ý
        const btnHint = document.getElementById('sudokuBtnHint');
        if (btnHint) btnHint.addEventListener('click', giveHint);

        // Nút Ván mới
        const btnNew = document.getElementById('sudokuBtnNewGame');
        if (btnNew) btnNew.addEventListener('click', () => newGame(difficulty));

        // Phím tắt bàn phím máy tính
        window.addEventListener('keydown', (e) => {
            const panel = document.getElementById('viewSudoku');
            if (!panel || !panel.classList.contains('active')) return;

            if (e.key >= '1' && e.key <= '9') {
                enterNumber(parseInt(e.key, 10));
            } else if (e.key === 'Backspace' || e.key === 'Delete') {
                eraseCell();
            } else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
                undoAction();
            } else if (e.key === 'ArrowUp' && selectedCell) {
                if (selectedCell.r > 0) onCellSelect(selectedCell.r - 1, selectedCell.c);
            } else if (e.key === 'ArrowDown' && selectedCell) {
                if (selectedCell.r < 8) onCellSelect(selectedCell.r + 1, selectedCell.c);
            } else if (e.key === 'ArrowLeft' && selectedCell) {
                if (selectedCell.c > 0) onCellSelect(selectedCell.r, selectedCell.c - 1);
            } else if (e.key === 'ArrowRight' && selectedCell) {
                if (selectedCell.c < 8) onCellSelect(selectedCell.r, selectedCell.c + 1);
            }
        });

        newGame('easy');
    }

    return {
        init,
        newGame
    };
})();
