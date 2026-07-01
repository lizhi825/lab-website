// ============================================
// 海洋智能装备研究所 - 数据管理
// 所有网站内容通过此文件管理
// ============================================

const SiteData = {
    // 通知公告
    notices: JSON.parse(localStorage.getItem('site_notices') || JSON.stringify([
        { id: 1, date: '2026-06-28', title: '关于举办2026海洋智能装备学术研讨会的通知', content: '兹定于2026年7月15日在威海校区举办2026海洋智能装备学术研讨会，欢迎广大师生参加。' },
        { id: 2, date: '2026-06-20', title: '研究所2026年暑期开放日活动报名通知', content: '研究所将于7月20日举办暑期开放日活动，欢迎校内外师生报名参加。' },
        { id: 3, date: '2026-06-15', title: '关于申报2026年度研究所自主创新课题的通知', content: '2026年度研究所自主创新课题申报工作现已启动，请有意申报的教师于7月10日前提交。' },
        { id: 4, date: '2026-06-08', title: '海洋智能装备研究所2026年硕士研究生招生简章', content: '研究所2026年硕士研究生招生工作正式启动，欢迎报考。' },
        { id: 5, date: '2026-05-30', title: '关于开展实验室安全专项检查的通知', content: '根据学校统一安排，6月5日-6月10日将开展实验室安全专项检查。' },
    ])),

    // 实验室风采图片
    gallery: JSON.parse(localStorage.getItem('site_gallery') || JSON.stringify([
        { id: 1, title: '实验室全景', url: '' },
        { id: 2, title: '科研设备', url: '' },
        { id: 3, title: '团队合影', url: '' },
        { id: 4, title: '学术交流', url: '' },
    ])),

    // 实验室介绍
    about: JSON.parse(localStorage.getItem('site_about') || JSON.stringify({
        intro: '哈尔滨理工大学威海校区海洋智能装备研究所成立于2020年，依托哈尔滨理工大学在机械工程、控制科学、电子信息等领域的学科优势，面向国家海洋强国战略和山东省海洋经济发展需求，致力于海洋智能装备领域的前沿科学研究与关键技术攻关。',
        intro2: '研究所坐落于美丽的海滨城市威海，拥有得天独厚的海洋科研环境。研究所现有固定研究人员30余人，其中教授8人，副教授12人，博士生导师5人，形成了一支结构合理、创新能力突出的科研团队。',
        mission: '面向世界科技前沿、面向经济主战场、面向国家重大需求、面向人民生命健康，致力于成为国内一流、国际知名的海洋智能装备研究基地，为我国海洋事业发展提供科技支撑和人才保障。',
        stats: [
            { num: '5000+', label: '平方米实验场地' },
            { num: '30+', label: '科研人员' },
            { num: '50+', label: '科研项目' },
            { num: '100+', label: '学术论文' },
        ]
    })),

    // 研究方向
    research: JSON.parse(localStorage.getItem('site_research') || JSON.stringify([
        { id: 1, icon: '🤖', title: '水下机器人技术', desc: '自主水下航行器（AUV）、遥控水下机器人（ROV）的智能控制与导航技术研究，包括路径规划、自主避障、协同作业等关键方向。' },
        { id: 2, icon: '📡', title: '海洋传感与探测', desc: '高精度海洋环境感知传感器研发，水下声学探测、光学成像、多源信息融合等核心技术攻关。' },
        { id: 3, icon: '⚙️', title: '海洋装备智能制造', desc: '海洋工程装备数字化设计与制造，智能加工工艺优化，面向海洋环境的特种材料成型技术研究。' },
        { id: 4, icon: '🧠', title: '海洋人工智能', desc: '深度学习在海洋环境感知中的应用，海洋大数据分析，海洋装备健康管理与故障诊断智能系统。' },
        { id: 5, icon: '🌊', title: '海洋可再生能源', desc: '波浪能、潮流能发电装置设计与优化，海洋新能源智能管理系统开发。' },
        { id: 6, icon: '🛰️', title: '海洋通信与组网', desc: '水下无线通信技术，海洋物联网组网协议，空天地海一体化通信网络研究。' },
    ])),

    // 科研成果
    achievements: JSON.parse(localStorage.getItem('site_achievements') || JSON.stringify([
        { id: 1, year: '2026', title: '深海自主水下航行器智能导航系统', desc: '获国家自然科学基金重点项目资助，突破深海复杂环境下自主导航关键技术' },
        { id: 2, year: '2025', title: '海洋装备智能制造关键技术及应用', desc: '获山东省科技进步二等奖，相关技术已在多家企业推广应用' },
        { id: 3, year: '2025', title: '水下多源信息融合感知系统', desc: '发表SCI一区论文3篇，申请发明专利5项' },
    ])),

    // 实验室荣誉
    honors: JSON.parse(localStorage.getItem('site_honors') || JSON.stringify([
        { id: 1, badge: '🏆', title: '山东省重点实验室', desc: '2024年获批' },
        { id: 2, badge: '🥇', title: '国家自然科学基金重点项目', desc: '2026年获批' },
        { id: 3, badge: '🎖️', title: '山东省科技进步二等奖', desc: '2025年' },
        { id: 4, badge: '📜', title: '授权发明专利30+项', desc: '累计' },
        { id: 5, badge: '🏅', title: '海洋工程技术研究中心', desc: '2023年认定' },
        { id: 6, badge: '⭐', title: '校企合作示范基地', desc: '2024年授牌' },
    ])),

    // 团队成员
    team: JSON.parse(localStorage.getItem('site_team') || JSON.stringify([
        { id: 1, avatar: '👨‍🔬', name: '张海明', role: '所长 / 教授', desc: '水下机器人技术方向带头人' },
        { id: 2, avatar: '👩‍🔬', name: '李海洋', role: '副所长 / 教授', desc: '海洋传感与探测方向带头人' },
        { id: 3, avatar: '👨‍💻', name: '王智远', role: '副教授', desc: '海洋人工智能方向' },
        { id: 4, avatar: '👩‍💻', name: '陈海燕', role: '副教授', desc: '海洋通信方向' },
    ])),

    // 新闻动态
    news: JSON.parse(localStorage.getItem('site_news') || JSON.stringify([
        { id: 1, date: '2026-06-28', title: '研究所成功举办2026海洋智能装备学术研讨会', content: '6月28日，海洋智能装备研究所成功举办年度学术研讨会，来自全国各地的专家学者齐聚威海，共话海洋智能装备发展前沿。' },
        { id: 2, date: '2026-06-15', title: '我所团队在深海自主导航领域取得重要突破', content: '研究所水下机器人团队在国际顶级期刊发表最新研究成果，提出一种适用于深海复杂环境的自主导航新方法。' },
        { id: 3, date: '2026-06-08', title: '威海市领导一行来所调研指导', content: '威海市委常委、副市长带队来所调研，对研究所在海洋智能装备领域取得的成果给予高度评价。' },
    ])),

    // 答疑区
    qa: JSON.parse(localStorage.getItem('site_qa') || JSON.stringify([
        { id: 1, question: '研究所招收研究生有什么要求？', answer: '研究所招收机械工程、控制科学与工程、电子信息等专业的研究生，具体要求请查看招生简章或联系研究所办公室。', time: '2026-06-25', user: '学生A' },
        { id: 2, question: '实验室对本科生开放吗？', answer: '研究所定期举办开放日活动，并接收本科生参与科研训练项目，欢迎关注研究所通知。', time: '2026-06-20', user: '学生B' },
    ])),

    // 匿名建议
    suggestions: JSON.parse(localStorage.getItem('site_suggestions') || JSON.stringify([])),

    // 用户账号
    users: JSON.parse(localStorage.getItem('site_users') || JSON.stringify([
        { username: 'user', password: '123456', role: 'user' },
        { username: 'admin', password: 'admin123', role: 'admin' },
    ])),

    // 保存方法
    save(key, data) {
        localStorage.setItem('site_' + key, JSON.stringify(data));
        this[key] = data;
    }
};

// 获取当前登录用户
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        localStorage.removeItem('currentUser');
    }
}

function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

function isLoggedIn() {
    return getCurrentUser() !== null;
}
