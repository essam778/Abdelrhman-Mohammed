'use client';

import { useEffect, useRef } from 'react';
import { Monitor, Users, Shield, Star, Lock, Trophy, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { profile } from '@/data/profile';

function ArrowIcon() {
  return <ArrowRight size={10} style={{ flexShrink: 0, marginTop: 5 }} />;
}

function TrophyIcon() {
  return <Trophy size={20} style={{ flexShrink: 0 }} />;
}

const certIcons: Record<string, React.FC> = {
  monitor: () => <Monitor size={20} />,
  users: () => <Users size={20} />,
  shield: () => <Shield size={20} />,
  star: () => <Star size={20} />,
  lock: () => <Lock size={20} />,
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
            fontSize: 12,
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
                  fontSize: 12,
                  letterSpacing: '0.5px',
                  color: 'var(--primary)',
                  display: 'block',
                  marginBottom: 6,
                }}>
                  {t(`exp.${i}.date`)}
                </span>

                {/* Title */}
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--text)',
                  marginBottom: 2,
                  lineHeight: 1.4,
                }}>
                  {t(`exp.${i}.title`)}
                </h3>

                {/* Organization */}
                <p style={{
                  fontSize: 13,
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
                      fontSize: 13.5,
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
                {exp.tech && exp.tech.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 6,
                    marginTop: 12,
                  }}>
                    {exp.tech.map((tech: string, j: number) => (
                      <span key={j} style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        padding: '3px 10px',
                        borderRadius: 100,
                        background: 'var(--primary-dim)',
                        color: 'var(--primary)',
                        letterSpacing: '0.5px',
                        border: '2px solid var(--primary)',
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
            fontSize: 12,
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
              const Icon = certIcons[cert.icon] || (() => <Shield size={20} />);
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
                    border: '2px solid var(--border)',
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
                      fontSize: 13.5,
                      fontWeight: 500,
                      color: 'var(--text)',
                      lineHeight: 1.4,
                      marginBottom: 2,
                    }}>
                      {t(`cert.${i}.title`)}
                    </p>
                    <p style={{
                      fontSize: 12,
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
                fontSize: 12,
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
                      border: '2px solid var(--border)',
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
                        fontSize: 14,
                        fontWeight: 600,
                        color: 'var(--text)',
                        marginBottom: 4,
                        lineHeight: 1.4,
                      }}>
                        {t(`achieve.${i}.title`)}
                      </h4>
                      {ach.subtitle && (
                          <p style={{
                            fontSize: 12.5,
                            color: 'var(--primary)',
                            fontFamily: 'var(--font-mono)',
                            marginBottom: 6,
                        }}>
                          {t(`achieve.${i}.sub`)}
                        </p>
                      )}
                      <p style={{
                        fontSize: 13,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        marginBottom: 8,
                      }}>
                        {t(`achieve.${i}.desc`)}
                      </p>
                      <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
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
