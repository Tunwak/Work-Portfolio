document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Preloader ---------- */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 600);
        }
    });

    /* ---------- AOS init ---------- */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80
        });
    }

    /* ---------- Current year in footer ---------- */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ---------- Navbar scroll effect ---------- */
    const mainNav = document.getElementById('mainNav');
    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    };
    handleNavScroll();
    window.addEventListener('scroll', handleNavScroll);

    /* ---------- Active nav link on scroll (highlight) ---------- */
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id], header[id]');

    const setActiveLink = () => {
        let currentId = '';
        const scrollPos = window.scrollY + 120;

        sections.forEach((section) => {
            if (scrollPos >= section.offsetTop) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    };
    setActiveLink();
    window.addEventListener('scroll', setActiveLink);

    /* ---------- Close mobile navbar on link click ---------- */
    const navbarCollapse = document.getElementById('navbarNav');
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    /* ---------- Dark / Light theme toggle ---------- */
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('bi-moon-stars-fill');
                themeIcon.classList.add('bi-sun-fill');
            }
        } else {
            body.classList.remove('dark-theme');
            if (themeIcon) {
                themeIcon.classList.remove('bi-sun-fill');
                themeIcon.classList.add('bi-moon-stars-fill');
            }
        }
    };

    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.contains('dark-theme');
            const newTheme = isDark ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
        });
    }

    /* ---------- Back to top button ---------- */
    const backToTop = document.getElementById('backToTop');
    const toggleBackToTop = () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    };
    if (backToTop) {
        toggleBackToTop();
        window.addEventListener('scroll', toggleBackToTop);
    }

    /* ---------- Contact form validation & fake submit ---------- */
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!contactForm.checkValidity()) {
                e.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }

            // Simulate successful submission (replace with real backend / API call)
            formSuccess.classList.remove('d-none');
            contactForm.reset();
            contactForm.classList.remove('was-validated');

            setTimeout(() => {
                formSuccess.classList.add('d-none');
            }, 4000);
        });
    }

});
