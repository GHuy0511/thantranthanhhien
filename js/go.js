/**
 * ========================================================
 * TRÒ CHƠI CỜ VÂY (GO / WEIQI / BADUK) CHO HUY & HIỀN
 * - Bàn cờ 9x9 (Đánh nhanh) & 13x13 (Tiêu chuẩn)
 * - Đầy đủ luật cờ vây quốc tế:
 *    * Khí (Liberties) & Bắt quân (Capture)
 *    * Cấm tự sát (Suicide rule)
 *    * Luật Ko (Cấm cướp lại lặp thế cờ tức thì)
 *    * Bỏ lượt (Pass) & 2 lượt liên tiếp kết thúc ván
 *    * Đếm đất lãnh thổ (Territory scoring) + Komi 5.5 cho Trắng
 * - 3 Chế độ chơi:
 *    1. Đấu với Người Yêu (P2P trực tuyến 2 máy xa nhau)
 *    2. Đấu với AI Máy thông minh
 *    3. Cùng 1 Máy (Pass & Play)
 * - Tối giản, thanh lịch pastel, không icon rườm rà.
 * ========================================================
 */

window.GoGame = (function () {
    'use strict';

    let BOARD_SIZE = 9; // 9 hoặc 13
    const KOMI = 5.5; // Điểm bù cho bên Trắng đi sau

    let state = {
        size: 9,
        board: [], // 2D array: null, 'B', 'W'
        currentTurn: 'B', // 'B' (Black - Đen) đi trước, 'W' (White - Trắng)
        prisoners: { B: 0, W: 0 }, // Tù binh bắt được (B: Đen đã bắt bao nhiêu quân Trắng, W: Trắng đã bắt bao nhiêu quân Đen)
        gameMode: 'p2p', // 'p2p', 'ai', 'pass'
        aiLevel: 'medium',
        isGameOver: false,
        winner: null,
        winReason: '',
        consecutivePasses: 0,
        history: [], // Stack các trạng thái để Undo
        previousBoardHash: null, // Để kiểm tra luật Ko
        lastMove: null,
        scores: { black: 0, white: 0 }
    };

    // Web Audio tiếng gõ cờ lách cách ấm áp
    class GoAudio {
        constructor() { this.ctx = null; }
        init() {
            if (!this.ctx) {
                const AC = window.AudioContext || window.webkitAudioContext;
                if (AC) this.ctx = new AC();
            }
            if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
        }
        playStone() {
            try {
                this.init();
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(320, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.06);
            } catch (e) {}
        }
        playCapture() {
            try {
                this.init();
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, this.ctx.currentTime);
                osc.frequency.setValueAtTime(587, this.ctx.currentTime + 0.06);
                gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.14);
            } catch (e) {}
        }
    }
    const audio = new GoAudio();

    // Khởi tạo trò chơi
    
    function loadGoScores() {
        try {
            const raw = localStorage.getItem('couple_go_scores_v2');
            if (raw) state.scores = JSON.parse(raw);
        } catch (e) {}
    }

    function saveGoScores() {
        try {
            localStorage.setItem('couple_go_scores_v2', JSON.stringify(state.scores));
        } catch (e) {}
    }

    function resetGoScores() {
        state.scores = { black: 0, white: 0 };
        saveGoScores();
        updateGoScoreUI();
        showStatusNotice('✨ Đã đặt lại bảng tỷ số Cờ Vây về 0 - 0!');
    }

    function updateGoScoreUI() {
        const elB = document.getElementById('goScoreBlack');
        const elW = document.getElementById('goScoreWhite');
        if (elB) elB.textContent = state.scores ? state.scores.black : 0;
        if (elW) elW.textContent = state.scores ? state.scores.white : 0;
        GoBrain.updateUI();
    }

    function init() {
        loadGoScores();
        GoBrain.init();
        bindEvents();
        initP2PNetworkSync();
        resetGame(BOARD_SIZE, false);
    }

    function onShow() {
        renderBoardDOM();
        updateUI();
    }

    function resetGame(size = 9, notify = true) {
        BOARD_SIZE = size;
        state.size = size;
        state.board = Array(size).fill(null).map(() => Array(size).fill(null));
        state.currentTurn = 'B';
        state.prisoners = { B: 0, W: 0 };
        state.isGameOver = false;
        state.winner = null;
        state.winReason = '';
        state.consecutivePasses = 0;
        state.history = [];
        state.previousBoardHash = null;
        state.lastMove = null;

        renderBoardDOM();
        updateUI();
        showStatusNotice('Ván cờ mới bắt đầu. Quân Đen đi trước.');

        if (notify && state.gameMode === 'p2p' && window.CoupleNetwork) {
            window.CoupleNetwork.send({ type: 'go_restart', size: size });
        }
    }

    // ========================================================
    // LUẬT CỜ VÂY (CORE GO RULES ENGINE)
    // ========================================================

    // Lấy các điểm kề cạnh (orthogonal neighbors)
    function getNeighbors(r, c, size = BOARD_SIZE) {
        const neighbors = [];
        if (r > 0) neighbors.push({ r: r - 1, c });
        if (r < size - 1) neighbors.push({ r: r + 1, c });
        if (c > 0) neighbors.push({ r, c: c - 1 });
        if (c < size - 1) neighbors.push({ r, c: c + 1 });
        return neighbors;
    }

    // Tìm chuỗi quân liền kề cùng màu và tính Khí (Liberties)
    function findGroupAndLiberties(board, startR, startC) {
        const color = board[startR][startC];
        if (!color) return {
        resetScores: resetGoScores,
        resetBrain: () => GoBrain.reset(), stones: [], liberties: new Set() };

        const stones = [];
        const liberties = new Set();
        const visited = new Set();
        const queue = [{ r: startR, c: startC }];
        visited.add(`${startR},${startC}`);

        while (queue.length > 0) {
            const current = queue.shift();
            stones.push(current);

            const neighbors = getNeighbors(current.r, current.c, board.length);
            for (const n of neighbors) {
                const neighborColor = board[n.r][n.c];
                const key = `${n.r},${n.c}`;

                if (neighborColor === null) {
                    liberties.add(key);
                } else if (neighborColor === color && !visited.has(key)) {
                    visited.add(key);
                    queue.push(n);
                }
            }
        }

        return {
        resetScores: resetGoScores,
        resetBrain: () => GoBrain.reset(), stones, liberties };
    }

    // Tạo hash chuỗi bàn cờ để kiểm tra luật Ko
    function getBoardHash(board) {
        return board.map(row => row.map(cell => cell || '.').join('')).join('');
    }

    // Thực hiện nước đi và trả về kết quả hợp lệ
    function tryPlayMove(r, c, color, isCheckOnly = false) {
        if (state.isGameOver) return {
        resetScores: resetGoScores,
        resetBrain: () => GoBrain.reset(), valid: false, reason: 'Ván cờ đã kết thúc' };
        if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) return {
        resetScores: resetGoScores,
        resetBrain: () => GoBrain.reset(), valid: false, reason: 'Tọa độ ngoài bàn cờ' };
        if (state.board[r][c] !== null) return {
        resetScores: resetGoScores,
        resetBrain: () => GoBrain.reset(), valid: false, reason: 'Giao điểm đã có quân' };

        // Sao chép bàn cờ giả định
        const tempBoard = state.board.map(row => [...row]);
        tempBoard[r][c] = color;
        const opponentColor = color === 'B' ? 'W' : 'B';

        // 1. Kiểm tra các nhóm đối thủ kề bên xem có nhóm nào bị hết khí (bị bắt) không
        const neighbors = getNeighbors(r, c, BOARD_SIZE);
        const capturedStones = [];
        const visitedOpponentStones = new Set();

        for (const n of neighbors) {
            if (tempBoard[n.r][n.c] === opponentColor && !visitedOpponentStones.has(`${n.r},${n.c}`)) {
                const oppGroup = findGroupAndLiberties(tempBoard, n.r, n.c);
                oppGroup.stones.forEach(s => visitedOpponentStones.add(`${s.r},${s.c}`));

                if (oppGroup.liberties.size === 0) {
                    capturedStones.push(...oppGroup.stones);
                }
            }
        }

        // 2. Nhấc quân bị bắt ra khỏi bàn cờ giả định
        for (const s of capturedStones) {
            tempBoard[s.r][s.c] = null;
        }

        // 3. Kiểm tra tính tự sát (Suicide rule)
        const myGroup = findGroupAndLiberties(tempBoard, r, c);
        if (myGroup.liberties.size === 0) {
            return {
        resetScores: resetGoScores,
        resetBrain: () => GoBrain.reset(), valid: false, reason: 'Nước đi tự sát! Không hợp lệ theo luật Cờ Vây.' };
        }

        // 4. Kiểm tra luật Ko (Cấm cướp lại trạng thái bàn cờ vừa diễn ra)
        const newHash = getBoardHash(tempBoard);
        if (state.previousBoardHash && newHash === state.previousBoardHash) {
            return {
        resetScores: resetGoScores,
        resetBrain: () => GoBrain.reset(), valid: false, reason: 'Luật Ko: Không được cướp lại ngay lập tức!' };
        }

        if (isCheckOnly) {
            return {
        resetScores: resetGoScores,
        resetBrain: () => GoBrain.reset(), valid: true, capturedStones };
        }

        // Áp dụng nước đi thực tế
        saveStateToHistory();
        state.previousBoardHash = getBoardHash(state.board);
        state.board = tempBoard;
        state.lastMove = { r, c };
        state.consecutivePasses = 0;

        if (capturedStones.length > 0) {
            state.prisoners[color] += capturedStones.length;
            audio.playCapture();
            showStatusNotice(`${color === 'B' ? 'Đen' : 'Trắng'} đã bắt được ${capturedStones.length} quân đối phương!`);
        } else {
            audio.playStone();
        }

        return {
        resetScores: resetGoScores,
        resetBrain: () => GoBrain.reset(), valid: true, capturedStones };
    }

    // Xử lý khi người chơi bấm đặt quân
    function handlePointClick(r, c) {
        if (state.isGameOver) return;

        // Nếu P2P, kiểm tra xem có phải lượt của mình không
        if (state.gameMode === 'p2p') {
            const myRole = window.CoupleNetwork ? window.CoupleNetwork.getMyRole() : 'huy';
            // Quy ước: Huy cầm Đen ('B') đi trước, Hiền cầm Trắng ('W')
            const expectedColor = myRole === 'huy' ? 'B' : 'W';
            if (state.currentTurn !== expectedColor) {
                const partnerOn = window.CoupleNetwork ? window.CoupleNetwork.isPartnerOnline() : false;
                if (!partnerOn) {
                    showStatusNotice('Đối thủ đang Offline. Bấm "Mời bạn" hoặc chuyển sang "Đấu với AI" / "Cùng 1 Máy" để chơi ngay nhé!');
                } else {
                    showStatusNotice('Đang là lượt đi của đối thủ, hãy chờ nhé...');
                }
                return;
            }
        }

        const res = tryPlayMove(r, c, state.currentTurn);
        if (!res.valid) {
            showStatusNotice(res.reason);
            return;
        }

        // Bắn tín hiệu sang đối phương nếu chơi P2P
        if (state.gameMode === 'p2p' && window.CoupleNetwork) {
            window.CoupleNetwork.send({
                type: 'go_move',
                r: r,
                c: c,
                color: state.currentTurn
            });
        }

        // Đổi lượt
        state.currentTurn = state.currentTurn === 'B' ? 'W' : 'B';
        renderBoardDOM();
        updateUI();

        // Nếu chế độ AI và đến lượt AI
        if (state.gameMode === 'ai' && state.currentTurn === 'W' && !state.isGameOver) {
            setTimeout(makeAiMove, 550);
        }
    }

    // Bỏ lượt (Pass)
    function handlePass(isNetwork = false) {
        if (state.isGameOver) return;

        if (!isNetwork && state.gameMode === 'p2p') {
            const myRole = window.CoupleNetwork ? window.CoupleNetwork.getMyRole() : 'huy';
            const expectedColor = myRole === 'huy' ? 'B' : 'W';
            if (state.currentTurn !== expectedColor) return;

            if (window.CoupleNetwork) {
                window.CoupleNetwork.send({ type: 'go_pass', color: state.currentTurn });
            }
        }

        saveStateToHistory();
        state.consecutivePasses++;
        const passingPlayer = state.currentTurn === 'B' ? 'Đen' : 'Trắng';
        showStatusNotice(`${passingPlayer} đã bỏ lượt.`);

        if (state.consecutivePasses >= 2) {
            // Cả hai người cùng bỏ lượt -> Kết thúc ván cờ, tính điểm đất!
            finishGameByScoring();
            return;
        }

        state.currentTurn = state.currentTurn === 'B' ? 'W' : 'B';
        renderBoardDOM();
        updateUI();

        if (state.gameMode === 'ai' && state.currentTurn === 'W' && !state.isGameOver) {
            setTimeout(makeAiMove, 600);
        }
    }

    // Đầu hàng (Resign)
    function handleResign(isNetwork = false) {
        if (state.isGameOver) return;

        const loser = state.currentTurn;
        const winner = loser === 'B' ? 'W' : 'B';
        const loserName = loser === 'B' ? 'Đen' : 'Trắng';
        const winnerName = winner === 'B' ? 'Đen' : 'Trắng';

        if (!isNetwork && state.gameMode === 'p2p' && window.CoupleNetwork) {
            window.CoupleNetwork.send({ type: 'go_surrender', color: loser });
        }

        state.isGameOver = true;
        state.winner = winner;
        if (state.scores) {
            if (winner === 'B') state.scores.black++;
            else state.scores.white++;
        }
        saveGoScores();
        updateGoScoreUI();
        if (state.gameMode === 'ai') {
            GoBrain.learnFromGame(winner, state.history);
        }
        state.winReason = `${loserName} đã xin đầu hàng. ${winnerName} chiến thắng!`;

        updateUI();
        showStatusNotice(state.winReason);
        showScoringModal();
    }

    // Đi lại (Undo)
    function handleUndo() {
        if (state.history.length === 0 || state.isGameOver) {
            showStatusNotice('Không có nước đi nào để quay lại.');
            return;
        }

        if (state.gameMode === 'p2p') {
            if (window.CoupleNetwork && window.CoupleNetwork.isPartnerOnline()) {
                window.CoupleNetwork.send({ type: 'go_undo_req' });
                showStatusNotice('Đã gửi yêu cầu xin đi lại cho đối thủ...');
            } else {
                showStatusNotice('Đối thủ đang offline, không thể gửi yêu cầu.');
            }
            return;
        }

        // Cùng máy hoặc AI
        if (state.gameMode === 'ai') {
            // Lùi 2 nước (nước của máy + nước của người)
            if (state.history.length >= 2) {
                popHistoryState();
                popHistoryState();
            } else {
                popHistoryState();
            }
        } else {
            popHistoryState();
        }

        renderBoardDOM();
        updateUI();
        showStatusNotice('Đã quay lại nước đi trước.');
    }

    function saveStateToHistory() {
        state.history.push({
            board: state.board.map(r => [...r]),
            currentTurn: state.currentTurn,
            prisoners: { ...state.prisoners },
            previousBoardHash: state.previousBoardHash,
            lastMove: state.lastMove ? { ...state.lastMove } : null,
            consecutivePasses: state.consecutivePasses
        });
    }

    function popHistoryState() {
        if (state.history.length === 0) return;
        const prev = state.history.pop();
        state.board = prev.board;
        state.currentTurn = prev.currentTurn;
        state.prisoners = prev.prisoners;
        state.previousBoardHash = prev.previousBoardHash;
        state.lastMove = prev.lastMove;
        state.consecutivePasses = prev.consecutivePasses;
    }

    // ========================================================
    // TÍNH ĐIỂM LÃNH THỔ (TERRITORY SCORING ENGINE)
    // ========================================================
    function calculateTerritory() {
        const visited = Array(BOARD_SIZE).fill(false).map(() => Array(BOARD_SIZE).fill(false));
        let blackTerritory = 0;
        let whiteTerritory = 0;

        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                if (state.board[r][c] === null && !visited[r][c]) {
                    // Flood fill vùng đất trống
                    const region = [];
                    const queue = [{ r, c }];
                    visited[r][c] = true;
                    const touchingColors = new Set();

                    while (queue.length > 0) {
                        const curr = queue.shift();
                        region.push(curr);

                        const neighbors = getNeighbors(curr.r, curr.c, BOARD_SIZE);
                        for (const n of neighbors) {
                            const val = state.board[n.r][n.c];
                            if (val === null) {
                                if (!visited[n.r][n.c]) {
                                    visited[n.r][n.c] = true;
                                    queue.push(n);
                                }
                            } else {
                                touchingColors.add(val);
                            }
                        }
                    }

                    // Nếu vùng trống chỉ tiếp giáp với DUY NHẤT một màu -> đó là lãnh thổ của màu đó
                    if (touchingColors.size === 1) {
                        if (touchingColors.has('B')) blackTerritory += region.length;
                        else if (touchingColors.has('W')) whiteTerritory += region.length;
                    }
                }
            }
        }

        return {
        resetScores: resetGoScores,
        resetBrain: () => GoBrain.reset(),
            blackTerritory,
            whiteTerritory,
            blackPrisoners: state.prisoners.B,
            whitePrisoners: state.prisoners.W,
            komi: KOMI,
            blackTotal: blackTerritory + state.prisoners.B,
            whiteTotal: whiteTerritory + state.prisoners.W + KOMI
        };
    }

    function finishGameByScoring() {
        const score = calculateTerritory();
        state.isGameOver = true;
        if (score.blackTotal > score.whiteTotal) {
            state.winner = 'B';
            if (state.scores) state.scores.black++;
            state.winReason = `Đen chiến thắng cách biệt ${(score.blackTotal - score.whiteTotal).toFixed(1)} mục!`;
        } else {
            state.winner = 'W';
            if (state.scores) state.scores.white++;
            state.winReason = `Trắng chiến thắng cách biệt ${(score.whiteTotal - score.blackTotal).toFixed(1)} mục!`;
        }
        saveGoScores();
        updateGoScoreUI();
        if (state.gameMode === 'ai') {
            GoBrain.learnFromGame(state.winner, state.history);
        }
        updateUI();
        showStatusNotice(state.winReason);
        showScoringModal(score);
    }

    // ========================================================
    
    // ========================================================
    // BỘ NÃO HỌC MÁY CỦA AI CỜ VÂY (GO MACHINE LEARNING BRAIN)
    // ========================================================
    const GoBrain = {
        STORAGE_KEY: 'couple_go_brain_memory_v2',
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

        learnFromGame(winner, history) {
            if (!history || history.length < 2) return;
            this.memory.totalGamesLearned++;
            history.slice(0, 10).forEach(entry => {
                if (entry.lastMove) {
                    const key = `${entry.lastMove.r},${entry.lastMove.c}`;
                    this.memory.openings[key] = (this.memory.openings[key] || 0) + (winner === 'W' ? 25 : 15);
                }
            });
            this.save();
        },

        getMoveBonus(r, c) {
            if (!this.memory || !this.memory.openings) return 0;
            const key = `${r},${c}`;
            return (this.memory.openings[key] || 0);
        },

        updateUI() {
            const countEl = document.getElementById('goBrainLearnedCount');
            if (countEl && this.memory) {
                countEl.textContent = `${this.memory.totalGamesLearned || 0} ván kinh nghiệm`;
            }
        }
    };

    // TRÍ TUỆ NHÂN TẠO (AI ENGINE CHO CỜ VÂY)
    // ========================================================
    function makeAiMove() {
        if (state.isGameOver || state.currentTurn !== 'W') return;

        const aiColor = 'W';
        const candidateMoves = [];

        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                if (state.board[r][c] === null) {
                    const check = tryPlayMove(r, c, aiColor, true);
                    if (check.valid) {
                        let score = 10;

                        // 1. Nếu bắt được quân đối phương: ưu tiên rất cao
                        if (check.capturedStones && check.capturedStones.length > 0) {
                            score += 80 + check.capturedStones.length * 20;
                        }

                        // 2. Gần các sao và trung tâm ở giai đoạn đầu
                        const center = (BOARD_SIZE - 1) / 2;
                        const distFromCenter = Math.abs(r - center) + Math.abs(c - center);
                        score += (BOARD_SIZE - distFromCenter) * 2;

                        // 3. Bảo vệ chuỗi quân sắp bị bắt (cứu Atari)
                        const neighbors = getNeighbors(r, c, BOARD_SIZE);
                        for (const n of neighbors) {
                            if (state.board[n.r][n.c] === aiColor) {
                                const g = findGroupAndLiberties(state.board, n.r, n.c);
                                if (g.liberties.size === 1) score += 60; // Cứu nguy
                            } else if (state.board[n.r][n.c] === 'B') {
                                const g = findGroupAndLiberties(state.board, n.r, n.c);
                                if (g.liberties.size === 2) score += 35; // Ép vào thế Atari
                            }
                        }

                        const learnedBonus = GoBrain.getMoveBonus(r, c);
                        score += learnedBonus;
                        candidateMoves.push({ r, c, score });
                    }
                }
            }
        }

        if (candidateMoves.length === 0) {
            handlePass();
            return;
        }

        // Sắp xếp điểm số và chọn nước đi tốt nhất với chút ngẫu nhiên tự nhiên
        candidateMoves.sort((a, b) => b.score - a.score);
        const topMoves = candidateMoves.slice(0, Math.min(3, candidateMoves.length));
        const selected = topMoves[Math.floor(Math.random() * topMoves.length)];

        tryPlayMove(selected.r, selected.c, aiColor);
        state.currentTurn = 'B';
        renderBoardDOM();
        updateUI();
    }

    // ========================================================
    // ĐỒNG BỘ MẠNG P2P CHO CỜ VÂY
    // ========================================================
    function initP2PNetworkSync() {
        if (!window.CoupleNetwork) return;

        window.CoupleNetwork.onMessage((packet) => {
            if (packet.type === 'go_move') {
                if (state.gameMode === 'p2p') {
                    tryPlayMove(packet.r, packet.c, packet.color);
                    state.currentTurn = packet.color === 'B' ? 'W' : 'B';
                    renderBoardDOM();
                    updateUI();
                }
            } else if (packet.type === 'go_pass') {
                if (state.gameMode === 'p2p') {
                    handlePass(true);
                }
            } else if (packet.type === 'go_surrender') {
                if (state.gameMode === 'p2p') {
                    handleResign(true);
                }
            } else if (packet.type === 'go_restart') {
                if (state.gameMode === 'p2p') {
                    resetGame(packet.size || BOARD_SIZE, false);
                    showStatusNotice('Đối thủ đã bắt đầu ván cờ vây mới.');
                }
            } else if (packet.type === 'go_undo_req') {
                if (state.gameMode === 'p2p') {
                    showModalConfirm('Đối thủ muốn xin đi lại nước vừa rồi. Bạn có đồng ý không?', () => {
                        popHistoryState();
                        renderBoardDOM();
                        updateUI();
                        window.CoupleNetwork.send({ type: 'go_undo_ok' });
                        showStatusNotice('Đã đồng ý cho đối thủ đi lại.');
                    });
                }
            } else if (packet.type === 'go_undo_ok') {
                if (state.gameMode === 'p2p') {
                    popHistoryState();
                    renderBoardDOM();
                    updateUI();
                    showStatusNotice('Đối thủ đã đồng ý cho bạn đi lại!');
                }
            }
        });
    }

    // ========================================================
    // GIAO DIỆN & VẼ BÀN CỜ (DOM RENDERING)
    // ========================================================
    function renderBoardDOM() {
        const boardWrap = document.getElementById('goBoardCanvasWrap');
        if (!boardWrap) return;

        boardWrap.innerHTML = '';

        // 1. Tạo SVG lưới kẻ ô chuẩn cờ vây
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'go-board-svg');
        svg.setAttribute('viewBox', `0 0 100 100`);

        const step = 100 / BOARD_SIZE;
        const halfStep = step / 2;

        // Vẽ các đường kẻ ngang dọc
        for (let i = 0; i < BOARD_SIZE; i++) {
            const pos = halfStep + i * step;

            // Kẻ ngang
            const lineH = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            lineH.setAttribute('x1', halfStep);
            lineH.setAttribute('y1', pos);
            lineH.setAttribute('x2', 100 - halfStep);
            lineH.setAttribute('y2', pos);
            lineH.setAttribute('stroke', '#734b22');
            lineH.setAttribute('stroke-width', '0.6');
            svg.appendChild(lineH);

            // Kẻ dọc
            const lineV = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            lineV.setAttribute('x1', pos);
            lineV.setAttribute('y1', halfStep);
            lineV.setAttribute('x2', pos);
            lineV.setAttribute('y2', 100 - halfStep);
            lineV.setAttribute('stroke', '#734b22');
            lineV.setAttribute('stroke-width', '0.6');
            svg.appendChild(lineV);
        }

        // Vẽ điểm Sao (Hoshi)
        const starPoints = BOARD_SIZE === 9 
            ? [{ r: 2, c: 2 }, { r: 2, c: 6 }, { r: 6, c: 2 }, { r: 6, c: 6 }, { r: 4, c: 4 }]
            : [{ r: 3, c: 3 }, { r: 3, c: 9 }, { r: 9, c: 3 }, { r: 9, c: 9 }, { r: 6, c: 6 }];

        for (const sp of starPoints) {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', halfStep + sp.c * step);
            circle.setAttribute('cy', halfStep + sp.r * step);
            circle.setAttribute('r', '1.2');
            circle.setAttribute('fill', '#613b16');
            svg.appendChild(circle);
        }

        boardWrap.appendChild(svg);

        // 2. Lưới tương tác giao điểm
        const grid = document.createElement('div');
        grid.className = 'go-intersections-grid';
        grid.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${BOARD_SIZE}, 1fr)`;

        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                const pt = document.createElement('div');
                pt.className = 'go-point';
                pt.dataset.r = r;
                pt.dataset.c = c;

                const piece = state.board[r][c];
                if (piece) {
                    pt.classList.add('has-stone');
                    const stone = document.createElement('div');
                    stone.className = `go-stone ${piece === 'B' ? 'black' : 'white'}`;
                    if (state.lastMove && state.lastMove.r === r && state.lastMove.c === c) {
                        stone.classList.add('last-move');
                    }
                    pt.appendChild(stone);
                } else {
                    // Bóng ma preview
                    const ghost = document.createElement('div');
                    ghost.className = `go-ghost-stone ${state.currentTurn === 'B' ? 'black' : 'white'}`;
                    pt.appendChild(ghost);
                }

                pt.addEventListener('click', () => handlePointClick(r, c));
                grid.appendChild(pt);
            }
        }

        boardWrap.appendChild(grid);
    }

    function updateUI() {
        const turnText = document.getElementById('goTurnText');
        const turnDot = document.getElementById('goTurnDot');
        const pB = document.getElementById('goPrisonersBlack');
        const pW = document.getElementById('goPrisonersWhite');
        const cardB = document.getElementById('goCardBlack');
        const cardW = document.getElementById('goCardWhite');

        if (turnText) {
            turnText.textContent = `Lượt: ${state.currentTurn === 'B' ? 'Quân Đen' : 'Quân Trắng'}`;
        }
        if (turnDot) {
            turnDot.className = `go-turn-dot ${state.currentTurn === 'B' ? 'black' : 'white'}`;
        }
        if (pB) pB.textContent = `Tù binh: ${state.prisoners.B}`;
        if (pW) pW.textContent = `Tù binh: ${state.prisoners.W} (+${KOMI} mục)`;

        if (cardB) cardB.classList.toggle('active-turn', state.currentTurn === 'B' && !state.isGameOver);
        if (cardW) cardW.classList.toggle('active-turn', state.currentTurn === 'W' && !state.isGameOver);
    }

    function showStatusNotice(msg) {
        const el = document.getElementById('goStatusNotice');
        if (el) el.textContent = msg;
    }

    // Modal đếm điểm kết thúc ván
    function showScoringModal(score) {
        if (!score) score = calculateTerritory();

        let modal = document.getElementById('modalGoScore');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modalGoScore';
            modal.className = 'game-modal-overlay active';
            modal.innerHTML = `
                <div class="game-modal-card">
                    <h3 class="game-modal-title">Kết Quả Ván Cờ Vây</h3>
                    <p class="game-modal-desc" id="goScoreWinnerDesc"></p>

                    <div class="go-score-breakdown">
                        <div class="go-score-col">
                            <h4>⚫ Quân Đen</h4>
                            <div class="go-score-item"><span>Đất lãnh thổ:</span><strong id="goScoreTerrB">0</strong></div>
                            <div class="go-score-item"><span>Tù binh bắt:</span><strong id="goScorePrisB">0</strong></div>
                            <div class="go-score-total"><span>Tổng điểm:</span><strong id="goScoreTotB">0</strong></div>
                        </div>
                        <div class="go-score-col">
                            <h4>⚪ Quân Trắng</h4>
                            <div class="go-score-item"><span>Đất lãnh thổ:</span><strong id="goScoreTerrW">0</strong></div>
                            <div class="go-score-item"><span>Tù binh bắt:</span><strong id="goScorePrisW">0</strong></div>
                            <div class="go-score-item"><span>Điểm bù (Komi):</span><strong>+${KOMI}</strong></div>
                            <div class="go-score-total"><span>Tổng điểm:</span><strong id="goScoreTotW">0</strong></div>
                        </div>
                    </div>

                    <div class="game-modal-actions">
                        <button class="modal-btn-confirm" id="btnGoScoreNewGame" type="button">Ván Mới</button>
                        <button class="modal-btn-close" id="btnGoScoreClose" type="button">Xem Bàn Cờ</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        } else {
            modal.classList.add('active');
        }

        document.getElementById('goScoreWinnerDesc').textContent = state.winReason || 'Ván cờ kết thúc!';
        document.getElementById('goScoreTerrB').textContent = `${score.blackTerritory} mục`;
        document.getElementById('goScorePrisB').textContent = `${score.blackPrisoners}`;
        document.getElementById('goScoreTotB').textContent = `${score.blackTotal} mục`;

        document.getElementById('goScoreTerrW').textContent = `${score.whiteTerritory} mục`;
        document.getElementById('goScorePrisW').textContent = `${score.whitePrisoners}`;
        document.getElementById('goScoreTotW').textContent = `${score.whiteTotal} mục`;

        document.getElementById('btnGoScoreNewGame').onclick = () => {
            modal.classList.remove('active');
            resetGame(BOARD_SIZE, true);
        };
        document.getElementById('btnGoScoreClose').onclick = () => {
            modal.classList.remove('active');
        };
    }

    function showModalConfirm(message, onConfirm) {
        let modal = document.getElementById('modalGoConfirm');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modalGoConfirm';
            modal.className = 'game-modal-overlay active';
            modal.innerHTML = `
                <div class="game-modal-card">
                    <h3 class="game-modal-title">Thông Báo Ván Cờ</h3>
                    <p class="game-modal-desc" id="goConfirmMsg"></p>
                    <div class="game-modal-actions">
                        <button class="modal-btn-close" id="btnGoConfirmCancel" type="button">Để sau</button>
                        <button class="modal-btn-confirm" id="btnGoConfirmOk" type="button">Đồng Ý</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        } else {
            modal.classList.add('active');
        }

        document.getElementById('goConfirmMsg').textContent = message;
        document.getElementById('btnGoConfirmOk').onclick = () => {
            modal.classList.remove('active');
            if (typeof onConfirm === 'function') onConfirm();
        };
        document.getElementById('btnGoConfirmCancel').onclick = () => {
            modal.classList.remove('active');
        };
    }

    function bindEvents() {
        // Mode Tabs: P2P, AI, Cùng máy
        const modeTabs = document.querySelectorAll('.go-mode-tab');
        modeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                modeTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                state.gameMode = tab.dataset.mode || 'p2p';
                resetGame(BOARD_SIZE, false);
                showStatusNotice(`Chế độ: ${tab.textContent.trim()}`);
            });
        });

        // Size Tabs: 9x9 vs 13x13
        const sizeTabs = document.querySelectorAll('.go-size-tab');
        sizeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                sizeTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const s = parseInt(tab.dataset.size, 10) || 9;
                resetGame(s, true);
            });
        });

        // Nút thao tác dưới bàn cờ
        const btnPass = document.getElementById('btnGoPass');
        if (btnPass) btnPass.addEventListener('click', () => handlePass());

        const btnUndo = document.getElementById('btnGoUndo');
        if (btnUndo) btnUndo.addEventListener('click', () => handleUndo());

        const btnResign = document.getElementById('btnGoResign');
        if (btnResign) btnResign.addEventListener('click', () => {
            showModalConfirm('Bạn có chắc chắn muốn đầu hàng ván cờ này?', () => handleResign());
        });

        const btnResetScore = document.getElementById('btnGoResetScore');
        if (btnResetScore) {
            btnResetScore.addEventListener('click', () => {
                showModalConfirm('Bạn có chắc muốn đặt lại tỷ số Cờ Vây về 0 - 0 không?', () => {
                    resetGoScores();
                });
            });
        }

        const btnResetBrain = document.getElementById('btnGoResetBrain');
        if (btnResetBrain) {
            btnResetBrain.addEventListener('click', () => {
                showModalConfirm('Bạn có muốn đặt lại bộ não học máy của AI Cờ Vây không?', () => {
                    GoBrain.reset();
                    showStatusNotice('🧠 Đã đặt lại bộ não AI Cờ Vây về ban đầu!');
                });
            });
        }

        const btnRestart = document.getElementById('btnGoRestart');
        if (btnRestart) btnRestart.addEventListener('click', () => {
            resetGame(BOARD_SIZE, true);
        });

        const btnScore = document.getElementById('btnGoScore');
        if (btnScore) btnScore.addEventListener('click', () => {
            showScoringModal();
        });
    }

    return {
        resetScores: resetGoScores,
        resetBrain: () => GoBrain.reset(),
        init,
        onShow,
        resetGame,
        getState: () => state
    };
})();
