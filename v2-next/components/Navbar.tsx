'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function lazyScroll(targetId: string) {
  const target = document.querySelector(targetId);
  if (!target) return;
  const targetY = target.getBoundingClientRect().top + window.scrollY - 80;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 1200; // 1.2 seconds for a lazy, slow scroll
  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * ease);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    function handleScroll() {
      if (window.scrollY > 50 || menuOpen) {
        nav!.classList.add('scrolled');
      } else {
        nav!.classList.remove('scrolled');
      }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { key: 'nav.about', href: '#about' },
    { key: 'nav.skills', href: '#skills' },
    { key: 'nav.work', href: '#projects' },
    { key: 'nav.experience', href: '#experience' },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <>
      <nav id="navbar" className="navbar" aria-label="Main navigation">
      <div className="nav-inner">
        <a
          href="#hero"
          className="nav-logo"
          aria-label="Go to top - Abdulrahman Mohamed Portfolio"
          onClick={(e) => { e.preventDefault(); lazyScroll('#hero'); }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}
        >
          <span style={{ color: 'var(--text-muted)', fontWeight: 300 }}>&lt;</span>
          <span style={{ background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>{t('hero.name.first')}</span>
          <span style={{ color: 'var(--text-muted)', fontWeight: 300 }}>/&gt;</span>
        </a>

        <div className="nav-links nav-links-desktop" style={{ display: 'flex', gap: 32 }}>
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                lazyScroll(link.href);
              }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                textDecoration: 'none',
              }}
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        <div className="nav-controls" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="nav-badge" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '1.5px',
            textTransform: 'uppercase', color: 'var(--primary)',
            padding: '6px 14px', border: '1px solid rgba(0,240,255,0.2)',
            borderRadius: 100,
          }}>
            <span style={{
              width: 6, height: 6, background: 'var(--primary)',
              borderRadius: '50%', animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            <span>{t('nav.available')}</span>
          </div>

          <button
            onClick={toggleTheme}
            className="ctrl-btn"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              width: 36, height: 36, borderRadius: 8,
              border: '1px solid var(--border)', background: 'transparent',
              color: 'var(--text-secondary)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }} aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }} aria-hidden="true">
                <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            )}
          </button>

          <button
            onClick={toggleLang}
            className="ctrl-btn"
            aria-label={lang === 'en' ? 'Switch to Arabic language' : 'Switch to English language'}
            style={{
              height: 36, borderRadius: 8, padding: '0 10px',
              border: '1px solid var(--border)', background: 'transparent',
              color: 'var(--text-secondary)', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{
              width: 36, height: 36, borderRadius: 8,
              border: '1px solid var(--border)', background: 'transparent',
              color: 'var(--text-secondary)', cursor: 'pointer',
              display: 'none', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }} aria-hidden="true">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <style jsx>{`
        .hamburger-btn {
          display: none !important;
        }
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
          .nav-badge {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>
    </nav>

      {/* Fullscreen mobile overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal={menuOpen}
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          background: 'rgba(5, 5, 10, 0.95)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 40,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}>
        {/* Close X button on overlay */}
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: 'absolute', top: 20, right: 20,
            width: 44, height: 44, borderRadius: 12,
            border: '1px solid var(--border)', background: 'var(--surface)',
            color: 'var(--text)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 22, height: 22 }}>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {links.map((link, i) => (
          <a
            key={link.key}
            href={link.href}
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              setTimeout(() => {
                lazyScroll(link.href);
              }, 300);
            }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(20px, 5vw, 28px)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--text)',
              textDecoration: 'none',
              transition: 'color 0.2s, opacity 0.4s ease, transform 0.4s ease',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: `${i * 0.08}s`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
          >
            {t(link.key)}
          </a>
        ))}
      </div>

    </>
  );
}
