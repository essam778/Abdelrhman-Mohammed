'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSectionTransition } from '@/components/SectionTransition';

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
  const { startTransition } = useSectionTransition();
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
    <section id="hero" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, position: 'relative' }}>
      
      {/* Background Pattern now moved to globals.css */}
      <div style={{
        position: 'absolute', top: '50%', left: '30%',
        width: 800, height: 800,
        background: 'radial-gradient(circle, rgba(244,85,73,0.08) 0%, transparent 60%)',
        transform: 'translate(-50%, -50%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Content - left side */}
      <div id="hero-content" style={{
        position: 'relative', zIndex: 3, maxWidth: 680, flex: 1,
        paddingRight: 20,
      }}>


        <h1 style={{ marginBottom: 16, animation: 'fade-up 0.8s 0.2s ease forwards', opacity: 0, textShadow: '0 0 40px rgba(244, 85, 73, 0.3)' }}>
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

        <div className="hero-buttons" style={{
          animation: 'fade-up 0.8s 0.4s ease forwards', opacity: 0,
        }}>
          <a
            href="#projects"
            className="hero-btn-primary"
            aria-label="View my work and projects"
            onClick={(e) => { e.preventDefault(); startTransition('#projects'); }}
          >
            <span>{t('hero.viewWork')}</span>
            <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="hero-btn-secondary"
            aria-label="Contact me"
            onClick={(e) => { e.preventDefault(); startTransition('#contact'); }}
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
        <div 
          className="image-wrapper" 
          style={{ 
            position: 'relative', zIndex: 2, width: 340, height: 420,
            transformStyle: 'preserve-3d',
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '15px' }}>
            <Image
              src="/images/profile.jpeg"
              alt="Abdulrahman Mohamed — AI Engineer and Data Scientist"
              fill
              sizes="340px"
              style={{ 
                objectFit: 'cover', 
                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', 
                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                filter: 'contrast(1.1) brightness(0.95)' 
              }}
              priority
              fetchPriority="high"
              quality={90}
            />
            {/* Soft gradient mask inside panel */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(15, 34, 41, 0.95))', zIndex: 1, pointerEvents: 'none' }} />
            
            <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24, zIndex: 2 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '1px' }}>
                {t('hero.photo.name')}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.5px', marginTop: 4 }}>
                {t('hero.photo.title')}
              </div>
            </div>
          </div>

          {/* AI Engineer Badge */}
          <div style={{
            position: 'absolute',
            bottom: -15, left: 15,
            background: 'rgba(15, 34, 41, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '10px 20px',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            zIndex: 10,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            transition: 'transform 300ms ease',
          }}
          className="hero-badge"
          >
            <div style={{ position: 'relative', width: 8, height: 8 }}>
              <div style={{ position: 'absolute', inset: 0, background: '#36b896', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', inset: 0, background: '#36b896', borderRadius: '50%', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', fontWeight: 600, letterSpacing: '0.5px' }}>AI Engineer</span>
          </div>
        </div>
      </div>



      <style jsx>{`
        .hero-buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .hero-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: #fff;
          font-family: var(--font-sans); font-size: 14px; font-weight: 800; letter-spacing: 1px;
          border: none; border-radius: 9999px; text-decoration: none; text-transform: uppercase;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); cursor: pointer;
          position: relative;
        }
        .hero-btn-primary::before {
          content: ""; position: absolute; inset: 0; border-radius: 9999px;
          box-shadow: 0 4px 15px rgba(244, 85, 73, 0.2);
          opacity: 1; transition: opacity 0.2s ease; pointer-events: none;
        }
        .hero-btn-primary::after {
          content: ""; position: absolute; inset: 0; border-radius: 9999px;
          box-shadow: 0 8px 25px rgba(244, 85, 73, 0.4);
          opacity: 0; transition: opacity 0.2s ease; pointer-events: none;
        }
        .hero-btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
        }
        .hero-btn-primary:hover::before { opacity: 0; }
        .hero-btn-primary:hover::after { opacity: 1; }
        .hero-btn-primary span, .hero-btn-primary svg { position: relative; z-index: 1; }

        .hero-btn-secondary {
          display: inline-flex; align-items: center;
          padding: 14px 32px;
          background: transparent;
          color: var(--text);
          font-family: var(--font-sans); font-size: 14px; font-weight: 700; letter-spacing: 1px;
          border: none; border-radius: 9999px;
          text-decoration: none; text-transform: uppercase;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); cursor: pointer;
          position: relative;
        }
        .hero-btn-secondary::before {
          content: ""; position: absolute; inset: 0; border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          opacity: 1; transition: opacity 0.2s ease; pointer-events: none;
        }
        .hero-btn-secondary::after {
          content: ""; position: absolute; inset: 0; border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          opacity: 0; transition: opacity 0.2s ease; pointer-events: none;
        }
        .hero-btn-secondary:hover {
          transform: translateY(-2px) scale(1.02);
        }
        .hero-btn-secondary:hover::before { opacity: 0; }
        .hero-btn-secondary:hover::after { opacity: 1; }
        .hero-btn-secondary span { position: relative; z-index: 1; }

        .image-wrapper {
          border: none !important;
          border-radius: 20px;
          transform: perspective(1200px) rotateY(-6deg) rotateX(3deg) scale(1);
          transition: transform 0.4s ease;
        }
        .image-wrapper::before {
          content: ""; position: absolute; inset: 0; border-radius: 20px;
          box-shadow: 0 0 0 1px rgba(255,140,80,0.25), 0 20px 60px rgba(255,80,40,0.35), 0 0 80px rgba(255,80,40,0.15);
          opacity: 1; transition: opacity 0.4s ease; pointer-events: none; z-index: 1;
        }
        .image-wrapper::after {
          content: ""; position: absolute; inset: 0; border-radius: 20px;
          box-shadow: 0 0 0 1px rgba(255,140,80,0.4), 0 25px 70px rgba(255,80,40,0.45), 0 0 100px rgba(255,80,40,0.25);
          opacity: 0; transition: opacity 0.4s ease; pointer-events: none; z-index: 1;
        }
        .image-wrapper:hover {
          transform: perspective(1200px) rotateY(-2deg) rotateX(1deg) scale(1.02);
        }
        .image-wrapper:hover::before { opacity: 0; }
        .image-wrapper:hover::after { opacity: 1; }

        .image-wrapper:hover .hero-badge {
          transform: translateY(-5px);
        }

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
            margin-bottom: 90px;
          }
          #hero-content p {
            margin: 0 auto 36px auto;
          }
          #hero-content .font-mono {
            justify-content: center;
          }
          .hero-buttons {
            justify-content: center;
          }
          @media (max-width: 600px) {
            .hero-buttons {
              flex-wrap: nowrap;
              gap: 10px;
              width: 100%;
            }
            .hero-btn-primary, .hero-btn-secondary {
              padding: 12px 14px !important;
              font-size: 12px !important;
              flex: 1;
              justify-content: center;
            }
          }
          .scroll-indicator {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
