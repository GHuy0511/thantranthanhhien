/**
 * ========================================================
 * KẾ HOẠCH & QUỸ TIẾT KIỆM TƯƠNG LAI CHO HUY & HIỀN
 * - Quản lý mục tiêu chung và không gian riêng tư của mỗi người
 * - Phân loại danh mục khoa học: Du lịch, Kỷ niệm, Tương lai, Hẹn hò
 * - QUỸ MOMO & MÃ QR ĐỘNG: Tạo mã QR sắc nét từ link MoMo để quét tham gia quỹ
 * - Lịch sử nạp quỹ heo đất chi tiết (Ai góp, bao nhiêu, ngày nào, ghi chú)
 * - TÍNH NĂNG BÍ MẬT: Ẩn tiến độ tiền với đối phương để tạo bất ngờ
 * - Checklist việc cần chuẩn bị cho từng chuyến đi/dự định
 * - Đồng bộ P2P thời gian thực giữa 2 máy qua CoupleNetwork
 * ========================================================
 */

window.GoalsApp = (function () {
    'use strict';

    const STORAGE_KEY = 'couple_goals_data_clean';
    const DEFAULT_SAMPLE_GOALS = [];

    let currentSpace = 'all'; // 'all', 'both', 'huy', 'hien'
    let goals = [];
    let editingGoalId = null;
    let depositingGoalId = null;
    let viewingFundGoalId = null;
    let deletingGoalId = null;

    const CATEGORY_MAP = {
        travel: { name: 'Du Lịch', icon: '', color: '#0284c7' },
        gift: { name: 'Kỷ Niệm', icon: '', color: '#ec4899' },
        future: { name: 'Tương Lai', icon: '', color: '#10b981' },
        dating: { name: 'Hẹn Hò', icon: '', color: '#f59e0b' },
        other: { name: 'Mục Tiêu', icon: '', color: '#8b5cf6' }
    };

    function init() {
        if (window.CoupleNetwork) {
            window.CoupleNetwork.init();
        }
        loadData();
        bindUIEvents();
        initP2PSync();
        renderGoals();
        updateFinancialOverview();
    }

    function loadData() {
        try {
            localStorage.removeItem('couple_goals_data_v1');
            localStorage.removeItem('couple_goals_data_v2');

            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    const sampleIds = ['g_hue_trip', 'g_birthday_hien', 'g_anniversary'];
                    goals = parsed.filter(g => !sampleIds.includes(g.id));
                } else {
                    goals = [];
                }
            } else {
                goals = [];
            }
        } catch (e) {
            goals = [];
        }
        saveData(false);
    }

    function saveData(broadcast = true) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
        } catch (e) {}

        if (broadcast && window.CoupleNetwork) {
            window.CoupleNetwork.send({
                type: 'goals_sync',
                goals: goals
            });
        }
        updateFinancialOverview();
    }

    function initP2PSync() {
        if (!window.CoupleNetwork) return;

        window.CoupleNetwork.onMessage((packet) => {
            if (packet.type === 'goals_sync' && Array.isArray(packet.goals)) {
                goals = packet.goals;
                try { localStorage.setItem(STORAGE_KEY, JSON.stringify(goals)); } catch (e) {}
                renderGoals();
                updateFinancialOverview();
                if (viewingFundGoalId) {
                    openFundDetailModal(viewingFundGoalId);
                }
            } else if (packet.type === 'my_role_changed') {
                renderGoals();
                updateFinancialOverview();
            }
        });
    }

    function getMyRole() {
        return window.CoupleNetwork ? window.CoupleNetwork.getMyRole() : 'huy';
    }

    function formatVND(amount) {
        return Number(amount || 0).toLocaleString('vi-VN') + '\u00A0đ';
    }

    function calculateDaysRemaining(targetDateStr) {
        if (!targetDateStr) return null;
        const target = new Date(targetDateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const diffTime = target - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    function getCategoryInfo(catKey) {
        return CATEGORY_MAP[catKey] || CATEGORY_MAP.travel;
    }

    // ========================================================
    // RENDER GIAO DIỆN CHÍNH
    // ========================================================
    function renderGoals() {
        const grid = document.getElementById('goalsGrid');
        if (!grid) return;

        grid.innerHTML = '';
        const myRole = getMyRole();

        const filtered = goals.filter(g => {
            if (currentSpace === 'all') return true;
            if (currentSpace === 'both') return g.space === 'both';
            if (currentSpace === 'huy') return g.space === 'huy';
            if (currentSpace === 'hien') return g.space === 'hien';
            return true;
        });

        if (filtered.length === 0) {
            let emptyTitle = 'Chưa có kế hoạch nào được tạo';
            let emptyDesc = 'Hãy cùng nhau lên lịch trình cho những chuyến đi hoặc tạo những bất ngờ ngọt ngào cho người thương nhé.';
            let btnText = '+ Tạo Kế Hoạch Đầu Tiên';

            if (currentSpace === 'both') {
                emptyTitle = 'Chưa có kế hoạch chung nào';
                emptyDesc = 'Lên kế hoạch những chuyến du lịch, khám phá hoặc các mục tiêu chung của hai bạn.';
                btnText = '+ Thêm Kế Hoạch Chung';
            } else if (currentSpace === 'huy') {
                emptyTitle = 'Huy chưa có kế hoạch riêng nào';
                emptyDesc = 'Huy có thể bí mật tích lũy quỹ hoặc chuẩn bị món quà bất ngờ dành cho Hiền tại đây.';
                btnText = '+ Thêm Kế Hoạch Của Huy';
            } else if (currentSpace === 'hien') {
                emptyTitle = 'Hiền chưa có kế hoạch riêng nào';
                emptyDesc = 'Hiền có thể bí mật tích lũy quỹ hoặc chuẩn bị món quà bất ngờ dành cho Huy tại đây.';
                btnText = '+ Thêm Kế Hoạch Của Hiền';
            }

            grid.innerHTML = `
                <div class="goals-empty-state">
                    <div class="goals-empty-graphic" aria-hidden="true">
                        <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
                            <circle cx="32" cy="32" r="30" fill="rgba(180, 93, 67, 0.08)" stroke="rgba(180, 93, 67, 0.2)" stroke-width="1.5" stroke-dasharray="4 4" />
                            <path d="M22 20H42C44.2091 20 46 21.7909 46 24V44C46 46.2091 44.2091 48 42 48H22C19.7909 48 18 46.2091 18 44V24C18 21.7909 19.7909 20 22 20Z" fill="#FAF6F0" stroke="#B45D43" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M24 28H40" stroke="#B45D43" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M24 34H36" stroke="#B45D43" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M24 40H32" stroke="#B45D43" stroke-width="1.8" stroke-linecap="round"/>
                            <circle cx="42" cy="38" r="4.5" fill="#D97706" />
                            <path d="M42 35.5V40.5M39.5 38H44.5" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <h3 class="goals-empty-title">${emptyTitle}</h3>
                    <p class="goals-empty-desc">${emptyDesc}</p>
                    <button class="btn-empty-add" type="button" onclick="window.GoalsApp.openCreateModal()">
                        ${btnText}
                    </button>
                </div>
            `;
            return;
        }

        filtered.forEach(goal => {
            const card = document.createElement('div');
            card.className = 'goal-card';
            card.id = `goal-card-${goal.id}`;

            const daysLeft = calculateDaysRemaining(goal.targetDate);
            let daysBadgeText = '';
            if (daysLeft !== null) {
                if (daysLeft > 0) daysBadgeText = `Còn ${daysLeft} ngày`;
                else if (daysLeft === 0) daysBadgeText = 'Hôm nay';
                else daysBadgeText = 'Đã đến hạn';
            }

            // Tag không gian
            let spaceTagClass = 'tag-both';
            let spaceTagText = 'Kế hoạch chung';
            if (goal.space === 'huy') {
                spaceTagClass = 'tag-huy';
                spaceTagText = 'Của Huy';
            } else if (goal.space === 'hien') {
                spaceTagClass = 'tag-hien';
                spaceTagText = 'Của Hiền';
            }

            // Danh mục
            const catInfo = getCategoryInfo(goal.category || 'travel');

            // Quyền riêng tư & Bảo mật
            const isCreator = (goal.ownerRole === myRole);
            const shouldHideSavings = goal.isSecret && !isCreator;

            // Tính phần trăm hoàn thành
            const pct = goal.targetAmount > 0 
                ? Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
                : 0;

            // Render phần Tài Chính / Tiết Kiệm
            let savingsHtml = '';
            if (shouldHideSavings) {
                const creatorName = goal.ownerRole === 'huy' ? 'Huy' : 'Hiền';
                savingsHtml = `
                    <div class="secret-surprise-box">
                        <div class="secret-surprise-title">Bất ngờ bí mật từ ${creatorName}</div>
                        <p class="secret-surprise-desc">Kế hoạch đang được âm thầm chuẩn bị, số tiền được bảo mật riêng tư.</p>
                    </div>
                `;
            } else {
                const momoBtnHtml = `
                    <button class="btn-momo-qr-pill ${goal.momoLink ? 'has-momo' : 'no-momo'}" type="button" title="Xem tiến độ và mã QR MoMo" onclick="window.GoalsApp.openFundDetailModal('${goal.id}')">
                        <span class="momo-pill-logo">MoMo</span>
                        <span>${goal.momoLink ? 'Quét QR' : '+ Mã QR'}</span>
                    </button>
                `;

                savingsHtml = `
                    <div class="goal-savings-box">
                        <div class="savings-header">
                            <span class="savings-label" onclick="window.GoalsApp.openFundDetailModal('${goal.id}')" title="Xem chi tiết quỹ và mã QR" style="cursor: pointer;">
                                Quỹ tích lũy (<strong>${pct}%</strong>)
                            </span>
                            <div class="savings-header-actions">
                                ${momoBtnHtml}
                                <button class="savings-btn-deposit" type="button" onclick="window.GoalsApp.openDepositModal('${goal.id}')">+ Nạp quỹ</button>
                            </div>
                        </div>
                        <div class="savings-row" onclick="window.GoalsApp.openFundDetailModal('${goal.id}')" style="cursor: pointer;" title="Xem chi tiết quỹ">
                            <span class="savings-val-current">${formatVND(goal.currentAmount)}</span>
                            <span class="savings-val-target">Mục tiêu: ${formatVND(goal.targetAmount)}</span>
                        </div>
                        <div class="savings-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" onclick="window.GoalsApp.openFundDetailModal('${goal.id}')" style="cursor: pointer;">
                            <div class="savings-fill" style="width: ${pct}%;"></div>
                        </div>
                        ${goal.isSecret ? '<span class="savings-secret-indicator">• Đang ẩn số tiền với đối phương</span>' : ''}
                    </div>
                `;
            }

            // Render Checklist
            const checklist = goal.checklist || [];
            const doneCount = checklist.filter(c => c.done).length;
            let checklistItemsHtml = '';
            checklist.forEach(item => {
                checklistItemsHtml += `
                    <li class="checklist-item ${item.done ? 'done' : ''}">
                        <input type="checkbox" class="checklist-checkbox" ${item.done ? 'checked' : ''} 
                            onchange="window.GoalsApp.toggleChecklist('${goal.id}', '${item.id}')">
                        <span>${item.text}</span>
                    </li>
                `;
            });

            card.innerHTML = `
                <div class="goal-card-topbar">
                    <div class="goal-badges-cluster">
                        <span class="goal-category-badge" title="Danh mục: ${catInfo.name}">
                            ${catInfo.name}
                        </span>
                        <span class="goal-space-tag ${spaceTagClass}">${spaceTagText}</span>
                    </div>
                    <div class="goal-card-actions">
                        <button class="goal-action-btn" type="button" title="Chỉnh sửa" onclick="window.GoalsApp.openEditModal('${goal.id}')">Sửa</button>
                        <button class="goal-action-btn btn-delete" type="button" title="Xóa" onclick="window.GoalsApp.promptDeleteGoal('${goal.id}')">Xóa</button>
                    </div>
                </div>

                <h3 class="goal-title">${goal.title}</h3>
                ${goal.location ? `<span class="goal-location-sub">📍 ${goal.location}</span>` : ''}

                ${goal.targetDate ? `
                    <div class="goal-timing-strip">
                        <div class="goal-timing-left">
                            <span>📅 Dự kiến: ${goal.targetDate}</span>
                        </div>
                        ${daysBadgeText ? `<span class="goal-timing-chip">${daysBadgeText}</span>` : ''}
                    </div>
                ` : (daysBadgeText ? `
                    <div class="goal-timing-strip" style="justify-content: flex-end;">
                        <span class="goal-timing-chip">${daysBadgeText}</span>
                    </div>
                ` : '')}

                ${savingsHtml}

                <div class="goal-checklist-box">
                    <div class="checklist-title-row">
                        <span>Việc cần chuẩn bị</span>
                        <span>${doneCount}/${checklist.length}</span>
                    </div>
                    <ul class="checklist-items">
                        ${checklistItemsHtml}
                    </ul>
                    <div class="checklist-input-group">
                        <input type="text" class="checklist-input" id="checkInput-${goal.id}" placeholder="Thêm việc cần làm..." 
                            onkeydown="if(event.key==='Enter') window.GoalsApp.addChecklistItem('${goal.id}')">
                        <button class="checklist-btn-submit" type="button" onclick="window.GoalsApp.addChecklistItem('${goal.id}')">Thêm</button>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    // ========================================================
    // TÍNH TOÁN THANH TỔNG QUAN TÀI CHÍNH KHOA HỌC
    // ========================================================
    function updateFinancialOverview() {
        const myRole = getMyRole();
        const activeGoals = goals.filter(g => g.status === 'active');

        let totalVisibleSaved = 0;
        let totalTarget = 0;
        let totalChecklistItems = 0;
        let doneChecklistItems = 0;

        goals.forEach(g => {
            const canSee = !g.isSecret || (g.ownerRole === myRole);
            if (canSee) {
                totalVisibleSaved += (g.currentAmount || 0);
            }
            totalTarget += (g.targetAmount || 0);

            if (g.checklist && Array.isArray(g.checklist)) {
                totalChecklistItems += g.checklist.length;
                doneChecklistItems += g.checklist.filter(c => c.done).length;
            }
        });

        const overallPct = totalTarget > 0 ? Math.min(100, Math.round((totalVisibleSaved / totalTarget) * 100)) : 0;

        const savedEl = document.getElementById('summaryTotalSaved');
        const targetEl = document.getElementById('summaryTotalTarget');
        const pctEl = document.getElementById('summaryPercent');
        const masterFillEl = document.getElementById('summaryMasterFill');
        const countActiveEl = document.getElementById('summaryCountActive');
        const checklistStatsEl = document.getElementById('summaryChecklistStats');

        if (savedEl) savedEl.textContent = formatVND(totalVisibleSaved);
        if (targetEl) targetEl.textContent = formatVND(totalTarget);
        if (pctEl) pctEl.textContent = `${overallPct}%`;
        if (masterFillEl) masterFillEl.style.width = `${overallPct}%`;
        if (countActiveEl) countActiveEl.textContent = `${activeGoals.length}`;
        if (checklistStatsEl) checklistStatsEl.textContent = `${doneChecklistItems}/${totalChecklistItems}`;

        const countAllEl = document.getElementById('countTabAll');
        const countBothEl = document.getElementById('countTabBoth');
        const countHuyEl = document.getElementById('countTabHuy');
        const countHienEl = document.getElementById('countTabHien');

        if (countAllEl) countAllEl.textContent = goals.length;
        if (countBothEl) countBothEl.textContent = goals.filter(g => g.space === 'both').length;
        if (countHuyEl) countHuyEl.textContent = goals.filter(g => g.space === 'huy').length;
        if (countHienEl) countHienEl.textContent = goals.filter(g => g.space === 'hien').length;
    }

    // ========================================================
    // CHECKLIST THAO TÁC
    // ========================================================
    function toggleChecklist(goalId, itemId) {
        const goal = goals.find(g => g.id === goalId);
        if (!goal || !goal.checklist) return;
        const item = goal.checklist.find(c => c.id === itemId);
        if (item) {
            item.done = !item.done;
            saveData(true);
            renderGoals();
        }
    }

    function addChecklistItem(goalId) {
        const input = document.getElementById(`checkInput-${goalId}`);
        if (!input || !input.value.trim()) return;

        const goal = goals.find(g => g.id === goalId);
        if (!goal) return;

        if (!goal.checklist) goal.checklist = [];
        goal.checklist.push({
            id: 'c_' + Date.now(),
            text: input.value.trim(),
            done: false
        });

        input.value = '';
        saveData(true);
        renderGoals();
    }

    // ========================================================
    // MODAL CHI TIẾT QUỸ & MÃ QR MOMO (DEDICATED MOMO FUND MODAL)
    // ========================================================
    function openFundDetailModal(goalId) {
        viewingFundGoalId = goalId;
        const goal = goals.find(g => g.id === goalId);
        if (!goal) return;

        const modal = document.getElementById('modalFundDetail');
        if (!modal) return;

        const myRole = getMyRole();
        const catInfo = getCategoryInfo(goal.category || 'travel');
        const daysLeft = calculateDaysRemaining(goal.targetDate);

        // Header info
        document.getElementById('fundModalTitle').textContent = goal.title;
        document.getElementById('fundModalSubtitle').textContent = goal.location ? `📍 ${goal.location}` : 'Kế hoạch tích lũy tương lai';

        const catBadge = document.getElementById('fundModalCatBadge');
        if (catBadge) {
            catBadge.textContent = `${catInfo.name}`;
        }

        const spaceBadge = document.getElementById('fundModalSpaceBadge');
        if (spaceBadge) {
            spaceBadge.textContent = goal.space === 'both' ? 'Kế Hoạch Chung' : (goal.space === 'huy' ? 'Của Huy' : 'Của Hiền');
        }

        // Stats
        const pct = goal.targetAmount > 0 ? Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100)) : 0;
        document.getElementById('fundModalSavedAmount').textContent = formatVND(goal.currentAmount);
        document.getElementById('fundModalGoalAmount').textContent = formatVND(goal.targetAmount);
        document.getElementById('fundModalPctBadge').textContent = `${pct}%`;
        document.getElementById('fundModalFillBar').style.width = `${pct}%`;

        const dateTxt = document.getElementById('fundModalDateTxt');
        if (dateTxt) {
            dateTxt.textContent = goal.targetDate ? `📅 Dự kiến: ${goal.targetDate}` : '📅 Chưa đặt thời gian';
        }
        const daysBadge = document.getElementById('fundModalDaysBadge');
        if (daysBadge) {
            if (daysLeft !== null) {
                daysBadge.textContent = daysLeft > 0 ? `Còn ${daysLeft} ngày` : (daysLeft === 0 ? 'Hôm nay' : 'Đã đến hạn');
                daysBadge.style.display = 'inline-block';
            } else {
                daysBadge.style.display = 'none';
            }
        }

        // Render Lịch Sử Đóng Góp Heo Đất
        const historyList = document.getElementById('fundModalHistoryList');
        const historyCount = document.getElementById('fundModalHistoryCount');
        const deposits = goal.deposits || [];

        if (historyCount) historyCount.textContent = `${deposits.length} lần`;

        if (historyList) {
            historyList.innerHTML = '';
            if (deposits.length === 0) {
                historyList.innerHTML = `
                    <div class="history-empty-notice">
                        <span class="piggy-sub-icon">🐷</span>
                        <span>Chưa có lượt nạp heo đất nào. Hãy bắt đầu tích lũy ngay hôm nay!</span>
                    </div>
                `;
            } else {
                // Sắp xếp mới nhất lên đầu
                const sorted = [...deposits].reverse();
                sorted.forEach(dep => {
                    const row = document.createElement('div');
                    row.className = 'fund-history-row';
                    const byName = dep.by || (dep.contributor === 'hien' ? 'Hiền' : 'Huy');
                    const badgeClass = byName === 'Huy' ? 'by-huy' : 'by-hien';

                    row.innerHTML = `
                        <div class="history-row-left">
                            <span class="history-avatar-badge ${badgeClass}">${byName}</span>
                            <div class="history-info-meta">
                                <span class="history-note">${dep.note || 'Nuôi heo đất tiết kiệm'}</span>
                                <span class="history-date">${dep.date || 'Hôm nay'}</span>
                            </div>
                        </div>
                        <div class="history-amount">+${formatVND(dep.amount)}</div>
                    `;
                    historyList.appendChild(row);
                });
            }
        }

        // Render Mã QR MoMo
        const qrBox = document.getElementById('momoQrVisualBox');
        const btnOpen = document.getElementById('btnOpenMomoDirect');
        const btnCopy = document.getElementById('btnCopyMomoDirect');
        const inlineInput = document.getElementById('inputInlineMomo');

        if (inlineInput) inlineInput.value = goal.momoLink || '';

        if (goal.momoLink && goal.momoLink.trim()) {
            const cleanUrl = goal.momoLink.trim();
            const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(cleanUrl)}`;

            qrBox.classList.remove('is-empty');
            qrBox.innerHTML = `
                <div class="momo-qr-render-wrap">
                    <img src="${qrApiUrl}" alt="Mã QR Quỹ MoMo" class="momo-qr-img" />
                    <div class="momo-qr-scan-badge">
                        <span>Quét bằng app MoMo để tham gia quỹ</span>
                    </div>
                </div>
            `;

            if (btnOpen) {
                btnOpen.href = cleanUrl;
                btnOpen.style.display = 'inline-flex';
            }
            if (btnCopy) {
                btnCopy.onclick = () => {
                    navigator.clipboard.writeText(cleanUrl).then(() => {
                        showToast('💌 Đã sao chép link quỹ MoMo!');
                    }).catch(() => {
                        showToast('Link: ' + cleanUrl);
                    });
                };
            }
        } else {
            qrBox.classList.add('is-empty');
            qrBox.innerHTML = `
                <div class="momo-qr-empty-placeholder">
                    <div class="momo-empty-icon-wrap" aria-hidden="true">
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                            <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                            <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                            <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                        </svg>
                    </div>
                    <h5 class="momo-empty-title">Chưa có link Quỹ MoMo</h5>
                    <p class="momo-empty-desc">Dán link Quỹ nhóm hoặc link cá nhân MoMo bên dưới để tạo mã QR ngay.</p>
                </div>
            `;
            if (btnOpen) btnOpen.style.display = 'none';
            if (btnCopy) {
                btnCopy.onclick = () => {
                    showToast('Vui lòng dán link MoMo bên dưới trước nhé!');
                };
            }
        }

        modal.classList.add('active');
    }

    function openDepositFromDetail() {
        if (!viewingFundGoalId) return;
        openDepositModal(viewingFundGoalId);
    }

    function handleSaveInlineMomo() {
        if (!viewingFundGoalId) return;
        const goal = goals.find(g => g.id === viewingFundGoalId);
        if (!goal) return;

        const input = document.getElementById('inputInlineMomo');
        if (!input) return;

        goal.momoLink = input.value.trim();
        saveData(true);
        renderGoals();
        openFundDetailModal(viewingFundGoalId);
        showToast('💖 Đã lưu và tạo mã QR MoMo thành công!');
    }

    // ========================================================
    // MODAL THÊM / SỬA KẾ HOẠCH
    // ========================================================
    function openCreateModal() {
        editingGoalId = null;
        const modal = document.getElementById('modalGoalForm');
        if (!modal) return;

        document.getElementById('goalFormTitle').textContent = 'Thêm Kế Hoạch & Dự Định Mới';
        document.getElementById('inputGoalTitle').value = '';
        document.getElementById('selectGoalCategory').value = 'travel';
        document.getElementById('selectGoalSpace').value = currentSpace === 'all' ? 'both' : currentSpace;
        document.getElementById('inputGoalLocation').value = '';
        document.getElementById('inputGoalMomoLink').value = '';
        document.getElementById('inputGoalDate').value = '';
        document.getElementById('inputGoalTarget').value = '5000000';
        document.getElementById('inputGoalInitial').value = '0';
        document.getElementById('checkboxGoalSecret').checked = (currentSpace === 'huy' || currentSpace === 'hien');

        modal.classList.add('active');
    }

    function openEditModal(goalId) {
        const goal = goals.find(g => g.id === goalId);
        if (!goal) return;

        editingGoalId = goalId;
        const modal = document.getElementById('modalGoalForm');
        if (!modal) return;

        document.getElementById('goalFormTitle').textContent = 'Chỉnh Sửa Kế Hoạch';
        document.getElementById('inputGoalTitle').value = goal.title;
        document.getElementById('selectGoalCategory').value = goal.category || 'travel';
        document.getElementById('selectGoalSpace').value = goal.space || 'both';
        document.getElementById('inputGoalLocation').value = goal.location || '';
        document.getElementById('inputGoalMomoLink').value = goal.momoLink || '';
        document.getElementById('inputGoalDate').value = goal.targetDate || '';
        document.getElementById('inputGoalTarget').value = goal.targetAmount || '';
        document.getElementById('inputGoalInitial').value = goal.currentAmount || '0';
        document.getElementById('checkboxGoalSecret').checked = !!goal.isSecret;

        modal.classList.add('active');
    }

    function handleSaveGoalForm() {
        const title = document.getElementById('inputGoalTitle').value.trim();
        const category = document.getElementById('selectGoalCategory').value || 'travel';
        const space = document.getElementById('selectGoalSpace').value;
        const location = document.getElementById('inputGoalLocation').value.trim();
        const momoLink = document.getElementById('inputGoalMomoLink').value.trim();
        const date = document.getElementById('inputGoalDate').value;
        const targetAmount = parseInt(document.getElementById('inputGoalTarget').value, 10) || 0;
        const initialAmount = parseInt(document.getElementById('inputGoalInitial').value, 10) || 0;
        const isSecret = document.getElementById('checkboxGoalSecret').checked;

        if (!title) {
            alert('Vui lòng nhập tên kế hoạch / dự định!');
            return;
        }

        const myRole = getMyRole();

        if (editingGoalId) {
            const goal = goals.find(g => g.id === editingGoalId);
            if (goal) {
                goal.title = title;
                goal.category = category;
                goal.space = space;
                goal.location = location;
                goal.momoLink = momoLink;
                goal.targetDate = date;
                goal.targetAmount = targetAmount;
                goal.currentAmount = initialAmount;
                goal.isSecret = isSecret;
            }
        } else {
            const newGoal = {
                id: 'g_' + Date.now(),
                title: title,
                category: category,
                space: space,
                location: location || 'Kế hoạch',
                momoLink: momoLink,
                targetDate: date,
                targetAmount: targetAmount,
                currentAmount: initialAmount,
                isSecret: isSecret,
                ownerRole: myRole,
                status: 'active',
                checklist: [
                    { id: 'c_' + Date.now() + '_1', text: 'Lên kế hoạch chi tiết', done: false }
                ],
                deposits: initialAmount > 0 ? [{
                    id: 'd_' + Date.now(),
                    amount: initialAmount,
                    note: 'Số tiền khởi điểm',
                    date: new Date().toISOString().split('T')[0],
                    by: myRole === 'huy' ? 'Huy' : 'Hiền'
                }] : []
            };
            goals.unshift(newGoal);
        }

        closeModal('modalGoalForm');
        saveData(true);
        renderGoals();
        showToast('✨ Đã lưu kế hoạch thành công!');
    }

    function promptDeleteGoal(goalId) {
        const goal = goals.find(g => g.id === goalId);
        if (!goal) return;

        deletingGoalId = goalId;
        const msgEl = document.getElementById('deleteConfirmMsg');
        if (msgEl) {
            msgEl.textContent = `Bạn có chắc chắn muốn xóa kế hoạch "${goal.title}" không? Hành động này không thể hoàn tác.`;
        }

        const modal = document.getElementById('modalConfirmDelete');
        if (modal) modal.classList.add('active');
    }

    function handleConfirmDelete() {
        if (!deletingGoalId) return;
        const goal = goals.find(g => g.id === deletingGoalId);
        const goalTitle = goal ? goal.title : 'Kế hoạch';

        goals = goals.filter(g => g.id !== deletingGoalId);
        deletingGoalId = null;

        closeModal('modalConfirmDelete');
        saveData(true);
        renderGoals();
        showToast(`Đã xóa thành công: "${goalTitle}"`);
    }

    function showToast(message) {
        const toast = document.getElementById('goalsToast');
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add('show');

        if (window.__goalsToastTimer) clearTimeout(window.__goalsToastTimer);
        window.__goalsToastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 2800);
    }

    // ========================================================
    // MODAL NẠP TIỀN TIẾT KIỆM (PIGGYBANK DEPOSIT)
    // ========================================================
    function openDepositModal(goalId) {
        depositingGoalId = goalId;
        const goal = goals.find(g => g.id === goalId);
        if (!goal) return;

        const modal = document.getElementById('modalDeposit');
        if (!modal) return;

        document.getElementById('depositGoalTitle').textContent = `Nạp quỹ: ${goal.title}`;
        document.getElementById('inputDepositAmount').value = '200000';
        document.getElementById('inputDepositNote').value = 'Nuôi heo đất tiết kiệm';

        modal.classList.add('active');
    }

    function handleConfirmDeposit() {
        if (!depositingGoalId) return;
        const goal = goals.find(g => g.id === depositingGoalId);
        if (!goal) return;

        const amount = parseInt(document.getElementById('inputDepositAmount').value, 10) || 0;
        const note = document.getElementById('inputDepositNote').value.trim() || 'Nạp quỹ';

        if (amount <= 0) {
            alert('Vui lòng nhập số tiền hợp lệ lớn hơn 0!');
            return;
        }

        const myRole = getMyRole();
        goal.currentAmount = (goal.currentAmount || 0) + amount;

        if (!goal.deposits) goal.deposits = [];
        goal.deposits.push({
            id: 'd_' + Date.now(),
            amount: amount,
            note: note,
            date: new Date().toISOString().split('T')[0],
            by: myRole === 'huy' ? 'Huy' : 'Hiền'
        });

        closeModal('modalDeposit');
        saveData(true);
        renderGoals();
        if (viewingFundGoalId === depositingGoalId) {
            openFundDetailModal(viewingFundGoalId);
        }
        showToast(`🐷 Đã nạp thành công ${formatVND(amount)} vào quỹ!`);
    }

    function closeModal(modalId) {
        const m = document.getElementById(modalId);
        if (m) m.classList.remove('active');
        if (modalId === 'modalFundDetail') {
            viewingFundGoalId = null;
        }
    }

    function bindUIEvents() {
        const tabs = document.querySelectorAll('.segmented-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                currentSpace = tab.dataset.space || 'all';
                renderGoals();
            });
        });

        document.querySelectorAll('.goals-modal-overlay, .game-modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                    if (overlay.id === 'modalFundDetail') viewingFundGoalId = null;
                }
            });
        });

        document.querySelectorAll('.quick-amount-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.dataset.val;
                const input = document.getElementById('inputDepositAmount');
                if (input && val) input.value = val;
            });
        });

        // Role switch handled centrally by CoupleNetwork
    }

    return {
        init,
        openCreateModal,
        openEditModal,
        deleteGoal: promptDeleteGoal,
        promptDeleteGoal,
        handleConfirmDelete,
        showToast,
        openDepositModal,
        handleSaveGoalForm,
        handleConfirmDeposit,
        closeModal,
        toggleChecklist,
        addChecklistItem,
        openFundDetailModal,
        openDepositFromDetail,
        handleSaveInlineMomo,
        getGoals: () => goals
    };
})();

// Khởi chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    if (window.GoalsApp) window.GoalsApp.init();
});
