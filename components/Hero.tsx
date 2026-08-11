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


        <h1 style={{ marginBottom: 16, animation: 'fade-up 0.8s 0.2s ease forwards', opacity: 0 }}>
          <span className="font-display neon" style={{
            display: 'block', fontSize: 'clamp(38px, 6.5vw, 80px)',
            lineHeight: 0.95, letterSpacing: '-0.01em',
            color: 'var(--text)',
          }}>
            {t('hero.name.first')}
          </span>
          <span className="font-display" style={{
            display: 'block', fontSize: 'clamp(38px, 6.5vw, 80px)',
            lineHeight: 0.95, letterSpacing: '-0.01em',
            background: 'var(--gradient-1)', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {t('hero.name.last')}
          </span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 18,
          color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 580,
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
        {/* Neural sphere removed for retro design */}

        {/* Photo frame */}
        <div className="retro-photo" style={{ position: 'relative', zIndex: 2, width: 340, height: 420 }}>
          <div style={{
            position: 'relative', width: '100%', height: '100%',
            border: '4px solid var(--primary)', borderRadius: '4px',
            overflow: 'hidden', boxShadow: '16px 16px 0px rgba(0,0,0,0.6)',
          }}>
            <Image
              src="/images/profile.jpeg"
              alt="Abdulrahman Mohamed — AI Engineer and Data Scientist"
              fill
              style={{ objectFit: 'cover', filter: 'sepia(40%) contrast(1.2) brightness(0.9) hue-rotate(-10deg)' }}
              priority
              fetchPriority="high"
              quality={90}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(15, 34, 41, 0.8))', zIndex: 1 }} />
            <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, zIndex: 2 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: 'var(--secondary)', letterSpacing: '2px' }}>
                {t('hero.photo.name')}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', letterSpacing: '1px', marginTop: 4 }}>
                {t('hero.photo.title')}
              </div>
            </div>
          </div>
        </div>
      </div>



      <style jsx>{`
        @media (max-width: 1024px) {
          #hero {
            flex-direction: column !important;
            justify-content: center !important;
            text-align: center;
            padding-top: 120px !important;
            padding-bottom: 80px !important;
          }
          #hero-content {
            align-items: center;
            padding-right: 0 !important;
            margin-bottom: 40px;
          }
          #hero-content p {
            margin: 0 auto 36px auto;
          }
          #hero-content .font-mono {
            justify-content: center;
          }
          #hero-content div[style*="gap: 14"] {
            justify-content: center;
          }
          .scroll-indicator {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
