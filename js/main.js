// === Sayğac Animasiyası (Təkmilləşdirilmiş) ===
const counters = document.querySelectorAll('.stat-counter');

if (counters.length > 0) {
  const animateCounter = (counter) => {
    const target = parseInt(counter.dataset.target) || 0;
    const suffix = counter.dataset.suffix || '';
    const duration = 2200;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3); // yumşaq bitmə
      const current = Math.floor(easeOut * target);

      counter.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + suffix; // yekun rəqəmdə dayansın
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          if (!counter.classList.contains('counted')) {
            counter.classList.add('counted');
            animateCounter(counter);
          }
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });

  const statsSection = document.getElementById('statsSection');
  if (statsSection) {
    observer.observe(statsSection);
  }
}
