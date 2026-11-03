/**
 * ========================================================
 * CỜ TỶ PHÚ VIỆT NAM (MONOPOLY VIETNAM EDITION)
 * Game chiến thuật bàn cờ bất động sản & đầu tư tài chính chuẩn Monopoly
 * Thiết kế bảng cờ 7x7 (24 ô), xúc xắc 3D chân thực, hiệu ứng âm thanh sống động
 * Dành cho 2 người chơi (Huy 🚗 vs Hiền ✈️) hoặc chơi với AI
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
        desc: "Kỳ quan thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi kỳ vĩ. Thu hút hàng triệu du khách quốc tế mang lại nguồn thu ổn định.",
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
        desc: "Rút một thẻ Cơ Hội bất ngờ từ Bộ Tài Chính: Thưởng lớn, phạt hành chính hoặc biến cố thị trường.",
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
        desc: "Nóc nhà Đông Dương ở độ cao 3.143m. Khu nghỉ dưỡng trên mây mang lại giá trị du lịch và tiền thuê mặt bằng cao.",
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
        desc: "Di sản văn hóa và thiên nhiên thế giới với cảnh sắc non nước hữu tình, địa bàn bất động sản sinh thái cực kỳ tiềm năng.",
        owner: null,
        level: 0
    },
    {
        id: 6, row: 1, col: 7,
        name: "Vào Tù",
        subtitle: "Cảnh Sát Bắt Giam",
        icon: "🚔",
        region: "special",
        regionName: "Vào Tù",
        type: "go_to_jail",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Bị lực lượng trật tự giao thông áp giải thẳng đến Nhà Tù! Bạn không được nhận tiền trợ cấp 200M và phải giải quyết bảo lãnh.",
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
        desc: "Doanh nghiệp cung cấp điện lực quốc gia. Người đi vào phải nộp tiền điện bằng số nút xúc xắc x 15M VNĐ cho chủ sở hữu.",
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
        desc: "Thương cảng cổ phồn hoa với những ngôi nhà cổ tường vàng hoa giấy. Điểm kinh doanh dịch vụ và nhà hàng đắt giá bậc nhất.",
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
        subtitle: "Hũ Thưởng Tích Lũy",
        icon: "🅿️",
        region: "special",
        regionName: "Đỗ Xe",
        type: "parking",
        price: 0,
        rent: [0, 0, 0],
        upgradeCost: 0,
        desc: "Khu vực miễn phí. Đặc biệt: Toàn bộ tiền thuế và tiền phạt trong suốt trận đấu được gom vào đây, người dừng chân sẽ ăn trọn hũ tiền!",
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

// 2. BỘ THẺ CƠ HỘI (CHANCE CARDS - TÀI CHÍNH & BIẾN CỐ)
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
        title: "Chia Cổ Tức Ngân Hàng",
        desc: "Khoản đầu tư chứng khoán sinh lời xuất sắc trong quý. Bạn nhận tiền chia cổ tức.",
        type: "gain_cash",
        amount: 150,
        rewardText: "+150M VNĐ"
    },
    {
        title: "Phí Nâng Cấp Hệ Thống Thoát Nước",
        desc: "Đô thị tiến hành cải tạo hạ tầng đường xá. Bạn phải đóng phí bảo trì 80M cho ngân quỹ.",
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
        title: "Chuyến Tàu Tốc Hành Về Ga Hà Nội",
        desc: "Vé tàu siêu tốc đưa bạn thẳng về ô Khởi Hành (Ga Hà Nội) và nhận ngay 200M trợ cấp!",
        type: "advance_go",
        amount: 200,
        rewardText: "Về Ga Hà Nội (+200M)"
    }
];

// 3. BỘ THẺ KHÍ VẬN (COMMUNITY CHEST CARDS - QUỸ CỘNG ĐỒNG)
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
        title: "Bảo Hiểm Bồi Thường Tài Sản",
        desc: "Công ty bảo hiểm thanh toán khoản bồi hoàn thiệt hại thiết bị kinh doanh.",
        type: "gain_cash",
        amount: 100,
        rewardText: "+100M VNĐ"
    }
];

// 4. TRẠNG THÁI TOÀN BỘ VÁN ĐẤU (GAME STATE)
const gameState = {
    mode: "pass_play", // "pass_play" (2 người đấu) hoặc "ai" (đấu với AI Hiền)
    currentTurn: "huy", // "huy" | "hien"
    isRolling: false,
    soundEnabled: true,
    parkingPool: 100, // Hũ thưởng bãi đỗ xe khởi điểm 100M
    roundCount: 1,
    pendingCardAction: null,
    pendingPropertyTile: null,
    
    players: {
        huy: {
            id: "huy",
            name: "Huy",
            icon: "🚗",
            color: "#2563eb",
            position: 0,
            cash: 1500, // Bắt đầu với 1,500M VNĐ
            props: [],
            inJail: false,
            jailTurns: 0,
            isAi: false
        },
        hien: {
            id: "hien",
            name: "Hiền",
            icon: "✈️",
            color: "#db2777",
            position: 0,
            cash: 1500, // Bắt đầu với 1,500M VNĐ
            props: [],
            inJail: false,
            jailTurns: 0,
            isAi: false
        }
    }
};

// 5. TRÌNH TẠO ÂM THANH SỐNG ĐỘNG (WEB AUDIO API SYNTHESIZER)
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
        } catch (e) {
            // Audio context safely ignored if blocked by autoplay policy
        }
    },
    diceRoll() {
        // Tiếng lách cách khi lắc xúc xắc
        for (let i = 0; i < 5; i++) {
            this.playTone(320 + Math.random() * 260, 'triangle', 0.06, i * 70);
        }
    },
    stepSound() {
        // Tiếng bước chân token nhảy trên ô
        this.playTone(480, 'sine', 0.08);
    },
    cashChime() {
        // Tiếng leng keng nhận tiền / máy đếm tiền
        this.playTone(523.25, 'triangle', 0.1, 0); // C5
        this.playTone(659.25, 'triangle', 0.12, 80); // E5
        this.playTone(783.99, 'triangle', 0.18, 160); // G5
        this.playTone(1046.50, 'triangle', 0.25, 240); // C6
    },
    payRent() {
        // Tiếng trừ tiền nộp phạt/nộp thuế
        this.playTone(392, 'sawtooth', 0.12, 0);
        this.playTone(329.63, 'sawtooth', 0.15, 100);
        this.playTone(261.63, 'sawtooth', 0.22, 200);
    },
    jailLock() {
        // Tiếng khóa cửa buồng giam
        this.playTone(180, 'sawtooth', 0.2, 0);
        this.playTone(120, 'square', 0.35, 120);
    },
    flightWhoosh() {
        // Tiếng động cơ phản lực cất cánh
        this.playTone(300, 'sine', 0.15, 0);
        this.playTone(550, 'sine', 0.2, 100);
        this.playTone(880, 'sine', 0.3, 200);
    },
    jackpotWin() {
        // Tiếng pháo hoa ăn hũ đỗ xe
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, idx) => {
            this.playTone(freq, 'triangle', 0.25, idx * 90);
        });
    }
};

// 6. KHỞI TẠO BÀN CỜ MONOPOLY TRÊN DOM
function initMonopolyBoard() {
    const boardEl = document.getElementById("monopolyBoard");
    if (!boardEl) return;

    // Giữ lại trung tâm boardCenterHub, xóa các ô cũ nếu có
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
        cell.title = `${tile.name} (${tile.subtitle}) - Bấm để xem thông tin`;

        // Dải màu nhận diện khu vực bất động sản
        const colorBand = document.createElement("div");
        colorBand.className = `tile-region-strip strip-${tile.region}`;

        // Biểu tượng & Tên
        const iconEl = document.createElement("div");
        iconEl.className = "tile-icon";
        iconEl.textContent = tile.icon;

        const nameEl = document.createElement("div");
        nameEl.className = "tile-name";
        nameEl.textContent = tile.name;

        const subEl = document.createElement("div");
        subEl.className = "tile-subtitle";
        subEl.textContent = tile.subtitle;

        // Giá mua hoặc thông tin
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
            priceEl.textContent = "Hũ thưởng";
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

        // Khung chứa quân cờ (Tokens)
        const tokensWrap = document.createElement("div");
        tokensWrap.className = "tile-tokens-wrap";
        tokensWrap.id = `tokens-wrap-${tile.id}`;

        cell.appendChild(colorBand);
        cell.appendChild(iconEl);
        cell.appendChild(nameEl);
        cell.appendChild(subEl);
        cell.appendChild(priceEl);
        cell.appendChild(levelBadge);
        cell.appendChild(ownerBadge);
        cell.appendChild(tokensWrap);

        // Sự kiện click vào ô bất kỳ để soi chi tiết Sổ Đỏ (Title Deed)
        cell.addEventListener("click", () => {
            inspectTileTitleDeed(tile.id);
        });

        boardEl.appendChild(cell);
    });

    // Cập nhật vị trí các quân cờ ban đầu
    renderPlayerTokens();
    updateUI();
    populateAirportSelect();
}

// 7. CẬP NHẬT QUÂN CỜ TRÊN BÀN CỜ (PLAYER TOKENS)
function renderPlayerTokens() {
    // Xóa toàn bộ token khỏi các ô
    document.querySelectorAll(".tile-tokens-wrap").forEach(slot => slot.innerHTML = "");

    // Đặt quân cờ Huy
    const slotHuy = document.getElementById(`tokens-wrap-${gameState.players.huy.position}`);
    if (slotHuy) {
        const tokenHuy = document.createElement("div");
        tokenHuy.className = "token-pin token-huy";
        tokenHuy.id = "tokenHuy";
        tokenHuy.textContent = gameState.players.huy.icon;
        tokenHuy.title = "Huy (Xe Đua 🚗)";
        slotHuy.appendChild(tokenHuy);
    }

    // Đặt quân cờ Hiền
    const slotHien = document.getElementById(`tokens-wrap-${gameState.players.hien.position}`);
    if (slotHien) {
        const tokenHien = document.createElement("div");
        tokenHien.className = "token-pin token-hien";
        tokenHien.id = "tokenHien";
        tokenHien.textContent = gameState.players.hien.icon;
        tokenHien.title = "Hiền (Máy Bay ✈️)";
        slotHien.appendChild(tokenHien);
    }
}

// 8. TÍNH TOÁN TỔNG TÀI SẢN (NET WORTH)
function calculateNetWorth(playerKey) {
    const p = gameState.players[playerKey];
    let net = p.cash;
    p.props.forEach(propId => {
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

// 9. CẬP NHẬT GIAO DIỆN CHÍNH (HUD & STATS)
function updateUI() {
    // Cập nhật người chơi Huy
    const huyCashEl = document.getElementById("huyCash");
    const huyPropsEl = document.getElementById("huyPropsCount");
    const huyNetEl = document.getElementById("huyNetWorth");
    const hudHuyEl = document.getElementById("hudHuy");

    const huyNet = calculateNetWorth("huy");
    if (huyCashEl) huyCashEl.textContent = Number(gameState.players.huy.cash).toLocaleString();
    if (huyPropsEl) huyPropsEl.textContent = gameState.players.huy.props.length;
    if (huyNetEl) huyNetEl.textContent = `${Number(huyNet).toLocaleString()}M`;

    // Cập nhật người chơi Hiền
    const hienCashEl = document.getElementById("hienCash");
    const hienPropsEl = document.getElementById("hienPropsCount");
    const hienNetEl = document.getElementById("hienNetWorth");
    const hudHienEl = document.getElementById("hudHien");

    const hienNet = calculateNetWorth("hien");
    if (hienCashEl) hienCashEl.textContent = Number(gameState.players.hien.cash).toLocaleString();
    if (hienPropsEl) hienPropsEl.textContent = gameState.players.hien.props.length;
    if (hienNetEl) hienNetEl.textContent = `${Number(hienNet).toLocaleString()}M`;

    // Highlight lượt chơi hiện tại
    if (hudHuyEl) {
        if (gameState.currentTurn === "huy") {
            hudHuyEl.classList.add("active-turn");
        } else {
            hudHuyEl.classList.remove("active-turn");
        }
    }
    if (hudHienEl) {
        if (gameState.currentTurn === "hien") {
            hudHienEl.classList.add("active-turn");
        } else {
            hudHienEl.classList.remove("active-turn");
        }
    }

    // Cập nhật Hũ thưởng Bãi Đỗ Xe
    const poolEl = document.getElementById("parkingPoolDisplay");
    if (poolEl) poolEl.textContent = `${Number(gameState.parkingPool).toLocaleString()}M`;

    // Cập nhật trạng thái sở hữu của từng ô trên bàn cờ
    VIETNAM_TILES.forEach(tile => {
        const ownerEl = document.getElementById(`owner-badge-${tile.id}`);
        const levelEl = document.getElementById(`level-badge-${tile.id}`);
        if (!ownerEl || !levelEl) return;

        if (tile.owner) {
            ownerEl.className = `tile-owner-badge owner-${tile.owner}`;
            ownerEl.textContent = tile.owner === "huy" ? "Huy" : "Hiền";
            ownerEl.style.display = "block";

            // Hiển thị cấp độ nhà
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
    if (rollBtn) {
        const curr = gameState.players[gameState.currentTurn];
        rollBtn.disabled = gameState.isRolling;
        const btnText = rollBtn.querySelector(".btn-dice-text");
        if (btnText) {
            btnText.textContent = `${curr.name} Tung Xúc Xắc (${curr.icon})`;
        }
    }
}

// 10. ĐIỀU KHIỂN XÚC XẮC 3D VÀ GÓC QUAY
function roll3DDice(targetValue, callback) {
    const diceCube = document.getElementById("diceCube");
    if (!diceCube) {
        if (callback) callback();
        return;
    }

    soundEffects.diceRoll();

    // Các góc quay 3D chuẩn theo từng mặt (1 đến 6)
    const faceRotations = {
        1: { x: 0, y: 0 },
        2: { x: 0, y: -90 },
        3: { x: 0, y: -180 },
        4: { x: 0, y: 90 },
        5: { x: -90, y: 0 },
        6: { x: 90, y: 0 }
    };

    const targetRot = faceRotations[targetValue] || { x: 0, y: 0 };
    // Thêm các vòng quay ngẫu nhiên (3 - 5 vòng) để tạo hiệu ứng nhào lộn mượt mà
    const extraRotX = (3 + Math.floor(Math.random() * 3)) * 360;
    const extraRotY = (3 + Math.floor(Math.random() * 3)) * 360;

    diceCube.style.transition = "transform 1.2s cubic-bezier(0.15, 0.9, 0.25, 1)";
    diceCube.style.transform = `rotateX(${targetRot.x + extraRotX}deg) rotateY(${targetRot.y + extraRotY}deg)`;

    setTimeout(() => {
        if (callback) callback();
    }, 1250);
}

// 11. HÀM TUNG XÚC XẮC CHÍNH (TRIGGERED BY NÚT HOẶC AI)
function handleRollDice() {
    if (gameState.isRolling) return;

    const player = gameState.players[gameState.currentTurn];

    // Nếu người chơi đang ở trong tù
    if (player.inJail) {
        openJailModal();
        return;
    }

    gameState.isRolling = true;
    updateUI();

    const rollStatus = document.getElementById("actionStatusMsg");
    if (rollStatus) {
        rollStatus.textContent = `${player.name} đang tung xúc xắc...`;
    }

    // Giá trị xúc xắc từ 1 đến 6
    const diceResult = Math.floor(Math.random() * 6) + 1;

    roll3DDice(diceResult, () => {
        if (rollStatus) {
            rollStatus.innerHTML = `🎲 <strong>${player.name}</strong> đổ được <strong>${diceResult} điểm</strong>!`;
        }
        // Di chuyển quân cờ từng bước một
        movePlayerStepByStep(player, diceResult, () => {
            gameState.isRolling = false;
            handleTileAction(player, player.position, diceResult);
        });
    });
}

// 12. DI CHUYỂN TỪNG BƯỚC MƯỢT MÀ (ANIMATED STEP BY STEP)
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

        // Kiểm tra nếu đi qua hoặc dừng tại ô Ga Hà Nội (Khởi hành / GO 🚩)
        if (player.position === 0) {
            player.cash += 200;
            soundEffects.cashChime();
            showStatusNotice(`🚩 ${player.name} đi qua Ga Hà Nội và nhận thưởng +200M VNĐ!`);
            updateUI();
        }

        setTimeout(nextStep, 180);
    }

    nextStep();
}

// 13. XỬ LÝ SỰ KIỆN KHI ĐÁP XUỐNG Ô (TILE ACTIONS)
function handleTileAction(player, tileId, diceRollValue = 1) {
    const tile = VIETNAM_TILES[tileId];
    if (!tile) return;

    // 1. Ô BẤT ĐỘNG SẢN (PROPERTY)
    if (tile.type === "property") {
        if (!tile.owner) {
            // Chưa ai sở hữu -> Mở Modal mua đất
            promptBuyProperty(player, tile);
        } else if (tile.owner === player.id) {
            // Chính mình sở hữu -> Kiểm tra có thể nâng cấp thêm nhà không
            if (tile.level < 3) {
                promptUpgradeProperty(player, tile);
            } else {
                showStatusNotice(`🏨 ${player.name} ghé thăm Khách Sạn cao cấp của chính mình tại ${tile.name}!`);
                finishTurn();
            }
        } else {
            // Của đối thủ -> Phải trả tiền thuê đất!
            handlePayRent(player, tile);
        }
        return;
    }

    // 2. Ô CÔNG TY ĐIỆN LỰC (UTILITY)
    if (tile.type === "utility") {
        if (!tile.owner) {
            promptBuyProperty(player, tile);
        } else if (tile.owner !== player.id) {
            const bill = diceRollValue * 15; // Thuế điện lực = xúc xắc x 15M
            const opponent = gameState.players[tile.owner];
            soundEffects.payRent();
            player.cash -= bill;
            opponent.cash += bill;
            showStatusNotice(`⚡ ${player.name} trả tiền điện ${bill}M VNĐ (${diceRollValue} x 15M) cho ${opponent.name}!`);
            updateUI();
            checkBankruptcy(player, () => finishTurn());
        } else {
            showStatusNotice(`⚡ ${player.name} ghé thăm trụ sở Công Ty Điện Lực của mình.`);
            finishTurn();
        }
        return;
    }

    // 3. Ô VÀO TÙ (GO TO JAIL 🚔)
    if (tile.type === "go_to_jail") {
        soundEffects.jailLock();
        showStatusNotice(`🚔 ${player.name} bị cảnh sát bắt giam và áp giải về Nhà Tù!`);
        player.position = 18; // Ô Nhà tù
        player.inJail = true;
        player.jailTurns = 0;
        renderPlayerTokens();
        updateUI();
        setTimeout(() => {
            finishTurn();
        }, 1200);
        return;
    }

    // 4. Ô NHÀ TÙ (JAIL / JUST VISITING ⛓️)
    if (tile.type === "jail") {
        showStatusNotice(`⛓️ ${player.name} ghé thăm phạm nhân tại Nhà Tù (Thăm tù bình an).`);
        finishTurn();
        return;
    }

    // 5. Ô BÃI ĐỖ XE MIỄN PHÍ (FREE PARKING 🅿️)
    if (tile.type === "parking") {
        const jackpot = gameState.parkingPool;
        if (jackpot > 0) {
            soundEffects.jackpotWin();
            player.cash += jackpot;
            gameState.parkingPool = 0;
            showStatusNotice(`🎉 ${player.name} dừng chân tại Bãi Đỗ Xe và ĂN TRỌN HŨ THƯỞNG ${jackpot}M VNĐ!`);
            updateUI();
        } else {
            showStatusNotice(`🅿️ ${player.name} nghỉ chân tại Bãi Đỗ Xe Miễn Phí.`);
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
        gameState.parkingPool += taxAmount; // Nộp thuế vào hũ đỗ xe
        showStatusNotice(`💰 ${player.name} nộp 100M VNĐ Thuế Thu Nhập (Tiền được chuyển vào Hũ Bãi Đỗ Xe)!`);
        updateUI();
        checkBankruptcy(player, () => finishTurn());
        return;
    }

    // 8. Ô THẺ CƠ HỘI (CHANCE ❓)
    if (tile.type === "chance") {
        drawCardAction(player, "chance");
        return;
    }

    // 9. Ô THẺ KHÍ VẬN (COMMUNITY CHEST 📦)
    if (tile.type === "chest") {
        drawCardAction(player, "chest");
        return;
    }

    // 10. Ô KHỞI HÀNH (START 🚩)
    if (tile.type === "start") {
        showStatusNotice(`🚩 ${player.name} dừng chân ngay tại Ga Hà Nội!`);
        finishTurn();
        return;
    }

    finishTurn();
}

// 14. TRẢ TIỀN THUÊ ĐẤT (PAY RENT)
function handlePayRent(player, tile) {
    const opponent = gameState.players[tile.owner];
    const rentAmount = tile.rent[tile.level - 1] || tile.rent[0];

    soundEffects.payRent();
    player.cash -= rentAmount;
    opponent.cash += rentAmount;

    showStatusNotice(`💸 ${player.name} dừng chân tại ${tile.name} (Cấp ${tile.level}) và phải trả ${rentAmount}M VNĐ tiền thuê cho ${opponent.name}!`);
    updateUI();

    checkBankruptcy(player, () => finishTurn());
}

// 15. HỎI MUA BẤT ĐỘNG SẢN (PROMPT BUY PROPERTY)
function promptBuyProperty(player, tile) {
    gameState.pendingPropertyTile = tile;

    // Nếu người chơi là AI
    if (player.isAi) {
        if (player.cash >= tile.price * 1.3) {
            confirmBuyProperty(player, tile);
        } else {
            showStatusNotice(`🤖 ${player.name} quyết định tiết kiệm tiền và bỏ qua cơ hội mua ${tile.name}.`);
            finishTurn();
        }
        return;
    }

    // Mở modal cho người chơi thật
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

    // Hiển thị bậc thuê
    document.getElementById("lvl1Rent").textContent = `${tile.rent[0]}M`;
    document.getElementById("lvl2Rent").textContent = `${tile.rent[1]}M`;
    document.getElementById("lvl3Rent").textContent = `${tile.rent[2]}M`;

    // Reset preview steps
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

// 16. HỎI NÂNG CẤP BẤT ĐỘNG SẢN (PROMPT UPGRADE PROPERTY)
function promptUpgradeProperty(player, tile) {
    gameState.pendingPropertyTile = tile;

    const nextLevel = tile.level + 1;
    const upgradePrice = tile.upgradeCost;
    const newRent = tile.rent[nextLevel - 1];

    if (player.isAi) {
        if (player.cash >= upgradePrice * 1.5) {
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

    // Highlight step
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

// 17. XÁC NHẬN MUA ĐẤT
function confirmBuyProperty(player, tile) {
    if (player.cash < tile.price) return;

    soundEffects.cashChime();
    player.cash -= tile.price;
    tile.owner = player.id;
    tile.level = 1;
    player.props.push(tile.id);

    showStatusNotice(`🏠 ${player.name} đã mua thành công bất động sản ${tile.name} với giá ${tile.price}M VNĐ!`);
    closeModal("modalBuyProperty");
    updateUI();
    finishTurn();
}

// 18. XÁC NHẬN NÂNG CẤP NHÀ
function confirmUpgradeProperty(player, tile) {
    if (player.cash < tile.upgradeCost) return;

    soundEffects.cashChime();
    player.cash -= tile.upgradeCost;
    tile.level += 1;

    const levelIcon = tile.level === 2 ? "🏡 Biệt Thự (Cấp 2)" : "🏨 Khách Sạn Cao Cấp (Cấp 3)";
    showStatusNotice(`✨ ${player.name} đã nâng cấp ${tile.name} lên ${levelIcon}! Tiền thuê mới: ${tile.rent[tile.level - 1]}M VNĐ.`);
    closeModal("modalBuyProperty");
    updateUI();
    finishTurn();
}

// 19. RÚT THẺ CƠ HỘI HOẶC KHÍ VẬN (DRAW CARDS)
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

// 20. THỰC HIỆN TÁC DỤNG CỦA LÁ THẺ
function applyCardEffect(player, card) {
    if (card.type === "gain_cash") {
        soundEffects.cashChime();
        player.cash += card.amount;
        showStatusNotice(`💵 ${player.name} nhận được +${card.amount}M VNĐ từ thẻ ${card.title}!`);
    } else if (card.type === "pay_parking") {
        soundEffects.payRent();
        player.cash -= card.amount;
        gameState.parkingPool += card.amount;
        showStatusNotice(`💸 ${player.name} nộp ${card.amount}M VNĐ vào Hũ Bãi Đỗ Xe!`);
        checkBankruptcy(player);
    } else if (card.type === "free_jail") {
        player.inJail = false;
        player.jailTurns = 0;
        showStatusNotice(`🕊️ ${player.name} nhận được quyền ân xá và tự do!`);
    } else if (card.type === "advance_go") {
        player.position = 0;
        player.cash += 200;
        soundEffects.cashChime();
        renderPlayerTokens();
        showStatusNotice(`🚩 ${player.name} bay thẳng về Ga Hà Nội và nhận thưởng +200M VNĐ!`);
    }
    updateUI();
}

// 21. XỬ LÝ NHÀ TÙ & BẢO LÃNH (JAIL LOGIC)
function openJailModal() {
    const player = gameState.players[gameState.currentTurn];
    const modal = document.getElementById("modalJail");
    if (!modal) return;

    document.getElementById("jailTitle").textContent = `${player.name} Đang Ở Trong Tù!`;
    document.getElementById("jailDesc").textContent = `Bạn đã thụ án được ${player.jailTurns} lượt. Chọn hình thức xử lý để ra tù:`;

    const btnBail = document.getElementById("btnPayBail");
    if (player.cash < 50) {
        btnBail.disabled = true;
        btnBail.innerHTML = "<span>💵 Không đủ 50M để nộp bảo lãnh</span>";
    } else {
        btnBail.disabled = false;
        btnBail.innerHTML = "<span>💵 Nộp tiền bảo lãnh <strong>50M</strong> để ra tù ngay lập tức</span>";
    }

    modal.classList.add("active");
}

function handlePayBail() {
    const player = gameState.players[gameState.currentTurn];
    if (player.cash < 50) return;

    soundEffects.cashChime();
    player.cash -= 50;
    gameState.parkingPool += 50;
    player.inJail = false;
    player.jailTurns = 0;

    closeModal("modalJail");
    showStatusNotice(`🕊️ ${player.name} đã nộp 50M tiền bảo lãnh và được trả tự do! Hãy tung xúc xắc.`);
    updateUI();
}

function handleTryRollJail() {
    const player = gameState.players[gameState.currentTurn];
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
            showStatusNotice(`🎉 ${player.name} đổ được ${diceResult} điểm (>= 4) và ĐÃ ĐƯỢC THẢ TỰ DO! Di chuyển ${diceResult} bước.`);
            movePlayerStepByStep(player, diceResult, () => {
                handleTileAction(player, player.position, diceResult);
            });
        } else {
            player.jailTurns += 1;
            soundEffects.jailLock();
            if (player.jailTurns >= 3) {
                // Hết hạn 3 lượt tạm giam -> Bắt buộc nộp 50M và ra tù
                player.cash -= 50;
                gameState.parkingPool += 50;
                player.inJail = false;
                player.jailTurns = 0;
                showStatusNotice(`⏳ ${player.name} đổ được ${diceResult} điểm. Đã hết hạn tạm giam 3 lượt, tự động trừ 50M và ra tù!`);
                finishTurn();
            } else {
                showStatusNotice(`❌ ${player.name} đổ được ${diceResult} điểm (< 4). Chưa thoát khỏi nhà tù!`);
                finishTurn();
            }
        }
        updateUI();
    });
}

// 22. SÂN BAY QUỐC TẾ (AIRPORT FAST FLIGHT)
function populateAirportSelect() {
    const sel = document.getElementById("airportDestSelect");
    if (!sel) return;

    sel.innerHTML = "";
    VIETNAM_TILES.forEach(t => {
        if (t.id !== 19) { // Không chọn lại chính ô sân bay
            const opt = document.createElement("option");
            opt.value = t.id;
            opt.textContent = `${t.id}. ${t.name} (${t.subtitle}) - ${t.regionName}`;
            sel.appendChild(opt);
        }
    });
}

function openAirportModal(player) {
    if (player.isAi) {
        // AI thông minh tìm mua ô đất tiềm năng chưa có chủ
        const unowned = VIETNAM_TILES.filter(t => t.type === 'property' && !t.owner && player.cash >= t.price + 50);
        if (unowned.length > 0) {
            const dest = unowned[unowned.length - 1]; // Chọn ô đắt giá nhất có thể mua
            player.cash -= 50;
            player.position = dest.id;
            soundEffects.flightWhoosh();
            renderPlayerTokens();
            updateUI();
            showStatusNotice(`✈️ ${player.name} chi 50M mua vé máy bay tốc hành tới ${dest.name}!`);
            setTimeout(() => {
                handleTileAction(player, dest.id, 1);
            }, 600);
        } else {
            showStatusNotice(`✈️ ${player.name} ghé qua Sân Bay Quốc Tế.`);
            finishTurn();
        }
        return;
    }

    const modal = document.getElementById("modalAirportFlight");
    if (!modal) return;

    const btnConfirm = document.getElementById("btnConfirmAirportFly");
    if (player.cash < 50) {
        btnConfirm.disabled = true;
        btnConfirm.textContent = "Không đủ tiền mua vé (50M)";
    } else {
        btnConfirm.disabled = false;
        btnConfirm.textContent = "Cất cánh ngay (-50M)";
    }

    modal.classList.add("active");
}

function handleConfirmAirportFly() {
    const player = gameState.players[gameState.currentTurn];
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

    showStatusNotice(`✈️ ${player.name} đã mua vé bay tốc hành tới ${destTile.name}!`);
    setTimeout(() => {
        handleTileAction(player, destId, 1);
    }, 500);
}

// 23. SOI THẺ SỔ ĐỎ / CHI TIẾT BẤT ĐỘNG SẢN (TITLE DEED INSPECTOR)
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
            const ownerName = tile.owner === "huy" ? "Huy" : "Hiền";
            const ownerColor = tile.owner === "huy" ? "#2563eb" : "#db2777";
            ownerBox.innerHTML = `Chủ sở hữu: <strong style="color:${ownerColor};">${ownerName}</strong> (Cấp ${tile.level})`;

            // Nếu người đang xem là chủ sở hữu và đang tới lượt
            if (tile.owner === gameState.currentTurn && tile.level < 3 && !gameState.isRolling) {
                btnUpgrade.style.display = "inline-block";
                btnUpgrade.textContent = `Xây thêm Cấp ${tile.level + 1} (+${tile.upgradeCost}M)`;
                btnUpgrade.onclick = () => {
                    closeModal("modalPostcardInspector");
                    promptUpgradeProperty(gameState.players[gameState.currentTurn], tile);
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

// 24. MỞ BẢNG DANH MỤC BẤT ĐỘNG SẢN & TÀI SẢN (PORTFOLIO)
function openPortfolioModal() {
    const modal = document.getElementById("modalPassport");
    if (!modal) return;

    const grid = document.getElementById("passportLandmarksGrid");
    grid.innerHTML = "";

    const properties = VIETNAM_TILES.filter(t => t.type === "property");
    const ownedCount = properties.filter(t => t.owner !== null).length;

    document.getElementById("passTotalUnlocked").textContent = `${ownedCount} / ${properties.length}`;
    document.getElementById("passHuyTotal").textContent = `${Number(calculateNetWorth("huy")).toLocaleString()}M`;
    document.getElementById("passHienTotal").textContent = `${Number(calculateNetWorth("hien")).toLocaleString()}M`;

    properties.forEach(t => {
        const item = document.createElement("div");
        item.className = "passport-item";
        let statusBadge = `<span class="badge-unlocked" style="background:#64748b;">Chưa mua</span>`;
        if (t.owner === "huy") {
            statusBadge = `<span class="badge-unlocked" style="background:#2563eb;">Sở hữu: Huy (Cấp ${t.level})</span>`;
        } else if (t.owner === "hien") {
            statusBadge = `<span class="badge-unlocked" style="background:#db2777;">Sở hữu: Hiền (Cấp ${t.level})</span>`;
        }

        item.innerHTML = `
            <div class="pass-item-icon">${t.icon}</div>
            <div class="pass-item-name">${t.name}</div>
            <div class="pass-item-region">${t.regionName} - ${t.price}M</div>
            ${statusBadge}
        `;
        grid.appendChild(item);
    });

    modal.classList.add("active");
}

// 25. KIỂM TRA PHÁ SẢN & KẾT THÚC VÁN ĐẤU (BANKRUPTCY CHECK)
function checkBankruptcy(player, onContinue) {
    if (player.cash < 0) {
        // Kiểm tra xem bán tài sản có đủ bù không
        const netWorth = calculateNetWorth(player.id);
        if (netWorth < 0) {
            // Phá sản hoàn toàn -> KẾT THÚC GAME!
            triggerGameOver(player);
            return;
        } else {
            showStatusNotice(`⚠️ ${player.name} đang bị âm tiền mặt (${player.cash}M)! Cần thu xếp tài chính.`);
        }
    }
    if (onContinue) onContinue();
}

function triggerGameOver(loser) {
    const winnerKey = loser.id === "huy" ? "hien" : "huy";
    const winner = gameState.players[winnerKey];

    soundEffects.jackpotWin();

    const modal = document.getElementById("modalGameOver");
    if (modal) {
        document.getElementById("winnerText").innerHTML = `
            Chúc mừng <strong>${winner.name} (${winner.icon})</strong> đã xuất sắc giành chiến thắng chung cuộc!<br>
            Đối thủ <strong>${loser.name}</strong> đã cạn kiệt nguồn vốn và tuyên bố phá sản.
        `;
        modal.classList.add("active");
    }
}

// 26. KẾT THÚC LƯỢT CHƠI & CHUYỂN LƯỢT (FINISH TURN)
function finishTurn() {
    // Đổi lượt: huy <-> hien
    gameState.currentTurn = gameState.currentTurn === "huy" ? "hien" : "huy";
    updateUI();

    const curr = gameState.players[gameState.currentTurn];
    showStatusNotice(`👉 Đang tới lượt của <strong>${curr.name}</strong> (${curr.icon}). Hãy tung xúc xắc!`);

    // Nếu người chơi tiếp theo là AI và đang ở chế độ AI
    if (curr.isAi) {
        setTimeout(() => {
            handleRollDice();
        }, 1200);
    }
}

// 27. THÔNG BÁO TRẠNG THÁI TRÊN HUB TRUNG TÂM
function showStatusNotice(htmlMsg) {
    const statusEl = document.getElementById("actionStatusMsg");
    if (statusEl) {
        statusEl.innerHTML = htmlMsg;
    }
}

// 28. ĐÓNG MODAL
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("active");
    }
}

// 29. BẮT ĐẦU VÁN MỚI (RESET GAME)
function restartNewGame() {
    if (!confirm("Bạn có chắc chắn muốn bắt đầu lại ván cờ mới không? Toàn bộ tài sản và tiền mặt sẽ được thiết lập lại từ đầu.")) {
        return;
    }

    gameState.currentTurn = "huy";
    gameState.isRolling = false;
    gameState.parkingPool = 100;
    gameState.roundCount = 1;

    gameState.players.huy.position = 0;
    gameState.players.huy.cash = 1500;
    gameState.players.huy.props = [];
    gameState.players.huy.inJail = false;
    gameState.players.huy.jailTurns = 0;

    gameState.players.hien.position = 0;
    gameState.players.hien.cash = 1500;
    gameState.players.hien.props = [];
    gameState.players.hien.inJail = false;
    gameState.players.hien.jailTurns = 0;

    VIETNAM_TILES.forEach(t => {
        t.owner = null;
        t.level = 0;
    });

    closeModal("modalGameOver");
    closeModal("modalBuyProperty");
    closeModal("modalPostcardInspector");
    closeModal("modalLoveCard");
    closeModal("modalJail");
    closeModal("modalAirportFlight");
    closeModal("modalPassport");

    initMonopolyBoard();
    showStatusNotice("🚩 Ván cờ tỷ phú mới đã bắt đầu! Mỗi người được cấp 1,500M VNĐ vốn khởi điểm.");
}

// 30. GẮN SỰ KIỆN TOÀN BỘ NÚT BẤM KHI TRANG TẢI XONG
document.addEventListener("DOMContentLoaded", () => {
    // 1. Khởi tạo bàn cờ
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
            const player = gameState.players[gameState.currentTurn];
            const tile = gameState.pendingPropertyTile;
            if (!tile) return;
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

    // 4. Modal soi Sổ đỏ
    const btnCloseInspect = document.getElementById("btnCloseInspect");
    if (btnCloseInspect) {
        btnCloseInspect.addEventListener("click", () => {
            closeModal("modalPostcardInspector");
        });
    }

    // 5. Modal thẻ Cơ hội & Khí vận
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

    // 6. Modal Nhà tù: Bảo lãnh hoặc Đổ xúc xắc
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

    // 8. Modal Danh mục Tài sản (Portfolio)
    const btnOpenPort = document.getElementById("btnOpenPortfolio");
    if (btnOpenPort) {
        btnOpenPort.addEventListener("click", openPortfolioModal);
    }

    const btnClosePort = document.getElementById("btnClosePassport");
    if (btnClosePort) {
        btnClosePort.addEventListener("click", () => {
            closeModal("modalPassport");
        });
    }

    // 9. Nút Luật chơi
    const btnHelp = document.getElementById("btnHelpGuide");
    const modalHelp = document.getElementById("modalHelpGuide");
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

    // 11. Chuyển đổi chế độ chơi: 2 người (Pass & Play) hoặc Đấu với AI
    const modePassPlayBtn = document.getElementById("modePassPlay");
    const modeAiBtn = document.getElementById("modeAi");
    if (modePassPlayBtn && modeAiBtn) {
        modePassPlayBtn.addEventListener("click", () => {
            gameState.mode = "pass_play";
            gameState.players.hien.isAi = false;
            modePassPlayBtn.classList.add("active");
            modeAiBtn.classList.remove("active");
            showStatusNotice("👥 Chế độ: 2 người cùng chơi (Chuyền tay nhau)");
        });

        modeAiBtn.addEventListener("click", () => {
            gameState.mode = "ai";
            gameState.players.hien.isAi = true;
            modeAiBtn.classList.add("active");
            modePassPlayBtn.classList.remove("active");
            showStatusNotice("🤖 Chế độ: Đấu với AI Hiền (Hiền sẽ tự động đổ xúc xắc & đầu tư)");
        });
    }

    // 12. Nút Bắt đầu ván mới
    const restartBtn = document.getElementById("btnRestartGame");
    if (restartBtn) {
        restartBtn.addEventListener("click", restartNewGame);
    }

    const restartFromWinnerBtn = document.getElementById("btnRestartFromWinner");
    if (restartFromWinnerBtn) {
        restartFromWinnerBtn.addEventListener("click", restartNewGame);
    }

    // 13. Khởi tạo bộ chọn Theme (đồng bộ với trang chủ)
    initThemeManager();
});

// 31. ĐỒNG BỘ THEME VỚI TRANG CHỦ
function initThemeManager() {
    const themeBtn = document.getElementById("btnGameTheme");
    const themeModal = document.getElementById("gameThemeModal");
    const closeBtn = document.getElementById("themeModalCloseBtn");
    const applyBtn = document.getElementById("themeApplyBtn");
    const currentNameEl = document.getElementById("themeCurrentName");

    const THEME_NAMES = {
        sunset: "Hoàng Hôn Ấm Áp",
        sakura: "Hoa Anh Đào",
        vintage: "Cà Phê Vintage",
        rose: "Hoa Hồng Lãng Mạn",
        lavender: "Oải Hương Mộng Mơ",
        ocean: "Đại Dương Bình Yên",
        emerald: "Ngọc Lục Bảo",
        autumn: "Mùa Thu Vàng",
        midnight: "Bầu Trời Đêm",
        matcha: "Trà Xanh Dịu Mát",
        berry: "Dâu Rừng Ngọt Ngào",
        peach: "Trái Đào Mọng"
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

    // Đọc theme đã lưu
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
