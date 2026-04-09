const AppState = {
    currentLang: 'en',
    currentTheme: 'dark',
    currentSection: 'home',
    isMenuOpen: false,
    isLoaded: false
};

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadPreferences();
    initLanguage();
    initTheme();
    initNavigation();
    initScrollEffects();
    initFormHandlers();
    checkAuth();
    initDashboard();
    initExperienceDashboard();
    initDashboardTabs();
    initProjectCarousel();
    initMobileMenu();
    updateLanguageUI();
    updateThemeUI();
    AppState.isLoaded = true;
}

function loadPreferences() {
    const savedLang = localStorage.getItem('portfolio-lang');
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedLang) AppState.currentLang = savedLang;
    if (savedTheme) AppState.currentTheme = savedTheme;
}

function initLanguage() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    setLanguage(AppState.currentLang);
}

function toggleLanguage() {
    const newLang = AppState.currentLang === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    localStorage.setItem('portfolio-lang', newLang);
}

function setLanguage(lang) {
    AppState.currentLang = lang;
    const html = document.documentElement;
    const body = document.body;
    
    if (lang === 'ar') {
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        body.setAttribute('data-lang', 'ar');
        body.setAttribute('data-dir', 'rtl');
    } else {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        body.setAttribute('data-lang', 'en');
        body.setAttribute('data-dir', 'ltr');
    }
    updateLanguageUI();
}

function updateLanguageUI() {
    const textElements = document.querySelectorAll('[data-text-en], [data-text-ar]');
    textElements.forEach(element => {
        const enText = element.getAttribute('data-text-en');
        const arText = element.getAttribute('data-text-ar');
        if (AppState.currentLang === 'ar' && arText) {
            element.textContent = arText;
        } else if (AppState.currentLang === 'en' && enText) {
            element.textContent = enText;
        }
    });
    
    const placeholderElements = document.querySelectorAll('[data-placeholder-en], [data-placeholder-ar]');
    placeholderElements.forEach(element => {
        const enPlaceholder = element.getAttribute('data-placeholder-en');
        const arPlaceholder = element.getAttribute('data-placeholder-ar');
        if (AppState.currentLang === 'ar' && arPlaceholder) {
            element.setAttribute('placeholder', arPlaceholder);
        } else if (AppState.currentLang === 'en' && enPlaceholder) {
            element.setAttribute('placeholder', enPlaceholder);
        }
    });
    
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        const langText = langToggle.querySelector('.lang-text');
        if (langText) {
            langText.textContent = AppState.currentLang === 'en' ? 'AR' : 'EN';
        }
    }
}

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    setTheme(AppState.currentTheme);
}

function toggleTheme() {
    const newTheme = AppState.currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
}

function setTheme(theme) {
    AppState.currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    updateThemeUI();
}

function updateThemeUI() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = AppState.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                updateActiveNavLink(link);
                if (AppState.isMenuOpen) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', updateHeaderOnScroll);
}

function handleScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            AppState.currentSection = sectionId;
            updateActiveNavLink(null, sectionId);
        }
    });
}

function updateActiveNavLink(clickedLink, sectionId = null) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (clickedLink && link === clickedLink) {
            link.classList.add('active');
        } else if (sectionId) {
            const linkSection = link.getAttribute('data-section');
            if (linkSection === sectionId) {
                link.classList.add('active');
            }
        }
    });
}

function updateHeaderOnScroll() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => observer.observe(element));
    
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));
}

// Initialize form event handlers
function initFormHandlers() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault(); // Prevent page reload

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Create email body
    const body =
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n\n` +
        `Message:\n${data.message}`;

    // Gmail compose URL
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=nahidhasanph79@gmail.com&subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;

    // Open Gmail compose in a new tab
    window.open(url, "_blank");

    // Optional: reset the form
    e.target.reset();
}

function checkAuth() {
    const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours
    const isAuthenticated = localStorage.getItem('portfolio-auth') === 'true';
    const authTime = localStorage.getItem('portfolio-auth-time');
    const dashboardSection = document.getElementById('dashboard');

    // Check if session is expired
    if (isAuthenticated && authTime) {
        const timeDiff = Date.now() - parseInt(authTime);
        if (timeDiff >= SESSION_TIMEOUT) {
            // Session expired, clear auth
            localStorage.removeItem('portfolio-auth');
            localStorage.removeItem('portfolio-auth-time');
            window.location.reload();
            return;
        }
    }

    if (!isAuthenticated) {
        // Hide dashboard section if not authenticated
        if (dashboardSection) {
            dashboardSection.style.display = 'none';
        }
        // Hide dashboard navigation link
        const dashboardNavLink = document.getElementById('dashboardNavLink');
        if (dashboardNavLink) {
            dashboardNavLink.style.display = 'none';
        }
        // Hide dashboard CTA button
        const workDashboardBtn = document.getElementById('workDashboardBtn');
        if (workDashboardBtn) {
            workDashboardBtn.style.display = 'none';
        }
    } else {
        // Show dashboard if authenticated
        if (dashboardSection) {
            dashboardSection.style.display = 'block';
        }
        // Show dashboard navigation link
        const dashboardNavLink = document.getElementById('dashboardNavLink');
        if (dashboardNavLink) {
            dashboardNavLink.style.display = '';
        }
        // Show dashboard CTA button
        const workDashboardBtn = document.getElementById('workDashboardBtn');
        if (workDashboardBtn) {
            workDashboardBtn.style.display = '';
        }
        // Initialize logout functionality
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('portfolio-auth');
                localStorage.removeItem('portfolio-auth-time');
                localStorage.removeItem('portfolio-user');
                window.location.reload();
            });
        }
    }
}

function initDashboard() {
    const dashboardPosts = document.getElementById('dashboardPosts');

    // Always load and render posts to projects section
    if (dashboardPosts) {
        const savedPosts = loadDashboardPosts();
        renderDashboardPosts(savedPosts, document.getElementById('dashboardList'), dashboardPosts);
    }

    const isAuthenticated = localStorage.getItem('portfolio-auth') === 'true';
    if (!isAuthenticated) return;

    // Only initialize form handlers if authenticated
    const dashboardForm = document.getElementById('dashboardForm');
    const dashboardReset = document.getElementById('dashboardReset');
    const dashboardList = document.getElementById('dashboardList');

    if (!dashboardForm || !dashboardReset || !dashboardList) return;

    dashboardForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(dashboardForm);
        const post = {
            title: formData.get('dashboardTitle')?.toString() || '',
            description: formData.get('dashboardDescription')?.toString() || '',
            tags: formData.get('dashboardTags')?.toString() || '',
            link: formData.get('dashboardLink')?.toString() || '',
            image: formData.get('dashboardImage')?.toString() || '',
            createdAt: new Date().toISOString(),
            id: formData.get('dashboardIndex')?.toString() || Date.now().toString()
        };

        const posts = saveDashboardPost(post);
        renderDashboardPosts(posts, dashboardList, dashboardPosts);
        dashboardForm.reset();
        document.getElementById('dashboardIndex').value = '';
    });

    dashboardReset.addEventListener('click', () => {
        dashboardForm.reset();
        document.getElementById('dashboardIndex').value = '';
    });
}

function saveDashboardPost(post) {
    const posts = loadDashboardPosts();
    const existingIndex = posts.findIndex((item) => item.id === post.id);

    if (existingIndex >= 0) {
        posts[existingIndex] = post;
    } else {
        posts.unshift(post);
    }

    localStorage.setItem('portfolio-dashboard-posts', JSON.stringify(posts));
    return posts;
}

function loadDashboardPosts() {
    const rawPosts = localStorage.getItem('portfolio-dashboard-posts');
    if (!rawPosts) return [];

    try {
        return JSON.parse(rawPosts);
    } catch (error) {
        console.warn('Unable to parse dashboard posts:', error);
        return [];
    }
}

function renderDashboardPosts(posts, dashboardList, dashboardPosts) {
    const isAuthenticated = localStorage.getItem('portfolio-auth') === 'true';

    // Always render to projects section
    dashboardPosts.innerHTML = '';

    if (posts.length === 0) {
        if (isAuthenticated) {
            dashboardList.innerHTML = '<p class="empty-message">No work posts yet. Add one using the dashboard form.</p>';
        }
        return;
    }

    posts.forEach((post) => {
        // Only render dashboard list if authenticated
        if (isAuthenticated) {
            const card = document.createElement('div');
            card.className = 'dashboard-card';
            card.innerHTML = `
                <div class="dashboard-card-content">
                    <div class="dashboard-card-header">
                        <h4>${escapeHtml(post.title)}</h4>
                        <span>${new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p>${escapeHtml(post.description)}</p>
                    <div class="dashboard-card-tags">${renderTags(post.tags)}</div>
                    ${post.link ? `<a href="${escapeAttribute(post.link)}" target="_blank" rel="noopener" class="dashboard-card-link">View link</a>` : ''}
                </div>
                <div class="dashboard-card-actions">
                    <button class="btn btn-secondary dashboard-edit" data-id="${post.id}">Edit</button>
                    <button class="btn btn-secondary dashboard-delete" data-id="${post.id}">Delete</button>
                </div>
            `;
            dashboardList.appendChild(card);
        }

        // Always render to projects section
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        const imageHTML = post.image 
            ? `<div class="project-image"><img src="${escapeAttribute(post.image)}" alt="${escapeHtml(post.title)}" class="project-thumbnail" onerror="this.style.display='none'; this.parentElement.innerHTML += '<div class=\\'project-placeholder\\'><i class=\\'fas fa-image\\'></i></div>'"></div>`
            : `<div class="project-image"><div class="project-placeholder"><i class="fas fa-file-alt"></i></div></div>`;
        projectCard.innerHTML = `
            ${imageHTML}
            <div class="project-content">
                <h3 class="project-title">${escapeHtml(post.title)}</h3>
                <p class="project-description">${escapeHtml(post.description)}</p>
                <div class="project-tags">${renderTags(post.tags)}</div>
                ${post.link ? `<a href="${escapeAttribute(post.link)}" target="_blank" rel="noopener" class="project-link project-link-inline">View Work</a>` : ''}
            </div>
        `;

        dashboardPosts.appendChild(projectCard);
    });

    // Only add event listeners if authenticated
    if (isAuthenticated) {
        dashboardList.querySelectorAll('.dashboard-edit').forEach((button) => {
            button.addEventListener('click', () => {
                const postId = button.getAttribute('data-id');
                const posts = loadDashboardPosts();
                const post = posts.find((item) => item.id === postId);
                if (!post) return;
                document.getElementById('dashboardTitle').value = post.title;
                document.getElementById('dashboardDescription').value = post.description;
                document.getElementById('dashboardTags').value = post.tags;
                document.getElementById('dashboardLink').value = post.link;
                document.getElementById('dashboardImage').value = post.image || '';
                document.getElementById('dashboardIndex').value = post.id;
            });
        });

        dashboardList.querySelectorAll('.dashboard-delete').forEach((button) => {
            button.addEventListener('click', () => {
                const postId = button.getAttribute('data-id');
                const posts = loadDashboardPosts().filter((item) => item.id !== postId);
                localStorage.setItem('portfolio-dashboard-posts', JSON.stringify(posts));
                renderDashboardPosts(posts, dashboardList, dashboardPosts);
            });
        });
    }
}

function initExperienceDashboard() {
    const isAuthenticated = localStorage.getItem('portfolio-auth') === 'true';
    if (!isAuthenticated) return;

    const experienceForm = document.getElementById('experienceForm');
    const experienceReset = document.getElementById('experienceReset');
    const experienceList = document.getElementById('experienceList');
    const dashboardExperiences = document.getElementById('dashboardExperiences');

    if (!experienceForm || !experienceList || !dashboardExperiences) return;

    // Always load and render experiences
    const savedExperiences = loadExperiencePosts();
    renderExperiencePosts(savedExperiences, experienceList, dashboardExperiences);

    experienceForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(experienceForm);
        const isCurrent = formData.get('experienceIsCurrent') === 'on';
        const experience = {
            title: formData.get('experienceTitle')?.toString() || '',
            company: formData.get('experienceCompany')?.toString() || '',
            period: formData.get('experiencePeriod')?.toString() || '',
            location: formData.get('experienceLocation')?.toString() || '',
            description: formData.get('experienceDescription')?.toString() || '',
            achievements: formData.get('experienceAchievements')?.toString() || '',
            tags: formData.get('experienceTags')?.toString() || '',
            isCurrent: isCurrent,
            createdAt: new Date().toISOString(),
            id: formData.get('experienceIndex')?.toString() || Date.now().toString()
        };

        const experiences = saveExperiencePost(experience);
        renderExperiencePosts(experiences, experienceList, dashboardExperiences);
        experienceForm.reset();
        document.getElementById('experienceIndex').value = '';
    });

    experienceReset.addEventListener('click', () => {
        experienceForm.reset();
        document.getElementById('experienceIndex').value = '';
    });
}

function saveExperiencePost(experience) {
    const experiences = loadExperiencePosts();
    
    // If marking as current, unmark all others
    if (experience.isCurrent) {
        experiences.forEach(exp => {
            exp.isCurrent = false;
        });
    }
    
    const existingIndex = experiences.findIndex((item) => item.id === experience.id);

    if (existingIndex >= 0) {
        experiences[existingIndex] = experience;
    } else {
        experiences.unshift(experience);
    }

    localStorage.setItem('portfolio-experience-posts', JSON.stringify(experiences));
    return experiences;
}

function loadExperiencePosts() {
    const experiences = localStorage.getItem('portfolio-experience-posts');
    return experiences ? JSON.parse(experiences) : [];
}

function renderExperiencePosts(experiences, experienceList, dashboardExperiences) {
    const isAuthenticated = localStorage.getItem('portfolio-auth') === 'true';

    // Always render to experience section
    dashboardExperiences.innerHTML = '';

    if (experiences.length === 0) {
        if (isAuthenticated) {
            experienceList.innerHTML = '<p class="empty-message">No experience entries yet. Add one using the experience form.</p>';
        }
        return;
    }

    // Sort experiences: current first, then by creation date
    const sortedExperiences = [...experiences].sort((a, b) => {
        if (a.isCurrent && !b.isCurrent) return -1;
        if (!a.isCurrent && b.isCurrent) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    sortedExperiences.forEach((experience) => {
        // Only render dashboard list if authenticated
        if (isAuthenticated) {
            const card = document.createElement('div');
            card.className = 'dashboard-card';
            const currentBadge = experience.isCurrent ? '<span class="current-badge">Current</span>' : '';
            card.innerHTML = `
                <div class="dashboard-card-content">
                    <div class="dashboard-card-header">
                        <h4>${escapeHtml(experience.title)}${currentBadge}</h4>
                        <span>${escapeHtml(experience.company)} • ${escapeHtml(experience.period)}</span>
                    </div>
                    <p>${escapeHtml(experience.description)}</p>
                    <div class="dashboard-card-tags">${renderTags(experience.tags)}</div>
                </div>
                <div class="dashboard-card-actions">
                    <button class="btn btn-secondary experience-edit" data-id="${experience.id}">Edit</button>
                    <button class="btn btn-secondary experience-delete" data-id="${experience.id}">Delete</button>
                </div>
            `;
            experienceList.appendChild(card);
        }

        // Always render to experience section
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        const currentBadgeHTML = experience.isCurrent ? '<div class="timeline-badge">Current</div>' : '';
        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <div class="timeline-year">${escapeHtml(experience.period)}</div>
                    ${currentBadgeHTML}
                </div>
                <h3 class="timeline-title">${escapeHtml(experience.title)}</h3>
                <div class="timeline-company">
                    <i class="fas fa-building"></i>
                    ${escapeHtml(experience.company)}${experience.location ? ` - ${escapeHtml(experience.location)}` : ''}
                </div>
                <p class="timeline-description">${escapeHtml(experience.description)}</p>
                <div class="timeline-achievements">
                    ${experience.achievements.split('\n').filter(a => a.trim()).map(achievement =>
                        `<div class="achievement-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${escapeHtml(achievement.trim())}</span>
                        </div>`
                    ).join('')}
                </div>
                <div class="timeline-tags">
                    ${experience.tags.split(',').map(tag =>
                        `<span class="tag">${escapeHtml(tag.trim())}</span>`
                    ).join('')}
                </div>
            </div>
        `;

        dashboardExperiences.appendChild(timelineItem);
    });

    // Only add event listeners if authenticated
    if (isAuthenticated) {
        experienceList.querySelectorAll('.experience-edit').forEach((button) => {
            button.addEventListener('click', () => {
                const experienceId = button.getAttribute('data-id');
                const experiences = loadExperiencePosts();
                const experience = experiences.find((item) => item.id === experienceId);
                if (!experience) return;
                document.getElementById('experienceTitle').value = experience.title;
                document.getElementById('experienceCompany').value = experience.company;
                document.getElementById('experiencePeriod').value = experience.period;
                document.getElementById('experienceLocation').value = experience.location;
                document.getElementById('experienceDescription').value = experience.description;
                document.getElementById('experienceAchievements').value = experience.achievements;
                document.getElementById('experienceTags').value = experience.tags;
                document.getElementById('experienceIsCurrent').checked = experience.isCurrent || false;
                document.getElementById('experienceIndex').value = experience.id;
            });
        });

        experienceList.querySelectorAll('.experience-delete').forEach((button) => {
            button.addEventListener('click', () => {
                const experienceId = button.getAttribute('data-id');
                const experiences = loadExperiencePosts().filter((item) => item.id !== experienceId);
                localStorage.setItem('portfolio-experience-posts', JSON.stringify(experiences));
                renderExperiencePosts(experiences, experienceList, dashboardExperiences);
            });
        });
    }
}

function initDashboardTabs() {
    const tabs = document.querySelectorAll('.dashboard-tab');
    const tabContents = document.querySelectorAll('.dashboard-tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');
            const tabName = tab.getAttribute('data-tab');
            document.querySelector(`.dashboard-tab-content[data-tab="${tabName}"]`).classList.add('active');
        });
    });
}

function initProjectCarousel() {
    // Initialize dynamic projects carousel
    const dashboardPostsCarousel = document.getElementById('dashboardPosts');
    const projectsPrev = document.getElementById('projectsPrev');
    const projectsNext = document.getElementById('projectsNext');
    
    if (projectsPrev && projectsNext && dashboardPostsCarousel) {
        projectsPrev.addEventListener('click', () => {
            dashboardPostsCarousel.scrollBy({ left: -400, behavior: 'smooth' });
        });
        projectsNext.addEventListener('click', () => {
            dashboardPostsCarousel.scrollBy({ left: 400, behavior: 'smooth' });
        });
    }
}

function renderTags(tagString) {
    if (!tagString) return '';
    return tagString.split(',').map((tag) => `<span class="tag">${escapeHtml(tag.trim())}</span>`).join('');
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeAttribute(url) {
    return url.replace(/"/g, '%22').replace(/'/g, '%27');
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    document.addEventListener('click', (e) => {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.getElementById('menuToggle');
        
        if (AppState.isMenuOpen && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    AppState.isMenuOpen = !AppState.isMenuOpen;
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    
    if (navMenu) {
        navMenu.classList.toggle('active', AppState.isMenuOpen);
    }
    
    if (menuToggle) {
        menuToggle.classList.toggle('active', AppState.isMenuOpen);
    }
}

function generateParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const codeSymbols = ['{', '}', '[', ']', '(', ')', '<', '>', '/', '*', '=', '+', '-', ';', ':', '&', '|', '%', '$', '#', '@'];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateParticles();
});



//--------------animations.js-----------------
function inView(element, callback, options = {}) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry);
                if (options.once !== false) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: options.amount || 0.1,
        rootMargin: options.rootMargin || '0px'
    });
    observer.observe(element);
    return () => observer.unobserve(element);
}

function animateElement(element, props, options = {}) {
    if (typeof anime === 'undefined') return;
    const animeProps = {};
    if (props.opacity) animeProps.opacity = props.opacity;
    if (props.x !== undefined) animeProps.translateX = props.x;
    if (props.y !== undefined) animeProps.translateY = props.y;
    if (props.scale) animeProps.scale = props.scale;
    return anime({
        targets: element,
        ...animeProps,
        duration: (options.duration || 0.8) * 1000,
        delay: (options.delay || 0) * 1000,
        easing: options.easing || 'easeOutExpo'
    });
}

window.addEventListener('load', () => {
    setTimeout(() => {
        initLoaderAnimation();
    }, 100);
});

function initLoaderAnimation() {
    const loader = document.getElementById('loader');
    const loaderPercent = document.getElementById('loaderPercent');
    if (!loader || !loaderPercent) return;
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            setTimeout(() => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: loader,
                        opacity: [1, 0],
                        duration: 500,
                        easing: 'easeInOutQuad',
                        complete: () => {
                            loader.classList.add('hidden');
                            initPageAnimations();
                        }
                    });
                } else {
                    loader.classList.add('hidden');
                    initPageAnimations();
                }
            }, 300);
        }
        if (loaderPercent) {
            loaderPercent.textContent = Math.floor(progress) + '%';
        }
    }, 100);
}

function initPageAnimations() {
    setTimeout(() => {
        initHeroAnimations();
        initSkillAnimations();
        initTimelineAnimations();
        initProjectAnimations();
        initScrollAnimations();
        initContactAnimations();
        animateStats();
        initParallax();
        initSmoothScroll();
    }, 300);
}

function initHeroAnimations() {
    if (typeof anime === 'undefined') return;
    
    const heroName = document.getElementById('heroName');
    if (heroName) {
        const nameValue = heroName.querySelector('.name-value');
        if (nameValue) {
            const originalText = nameValue.textContent;
            nameValue.textContent = '';
            anime({
                targets: { value: 0 },
                value: originalText.length,
                duration: 1500,
                delay: 500,
                easing: 'easeInOutQuad',
                update: function(anim) {
                    const length = Math.floor(anim.animatables[0].target.value);
                    nameValue.textContent = originalText.substring(0, length);
                },
                complete: () => {
                    const cursor = document.createElement('span');
                    cursor.className = 'name-cursor';
                    cursor.textContent = '|';
                    cursor.style.animation = 'blink 1s infinite';
                    nameValue.appendChild(cursor);
                    setTimeout(() => cursor.remove(), 2000);
                }
            });
        }
    }
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        anime({
            targets: heroTitle,
            opacity: [0, 1],
            translateX: [-30, 0],
            delay: 800,
            duration: 1000,
            easing: 'easeOutExpo'
        });
    }
    
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        anime({
            targets: heroDescription,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: 1200,
            duration: 1000,
            easing: 'easeOutExpo'
        });
    }
    
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    if (heroButtons.length > 0) {
        anime({
            targets: heroButtons,
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: anime.stagger(100, {start: 1500}),
            duration: 800,
            easing: 'easeOutBack'
        });
    }
    
    const socialIcons = document.querySelectorAll('.hero-social .social-icon');
    if (socialIcons.length > 0) {
        anime({
            targets: socialIcons,
            opacity: [0, 1],
            scale: [0, 1],
            rotate: [180, 0],
            delay: anime.stagger(100, {start: 2000}),
            duration: 800,
            easing: 'easeOutBack'
        });
    }
    
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        anime({
            targets: profileImage,
            opacity: [0, 1],
            scale: [0.8, 1],
            rotate: [180, 0],
            delay: 1000,
            duration: 1500,
            easing: 'easeOutElastic(1, .8)'
        });
        
        profileImage.addEventListener('mouseenter', () => {
            anime({
                targets: profileImage,
                scale: [1, 1.1],
                rotate: [0, 5],
                duration: 500,
                easing: 'easeOutElastic(1, .8)'
            });
        });
        
        profileImage.addEventListener('mouseleave', () => {
            anime({
                targets: profileImage,
                scale: [1.1, 1],
                rotate: [5, 0],
                duration: 500,
                easing: 'easeOutElastic(1, .8)'
            });
        });
    }
    
    const badges = document.querySelectorAll('.floating-badge');
    if (badges.length > 0) {
        badges.forEach((badge, index) => {
            anime({
                targets: badge,
                opacity: [0, 1],
                scale: [0, 1],
                delay: 1500 + (index * 200),
                duration: 800,
                easing: 'easeOutBack'
            });
        });
    }
}

function initSkillAnimations() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const skillItems = skillsSection.querySelectorAll('.skill-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const progressBar = skillItem.querySelector('.skill-progress');
                const percentElement = skillItem.querySelector('.skill-percent');
                const percent = parseInt(skillItem.getAttribute('data-percent') || 0);
                
                if (progressBar && typeof anime !== 'undefined') {
                    anime({
                        targets: progressBar,
                        width: ['0%', percent + '%'],
                        duration: 2000,
                        easing: 'easeOutExpo',
                        delay: 300
                    });
                    
                    anime({
                        targets: { value: 0 },
                        value: percent,
                        duration: 2000,
                        easing: 'easeOutExpo',
                        delay: 300,
                        update: function(anim) {
                            if (percentElement) {
                                percentElement.textContent = Math.floor(anim.animatables[0].target.value) + '%';
                            }
                        }
                    });
                }
                observer.unobserve(skillItem);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => observer.observe(item));
}

function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        inView(item, () => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: item,
                    opacity: [0, 1],
                    translateX: [-50, 0],
                    delay: index * 150,
                    duration: 1000,
                    easing: 'easeOutExpo'
                });
            } else {
                animateElement(item, { opacity: [0, 1], x: [-50, 0] }, { duration: 0.8, delay: index * 0.1 });
            }
        }, { amount: 0.3 });
    });
}

function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        inView(card, () => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: card,
                    opacity: [0, 1],
                    translateY: [50, 0],
                    scale: [0.9, 1],
                    delay: index * 100,
                    duration: 1000,
                    easing: 'easeOutExpo'
                });
            } else {
                animateElement(card, { opacity: [0, 1], y: [50, 0], scale: [0.9, 1] }, { duration: 0.8, delay: index * 0.1 });
            }
        }, { amount: 0.2 });
        
        card.addEventListener('mouseenter', () => {
            if (typeof anime !== 'undefined') {
                anime({ targets: card, scale: [1, 1.02], duration: 300, easing: 'easeOutQuad' });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (typeof anime !== 'undefined') {
                anime({ targets: card, scale: [1.02, 1], duration: 300, easing: 'easeOutQuad' });
            }
        });
    });
}

function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        inView(section, () => {
            const sectionHeader = section.querySelector('.section-header');
            if (sectionHeader && typeof anime !== 'undefined') {
                anime({
                    targets: sectionHeader,
                    opacity: [0, 1],
                    translateY: [-20, 0],
                    duration: 600,
                    easing: 'easeOutExpo'
                });
            }
        }, { amount: 0.2 });
    });
    
    const cards = document.querySelectorAll('.card, .project-card, .contact-item');
    cards.forEach((card, index) => {
        inView(card, () => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: card,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    delay: index * 30,
                    duration: 500,
                    easing: 'easeOutExpo'
                });
            } else {
                animateElement(card, { opacity: [0, 1], y: [50, 0] }, { duration: 0.6, delay: index * 0.05 });
            }
        }, { amount: 0.2 });
    });
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count') || 0);
        inView(stat, () => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: { value: 0 },
                    value: target,
                    duration: 2000,
                    easing: 'easeOutExpo',
                    update: function(anim) {
                        stat.textContent = Math.floor(anim.animatables[0].target.value);
                    }
                });
            }
        }, { amount: 0.5 });
    });
}

function initContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (typeof anime !== 'undefined') {
                anime({ targets: item, scale: [1, 1.02], duration: 200, easing: 'easeOutQuad' });
            }
        });
        item.addEventListener('mouseleave', () => {
            if (typeof anime !== 'undefined') {
                anime({ targets: item, scale: [1.02, 1], duration: 200, easing: 'easeOutQuad' });
            }
        });
    });
}

function initParallax() {
    const profileImage = document.getElementById('profileImage');
    if (!profileImage) return;
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.3;
                const maxOffset = 100;
                const offset = Math.min(scrolled * parallaxSpeed, maxOffset);
                
                if (profileImage) {
                    profileImage.style.transform = `translateY(${offset}px)`;
                }
                
                const gridBg = document.querySelector('.code-grid-bg');
                if (gridBg) {
                    gridBg.style.transform = `translateY(${scrolled * 0.2}px)`;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initSmoothScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: window,
                        scrollTop: targetPosition,
                        duration: 800,
                        easing: 'easeInOutQuad'
                    });
                } else {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    let currentSection = '';
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                if (currentSection !== sectionId) {
                    currentSection = sectionId;
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    });
}

window.Animations = {
    initParallax,
    initSmoothScroll
};
