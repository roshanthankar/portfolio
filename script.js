document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. TABLE OF CONTENTS LOGIC
       ========================================= */
    const navLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.editorial-section-title[id], .editorial-label[id]');

    // Only run TOC logic if TOC links exist on this page
    if (navLinks.length > 0) {
       
        // SMOOTH SCROLL ON CLICK
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); 
                const targetId = link.getAttribute('href').substring(1); 
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 120; 
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // HIGHLIGHT ACTIVE SECTION ON SCROLL
        let ticking = false;
        window.addEventListener("scroll", () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              let current = "";
              sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 250) {
                  current = section.getAttribute("id");
                }
              });
              navLinks.forEach((link) => {
                link.classList.remove("active");
                if (current && link.getAttribute("href").includes(current)) {
                  link.classList.add("active");
                }
              });
              ticking = false;
            });
            ticking = true;
          }
        });

        window.dispatchEvent(new Event('scroll'));
    }


/* =========================================
       2. LIGHT/DARK MODE LOGIC (SIMPLE TOGGLE)
       ========================================= */
       
    // 1. APPLY THEME ON LOAD GLOBALLY (Light is default, we only act if Dark was saved)
    const currentTheme = localStorage.getItem('portfolio-theme');
    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
    }

    // 2. SETUP THE BUTTON
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('ion-icon');

        // Sync the icon on load (Default is moon, change to sun if dark is active)
        if (currentTheme === 'dark' && themeIcon) {
            themeIcon.setAttribute('name', 'sunny');
        }

        // Listen for the toggle click
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');

            if (document.documentElement.classList.contains('dark-mode')) {
                if (themeIcon) themeIcon.setAttribute('name', 'sunny');
                localStorage.setItem('portfolio-theme', 'dark');
            } else {
                if (themeIcon) themeIcon.setAttribute('name', 'moon');
                localStorage.setItem('portfolio-theme', 'light');
            }
        });
    }

});