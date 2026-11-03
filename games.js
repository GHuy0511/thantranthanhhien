/**
 * ========================================================
 * CỜ TỶ PHÚ DU LỊCH VIỆT NAM (HÀNH TRÌNH XUYÊN VIỆT CÙNG EM)
 * Dành riêng cho cặp đôi Huy 👦 & Hiền 🌸
 * 24 Danh lam thắng cảnh nổi tiếng của Việt Nam (Lưới 7x7)
 * Đầy đủ tính năng: Nâng Cấp Tổ Ấm (Homestay -> Resort -> Kỳ Quan),
 * Sân Bay Bay Nhanh, Hộ Chiếu Du Lịch, Chế Độ Chơi Cùng Người Yêu Ảo (AI)
 * ========================================================
 */

// 1. DANH SÁCH 24 DANH LAM THẮNG CẢNH NỔI TIẾNG VIỆT NAM (7x7 GRID)
const VIETNAM_LANDMARKS = [
    // --- MIỀN BẮC & TÂY BẮC (ROW 1: TRÁI QUA PHẢI) ---
    {
        id: 0, row: 1, col: 1,
        name: "Ga Hà Nội",
        subtitle: "Khởi Hành Xuyên Việt",
        icon: "🚩",
        region: "special",
        regionName: "Xuất Phát",
        type: "start",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Điểm khởi hành của chuyến tàu tình yêu Bắc - Nam. Mỗi lần đi trọn một vòng đất nước qua đây nhận ngay +200 💕.",
        owner: null,
        level: 0
    },
    {
        id: 1, row: 1, col: 2,
        name: "Hồ Gươm",
        subtitle: "Hà Nội",
        icon: "🏮",
        region: "hanoi",
        regionName: "Thủ Đô Hà Nội",
        type: "property",
        price: 100,
        rent: [30, 75, 160],
        upgradeCost: 60,
        desc: "Cầu Thê Húc cong cong đỏ son, cùng nắm tay dạo bước ven hồ và thưởng thức kem Tràng Tiền thơm ngậy.",
        owner: null,
        level: 0
    },
    {
        id: 2, row: 1, col: 3,
        name: "Vịnh Hạ Long",
        subtitle: "Quảng Ninh",
        icon: "⛵",
        region: "hanoi",
        regionName: "Thủ Đô Hà Nội",
        type: "property",
        price: 130,
        rent: [35, 90, 190],
        upgradeCost: 70,
        desc: "Kỳ quan thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi kỳ vĩ soi bóng xuống làn nước xanh ngọc bích.",
        owner: null,
        level: 0
    },
    {
        id: 3, row: 1, col: 4,
        name: "Fansipan",
        subtitle: "Sa Pa",
        icon: "🏔️",
        region: "northwest",
        regionName: "Tây Bắc Hùng Vĩ",
        type: "property",
        price: 160,
        rent: [45, 110, 230],
        upgradeCost: 80,
        desc: "Nóc nhà Đông Dương bồng bềnh mây tuyết, nơi hai đứa cùng chạm tay vào cột mốc thiêng liêng giữa đỉnh trời.",
        owner: null,
        level: 0
    },
    {
        id: 4, row: 1, col: 5,
        name: "Thư Tình Duyên",
        subtitle: "Cơ Hội",
        icon: "💌",
        region: "special",
        regionName: "Thư Tình",
        type: "card",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Rút một lá thư tình duyên với những lời nhắn nhủ và thử thách hẹn hò ngọt ngào ngoài đời thực.",
        owner: null,
        level: 0
    },
    {
        id: 5, row: 1, col: 6,
        name: "Tràng An",
        subtitle: "Ninh Bình",
        icon: "🚣",
        region: "northwest",
        regionName: "Tây Bắc Hùng Vĩ",
        type: "property",
        price: 190,
        rent: [50, 125, 260],
        upgradeCost: 95,
        desc: "Ngồi thuyền nan lướt nhẹ qua những thung lũng nước trong vắt, non xanh nước biếc đẹp tựa cõi tiên.",
        owner: null,
        level: 0
    },
    {
        id: 6, row: 1, col: 7,
        name: "Sân Bay QT",
        subtitle: "Bay Nhanh",
        icon: "✈️",
        region: "special",
        regionName: "Sân Bay",
        type: "airport",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Chuyến bay đặc quyền dành riêng cho bạn: Bay đến bên cạnh người yêu ngay tức khắc hoặc bay tới bất kỳ địa danh nào!",
        owner: null,
        level: 0
    },

    // --- MIỀN TRUNG & CỐ ĐÔ (COL 7: TRÊN XUỐNG DƯỚI) ---
    {
        id: 7, row: 2, col: 7,
        name: "Cố Đô Huế",
        subtitle: "Thừa Thiên Huế",
        icon: "🏯",
        region: "central",
        regionName: "Miền Trung Di Sản",
        type: "property",
        price: 220,
        rent: [55, 140, 290],
        upgradeCost: 110,
        desc: "Kinh thành cổ kính trầm mặc, ngắm cầu Trường Tiền sáu vài mười hai nhịp và nghe ca Huế trên sông Hương.",
        owner: null,
        level: 0
    },
    {
        id: 8, row: 3, col: 7,
        name: "Cầu Vàng",
        subtitle: "Bà Nà Hills",
        icon: "🌉",
        region: "central",
        regionName: "Miền Trung Di Sản",
        type: "property",
        price: 240,
        rent: [60, 155, 320],
        upgradeCost: 120,
        desc: "Đôi bàn tay khổng lồ nâng đỡ dải lụa vàng giữa lưng chừng mây núi, bước đi như lạc vào chốn thần tiên.",
        owner: null,
        level: 0
    },
    {
        id: 9, row: 4, col: 7,
        name: "Phố Cổ Hội An",
        subtitle: "Quảng Nam",
        icon: "🏮",
        region: "coastal",
        regionName: "Duyên Hải Nam Trung Bộ",
        type: "property",
        price: 270,
        rent: [70, 175, 360],
        upgradeCost: 135,
        desc: "Dạo bước dưới hàng nghìn ánh đèn lồng rực rỡ, thả hoa đăng trên sông Hoài gửi gắm ước nguyện bền lâu.",
        owner: null,
        level: 0
    },
    {
        id: 10, row: 5, col: 7,
        name: "Biển Mỹ Khê",
        subtitle: "Đà Nẵng",
        icon: "🌊",
        region: "coastal",
        regionName: "Duyên Hải Nam Trung Bộ",
        type: "property",
        price: 290,
        rent: [75, 190, 390],
        upgradeCost: 145,
        desc: "Bãi biển quyến rũ bậc nhất hành tinh với bờ cát trắng mịn thoai thoải và làn nước biển trong xanh hiền hòa.",
        owner: null,
        level: 0
    },
    {
        id: 11, row: 6, col: 7,
        name: "Thư Tình Duyên",
        subtitle: "Cơ Hội",
        icon: "💌",
        region: "special",
        regionName: "Thư Tình",
        type: "card",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Rút một lá thư tình duyên với những lời nhắn nhủ và thử thách hẹn hò ngọt ngào ngoài đời thực.",
        owner: null,
        level: 0
    },

    // --- TÂY NGUYÊN & NAM TRUNG BỘ (ROW 7: PHẢI SANG TRÁI) ---
    {
        id: 12, row: 7, col: 7,
        name: "Đà Lạt",
        subtitle: "Thành Phố Ngàn Hoa",
        icon: "🌸",
        region: "highlands",
        regionName: "Tây Nguyên Đại Ngàn",
        type: "property",
        price: 320,
        rent: [80, 205, 430],
        upgradeCost: 160,
        desc: "Hồ Xuân Hương sớm mai sương mờ se lạnh, cùng nhau sưởi ấm bên ly sữa đậu nành và bánh tráng nướng thơm phức.",
        owner: null,
        level: 0
    },
    {
        id: 13, row: 7, col: 6,
        name: "Buôn Ma Thuột",
        subtitle: "Đắk Lắk",
        icon: "☕",
        region: "highlands",
        regionName: "Tây Nguyên Đại Ngàn",
        type: "property",
        price: 340,
        rent: [85, 220, 460],
        upgradeCost: 170,
        desc: "Thủ phủ cà phê ngát hương nồng nàn, chiêm ngưỡng thác Dray Nur bọt tung trắng xóa hùng vĩ.",
        owner: null,
        level: 0
    },
    {
        id: 14, row: 7, col: 5,
        name: "Nha Trang",
        subtitle: "Vịnh Biển Hòn Chồng",
        icon: "🏝️",
        region: "south_coast",
        regionName: "Duyên Hải Nam Bộ",
        type: "property",
        price: 360,
        rent: [90, 235, 490],
        upgradeCost: 180,
        desc: "Vịnh biển lộng gió, ngắm rạn san hô ngũ sắc rực rỡ và đón hoàng hôn rực đỏ trên bãi cát mịn màng.",
        owner: null,
        level: 0
    },
    {
        id: 15, row: 7, col: 4,
        name: "Đồi Cát Mũi Né",
        subtitle: "Phan Thiết",
        icon: "🏜️",
        region: "south_coast",
        regionName: "Duyên Hải Nam Bộ",
        type: "property",
        price: 380,
        rent: [95, 250, 520],
        upgradeCost: 190,
        desc: "Tiểu sa mạc ven biển tuyệt mỹ, trượt cát bay bổng và đón những tia nắng đầu tiên của ngày mới.",
        owner: null,
        level: 0
    },
    {
        id: 16, row: 7, col: 3,
        name: "Thư Tình Duyên",
        subtitle: "Cơ Hội",
        icon: "💌",
        region: "special",
        regionName: "Thư Tình",
        type: "card",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Rút một lá thư tình duyên với những lời nhắn nhủ và thử thách hẹn hò ngọt ngào ngoài đời thực.",
        owner: null,
        level: 0
    },
    {
        id: 17, row: 7, col: 2,
        name: "Bến Thành",
        subtitle: "Sài Gòn Phố Thị",
        icon: "🛵",
        region: "south",
        regionName: "Nam Bộ Hoa Lệ",
        type: "property",
        price: 400,
        rent: [100, 265, 550],
        upgradeCost: 200,
        desc: "Biểu tượng trung tâm sầm uất bậc nhất Sài Gòn, cùng nhau lượn phố đêm ngắm dòng xe rực rỡ ánh đèn.",
        owner: null,
        level: 0
    },

    // --- NAM BỘ & BIỂN ĐẢO (COL 1: DƯỚI LÊN TRÊN) ---
    {
        id: 18, row: 7, col: 1,
        name: "Cắm Trại Đồi Mây",
        subtitle: "Nghỉ Chân Tâm Sự",
        icon: "⛺",
        region: "special",
        regionName: "Trạm Nghỉ",
        type: "rest",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Điểm dừng chân an toàn tuyệt đối: Dựng lều nướng khoai ngắm sao trời, nhận ngay +100 💕 năng lượng yêu thương.",
        owner: null,
        level: 0
    },
    {
        id: 19, row: 6, col: 1,
        name: "Bến Ninh Kiều",
        subtitle: "Cần Thơ",
        icon: "🌾",
        region: "south",
        regionName: "Nam Bộ Hoa Lệ",
        type: "property",
        price: 420,
        rent: [105, 280, 580],
        upgradeCost: 210,
        desc: "Cần Thơ gạo trắng nước trong, ghe thuyền tấp nập trái cây ngọt lịm xuôi ngược trên dòng sông Hậu.",
        owner: null,
        level: 0
    },
    {
        id: 20, row: 5, col: 1,
        name: "Hộp Quà May Mắn",
        subtitle: "Kho Báu Du Lịch",
        icon: "🎁",
        region: "special",
        regionName: "Quà Tặng",
        type: "gift",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Món quà tình yêu bất ngờ trên hành trình! Nhận ngẫu nhiên phần thưởng du lịch từ 50 đến 150 💕.",
        owner: null,
        level: 0
    },
    {
        id: 21, row: 4, col: 1,
        name: "Phú Quốc",
        subtitle: "Đảo Ngọc Thiên Đường",
        icon: "🌅",
        region: "islands",
        regionName: "Biển Đảo Thiên Đường",
        type: "property",
        price: 450,
        rent: [115, 305, 630],
        upgradeCost: 225,
        desc: "Bãi Sao cát trắng như kem mịn màng, ngắm hoàng hôn ngũ sắc Sunset Sanato tuyệt đẹp cùng người thương.",
        owner: null,
        level: 0
    },
    {
        id: 22, row: 3, col: 1,
        name: "Côn Đảo",
        subtitle: "Bãi Nhát Biển Xanh",
        icon: "🌊",
        region: "islands",
        regionName: "Biển Đảo Thiên Đường",
        type: "property",
        price: 480,
        rent: [125, 330, 680],
        upgradeCost: 240,
        desc: "Vẻ đẹp hoang sơ nguyên vẹn giữa đại dương, ngắm đỉnh Tình Yêu sừng sững bên làn nước biển ngọc bích.",
        owner: null,
        level: 0
    },
    {
        id: 23, row: 2, col: 1,
        name: "Landmark 81",
        subtitle: "Đỉnh Cao Tình Yêu",
        icon: "🗼",
        region: "islands",
        regionName: "Kỳ Quan Hiện Đại",
        type: "property",
        price: 520,
        rent: [135, 360, 750],
        upgradeCost: 260,
        desc: "Nắm tay nhau ngắm trọn dải ngân hà ánh sáng thành phố từ độ cao 461m, đánh dấu cột mốc tình yêu vút cao.",
        owner: null,
        level: 0
    }
];

// 2. KHO THẺ BÀI THƯ TÌNH DUYÊN (SWEET LOVE CARDS & TRAVEL WISHES)
const LOVE_CARDS = [
    {
        title: "Bình Minh Phú Quốc",
        content: "Khen đối phương 3 câu thật lòng khiến người yêu phải mỉm cười ngại ngùng.",
        reward: 70
    },
    {
        title: "Dạo Phố Cổ Hội An",
        content: "Nhắm mắt lại và nắm tay đối phương thật chặt trong 15 giây, cảm nhận hơi ấm bên nhau.",
        reward: 75
    },
    {
        title: "Giai Điệu Cố Đô",
        content: "Ngâm nga hoặc hát tặng người yêu một câu trong bài '50 Năm Về Sau' hoặc 'Hẹn Một Mai'.",
        reward: 80
    },
    {
        title: "Kế Hoạch Đà Lạt",
        content: "Nói cho người yêu nghe 2 món ngon hoặc địa điểm mà bạn nhất định muốn cùng nhau đi khi tới Đà Lạt.",
        reward: 65
    },
    {
        title: "Chiếc Ôm Sa Pa",
        content: "Dành cho người yêu một cái ôm thật ấm áp và thật chặt trong 15 giây.",
        reward: 85
    },
    {
        title: "Lời Thì Thầm Dễ Thương",
        content: "Nhìn thẳng vào mắt người yêu và nói: 'Cảm ơn vì đã luôn đồng hành cùng tui nhé!'.",
        reward: 75
    },
    {
        title: "Bức Ảnh Check-in Tình Yêu",
        content: "Cùng chụp chung một bức ảnh selfie tạo dáng trái tim nhí nhố ngay lúc này.",
        reward: 70
    },
    {
        title: "Vị Ngọt Trà Sữa",
        content: "Người yêu được quyền chọn một món nước hoặc đồ ăn vặt yêu thích hôm nay!",
        reward: 90
    },
    {
        title: "Xoa Đầu Dịu Dàng",
        content: "Được người yêu xoa đầu hoặc thơm nhẹ vào má một cái thật kêu nè!",
        reward: 80
    },
    {
        title: "Nhớ Về Ngày 01/11",
        content: "Nhắc lại một điều dễ thương nhất mà bạn nhớ về ngày chính thức thành đôi của hai đứa.",
        reward: 85
    }
];

// 3. TRẠNG THÁI TOÀN BỘ GAME
const gameState = {
    players: {
        huy: { name: "Huy", pos: 0, score: 1500, props: [], rounds: 0 },
        hien: { name: "Hiền", pos: 0, score: 1500, props: [], rounds: 0 }
    },
    currentTurn: "huy", // "huy" hoặc "hien"
    mode: "pass_play", // "pass_play" hoặc "ai"
    isRolling: false,
    soundEnabled: true,
    pendingAction: null,
    pendingTileToBuy: null,
    pendingCard: null
};

// 4. HỆ THỐNG ÂM THANH GIAO HƯỞNG NHẸ (WEB AUDIO API TÍCH HỢP)
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
        playTone(520, 0.05, "triangle", 0.05);
    } else if (type === "land") {
        playTone(659.25, 0.15, "sine", 0.08);
        setTimeout(() => playTone(880, 0.25, "sine", 0.08), 80);
    } else if (type === "buy") {
        playTone(523.25, 0.12, "sine", 0.08);
        setTimeout(() => playTone(659.25, 0.12, "sine", 0.08), 90);
        setTimeout(() => playTone(783.99, 0.12, "sine", 0.08), 180);
        setTimeout(() => playTone(1046.50, 0.3, "sine", 0.09), 270);
    } else if (type === "upgrade") {
        playTone(587.33, 0.1, "triangle", 0.08);
        setTimeout(() => playTone(739.99, 0.12, "sine", 0.08), 90);
        setTimeout(() => playTone(880, 0.14, "sine", 0.08), 180);
        setTimeout(() => playTone(1174.66, 0.35, "sine", 0.1), 270);
    } else if (type === "fly") {
        playTone(392, 0.15, "sine", 0.06);
        setTimeout(() => playTone(587.33, 0.2, "sine", 0.07), 100);
        setTimeout(() => playTone(880, 0.35, "sine", 0.09), 220);
    } else if (type === "card") {
        playTone(587.33, 0.15, "triangle", 0.08);
        setTimeout(() => playTone(880, 0.3, "sine", 0.09), 120);
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
    populateAirportSelect();
});

// Render 24 ô trên lưới 7x7
function renderBoard() {
    const boardEl = document.getElementById("monopolyBoard");
    if (!boardEl) return;

    const centerHub = boardEl.querySelector(".board-center-hub");

    // Xóa các ô cũ nếu có
    const oldTiles = boardEl.querySelectorAll(".board-tile");
    oldTiles.forEach(t => t.remove());

    VIETNAM_LANDMARKS.forEach((tile) => {
        const tileEl = document.createElement("div");
        const isCorner = tile.type === "start" || tile.type === "airport" || tile.type === "rest" || tile.id === 12;
        tileEl.className = `board-tile ${isCorner ? "is-corner" : ""}`;
        tileEl.id = `tile-${tile.id}`;
        tileEl.style.gridRow = String(tile.row);
        tileEl.style.gridColumn = String(tile.col);

        let priceHtml = "";
        if (tile.type === "property") {
            priceHtml = `<span class="tile-price">${tile.price} 💕</span>`;
        } else if (tile.type === "start") {
            priceHtml = `<span class="tile-price">+200 💕</span>`;
        } else if (tile.type === "airport") {
            priceHtml = `<span class="tile-price">Bay Nhanh</span>`;
        } else if (tile.type === "card") {
            priceHtml = `<span class="tile-price">Thử Thách</span>`;
        } else if (tile.type === "gift") {
            priceHtml = `<span class="tile-price">Quà Tặng</span>`;
        } else {
            priceHtml = `<span class="tile-price">+100 💕</span>`;
        }

        tileEl.innerHTML = `
            <div class="tile-region-strip strip-${tile.region}"></div>
            <div class="tile-icon">${tile.icon}</div>
            <div class="tile-name">${tile.name}</div>
            <div class="tile-subtitle">${tile.subtitle}</div>
            ${priceHtml}
            <div class="tile-tokens-wrap" id="tokens-${tile.id}"></div>
        `;

        // Chạm vào bất kỳ ô nào để xem bưu thiếp chi tiết
        tileEl.addEventListener("click", () => {
            openPostcardInspector(tile.id);
        });

        boardEl.insertBefore(tileEl, centerHub);
    });

    updatePlayerTokensOnBoard();
}

// Cập nhật vị trí quân cờ, huy hiệu cấp độ và cờ sở hữu
function updatePlayerTokensOnBoard() {
    VIETNAM_LANDMARKS.forEach(tile => {
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

        const tileEl = document.getElementById(`tile-${tile.id}`);
        if (!tileEl) return;

        // Cập nhật huy hiệu chủ sở hữu
        let ownerBadge = tileEl.querySelector(".tile-owner-badge");
        if (tile.owner) {
            if (!ownerBadge) {
                ownerBadge = document.createElement("span");
                ownerBadge.className = `tile-owner-badge owner-${tile.owner}`;
                tileEl.appendChild(ownerBadge);
            } else {
                ownerBadge.className = `tile-owner-badge owner-${tile.owner}`;
            }
            ownerBadge.innerText = tile.owner === "huy" ? "💙 Huy" : "🌸 Hiền";
        } else if (ownerBadge) {
            ownerBadge.remove();
        }

        // Cập nhật huy hiệu cấp độ xây dựng (L1 🏡, L2 🏖️, L3 🏰)
        let lvlBadge = tileEl.querySelector(".tile-level-badge");
        if (tile.level > 0) {
            if (!lvlBadge) {
                lvlBadge = document.createElement("span");
                lvlBadge.className = "tile-level-badge";
                tileEl.appendChild(lvlBadge);
            }
            const lvlIcons = ["", "🏡 L1", "🏖️ L2", "🏰 L3"];
            lvlBadge.innerText = lvlIcons[tile.level] || "🏡";
        } else if (lvlBadge) {
            lvlBadge.remove();
        }
    });
}

// Cập nhật thanh hiển thị người chơi (HUD)
function updateHUD() {
    const huyScore = document.getElementById("huyScore");
    const hienScore = document.getElementById("hienScore");
    const huyProps = document.getElementById("huyPropsCount");
    const hienProps = document.getElementById("hienPropsCount");
    const huyRounds = document.getElementById("huyRoundsCount");
    const hienRounds = document.getElementById("hienRoundsCount");
    const hudHuy = document.getElementById("hudHuy");
    const hudHien = document.getElementById("hudHien");
    const turnText = document.getElementById("turnText");

    if (huyScore) huyScore.innerText = gameState.players.huy.score;
    if (hienScore) hienScore.innerText = gameState.players.hien.score;
    if (huyProps) huyProps.innerText = gameState.players.huy.props.length;
    if (hienProps) hienProps.innerText = gameState.players.hien.props.length;
    if (huyRounds) huyRounds.innerText = gameState.players.huy.rounds;
    if (hienRounds) hienRounds.innerText = gameState.players.hien.rounds;

    const isHuyTurn = gameState.currentTurn === "huy";

    if (hudHuy) hudHuy.classList.toggle("active-turn", isHuyTurn);
    if (hudHien) hudHien.classList.toggle("active-turn", !isHuyTurn);

    if (turnText) {
        turnText.innerText = isHuyTurn ? "Lượt của Huy nè 💙" : "Lượt của Hiền nè 🌸";
    }
}

// 6. THIẾT LẬP CÁC SỰ KIỆN NÚT BẤM
function setupEventListeners() {
    const rollBtn = document.getElementById("rollDiceBtn");
    if (rollBtn) {
        rollBtn.addEventListener("click", () => {
            handleDiceRoll();
        });
    }

    // Đổi chế độ chơi: 2 người chuyền tay hoặc Chơi cùng Người Yêu Ảo (AI)
    const btnPassPlay = document.getElementById("btnModePassPlay");
    const btnAI = document.getElementById("btnModeAI");
    if (btnPassPlay && btnAI) {
        btnPassPlay.addEventListener("click", () => {
            gameState.mode = "pass_play";
            btnPassPlay.classList.add("active");
            btnAI.classList.remove("active");
        });
        btnAI.addEventListener("click", () => {
            gameState.mode = "ai";
            btnAI.classList.add("active");
            btnPassPlay.classList.remove("active");
            if (gameState.currentTurn === "hien" && !gameState.isRolling) {
                triggerAITurn();
            }
        });
    }

    const btnRestart = document.getElementById("btnRestartGame");
    if (btnRestart) {
        btnRestart.addEventListener("click", () => {
            if (confirm("Bắt đầu lại chuyến hành trình xuyên Việt mới từ đầu nhé? 💕")) {
                restartGame();
            }
        });
    }

    const btnSound = document.getElementById("btnToggleSound");
    if (btnSound) {
        btnSound.addEventListener("click", () => {
            gameState.soundEnabled = !gameState.soundEnabled;
            const icon = document.getElementById("soundIcon");
            if (icon) icon.innerText = gameState.soundEnabled ? "🔔" : "🔕";
        });
    }

    // Modal Hướng Dẫn
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

    // Modal Hộ Chiếu Du Lịch
    const btnPassport = document.getElementById("btnOpenPassport");
    const modalPassport = document.getElementById("modalPassport");
    const btnClosePassport = document.getElementById("btnClosePassport");
    if (btnPassport) {
        btnPassport.addEventListener("click", openPassportModal);
    }
    if (btnClosePassport && modalPassport) {
        btnClosePassport.addEventListener("click", () => {
            modalPassport.classList.remove("active");
            modalPassport.setAttribute("aria-hidden", "true");
        });
    }

    // Modal Mua Đất / Nâng Cấp
    const btnConfirmBuy = document.getElementById("btnConfirmBuy");
    const btnCancelBuy = document.getElementById("btnCancelBuy");
    if (btnConfirmBuy) {
        btnConfirmBuy.addEventListener("click", () => {
            confirmBuyOrUpgradeProperty();
        });
    }
    if (btnCancelBuy) {
        btnCancelBuy.addEventListener("click", () => {
            closeModal("modalBuyProperty");
            finishTurn();
        });
    }

    // Modal Bưu Thiếp Chi Tiết
    const btnCloseInspect = document.getElementById("btnCloseInspect");
    const btnInspectUpgrade = document.getElementById("btnInspectUpgrade");
    if (btnCloseInspect) {
        btnCloseInspect.addEventListener("click", () => {
            closeModal("modalPostcardInspector");
        });
    }
    if (btnInspectUpgrade) {
        btnInspectUpgrade.addEventListener("click", () => {
            closeModal("modalPostcardInspector");
            confirmBuyOrUpgradeProperty();
        });
    }

    // Modal Thư Tình Duyên
    const btnAcceptCard = document.getElementById("btnAcceptLoveCard");
    if (btnAcceptCard) {
        btnAcceptCard.addEventListener("click", () => {
            confirmAcceptLoveCard();
        });
    }

    // Modal Sân Bay Bay Nhanh
    const btnFlyPartner = document.getElementById("btnFlyToPartner");
    const btnConfirmFly = document.getElementById("btnConfirmAirportFly");
    if (btnFlyPartner) {
        btnFlyPartner.addEventListener("click", handleFlyToPartner);
    }
    if (btnConfirmFly) {
        btnConfirmFly.addEventListener("click", handleFlyToSelectedDest);
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

// 7. XỬ LÝ LĂN XÚC XẮC 3D VÀ BƯỚC ĐI TỪNG Ô
function handleDiceRoll() {
    if (gameState.isRolling) return;
    gameState.isRolling = true;

    const rollBtn = document.getElementById("rollDiceBtn");
    const statusMsg = document.getElementById("actionStatusMsg");
    const diceCube = document.getElementById("diceCube");

    if (rollBtn) rollBtn.disabled = true;

    playSoundCue("tick");

    if (diceCube) {
        diceCube.classList.add("rolling");
    }

    const activePlayerKey = gameState.currentTurn;
    const activePlayer = gameState.players[activePlayerKey];

    if (statusMsg) {
        statusMsg.innerText = `${activePlayer.name} đang tung xúc xắc...`;
    }

    const rollValue = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
        if (diceCube) {
            diceCube.classList.remove("rolling");
            applyDiceFaceRotation(diceCube, rollValue);
        }

        if (statusMsg) {
            statusMsg.innerText = `${activePlayer.name} vừa tung được ${rollValue} nút!`;
        }

        setTimeout(() => {
            animatePlayerStepByStep(activePlayerKey, rollValue, () => {
                onPlayerLanded(activePlayerKey);
            });
        }, 500);

    }, 700);
}

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

// Bước đi từng bước quanh bàn cờ 24 ô
function animatePlayerStepByStep(playerKey, stepsLeft, onComplete) {
    if (stepsLeft <= 0) {
        if (typeof onComplete === "function") onComplete();
        return;
    }

    const player = gameState.players[playerKey];
    const prevPos = player.pos;
    const nextPos = (prevPos + 1) % VIETNAM_LANDMARKS.length;

    player.pos = nextPos;
    playSoundCue("tick");
    updatePlayerTokensOnBoard();

    // Đi qua ô Ga Hà Nội (Khởi hành, id = 0)
    if (nextPos === 0) {
        player.score += 200;
        player.rounds += 1;
        updateHUD();
        const statusMsg = document.getElementById("actionStatusMsg");
        if (statusMsg) {
            statusMsg.innerText = `🚩 ${player.name} đi qua Ga Hà Nội, hoàn thành 1 vòng đất nước (+200 💕)!`;
        }
    }

    setTimeout(() => {
        animatePlayerStepByStep(playerKey, stepsLeft - 1, onComplete);
    }, 200);
}

// 8. XỬ LÝ KHI DỪNG TẠI MỘT Ô TRÊN BÀN CỜ
function onPlayerLanded(playerKey) {
    const player = gameState.players[playerKey];
    const tile = VIETNAM_LANDMARKS[player.pos];
    const otherKey = playerKey === "huy" ? "hien" : "huy";
    const otherPlayer = gameState.players[otherKey];

    playSoundCue("land");

    // 1. Ô SÂN BAY QUỐC TẾ (✈️ BAY NHANH)
    if (tile.type === "airport") {
        triggerAirportModal(playerKey);
        return;
    }

    // 2. Ô THƯ TÌNH DUYÊN (💌 THỬ THÁCH HẸN HÒ)
    if (tile.type === "card") {
        triggerLoveCard(playerKey);
        return;
    }

    // 3. Ô HỘP QUÀ MAY MẮN (🎁 THƯỞNG DU LỊCH)
    if (tile.type === "gift") {
        const giftPoints = Math.floor(Math.random() * 8 + 5) * 10; // 50 đến 120 điểm
        player.score += giftPoints;
        updateHUD();
        playSoundCue("buy");
        showAlertModal("🎁 Hộp Quà May Mắn", `${player.name} mở được kho báu du lịch ngọt ngào: cộng ngay <strong>+${giftPoints} 💕</strong>!`, "🎁");
        return;
    }

    // 4. Ô NGHỈ CHÂN (⛺ CẮM TRẠI ĐỒI MÂY)
    if (tile.type === "rest") {
        player.score += 100;
        updateHUD();
        playSoundCue("buy");
        showAlertModal("⛺ Cắm Trại Đồi Mây", `${player.name} cùng người yêu dựng lều nướng khoai ngắm sao trời, nhận <strong>+100 💕</strong> năng lượng thư thái!`, "⛺");
        return;
    }

    // 5. Ô KHỞI HÀNH (GA HÀ NỘI)
    if (tile.type === "start") {
        showAlertModal("🚩 Ga Hà Nội", `Trở lại điểm xuất phát yêu thương! ${player.name} luôn giữ vẹn nguyên tình cảm ban đầu.`, "🚩");
        return;
    }

    // 6. Ô ĐỊA DANH DANH THẮNG (PROPERTY)
    if (tile.type === "property") {
        // A. Chưa ai sở hữu -> Hỏi mua (Xây Homestay Cấp 1)
        if (!tile.owner) {
            promptBuyProperty(playerKey, tile);
            return;
        }

        // B. Do chính mình sở hữu -> Hỏi NÂNG CẤP (Level 1 -> 2 -> 3)
        if (tile.owner === playerKey) {
            if (tile.level < 3) {
                promptUpgradeProperty(playerKey, tile);
            } else {
                showAlertModal(
                    "🏰 Kỳ Quan Tình Yêu Cực Phẩm",
                    `Bạn đã về lại ${tile.name}! Nơi đây đã là Kỳ Quan Cấp 3 tráng lệ nhất do chính bạn xây dựng.`,
                    "🏰"
                );
            }
            return;
        }

        // C. Do đối phương sở hữu -> Trả tiền hẹn hò theo cấp độ
        if (tile.owner === otherKey) {
            const currentRent = tile.rent[Math.max(0, tile.level - 1)] || tile.rent[0];
            const payAmount = Math.min(currentRent, player.score);
            player.score -= payAmount;
            otherPlayer.score += payAmount;
            updateHUD();
            playSoundCue("rent");

            const levelNames = ["", "Homestay", "Resort Nghỉ Dưỡng", "Kỳ Quan Tình Yêu"];
            const lvlTitle = levelNames[tile.level] || "Tổ Ấm";

            showAlertModal(
                "💕 Ghé Thăm Địa Danh Của Người Yêu",
                `${player.name} dừng chân tại ${lvlTitle} <strong>${tile.name}</strong> của ${otherPlayer.name}!<br>Tặng đối phương <strong>${payAmount} 💕</strong> tiền hẹn hò ngọt ngào.`,
                "🌸"
            );
            return;
        }
    }

    finishTurn();
}

// 9. NÂNG CẤP VÀ MUA ĐỊA DANH
function promptBuyProperty(playerKey, tile) {
    const player = gameState.players[playerKey];
    const modal = document.getElementById("modalBuyProperty");
    const titleEl = document.getElementById("buyPropTitle");
    const subEl = document.getElementById("buyPropSubtitle");
    const descEl = document.getElementById("buyPropDesc");
    const costEl = document.getElementById("buyPropCost");
    const rentEl = document.getElementById("buyPropRent");
    const emojiEl = document.getElementById("buyPropEmoji");
    const regionTag = document.getElementById("buyModalRegion");
    const costLabel = document.getElementById("buyCostLabel");
    const confirmBtn = document.getElementById("btnConfirmBuy");

    if (titleEl) titleEl.innerText = tile.name;
    if (subEl) subEl.innerText = tile.subtitle;
    if (descEl) descEl.innerText = tile.desc;
    if (regionTag) regionTag.innerText = tile.regionName;
    if (emojiEl) emojiEl.innerText = tile.icon;
    if (costLabel) costLabel.innerText = "Chi phí xây dựng (Cấp 1):";
    if (costEl) costEl.innerText = `${tile.price} 💕`;
    if (rentEl) rentEl.innerText = `${tile.rent[0]} 💕/lần`;

    // Cập nhật xem trước 3 cấp
    updateLevelPreviewElements(tile, 1);

    if (confirmBtn) {
        if (player.score >= tile.price) {
            confirmBtn.disabled = false;
            confirmBtn.innerText = "Xây dựng Homestay 💕";
        } else {
            confirmBtn.disabled = true;
            confirmBtn.innerText = "Chưa đủ điểm 💕";
        }
    }

    gameState.pendingTileToBuy = { tile, action: "buy" };

    // Tự động mua nếu chế độ AI đến lượt Hiền
    if (gameState.mode === "ai" && playerKey === "hien") {
        setTimeout(() => {
            if (player.score >= tile.price) {
                confirmBuyOrUpgradeProperty();
            } else {
                closeModal("modalBuyProperty");
                finishTurn();
            }
        }, 1200);
        return;
    }

    if (modal) {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    }
}

function promptUpgradeProperty(playerKey, tile) {
    const player = gameState.players[playerKey];
    const nextLevel = tile.level + 1;
    const upgradeCost = tile.upgradeCost;
    const nextRent = tile.rent[nextLevel - 1];

    const modal = document.getElementById("modalBuyProperty");
    const titleEl = document.getElementById("buyPropTitle");
    const subEl = document.getElementById("buyPropSubtitle");
    const descEl = document.getElementById("buyPropDesc");
    const costEl = document.getElementById("buyPropCost");
    const rentEl = document.getElementById("buyPropRent");
    const emojiEl = document.getElementById("buyPropEmoji");
    const regionTag = document.getElementById("buyModalRegion");
    const costLabel = document.getElementById("buyCostLabel");
    const confirmBtn = document.getElementById("btnConfirmBuy");

    const levelNames = ["", "Homestay", "Resort Nghỉ Dưỡng", "Kỳ Quan Tình Yêu"];
    const targetName = levelNames[nextLevel];

    if (titleEl) titleEl.innerText = `Nâng cấp: ${tile.name}`;
    if (subEl) subEl.innerText = `${tile.subtitle} • Hiện tại: Cấp ${tile.level}`;
    if (descEl) descEl.innerText = `Nâng cấp lên ${targetName} để tăng tiền hẹn hò khi người yêu ghé thăm!`;
    if (regionTag) regionTag.innerText = tile.regionName;
    if (emojiEl) emojiEl.innerText = nextLevel === 2 ? "🏖️" : "🏰";
    if (costLabel) costLabel.innerText = `Phí nâng cấp Cấp ${nextLevel}:`;
    if (costEl) costEl.innerText = `${upgradeCost} 💕`;
    if (rentEl) rentEl.innerText = `${nextRent} 💕/lần`;

    updateLevelPreviewElements(tile, nextLevel);

    if (confirmBtn) {
        if (player.score >= upgradeCost) {
            confirmBtn.disabled = false;
            confirmBtn.innerText = `Nâng cấp lên ${targetName} 💕`;
        } else {
            confirmBtn.disabled = true;
            confirmBtn.innerText = "Chưa đủ điểm 💕";
        }
    }

    gameState.pendingTileToBuy = { tile, action: "upgrade", nextLevel, upgradeCost };

    if (gameState.mode === "ai" && playerKey === "hien") {
        setTimeout(() => {
            if (player.score >= upgradeCost) {
                confirmBuyOrUpgradeProperty();
            } else {
                closeModal("modalBuyProperty");
                finishTurn();
            }
        }, 1200);
        return;
    }

    if (modal) {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    }
}

function updateLevelPreviewElements(tile, activeStep) {
    const s1 = document.getElementById("lvlStep1");
    const s2 = document.getElementById("lvlStep2");
    const s3 = document.getElementById("lvlStep3");
    const r1 = document.getElementById("lvl1Rent");
    const r2 = document.getElementById("lvl2Rent");
    const r3 = document.getElementById("lvl3Rent");

    if (r1) r1.innerText = `${tile.rent[0]} 💕/lần`;
    if (r2) r2.innerText = `${tile.rent[1]} 💕/lần`;
    if (r3) r3.innerText = `${tile.rent[2]} 💕/lần`;

    if (s1) s1.classList.toggle("current", activeStep === 1);
    if (s2) s2.classList.toggle("current", activeStep === 2);
    if (s3) s3.classList.toggle("current", activeStep === 3);
}

function confirmBuyOrUpgradeProperty() {
    closeModal("modalBuyProperty");
    const pending = gameState.pendingTileToBuy;
    if (!pending || !pending.tile) {
        finishTurn();
        return;
    }

    const { tile, action, nextLevel, upgradeCost } = pending;
    const playerKey = gameState.currentTurn;
    const player = gameState.players[playerKey];
    const statusMsg = document.getElementById("actionStatusMsg");

    if (action === "buy") {
        if (player.score >= tile.price) {
            player.score -= tile.price;
            tile.owner = playerKey;
            tile.level = 1;
            player.props.push(tile.id);
            playSoundCue("buy");
            updatePlayerTokensOnBoard();
            updateHUD();

            if (statusMsg) {
                statusMsg.innerText = `🏡 ${player.name} vừa xây Homestay Tình Yêu tại ${tile.name}!`;
            }
        }
    } else if (action === "upgrade") {
        if (player.score >= upgradeCost) {
            player.score -= upgradeCost;
            tile.level = nextLevel;
            playSoundCue("upgrade");
            updatePlayerTokensOnBoard();
            updateHUD();

            const levelNames = ["", "Homestay", "Resort", "Kỳ Quan"];
            if (statusMsg) {
                statusMsg.innerText = `✨ ${player.name} đã nâng cấp ${tile.name} lên ${levelNames[nextLevel]}!`;
            }
        }
    }

    gameState.pendingTileToBuy = null;
    finishTurn();
}

// 10. SÂN BAY QUỐC TẾ (BAY NHANH ĐẶC QUYỀN)
function triggerAirportModal(playerKey) {
    const modal = document.getElementById("modalAirportFlight");
    playSoundCue("fly");

    if (gameState.mode === "ai" && playerKey === "hien") {
        // AI tự động bay đến bên người yêu
        setTimeout(() => {
            handleFlyToPartner();
        }, 1200);
        return;
    }

    if (modal) {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    }
}

function populateAirportSelect() {
    const select = document.getElementById("airportDestSelect");
    if (!select) return;
    select.innerHTML = "";

    VIETNAM_LANDMARKS.forEach(t => {
        if (t.type === "airport") return;
        const opt = document.createElement("option");
        opt.value = t.id;
        opt.innerText = `${t.icon} ${t.name} (${t.subtitle})`;
        select.appendChild(opt);
    });
}

function handleFlyToPartner() {
    closeModal("modalAirportFlight");
    const playerKey = gameState.currentTurn;
    const otherKey = playerKey === "huy" ? "hien" : "huy";
    const targetPos = gameState.players[otherKey].pos;

    executeFlightAnimation(playerKey, targetPos, () => {
        showAlertModal("💖 Đoàn Tụ Tình Yêu", `${gameState.players[playerKey].name} đã bay thẳng tới bên cạnh ${gameState.players[otherKey].name}! Tình cảm đong đầy.`, "✈️");
    });
}

function handleFlyToSelectedDest() {
    const select = document.getElementById("airportDestSelect");
    if (!select) return;
    const destId = parseInt(select.value, 10);
    closeModal("modalAirportFlight");

    const playerKey = gameState.currentTurn;
    executeFlightAnimation(playerKey, destId, () => {
        onPlayerLanded(playerKey);
    });
}

function executeFlightAnimation(playerKey, targetPos, onDone) {
    playSoundCue("fly");
    const player = gameState.players[playerKey];
    player.pos = targetPos;
    updatePlayerTokensOnBoard();

    const statusMsg = document.getElementById("actionStatusMsg");
    if (statusMsg) {
        statusMsg.innerText = `✈️ ${player.name} vừa hạ cánh an toàn tại ${VIETNAM_LANDMARKS[targetPos].name}!`;
    }

    setTimeout(() => {
        if (typeof onDone === "function") onDone();
    }, 400);
}

// 11. THƯ TÌNH DUYÊN (LOVE CARD)
function triggerLoveCard(playerKey) {
    const randomCard = LOVE_CARDS[Math.floor(Math.random() * LOVE_CARDS.length)];
    const modal = document.getElementById("modalLoveCard");
    const titleEl = document.getElementById("loveCardTitle");
    const contentEl = document.getElementById("loveCardContent");
    const rewardEl = document.getElementById("loveCardReward");

    if (titleEl) titleEl.innerText = randomCard.title;
    if (contentEl) contentEl.innerText = randomCard.content;
    if (rewardEl) rewardEl.innerText = `+${randomCard.reward} Điểm Yêu Thương 💕`;

    gameState.pendingCard = { playerKey, reward: randomCard.reward };
    playSoundCue("card");

    if (gameState.mode === "ai" && playerKey === "hien") {
        setTimeout(() => {
            confirmAcceptLoveCard();
        }, 1500);
        return;
    }

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

// 12. BƯU THIẾP ĐỊA DANH (POSTCARD INSPECTOR KHI CHẠM Ô)
function openPostcardInspector(tileId) {
    const tile = VIETNAM_LANDMARKS[tileId];
    if (!tile) return;

    const modal = document.getElementById("modalPostcardInspector");
    const titleEl = document.getElementById("inspectTitle");
    const subEl = document.getElementById("inspectSubtitle");
    const descEl = document.getElementById("inspectDesc");
    const emojiEl = document.getElementById("inspectEmoji");
    const regionTag = document.getElementById("inspectRegion");
    const ownerBox = document.getElementById("inspectOwnerBox");
    const r1 = document.getElementById("inspectRentL1");
    const r2 = document.getElementById("inspectRentL2");
    const r3 = document.getElementById("inspectRentL3");
    const btnUpgrade = document.getElementById("btnInspectUpgrade");

    if (titleEl) titleEl.innerText = tile.name;
    if (subEl) subEl.innerText = tile.subtitle;
    if (descEl) descEl.innerText = tile.desc;
    if (emojiEl) emojiEl.innerText = tile.icon;
    if (regionTag) regionTag.innerText = tile.regionName;

    if (tile.type === "property") {
        if (r1) r1.innerText = `${tile.rent[0]} 💕`;
        if (r2) r2.innerText = `${tile.rent[1]} 💕`;
        if (r3) r3.innerText = `${tile.rent[2]} 💕`;

        if (ownerBox) {
            if (tile.owner) {
                const ownerName = tile.owner === "huy" ? "Huy 💙" : "Hiền 🌸";
                const lvlNames = ["", "Homestay", "Resort", "Kỳ Quan"];
                ownerBox.innerHTML = `Sở hữu bởi: <strong>${ownerName}</strong> (${lvlNames[tile.level]})`;
            } else {
                ownerBox.innerHTML = `Giá xây dựng: <strong>${tile.price} 💕</strong> (Chưa có ai sở hữu)`;
            }
        }

        // Nếu là lượt của người sở hữu và chưa đạt max cấp 3
        if (btnUpgrade) {
            if (tile.owner === gameState.currentTurn && tile.level < 3 && gameState.players[tile.owner].pos === tile.id) {
                btnUpgrade.style.display = "inline-block";
                btnUpgrade.innerText = `Nâng cấp Cấp ${tile.level + 1} (${tile.upgradeCost} 💕)`;
                gameState.pendingTileToBuy = { tile, action: "upgrade", nextLevel: tile.level + 1, upgradeCost: tile.upgradeCost };
            } else {
                btnUpgrade.style.display = "none";
            }
        }
    } else {
        if (r1) r1.innerText = "-";
        if (r2) r2.innerText = "-";
        if (r3) r3.innerText = "-";
        if (ownerBox) ownerBox.innerText = "Địa điểm đặc biệt";
        if (btnUpgrade) btnUpgrade.style.display = "none";
    }

    if (modal) {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    }
}

// 13. HỘ CHIẾU DU LỊCH (TRAVEL PASSPORT)
function openPassportModal() {
    const modal = document.getElementById("modalPassport");
    const totalUnlocked = document.getElementById("passTotalUnlocked");
    const huyTotal = document.getElementById("passHuyTotal");
    const hienTotal = document.getElementById("passHienTotal");
    const grid = document.getElementById("passportLandmarksGrid");

    const propTiles = VIETNAM_LANDMARKS.filter(t => t.type === "property");
    const ownedCount = propTiles.filter(t => Boolean(t.owner)).length;

    if (totalUnlocked) totalUnlocked.innerText = `${ownedCount} / ${propTiles.length}`;
    if (huyTotal) huyTotal.innerText = `${gameState.players.huy.score} 💕`;
    if (hienTotal) hienTotal.innerText = `${gameState.players.hien.score} 💕`;

    if (grid) {
        grid.innerHTML = "";
        propTiles.forEach(t => {
            const item = document.createElement("div");
            item.className = `passport-stamp-item ${t.owner ? `owned-${t.owner}` : ""}`;
            let ownerText = "Chưa khám phá";
            if (t.owner === "huy") ownerText = "💙 Huy";
            if (t.owner === "hien") ownerText = "🌸 Hiền";

            item.innerHTML = `
                <div>${t.icon} <strong>${t.name}</strong></div>
                <span class="stamp-badge">${ownerText}</span>
            `;
            grid.appendChild(item);
        });
    }

    if (modal) {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    }
}

// 14. HOÀN THÀNH LƯỢT VÀ CHUYỂN NGƯỜI CHƠI
function finishTurn() {
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

    // Điều kiện chiến thắng hữu nghị (đạt 3,500 💕)
    if (nextPlayer.score >= 3500) {
        showAlertModal(
            "🎉 Chuyến Đi Xuyên Việt Đích Thực",
            `Chúc mừng ${nextPlayer.name} và hai đứa đã hoàn thành xuất sắc chuyến hành trình xuyên Việt ngập tràn kỷ niệm!<br>Dù ai nhiều điểm hơn thì phần thưởng đẹp nhất vẫn là nụ cười của nhau 💕`,
            "💖",
            () => restartGame()
        );
        return;
    }

    // Tự động kích hoạt lượt AI nếu đang ở chế độ Người Yêu Ảo
    if (gameState.mode === "ai" && gameState.currentTurn === "hien") {
        setTimeout(triggerAITurn, 1000);
    }
}

// Lượt của Người Yêu Ảo (AI)
function triggerAITurn() {
    if (gameState.isRolling || gameState.currentTurn !== "hien") return;
    const statusMsg = document.getElementById("actionStatusMsg");
    if (statusMsg) {
        statusMsg.innerText = "🌸 Hiền đang chuẩn bị tung xúc xắc...";
    }
    setTimeout(() => {
        handleDiceRoll();
    }, 800);
}

// 15. THÔNG BÁO VÀ TIỆN ÍCH
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

function restartGame() {
    gameState.players.huy.pos = 0;
    gameState.players.huy.score = 1500;
    gameState.players.huy.props = [];
    gameState.players.huy.rounds = 0;

    gameState.players.hien.pos = 0;
    gameState.players.hien.score = 1500;
    gameState.players.hien.props = [];
    gameState.players.hien.rounds = 0;

    gameState.currentTurn = "huy";
    gameState.isRolling = false;

    VIETNAM_LANDMARKS.forEach(t => {
        t.owner = null;
        t.level = 0;
    });

    updatePlayerTokensOnBoard();
    updateHUD();

    const rollBtn = document.getElementById("rollDiceBtn");
    if (rollBtn) rollBtn.disabled = false;

    const statusMsg = document.getElementById("actionStatusMsg");
    if (statusMsg) {
        statusMsg.innerText = "Chạm vào 'Tung Xúc Xắc' để bắt đầu chuyến du hành xuyên Việt!";
    }
}

// 16. ĐỒNG BỘ THEME TỐI GIẢN
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
