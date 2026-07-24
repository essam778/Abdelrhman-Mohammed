'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { profile } from '@/data/profile';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      style={{
        padding: '28px 48px',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text-muted)',
          flexWrap: 'wrap',
        }}
      >
        <span>&copy; 2026 Abdulrahman Mohamed</span>
        <span style={{ opacity: 0.3 }}>|</span>
        <span>{t('footer.tag')}</span>
        <span style={{ opacity: 0.3 }}>|</span>
        <span>{t('footer.location')}</span>
      </div>
    </footer>
  );
}
