// ============================================
// 海洋智能装备研究所 - 主脚本
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSlider();
    checkLoginStatus();
    renderDynamicContent();
});

// ========== 导航 ==========
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    const quickLinks = document.querySelectorAll('[data-page]');
    const moreLinks = document.querySelectorAll('.more-link[data-page]');

    function navigateTo(pageName) {
        // 激活导航
        navLinks.forEach(l => l.classList.remove('active'));
        const targetNav = document.querySelector(`.nav-link[data-page="${pageName}"]`);
        if (targetNav) targetNav.classList.add('active');

        // 切换页面
        document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
        const targetSection = document.getElementById(pageName);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // 检查登录状态
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
            if (link.classList.contains('nav-link') || link.classList.contains('more-link')) return;
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });

    moreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });
}

// ========== 轮播图 ==========
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prev = document.querySelector('.slider-arrow.prev');
    const next = document.querySelector('.slider-arrow.next');
    let current = 0;
    let interval;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }

    dots.forEach(dot => {
        dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index)));
    });

    if (prev) prev.addEventListener('click', prevSlide);
    if (next) next.addEventListener('click', nextSlide);

    function startAuto() { interval = setInterval(nextSlide, 5000); }
    function stopAuto() { clearInterval(interval); }

    startAuto();
    document.querySelector('.banner-slider')?.addEventListener('mouseenter', stopAuto);
    document.querySelector('.banner-slider')?.addEventListener('mouseleave', startAuto);
}

// ========== 登录状态检查 ==========
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

// ========== 动态内容渲染 ==========
function renderDynamicContent() {
    renderNotices();
    renderGallery();
    renderAbout();
    renderResearch();
    renderAchievements();
    renderHonors();
    renderTeam();
    renderNews();
}

function renderNotices() {
    const list = document.getElementById('noticeList');
    if (!list) return;
    list.innerHTML = SiteData.notices.slice(0, 6).map(n => `
        <li><a href="#"><span class="notice-date">${n.date}</span> ${n.title}</a></li>
    `).join('');
}

function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = SiteData.gallery.map(g => `
        <div class="gallery-item">
            ${g.url
                ? `<img src="${g.url}" alt="${g.title}" style="width:100%;height:100%;object-fit:cover;">`
                : `<div class="gallery-placeholder">${g.title}</div>`
            }
        </div>
    `).join('');
}

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

function renderResearch() {
    const grid = document.getElementById('researchGrid');
    if (!grid) return;
    grid.innerHTML = SiteData.research.map(r => `
        <div class="research-card">
            <div class="research-icon">${r.icon}</div>
            <h3>${r.title}</h3>
            <p>${r.desc}</p>
        </div>
    `).join('');
}

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

function renderTeam() {
    const grid = document.getElementById('teamGrid');
    if (!grid) return;
    grid.innerHTML = SiteData.team.map(t => `
        <div class="team-card">
            <div class="team-avatar">${t.avatar}</div>
            <h4>${t.name}</h4>
            <p class="team-role">${t.role}</p>
            <p>${t.desc}</p>
        </div>
    `).join('');
}

function renderNews() {
    const list = document.getElementById('newsList');
    if (!list) return;
    list.innerHTML = SiteData.news.map(n => {
        const [y, m] = n.date.split('-');
        return `
            <article class="news-item">
                <div class="news-date-box">
                    <span class="news-day">${n.date.split('-')[2]}</span>
                    <span class="news-month">${y}-${m}</span>
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
    if (SiteData.qa.length === 0) {
        list.innerHTML = '<p style="text-align:center;color:var(--gray-600);padding:20px;">暂无问答，快来提问吧！</p>';
        return;
    }
    list.innerHTML = SiteData.qa.map(q => `
        <div class="qa-item">
            <div class="qa-q">❓ ${q.question}</div>
            ${q.answer ? `<div class="qa-a">💡 ${q.answer}</div>` : '<div class="qa-a" style="color:#999;">等待回复中...</div>'}
            <div class="qa-meta">${q.user} · ${q.time}</div>
        </div>
    `).join('');
}

function submitQuestion() {
    if (!isLoggedIn()) { showToast('请先登录', 'error'); return; }
    const textarea = document.getElementById('qaQuestion');
    const content = textarea.value.trim();
    if (!content) { showToast('请输入问题内容', 'error'); return; }

    const user = getCurrentUser();
    SiteData.qa.unshift({
        id: Date.now(),
        question: content,
        answer: '',
        time: new Date().toISOString().split('T')[0],
        user: user.username
    });
    SiteData.save('qa', SiteData.qa);
    textarea.value = '';
    renderQA();
    showToast('问题已提交，等待回复');
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
