/**
 * ========================================================
 * KẾ HOẠCH & QUỸ TIẾT KIỆM TƯƠNG LAI CHO HUY & HIỀN
 * - Quản lý mục tiêu chung, không gian riêng cho Huy, cho Hiền
 * - Quỹ tiết kiệm heo đất (Savings Piggybank)
 * - TÍNH NĂNG ĐỘC ĐÁO: Ẩn tiến độ tiền bí mật tạo bất ngờ (Secret Mode)
 * - Checklist việc cần chuẩn bị
 * - Đồng bộ P2P thời gian thực giữa 2 máy qua CoupleNetwork
 * ========================================================
 */

window.GoalsApp = (function () {
    'use strict';

    const STORAGE_KEY = 'couple_goals_data_v1';
    let currentSpace = 'both'; // 'both', 'huy', 'hien'
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
            currentAmount: 3800000,
            isSecret: false,
            ownerRole: 'huy',
            status: 'active',
            checklist: [
                { id: 'c1', text: 'Đặt vé máy bay khứ hồi', done: true },
                { id: 'c2', text: 'Đặt homestay view sông Hương thơ mộng', done: true },
                { id: 'c3', text: 'Lên lịch trình quán chè Huế & bún bò chuẩn vị', done: false },
                { id: 'c4', text: 'Chuẩn bị máy ảnh & sạc dự phòng', done: false }
            ],
            deposits: [
                { id: 'd1', amount: 1500000, note: 'Khởi tạo quỹ chuyến đi Huế', date: '2026-10-15', by: 'Huy' },
                { id: 'd2', amount: 1300000, note: 'Tiền thưởng dự án', date: '2026-10-28', by: 'Huy' },
                { id: 'd3', amount: 1000000, note: 'Nuôi heo đất tuần này', date: '2026-11-02', by: 'Hiền' }
            ]
        },
        {
            id: 'g_hanoi_2027',
            title: 'Chuyến đi Hà Nội mùa thu lá vàng & trà chanh Nhà Thờ',
            location: 'Hà Nội',
            space: 'both',
            targetDate: '2027-04-20',
            targetAmount: 7000000,
            currentAmount: 2200000,
            isSecret: false,
            ownerRole: 'hien',
            status: 'active',
            checklist: [
                { id: 'c11', text: 'Đặt vé máy bay ra Hà Nội', done: false },
                { id: 'c12', text: 'Dạo quanh Hồ Gươm ăn kem Tràng Tiền', done: false },
                { id: 'c13', text: 'Thưởng thức cà phê trứng Giảng & phở gánh', done: false }
            ],
            deposits: [
                { id: 'd11', amount: 1200000, note: 'Tiết kiệm ban đầu', date: '2026-10-20', by: 'Hiền' },
                { id: 'd12', amount: 1000000, note: 'Góp quỹ chung', date: '2026-11-01', by: 'Huy' }
            ]
        },
        {
            id: 'g_secret_huy',
            title: 'Bí mật chuyến dã ngoại camping ngắm hoàng hôn tặng Hiền',
            location: 'Dã ngoại',
            space: 'huy',
            targetDate: '2026-11-28',
            targetAmount: 2500000,
            currentAmount: 1900000,
            isSecret: true,
            ownerRole: 'huy',
            status: 'active',
            checklist: [
                { id: 'c21', text: 'Thuê lều phong cách vintage & dây đèn ấm', done: true },
                { id: 'c22', text: 'Đặt bánh kem kỷ niệm ngọt ngào', done: false },
                { id: 'c23', text: 'Chuẩn bị playlist nhạc lãng mạn', done: true }
            ],
            deposits: [
                { id: 'd21', amount: 1000000, note: 'Tiết kiệm bí mật', date: '2026-10-18', by: 'Huy' },
                { id: 'd22', amount: 900000, note: 'Nhịn cafe & ăn vặt', date: '2026-11-03', by: 'Huy' }
            ]
        }
    ];

    function init() {
        loadData();
        bindUIEvents();
        initP2PSync();
        renderGoals();
        updateSummary();
    }

    function loadData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                goals = JSON.parse(raw);
            } else {
                goals = [...DEFAULT_GOALS];
                saveData(false);
            }
        } catch (e) {
            goals = [...DEFAULT_GOALS];
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
        updateSummary();
    }

    function initP2PSync() {
        if (!window.CoupleNetwork) return;

        window.CoupleNetwork.onMessage((packet) => {
            if (packet.type === 'goals_sync' && Array.isArray(packet.goals)) {
                goals = packet.goals;
                try { localStorage.setItem(STORAGE_KEY, JSON.stringify(goals)); } catch (e) {}
                renderGoals();
                updateSummary();
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
    // RENDER GIAO DIỆN
    // ========================================================
    function renderGoals() {
        const grid = document.getElementById('goalsGrid');
        if (!grid) return;

        grid.innerHTML = '';
        const myRole = getMyRole();

        const filtered = goals.filter(g => {
            if (currentSpace === 'both') return g.space === 'both';
            if (currentSpace === 'huy') return g.space === 'huy';
            if (currentSpace === 'hien') return g.space === 'hien';
            return true;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; background: #ffffff; border-radius: 20px; border: 1px dashed rgba(0,0,0,0.12);">
                    <span style="font-size: 36px;">🗺️</span>
                    <h3 style="margin: 10px 0 6px; font-size: 16px;">Chưa có kế hoạch nào trong mục này</h3>
                    <p style="color: #6b635c; font-size: 13px; margin: 0 0 16px;">Hãy cùng lên lịch trình hoặc bí mật tạo mục tiêu để dành nhé!</p>
                    <button class="btn-add-goal" onclick="window.GoalsApp.openCreateModal()">+ Thêm Kế Hoạch Ngay</button>
                </div>
            `;
            return;
        }

        filtered.forEach(goal => {
            const card = document.createElement('div');
            card.className = 'goal-card';
            card.id = `goal-card-${goal.id}`;

            const daysLeft = calculateDaysRemaining(goal.targetDate);
            let daysText = '';
            if (daysLeft !== null) {
                if (daysLeft > 0) daysText = `Còn ${daysLeft} ngày`;
                else if (daysLeft === 0) daysText = 'Hôm nay!';
                else daysText = 'Đã đến hạn';
            }

            // Kiểm tra quyền riêng tư & Bí mật
            const isCreator = (goal.ownerRole === myRole);
            const shouldHideSavings = goal.isSecret && !isCreator;

            // Tính phần trăm tiến độ
            const pct = goal.targetAmount > 0 
                ? Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
                : 0;

            // Render phần Quỹ Tiết Kiệm (Savings)
            let savingsHtml = '';
            if (shouldHideSavings) {
                // Người xem là đối phương -> Ẩn tiền và hiện hộp quà bí mật!
                const creatorName = goal.ownerRole === 'huy' ? 'Huy 🚗' : 'Hiền ✈️';
                savingsHtml = `
                    <div class="secret-savings-capsule">
                        <span class="secret-gift-icon">🎁</span>
                        <div class="secret-gift-content">
                            <strong>Bí mật của ${creatorName} 💕</strong>
                            <p>Đang âm thầm để dành tiền tạo bất ngờ cho bạn, hãy đón chờ nhé!</p>
                        </div>
                    </div>
                `;
            } else {
                // Hiển thị bình thường
                savingsHtml = `
                    <div class="goal-savings-section">
                        <div class="savings-header">
                            <span class="savings-label">Quỹ Đã Tích Lũy (${pct}%)</span>
                            <button class="savings-btn-add" onclick="window.GoalsApp.openDepositModal('${goal.id}')">+ Nạp Tiền</button>
                        </div>
                        <div class="savings-numbers">
                            <span class="savings-current">${formatVND(goal.currentAmount)}</span>
                            <span class="savings-target">Mục tiêu: ${formatVND(goal.targetAmount)}</span>
                        </div>
                        <div class="savings-progress-track">
                            <div class="savings-progress-fill" style="width: ${pct}%;"></div>
                        </div>
                        ${goal.isSecret ? '<div class="secret-owner-badge">🔒 Đang ẩn với đối phương (Bí mật)</div>' : ''}
                    </div>
                `;
            }

            // Render Checklist
            let checklistItemsHtml = '';
            (goal.checklist || []).forEach(item => {
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
                    <div>
                        <span class="goal-location-tag">${goal.location || 'Kế hoạch'}</span>
                        <h3 class="goal-title">${goal.title}</h3>
                    </div>
                    <div style="display:flex; gap:4px;">
                        <button class="goal-menu-btn" title="Chỉnh sửa" onclick="window.GoalsApp.openEditModal('${goal.id}')">✏️</button>
                        <button class="goal-menu-btn" title="Xóa" onclick="window.GoalsApp.deleteGoal('${goal.id}')">🗑️</button>
                    </div>
                </div>

                ${goal.targetDate ? `
                    <div class="goal-timing-box">
                        <span>📅 Dự kiến: ${goal.targetDate}</span>
                        <span class="goal-timing-days">${daysText}</span>
                    </div>
                ` : ''}

                ${savingsHtml}

                <div class="goal-checklist-section">
                    <div class="checklist-title">
                        <span>Việc cần chuẩn bị</span>
                        <small style="color:#8c827a;">${(goal.checklist || []).filter(c => c.done).length}/${(goal.checklist || []).length}</small>
                    </div>
                    <ul class="checklist-items">
                        ${checklistItemsHtml}
                    </ul>
                    <div class="checklist-add-input-wrap">
                        <input type="text" class="checklist-add-input" id="checkInput-${goal.id}" placeholder="+ Thêm việc cần làm..." 
                            onkeydown="if(event.key==='Enter') window.GoalsApp.addChecklistItem('${goal.id}')">
                        <button class="checklist-btn-add" onclick="window.GoalsApp.addChecklistItem('${goal.id}')">Thêm</button>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    function updateSummary() {
        const myRole = getMyRole();
        const activeGoals = goals.filter(g => g.status === 'active');
        const countActiveEl = document.getElementById('summaryCountActive');
        const totalSavedEl = document.getElementById('summaryTotalSaved');

        if (countActiveEl) countActiveEl.textContent = `${activeGoals.length} mục tiêu`;

        let totalVisibleSaved = 0;
        goals.forEach(g => {
            // Không cộng tiền của các mục tiêu mà đối phương giấu bí mật
            if (g.isSecret && g.ownerRole !== myRole) return;
            totalVisibleSaved += (g.currentAmount || 0);
        });

        if (totalSavedEl) totalSavedEl.textContent = formatVND(totalVisibleSaved);
    }

    // ========================================================
    // THAO TÁC MỤC TIÊU & CHECKLIST
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
        document.getElementById('selectGoalSpace').value = currentSpace;
        document.getElementById('inputGoalDate').value = '';
        document.getElementById('inputGoalTarget').value = '5000000';
        document.getElementById('inputGoalInitial').value = '0';
        document.getElementById('checkboxGoalSecret').checked = (currentSpace !== 'both');

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
            alert('Vui lòng nhập tên kế hoạch/dự định!');
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
                location: location || 'Du lịch',
                space: space,
                targetDate: date,
                targetAmount: targetAmount,
                currentAmount: initialAmount,
                isSecret: isSecret,
                ownerRole: myRole,
                status: 'active',
                checklist: [
                    { id: 'c_' + Date.now() + '_1', text: 'Lên kế hoạch cụ thể', done: false }
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

        document.getElementById('depositGoalTitle').textContent = `Nạp Tiền: ${goal.title}`;
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
        // Space Tabs Switcher
        const tabs = document.querySelectorAll('.space-tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentSpace = tab.dataset.space || 'both';
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
                updateSummary();
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

// Khởi chạy khi tài liệu sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    if (window.GoalsApp) window.GoalsApp.init();
});
