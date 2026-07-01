// ============================================
// 海洋智能装备研究所 - 管理后台脚本
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // 权限检查
    if (!isAdmin()) {
        alert('请先以管理员身份登录');
        window.location.href = 'admin-login.html';
        return;
    }

    initAdminTabs();
    renderAllAdminLists();
    loadAboutForm();
});

function adminLogout() {
    setCurrentUser(null);
    window.location.href = 'index.html';
}

// ========== Tab切换 ==========
function initAdminTabs() {
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
            renderAllAdminLists();
            if (tab.dataset.tab === 'tab-about') loadAboutForm();
        });
    });
}

function renderAllAdminLists() {
    renderNoticeAdmin();
    renderGalleryAdmin();
    renderResearchAdmin();
    renderAchievementAdmin();
    renderHonorAdmin();
    renderTeamAdmin();
    renderNewsAdmin();
    renderQAAdmin();
    renderSuggestionAdmin();
}

// ========== 通知公告管理 ==========
function renderNoticeAdmin() {
    const list = document.getElementById('noticeAdminList');
    if (!list) return;
    list.innerHTML = SiteData.notices.map(n => `
        <div class="admin-item">
            <div class="admin-item-info">
                <h4>${n.date} - ${n.title}</h4>
                <p>${n.content}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editNotice(${n.id})">编辑</button>
                <button class="btn-delete" onclick="deleteNotice(${n.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function saveNotice() {
    const id = document.getElementById('noticeEditId').value;
    const data = {
        id: id ? parseInt(id) : Date.now(),
        date: document.getElementById('noticeDate').value,
        title: document.getElementById('noticeTitle').value.trim(),
        content: document.getElementById('noticeContent').value.trim()
    };
    if (!data.date || !data.title) { alert('请填写日期和标题'); return; }

    if (id) {
        const idx = SiteData.notices.findIndex(n => n.id === parseInt(id));
        if (idx >= 0) SiteData.notices[idx] = data;
    } else {
        SiteData.notices.unshift(data);
    }
    SiteData.save('notices', SiteData.notices);
    resetNoticeForm();
    renderNoticeAdmin();
    alert('保存成功！');
}

function editNotice(id) {
    const item = SiteData.notices.find(n => n.id === id);
    if (!item) return;
    document.getElementById('noticeEditId').value = item.id;
    document.getElementById('noticeDate').value = item.date;
    document.getElementById('noticeTitle').value = item.title;
    document.getElementById('noticeContent').value = item.content;
    document.getElementById('tab-notices').scrollIntoView({ behavior: 'smooth' });
}

function deleteNotice(id) {
    if (!confirm('确定删除此公告？')) return;
    SiteData.notices = SiteData.notices.filter(n => n.id !== id);
    SiteData.save('notices', SiteData.notices);
    renderNoticeAdmin();
}

function resetNoticeForm() {
    document.getElementById('noticeEditId').value = '';
    document.getElementById('noticeDate').value = '';
    document.getElementById('noticeTitle').value = '';
    document.getElementById('noticeContent').value = '';
}

// ========== 图片管理 ==========
function renderGalleryAdmin() {
    const list = document.getElementById('galleryAdminList');
    if (!list) return;
    list.innerHTML = SiteData.gallery.map(g => `
        <div class="admin-item">
            <div class="admin-item-info">
                <h4>${g.title}</h4>
                <p>${g.url ? g.url : '使用占位图'}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editGallery(${g.id})">编辑</button>
                <button class="btn-delete" onclick="deleteGallery(${g.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function saveGallery() {
    const id = document.getElementById('galleryEditId').value;
    const data = {
        id: id ? parseInt(id) : Date.now(),
        title: document.getElementById('galleryTitle').value.trim(),
        url: document.getElementById('galleryUrl').value.trim()
    };
    if (!data.title) { alert('请填写图片标题'); return; }

    if (id) {
        const idx = SiteData.gallery.findIndex(g => g.id === parseInt(id));
        if (idx >= 0) SiteData.gallery[idx] = data;
    } else {
        SiteData.gallery.push(data);
    }
    SiteData.save('gallery', SiteData.gallery);
    resetGalleryForm();
    renderGalleryAdmin();
    alert('保存成功！');
}

function editGallery(id) {
    const item = SiteData.gallery.find(g => g.id === id);
    if (!item) return;
    document.getElementById('galleryEditId').value = item.id;
    document.getElementById('galleryTitle').value = item.title;
    document.getElementById('galleryUrl').value = item.url || '';
}

function deleteGallery(id) {
    if (!confirm('确定删除此图片？')) return;
    SiteData.gallery = SiteData.gallery.filter(g => g.id !== id);
    SiteData.save('gallery', SiteData.gallery);
    renderGalleryAdmin();
}

function resetGalleryForm() {
    document.getElementById('galleryEditId').value = '';
    document.getElementById('galleryTitle').value = '';
    document.getElementById('galleryUrl').value = '';
}

// ========== 实验室介绍 ==========
function loadAboutForm() {
    const d = SiteData.about;
    document.getElementById('aboutIntro').value = d.intro || '';
    document.getElementById('aboutIntro2').value = d.intro2 || '';
    document.getElementById('aboutMission').value = d.mission || '';
    if (d.stats && d.stats.length >= 4) {
        document.getElementById('stat1Num').value = d.stats[0].num;
        document.getElementById('stat1Label').value = d.stats[0].label;
        document.getElementById('stat2Num').value = d.stats[1].num;
        document.getElementById('stat2Label').value = d.stats[1].label;
        document.getElementById('stat3Num').value = d.stats[2].num;
        document.getElementById('stat3Label').value = d.stats[2].label;
        document.getElementById('stat4Num').value = d.stats[3].num;
        document.getElementById('stat4Label').value = d.stats[3].label;
    }
}

function saveAbout() {
    SiteData.about = {
        intro: document.getElementById('aboutIntro').value.trim(),
        intro2: document.getElementById('aboutIntro2').value.trim(),
        mission: document.getElementById('aboutMission').value.trim(),
        stats: [
            { num: document.getElementById('stat1Num').value, label: document.getElementById('stat1Label').value },
            { num: document.getElementById('stat2Num').value, label: document.getElementById('stat2Label').value },
            { num: document.getElementById('stat3Num').value, label: document.getElementById('stat3Label').value },
            { num: document.getElementById('stat4Num').value, label: document.getElementById('stat4Label').value },
        ]
    };
    SiteData.save('about', SiteData.about);
    alert('实验室介绍已保存！');
}

// ========== 研究方向管理 ==========
function renderResearchAdmin() {
    const list = document.getElementById('researchAdminList');
    if (!list) return;
    list.innerHTML = SiteData.research.map(r => `
        <div class="admin-item">
            <div class="admin-item-info">
                <h4>${r.icon} ${r.title}</h4>
                <p>${r.desc}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editResearch(${r.id})">编辑</button>
                <button class="btn-delete" onclick="deleteResearch(${r.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function saveResearch() {
    const id = document.getElementById('researchEditId').value;
    const data = {
        id: id ? parseInt(id) : Date.now(),
        icon: document.getElementById('researchIcon').value.trim(),
        title: document.getElementById('researchTitle').value.trim(),
        desc: document.getElementById('researchDesc').value.trim()
    };
    if (!data.title) { alert('请填写标题'); return; }

    if (id) {
        const idx = SiteData.research.findIndex(r => r.id === parseInt(id));
        if (idx >= 0) SiteData.research[idx] = data;
    } else {
        SiteData.research.push(data);
    }
    SiteData.save('research', SiteData.research);
    resetResearchForm();
    renderResearchAdmin();
    alert('保存成功！');
}

function editResearch(id) {
    const item = SiteData.research.find(r => r.id === id);
    if (!item) return;
    document.getElementById('researchEditId').value = item.id;
    document.getElementById('researchIcon').value = item.icon;
    document.getElementById('researchTitle').value = item.title;
    document.getElementById('researchDesc').value = item.desc;
}

function deleteResearch(id) {
    if (!confirm('确定删除此研究方向？')) return;
    SiteData.research = SiteData.research.filter(r => r.id !== id);
    SiteData.save('research', SiteData.research);
    renderResearchAdmin();
}

function resetResearchForm() {
    document.getElementById('researchEditId').value = '';
    document.getElementById('researchIcon').value = '';
    document.getElementById('researchTitle').value = '';
    document.getElementById('researchDesc').value = '';
}

// ========== 科研成果管理 ==========
function renderAchievementAdmin() {
    const list = document.getElementById('achievementAdminList');
    if (!list) return;
    list.innerHTML = SiteData.achievements.map(a => `
        <div class="admin-item">
            <div class="admin-item-info">
                <h4>[${a.year}] ${a.title}</h4>
                <p>${a.desc}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editAchievement(${a.id})">编辑</button>
                <button class="btn-delete" onclick="deleteAchievement(${a.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function saveAchievement() {
    const id = document.getElementById('achievementEditId').value;
    const data = {
        id: id ? parseInt(id) : Date.now(),
        year: document.getElementById('achievementYear').value.trim(),
        title: document.getElementById('achievementTitle').value.trim(),
        desc: document.getElementById('achievementDesc').value.trim()
    };
    if (!data.title) { alert('请填写标题'); return; }

    if (id) {
        const idx = SiteData.achievements.findIndex(a => a.id === parseInt(id));
        if (idx >= 0) SiteData.achievements[idx] = data;
    } else {
        SiteData.achievements.push(data);
    }
    SiteData.save('achievements', SiteData.achievements);
    resetAchievementForm();
    renderAchievementAdmin();
    alert('保存成功！');
}

function editAchievement(id) {
    const item = SiteData.achievements.find(a => a.id === id);
    if (!item) return;
    document.getElementById('achievementEditId').value = item.id;
    document.getElementById('achievementYear').value = item.year;
    document.getElementById('achievementTitle').value = item.title;
    document.getElementById('achievementDesc').value = item.desc;
}

function deleteAchievement(id) {
    if (!confirm('确定删除此成果？')) return;
    SiteData.achievements = SiteData.achievements.filter(a => a.id !== id);
    SiteData.save('achievements', SiteData.achievements);
    renderAchievementAdmin();
}

function resetAchievementForm() {
    document.getElementById('achievementEditId').value = '';
    document.getElementById('achievementYear').value = '';
    document.getElementById('achievementTitle').value = '';
    document.getElementById('achievementDesc').value = '';
}

// ========== 实验室荣誉管理 ==========
function renderHonorAdmin() {
    const list = document.getElementById('honorAdminList');
    if (!list) return;
    list.innerHTML = SiteData.honors.map(h => `
        <div class="admin-item">
            <div class="admin-item-info">
                <h4>${h.badge} ${h.title}</h4>
                <p>${h.desc}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editHonor(${h.id})">编辑</button>
                <button class="btn-delete" onclick="deleteHonor(${h.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function saveHonor() {
    const id = document.getElementById('honorEditId').value;
    const data = {
        id: id ? parseInt(id) : Date.now(),
        badge: document.getElementById('honorBadge').value.trim(),
        title: document.getElementById('honorTitle').value.trim(),
        desc: document.getElementById('honorDesc').value.trim()
    };
    if (!data.title) { alert('请填写荣誉名称'); return; }

    if (id) {
        const idx = SiteData.honors.findIndex(h => h.id === parseInt(id));
        if (idx >= 0) SiteData.honors[idx] = data;
    } else {
        SiteData.honors.push(data);
    }
    SiteData.save('honors', SiteData.honors);
    resetHonorForm();
    renderHonorAdmin();
    alert('保存成功！');
}

function editHonor(id) {
    const item = SiteData.honors.find(h => h.id === id);
    if (!item) return;
    document.getElementById('honorEditId').value = item.id;
    document.getElementById('honorBadge').value = item.badge;
    document.getElementById('honorTitle').value = item.title;
    document.getElementById('honorDesc').value = item.desc;
}

function deleteHonor(id) {
    if (!confirm('确定删除此荣誉？')) return;
    SiteData.honors = SiteData.honors.filter(h => h.id !== id);
    SiteData.save('honors', SiteData.honors);
    renderHonorAdmin();
}

function resetHonorForm() {
    document.getElementById('honorEditId').value = '';
    document.getElementById('honorBadge').value = '';
    document.getElementById('honorTitle').value = '';
    document.getElementById('honorDesc').value = '';
}

// ========== 团队成员管理 ==========
function renderTeamAdmin() {
    const list = document.getElementById('teamAdminList');
    if (!list) return;
    list.innerHTML = SiteData.team.map(t => `
        <div class="admin-item">
            <div class="admin-item-info">
                <h4>${t.avatar} ${t.name} - ${t.role}</h4>
                <p>${t.desc}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editTeam(${t.id})">编辑</button>
                <button class="btn-delete" onclick="deleteTeam(${t.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function saveTeam() {
    const id = document.getElementById('teamEditId').value;
    const data = {
        id: id ? parseInt(id) : Date.now(),
        avatar: document.getElementById('teamAvatar').value.trim(),
        name: document.getElementById('teamName').value.trim(),
        role: document.getElementById('teamRole').value.trim(),
        desc: document.getElementById('teamDesc').value.trim()
    };
    if (!data.name) { alert('请填写姓名'); return; }

    if (id) {
        const idx = SiteData.team.findIndex(t => t.id === parseInt(id));
        if (idx >= 0) SiteData.team[idx] = data;
    } else {
        SiteData.team.push(data);
    }
    SiteData.save('team', SiteData.team);
    resetTeamForm();
    renderTeamAdmin();
    alert('保存成功！');
}

function editTeam(id) {
    const item = SiteData.team.find(t => t.id === id);
    if (!item) return;
    document.getElementById('teamEditId').value = item.id;
    document.getElementById('teamAvatar').value = item.avatar;
    document.getElementById('teamName').value = item.name;
    document.getElementById('teamRole').value = item.role;
    document.getElementById('teamDesc').value = item.desc;
}

function deleteTeam(id) {
    if (!confirm('确定删除此成员？')) return;
    SiteData.team = SiteData.team.filter(t => t.id !== id);
    SiteData.save('team', SiteData.team);
    renderTeamAdmin();
}

function resetTeamForm() {
    document.getElementById('teamEditId').value = '';
    document.getElementById('teamAvatar').value = '';
    document.getElementById('teamName').value = '';
    document.getElementById('teamRole').value = '';
    document.getElementById('teamDesc').value = '';
}

// ========== 新闻管理 ==========
function renderNewsAdmin() {
    const list = document.getElementById('newsAdminList');
    if (!list) return;
    list.innerHTML = SiteData.news.map(n => `
        <div class="admin-item">
            <div class="admin-item-info">
                <h4>${n.date} - ${n.title}</h4>
                <p>${n.content}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="editNews(${n.id})">编辑</button>
                <button class="btn-delete" onclick="deleteNews(${n.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function saveNews() {
    const id = document.getElementById('newsEditId').value;
    const data = {
        id: id ? parseInt(id) : Date.now(),
        date: document.getElementById('newsDate').value,
        title: document.getElementById('newsTitle').value.trim(),
        content: document.getElementById('newsContent').value.trim()
    };
    if (!data.date || !data.title) { alert('请填写日期和标题'); return; }

    if (id) {
        const idx = SiteData.news.findIndex(n => n.id === parseInt(id));
        if (idx >= 0) SiteData.news[idx] = data;
    } else {
        SiteData.news.unshift(data);
    }
    SiteData.save('news', SiteData.news);
    resetNewsForm();
    renderNewsAdmin();
    alert('保存成功！');
}

function editNews(id) {
    const item = SiteData.news.find(n => n.id === id);
    if (!item) return;
    document.getElementById('newsEditId').value = item.id;
    document.getElementById('newsDate').value = item.date;
    document.getElementById('newsTitle').value = item.title;
    document.getElementById('newsContent').value = item.content;
}

function deleteNews(id) {
    if (!confirm('确定删除此新闻？')) return;
    SiteData.news = SiteData.news.filter(n => n.id !== id);
    SiteData.save('news', SiteData.news);
    renderNewsAdmin();
}

function resetNewsForm() {
    document.getElementById('newsEditId').value = '';
    document.getElementById('newsDate').value = '';
    document.getElementById('newsTitle').value = '';
    document.getElementById('newsContent').value = '';
}

// ========== 答疑管理 ==========
function renderQAAdmin() {
    const list = document.getElementById('qaAdminList');
    if (!list) return;
    if (SiteData.qa.length === 0) {
        list.innerHTML = '<p style="text-align:center;color:var(--gray-600);padding:20px;">暂无问答</p>';
        return;
    }
    list.innerHTML = SiteData.qa.map(q => `
        <div class="admin-item">
            <div class="admin-item-info">
                <h4>❓ ${q.question}</h4>
                <p>${q.answer ? '💡 已回复: ' + q.answer : '⏳ 待回复'}</p>
                <p style="font-size:12px;color:var(--gray-600);">${q.user} · ${q.time}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn-edit" onclick="replyQA(${q.id})">回复</button>
                <button class="btn-delete" onclick="deleteQA(${q.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function replyQA(id) {
    const item = SiteData.qa.find(q => q.id === id);
    if (!item) return;
    document.getElementById('qaReplyId').value = id;
    document.getElementById('qaReplyQuestion').textContent = '问题：' + item.question;
    document.getElementById('qaReplyAnswer').value = item.answer || '';
    document.getElementById('qaReplyModal').style.display = 'block';
}

function saveQAReply() {
    const id = parseInt(document.getElementById('qaReplyId').value);
    const answer = document.getElementById('qaReplyAnswer').value.trim();
    if (!answer) { alert('请输入回复内容'); return; }

    const idx = SiteData.qa.findIndex(q => q.id === id);
    if (idx >= 0) {
        SiteData.qa[idx].answer = answer;
        SiteData.save('qa', SiteData.qa);
        document.getElementById('qaReplyModal').style.display = 'none';
        renderQAAdmin();
        alert('回复成功！');
    }
}

function deleteQA(id) {
    if (!confirm('确定删除此问题？')) return;
    SiteData.qa = SiteData.qa.filter(q => q.id !== id);
    SiteData.save('qa', SiteData.qa);
    renderQAAdmin();
}

// ========== 匿名建议查看 ==========
function renderSuggestionAdmin() {
    const list = document.getElementById('suggestionAdminList');
    if (!list) return;
    if (SiteData.suggestions.length === 0) {
        list.innerHTML = '<p style="text-align:center;color:var(--gray-600);padding:20px;">暂无匿名建议</p>';
        return;
    }
    list.innerHTML = SiteData.suggestions.map(s => `
        <div class="admin-item">
            <div class="admin-item-info">
                <h4>[${s.category}] 匿名建议</h4>
                <p>${s.content}</p>
                <p style="font-size:12px;color:var(--gray-600);">${s.time}</p>
            </div>
            <div class="admin-item-actions">
                <button class="btn-delete" onclick="deleteSuggestion(${s.id})">删除</button>
            </div>
        </div>
    `).join('');
}

function deleteSuggestion(id) {
    if (!confirm('确定删除此建议？')) return;
    SiteData.suggestions = SiteData.suggestions.filter(s => s.id !== id);
    SiteData.save('suggestions', SiteData.suggestions);
    renderSuggestionAdmin();
}
