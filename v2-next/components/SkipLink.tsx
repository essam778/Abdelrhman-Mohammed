'use client';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onFocus={(e) => { e.currentTarget.style.top = '8px'; }}
      onBlur={(e) => { e.currentTarget.style.top = '-100px'; }}
      style={{
        position: 'fixed',
        top: -100,
        left: 8,
        zIndex: 10000,
        padding: '8px 16px',
        background: 'var(--primary)',
        color: 'var(--bg)',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        fontWeight: 700,
        borderRadius: 8,
        textDecoration: 'none',
        transition: 'top 0.2s',
      }}
    >
      Skip to main content
    </a>
  );
}
