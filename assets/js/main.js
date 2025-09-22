// Extracted from index.html inline <script>
// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
    if (window.AOS) {
        AOS.init({
            duration: 800,
            once: true,
            mirror: false
        });
    }

    // Navbar shrink/hide on scroll
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Downscroll
                navbar.style.top = '-80px';
            } else {
                // Upscroll
                navbar.style.top = '0';
            }
            lastScrollTop = scrollTop;
        });
    }
});

// Theme toggle logic
(function() {
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('theme', theme);
        } catch (e) { /* ignore */ }
        updateToggleUI(theme);
    }

    function updateToggleUI(theme) {
        const icon = document.getElementById('theme-icon');
        const logo = document.querySelector('.navbar-brand-img');
        if (icon) {
            if (theme === 'light') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        }
        if (logo) {
            // Optionally swap logo image if darker/lighter version exists
            const src = logo.getAttribute('src') || '';
            if (theme === 'light') {
                if (src.includes('logo-dark.png')) {
                    logo.setAttribute('src', src.replace('logo-dark.png', 'logo-dark.png'));
                }
                logo.style.filter = 'none';
            } else {
                logo.style.filter = getComputedStyle(document.documentElement).getPropertyValue('--logo-filter') || 'invert(100%) brightness(80%)';
            }
        }
    }

    // Attach listener to the toggle button
    document.addEventListener('DOMContentLoaded', function() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const current = document.documentElement.getAttribute('data-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
            const next = current === 'light' ? 'dark' : 'light';
            setTheme(next);
        });

        // Ensure UI reflects the initial theme
        const initial = document.documentElement.getAttribute('data-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        updateToggleUI(initial);
    });
})();
