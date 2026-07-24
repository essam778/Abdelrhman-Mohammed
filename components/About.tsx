'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { profile } from '@/data/profile';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          observer.disconnect();

          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function useDetails(t: (key: string) => string) {
  return [
    { key: 'location', icon: '📍', labelKey: 'about.detail.location', valueKey: 'about.detail.locationVal' },
    { key: 'university', icon: '🎓', labelKey: 'about.detail.university', valueKey: 'about.detail.universityVal' },
    { key: 'email', icon: '✉️', labelKey: 'about.detail.email', value: profile.email },
    { key: 'languages', icon: '🌐', labelKey: 'about.detail.languages', valueKey: 'about.detail.languagesVal' },
    { key: 'focus', icon: '🎯', labelKey: 'about.detail.focus', valueKey: 'about.detail.focusVal' },
  ];
}

const aboutPyLines = [
  { indent: 0, text: 'class AboutMe:' },
  { indent: 4, text: 'def __init__(self):' },
  { indent: 8, text: 'self.name = "Abdulrahman Mohamed"' },
  { indent: 8, text: 'self.title = "AI Engineer & Data Scientist"' },
  { indent: 8, text: 'self.education = "B.Sc. Computer & Communication Eng."' },
  { indent: 8, text: 'self.university = "Benha University"' },
  { indent: 8, text: 'self.location = "Benha, Egypt"' },
  { indent: 8, text: 'self.email = "roma47757@gmail.com"' },
  { indent: 0, text: '' },
  { indent: 4, text: 'def get_skills(self):' },
  { indent: 8, text: 'return {' },
  { indent: 12, text: '"AI & ML": ["TensorFlow", "PyTorch", "Scikit-learn"],' },
  { indent: 12, text: '"Languages": ["Python", "C/C++", "MATLAB"],' },
  { indent: 12, text: '"Data & BI": ["Power BI", "Pandas", "Data Viz"],' },
  { indent: 8, text: '}' },
  { indent: 0, text: '' },
  { indent: 4, text: 'def get_experience(self):' },
  { indent: 8, text: 'return [' },
  { indent: 12, text: '"Freelance Coach @ Elharefa (DEPI, MCIT)",' },
  { indent: 12, text: '"Samsung Innovation Campus — AI Program",' },
  { indent: 12, text: '"Generative AI Diploma @ DEPI, EYOUTH",' },
  { indent: 8, text: ']' },
  { indent: 0, text: '' },
  { indent: 4, text: 'def get_mission(self):' },
  { indent: 8, text: 'return "Build intelligent systems that make a real-world impact"' },
];

export default function About() {
  const { t } = useLanguage();
  const details = useDetails(t);

  return (
    <section id="about" style={{ overflow: 'hidden' }}>
      {/* Section label */}
      <div
        className="reveal"
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '2px',
          textTransform: 'uppercase', color: 'var(--primary)',
          marginBottom: 48,
        }}
      >
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--primary)', boxShadow: '0 0 12px var(--primary)',
          flexShrink: 0,
        }} />
        <span>01 — {t('about.label')}</span>
        <span style={{
          flex: 1, height: 1,
          background: 'linear-gradient(90deg, var(--border), transparent)',
        }} />
      </div>

      <div
        className="reveal about-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 64,
          alignItems: 'start',
        }}
      >
        {/* ===== Left Column ===== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: -2, color: 'var(--text)',
            margin: 0,
          }}>
            {t('about.title')}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 15,
              lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0,
            }}>
              {t('about.p1')}
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 15,
              lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0,
            }}>
              {t('about.p2')}
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 15,
              lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0,
            }}>
              {t('about.p3')}
            </p>
          </div>

          {/* Stats Grid */}
          <div
            className="reveal about-stats"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: 'var(--border)',
            }}
          >
            {profile.stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--surface)',
                  padding: '24px 16px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{
                  fontSize: 28, fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  background: 'var(--gradient-1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <span style={{
                  fontSize: 11, fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.5px', color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Details List */}
          <div
            className="reveal"
            style={{
              display: 'flex', flexDirection: 'column', gap: 1,
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: 'var(--border)',
            }}
          >
            {details.map((d, i) => (
              <div
                key={d.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 20px',
                  background: 'var(--surface)',
                }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{d.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  color: 'var(--text-muted)', textTransform: 'uppercase',
                  letterSpacing: '0.5px', minWidth: 80,
                }}>
                  {t(d.labelKey)}
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: 14,
                  color: 'var(--text)', fontWeight: 500,
                  flex: 1, textAlign: 'right',
                }}>
                  {(d as any).valueKey ? t((d as any).valueKey) : (d as any).value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Right Column — Terminal ===== */}
        <div
          className="reveal terminal-container"
          style={{
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            lineHeight: 1.8,
            position: 'sticky',
            top: 100,
            maxWidth: '100%',
            minWidth: 0,
          }}
        >
          {/* Terminal Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 20px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg)',
          }}>
            <span style={{
              width: 10, height: 10, borderRadius: '50%',
              background: '#ff5f56', flexShrink: 0,
            }} />
            <span style={{
              width: 10, height: 10, borderRadius: '50%',
              background: '#ffbd2e', flexShrink: 0,
            }} />
            <span style={{
              width: 10, height: 10, borderRadius: '50%',
              background: '#27c93f', flexShrink: 0,
            }} />
            <span style={{
              flex: 1, textAlign: 'center',
              fontSize: 12, color: 'var(--text-muted)',
              letterSpacing: '0.5px', whiteSpace: 'nowrap',
            }}>
              about_me.py
            </span>
            <span style={{ width: 10 }} />
          </div>

          {/* Terminal Body */}
          <div className="terminal-body" style={{ padding: '20px 24px', overflowX: 'auto' }}>
            <div style={{ minWidth: 'max-content' }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <span style={{ color: 'var(--text-muted)', userSelect: 'none', textAlign: 'right', minWidth: 20 }}>
                  1
                </span>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>$</span>
                <span style={{ color: 'var(--text)' }}>cat about_me.py</span>
              </div>
              {aboutPyLines.map((line, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <span style={{
                    color: 'var(--text-muted)', userSelect: 'none',
                    textAlign: 'right', minWidth: 20,
                    opacity: 0.4,
                  }}>
                    {i + 2}
                  </span>
                  <span style={{
                    paddingLeft: line.indent * 8,
                    color: line.text.startsWith('#')
                      ? 'var(--text-muted)'
                      : line.text.includes(':') && !line.text.includes('"') && !line.text.includes("'")
                        ? 'var(--primary)'
                        : line.text.includes('"') || line.text.includes("'")
                          ? '#e6db74'
                          : line.text.startsWith('def ') || line.text.startsWith('class ')
                            ? '#66d9ef'
                            : 'var(--text)',
                    whiteSpace: 'pre',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {line.text || '\u00A0'}
                  </span>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <span style={{
                  color: 'var(--text-muted)', userSelect: 'none',
                  textAlign: 'right', minWidth: 20, opacity: 0.4,
                }}>
                  {aboutPyLines.length + 2}
                </span>
                <span style={{
                  color: 'var(--primary)', animation: 'blink 1s step-end infinite',
                }}>
                  _
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 968px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .terminal-container {
            display: none !important;
          }
          .about-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
