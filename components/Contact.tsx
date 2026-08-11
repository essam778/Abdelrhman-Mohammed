'use client';

import { Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { profile } from '@/data/profile';

export default function Contact() {
  const { t } = useLanguage();

  const socialLinks = [
    {
      label: 'GitHub',
      href: profile.github,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: profile.linkedin,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'Kaggle',
      href: profile.kaggle,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
          <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.34-.082-.469-.248l-4.427-5.734-1.862 1.801v3.871c0 .234-.082.352-.248.352H5.27c-.233 0-.352-.117-.352-.352V.353c0-.233.119-.353.352-.353h3.129c.234 0 .352.12.352.353v13.411l5.801-6.314c.164-.188.352-.281.564-.281h3.445c.235 0 .352.129.352.387 0 .117-.047.211-.141.305l-5.699 6.07 6.006 7.76c.094.118.141.258.141.422 0 .047-.023.094-.07.141z" />
        </svg>
      ),
    },
    {
      label: 'Phone',
      href: `tel:${profile.phone}`,
      icon: <Phone size={16} />,
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
          <h2>{t('contact.label')}</h2>
          <span style={{
            flex: 1, height: 2,
            background: 'linear-gradient(90deg, var(--primary), transparent)',
            maxWidth: 100,
          }} />
        </div>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: 16, transitionDelay: '.1s', maxWidth: 500, margin: '16px auto 0' }}>
          {t('contact.sub')}
        </p>

        <div style={{
          marginTop: 64,
          background: 'var(--surface)',
          border: '2px solid var(--border)',
          borderRadius: 24,
          padding: '48px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          position: 'relative',
          overflow: 'hidden',
          transitionDelay: '.2s',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}>
          {/* Subtle gradient glow inside card */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.1,
            background: 'radial-gradient(circle at center, var(--primary) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <a
            href={`mailto:${profile.email}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 'clamp(20px, 3vw, 30px)',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text)',
              textDecoration: 'none',
              padding: '16px 32px',
              border: '2px solid var(--border)',
              borderRadius: 100,
              background: 'rgba(255,255,255,0.02)',
              transition: 'var(--transition)',
              position: 'relative',
              zIndex: 2,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'var(--primary-dim)'; e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Mail size={24} />
            {profile.email}
          </a>

          <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, var(--border), transparent)', margin: '8px 0' }} />

          <div className="contact-socials" style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== 'Phone' ? '_blank' : undefined}
                rel={link.label !== 'Phone' ? 'noopener noreferrer' : undefined}
                className="social-link"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '1px',
                  textTransform: 'uppercase', color: 'var(--text-secondary)',
                  textDecoration: 'none', padding: '12px 24px',
                  border: '1px solid transparent', borderRadius: 100,
                  transition: 'var(--transition)',
                  background: 'var(--bg)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
