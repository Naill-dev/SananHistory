document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const header = document.getElementById('mainHeader');
    const counters = document.querySelectorAll('.stat-counter');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    const accordionItems = document.querySelectorAll('.accordion-item');
    const modal = document.getElementById('regModal');
    const modalOpenBtns = document.querySelectorAll('.open-reg-modal');
    const modalClose = document.getElementById('closeModalBtn');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const contactForm = document.getElementById('mainContactForm');
    const modalForm = document.getElementById('modalRegForm');

    // === Mobil Menyu ===
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileBtn.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // === Header Scroll Effekti ===
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('bg-neutral-950/90', window.scrollY > 50);
            header.classList.toggle('backdrop-blur-md', window.scrollY > 50);
            header.classList.toggle('shadow-lg', window.scrollY > 50);
            header.classList.toggle('border-b', window.scrollY > 50);
            header.classList.toggle('border-[#6B4226]/40', window.scrollY > 50);
        });
    }

    // === Sayğac Animasiyası (Müasir Intersection Observer) ===
    if (counters.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        const target = parseInt(counter.dataset.target);
                        const suffix = counter.dataset.suffix || '';
                        let current = 0;
                        const duration = 1800;
                        const step = Math.max(1, Math.floor(target / (duration / 16)));
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                counter.textContent = target + suffix;
                                clearInterval(timer);
                            } else {
                                counter.textContent = current + suffix;
                            }
                        }, 16);
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        observer.observe(document.getElementById('statsSection'));
    }

    // === Xidmət Filtrləri ===
    if (filterBtns.length && serviceCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('bg-[#E28743]', 'text-white', 'shadow-lg');
                    b.classList.add('bg-[#27170D]', 'text-[#D4C3B3]');
                });
                btn.classList.remove('bg-[#27170D]', 'text-[#D4C3B3]');
                btn.classList.add('bg-[#E28743]', 'text-white', 'shadow-lg');
                const filter = btn.dataset.filter;
                serviceCards.forEach(card => {
                    const category = card.dataset.category;
                    card.classList.toggle('hidden', filter !== 'all' && category !== filter);
                });
            });
        });
    }

    // === FAQ Accordion ===
    if (accordionItems.length) {
        accordionItems.forEach(item => {
            const headerBtn = item.querySelector('.accordion-header');
            if (headerBtn) {
                headerBtn.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    accordionItems.forEach(other => {
                        other.classList.remove('active');
                        const icon = other.querySelector('.accordion-icon');
                        if (icon) icon.style.transform = 'rotate(0deg)';
                    });
                    if (!isActive) {
                        item.classList.add('active');
                        const icon = item.querySelector('.accordion-icon');
                        if (icon) icon.style.transform = 'rotate(180deg)';
                    }
                });
            }
        });
    }

    // === Quiz Sistemi ===
    let currentQuestion = 0;
    let score = 0;

    function renderQuestion() {
        const container = document.getElementById('quizQuestionContainer');
        const progress = document.getElementById('quizProgressBar');
        const nextBtn = document.getElementById('quizNextBtn');
        if (!container || typeof historyQuizData === 'undefined') return;
        const q = historyQuizData[currentQuestion];
        if (!q) return;
        document.getElementById('quizCurrentNum').textContent = currentQuestion + 1;
        progress.style.width = ((currentQuestion / historyQuizData.length) * 100) + '%';
        nextBtn.disabled = true;
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
        nextBtn.textContent = currentQuestion === historyQuizData.length - 1 ? 'Nəticəni Gör' : 'Növbəti Sual';
        container.innerHTML = `
            <div class="space-y-4">
                <div class="inline-block px-3 py-1 rounded-full text-xs font-semibold badge-neon mb-2">
                    <i class="fa-solid fa-scroll mr-1.5 text-[#E28743]"></i> ${q.category}
                </div>
                <h3 class="text-xl md:text-2xl font-bold text-[#FAF6F0] leading-snug">${q.question}</h3>
                <div class="grid grid-cols-1 gap-3 pt-2">
                    ${q.options.map((opt, idx) => `
                        <button type="button" class="quiz-option text-left p-4 rounded-xl border border-[#6B4226]/40 bg-[#1E1108]/70 hover:border-[#E28743] transition-all flex items-start gap-3.5 group" data-index="${idx}">
                            <span class="w-7 h-7 rounded-full bg-[#3E2415] text-[#DDA15E] flex items-center justify-center font-bold text-sm shrink-0 border border-[#6B4226]/60 group-hover:bg-[#E28743] group-hover:text-white transition-colors">${String.fromCharCode(65 + idx)}</span>
                            <span class="text-[#D4C3B3] text-sm md:text-base font-medium group-hover:text-white transition-colors">${opt}</span>
                        </button>
                    `).join('')}
                </div>
                <div id="explanationBox" class="hidden p-4 rounded-xl border border-[#6B4226]/50 bg-[#1A0E07] text-sm text-[#D4C3B3]"></div>
            </div>
        `;
        container.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                const correct = q.correct;
                const isCorrect = idx === correct;
                container.querySelectorAll('.quiz-option').forEach(b => {
                    b.disabled = true;
                    const bi = parseInt(b.dataset.index);
                    if (bi === correct) b.classList.add('correct');
                    else if (bi === idx && !isCorrect) b.classList.add('incorrect');
                });
                if (isCorrect) score++;
                const exp = document.getElementById('explanationBox');
                exp.classList.remove('hidden');
                exp.innerHTML = `<div class="flex items-start gap-2.5"><i class="fa-solid fa-lightbulb text-[#E28743] text-lg mt-0.5"></i><div><strong class="text-white block mb-1">İzah:</strong><span>${q.explanation}</span></div></div>`;
                nextBtn.disabled = false;
                nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            });
        });
    }

    function showResults() {
        document.getElementById('quizActiveBox').classList.add('hidden');
        document.getElementById('quizResultBox').classList.remove('hidden');
        document.getElementById('quizProgressBar').style.width = '100%';
        const total = historyQuizData.length;
        const pct = Math.round((score / total) * 100);
        let badge, title, desc, service, color;
        if (pct >= 80) { badge = 'Tarix Ustadı'; title = 'Mükəmməl!'; desc = 'Siz tarix sahəsində əla bilik səviyyəsinə sahibsiniz. Sənan müəllimin "Olimpiada" və "MİQ" proqramları sizin üçün idealdır.'; service = 'Olimpiada Hazırlığı'; color = 'border-emerald-400 text-emerald-300 bg-emerald-500/10'; }
        else if (pct >= 60) { badge = 'Tarix Həvəskarı'; title = 'Yaxşı Nəticə!'; desc = 'Tarixi bilikləriniz kifayət qədər yaxşıdır. "Abituriyent IX-XI" və "Lisey" proqramları ilə zirvəyə çata bilərsiniz.'; service = 'Abituriyent IX-XI Sinif'; color = 'border-amber-400 text-amber-300 bg-amber-500/10'; }
        else if (pct >= 40) { badge = 'Tarix Axtarışında'; title = 'İrəliləmək Üçün Yeriniz Var'; desc = 'Tarixi dərk etmək üçün doğru yoldasınız. "Təkmilləşdirmə" və "Onlayn Dərslər" proqramları ilə mövqeyinizi gücləndirin.'; service = 'Təkmilləşdirmə Hazırlığı'; color = 'border-orange-400 text-orange-300 bg-orange-500/10'; }
        else { badge = 'Tarix Yolçusu'; title = 'Başlanğıc Səviyyəsi'; desc = 'Hər böyük uğur bir addımla başlayır. "Təkmilləşdirmə" və "Fərdi Dərslər" ilə tarixi sevməyə başlayın.'; service = 'Təkmilləşdirmə Hazırlığı'; color = 'border-rose-400 text-rose-300 bg-rose-500/10'; }
        document.getElementById('quizResultBadge').className = `inline-block px-4 py-1.5 rounded-full text-xs font-bold border ${color} uppercase tracking-wider mb-2`;
        document.getElementById('quizResultBadge').textContent = badge;
        document.getElementById('quizResultTitle').textContent = title;
        document.getElementById('quizScoreText').textContent = `${score} / ${total}`;
        document.getElementById('quizResultDesc').textContent = desc;
        const waBtn = document.getElementById('quizResultWhatsAppBtn');
        const msg = encodeURIComponent(`Salam Sənan müəllim! SananHistory Tarix Kvestindən ${score}/${total} nəticə topladım. "${service}" proqramına yazılmaq istəyirəm.`);
        waBtn.href = `https://wa.me/9940708623827?text=${msg}`;
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        document.getElementById('quizResultBox').classList.add('hidden');
        document.getElementById('quizActiveBox').classList.remove('hidden');
        renderQuestion();
    }

    window.initQuiz = function() {
        if (typeof historyQuizData !== 'undefined') {
            renderQuestion();
            document.getElementById('quizNextBtn').addEventListener('click', () => {
                if (currentQuestion < historyQuizData.length - 1) { currentQuestion++; renderQuestion(); }
                else showResults();
            });
            document.getElementById('quizRestartBtn').addEventListener('click', restartQuiz);
        }
    };
    window.initQuiz();

    // === Modal ===
    function openModal(service = '') {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        if (service && document.getElementById('modalServiceSelect')) {
            document.getElementById('modalServiceSelect').value = service;
        }
    }
    function closeModalFn() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
    if (modal) {
        modalOpenBtns.forEach(btn => btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(btn.dataset.service || '');
        }));
        if (modalClose) modalClose.addEventListener('click', closeModalFn);
        if (modalBackdrop) modalBackdrop.addEventListener('click', closeModalFn);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModalFn(); });
    }

    // === Formlar ===
    function handleFormSubmit(e, form, fields) {
        e.preventDefault();
        const values = fields.map(id => document.getElementById(id).value.trim());
        if (values.some(v => !v)) { showToast('Zəhmət olmasa bütün vacib sahələri doldurun!', 'error'); return; }
        const [name, phone, service, note] = values;
        const msg = `Salam Sənan müəllim! SananHistory saytından müraciət:%0A👤 Ad: ${encodeURIComponent(name)}%0A📱 Telefon: ${encodeURIComponent(phone)}%0A📚 Xidmət: ${encodeURIComponent(service)}%0A💬 Qeyd: ${encodeURIComponent(note || 'Yoxdur')}`;
        showToast('WhatsApp-a yönləndirilirsiniz...', 'success');
        setTimeout(() => {
            window.open(`https://wa.me/9940708623827?text=${msg}`, '_blank');
            form.reset();
            closeModalFn();
        }, 600);
    }

    if (modalForm) {
        modalForm.addEventListener('submit', (e) => handleFormSubmit(e, modalForm, ['modalName', 'modalPhone', 'modalServiceSelect', 'modalNote']));
    }
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => handleFormSubmit(e, contactForm, ['contactName', 'contactPhone', 'contactService', 'contactMessage']));
    }

    // === Toast ===
    function showToast(message, type = 'info') {
        const old = document.getElementById('customToast');
        if (old) old.remove();
        const toast = document.createElement('div');
        toast.id = 'customToast';
        const isSuccess = type === 'success';
        toast.className = `fixed top-6 right-6 z-[9999] px-6 py-3.5 rounded-xl border text-sm font-medium shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-[-20px] opacity-0 ${isSuccess ? 'bg-[#1C1008] border-emerald-500 text-emerald-300' : 'bg-[#1C1008] border-[#E28743] text-[#FAF6F0]'}`;
        toast.innerHTML = `<i class="fa-solid ${isSuccess ? 'fa-circle-check text-emerald-400' : 'fa-circle-info text-[#E28743]'} text-lg"></i><span>${message}</span>`;
        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-[-20px]', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');
        });
        setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-[-20px]', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
    window.showToast = showToast;
});
