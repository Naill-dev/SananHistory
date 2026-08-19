// === Sayğac Animasiyası (Təkmilləşdirilmiş) ===
if (counters.length) {
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.target) || 0;
        const suffix = counter.dataset.suffix || '';
        const duration = 2000; // 2 saniyə
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing funksiyası (daha təbii görünüş)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            counter.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                // Yekun rəqəmdə dayansın
                counter.textContent = target + suffix;
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    // Artıq animasiya olunubsa yenidən işləməsin
                    if (!counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        animateCounter(counter);
                    }
                });
                observer.disconnect(); // Bir dəfə işləsin
            }
        });
    }, { 
        threshold: 0.4,
        rootMargin: '0px 0px -50px 0px'
    });

    const statsSection = document.getElementById('statsSection');
    if (statsSection) {
        observer.observe(statsSection);
    }
}
