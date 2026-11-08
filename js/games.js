
// FULL GRADIENT LUXURY VECTOR MODELS FOR GAME BOARD & PORTFOLIO
// FULL GRADIENT LUXURY VECTOR MODELS FOR GAME BOARD & PORTFOLIO
const REAL_ESTATE_3D_MODELS = {
    flag(color) {
        return `
        <div class="mini-3d-flag" title="Đất đã có chủ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 2v20" stroke="#57534e" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M4 4h14l-3 4.5 3 4.5H4V4z" fill="${color || '#b45d43'}" stroke="#ffffff" stroke-width="1.2"/>
                <circle cx="4" cy="2" r="2.2" fill="#f59e0b"/>
            </svg>
        </div>`;
    },
    house1() {
        return `
        <div class="mini-3d-house house-lvl-1" title="1 Nhà Phố Indochine Cổ Điển">
            <svg width="24" height="22" viewBox="0 0 48 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="h1_rf" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#ea580c"/>
                        <stop offset="60%" stop-color="#c2410c"/>
                        <stop offset="100%" stop-color="#9a3412"/>
                    </linearGradient>
                    <linearGradient id="h1_wf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#fffbeb"/>
                        <stop offset="100%" stop-color="#fef08a"/>
                    </linearGradient>
                    <linearGradient id="h1_ws" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#fef08a"/>
                        <stop offset="100%" stop-color="#facc15"/>
                    </linearGradient>
                    <linearGradient id="h1_gl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="100%" stop-color="#fed7aa"/>
                    </linearGradient>
                </defs>
                <!-- Ground Shadow -->
                <ellipse cx="24" cy="38" rx="16" ry="3.5" fill="#451a03" fill-opacity="0.22"/>
                <!-- Foundation -->
                <path d="M10 32L24 37L38 32V34.5L24 39.5L10 34.5Z" fill="#78716c"/>
                <!-- Front Facade -->
                <path d="M11 20L24 25V37L11 32Z" fill="url(#h1_wf)" stroke="#ca8a04" stroke-width="0.6"/>
                <!-- Side Facade -->
                <path d="M24 25L37 20V32L24 37Z" fill="url(#h1_ws)" stroke="#a16207" stroke-width="0.6"/>
                <!-- Arched Entrance Door -->
                <path d="M14.5 27C14.5 25 18.5 26.5 18.5 28V35L14.5 33.5Z" fill="#78350f"/>
                <circle cx="17.5" cy="31" r="0.8" fill="#fbbf24"/>
                <!-- Windows with Sunlight Glare -->
                <path d="M14.5 21.5C14.5 20.2 18.5 21.5 18.5 22.8V25L14.5 23.8Z" fill="url(#h1_gl)" stroke="#78350f" stroke-width="0.5"/>
                <rect x="26.5" y="23" width="7" height="6" rx="1.2" transform="skewY(-12)" fill="url(#h1_gl)" stroke="#78350f" stroke-width="0.5"/>
                <!-- Terracotta Roof -->
                <path d="M24 6L8 18.5L24 25L24 6Z" fill="url(#h1_rf)"/>
                <path d="M24 6L40 18.5L24 25L24 6Z" fill="#7c2d12"/>
                <path d="M24 6L8 18.5" stroke="#fed7aa" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M24 6L40 18.5" stroke="#9a3412" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M24 6V25" stroke="#ffedd5" stroke-width="1.2"/>
                <circle cx="24" cy="5.5" r="1.4" fill="#f59e0b" stroke="#ffffff" stroke-width="0.5"/>
                <!-- Cute Chimney -->
                <path d="M30 9V14L33 12.5V7.5Z" fill="#991b1b"/>
                <rect x="29.5" y="7" width="4" height="1" fill="#fef08a"/>
            </svg>
        </div>`;
    },
    house2() {
        return `
        <div class="mini-3d-house house-lvl-2" title="2 Biệt Thự Song Lập Nghỉ Dưỡng">
            <svg width="29" height="22" viewBox="0 0 58 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="h2_rf" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#ea580c"/>
                        <stop offset="100%" stop-color="#9a3412"/>
                    </linearGradient>
                    <linearGradient id="h2_wf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#fffbeb"/>
                        <stop offset="100%" stop-color="#fef08a"/>
                    </linearGradient>
                </defs>
                <!-- Shadow -->
                <ellipse cx="29" cy="38" rx="23" ry="4" fill="#451a03" fill-opacity="0.22"/>
                <!-- Villa 1 -->
                <g transform="translate(0, 2)">
                    <path d="M6 19L19 24V35L6 30Z" fill="url(#h2_wf)" stroke="#ca8a04" stroke-width="0.5"/>
                    <path d="M19 24L32 19V30L19 35Z" fill="#facc15" stroke="#a16207" stroke-width="0.5"/>
                    <path d="M19 6L5 18L19 24.5L19 6Z" fill="url(#h2_rf)"/>
                    <path d="M19 6L33 18L19 24.5L19 6Z" fill="#7c2d12"/>
                    <path d="M19 6L5 18" stroke="#fed7aa" stroke-width="1.1"/>
                    <path d="M19 6L33 18" stroke="#9a3412" stroke-width="1.1"/>
                    <path d="M19 6V24.5" stroke="#ffedd5" stroke-width="1.1"/>
                    <circle cx="19" cy="5.5" r="1.2" fill="#fbbf24"/>
                    <rect x="22" y="21" width="5.5" height="5" rx="1" transform="skewY(-12)" fill="#fffbeb" stroke="#78350f" stroke-width="0.5"/>
                </g>
                <!-- Villa 2 -->
                <g transform="translate(20, -1)">
                    <path d="M6 19L19 24V35L6 30Z" fill="url(#h2_wf)" stroke="#ca8a04" stroke-width="0.5"/>
                    <path d="M19 24L32 19V30L19 35Z" fill="#facc15" stroke="#a16207" stroke-width="0.5"/>
                    <path d="M19 6L5 18L19 24.5L19 6Z" fill="url(#h2_rf)"/>
                    <path d="M19 6L33 18L19 24.5L19 6Z" fill="#7c2d12"/>
                    <path d="M19 6L5 18" stroke="#fed7aa" stroke-width="1.1"/>
                    <path d="M19 6L33 18" stroke="#9a3412" stroke-width="1.1"/>
                    <path d="M19 6V24.5" stroke="#ffedd5" stroke-width="1.1"/>
                    <circle cx="19" cy="5.5" r="1.2" fill="#fbbf24"/>
                    <rect x="9" y="21" width="5" height="5" rx="1" fill="#fffbeb" stroke="#78350f" stroke-width="0.5"/>
                </g>
            </svg>
        </div>`;
    },
    hotel() {
        return `
        <div class="mini-3d-hotel hotel-lvl-3" title="Khách Sạn Hoàng Gia 5 Sao">
            <svg width="26" height="26" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ht_dome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#fef08a"/>
                        <stop offset="40%" stop-color="#f59e0b"/>
                        <stop offset="100%" stop-color="#b45309"/>
                    </linearGradient>
                    <linearGradient id="ht_palace" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="100%" stop-color="#f1f5f9"/>
                    </linearGradient>
                </defs>
                <!-- Shadow -->
                <ellipse cx="26" cy="46" rx="20" ry="4" fill="#1e293b" fill-opacity="0.25"/>
                <!-- Base Podium -->
                <path d="M8 40L26 45L44 40V42L26 47L8 42Z" fill="#cbd5e1"/>
                <!-- Hotel Main Facade -->
                <path d="M10 17L26 22V44L10 39Z" fill="url(#ht_palace)" stroke="#94a3b8" stroke-width="0.6"/>
                <path d="M26 22L42 17V39L26 44Z" fill="#e2e8f0" stroke="#64748b" stroke-width="0.6"/>
                <!-- Windows Grid -->
                <rect x="13" y="22" width="3.5" height="4" rx="0.8" fill="#38bdf8"/>
                <rect x="19" y="24" width="3.5" height="4" rx="0.8" fill="#38bdf8"/>
                <rect x="13" y="28" width="3.5" height="4" rx="0.8" fill="#38bdf8"/>
                <rect x="19" y="30" width="3.5" height="4" rx="0.8" fill="#38bdf8"/>
                <rect x="29" y="24" width="3.5" height="4" rx="0.8" transform="skewY(-10)" fill="#0284c7"/>
                <rect x="35" y="22" width="3.5" height="4" rx="0.8" transform="skewY(-10)" fill="#0284c7"/>
                <!-- Grand Portico Entrance -->
                <path d="M22 36L26 37.5L30 36V43L26 44.5L22 43Z" fill="#b45309"/>
                <!-- Golden Dome Cupola -->
                <path d="M26 5C20 9 20 15 20 17L26 19L32 17C32 15 32 9 26 5Z" fill="url(#ht_dome)" stroke="#fef08a" stroke-width="0.8"/>
                <!-- Finial Spire -->
                <path d="M26 1V5" stroke="#f59e0b" stroke-width="1.6" stroke-linecap="round"/>
                <circle cx="26" cy="1" r="1.5" fill="#fef08a"/>
                <!-- 5 Floating Stars -->
                <text x="12" y="11" font-size="6.5" fill="#f59e0b" font-weight="bold">★★★★★</text>
            </svg>
        </div>`;
    }
};

// ========================================================
// BỘ VECTOR BIỂU TƯỢNG ĐỘC QUYỀN CHO CÁC Ô ĐẶC BIỆT (SPECIAL TILES)
// Thay thế toàn bộ hình ảnh stock internet bằng Vector Sunset cao cấp
// ========================================================
const SPECIAL_TILE_SVGS = {
    start: `
    <svg width="44" height="34" viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="special-tile-vector">
        <defs>
            <linearGradient id="st_rose" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fef08a"/>
                <stop offset="50%" stop-color="#f59e0b"/>
                <stop offset="100%" stop-color="#b45309"/>
            </linearGradient>
            <linearGradient id="st_rib" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#b45d43"/>
                <stop offset="100%" stop-color="#d96b52"/>
            </linearGradient>
        </defs>
        <!-- Golden Compass Rose -->
        <circle cx="27" cy="18" r="14" fill="#fffbeb" stroke="url(#st_rose)" stroke-width="1.8"/>
        <circle cx="27" cy="18" r="11" stroke="#fed7aa" stroke-width="0.8" stroke-dasharray="2 2"/>
        <!-- 8-Point Compass Star -->
        <path d="M27 6L29 16L39 18L29 20L27 30L25 20L15 18L25 16Z" fill="url(#st_rose)"/>
        <path d="M27 6L27 18L39 18Z" fill="#fef08a"/>
        <path d="M27 30L27 18L15 18Z" fill="#b45309"/>
        <circle cx="27" cy="18" r="2.5" fill="#ffffff" stroke="#b45309" stroke-width="1"/>
        <!-- Start Banner -->
        <rect x="7" y="32" width="40" height="11" rx="4" fill="url(#st_rib)"/>
        <text x="27" y="40" font-size="8" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.8">KHỞI HÀNH</text>
    </svg>`,

    chance: `
    <svg width="40" height="34" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="special-tile-vector">
        <defs>
            <linearGradient id="ch_env" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#fffbeb"/>
                <stop offset="100%" stop-color="#fde68a"/>
            </linearGradient>
            <linearGradient id="ch_seal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ea580c"/>
                <stop offset="100%" stop-color="#9a3412"/>
            </linearGradient>
        </defs>
        <!-- Envelope -->
        <rect x="6" y="10" width="38" height="26" rx="4" fill="url(#ch_env)" stroke="#d97706" stroke-width="1.4"/>
        <path d="M6 11L25 25L44 11" stroke="#b45309" stroke-width="1.3" stroke-linecap="round"/>
        <path d="M6 35L18 24M44 35L32 24" stroke="#d97706" stroke-width="1" stroke-linecap="round"/>
        <!-- Wax Seal with Question Mark -->
        <circle cx="25" cy="24" r="8.5" fill="url(#ch_seal)" stroke="#ffedd5" stroke-width="1.2"/>
        <text x="25" y="28" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">?</text>
        <!-- Sparkles -->
        <circle cx="10" cy="7" r="1.5" fill="#f59e0b"/>
        <circle cx="41" cy="7" r="1.5" fill="#f59e0b"/>
    </svg>`,

    chest: `
    <svg width="42" height="34" viewBox="0 0 52 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="special-tile-vector">
        <defs>
            <linearGradient id="cs_wood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#78350f"/>
                <stop offset="100%" stop-color="#451a03"/>
            </linearGradient>
            <linearGradient id="cs_brass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fef08a"/>
                <stop offset="100%" stop-color="#b45309"/>
            </linearGradient>
        </defs>
        <!-- Chest Base -->
        <rect x="7" y="19" width="38" height="19" rx="3" fill="url(#cs_wood)" stroke="#292524" stroke-width="1.2"/>
        <!-- Arched Lid -->
        <path d="M7 19C7 11 15 7 26 7C37 7 45 11 45 19H7Z" fill="url(#cs_wood)" stroke="#292524" stroke-width="1.2"/>
        <!-- Brass Bands -->
        <rect x="14" y="8" width="4.5" height="29" fill="url(#cs_brass)" stroke="#78350f" stroke-width="0.5"/>
        <rect x="33.5" y="8" width="4.5" height="29" fill="url(#cs_brass)" stroke="#78350f" stroke-width="0.5"/>
        <!-- Heart Clasp Keyhole -->
        <rect x="22.5" y="18" width="7" height="8" rx="1.5" fill="url(#cs_brass)"/>
        <circle cx="26" cy="21.5" r="1.2" fill="#451a03"/>
        <path d="M26 21.5V24" stroke="#451a03" stroke-width="1.2"/>
        <!-- Floating Gold Ingot/Coin -->
        <circle cx="41" cy="8" r="3.5" fill="#facc15" stroke="#b45309" stroke-width="0.8"/>
        <text x="41" y="10.2" font-size="4" font-weight="bold" fill="#78350f" text-anchor="middle">đ</text>
    </svg>`,

    go_to_jail: `
    <svg width="42" height="34" viewBox="0 0 52 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="special-tile-vector">
        <defs>
            <linearGradient id="gtj_bar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#78716c"/>
                <stop offset="100%" stop-color="#292524"/>
            </linearGradient>
            <linearGradient id="gtj_badge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fef08a"/>
                <stop offset="100%" stop-color="#d97706"/>
            </linearGradient>
        </defs>
        <!-- Gate Frame -->
        <rect x="8" y="7" width="36" height="31" rx="4" fill="#fef2f2" stroke="#b91c1c" stroke-width="1.4"/>
        <!-- Vertical Iron Bars -->
        <path d="M15 8V37M21 8V37M27 8V37M33 8V37M39 8V37" stroke="url(#gtj_bar)" stroke-width="2.2" stroke-linecap="round"/>
        <!-- Classical Lock bar -->
        <rect x="8" y="21" width="36" height="4.5" fill="#44403c"/>
        <!-- Police Whistle & Badge Ribbon -->
        <circle cx="26" cy="23.5" r="7" fill="url(#gtj_badge)" stroke="#b91c1c" stroke-width="1"/>
        <path d="M26 19L27.5 22.5L31 23L28.5 25.5L29 29L26 27L23 29L23.5 25.5L21 23L24.5 22.5Z" fill="#b91c1c"/>
    </svg>`,

    jail: `
    <svg width="42" height="34" viewBox="0 0 52 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="special-tile-vector">
        <defs>
            <linearGradient id="jl_cup" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#fffbeb"/>
                <stop offset="100%" stop-color="#fed7aa"/>
            </linearGradient>
        </defs>
        <!-- Relaxing Garden Gate / Park Bench -->
        <rect x="6" y="8" width="40" height="30" rx="4" fill="#fafaf9" stroke="#78716c" stroke-width="1.2"/>
        <!-- Left half: Open jail gate -->
        <path d="M12 9V37M18 9V37M24 9V37" stroke="#a8a29e" stroke-width="1.8"/>
        <!-- Right half: Warm park bench & coffee/tea cup -->
        <rect x="28" y="22" width="15" height="4" rx="1.5" fill="#b45d43"/>
        <path d="M30 26V35M41 26V35" stroke="#78350f" stroke-width="1.8"/>
        <rect x="33" y="15" width="6" height="6" rx="1" fill="url(#jl_cup)" stroke="#b45d43" stroke-width="0.8"/>
        <!-- Steam -->
        <path d="M35 13C35 11 37 11 37 9" stroke="#ea580c" stroke-width="1" stroke-linecap="round"/>
        <text x="36" y="33" font-size="5.5" font-weight="bold" fill="#78350f" text-anchor="middle">THĂM TÙ</text>
    </svg>`,

    parking: `
    <svg width="44" height="34" viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="special-tile-vector">
        <defs>
            <linearGradient id="pk_car" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#b45d43"/>
                <stop offset="100%" stop-color="#d96b52"/>
            </linearGradient>
        </defs>
        <!-- Parking Circle P -->
        <circle cx="16" cy="18" r="10" fill="#3b82f6" stroke="#ffffff" stroke-width="1.4"/>
        <text x="16" y="23" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">P</text>
        <!-- Gold Coin Treasure Piggy -->
        <ellipse cx="36" cy="24" rx="12" ry="9" fill="#f59e0b" stroke="#78350f" stroke-width="1.2"/>
        <rect x="32" y="17" width="8" height="2" rx="1" fill="#78350f"/>
        <circle cx="43" cy="22" r="1" fill="#78350f"/>
        <text x="36" y="27" font-size="6.5" font-weight="900" fill="#78350f" text-anchor="middle">HŨ QUỸ</text>
    </svg>`,

    airport: `
    <svg width="44" height="34" viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="special-tile-vector">
        <defs>
            <linearGradient id="ap_sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#0284c7"/>
                <stop offset="100%" stop-color="#38bdf8"/>
            </linearGradient>
        </defs>
        <!-- Flight Trails -->
        <path d="M6 35C16 35 24 28 32 18" stroke="#bae6fd" stroke-width="2" stroke-dasharray="3 2" stroke-linecap="round"/>
        <!-- Modern Airplane -->
        <g transform="translate(14, 5) rotate(18)">
            <path d="M12 2C13 2 14 3.5 14 6L14 18L26 23V25L14 22V31L18 34V35.5L12 34L6 35.5V34L10 31V22L-2 25V23L10 18L10 6C10 3.5 11 2 12 2Z" fill="#ffffff" stroke="#0369a1" stroke-width="1.2"/>
            <circle cx="12" cy="7" r="1.2" fill="#0284c7"/>
        </g>
    </svg>`,

    utility: `
    <svg width="40" height="34" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="special-tile-vector">
        <defs>
            <linearGradient id="ut_bulb" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fffbeb"/>
                <stop offset="60%" stop-color="#fef08a"/>
                <stop offset="100%" stop-color="#f59e0b"/>
            </linearGradient>
        </defs>
        <!-- Radiating Rays -->
        <path d="M25 4V1M11 9L8 6M39 9L42 6M6 21H3M44 21H47" stroke="#f59e0b" stroke-width="1.6" stroke-linecap="round"/>
        <!-- Edison Bulb -->
        <path d="M17 19C17 14.5 20.5 11 25 11C29.5 11 33 14.5 33 19C33 22.5 30.5 25 29.5 27.5H20.5C19.5 25 17 22.5 17 19Z" fill="url(#ut_bulb)" stroke="#d97706" stroke-width="1.3"/>
        <!-- Glowing Filament -->
        <path d="M22 21L24 16L26 21L28 16" stroke="#ea580c" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Bulb Base Screw -->
        <rect x="21" y="28" width="8" height="4" rx="1" fill="#78716c"/>
        <rect x="22.5" y="32.5" width="5" height="2" rx="1" fill="#44403c"/>
    </svg>`,

    tax: `
    <svg width="42" height="34" viewBox="0 0 52 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="special-tile-vector">
        <defs>
            <linearGradient id="tx_bag" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#b91c1c"/>
                <stop offset="100%" stop-color="#7f1d1d"/>
            </linearGradient>
        </defs>
        <!-- Coin Pouch -->
        <path d="M19 14L22 8H30L33 14" stroke="#f59e0b" stroke-width="1.6"/>
        <path d="M14 17C14 14 18 13 26 13C34 13 38 14 38 17C38 21 41 33 38 37C35 41 17 41 14 37C11 33 14 21 14 17Z" fill="url(#tx_bag)" stroke="#450a0a" stroke-width="1.3"/>
        <circle cx="26" cy="27" r="6" fill="#facc15" stroke="#b45309" stroke-width="1"/>
        <text x="26" y="30.5" font-size="8" font-weight="900" fill="#78350f" text-anchor="middle">đ</text>
    </svg>`
};

const VIETNAM_TILES = [
    // --- CẠNH TRÊN: ROW 1, COL 1 -> 7 ---
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
        desc: "Điểm xuất phát trên bàn cờ. Mỗi lần đi qua nhận ngay 200M tiền trợ cấp từ Ngân hàng!",
        owner: null, level: 0
    },
    {
        id: 1, row: 1, col: 2,
        name: "Hồ Gươm",
        subtitle: "Hà Nội",
        icon: "🏮",
        image: "images/monopoly/ho_guom.jpg",
        region: "hanoi",
        regionName: "Bắc Bộ",
        type: "property",
        price: 390,
        rent: [45, 135, 300, 600],
        upgradeCost: 190,
        desc: "Trái tim Thủ đô ngàn năm văn hiến, vị trí đắc địa với Tháp Rùa và cầu Thê Húc.",
        owner: null, level: 0
    },
    {
        id: 2, row: 1, col: 3,
        name: "Vịnh Hạ Long",
        subtitle: "Quảng Ninh",
        icon: "⛵",
        image: "images/monopoly/ha_long.jpg",
        region: "hanoi",
        regionName: "Bắc Bộ",
        type: "property",
        price: 270,
        rent: [30, 85, 200, 400],
        upgradeCost: 135,
        desc: "Kỳ quan thiên nhiên thế giới UNESCO với hàng nghìn đảo đá vôi kỳ vĩ và du thuyền phồn hoa.",
        owner: null, level: 0
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
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Rút một thẻ Cơ Hội bất ngờ từ Bộ Tài Chính: Thưởng lớn, trợ cấp hoặc biến cố tài chính.",
        owner: null, level: 0
    },
    {
        id: 4, row: 1, col: 5,
        name: "Fansipan",
        subtitle: "Sa Pa",
        icon: "🏔️",
        image: "images/monopoly/fansipan.jpg",
        region: "northwest",
        regionName: "Tây Bắc",
        type: "property",
        price: 190,
        rent: [20, 60, 140, 290],
        upgradeCost: 95,
        desc: "Nóc nhà Đông Dương ở độ cao 3.143m, khu nghỉ dưỡng trên mây mang lại dòng tiền lớn.",
        owner: null, level: 0
    },
    {
        id: 5, row: 1, col: 6,
        name: "Tràng An",
        subtitle: "Ninh Bình",
        icon: "🚣",
        image: "images/monopoly/trang_an.jpg",
        region: "northwest",
        regionName: "Tây Bắc",
        type: "property",
        price: 170,
        rent: [17, 50, 120, 250],
        upgradeCost: 85,
        desc: "Di sản non nước hữu tình, bất động sản sinh thái cực kỳ tiềm năng và hút khách du lịch.",
        owner: null, level: 0
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
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Bị lực lượng trật tự áp giải thẳng vào Nhà Tù! Bạn phải đóng bảo lãnh hoặc đổ xúc xắc đôi.",
        owner: null, level: 0
    },

    // --- CẠNH PHẢI: ROW 2 -> 7, COL 7 ---
    {
        id: 7, row: 2, col: 7,
        name: "Cố Đô Huế",
        subtitle: "Thừa Thiên Huế",
        icon: "🏯",
        image: "images/monopoly/hue.jpg",
        region: "central",
        regionName: "Miền Trung",
        type: "property",
        price: 180,
        rent: [18, 55, 130, 270],
        upgradeCost: 90,
        desc: "Kinh thành triều Nguyễn với bề dày lịch sử vàng son, bất động sản di sản văn hóa sinh lời cao.",
        owner: null, level: 0
    },
    {
        id: 8, row: 3, col: 7,
        name: "Cầu Vàng",
        subtitle: "Đà Nẵng",
        icon: "🌉",
        image: "images/monopoly/cau_vang.jpg",
        region: "central",
        regionName: "Miền Trung",
        type: "property",
        price: 330,
        rent: [38, 110, 250, 500],
        upgradeCost: 165,
        desc: "Biểu tượng du lịch hiện đại nổi tiếng toàn cầu, lưu lượng khách quốc tế liên tục đem lại doanh thu cao.",
        owner: null, level: 0
    },
    {
        id: 9, row: 4, col: 7,
        name: "Điện Lực",
        subtitle: "Dịch Vụ Tiện Ích",
        icon: "⚡",
        region: "special",
        regionName: "Tiện Ích",
        type: "utility",
        price: 150,
        rent: [30, 60, 120, 240],
        upgradeCost: 0,
        desc: "Doanh nghiệp cung cấp điện năng. Thu tiền điện bằng điểm xúc xắc nhân 15M VNĐ.",
        owner: null, level: 0
    },
    {
        id: 10, row: 5, col: 7,
        name: "Phố Cổ Hội An",
        subtitle: "Quảng Nam",
        icon: "🏮",
        image: "images/monopoly/hoi_an.jpg",
        region: "coastal",
        regionName: "Duyên Hải",
        type: "property",
        price: 250,
        rent: [28, 80, 185, 380],
        upgradeCost: 125,
        desc: "Thương cảng phồn hoa với những ngôi nhà cổ tường vàng hoa giấy, giá thuê mặt bằng đắt giá.",
        owner: null, level: 0
    },
    {
        id: 11, row: 6, col: 7,
        name: "Biển Mỹ Khê",
        subtitle: "Đà Nẵng",
        icon: "🏖️",
        image: "images/monopoly/my_khe.jpg",
        region: "coastal",
        regionName: "Duyên Hải",
        type: "property",
        price: 310,
        rent: [35, 100, 230, 470],
        upgradeCost: 155,
        desc: "Dải cát trắng mịn ven biển quyến rũ hàng đầu châu Á, các resort khách sạn luôn kín phòng.",
        owner: null, level: 0
    },
    {
        id: 12, row: 7, col: 7,
        name: "Bãi Đỗ Xe",
        subtitle: "Hũ Tiền Thưởng",
        icon: "🅿️",
        region: "special",
        regionName: "Đỗ Xe",
        type: "parking",
        price: 0,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Dừng chân tại Bãi Đỗ Xe miễn phí và hốt trọn toàn bộ hũ tiền thưởng thuế & phạt tích lũy!",
        owner: null, level: 0
    },

    // --- CẠNH DƯỚI: ROW 7, COL 6 -> 1 ---
    {
        id: 13, row: 7, col: 6,
        name: "Đà Lạt",
        subtitle: "Lâm Đồng",
        icon: "🌲",
        image: "images/monopoly/da_lat.jpg",
        region: "highlands",
        regionName: "Tây Nguyên",
        type: "property",
        price: 220,
        rent: [25, 70, 160, 330],
        upgradeCost: 110,
        desc: "Thành phố sương mù ngàn hoa mộng mơ, chuỗi homestay và biệt thự cổ điển đạt doanh thu cao.",
        owner: null, level: 0
    },
    {
        id: 14, row: 7, col: 5,
        name: "Buôn Ma Thuột",
        subtitle: "Đắk Lắk",
        icon: "☕",
        image: "images/monopoly/bmt.jpg",
        region: "highlands",
        regionName: "Tây Nguyên",
        type: "property",
        price: 140,
        rent: [14, 40, 95, 200],
        upgradeCost: 70,
        desc: "Thủ phủ cà phê lớn nhất Đông Nam Á, đất đai màu mỡ và tiềm năng kinh doanh nông sản lớn.",
        owner: null, level: 0
    },
    {
        id: 15, row: 7, col: 4,
        name: "Khí Vận",
        subtitle: "Quỹ Cộng Đồng",
        icon: "📦",
        region: "special",
        regionName: "Khí Vận",
        type: "chest",
        price: 0,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Rút một thẻ Khí Vận cộng đồng: Trợ cấp kinh tế, sửa chữa nhà cửa hoặc nhận quà tài chính.",
        owner: null, level: 0
    },
    {
        id: 16, row: 7, col: 3,
        name: "Nha Trang",
        subtitle: "Khánh Hòa",
        icon: "🌊",
        image: "images/monopoly/nha_trang.jpg",
        region: "south_coast",
        regionName: "Nam Trung Bộ",
        type: "property",
        price: 280,
        rent: [32, 90, 210, 420],
        upgradeCost: 140,
        desc: "Vịnh biển thiên đường với chuỗi resort 5 sao sang trọng, bất động sản du lịch sinh lời rất cao.",
        owner: null, level: 0
    },
    {
        id: 17, row: 7, col: 2,
        name: "Mũi Né",
        subtitle: "Bình Thuận",
        icon: "🏜️",
        image: "images/monopoly/mui_ne.jpg",
        region: "south_coast",
        regionName: "Nam Trung Bộ",
        type: "property",
        price: 160,
        rent: [16, 45, 110, 240],
        upgradeCost: 80,
        desc: "Đồi cát bay ven biển độc đáo, điểm du lịch thể thao mạo hiểm thu hút nhiều dòng tiền.",
        owner: null, level: 0
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
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Đi qua bình an vô sự. Nếu bị giam giữ: Nộp 50M bảo lãnh hoặc tung xúc xắc đôi để thoát.",
        owner: null, level: 0
    },

    // --- CẠNH TRÁI: ROW 6 -> 2, COL 1 ---
    {
        id: 19, row: 6, col: 1,
        name: "Sân Bay",
        subtitle: "Bay Tốc Hành",
        icon: "✈️",
        region: "special",
        regionName: "Sân Bay",
        type: "airport",
        price: 0,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Dịch vụ bay tốc hành 50M VNĐ: Cho phép bay thẳng đến bất kỳ ô nào trên toàn bản đồ!",
        owner: null, level: 0
    },
    {
        id: 20, row: 5, col: 1,
        name: "Bến Ninh Kiều",
        subtitle: "Cần Thơ",
        icon: "🚢",
        image: "images/monopoly/ninh_kieu.jpg",
        region: "south",
        regionName: "Nam Bộ",
        type: "property",
        price: 150,
        rent: [15, 42, 105, 220],
        upgradeCost: 75,
        desc: "Thủ phủ sông nước Tây Nam Bộ bên dòng sông Hậu, trung tâm giao thương bến cảng sầm uất.",
        owner: null, level: 0
    },
    {
        id: 21, row: 4, col: 1,
        name: "Chợ Bến Thành",
        subtitle: "TP. Hồ Chí Minh",
        icon: "🏢",
        image: "images/monopoly/ben_thanh.jpg",
        region: "south",
        regionName: "Nam Bộ",
        type: "property",
        price: 420,
        rent: [50, 150, 320, 650],
        upgradeCost: 200,
        desc: "Biểu tượng kinh tế hàng đầu Quận 1 Sài Gòn, đất kim cương đắt giá số 1 đem lại dòng tiền thuê khủng nhất.",
        owner: null, level: 0
    },
    {
        id: 22, row: 3, col: 1,
        name: "Thuế Thu Nhập",
        subtitle: "Nộp Ngân Khố",
        icon: "💰",
        region: "special",
        regionName: "Thuế",
        type: "tax",
        price: 100,
        rent: [0, 0, 0, 0],
        upgradeCost: 0,
        desc: "Cơ quan thuế kiểm tra: Phải nộp ngay 100M VNĐ vào hũ thưởng Bãi Đỗ Xe.",
        owner: null, level: 0
    },
    {
        id: 23, row: 2, col: 1,
        name: "Phú Quốc",
        subtitle: "Kiên Giang",
        icon: "🏝️",
        image: "images/monopoly/phu_quoc.jpg",
        region: "islands",
        regionName: "Biển Đảo",
        type: "property",
        price: 360,
        rent: [40, 120, 270, 550],
        upgradeCost: 180,
        desc: "Đảo Ngọc thiên đường nghỉ dưỡng nhiệt đới, đất vàng du lịch quốc tế với giá trị tăng trưởng vượt trội!",
        owner: null, level: 0
    }
];

// 2. BỘ CẤU HÌNH 4 NHÂN VẬT NGƯỜI CHƠI
const ALL_PLAYER_CONFIGS = [
    {
        id: "p0",
        name: "Huy",
        icon: "H",
        color: "#b45d43",
        glow: "rgba(180,93,67,0.22)",
        bg: "rgba(180,93,67,0.10)"
    },
    {
        id: "p1",
        name: "Hiền",
        icon: "H",
        color: "#a85d7b",
        glow: "rgba(168,93,123,0.22)",
        bg: "rgba(168,93,123,0.10)"
    },
    {
        id: "p2",
        name: "Thành Nam",
        icon: "N",
        color: "#5b7f6b",
        glow: "rgba(91,127,107,0.22)",
        bg: "rgba(91,127,107,0.10)"
    },
    {
        id: "p3",
        name: "Phương Linh",
        icon: "🚀",
        color: "#b3784c",
        glow: "rgba(179,120,76,0.22)",
        bg: "rgba(179,120,76,0.10)"
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
    },
    buildConstruction() {
        if (!gameState.soundEnabled) return;
        this.playTone(880, 'triangle', 0.08, 0);
        this.playTone(1100, 'triangle', 0.08, 120);
        this.playTone(1320, 'triangle', 0.1, 240);
        const chord = [523.25, 659.25, 783.99, 1046.50];
        chord.forEach((freq, idx) => {
            this.playTone(freq, 'triangle', 0.35, 360 + idx * 60);
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
    },
    triggerConstructionCelebration(tile, level, player) {
        soundEffects.buildConstruction();
        const cell = document.getElementById(`tile-${tile.id}`);
        if (cell) {
            cell.classList.remove("just-built");
            void cell.offsetWidth; // trigger reflow
            cell.classList.add("just-built");
            setTimeout(() => cell.classList.remove("just-built"), 2400);
        }

        // Bắn bụi sao vàng lấp lánh (Gold Sparkles)
        const layer = document.getElementById("floatingFxLayer");
        if (layer && cell) {
            const rect = cell.getBoundingClientRect();
            for (let i = 0; i < 12; i++) {
                const spark = document.createElement("div");
                spark.className = "build-sparkle-dot";
                const angle = (Math.PI * 2 / 12) * i;
                const dist = 30 + Math.random() * 40;
                spark.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
                spark.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
                spark.style.left = `${rect.left + rect.width / 2}px`;
                spark.style.top = `${rect.top + rect.height / 2}px`;
                layer.appendChild(spark);
                setTimeout(() => spark.remove(), 1200);
            }
        }

        // Banner chúc mừng khởi công sang trọng
        const celebLayer = document.getElementById("constructionCelebrationLayer");
        if (celebLayer) {
            const lvlName = level === 0 ? "Đất Chiến Lược" : level === 1 ? "Nhà Phố Cấp 1" : level === 2 ? "Biệt Thự Cấp 2" : "Khách Sạn 5 Sao";
            const lvlTag = level === 3 ? "👑 KHÁCH SẠN CAO CẤP" : level === 0 ? "🏛️ SỞ HỮU ĐẤT MỚI" : "✨ XÂY DỰNG HOÀN TẤT";
            const toast = document.createElement("div");
            toast.className = "construction-toast-card";
            toast.innerHTML = `
                <div class="toast-shimmer"></div>
                <div class="toast-badge">${lvlTag}</div>
                <h4 class="toast-title">${tile.name}</h4>
                <p class="toast-desc"><strong>${player.name}</strong> đã nâng cấp thành công <strong>${lvlName}</strong>!</p>
            `;
            celebLayer.appendChild(toast);
            setTimeout(() => {
                toast.classList.add("fade-out");
                setTimeout(() => toast.remove(), 500);
            }, 2000);
        }
    }
};

// 8. KHỞI TẠO BÀN CỜ 7x7 (24 Ô)
function initMonopolyBoard() {
    const boardEl = document.getElementById("monopolyBoard");
    if (!boardEl) return;

    const centerHub = document.getElementById("boardCenterHub");
    boardEl.innerHTML = "";
    if (centerHub) boardEl.appendChild(centerHub);

    VIETNAM_TILES.forEach(tile => {
        const isCorner = tile.type === 'start' || tile.type === 'jail' || tile.type === 'go_to_jail' || tile.type === 'parking';
        const cell = document.createElement("div");
        cell.className = `board-tile ${isCorner ? 'is-corner' : ''} tile-type-${tile.type}`;
        cell.id = `tile-${tile.id}`;
        cell.style.gridRow = tile.row;
        cell.style.gridColumn = tile.col;
        cell.title = `${tile.name} - Bấm để xem chi tiết`;

        // Dải màu vùng miền với nhãn text
        const colorBand = document.createElement("div");
        colorBand.className = `tile-region-strip strip-${tile.region}`;
        const stripLabel = document.createElement("span");
        stripLabel.className = "strip-label";
        stripLabel.textContent = (tile.subtitle && tile.type === 'property') ? tile.subtitle : (tile.regionName || '');
        colorBand.appendChild(stripLabel);

        // Khung hình danh lam thắng cảnh hoặc Vector biểu tượng độc quyền
        const photoWrap = document.createElement("div");
        photoWrap.className = "tile-photo-wrap";
        if (SPECIAL_TILE_SVGS[tile.type]) {
            photoWrap.classList.add("has-custom-svg");
            photoWrap.innerHTML = SPECIAL_TILE_SVGS[tile.type];
        } else if (tile.image) {
            const imgEl = document.createElement("img");
            imgEl.className = "tile-photo";
            imgEl.src = tile.image;
            imgEl.alt = tile.name;
            imgEl.loading = "lazy";
            photoWrap.appendChild(imgEl);
        } else {
            const iconEl = document.createElement("div");
            iconEl.className = "tile-icon";
            iconEl.textContent = tile.icon;
            photoWrap.appendChild(iconEl);
        }

        // Tên danh lam to rõ, không bị cắt chữ
        const nameEl = document.createElement("div");
        nameEl.className = "tile-name";
        nameEl.textContent = tile.name;

        // Huy hiệu giá tiền / Trạng thái dạng pill sắc nét
        const priceEl = document.createElement("div");
        priceEl.className = "tile-price";
        if (tile.type === "property") {
            priceEl.textContent = `${tile.price}M`;
        } else if (tile.type === "start") {
            priceEl.textContent = "+200M";
            priceEl.classList.add("price-start");
        } else if (tile.type === "transport" || tile.type === "utility") {
            priceEl.textContent = `${tile.price}M`;
            priceEl.classList.add("price-utility");
        } else if (tile.type === "tax") {
            priceEl.textContent = `-${tile.price}M`;
            priceEl.classList.add("price-tax");
        } else if (tile.type === "parking") {
            priceEl.textContent = "Hũ Quỹ";
            priceEl.classList.add("price-parking");
        } else if (tile.type === "go_to_jail") {
            priceEl.textContent = "Vào Tù";
            priceEl.classList.add("price-jail");
        } else if (tile.type === "challenge") {
            priceEl.textContent = "Thử Thách";
        } else if (tile.type === "chance") {
            priceEl.textContent = "Cơ Hội";
            priceEl.classList.add("price-chance");
        } else if (tile.type === "chest") {
            priceEl.textContent = "Khí Vận";
            priceEl.classList.add("price-chest");
        } else if (tile.type === "airport") {
            priceEl.textContent = "Bay 50M";
            priceEl.classList.add("price-airport");
        } else {
            priceEl.textContent = "Thăm tù";
            priceEl.classList.add("price-visit");
        }

        // Cụm hiển thị công trình nhà thật (🏠 1 nhà, 🏠🏠 2 nhà, 🏨 khách sạn)
        const estateView = document.createElement("div");
        estateView.className = "tile-real-estate-view";
        estateView.id = `estate-${tile.id}`;
        estateView.style.display = "none";

        // Huy hiệu người sở hữu (Sổ đỏ)
        const ownerBadge = document.createElement("div");
        ownerBadge.className = "tile-owner-badge";
        ownerBadge.id = `owner-badge-${tile.id}`;
        ownerBadge.style.display = "none";

        // Khung quân cờ người chơi
        const tokensWrap = document.createElement("div");
        tokensWrap.className = "tile-tokens-wrap";
        tokensWrap.id = `tokens-wrap-${tile.id}`;

        cell.appendChild(colorBand);
        cell.appendChild(photoWrap);
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
            <div class="player-hud-avatar-wrap clickable" onclick="openAvatarPicker('${player.id}')" title="Nhấp để đổi Avatar" style="background:${player.bg}; border: 2px solid ${player.color};">
                <span class="player-avatar-icon">${player.icon || (player.name.charAt(0).toUpperCase())}</span>
                <span class="avatar-edit-badge" title="Đổi avatar">✎</span>
            </div>
            <div class="player-hud-info">
                <div class="player-name-row">
                    <span class="player-name" id="hudName-${player.id}" style="color:${player.color};">${player.name}</span>
                    <button class="player-name-edit-btn" type="button" title="Đổi tên người chơi" onclick="promptChangePlayerName('${player.id}')">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    </button>
                    ${player.isAi ? '<span class="player-ai-tag">AI</span>' : ''}
                    ${jailCardBadge}
                    ${freezeBadge}
                </div>
                <div class="player-score-row">
                    <span class="player-score" id="score-${player.id}">${Number(player.cash).toLocaleString()}</span>
                    <span class="score-unit">M</span>
                </div>
                <div class="player-stats-mini">
                    <span id="propsCount-${player.id}">${player.props.length} BĐS</span>
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
        const tokenLetter = player.isAi ? 'AI' : (player.name ? player.name.charAt(0).toUpperCase() : '•');
        token.textContent = tokenLetter;
        token.style.fontWeight = '800';
        token.style.fontSize = player.isAi ? '9px' : '11px';
        token.style.letterSpacing = '0.2px';
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
        if (propsEl) propsEl.textContent = `${player.props.length} BĐS`;
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
        turnTextEl.textContent = `Lượt: ${current.name} ${current.isAi ? '[AI]' : ''}`;
    }
    if (turnDotEl && current) {
        turnDotEl.style.background = current.color;
    }

    const poolEl = document.getElementById("parkingPoolDisplay");
    if (poolEl) poolEl.textContent = `${Number(gameState.parkingPool).toLocaleString()}M`;

    // Cập nhật Sổ đỏ và công trình nhà thật trên 24 ô
    VIETNAM_TILES.forEach(tile => {
        const ownerEl = document.getElementById(`owner-badge-${tile.id}`);
        const estateEl = document.getElementById(`estate-${tile.id}`);
        if (!ownerEl || !estateEl) return;

        const cellEl = document.getElementById(`tile-${tile.id}`);
        if (tile.owner) {
            const ownerObj = gameState.players.find(p => p.id === tile.owner);
            if (ownerObj) {
                // Đổi viền ô cờ theo màu người sở hữu thanh lịch (không dùng tam giác che chữ vùng miền)
                if (cellEl) {
                    cellEl.style.borderColor = ownerObj.color;
                    cellEl.style.boxShadow = `0 4px 14px ${ownerObj.glow}`;
                }
                ownerEl.style.display = "none"; // Bỏ tam giác che chữ vùng miền
            }

            // HIỂN THỊ NGÔI NHÀ 3D THẬT SỰ TRÊN Ô CỜ (KHÔNG BAO GIỜ HIỆN CỘT CỜ)
            if (tile.level === 0 || tile.level === 1) {
                // Đã sở hữu / Xây nhà: Hiển thị ngay Ngôi Nhà 3D Mái Ngói Đỏ Ruby
                estateEl.innerHTML = REAL_ESTATE_3D_MODELS.house1();
                estateEl.style.display = "flex";
            } else if (tile.level === 2) {
                // 2 Căn Biệt Thự Song Lập 3D
                estateEl.innerHTML = REAL_ESTATE_3D_MODELS.house2();
                estateEl.style.display = "flex";
            } else if (tile.level >= 3) {
                // Khách Sạn Hoàng Gia 5 Sao Dát Vàng 3D
                estateEl.innerHTML = REAL_ESTATE_3D_MODELS.hotel();
                estateEl.style.display = "flex";
            }
        } else {
            if (cellEl) {
                cellEl.style.borderColor = "";
                cellEl.style.boxShadow = "";
            }
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
        const myRole = window.CoupleNetwork ? window.CoupleNetwork.getMyRole() : 'huy';
        const isPartnerOnline = window.CoupleNetwork && window.CoupleNetwork.isPartnerOnline();
        const isTwoPlayerPass = gameState.players.length === 2 && gameState.gameMode === "pass_play";

        let canRollNow = true;
        if (current.isAi) {
            canRollNow = false;
        } else if (isTwoPlayerPass && isPartnerOnline) {
            // Huy là người chơi 0, Hiền là người chơi 1
            const expectedIdx = (myRole === 'huy' ? 0 : 1);
            canRollNow = (gameState.currentTurnIndex === expectedIdx);
        }

        rollBtn.disabled = gameState.isRolling || !canRollNow;
        rollBtn.style.setProperty("--active-roll-gradient", `linear-gradient(135deg, ${current.color}, ${adjustBrightness(current.color, -25)})`);
        rollBtn.style.setProperty("--active-roll-glow", current.glow);

        if (rollBtnText) {
            if (current.isAi) {
                rollBtnText.textContent = `${current.name} (AI) đang đổ...`;
            } else if (!canRollNow && isTwoPlayerPass && isPartnerOnline) {
                rollBtnText.textContent = `Đang đợi ${current.name} tung xúc xắc...`;
            } else {
                rollBtnText.textContent = `Tung xúc xắc • ${current.name}`;
            }
        }
        if (rollBtnIcon) {
            rollBtnIcon.style.display = "none";
        }
    }
}

// 12. HÀM TUNG XÚC XẮC ĐÔI 3D (DOUBLE DICE ROLLING)
function roll3DDice(callback) {
    const val1 = Math.floor(Math.random() * 6) + 1;
    const val2 = Math.floor(Math.random() * 6) + 1;
    roll3DDiceSpecified(val1, val2, callback);
}

let diceCumulativeRotation1 = { x: -20, y: -30, z: 0 };
let diceCumulativeRotation2 = { x: -20, y: -30, z: 0 };

function roll3DDiceSpecified(val1, val2, callback) {
    const diceCube1 = document.getElementById("diceCube1");
    const diceCube2 = document.getElementById("diceCube2");
    const diceScene1 = document.getElementById("diceScene1");
    const diceScene2 = document.getElementById("diceScene2");
    const diceTray = document.getElementById("diceArenaTray");
    const s1 = document.getElementById("diceShadowSpot1");
    const s2 = document.getElementById("diceShadowSpot2");
    const resultPill = document.getElementById("diceResultPill");

    if (resultPill) resultPill.style.display = "none";

    soundEffects.diceRoll();

    const faceRotations = {
        1: { x: 0, y: 0 },
        2: { x: 0, y: -90 },
        3: { x: 0, y: -180 },
        4: { x: 0, y: 90 },
        5: { x: -90, y: 0 },
        6: { x: 90, y: 0 }
    };

    const isDouble = (val1 === val2);
    const sum = val1 + val2;

    // Reset các class animation vật lý cũ
    if (diceScene1) diceScene1.classList.remove("dice-tossing-1");
    if (diceScene2) diceScene2.classList.remove("dice-tossing-2");
    if (diceTray) diceTray.classList.remove("tray-impact-shake");
    if (s1) s1.classList.remove("shadow-tossing-1");
    if (s2) s2.classList.remove("shadow-tossing-2");

    // Force reflow để trigger lại animation mượt mà
    if (diceScene1) void diceScene1.offsetWidth;

    // Kích hoạt animation vật lý: Ném bổng -> Rơi chạm mặt bàn -> Nảy lên -> Ổn định
    if (diceScene1) diceScene1.classList.add("dice-tossing-1");
    if (diceScene2) diceScene2.classList.add("dice-tossing-2");
    if (diceTray) diceTray.classList.add("tray-impact-shake");
    if (s1) s1.classList.add("shadow-tossing-1");
    if (s2) s2.classList.add("shadow-tossing-2");

    // Xoay 3D hỗn loạn kết hợp nhiều trục (X, Y, Z) và giảm tốc mượt vào đúng mặt đích
    const rot1 = faceRotations[val1] || { x: 0, y: 0 };
    const rot2 = faceRotations[val2] || { x: 0, y: 0 };

    // Tích lũy vòng quay mượt mà một chiều (không bao giờ quay giật ngược)
    diceCumulativeRotation1.x += 1080 + (rot1.x - (diceCumulativeRotation1.x % 360));
    diceCumulativeRotation1.y += 1080 + (rot1.y - (diceCumulativeRotation1.y % 360));
    diceCumulativeRotation1.z += 360;

    diceCumulativeRotation2.x += 1080 + (rot2.x - (diceCumulativeRotation2.x % 360));
    diceCumulativeRotation2.y += 1080 + (rot2.y - (diceCumulativeRotation2.y % 360));
    diceCumulativeRotation2.z -= 360;

    if (diceCube1) {
        diceCube1.style.transition = "transform 1.25s cubic-bezier(0.18, 0.85, 0.25, 1)";
        diceCube1.style.transform = `rotateX(${diceCumulativeRotation1.x}deg) rotateY(${diceCumulativeRotation1.y}deg) rotateZ(${diceCumulativeRotation1.z}deg)`;
    }

    if (diceCube2) {
        diceCube2.style.transition = "transform 1.25s cubic-bezier(0.18, 0.85, 0.25, 1)";
        diceCube2.style.transform = `rotateX(${diceCumulativeRotation2.x}deg) rotateY(${diceCumulativeRotation2.y}deg) rotateZ(${diceCumulativeRotation2.z}deg)`;
    }

    // Âm thanh xúc xắc rơi va chạm chính xác vào khoảnh khắc chạm khay nỉ (~650ms)
    setTimeout(() => {
        soundEffects.diceDrop();
    }, 650);

    // Kết thúc ván tung, hoàn trả callback kết quả
    setTimeout(() => {
        if (diceScene1) diceScene1.classList.remove("dice-tossing-1");
        if (diceScene2) diceScene2.classList.remove("dice-tossing-2");
        if (diceTray) diceTray.classList.remove("tray-impact-shake");
        if (s1) s1.classList.remove("shadow-tossing-1");
        if (s2) s2.classList.remove("shadow-tossing-2");

        if (resultPill) {
            resultPill.innerHTML = `🎲 <strong>${val1} + ${val2} = ${sum}</strong> bước ${isDouble ? '<span class="dice-double-tag">🎉 ĐỔ XÚC XẮC ĐÔI!</span>' : ''}`;
            resultPill.style.display = "inline-flex";
        }

        if (callback) callback({ d1: val1, d2: val2, sum, isDouble });
    }, 1280);
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

        // Phát sóng xúc xắc qua P2P cho người yêu
        if (window.CoupleNetwork) {
            window.CoupleNetwork.send({
                type: 'monopoly_sync_roll',
                playerIndex: gameState.currentTurnIndex,
                d1: d1,
                d2: d2
            });
        }

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
    const viewMono = document.getElementById("viewMonopoly");
    if (viewMono && !viewMono.classList.contains("active")) {
        return;
    }
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
        const jailTile = VIETNAM_TILES.find(t => t.type === 'jail');
        player.position = jailTile ? jailTile.id : 18;
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
    // buyPropEmoji replaced by elegant header
    document.getElementById("buyPropDesc").textContent = tile.desc;

    const buyImg = document.getElementById("buyPropImage");
    const buyFrame = document.getElementById("buyPropImageFrame");
    if (buyImg && buyFrame) {
        if (tile.image) {
            buyImg.src = tile.image;
            buyImg.alt = tile.name;
            buyFrame.style.display = "block";
        } else {
            buyFrame.style.display = "none";
        }
    }
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
    visualFX.triggerConstructionCelebration(tile, 0, player);
    broadcastMonopolyState();
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
    // buyPropEmoji replaced by elegant header
    document.getElementById("buyPropDesc").textContent = `Xây thêm công trình để tăng mạnh tiền thuê đất khi đối thủ dừng chân!`;

    const upgradeImg = document.getElementById("buyPropImage");
    const upgradeFrame = document.getElementById("buyPropImageFrame");
    if (upgradeImg && upgradeFrame) {
        if (tile.image) {
            upgradeImg.src = tile.image;
            upgradeImg.alt = tile.name;
            upgradeFrame.style.display = "block";
        } else {
            upgradeFrame.style.display = "none";
        }
    }
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
    visualFX.triggerConstructionCelebration(tile, tile.level, player);
    broadcastMonopolyState();
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
    if (!player) player = gameState.players[gameState.currentTurnIndex];
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

    // Cập nhật ảnh danh thắng thực tế vào modal
    const imgEl = document.getElementById("inspectImage");
    const photoFrame = document.getElementById("inspectPhotoFrame");
    if (imgEl && photoFrame) {
        if (tile.image) {
            imgEl.src = tile.image;
            imgEl.alt = tile.name;
            photoFrame.style.display = "block";
        } else {
            photoFrame.style.display = "none";
        }
    }
    const photoBadge = document.getElementById("inspectPhotoBadge");
    if (photoBadge) {
        photoBadge.textContent = `📍 ${tile.regionName} • ${tile.subtitle || tile.name}`;
    }

    const headerBanner = document.getElementById("inspectHeaderColor");
    if (headerBanner) {
        headerBanner.className = `deed-header-banner strip-${tile.region}`;
    }

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
            const ownerColor = ownerObj ? ownerObj.color : "#b45d43";
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

    // Header emblem đổi thành SVG mạ vàng
    const emblemEl = modal.querySelector(".passport-emblem");
    if (emblemEl) {
        emblemEl.innerHTML = `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v11H9z"></path></svg>`;
    }

    const statsRow = document.getElementById("portfolioPlayersStats");
    if (statsRow) {
        statsRow.innerHTML = "";
        gameState.players.forEach(p => {
            const col = document.createElement("div");
            col.className = "passport-stat-col";
            col.style.borderTop = `3px solid ${p.color}`;
            const pDisplayName = (p.isAi || (gameState.gameMode === "ai" && p.id !== "p0")) ? 'Máy (AI)' : p.name;
            col.innerHTML = `
                <div class="port-player-header">
                    <span class="port-p-avatar" style="background:${p.bg}; border: 1.5px solid ${p.color};">${p.isAi ? '🤖' : (p.icon || '👦')}</span>
                    <span class="port-p-name" style="color:${p.color};">${pDisplayName} ${p.isAi ? '<span class="ai-tag">AI</span>' : ''}</span>
                </div>
                <div class="port-p-cash">${Number(p.cash).toLocaleString()}<small>M VNĐ</small></div>
                <div class="port-p-meta">
                    <span class="port-badge-props">${p.props.length} Bất Động Sản</span>
                    <span class="port-badge-status">${playerJailStatus(p)}</span>
                </div>
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
        item.className = `pass-item ${t.owner ? 'unlocked' : 'is-available'}`;

        let statusBadge = `<span class="badge-locked">Chưa có chủ</span>`;
        if (t.owner) {
            const ownerObj = gameState.players.find(p => p.id === t.owner);
            if (ownerObj) {
                const houseTag = t.level <= 1 ? '1 Nhà Phố' : t.level === 2 ? '2 Biệt Thự' : 'Khách Sạn';
                statusBadge = `<span class="badge-unlocked" style="background:${ownerObj.color}; color:#fff;">${ownerObj.name} • ${houseTag}</span>`;
            }
        }

        item.innerHTML = `
            <div class="pass-item-top">
                <span class="pass-item-region">${t.regionName || 'Việt Nam'}</span>
                <span class="pass-item-price">${t.price}M</span>
            </div>
            <div class="pass-item-name">${t.name}</div>
            <div class="pass-item-status-wrap">
                ${statusBadge}
            </div>
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
        showStatusNotice(`<strong>${current.name}</strong> đổ được cặp đôi, nhận thêm 1 lượt tung!`);
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
    broadcastMonopolyState();

    const nextPlayer = gameState.players[gameState.currentTurnIndex];
    showStatusNotice(`Lượt của <strong>${nextPlayer.name}</strong>`);
    const statusDot = document.getElementById("statusDotIndicator");
    if (statusDot) statusDot.style.background = nextPlayer.color;

    if (nextPlayer.isAi && !nextPlayer.isBankrupt) {
        setTimeout(handleRollDice, 1200);
    }
}

function triggerGameOver(winner) {
    const modal = document.getElementById("modalGameOver");
    if (!modal) return;

    soundEffects.jackpotWin();
    document.getElementById("winnerText").innerHTML = `🎉 Người chiến thắng: <strong style="color:${winner.color}; font-size:22px;">${winner.name}</strong> với khối tài sản khổng lồ <strong>${Number(calculateNetWorth(winner)).toLocaleString()}M VNĐ</strong>!`;

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
            const defaultAiName = count === 2 ? 'Máy (AI)' : `Máy (AI ${i})`;
            let displayName = cfg.name;
            if (isAi) {
                displayName = defaultAiName;
            } else if (i === 1 && (cfg.name === 'Máy (AI)' || cfg.name.startsWith('Máy (AI'))) {
                displayName = 'Hiền';
            }

            const row = document.createElement("div");
            row.className = "setup-player-row";
            const initialLetter = isAi ? 'AI' : (displayName ? displayName.charAt(0).toUpperCase() : (cfg.icon || 'H'));
            row.innerHTML = `
                <div class="setup-p-avatar-circle" style="background:${cfg.bg}; color:${cfg.color}; border: 1.5px solid ${cfg.color};">
                    ${initialLetter}
                </div>
                <input type="text" class="setup-player-name-input" data-player-idx="${i}" value="${displayName}" maxlength="12" placeholder="Tên người chơi">
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

    // Reset toàn bộ 24 ô đất
    VIETNAM_TILES.forEach(t => {
        t.owner = null;
        t.level = 0;
    });

    gameState.players = [];
    for (let i = 0; i < playerCount; i++) {
        const cfg = ALL_PLAYER_CONFIGS[i];
        const isAi = gameMode === "ai" && i > 0;
        const defaultAiName = playerCount === 2 ? 'Máy (AI)' : `Máy (AI ${i})`;
        let finalName = cfg.name;
        if (isAi) {
            finalName = (!cfg.name || cfg.name === 'Hiền' || cfg.name.startsWith('Máy (AI')) ? defaultAiName : cfg.name;
        } else if (i === 1 && (cfg.name === 'Máy (AI)' || cfg.name.startsWith('Máy (AI'))) {
            finalName = 'Hiền';
        }

        gameState.players.push({
            id: `p${i}`,
            name: finalName,
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
    showStatusNotice(`Ván cờ bắt đầu • Lượt đầu tiên: <strong>${gameState.players[0].name}</strong>`);
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
    const soundSvgOn = document.getElementById("soundSvgOn");
    const soundSvgOff = document.getElementById("soundSvgOff");
    if (btnSound) {
        btnSound.addEventListener("click", () => {
            gameState.soundEnabled = !gameState.soundEnabled;
            if (soundSvgOn) soundSvgOn.style.display = gameState.soundEnabled ? "block" : "none";
            if (soundSvgOff) soundSvgOff.style.display = gameState.soundEnabled ? "none" : "block";
            showStatusNotice(gameState.soundEnabled ? "Đã bật âm thanh trò chơi" : "Đã tắt âm thanh trò chơi");
        });
    }

    const btnRestartQuick = document.getElementById("btnRestartQuick");
    if (btnRestartQuick) {
        btnRestartQuick.addEventListener("click", () => {
            const m = document.getElementById("modalGameSetup");
            if (m) m.classList.add("active");
        });
    }

    const btnOpenSetup = document.getElementById("btnOpenSetup");
    if (btnOpenSetup) {
        btnOpenSetup.addEventListener("click", () => {
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
    "vintage-rose": "Vườn Hoa",
    "midnight": "Đêm Sao",
    "mocha": "Cà Phê",
    "secret-garden": "Khu Vườn",
    "bordeaux": "Rượu Vang"
};

function initThemeSwitcher() {
    document.documentElement.setAttribute("data-theme", "sunset");
    try {
        localStorage.setItem("preferred_theme", "sunset");
        localStorage.setItem("couple_love_theme", "sunset");
    } catch (e) {}
}

// 32. KHỞI CHẠY KHI TẢI TRANG (DOM CONTENT LOADED)

// 33. BỘ CHUYỂN GAME TÍCH HỢP (MONOPOLY <-> BLOCK BLAST)
function initGameSwitcher() {
    const tabs = document.querySelectorAll(".game-switch-tab");
    const viewMonopoly = document.getElementById("viewMonopoly");
    const viewBlockBlast = document.getElementById("viewBlockBlast");
    const viewCaro = document.getElementById("viewCaro");
    const viewGo = document.getElementById("viewGo");
    const viewChess = document.getElementById("viewChess");
    const viewSudoku = document.getElementById("viewSudoku");
    const toolsMonopoly = document.getElementById("toolsMonopoly");
    const toolsBlockBlast = document.getElementById("toolsBlockBlast");
    const toolsCaro = document.getElementById("toolsCaro");
    const toolsGo = document.getElementById("toolsGo");

    function switchGame(gameId, updateHash = true) {
        // Đóng các modal hành động đang mở khi chuyển game
        document.querySelectorAll(".game-modal-overlay.active").forEach(m => {
            if (m.id !== "modalThemeSettings") {
                m.classList.remove("active");
            }
        });

        tabs.forEach(t => {
            const active = t.dataset.game === gameId;
            t.classList.toggle("active", active);
            t.setAttribute("aria-selected", active ? "true" : "false");
        });

        if (viewMonopoly) viewMonopoly.classList.toggle("active", gameId === "monopoly");
        if (viewBlockBlast) viewBlockBlast.classList.toggle("active", gameId === "blockblast");
        if (viewCaro) viewCaro.classList.toggle("active", gameId === "caro");
        if (viewGo) viewGo.classList.toggle("active", gameId === "go");
        if (viewChess) viewChess.classList.toggle("active", gameId === "chess");
        if (viewSudoku) viewSudoku.classList.toggle("active", gameId === "sudoku");

        if (toolsMonopoly) toolsMonopoly.style.display = gameId === "monopoly" ? "flex" : "none";
        if (toolsBlockBlast) toolsBlockBlast.style.display = gameId === "blockblast" ? "flex" : "none";
        if (toolsCaro) toolsCaro.style.display = gameId === "caro" ? "flex" : "none";
        if (toolsGo) toolsGo.style.display = gameId === "go" ? "flex" : "none";

        if (gameId === "blockblast" && window.BlockBlast && typeof window.BlockBlast.onShow === "function") {
            window.BlockBlast.onShow();
        }
        if (gameId === "go" && window.GoGame && typeof window.GoGame.onShow === "function") {
            window.GoGame.onShow();
        }

        if (updateHash) location.hash = gameId;
        try { localStorage.setItem("active_game_view", gameId); } catch(e) {}
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            switchGame(tab.dataset.game);
        });
    });

    const urlGame = new URLSearchParams(window.location.search).get("game");
    const hash = location.hash.replace("#", "");
    const saved = localStorage.getItem("active_game_view");
    const targetGame = urlGame || hash || saved;

    if (targetGame === "sudoku") {
        switchGame("sudoku", false);
    } else if (targetGame === "chess") {
        switchGame("chess", false);
    } else if (targetGame === "go") {
        switchGame("go", false);
    } else if (targetGame === "caro") {
        switchGame("caro", false);
    } else if (targetGame === "blockblast") {
        switchGame("blockblast", false);
    } else {
        switchGame("monopoly", false);
    }

    window.addEventListener("hashchange", () => {
        const curHash = location.hash.replace("#", "");
        if (["blockblast", "monopoly", "caro", "go", "chess", "sudoku"].includes(curHash)) {
            switchGame(curHash, false);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initThemeSwitcher();
    setupEventListeners();
    initGameSetupModal();
    initAvatarPickerModal();
    startNewGame(2, "ai");
    initGameSwitcher();

    // Khởi tạo hệ thống mạng đồng bộ P2P hai người
    if (window.CoupleNetwork && typeof window.CoupleNetwork.init === "function") {
        window.CoupleNetwork.init();
        initMonopolyNetworkSync();
    }

    if (window.BlockBlast && typeof window.BlockBlast.init === "function") {
        window.BlockBlast.init();
    }

    if (window.CaroGame && typeof window.CaroGame.init === "function") {
        window.CaroGame.init();
    }

    const btnCaroQuick = document.getElementById("btnCaroQuickRestart");
    if (btnCaroQuick) {
        btnCaroQuick.addEventListener("click", () => {
            if (window.CaroGame) window.CaroGame.resetGame(true);
        });
    }

    if (window.GoGame && typeof window.GoGame.init === "function") {
        window.GoGame.init();
    }

    if (window.ChessGame && typeof window.ChessGame.init === "function") {
        window.ChessGame.init();
    }

    if (window.SudokuGame && typeof window.SudokuGame.init === "function") {
        window.SudokuGame.init();
    }

    const btnGoQuick = document.getElementById("btnGoQuickRestart");
    if (btnGoQuick) {
        btnGoQuick.addEventListener("click", () => {
            if (window.GoGame) window.GoGame.resetGame(9, true);
        });
    }

    // Role switch handled centrally by CoupleNetwork
});

// 34. ĐỒNG BỘ CỜ TỶ PHÚ QUA MẠNG P2P CHO HAI NGƯỜI
function initMonopolyNetworkSync() {
    if (!window.CoupleNetwork) return;

    window.CoupleNetwork.onMessage((packet) => {
        if (!packet || typeof packet !== "object") return;

        // 1. Nhận lượt tung xúc xắc từ đối phương
        if (packet.type === "monopoly_sync_roll") {
            if (!gameState.isRolling) {
                if (typeof packet.playerIndex === "number") {
                    gameState.currentTurnIndex = packet.playerIndex;
                }
                executeNetworkRoll(packet.d1, packet.d2);
            }
        }
        // 2. Nhận gói đồng bộ toàn diện trạng thái bàn cờ (Full Board State Sync)
        else if (packet.type === "monopoly_sync_state") {
            applyMonopolySyncState(packet);
        }
        // 3. Khi đối phương kết nối vào phòng, tự động gửi bàn cờ hiện tại
        else if (packet.type === "presence_change" && packet.online) {
            const myRole = window.CoupleNetwork.getMyRole();
            if (myRole === 'huy') {
                broadcastMonopolyState();
            }
            updateUI();
        }
    });
}

function broadcastMonopolyState() {
    if (!window.CoupleNetwork) return;

    try {
        const syncPacket = {
            type: 'monopoly_sync_state',
            currentTurnIndex: gameState.currentTurnIndex,
            roundCount: gameState.roundCount,
            parkingPool: gameState.parkingPool,
            players: gameState.players.map(p => ({
                id: p.id,
                name: p.name,
                cash: p.cash,
                position: p.position,
                inJail: p.inJail,
                jailTurns: p.jailTurns,
                frozenTurns: p.frozenTurns,
                props: [...p.props]
            })),
            tiles: VIETNAM_TILES.map(t => ({
                id: t.id,
                owner: t.owner,
                level: t.level
            }))
        };
        window.CoupleNetwork.send(syncPacket);
    } catch(e) {
        console.warn("Lỗi gửi monopoly sync state:", e);
    }
}

function applyMonopolySyncState(packet) {
    if (!packet) return;

    if (typeof packet.currentTurnIndex === "number") {
        gameState.currentTurnIndex = packet.currentTurnIndex;
    }
    if (typeof packet.roundCount === "number") {
        gameState.roundCount = packet.roundCount;
    }
    if (typeof packet.parkingPool === "number") {
        gameState.parkingPool = packet.parkingPool;
    }

    // Cập nhật người chơi
    if (Array.isArray(packet.players)) {
        packet.players.forEach(pData => {
            const p = gameState.players.find(item => item.id === pData.id);
            if (p) {
                p.cash = pData.cash;
                p.position = pData.position;
                p.inJail = pData.inJail;
                p.jailTurns = pData.jailTurns;
                p.frozenTurns = pData.frozenTurns;
                if (Array.isArray(pData.props)) p.props = [...pData.props];
            }
        });
    }

    // Cập nhật sở hữu đất & cấp công trình nhà 3D
    if (Array.isArray(packet.tiles)) {
        packet.tiles.forEach(tData => {
            const t = VIETNAM_TILES.find(item => item.id === tData.id);
            if (t) {
                t.owner = tData.owner;
                t.level = tData.level;
            }
        });
    }

    renderPlayerHUD();
    renderPlayerTokens();
    updateUI();
}

function executeNetworkRoll(d1, d2) {
    if (gameState.isRolling) return;
    const player = gameState.players[gameState.currentTurnIndex];
    if (!player || player.isBankrupt) return;

    gameState.isRolling = true;
    updateUI();

    showStatusNotice(`🎲 <strong>${player.name}</strong> đang gieo cặp xúc xắc...`);

    roll3DDiceSpecified(d1, d2, (rollRes) => {
        const sum = d1 + d2;
        const isDouble = (d1 === d2);
        gameState.isRolling = false;

        showStatusCapsule(`🎲 <strong>${player.name}</strong> đổ xúc xắc: <strong>${d1}</strong> + <strong>${d2}</strong> = <strong>${sum}</strong>!`);

        recordTransaction({
            type: "dice",
            from: player.name,
            to: null,
            amount: null,
            title: `Đổ xúc xắc: ${d1} + ${d2} = ${sum}`,
            detail: isDouble ? "Đổ đôi - Được thêm lượt tung!" : "Di chuyển trên bàn cờ"
        });

        if (player.inJail) {
            if (isDouble) {
                player.inJail = false;
                player.jailTurns = 0;
                showStatusNotice(`🎉 <strong>${player.name}</strong> đổ ra cặp đôi <strong>[${d1}-${d2}]</strong> và được trả tự do ngay lập tức!`);
                movePlayerSteps(player, sum);
            } else {
                player.jailTurns++;
                showStatusNotice(`⛓️ <strong>${player.name}</strong> đổ [${d1}-${d2}] (không phải số đôi). Vẫn phải tạm giữ.`);
                finishTurn();
            }
            return;
        }

        if (isDouble) {
            gameState.rolledDoubleTurn = true;
        }

        movePlayerSteps(player, sum);
    });
}



// 30. AVATAR PICKER ENGINE (THAY ĐỔI AVATAR NGƯỜI CHƠI BẤT KỲ LÚC NÀO)
let activeAvatarTargetPlayerId = "p0";

function openAvatarPicker(playerId) {
    activeAvatarTargetPlayerId = playerId;
    const modal = document.getElementById("modalAvatarPicker");
    const grid = document.getElementById("avatarGridSelection");
    if (!modal || !grid) return;

    const player = gameState.players.find(p => p.id === playerId) || ALL_PLAYER_CONFIGS[0];
    const currentIcon = player.icon || "👦";

    grid.innerHTML = "";
    AVATAR_COLLECTION.forEach(av => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = `avatar-opt-btn ${av.icon === currentIcon ? 'selected' : ''}`;
        item.setAttribute("data-avatar", av.icon);
        item.innerHTML = `
            <span class="avatar-opt-emoji">${av.icon}</span>
            <span class="avatar-opt-name">${av.name}</span>
        `;
        item.addEventListener("click", () => {
            selectPlayerAvatar(playerId, av.icon);
        });
        grid.appendChild(item);
    });

    modal.classList.add("active");
}

function selectPlayerAvatar(playerId, icon) {
    // 1. Cập nhật trong gameState.players
    const p = gameState.players.find(item => item.id === playerId);
    if (p) p.icon = icon;

    // 2. Cập nhật trong ALL_PLAYER_CONFIGS
    const idx = parseInt(playerId.replace("p", "")) || 0;
    if (ALL_PLAYER_CONFIGS[idx]) ALL_PLAYER_CONFIGS[idx].icon = icon;

    // 3. Lưu vào localStorage
    try {
        localStorage.setItem(`monopoly_avatar_${playerId}`, icon);
    } catch (e) {}

    // 4. Đóng modal & cập nhật giao diện
    closeModal("modalAvatarPicker");
    renderPlayerHUD();
    renderPlayerTokens();
    if (typeof renderSetupRoster === 'function') renderSetupRoster();
}

function initAvatarPickerModal() {
    const btnClose = document.getElementById("btnCloseAvatarPicker");
    if (btnClose) {
        btnClose.addEventListener("click", () => closeModal("modalAvatarPicker"));
    }

    // Nạp avatar đã lưu từ localStorage
    ["p0", "p1", "p2", "p3"].forEach((pid, idx) => {
        try {
            const saved = localStorage.getItem(`monopoly_avatar_${pid}`);
            if (saved && !['🚗', '✈️', '⛵', '🚲', '👦', '👧'].includes(saved) && ALL_PLAYER_CONFIGS[idx]) {
                ALL_PLAYER_CONFIGS[idx].icon = saved;
            }
        } catch(e) {}
    });
}
