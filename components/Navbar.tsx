'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
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
      <div className="nav-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        
        {/* LEFT: Logo */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <a
            href="#hero"
            className="nav-logo"
            aria-label="Go to top"
            onClick={(e) => { e.preventDefault(); lazyScroll('#hero'); }}
            style={{ textDecoration: 'none' }}
          >
            <span className="font-display neon" style={{ fontSize: '1.4rem', fontWeight: 400, letterSpacing: '1px' }}>{t('hero.name.first')}</span>
          </a>
        </div>

        {/* CENTER: Links */}
        <div className="nav-links nav-links-desktop" style={{ flex: 2, display: 'flex', justifyContent: 'center', gap: 40 }}>
          {links.map((link, i) => (
            <a
              key={link.key}
              href={link.href}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                lazyScroll(link.href);
              }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'var(--text)',
                textDecoration: 'none',
                animation: `fade-down 0.5s ${i * 0.1}s ease forwards`,
                opacity: 0,
                transform: 'translateY(-10px)'
              }}
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        {/* RIGHT: Controls */}
        <div className="nav-controls" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 16 }}>
          <button
            onClick={toggleLang}
            className="ctrl-btn desktop-lang"
            aria-label={lang === 'en' ? 'Switch to Arabic language' : 'Switch to English language'}
            style={{
              background: 'transparent', border: 'none',
              color: 'var(--text-secondary)', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--secondary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>

          <a
            href="#contact"
            className="btn-primary desktop-cta"
            onClick={(e) => { e.preventDefault(); lazyScroll('#contact'); }}
            style={{ padding: '10px 24px', fontSize: 13 }}
          >
            {t('nav.contact')}
          </a>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{
              width: 36, height: 36, borderRadius: 8,
              border: '2px solid var(--border)', background: 'transparent',
              color: 'var(--text-secondary)', cursor: 'pointer',
              display: 'none', alignItems: 'center', justifyContent: 'center',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <style jsx>{`
        .hamburger-btn {
          display: none !important;
        }
        @media (max-width: 768px) {
          .nav-links-desktop, .desktop-cta, .desktop-lang {
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
            border: '2px solid var(--border)', background: 'var(--surface)',
            color: 'var(--text)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
        >
          <X size={22} />
        </button>

        {/* Mobile Language Switch */}
        <button
          onClick={() => { toggleLang(); setMenuOpen(false); }}
          style={{
            background: 'var(--primary-dim)', border: '2px solid var(--primary)',
            color: 'var(--primary)', cursor: 'pointer', borderRadius: 100, padding: '8px 32px',
            fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.4s ease',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(24px)',
            transitionDelay: '0.05s',
            marginBottom: 20
          }}
        >
          {lang === 'en' ? 'ARABIC (AR)' : 'ENGLISH (EN)'}
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
              fontSize: 'clamp(22px, 5vw, 30px)',
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
