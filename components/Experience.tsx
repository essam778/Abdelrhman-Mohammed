'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<'work' | 'certs' | 'achievements'>('work');

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

  // Ensure fade animation resets when tab changes
  useEffect(() => {
    const content = document.querySelector('.tab-content-inner');
    if (content) {
      content.classList.remove('fade-in-active');
      void (content as HTMLElement).offsetWidth; // trigger reflow
      content.classList.add('fade-in-active');
    }
  }, [activeTab]);

  return (
    <section id="experience" ref={sectionRef}>
      <div
        className="reveal"
        style={{
          display: 'flex', alignItems: 'center', gap: 24,
          fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)',
          textTransform: 'uppercase', color: 'var(--text)',
          marginBottom: 48,
          lineHeight: 1,
        }}
      >
        <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.4em', alignSelf: 'flex-start', marginTop: '10px' }}>04</span>
        <h2>{t('nav.experience')}</h2>
        <span style={{
          flex: 1, height: 2,
          background: 'linear-gradient(90deg, var(--primary), transparent)',
        }} />
      </div>

      {/* Stats Row */}
      <div className="reveal" style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
        {['3+ Certifications', '5 Programs Completed', '2026 Graduate'].map(stat => (
          <span key={stat} className="stat-chip" style={{
            padding: '8px 16px', background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100,
            fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)',
            backdropFilter: 'blur(10px)'
          }}>
            {stat}
          </span>
        ))}
      </div>

      {/* Tabs */}
      <div className="reveal tabs-container" style={{ display: 'flex', gap: 16, marginBottom: 48, position: 'relative' }}>
        {[
          { id: 'work', label: 'Work Experience' },
          { id: 'certs', label: 'Certifications & Courses' },
          { id: 'achievements', label: 'Achievements' }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="tab-button"
              style={{
                position: 'relative',
                padding: '14px 28px',
                borderRadius: 100,
                background: isActive ? 'linear-gradient(90deg, #ff6b4a, #ff3d3d)' : 'rgba(255, 255, 255, 0.02)',
                border: isActive ? '1px solid transparent' : '1px solid rgba(255, 255, 255, 0.1)',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 8px 24px rgba(255, 80, 40, 0.25)' : 'none',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="tab-content" style={{ position: 'relative', minHeight: 400 }}>
        <div className="tab-content-inner">
          
          {/* WORK EXPERIENCE TAB */}
          {activeTab === 'work' && (
            <div style={{ position: 'relative', paddingLeft: 28 }}>
              {/* Timeline vertical line */}
              <div style={{
                position: 'absolute',
                left: 6,
                top: 0,
                bottom: 0,
                width: 2,
                background: 'linear-gradient(180deg, #ff6b4a, transparent)',
                borderRadius: 1,
              }} />

              {profile.experience.map((exp, i) => (
                <div key={i} className="work-entry" style={{
                  position: 'relative',
                  marginBottom: 32,
                  padding: '16px 20px',
                  marginLeft: -20,
                  borderRadius: 12,
                  transition: 'background 0.3s ease, box-shadow 0.3s ease',
                }}>
                  {/* Timeline dot */}
                  <div
                    className={exp.date.includes('Present') ? 'pulse-dot' : ''}
                    style={{
                      position: 'absolute',
                      left: -14,
                      top: 24,
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: 'var(--bg)',
                      border: `2px solid ${exp.date.includes('Present') ? '#ff6b4a' : 'var(--border)'}`,
                      zIndex: 1,
                      transition: 'border-color 0.3s ease, transform 0.3s ease',
                    }}
                  />

                  {/* Date */}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: '0.5px',
                    color: '#ff6b4a',
                    display: 'block',
                    marginBottom: 6,
                  }}>
                    {t(`exp.${i}.date`)}
                  </span>

                  {/* Title */}
                  <h3 style={{
                    fontSize: 18,
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
                    marginBottom: 12,
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
                        <span style={{ color: '#ff6b4a', flexShrink: 0, marginTop: 2 }}>
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
                      gap: 8,
                      marginTop: 16,
                    }}>
                      {exp.tech.map((tech: string, j: number) => (
                        <span key={j} style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '6px 14px',
                          borderRadius: 100,
                          background: 'rgba(255, 100, 60, 0.12)',
                          color: '#ffb399',
                          letterSpacing: '0.5px',
                          border: 'none',
                          textShadow: '0 0 8px rgba(255, 179, 153, 0.2)',
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CERTIFICATIONS TAB */}
          {activeTab === 'certs' && (
            <div className="two-column-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {profile.certifications.map((cert, i) => {
                const Icon = certIcons[cert.icon] || (() => <Shield size={20} />);
                return (
                  <div
                    key={i}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '20px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 140, 80, 0.15)',
                      boxShadow: '0 0 30px rgba(255, 80, 40, 0.05)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'default',
                    }}
                  >
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'rgba(255, 100, 60, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ff6b4a',
                      flexShrink: 0,
                    }}>
                      <Icon />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: 'var(--text)',
                        lineHeight: 1.4,
                        marginBottom: 4,
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
          )}

          {/* ACHIEVEMENTS TAB */}
          {activeTab === 'achievements' && (
            <div className="two-column-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {profile.achievements.map((ach, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    gap: 20,
                    padding: 24,
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 140, 80, 0.15)',
                    boxShadow: '0 0 30px rgba(255, 80, 40, 0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'rgba(255, 100, 60, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ff6b4a',
                    flexShrink: 0,
                  }}>
                    <TrophyIcon />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: 'var(--text)',
                      marginBottom: 6,
                      lineHeight: 1.4,
                    }}>
                      {t(`achieve.${i}.title`)}
                    </h4>
                    {ach.subtitle && (
                        <p style={{
                          fontSize: 13,
                          color: '#ff6b4a',
                          fontFamily: 'var(--font-mono)',
                          marginBottom: 8,
                      }}>
                        {t(`achieve.${i}.sub`)}
                      </p>
                    )}
                    <p style={{
                      fontSize: 14,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: 12,
                    }}>
                      {t(`achieve.${i}.desc`)}
                    </p>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        color: 'var(--text-muted)',
                        letterSpacing: '0.5px',
                    }}>
                      {ach.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      <style jsx>{`
        .tab-content-inner {
          opacity: 0;
          transform: translateY(10px);
        }
        .tab-content-inner.fade-in-active {
          animation: tab-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes tab-fade {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Work Experience Timeline Hover */
        .work-entry:hover {
          background: rgba(255, 255, 255, 0.02);
          box-shadow: inset 3px 0 0 #ff6b4a;
        }
        .work-entry:hover > div:first-child {
          border-color: #ff6b4a !important;
          transform: scale(1.3);
        }

        /* Glowing Pulse for Present Dot */
        .pulse-dot {
          animation: dot-pulse 2s infinite;
        }
        @keyframes dot-pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 107, 74, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 107, 74, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 107, 74, 0); }
        }

        /* Glass Card Hover */
        .glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(255, 80, 40, 0.15) !important;
        }
        
        .tab-button:hover {
          border-color: rgba(255, 140, 80, 0.4) !important;
          color: #ff9d82 !important;
        }

        @media (max-width: 800px) {
          .two-column-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 600px) {
          .tabs-container {
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 12px !important;
          }
          .tab-button {
            flex: 1 1 auto;
            text-align: center;
            padding: 12px 16px !important;
            font-size: 12px !important;
          }
          .stat-chip {
            flex: 1 1 auto;
            text-align: center;
          }
        }
        
        .hidden-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hidden-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
