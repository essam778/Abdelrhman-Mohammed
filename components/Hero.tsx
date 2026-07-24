'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const phrases = [
  'whoami = "AI Engineer"',
  'cat /etc/Abdulrahman',
  'print("Hello, World!")',
  'pip install intelligence',
  'import tensorflow as tf',
  'model.fit(X, y)',
];

export default function Hero() {
  const { t } = useLanguage();
  const terminalRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;
    let phraseIdx = 0, charIdx = 0, isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function type() {
      if (!el) return;
      const current = phrases[phraseIdx];
      if (!isDeleting) {
        charIdx++;
        el.textContent = current.substring(0, charIdx);
        if (charIdx === current.length) {
          isDeleting = true;
          timeout = setTimeout(type, 2000);
          return;
        }
      } else {
        charIdx--;
        el.textContent = current.substring(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      timeout = setTimeout(type, isDeleting ? 30 : 70);
    }

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="hero" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40 }}>
      {/* Content - left side */}
      <div id="hero-content" style={{
        position: 'relative', zIndex: 3, maxWidth: 680, flex: 1,
        paddingRight: 20,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '1.5px',
          textTransform: 'uppercase', color: 'var(--primary)',
          border: '1px solid rgba(0,240,255,0.2)',
          padding: '6px 16px', borderRadius: 100, marginBottom: 24,
          animation: 'fade-up 0.8s ease forwards', opacity: 0,
        }}>
          <span style={{
            width: 6, height: 6, background: 'var(--primary)',
            borderRadius: '50%', animation: 'blink 1.5s step-end infinite',
          }} />
          {t('hero.badge')}
        </div>

        <div style={{
fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--text-muted)',
           marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8,
          animation: 'fade-up 0.8s 0.1s ease forwards', opacity: 0,
        }}>
          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>$</span>
          <span ref={terminalRef} style={{ color: 'var(--text-secondary)' }} />
          <span style={{ color: 'var(--primary)', animation: 'blink 1s step-end infinite' }}>|</span>
        </div>

        <h1 style={{ marginBottom: 16, animation: 'fade-up 0.8s 0.2s ease forwards', opacity: 0 }}>
          <span style={{
            display: 'block', fontSize: 'clamp(38px, 6.5vw, 80px)',
            fontWeight: 800, lineHeight: 0.95, letterSpacing: -3,
            color: 'var(--text)',
          }}>
            {t('hero.name.first')}
          </span>
          <span style={{
            display: 'block', fontSize: 'clamp(38px, 6.5vw, 80px)',
            fontWeight: 800, lineHeight: 0.95, letterSpacing: -3,
            background: 'var(--gradient-1)', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {t('hero.name.last')}
          </span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 14,
          color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 520,
          marginBottom: 36,
          animation: 'fade-up 0.8s 0.3s ease forwards', opacity: 0,
        }}>
          {t('hero.sub')}
        </p>

        <div style={{
          display: 'flex', gap: 14, flexWrap: 'wrap',
          animation: 'fade-up 0.8s 0.4s ease forwards', opacity: 0,
        }}>
          <a
            href="#projects"
            className="btn-primary"
            aria-label="View my work and projects"
            onClick={(e) => { e.preventDefault(); const t = document.querySelector('#projects'); if (t) { const y = t.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top: y, behavior: 'smooth' }); } }}
          >
            <span>{t('hero.viewWork')}</span>
            <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="btn-secondary"
            aria-label="Contact me"
            onClick={(e) => { e.preventDefault(); const t = document.querySelector('#contact'); if (t) { const y = t.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top: y, behavior: 'smooth' }); } }}
          >
            <span>{t('hero.letsTalk')}</span>
          </a>
        </div>
      </div>

      {/* Photo + Sphere - right side */}
      <div id="hero-visual" style={{
        position: 'relative', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 440, height: 440,
      }}>
        {/* Neural sphere behind */}
        <div id="hero-sphere" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5,
        }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {[380, 310, 240, 170].map((size, i) => (
              <div key={i} style={{
                position: 'absolute', width: size, height: size,
                borderRadius: '50%',
                border: `1px solid ${
                  i === 0 ? 'rgba(0,240,255,0.05)' :
                  i === 1 ? 'rgba(124,58,237,0.07)' :
                  i === 2 ? 'rgba(0,240,255,0.07)' : 'rgba(244,114,182,0.05)'
                }`,
                animation: `sphere-rotate ${25 - i * 5}s ${i % 2 === 0 ? '' : 'reverse'} linear infinite`,
              }} />
            ))}
          </div>
        </div>

        {/* Photo frame */}
        <div id="hero-photo" style={{
          position: 'relative', zIndex: 2,
          width: 320, height: 400,
          animation: 'float-y 6s ease-in-out infinite',
        }}>
          <div style={{
            position: 'relative', width: '100%', height: '100%',
            borderRadius: 20, overflow: 'hidden',
            border: '1px solid rgba(0,240,255,0.12)',
            boxShadow: '0 0 60px rgba(0,240,255,0.06), 0 0 120px rgba(0,240,255,0.03), inset 0 0 60px rgba(0,240,255,0.02)',
          }}>
            {/* Animated gradient border */}
            <div style={{
              position: 'absolute', inset: -1.5, borderRadius: 21,
              background: 'conic-gradient(from 0deg, transparent, var(--primary), transparent, var(--secondary), transparent 60%)',
              animation: 'sphere-rotate 6s linear infinite',
              zIndex: 0,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'destination-out',
              maskComposite: 'exclude',
              padding: 2,
            }} />
            {/* Corner brackets */}
            {[
              { top: -1, left: -1, r: '0deg' },
              { top: -1, right: -1, r: '90deg' },
              { bottom: -1, left: -1, r: '-90deg' },
              { bottom: -1, right: -1, r: '180deg' },
            ].map((c, i) => (
              <div key={i} style={{
                position: 'absolute', ...c, width: 30, height: 30, zIndex: 3,
                borderTop: '2px solid var(--primary)',
                borderLeft: '2px solid var(--primary)',
                transform: `rotate(${c.r})`,
                filter: 'drop-shadow(0 0 6px var(--primary))',
              }} />
            ))}
            {/* Grid */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
              backgroundImage: 'linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }} />
            {/* Photo */}
            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
              <Image
                src="/images/profile.jpeg"
                alt="Abdulrahman Mohamed — AI Engineer and Data Scientist"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
                priority
                fetchPriority="high"
                quality={85}
                sizes="(max-width: 768px) 280px, 320px"
              />
              {/* Bottom fade */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '55%',
                background: 'linear-gradient(transparent, rgba(10,10,15,0.8))',
                zIndex: 1,
              }} />
              {/* Name tag */}
              <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, zIndex: 2 }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700,
                  color: 'var(--primary)', letterSpacing: '2px',
                }}>
                  {t('hero.photo.name')}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', marginTop: 2,
                }}>
                  {t('hero.photo.title')}
                </div>
              </div>
            </div>
          </div>
          {/* Status pill */}
          <div style={{
            position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'var(--surface)',
            border: '1px solid rgba(0,240,255,0.2)',
            borderRadius: 100, padding: '5px 18px',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--primary)', letterSpacing: '1.5px',
            whiteSpace: 'nowrap', zIndex: 3,
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: 'var(--primary)',
              animation: 'blink 1.5s step-end infinite',
            }} />
            {t('hero.photo.status')}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        role="presentation"
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2,
          textTransform: 'uppercase', color: 'var(--text-muted)', zIndex: 3,
          animation: 'fade-up 0.8s 0.8s ease forwards', opacity: 0,
        }}
      >
        <span>{t('hero.scroll')}</span>
        <div style={{
          width: 1, height: 24,
          background: 'linear-gradient(180deg, var(--text-muted), transparent)',
          animation: 'scroll-bounce 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}
