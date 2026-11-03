/**
 * ========================================================
 * CỜ TỶ PHÚ VIỆT NAM (MONOPOLY VIETNAM EDITION)
 * Game chiến thuật bàn cờ bất động sản & đầu tư tài chính chuẩn Monopoly
 * Lưới 7x7 (24 ô), xúc xắc 3D chân thực, hiệu ứng âm thanh sống động
 * Hỗ trợ 2, 3, 4 người chơi & Đấu với AI thông minh
 * ========================================================
 */

// 1. DANH SÁCH 24 Ô BÀN CỜ MONOPOLY VIỆT NAM (7x7 GRID)
const VIETNAM_TILES = [
    // --- CẠNH TRÊN: TỪ TRÁI QUA PHẢI (ROW 1: COL 1 ĐẾN 7) ---
    {
        id: 0, row: 1, col: 1,
        name: "Ga Hà Nội",
        subtitle: "Khởi Hành (GO)",
        icon: "🚩",
        region: "special",
        regionName: "Bắt Đầu",
        type: "start",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Điểm xuất phát trên bàn cờ. Mỗi lần hoàn thành một vòng và đi qua đây nhận ngay 200M VNĐ tiền trợ cấp từ Ngân hàng.",
        owner: null,
        level: 0
    },
    {
        id: 1, row: 1, col: 2,
        name: "Hồ Gươm",
        subtitle: "Hà Nội",
        icon: "🏮",
        region: "hanoi",
        regionName: "Bắc Bộ",
        type: "property",
        price: 100,
        rent: [20, 60, 140],
        upgradeCost: 50,
        desc: "Trái tim của Thủ đô ngàn năm văn hiến. Vị trí đắc địa với Tháp Rùa và cầu Thê Húc, giá trị đất tăng trưởng đều.",
        owner: null,
        level: 0
    },
    {
        id: 2, row: 1, col: 3,
        name: "Vịnh Hạ Long",
        subtitle: "Quảng Ninh",
        icon: "⛵",
        region: "hanoi",
        regionName: "Bắc Bộ",
        type: "property",
        price: 120,
        rent: [25, 75, 170],
        upgradeCost: 60,
        desc: "Kỳ quan thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi kỳ vĩ soi bóng xuống làn nước xanh ngọc bích.",
        owner: null,
        level: 0
    },
    {
        id: 3, row: 1, col: 4,
        name: "Cơ Hội",
        subtitle: "Rút Thẻ May Mắn",
        icon: "❓",
        region: "special",
        regionName: "Cơ Hội",
        type: "chance",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Rút một thẻ Cơ Hội bất ngờ: Thưởng lớn, chia cổ tức hoặc nộp phạt hành chính.",
        owner: null,
        level: 0
    },
    {
        id: 4, row: 1, col: 5,
        name: "Đỉnh Fansipan",
        subtitle: "Sa Pa",
        icon: "🏔️",
        region: "northwest",
        regionName: "Tây Bắc",
        type: "property",
        price: 150,
        rent: [35, 100, 220],
        upgradeCost: 75,
        desc: "Nóc nhà Đông Dương ở độ cao 3.143m. Khu du lịch trên mây đem lại dòng tiền tham quan đều đặn.",
        owner: null,
        level: 0
    },
    {
        id: 5, row: 1, col: 6,
        name: "Tràng An",
        subtitle: "Ninh Bình",
        icon: "🚣",
        region: "northwest",
        regionName: "Tây Bắc",
        type: "property",
        price: 170,
        rent: [40, 115, 250],
        upgradeCost: 85,
        desc: "Di sản thế giới với cảnh sắc non nước hữu tình, địa bàn bất động sản sinh thái cực kỳ tiềm năng.",
        owner: null,
        level: 0
    },
    {
        id: 6, row: 1, col: 7,
        name: "Vào Tù",
        subtitle: "Cảnh Sát Bắt",
        icon: "🚔",
        region: "special",
        regionName: "Vào Tù",
        type: "go_to_jail",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Bị lực lượng trật tự giao thông áp giải thẳng đến Nhà Tù! Bạn không được nhận trợ cấp 200M và phải giải quyết bảo lãnh.",
        owner: null,
        level: 0
    },

    // --- CẠNH PHẢI: TỪ TRÊN XUỐNG DƯỚI (ROW 2 ĐẾN 7: COL 7) ---
    {
        id: 7, row: 2, col: 7,
        name: "Cố Đô Huế",
        subtitle: "Thừa Thiên Huế",
        icon: "🏯",
        region: "central",
        regionName: "Miền Trung",
        type: "property",
        price: 200,
        rent: [50, 140, 300],
        upgradeCost: 100,
        desc: "Kinh thành triều Nguyễn với bề dày lịch sử vàng son. Bất động sản văn hóa có giá trị bảo tồn và tiền thuê cao.",
        owner: null,
        level: 0
    },
    {
        id: 8, row: 3, col: 7,
        name: "Cầu Vàng",
        subtitle: "Bà Nà Hills",
        icon: "🌉",
        region: "central",
        regionName: "Miền Trung",
        type: "property",
        price: 220,
        rent: [55, 155, 330],
        upgradeCost: 110,
        desc: "Biểu tượng du lịch hiện đại nổi tiếng toàn cầu. Lưu lượng khách tham quan liên tục đem về doanh thu khổng lồ.",
        owner: null,
        level: 0
    },
    {
        id: 9, row: 4, col: 7,
        name: "Công Ty Điện Lực",
        subtitle: "Dịch Vụ Tiện Ích",
        icon: "⚡",
        region: "special",
        regionName: "Tiện Ích",
        type: "utility",
        price: 150,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Cung cấp điện lưới quốc gia. Người đi vào phải trả tiền điện bằng số nút xúc xắc x 15M VNĐ cho chủ sở hữu.",
        owner: null,
        level: 0
    },
    {
        id: 10, row: 5, col: 7,
        name: "Phố Cổ Hội An",
        subtitle: "Quảng Nam",
        icon: "🏮",
        region: "coastal",
        regionName: "Duyên Hải",
        type: "property",
        price: 250,
        rent: [65, 180, 380],
        upgradeCost: 125,
        desc: "Thương cảng cổ phồn hoa với những ngôi nhà cổ tường vàng hoa giấy. Điểm kinh doanh dịch vụ đắt giá bậc nhất.",
        owner: null,
        level: 0
    },
    {
        id: 11, row: 6, col: 7,
        name: "Biển Mỹ Khê",
        subtitle: "Đà Nẵng",
        icon: "🏖️",
        region: "coastal",
        regionName: "Duyên Hải",
        type: "property",
        price: 270,
        rent: [70, 195, 410],
        upgradeCost: 135,
        desc: "Một trong sáu bãi biển quyến rũ nhất hành tinh. Dải đất vàng ven biển luôn là mục tiêu săn đón của các tập đoàn khách sạn.",
        owner: null,
        level: 0
    },
    {
        id: 12, row: 7, col: 7,
        name: "Bãi Đỗ Xe",
        subtitle: "Hũ Thưởng",
        icon: "🅿️",
        region: "special",
        regionName: "Đỗ Xe",
        type: "parking",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Toàn bộ tiền thuế và tiền phạt trong suốt ván đấu được gom vào đây, người dừng chân sẽ ăn trọn hũ tiền thưởng!",
        owner: null,
        level: 0
    },

    // --- CẠNH DƯỚI: TỪ PHẢI QUA TRÁI (ROW 7: COL 6 XUỐNG 1) ---
    {
        id: 13, row: 7, col: 6,
        name: "Đà Lạt",
        subtitle: "Lâm Đồng",
        icon: "🌲",
        region: "highlands",
        regionName: "Tây Nguyên",
        type: "property",
        price: 300,
        rent: [80, 220, 460],
        upgradeCost: 150,
        desc: "Thành phố sương mù và ngàn hoa thơ mộng. Khu biệt thự cổ điển tại đây luôn đạt tỷ lệ lấp đầy phòng cực cao.",
        owner: null,
        level: 0
    },
    {
        id: 14, row: 7, col: 5,
        name: "Buôn Ma Thuột",
        subtitle: "Đắk Lắk",
        icon: "☕",
        region: "highlands",
        regionName: "Tây Nguyên",
        type: "property",
        price: 320,
        rent: [85, 235, 490],
        upgradeCost: 160,
        desc: "Thủ phủ cà phê lớn nhất Đông Nam Á. Đất trồng và cơ sở chế biến nông sản xuất khẩu có giá trị thương mại lớn.",
        owner: null,
        level: 0
    },
    {
        id: 15, row: 7, col: 4,
        name: "Khí Vận",
        subtitle: "Rút Thẻ May Mắn",
        icon: "📦",
        region: "special",
        regionName: "Khí Vận",
        type: "chest",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Rút thẻ Khí Vận cộng đồng: Trợ cấp kinh tế, sửa chữa nhà cửa hoặc nhận quà tặng tài chính.",
        owner: null,
        level: 0
    },
    {
        id: 16, row: 7, col: 3,
        name: "Vịnh Nha Trang",
        subtitle: "Khánh Hòa",
        icon: "🌊",
        region: "south_coast",
        regionName: "Nam Trung Bộ",
        type: "property",
        price: 350,
        rent: [95, 260, 540],
        upgradeCost: 175,
        desc: "Vịnh biển thiên đường với chuỗi resort 5 sao sang trọng. Tiền thuê đất tại đây là gánh nặng lớn cho đối thủ.",
        owner: null,
        level: 0
    },
    {
        id: 17, row: 7, col: 2,
        name: "Đồi Cát Mũi Né",
        subtitle: "Bình Thuận",
        icon: "🏜️",
        region: "south_coast",
        regionName: "Nam Trung Bộ",
        type: "property",
        price: 370,
        rent: [100, 280, 580],
        upgradeCost: 185,
        desc: "Tiểu sa mạc ven biển độc đáo của Việt Nam. Điểm du lịch thể thao mạo hiểm thu hút nhiều dòng tiền đầu tư giải trí.",
        owner: null,
        level: 0
    },
    {
        id: 18, row: 7, col: 1,
        name: "Nhà Tù",
        subtitle: "Thăm Tù / Bị Giam",
        icon: "⛓️",
        region: "special",
        regionName: "Nhà Tù",
        type: "jail",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Nếu chỉ đi qua: Thăm tù bình an vô sự. Nếu bị bắt vào tù: Phải nộp 50M bảo lãnh hoặc tung xúc xắc từ 4 điểm trở lên để thoát.",
        owner: null,
        level: 0
    },

    // --- CẠNH TRÁI: TỪ DƯỚI LÊN TRÊN (ROW 6 XUỐNG 2: COL 1) ---
    {
        id: 19, row: 6, col: 1,
        name: "Sân Bay",
        subtitle: "Cảng Hàng Không",
        icon: "✈️",
        region: "special",
        regionName: "Sân Bay",
        type: "airport",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Dịch vụ bay tốc hành. Chỉ với 50M tiền vé, bạn có quyền bay thẳng đến bất kỳ ô chiến lược nào trên toàn bản đồ!",
        owner: null,
        level: 0
    },
    {
        id: 20, row: 5, col: 1,
        name: "Bến Ninh Kiều",
        subtitle: "Cần Thơ",
        icon: "🚢",
        region: "south",
        regionName: "Nam Bộ",
        type: "property",
        price: 400,
        rent: [110, 310, 640],
        upgradeCost: 200,
        desc: "Thủ phủ miền Tây sông nước bên dòng sông Hậu hiền hòa. Trung tâm giao thương sầm uất với chợ nổi và bến cảng tấp nập.",
        owner: null,
        level: 0
    },
    {
        id: 21, row: 4, col: 1,
        name: "Chợ Bến Thành",
        subtitle: "TP. Hồ Chí Minh",
        icon: "🏢",
        region: "south",
        regionName: "Nam Bộ",
        type: "property",
        price: 430,
        rent: [120, 340, 700],
        upgradeCost: 215,
        desc: "Biểu tượng kinh tế hàng đầu tại trung tâm Quận 1 Sài Gòn. Giá đất kim cương với dòng tiền thuê mặt bằng siêu khủng.",
        owner: null,
        level: 0
    },
    {
        id: 22, row: 3, col: 1,
        name: "Thuế Thu Nhập",
        subtitle: "Nộp Ngân Khố",
        icon: "💰",
        region: "special",
        regionName: "Thuế",
        type: "tax",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Cơ quan thuế kiểm tra tài chính. Bạn phải nộp ngay 100M VNĐ thuế doanh nghiệp (tiền này được dồn vào hũ Bãi Đỗ Xe).",
        owner: null,
        level: 0
    },
    {
        id: 23, row: 2, col: 1,
        name: "Đảo Phú Quốc",
        subtitle: "Kiên Giang",
        icon: "🏝️",
        region: "islands",
        regionName: "Biển Đảo",
        type: "property",
        price: 480,
        rent: [140, 400, 850],
        upgradeCost: 240,
        desc: "Đảo Ngọc thiên đường nhiệt đới lớn nhất Việt Nam. Mảnh đất vàng đắt đỏ nhất trên bàn cờ với tiền thuê phòng cao nhất ván cờ!",
        owner: null,
        level: 0
    }
];

// 2. BỘ 4 NHÂN VẬT NGƯỜI CHƠI (TỐI ĐA 4 NGƯỜI)
const ALL_PLAYER_CONFIGS = [
    {
        id: "p0",
        name: "Huy",
        icon: "🚗",
        color: "#2563eb",
        glow: "rgba(37,99,235,0.25)",
        bg: "rgba(37,99,235,0.12)"
    },
    {
        id: "p1",
        name: "Hiền",
        icon: "✈️",
        color: "#db2777",
        glow: "rgba(219,39,119,0.25)",
        bg: "rgba(219,39,119,0.12)"
    },
    {
        id: "p2",
        name: "Thành Nam",
        icon: "⛵",
        color: "#059669",
        glow: "rgba(5,150,105,0.25)",
        bg: "rgba(5,150,105,0.12)"
    },
    {
        id: "p3",
        name: "Phương Linh",
        icon: "🚀",
        color: "#ea580c",
        glow: "rgba(234,88,12,0.25)",
        bg: "rgba(234,88,12,0.12)"
    }
];

// 3. BỘ THẺ CƠ HỘI & KHÍ VẬN
const CHANCE_CARDS = [
    {
        title: "Trúng Thưởng Xổ Số Kiến Thiết",
        desc: "Vé số Vietlott mang lại giải thưởng bất ngờ! Bạn được Ngân hàng thanh toán trực tiếp.",
        type: "gain_cash",
        amount: 200,
        rewardText: "+200M VNĐ"
    },
    {
        title: "Nộp Phạt Vi Phạm Tốc Độ",
        desc: "Lái xe quá tốc độ trên cao tốc Bắc - Nam. Bạn phải nộp phạt 50M vào hũ thưởng Bãi Đỗ Xe.",
        type: "pay_parking",
        amount: 50,
        rewardText: "-50M VNĐ"
    },
    {
        title: "Chia Cổ Tức Doanh Nghiệp",
        desc: "Khoản đầu tư cổ phiếu sinh lời xuất sắc trong quý. Bạn nhận tiền chia cổ tức.",
        type: "gain_cash",
        amount: 150,
        rewardText: "+150M VNĐ"
    },
    {
        title: "Nâng Cấp Hạ Tầng Đô Thị",
        desc: "Đô thị tiến hành cải tạo đường xá. Bạn phải đóng phí bảo trì 80M cho ngân quỹ.",
        type: "pay_parking",
        amount: 80,
        rewardText: "-80M VNĐ"
    },
    {
        title: "Thẻ Miễn Giam Giữ Tự Do",
        desc: "Được viện kiểm sát cấp lệnh ân xá đặc biệt. Ra tù ngay lập tức nếu đang bị tạm giam!",
        type: "free_jail",
        amount: 0,
        rewardText: "Ân Xá Ngay Lập Tức"
    },
    {
        title: "Chuyến Tàu Siêu Tốc Về Ga Hà Nội",
        desc: "Vé tàu siêu tốc đưa bạn thẳng về ô Khởi Hành (Ga Hà Nội) và nhận ngay 200M trợ cấp!",
        type: "advance_go",
        amount: 200,
        rewardText: "Về Ga Hà Nội (+200M)"
    }
];

const CHEST_CARDS = [
    {
        title: "Khen Thưởng Doanh Nghiệp Tiêu Biểu",
        desc: "UBND trao tặng giải thưởng doanh nhân đóng góp xuất sắc cho phát triển du lịch địa phương.",
        type: "gain_cash",
        amount: 180,
        rewardText: "+180M VNĐ"
    },
    {
        title: "Bảo Trì Định Kỳ Toàn Bộ Bất Động Sản",
        desc: "Sơn sửa và nâng cấp hệ thống phòng cháy chữa cháy cho các tài sản hiện có. Nộp 70M.",
        type: "pay_parking",
        amount: 70,
        rewardText: "-70M VNĐ"
    },
    {
        title: "Nhận Lãi Tiền Gửi Tiết Kiệm",
        desc: "Sổ tiết kiệm ngân hàng kỳ hạn 12 tháng đáo hạn thành công. Nhận toàn bộ tiền lãi.",
        type: "gain_cash",
        amount: 120,
        rewardText: "+120M VNĐ"
    },
    {
        title: "Ủng Hộ Quỹ Cứu Trợ Thiên Tai",
        desc: "Đóng góp ngân sách giúp đồng bào khắc phục hậu quả bão lũ miền Trung. Nộp 60M.",
        type: "pay_parking",
        amount: 60,
        rewardText: "-60M VNĐ"
    },
    {
        title: "Bồi Thường Bảo Hiểm Tài Sản",
        desc: "Công ty bảo hiểm thanh toán khoản bồi hoàn thiệt hại thiết bị kinh doanh.",
        type: "gain_cash",
        amount: 100,
        rewardText: "+100M VNĐ"
    }
];

// 4. TRẠNG THÁI TOÀN BỘ VÁN ĐẤU (GAME STATE)
const gameState = {
    playerCount: 2, // 2, 3 hoặc 4 người chơi
    gameMode: "pass_play", // "pass_play" (bạn bè chuyền tay) hoặc "ai" (đấu máy AI)
    currentTurnIndex: 0,
    isRolling: false,
    soundEnabled: true,
    parkingPool: 100, // Hũ thưởng bãi đỗ xe khởi điểm 100M
    roundCount: 1,
    pendingCardAction: null,
    pendingPropertyTile: null,
    players: [] // Danh sách người chơi thực tế
};

// 5. TRÌNH TẠO ÂM THANH (WEB AUDIO API SYNTHESIZER)
const soundEffects = {
    ctx: null,
    init() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
    },
    playTone(freq, type, duration, delay = 0) {
        if (!gameState.soundEnabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();

            setTimeout(() => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            }, delay);
        } catch (e) {}
    },
    diceRoll() {
        for (let i = 0; i < 5; i++) {
            this.playTone(320 + Math.random() * 260, 'triangle', 0.06, i * 70);
        }
    },
    stepSound() {
        this.playTone(520, 'sine', 0.07);
    },
    cashChime() {
        this.playTone(523.25, 'triangle', 0.1, 0); // C5
        this.playTone(659.25, 'triangle', 0.12, 80); // E5
        this.playTone(783.99, 'triangle', 0.18, 160); // G5
        this.playTone(1046.50, 'triangle', 0.25, 240); // C6
    },
    payRent() {
        this.playTone(392, 'sawtooth', 0.12, 0);
        this.playTone(329.63, 'sawtooth', 0.15, 100);
        this.playTone(261.63, 'sawtooth', 0.22, 200);
    },
    jailLock() {
        this.playTone(180, 'sawtooth', 0.2, 0);
        this.playTone(120, 'square', 0.35, 120);
    },
    flightWhoosh() {
        this.playTone(300, 'sine', 0.15, 0);
        this.playTone(550, 'sine', 0.2, 100);
        this.playTone(880, 'sine', 0.3, 200);
    },
    jackpotWin() {
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, idx) => {
            this.playTone(freq, 'triangle', 0.25, idx * 90);
        });
    }
};

// 6. HIỆU ỨNG ĐỒ HỌA MƯỢT MÀ & HẤP DẪN (ANIMATIONS & PARTICLES)
const visualFX = {
    // 6.1 Tiền bay lơ lửng (+200M / -100M)
    spawnFloatingMoney(tileId, text, isPositive = true) {
        const layer = document.getElementById("floatingFxLayer");
        const cell = document.getElementById(`tile-${tileId}`);
        if (!layer || !cell) return;

        const rect = cell.getBoundingClientRect();
        const tag = document.createElement("div");
        tag.className = `floating-money-tag ${isPositive ? 'positive' : 'negative'}`;
        tag.textContent = text;
        tag.style.left = `${rect.left + rect.width / 2}px`;
        tag.style.top = `${rect.top}px`;

        layer.appendChild(tag);
        setTimeout(() => tag.remove(), 1650);
    },

    // 6.2 Bụi sóng lan tỏa khi chạm ô (Landing Ripple)
    triggerLandingRipple(tileId) {
        const cell = document.getElementById(`tile-${tileId}`);
        if (!cell) return;
        const ripple = document.createElement("div");
        ripple.className = "tile-landing-ripple";
        cell.appendChild(ripple);
        setTimeout(() => ripple.remove(), 750);
    },

    // 6.3 Đèn còi cảnh sát chớp nháy khi Vào Tù (Police Siren)
    triggerPoliceSiren() {
        soundEffects.jailLock();
        const siren = document.getElementById("policeSirenOverlay");
        if (!siren) return;
        siren.classList.add("active");
        setTimeout(() => {
            siren.classList.remove("active");
        }, 1500);
    },

    // 6.4 Pháo hoa giấy & Tiền vàng khi nổ hũ Bãi Đỗ Xe (Confetti Cannon)
    triggerConfetti() {
        const canvas = document.getElementById("confettiCanvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ["#eab308", "#16a34a", "#2563eb", "#db2777", "#ea580c", "#ffffff"];
        const emojis = ["🪙", "✨", "🎉", "💵", "⭐"];

        for (let i = 0; i < 70; i++) {
            particles.push({
                x: canvas.width / 2 + (Math.random() - 0.5) * 200,
                y: canvas.height / 2 + (Math.random() - 0.5) * 150,
                vx: (Math.random() - 0.5) * 16,
                vy: (Math.random() - 1.2) * 18,
                size: 8 + Math.random() * 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                emoji: Math.random() > 0.4 ? emojis[Math.floor(Math.random() * emojis.length)] : null,
                rotation: Math.random() * 360,
                vRot: (Math.random() - 0.5) * 12,
                opacity: 1
            });
        }

        let animationFrame;
        const startTime = Date.now();

        function renderConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const elapsed = Date.now() - startTime;
            let alive = 0;

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.45; // Gravity
                p.rotation += p.vRot;
                p.opacity = Math.max(0, 1 - elapsed / 2800);

                if (p.opacity > 0) {
                    alive++;
                    ctx.save();
                    ctx.globalAlpha = p.opacity;
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);

                    if (p.emoji) {
                        ctx.font = `${p.size * 1.5}px sans-serif`;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(p.emoji, 0, 0);
                    } else {
                        ctx.fillStyle = p.color;
                        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                    }
                    ctx.restore();
                }
            });

            if (alive > 0 && elapsed < 3000) {
                animationFrame = requestAnimationFrame(renderConfetti);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                cancelAnimationFrame(animationFrame);
            }
        }

        renderConfetti();
    }
};

// 7. KHỞI TẠO CÁC NGƯỜI CHƠI THEO CÀI ĐẶT
function initPlayers() {
    gameState.players = [];
    const count = gameState.playerCount;
    const isAiMode = gameState.gameMode === "ai";

    for (let i = 0; i < count; i++) {
        const cfg = ALL_PLAYER_CONFIGS[i];
        gameState.players.push({
            id: cfg.id,
            name: cfg.name,
            icon: cfg.icon,
            color: cfg.color,
            glow: cfg.glow,
            bg: cfg.bg,
            position: 0,
            cash: 1500, // Khởi điểm 1,500M VNĐ
            props: [],
            inJail: false,
            jailTurns: 0,
            isAi: isAiMode ? (i > 0) : false, // Nếu chế độ AI: người đầu là người thật, còn lại là AI
            isBankrupt: false
        });
    }

    gameState.currentTurnIndex = 0;
}

// 8. KHỞI TẠO BÀN CỜ MONOPOLY TRÊN DOM (TINH GỌN KHÔNG THÔNG TIN THỪA)
function initMonopolyBoard() {
    const boardEl = document.getElementById("monopolyBoard");
    if (!boardEl) return;

    // Giữ lại trung tâm boardCenterHub, xóa các ô cũ
    const centerHub = document.getElementById("boardCenterHub");
    boardEl.innerHTML = "";
    if (centerHub) boardEl.appendChild(centerHub);

    // Render từng ô trong 24 ô
    VIETNAM_TILES.forEach(tile => {
        const isCorner = tile.type === 'start' || tile.type === 'jail' || tile.type === 'go_to_jail' || tile.type === 'parking';
        const cell = document.createElement("div");
        cell.className = `board-tile ${isCorner ? 'is-corner' : ''}`;
        cell.id = `tile-${tile.id}`;
        cell.style.gridRow = tile.row;
        cell.style.gridColumn = tile.col;
        cell.title = `${tile.name} - Bấm để xem Sổ Đỏ`;

        // Dải màu vùng miền trên đầu
        const colorBand = document.createElement("div");
        colorBand.className = `tile-region-strip strip-${tile.region}`;

        // Biểu tượng
        const iconEl = document.createElement("div");
        iconEl.className = "tile-icon";
        iconEl.textContent = tile.icon;

        // Tên danh lam thắng cảnh (Đã gỡ bỏ toàn bộ phụ đề rườm rà)
        const nameEl = document.createElement("div");
        nameEl.className = "tile-name";
        nameEl.textContent = tile.name;

        // Giá mua hoặc thông tin hành động
        const priceEl = document.createElement("div");
        priceEl.className = "tile-price";
        if (tile.type === "property") {
            priceEl.textContent = `${tile.price}M`;
        } else if (tile.type === "start") {
            priceEl.textContent = "+200M";
            priceEl.style.color = "#ea580c";
        } else if (tile.type === "utility") {
            priceEl.textContent = `${tile.price}M`;
        } else if (tile.type === "tax") {
            priceEl.textContent = "-100M";
            priceEl.style.color = "#dc2626";
        } else if (tile.type === "parking") {
            priceEl.textContent = "Hũ 🅿️";
            priceEl.style.color = "#d97706";
        } else if (tile.type === "airport") {
            priceEl.textContent = "Vé 50M";
            priceEl.style.color = "#0284c7";
        } else if (tile.type === "go_to_jail") {
            priceEl.textContent = "Vào Tù";
            priceEl.style.color = "#dc2626";
        } else {
            priceEl.textContent = "Rút thẻ";
            priceEl.style.color = "#9333ea";
        }

        // Cụm hiển thị cấp độ nhà (🏠 L1, 🏡 L2, 🏨 L3)
        const levelBadge = document.createElement("div");
        levelBadge.className = "tile-level-badge";
        levelBadge.id = `level-badge-${tile.id}`;
        levelBadge.style.display = "none";

        // Huy hiệu người sở hữu (Sổ đỏ)
        const ownerBadge = document.createElement("div");
        ownerBadge.className = "tile-owner-badge";
        ownerBadge.id = `owner-badge-${tile.id}`;
        ownerBadge.style.display = "none";

        // Khung chứa quân cờ
        const tokensWrap = document.createElement("div");
        tokensWrap.className = "tile-tokens-wrap";
        tokensWrap.id = `tokens-wrap-${tile.id}`;

        cell.appendChild(colorBand);
        cell.appendChild(iconEl);
        cell.appendChild(nameEl);
        cell.appendChild(priceEl);
        cell.appendChild(levelBadge);
        cell.appendChild(ownerBadge);
        cell.appendChild(tokensWrap);

        // Sự kiện click vào ô bất kỳ để soi chi tiết Sổ Đỏ
        cell.addEventListener("click", () => {
            inspectTileTitleDeed(tile.id);
        });

        boardEl.appendChild(cell);
    });

    renderPlayerHUD();
    renderPlayerTokens();
    updateUI();
    populateAirportSelect();
}

// 9. RENDER DANH SÁCH BẢNG HUD NGƯỜI CHƠI ĐỘNG (2 - 4 NGƯỜI)
function renderPlayerHUD() {
    const listEl = document.getElementById("playersHudList");
    if (!listEl) return;
    listEl.innerHTML = "";

    gameState.players.forEach((player, idx) => {
        const card = document.createElement("div");
        card.className = `player-hud-card ${idx === gameState.currentTurnIndex ? 'active-turn' : ''} ${player.isBankrupt ? 'is-bankrupt' : ''}`;
        card.id = `hud-${player.id}`;
        card.style.setProperty("--player-theme-color", player.color);
        card.style.setProperty("--player-glow-color", player.glow);
        card.style.setProperty("--player-bg", player.bg);

        card.innerHTML = `
            <div class="player-hud-avatar-wrap">
                <span class="player-avatar-icon">${player.icon}</span>
                ${player.isAi ? '<span class="player-ai-badge">AI</span>' : ''}
            </div>
            <div class="player-hud-info">
                <div class="player-hud-name-row">
                    <span class="player-name">${player.name}</span>
                    <span class="player-color-dot" style="background:${player.color};"></span>
                </div>
                <div class="player-score-row">
                    <span class="player-score" id="cash-${player.id}">${Number(player.cash).toLocaleString()}</span>
                    <span class="score-unit">M VNĐ</span>
                </div>
                <div class="player-stats-mini" id="stats-${player.id}">
                    🏛️ ${player.props.length} BĐS • ${Number(calculateNetWorth(player)).toLocaleString()}M
                </div>
            </div>
        `;

        listEl.appendChild(card);
    });

    // Cập nhật nhãn số người ở thanh công cụ trên cùng
    const topLabel = document.getElementById("topPlayersLabel");
    if (topLabel) {
        topLabel.textContent = `${gameState.playerCount} Người ${gameState.gameMode === 'ai' ? '(Đấu AI)' : ''}`;
    }
}

// 10. CẬP NHẬT QUÂN CỜ TRÊN BÀN CỜ
function renderPlayerTokens() {
    // Xóa quân cờ khỏi tất cả các ô
    document.querySelectorAll(".tile-tokens-wrap").forEach(slot => slot.innerHTML = "");

    // Đặt từng quân cờ người chơi vào ô tương ứng
    gameState.players.forEach(player => {
        if (player.isBankrupt) return;

        const slot = document.getElementById(`tokens-wrap-${player.position}`);
        if (slot) {
            const token = document.createElement("div");
            token.className = "token-pin";
            token.id = `token-${player.id}`;
            token.textContent = player.icon;
            token.style.background = player.color;
            token.title = `${player.name} (${player.icon})`;
            slot.appendChild(token);
        }
    });
}

// 11. TÍNH TOÁN TỔNG TÀI SẢN (NET WORTH)
function calculateNetWorth(player) {
    let net = player.cash;
    player.props.forEach(propId => {
        const t = VIETNAM_TILES.find(item => item.id === propId);
        if (t) {
            net += t.price;
            if (t.level > 1) {
                net += (t.level - 1) * t.upgradeCost;
            }
        }
    });
    return net;
}

// 12. CẬP NHẬT GIAO DIỆN CHÍNH (HUD & STATS)
function updateUI() {
    const current = gameState.players[gameState.currentTurnIndex] || gameState.players[0];

    // Cập nhật tiền và tài sản từng người chơi
    gameState.players.forEach((player, idx) => {
        const cashEl = document.getElementById(`cash-${player.id}`);
        const statsEl = document.getElementById(`stats-${player.id}`);
        const cardEl = document.getElementById(`hud-${player.id}`);

        if (cashEl) cashEl.textContent = Number(player.cash).toLocaleString();
        if (statsEl) {
            statsEl.textContent = `🏛️ ${player.props.length} BĐS • ${Number(calculateNetWorth(player)).toLocaleString()}M`;
        }

        if (cardEl) {
            if (idx === gameState.currentTurnIndex) {
                cardEl.classList.add("active-turn");
            } else {
                cardEl.classList.remove("active-turn");
            }
            if (player.isBankrupt) {
                cardEl.classList.add("is-bankrupt");
            }
        }
    });

    // Cập nhật nhãn lượt chơi và màu chấm
    const turnTextEl = document.getElementById("turnStatusText");
    const turnDotEl = document.getElementById("turnDot");
    if (turnTextEl && current) {
        turnTextEl.textContent = `Lượt: ${current.name} (${current.icon}) ${current.isAi ? '[Máy]' : ''}`;
    }
    if (turnDotEl && current) {
        turnDotEl.style.background = current.color;
    }

    // Cập nhật hũ thưởng Bãi Đỗ Xe
    const poolEl = document.getElementById("parkingPoolDisplay");
    if (poolEl) poolEl.textContent = `${Number(gameState.parkingPool).toLocaleString()}M`;

    // Cập nhật Sổ đỏ và cấp độ nhà trên bàn cờ
    VIETNAM_TILES.forEach(tile => {
        const ownerEl = document.getElementById(`owner-badge-${tile.id}`);
        const levelEl = document.getElementById(`level-badge-${tile.id}`);
        if (!ownerEl || !levelEl) return;

        if (tile.owner) {
            const ownerObj = gameState.players.find(p => p.id === tile.owner);
            if (ownerObj) {
                ownerEl.textContent = ownerObj.name;
                ownerEl.style.background = ownerObj.color;
                ownerEl.style.display = "block";
            }

            if (tile.level === 1) {
                levelEl.textContent = "🏠 L1";
                levelEl.style.display = "block";
            } else if (tile.level === 2) {
                levelEl.textContent = "🏡 L2";
                levelEl.style.display = "block";
            } else if (tile.level >= 3) {
                levelEl.textContent = "🏨 L3";
                levelEl.style.display = "block";
            } else {
                levelEl.style.display = "none";
            }
        } else {
            ownerEl.style.display = "none";
            levelEl.style.display = "none";
        }
    });

    // Cập nhật nút tung xúc xắc
    const rollBtn = document.getElementById("rollDiceBtn");
    const rollBtnText = document.getElementById("rollBtnText");
    if (rollBtn && current) {
        rollBtn.disabled = gameState.isRolling || current.isAi;
        if (rollBtnText) {
            if (current.isAi) {
                rollBtnText.textContent = `🤖 ${current.name} Đang Đi...`;
            } else {
                rollBtnText.textContent = `${current.name} Tung Xúc Xắc (${current.icon})`;
            }
        }
    }
}

// 13. ĐIỀU KHIỂN XÚC XẮC 3D VỚI GÓC QUAY VẬT LÝ CHÂN THỰC
function roll3DDice(targetValue, callback) {
    const diceCube = document.getElementById("diceCube");
    if (!diceCube) {
        if (callback) callback();
        return;
    }

    soundEffects.diceRoll();

    const faceRotations = {
        1: { x: 0, y: 0 },
        2: { x: 0, y: -90 },
        3: { x: 0, y: -180 },
        4: { x: 0, y: 90 },
        5: { x: -90, y: 0 },
        6: { x: 90, y: 0 }
    };

    const targetRot = faceRotations[targetValue] || { x: 0, y: 0 };
    const extraRotX = (3 + Math.floor(Math.random() * 3)) * 360;
    const extraRotY = (3 + Math.floor(Math.random() * 3)) * 360;

    diceCube.style.transition = "transform 1.1s cubic-bezier(0.15, 0.9, 0.25, 1)";
    diceCube.style.transform = `rotateX(${targetRot.x + extraRotX}deg) rotateY(${targetRot.y + extraRotY}deg)`;

    setTimeout(() => {
        if (callback) callback();
    }, 1150);
}

// 14. HÀM TUNG XÚC XẮC CHÍNH (ĐƯỢC GỌI BỞI NGƯỜI CHƠI HOẶC AI)
function handleRollDice() {
    if (gameState.isRolling) return;

    const player = gameState.players[gameState.currentTurnIndex];
    if (!player || player.isBankrupt) {
        finishTurn();
        return;
    }

    // Nếu người chơi đang bị giam trong tù
    if (player.inJail) {
        if (player.isAi) {
            handleAiJailTurn(player);
        } else {
            openJailModal();
        }
        return;
    }

    gameState.isRolling = true;
    updateUI();

    const rollStatus = document.getElementById("actionStatusMsg");
    if (rollStatus) {
        rollStatus.textContent = `${player.name} đang tung xúc xắc...`;
    }

    const diceResult = Math.floor(Math.random() * 6) + 1;

    roll3DDice(diceResult, () => {
        if (rollStatus) {
            rollStatus.innerHTML = `🎲 <strong>${player.name}</strong> đổ được <strong>${diceResult} điểm</strong>!`;
        }
        // Di chuyển quân cờ mượt mà từng bước với hoạt họa nhảy
        movePlayerStepByStep(player, diceResult, () => {
            gameState.isRolling = false;
            handleTileAction(player, player.position, diceResult);
        });
    });
}

// 15. DI CHUYỂN QUÂN CỜ TỪNG BƯỚC VỚI HOẠT HỌA NHẢY VÒNG CUNG (PARABOLIC HOP)
function movePlayerStepByStep(player, steps, onComplete) {
    let remaining = steps;

    function nextStep() {
        if (remaining <= 0) {
            if (onComplete) onComplete();
            return;
        }

        player.position = (player.position + 1) % VIETNAM_TILES.length;
        remaining--;

        soundEffects.stepSound();
        renderPlayerTokens();

        // Gắn hoạt họa nhảy và hiệu ứng bụi chạm đất
        const tokenEl = document.getElementById(`token-${player.id}`);
        if (tokenEl) {
            tokenEl.classList.remove("token-jumping");
            void tokenEl.offsetWidth; // Trigger reflow
            tokenEl.classList.add("token-jumping");
        }
        visualFX.triggerLandingRipple(player.position);

        // Đi qua Ga Hà Nội nhận trợ cấp 200M
        if (player.position === 0) {
            player.cash += 200;
            soundEffects.cashChime();
            visualFX.spawnFloatingMoney(0, "+200M", true);
            showStatusNotice(`🚩 <strong>${player.name}</strong> đi qua Ga Hà Nội nhận trợ cấp <strong>+200M VNĐ</strong>!`);
            updateUI();
        }

        setTimeout(nextStep, 220);
    }

    nextStep();
}

// 16. XỬ LÝ SỰ KIỆN KHI ĐÁP XUỐNG Ô (TILE ACTIONS)
function handleTileAction(player, tileId, diceRollValue = 1) {
    const tile = VIETNAM_TILES[tileId];
    if (!tile) return;

    // 1. Ô BẤT ĐỘNG SẢN (PROPERTY)
    if (tile.type === "property") {
        if (!tile.owner) {
            promptBuyProperty(player, tile);
        } else if (tile.owner === player.id) {
            if (tile.level < 3) {
                promptUpgradeProperty(player, tile);
            } else {
                showStatusNotice(`🏨 <strong>${player.name}</strong> ghé thăm Khách Sạn của chính mình tại ${tile.name}.`);
                finishTurn();
            }
        } else {
            handlePayRent(player, tile);
        }
        return;
    }

    // 2. Ô CÔNG TY ĐIỆN LỰC (UTILITY)
    if (tile.type === "utility") {
        if (!tile.owner) {
            promptBuyProperty(player, tile);
        } else if (tile.owner !== player.id) {
            const bill = diceRollValue * 15;
            const ownerObj = gameState.players.find(p => p.id === tile.owner);
            soundEffects.payRent();
            player.cash -= bill;
            if (ownerObj) ownerObj.cash += bill;
            visualFX.spawnFloatingMoney(tileId, `-${bill}M`, false);
            showStatusNotice(`⚡ <strong>${player.name}</strong> nộp tiền điện <strong>${bill}M VNĐ</strong> cho ${ownerObj ? ownerObj.name : 'Chủ điện lực'}!`);
            updateUI();
            checkBankruptcy(player, () => finishTurn());
        } else {
            showStatusNotice(`⚡ <strong>${player.name}</strong> ghé thăm trụ sở Công Ty Điện Lực.`);
            finishTurn();
        }
        return;
    }

    // 3. Ô VÀO TÙ (GO TO JAIL 🚔)
    if (tile.type === "go_to_jail") {
        visualFX.triggerPoliceSiren();
        showStatusNotice(`🚔 <strong>${player.name}</strong> bị áp giải thẳng vào Nhà Tù!`);
        player.position = 18;
        player.inJail = true;
        player.jailTurns = 0;
        renderPlayerTokens();
        updateUI();
        setTimeout(() => finishTurn(), 1400);
        return;
    }

    // 4. Ô NHÀ TÙ (JAIL ⛓️)
    if (tile.type === "jail") {
        showStatusNotice(`⛓️ <strong>${player.name}</strong> ghé thăm phạm nhân tại Nhà Tù (Thăm tù bình an).`);
        finishTurn();
        return;
    }

    // 5. Ô BÃI ĐỖ XE MIỄN PHÍ (PARKING 🅿️)
    if (tile.type === "parking") {
        const jackpot = gameState.parkingPool;
        if (jackpot > 0) {
            soundEffects.jackpotWin();
            visualFX.triggerConfetti();
            visualFX.spawnFloatingMoney(tileId, `+${jackpot}M`, true);
            player.cash += jackpot;
            gameState.parkingPool = 0;
            showStatusNotice(`🎉 <strong>${player.name}</strong> dừng chân tại Bãi Đỗ Xe và <strong>ĂN TRỌN HŨ THƯỞNG ${jackpot}M VNĐ</strong>!`);
            updateUI();
        } else {
            showStatusNotice(`🅿️ <strong>${player.name}</strong> nghỉ chân tại Bãi Đỗ Xe Miễn Phí.`);
        }
        finishTurn();
        return;
    }

    // 6. Ô SÂN BAY QUỐC TẾ (AIRPORT ✈️)
    if (tile.type === "airport") {
        openAirportModal(player);
        return;
    }

    // 7. Ô THUẾ THU NHẬP (TAX 💰)
    if (tile.type === "tax") {
        const taxAmount = 100;
        soundEffects.payRent();
        player.cash -= taxAmount;
        gameState.parkingPool += taxAmount;
        visualFX.spawnFloatingMoney(tileId, `-${taxAmount}M`, false);
        showStatusNotice(`💰 <strong>${player.name}</strong> nộp 100M VNĐ Thuế (Được dồn vào Hũ Bãi Đỗ Xe)!`);
        updateUI();
        checkBankruptcy(player, () => finishTurn());
        return;
    }

    // 8. Ô CƠ HỘI (❓)
    if (tile.type === "chance") {
        drawCardAction(player, "chance");
        return;
    }

    // 9. Ô KHÍ VẬN (📦)
    if (tile.type === "chest") {
        drawCardAction(player, "chest");
        return;
    }

    // 10. Ô KHỞI HÀNH (START 🚩)
    if (tile.type === "start") {
        showStatusNotice(`🚩 <strong>${player.name}</strong> dừng chân ngay tại Ga Hà Nội!`);
        finishTurn();
        return;
    }

    finishTurn();
}

// 17. TRẢ TIỀN THUÊ ĐẤT (PAY RENT)
function handlePayRent(player, tile) {
    const ownerObj = gameState.players.find(p => p.id === tile.owner);
    const rentAmount = tile.rent[tile.level - 1] || tile.rent[0];

    soundEffects.payRent();
    player.cash -= rentAmount;
    if (ownerObj) ownerObj.cash += rentAmount;

    visualFX.spawnFloatingMoney(tile.id, `-${rentAmount}M`, false);
    showStatusNotice(`💸 <strong>${player.name}</strong> trả <strong>${rentAmount}M VNĐ</strong> tiền thuê tại ${tile.name} cho <strong>${ownerObj ? ownerObj.name : 'Chủ đất'}</strong>!`);
    updateUI();

    checkBankruptcy(player, () => finishTurn());
}

// 18. HỎI MUA BẤT ĐỘNG SẢN (BUY PROPERTY)
function promptBuyProperty(player, tile) {
    gameState.pendingPropertyTile = tile;

    // Nếu người chơi là AI
    if (player.isAi) {
        if (player.cash >= tile.price * 1.25) {
            confirmBuyProperty(player, tile);
        } else {
            showStatusNotice(`🤖 <strong>${player.name}</strong> quyết định bỏ qua cơ hội mua ${tile.name}.`);
            finishTurn();
        }
        return;
    }

    // Mở modal mua đất cho người chơi thật
    const modal = document.getElementById("modalBuyProperty");
    if (!modal) return;

    document.getElementById("buyPropTitle").textContent = tile.name;
    document.getElementById("buyPropSubtitle").textContent = tile.subtitle;
    document.getElementById("buyPropEmoji").textContent = tile.icon;
    document.getElementById("buyPropDesc").textContent = tile.desc;
    document.getElementById("buyModalRegion").textContent = tile.regionName.toUpperCase();
    document.getElementById("buyCostLabel").textContent = "Giá mua quyền sở hữu:";
    document.getElementById("buyPropCost").textContent = `${tile.price}M VNĐ`;
    document.getElementById("buyPropRent").textContent = `${tile.rent[0]}M VNĐ`;

    document.getElementById("lvl1Rent").textContent = `${tile.rent[0]}M`;
    document.getElementById("lvl2Rent").textContent = `${tile.rent[1]}M`;
    document.getElementById("lvl3Rent").textContent = `${tile.rent[2]}M`;

    document.getElementById("lvlStep1").className = "level-step-card current";
    document.getElementById("lvlStep2").className = "level-step-card";
    document.getElementById("lvlStep3").className = "level-step-card";

    const btnConfirm = document.getElementById("btnConfirmBuy");
    if (player.cash < tile.price) {
        btnConfirm.disabled = true;
        btnConfirm.textContent = `Không đủ tiền (${tile.price}M)`;
    } else {
        btnConfirm.disabled = false;
        btnConfirm.textContent = `Mua ngay (-${tile.price}M)`;
    }

    modal.classList.add("active");
}

// 19. HỎI NÂNG CẤP NHÀ (UPGRADE PROPERTY)
function promptUpgradeProperty(player, tile) {
    gameState.pendingPropertyTile = tile;
    const nextLevel = tile.level + 1;
    const upgradePrice = tile.upgradeCost;
    const newRent = tile.rent[nextLevel - 1];

    if (player.isAi) {
        if (player.cash >= upgradePrice * 1.35) {
            confirmUpgradeProperty(player, tile);
        } else {
            finishTurn();
        }
        return;
    }

    const modal = document.getElementById("modalBuyProperty");
    if (!modal) return;

    const levelNames = ["", "Nhà Phố (Cấp 1)", "Biệt Thự (Cấp 2)", "Khách Sạn (Cấp 3)"];
    document.getElementById("buyPropTitle").textContent = `${tile.name} (Nâng Cấp)`;
    document.getElementById("buyPropSubtitle").textContent = `Lên ${levelNames[nextLevel]}`;
    document.getElementById("buyPropEmoji").textContent = nextLevel === 2 ? "🏡" : "🏨";
    document.getElementById("buyPropDesc").textContent = `Nâng cấp bất động sản để tăng tiền thuê đất khi đối thủ ghé thăm!`;
    document.getElementById("buyModalRegion").textContent = tile.regionName.toUpperCase();
    document.getElementById("buyCostLabel").textContent = "Chi phí xây dựng:";
    document.getElementById("buyPropCost").textContent = `${upgradePrice}M VNĐ`;
    document.getElementById("buyPropRent").textContent = `${newRent}M VNĐ`;

    document.getElementById("lvlStep1").className = `level-step-card ${nextLevel === 1 ? 'current' : ''}`;
    document.getElementById("lvlStep2").className = `level-step-card ${nextLevel === 2 ? 'current' : ''}`;
    document.getElementById("lvlStep3").className = `level-step-card ${nextLevel === 3 ? 'current' : ''}`;

    const btnConfirm = document.getElementById("btnConfirmBuy");
    if (player.cash < upgradePrice) {
        btnConfirm.disabled = true;
        btnConfirm.textContent = `Không đủ tiền (-${upgradePrice}M)`;
    } else {
        btnConfirm.disabled = false;
        btnConfirm.textContent = `Xây thêm (-${upgradePrice}M)`;
    }

    modal.classList.add("active");
}

function confirmBuyProperty(player, tile) {
    if (player.cash < tile.price) return;

    soundEffects.cashChime();
    player.cash -= tile.price;
    tile.owner = player.id;
    tile.level = 1;
    player.props.push(tile.id);

    visualFX.spawnFloatingMoney(tile.id, `-${tile.price}M`, false);
    showStatusNotice(`🏠 <strong>${player.name}</strong> đã mua thành công bất động sản <strong>${tile.name}</strong> (${tile.price}M VNĐ)!`);
    closeModal("modalBuyProperty");
    updateUI();
    finishTurn();
}

function confirmUpgradeProperty(player, tile) {
    if (player.cash < tile.upgradeCost) return;

    soundEffects.cashChime();
    player.cash -= tile.upgradeCost;
    tile.level += 1;

    const levelIcon = tile.level === 2 ? "🏡 Biệt Thự (Cấp 2)" : "🏨 Khách Sạn Cao Cấp (Cấp 3)";
    visualFX.spawnFloatingMoney(tile.id, `-${tile.upgradeCost}M`, false);
    showStatusNotice(`✨ <strong>${player.name}</strong> đã nâng cấp <strong>${tile.name}</strong> lên ${levelIcon}!`);
    closeModal("modalBuyProperty");
    updateUI();
    finishTurn();
}

// 20. RÚT THẺ CƠ HỘI HOẶC KHÍ VẬN
function drawCardAction(player, cardType) {
    const isChance = cardType === "chance";
    const deck = isChance ? CHANCE_CARDS : CHEST_CARDS;
    const card = deck[Math.floor(Math.random() * deck.length)];

    gameState.pendingCardAction = { player, card, cardType };

    if (player.isAi) {
        applyCardEffect(player, card);
        finishTurn();
        return;
    }

    const modal = document.getElementById("modalLoveCard");
    if (!modal) return;

    document.getElementById("chanceIcon").textContent = isChance ? "❓" : "📦";
    document.getElementById("chanceTypeTag").textContent = isChance ? "THẺ CƠ HỘI" : "THẺ KHÍ VẬN";
    document.getElementById("loveCardTitle").textContent = card.title;
    document.getElementById("loveCardContent").textContent = card.desc;
    document.getElementById("loveCardReward").textContent = card.rewardText;

    modal.classList.add("active");
}

function applyCardEffect(player, card) {
    if (card.type === "gain_cash") {
        soundEffects.cashChime();
        player.cash += card.amount;
        visualFX.spawnFloatingMoney(player.position, `+${card.amount}M`, true);
        showStatusNotice(`💵 <strong>${player.name}</strong> nhận được <strong>+${card.amount}M VNĐ</strong>!`);
    } else if (card.type === "pay_parking") {
        soundEffects.payRent();
        player.cash -= card.amount;
        gameState.parkingPool += card.amount;
        visualFX.spawnFloatingMoney(player.position, `-${card.amount}M`, false);
        showStatusNotice(`💸 <strong>${player.name}</strong> nộp <strong>${card.amount}M VNĐ</strong> vào Hũ Bãi Đỗ Xe!`);
        checkBankruptcy(player);
    } else if (card.type === "free_jail") {
        player.inJail = false;
        player.jailTurns = 0;
        showStatusNotice(`🕊️ <strong>${player.name}</strong> nhận được quyền ân xá tự do!`);
    } else if (card.type === "advance_go") {
        player.position = 0;
        player.cash += 200;
        soundEffects.cashChime();
        renderPlayerTokens();
        visualFX.spawnFloatingMoney(0, "+200M", true);
        showStatusNotice(`🚩 <strong>${player.name}</strong> đi thẳng về Ga Hà Nội nhận <strong>+200M VNĐ</strong>!`);
    }
    updateUI();
}

// 21. XỬ LÝ NHÀ TÙ & BẢO LÃNH
function openJailModal() {
    const player = gameState.players[gameState.currentTurnIndex];
    const modal = document.getElementById("modalJail");
    if (!modal) return;

    document.getElementById("jailTitle").textContent = `${player.name} Đang Ở Trong Tù!`;
    document.getElementById("jailDesc").textContent = `Bạn đã thụ án được ${player.jailTurns} lượt. Chọn cách xử lý để ra tù:`;

    const btnBail = document.getElementById("btnPayBail");
    if (player.cash < 50) {
        btnBail.disabled = true;
        btnBail.innerHTML = "<span>💵 Không đủ 50M nộp bảo lãnh</span>";
    } else {
        btnBail.disabled = false;
        btnBail.innerHTML = "<span>💵 Nộp tiền bảo lãnh <strong>50M</strong> để ra tù ngay lập tức</span>";
    }

    modal.classList.add("active");
}

function handlePayBail() {
    const player = gameState.players[gameState.currentTurnIndex];
    if (player.cash < 50) return;

    soundEffects.cashChime();
    player.cash -= 50;
    gameState.parkingPool += 50;
    player.inJail = false;
    player.jailTurns = 0;

    closeModal("modalJail");
    showStatusNotice(`🕊️ <strong>${player.name}</strong> đã nộp 50M bảo lãnh và được tự do! Hãy tung xúc xắc.`);
    updateUI();
}

function handleTryRollJail() {
    const player = gameState.players[gameState.currentTurnIndex];
    closeModal("modalJail");

    gameState.isRolling = true;
    updateUI();

    const diceResult = Math.floor(Math.random() * 6) + 1;
    roll3DDice(diceResult, () => {
        gameState.isRolling = false;
        if (diceResult >= 4) {
            player.inJail = false;
            player.jailTurns = 0;
            soundEffects.cashChime();
            showStatusNotice(`🎉 <strong>${player.name}</strong> đổ được ${diceResult} điểm (>= 4) và <strong>ĐÃ ĐƯỢC THẢ TỰ DO</strong>!`);
            movePlayerStepByStep(player, diceResult, () => {
                handleTileAction(player, player.position, diceResult);
            });
        } else {
            player.jailTurns += 1;
            soundEffects.jailLock();
            if (player.jailTurns >= 3) {
                player.cash -= 50;
                gameState.parkingPool += 50;
                player.inJail = false;
                player.jailTurns = 0;
                showStatusNotice(`⏳ <strong>${player.name}</strong> hết hạn tạm giam 3 lượt, tự động trừ 50M và ra tù!`);
                finishTurn();
            } else {
                showStatusNotice(`❌ <strong>${player.name}</strong> đổ được ${diceResult} điểm (< 4). Chưa thoát khỏi nhà tù!`);
                finishTurn();
            }
        }
        updateUI();
    });
}

function handleAiJailTurn(player) {
    if (player.cash >= 150) {
        player.cash -= 50;
        gameState.parkingPool += 50;
        player.inJail = false;
        player.jailTurns = 0;
        showStatusNotice(`🤖 <strong>${player.name}</strong> đã chi 50M bảo lãnh để ra tù ngay lập tức!`);
        updateUI();
        setTimeout(() => handleRollDice(), 800);
    } else {
        const diceResult = Math.floor(Math.random() * 6) + 1;
        roll3DDice(diceResult, () => {
            if (diceResult >= 4) {
                player.inJail = false;
                player.jailTurns = 0;
                showStatusNotice(`🎉 <strong>${player.name}</strong> đổ được ${diceResult} điểm và đã thoát khỏi tù!`);
                movePlayerStepByStep(player, diceResult, () => {
                    handleTileAction(player, player.position, diceResult);
                });
            } else {
                player.jailTurns += 1;
                showStatusNotice(`❌ <strong>${player.name}</strong> đổ được ${diceResult} điểm (< 4). Chưa thoát khỏi tù!`);
                finishTurn();
            }
            updateUI();
        });
    }
}

// 22. SÂN BAY QUỐC TẾ
function populateAirportSelect() {
    const sel = document.getElementById("airportDestSelect");
    if (!sel) return;
    sel.innerHTML = "";
    VIETNAM_TILES.forEach(t => {
        if (t.id !== 19) {
            const opt = document.createElement("option");
            opt.value = t.id;
            opt.textContent = `${t.id}. ${t.name} (${t.regionName})`;
            sel.appendChild(opt);
        }
    });
}

function openAirportModal(player) {
    if (player.isAi) {
        const unowned = VIETNAM_TILES.filter(t => t.type === 'property' && !t.owner && player.cash >= t.price + 50);
        if (unowned.length > 0) {
            const dest = unowned[unowned.length - 1];
            player.cash -= 50;
            player.position = dest.id;
            soundEffects.flightWhoosh();
            renderPlayerTokens();
            updateUI();
            showStatusNotice(`✈️ <strong>${player.name}</strong> chi 50M bay tốc hành tới <strong>${dest.name}</strong>!`);
            setTimeout(() => handleTileAction(player, dest.id, 1), 700);
        } else {
            showStatusNotice(`✈️ <strong>${player.name}</strong> ghé qua Sân Bay.`);
            finishTurn();
        }
        return;
    }

    const modal = document.getElementById("modalAirportFlight");
    if (!modal) return;

    const btnConfirm = document.getElementById("btnConfirmAirportFly");
    if (player.cash < 50) {
        btnConfirm.disabled = true;
        btnConfirm.textContent = "Không đủ tiền vé (50M)";
    } else {
        btnConfirm.disabled = false;
        btnConfirm.textContent = "Cất cánh ngay (-50M)";
    }

    modal.classList.add("active");
}

function handleConfirmAirportFly() {
    const player = gameState.players[gameState.currentTurnIndex];
    if (player.cash < 50) return;

    const sel = document.getElementById("airportDestSelect");
    const destId = parseInt(sel.value, 10);
    const destTile = VIETNAM_TILES.find(t => t.id === destId);

    soundEffects.flightWhoosh();
    player.cash -= 50;
    gameState.parkingPool += 50;
    player.position = destId;

    closeModal("modalAirportFlight");
    renderPlayerTokens();
    updateUI();

    showStatusNotice(`✈️ <strong>${player.name}</strong> đã mua vé bay tốc hành tới <strong>${destTile.name}</strong>!`);
    setTimeout(() => handleTileAction(player, destId, 1), 600);
}

// 23. SOI CHI TIẾT SỔ ĐỎ BẤT ĐỘNG SẢN
function inspectTileTitleDeed(tileId) {
    const tile = VIETNAM_TILES.find(t => t.id === tileId);
    if (!tile) return;

    const modal = document.getElementById("modalPostcardInspector");
    if (!modal) return;

    document.getElementById("inspectTitle").textContent = tile.name;
    document.getElementById("inspectSubtitle").textContent = tile.subtitle;
    document.getElementById("inspectDesc").textContent = tile.desc;

    const ownerBox = document.getElementById("inspectOwnerBox");
    const btnUpgrade = document.getElementById("btnInspectUpgrade");

    if (tile.type === "property") {
        document.getElementById("inspectRentL1").textContent = `${tile.rent[0]}M`;
        document.getElementById("inspectRentL2").textContent = `${tile.rent[1]}M`;
        document.getElementById("inspectRentL3").textContent = `${tile.rent[2]}M`;

        if (tile.owner) {
            const ownerObj = gameState.players.find(p => p.id === tile.owner);
            const ownerName = ownerObj ? ownerObj.name : "Người chơi";
            const ownerColor = ownerObj ? ownerObj.color : "#2563eb";
            ownerBox.innerHTML = `Chủ sở hữu: <strong style="color:${ownerColor};">${ownerName}</strong> (Cấp ${tile.level})`;

            const current = gameState.players[gameState.currentTurnIndex];
            if (tile.owner === current.id && tile.level < 3 && !gameState.isRolling && !current.isAi) {
                btnUpgrade.style.display = "inline-block";
                btnUpgrade.textContent = `Xây thêm Cấp ${tile.level + 1} (+${tile.upgradeCost}M)`;
                btnUpgrade.onclick = () => {
                    closeModal("modalPostcardInspector");
                    promptUpgradeProperty(current, tile);
                };
            } else {
                btnUpgrade.style.display = "none";
            }
        } else {
            ownerBox.innerHTML = `Trạng thái: <strong>Chưa ai sở hữu</strong> (Giá mua: ${tile.price}M)`;
            btnUpgrade.style.display = "none";
        }
    } else {
        ownerBox.innerHTML = `Khu vực đặc biệt: <strong>${tile.regionName}</strong>`;
        document.getElementById("inspectRentL1").textContent = "-";
        document.getElementById("inspectRentL2").textContent = "-";
        document.getElementById("inspectRentL3").textContent = "-";
        btnUpgrade.style.display = "none";
    }

    modal.classList.add("active");
}

// 24. MỞ BẢNG DANH MỤC TÀI SẢN (PORTFOLIO)
function openPortfolioModal() {
    const modal = document.getElementById("modalPassport");
    if (!modal) return;

    const statsRow = document.getElementById("portfolioPlayersStats");
    if (statsRow) {
        statsRow.innerHTML = "";
        gameState.players.forEach(p => {
            const stat = document.createElement("div");
            stat.className = "pass-stat";
            stat.innerHTML = `<span>${p.name}:</span><strong style="color:${p.color};">${Number(calculateNetWorth(p)).toLocaleString()}M</strong>`;
            statsRow.appendChild(stat);
        });
    }

    const grid = document.getElementById("passportLandmarksGrid");
    grid.innerHTML = "";

    const properties = VIETNAM_TILES.filter(t => t.type === "property");
    properties.forEach(t => {
        const item = document.createElement("div");
        item.className = "passport-item";
        let statusBadge = `<span class="badge-unlocked" style="background:#64748b;">Chưa mua</span>`;

        if (t.owner) {
            const ownerObj = gameState.players.find(p => p.id === t.owner);
            if (ownerObj) {
                statusBadge = `<span class="badge-unlocked" style="background:${ownerObj.color};">Sở hữu: ${ownerObj.name} (L${t.level})</span>`;
            }
        }

        item.innerHTML = `
            <div class="pass-item-icon">${t.icon}</div>
            <div class="pass-item-name">${t.name}</div>
            <div class="pass-item-region">${t.price}M</div>
            ${statusBadge}
        `;
        grid.appendChild(item);
    });

    modal.classList.add("active");
}

// 25. KIỂM TRA PHÁ SẢN & KẾT THÚC GAME (BANKRUPTCY CHECK)
function checkBankruptcy(player, onContinue) {
    if (player.cash < 0) {
        const netWorth = calculateNetWorth(player);
        if (netWorth < 0) {
            // Người chơi chính thức phá sản
            player.isBankrupt = true;
            // Trả lại đất về ngân hàng
            player.props.forEach(propId => {
                const t = VIETNAM_TILES.find(item => item.id === propId);
                if (t) {
                    t.owner = null;
                    t.level = 0;
                }
            });
            player.props = [];
            showStatusNotice(`☠️ <strong>${player.name}</strong> đã cạn kiệt vốn và <strong>CHÍNH THỨC PHÁ SẢN</strong>!`);
            updateUI();

            // Kiểm tra xem còn lại bao nhiêu người chưa phá sản
            const activePlayers = gameState.players.filter(p => !p.isBankrupt);
            if (activePlayers.length <= 1) {
                triggerGameOver(activePlayers[0] || player);
                return;
            }
        } else {
            showStatusNotice(`⚠️ <strong>${player.name}</strong> đang âm tiền mặt (${player.cash}M)! Cần thu xếp tài chính.`);
        }
    }
    if (onContinue) onContinue();
}

function triggerGameOver(winner) {
    soundEffects.jackpotWin();
    visualFX.triggerConfetti();

    const modal = document.getElementById("modalGameOver");
    if (modal) {
        document.getElementById("winnerText").innerHTML = `
            Chúc mừng <strong>${winner.name} (${winner.icon})</strong> đã xuất sắc trở thành ĐẠI TỶ PHÚ DUY NHẤT!<br>
            Tổng tài sản chung cuộc: <strong>${Number(calculateNetWorth(winner)).toLocaleString()}M VNĐ</strong>! 👑
        `;
        modal.classList.add("active");
    }
}

// 26. KẾT THÚC LƯỢT CHƠI & CHUYỂN TIẾP (FINISH TURN)
function finishTurn() {
    let nextIdx = (gameState.currentTurnIndex + 1) % gameState.players.length;
    let attempts = 0;

    // Bỏ qua người chơi đã phá sản
    while (gameState.players[nextIdx].isBankrupt && attempts < gameState.players.length) {
        nextIdx = (nextIdx + 1) % gameState.players.length;
        attempts++;
    }

    gameState.currentTurnIndex = nextIdx;
    updateUI();

    const current = gameState.players[gameState.currentTurnIndex];
    showStatusNotice(`👉 Đang tới lượt của <strong>${current.name}</strong> (${current.icon})!`);

    // Nếu người chơi tiếp theo là AI
    if (current.isAi && !current.isBankrupt) {
        setTimeout(() => {
            handleRollDice();
        }, 1100);
    }
}

// 27. THÔNG BÁO TRẠNG THÁI TRÊN HUB
function showStatusNotice(htmlMsg) {
    const statusEl = document.getElementById("actionStatusMsg");
    if (statusEl) {
        statusEl.innerHTML = htmlMsg;
    }
}

// 28. ĐÓNG CÁC MODAL
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("active");
    }
}

// 29. BẮT ĐẦU VÁN MỚI THEO CÀI ĐẶT
function startNewGameWithConfig(count, mode) {
    gameState.playerCount = count;
    gameState.gameMode = mode;
    gameState.currentTurnIndex = 0;
    gameState.isRolling = false;
    gameState.parkingPool = 100;
    gameState.roundCount = 1;

    VIETNAM_TILES.forEach(t => {
        t.owner = null;
        t.level = 0;
    });

    closeModal("modalGameSetup");
    closeModal("modalGameOver");
    closeModal("modalBuyProperty");
    closeModal("modalPostcardInspector");
    closeModal("modalLoveCard");
    closeModal("modalJail");
    closeModal("modalAirportFlight");
    closeModal("modalPassport");

    initPlayers();
    initMonopolyBoard();

    showStatusNotice(`🚩 Ván cờ ${count} người chơi (${mode === 'ai' ? 'Đấu với AI' : 'Chơi cùng nhau'}) đã bắt đầu!`);
}

// 30. GIAO DIỆN CÀI ĐẶT VÁN ĐẤU (SETUP MODAL)
function openSetupModal() {
    const modal = document.getElementById("modalGameSetup");
    if (!modal) return;

    let selectedCount = gameState.playerCount;
    let selectedMode = gameState.gameMode;

    // Cập nhật nút số người
    document.querySelectorAll(".count-opt-btn").forEach(btn => {
        const c = parseInt(btn.getAttribute("data-count"), 10);
        if (c === selectedCount) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Cập nhật chế độ
    const btnPass = document.getElementById("optModePassPlay");
    const btnAi = document.getElementById("optModeAI");
    if (btnPass && btnAi) {
        btnPass.className = `mode-card-opt ${selectedMode === 'pass_play' ? 'active' : ''}`;
        btnAi.className = `mode-card-opt ${selectedMode === 'ai' ? 'active' : ''}`;
    }

    renderSetupRoster(selectedCount, selectedMode);
    modal.classList.add("active");
}

function renderSetupRoster(count, mode) {
    const rosterEl = document.getElementById("setupPlayersRoster");
    if (!rosterEl) return;
    rosterEl.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const cfg = ALL_PLAYER_CONFIGS[i];
        const isAi = (mode === "ai" && i > 0);

        const row = document.createElement("div");
        row.className = "setup-player-row";
        row.innerHTML = `
            <div class="setup-p-left">
                <span class="setup-p-icon">${cfg.icon}</span>
                <span class="setup-p-name" style="color:${cfg.color};">${cfg.name}</span>
            </div>
            <span class="setup-p-type-badge ${isAi ? 'type-ai' : 'type-human'}">
                ${isAi ? '🤖 Máy AI' : '👤 Người chơi'}
            </span>
        `;
        rosterEl.appendChild(row);
    }
}

// 31. GẮN SỰ KIỆN DOM SAU KHI TẢI TRANG
document.addEventListener("DOMContentLoaded", () => {
    // 1. Khởi tạo người chơi & bàn cờ
    initPlayers();
    initMonopolyBoard();

    // 2. Nút tung xúc xắc
    const rollBtn = document.getElementById("rollDiceBtn");
    if (rollBtn) {
        rollBtn.addEventListener("click", () => {
            soundEffects.init();
            handleRollDice();
        });
    }

    // 3. Nút mua / bỏ qua bất động sản
    const btnConfirmBuy = document.getElementById("btnConfirmBuy");
    if (btnConfirmBuy) {
        btnConfirmBuy.addEventListener("click", () => {
            const player = gameState.players[gameState.currentTurnIndex];
            const tile = gameState.pendingPropertyTile;
            if (!tile || !player) return;
            if (!tile.owner) {
                confirmBuyProperty(player, tile);
            } else if (tile.owner === player.id) {
                confirmUpgradeProperty(player, tile);
            }
        });
    }

    const btnCancelBuy = document.getElementById("btnCancelBuy");
    if (btnCancelBuy) {
        btnCancelBuy.addEventListener("click", () => {
            closeModal("modalBuyProperty");
            finishTurn();
        });
    }

    // 4. Modal Sổ Đỏ
    const btnCloseInspect = document.getElementById("btnCloseInspect");
    if (btnCloseInspect) {
        btnCloseInspect.addEventListener("click", () => closeModal("modalPostcardInspector"));
    }

    // 5. Modal Cơ hội & Khí vận
    const btnAcceptCard = document.getElementById("btnAcceptLoveCard");
    if (btnAcceptCard) {
        btnAcceptCard.addEventListener("click", () => {
            closeModal("modalLoveCard");
            if (gameState.pendingCardAction) {
                applyCardEffect(gameState.pendingCardAction.player, gameState.pendingCardAction.card);
                gameState.pendingCardAction = null;
            }
            finishTurn();
        });
    }

    // 6. Modal Nhà tù
    const btnPayBail = document.getElementById("btnPayBail");
    if (btnPayBail) {
        btnPayBail.addEventListener("click", handlePayBail);
    }

    const btnTryRollJail = document.getElementById("btnTryRollJail");
    if (btnTryRollJail) {
        btnTryRollJail.addEventListener("click", handleTryRollJail);
    }

    // 7. Modal Sân bay
    const btnConfirmFly = document.getElementById("btnConfirmAirportFly");
    if (btnConfirmFly) {
        btnConfirmFly.addEventListener("click", handleConfirmAirportFly);
    }

    const btnCancelFly = document.getElementById("btnCancelAirportFly");
    if (btnCancelFly) {
        btnCancelFly.addEventListener("click", () => {
            closeModal("modalAirportFlight");
            finishTurn();
        });
    }

    // 8. Modal Danh mục tài sản
    const btnOpenPort = document.getElementById("btnOpenPortfolio");
    if (btnOpenPort) {
        btnOpenPort.addEventListener("click", openPortfolioModal);
    }

    const btnClosePort = document.getElementById("btnClosePassport");
    if (btnClosePort) {
        btnClosePort.addEventListener("click", () => closeModal("modalPassport"));
    }

    // 9. Nút Luật chơi
    const btnHelp = document.getElementById("btnHelpGuide");
    const modalHelp = document.getElementById("modalHelp");
    const btnCloseHelp = document.getElementById("btnCloseHelp");
    if (btnHelp && modalHelp) {
        btnHelp.addEventListener("click", () => modalHelp.classList.add("active"));
    }
    if (btnCloseHelp && modalHelp) {
        btnCloseHelp.addEventListener("click", () => modalHelp.classList.remove("active"));
    }

    // 10. Nút Bật/Tắt âm thanh
    const btnSound = document.getElementById("btnToggleSound");
    const soundIcon = document.getElementById("soundIcon");
    if (btnSound) {
        btnSound.addEventListener("click", () => {
            gameState.soundEnabled = !gameState.soundEnabled;
            if (soundIcon) soundIcon.textContent = gameState.soundEnabled ? "🔔" : "🔕";
        });
    }

    // 11. Nút mở cài đặt ván đấu (2 - 4 người & AI)
    const btnOpenSetup = document.getElementById("btnOpenSetup");
    if (btnOpenSetup) {
        btnOpenSetup.addEventListener("click", openSetupModal);
    }

    const btnCloseSetup = document.getElementById("btnCloseSetup");
    if (btnCloseSetup) {
        btnCloseSetup.addEventListener("click", () => closeModal("modalGameSetup"));
    }

    // Tương tác trong modal Cài đặt
    let tempCount = gameState.playerCount;
    let tempMode = gameState.gameMode;

    document.querySelectorAll(".count-opt-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".count-opt-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            tempCount = parseInt(btn.getAttribute("data-count"), 10);
            renderSetupRoster(tempCount, tempMode);
        });
    });

    const optPass = document.getElementById("optModePassPlay");
    const optAi = document.getElementById("optModeAI");
    if (optPass && optAi) {
        optPass.addEventListener("click", () => {
            optPass.classList.add("active");
            optAi.classList.remove("active");
            tempMode = "pass_play";
            renderSetupRoster(tempCount, tempMode);
        });
        optAi.addEventListener("click", () => {
            optAi.classList.add("active");
            optPass.classList.remove("active");
            tempMode = "ai";
            renderSetupRoster(tempCount, tempMode);
        });
    }

    const btnStartCustom = document.getElementById("btnStartCustomGame");
    if (btnStartCustom) {
        btnStartCustom.addEventListener("click", () => {
            startNewGameWithConfig(tempCount, tempMode);
        });
    }

    // 12. Nút Ván mới nhanh
    const btnRestartQuick = document.getElementById("btnRestartQuick");
    if (btnRestartQuick) {
        btnRestartQuick.addEventListener("click", openSetupModal);
    }

    const btnRestartFromWinner = document.getElementById("btnRestartFromWinner");
    if (btnRestartFromWinner) {
        btnRestartFromWinner.addEventListener("click", openSetupModal);
    }

    // 13. Khởi tạo bộ chọn theme giao diện
    initThemeManager();
});

// 32. ĐỒNG BỘ THEME VỚI TRANG CHỦ
function initThemeManager() {
    const themeBtn = document.getElementById("themeSettingBtn");
    const themeModal = document.getElementById("themeModalOverlay");
    const closeBtn = document.getElementById("themeModalCloseBtn");
    const applyBtn = document.getElementById("themeApplyBtn");
    const currentNameEl = document.getElementById("themeCurrentName");

    const THEME_NAMES = {
        sunset: "Hoàng Hôn",
        "vintage-rose": "Hoa Hồng Cổ",
        midnight: "Đêm Đầy Sao",
        autumn: "Mùa Thu",
        "cotton-candy": "Kẹo Ngọt",
        ocean: "Biển Xanh",
        "secret-garden": "Vườn Bí Mật",
        bordeaux: "Rượu Vang",
        mocha: "Cà Phê",
        lavender: "Oải Hương",
        peach: "Trà Đào",
        "aurora-night": "Đêm Đông"
    };

    function setTheme(themeKey) {
        document.documentElement.setAttribute("data-theme", themeKey);
        try {
            localStorage.setItem("couple_love_theme", themeKey);
        } catch (e) {}

        if (currentNameEl) {
            currentNameEl.textContent = THEME_NAMES[themeKey] || themeKey;
        }

        document.querySelectorAll(".theme-card-option").forEach(card => {
            if (card.getAttribute("data-theme") === themeKey) {
                card.classList.add("selected");
            } else {
                card.classList.remove("selected");
            }
        });
    }

    let savedTheme = "sunset";
    try {
        savedTheme = localStorage.getItem("couple_love_theme") || "sunset";
    } catch (e) {}
    setTheme(savedTheme);

    if (themeBtn && themeModal) {
        themeBtn.addEventListener("click", () => themeModal.classList.add("active"));
    }
    if (closeBtn && themeModal) {
        closeBtn.addEventListener("click", () => themeModal.classList.remove("active"));
    }
    if (applyBtn && themeModal) {
        applyBtn.addEventListener("click", () => themeModal.classList.remove("active"));
    }

    document.querySelectorAll(".theme-card-option").forEach(btn => {
        btn.addEventListener("click", () => {
            const t = btn.getAttribute("data-theme");
            if (t) setTheme(t);
        });
    });
}
