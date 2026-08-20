const TEACHER_PHONE = "994708623827";

document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initMobileMenu();
  initHeaderScroll();
  initStatsCounter();
  initServiceFilter();
  initFAQAccordion();
  initQuiz();
  initModal();
  initContactForm();
});

function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }
}

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileMenuBtn || !mobileMenu) return;

  const toggleMenu = (show) => {
    const isHidden = show !== undefined ? !show : !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', isHidden);
    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars', isHidden);
      icon.classList.toggle('fa-xmark', !isHidden);
    }
  };

  mobileMenuBtn.addEventListener('click', () => toggleMenu());
  mobileNavLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));
}

function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  const handleScroll = () => {
    const isScrolled = window.scrollY > 30;
    header.classList.toggle('bg-[#18110B]/98', isScrolled);
    header.classList.toggle('shadow-lg', isScrolled);
    header.classList.toggle('border-b', isScrolled);
    header.classList.toggle('border-[#5C3D28]/40', isScrolled);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-counter');
  const statsSection = document.getElementById('statsSection');
  if (!counters.length || !statsSection) return;

  let animated = false;

  function runCounter() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      if (!target) return;
      const duration = 1200;
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

  const checkScroll = () => {
    if (animated) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.9) {
      runCounter();
      animated = true;
      window.removeEventListener('scroll', checkScroll);
    }
  };

  window.addEventListener('scroll', checkScroll, { passive: true });
}

function initServiceFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#82583C]', 'text-white', 'shadow-md');
        b.classList.add('bg-[#2B1E15]', 'text-[#D1C2B4]');
      });
      btn.classList.remove('bg-[#2B1E15]', 'text-[#D1C2B4]');
      btn.classList.add('bg-[#82583C]', 'text-white', 'shadow-md');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

function initFAQAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

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

let currentQuestionIndex = 0;
let userScore = 0;
let userAnswers = [];

function initQuiz() {
  renderQuestion();

  const nextBtn = document.getElementById('quizNextBtn');
  const restartBtn = document.getElementById('quizRestartBtn');

  if (nextBtn) nextBtn.addEventListener('click', handleNextQuestion);
  if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
}

function renderQuestion() {
  const container = document.getElementById('quizQuestionContainer');
  const counterEl = document.getElementById('quizCurrentNum');
  const progressBar = document.getElementById('quizProgressBar');
  const nextBtn = document.getElementById('quizNextBtn');

  if (!container || typeof historyQuizData === 'undefined' || !historyQuizData.length) return;

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
    nextBtn.textContent = currentQuestionIndex === historyQuizData.length - 1 ? 'Nəticəyə Bax' : 'Növbəti Sual';
  }

  container.innerHTML = `
    <div class="space-y-4">
      <div class="inline-block px-3 py-1 rounded-full text-xs font-semibold badge-academic mb-1">
        <i class="fa-solid fa-scroll mr-1.5 text-[#DFB287]"></i> ${currentQ.category}
      </div>
      <h3 class="text-base sm:text-lg font-bold text-[#FDFCFA] leading-snug">
        ${currentQ.question}
      </h3>
      <div class="grid grid-cols-1 gap-2.5 pt-2">
        ${currentQ.options.map((opt, idx) => `
          <button type="button" class="quiz-option text-left p-3.5 rounded-xl border border-[#5C3D28]/35 bg-[#20150E] hover:border-[#C68B59] transition-all flex items-start gap-3 group" data-index="${idx}">
            <span class="w-6 h-6 rounded-full bg-[#3D281B] text-[#DFB287] flex items-center justify-center font-bold text-xs shrink-0 border border-[#5C3D28] group-hover:bg-[#C68B59] group-hover:text-white transition-colors">
              ${String.fromCharCode(65 + idx)}
            </span>
            <span class="text-[#D1C2B4] text-xs sm:text-sm font-medium group-hover:text-white transition-colors">
              ${opt}
            </span>
          </button>
        `).join('')}
      </div>
      <div id="explanationBox" class="hidden p-3 rounded-xl border border-[#5C3D28]/50 bg-[#1A1009] text-xs text-[#D1C2B4]"></div>
    </div>
  `;

  const optionButtons = container.querySelectorAll('.quiz-option');
  optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedIndex = parseInt(btn.getAttribute('data-index'), 10);
      handleOptionSelect(selectedIndex, optionButtons, currentQ);
    });
  });
}

function handleOptionSelect(selectedIndex, optionButtons, currentQ) {
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

  if (isCorrect) userScore++;

  const expBox = document.getElementById('explanationBox');
  if (expBox) {
    expBox.classList.remove('hidden');
    expBox.innerHTML = `
      <div class="flex items-start gap-2">
        <i class="fa-solid fa-circle-info text-[#DFB287] text-sm mt-0.5"></i>
        <div>
          <strong class="text-white block mb-0.5">İzah:</strong>
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
  const rec = typeof getQuizRecommendation === 'function' ? getQuizRecommendation(userScore, total) : {
    badge: "Nəticə",
    badgeColor: "border-[#DFB287] text-[#DFB287]",
    title: "Test Yekunlaşdı!",
    description: "Təbriklər, testi tamamladınız."
  };

  if (scoreEl) scoreEl.textContent = `${userScore} / ${total}`;
  if (badgeEl) {
    badgeEl.className = `inline-block px-3.5 py-1 rounded-full text-xs font-semibold border ${rec.badgeColor} mb-2`;
    badgeEl.textContent = rec.badge;
  }
  if (titleEl) titleEl.textContent = rec.title;
  if (descEl) descEl.textContent = rec.description;

  if (ctaBtn) {
    const message = `Salam Sənan müəllim, SananHistory saytınızdakı biliyi yoxlama testindən ${userScore}/${total} nəticə əldə etdim. Hazırlıq dərsləri barədə məlumat almaq istəyirəm.`;
    ctaBtn.href = `https://wa.me/${TEACHER_PHONE}?text=${encodeURIComponent(message)}`;
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
      const options = Array.from(serviceSelect.options);
      const match = options.find(opt => opt.value.toLowerCase().includes(serviceName.toLowerCase()) || opt.text.toLowerCase().includes(serviceName.toLowerCase()));
      if (match) serviceSelect.value = match.value;
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

  const modalForm = document.getElementById('modalRegForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName').value.trim();
      const phone = document.getElementById('modalPhone').value.trim();
      const service = document.getElementById('modalServiceSelect').value;
      const note = document.getElementById('modalNote').value.trim();

      if (!name || !phone) return;

      const message = `Salam Sənan müəllim, dərslərə yazılmaq üçün müraciət edirəm:\n\n👤 *Ad:* ${name}\n📱 *Əlaqə:* ${phone}\n📚 *Seçilən Hazırlıq:* ${service}\n📝 *Qeyd:* ${note || 'Yoxdur'}`;
      
      window.open(`https://wa.me/${TEACHER_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
      closeModal();
      modalForm.reset();
    });
  }
}

function initContactForm() {
  const contactForm = document.getElementById('mainContactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const service = document.getElementById('contactService').value;
    const messageText = document.getElementById('contactMessage').value.trim();

    if (!name || !phone) return;

    const message = `Salam Sənan müəllim, hazırlıq barədə məlumat almaq istəyirəm:\n\n👤 *Ad:* ${name}\n📱 *Telefon:* ${phone}\n📚 *Hazırlıq İstiqaməti:* ${service}\n💬 *Qeyd:* ${messageText || 'Məlumat almaq istəyirəm.'}`;
    
    window.open(`https://wa.me/${TEACHER_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
    contactForm.reset();
  });
}
