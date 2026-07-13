// ============================================
// 海洋智能装备研究所 - 数据管理（真实数据版）
// ============================================

const SiteData = {
    // 通知公告
    notices: JSON.parse(localStorage.getItem('site_notices') || JSON.stringify([
        { id: 1, date: '2026-07-10', title: '海智所2026年暑期科研训练营招募通知', content: '面向全院本科生招募暑期科研训练营成员，参与IPMC人工肌肉、仿生鱼等课题研究，报名截止7月20日。' },
        { id: 2, date: '2026-06-28', title: '研究所2026年春季学期学术成果汇报会顺利举行', content: '三个研究组分别汇报了本学期科研进展，多孔IPMC人工肌肉材料制备取得阶段性突破。' },
        { id: 3, date: '2026-06-15', title: '关于申报2026年度大学生创新创业项目的通知', content: '2026年度大创项目申报已启动，研究所可指导方向包括IPMC人工肌肉、仿生鱼、酸洗抑雾剂等。' },
        { id: 4, date: '2026-05-20', title: '海智所团队参加2026年山东省大学生机电产品创新设计竞赛', content: '研究所选送3个项目参赛，获得一等奖1项、二等奖2项的优异成绩。' },
        { id: 5, date: '2026-04-08', title: '关于研究所实验室开放日的通知', content: '每周五下午14:00-17:00为一号实验楼401开放时间，欢迎全院师生参观交流。' },
    ])),

    // 实验室风采图片（从真实图片中选4张）
    gallery: JSON.parse(localStorage.getItem('site_gallery') || JSON.stringify([
        { id: 1, title: '实验室全景', url: 'assets/gallery/lab-environment/2e2bcc4fb2d868aea075c94a3ea482d3.jpg' },
        { id: 2, title: '科研实验', url: 'assets/gallery/lab-environment/620f04f4e64dabbf3754cfeb04c110f5.jpg' },
        { id: 3, title: '团队研讨', url: 'assets/gallery/lab-environment/6aa4dad0643b3741b898ef9a42a0fe1f.jpg' },
        { id: 4, title: '设备操作', url: 'assets/gallery/lab-environment/8d89e2a21420d9768b25d23c64cbd31e.jpg' },
    ])),

    // 实验室环境照片（14张全部展示）
    labEnvironment: [
        'assets/gallery/lab-environment/1a6f746c373cbdbd4ec07d8bdb1badfb.jpg',
        'assets/gallery/lab-environment/2e2bcc4fb2d868aea075c94a3ea482d3.jpg',
        'assets/gallery/lab-environment/338aabb77425ca45558443a4c7be119a.jpg',
        'assets/gallery/lab-environment/34a8c498b45b0569f88d6e5a2093defa.jpg',
        'assets/gallery/lab-environment/40fb8e5f2d34a6835841c2c03ebdda24.jpg',
        'assets/gallery/lab-environment/620f04f4e64dabbf3754cfeb04c110f5.jpg',
        'assets/gallery/lab-environment/6aa4dad0643b3741b898ef9a42a0fe1f.jpg',
        'assets/gallery/lab-environment/8d89e2a21420d9768b25d23c64cbd31e.jpg',
        'assets/gallery/lab-environment/91c45b6cb29323ea181014e2d70b4fd3.jpg',
        'assets/gallery/lab-environment/ac0dae6a6249e7a636cca5ede3cf47e8.jpg',
        'assets/gallery/lab-environment/c8aaeb6439b800e3d1b97dae929d6d7c.jpg',
        'assets/gallery/lab-environment/cc5d98046fc2cefdf16d7e8b8a893e40.jpg',
        'assets/gallery/lab-environment/ef2a7ce2e4f35e3404d563ac4585babd.jpg',
        'assets/gallery/lab-environment/effa20d65cddb44ff867fa6228b9ccda.jpg',
    ],

    // 实验室介绍（真实文本）
    about: JSON.parse(localStorage.getItem('site_about') || JSON.stringify({
        intro: '哈尔滨理工大学海洋智能装备研究所（简称"海智所"）成立于2020年，是哈尔滨理工大学荣成学院首批成立的院级研究所之一，位于荣成学院一号实验楼401。研究所依托哈尔滨理工大学的学科优势，面向国家海洋强国战略，致力于海洋智能装备领域的前沿科学研究与关键技术攻关。',
        intro2: '研究所现有副教授1人、硕士生导师1人、指导教师5人，在读学生15余人。下设海洋装备材料制备研究组、机电一体化研究组、金属精密成形研究组三个研究组，以创新性研发、解决实际问题、与企业进行项目合作作为研究特色，以培养学生专业技能和科研素养为目的，围绕海洋装备材料开展一系列纵向课题的研发。',
        mission: '秉承哈尔滨理工大学"知行统一，博厚悠远"的校训，面向世界科技前沿和国家重大需求，致力于成为国内一流的海洋智能装备研究基地，培养具有创新精神和实践能力的高素质人才，为我国海洋事业发展提供科技支撑。',
        stats: [
            { num: '2020', label: '成立年份' },
            { num: '6', label: '指导教师' },
            { num: '3', label: '研究组' },
            { num: '22+', label: '科研基金项目' },
        ]
    })),

    // 研究方向（三个研究组，真实信息）
    research: JSON.parse(localStorage.getItem('site_research') || JSON.stringify([
        {
            id: 1, icon: '🧪', title: '海洋装备材料制备研究组',
            desc: '聚焦海洋环境下特种功能材料的制备与应用研究。主要方向包括：多孔IPMC人工肌肉材料的制备、小型水温检测仿生鱼的研发、新型碳酸酸洗抑雾剂方法的研究、多壁碳纳米管-银复合电极人工肌肉的制备及性能研究。',
            topics: ['多孔IPMC人工肌肉材料制备', '小型水温检测仿生鱼研发', '新型碳酸酸洗抑雾剂方法研究', '多壁碳纳米管-银复合电极人工肌肉制备']
        },
        {
            id: 2, icon: '⚙️', title: '机电一体化研究组',
            desc: '面向海洋装备的机电系统设计与制造技术研究。主要方向包括：通用海洋装备设计与制造、普通机床数控化改造、海产品养殖与深加工设备、水下作业装备研制。',
            topics: ['通用海洋装备设计与制造', '普通机床数控化改造', '海产品养殖与深加工设备', '水下作业装备研制']
        },
        {
            id: 3, icon: '🔩', title: '金属精密成形研究组',
            desc: '围绕海洋装备关键零部件的精密成形制造技术开展研究。主要方向包括：海洋装备大锻件工艺优化、金属材料精密锻造成型工艺优化、数值模拟技术在成形过程中的应用。',
            topics: ['海洋装备大锻件工艺优化', '金属材料精密锻造成型工艺优化', '数值模拟技术']
        },
    ])),

    // 科研成果
    achievements: JSON.parse(localStorage.getItem('site_achievements') || JSON.stringify([
        { id: 1, year: '2024-2026', title: '国家自然科学基金项目', desc: '主持或参与国家自然科学基金2项，围绕IPMC智能材料与海洋装备关键技术开展基础研究。' },
        { id: 2, year: '2020-2025', title: '省级科研基金项目', desc: '主持或参与省级基金5项，在海洋装备材料、机电一体化等领域取得系列成果。' },
        { id: 3, year: '2018-2025', title: '高水平学术论文', desc: '发表SCI/EI检索高水平论文10余篇，涵盖人工肌肉材料、仿生机器人、精密成形等研究方向。' },
        { id: 4, year: '累计', title: '知识产权成果', desc: '获得授权专利10项，其中发明专利6项，形成具有自主知识产权的技术体系。' },
    ])),

    // 学生项目
    studentProjects: JSON.parse(localStorage.getItem('site_studentProjects') || JSON.stringify([
        { level: '国家级', items: [
            '多孔IPMC人工肌肉材料的制备及小型水温检测仿生鱼的研发',
            '基于Box-Behnken模型银基IPMC人工肌肉材料的制备及性能和仿生研究',
            '导电聚合物在电致动聚合物中的应用及其性能研究',
            '拖挂式房车大扭矩电动移位器',
            '银基悬臂梁离子聚合物传感器制备研究',
            '水凝胶架构金属电极离子聚合物驱动器制备及性能研究'
        ]},
        { level: '省级', items: [
            '不锈钢建筑钢材清洗剂的配方研究',
            '复凝聚法制备山茶籽油微胶囊及其理化性质研究',
            '碳基电极离子聚合物驱动器制备及工艺研究'
        ]},
        { level: '校级', items: [
            '姜油O/W型微乳液制备及稳定性研究',
            '新型碳酸酸洗抑雾剂方法的研究',
            '超声波提取苦杏仁苷工艺研究'
        ]},
        { level: '创业项目', items: ['人工肌肉心脏起搏器'] },
    ])),

    // 实验室荣誉
    honors: JSON.parse(localStorage.getItem('site_honors') || JSON.stringify([
        { id: 1, badge: '🏆', title: '国家自然科学基金', desc: '主持或参与2项' },
        { id: 2, badge: '🥇', title: '省级科研基金', desc: '主持或参与5项' },
        { id: 3, badge: '🎖️', title: '省级以上奖项', desc: '获得6项' },
        { id: 4, badge: '📜', title: '授权专利', desc: '累计10项（发明6项）' },
        { id: 5, badge: '📄', title: '高水平论文', desc: 'SCI/EI检索10余篇' },
        { id: 6, badge: '⭐', title: '首批院级研究所', desc: '2020年成立' },
    ])),

    // 获奖证书图片
    certificates: [
        'assets/gallery/certificates/1a13eaab44907694cae07df7b133c819.jpg',
        'assets/gallery/certificates/a2347f54f71266835d38165c989ed2ef.jpg',
    ],

    // 团队成员（使用真实照片）
    team: JSON.parse(localStorage.getItem('site_team') || JSON.stringify([
        { id: 1, photo: 'assets/gallery/team-members/21a28e9abbf5c6d51fbd55d77bf1ee74.png', name: '团队成员', role: '研究所成员', desc: '海洋智能装备研究所' },
        { id: 2, photo: 'assets/gallery/team-members/2971bafe8a2180c115bf6c9d6def55cd.png', name: '团队成员', role: '研究所成员', desc: '海洋智能装备研究所' },
        { id: 3, photo: 'assets/gallery/team-members/a4cb3ad2ae5333c86dfad20b62527905.jpg', name: '团队成员', role: '研究所成员', desc: '海洋智能装备研究所' },
        { id: 4, photo: 'assets/gallery/team-members/d863a3fbb706e8d05e979672a2976441.png', name: '团队成员', role: '研究所成员', desc: '海洋智能装备研究所' },
        { id: 5, photo: 'assets/gallery/team-members/fd16ddea9d232c21e9499dc680ba9a46.png', name: '团队成员', role: '研究所成员', desc: '海洋智能装备研究所' },
    ])),

    // 团队合影
    teamPhotos: [
        'assets/gallery/team-members/21a28e9abbf5c6d51fbd55d77bf1ee74.png',
        'assets/gallery/team-members/d863a3fbb706e8d05e979672a2976441.png',
        'assets/gallery/team-members/fd16ddea9d232c21e9499dc680ba9a46.png',
    ],

    // 毕业合影
    graduationPhotos: [
        'assets/gallery/graduation-photos/13fa7d554604baa2e008281b314a81b9.jpg',
        'assets/gallery/graduation-photos/37d6add21fe400762ed9e902394c4013.jpg',
        'assets/gallery/graduation-photos/49af5ba4ede7b4905dc2cfb12c7ccb27.jpg',
        'assets/gallery/graduation-photos/63ab6ae5c1fccb1b65801db7a9afeac9.jpg',
    ],

    // 新闻动态
    news: JSON.parse(localStorage.getItem('site_news') || JSON.stringify([
        { id: 1, date: '2026-07-10', title: '海智所2026年暑期科研训练营正式启动', content: '面向全院本科生的暑期科研训练营正式启动招募，涵盖IPMC人工肌肉、仿生鱼、酸洗抑雾剂等多个课题方向，为学生提供近距离接触科研的机会。' },
        { id: 2, date: '2026-06-28', title: '研究所春季学期学术成果汇报会圆满举行', content: '三个研究组分别汇报了本学期科研进展，多孔IPMC人工肌肉材料制备取得阶段性突破，新型碳酸酸洗抑雾剂研究进入应用测试阶段。' },
        { id: 3, date: '2026-05-20', title: '海智所团队在山东省大学生机电产品创新设计竞赛中获佳绩', content: '研究所选送的3个项目全部获奖，其中"小型水温检测仿生鱼"项目获得一等奖，充分展示了研究所学生的创新能力。' },
        { id: 4, date: '2026-04-15', title: '研究所与荣成康派斯公司开展产学研合作交流', content: '双方就拖挂式房车大扭矩电动移位器项目达成合作意向，进一步推动科技成果转化。' },
    ])),

    // 答疑区
    qa: JSON.parse(localStorage.getItem('site_qa') || JSON.stringify([
        { id: 1, question: '海智所招收本科生参与科研吗？有什么要求？', answer: '研究所长期面向全院本科生开放，欢迎对化学材料、机械、电气控制感兴趣的同学加入。要求热爱学习、热爱科研，无需基础，研究所会提供系统培训。有意向的同学可到一号实验楼401咨询。', time: '2026-06-25', user: '学生A' },
        { id: 2, question: '加入研究所后主要做什么？', answer: '根据你的兴趣分配到不同研究组，参与导师指导的科研项目。可以学习学术论文撰写、掌握科研软件、培养逻辑思维，还能获得德育分和竞赛证书。优秀学生有机会发表SCI/EI论文。', time: '2026-06-20', user: '学生B' },
        { id: 3, question: '研究所的联系方式是什么？', answer: '地址：荣成学院一号实验楼401。联系人：李智浩，电话：17667031628。也可以直接到实验室咨询，每周五下午为开放日。', time: '2026-06-15', user: '学生C' },
    ])),

    // 匿名建议
    suggestions: JSON.parse(localStorage.getItem('site_suggestions') || JSON.stringify([])),

    // 用户账号
    users: JSON.parse(localStorage.getItem('site_users') || JSON.stringify([
        { username: 'user', password: '123456', role: 'user' },
        { username: 'admin', password: 'admin123', role: 'admin' },
    ])),

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
