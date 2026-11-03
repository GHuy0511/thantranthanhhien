/**
 * ========================================================
 * LOGIC ĐIỀU KHIỂN GAME CỜ TỶ PHÚ TÌNH YÊU (COUPLE MONOPOLY)
 * Dành riêng cho cặp đôi Huy & Hiền
 * Hoạt động mượt mà, đồng bộ Theme, hỗ trợ âm thanh Web Audio dịu êm
 * ========================================================
 */

// 1. DANH SÁCH 16 ĐỊA ĐIỂM KỶ NIỆM XẾP QUANH BÀN CỜ 5x5
const BOARD_TILES = [
    // HÀNG TRÊN CÙNG (Trái sang Phải: row 1, col 1 -> 5)
    { id: 0, row: 1, col: 1, name: "Khởi Hành", icon: "🚩", type: "start", price: 0, rent: 0, desc: "Nhận 200 💕 mỗi lần qua đây" },
    { id: 1, row: 1, col: 2, name: "Xe Buýt Quen", icon: "🚌", type: "property", price: 100, rent: 25, desc: "Những chuyến xe đón đưa tan trường" },
    { id: 2, row: 1, col: 3, name: "Thư Bất Ngờ", icon: "💌", type: "card", price: 0, rent: 0, desc: "Rút một lá thư ngọt ngào" },
    { id: 3, row: 1, col: 4, name: "Quân Sự GDQP", icon: "🪖", type: "property", price: 140, rent: 35, desc: "Nơi bắt đầu những bức ảnh chung" },
    { id: 4, row: 1, col: 5, name: "Cà Phê Hẹn Hò", icon: "☕", type: "rest", price: 0, rent: 0, desc: "Nghỉ chân tâm sự đôi lời" },

    // CỘT BÊN PHẢI (Trên xuống Dưới: col 5, row 2 -> 4)
    { id: 5, row: 2, col: 5, name: "Trà Sữa Ruột", icon: "🍧", type: "property", price: 180, rent: 45, desc: "Vị ngọt quen thuộc mỗi chiều" },
    { id: 6, row: 3, col: 5, name: "Gala THSV", icon: "🎭", type: "property", price: 220, rent: 55, desc: "Đêm liên hoan đầy ắp kỷ niệm" },
    { id: 7, row: 4, col: 5, name: "Thư Bất Ngờ", icon: "💌", type: "card", price: 0, rent: 0, desc: "Rút một lá thư ngọt ngào" },

    // HÀNG DƯỚI CÙNG (Phải sang Trái: row 5, col 5 -> 1)
    { id: 8, row: 5, col: 5, name: "Góc Chụp Ảnh", icon: "📸", type: "checkin", price: 0, rent: 0, desc: "Lưu giữ khoảnh khắc nụ cười (+50 💕)" },
    { id: 9, row: 5, col: 4, name: "Rạp Phim", icon: "🍿", type: "property", price: 260, rent: 65, desc: "Xem phim bên nhau ngày cuối tuần" },
    { id: 10, row: 5, col: 3, name: "Hộp Quà Yêu", icon: "🎁", type: "gift", price: 0, rent: 0, desc: "Món quà tình yêu bất ngờ (+80 💕)" },
    { id: 11, row: 5, col: 2, name: "Ký Túc Xá", icon: "🏫", type: "property", price: 300, rent: 75, desc: "Nơi bắt đầu những nhớ nhung" },
    { id: 12, row: 5, col: 1, name: "Vườn Hoa Hẹn", icon: "🌸", type: "rest", price: 0, rent: 0, desc: "Đi dạo ngắm hoa thư thái" },

    // CỘT BÊN TRÁI (Dưới lên Trên: col 1, row 4 -> 2)
    { id: 13, row: 4, col: 1, name: "Chuyến Xe Đêm", icon: "🛵", type: "property", price: 340, rent: 85, desc: "Vi vu phố đêm gió mát lành" },
    { id: 14, row: 3, col: 1, name: "Thư Bất Ngờ", icon: "💌", type: "card", price: 0, rent: 0, desc: "Rút một lá thư ngọt ngào" },
    { id: 15, row: 2, col: 1, name: "Cột Mốc 01/11", icon: "💖", type: "property", price: 400, rent: 100, desc: "Ngày chúng mình chính thức bên nhau" }
];

// 2. KHO THẺ BÀI TÌNH YÊU (SWEET LOVE CARDS)
const LOVE_CARDS = [
    {
        title: "Nắm Tay Thật Lâu",
        content: "Nắm tay đối phương thật chặt trong 15 giây và nhìn vào mắt nhau cười mỉm chi.",
        reward: 60
    },
    {
        title: "Lời Khen Chân Thành",
        content: "Khen đối phương 3 câu thật lòng khiến người yêu phải mỉm cười ngại ngùng.",
        reward: 60
    },
    {
        title: "Nhớ Về Kỷ Niệm",
        content: "Kể lại một kỷ niệm vui nhất mà bạn nhớ về đối phương trong thời gian qua.",
        reward: 70
    },
    {
        title: "Chiếc Ôm Ấm Áp",
        content: "Hãy dành cho đối phương một cái ôm thật ấm áp và thật chặt.",
        reward: 80
    },
    {
        title: "Giai Điệu Tình Yêu",
        content: "Ngâm nga hoặc hát tặng người yêu một câu trong bài '50 Năm Về Sau'.",
        reward: 70
    },
    {
        title: "Lời Thì Thầm Dễ Thương",
        content: "Nhắn tin hoặc nói thẳng với người yêu: 'Cảm ơn vì đã luôn bên cạnh tui nhé!'.",
        reward: 75
    },
    {
        title: "Chụp Ảnh Selfie Nhí Nhố",
        content: "Cùng chụp chung một bức ảnh selfie tạo dáng nhí nhố ngay lúc này.",
        reward: 60
    },
    {
        title: "Kẹo Ngọt Trà Sữa",
        content: "Người yêu được quyền chọn một món nước hoặc đồ ăn vặt yêu thích hôm nay!",
        reward: 90
    }
];

// 3. TRẠNG THÁI TRÒ CHƠI
const gameState = {
    players: {
        huy: { name: "Huy", pos: 0, score: 1000, props: [] },
        hien: { name: "Hiền", pos: 0, score: 1000, props: [] }
    },
    currentTurn: "huy", // "huy" hoặc "hien"
    isRolling: false,
    soundEnabled: true,
    roundCount: 1,
    pendingAction: null
};

// 4. HỆ THỐNG ÂM THANH GIAO HƯỞNG NHẸ (WEB AUDIO API)
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playTone(freq, duration, type = "sine", gainVal = 0.08) {
    if (!gameState.soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(gainVal, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {}
}

function playSoundCue(type) {
    if (!gameState.soundEnabled) return;
    if (type === "tick") {
        playTone(520, 0.06, "triangle", 0.05);
    } else if (type === "land") {
        playTone(659.25, 0.15, "sine", 0.08); // E5
        setTimeout(() => playTone(880, 0.25, "sine", 0.08), 80); // A5
    } else if (type === "buy") {
        playTone(523.25, 0.12, "sine", 0.08); // C5
        setTimeout(() => playTone(659.25, 0.12, "sine", 0.08), 90); // E5
        setTimeout(() => playTone(783.99, 0.12, "sine", 0.08), 180); // G5
        setTimeout(() => playTone(1046.50, 0.3, "sine", 0.09), 270); // C6
    } else if (type === "card") {
        playTone(587.33, 0.15, "triangle", 0.08); // D5
        setTimeout(() => playTone(880, 0.3, "sine", 0.09), 120); // A5
    } else if (type === "rent") {
        playTone(440, 0.12, "sine", 0.07);
        setTimeout(() => playTone(392, 0.2, "sine", 0.06), 100);
    }
}

// 5. KHỞI TẠO VÀ RENDER GIAO DIỆN
document.addEventListener("DOMContentLoaded", () => {
    initThemeSwitcher();
    renderBoard();
    updateHUD();
    setupEventListeners();
});

// Render 16 ô trên lưới 5x5
function renderBoard() {
    const boardEl = document.getElementById("monopolyBoard");
    if (!boardEl) return;

    // Giữ lại phần center hub
    const centerHub = boardEl.querySelector(".board-center-hub");

    // Xóa các ô cũ nếu có
    const oldTiles = boardEl.querySelectorAll(".board-tile");
    oldTiles.forEach(t => t.remove());

    BOARD_TILES.forEach((tile) => {
        const tileEl = document.createElement("div");
        tileEl.className = `board-tile ${tile.type === "start" || tile.type === "rest" || tile.type === "checkin" ? "is-corner" : ""}`;
        tileEl.id = `tile-${tile.id}`;
        tileEl.style.gridRow = String(tile.row);
        tileEl.style.gridColumn = String(tile.col);

        let priceHtml = "";
        if (tile.type === "property") {
            priceHtml = `<span class="tile-price">${tile.price} 💕</span>`;
        } else if (tile.type === "start") {
            priceHtml = `<span class="tile-price">+200 💕</span>`;
        } else if (tile.type === "card") {
            priceHtml = `<span class="tile-price">Thử thách</span>`;
        } else if (tile.type === "gift") {
            priceHtml = `<span class="tile-price">+80 💕</span>`;
        } else {
            priceHtml = `<span class="tile-price">Thư giãn</span>`;
        }

        tileEl.innerHTML = `
            <div class="tile-type-strip"></div>
            <div class="tile-icon">${tile.icon}</div>
            <div class="tile-name">${tile.name}</div>
            ${priceHtml}
            <div class="tile-tokens-wrap" id="tokens-${tile.id}"></div>
        `;

        boardEl.insertBefore(tileEl, centerHub);
    });

    updatePlayerTokensOnBoard();
}

// Cập nhật vị trí quân cờ của 2 người
function updatePlayerTokensOnBoard() {
    BOARD_TILES.forEach(tile => {
        const wrap = document.getElementById(`tokens-${tile.id}`);
        if (!wrap) return;
        wrap.innerHTML = "";

        const hasHuy = gameState.players.huy.pos === tile.id;
        const hasHien = gameState.players.hien.pos === tile.id;

        if (hasHuy) {
            const huyToken = document.createElement("span");
            huyToken.className = "token-pin token-huy";
            huyToken.innerText = "👦";
            huyToken.title = "Vị trí của Huy";
            wrap.appendChild(huyToken);
        }

        if (hasHien) {
            const hienToken = document.createElement("span");
            hienToken.className = "token-pin token-hien";
            hienToken.innerText = "👧";
            hienToken.title = "Vị trí của Hiền";
            wrap.appendChild(hienToken);
        }

        // Cập nhật huy hiệu chủ sở hữu
        const tileEl = document.getElementById(`tile-${tile.id}`);
        if (tileEl) {
            let badge = tileEl.querySelector(".tile-owner-badge");
            if (tile.owner) {
                if (!badge) {
                    badge = document.createElement("span");
                    badge.className = `tile-owner-badge owner-${tile.owner}`;
                    tileEl.appendChild(badge);
                } else {
                    badge.className = `tile-owner-badge owner-${tile.owner}`;
                }
                badge.innerText = tile.owner === "huy" ? "💙 Huy" : "🌸 Hiền";
            } else if (badge) {
                badge.remove();
            }
        }
    });
}

// Cập nhật thẻ trạng thái người chơi (HUD)
function updateHUD() {
    const huyScore = document.getElementById("huyScore");
    const hienScore = document.getElementById("hienScore");
    const huyProps = document.getElementById("huyPropsCount");
    const hienProps = document.getElementById("hienPropsCount");
    const hudHuy = document.getElementById("hudHuy");
    const hudHien = document.getElementById("hudHien");
    const turnHeadline = document.getElementById("turnHeadline");

    if (huyScore) huyScore.innerText = gameState.players.huy.score;
    if (hienScore) hienScore.innerText = gameState.players.hien.score;
    if (huyProps) huyProps.innerText = gameState.players.huy.props.length;
    if (hienProps) hienProps.innerText = gameState.players.hien.props.length;

    const isHuyTurn = gameState.currentTurn === "huy";

    if (hudHuy) hudHuy.classList.toggle("active-turn", isHuyTurn);
    if (hudHien) hudHien.classList.toggle("active-turn", !isHuyTurn);

    if (turnHeadline) {
        turnHeadline.innerText = isHuyTurn ? "Đến lượt của Huy nè 💙" : "Đến lượt của Hiền nè 🌸";
    }
}

// Thiết lập các sự kiện nút bấm
function setupEventListeners() {
    const rollBtn = document.getElementById("rollDiceBtn");
    if (rollBtn) {
        rollBtn.addEventListener("click", () => {
            handleDiceRoll();
        });
    }

    const btnRestart = document.getElementById("btnRestartGame");
    if (btnRestart) {
        btnRestart.addEventListener("click", () => {
            if (confirm("Bắt đầu lại ván cờ tình yêu mới từ đầu nhé? 💕")) {
                restartGame();
            }
        });
    }

    const btnSound = document.getElementById("btnToggleSound");
    if (btnSound) {
        btnSound.addEventListener("click", () => {
            gameState.soundEnabled = !gameState.soundEnabled;
            const icon = document.getElementById("soundIcon");
            const label = document.getElementById("soundLabel");
            if (icon) icon.innerText = gameState.soundEnabled ? "🔔" : "🔕";
            if (label) label.innerText = gameState.soundEnabled ? "Âm thanh: Bật" : "Âm thanh: Tắt";
        });
    }

    const btnHelp = document.getElementById("btnHelpGuide");
    const modalHelp = document.getElementById("modalHelp");
    const btnCloseHelp = document.getElementById("btnCloseHelp");
    if (btnHelp && modalHelp) {
        btnHelp.addEventListener("click", () => {
            modalHelp.classList.add("active");
            modalHelp.setAttribute("aria-hidden", "false");
        });
    }
    if (btnCloseHelp && modalHelp) {
        btnCloseHelp.addEventListener("click", () => {
            modalHelp.classList.remove("active");
            modalHelp.setAttribute("aria-hidden", "true");
        });
    }

    // Modal Mua Đất
    const btnConfirmBuy = document.getElementById("btnConfirmBuy");
    const btnCancelBuy = document.getElementById("btnCancelBuy");
    if (btnConfirmBuy) {
        btnConfirmBuy.addEventListener("click", () => {
            confirmBuyCurrentProperty();
        });
    }
    if (btnCancelBuy) {
        btnCancelBuy.addEventListener("click", () => {
            closeModal("modalBuyProperty");
            finishTurn();
        });
    }

    // Modal Thư Tình (Love Card)
    const btnAcceptCard = document.getElementById("btnAcceptLoveCard");
    if (btnAcceptCard) {
        btnAcceptCard.addEventListener("click", () => {
            confirmAcceptLoveCard();
        });
    }

    // Modal Thông Báo Chung
    const btnAlertOk = document.getElementById("btnAlertOk");
    if (btnAlertOk) {
        btnAlertOk.addEventListener("click", () => {
            closeModal("modalGenericAlert");
            if (gameState.pendingAction) {
                const act = gameState.pendingAction;
                gameState.pendingAction = null;
                act();
            } else {
                finishTurn();
            }
        });
    }
}

// 6. XỬ LÝ LĂN XÚC XẮC 3D VÀ BƯỚC ĐI
function handleDiceRoll() {
    if (gameState.isRolling) return;
    gameState.isRolling = true;

    const rollBtn = document.getElementById("rollDiceBtn");
    const statusMsg = document.getElementById("actionStatusMsg");
    const diceCube = document.getElementById("diceCube");

    if (rollBtn) rollBtn.disabled = true;

    // Âm thanh xúc xắc lăn
    playSoundCue("tick");

    // Kích hoạt animation quay 3D cuồng nhiệt
    if (diceCube) {
        diceCube.classList.add("rolling");
    }

    const activePlayerKey = gameState.currentTurn;
    const activePlayer = gameState.players[activePlayerKey];

    if (statusMsg) {
        statusMsg.innerText = `${activePlayer.name} đang tung xúc xắc...`;
    }

    // Tạo kết quả ngẫu nhiên từ 1 đến 6
    const rollValue = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
        if (diceCube) {
            diceCube.classList.remove("rolling");
            applyDiceFaceRotation(diceCube, rollValue);
        }

        if (statusMsg) {
            statusMsg.innerText = `${activePlayer.name} vừa tung được ${rollValue} nút!`;
        }

        // Bước đi từng ô mượt mà
        setTimeout(() => {
            animatePlayerStepByStep(activePlayerKey, rollValue, () => {
                onPlayerLanded(activePlayerKey);
            });
        }, 500);

    }, 700);
}

// Định vị góc xoay 3D chính xác của xúc xắc theo kết quả (1 đến 6)
function applyDiceFaceRotation(diceCube, val) {
    const rotations = {
        1: "rotateX(0deg) rotateY(0deg)",
        2: "rotateX(0deg) rotateY(-90deg)",
        3: "rotateX(-90deg) rotateY(0deg)",
        4: "rotateX(90deg) rotateY(0deg)",
        5: "rotateX(0deg) rotateY(90deg)",
        6: "rotateX(0deg) rotateY(180deg)"
    };
    diceCube.style.transform = rotations[val] || "rotateX(0deg) rotateY(0deg)";
}

// Chuyển động từng bước quanh bàn cờ
function animatePlayerStepByStep(playerKey, stepsLeft, onComplete) {
    if (stepsLeft <= 0) {
        if (typeof onComplete === "function") onComplete();
        return;
    }

    const player = gameState.players[playerKey];
    const prevPos = player.pos;
    const nextPos = (prevPos + 1) % BOARD_TILES.length;

    player.pos = nextPos;
    playSoundCue("tick");
    updatePlayerTokensOnBoard();

    // Đi qua ô Khởi Hành (id = 0)
    if (nextPos === 0) {
        player.score += 200;
        updateHUD();
        const statusMsg = document.getElementById("actionStatusMsg");
        if (statusMsg) {
            statusMsg.innerText = `🚩 ${player.name} đi qua ô Khởi Hành, nhận ngay 200 💕!`;
        }
    }

    setTimeout(() => {
        animatePlayerStepByStep(playerKey, stepsLeft - 1, onComplete);
    }, 220);
}

// 7. XỬ LÝ KHI NGƯỜI CHƠI DỪNG TẠI MỘT Ô
function onPlayerLanded(playerKey) {
    const player = gameState.players[playerKey];
    const tile = BOARD_TILES[player.pos];
    const otherKey = playerKey === "huy" ? "hien" : "huy";
    const otherPlayer = gameState.players[otherKey];

    playSoundCue("land");

    // 1. Ô ĐẶC BIỆT: THƯ BẤT NGỜ (LOVE CARD)
    if (tile.type === "card") {
        triggerLoveCard(playerKey);
        return;
    }

    // 2. Ô ĐẶC BIỆT: HỘP QUÀ TÌNH YÊU (+80 💕)
    if (tile.type === "gift") {
        player.score += 80;
        updateHUD();
        playSoundCue("buy");
        showAlertModal("🎁 Hộp Quà Tình Yêu", `${player.name} nhận được món quà may mắn ngọt ngào: +80 💕 Điểm Yêu Thương!`, "🎁");
        return;
    }

    // 3. Ô ĐẶC BIỆT: GÓC CHỤP ẢNH (+50 💕)
    if (tile.type === "checkin") {
        player.score += 50;
        updateHUD();
        playSoundCue("buy");
        showAlertModal("📸 Check-in Kỷ Niệm", `${player.name} ghé thăm góc ảnh quen thuộc, cộng thêm 50 💕 kỷ niệm!`, "📸");
        return;
    }

    // 4. Ô NGHỈ CHÂN (CÀ PHÊ / VƯỜN HOA)
    if (tile.type === "rest") {
        showAlertModal(tile.name, `${player.name} đang dừng chân nghỉ ngơi thư thái tại ${tile.name}. Cùng nhau trò chuyện chút nào!`, tile.icon);
        return;
    }

    // 5. Ô BẮT ĐẦU (KHỞI HÀNH)
    if (tile.type === "start") {
        showAlertModal("🚩 Khởi Hành", `Trở lại điểm xuất phát yêu thương! ${player.name} luôn giữ trọn tình cảm ban đầu.`, "🚩");
        return;
    }

    // 6. Ô ĐỊA ĐIỂM (PROPERTY)
    if (tile.type === "property") {
        // A. Địa điểm chưa ai sở hữu -> Hỏi mua
        if (!tile.owner) {
            promptBuyProperty(playerKey, tile);
            return;
        }

        // B. Địa điểm do chính mình sở hữu -> Nghỉ ngơi an toàn
        if (tile.owner === playerKey) {
            showAlertModal("🏡 Tổ Ấm Của Bạn", `Bạn đã về lại ${tile.name} do chính mình xây dựng. Cảm giác thật bình yên!`, "🏡");
            return;
        }

        // C. Địa điểm do đối phương sở hữu -> Tặng tiền hẹn hò
        if (tile.owner === otherKey) {
            const rentCost = Math.min(tile.rent, player.score);
            player.score -= rentCost;
            otherPlayer.score += rentCost;
            updateHUD();
            playSoundCue("rent");
            showAlertModal(
                "💕 Ghé Thăm Người Yêu",
                `${player.name} dừng chân tại ${tile.name} của ${otherPlayer.name}!<br>Tặng đối phương <strong>${rentCost} 💕</strong> tiền hẹn hò ngọt ngào.`,
                "🌸"
            );
            return;
        }
    }

    finishTurn();
}

// Kích hoạt thẻ thư bất ngờ
function triggerLoveCard(playerKey) {
    const player = gameState.players[playerKey];
    const randomCard = LOVE_CARDS[Math.floor(Math.random() * LOVE_CARDS.length)];

    const modal = document.getElementById("modalLoveCard");
    const titleEl = document.getElementById("loveCardTitle");
    const contentEl = document.getElementById("loveCardContent");
    const rewardEl = document.getElementById("loveCardReward");

    if (titleEl) titleEl.innerText = randomCard.title;
    if (contentEl) contentEl.innerText = randomCard.content;
    if (rewardEl) rewardEl.innerText = `+${randomCard.reward} Điểm Yêu Thương 💕`;

    // Lưu thẻ đang xử lý
    gameState.pendingCard = {
        playerKey: playerKey,
        reward: randomCard.reward
    };

    playSoundCue("card");
    if (modal) {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    }
}

function confirmAcceptLoveCard() {
    closeModal("modalLoveCard");
    if (gameState.pendingCard) {
        const { playerKey, reward } = gameState.pendingCard;
        gameState.players[playerKey].score += reward;
        updateHUD();
        playSoundCue("buy");
        gameState.pendingCard = null;
    }
    finishTurn();
}

// Hỏi người chơi có muốn xây dựng tổ ấm tại địa điểm
function promptBuyProperty(playerKey, tile) {
    const player = gameState.players[playerKey];
    const modal = document.getElementById("modalBuyProperty");
    const titleEl = document.getElementById("buyPropTitle");
    const descEl = document.getElementById("buyPropDesc");
    const costEl = document.getElementById("buyPropCost");
    const rentEl = document.getElementById("buyPropRent");
    const emojiEl = document.getElementById("buyPropEmoji");
    const confirmBtn = document.getElementById("btnConfirmBuy");

    if (titleEl) titleEl.innerText = `Xây Dựng: ${tile.name}`;
    if (descEl) descEl.innerText = `${player.name} có muốn xây dựng Tổ Ấm tại đây không?`;
    if (costEl) costEl.innerText = `${tile.price} 💕`;
    if (rentEl) rentEl.innerText = `${tile.rent} 💕`;
    if (emojiEl) emojiEl.innerText = tile.icon || "🏡";

    // Kiểm tra đủ điểm không
    if (confirmBtn) {
        if (player.score >= tile.price) {
            confirmBtn.disabled = false;
            confirmBtn.innerText = "Xây dựng ngay 💕";
        } else {
            confirmBtn.disabled = true;
            confirmBtn.innerText = "Chưa đủ điểm 💕";
        }
    }

    gameState.pendingTileToBuy = tile;

    if (modal) {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    }
}

function confirmBuyCurrentProperty() {
    closeModal("modalBuyProperty");
    const tile = gameState.pendingTileToBuy;
    if (!tile) {
        finishTurn();
        return;
    }

    const playerKey = gameState.currentTurn;
    const player = gameState.players[playerKey];

    if (player.score >= tile.price) {
        player.score -= tile.price;
        tile.owner = playerKey;
        player.props.push(tile.id);
        playSoundCue("buy");
        updatePlayerTokensOnBoard();
        updateHUD();

        const statusMsg = document.getElementById("actionStatusMsg");
        if (statusMsg) {
            statusMsg.innerText = `✨ ${player.name} vừa xây dựng Tổ Ấm tại ${tile.name}!`;
        }
    }

    gameState.pendingTileToBuy = null;
    finishTurn();
}

// Modal thông báo chung
function showAlertModal(title, msg, emoji = "✨", onOk = null) {
    const modal = document.getElementById("modalGenericAlert");
    const titleEl = document.getElementById("alertTitle");
    const msgEl = document.getElementById("alertMessage");
    const emojiEl = document.getElementById("alertEmoji");

    if (titleEl) titleEl.innerText = title;
    if (msgEl) msgEl.innerHTML = msg;
    if (emojiEl) emojiEl.innerText = emoji;

    gameState.pendingAction = onOk;

    if (modal) {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
    }
}

// 8. HOÀN THÀNH LƯỢT VÀ ĐỔI NGƯỜI CHƠI
function finishTurn() {
    // Đổi lượt
    gameState.currentTurn = gameState.currentTurn === "huy" ? "hien" : "huy";
    gameState.isRolling = false;

    updateHUD();

    const rollBtn = document.getElementById("rollDiceBtn");
    if (rollBtn) rollBtn.disabled = false;

    const nextPlayer = gameState.players[gameState.currentTurn];
    const statusMsg = document.getElementById("actionStatusMsg");
    if (statusMsg) {
        statusMsg.innerText = `✨ Đến lượt của ${nextPlayer.name} nè!`;
    }

    // Kiểm tra chiến thắng hữu nghị nếu đạt mốc điểm cao (2,500 💕)
    if (nextPlayer.score >= 2500) {
        showAlertModal(
            "🎉 Kỷ Niệm Vĩnh Cửu",
            `Chúc mừng ${nextPlayer.name} và hai đứa đã hoàn thành xuất sắc chuyến hành trình yêu thương!<br>Dù ai nhiều điểm hơn thì món quà tuyệt vời nhất vẫn là có nhau trong đời 💕`,
            "💖",
            () => restartGame()
        );
    }
}

// Khởi động lại ván cờ
function restartGame() {
    gameState.players.huy.pos = 0;
    gameState.players.huy.score = 1000;
    gameState.players.huy.props = [];

    gameState.players.hien.pos = 0;
    gameState.players.hien.score = 1000;
    gameState.players.hien.props = [];

    gameState.currentTurn = "huy";
    gameState.isRolling = false;

    BOARD_TILES.forEach(t => { t.owner = null; });

    updatePlayerTokensOnBoard();
    updateHUD();

    const rollBtn = document.getElementById("rollDiceBtn");
    if (rollBtn) rollBtn.disabled = false;

    const statusMsg = document.getElementById("actionStatusMsg");
    if (statusMsg) {
        statusMsg.innerText = "Chạm vào 'Tung Xúc Xắc' để bắt đầu chuyến hành trình!";
    }
}

// 9. ĐỒNG BỘ THEME TỐI GIẢN VỚI TRANG CHỦ
function initThemeSwitcher() {
    const THEME_STORAGE_KEY = 'couple_love_theme';
    const gearBtn = document.getElementById('themeSettingBtn');
    const modalOverlay = document.getElementById('themeModalOverlay');
    const closeBtn = document.getElementById('themeModalCloseBtn');
    const applyBtn = document.getElementById('themeApplyBtn');
    const currentNameEl = document.getElementById('themeCurrentName');
    const themeCards = document.querySelectorAll('.theme-card-option');

    const THEME_NAMES = {
        'sunset': 'Hoàng Hôn',
        'vintage-rose': 'Hoa Hồng Cổ',
        'midnight': 'Đêm Đầy Sao',
        'autumn': 'Mùa Thu',
        'cotton-candy': 'Kẹo Ngọt',
        'ocean': 'Biển Xanh',
        'secret-garden': 'Vườn Bí Mật',
        'bordeaux': 'Rượu Vang',
        'mocha': 'Cà Phê',
        'lavender': 'Oải Hương',
        'peach': 'Trà Đào',
        'aurora-night': 'Đêm Đông'
    };

    let currentTheme = 'sunset';
    try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved && THEME_NAMES[saved]) currentTheme = saved;
    } catch(e) {}

    applyTheme(currentTheme);

    function applyTheme(themeKey) {
        if (!THEME_NAMES[themeKey]) themeKey = 'sunset';
        document.documentElement.setAttribute('data-theme', themeKey);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, themeKey);
        } catch(e) {}
        currentTheme = themeKey;

        if (currentNameEl) {
            currentNameEl.textContent = THEME_NAMES[themeKey] || themeKey;
        }

        if (themeCards) {
            themeCards.forEach(card => {
                const cardTheme = card.getAttribute('data-theme');
                if (cardTheme === themeKey) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        }
    }

    function openModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        applyTheme(currentTheme);
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
    }

    if (gearBtn) gearBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (applyBtn) applyBtn.addEventListener('click', closeModal);

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    if (themeCards) {
        themeCards.forEach(card => {
            card.addEventListener('click', () => {
                const selected = card.getAttribute('data-theme');
                if (selected) applyTheme(selected);
            });
        });
    }
}
