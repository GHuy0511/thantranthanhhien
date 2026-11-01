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
        images: [
            "images/DSC03633.jpeg",
            "images/DSC03635.jpeg"
        ],
        fallbacks: [
            "images/DSC03633.jpeg"
        ],
        story: "Từ hôm nay, chúng mình đã có nhau."
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

let currentTrackIndex = 0;

let isAudioPlaying = false;

// Trạng thái Lightbox duyệt ảnh
let currentLbMemoryIndex = 0;
let currentLbPhotoIndex = 0;

/* ========================================================
   KHỞI TẠO DOM & SỰ KIỆN
   ======================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initAmbientParticles();
    initIntroSection();
    initLoveCounter();
    initPolaroidFlatlay();
    renderTimelineWithCarousels();
    initScrollObserver();
    initLetterModal();
    initLightboxSystem();
    initAudioSystem();
});

/* ========================================================
   ĐỒNG HỒ ĐẾM NGÀY YÊU NHAU (CHÍNH THỨC 01/11/2026)
   ======================================================== */
function initLoveCounter() {
    // Thời điểm bắt đầu chính thức quen nhau: 00:00:00 ngày 01/11/2026
    const startDate = new Date(2026, 10, 1, 0, 0, 0);

    const daysEl = document.getElementById("loveCounterDays");
    const hoursEl = document.getElementById("loveCounterHours");
    const minutesEl = document.getElementById("loveCounterMinutes");
    const secondsEl = document.getElementById("loveCounterSeconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCounter() {
        const now = new Date();
        const diffMs = Math.max(0, now - startDate);

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
        const seconds = Math.floor((diffMs / 1000) % 60);

        daysEl.textContent = days;
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
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

    // Nhân bản danh sách đủ số lần (tối thiểu 4 lần) để tạo vòng lặp vô tận liền mạch 100% trên mọi kích thước màn hình
    const minSets = Math.max(4, Math.ceil((window.innerWidth * 2.5) / Math.max(1, MEMORIES.length * 360)));
    const renderSets = Array.from({ length: minSets }, (_, i) => i);

    renderSets.forEach((setIndex) => {
        MEMORIES.forEach((item, memoryIndex) => {
            const photoList = (item.images && item.images.length > 0)
                ? item.images
                : (item.image ? [item.image] : []);
            const fallbackList = item.fallbacks || (item.fallback ? [item.fallback] : []);
            const firstPhoto = photoList[0] || fallbackList[0] || "";
            const fallbackPhoto = fallbackList[0] || firstPhoto;
            const photoCount = photoList.length;

            const card = document.createElement("article");
            card.className = "stream-card timeline-card";
            card.setAttribute("role", "button");
            card.setAttribute("tabindex", "0");
            card.setAttribute("data-memory", String(memoryIndex));
            card.setAttribute("title", `Nhấp để mở thư: ${item.title}`);

            const countBadge = photoCount > 1 ? `
                <span class="stream-card-count-pill">📷 ${photoCount} ảnh</span>
            ` : '';

            card.innerHTML = `
                <div class="card-washi-tape" aria-hidden="true"></div>
                <div class="stream-card-photo-box">
                    <img class="stream-card-photo" src="${firstPhoto}" alt="${item.title}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackPhoto}';">
                    ${countBadge}
                </div>
                <div class="stream-card-body">
                    <div class="stream-card-date">${item.date}</div>
                    <h3 class="stream-card-title">${item.title}</h3>
                    <p class="stream-card-story">${item.story}</p>
                    <div class="stream-card-action">
                        <button class="stream-card-btn" type="button" aria-label="Mở thư">
                            <span>Mở thư</span>
                        </button>
                    </div>
                </div>
            `;

            // Xử lý sự kiện nhấp để mở thư (nếu không phải thao tác kéo lướt)
            card.addEventListener("click", (e) => {
                if (hasDraggedStream) return;
                openLetterModal(memoryIndex);
            });

            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLetterModal(memoryIndex);
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

    if (!photoList || photoList.length === 0) {
        galleryEl.style.display = "none";
        return;
    }
    galleryEl.style.display = "block";

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
        galleryEl.appendChild(wrap);
        return;
    }

    // Nhiều ảnh: Tạo Carousel tự động trượt + nút mũi tên ‹ › + chấm tròn trang trí (KHÔNG dùng thanh trượt ngang)
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

    galleryEl.innerHTML = `
        <div class="letter-carousel-wrap" id="letterCarouselWrap">
            <div class="letter-carousel-track" id="letterCarouselTrack">
                ${slidesHtml}
            </div>
            <button class="letter-carousel-btn prev-btn" id="letterPrevBtn" aria-label="Ảnh trước">‹</button>
            <button class="letter-carousel-btn next-btn" id="letterNextBtn" aria-label="Ảnh sau">›</button>
            <div class="letter-carousel-dots" id="letterCarouselDots">
                ${dotsHtml}
            </div>
            <div class="letter-carousel-counter" id="letterCarouselCounter">
                <span id="letterCurIdx">1</span> / ${photoList.length}
            </div>
        </div>
    `;

    let curIndex = 0;
    const total = photoList.length;
    const track = document.getElementById("letterCarouselTrack");
    const dots = galleryEl.querySelectorAll(".letter-c-dot");
    const curIdxEl = document.getElementById("letterCurIdx");
    const prevBtn = document.getElementById("letterPrevBtn");
    const nextBtn = document.getElementById("letterNextBtn");
    const wrap = document.getElementById("letterCarouselWrap");

    // Chạm vào ảnh bất kỳ để mở xem phóng to toàn màn hình (Lightbox)
    const slideImgs = galleryEl.querySelectorAll(".letter-carousel-slide img");
    slideImgs.forEach((img, idx) => {
        img.addEventListener("click", () => {
            openLightbox(memoryIndex, idx);
        });
    });

    function goToSlide(idx) {
        if (idx < 0) idx = total - 1;
        if (idx >= total) idx = 0;
        curIndex = idx;
        if (track) {
            track.style.transform = `translateX(-${curIndex * 100}%)`;
        }
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === curIndex);
        });
        if (curIdxEl) curIdxEl.innerText = curIndex + 1;
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            goToSlide(curIndex - 1);
            resetLetterTimer();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            goToSlide(curIndex + 1);
            resetLetterTimer();
        });
    }

    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            e.stopPropagation();
            const targetIdx = parseInt(dot.getAttribute("data-dot"), 10);
            goToSlide(targetIdx);
            resetLetterTimer();
        });
    });

    // Hỗ trợ vuốt tay (Swipe) trực tiếp trên điện thoại
    let touchStartX = 0;
    let touchEndX = 0;
    wrap.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    wrap.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
            if (diff < 0) goToSlide(curIndex + 1);
            else goToSlide(curIndex - 1);
            resetLetterTimer();
        }
    }, { passive: true });

    // Tự động chuyển ảnh sau mỗi 3.8 giây
    function startLetterTimer() {
        if (letterCarouselTimer) clearInterval(letterCarouselTimer);
        letterCarouselTimer = setInterval(() => {
            goToSlide(curIndex + 1);
        }, 3800);
    }

    function resetLetterTimer() {
        startLetterTimer();
    }

    wrap.addEventListener("mouseenter", () => {
        if (letterCarouselTimer) clearInterval(letterCarouselTimer);
    });
    wrap.addEventListener("mouseleave", () => {
        startLetterTimer();
    });

    startLetterTimer();
}

function closeLetterModal() {
    const overlay = document.getElementById("letterModalOverlay");
    // Tránh kích hoạt trùng lặp khi đang chạy hoạt cảnh đóng thư
    if (!overlay || !overlay.classList.contains("active") || overlay.classList.contains("closing")) return;

    if (letterCarouselTimer) {
        clearInterval(letterCarouselTimer);
        letterCarouselTimer = null;
    }

    // Tách biệt hoàn toàn active và closing, ép reflow để hoạt cảnh gập thư diễn ra mượt mà không khựng
    overlay.classList.remove("active");
    void overlay.offsetWidth;
    overlay.classList.add("closing");

    setTimeout(() => {
        overlay.classList.remove("closing");
        overlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }, 1400); // Đồng bộ thời gian 1.4s siêu mượt: Thư trượt vào -> nắp đóng -> dấu sáp niêm phong -> mờ dần
}

/* ========================================================
   LIGHTBOX PHÓNG TO & DUYỆT TẤT CẢ ẢNH TRONG KỶ NIỆM
   ======================================================== */
const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lbPrevBtn = document.getElementById("lbPrevBtn");
const lbNextBtn = document.getElementById("lbNextBtn");

function initLightboxSystem() {
    lightboxClose.addEventListener("click", closeLightbox);
    lightboxOverlay.addEventListener("click", (e) => {
        if (e.target === lightboxOverlay) closeLightbox();
    });

    lbPrevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        stepLightboxPhoto(-1);
    });

    lbNextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        stepLightboxPhoto(1);
    });

    document.addEventListener("keydown", (e) => {
        if (!lightboxOverlay.classList.contains("active")) return;
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
    lightboxOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function updateLightboxView() {
    const memory = MEMORIES[currentLbMemoryIndex] || MEMORIES[0];
    if (!memory) return;
    const photoList = memory.images || (memory.image ? [memory.image] : []);
    const fallbackList = memory.fallbacks || (memory.fallback ? [memory.fallback] : photoList);

    const imgSrc = photoList[currentLbPhotoIndex] || fallbackList[0] || "";
    const fbSrc = fallbackList[currentLbPhotoIndex] || fallbackList[0] || imgSrc;

    lightboxImg.src = imgSrc;
    lightboxImg.onerror = () => { lightboxImg.src = fbSrc; };

    const pageText = photoList.length > 1 ? ` (${currentLbPhotoIndex + 1}/${photoList.length})` : '';
    lightboxCaption.innerText = `${memory.title} - ${memory.date}${pageText}`;

    // Ẩn hiện nút điều hướng trong Lightbox nếu chỉ có 1 ảnh
    const showNav = photoList.length > 1;
    lbPrevBtn.style.display = showNav ? "flex" : "none";
    lbNextBtn.style.display = showNav ? "flex" : "none";
}

function stepLightboxPhoto(direction) {
    const memory = MEMORIES[currentLbMemoryIndex] || MEMORIES[0];
    if (!memory) return;
    const photoList = memory.images || (memory.image ? [memory.image] : []);
    const total = photoList.length;
    if (total <= 1) return;

    currentLbPhotoIndex = (currentLbPhotoIndex + direction + total) % total;
    updateLightboxView();
}

function closeLightbox() {
    lightboxOverlay.classList.remove("active");
    document.body.style.overflow = "";
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
