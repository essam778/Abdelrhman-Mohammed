'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { profile } from '@/data/profile';

function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20, flexShrink: 0 }} aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20, flexShrink: 0 }} aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20, flexShrink: 0 }} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20, flexShrink: 0 }} aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20, flexShrink: 0 }} aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 20, height: 20, flexShrink: 0 }}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 10, height: 10, flexShrink: 0, marginTop: 5 }}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

const certIcons: Record<string, React.FC> = {
  monitor: MonitorIcon,
  users: UsersIcon,
  shield: ShieldIcon,
  star: StarIcon,
  lock: LockIcon,
};

export default function Experience() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        }
      },
      { threshold: 0.1 }
    );
    const els = section.querySelectorAll('.reveal');
    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef}>
      <div className="section-label reveal">
        <span className="label-num">04 —</span> {t('nav.experience')}
      </div>

      <h2 className="section-title reveal" style={{ marginBottom: 48 }}>
        {t('experience.title')}
      </h2>

      <div className="exp-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'start',
      }}>
        {/* LEFT — Professional Experience */}
        <div>
          <div className="reveal" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--primary)',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--primary)' }} />
            {t('experience.professional')}
          </div>

          <div style={{ position: 'relative', paddingLeft: 28 }}>
            {/* Timeline vertical line */}
            <div style={{
              position: 'absolute',
              left: 6,
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(180deg, var(--primary), var(--secondary), var(--accent), transparent)',
              borderRadius: 1,
            }} />

            {profile.experience.map((exp, i) => (
              <div key={i} className="reveal" style={{
                position: 'relative',
                marginBottom: 40,
                transitionDelay: `${i * 0.1}s`,
              }}>
                {/* Timeline dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: -24,
                    top: 4,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: 'var(--bg)',
                    border: '2px solid var(--primary)',
                    zIndex: 1,
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px var(--primary-glow), 0 0 40px var(--primary-glow)';
                    e.currentTarget.style.transform = 'scale(1.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />

                {/* Date */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.5px',
                  color: 'var(--primary)',
                  display: 'block',
                  marginBottom: 6,
                }}>
                  {t(`exp.${i}.date`)}
                </span>

                {/* Title */}
                <h3 style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--text)',
                  marginBottom: 2,
                  lineHeight: 1.4,
                }}>
                  {t(`exp.${i}.title`)}
                </h3>

                {/* Organization */}
                <p style={{
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  marginBottom: 10,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {t(`exp.${i}.org`)}
                </p>

                {/* Details */}
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}>
                  {exp.details.map((d, j) => (
                    <li key={j} style={{
                      display: 'flex',
                      gap: 8,
                      fontSize: 12.5,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                    }}>
                      <span style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }}>
                        <ArrowIcon />
                      </span>
                      <span>{t(`exp.${i}.d${j}`)}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                {(exp as any).tech && (exp as any).tech.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 6,
                    marginTop: 12,
                  }}>
                    {(exp as any).tech.map((tech: string, j: number) => (
                      <span key={j} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 9,
                        padding: '3px 10px',
                        borderRadius: 100,
                        background: 'var(--primary-dim)',
                        color: 'var(--primary)',
                        letterSpacing: '0.5px',
                        border: '1px solid rgba(0,240,255,0.12)',
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Certifications & Achievements */}
        <div>
          <div className="reveal" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--primary)',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--primary)' }} />
            {t('experience.certifications')}
          </div>

          {/* Certification cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {profile.certifications.map((cert, i) => {
              const Icon = certIcons[cert.icon] || ShieldIcon;
              return (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 16px',
                    background: 'var(--surface)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    borderLeft: '3px solid var(--primary)',
                    transition: 'transform 0.3s ease, border-left-color 0.3s ease, background 0.3s ease',
                    cursor: 'default',
                    transitionDelay: `${i * 0.08}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(6px)';
                    e.currentTarget.style.borderLeftColor = 'var(--accent)';
                    e.currentTarget.style.background = 'var(--surface-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderLeftColor = 'var(--primary)';
                    e.currentTarget.style.background = 'var(--surface)';
                  }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--primary-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    flexShrink: 0,
                  }}>
                    <Icon />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: 'var(--text)',
                      lineHeight: 1.4,
                      marginBottom: 2,
                    }}>
                      {t(`cert.${i}.title`)}
                    </p>
                    <p style={{
                      fontSize: 11,
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {t(`cert.${i}.org`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievements */}
          {profile.achievements.length > 0 && (
            <>
              <div className="reveal" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                marginTop: 48,
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}>
                <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--primary)' }} />
                {t('experience.achievements')}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {profile.achievements.map((ach, i) => (
                  <div
                    key={i}
                    className="reveal"
                    style={{
                      display: 'flex',
                      gap: 14,
                      padding: 18,
                      background: 'var(--surface)',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--border)',
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                      cursor: 'default',
                      transitionDelay: `${i * 0.1}s`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = 'var(--border-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                  >
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--radius-sm)',
                      background: 'linear-gradient(135deg, rgba(244,114,182,0.15), rgba(124,58,237,0.15))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent)',
                      flexShrink: 0,
                    }}>
                      <TrophyIcon />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <h4 style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'var(--text)',
                        marginBottom: 4,
                        lineHeight: 1.4,
                      }}>
                        {t(`achieve.${i}.title`)}
                      </h4>
                      {ach.subtitle && (
                        <p style={{
                          fontSize: 11.5,
                          color: 'var(--primary)',
                          fontFamily: 'var(--font-mono)',
                          marginBottom: 6,
                        }}>
                          {t(`achieve.${i}.sub`)}
                        </p>
                      )}
                      <p style={{
                        fontSize: 12,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        marginBottom: 8,
                      }}>
                        {t(`achieve.${i}.desc`)}
                      </p>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        color: 'var(--text-muted)',
                        letterSpacing: '0.5px',
                      }}>
                        {ach.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
