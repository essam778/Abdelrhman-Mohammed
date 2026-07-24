/* ============================================
   ABDULRAHMAN MOHAMED — AI ENGINEER PORTFOLIO v2
   Main JavaScript
   ============================================ */

'use strict';

// ============================================
// 1. NEURAL NETWORK PARTICLE BACKGROUND
// ============================================
class NeuralNetwork {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000 };
    this.count = 80;

    this.resize();
    this.init();
    this.animate();

    window.addEventListener('resize', () => this.resize());

    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
  }

  init() {
    for (let i = 0; i < this.count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.2,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const linkColor = theme === 'dark' ? '0, 240, 255' : '0, 153, 168';
    const dotColor = theme === 'dark' ? '0, 240, 255' : '0, 153, 168';

    // Update & draw particles
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${dotColor}, ${p.opacity})`;
      this.ctx.fill();
    }

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 160) {
          const opacity = (1 - dist / 160) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(${linkColor}, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    // Draw mouse connections
    for (const p of this.particles) {
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 180) {
        const opacity = (1 - dist / 180) * 0.25;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.strokeStyle = `rgba(${linkColor}, ${opacity})`;
        this.ctx.lineWidth = 0.8;
        this.ctx.stroke();
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// 2. CUSTOM CURSOR
// ============================================
class CustomCursor {
  constructor() {
    this.cursor = document.getElementById('cursor');
    this.trail = document.getElementById('cursorTrail');
    this.mx = 0;
    this.my = 0;
    this.tx = 0;
    this.ty = 0;

    document.addEventListener('mousemove', (e) => {
      this.mx = e.clientX;
      this.my = e.clientY;
      this.cursor.style.left = this.mx + 'px';
      this.cursor.style.top = this.my + 'px';
    });

    this.animate();

    // Hover effects
    const hoverTargets = document.querySelectorAll('a, button, .project-card, .cert-card, .skill-chip, .skill-category, .detail-row, .ctrl-btn, .social-link');
    for (const el of hoverTargets) {
      el.addEventListener('mouseenter', () => {
        this.trail.style.width = '56px';
        this.trail.style.height = '56px';
        this.trail.style.borderColor = 'var(--secondary)';
        this.trail.style.background = 'rgba(124, 58, 237, 0.05)';
      });
      el.addEventListener('mouseleave', () => {
        this.trail.style.width = '40px';
        this.trail.style.height = '40px';
        this.trail.style.borderColor = 'var(--primary)';
        this.trail.style.background = 'rgba(0, 240, 255, 0.03)';
      });
    }
  }

  animate() {
    this.tx += (this.mx - this.tx) * 0.12;
    this.ty += (this.my - this.ty) * 0.12;
    this.trail.style.left = this.tx + 'px';
    this.trail.style.top = this.ty + 'px';
    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// 3. TYPING EFFECT
// ============================================
class TypingEffect {
  constructor() {
    this.el = document.getElementById('terminalText');
    this.phrases = [
      'whoami = "AI Engineer"',
      'cat /etc/Abdulrahman',
      'print("Hello, World!")',
      'pip install intelligence',
      'import tensorflow as tf',
      'model.fit(X, y)',
    ];
    this.phraseIdx = 0;
    this.charIdx = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.phrases[this.phraseIdx];

    if (!this.isDeleting) {
      this.charIdx++;
      this.el.textContent = current.substring(0, this.charIdx);

      if (this.charIdx === current.length) {
        this.isDeleting = true;
        setTimeout(() => this.type(), 2000);
        return;
      }
    } else {
      this.charIdx--;
      this.el.textContent = current.substring(0, this.charIdx);

      if (this.charIdx === 0) {
        this.isDeleting = false;
        this.phraseIdx = (this.phraseIdx + 1) % this.phrases.length;
      }
    }

    const speed = this.isDeleting ? 30 : 70;
    setTimeout(() => this.type(), speed);
  }
}

// ============================================
// 4. 3D TILT EFFECT ON CARDS
// ============================================
class TiltEffect {
  constructor() {
    this.cards = document.querySelectorAll('[data-tilt]');
    for (const card of this.cards) {
      card.addEventListener('mousemove', (e) => this.handleTilt(e, card));
      card.addEventListener('mouseleave', (e) => this.resetTilt(e, card));

      // Glow follow
      const glow = card.querySelector('.project-glow');
      if (glow) {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          glow.style.setProperty('--mx', x + '%');
          glow.style.setProperty('--my', y + '%');
        });
      }
    }
  }

  handleTilt(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  resetTilt(e, card) {
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }
}

// ============================================
// 5. SCROLL PROGRESS BAR
// ============================================
class ScrollProgress {
  constructor() {
    this.bar = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => this.update());
    this.update();
  }

  update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    this.bar.style.width = Math.min(progress, 100) + '%';
  }
}

// ============================================
// 6. SCROLL REVEAL (Intersection Observer)
// ============================================
class ScrollReveal {
  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    });

    document.querySelectorAll('.reveal').forEach((el) => this.observer.observe(el));
  }
}

// ============================================
// 7. ANIMATED STAT COUNTERS
// ============================================
class StatCounter {
  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.stat-num');
          for (const counter of counters) {
            this.animateCounter(counter);
          }
          this.observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.about-stats');
    if (statsContainer) {
      this.observer.observe(statsContainer);
    }
  }

  animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }
}

// ============================================
// 8. SKILL RING ANIMATION
// ============================================
class SkillRings {
  constructor() {
    // Reset all rings to 0 initially for animation
    document.querySelectorAll('.ring-fill').forEach((fill) => {
      fill.style.strokeDasharray = '0, 100';
    });

    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-ring').forEach((ring) => {
            const pct = ring.dataset.pct;
            const fill = ring.querySelector('.ring-fill');
            if (fill) {
              fill.style.strokeDasharray = `${pct}, 100`;
            }
          });
          this.observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach((el) => this.observer.observe(el));
  }
}

// ============================================
// 9. THEME TOGGLE
// ============================================
class ThemeToggle {
  constructor() {
    this.btn = document.getElementById('themeToggle');
    this.currentTheme = localStorage.getItem('theme') || 'dark';

    this.applyTheme(this.currentTheme);

    this.btn.addEventListener('click', () => {
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.applyTheme(this.currentTheme);
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update skill ring gradient colors for theme
    const isLight = theme === 'light';
    const color1 = isLight ? '#0099a8' : '#00f0ff';
    const color2 = isLight ? '#6d28d9' : '#7c3aed';
    const stops = document.querySelectorAll('#skillGradient stop');
    if (stops.length >= 2) {
      stops[0].setAttribute('stop-color', color1);
      stops[1].setAttribute('stop-color', color2);
    }
  }
}

// ============================================
// 10. LANGUAGE TOGGLE
// ============================================
class LanguageToggle {
  constructor() {
    this.btn = document.getElementById('langToggle');
    this.currentLang = localStorage.getItem('lang') || 'en';

    this.translations = {
      en: {
        'nav-about': 'About',
        'nav-skills': 'Skills',
        'nav-work': 'Work',
        'nav-xp': 'Experience',
        'nav-contact': 'Contact',
        'nav-avail': 'Available',
        'hero-badge': 'AI Engineer & Data Scientist',
        'hero-sub': 'Architecting intelligent systems at the intersection of <span>machine learning</span>, <span>deep learning</span> &amp; <span>embedded systems</span>. Based in <span>Benha, Egypt</span>.',
        'hero-view': 'View Work',
        'hero-talk': "Let's Talk",
        'exp-pro': 'Professional Experience',
        'exp-cert': 'Certifications &amp; Volunteering',
        'exp-coach-date': 'Apr 2026 – Present',
        'exp-coach-title': 'Freelancing Coach',
        'exp-coach-d1': 'Mentoring over 100 students in Generative AI and Freelancing tracks.',
        'exp-coach-d2': 'Simplifying complex AI concepts into actionable career steps.',
        'contact-sub': "Open to internships, entry-level AI/ML roles, and collaboration. Let's connect.",
      },
      ar: {
        'nav-about': 'عني',
        'nav-skills': 'مهاراتي',
        'nav-work': 'أعمالي',
        'nav-xp': 'خبرتي',
        'nav-contact': 'تواصل',
        'nav-avail': 'متاح',
        'hero-badge': 'مهندس ذكاء اصطناعي وعالم بيانات',
        'hero-sub': 'بناء أنظمة ذكية في تقاطع <span>تعلم الآلة</span>، <span>التعلم العميق</span> و <span>الأنظمة المدمجة</span>. مقرنا في <span>بنها، مصر</span>.',
        'hero-view': 'عرض الأعمال',
        'hero-talk': 'لنتحدث',
        'exp-pro': 'الخبرة المهنية',
        'exp-cert': 'الشهادات والتطوع',
        'exp-coach-date': 'أبريل 2026 – الحالي',
        'exp-coach-title': 'مدرب عمل حر',
        'exp-coach-d1': 'توجيه أكثر من 100 طالب في مسارات الذكاء الاصطناعي التوليدي والعمل الحر.',
        'exp-coach-d2': 'تبسيط مفاهيم الذكاء الاصطناعي المعقدة إلى خطوات مهنية عملية.',
        'contact-sub': 'متاح للتدريب ووظائف AI/ML المبتدئة والتعاون. دعنا نتواصل.',
      },
    };

    this.applyLanguage(this.currentLang);

    this.btn.addEventListener('click', () => {
      this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
      this.applyLanguage(this.currentLang);
    });
  }

  applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.btn.textContent = lang === 'en' ? 'AR' : 'EN';

    const t = this.translations[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.innerHTML = t[key];
      }
    });

    localStorage.setItem('lang', lang);
  }
}

// ============================================
// 11. NAVBAR SCROLL EFFECT
// ============================================
class NavbarScroll {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.lastScroll = 0;

    window.addEventListener('scroll', () => this.handleScroll());
    this.handleScroll();
  }

  handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
    this.lastScroll = scrollY;
  }
}

// ============================================
// 12. NEURAL SPHERE PARALLAX
// ============================================
class SphereParallax {
  constructor() {
    this.sphere = document.getElementById('neuralSphere');
    if (!this.sphere) return;

    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      this.sphere.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
}

// ============================================
// 13. SMOOTH ANCHOR SCROLL
// ============================================
class SmoothScroll {
  constructor() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}

// ============================================
// 14. PARALLAX ON SCROLL
// ============================================
class ScrollParallax {
  constructor() {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;

      // Subtle parallax on hero content
      const heroContent = document.querySelector('.hero-content');
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
      }
    });
  }
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Init all modules
  const canvas = document.getElementById('neuralCanvas');
  if (canvas) new NeuralNetwork(canvas);

  new CustomCursor();
  new TypingEffect();
  new TiltEffect();
  new ScrollProgress();
  new ScrollReveal();
  new StatCounter();
  new SkillRings();
  new ThemeToggle();
  new LanguageToggle();
  new NavbarScroll();
  new SphereParallax();
  new SmoothScroll();
  new ScrollParallax();
});
