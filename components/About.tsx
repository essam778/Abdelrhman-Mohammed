'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, GraduationCap, Mail, Globe, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { profile } from '@/data/profile';

const detailIcons: Record<string, React.ReactNode> = {
  location: <MapPin size={16} />,
  university: <GraduationCap size={16} />,
  email: <Mail size={16} />,
  languages: <Globe size={16} />,
  focus: <Target size={16} />,
};

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

interface Detail {
  key: string;
  labelKey: string;
  valueKey?: string;
  value?: string;
}

function useDetails(): Detail[] {
  return [
    { key: 'location', labelKey: 'about.detail.location', valueKey: 'about.detail.locationVal' },
    { key: 'university', labelKey: 'about.detail.university', valueKey: 'about.detail.universityVal' },
    { key: 'email', labelKey: 'about.detail.email', value: profile.email },
    { key: 'languages', labelKey: 'about.detail.languages', valueKey: 'about.detail.languagesVal' },
    { key: 'focus', labelKey: 'about.detail.focus', valueKey: 'about.detail.focusVal' },
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
  const details = useDetails();

  return (
    <section id="about" style={{ overflow: 'hidden' }}>
      {/* Section label */}
      <div
        className="reveal"
        style={{
          display: 'flex', alignItems: 'center', gap: 24,
          fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)',
          textTransform: 'uppercase', color: 'var(--text)',
          marginBottom: 64,
          lineHeight: 1,
        }}
      >
        <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.4em', alignSelf: 'flex-start', marginTop: '10px' }}>01</span>
        <h2>{t('about.label')}</h2>
        <span style={{
          flex: 1, height: 2,
          background: 'linear-gradient(90deg, var(--primary), transparent)',
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
            fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: -2, color: 'var(--text)',
            margin: 0,
          }}>
            {t('about.title')}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 16,
              lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0,
            }}>
              {t('about.p1')}
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 16,
              lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0,
            }}>
              {t('about.p2')}
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 16,
              lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0,
            }}>
              {t('about.p3')}
            </p>
          </div>



          {/* Details List */}
          <div
            className="reveal"
            style={{
              display: 'flex', flexDirection: 'column', gap: 1,
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              border: '2px solid var(--border)',
              background: 'var(--border)',
            }}
          >
            {details.map((d) => (
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
                <span style={{ flexShrink: 0, display: 'flex', color: 'var(--primary)' }}>{detailIcons[d.key]}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 13,
                  color: 'var(--text-muted)', textTransform: 'uppercase',
                  letterSpacing: '0.5px', minWidth: 80,
                }}>
                  {t(d.labelKey)}
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: 15,
                  color: 'var(--text)', fontWeight: 500,
                  flex: 1, textAlign: 'right',
                }}>
                  {d.valueKey ? t(d.valueKey) : d.value}
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
            border: '2px solid var(--border)',
            background: 'var(--surface)',
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
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
            borderBottom: '2px solid var(--border)',
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
              fontSize: 13, color: 'var(--text-muted)',
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
