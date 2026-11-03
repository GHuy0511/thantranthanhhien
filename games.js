/**
 * ========================================================
 * CỜ TỶ PHÚ VIỆT NAM (MONOPOLY VIETNAM EDITION 10x10)
 * Bàn cờ 10x10 (36 ô địa danh chiến thuật khắp Việt Nam)
 * Xúc xắc đôi 3D chân thực, hoạt ảnh mở thẻ 3D không lag
 * Hệ thống kho thẻ Ân Xá, ô Thử Thách & Cơ Hội, Lịch sử giao dịch dòng tiền
 * Đổi tên người chơi linh hoạt, điều chỉnh luật bất động sản minh bạch
 * ========================================================
 */

// 1. DANH SÁCH 36 Ô BÀN CỜ MONOPOLY VIỆT NAM (10x10 GRID)
const VIETNAM_TILES = [
    // --- CẠNH TRÊN: ROW 1 (Cols 1 -> 10) ---
    {
        id: 0, row: 1, col: 1,
        name: "Ga Hà Nội",
        subtitle: "Khởi Hành (GO)",
        icon: "🚩",
        region: "special",
        regionName: "Bắt Đầu",
        type: "start",
        price: 0,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Điểm xuất phát trên bàn cờ. Mỗi lần đi qua nhận ngay 200M VNĐ tiền trợ cấp từ Ngân hàng.",
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
        rent: [15, 45, 110, 260],
        upgradeCost: 50,
        desc: "Trái tim Thủ đô ngàn năm văn hiến. Vị trí đắc địa với Tháp Rùa và cầu Thê Húc.",
        owner: null,
        level: 0
    },
    {
        id: 2, row: 1, col: 3,
        name: "Thử Thách",
        subtitle: "Vượt Trở Ngại",
        icon: "⚡",
        region: "special",
        regionName: "Thử Thách",
        type: "challenge",
        price: 0,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Đối mặt thử thách bất ngờ: lùi ô, nộp thuế, tu sửa nhà hoặc tạm dừng di chuyển.",
        owner: null,
        level: 0
    },
    {
        id: 3, row: 1, col: 4,
        name: "Vịnh Hạ Long",
        subtitle: "Quảng Ninh",
        icon: "⛵",
        region: "hanoi",
        regionName: "Bắc Bộ",
        type: "property",
        price: 120,
        rent: [20, 60, 140, 320],
        upgradeCost: 60,
        desc: "Kỳ quan thiên nhiên thế giới với hàng ngàn đảo đá vôi kỳ vĩ soi bóng làn nước ngọc bích.",
        owner: null,
        level: 0
    },
    {
        id: 4, row: 1, col: 5,
        name: "Thuế Doanh Thu",
        subtitle: "Nộp Ngân Sách",
        icon: "💰",
        region: "special",
        regionName: "Thuế",
        type: "tax",
        price: 100,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Quyết toán thuế kinh doanh hàng năm: Nộp ngay 100M VNĐ vào Hũ Bãi Đỗ Xe.",
        owner: null,
        level: 0
    },
    {
        id: 5, row: 1, col: 6,
        name: "Sân Bay Nội Bài",
        subtitle: "Cửa Ngõ Phía Bắc",
        icon: "✈️",
        region: "transport",
        regionName: "Giao Thông",
        type: "transport",
        price: 200,
        rent: [40, 80, 160, 350],
        upgradeCost: 100,
        desc: "Cảng hàng không quốc tế sầm uất. Thu phí dịch vụ và cho phép bay đến bất kỳ ô nào.",
        owner: null,
        level: 0
    },
    {
        id: 6, row: 1, col: 7,
        name: "Đỉnh Fansipan",
        subtitle: "Lào Cai",
        icon: "🏔️",
        region: "northwest",
        regionName: "Tây Bắc",
        type: "property",
        price: 150,
        rent: [25, 75, 180, 400],
        upgradeCost: 75,
        desc: "Nóc nhà Đông Dương ở độ cao 3.143m ngập tràn biển mây bồng bềnh.",
        owner: null,
        level: 0
    },
    {
        id: 7, row: 1, col: 8,
        name: "Cơ Hội",
        subtitle: "Rút Thẻ May Mắn",
        icon: "❓",
        region: "special",
        regionName: "Cơ Hội",
        type: "chance",
        price: 0,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Rút thẻ Cơ Hội bất ngờ: trúng số, chia cổ tức hoặc nhận thẻ ân xá ra tù lưu vào kho.",
        owner: null,
        level: 0
    },
    {
        id: 8, row: 1, col: 9,
        name: "Tràng An",
        subtitle: "Ninh Bình",
        icon: "🚣",
        region: "northwest",
        regionName: "Tây Bắc",
        type: "property",
        price: 170,
        rent: [30, 90, 210, 460],
        upgradeCost: 85,
        desc: "Di sản văn hóa và thiên nhiên thế giới với cảnh sắc non nước hữu tình.",
        owner: null,
        level: 0
    },
    {
        id: 9, row: 1, col: 10,
        name: "Vào Tù",
        subtitle: "Cảnh Sát Áp Giải",
        icon: "🚔",
        region: "special",
        regionName: "Vào Tù",
        type: "go_to_jail",
        price: 0,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Bị lực lượng trật tự áp giải thẳng đến buồng giam! Phải đổ xúc xắc đôi hoặc dùng Thẻ Ân Xá.",
        owner: null,
        level: 0
    },

    // --- CẠNH PHẢI: COL 10 (Rows 2 -> 10) ---
    {
        id: 10, row: 2, col: 10,
        name: "Động Phong Nha",
        subtitle: "Quảng Bình",
        icon: "🦇",
        region: "central",
        regionName: "Bắc Trung Bộ",
        type: "property",
        price: 190,
        rent: [35, 105, 240, 520],
        upgradeCost: 95,
        desc: "Kỳ quan đệ nhất động với thạch nhũ tráng lệ lung linh dưới lòng đất.",
        owner: null,
        level: 0
    },
    {
        id: 11, row: 3, col: 10,
        name: "Điện Lực VN",
        subtitle: "Năng Lượng Quốc Gia",
        icon: "⚡",
        region: "utility",
        regionName: "Dịch Vụ",
        type: "utility",
        price: 150,
        rent: [30, 70, 150, 320],
        upgradeCost: 80,
        desc: "Tập đoàn Điện lực quốc gia, thu phí tiền điện kinh doanh theo lượt đổ.",
        owner: null,
        level: 0
    },
    {
        id: 12, row: 4, col: 10,
        name: "Cố Đô Huế",
        subtitle: "Thừa Thiên Huế",
        icon: "🏯",
        region: "central",
        regionName: "Bắc Trung Bộ",
        type: "property",
        price: 210,
        rent: [40, 120, 280, 580],
        upgradeCost: 105,
        desc: "Quần thể di tích Kinh thành Huế trầm mặc cổ kính bên bờ sông Hương.",
        owner: null,
        level: 0
    },
    {
        id: 13, row: 5, col: 10,
        name: "Thử Thách",
        subtitle: "Vượt Trở Ngại",
        icon: "⚡",
        region: "special",
        regionName: "Thử Thách",
        type: "challenge",
        price: 0,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Đối mặt thử thách bất ngờ.",
        owner: null,
        level: 0
    },
    {
        id: 14, row: 6, col: 10,
        name: "Cầu Vàng",
        subtitle: "Bà Nà Hills",
        icon: "🌉",
        region: "danang",
        regionName: "Nam Trung Bộ",
        type: "property",
        price: 230,
        rent: [45, 135, 310, 640],
        upgradeCost: 115,
        desc: "Kỳ quan cầu Vàng nâng đỡ bởi bàn tay khổng lồ giữa đỉnh núi Chúa.",
        owner: null,
        level: 0
    },
    {
        id: 15, row: 7, col: 10,
        name: "Phố Cổ Hội An",
        subtitle: "Quảng Nam",
        icon: "🏮",
        region: "danang",
        regionName: "Nam Trung Bộ",
        type: "property",
        price: 250,
        rent: [50, 150, 350, 720],
        upgradeCost: 125,
        desc: "Di sản văn hóa thương cảng đèn lồng lung linh lãng mạn bên sông Hoài.",
        owner: null,
        level: 0
    },
    {
        id: 16, row: 8, col: 10,
        name: "Cơ Hội",
        subtitle: "Rút Thẻ May Mắn",
        icon: "❓",
        region: "special",
        regionName: "Cơ Hội",
        type: "chance",
        price: 0,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Rút thẻ Cơ Hội may mắn.",
        owner: null,
        level: 0
    },
    {
        id: 17, row: 9, col: 10,
        name: "Biển Mỹ Khê",
        subtitle: "Đà Nẵng",
        icon: "🏖️",
        region: "danang",
        regionName: "Nam Trung Bộ",
        type: "property",
        price: 270,
        rent: [55, 165, 380, 780],
        upgradeCost: 135,
        desc: "Bãi biển quyến rũ hàng đầu hành tinh với dải cát trắng mịn và biển trong vắt.",
        owner: null,
        level: 0
    },
    {
        id: 18, row: 10, col: 10,
        name: "Bãi Đỗ Xe",
        subtitle: "Hũ Thưởng Miễn Phí",
        icon: "🅿️",
        region: "special",
        regionName: "Hũ Thưởng",
        type: "parking",
        price: 0,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Trạm dừng chân miễn phí an toàn! Nhận trọn vẹn toàn bộ Hũ tiền thưởng tích lũy.",
        owner: null,
        level: 0
    },

    // --- CẠNH DƯỚI: ROW 10 (Cols 9 -> 1) ---
    {
        id: 19, row: 10, col: 9,
        name: "Vịnh Nha Trang",
        subtitle: "Khánh Hòa",
        icon: "🌊",
        region: "coastal",
        regionName: "Nam Trung Bộ",
        type: "property",
        price: 290,
        rent: [60, 180, 410, 840],
        upgradeCost: 145,
        desc: "Thiên đường du lịch biển đảo rực rỡ với rạn san hô lộng lẫy.",
        owner: null,
        level: 0
    },
    {
        id: 20, row: 10, col: 8,
        name: "Thử Thách",
        subtitle: "Vượt Trở Ngại",
        icon: "⚡",
        region: "special",
        regionName: "Thử Thách",
        type: "challenge",
        price: 0,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Đối mặt thử thách bất ngờ.",
        owner: null,
        level: 0
    },
    {
        id: 21, row: 10, col: 7,
        name: "Đà Lạt",
        subtitle: "Lâm Đồng",
        icon: "🌸",
        region: "highland",
        regionName: "Tây Nguyên",
        type: "property",
        price: 310,
        rent: [65, 195, 450, 900],
        upgradeCost: 155,
        desc: "Xứ sở sương mù ngàn hoa, bất động sản nghỉ dưỡng cao nguyên đắt giá.",
        owner: null,
        level: 0
    },
    {
        id: 22, row: 10, col: 6,
        name: "Cấp Nước Sạch",
        subtitle: "Dịch Vụ Đô Thị",
        icon: "💧",
        region: "utility",
        regionName: "Dịch Vụ",
        type: "utility",
        price: 160,
        rent: [35, 80, 170, 360],
        upgradeCost: 80,
        desc: "Nhà máy xử lý và cung cấp nước sinh hoạt, thu phí theo biểu giá dịch vụ.",
        owner: null,
        level: 0
    },
    {
        id: 23, row: 10, col: 5,
        name: "Buôn Ma Thuột",
        subtitle: "Đắk Lắk",
        icon: "☕",
        region: "highland",
        regionName: "Tây Nguyên",
        type: "property",
        price: 330,
        rent: [70, 210, 480, 960],
        upgradeCost: 165,
        desc: "Thủ phủ cà phê đất đỏ bazan bạt ngàn với văn hóa cồng chiêng đặc sắc.",
        owner: null,
        level: 0
    },
    {
        id: 24, row: 10, col: 4,
        name: "Cơ Hội",
        subtitle: "Rút Thẻ May Mắn",
        icon: "❓",
        region: "special",
        regionName: "Cơ Hội",
        type: "chance",
        price: 0,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Rút thẻ Cơ Hội may mắn.",
        owner: null,
        level: 0
    },
    {
        id: 25, row: 10, col: 3,
        name: "Bãi Sau Vũng Tàu",
        subtitle: "Bà Rịa - Vũng Tàu",
        icon: "🏖️",
        region: "southeast",
        regionName: "Đông Nam Bộ",
        type: "property",
        price: 350,
        rent: [75, 225, 510, 1020],
        upgradeCost: 175,
        desc: "Bờ biển nghỉ dưỡng sôi động thu hút hàng triệu du khách mỗi dịp cuối tuần.",
        owner: null,
        level: 0
    },
    {
        id: 26, row: 10, col: 2,
        name: "Đồi Cát Mũi Né",
        subtitle: "Bình Thuận",
        icon: "🏜️",
        region: "southeast",
        regionName: "Đông Nam Bộ",
        type: "property",
        price: 370,
        rent: [80, 240, 540, 1080],
        upgradeCost: 185,
        desc: "Tiểu sa mạc đồi cát bay rực rỡ với các khu resort ven biển đẳng cấp.",
        owner: null,
        level: 0
    },
    {
        id: 27, row: 10, col: 1,
        name: "Nhà Tù",
        subtitle: "Thăm Tù / Tạm Giam",
        icon: "⛓️",
        region: "special",
        regionName: "Nhà Tù",
        type: "jail",
        price: 0,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Đi qua đây: Thăm tù an toàn. Nếu bị áp giải vào tù: Cần đổ xúc xắc đôi hoặc dùng Thẻ Ân Xá.",
        owner: null,
        level: 0
    },

    // --- CẠNH TRÁI: COL 1 (Rows 9 -> 2) ---
    {
        id: 28, row: 9, col: 1,
        name: "Bến Ninh Kiều",
        subtitle: "Cần Thơ",
        icon: "🚢",
        region: "mekong",
        regionName: "Tây Nam Bộ",
        type: "property",
        price: 390,
        rent: [85, 255, 570, 1140],
        upgradeCost: 195,
        desc: "Biểu tượng miền Tây Đô sông nước thanh bình, gạo trắng nước trong.",
        owner: null,
        level: 0
    },
    {
        id: 29, row: 8, col: 1,
        name: "Tân Sơn Nhất",
        subtitle: "Cửa Ngõ Phương Nam",
        icon: "🛫",
        region: "transport",
        regionName: "Giao Thông",
        type: "transport",
        price: 200,
        rent: [40, 80, 160, 350],
        upgradeCost: 100,
        desc: "Cảng hàng không quốc tế nhộn nhịp bậc nhất cả nước, kết nối toàn cầu.",
        owner: null,
        level: 0
    },
    {
        id: 30, row: 7, col: 1,
        name: "Rừng Trà Sư",
        subtitle: "An Giang",
        icon: "🛶",
        region: "mekong",
        regionName: "Tây Nam Bộ",
        type: "property",
        price: 410,
        rent: [90, 270, 600, 1200],
        upgradeCost: 205,
        desc: "Hệ sinh thái rừng tràm ngập nước mùa bèo xanh phủ ngút ngàn tuyệt mỹ.",
        owner: null,
        level: 0
    },
    {
        id: 31, row: 6, col: 1,
        name: "Chợ Bến Thành",
        subtitle: "TP. Hồ Chí Minh",
        icon: "🏬",
        region: "saigon",
        regionName: "Sài Gòn",
        type: "property",
        price: 430,
        rent: [95, 285, 630, 1260],
        upgradeCost: 215,
        desc: "Biểu tượng thương mại lịch sử trăm năm giữa lòng Sài Gòn phồn hoa.",
        owner: null,
        level: 0
    },
    {
        id: 32, row: 5, col: 1,
        name: "Thuế Xa Xỉ",
        subtitle: "Hàng Hiệu & Siêu Xe",
        icon: "💎",
        region: "special",
        regionName: "Thuế",
        type: "tax",
        price: 150,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Thuế tiêu thụ đặc biệt cho hàng xa xỉ: Nộp 150M VNĐ vào Hũ Bãi Đỗ Xe.",
        owner: null,
        level: 0
    },
    {
        id: 33, row: 4, col: 1,
        name: "Dinh Độc Lập",
        subtitle: "TP. Hồ Chí Minh",
        icon: "🏛️",
        region: "saigon",
        regionName: "Sài Gòn",
        type: "property",
        price: 450,
        rent: [100, 300, 670, 1340],
        upgradeCost: 225,
        desc: "Di tích lịch sử quốc gia đặc biệt với kiến trúc độc đáo giữa công viên rợp bóng mát.",
        owner: null,
        level: 0
    },
    {
        id: 34, row: 3, col: 1,
        name: "Landmark 81",
        subtitle: "TP. Hồ Chí Minh",
        icon: "🏙️",
        region: "saigon",
        regionName: "Sài Gòn",
        type: "property",
        price: 480,
        rent: [110, 330, 740, 1500],
        upgradeCost: 240,
        desc: "Tòa tháp cao nhất Việt Nam, vị trí kim cương bất động sản siêu sang.",
        owner: null,
        level: 0
    },
    {
        id: 35, row: 2, col: 1,
        name: "Đảo Phú Quốc",
        subtitle: "Kiên Giang",
        icon: "🏝️",
        region: "saigon",
        regionName: "Đảo Ngọc",
        type: "property",
        price: 500,
        rent: [120, 360, 800, 1600],
        upgradeCost: 250,
        desc: "Đảo Ngọc thiên đường nghỉ dưỡng triệu đô, ô đất có giá trị và tiền thuê cao nhất!",
        owner: null,
        level: 0
    }
];

// 2. BỘ CẤU HÌNH 4 NHÂN VẬT NGƯỜI CHƠI
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

// 3. BỘ THẺ CƠ HỘI (CHANCE CARDS - MAY MẮN & TIỀN THƯỞNG)
const CHANCE_CARDS = [
    {
        title: "Thẻ Ân Xá Tự Do",
        desc: "Lệnh đặc xá từ Tòa án nhân dân: Miễn toàn bộ án phạt tù! Thẻ này được cất vào kho hành lý để sử dụng khi bạn bị vào tù.",
        type: "free_jail",
        amount: 0,
        rewardText: "🎫 Cất Vào Kho Hành Lý",
        isNegative: false
    },
    {
        title: "Trúng Thưởng Xổ Số Vietlott",
        desc: "Dãy số may mắn trúng giải độc đắc Jackpot! Ngân hàng chi trả trực tiếp cho bạn.",
        type: "gain_cash",
        amount: 250,
        rewardText: "+250M VNĐ",
        isNegative: false
    },
    {
        title: "Chuyến Tàu Tốc Hành Về Ga Hà Nội",
        desc: "Vé tàu siêu tốc đưa bạn thẳng về ô Khởi Hành (Ga Hà Nội) và nhận ngay 200M trợ cấp!",
        type: "advance_go",
        amount: 200,
        rewardText: "Về Ga Hà Nội (+200M)",
        isNegative: false
    },
    {
        title: "Chia Cổ Tức Chứng Khoán",
        desc: "Danh mục đầu tư bất động sản và cổ phiếu sinh lời ấn tượng trong quý. Bạn nhận tiền chia cổ tức.",
        type: "gain_cash",
        amount: 150,
        rewardText: "+150M VNĐ",
        isNegative: false
    },
    {
        title: "Hoàn Thuế Doanh Nghiệp",
        desc: "Cơ quan thuế quyết toán thừa và hoàn trả ngân sách hỗ trợ khởi nghiệp cho bạn.",
        type: "gain_cash",
        amount: 120,
        rewardText: "+120M VNĐ",
        isNegative: false
    },
    {
        title: "Thưởng Khu Phố Du Lịch Kiểu Mẫu",
        desc: "Bộ Văn hóa & Du lịch khen thưởng các công trình của bạn: Nhận 30M cho mỗi Nhà Phố 🏠 và 60M cho mỗi Khách Sạn 🏨 đang sở hữu!",
        type: "property_bonus",
        houseBonus: 30,
        hotelBonus: 60,
        rewardText: "Thưởng BĐS (+30M/🏠, +60M/🏨)",
        isNegative: false
    },
    {
        title: "Tiệc Mừng Thắng Lợi Cùng Bạn Bè",
        desc: "Hôm nay là ngày đặc biệt của bạn! Tất cả các người chơi khác phải mừng cho bạn 30M VNĐ.",
        type: "dividend_all",
        amount: 30,
        rewardText: "Nhận 30M từ mỗi đối thủ",
        isNegative: false
    },
    {
        title: "Vé Máy Bay Hạng Thương Gia",
        desc: "Hãng hàng không tài trợ 1 chuyến bay VIP miễn phí: Bay ngay đến bất kỳ ô nào trên bàn cờ!",
        type: "fly_anywhere",
        amount: 0,
        rewardText: "Bay Tốc Hành Miễn Phí",
        isNegative: false
    }
];

// 4. BỘ THẺ THỬ THÁCH (CHALLENGE CARDS - TRỞ NGẠI, PHẠT & LÙI Ô)
const CHALLENGE_CARDS = [
    {
        title: "Sạt Lở Đèo Hải Vân - Lùi 3 Ô",
        desc: "Cung đèo hiểm trở bị mưa bão phong tỏa, đoàn xe buộc phải quay đầu lùi lại 3 ô và chịu tác động của ô dừng chân mới!",
        type: "step_back",
        steps: 3,
        rewardText: "Lùi lại 3 ô ↩️",
        isNegative: true
    },
    {
        title: "Quên Giấy Tờ Xe - Lùi 2 Ô",
        desc: "Bạn để quên giấy phép lái xe tại trạm nghỉ, phải quay ngược lại 2 ô để lấy giấy tờ!",
        type: "step_back",
        steps: 2,
        rewardText: "Lùi lại 2 ô ↩️",
        isNegative: true
    },
    {
        title: "Hỏng Động Cơ Giữa Rừng - Dừng 2 Lượt",
        desc: "Xe bị thủng lốp và hỏng động cơ giữa đường đèo, phải chờ cứu hộ: Tạm dừng di chuyển trong 2 lượt tiếp theo!",
        type: "freeze_turns",
        turns: 2,
        rewardText: "Dừng đi 2 lượt ❄️",
        isNegative: true
    },
    {
        title: "Kiểm Toán Thuế Đột Xuất",
        desc: "Đoàn thanh tra tài chính kiểm tra đột xuất: Bạn phải nộp phạt 100M VNĐ vào Hũ Bãi Đỗ Xe.",
        type: "pay_parking",
        amount: 100,
        rewardText: "-100M VNĐ",
        isNegative: true
    },
    {
        title: "Bắn Tốc Độ Trên Cao Tốc",
        desc: "Vi phạm tốc độ tối đa trên cao tốc Bắc - Nam. Bị lập biên bản phạt 80M VNĐ sung quỹ Bãi Đỗ Xe.",
        type: "pay_parking",
        amount: 80,
        rewardText: "-80M VNĐ",
        isNegative: true
    },
    {
        title: "Bão Lũ Cần Đại Tu Toàn Diện",
        desc: "Bão lớn gây hư hại mái ngói và cơ sở vật chất: Nộp 25M cho mỗi Nhà Phố 🏠 và 50M cho mỗi Khách Sạn 🏨 vào Hũ Bãi Đỗ Xe.",
        type: "property_repair",
        houseFee: 25,
        hotelFee: 50,
        rewardText: "Phí tu sửa (-25M/🏠, -50M/🏨)",
        isNegative: true
    },
    {
        title: "Đãi Tiệc Mọi Người Thịnh Soạn",
        desc: "Bạn hào phóng mời tất cả đối thủ trên bàn cờ một bữa buffet thịnh soạn: Trả cho mỗi người 40M VNĐ.",
        type: "pay_all",
        amount: 40,
        rewardText: "Trả 40M cho mỗi đối thủ",
        isNegative: true
    }
];

// 5. TRẠNG THÁI TOÀN BỘ VÁN ĐẤU (GAME STATE)
const gameState = {
    playerCount: 2,
    gameMode: "pass_play",
    currentTurnIndex: 0,
    isRolling: false,
    soundEnabled: true,
    parkingPool: 100,
    roundCount: 1,
    pendingCardAction: null,
    pendingPropertyTile: null,
    editingPlayerId: null,
    transactions: [], // Danh sách lịch sử giao dịch dòng tiền
    players: []
};

// Ghi nhận lịch sử giao dịch
function recordTransaction(entry) {
    gameState.transactions.unshift({
        id: Date.now() + Math.random(),
        round: gameState.roundCount,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: entry.type || 'info',
        title: entry.title,
        from: entry.from,
        to: entry.to,
        amount: entry.amount || null,
        isPositive: entry.isPositive !== undefined ? entry.isPositive : (entry.amount > 0),
        desc: entry.desc,
        icon: entry.icon || '💸'
    });
    if (gameState.transactions.length > 60) gameState.transactions.pop();
}

// 6. TRÌNH TẠO ÂM THANH (WEB AUDIO API SYNTHESIZER)
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
        for (let i = 0; i < 6; i++) {
            this.playTone(300 + Math.random() * 280, 'triangle', 0.06, i * 65);
        }
    },
    stepSound() {
        this.playTone(520, 'sine', 0.07);
    },
    cashChime() {
        this.playTone(523.25, 'triangle', 0.1, 0);
        this.playTone(659.25, 'triangle', 0.12, 80);
        this.playTone(783.99, 'triangle', 0.18, 160);
        this.playTone(1046.50, 'triangle', 0.25, 240);
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

// 7. HIỆU ỨNG ĐỒ HỌA MƯỢT MÀ (KHÔNG CONFETTI CANVAS TRÁNH LAG)
const visualFX = {
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
    triggerPoliceSiren() {
        soundEffects.jailLock();
        const siren = document.getElementById("policeSirenOverlay");
        if (!siren) return;
        siren.classList.add("active");
        setTimeout(() => {
            siren.classList.remove("active");
        }, 1500);
    }
};

// 8. KHỞI TẠO BÀN CỜ 10x10 (36 Ô)
function initMonopolyBoard() {
    const boardEl = document.getElementById("monopolyBoard");
    if (!boardEl) return;

    const centerHub = document.getElementById("boardCenterHub");
    boardEl.innerHTML = "";
    if (centerHub) boardEl.appendChild(centerHub);

    VIETNAM_TILES.forEach(tile => {
        const isCorner = tile.type === 'start' || tile.type === 'jail' || tile.type === 'go_to_jail' || tile.type === 'parking';
        const cell = document.createElement("div");
        cell.className = `board-tile ${isCorner ? 'is-corner' : ''}`;
        cell.id = `tile-${tile.id}`;
        cell.style.gridRow = tile.row;
        cell.style.gridColumn = tile.col;
        cell.title = `${tile.name} - Bấm để xem Sổ Đỏ`;

        // Dải màu vùng miền
        const colorBand = document.createElement("div");
        colorBand.className = `tile-region-strip strip-${tile.region}`;

        // Biểu tượng
        const iconEl = document.createElement("div");
        iconEl.className = "tile-icon";
        iconEl.textContent = tile.icon;

        // Tên danh lam
        const nameEl = document.createElement("div");
        nameEl.className = "tile-name";
        nameEl.textContent = tile.name;

        // Giá / Trạng thái
        const priceEl = document.createElement("div");
        priceEl.className = "tile-price";
        if (tile.type === "property") {
            priceEl.textContent = `${tile.price}M`;
        } else if (tile.type === "start") {
            priceEl.textContent = "+200M";
            priceEl.style.color = "#ea580c";
        } else if (tile.type === "transport" || tile.type === "utility") {
            priceEl.textContent = `${tile.price}M`;
            priceEl.style.color = "#0284c7";
        } else if (tile.type === "tax") {
            priceEl.textContent = `-${tile.price}M`;
            priceEl.style.color = "#dc2626";
        } else if (tile.type === "parking") {
            priceEl.textContent = "Hũ 🅿️";
            priceEl.style.color = "#d97706";
        } else if (tile.type === "go_to_jail") {
            priceEl.textContent = "Vào Tù";
            priceEl.style.color = "#dc2626";
        } else if (tile.type === "challenge") {
            priceEl.textContent = "Thử Thách";
            priceEl.style.color = "#ea580c";
        } else if (tile.type === "chance") {
            priceEl.textContent = "Cơ Hội";
            priceEl.style.color = "#9333ea";
        } else {
            priceEl.textContent = "Thăm tù";
            priceEl.style.color = "#64748b";
        }

        // Cụm hiển thị ngôi nhà thật (🏠 1 nhà, 🏠🏠 2 nhà, 🏨 khách sạn)
        const estateView = document.createElement("div");
        estateView.className = "tile-real-estate-view";
        estateView.id = `estate-${tile.id}`;
        estateView.style.display = "none";

        // Huy hiệu người sở hữu (Sổ đỏ)
        const ownerBadge = document.createElement("div");
        ownerBadge.className = "tile-owner-badge";
        ownerBadge.id = `owner-badge-${tile.id}`;
        ownerBadge.style.display = "none";

        // Khung quân cờ
        const tokensWrap = document.createElement("div");
        tokensWrap.className = "tile-tokens-wrap";
        tokensWrap.id = `tokens-wrap-${tile.id}`;

        cell.appendChild(colorBand);
        cell.appendChild(iconEl);
        cell.appendChild(nameEl);
        cell.appendChild(priceEl);
        cell.appendChild(estateView);
        cell.appendChild(ownerBadge);
        cell.appendChild(tokensWrap);

        cell.addEventListener("click", () => {
            inspectTileTitleDeed(tile.id);
        });

        boardEl.appendChild(cell);
    });

    renderPlayerHUD();
    renderPlayerTokens();
    updateUI();
}

// 9. RENDER DANH SÁCH BẢNG TÀI CHÍNH NGƯỜI CHƠI (HUD)
function renderPlayerHUD() {
    const hudContainer = document.getElementById("playersHudList");
    if (!hudContainer) return;
    hudContainer.innerHTML = "";

    hudContainer.style.gridTemplateColumns = `repeat(${Math.min(gameState.players.length, 4)}, 1fr)`;

    gameState.players.forEach((player, idx) => {
        const card = document.createElement("div");
        card.className = `player-hud-card ${idx === gameState.currentTurnIndex ? 'active-turn' : ''} ${player.isBankrupt ? 'is-bankrupt' : ''}`;
        card.id = `playerCard-${player.id}`;

        // Thẻ Ân Xá Badge
        const jailCardBadge = player.jailCardsCount > 0 ? `<span class="badge-jail-card" title="Có ${player.jailCardsCount} Thẻ Ân Xá">🎫 x${player.jailCardsCount}</span>` : "";
        // Đóng băng badge
        const freezeBadge = player.frozenTurns > 0 ? `<span class="badge-freeze" title="Bị tạm dừng đi ${player.frozenTurns} lượt">❄️ ${player.frozenTurns}L</span>` : "";

        card.innerHTML = `
            <div class="player-hud-avatar-wrap" style="background:${player.bg}; border: 2px solid ${player.color};">
                <span class="player-avatar-icon">${player.icon}</span>
            </div>
            <div class="player-hud-info">
                <div class="player-name-row">
                    <span class="player-name" id="hudName-${player.id}" style="color:${player.color};">${player.name}</span>
                    <button class="player-name-edit-btn" type="button" title="Đổi tên người chơi" onclick="promptChangePlayerName('${player.id}')">✏️</button>
                    ${player.isAi ? '<span class="player-ai-tag">AI</span>' : ''}
                    ${jailCardBadge}
                    ${freezeBadge}
                </div>
                <div class="player-score-row">
                    <span class="player-score" id="score-${player.id}">${Number(player.cash).toLocaleString()}</span>
                    <span class="score-unit">M VNĐ</span>
                </div>
                <div class="player-stats-mini">
                    <span id="propsCount-${player.id}">🏛️ ${player.props.length} BĐS</span>
                    <span>•</span>
                    <span id="netWorth-${player.id}">Tổng: ${Number(calculateNetWorth(player)).toLocaleString()}M</span>
                </div>
            </div>
        `;
        hudContainer.appendChild(card);
    });
}

// 10. RENDER QUÂN CỜ TRÊN CÁC Ô BÀN CỜ
function renderPlayerTokens() {
    VIETNAM_TILES.forEach(tile => {
        const wrap = document.getElementById(`tokens-wrap-${tile.id}`);
        if (wrap) wrap.innerHTML = "";
    });

    gameState.players.forEach((player, idx) => {
        if (player.isBankrupt) return;
        const wrap = document.getElementById(`tokens-wrap-${player.position}`);
        if (!wrap) return;

        const token = document.createElement("div");
        token.className = `token-pin token-p${idx}`;
        token.style.background = player.color;
        token.style.boxShadow = `0 2px 6px ${player.glow}`;
        token.textContent = player.icon;
        token.title = `${player.name} (${player.cash}M)`;

        wrap.appendChild(token);
    });
}

function calculateNetWorth(player) {
    let net = player.cash;
    player.props.forEach(propId => {
        const t = VIETNAM_TILES.find(item => item.id === propId);
        if (t) {
            net += t.price;
            net += t.level * t.upgradeCost;
        }
    });
    return net;
}

function adjustBrightness(hex, percent) {
    if (!hex || hex.length < 6) return "#1d4ed8";
    let num = parseInt(hex.replace("#", ""), 16);
    let amt = Math.round(2.55 * percent);
    let R = (num >> 16) + amt;
    let G = (num >> 8 & 0x00FF) + amt;
    let B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// 11. CẬP NHẬT GIAO DIỆN CHÍNH (HUD & STATS)
function updateUI() {
    const current = gameState.players[gameState.currentTurnIndex] || gameState.players[0];

    gameState.players.forEach((player, idx) => {
        const scoreEl = document.getElementById(`score-${player.id}`);
        const propsEl = document.getElementById(`propsCount-${player.id}`);
        const netEl = document.getElementById(`netWorth-${player.id}`);
        const cardEl = document.getElementById(`playerCard-${player.id}`);
        const nameEl = document.getElementById(`hudName-${player.id}`);

        if (nameEl) nameEl.textContent = player.name;
        if (scoreEl) scoreEl.textContent = Number(player.cash).toLocaleString();
        if (propsEl) propsEl.textContent = `🏛️ ${player.props.length} BĐS`;
        if (netEl) netEl.textContent = `Tổng: ${Number(calculateNetWorth(player)).toLocaleString()}M`;

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

    const turnTextEl = document.getElementById("turnStatusText");
    const turnDotEl = document.getElementById("turnDot");
    if (turnTextEl && current) {
        turnTextEl.textContent = `Lượt: ${current.name} (${current.icon}) ${current.isAi ? '[Máy]' : ''}`;
    }
    if (turnDotEl && current) {
        turnDotEl.style.background = current.color;
    }

    const poolEl = document.getElementById("parkingPoolDisplay");
    if (poolEl) poolEl.textContent = `${Number(gameState.parkingPool).toLocaleString()}M`;

    // Cập nhật Sổ đỏ và công trình nhà thật trên 36 ô
    VIETNAM_TILES.forEach(tile => {
        const ownerEl = document.getElementById(`owner-badge-${tile.id}`);
        const estateEl = document.getElementById(`estate-${tile.id}`);
        if (!ownerEl || !estateEl) return;

        if (tile.owner) {
            const ownerObj = gameState.players.find(p => p.id === tile.owner);
            if (ownerObj) {
                ownerEl.textContent = ownerObj.name;
                ownerEl.style.background = ownerObj.color;
                ownerEl.style.display = "block";
            }

            // HIỂN THỊ NGÔI NHÀ THẬT
            if (tile.level === 1) {
                estateEl.innerHTML = '<span class="mini-house-token" title="1 Nhà Phố">🏠</span>';
                estateEl.style.display = "flex";
            } else if (tile.level === 2) {
                estateEl.innerHTML = '<span class="mini-house-token" title="2 Nhà Phố">🏠</span><span class="mini-house-token" title="2 Nhà Phố">🏠</span>';
                estateEl.style.display = "flex";
            } else if (tile.level >= 3) {
                estateEl.innerHTML = '<span class="mini-hotel-token" title="Khách Sạn Cao Cấp">🏨</span>';
                estateEl.style.display = "flex";
            } else {
                estateEl.innerHTML = '';
                estateEl.style.display = "none";
            }
        } else {
            ownerEl.style.display = "none";
            estateEl.innerHTML = '';
            estateEl.style.display = "none";
        }
    });

    // Cập nhật nút tung xúc xắc đôi theo người chơi
    const rollBtn = document.getElementById("rollDiceBtn");
    const rollBtnText = document.getElementById("rollBtnText");
    const rollBtnIcon = document.getElementById("rollBtnIcon");
    if (rollBtn && current) {
        rollBtn.disabled = gameState.isRolling || current.isAi;
        rollBtn.style.setProperty("--active-roll-gradient", `linear-gradient(135deg, ${current.color}, ${adjustBrightness(current.color, -25)})`);
        rollBtn.style.setProperty("--active-roll-glow", current.glow);

        if (rollBtnText) {
            if (current.isAi) {
                rollBtnText.textContent = `🤖 ${current.name} Đang Đổ Xúc Xắc...`;
            } else {
                rollBtnText.textContent = `${current.name} Tung Xúc Xắc Đôi (${current.icon})`;
            }
        }
        if (rollBtnIcon) {
            rollBtnIcon.textContent = "🎲🎲";
        }
    }
}

// 12. HÀM TUNG XÚC XẮC ĐÔI 3D (DOUBLE DICE ROLLING)
function roll3DDice(callback) {
    const diceCube1 = document.getElementById("diceCube1");
    const diceCube2 = document.getElementById("diceCube2");

    soundEffects.diceRoll();

    const faceRotations = {
        1: { x: 0, y: 0 },
        2: { x: 0, y: -90 },
        3: { x: 0, y: -180 },
        4: { x: 0, y: 90 },
        5: { x: -90, y: 0 },
        6: { x: 90, y: 0 }
    };

    const val1 = Math.floor(Math.random() * 6) + 1;
    const val2 = Math.floor(Math.random() * 6) + 1;
    const isDouble = val1 === val2;
    const sum = val1 + val2;

    if (diceCube1) {
        const rot1 = faceRotations[val1] || { x: 0, y: 0 };
        const extraX1 = (3 + Math.floor(Math.random() * 3)) * 360;
        const extraY1 = (3 + Math.floor(Math.random() * 3)) * 360;
        diceCube1.style.transition = "transform 1.1s cubic-bezier(0.15, 0.9, 0.25, 1)";
        diceCube1.style.transform = `rotateX(${rot1.x + extraX1}deg) rotateY(${rot1.y + extraY1}deg)`;
    }

    if (diceCube2) {
        const rot2 = faceRotations[val2] || { x: 0, y: 0 };
        const extraX2 = (3 + Math.floor(Math.random() * 3)) * 360;
        const extraY2 = (3 + Math.floor(Math.random() * 3)) * 360;
        diceCube2.style.transition = "transform 1.1s cubic-bezier(0.15, 0.9, 0.25, 1)";
        diceCube2.style.transform = `rotateX(${rot2.x + extraX2}deg) rotateY(${rot2.y + extraY2}deg)`;
    }

    const s1 = document.getElementById("diceShadowSpot1");
    const s2 = document.getElementById("diceShadowSpot2");
    [s1, s2].forEach(s => {
        if (s) {
            s.style.transform = "scale(0.55)";
            s.style.opacity = "0.35";
            setTimeout(() => {
                s.style.transform = "scale(1)";
                s.style.opacity = "1";
            }, 1100);
        }
    });

    setTimeout(() => {
        if (callback) callback({ d1: val1, d2: val2, sum, isDouble });
    }, 1150);
}

// 13. HÀM TUNG XÚC XẮC CHÍNH (HANDLE ROLL DICE)
function handleRollDice() {
    if (gameState.isRolling) return;

    const player = gameState.players[gameState.currentTurnIndex];
    if (!player || player.isBankrupt) {
        finishTurn();
        return;
    }

    // Kiểm tra đóng băng (frozen turns)
    if (player.frozenTurns > 0) {
        player.frozenTurns--;
        showStatusNotice(`❄️ <strong>${player.name}</strong> bị dừng di chuyển (còn ${player.frozenTurns} lượt đóng băng)!`);
        renderPlayerHUD();
        setTimeout(() => finishTurn(), 1400);
        return;
    }

    // Nếu đang ở trong tù
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
        rollStatus.textContent = `${player.name} đang tung cặp xúc xắc đôi...`;
    }

    roll3DDice((rollRes) => {
        const { d1, d2, sum, isDouble } = rollRes;

        let doubleMsg = "";
        if (isDouble) {
            doubleMsg = " <strong>[CẶP ĐÔI! ĐƯỢC TUNG THÊM 1 LƯỢT]</strong>";
            soundEffects.cashChime();
        }

        if (rollStatus) {
            rollStatus.innerHTML = `🎲🎲 <strong>${player.name}</strong> đổ được <strong>${d1} + ${d2} = ${sum} bước</strong>!${doubleMsg}`;
        }

        movePlayerStepByStep(player, sum, () => {
            gameState.isRolling = false;
            handleTileAction(player, player.position, sum, isDouble);
        });
    });
}

// 14. DI CHUYỂN QUÂN CỜ TỪNG BƯỚC MƯỢT MÀ
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

        // Thưởng 200M khi đi qua ô Khởi Hành
        if (player.position === 0) {
            soundEffects.cashChime();
            player.cash += 200;
            visualFX.spawnFloatingMoney(0, "+200M", true);
            showStatusNotice(`🚩 <strong>${player.name}</strong> hoàn thành một vòng bản đồ Việt Nam, nhận trợ cấp <strong>+200M VNĐ</strong>!`);
            recordTransaction({
                type: 'salary',
                from: 'Ngân Hàng',
                to: player.name,
                amount: 200,
                title: 'Trợ cấp vòng quay (GO)',
                desc: `${player.name} đi qua Ga Hà Nội nhận 200M trợ cấp`,
                icon: '🚩'
            });
            updateUI();
        }

        setTimeout(nextStep, 220);
    }

    nextStep();
}

// 15. XỬ LÝ SỰ KIỆN KHI ĐÁP XUỐNG TỪNG Ô (TILE ACTIONS)
function handleTileAction(player, tileId, diceRollValue = 2, rolledDouble = false) {
    const tile = VIETNAM_TILES[tileId];
    if (!tile) return;

    // Lưu cờ tung thêm lượt nếu lắc được xúc xắc đôi
    gameState.rolledDoubleTurn = rolledDouble;

    // 1. Ô BẤT ĐỘNG SẢN & GIAO THÔNG (PROPERTY / TRANSPORT)
    if (tile.type === "property" || tile.type === "transport") {
        if (!tile.owner) {
            promptBuyProperty(player, tile);
        } else if (tile.owner === player.id) {
            if (tile.level < 3) {
                promptUpgradeProperty(player, tile);
            } else {
                showStatusNotice(`🏨 <strong>${player.name}</strong> nghỉ chân tại Khách Sạn của chính mình tại ${tile.name}.`);
                finishTurn();
            }
        } else {
            handlePayRent(player, tile);
        }
        return;
    }

    // 2. Ô DỊCH VỤ CÔNG (UTILITY: ĐIỆN / NƯỚC)
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
            showStatusNotice(`⚡ <strong>${player.name}</strong> nộp phí dịch vụ <strong>${bill}M VNĐ</strong> cho ${ownerObj ? ownerObj.name : 'Chủ nhà máy'}!`);

            recordTransaction({
                type: 'rent',
                from: player.name,
                to: ownerObj ? ownerObj.name : 'Chủ nhà máy',
                amount: bill,
                title: `Phí tiện ích ${tile.name}`,
                desc: `${player.name} trả ${bill}M tiền điện/nước cho ${ownerObj ? ownerObj.name : 'Chủ'}`,
                icon: '⚡'
            });

            updateUI();
            checkBankruptcy(player, () => finishTurn());
        } else {
            showStatusNotice(`💧 <strong>${player.name}</strong> ghé thăm nhà máy của mình.`);
            finishTurn();
        }
        return;
    }

    // 3. Ô VÀO TÙ (GO TO JAIL 🚔)
    if (tile.type === "go_to_jail") {
        visualFX.triggerPoliceSiren();
        showStatusNotice(`🚔 <strong>${player.name}</strong> bị áp giải thẳng vào Nhà Tù!`);
        player.position = 27; // Vị trí Nhà Tù góc dưới-trái
        player.inJail = true;
        player.jailTurns = 0;
        gameState.rolledDoubleTurn = false; // Mất lượt tung thêm nếu bị vào tù
        renderPlayerTokens();
        updateUI();
        setTimeout(() => finishTurn(), 1400);
        return;
    }

    // 4. Ô NHÀ TÙ (JAIL ⛓️ - THĂM TÙ)
    if (tile.type === "jail") {
        showStatusNotice(`⛓️ <strong>${player.name}</strong> ghé thăm phạm nhân tại Nhà Tù (Thăm tù an toàn).`);
        finishTurn();
        return;
    }

    // 5. Ô BÃI ĐỖ XE MIỄN PHÍ (PARKING 🅿️)
    if (tile.type === "parking") {
        const jackpot = gameState.parkingPool;
        if (jackpot > 0) {
            soundEffects.jackpotWin();
            visualFX.spawnFloatingMoney(tileId, `+${jackpot}M`, true);
            player.cash += jackpot;
            gameState.parkingPool = 0;
            showStatusNotice(`🎉 <strong>${player.name}</strong> dừng chân tại Bãi Đỗ Xe và <strong>ĂN TRỌN HŨ THƯỞNG ${jackpot}M VNĐ</strong>!`);

            recordTransaction({
                type: 'jackpot',
                from: 'Hũ Bãi Đỗ Xe',
                to: player.name,
                amount: jackpot,
                title: 'Trúng Hũ Bãi Đỗ Xe',
                desc: `${player.name} dừng chân tại Bãi Đỗ Xe và nhận toàn bộ ${jackpot}M trong hũ`,
                icon: '🅿️'
            });

            updateUI();
        } else {
            showStatusNotice(`🅿️ <strong>${player.name}</strong> nghỉ ngơi tại Bãi Đỗ Xe Miễn Phí.`);
        }
        finishTurn();
        return;
    }

    // 6. Ô THUẾ THU NHẬP & THUẾ XA XỈ (TAX 💰 / 💎)
    if (tile.type === "tax") {
        const taxAmount = tile.price || 100;
        soundEffects.payRent();
        player.cash -= taxAmount;
        gameState.parkingPool += taxAmount;
        visualFX.spawnFloatingMoney(tileId, `-${taxAmount}M`, false);
        showStatusNotice(`💰 <strong>${player.name}</strong> nộp <strong>${taxAmount}M VNĐ</strong> Thuế vào Hũ Bãi Đỗ Xe!`);

        recordTransaction({
            type: 'tax',
            from: player.name,
            to: 'Hũ Bãi Đỗ Xe',
            amount: taxAmount,
            title: tile.name,
            desc: `${player.name} nộp ${taxAmount}M vào hũ tiền thưởng`,
            icon: '💰'
        });

        updateUI();
        checkBankruptcy(player, () => finishTurn());
        return;
    }

    // 7. Ô CƠ HỘI (❓)
    if (tile.type === "chance") {
        drawCardAction(player, "chance");
        return;
    }

    // 8. Ô THỬ THÁCH (⚡)
    if (tile.type === "challenge") {
        drawCardAction(player, "challenge");
        return;
    }

    // 9. Ô KHỞI HÀNH (START)
    finishTurn();
}

// 16. TRẢ TIỀN THUÊ ĐẤT VÀ HIỆN THÔNG BÁO MINH BẠCH (RENT PAYMENT MODAL)
function handlePayRent(player, tile) {
    const ownerObj = gameState.players.find(p => p.id === tile.owner);
    const rentAmount = tile.rent[tile.level] || tile.rent[0];

    soundEffects.payRent();
    player.cash -= rentAmount;
    if (ownerObj) ownerObj.cash += rentAmount;

    visualFX.spawnFloatingMoney(tile.id, `-${rentAmount}M`, false);

    const estateName = tile.level === 0 ? "Đất Trống" : tile.level === 1 ? "🏠 1 Nhà Phố" : tile.level === 2 ? "🏠🏠 2 Nhà Phố" : "🏨 Khách Sạn Cao Cấp";

    // Ghi nhận vào lịch sử giao dịch
    recordTransaction({
        type: 'rent',
        from: player.name,
        to: ownerObj ? ownerObj.name : 'Chủ đất',
        amount: rentAmount,
        title: `Tiền thuê ${tile.name}`,
        desc: `${player.name} trả ${rentAmount}M cho ${ownerObj ? ownerObj.name : 'Chủ đất'} (${estateName})`,
        icon: '💸'
    });

    // Mở modal thông báo nộp tiền thuê đất
    openRentModal(player, ownerObj, tile, rentAmount, estateName);
}

function openRentModal(player, ownerObj, tile, rentAmount, estateName) {
    const modal = document.getElementById("modalRentNotice");
    if (!modal) {
        checkBankruptcy(player, () => finishTurn());
        return;
    }

    const propDisplay = document.getElementById("rentPropertyDisplay");
    if (propDisplay) {
        propDisplay.innerHTML = `
            <div class="rent-prop-name">${tile.icon} ${tile.name} (${tile.regionName})</div>
            <div class="rent-prop-level">Công trình: <strong>${estateName}</strong></div>
            <div class="rent-prop-amount">-${rentAmount}M VNĐ</div>
        `;
    }

    const pName = document.getElementById("rentPayerName");
    const pDiff = document.getElementById("rentPayerDiff");
    if (pName) pName.textContent = player.name;
    if (pDiff) pDiff.textContent = `-${rentAmount}M`;

    const rName = document.getElementById("rentReceiverName");
    const rDiff = document.getElementById("rentReceiverDiff");
    if (rName) rName.textContent = ownerObj ? ownerObj.name : "Chủ đất";
    if (rDiff) rDiff.textContent = `+${rentAmount}M`;

    modal.classList.add("active");

    const btnConfirm = document.getElementById("btnConfirmPayRent");
    if (btnConfirm) {
        btnConfirm.onclick = () => {
            closeModal("modalRentNotice");
            updateUI();
            checkBankruptcy(player, () => finishTurn());
        };
    }

    // Nếu là AI tự đóng sau 1.5s
    if (player.isAi) {
        setTimeout(() => {
            closeModal("modalRentNotice");
            updateUI();
            checkBankruptcy(player, () => finishTurn());
        }, 1500);
    }
}

// 17. HỎI MUA BẤT ĐỘNG SẢN (PROMPT BUY PROPERTY)
function promptBuyProperty(player, tile) {
    gameState.pendingPropertyTile = tile;

    if (player.isAi) {
        if (player.cash >= tile.price * 1.25) {
            confirmBuyProperty(player, tile);
        } else {
            showStatusNotice(`🤖 <strong>${player.name}</strong> bỏ qua cơ hội mua ${tile.name}.`);
            finishTurn();
        }
        return;
    }

    const modal = document.getElementById("modalBuyProperty");
    if (!modal) return;

    document.getElementById("buyPropTitle").textContent = tile.name;
    document.getElementById("buyPropSubtitle").textContent = tile.subtitle;
    document.getElementById("buyPropEmoji").textContent = tile.icon;
    document.getElementById("buyPropDesc").textContent = tile.desc;
    document.getElementById("buyModalRegion").textContent = tile.regionName.toUpperCase();
    document.getElementById("buyCostLabel").textContent = "Giá mua đất:";
    document.getElementById("buyPropCost").textContent = `${tile.price}M VNĐ`;
    document.getElementById("buyPropRent").textContent = `${tile.rent[0]}M VNĐ`;

    document.getElementById("lvl1Rent").textContent = `${tile.rent[1]}M`;
    document.getElementById("lvl2Rent").textContent = `${tile.rent[2]}M`;
    document.getElementById("lvl3Rent").textContent = `${tile.rent[3]}M`;

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

function confirmBuyProperty(player, tile) {
    if (player.cash < tile.price) return;

    soundEffects.cashChime();
    player.cash -= tile.price;
    tile.owner = player.id;
    tile.level = 0; // Khởi đầu là đất trống
    player.props.push(tile.id);

    visualFX.spawnFloatingMoney(tile.id, `-${tile.price}M`, false);
    showStatusNotice(`🏠 <strong>${player.name}</strong> đã mua thành công <strong>${tile.name}</strong> (${tile.price}M VNĐ)!`);

    recordTransaction({
        type: 'buy',
        from: player.name,
        to: 'Ngân Hàng',
        amount: tile.price,
        title: `Mua đất ${tile.name}`,
        desc: `${player.name} mua quyền sở hữu đất ${tile.name} với giá ${tile.price}M`,
        icon: '🏠'
    });

    closeModal("modalBuyProperty");
    updateUI();
    finishTurn();
}

// 18. NÂNG CẤP XÂY NHÀ & KHÁCH SẠN (UPGRADE PROPERTY)
function promptUpgradeProperty(player, tile) {
    if (tile.level >= 3) {
        finishTurn();
        return;
    }

    const nextLevel = tile.level + 1;
    const upgradePrice = tile.upgradeCost;
    gameState.pendingPropertyTile = tile;

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

    const levelNames = ["", "1 Nhà Phố 🏠", "2 Nhà Phố 🏠🏠", "Khách Sạn Cao Cấp 🏨"];
    document.getElementById("buyPropTitle").textContent = `${tile.name} (Xây Thêm)`;
    document.getElementById("buyPropSubtitle").textContent = `Nâng lên ${levelNames[nextLevel]}`;
    document.getElementById("buyPropEmoji").textContent = nextLevel === 2 ? "🏠🏠" : "🏨";
    document.getElementById("buyPropDesc").textContent = `Xây thêm công trình để tăng mạnh tiền thuê đất khi đối thủ dừng chân!`;
    document.getElementById("buyModalRegion").textContent = tile.regionName.toUpperCase();
    document.getElementById("buyCostLabel").textContent = "Chi phí xây dựng:";
    document.getElementById("buyPropCost").textContent = `${upgradePrice}M VNĐ`;
    document.getElementById("buyPropRent").textContent = `${tile.rent[nextLevel]}M VNĐ`;

    document.getElementById("lvlStep1").className = `level-step-card ${nextLevel === 1 ? 'current' : ''}`;
    document.getElementById("lvlStep2").className = `level-step-card ${nextLevel === 2 ? 'current' : ''}`;
    document.getElementById("lvlStep3").className = `level-step-card ${nextLevel === 3 ? 'current' : ''}`;

    const btnConfirm = document.getElementById("btnConfirmBuy");
    if (player.cash < upgradePrice) {
        btnConfirm.disabled = true;
        btnConfirm.textContent = `Không đủ tiền (-${upgradePrice}M)`;
    } else {
        btnConfirm.disabled = false;
        btnConfirm.textContent = `Xây ngay (-${upgradePrice}M)`;
    }

    modal.classList.add("active");
}

function confirmUpgradeProperty(player, tile) {
    if (player.cash < tile.upgradeCost) return;

    soundEffects.cashChime();
    player.cash -= tile.upgradeCost;
    tile.level += 1;

    const levelIcon = tile.level === 1 ? "1 Nhà Phố 🏠" : tile.level === 2 ? "2 Nhà Phố 🏠🏠" : "Khách Sạn Cao Cấp 🏨";
    visualFX.spawnFloatingMoney(tile.id, `-${tile.upgradeCost}M`, false);
    showStatusNotice(`✨ <strong>${player.name}</strong> đã nâng cấp <strong>${tile.name}</strong> lên <strong>${levelIcon}</strong>!`);

    recordTransaction({
        type: 'upgrade',
        from: player.name,
        to: 'Ngân Hàng',
        amount: tile.upgradeCost,
        title: `Xây ${levelIcon}`,
        desc: `${player.name} nâng cấp ${tile.name} lên ${levelIcon} chi phí ${tile.upgradeCost}M`,
        icon: '🏗️'
    });

    closeModal("modalBuyProperty");
    updateUI();
    finishTurn();
}

// 19. RÚT THẺ CƠ HỘI / THỬ THÁCH VỚI HOẠT ẢNH 3D FLIP (ZERO CONFETTI LAG)
function drawCardAction(player, cardType) {
    const isChance = cardType === "chance";
    const deck = isChance ? CHANCE_CARDS : CHALLENGE_CARDS;
    const card = deck[Math.floor(Math.random() * deck.length)];

    gameState.pendingCardAction = { player, card, cardType };

    const modal = document.getElementById("modalLoveCard");
    const flipper = document.getElementById("cardDrawFlipper");
    const backFace = document.getElementById("cardFaceBack");
    if (!modal || !flipper || !backFace) {
        applyCardEffect(player, card, cardType);
        finishTurn();
        return;
    }

    // Thiết lập phong cách mặt úp 3D
    if (isChance) {
        backFace.className = "card-side card-back card-theme-chance";
        document.getElementById("cardBackEmblem").textContent = "❓";
        document.getElementById("cardBackTitle").textContent = "THẺ CƠ HỘI";
        document.getElementById("chanceTypeTag").textContent = "THẺ CƠ HỘI";
        document.getElementById("chanceTypeTag").style.color = "#d97706";
        document.getElementById("chanceIcon").textContent = "❓";
    } else {
        backFace.className = "card-side card-back card-theme-challenge";
        document.getElementById("cardBackEmblem").textContent = "⚡";
        document.getElementById("cardBackTitle").textContent = "THẺ THỬ THÁCH";
        document.getElementById("chanceTypeTag").textContent = "THẺ THỬ THÁCH";
        document.getElementById("chanceTypeTag").style.color = "#ea580c";
        document.getElementById("chanceIcon").textContent = "⚡";
    }

    // Thiết lập nội dung mặt ngửa
    document.getElementById("loveCardTitle").textContent = card.title;
    document.getElementById("loveCardContent").textContent = card.desc;
    const rewardEl = document.getElementById("loveCardReward");
    if (rewardEl) {
        rewardEl.textContent = card.rewardText;
        rewardEl.className = `love-card-reward ${card.isNegative ? 'negative' : ''}`;
    }

    // Mở modal dạng úp
    flipper.classList.remove("is-flipped");
    modal.classList.add("active");

    // Lật 180 độ sau 250ms
    setTimeout(() => {
        flipper.classList.add("is-flipped");
        soundEffects.playTone(isChance ? 659.25 : 329.63, 'triangle', 0.2);
    }, 250);

    const btnAccept = document.getElementById("btnAcceptLoveCard");
    if (btnAccept) {
        if (card.type === "free_jail") {
            btnAccept.textContent = "Cất Vào Kho Hành Lý 🎫";
        } else {
            btnAccept.textContent = "Chấp Nhận & Tiếp Tục ✨";
        }
    }

    if (player.isAi) {
        setTimeout(() => {
            closeModal("modalLoveCard");
            applyCardEffect(player, card, cardType);
            finishTurn();
        }, 1900);
    }
}

function applyCardEffect(player, card, cardType) {
    if (card.type === "gain_cash") {
        soundEffects.cashChime();
        player.cash += card.amount;
        visualFX.spawnFloatingMoney(player.position, `+${card.amount}M`, true);
        showStatusNotice(`💵 <strong>${player.name}</strong> nhận được <strong>+${card.amount}M VNĐ</strong>!`);
        recordTransaction({
            type: 'chance',
            from: 'Ngân Hàng',
            to: player.name,
            amount: card.amount,
            title: card.title,
            desc: card.desc,
            icon: '💵'
        });
    } else if (card.type === "pay_parking") {
        soundEffects.payRent();
        player.cash -= card.amount;
        gameState.parkingPool += card.amount;
        visualFX.spawnFloatingMoney(player.position, `-${card.amount}M`, false);
        showStatusNotice(`💸 <strong>${player.name}</strong> nộp <strong>${card.amount}M VNĐ</strong> vào Hũ Bãi Đỗ Xe!`);
        recordTransaction({
            type: 'challenge',
            from: player.name,
            to: 'Hũ Bãi Đỗ Xe',
            amount: card.amount,
            title: card.title,
            desc: card.desc,
            icon: '💸'
        });
        checkBankruptcy(player);
    } else if (card.type === "free_jail") {
        player.jailCardsCount = (player.jailCardsCount || 0) + 1;
        showStatusNotice(`🎫 <strong>${player.name}</strong> nhận được <strong>Thẻ Ân Xá Ra Tù</strong>! Thẻ đã cất vào kho hành lý.`);
        recordTransaction({
            type: 'chance',
            from: 'Tòa Án',
            to: player.name,
            amount: null,
            title: 'Nhận Thẻ Ân Xá',
            desc: `${player.name} cất Thẻ Ân Xá vào kho`,
            icon: '🎫'
        });
        renderPlayerHUD();
    } else if (card.type === "advance_go") {
        player.position = 0;
        player.cash += 200;
        soundEffects.cashChime();
        renderPlayerTokens();
        visualFX.spawnFloatingMoney(0, "+200M", true);
        showStatusNotice(`🚩 <strong>${player.name}</strong> đi thẳng về Ga Hà Nội nhận <strong>+200M VNĐ</strong>!`);
        recordTransaction({
            type: 'chance',
            from: 'Ngân Hàng',
            to: player.name,
            amount: 200,
            title: 'Về Ga Hà Nội',
            desc: `${player.name} đi thẳng về Ga Hà Nội`,
            icon: '🚩'
        });
    } else if (card.type === "step_back") {
        const steps = card.steps || 3;
        showStatusNotice(`↩️ <strong>${player.name}</strong> phải lùi lại <strong>${steps} ô</strong>!`);
        player.position = (player.position - steps + VIETNAM_TILES.length) % VIETNAM_TILES.length;
        renderPlayerTokens();
        recordTransaction({
            type: 'challenge',
            from: player.name,
            to: 'Bàn Cờ',
            amount: null,
            title: card.title,
            desc: `${player.name} lùi lại ${steps} ô`,
            icon: '↩️'
        });
        setTimeout(() => {
            handleTileAction(player, player.position);
        }, 400);
        return;
    } else if (card.type === "freeze_turns") {
        player.frozenTurns = card.turns || 2;
        showStatusNotice(`❄️ <strong>${player.name}</strong> bị hỏng xe: Tạm dừng di chuyển trong <strong>${player.frozenTurns} lượt</strong>!`);
        recordTransaction({
            type: 'challenge',
            from: 'Sự Cố',
            to: player.name,
            amount: null,
            title: card.title,
            desc: `${player.name} bị dừng đi ${player.frozenTurns} lượt`,
            icon: '❄️'
        });
        renderPlayerHUD();
    } else if (card.type === "dividend_all") {
        let total = 0;
        gameState.players.forEach(p => {
            if (p.id !== player.id && !p.isBankrupt) {
                const take = Math.min(p.cash, card.amount || 30);
                p.cash -= take;
                total += take;
            }
        });
        player.cash += total;
        soundEffects.cashChime();
        showStatusNotice(`🎉 <strong>${player.name}</strong> nhận được tổng cộng <strong>+${total}M VNĐ</strong> từ bạn bè!`);
        recordTransaction({
            type: 'chance',
            from: 'Bạn Bè',
            to: player.name,
            amount: total,
            title: card.title,
            desc: `${player.name} nhận ${total}M từ mọi người`,
            icon: '🎉'
        });
    } else if (card.type === "pay_all") {
        const amt = card.amount || 40;
        let totalPaid = 0;
        gameState.players.forEach(p => {
            if (p.id !== player.id && !p.isBankrupt) {
                player.cash -= amt;
                p.cash += amt;
                totalPaid += amt;
            }
        });
        soundEffects.payRent();
        showStatusNotice(`💸 <strong>${player.name}</strong> đã chiêu đãi tất cả đối thủ tổng cộng <strong>${totalPaid}M VNĐ</strong>!`);
        recordTransaction({
            type: 'challenge',
            from: player.name,
            to: 'Mọi Người',
            amount: totalPaid,
            title: card.title,
            desc: `${player.name} đãi tiệc hết ${totalPaid}M`,
            icon: '🍽️'
        });
        checkBankruptcy(player);
    } else if (card.type === "property_bonus") {
        let bonus = 0;
        player.props.forEach(pId => {
            const t = VIETNAM_TILES.find(item => item.id === pId);
            if (t) {
                if (t.level === 1) bonus += card.houseBonus || 30;
                else if (t.level === 2) bonus += (card.houseBonus || 30) * 2;
                else if (t.level >= 3) bonus += card.hotelBonus || 60;
            }
        });
        player.cash += bonus;
        soundEffects.cashChime();
        showStatusNotice(`🏆 <strong>${player.name}</strong> nhận thưởng <strong>+${bonus}M VNĐ</strong> phát triển đô thị!`);
        recordTransaction({
            type: 'chance',
            from: 'Ngân Hàng',
            to: player.name,
            amount: bonus,
            title: card.title,
            desc: `Thưởng tài sản +${bonus}M`,
            icon: '🏆'
        });
    } else if (card.type === "property_repair") {
        let fee = 0;
        player.props.forEach(pId => {
            const t = VIETNAM_TILES.find(item => item.id === pId);
            if (t) {
                if (t.level === 1) fee += card.houseFee || 25;
                else if (t.level === 2) fee += (card.houseFee || 25) * 2;
                else if (t.level >= 3) fee += card.hotelFee || 50;
            }
        });
        player.cash -= fee;
        gameState.parkingPool += fee;
        soundEffects.payRent();
        showStatusNotice(`🔧 <strong>${player.name}</strong> nộp <strong>${fee}M VNĐ</strong> phí sửa chữa nhà cửa vào Hũ!`);
        recordTransaction({
            type: 'challenge',
            from: player.name,
            to: 'Hũ Bãi Đỗ Xe',
            amount: fee,
            title: card.title,
            desc: `Sửa chữa BĐS -${fee}M`,
            icon: '🔧'
        });
        checkBankruptcy(player);
    } else if (card.type === "fly_anywhere") {
        openAirportModal(player);
        return;
    }

    updateUI();
}

// 20. XỬ LÝ NHÀ TÙ & BẢO LÃNH & THẺ ÂN XÁ
function openJailModal() {
    const player = gameState.players[gameState.currentTurnIndex];
    const modal = document.getElementById("modalJail");
    if (!modal) return;

    document.getElementById("jailTitle").textContent = `${player.name} Đang Ở Trong Tù!`;
    document.getElementById("jailDesc").textContent = `Bạn đã thụ án được ${player.jailTurns} lượt. Lựa chọn cách xử lý để ra tù:`;

    // Nút Dùng Thẻ Ân Xá
    const btnCard = document.getElementById("btnUseJailCard");
    if (btnCard) {
        if (player.jailCardsCount > 0) {
            btnCard.style.display = "block";
            btnCard.innerHTML = `<span>🎫 Dùng <strong>Thẻ Ân Xá Ra Tù</strong> (Còn ${player.jailCardsCount} thẻ) - Tự Do Ngay!</span>`;
            btnCard.onclick = () => handleUseJailCard(player);
        } else {
            btnCard.style.display = "none";
        }
    }

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

function handleUseJailCard(player) {
    if (!player) player = gameState.players[gameState.turnIndex];
    if (!player || player.jailCardsCount <= 0) return;
    player.jailCardsCount--;
    player.inJail = false;
    player.jailTurns = 0;

    closeModal("modalJail");
    soundEffects.cashChime();
    showStatusNotice(`🕊️ <strong>${player.name}</strong> đã dùng <strong>Thẻ Ân Xá</strong> và được trả tự do ngay lập tức! Hãy tung xúc xắc.`);

    recordTransaction({
        type: 'chance',
        from: player.name,
        to: 'Tòa Án',
        amount: null,
        title: 'Dùng Thẻ Ân Xá Ra Tù',
        desc: `${player.name} dùng thẻ ân xá để thoát khỏi nhà tù`,
        icon: '🕊️'
    });

    renderPlayerHUD();
    updateUI();
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

    recordTransaction({
        type: 'tax',
        from: player.name,
        to: 'Hũ Bãi Đỗ Xe',
        amount: 50,
        title: 'Tiền bảo lãnh ra tù',
        desc: `${player.name} nộp 50M tiền bảo lãnh`,
        icon: '💵'
    });

    updateUI();
}

function handleTryRollJail() {
    const player = gameState.players[gameState.currentTurnIndex];
    closeModal("modalJail");

    gameState.isRolling = true;
    updateUI();

    roll3DDice((rollRes) => {
        gameState.isRolling = false;
        const { d1, d2, sum, isDouble } = rollRes;

        if (isDouble) {
            player.inJail = false;
            player.jailTurns = 0;
            soundEffects.cashChime();
            showStatusNotice(`🎉 <strong>${player.name}</strong> đổ được <strong>cặp đôi (${d1} - ${d2})</strong> và <strong>ĐÃ ĐƯỢC THẢ TỰ DO</strong>!`);
            movePlayerStepByStep(player, sum, () => {
                handleTileAction(player, player.position, sum, false);
            });
        } else {
            player.jailTurns += 1;
            soundEffects.jailLock();
            if (player.jailTurns >= 3) {
                player.cash -= 50;
                gameState.parkingPool += 50;
                player.inJail = false;
                player.jailTurns = 0;
                showStatusNotice(`⏳ <strong>${player.name}</strong> hết hạn tạm giam 3 lượt, tự động trừ 50M bảo lãnh và ra tù!`);
                finishTurn();
            } else {
                showStatusNotice(`❌ <strong>${player.name}</strong> đổ được ${d1} - ${d2} (Không phải cặp đôi). Chưa thoát khỏi nhà tù!`);
                finishTurn();
            }
        }
        updateUI();
    });
}

function handleAiJailTurn(player) {
    if (player.jailCardsCount > 0) {
        handleUseJailCard(player);
        setTimeout(() => handleRollDice(), 1000);
        return;
    }
    if (player.cash >= 200) {
        handlePayBail();
        setTimeout(() => handleRollDice(), 1000);
    } else {
        handleTryRollJail();
    }
}

// 21. SÂN BAY QUỐC TẾ (BAY TỐC HÀNH)
function openAirportModal(player) {
    const modal = document.getElementById("modalAirportFlight");
    if (!modal) return;

    const select = document.getElementById("airportDestSelect");
    if (select) {
        select.innerHTML = "";
        VIETNAM_TILES.forEach(t => {
            if (t.id !== player.position) {
                const opt = document.createElement("option");
                opt.value = t.id;
                opt.textContent = `${t.icon} ${t.name} (${t.regionName}) - ${t.price > 0 ? t.price + 'M' : t.subtitle}`;
                select.appendChild(opt);
            }
        });
    }

    if (player.isAi) {
        const unowned = VIETNAM_TILES.filter(t => (t.type === 'property' || t.type === 'transport') && !t.owner && player.cash >= t.price + 50);
        if (unowned.length > 0 && player.cash >= 100) {
            const pick = unowned[Math.floor(Math.random() * unowned.length)];
            confirmAirportFly(player, pick.id);
        } else {
            finishTurn();
        }
        return;
    }

    modal.classList.add("active");
}

function confirmAirportFly(player, targetTileId = null) {
    const destId = targetTileId !== null ? targetTileId : parseInt(document.getElementById("airportDestSelect").value);
    const destTile = VIETNAM_TILES.find(t => t.id === destId);
    if (!destTile) return;

    soundEffects.flightWhoosh();
    closeModal("modalAirportFlight");

    player.position = destId;
    renderPlayerTokens();
    showStatusNotice(`✈️ <strong>${player.name}</strong> đã đáp chuyến bay tốc hành đến <strong>${destTile.name}</strong>!`);
    updateUI();

    setTimeout(() => {
        handleTileAction(player, destId);
    }, 500);
}

// 22. SOI CHI TIẾT SỔ ĐỎ BẤT ĐỘNG SẢN (TITLE DEED INSPECTOR)
function inspectTileTitleDeed(tileId) {
    const tile = VIETNAM_TILES.find(t => t.id === tileId);
    if (!tile) return;

    const modal = document.getElementById("modalPostcardInspector");
    if (!modal) return;

    document.getElementById("inspectTitle").textContent = tile.name;
    document.getElementById("inspectSubtitle").textContent = tile.subtitle;
    document.getElementById("inspectDesc").textContent = tile.desc;

    const rentTable = document.querySelector(".inspect-rent-table");
    const ownerBox = document.getElementById("inspectOwnerBox");
    const btnUpgrade = document.getElementById("btnInspectUpgrade");

    if (tile.type === "property" || tile.type === "transport" || tile.type === "utility") {
        if (rentTable) {
            rentTable.style.display = "flex";
            document.getElementById("inspectRentL1").textContent = `${tile.rent[1] || tile.rent[0]}M`;
            document.getElementById("inspectRentL2").textContent = `${tile.rent[2] || tile.rent[0]}M`;
            document.getElementById("inspectRentL3").textContent = `${tile.rent[3] || tile.rent[0]}M`;
        }

        if (tile.owner) {
            const ownerObj = gameState.players.find(p => p.id === tile.owner);
            const ownerName = ownerObj ? ownerObj.name : "Người chơi";
            const ownerColor = ownerObj ? ownerObj.color : "#2563eb";
            const houseModelStr = tile.level === 0 ? 'Đất trống' : tile.level === 1 ? '🏠 1 Nhà Phố' : tile.level === 2 ? '🏠🏠 2 Nhà Phố' : '🏨 Khách Sạn Cao Cấp';
            ownerBox.innerHTML = `Chủ sở hữu: <strong style="color:${ownerColor};">${ownerName}</strong> (${houseModelStr})`;

            const current = gameState.players[gameState.currentTurnIndex];
            if (tile.owner === current.id && tile.level < 3 && !gameState.isRolling && !current.isAi) {
                btnUpgrade.style.display = "inline-block";
                btnUpgrade.textContent = tile.level === 0 ? `Xây Nhà Phố (+${tile.upgradeCost}M)` : tile.level === 1 ? `Xây thêm Nhà thứ 2 (+${tile.upgradeCost}M)` : `Xây Khách Sạn (+${tile.upgradeCost}M)`;
                btnUpgrade.onclick = () => {
                    closeModal("modalPostcardInspector");
                    promptUpgradeProperty(current, tile);
                };
            } else {
                btnUpgrade.style.display = "none";
            }
        } else {
            ownerBox.innerHTML = `Chưa có người sở hữu • Giá niêm yết: <strong style="color:#16a34a;">${tile.price}M VNĐ</strong>`;
            btnUpgrade.style.display = "none";
        }
    } else {
        if (rentTable) rentTable.style.display = "none";
        ownerBox.innerHTML = `<span style="color:#64748b;">Ô đặc biệt: ${tile.regionName}</span>`;
        btnUpgrade.style.display = "none";
    }

    modal.classList.add("active");
}

// 23. DANH MỤC BẤT ĐỘNG SẢN & TÀI SẢN (PORTFOLIO MODAL)
function openPortfolioModal() {
    const modal = document.getElementById("modalPassport");
    if (!modal) return;

    const statsRow = document.getElementById("portfolioPlayersStats");
    if (statsRow) {
        statsRow.innerHTML = "";
        gameState.players.forEach(p => {
            const col = document.createElement("div");
            col.className = "passport-stat-col";
            col.innerHTML = `
                <div style="font-weight:800; color:${p.color};">${p.name} ${p.icon}</div>
                <div style="font-size:16px; font-weight:800; margin:2px 0;">${Number(p.cash).toLocaleString()}M</div>
                <div style="font-size:11px; color:#64748b;">${p.props.length} BĐS • ${playerJailStatus(p)}</div>
            `;
            statsRow.appendChild(col);
        });
    }

    const grid = document.getElementById("passportLandmarksGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const properties = VIETNAM_TILES.filter(t => t.type === "property" || t.type === "transport" || t.type === "utility");
    properties.forEach(t => {
        const item = document.createElement("div");
        item.className = `pass-item ${t.owner ? 'unlocked' : ''}`;

        let statusBadge = `<span class="badge-locked">Còn trống</span>`;
        if (t.owner) {
            const ownerObj = gameState.players.find(p => p.id === t.owner);
            if (ownerObj) {
                const houseTag = t.level === 0 ? 'Đất trống' : t.level === 1 ? '🏠 1 Nhà' : t.level === 2 ? '🏠🏠 2 Nhà' : '🏨 Khách Sạn';
                statusBadge = `<span class="badge-unlocked" style="background:${ownerObj.color};">Sở hữu: ${ownerObj.name} (${houseTag})</span>`;
            }
        }

        item.innerHTML = `
            <div class="pass-item-icon">${t.icon}</div>
            <div class="pass-item-name">${t.name}</div>
            <div class="pass-item-region">${t.price}M • ${t.regionName}</div>
            ${statusBadge}
        `;
        grid.appendChild(item);
    });

    modal.classList.add("active");
}

function playerJailStatus(player) {
    if (player.inJail) return `<span style="color:#ef4444;">Trong tù (${player.jailTurns}L)</span>`;
    if (player.jailCardsCount > 0) return `<span style="color:#f59e0b;">🎫 Có Ân Xá</span>`;
    return "Tự do";
}

// 24. LỊCH SỬ GIAO DỊCH DÒNG TIỀN (TRANSACTION HISTORY MODAL)
function openHistoryModal() {
    const modal = document.getElementById("modalHistoryLog");
    if (!modal) return;

    const listWrap = document.getElementById("historyListWrapper");
    if (listWrap) {
        listWrap.innerHTML = "";
        if (gameState.transactions.length === 0) {
            listWrap.innerHTML = `<div style="text-align:center; padding:30px; color:#64748b; font-style:italic;">Chưa có giao dịch phát sinh nào. Hãy tung xúc xắc để bắt đầu!</div>`;
        } else {
            gameState.transactions.forEach(tx => {
                const item = document.createElement("div");
                item.className = "history-item";

                const amtHtml = tx.amount !== null
                    ? `<span class="history-item-amt ${tx.isPositive ? 'positive' : 'negative'}">${tx.isPositive ? '+' : '-'}${Number(tx.amount).toLocaleString()}M</span>`
                    : '';

                item.innerHTML = `
                    <div class="history-item-icon">${tx.icon}</div>
                    <div class="history-item-body">
                        <div class="history-item-top">
                            <span class="history-item-title">${tx.title}</span>
                            <span class="history-item-round">Vòng ${tx.round} • ${tx.timestamp}</span>
                        </div>
                        <div class="history-item-desc">${tx.desc}</div>
                    </div>
                    ${amtHtml}
                `;
                listWrap.appendChild(item);
            });
        }
    }

    modal.classList.add("active");
}

// 25. ĐỔI TÊN NGƯỜI CHƠI (EDIT PLAYER NAME ENGINE)
function promptChangePlayerName(playerId) {
    const player = gameState.players.find(p => p.id === playerId);
    if (!player) return;

    gameState.editingPlayerId = playerId;
    const modal = document.getElementById("modalEditPlayerName");
    const input = document.getElementById("inputEditPlayerName");
    if (modal && input) {
        input.value = player.name;
        modal.classList.add("active");
        setTimeout(() => input.focus(), 150);
    }
}

function saveEditedPlayerName() {
    const input = document.getElementById("inputEditPlayerName");
    if (!input || !gameState.editingPlayerId) return;

    const newName = input.value.trim();
    if (newName) {
        const player = gameState.players.find(p => p.id === gameState.editingPlayerId);
        if (player) {
            player.name = newName;
            showStatusNotice(`✏️ Đã đổi tên người chơi thành: <strong>${player.name}</strong>`);
            renderPlayerHUD();
            updateUI();
        }
    }
    closeModal("modalEditPlayerName");
    gameState.editingPlayerId = null;
}

// 26. KIỂM TRA PHÁ SẢN & KẾT THÚC GAME
function checkBankruptcy(player, onContinue) {
    if (player.cash < 0) {
        const netWorth = calculateNetWorth(player);
        if (netWorth < 0) {
            player.isBankrupt = true;
            player.props.forEach(propId => {
                const t = VIETNAM_TILES.find(item => item.id === propId);
                if (t) {
                    t.owner = null;
                    t.level = 0;
                }
            });
            player.props = [];
            showStatusNotice(`💀 <strong>${player.name}</strong> chính thức PHÁ SẢN và bị loại khỏi ván cờ!`);
            recordTransaction({
                type: 'info',
                from: player.name,
                to: 'Tòa Án',
                amount: null,
                title: 'Phá Sản',
                desc: `${player.name} phá sản và rời khỏi cuộc chơi`,
                icon: '💀'
            });

            const activePlayers = gameState.players.filter(p => !p.isBankrupt);
            if (activePlayers.length === 1) {
                triggerGameOver(activePlayers[0]);
                return;
            }
        }
    }
    if (onContinue) onContinue();
}

// 27. KẾT THÚC LƯỢT VÀ CHUYỂN NGƯỜI TIẾP THEO
function finishTurn() {
    // Nếu lắc được cặp đôi và không ở tù: ĐƯỢC TUNG THÊM 1 LƯỢT!
    const current = gameState.players[gameState.currentTurnIndex];
    if (gameState.rolledDoubleTurn && current && !current.inJail && !current.isBankrupt) {
        gameState.rolledDoubleTurn = false;
        showStatusNotice(`🎲 <strong>${current.name}</strong> lắc được cặp đôi nên <strong>ĐƯỢC TUNG THÊM 1 LƯỢT NỮA</strong>!`);
        updateUI();
        if (current.isAi) {
            setTimeout(handleRollDice, 1200);
        }
        return;
    }

    gameState.rolledDoubleTurn = false;

    let nextIdx = (gameState.currentTurnIndex + 1) % gameState.players.length;
    let loopCount = 0;
    while (gameState.players[nextIdx].isBankrupt && loopCount < gameState.players.length) {
        nextIdx = (nextIdx + 1) % gameState.players.length;
        loopCount++;
    }

    if (nextIdx === 0) {
        gameState.roundCount++;
    }

    gameState.currentTurnIndex = nextIdx;
    updateUI();

    const nextPlayer = gameState.players[gameState.currentTurnIndex];
    showStatusNotice(`👉 Đang tới lượt của <strong>${nextPlayer.name}</strong> (${nextPlayer.icon})!`);

    if (nextPlayer.isAi && !nextPlayer.isBankrupt) {
        setTimeout(handleRollDice, 1200);
    }
}

function triggerGameOver(winner) {
    const modal = document.getElementById("modalGameOver");
    if (!modal) return;

    soundEffects.jackpotWin();
    document.getElementById("winnerText").innerHTML = `🎉 Người chiến thắng: <strong style="color:${winner.color}; font-size:22px;">${winner.name}</strong> (${winner.icon}) với khối tài sản khổng lồ <strong>${Number(calculateNetWorth(winner)).toLocaleString()}M VNĐ</strong>!`;

    modal.classList.add("active");
}

function showStatusNotice(msg) {
    const noticeEl = document.getElementById("actionStatusMsg");
    if (noticeEl) {
        noticeEl.innerHTML = msg;
    }
}

// 28. CÀI ĐẶT VÁN ĐẤU (CHỌN 2 - 4 NGƯỜI, ĐỔI TÊN & ĐẤU AI)
function initGameSetupModal() {
    const modal = document.getElementById("modalGameSetup");
    const countBtns = document.querySelectorAll(".count-opt-btn");
    const modePass = document.getElementById("optModePassPlay");
    const modeAi = document.getElementById("optModeAI");
    const rosterEl = document.getElementById("setupPlayersRoster");

    countBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            countBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            gameState.playerCount = parseInt(btn.getAttribute("data-count"));
            renderSetupRoster();
        });
    });

    if (modePass && modeAi) {
        modePass.addEventListener("click", () => {
            modePass.classList.add("active");
            modeAi.classList.remove("active");
            gameState.gameMode = "pass_play";
            renderSetupRoster();
        });
        modeAi.addEventListener("click", () => {
            modeAi.classList.add("active");
            modePass.classList.remove("active");
            gameState.gameMode = "ai";
            renderSetupRoster();
        });
    }

    function renderSetupRoster() {
        if (!rosterEl) return;
        rosterEl.innerHTML = "";

        const count = gameState.playerCount;
        const isAiMode = gameState.gameMode === "ai";

        for (let i = 0; i < count; i++) {
            const cfg = ALL_PLAYER_CONFIGS[i];
            const isAi = isAiMode && i > 0;
            const row = document.createElement("div");
            row.className = "setup-player-row";
            row.innerHTML = `
                <div class="setup-p-icon" style="background:${cfg.bg}; color:${cfg.color};">${cfg.icon}</div>
                <input type="text" class="setup-player-name-input" data-player-idx="${i}" value="${cfg.name}" maxlength="12" placeholder="Tên người chơi">
                <span class="setup-p-type-badge ${isAi ? 'type-ai' : 'type-human'}">${isAi ? 'Máy (AI)' : 'Người chơi'}</span>
            `;
            rosterEl.appendChild(row);
        }
    }

    renderSetupRoster();

    const btnStart = document.getElementById("btnStartCustomGame");
    if (btnStart) {
        btnStart.addEventListener("click", () => {
            const inputs = document.querySelectorAll(".setup-player-name-input");
            inputs.forEach(inp => {
                const idx = parseInt(inp.getAttribute("data-player-idx"));
                const val = inp.value.trim();
                if (val && ALL_PLAYER_CONFIGS[idx]) {
                    ALL_PLAYER_CONFIGS[idx].name = val;
                }
            });

            closeModal("modalGameSetup");
            startNewGame(gameState.playerCount, gameState.gameMode);
        });
    }

    const btnClose = document.getElementById("btnCloseSetup");
    if (btnClose) {
        btnClose.addEventListener("click", () => closeModal("modalGameSetup"));
    }
}

// 29. BẮT ĐẦU VÁN ĐẤU MỚI (START NEW GAME)
function startNewGame(playerCount = 2, gameMode = "pass_play") {
    gameState.playerCount = playerCount;
    gameState.gameMode = gameMode;
    gameState.currentTurnIndex = 0;
    gameState.roundCount = 1;
    gameState.parkingPool = 100;
    gameState.isRolling = false;
    gameState.rolledDoubleTurn = false;
    gameState.transactions = [];

    // Reset toàn bộ 36 ô đất
    VIETNAM_TILES.forEach(t => {
        t.owner = null;
        t.level = 0;
    });

    gameState.players = [];
    for (let i = 0; i < playerCount; i++) {
        const cfg = ALL_PLAYER_CONFIGS[i];
        gameState.players.push({
            id: `p${i}`,
            name: cfg.name,
            icon: cfg.icon,
            color: cfg.color,
            glow: cfg.glow,
            bg: cfg.bg,
            cash: 1500,
            position: 0,
            props: [],
            isBankrupt: false,
            inJail: false,
            jailTurns: 0,
            jailCardsCount: 0, // Kho thẻ ân xá
            frozenTurns: 0,    // Số lượt tạm dừng
            isAi: gameMode === "ai" && i > 0
        });
    }

    recordTransaction({
        type: 'info',
        from: 'Hệ Thống',
        to: 'Tất Cả',
        amount: 1500,
        title: 'Bắt đầu ván đấu mới',
        desc: `Ván đấu ${playerCount} người khởi động, mỗi người nhận 1,500M tiền mặt`,
        icon: '🎲'
    });

    initMonopolyBoard();
    showStatusNotice(`🎲 Ván cờ bắt đầu! Người chơi đầu tiên: <strong>${gameState.players[0].name}</strong>`);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
}

// 30. GẮN SỰ KIỆN CÁC NÚT BẤM (BUTTON EVENT LISTENERS)
function setupEventListeners() {
    const rollBtn = document.getElementById("rollDiceBtn");
    if (rollBtn) rollBtn.addEventListener("click", handleRollDice);

    const btnConfirmBuy = document.getElementById("btnConfirmBuy");
    if (btnConfirmBuy) {
        btnConfirmBuy.addEventListener("click", () => {
            const player = gameState.players[gameState.currentTurnIndex];
            const tile = gameState.pendingPropertyTile;
            if (player && tile) {
                if (!tile.owner) confirmBuyProperty(player, tile);
                else confirmUpgradeProperty(player, tile);
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

    const btnAcceptCard = document.getElementById("btnAcceptLoveCard");
    if (btnAcceptCard) {
        btnAcceptCard.addEventListener("click", () => {
            closeModal("modalLoveCard");
            if (gameState.pendingCardAction) {
                const { player, card, cardType } = gameState.pendingCardAction;
                applyCardEffect(player, card, cardType);
                gameState.pendingCardAction = null;
                finishTurn();
            }
        });
    }

    const btnPayBail = document.getElementById("btnPayBail");
    if (btnPayBail) btnPayBail.addEventListener("click", handlePayBail);

    const btnTryRollJail = document.getElementById("btnTryRollJail");
    if (btnTryRollJail) btnTryRollJail.addEventListener("click", handleTryRollJail);

    const btnCloseInspect = document.getElementById("btnCloseInspect");
    if (btnCloseInspect) btnCloseInspect.addEventListener("click", () => closeModal("modalPostcardInspector"));

    const btnOpenPort = document.getElementById("btnOpenPortfolio");
    if (btnOpenPort) btnOpenPort.addEventListener("click", openPortfolioModal);

    const btnClosePort = document.getElementById("btnClosePassport");
    if (btnClosePort) btnClosePort.addEventListener("click", () => closeModal("modalPassport"));

    const btnOpenHistory = document.getElementById("btnOpenHistory");
    if (btnOpenHistory) btnOpenHistory.addEventListener("click", openHistoryModal);

    const btnCloseHist = document.getElementById("btnCloseHistory");
    if (btnCloseHist) btnCloseHist.addEventListener("click", () => closeModal("modalHistoryLog"));

    const btnCloseHistCorner = document.getElementById("btnCloseHistoryCorner");
    if (btnCloseHistCorner) btnCloseHistCorner.addEventListener("click", () => closeModal("modalHistoryLog"));

    const btnSaveName = document.getElementById("btnSavePlayerName");
    if (btnSaveName) btnSaveName.addEventListener("click", saveEditedPlayerName);

    const btnCancelName = document.getElementById("btnCancelEditName");
    if (btnCancelName) btnCancelName.addEventListener("click", () => closeModal("modalEditPlayerName"));

    const btnHelp = document.getElementById("btnHelpGuide");
    if (btnHelp) btnHelp.addEventListener("click", () => {
        const m = document.getElementById("modalHelp");
        if (m) m.classList.add("active");
    });

    const btnCloseHelp = document.getElementById("btnCloseHelp");
    if (btnCloseHelp) btnCloseHelp.addEventListener("click", () => closeModal("modalHelp"));

    const btnSound = document.getElementById("btnToggleSound");
    const soundIcon = document.getElementById("soundIcon");
    if (btnSound) {
        btnSound.addEventListener("click", () => {
            gameState.soundEnabled = !gameState.soundEnabled;
            if (soundIcon) soundIcon.textContent = gameState.soundEnabled ? "🔔" : "🔕";
            showStatusNotice(gameState.soundEnabled ? "🔔 Đã bật âm thanh trò chơi" : "🔕 Đã tắt âm thanh trò chơi");
        });
    }

    const btnRestartQuick = document.getElementById("btnRestartQuick");
    if (btnRestartQuick) {
        btnRestartQuick.addEventListener("click", () => {
            const m = document.getElementById("modalGameSetup");
            if (m) m.classList.add("active");
        });
    }

    const btnRestartFromWin = document.getElementById("btnRestartFromWinner");
    if (btnRestartFromWin) {
        btnRestartFromWin.addEventListener("click", () => {
            closeModal("modalGameOver");
            const m = document.getElementById("modalGameSetup");
            if (m) m.classList.add("active");
        });
    }

    const btnCancelFly = document.getElementById("btnCancelAirportFly");
    if (btnCancelFly) {
        btnCancelFly.addEventListener("click", () => {
            closeModal("modalAirportFlight");
            finishTurn();
        });
    }

    const btnConfirmFly = document.getElementById("btnConfirmAirportFly");
    if (btnConfirmFly) {
        btnConfirmFly.addEventListener("click", () => {
            const player = gameState.players[gameState.currentTurnIndex];
            confirmAirportFly(player);
        });
    }
}

// 31. ĐỒNG BỘ THEME VỚI TRANG CHỦ
const THEME_NAMES = {
    "sunset": "Hoàng Hôn",
    "vintage-rose": "Hoa Hồng Cổ",
    "midnight": "Đêm Đầy Sao",
    "autumn": "Mùa Thu",
    "cotton-candy": "Kẹo Ngọt",
    "ocean": "Biển Xanh",
    "secret-garden": "Vườn Bí Mật",
    "bordeaux": "Rượu Vang",
    "mocha": "Cà Phê",
    "lavender": "Oải Hương",
    "peach": "Trà Đào",
    "aurora-night": "Đêm Đông"
};

function initThemeSwitcher() {
    const savedTheme = localStorage.getItem("preferred_theme") || "sunset";
    document.documentElement.setAttribute("data-theme", savedTheme);

    const settingBtn = document.getElementById("themeSettingBtn");
    const modal = document.getElementById("themeModalOverlay");
    const closeBtn = document.getElementById("themeModalCloseBtn");
    const applyBtn = document.getElementById("themeApplyBtn");
    const currentNameEl = document.getElementById("themeCurrentName");

    if (currentNameEl) {
        currentNameEl.textContent = THEME_NAMES[savedTheme] || savedTheme;
    }

    if (settingBtn && modal) {
        settingBtn.addEventListener("click", () => modal.classList.add("active"));
    }
    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    }
    if (applyBtn && modal) {
        applyBtn.addEventListener("click", () => modal.classList.remove("active"));
    }

    const cards = document.querySelectorAll(".theme-card-option");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const themeKey = card.getAttribute("data-theme");
            document.documentElement.setAttribute("data-theme", themeKey);
            localStorage.setItem("preferred_theme", themeKey);
            if (currentNameEl) {
                currentNameEl.textContent = THEME_NAMES[themeKey] || themeKey;
            }
        });
    });
}

// 32. KHỞI CHẠY KHI TẢI TRANG (DOM CONTENT LOADED)
document.addEventListener("DOMContentLoaded", () => {
    initThemeSwitcher();
    setupEventListeners();
    initGameSetupModal();
    startNewGame(2, "pass_play");
});
