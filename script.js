/**
 * SananHistory - Əsas JavaScript İdarəetmə Mühərriki
 * Müəllim: Sənan Abdulalı
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initStatsCounter();
  initServiceFilter();
  initFAQAccordion();
  initQuiz();
  initModal();
  initContactForm();
});

/* ==========================================================================
   1. Mobil Menyu İdarəetməsi
   ========================================================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    } else {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    }
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}

/* ==========================================================================
   2. Header Naviqasiya Scroll Effekti
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('bg-neutral-950/90', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-[#6B4226]/40');
    } else {
      header.classList.remove('bg-neutral-950/90', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-[#6B4226]/40');
    }
  });
}

/* ==========================================================================
   3. Statistika Rəqəm Sayğacı Animasiyası
   ========================================================================== */
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-counter');
  let animated = false;

  function runCounter() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1500;
      const step = target / (duration / 20);
      let count = 0;

      const updateCount = () => {
        count += step;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target + (counter.getAttribute('data-suffix') || '');
        }
      };
      updateCount();
    });
  }

  window.addEventListener('scroll', () => {
    const statsSection = document.getElementById('statsSection');
    if (!statsSection || animated) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.85) {
      runCounter();
      animated = true;
    }
  });
}

/* ==========================================================================
   4. Xidmətlər Filterləməsi
   ========================================================================== */
function initServiceFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Aktiv düymə stilini dəyiş
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#E28743]', 'text-white', 'shadow-lg');
        b.classList.add('bg-[#27170D]', 'text-[#D4C3B3]');
      });
      btn.classList.remove('bg-[#27170D]', 'text-[#D4C3B3]');
      btn.classList.add('bg-[#E28743]', 'text-white', 'shadow-lg');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   5. Tez-Tez Verilən Suallar (FAQ Accordion)
   ========================================================================== */
function initFAQAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Digər açıq olanları bağla
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const icon = otherItem.querySelector('.accordion-icon');
        if (icon) icon.style.transform = 'rotate(0deg)';
      });

      if (!isActive) {
        item.classList.add('active');
        const icon = item.querySelector('.accordion-icon');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ==========================================================================
   6. İnteraktiv Tarix Kvesti & Test Sistemi
   ========================================================================== */
let currentQuestionIndex = 0;
let userScore = 0;
let userAnswers = [];

function initQuiz() {
  renderQuestion();

  const nextBtn = document.getElementById('quizNextBtn');
  const restartBtn = document.getElementById('quizRestartBtn');

  if (nextBtn) {
    nextBtn.addEventListener('click', handleNextQuestion);
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', restartQuiz);
  }
}

function renderQuestion() {
  const container = document.getElementById('quizQuestionContainer');
  const counterEl = document.getElementById('quizCurrentNum');
  const progressBar = document.getElementById('quizProgressBar');
  const nextBtn = document.getElementById('quizNextBtn');

  if (!container || typeof historyQuizData === 'undefined') return;

  const currentQ = historyQuizData[currentQuestionIndex];
  if (!currentQ) return;

  if (counterEl) counterEl.textContent = currentQuestionIndex + 1;
  if (progressBar) {
    const percent = ((currentQuestionIndex) / historyQuizData.length) * 100;
    progressBar.style.width = `${percent}%`;
  }

  if (nextBtn) {
    nextBtn.disabled = true;
    nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    nextBtn.textContent = currentQuestionIndex === historyQuizData.length - 1 ? 'Nəticəni Gör' : 'Növbəti Sual';
  }

  container.innerHTML = `
    <div class="space-y-4">
      <div class="inline-block px-3 py-1 rounded-full text-xs font-semibold badge-neon mb-2">
        <i class="fa-solid fa-scroll mr-1.5 text-[#E28743]"></i> ${currentQ.category}
      </div>
      <h3 class="text-xl md:text-2xl font-bold text-[#FAF6F0] leading-snug">
        ${currentQ.question}
      </h3>
      <div class="grid grid-cols-1 gap-3 pt-2">
        ${currentQ.options.map((opt, idx) => `
          <button type="button" class="quiz-option text-left p-4 rounded-xl border border-[#6B4226]/40 bg-[#1E1108]/70 hover:border-[#E28743] transition-all flex items-start gap-3.5 group" data-index="${idx}">
            <span class="w-7 h-7 rounded-full bg-[#3E2415] text-[#DDA15E] flex items-center justify-center font-bold text-sm shrink-0 border border-[#6B4226]/60 group-hover:bg-[#E28743] group-hover:text-white transition-colors">
              ${String.fromCharCode(65 + idx)}
            </span>
            <span class="text-[#D4C3B3] text-sm md:text-base font-medium group-hover:text-white transition-colors">
              ${opt}
            </span>
          </button>
        `).join('')}
      </div>
      <div id="explanationBox" class="hidden p-4 rounded-xl border border-[#6B4226]/50 bg-[#1A0E07] text-sm text-[#D4C3B3]"></div>
    </div>
  `;

  // Variant seçimi
  const optionButtons = container.querySelectorAll('.quiz-option');
  optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedIndex = parseInt(btn.getAttribute('data-index'), 10);
      handleOptionSelect(selectedIndex, optionButtons, currentQ);
    });
  });
}

function handleOptionSelect(selectedIndex, optionButtons, currentQ) {
  optionButtons.forEach(b => b.classList.remove('selected'));
  
  const isCorrect = selectedIndex === currentQ.correct;
  userAnswers[currentQuestionIndex] = { selected: selectedIndex, isCorrect };

  optionButtons.forEach((b, idx) => {
    b.disabled = true;
    if (idx === currentQ.correct) {
      b.classList.add('correct');
    } else if (idx === selectedIndex && !isCorrect) {
      b.classList.add('incorrect');
    }
  });

  if (isCorrect) {
    userScore++;
  }

  // İzahı göstər
  const expBox = document.getElementById('explanationBox');
  if (expBox) {
    expBox.classList.remove('hidden');
    expBox.innerHTML = `
      <div class="flex items-start gap-2.5">
        <i class="fa-solid fa-lightbulb text-[#E28743] text-lg mt-0.5"></i>
        <div>
          <strong class="text-white block mb-1">Tarixi İzah:</strong>
          <span>${currentQ.explanation}</span>
        </div>
      </div>
    `;
  }

  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) {
    nextBtn.disabled = false;
    nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }
}

function handleNextQuestion() {
  if (currentQuestionIndex < historyQuizData.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    showQuizResults();
  }
}

function showQuizResults() {
  const quizActiveBox = document.getElementById('quizActiveBox');
  const quizResultBox = document.getElementById('quizResultBox');
  const progressBar = document.getElementById('quizProgressBar');

  if (progressBar) progressBar.style.width = '100%';

  if (!quizActiveBox || !quizResultBox) return;

  quizActiveBox.classList.add('hidden');
  quizResultBox.classList.remove('hidden');

  const scoreEl = document.getElementById('quizScoreText');
  const badgeEl = document.getElementById('quizResultBadge');
  const titleEl = document.getElementById('quizResultTitle');
  const descEl = document.getElementById('quizResultDesc');
  const ctaBtn = document.getElementById('quizResultWhatsAppBtn');

  const total = historyQuizData.length;
  const rec = getQuizRecommendation(userScore, total);

  if (scoreEl) scoreEl.textContent = `${userScore} / ${total}`;
  if (badgeEl) {
    badgeEl.className = `inline-block px-4 py-1.5 rounded-full text-xs font-bold border ${rec.badgeColor} uppercase tracking-wider mb-2`;
    badgeEl.textContent = rec.badge;
  }
  if (titleEl) titleEl.textContent = rec.title;
  if (descEl) descEl.textContent = rec.description;

  if (ctaBtn) {
    const text = encodeURIComponent(`Salam Sənan müəllim! SananHistory saytınızdakı Tarix Kvestindən ${userScore}/${total} nəticə topladım. Mənə tövsiyə olunan "${rec.serviceRecommended}" proqramı üzrə qeydiyyatdan keçmək istəyirəm.`);
    ctaBtn.href = `https://wa.me/994500000000?text=${text}`;
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  userScore = 0;
  userAnswers = [];

  const quizActiveBox = document.getElementById('quizActiveBox');
  const quizResultBox = document.getElementById('quizResultBox');

  if (quizActiveBox && quizResultBox) {
    quizResultBox.classList.add('hidden');
    quizActiveBox.classList.remove('hidden');
  }

  renderQuestion();
}

/* ==========================================================================
   7. Qeydiyyat Modal Pəncərəsi
   ========================================================================== */
function initModal() {
  const modal = document.getElementById('regModal');
  const openBtns = document.querySelectorAll('.open-reg-modal');
  const closeBtn = document.getElementById('closeModalBtn');
  const backdrop = document.getElementById('modalBackdrop');
  const serviceSelect = document.getElementById('modalServiceSelect');

  if (!modal) return;

  function openModal(serviceName = '') {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (serviceSelect && serviceName) {
      serviceSelect.value = serviceName;
    }
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openModal(service);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Modal Daxili Form İdarəetməsi
  const modalForm = document.getElementById('modalRegForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName').value.trim();
      const phone = document.getElementById('modalPhone').value.trim();
      const service = document.getElementById('modalServiceSelect').value;
      const note = document.getElementById('modalNote').value.trim();

      if (!name || !phone) {
        showToast('Zəhmət olmasa Ad və Telefon nömrənizi qeyd edin!', 'error');
        return;
      }

      const msg = `Salam Sənan müəllim! Mən SananHistory saytınızdan qeydiyyatdan keçmək istəyirəm.%0A%0A👤 *Ad:* ${encodeURIComponent(name)}%0A📱 *Telefon:* ${encodeURIComponent(phone)}%0A📚 *Seçilən Xidmət:* ${encodeURIComponent(service)}%0A📝 *Qeyd:* ${encodeURIComponent(note || 'Qeyd yoxdur')}`;
      
      showToast('WhatsApp-a yönləndirilirsiniz...', 'success');
      setTimeout(() => {
        window.open(`https://wa.me/994500000000?text=${msg}`, '_blank');
        closeModal();
        modalForm.reset();
      }, 700);
    });
  }
}

/* ==========================================================================
   8. Səhifənin Əsas Əlaqə Formu
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('mainContactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const service = document.getElementById('contactService').value;
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !phone) {
      showToast('Zəhmət olmasa Ad və Telefon sahələrini doldurun!', 'error');
      return;
    }

    const msg = `Salam Sənan müəllim! SananHistory saytınızdan müraciət edirəm:%0A%0A👤 *Ad:* ${encodeURIComponent(name)}%0A📱 *Telefon:* ${encodeURIComponent(phone)}%0A📚 *Hazırlıq İstiqaməti:* ${encodeURIComponent(service)}%0A💬 *Mesaj:* ${encodeURIComponent(message || 'Əlaqə saxlamağınızı xahiş edirəm.')}`;
    
    showToast('Təşəkkürlər! WhatsApp-a yönləndirilirsiniz...', 'success');
    setTimeout(() => {
      window.open(`https://wa.me/994500000000?text=${msg}`, '_blank');
      contactForm.reset();
    }, 700);
  });
}

/* ==========================================================================
   9. Toast Bildiriş Sistemi
   ========================================================================== */
function showToast(message, type = 'info') {
  const existing = document.getElementById('customToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'customToast';
  toast.className = `fixed top-6 right-6 z-[9999] px-6 py-3.5 rounded-xl border text-sm font-medium shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-[-20px] opacity-0 ${
    type === 'success' 
      ? 'bg-[#1C1008] border-emerald-500 text-emerald-300 shadow-emerald-950/50' 
      : 'bg-[#1C1008] border-[#E28743] text-[#FAF6F0] shadow-[#E28743]/20'
  }`;

  const icon = type === 'success' ? 'fa-circle-check text-emerald-400' : 'fa-circle-info text-[#E28743]';
  toast.innerHTML = `<i class="fa-solid ${icon} text-lg"></i> <span>${message}</span>`;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-[-20px]', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-[-20px]', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
