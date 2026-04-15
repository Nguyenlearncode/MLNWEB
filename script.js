/**
 * MLN111 - NHÓM 5: Multi-page Navigation Script
 */
document.addEventListener('DOMContentLoaded', () => {
    const TOTAL_PAGES = 18;
    const currentPage = parseInt(document.body.dataset.page) || 1;

    // === Mobile Nav Toggle ===
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const spans = navToggle.querySelectorAll('span');
            if (mobileNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
            });
        });
    }

    // === Keyboard Navigation ===
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentPage < TOTAL_PAGES) {
                window.location.href = `page${currentPage + 1}.html`;
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentPage > 1) {
                window.location.href = `page${currentPage - 1}.html`;
            }
        }
    });

    // === Page dots ===
    const dotsContainer = document.querySelector('.page-dots');
    if (dotsContainer) {
        for (let i = 1; i <= TOTAL_PAGES; i++) {
            const dot = document.createElement('a');
            dot.href = `page${i}.html`;
            dot.className = `page-dot${i === currentPage ? ' active' : ''}`;
            dot.title = `Trang ${i}`;
            dotsContainer.appendChild(dot);
        }
    }

    // === Entrance animations ===
    const animElements = document.querySelectorAll('.animate-in, .animate-left');
    animElements.forEach(el => {
        el.style.animationPlayState = 'running';
    });

    // === Image lazy load fade ===
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        if (img.complete) { img.style.opacity = '1'; }
        else { img.addEventListener('load', () => { img.style.opacity = '1'; }); }
    });

    // === Hover tilt on cards ===
    document.querySelectorAll('.question-card, .reason-card, .illustration-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    // === Swipe navigation (touch) ===
    let touchStartX = 0;
    let touchEndX = 0;
    document.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 80) {
            if (diff > 0 && currentPage < TOTAL_PAGES) {
                window.location.href = `page${currentPage + 1}.html`;
            } else if (diff < 0 && currentPage > 1) {
                window.location.href = `page${currentPage - 1}.html`;
            }
        }
    }, { passive: true });
});
