'use client';

import { useState } from 'react';
import { Phone, Mail, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { profile } from '@/data/profile';

export default function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const socialLinks = [
    {
      label: 'GitHub',
      href: profile.github,
      hoverColor: '#ffffff',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, transition: 'var(--transition)' }}>
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: profile.linkedin,
      hoverColor: '#0a66c2',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, transition: 'var(--transition)' }}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'Kaggle',
      href: profile.kaggle,
      hoverColor: '#20beff',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, transition: 'var(--transition)' }}>
          <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.34-.082-.469-.248l-4.427-5.734-1.862 1.801v3.871c0 .234-.082.352-.248.352H5.27c-.233 0-.352-.117-.352-.352V.353c0-.233.119-.353.352-.353h3.129c.234 0 .352.12.352.353v13.411l5.801-6.314c.164-.188.352-.281.564-.281h3.445c.235 0 .352.129.352.387 0 .117-.047.211-.141.305l-5.699 6.07 6.006 7.76c.094.118.141.258.141.422 0 .047-.023.094-.07.141z" />
        </svg>
      ),
    },
    {
      label: 'Phone',
      href: `tel:${profile.phone}`,
      hoverColor: '#ff6b4a',
      icon: <Phone size={18} style={{ transition: 'var(--transition)' }} />,
    },
  ];

  return (
    <section id="contact" style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div
          className="reveal"
          style={{
            display: 'flex', alignItems: 'center', gap: 24,
            fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)',
            textTransform: 'uppercase', color: 'var(--text)',
            marginBottom: 64,
            lineHeight: 1,
            justifyContent: 'center',
          }}
        >
          <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.4em', alignSelf: 'flex-start', marginTop: '10px' }}>05</span>
          <h2 style={{ textShadow: '0 0 40px rgba(244, 85, 73, 0.3)' }}>{t('contact.label')}</h2>
          <span style={{
            flex: 1, height: 2,
            background: 'linear-gradient(90deg, #ff6b4a, transparent)',
            animation: 'pulse-line 3s infinite',
            maxWidth: 100,
          }} />
        </div>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: 16, transitionDelay: '.1s', maxWidth: 500, margin: '16px auto 0' }}>
          {t('contact.sub')}
        </p>

        <div className="contact-outer-card" style={{
          marginTop: 64,
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 140, 80, 0.1)',
          borderRadius: 24,
          padding: '48px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          position: 'relative',
          overflow: 'hidden',
          transitionDelay: '.2s',
        }}>
          {/* Subtle gradient glow inside card */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.1,
            background: 'radial-gradient(circle at center, var(--primary) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Tooltip container wrapper */}
          <div className="email-wrapper" style={{ position: 'relative', zIndex: 2 }}>
            <button
              onClick={handleCopy}
              className="email-card"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 'clamp(20px, 3vw, 30px)',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                color: 'var(--text)',
                padding: '16px 32px',
                border: '2px solid var(--primary-dim)',
                borderRadius: 100,
                background: 'rgba(255,255,255,0.03)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
              }}
            >
              <Mail className="mail-icon" size={24} style={{ transition: 'transform 0.3s ease' }} />
              {profile.email}
            </button>
            <div className="copy-tooltip" style={{
              position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)',
              background: copied ? '#ff6b4a' : 'var(--surface-hover)',
              color: copied ? '#fff' : 'var(--text-secondary)',
              padding: '6px 12px', borderRadius: 8, fontSize: 13,
              fontFamily: 'var(--font-mono)', pointerEvents: 'none',
              opacity: 0, transition: 'all 0.2s ease', whiteSpace: 'nowrap',
              border: copied ? '1px solid #ff6b4a' : '1px solid var(--border)'
            }}>
              {copied ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Check size={14} /> {t('contact.tooltip.copied')}
                </span>
              ) : t('contact.tooltip.copy')}
            </div>
          </div>

          <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', margin: '8px 0' }} />

          <div className="contact-socials" style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', position: 'relative', zIndex: 2, width: '100%' }}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== 'Phone' ? '_blank' : undefined}
                rel={link.label !== 'Phone' ? 'noopener noreferrer' : undefined}
                className="social-link"
                style={{
                  '--hover-color': link.hoverColor,
                } as any}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        /* Outer Card Breathing Glow */
        .contact-outer-card {
          animation: card-glow-pulse 8s infinite alternate ease-in-out;
        }
        @keyframes card-glow-pulse {
          0% { box-shadow: 0 0 40px rgba(255, 80, 40, 0.02); border-color: rgba(255, 140, 80, 0.1); }
          100% { box-shadow: 0 0 60px rgba(255, 80, 40, 0.08); border-color: rgba(255, 140, 80, 0.25); }
        }

        /* Email Card Hover & Glow */
        .email-card {
          animation: email-border-pulse 3s infinite ease-in-out;
        }
        @keyframes email-border-pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 107, 74, 0.3); }
          50% { box-shadow: 0 0 0 6px rgba(255, 107, 74, 0.1); }
          100% { box-shadow: 0 0 0 0 rgba(255, 107, 74, 0); }
        }
        .email-wrapper:hover .email-card {
          border-color: var(--primary) !important;
          background: rgba(255, 100, 60, 0.1) !important;
          color: var(--primary) !important;
          transform: translateY(-4px);
        }
        .email-wrapper:hover .copy-tooltip {
          opacity: 1;
          transform: translate(-50%, -8px);
        }
        .email-wrapper:hover .mail-icon {
          transform: scale(1.15) rotate(-5deg);
        }

        /* Social Links */
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 12px 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 100px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          background: rgba(255, 255, 255, 0.02);
        }
        .social-link:hover {
          color: var(--hover-color) !important;
          border-color: var(--hover-color) !important;
          background: rgba(255, 255, 255, 0.05) !important;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px var(--hover-color);
        }

        @media (max-width: 600px) {
          .contact-socials {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .social-link {
            padding: 12px 10px;
            font-size: 11px;
            letter-spacing: 0.5px;
          }
          .email-card {
            font-size: clamp(16px, 4vw, 20px) !important;
            padding: 12px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
