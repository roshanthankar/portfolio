document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Select all links in the sidebar and all sections in the article
    const navLinks = document.querySelectorAll('.toc-link');
    
    // Select all potential targets (h2 headings and div labels with IDs)
    // We only care about elements that actually have an ID assigned
    const sections = document.querySelectorAll('.editorial-section-title[id], .editorial-label[id]');

    // --- FUNCTION 1: SMOOTH SCROLL ON CLICK ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Stop instant jump

            const targetId = link.getAttribute('href').substring(1); // Get ID (remove #)
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Calculate position with 100px offset for breathing room
                const offsetTop = targetSection.offsetTop - 120; 

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- FUNCTION 2: HIGHLIGHT ACTIVE SECTION ON SCROLL ---
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // If we have scrolled past this section (minus some offset)
            if (window.scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // If the link's href matches the current section ID
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    window.dispatchEvent(new Event('scroll'));

});
