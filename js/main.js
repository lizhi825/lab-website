// ============================================
// 海洋智能装备研究所 - 主脚本
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    checkLoginStatus();
    renderDynamicContent();
});

// ========== 导航 ==========
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    const quickLinks = document.querySelectorAll('[data-page]');

    function navigateTo(pageName) {
        navLinks.forEach(l => l.classList.remove('active'));
        const targetNav = document.querySelector(`.nav-link[data-page="${pageName}"]`);
        if (targetNav) targetNav.classList.add('active');

        document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
        const targetSection = document.getElementById(pageName);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        if (pageName === 'qa') checkQAAccess();
        if (pageName === 'anonymous') checkAnonymousAccess();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });

    quickLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.classList.contains('nav-link')) return;
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });
}

// ========== 登录状态 ==========
function checkLoginStatus() {
    const user = getCurrentUser();
    if (user) {
        const topLinks = document.querySelector('.top-links');
        if (topLinks) {
            topLinks.innerHTML = `
                <span>👤 ${user.username}（${user.role === 'admin' ? '管理员' : '用户'}）</span>
                <span class="sep">|</span>
                <a href="#" onclick="logout()">退出登录</a>
            `;
        }
    }
}

function logout() {
    setCurrentUser(null);
    showToast('已退出登录');
    setTimeout(() => location.reload(), 500);
}

function checkQAAccess() {
    const authWall = document.getElementById('qaAuthWall');
    const content = document.getElementById('qaContent');
    if (!authWall || !content) return;
    if (isLoggedIn()) {
        authWall.style.display = 'none';
        content.style.display = 'block';
        renderQA();
    } else {
        authWall.style.display = 'block';
        content.style.display = 'none';
    }
}

function checkAnonymousAccess() {
    const authWall = document.getElementById('anonymousAuthWall');
    const content = document.getElementById('anonymousContent');
    if (!authWall || !content) return;
    if (isLoggedIn()) {
        authWall.style.display = 'none';
        content.style.display = 'block';
    } else {
        authWall.style.display = 'block';
        content.style.display = 'none';
    }
}

// ========== 动态渲染 ==========
function renderDynamicContent() {
    renderNotices();
    renderGallery();
    renderAbout();
    renderLabEnvironment();
    renderResearch();
    renderAchievements();
    renderStudentProjects();
    renderHonors();
    renderCertificates();
    renderTeam();
    renderTeamPhotos();
    renderLabCulture();
    renderNews();
}

// ========== 通知公告 ==========
function renderNotices() {
    const list = document.getElementById('noticeList');
    if (!list) return;
    list.innerHTML = SiteData.notices.slice(0, 6).map(n => `
        <li><a href="#"><span class="notice-date">${n.date}</span> ${n.title}</a></li>
    `).join('');
}

// ========== 实验室风采 ==========
function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = SiteData.gallery.map(g => `
        <div class="gallery-item">
            ${g.url
                ? `<img src="${g.url}" alt="${g.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">`
                : `<div class="gallery-placeholder">${g.title}</div>`
            }
        </div>
    `).join('');
}

// ========== 实验室环境 ==========
function renderLabEnvironment() {
    const env = document.getElementById('envGallery');
    if (!env) return;
    env.innerHTML = SiteData.labEnvironment.map((url, i) => `
        <div class="env-item">
            <img src="${url}" alt="实验室环境 ${i+1}" loading="lazy" onclick="openLightbox('${url}')">
        </div>
    `).join('');
}

// ========== 实验室介绍 ==========
function renderAbout() {
    const content = document.getElementById('aboutContent');
    if (!content) return;
    const d = SiteData.about;
    content.innerHTML = `
        <div class="about-intro">
            <h3>研究所概况</h3>
            <p>${d.intro}</p>
            <p>${d.intro2}</p>
        </div>
        <div class="about-features">
            ${d.stats.map(s => `
                <div class="feature-item">
                    <span class="feature-num">${s.num}</span>
                    <span class="feature-label">${s.label}</span>
                </div>
            `).join('')}
        </div>
        <div class="about-mission">
            <h3>使命愿景</h3>
            <p>${d.mission}</p>
        </div>
    `;
}

// ========== 研究方向 ==========
function renderResearch() {
    const grid = document.getElementById('researchGrid');
    if (!grid) return;
    grid.innerHTML = SiteData.research.map(r => `
        <div class="research-card">
            <div class="research-icon">${r.icon}</div>
            <h3>${r.title}</h3>
            <p>${r.desc}</p>
            ${r.topics ? `
                <div class="research-topics">
                    ${r.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// ========== 科研成果 ==========
function renderAchievements() {
    const list = document.getElementById('achievementsList');
    if (!list) return;
    list.innerHTML = SiteData.achievements.map(a => `
        <div class="achievement-item">
            <span class="ach-year">${a.year}</span>
            <div class="ach-content">
                <h4>${a.title}</h4>
                <p>${a.desc}</p>
            </div>
        </div>
    `).join('');
}

// ========== 学生项目 ==========
function renderStudentProjects() {
    const container = document.getElementById('studentProjects');
    if (!container) return;
    container.innerHTML = SiteData.studentProjects.map(sp => `
        <div class="sp-group">
            <h4 class="sp-level">${sp.level}</h4>
            <ul class="sp-list">
                ${sp.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// ========== 实验室荣誉 ==========
function renderHonors() {
    const grid = document.getElementById('honorsGrid');
    if (!grid) return;
    grid.innerHTML = SiteData.honors.map(h => `
        <div class="honor-card">
            <div class="honor-badge">${h.badge}</div>
            <h4>${h.title}</h4>
            <p>${h.desc}</p>
        </div>
    `).join('');
}

// ========== 获奖证书 ==========
function renderCertificates() {
    const gallery = document.getElementById('certGallery');
    if (!gallery) return;
    gallery.innerHTML = SiteData.certificates.map((url, i) => `
        <div class="cert-item">
            <img src="${url}" alt="获奖证书 ${i+1}" loading="lazy" onclick="openLightbox('${url}')">
        </div>
    `).join('');
}

// ========== 团队成员 ==========
function renderTeam() {
    const grid = document.getElementById('teamGrid');
    if (!grid) return;
    grid.innerHTML = SiteData.team.map(t => `
        <div class="team-card">
            <div class="team-avatar">
                <img src="${t.photo}" alt="${t.name}" loading="lazy">
            </div>
            <h4>${t.name}</h4>
            <p class="team-role">${t.role}</p>
            <p>${t.desc}</p>
        </div>
    `).join('');
}

// ========== 团队合影 ==========
function renderTeamPhotos() {
    const grid = document.getElementById('teamPhotosGrid');
    if (!grid) return;
    grid.innerHTML = SiteData.teamPhotos.map((url, i) => `
        <div class="team-photo-item">
            <img src="${url}" alt="团队合影 ${i+1}" loading="lazy" onclick="openLightbox('${url}')">
        </div>
    `).join('');
}

// ========== 实验室文化 ==========
function renderLabCulture() {
    const container = document.getElementById('labCulture');
    if (!container) return;

    const culture = SiteData.labCulture;
    if (!culture) return;

    container.innerHTML = `
        <div class="culture-intro">
            <p>${culture.intro}</p>
        </div>
        <div class="culture-cards">
            <div class="culture-card">
                <h3>🎉 ${culture.teamBuilding.title}</h3>
                <p>${culture.teamBuilding.desc}</p>
                <div class="culture-photos">
                    ${culture.teamBuilding.photos.map((url, i) => `
                        <div class="culture-photo-item">
                            <img src="${url}" alt="团建 ${i+1}" loading="lazy" onclick="openLightbox('${url}')">
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="culture-card">
                <h3>🎲 ${culture.boardGame.title}</h3>
                <p>${culture.boardGame.desc}</p>
                <div class="culture-photos">
                    ${culture.boardGame.photos.map((url, i) => `
                        <div class="culture-photo-item">
                            <img src="${url}" alt="桌游 ${i+1}" loading="lazy" onclick="openLightbox('${url}')">
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// ========== 新闻动态 ==========
function renderNews() {
    const list = document.getElementById('newsList');
    if (!list) return;
    list.innerHTML = SiteData.news.map(n => {
        const parts = n.date.split('-');
        return `
            <article class="news-item">
                <div class="news-date-box">
                    <span class="news-day">${parts[2]}</span>
                    <span class="news-month">${parts[0]}-${parts[1]}</span>
                </div>
                <div class="news-content">
                    <h4>${n.title}</h4>
                    <p>${n.content}</p>
                </div>
            </article>
        `;
    }).join('');
}

// ========== 答疑区 ==========
function renderQA() {
    const list = document.getElementById('qaList');
    if (!list) return;

    // 常见问题列表
    const faqHtml = SiteData.qa.length > 0 ? SiteData.qa.map(q => `
        <div class="qa-item">
            <div class="qa-q">❓ ${q.question}</div>
            ${q.answer ? `<div class="qa-a">💡 ${q.answer}</div>` : ''}
        </div>
    `).join('') : '';

    list.innerHTML = `
        <div class="qa-email-box">
            <div class="qa-email-icon">📧</div>
            <h3>有问题？发送邮件给我们</h3>
            <p>请将您的问题发送至邮箱，我们会尽快回复</p>
            <a href="mailto:${SiteData.qaEmail}" class="qa-email-link">${SiteData.qaEmail}</a>
            <p class="qa-email-hint">点击邮箱地址即可发送邮件</p>
        </div>
        ${faqHtml ? `<div class="qa-faq"><h3>📋 常见问题</h3>${faqHtml}</div>` : ''}
    `;
}

function submitQuestion() {
    // 不再使用在线提交，改为引导用户发送邮件
    window.location.href = `mailto:${SiteData.qaEmail}`;
}

// ========== 匿名建议 ==========
function submitSuggestion() {
    if (!isLoggedIn()) { showToast('请先登录', 'error'); return; }
    const category = document.getElementById('suggestionCategory').value;
    const content = document.getElementById('suggestionContent').value.trim();
    if (!category) { showToast('请选择建议类别', 'error'); return; }
    if (!content) { showToast('请输入建议内容', 'error'); return; }

    SiteData.suggestions.push({
        id: Date.now(),
        category,
        content,
        time: new Date().toISOString().split('T')[0]
    });
    SiteData.save('suggestions', SiteData.suggestions);
    document.getElementById('suggestionCategory').value = '';
    document.getElementById('suggestionContent').value = '';
    showToast('感谢您的匿名建议！');
}

// ========== Lightbox ==========
function openLightbox(url) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `
        <span class="lightbox-close" onclick="this.parentElement.remove()">&times;</span>
        <img src="${url}" alt="预览">
    `;
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.remove(); });
    document.body.appendChild(lb);
}

// ========== Toast ==========
function showToast(msg, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
