/**
 * ========================================================
 * DỮ LIỆU CÁC MỐC KỶ NIỆM TRÊN DÒNG THỜI GIAN
 * Đã tích hợp:
 * - 📍 Địa điểm gắn liền với từng kỷ niệm (Tính năng 2)
 * - 🖼️ Album nhiều ảnh / Carousel vuốt lật cho mỗi mốc (Tính năng 4)
 * ========================================================
 */
const MEMORIES = [
    {
        id: 1,
        title: "Quân sự",
        date: "Kỷ niệm quân sự",
        location: "Trung tâm GDQP&AN",
        type: "photo",
        images: [
            "images/DSC03633.jpeg",
            "images/DSC03635.jpeg",
            "images/DSC03654.jpeg",
            "images/DSC03661.jpeg",
            "images/DSC03663.jpeg",
            "images/DSC03664.jpeg"
        ],
        fallbacks: [
            "images/DSC03633.jpeg",
            "images/DSC03635.jpeg",
            "images/DSC03654.jpeg",
            "images/DSC03661.jpeg",
            "images/DSC03663.jpeg",
            "images/DSC03664.jpeg"
        ],
        story: "Tới khúc này chụp ảnh ptb quân sự thì Huy cũng không nghĩ là sẽ có ảnh chụp chung với Hiền, tại nghĩ là Hiền không thích với lại Huy cũng ngại. Hehe nhưng mà Hiền cho nên Huy chụp chung thôyy, Huy nghĩ là khi này Hiền chắc cũng đã biết tui có tình cảm với Hiền rồyy. Hiền ới, Hiền không biết là tui thích mấy bức ảnh này như nào đâu, là siêu thích luôn đóoo, miễn được chụp chung với Hiền thì tui đều thích hếtt. Tui cũng muốn up mấy tấm này nhưng mà để Hiền duyệt đã, bao giờ Hiền cho phép thì tui mới dám upp. Tui thích Hiền quá trờiiii"
    },
    {
        id: 2,
        title: "Liên hoan THSV",
        date: "Lần đầu tiên",
        location: "Liên hoan THSV",
        type: "photo",
        images: [
            "images/IMG_3444.PNG"
        ],
        fallbacks: [
            "images/IMG_3444.PNG"
        ],
        story: "Ban đầu khi chụp bức ảnh này, Huy cũng không có suy nghĩ gì nhiều, chỉ là do quý Hiền nên chụp chung nhưng mà khi về lại KTX thì tự nhiên cứ nghĩ mãi nên thành ra cũng thích thích Hiền từ khi đấy. Xong lúc Hiền làm mất ảnh, Huy cũng buồn dữ lắmm nhưng mà do ngại nên không dám thể hiện nhiều, sợ bị biết là thích Hiền. Hiền ơii, nhưng mà lúc đấy là tui thích thích Hiền rồyyy. Cái lúc mà nghe Nhã Linh kể, Huy thấy vừa thương Hiền do Hiền buồn, vừa tiếc do mất ảnh nữa. Nhưng mà cuối khóa mình cũng đã có ảnh chung với nhau. Bức này tuy không còn bản cứng nhưng mà Huy cũng thích nó lắmm, không có nó thì sao mà tui thích Hiền được. Bắt đền Hiền đấy nhée "
    },
    {
        id: 3,
        title: "Đi 1 về 2",
        date: "Ngày cuối cùng",
        location: "Nơi bắt đầu một chương mới",
        type: "photo",
        images: [
            "images/IMG_3893.PNG"
        ],
        fallbacks: [
            "images/IMG_3893.PNG"
        ],
        story: "Huy biết vẫn chưa được gọi là đi 1 về 2, gọi là Hiền là người yêu được vì Huy chưa có tỏ tình Hiền đàng hoàng, có quà các thứ mà chỉ mới thông qua lời nói hôm bữa sau hôm GALA. Huy lúc đó phân vân không biết nên nói khi đó hay đợi tới lúc mình hẹn đi xem phim sau đó để nói, nma quyết định thì Huy chọn nói khi đó luôn vì Huy sợ để lâu sẽ không có được gặp nhau nhiều để nói do học khác thời khóa biểu với sợ Hiền thích người khác nên thôy Huy đặt cọc trước đó hehe. Tuy chụp 6 bức nhưng bị fail 1 bức, Huy vẫn vui lắm vì có thêm ảnh chung với Hiền. Huy hy vọng sẽ có thêm nhiều ảnh chung với Hiền nữa. Tui iu bà nhiều lắmmm đó Hiền"
    },
    {
        id: 4,
        title: "Bên nhau",
        date: "01/11/2026",
        location: "Ngày chính thức thành đôi",
        type: "mixed",
        video: "videos/IMG_4151.mp4",
        videoMov: "videos/IMG_4151.MOV",
        poster: "images/IMG_4151_poster.jpg",
        images: [
            "images/IMG_4151_poster.jpg",
            "images/DSC03633.jpeg",
            "images/DSC03635.jpeg"
        ],
        fallbacks: [
            "images/IMG_4151_poster.jpg",
            "images/DSC03633.jpeg"
        ],
        story: "Từ hôm nay, chúng mình đã có nhau. Khoảnh khắc Hiền ngồi chăm chú đọc từng dòng thư tay dưới ánh đèn là hình ảnh đẹp và dịu dàng nhất mà Huy sẽ luôn nâng niu và khắc ghi trong tim."
    }
];

/**
 * ========================================================
 * DANH SÁCH BÀI HÁT PHÁT CUỐN CHIẾU (PLAYLIST TUẦN TỰ)
 * Tự động chuyển bài khi bài trước kết thúc (4 bài hát)
 * ========================================================
 */
const PLAYLIST = [
    {
        id: 1,
        title: "50 Năm Về Sau",
        artist: "Đặng Thanh Tuyền",
        src: "music/50-nam-ve-sau.mp3"
    },
    {
        id: 2,
        title: "Dù Cho Mai Về Sau",
        artist: "buitruonglinh",
        src: "music/du-cho-mai-ve-sau.mp3"
    },
    {
        id: 3,
        title: "Hẹn Một Mai",
        artist: "Bùi Anh Tuấn",
        src: "music/hen-mot-mai.mp3"
    }
];


// Nạp các bài hát tùy chỉnh và kỷ niệm tùy chỉnh từ localStorage
try {
    const savedCustomSongs = localStorage.getItem('couple_custom_music_v2');
    if (savedCustomSongs) {
        const parsedSongs = JSON.parse(savedCustomSongs);
        if (Array.isArray(parsedSongs)) {
            parsedSongs.forEach(s => {
                if (!PLAYLIST.some(p => p.id === s.id)) {
                    PLAYLIST.push(s);
                }
            });
        }
    }
} catch (e) {
    console.warn("Lỗi nạp custom music:", e);
}

try {
    const savedCustomMemories = localStorage.getItem('couple_custom_memories_v2');
    if (savedCustomMemories) {
        const parsedMems = JSON.parse(savedCustomMemories);
        if (Array.isArray(parsedMems)) {
            parsedMems.forEach(m => {
                if (!MEMORIES.some(orig => orig.id === m.id)) {
                    MEMORIES.unshift(m);
                }
            });
        }
    }
} catch (e) {
    console.warn("Lỗi nạp custom memories:", e);
}

let currentTrackIndex = 0;

let isAudioPlaying = false;

// Trạng thái Lightbox duyệt ảnh
let currentLbMemoryIndex = 0;
let currentLbPhotoIndex = 0;

/* ========================================================
   KHỞI TẠO DOM & SỰ KIỆN
   ======================================================== */

// Bộ lọc media hiện tại (all / photo / video)
let currentGalleryFilter = "all";

// Quản lý tạm dừng nhạc nền khi phát video
let bgMusicPausedByVideo = false;

function pauseBgMusicForVideo() {
    const bgAudio = document.getElementById("bgMusic");
    if (bgAudio && !bgAudio.paused) {
        bgAudio.pause();
        bgMusicPausedByVideo = true;
        const vinylDisc = document.getElementById("vinylDisc");
        if (vinylDisc) vinylDisc.classList.remove("playing");
        const playBtnIcon = document.getElementById("musicPlayCenterIcon");
        if (playBtnIcon) playBtnIcon.innerText = "▶";
    }
}

function resumeBgMusicAfterVideo() {
    if (!bgMusicPausedByVideo) return;
    const bgAudio = document.getElementById("bgMusic");
    if (bgAudio && bgAudio.paused) {
        bgAudio.play().then(() => {
            bgMusicPausedByVideo = false;
            const vinylDisc = document.getElementById("vinylDisc");
            if (vinylDisc) vinylDisc.classList.add("playing");
            const playBtnIcon = document.getElementById("musicPlayCenterIcon");
            if (playBtnIcon) playBtnIcon.innerText = "⏸";
        }).catch(() => {
            bgMusicPausedByVideo = false;
        });
    } else {
        bgMusicPausedByVideo = false;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    initThemeSwitcher();
    initAmbientParticles();
    initIntroSection();
    initLoveCounter();
    initPolaroidFlatlay();
    renderTimelineWithCarousels();
    initScrollObserver();
    initLetterModal();
    initLightboxSystem();
    initAudioSystem();
    initMusicUploadSystem();
    initMemoryCreateSystem();
});

/* ========================================================
   ĐỒNG HỒ ĐẾM NGÀY YÊU NHAU (CHÍNH THỨC 01/11/2026)
   ======================================================== */
function initLoveCounter() {
    // Thời điểm bắt đầu chính thức quen nhau: khoảng 23:00 ngày 01/11/2026
    const startDate = new Date(2026, 10, 1, 23, 0, 0);

    const daysEl = document.getElementById("loveCounterDays");
    const hoursEl = document.getElementById("loveCounterHours");
    const minutesEl = document.getElementById("loveCounterMinutes");
    const secondsEl = document.getElementById("loveCounterSeconds");
    const totalHoursEl = document.getElementById("clockTotalHoursNum");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCounter() {
        const now = new Date();
        const diffMs = Math.max(0, now - startDate);

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
        const seconds = Math.floor((diffMs / 1000) % 60);
        const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

        daysEl.textContent = days;
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");

        if (totalHoursEl) {
            totalHoursEl.textContent = totalHours;
        }
    }

    updateCounter();
    setInterval(updateCounter, 1000);
}

/* ========================================================
   XỬ LÝ NÚT CHUYỂN TIẾP TỪ BOX LỜI NHẮN VÀO DÒNG THỜI GIAN
   ======================================================== */
function initIntroSection() {
    const startBtn = document.getElementById("startJourneyBtn");
    if (startBtn) {
        startBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const timelineContainer = document.getElementById("timelineContainer");
            if (timelineContainer) {
                timelineContainer.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
}

/* ========================================================
   CÁC TẤM ẢNH POLAROID KỶ NIỆM LẤP LÓ PHÍA SAU BOX LỜI NHẮN
   (Decor phong cách Flatlay Scrapbook / Bàn kỷ niệm tình yêu)
   - Tự động lấy 6 mốc kỷ niệm đầu tiên từ MEMORIES
   - Đặt so le nghệ thuật ở 4 góc và 2 bên sườn thiệp
   - Khi hover: nhô lên phía trước với bóng đổ 3D ấm áp
   - Khi click: mở trực tiếp ảnh trong trình xem Lightbox
   ======================================================== */
function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function initPolaroidFlatlay() {
    const container = document.getElementById("introPolaroidsLayer");
    if (!container) return;

    if (!Array.isArray(MEMORIES) || MEMORIES.length === 0) return;

    // Cấu hình 8 vị trí Polaroid bao quanh hộp lời nhắn từ đầy đủ 8 bức ảnh thật của 3 mục kỷ niệm
    const polaroidConfigs = [
        {
            posClass: "polaroid-tl",
            tapeClass: "tape-blush",
            memIndex: 0,
            photoIndex: 0
        },
        {
            posClass: "polaroid-tml",
            tapeClass: "tape-sage",
            memIndex: 0,
            photoIndex: 2
        },
        {
            posClass: "polaroid-bml",
            tapeClass: "tape-honey",
            memIndex: 0,
            photoIndex: 4
        },
        {
            posClass: "polaroid-bl",
            tapeClass: "tape-terracotta",
            memIndex: 1,
            photoIndex: 0
        },
        {
            posClass: "polaroid-tr",
            tapeClass: "tape-lavender",
            memIndex: 0,
            photoIndex: 1
        },
        {
            posClass: "polaroid-tmr",
            tapeClass: "tape-gold",
            memIndex: 0,
            photoIndex: 3
        },
        {
            posClass: "polaroid-bmr",
            tapeClass: "tape-blush",
            memIndex: 0,
            photoIndex: 5
        },
        {
            posClass: "polaroid-br",
            tapeClass: "tape-terracotta",
            memIndex: 2,
            photoIndex: 0
        }
    ];

    let html = "";
    polaroidConfigs.forEach((cfg) => {
        const mem = MEMORIES[cfg.memIndex] || MEMORIES[0];
        if (!mem) return;

        const photoList = mem.images || (mem.image ? [mem.image] : []);
        const fallbackList = mem.fallbacks || (mem.fallback ? [mem.fallback] : []);
        const imgSrc = photoList[cfg.photoIndex] || fallbackList[cfg.photoIndex] || photoList[0] || fallbackList[0] || "";
        const fallbackSrc = fallbackList[cfg.photoIndex] || fallbackList[0] || imgSrc;
        const title = mem.title || `Kỷ niệm ${cfg.memIndex + 1}`;
        const date = mem.date || `Kỷ niệm ${cfg.memIndex + 1}`;
        const safeTitle = escapeHtml(title);
        const safeDate = escapeHtml(date);

        html += `
            <div class="polaroid-item ${cfg.posClass}" role="button" tabindex="0"
                 data-memory-index="${cfg.memIndex}"
                 data-photo-index="${cfg.photoIndex}"
                 title="Nhấp để mở thư: ${safeTitle}"
                 aria-label="Ảnh Polaroid: ${safeTitle}">
                <div class="polaroid-washi ${cfg.tapeClass}" aria-hidden="true"></div>
                <div class="polaroid-photo-frame">
                    <img class="polaroid-photo" src="${imgSrc}" alt="${safeTitle}" 
                         data-fallback="${fallbackSrc}" loading="lazy" />
                    <div class="polaroid-photo-glare" aria-hidden="true"></div>
                </div>
                <div class="polaroid-caption">${safeTitle}</div>
                <div class="polaroid-date">${safeDate}</div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Xử lý fallback ảnh khi đường dẫn local chưa có
    const images = container.querySelectorAll("img.polaroid-photo");
    images.forEach(img => {
        img.addEventListener("error", function () {
            const fb = this.getAttribute("data-fallback");
            if (fb && this.src !== fb) {
                this.src = fb;
            }
        });
    });

    // Xử lý click và phím Enter/Space để mở trực tiếp Bức Thư Kỷ Niệm 3D
    const items = container.querySelectorAll(".polaroid-item");
    items.forEach(item => {
        const triggerOpen = () => {
            const memIdx = parseInt(item.getAttribute("data-memory-index"), 10);
            if (!isNaN(memIdx) && typeof openLetterModal === "function") {
                openLetterModal(memIdx);
            }
        };

        item.addEventListener("click", (e) => {
            e.stopPropagation();
            triggerOpen();
        });

        item.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                triggerOpen();
            }
        });
    });
}

/* ========================================================
   RENDER DẢI BĂNG CHUYỀN KỶ NIỆM TRUYỀN ĐỘNG 2 CHIỀU (INFINITE FLOWING STREAM)
   - Hoạt ảnh chuyển động liên tục trôi bồng bềnh
   - Rê chuột tự động tạm dừng để ngắm kỹ
   - Hỗ trợ kéo lướt qua lại (Drag/Touch Swipe) và nút bấm điều hướng
   - Chạm vào bất kỳ ảnh nào để mở bức thư 3D tương ứng
   ======================================================== */
let streamScrollOffset = 0;
let streamSpeed = 0.75; // Tốc độ trôi êm ái thư thái
let isStreamPaused = false;
let isStreamHovered = false;
let isDraggingStream = false;
let hasDraggedStream = false;
let isSmoothScrollingStream = false;
let streamScrollAnimId = null;
let streamStartX = 0;
let streamStartOffset = 0;
let singleSetWidth = 0;
let streamAnimFrame = null;

/**
 * Trượt mượt dải ảnh kỷ niệm sang trái hoặc phải theo từng thẻ (348px)
 * @param {number} direction -1: Lùi về kỷ niệm trước (sang phải), 1: Sang kỷ niệm kế tiếp (sang trái)
 */
function scrollStreamByStep(direction) {
    const track = document.getElementById("timelineContainer");
    if (!track) return;

    // Tính bề rộng của 1 card + gap (320px + 28px = 348px)
    const firstCard = track.querySelector(".stream-card");
    const stepSize = firstCard ? (firstCard.offsetWidth + 28) : 348;
    const delta = stepSize * direction;

    if (streamScrollAnimId) {
        cancelAnimationFrame(streamScrollAnimId);
        streamScrollAnimId = null;
    }

    const startOffset = streamScrollOffset;
    const startTime = performance.now();
    const duration = 400; // 400ms lướt êm dịu

    isSmoothScrollingStream = true;

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // Ease-out cubic

        let current = startOffset + delta * ease;
        if (singleSetWidth > 0) {
            while (current >= singleSetWidth) current -= singleSetWidth;
            while (current < 0) current += singleSetWidth;
        }

        streamScrollOffset = current;
        track.style.transform = `translate3d(${-streamScrollOffset}px, 0, 0)`;

        if (progress < 1) {
            streamScrollAnimId = requestAnimationFrame(step);
        } else {
            isSmoothScrollingStream = false;
            streamScrollAnimId = null;
        }
    }

    streamScrollAnimId = requestAnimationFrame(step);
}

function renderTimelineWithCarousels() {
    const container = document.getElementById("timelineContainer");
    if (!container) return;
    container.innerHTML = "";

    // Hiển thị trực tiếp 4 kỷ niệm trọn vẹn theo 1 dòng mạch lạc (không chia tab)
    const displayList = MEMORIES;

    // Nhân bản danh sách đủ số lần để tạo vòng lặp vô tận liền mạch
    const minSets = Math.max(4, Math.ceil((window.innerWidth * 2.5) / Math.max(1, displayList.length * 360)));
    const renderSets = Array.from({ length: minSets }, (_, i) => i);

    renderSets.forEach((setIndex) => {
        displayList.forEach((item) => {
            const memoryIndex = MEMORIES.findIndex(m => m.id === item.id);
            const photoList = (item.images && item.images.length > 0)
                ? item.images
                : (item.image ? [item.image] : []);
            const fallbackList = item.fallbacks || (item.fallback ? [item.fallback] : []);
            const firstPhoto = item.poster || photoList[0] || fallbackList[0] || "";
            const fallbackPhoto = fallbackList[0] || firstPhoto;
            const photoCount = photoList.length;

            let badgeHtml = '';
            let playHintHtml = '';
            let actionBtnText = 'Mở thư';

            if (item.type === 'video') {
                badgeHtml = '<span class="stream-card-badge video-badge">🎬 Thước phim</span>';
                playHintHtml = '<span class="stream-card-video-play-hint" aria-hidden="true">▶</span>';
                actionBtnText = 'Xem phim';
            } else if (item.type === 'mixed') {
                badgeHtml = `<span class="stream-card-badge mixed-badge">🎬 Video + 📷 ${photoCount} ảnh</span>`;
                playHintHtml = '<span class="stream-card-video-play-hint" aria-hidden="true">▶</span>';
                actionBtnText = 'Mở thư & Phim';
            } else if (photoCount > 1) {
                badgeHtml = `<span class="stream-card-count-pill">📷 ${photoCount} ảnh</span>`;
            }

            const card = document.createElement("article");
            card.className = "stream-card timeline-card";
            card.setAttribute("role", "button");
            card.setAttribute("tabindex", "0");
            card.setAttribute("data-memory", String(memoryIndex >= 0 ? memoryIndex : 0));
            card.setAttribute("title", `Nhấp để mở: ${item.title}`);

            card.innerHTML = `
                <div class="card-washi-tape" aria-hidden="true"></div>
                <div class="stream-card-photo-box">
                    <img class="stream-card-photo" src="${firstPhoto}" alt="${item.title}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackPhoto}';">
                    ${badgeHtml}
                    ${playHintHtml}
                </div>
                <div class="stream-card-body">
                    <div class="stream-card-date">${item.date}</div>
                    <h3 class="stream-card-title">${item.title}</h3>
                    <p class="stream-card-story">${item.story}</p>
                    <div class="stream-card-action">
                        <button class="stream-card-btn" type="button" aria-label="${actionBtnText}">
                            <span>${actionBtnText}</span>
                        </button>
                    </div>
                </div>
            `;

            // Xử lý sự kiện nhấp để mở thư (nếu không phải thao tác kéo lướt)
            card.addEventListener("click", (e) => {
                if (hasDraggedStream) return;
                openLetterModal(memoryIndex >= 0 ? memoryIndex : 0);
            });

            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLetterModal(memoryIndex >= 0 ? memoryIndex : 0);
                }
            });

            container.appendChild(card);
        });
    });

    // Khởi tạo hoạt ảnh chuyển động trôi truyền qua lại
    initMemoriesStreamMotion();
}

function initMemoriesStreamMotion() {
    const viewport = document.getElementById("memoriesStreamViewport");
    const track = document.getElementById("timelineContainer");
    if (!viewport || !track) return;

    // Hủy frame cũ nếu đã có
    if (streamAnimFrame) {
        cancelAnimationFrame(streamAnimFrame);
        streamAnimFrame = null;
    }

    // Tính toán bề rộng chuẩn của 1 bộ thẻ ảnh
    function measureSingleSet() {
        const cards = track.querySelectorAll(".stream-card");
        if (cards.length < MEMORIES.length) return 0;
        if (cards.length >= MEMORIES.length * 2) {
            return cards[MEMORIES.length].offsetLeft - cards[0].offsetLeft;
        }
        let totalW = 0;
        for (let i = 0; i < MEMORIES.length; i++) {
            totalW += cards[i].offsetWidth;
            const style = window.getComputedStyle(cards[i]);
            const marginRight = parseFloat(style.marginRight) || 0;
            totalW += marginRight + 28; // gap 28px
        }
        return totalW;
    }

    // Đợi DOM render kích thước
    setTimeout(() => {
        singleSetWidth = measureSingleSet();
    }, 100);

    window.addEventListener("resize", () => {
        singleSetWidth = measureSingleSet();
    });

    // Vòng lặp chuyển động mượt mà 60fps (requestAnimationFrame)
    function streamStep() {
        if (!isStreamPaused && !isStreamHovered && !isDraggingStream && !isSmoothScrollingStream) {
            streamScrollOffset += streamSpeed;
            if (singleSetWidth > 0) {
                if (streamScrollOffset >= singleSetWidth) {
                    streamScrollOffset -= singleSetWidth;
                } else if (streamScrollOffset < 0) {
                    streamScrollOffset += singleSetWidth;
                }
            }
            track.style.transform = `translate3d(${-streamScrollOffset}px, 0, 0)`;
        }
        streamAnimFrame = requestAnimationFrame(streamStep);
    }

    streamAnimFrame = requestAnimationFrame(streamStep);

    // Rê chuột vào dải ảnh để tự động dừng lại ngắm kỹ
    viewport.addEventListener("mouseenter", () => {
        isStreamHovered = true;
    });

    viewport.addEventListener("mouseleave", () => {
        isStreamHovered = false;
        if (isDraggingStream) {
            isDraggingStream = false;
            viewport.classList.remove("is-dragging");
        }
    });

    // Tương tác kéo chuột (Mouse Drag) để lướt dải ảnh qua lại theo ý muốn
    viewport.addEventListener("mousedown", (e) => {
        isDraggingStream = true;
        hasDraggedStream = false;
        streamStartX = e.pageX;
        streamStartOffset = streamScrollOffset;
        viewport.classList.add("is-dragging");
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDraggingStream) return;
        const deltaX = e.pageX - streamStartX;
        if (Math.abs(deltaX) > 6) {
            hasDraggedStream = true;
        }
        streamScrollOffset = streamStartOffset - deltaX;
        if (singleSetWidth > 0) {
            while (streamScrollOffset >= singleSetWidth) streamScrollOffset -= singleSetWidth;
            while (streamScrollOffset < 0) streamScrollOffset += singleSetWidth;
        }
        track.style.transform = `translate3d(${-streamScrollOffset}px, 0, 0)`;
    });

    window.addEventListener("mouseup", () => {
        if (isDraggingStream) {
            isDraggingStream = false;
            viewport.classList.remove("is-dragging");
            setTimeout(() => {
                hasDraggedStream = false;
            }, 100);
        }
    });

    // Tương tác vuốt chạm trên điện thoại (Touch Swipe tối ưu chống khựng khi cuộn dọc trang)
    let streamTouchStartY = 0;
    let isHorizontalStreamSwipe = false;

    viewport.addEventListener("touchstart", (e) => {
        if (e.touches.length !== 1) return;
        isDraggingStream = true;
        hasDraggedStream = false;
        isHorizontalStreamSwipe = false;
        streamStartX = e.touches[0].pageX;
        streamTouchStartY = e.touches[0].pageY;
        streamStartOffset = streamScrollOffset;
    }, { passive: true });

    viewport.addEventListener("touchmove", (e) => {
        if (!isDraggingStream || e.touches.length !== 1) return;
        const deltaX = e.touches[0].pageX - streamStartX;
        const deltaY = e.touches[0].pageY - streamTouchStartY;

        // Nếu người dùng đang cuộn dọc trang web thì nhường lại cuộn tự nhiên, không can thiệp dải ảnh ngang
        if (!isHorizontalStreamSwipe) {
            if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
                isDraggingStream = false;
                return;
            }
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
                isHorizontalStreamSwipe = true;
            }
        }

        if (Math.abs(deltaX) > 6) {
            hasDraggedStream = true;
        }
        streamScrollOffset = streamStartOffset - deltaX;
        if (singleSetWidth > 0) {
            while (streamScrollOffset >= singleSetWidth) streamScrollOffset -= singleSetWidth;
            while (streamScrollOffset < 0) streamScrollOffset += singleSetWidth;
        }
        track.style.transform = `translate3d(${-streamScrollOffset}px, 0, 0)`;
    }, { passive: true });

    viewport.addEventListener("touchend", () => {
        if (isDraggingStream) {
            isDraggingStream = false;
            isHorizontalStreamSwipe = false;
            setTimeout(() => {
                hasDraggedStream = false;
            }, 100);
        }
    });

    // 2 Nút mũi tên điều hướng 2 bên dải ảnh
    const prevBtn = document.getElementById("streamPrevBtn");
    const nextBtn = document.getElementById("streamNextBtn");

    if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            scrollStreamByStep(-1);
        });
        prevBtn.addEventListener("mouseenter", () => {
            isStreamHovered = true;
        });
        prevBtn.addEventListener("mouseleave", () => {
            isStreamHovered = false;
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            scrollStreamByStep(1);
        });
        nextBtn.addEventListener("mouseenter", () => {
            isStreamHovered = true;
        });
        nextBtn.addEventListener("mouseleave", () => {
            isStreamHovered = false;
        });
    }

    // Phím tắt mũi tên trái/phải trên bàn phím để lướt ảnh tiện lợi
    window.addEventListener("keydown", (e) => {
        const isLetterModalOpen = document.getElementById("letterModalOverlay")?.classList.contains("active");
        const isLightboxOpen = document.getElementById("lightboxOverlay")?.classList.contains("active");
        if (isLetterModalOpen || isLightboxOpen) return;

        if (e.key === "ArrowLeft") {
            scrollStreamByStep(-1);
        } else if (e.key === "ArrowRight") {
            scrollStreamByStep(1);
        }
    });
}

/* ========================================================
   MODAL BỨC THƯ NỞ RA KHI NHẤP CHUỘT (EXPANDING LETTER MODAL)
   ======================================================== */
function initLetterModal() {
    const overlay = document.getElementById("letterModalOverlay");
    const closeBtn = document.getElementById("letterModalClose");
    const foldBtn = document.getElementById("letterFoldBtn");

    if (closeBtn) closeBtn.addEventListener("click", closeLetterModal);
    if (foldBtn) foldBtn.addEventListener("click", closeLetterModal);

    if (overlay) {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeLetterModal();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay && overlay.classList.contains("active")) {
            closeLetterModal();
        }
    });
}

function openLetterModal(memoryIndex) {
    const overlay = document.getElementById("letterModalOverlay");
    if (!overlay) return;
    // Nếu đang trong quá trình gấp thư lại thì không mở đè
    if (overlay.classList.contains("closing")) return;

    const item = MEMORIES[memoryIndex];
    if (!item) return;

    const letterCard = document.querySelector(".letter-modal-paper, .letter-modal-card");
    if (letterCard) {
        letterCard.classList.remove("theme-kraft", "theme-autumn", "theme-starlight", "theme-postcard", "theme-military");
        // Thống nhất toàn bộ sử dụng theme hoàng hôn hiện tại
        letterCard.classList.add("theme-autumn");
    }

    const dateEl = document.getElementById("letterModalDate");
    const locationEl = document.getElementById("letterModalLocationText");
    const titleEl = document.getElementById("letterModalTitle");
    const storyEl = document.getElementById("letterModalStory");
    const galleryEl = document.getElementById("letterModalGallery");

    if (dateEl) dateEl.innerText = item.date;
    if (locationEl) locationEl.innerText = item.location || "Một góc quen kỷ niệm";
    if (titleEl) titleEl.innerText = item.title;
    if (storyEl) storyEl.innerText = item.story;

    const photoList = (item.images && item.images.length > 0) ? item.images : (item.image ? [item.image] : []);
    const fallbackList = item.fallbacks || (item.fallback ? [item.fallback] : []);
    renderLetterModalGallery(galleryEl, photoList, fallbackList, item.title, memoryIndex);

    // Đảm bảo cuộn lên đầu thư
    const paper = document.getElementById("letterModalPaper");
    if (paper) {
        paper.scrollTop = 0;
    }

    // Tách biệt hoàn toàn active và closing, ép DOM reflow để animation mở thư mượt 100%, không bị khựng
    overlay.classList.remove("active", "closing");
    void overlay.offsetWidth;
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

let letterCarouselTimer = null;

function renderLetterModalGallery(galleryEl, photoList, fallbackList, title, memoryIndex = 0) {
    if (!galleryEl) return;
    galleryEl.innerHTML = "";
    if (letterCarouselTimer) {
        clearInterval(letterCarouselTimer);
        letterCarouselTimer = null;
    }

    const memory = MEMORIES[memoryIndex] || {};

    // 1. Trường hợp kỷ niệm THUẦN VIDEO
    if (memory.type === "video" && memory.video) {
        galleryEl.style.display = "block";
        galleryEl.innerHTML = `
            <div class="letter-video-player-wrap">
                <video id="letterModalVideoEl" class="letter-modal-video" controls playsinline preload="metadata" poster="${memory.poster || (photoList[0] || '')}">
                    <source src="${memory.video}" type="video/mp4">
                    ${memory.videoMov ? `<source src="${memory.videoMov}" type="video/quicktime">` : ''}
                    <source src="${memory.video.replace('.mp4', '.webm')}" type="video/webm">
                    Trình duyệt của bạn không hỗ trợ phát video.
                </video>
                <div class="letter-video-caption">
                    <span>🎬</span>
                    <span>${title} • Thước phim kỷ niệm</span>
                </div>
            </div>
        `;
        const vid = document.getElementById("letterModalVideoEl");
        if (vid) {
            vid.addEventListener("play", pauseBgMusicForVideo);
            vid.addEventListener("pause", resumeBgMusicAfterVideo);
            vid.addEventListener("ended", resumeBgMusicAfterVideo);
        }
        return;
    }

    // 2. Trường hợp kỷ niệm KẾT HỢP (Cả Video VÀ Album Ảnh)
    if (memory.type === "mixed" && memory.video) {
        galleryEl.style.display = "block";
        const tabsWrap = document.createElement("div");
        tabsWrap.className = "letter-media-tabs";
        tabsWrap.innerHTML = `
            <button class="letter-media-tab-btn active" id="tabBtnVideo" type="button">🎬 Thước Phim</button>
            <button class="letter-media-tab-btn" id="tabBtnPhotos" type="button">📸 Album Ảnh (${photoList.length})</button>
        `;
        const container = document.createElement("div");
        container.id = "letterMixedContentContainer";

        galleryEl.appendChild(tabsWrap);
        galleryEl.appendChild(container);

        function showVideoView() {
            container.innerHTML = `
                <div class="letter-video-player-wrap">
                    <video id="letterModalVideoEl" class="letter-modal-video" controls playsinline preload="metadata" poster="${memory.poster || (photoList[0] || '')}">
                        <source src="${memory.video}" type="video/mp4">
                        <source src="${memory.video.replace('.mp4', '.webm')}" type="video/webm">
                        Trình duyệt của bạn không hỗ trợ phát video.
                    </video>
                    <div class="letter-video-caption">
                        <span>🎬</span>
                        <span>${title} • Thước phim kỷ niệm</span>
                    </div>
                </div>
            `;
            const vid = document.getElementById("letterModalVideoEl");
            if (vid) {
                vid.addEventListener("play", pauseBgMusicForVideo);
                vid.addEventListener("pause", resumeBgMusicAfterVideo);
                vid.addEventListener("ended", resumeBgMusicAfterVideo);
            }
        }

        function showPhotoView() {
            const curVid = document.getElementById("letterModalVideoEl");
            if (curVid) curVid.pause();
            resumeBgMusicAfterVideo();
            renderLetterModalPhotos(container, photoList, fallbackList, title, memoryIndex);
        }

        const btnVid = tabsWrap.querySelector("#tabBtnVideo");
        const btnPho = tabsWrap.querySelector("#tabBtnPhotos");

        btnVid.addEventListener("click", () => {
            btnVid.classList.add("active");
            btnPho.classList.remove("active");
            showVideoView();
        });

        btnPho.addEventListener("click", () => {
            btnPho.classList.add("active");
            btnVid.classList.remove("active");
            showPhotoView();
        });

        // Mặc định mở tab video trước
        showVideoView();
        return;
    }

    // 3. Trường hợp thuần ảnh
    if (!photoList || photoList.length === 0) {
        galleryEl.style.display = "none";
        return;
    }
    galleryEl.style.display = "block";
    renderLetterModalPhotos(galleryEl, photoList, fallbackList, title, memoryIndex);
}

function renderLetterModalPhotos(container, photoList, fallbackList, title, memoryIndex = 0) {
    if (letterCarouselTimer) {
        clearInterval(letterCarouselTimer);
        letterCarouselTimer = null;
    }

    if (photoList.length === 1) {
        const wrap = document.createElement("div");
        wrap.className = "letter-single-img-wrap";
        const img = document.createElement("img");
        img.src = photoList[0];
        img.alt = title;
        img.className = "letter-single-img";
        img.onerror = () => { img.src = fallbackList[0] || ""; };
        img.addEventListener("click", () => {
            openLightbox(memoryIndex, 0);
        });
        wrap.appendChild(img);
        container.innerHTML = "";
        container.appendChild(wrap);
        return;
    }

    let slidesHtml = "";
    let dotsHtml = "";
    photoList.forEach((src, idx) => {
        const fb = fallbackList[idx] || fallbackList[0] || "";
        slidesHtml += `
            <div class="letter-carousel-slide" data-index="${idx}">
                <img src="${src}" alt="${title} - ảnh ${idx + 1}" loading="eager" decoding="async" onerror="this.onerror=null; this.src='${fb}';">
            </div>
        `;
        dotsHtml += `<button class="letter-c-dot ${idx === 0 ? 'active' : ''}" data-dot="${idx}" aria-label="Xem ảnh ${idx + 1}"></button>`;
    });

    container.innerHTML = `
        <div class="letter-carousel-wrap" id="letterCarouselWrap">
            <div class="letter-carousel-track" id="letterCarouselTrack">
                ${slidesHtml}
            </div>
            <button class="letter-carousel-btn prev-btn" id="letterPrevBtn" aria-label="Ảnh trước">‹</button>
            <button class="letter-carousel-btn next-btn" id="letterNextBtn" aria-label="Ảnh sau">›</button>
            <div class="letter-carousel-dots" id="letterCarouselDots">
                ${dotsHtml}
            </div>
            <div class="letter-carousel-badge" id="letterCarouselBadge">1 / ${photoList.length}</div>
        </div>
    `;

    const wrap = container.querySelector("#letterCarouselWrap");
    const track = container.querySelector("#letterCarouselTrack");
    const prevBtn = container.querySelector("#letterPrevBtn");
    const nextBtn = container.querySelector("#letterNextBtn");
    const dots = container.querySelectorAll(".letter-c-dot");
    const badge = container.querySelector("#letterCarouselBadge");

    let currentSlide = 0;
    const totalSlides = photoList.length;

    function goToSlide(idx) {
        currentSlide = (idx + totalSlides) % totalSlides;
        if (track) {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });
        if (badge) {
            badge.innerText = `${currentSlide + 1} / ${totalSlides}`;
        }
    }

    function startLetterTimer() {
        if (letterCarouselTimer) clearInterval(letterCarouselTimer);
        letterCarouselTimer = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 4000);
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            goToSlide(currentSlide - 1);
            startLetterTimer();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            goToSlide(currentSlide + 1);
            startLetterTimer();
        });
    }

    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            e.stopPropagation();
            const targetIdx = parseInt(dot.getAttribute("data-dot"), 10);
            goToSlide(targetIdx);
            startLetterTimer();
        });
    });

    if (wrap) {
        wrap.addEventListener("click", () => {
            openLightbox(memoryIndex, currentSlide);
        });
        wrap.addEventListener("mouseenter", () => {
            if (letterCarouselTimer) clearInterval(letterCarouselTimer);
        });
        wrap.addEventListener("mouseleave", () => {
            startLetterTimer();
        });
    }

    startLetterTimer();
}

function closeLetterModal() {
    const overlay = document.getElementById("letterModalOverlay");
    if (!overlay || !overlay.classList.contains("active") || overlay.classList.contains("closing")) return;

    if (letterCarouselTimer) {
        clearInterval(letterCarouselTimer);
        letterCarouselTimer = null;
    }

    // Tạm dừng video đang phát nếu có
    const vids = overlay.querySelectorAll("video");
    vids.forEach(v => {
        try { v.pause(); } catch(e) {}
    });
    resumeBgMusicAfterVideo();

    overlay.classList.remove("active");
    void overlay.offsetWidth;
    overlay.classList.add("closing");

    setTimeout(() => {
        overlay.classList.remove("closing");
        overlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }, 1400);
}

/* ========================================================
   LIGHTBOX PHÓNG TO & DUYỆT CẢ ẢNH VÀ VIDEO TRONG KỶ NIỆM
   ======================================================== */
const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxVideo = document.getElementById("lightboxVideo");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lbPrevBtn = document.getElementById("lbPrevBtn");
const lbNextBtn = document.getElementById("lbNextBtn");

function getMemoryMediaList(memory) {
    if (!memory) return [];
    const list = [];
    if (memory.video) {
        list.push({
            type: "video",
            src: memory.video,
            poster: memory.poster || (memory.images && memory.images[0]) || "",
            title: memory.title,
            date: memory.date
        });
    }
    const photoList = memory.images || (memory.image ? [memory.image] : []);
    const fbList = memory.fallbacks || photoList;
    photoList.forEach((src, idx) => {
        list.push({
            type: "image",
            src: src,
            fallback: fbList[idx] || fbList[0] || src,
            title: memory.title,
            date: memory.date
        });
    });
    return list;
}

function initLightboxSystem() {
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener("click", (e) => {
            if (e.target === lightboxOverlay) closeLightbox();
        });
    }

    if (lbPrevBtn) {
        lbPrevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            stepLightboxPhoto(-1);
        });
    }

    if (lbNextBtn) {
        lbNextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            stepLightboxPhoto(1);
        });
    }

    document.addEventListener("keydown", (e) => {
        if (!lightboxOverlay || !lightboxOverlay.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") stepLightboxPhoto(-1);
        if (e.key === "ArrowRight") stepLightboxPhoto(1);
    });
}

function openLightbox(memoryIndex, photoIndex = 0) {
    if (typeof memoryIndex === "number") {
        currentLbMemoryIndex = memoryIndex;
    } else {
        currentLbMemoryIndex = 0;
    }
    currentLbPhotoIndex = typeof photoIndex === "number" ? photoIndex : 0;

    updateLightboxView();
    if (lightboxOverlay) {
        lightboxOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function updateLightboxView() {
    const memory = MEMORIES[currentLbMemoryIndex] || MEMORIES[0];
    if (!memory) return;
    const mediaList = getMemoryMediaList(memory);
    if (!mediaList || mediaList.length === 0) return;

    if (currentLbPhotoIndex >= mediaList.length) {
        currentLbPhotoIndex = 0;
    }

    const currentMedia = mediaList[currentLbPhotoIndex];
    const total = mediaList.length;

    const pageText = total > 1 ? ` (${currentLbPhotoIndex + 1}/${total})` : '';
    const mediaTypeLabel = currentMedia.type === "video" ? "🎬 [Thước phim] " : "";
    if (lightboxCaption) {
        lightboxCaption.innerText = `${mediaTypeLabel}${memory.title} - ${memory.date}${pageText}`;
    }

    if (currentMedia.type === "video") {
        if (lightboxImg) lightboxImg.style.display = "none";
        if (lightboxVideo) {
            lightboxVideo.style.display = "block";
            if (!lightboxVideo.src.endsWith(currentMedia.src)) {
                lightboxVideo.src = currentMedia.src;
            }
            lightboxVideo.poster = currentMedia.poster || "";
            lightboxVideo.load();
            lightboxVideo.play().then(() => {
                pauseBgMusicForVideo();
            }).catch(() => {});

            lightboxVideo.onplay = pauseBgMusicForVideo;
            lightboxVideo.onpause = resumeBgMusicAfterVideo;
            lightboxVideo.onended = resumeBgMusicAfterVideo;
        }
    } else {
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.style.display = "none";
        }
        if (lightboxImg) {
            lightboxImg.style.display = "block";
            lightboxImg.src = currentMedia.src;
            lightboxImg.onerror = () => { lightboxImg.src = currentMedia.fallback || currentMedia.src; };
        }
        resumeBgMusicAfterVideo();
    }

    const showNav = total > 1;
    if (lbPrevBtn) lbPrevBtn.style.display = showNav ? "flex" : "none";
    if (lbNextBtn) lbNextBtn.style.display = showNav ? "flex" : "none";
}

function stepLightboxPhoto(direction) {
    const memory = MEMORIES[currentLbMemoryIndex] || MEMORIES[0];
    if (!memory) return;
    const mediaList = getMemoryMediaList(memory);
    const total = mediaList.length;
    if (total <= 1) return;

    currentLbPhotoIndex = (currentLbPhotoIndex + direction + total) % total;
    updateLightboxView();
}

function closeLightbox() {
    if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.removeAttribute("src");
        lightboxVideo.load();
        lightboxVideo.style.display = "none";
    }
    resumeBgMusicAfterVideo();
    if (lightboxOverlay) {
        lightboxOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }
}

/* ========================================================
   HIỆU ỨNG CUỘN ĐẾN ĐÂU XUẤT HIỆN ĐẾN ĐÓ (SCROLL REVEAL)
   ======================================================== */
function initScrollObserver() {
    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    items.forEach(item => observer.observe(item));
}

/* ========================================================
   HIỆU ỨNG TRỤC THỜI GIAN PHÁT SÁNG DẦN THEO THANH CUỘN (SCROLL PROGRESS)
   ======================================================== */
function initTimelineScrollProgress() {
    const container = document.getElementById("timelineContainer");
    const progressLine = document.getElementById("timelineLineProgress");
    if (!container || !progressLine) return;

    let ticking = false;

    function updateProgress() {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Vị trí tiêu điểm kích hoạt (khoảng 65% chiều cao màn hình)
        const scrollFocusY = windowHeight * 0.65;
        const totalHeight = container.offsetHeight;
        const currentScrolled = scrollFocusY - rect.top;

        let percentage = (currentScrolled / totalHeight) * 100;
        percentage = Math.max(0, Math.min(percentage, 100));

        progressLine.style.height = `${percentage}%`;

        // Thắp sáng các mốc kỷ niệm mà thanh tiến trình đã cuộn tới
        const items = container.querySelectorAll(".timeline-item");
        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            if (itemRect.top <= scrollFocusY + 30) {
                item.classList.add("illuminated");
            } else {
                item.classList.remove("illuminated");
            }
        });

        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener("resize", () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });

    updateProgress();
}

/* ========================================================
   HỆ THỐNG PHÁT NHẠC VINTAGE LUXURY MUSIC BOX (VINYL RECORD PLAYER)
   - Phát cuốn chiếu tuần tự 4 bài hát (Sequential Playlist)
   - Tự động chuyển bài tiếp theo khi bài hiện tại kết thúc
   - Tự động bật nhạc khi mở trang web (Autoplay)
   - Tự động mở khóa ngay cử chỉ đầu tiên (click, chạm, cuộn, phím)
   - Đầy đủ nút: Lùi bài (⏮), Tiến bài (⏭), Bật/Tắt (▶/⏸)
   - Thanh tiến trình bài hát thời gian thực (Progress bar) có thể nhấp tua
   - Menu danh sách 4 bài hát bung mở (Dropdown Playlist) có thể chọn bài tùy thích
   ======================================================== */
const bgAudio = document.getElementById("bgMusic");
const musicWidget = document.getElementById("musicWidget");
const musicSongName = document.getElementById("musicSongName");
const musicSongArtist = document.getElementById("musicSongArtist");
const musicTrackBadge = document.getElementById("musicTrackBadge");
const musicSkipBtn = document.getElementById("musicSkipBtn");
const musicPrevBtn = document.getElementById("musicPrevBtn");
const musicDiscBtn = document.getElementById("musicDiscBtn");
const musicInfoBox = document.getElementById("musicInfoBox");
const musicPlayIcon = document.getElementById("musicPlayIcon");
const musicTimeDisplay = document.getElementById("musicTimeDisplay");
const musicProgressBar = document.getElementById("musicProgressBar");
const musicProgressContainer = document.getElementById("musicProgressContainer");
const musicPlaylistToggleBtn = document.getElementById("musicPlaylistToggleBtn");
const musicPlaylistDrawer = document.getElementById("musicPlaylistDrawer");
const playlistDrawerList = document.getElementById("playlistDrawerList");

let userManuallyPaused = false;
let unlockListenersAttached = false;

const unlockEvents = [
    "click", "touchstart", "touchend", "mousedown", "pointerdown",
    "pointerup", "keydown", "wheel", "scroll"
];

function initAudioSystem() {
    // Nạp bài đầu tiên trong danh sách 4 bài và dựng danh sách bài hát
    renderPlaylistDrawer();
    loadTrack(currentTrackIndex);

    // KHI BÀI HÁT KẾT THÚC -> TỰ ĐỘNG PHÁT BÀI TIẾP THEO (PHÁT CUỐN CHIẾU)
    if (bgAudio) {
        bgAudio.addEventListener("ended", () => {
            playNextTrack();
        });

        // Nếu file nhạc bị lỗi hoặc đường dẫn không tải được -> tự động thử bài kế tiếp
        bgAudio.addEventListener("error", (e) => {
            console.warn("Lỗi tải bài hát hiện tại, tự động chuyển bài tiếp theo:", e);
            setTimeout(playNextTrack, 1000);
        });

        // Cập nhật tiến trình chạy bài hát theo thời gian thực (Progress bar & Time counter)
        bgAudio.addEventListener("timeupdate", () => {
            if (!bgAudio.duration || isNaN(bgAudio.duration)) return;
            const progress = (bgAudio.currentTime / bgAudio.duration) * 100;
            if (musicProgressBar) {
                musicProgressBar.style.width = `${progress}%`;
            }
            if (musicTimeDisplay) {
                musicTimeDisplay.innerText = formatAudioTime(bgAudio.currentTime);
            }
        });
    }

    // Nhấp vào thanh tiến trình để tua nhanh/chậm bài hát
    if (musicProgressContainer) {
        musicProgressContainer.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!bgAudio || !bgAudio.duration || isNaN(bgAudio.duration)) return;
            const rect = musicProgressContainer.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            const targetTime = Math.max(0, Math.min(1, clickPos)) * bgAudio.duration;
            bgAudio.currentTime = targetTime;
        });
    }

    // Thử tự động phát ngay khi nạp DOM
    tryAutoPlay();

    // Lắng nghe thêm sự kiện nạp hoàn tất trang và khi tab được active để tự động bật
    window.addEventListener("load", tryAutoPlay, { once: true });
    window.addEventListener("pageshow", tryAutoPlay, { once: true });
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && !isAudioPlaying && !userManuallyPaused) {
            tryAutoPlay();
        }
    });

    // Lắng nghe cử chỉ tương tác đầu tiên để kích hoạt phát nhạc
    attachUnlockListeners();

    // Nút Bắt đầu hành trình cũng kích hoạt phát nhạc ngay lập tức
    const startBtn = document.getElementById("startJourneyBtn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            if (!isAudioPlaying && !userManuallyPaused) {
                playAudio();
            }
        });
    }

    // Nút Chuyển bài kế tiếp (⏭)
    if (musicSkipBtn) {
        musicSkipBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            userManuallyPaused = false;
            playNextTrack();
        });
    }

    // Nút Lùi bài trước (⏮)
    if (musicPrevBtn) {
        musicPrevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            userManuallyPaused = false;
            playPrevTrack();
        });
    }

    // Nút Bật/Đóng Menu danh sách bài hát (🎶)
    if (musicPlaylistToggleBtn && musicPlaylistDrawer) {
        musicPlaylistToggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = musicPlaylistDrawer.classList.toggle("open");
            musicPlaylistDrawer.setAttribute("aria-hidden", String(!isOpen));
        });
    }

    // Nhấp ra ngoài widget để tự động đóng Menu danh sách bài hát
    document.addEventListener("click", (e) => {
        if (musicPlaylistDrawer && musicPlaylistDrawer.classList.contains("open")) {
            if (!e.target.closest("#musicWidget")) {
                musicPlaylistDrawer.classList.remove("open");
                musicPlaylistDrawer.setAttribute("aria-hidden", "true");
            }
        }
    });

    // Phím Escape để đóng Menu danh sách phát
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && musicPlaylistDrawer && musicPlaylistDrawer.classList.contains("open")) {
            musicPlaylistDrawer.classList.remove("open");
            musicPlaylistDrawer.setAttribute("aria-hidden", "true");
        }
    });

    // Tương tác Bật / Tắt khi nhấp vào đĩa than hoặc khối thông tin bài hát
    const toggleAudioPlay = (e) => {
        e.stopPropagation();
        if (isAudioPlaying) {
            userManuallyPaused = true;
            pauseAudio();
        } else {
            userManuallyPaused = false;
            playAudio();
        }
    };

    if (musicDiscBtn) {
        musicDiscBtn.addEventListener("click", toggleAudioPlay);
    }
    if (musicInfoBox) {
        musicInfoBox.addEventListener("click", toggleAudioPlay);
    }
    const musicPlayBtn = document.getElementById("musicPlayBtn");
    if (musicPlayBtn) {
        musicPlayBtn.addEventListener("click", toggleAudioPlay);
    }
}

/**
 * Định dạng số giây thành chuỗi mm:ss
 */
function formatAudioTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Dựng danh sách 4 bài hát trong Menu Drawer
 */
function renderPlaylistDrawer() {
    if (!playlistDrawerList) return;
    playlistDrawerList.innerHTML = "";

    PLAYLIST.forEach((song, idx) => {
        const item = document.createElement("div");
        const isActive = (idx === currentTrackIndex);
        item.className = `playlist-item ${isActive ? 'active' : ''}`;
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.setAttribute("title", `Phát bài: ${song.title} - ${song.artist}`);

        const statusIcon = isActive ? (isAudioPlaying ? '🎵' : '⏸') : '▶';

        item.innerHTML = `
            <span class="p-item-num">${idx + 1}</span>
            <div class="p-item-info">
                <div class="p-item-title">${song.title}</div>
                <div class="p-item-artist">${song.artist}</div>
            </div>
            <span class="p-item-status">${statusIcon}</span>
        `;

        item.addEventListener("click", (e) => {
            e.stopPropagation();
            userManuallyPaused = false;
            loadTrack(idx);
            playAudio().catch(err => console.warn(err));
        });

        playlistDrawerList.appendChild(item);
    });
}

/**
 * Nạp thông tin bài hát theo index trong danh sách PLAYLIST
 */
function loadTrack(index) {
    if (!bgAudio || index < 0 || index >= PLAYLIST.length) return;
    currentTrackIndex = index;
    const song = PLAYLIST[currentTrackIndex];

    // Gán source trực tiếp với đường dẫn đã mã hóa URI an toàn
    const safeSrc = encodeURI(song.src);
    bgAudio.src = safeSrc;
    bgAudio.load();

    if (musicProgressBar) {
        musicProgressBar.style.width = "0%";
    }
    if (musicTimeDisplay) {
        musicTimeDisplay.innerText = "00:00";
    }

    syncSongInfo();
    renderPlaylistDrawer();
}

/**
 * Chuyển sang bài tiếp theo theo vòng tròn cuốn chiếu
 */
function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    loadTrack(currentTrackIndex);
    playAudio().catch((err) => {
        console.warn("Chưa thể phát ngay bài tiếp theo:", err);
    });
}

/**
 * Lùi về bài trước đó
 */
function playPrevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    loadTrack(currentTrackIndex);
    playAudio().catch((err) => {
        console.warn("Chưa thể phát ngay bài trước:", err);
    });
}

function handleUnlockEvent() {
    if (userManuallyPaused) {
        removeUnlockListeners();
        return;
    }
    if (!isAudioPlaying) {
        playAudio()
            .then(() => {
                removeUnlockListeners();
            })
            .catch(() => {
                // Nếu trình duyệt vẫn chặn, giữ listener để thử lại ở tương tác tiếp theo
            });
    } else {
        removeUnlockListeners();
    }
}

function attachUnlockListeners() {
    if (unlockListenersAttached) return;
    unlockListenersAttached = true;
    unlockEvents.forEach((evt) => {
        window.addEventListener(evt, handleUnlockEvent, { capture: true, passive: true });
        document.addEventListener(evt, handleUnlockEvent, { capture: true, passive: true });
    });
}

function removeUnlockListeners() {
    if (!unlockListenersAttached) return;
    unlockListenersAttached = false;
    unlockEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUnlockEvent, { capture: true });
        document.removeEventListener(evt, handleUnlockEvent, { capture: true });
    });
}

function syncSongInfo() {
    const currentSong = PLAYLIST[currentTrackIndex] || PLAYLIST[0];
    const displayTitle = currentSong.title;
    const displayArtist = currentSong.artist;
    const badgeText = `${currentTrackIndex + 1}/${PLAYLIST.length}`;

    if (musicSongName) {
        musicSongName.innerText = displayTitle;
        musicSongName.title = `${displayTitle} - ${displayArtist} (${badgeText})`;
    }
    if (musicSongArtist) {
        musicSongArtist.innerText = displayArtist;
        musicSongArtist.title = displayArtist;
    }
    if (musicTrackBadge) {
        musicTrackBadge.innerText = badgeText;
        musicTrackBadge.title = `Bài số ${currentTrackIndex + 1} trên tổng số ${PLAYLIST.length} bài (Bấm để xem danh sách)`;
    }
}

function tryAutoPlay() {
    if (!bgAudio || userManuallyPaused || isAudioPlaying) return;
    bgAudio.muted = false;
    bgAudio.volume = 0.8;
    const playPromise = bgAudio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            isAudioPlaying = true;
            updateMusicUI(true);
            removeUnlockListeners();
        }).catch(() => {
            isAudioPlaying = false;
            updateMusicUI(false);
        });
    }
}

function playAudio() {
    if (!bgAudio) return Promise.reject("Không tìm thấy audio");
    bgAudio.muted = false;
    bgAudio.volume = 0.8;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
        return playPromise.then(() => {
            isAudioPlaying = true;
            updateMusicUI(true);
        }).catch((err) => {
            console.log("Audio autoplay waiting for user interaction:", err);
            isAudioPlaying = false;
            updateMusicUI(false);
            throw err;
        });
    }
    return Promise.resolve();
}

function pauseAudio() {
    if (!bgAudio) return;
    bgAudio.pause();
    isAudioPlaying = false;
    updateMusicUI(false);
}

let musicNoteTimer = null;

/* ========================================================
   HIỆU ỨNG NỐT NHẠC BAY TỪ ĐĨA THAN (FLOATING MUSIC NOTES)
   ======================================================== */
function startFloatingNotes() {
    if (musicNoteTimer) return;
    const stream = document.getElementById("vinylNotesStream");
    if (!stream) return;

    const symbols = ["♪", "♫", "♩", "♬", "✨", "🤍", "💕"];

    function spawnNote() {
        if (!isAudioPlaying) return;

        const note = document.createElement("span");
        note.className = "floating-music-note";
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        note.innerText = symbol;

        // Vị trí bay ra ngẫu nhiên quanh đĩa than
        const randomX = Math.random() * 32 - 16;
        const animVariant = Math.floor(Math.random() * 3) + 1;
        note.classList.add(`note-variant-${animVariant}`);
        note.style.left = `${34 + randomX}px`;

        stream.appendChild(note);

        // Tự hủy element sau khi bay xong (~3.3s)
        setTimeout(() => {
            if (note.parentNode) {
                note.parentNode.removeChild(note);
            }
        }, 3300);
    }

    spawnNote();
    musicNoteTimer = setInterval(spawnNote, 1400);
}

function stopFloatingNotes() {
    if (musicNoteTimer) {
        clearInterval(musicNoteTimer);
        musicNoteTimer = null;
    }
}

function updateMusicUI(playing) {
    if (!musicWidget) return;

    syncSongInfo();
    renderPlaylistDrawer();

    if (musicPlayIcon) {
        musicPlayIcon.innerText = playing ? "⏸" : "▶";
    }
    const musicPlayCenterIcon = document.getElementById("musicPlayCenterIcon");
    if (musicPlayCenterIcon) {
        musicPlayCenterIcon.innerText = playing ? "⏸" : "▶";
    }
    const musicPlayBtn = document.getElementById("musicPlayBtn");
    if (musicPlayBtn) {
        musicPlayBtn.title = playing ? "Tạm dừng ⏸" : "Phát nhạc ▶";
        musicPlayBtn.setAttribute("aria-label", playing ? "Tạm dừng" : "Phát nhạc");
    }

    if (playing) {
        musicWidget.classList.remove("paused");
        musicWidget.classList.add("playing");
        startFloatingNotes();
    } else {
        musicWidget.classList.remove("playing");
        musicWidget.classList.add("paused");
        stopFloatingNotes();
    }
}

/* ========================================================
   AMBIENT PARTICLES (HẠT ĐOM ĐÓM & SAO LẤP LÁNH NỀN)
   ======================================================== */
function initAmbientParticles() {
    const canvas = document.getElementById("ambientCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor(width / 32), 38);

    for (let i = 0; i < count; i++) {
        const isSparkle = Math.random() < 0.35;
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: isSparkle ? (Math.random() * 3 + 2.2) : (Math.random() * 2 + 0.8),
            speedY: Math.random() * 0.3 + 0.08,
            speedX: (Math.random() - 0.5) * 0.22,
            opacity: Math.random() * 0.45 + 0.15,
            glow: Math.random() * 8 + 4,
            isSparkle: isSparkle,
            color: Math.random() < 0.45 ? '#c9933b' : '#d96b52',
            twinkleSpeed: Math.random() * 0.03 + 0.015,
            twinklePhase: Math.random() * Math.PI * 2
        });
    }

    function drawSparkle(context, cx, cy, spikes, outerRadius, innerRadius, color, alpha) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        context.save();
        context.beginPath();
        context.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            context.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            context.lineTo(x, y);
            rot += step;
        }
        context.lineTo(cx, cy - outerRadius);
        context.closePath();
        context.fillStyle = color;
        context.globalAlpha = alpha;
        context.fill();
        context.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.y -= p.speedY;
            p.x += p.speedX;
            p.twinklePhase += p.twinkleSpeed;
            const currentAlpha = p.opacity * (0.65 + 0.35 * Math.sin(p.twinklePhase));

            if (p.y < 0) {
                p.y = height;
                p.x = Math.random() * width;
            }

            if (p.isSparkle) {
                ctx.save();
                ctx.shadowBlur = p.glow;
                ctx.shadowColor = p.color;
                drawSparkle(ctx, p.x, p.y, 4, p.radius, p.radius * 0.35, p.color, currentAlpha);
                ctx.restore();
            } else {
                ctx.save();
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color === '#c9933b' 
                    ? `rgba(201, 147, 59, ${currentAlpha})` 
                    : `rgba(217, 107, 82, ${currentAlpha})`;
                ctx.shadowBlur = p.glow;
                ctx.shadowColor = p.color;
                ctx.fill();
                ctx.restore();
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}


/* ========================================================
   HỆ THỐNG ĐỔI GIAO DIỆN MÀU SẮC (12 THEMES PHÂN LOẠI & XEM THỬ REALTIME)
   ======================================================== */
function initThemeSwitcher() {
    // Thống nhất toàn bộ sử dụng theme hoàng hôn (sunset)
    document.documentElement.setAttribute('data-theme', 'sunset');
    try {
        localStorage.setItem('couple_love_theme', 'sunset');
    } catch (e) {}
}


/* ========================================================
   QUẢN LÝ VÀ CHỈNH SỬA THƯ KỶ NIỆM (MEMORY LETTER EDITOR)
   - Lưu trữ và đồng bộ qua localStorage
   - Cho phép chỉnh sửa tiêu đề, nhãn thời gian, địa điểm và toàn bộ nội dung thư
   ======================================================== */
const STORAGE_CUSTOM_MEMORIES = "couple_custom_memories_v2";
const ORIGINAL_MEMORIES = JSON.parse(JSON.stringify(MEMORIES));
let currentlyEditingMemoryIndex = null;

function loadCustomMemories() {
    try {
        const saved = localStorage.getItem(STORAGE_CUSTOM_MEMORIES);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                parsed.forEach(custom => {
                    const idx = MEMORIES.findIndex(m => m.id === custom.id);
                    if (idx !== -1) {
                        if (custom.title) MEMORIES[idx].title = custom.title;
                        if (custom.date) MEMORIES[idx].date = custom.date;
                        if (custom.location) MEMORIES[idx].location = custom.location;
                        if (custom.story) MEMORIES[idx].story = custom.story;
                    }
                });
            }
        }
    } catch (e) {
        console.warn("Could not load custom memories:", e);
    }
}

function saveCustomMemories() {
    try {
        const toSave = MEMORIES.map(m => ({
            id: m.id,
            title: m.title,
            date: m.date,
            location: m.location,
            story: m.story
        }));
        localStorage.setItem(STORAGE_CUSTOM_MEMORIES, JSON.stringify(toSave));
    } catch (e) {
        console.warn("Could not save custom memories:", e);
    }
}

function initMemoryEditor() {
    loadCustomMemories();

    const btnNav = document.getElementById("btnEditMemoriesNav");
    const btnModal = document.getElementById("btnOpenLetterEditorFromModal");
    const modalEditor = document.getElementById("modalMemoryEditor");
    const btnClose = document.getElementById("btnCloseMemoryEditor");
    const btnBack = document.getElementById("btnBackToEditorList");
    const btnRestore = document.getElementById("btnRestoreAllLetters");
    const btnPreview = document.getElementById("btnPreviewLetterFromEdit");
    const textarea = document.getElementById("editMemStory");

    function openEditorModal() {
        if (!modalEditor) return;
        renderEditorMemoriesList();
        showEditorListView();
        modalEditor.classList.add("active");
        const themeModal = document.getElementById("themeModalOverlay");
        if (themeModal) themeModal.classList.remove("active");
    }

    function closeEditorModal() {
        if (!modalEditor) return;
        modalEditor.classList.remove("active");
    }

    if (btnNav) btnNav.addEventListener("click", openEditorModal);
    if (btnModal) btnModal.addEventListener("click", openEditorModal);
    if (btnClose) btnClose.addEventListener("click", closeEditorModal);
    if (btnBack) btnBack.addEventListener("click", showEditorListView);

    if (modalEditor) {
        modalEditor.addEventListener("click", (e) => {
            if (e.target === modalEditor) closeEditorModal();
        });
    }

    if (textarea) {
        textarea.addEventListener("input", () => {
            updateWordCount(textarea.value);
        });
    }

    if (btnRestore) {
        btnRestore.addEventListener("click", () => {
            if (confirm("Bạn có chắc chắn muốn khôi phục lại toàn bộ nội dung các bức thư ban đầu?")) {
                localStorage.removeItem(STORAGE_CUSTOM_MEMORIES);
                ORIGINAL_MEMORIES.forEach((orig, idx) => {
                    MEMORIES[idx] = JSON.parse(JSON.stringify(orig));
                });
                renderEditorMemoriesList();
                loadCustomMemories();
    renderMemoriesFlowing();
                renderIntroPolaroids();
                alert("Đã khôi phục lại các bức thư gốc thành công!");
            }
        });
    }

    if (btnPreview) {
        btnPreview.addEventListener("click", () => {
            if (currentlyEditingMemoryIndex !== null) {
                closeEditorModal();
                setTimeout(() => {
                    openLetterModal(currentlyEditingMemoryIndex);
                }, 200);
            }
        });
    }
}

function updateWordCount(text) {
    const badge = document.getElementById("storyWordCount");
    if (!badge) return;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    badge.textContent = `${words} từ • ${text.length} ký tự`;
}

function showEditorListView() {
    const listView = document.getElementById("editorViewList");
    const formView = document.getElementById("editorViewForm");
    const titleEl = document.getElementById("editorHeaderTitle");
    const subEl = document.getElementById("editorHeaderSub");

    if (listView) listView.style.display = "block";
    if (formView) formView.style.display = "none";
    if (titleEl) titleEl.textContent = "Danh Sách Kỷ Niệm";
    if (subEl) subEl.textContent = "Chọn một bức thư để chỉnh sửa nội dung tâm tình gửi người thương";
    currentlyEditingMemoryIndex = null;
}

function showEditorFormView(index) {
    const listView = document.getElementById("editorViewList");
    const formView = document.getElementById("editorViewForm");
    const titleEl = document.getElementById("editorHeaderTitle");
    const subEl = document.getElementById("editorHeaderSub");
    const currentTag = document.getElementById("editorCurrentMemTag");

    currentlyEditingMemoryIndex = index;
    const mem = MEMORIES[index];
    if (!mem) return;

    if (listView) listView.style.display = "none";
    if (formView) formView.style.display = "block";
    if (titleEl) titleEl.textContent = `Chỉnh Sửa Bức Thư: ${mem.title}`;
    if (subEl) subEl.textContent = "Chỉnh sửa tiêu đề, nhãn thời gian và toàn bộ lời tâm sự";
    if (currentTag) currentTag.textContent = `Kỷ niệm #${index + 1}: ${mem.title}`;

    document.getElementById("editMemTitle").value = mem.title || "";
    document.getElementById("editMemDate").value = mem.date || "";
    document.getElementById("editMemLocation").value = mem.location || "";
    const textarea = document.getElementById("editMemStory");
    if (textarea) {
        textarea.value = mem.story || "";
        updateWordCount(textarea.value);
    }
}

function renderEditorMemoriesList() {
    const grid = document.getElementById("editorMemoriesCardsGrid");
    if (!grid) return;
    grid.innerHTML = "";

    MEMORIES.forEach((mem, idx) => {
        const card = document.createElement("div");
        card.className = "editor-memory-card";

        const thumb = (mem.images && mem.images.length > 0) ? mem.images[0] : (mem.poster || mem.fallbacks[0] || "images/DSC03633.jpeg");
        const snippet = mem.story ? (mem.story.length > 100 ? mem.story.substring(0, 100) + "..." : mem.story) : "";

        card.innerHTML = `
            <div class="editor-card-thumb-wrap">
                <img src="${thumb}" alt="${mem.title}" class="editor-card-thumb" onerror="this.src='images/DSC03633.jpeg'" />
            </div>
            <div class="editor-card-body">
                <div class="editor-card-badges">
                    <span class="editor-badge-tag">${mem.date}</span>
                </div>
                <h4 class="editor-card-title">${mem.title}</h4>
                <p class="editor-card-snippet">${snippet}</p>
                <button class="editor-btn-select-mem" type="button" onclick="window.selectMemoryToEdit(${idx})">
                    <span>Chỉnh Sửa Thư</span>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

window.selectMemoryToEdit = function(index) {
    showEditorFormView(index);
};

window.saveCurrentEditingMemory = function() {
    if (currentlyEditingMemoryIndex === null) return;
    const idx = currentlyEditingMemoryIndex;
    const mem = MEMORIES[idx];
    if (!mem) return;

    const title = document.getElementById("editMemTitle").value.trim();
    const date = document.getElementById("editMemDate").value.trim();
    const location = document.getElementById("editMemLocation").value.trim();
    const story = document.getElementById("editMemStory").value.trim();

    if (!title || !story) {
        alert("Vui lòng điền đầy đủ tiêu đề và nội dung bức thư nhé!");
        return;
    }

    mem.title = title;
    mem.date = date;
    mem.location = location;
    mem.story = story;

    saveCustomMemories();

    // Re-render carousel and polaroids
    if (typeof renderMemoriesFlowing === "function") loadCustomMemories();
    renderMemoriesFlowing();
    if (typeof renderIntroPolaroids === "function") renderIntroPolaroids();

    alert("✨ Đã lưu bức thư kỷ niệm thành công!");
    showEditorListView();
    renderEditorMemoriesList();
};

// Tự động khởi chạy trình chỉnh sửa thư kỷ niệm
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initMemoryEditor();
        });
    } else {
        setTimeout(initMemoryEditor, 50);
    }
}


/* ========================================================
   HỆ THỐNG TỰ ĐỘNG TẢI NHẠC & TRA CỨU NGƯỢC THÔNG TIN TRÊN WEB
   ======================================================== */
let pendingUploadedAudioBlob = null;
let pendingAudioObjectUrl = null;

function initMusicUploadSystem() {
    const triggerBtn = document.getElementById("musicUploadTriggerBtn");
    const drawerUploadBtn = document.getElementById("btnDrawerUploadMusic");
    const fileInput = document.getElementById("musicUploadFileInput");
    const modal = document.getElementById("modalEditMusicInfo");
    const btnCancel = document.getElementById("btnCancelAddMusic");
    const btnConfirm = document.getElementById("btnConfirmAddMusic");

    if (triggerBtn && fileInput) {
        triggerBtn.addEventListener("click", () => fileInput.click());
    }
    if (drawerUploadBtn && fileInput) {
        drawerUploadBtn.addEventListener("click", () => fileInput.click());
    }

    if (fileInput) {
        fileInput.addEventListener("change", async (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            pendingUploadedAudioBlob = file;
            if (pendingAudioObjectUrl) URL.revokeObjectURL(pendingAudioObjectUrl);
            pendingAudioObjectUrl = URL.createObjectURL(file);

            // 1. Phân tích tên file
            const parsed = extractSongInfoFromFileName(file.name);
            
            // Đo thời lượng audio
            let durationStr = "03:30";
            try {
                const tempAudio = new Audio(pendingAudioObjectUrl);
                await new Promise((res) => {
                    tempAudio.addEventListener("loadedmetadata", () => {
                        const m = Math.floor(tempAudio.duration / 60);
                        const s = Math.floor(tempAudio.duration % 60);
                        durationStr = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
                        res();
                    }, { once: true });
                    setTimeout(res, 1200); // timeout an toàn
                });
            } catch (err) {}

            // Điền trước thông tin phân tích được
            const titleInput = document.getElementById("musicEditTitleInput");
            const artistInput = document.getElementById("musicEditArtistInput");
            const coverPreview = document.getElementById("musicEditCoverPreview");
            const coverInput = document.getElementById("musicEditCoverInput");
            const durTag = document.getElementById("musicEditDurationTag");

            if (titleInput) titleInput.value = parsed.title;
            if (artistInput) artistInput.value = parsed.artist;
            if (durTag) durTag.textContent = durationStr;
            if (coverPreview) coverPreview.src = "images/favicon.png";
            if (coverInput) coverInput.value = "";

            // Hiển thị modal để người dùng xem và chỉnh sửa
            if (modal) modal.classList.add("active");

            // 2. Tra cứu ngược trên Web (iTunes Music Search API)
            try {
                const webInfo = await reverseLookupSongOnWeb(parsed.query || parsed.title);
                if (webInfo) {
                    if (webInfo.title && titleInput) titleInput.value = webInfo.title;
                    if (webInfo.artist && artistInput) artistInput.value = webInfo.artist;
                    if (webInfo.cover) {
                        if (coverPreview) coverPreview.src = webInfo.cover;
                        if (coverInput) coverInput.value = webInfo.cover;
                    }
                    showMusicToast(`Đã tự động nhận diện bài hát: ${webInfo.title} - ${webInfo.artist}`);
                }
            } catch (err) {
                console.warn("Tra cứu ngược không thành công, dùng dữ liệu phân tích từ file:", err);
            }
        });
    }

    if (btnCancel && modal) {
        btnCancel.addEventListener("click", () => {
            modal.classList.remove("active");
            if (fileInput) fileInput.value = "";
        });
    }

    if (btnConfirm && modal) {
        btnConfirm.addEventListener("click", () => {
            const titleInput = document.getElementById("musicEditTitleInput");
            const artistInput = document.getElementById("musicEditArtistInput");
            const coverInput = document.getElementById("musicEditCoverInput");

            const finalTitle = (titleInput && titleInput.value.trim()) || "Bài Hát Tình Yêu";
            const finalArtist = (artistInput && artistInput.value.trim()) || "Nghệ sĩ";
            const finalCover = (coverInput && coverInput.value.trim()) || "images/favicon.png";

            if (!pendingAudioObjectUrl) {
                alert("Vui lòng chọn một file nhạc!");
                return;
            }

            const newTrack = {
                id: 'custom_audio_' + Date.now(),
                title: finalTitle,
                artist: finalArtist,
                src: pendingAudioObjectUrl,
                cover: finalCover,
                isCustom: true
            };

            // Thêm vào Playlist
            PLAYLIST.push(newTrack);

            // Lưu metadata vào localStorage
            try {
                const existingCustom = JSON.parse(localStorage.getItem('couple_custom_music_v2') || '[]');
                existingCustom.push(newTrack);
                localStorage.setItem('couple_custom_music_v2', JSON.stringify(existingCustom));
            } catch (e) {}

            modal.classList.remove("active");
            if (fileInput) fileInput.value = "";

            // Tự động chuyển bài và phát ngay lập tức
            renderPlaylistDrawer();
            currentTrackIndex = PLAYLIST.length - 1;
            loadTrack(currentTrackIndex);
            playAudio();

            showMusicToast(`Đã thêm "${finalTitle}" vào danh sách phát và đang tự động phát!`);
        });
    }
}

function extractSongInfoFromFileName(filename) {
    let name = filename.replace(/\.[^/.]+$/, ""); // bỏ đuôi file
    name = name.replace(/\[(?:official|lyrics|hd|audio|mv|320kbps|lossless|audio visualizer)[^\]]*\]/gi, "");
    name = name.replace(/\((?:official|lyrics|hd|audio|mv|remix)[^\)]*\)/gi, "");
    name = name.replace(/^\d+[\.\-\s]+/, ""); // bỏ số thứ tự ở đầu "01. "
    name = name.trim();

    let title = name;
    let artist = "Nghệ sĩ";

    if (name.includes(" - ")) {
        const parts = name.split(" - ");
        artist = parts[0].trim();
        title = parts.slice(1).join(" - ").trim();
    } else if (name.includes(" – ")) {
        const parts = name.split(" – ");
        artist = parts[0].trim();
        title = parts.slice(1).join(" – ").trim();
    } else if (name.includes("_")) {
        const parts = name.split("_");
        title = parts.join(" ").trim();
    }
    return { title, artist, query: `${title} ${artist}`.trim() };
}

async function reverseLookupSongOnWeb(query) {
    try {
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`);
        if (!res.ok) return null;
        const data = await res.json();
        if (data.results && data.results.length > 0) {
            const song = data.results[0];
            return {
                title: song.trackName || "",
                artist: song.artistName || "",
                cover: (song.artworkUrl100 || "").replace("100x100bb", "600x600bb")
            };
        }
    } catch (e) {}
    return null;
}

function showMusicToast(msg) {
    const toast = document.createElement("div");
    toast.style.cssText = "position:fixed; top:24px; left:50%; transform:translateX(-50%); background:#292524; color:#fff; padding:10px 20px; border-radius:999px; font-size:12.5px; font-weight:700; z-index:3000; box-shadow:0 8px 24px rgba(0,0,0,0.25); animation:fadeIn 0.3s ease;";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 400);
    }, 2800);
}


/* ========================================================
   HỆ THỐNG TỰ TẠO KỶ NIỆM VỚI THEME THƯ CÓ SẴN
   ======================================================== */
let newMemPhotosList = [];
let newMemVideoData = null;

function initMemoryCreateSystem() {
    const btnOpen = document.getElementById("btnOpenCreateMemory");
    const modal = document.getElementById("modalCreateMemory");
    const btnClose = document.getElementById("btnCloseCreateMemory");
    const btnCloseCorner = document.getElementById("btnCloseCreateMemoryCorner");
    const form = document.getElementById("formCreateMemory");
    const imgInput = document.getElementById("memImagesInput");
    const btnBrowseImg = document.getElementById("btnBrowseImages");
    const previewsGrid = document.getElementById("memImagePreviews");
    const videoInput = document.getElementById("memVideoInput");
    const btnBrowseVid = document.getElementById("btnBrowseVideo");
    const videoUrlInput = document.getElementById("newMemVideoUrl");
    const videoPreviewWrap = document.getElementById("memVideoPreviewWrap");

    if (btnOpen && modal) {
        btnOpen.addEventListener("click", () => {
            modal.classList.add("active");
            const dateInput = document.getElementById("newMemDate");
            if (dateInput && !dateInput.value) {
                dateInput.value = new Date().toISOString().split('T')[0];
            }
        });
    }

    if (btnClose && modal) {
        btnClose.addEventListener("click", () => modal.classList.remove("active"));
    }
    if (btnCloseCorner && modal) {
        btnCloseCorner.addEventListener("click", () => modal.classList.remove("active"));
    }

    // Tải ảnh lên
    if (btnBrowseImg && imgInput) {
        btnBrowseImg.addEventListener("click", () => imgInput.click());
    }

    if (imgInput) {
        imgInput.addEventListener("change", (e) => {
            const files = Array.from(e.target.files || []);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (re) => {
                    newMemPhotosList.push(re.target.result);
                    renderMemPhotosPreviews();
                };
                reader.readAsDataURL(file);
            });
        });
    }

    function renderMemPhotosPreviews() {
        if (!previewsGrid) return;
        previewsGrid.innerHTML = "";
        newMemPhotosList.forEach((src, idx) => {
            const wrap = document.createElement("div");
            wrap.className = "mem-thumb-wrap";
            wrap.innerHTML = `
                <img src="${src}" class="mem-thumb-img" alt="Ảnh kỷ niệm">
                <button type="button" class="mem-thumb-remove" title="Xóa ảnh">&times;</button>
            `;
            wrap.querySelector(".mem-thumb-remove").addEventListener("click", () => {
                newMemPhotosList.splice(idx, 1);
                renderMemPhotosPreviews();
            });
            previewsGrid.appendChild(wrap);
        });
    }

    // Tải video lên
    if (btnBrowseVid && videoInput) {
        btnBrowseVid.addEventListener("click", () => videoInput.click());
    }

    if (videoInput) {
        videoInput.addEventListener("change", (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            newMemVideoData = URL.createObjectURL(file);
            renderVideoPreview(newMemVideoData);
        });
    }

    if (videoUrlInput) {
        videoUrlInput.addEventListener("input", (e) => {
            const url = e.target.value.trim();
            if (url) {
                newMemVideoData = url;
                renderVideoPreview(url);
            }
        });
    }

    function renderVideoPreview(src) {
        if (!videoPreviewWrap) return;
        videoPreviewWrap.style.display = "block";
        videoPreviewWrap.innerHTML = `
            <video src="${src}" controls style="max-width:100%; height:120px; border-radius:12px; border:1px solid #d6d3d1; object-fit:cover;"></video>
        `;
    }

    // Submit form tạo kỷ niệm
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = document.getElementById("newMemTitle").value.trim();
            const rawDate = document.getElementById("newMemDate").value;
            const location = document.getElementById("newMemLocation").value.trim() || "Kỷ niệm yêu thương";
            const story = document.getElementById("newMemStory").value.trim();
            const theme = "autumn"; // Thống nhất theme hoàng hôn

            // Format date to DD/MM/YYYY
            let dateFormatted = rawDate;
            if (rawDate && rawDate.includes("-")) {
                const parts = rawDate.split("-");
                dateFormatted = `${parts[2]}/${parts[1]}/${parts[0]}`;
            }

            const images = newMemPhotosList.length > 0 ? [...newMemPhotosList] : ["images/IMG_4151_poster.jpg"];

            const newMemoryItem = {
                id: 'custom_mem_' + Date.now(),
                title: title,
                date: dateFormatted,
                location: location,
                type: newMemVideoData ? "mixed" : "photo",
                theme: theme,
                video: newMemVideoData || null,
                poster: images[0],
                images: images,
                fallbacks: images,
                story: story,
                isCustom: true
            };

            // Đưa lên đầu danh sách Kỷ Niệm
            MEMORIES.unshift(newMemoryItem);

            // Lưu vào localStorage
            try {
                const customMems = JSON.parse(localStorage.getItem('couple_custom_memories_v2') || '[]');
                customMems.unshift(newMemoryItem);
                localStorage.setItem('couple_custom_memories_v2', JSON.stringify(customMems));
            } catch (err) {}

            // Vẽ lại dòng chảy kỷ niệm ngay lập tức
            renderMemoriesStream();

            // Đóng modal & reset form
            form.reset();
            newMemPhotosList = [];
            newMemVideoData = null;
            if (previewsGrid) previewsGrid.innerHTML = "";
            if (videoPreviewWrap) {
                videoPreviewWrap.innerHTML = "";
                videoPreviewWrap.style.display = "none";
            }
            if (modal) modal.classList.remove("active");

            showMusicToast(`Kỷ niệm "${title}" đã được lưu thành công!`);
        });
    }
}
