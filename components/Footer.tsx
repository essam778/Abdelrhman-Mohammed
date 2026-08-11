'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      style={{
        padding: '28px 48px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Subtle horizontal gradient line above footer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: 800,
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255, 140, 80, 0.3), transparent)',
      }} />
      <div
        className="footer-content"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
          opacity: 0.85,
          flexWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        <span>&copy; 2026 Abdulrahman Mohamed</span>
        <span className="separator" style={{ opacity: 0.4 }}>|</span>
        <span>{t('footer.tag')}</span>
        <span className="separator" style={{ opacity: 0.4 }}>|</span>
        <span>{t('footer.location')}</span>
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          .footer-content {
            flex-direction: column !important;
            gap: 8px !important;
          }
          .separator {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
