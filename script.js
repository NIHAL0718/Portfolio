document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // --- ELEMENT REFERENCES ---
    const mainContent = document.getElementById('main-content');
    const projectDetailContent = document.getElementById('project-detail-content');
    const mainNav = document.getElementById('main-nav');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const typingElement = document.getElementById('typing-effect');
    const contactForm = document.getElementById("contact-form");

    // --- SHOW/HIDE PAGES ---
    const showPage = (pageId) => {
        mainContent?.classList.add('hidden');
        projectDetailContent?.classList.remove('hidden');
        mainNav?.classList.add('hidden');

        document.querySelectorAll('.page-section').forEach(page => page.classList.remove('active'));
        const activePage = document.getElementById(pageId);
        activePage?.classList.add('active');
        window.scrollTo(0, 0);
    };

    const showMainPage = () => {
        projectDetailContent?.classList.add('hidden');
        mainContent?.classList.remove('hidden');
        mainNav?.classList.remove('hidden');
        document.querySelectorAll('.page-section').forEach(page => page.classList.remove('active'));
    };

    // --- PROJECT BUTTONS AS LINKS ---
    const projectMap = {
        'project-detail-ipl': 'projects/ipl-prediction.html',
        'project-detail-legal': 'projects/legal-summarization.html',
        'project-detail-smartdocq': 'projects/smartdocq.html',
    };

    document.querySelectorAll('.view-project-btn').forEach(btn => {
        const id = btn.dataset.project;
        const url = projectMap[id];
        if (!url) return;

        const a = document.createElement('a');
        a.href = url;
        a.className = 'inline-block w-full text-center bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors';
        a.textContent = btn.textContent || 'View Details';
        btn.replaceWith(a);
    });

    // --- NAVIGATION ---
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => projectDetailContent && !projectDetailContent.classList.contains('hidden') && showMainPage());
    });

    // --- THEME TOGGLE ---
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    if (themeToggleBtn) {
        const isDark = localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList.toggle('dark', isDark);
        themeToggleDarkIcon?.classList.toggle('hidden', isDark);
        themeToggleLightIcon?.classList.toggle('hidden', !isDark);

        themeToggleBtn.addEventListener('click', () => {
            const darkMode = document.documentElement.classList.toggle('dark');
            localStorage.setItem('color-theme', darkMode ? 'dark' : 'light');
            themeToggleDarkIcon?.classList.toggle('hidden', darkMode);
            themeToggleLightIcon?.classList.toggle('hidden', !darkMode);
        });
    }

    // --- MOBILE MENU ---
    if (mobileMenuButton && mobileMenu) {
        const menuIcon = mobileMenuButton.querySelector('[data-lucide="menu"]');
        const xIcon = mobileMenuButton.querySelector('[data-lucide="x"]');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden');
            xIcon.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                xIcon.classList.add('hidden');
            }
        }));
    }

    // --- TYPING EFFECT ---
    if (typingElement) {
        const words = ["Computer Science Student", "Full-Stack Developer", "AI Enthusiast"];
        let wordIndex = 0, charIndex = 0, isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            typingElement.textContent = isDeleting ? currentWord.substring(0, charIndex--) : currentWord.substring(0, charIndex++);

            let speed = isDeleting ? 75 : 150;
            if (!isDeleting && charIndex === currentWord.length) { speed = 2000; isDeleting = true; }
            else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 500; }

            setTimeout(type, speed);
        };
        type();
    }

    // --- SCROLL ANIMATION ---
    const scrollElements = document.querySelectorAll('.scroll-animate');
    const elementInView = (el, offset = 0) => el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) - offset;
    const displayScrollElement = el => el.classList.add('is-visible');
    const hideScrollElement = el => el.classList.remove('is-visible');
    const handleScrollAnimation = () => scrollElements.forEach(el => elementInView(el, 100) ? displayScrollElement(el) : hideScrollElement(el));
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();

    // --- HEADER SHADOW ---
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        header?.classList.toggle('shadow-md', window.scrollY > 10);
    });

    // --- CONTACT FORM ---
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            emailjs.sendForm("service_l9d6z2b", "template_wb5zy4o", contactForm, "o78sKSUG2t6s2QTDa")
                .then(() => {
                    document.getElementById("form-success")?.classList.remove("hidden");
                    document.getElementById("form-error")?.classList.add("hidden");
                    contactForm.reset();
                }).catch(err => {
                    console.error("FAILED...", err);
                    document.getElementById("form-error")?.classList.remove("hidden");
                    document.getElementById("form-success")?.classList.add("hidden");
                });
        });
    }

    // INITIAL PAGE STATE
    showMainPage();
});
