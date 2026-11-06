/**
 * ========================================================
 * KẾ HOẠCH & QUỸ TIẾT KIỆM TƯƠNG LAI CHO HUY & HIỀN
 * - Quản lý mục tiêu chung và không gian riêng tư của mỗi người
 * - Quỹ tiết kiệm heo đất tích lũy cho các dự định
 * - TÍNH NĂNG BÍ MẬT: Ẩn tiến độ tiền với đối phương để tạo bất ngờ
 * - Checklist việc cần chuẩn bị cho từng chuyến đi/dự định
 * - Đồng bộ P2P thời gian thực giữa 2 máy qua CoupleNetwork
 * ========================================================
 */

window.GoalsApp = (function () {
    'use strict';

    const STORAGE_KEY = 'couple_goals_data_v2';
    let currentSpace = 'all'; // 'all', 'both', 'huy', 'hien'
    let goals = [];
    let editingGoalId = null;
    let depositingGoalId = null;

    const DEFAULT_GOALS = [
        {
            id: 'g_hue_2026',
            title: 'Du lịch Huế ngắm sông Hương & cố đô cùng Hiền',
            location: 'Huế',
            space: 'both',
            targetDate: '2026-12-24',
            targetAmount: 6000000,
            currentAmount: 4200000,
            isSecret: false,
            ownerRole: 'huy',
            status: 'active',
            checklist: [
                { id: 'c1', text: 'Đặt vé tàu / vé máy bay khứ hồi', done: true },
                { id: 'c2', text: 'Đặt homestay view sông Hương thơ mộng', done: true },
                { id: 'c3', text: 'Lên danh sách quán chè hẻm & bún bò chuẩn vị', done: true },
                { id: 'c4', text: 'Thuê áo dài chụp ảnh kỷ niệm tại Đại Nội', done: false }
            ],
            deposits: [
                { id: 'd1', amount: 1500000, note: 'Khởi tạo quỹ chuyến đi Huế', date: '2026-10-15', by: 'Huy' },
                { id: 'd2', amount: 1700000, note: 'Tiền thưởng dự án', date: '2026-10-28', by: 'Huy' },
                { id: 'd3', amount: 1000000, note: 'Nuôi heo đất tiết kiệm', date: '2026-11-02', by: 'Hiền' }
            ]
        },
        {
            id: 'g_hanoi_2027',
            title: 'Khám phá Hà Nội mùa thu lá vàng & phố cổ',
            location: 'Hà Nội',
            space: 'both',
            targetDate: '2027-04-20',
            targetAmount: 7000000,
            currentAmount: 3500000,
            isSecret: false,
            ownerRole: 'hien',
            status: 'active',
            checklist: [
                { id: 'c11', text: 'Đặt vé máy bay khứ hồi Hà Nội', done: false },
                { id: 'c12', text: 'Dạo quanh Hồ Gươm ăn kem Tràng Tiền', done: true },
                { id: 'c13', text: 'Thưởng thức cà phê trứng Giảng & phở gánh', done: false }
            ],
            deposits: [
                { id: 'd11', amount: 2000000, note: 'Tiết kiệm đầu tháng', date: '2026-10-20', by: 'Hiền' },
                { id: 'd12', amount: 1500000, note: 'Góp quỹ chung', date: '2026-11-01', by: 'Huy' }
            ]
        },
        {
            id: 'g_secret_huy',
            title: 'Dã ngoại cắm trại ngắm hoàng hôn tặng Hiền',
            location: 'Dã ngoại',
            space: 'huy',
            targetDate: '2026-11-28',
            targetAmount: 2500000,
            currentAmount: 1900000,
            isSecret: true,
            ownerRole: 'huy',
            status: 'active',
            checklist: [
                { id: 'c21', text: 'Thuê lều phong cách vintage & đèn fairy', done: true },
                { id: 'c22', text: 'Đặt bánh kem kỷ niệm ngọt ngào', done: true },
                { id: 'c23', text: 'Chuẩn bị loa bluetooth & playlist acoustic', done: false }
            ],
            deposits: [
                { id: 'd21', amount: 1000000, note: 'Tiết kiệm bí mật', date: '2026-10-18', by: 'Huy' },
                { id: 'd22', amount: 900000, note: 'Trích quỹ cá nhân', date: '2026-11-03', by: 'Huy' }
            ]
        },
        {
            id: 'g_secret_hien',
            title: 'Chuẩn bị album ảnh kỷ niệm và quà bất ngờ cho Huy',
            location: 'Quà tặng',
            space: 'hien',
            targetDate: '2026-12-10',
            targetAmount: 2000000,
            currentAmount: 1500000,
            isSecret: true,
            ownerRole: 'hien',
            status: 'active',
            checklist: [
                { id: 'c31', text: 'In photobook ảnh những chuyến đi chung', done: true },
                { id: 'c32', text: 'Viết thiệp tay 100 điều yêu thương', done: false },
                { id: 'c33', text: 'Bí mật đặt bàn tối lãng mạn', done: false }
            ],
            deposits: [
                { id: 'd31', amount: 1500000, note: 'Nuôi heo đất bí mật', date: '2026-10-25', by: 'Hiền' }
            ]
        }
    ];

    function init() {
        loadData();
        bindUIEvents();
        initP2PSync();
        renderGoals();
        updateFinancialOverview();
    }

    function loadData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    goals = parsed;
                } else {
                    goals = JSON.parse(JSON.stringify(DEFAULT_GOALS));
                    saveData(false);
                }
            } else {
                // Kiểm tra key cũ nếu có
                const oldRaw = localStorage.getItem('couple_goals_data_v1');
                if (oldRaw) {
                    const oldParsed = JSON.parse(oldRaw);
                    if (Array.isArray(oldParsed) && oldParsed.length > 0) {
                        goals = oldParsed;
                    } else {
                        goals = JSON.parse(JSON.stringify(DEFAULT_GOALS));
                    }
                } else {
                    goals = JSON.parse(JSON.stringify(DEFAULT_GOALS));
                }
                saveData(false);
            }
        } catch (e) {
            goals = JSON.parse(JSON.stringify(DEFAULT_GOALS));
            saveData(false);
        }
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
            }
        });
    }

    function getMyRole() {
        return window.CoupleNetwork ? window.CoupleNetwork.getMyRole() : 'huy';
    }

    function formatVND(amount) {
        return Number(amount || 0).toLocaleString('vi-VN') + ' đ';
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
            let emptyMsg = 'Chưa có kế hoạch nào trong danh mục này.';
            if (currentSpace === 'huy') emptyMsg = 'Huy chưa tạo kế hoạch riêng nào.';
            else if (currentSpace === 'hien') emptyMsg = 'Hiền chưa tạo kế hoạch riêng nào.';

            grid.innerHTML = `
                <div class="goals-empty-state">
                    <h3 class="goals-empty-title">${emptyMsg}</h3>
                    <p class="goals-empty-desc">Cùng lên lịch trình hoặc bí mật tích lũy cho mục tiêu nhé.</p>
                    <button class="btn-empty-add" type="button" onclick="window.GoalsApp.openCreateModal()">+ Thêm kế hoạch</button>
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
                // Người xem là đối phương -> Ẩn số tiền và hiện thông điệp thanh lịch
                const creatorName = goal.ownerRole === 'huy' ? 'Huy' : 'Hiền';
                savingsHtml = `
                    <div class="secret-surprise-box">
                        <div class="secret-surprise-title">Bất ngờ từ ${creatorName}</div>
                        <p class="secret-surprise-desc">Kế hoạch đang được âm thầm chuẩn bị, số tiền được bảo mật riêng tư.</p>
                    </div>
                `;
            } else {
                savingsHtml = `
                    <div class="goal-savings-box">
                        <div class="savings-header">
                            <span class="savings-label">Quỹ tích lũy (${pct}%)</span>
                            <button class="savings-btn-deposit" type="button" onclick="window.GoalsApp.openDepositModal('${goal.id}')">+ Nạp quỹ</button>
                        </div>
                        <div class="savings-row">
                            <span class="savings-val-current">${formatVND(goal.currentAmount)}</span>
                            <span class="savings-val-target">Mục tiêu: ${formatVND(goal.targetAmount)}</span>
                        </div>
                        <div class="savings-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
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
                <div class="goal-card-header">
                    <div class="goal-header-left">
                        <span class="goal-space-tag ${spaceTagClass}">${spaceTagText}</span>
                        <h3 class="goal-title">${goal.title}</h3>
                    </div>
                    <div class="goal-card-actions">
                        <button class="goal-action-btn" type="button" title="Chỉnh sửa" onclick="window.GoalsApp.openEditModal('${goal.id}')">Sửa</button>
                        <button class="goal-action-btn btn-delete" type="button" title="Xóa" onclick="window.GoalsApp.deleteGoal('${goal.id}')">Xóa</button>
                    </div>
                </div>

                ${goal.targetDate ? `
                    <div class="goal-timing-strip">
                        <div class="goal-timing-left">
                            <span>Dự kiến: ${goal.targetDate}</span>
                        </div>
                        <span class="goal-timing-badge">${daysBadgeText}</span>
                    </div>
                ` : ''}

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
            // Kiểm tra số tiền được phép nhìn thấy
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

        // Cập nhật DOM
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

        // Cập nhật số đếm trên từng tab bộ lọc
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
    // MODAL THÊM / SỬA KẾ HOẠCH
    // ========================================================
    function openCreateModal() {
        editingGoalId = null;
        const modal = document.getElementById('modalGoalForm');
        if (!modal) return;

        document.getElementById('goalFormTitle').textContent = 'Thêm Kế Hoạch & Dự Định Mới';
        document.getElementById('inputGoalTitle').value = '';
        document.getElementById('inputGoalLocation').value = 'Huế';
        document.getElementById('selectGoalSpace').value = currentSpace === 'all' ? 'both' : currentSpace;
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
        document.getElementById('inputGoalLocation').value = goal.location || '';
        document.getElementById('selectGoalSpace').value = goal.space;
        document.getElementById('inputGoalDate').value = goal.targetDate || '';
        document.getElementById('inputGoalTarget').value = goal.targetAmount || '';
        document.getElementById('inputGoalInitial').value = goal.currentAmount || '0';
        document.getElementById('checkboxGoalSecret').checked = !!goal.isSecret;

        modal.classList.add('active');
    }

    function handleSaveGoalForm() {
        const title = document.getElementById('inputGoalTitle').value.trim();
        const location = document.getElementById('inputGoalLocation').value.trim();
        const space = document.getElementById('selectGoalSpace').value;
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
                goal.location = location;
                goal.space = space;
                goal.targetDate = date;
                goal.targetAmount = targetAmount;
                goal.currentAmount = initialAmount;
                goal.isSecret = isSecret;
            }
        } else {
            const newGoal = {
                id: 'g_' + Date.now(),
                title: title,
                location: location || 'Kế hoạch',
                space: space,
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
    }

    function deleteGoal(goalId) {
        if (!confirm('Bạn có chắc chắn muốn xóa kế hoạch này không?')) return;
        goals = goals.filter(g => g.id !== goalId);
        saveData(true);
        renderGoals();
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
    }

    function closeModal(modalId) {
        const m = document.getElementById(modalId);
        if (m) m.classList.remove('active');
    }

    function bindUIEvents() {
        // Segmented Tabs Switcher
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

        // Quick amount buttons in deposit modal
        document.querySelectorAll('.quick-amount-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.dataset.val;
                const input = document.getElementById('inputDepositAmount');
                if (input && val) input.value = val;
            });
        });

        // Role Switcher in Top Nav
        const btnSwitch = document.getElementById('btnSwitchMyRole');
        if (btnSwitch && window.CoupleNetwork) {
            btnSwitch.addEventListener('click', () => {
                window.CoupleNetwork.toggleRole();
                renderGoals();
                updateFinancialOverview();
            });
        }
    }

    return {
        init,
        openCreateModal,
        openEditModal,
        deleteGoal,
        openDepositModal,
        handleSaveGoalForm,
        handleConfirmDeposit,
        closeModal,
        toggleChecklist,
        addChecklistItem,
        getGoals: () => goals
    };
})();

// Khởi chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    if (window.GoalsApp) window.GoalsApp.init();
});