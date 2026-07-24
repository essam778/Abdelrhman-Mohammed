'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { profile } from '@/data/profile';

const iconMap: Record<string, string> = {
  network: '🧠',
  code: '💻',
  chart: '📊',
  settings: '⚙️',
};

const skillIcons: Record<string, string> = {
  TensorFlow: '🧠', PyTorch: '🔥', 'Scikit-learn': '📈', Keras: '🧩',
  'Deep Learning': '🤖', NLP: '📝', 'Power BI': '📊', 'Data Viz': '📉',
  Python: '🐍', 'C/C++': '⚡', MATLAB: '📐',
  Pandas: '🐼', Matplotlib: '📈',
  Git: '🔀', OpenCV: '👁️', Kaggle: '🏆', Colab: '📒',
  LangChain: '⛓️', LangGraph: '🕸️', LlamaIndex: '🦙', 'RAG Core': '📚',
  NumPy: '🔢', Seaborn: '🎨', OCR: '📄', n8n: '⚡',
  FastAPI: '🚀', Jupyter: '📓', Simulink: '🔧', 'Prompt Eng.': '💬',
};

function ProgressBar({ pct, visible, color = 'var(--primary)' }: { pct: number; visible: boolean; color?: string }) {
  return (
    <div style={{
      position: 'relative',
      height: 6,
      background: 'rgba(255,255,255,0.06)',
      borderRadius: 100,
      overflow: 'hidden',
      flex: 1,
    }}>
      <div style={{
        position: 'absolute',
        left: 0, top: 0, bottom: 0,
        width: visible ? `${pct}%` : '0%',
        background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 60%, var(--secondary)))`,
        borderRadius: 100,
        transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: `0 0 8px ${color}60`,
      }} />
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  const categories = useMemo(() => Object.entries(profile.skills), []);

  const allSkills = useMemo(
    () => Object.values(profile.skills).flatMap((cat) => cat.items),
    [],
  );

  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(
    () => new Set(),
  );
  const categoryRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.getAttribute('data-category');
          if (key) {
            setVisibleCategories((prev) => new Set(prev).add(key));
          }
        });
      },
      { threshold: 0.15 },
    );

    categoryRefs.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const setCategoryRef = useCallback(
    (key: string, el: HTMLDivElement | null) => {
      if (el) {
        categoryRefs.current.set(key, el);
      } else {
        categoryRefs.current.delete(key);
      }
    },
    [],
  );

  // Color per category
  const categoryColors: Record<string, string> = {
    'AI & ML': 'var(--primary)',
    Languages: 'var(--secondary)',
    'Data & BI': '#f472b6',
    Tools: '#34d399',
  };

  return (
    <section id="skills">
      <div className="section-label">
        <span className="label-num">02</span>
        <span>{t('skills.label')}</span>
      </div>

      <h2 className="section-title">{t('skills.title')}</h2>

      {/* Marquee bar */}
      <div style={{ overflow: 'hidden', width: '100%', marginBottom: 56 }}>
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            gap: 12,
            width: 'max-content',
            animation: 'marquee-scroll 50s linear infinite',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'running';
          }}
        >
          {[0, 1].map((copy) =>
            allSkills.map((skill) => (
              <span
                key={`${skill.name}-${copy}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 18px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 100,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition-fast)',
                  cursor: 'default',
                }}
              >
                <span style={{ fontSize: 13, flexShrink: 0 }} aria-hidden="true">
                  {skillIcons[skill.name] || '▸'}
                </span>
                {skill.name}
                <span style={{
                  marginLeft: 2,
                  padding: '2px 8px',
                  background: 'var(--primary-dim)',
                  color: 'var(--primary)',
                  borderRadius: 100,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}>
                  {skill.pct}%
                </span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* Skills grid */}
      <div className="skills-grid">
        {categories.map(([key, category]) => {
          const color = categoryColors[key] || 'var(--primary)';
          const isVisible = visibleCategories.has(key);
          return (
            <div
              key={key}
              ref={(el) => setCategoryRef(key, el)}
              data-category={key}
              className="skill-category"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: 28,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = `${color}40`;
                e.currentTarget.style.boxShadow = `0 12px 40px ${color}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Category header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: `1px solid ${color}20`,
              }}>
                <div style={{
                  width: 36, height: 36,
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                  borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }} aria-hidden="true">
                  {iconMap[category.icon] || '📦'}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--text)',
                    letterSpacing: '0.5px',
                  }}>
                    {key}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: color,
                    opacity: 0.8,
                    marginTop: 2,
                  }}>
                    {category.items.length} tools
                  </div>
                </div>
              </div>

              {/* Skill items with progress bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {category.items.map((item) => (
                  <div key={item.name}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 7,
                    }}>
                      <span style={{
                        display: 'flex', alignItems: 'center', gap: 7,
                        fontFamily: 'var(--font-mono)', fontSize: 11,
                        color: 'var(--text-secondary)',
                      }}>
                        <span style={{ fontSize: 14, flexShrink: 0 }} aria-hidden="true">
                          {skillIcons[item.name] || '▸'}
                        </span>
                        {item.name}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        fontWeight: 700,
                        color: color,
                        letterSpacing: '0.5px',
                        minWidth: 32,
                        textAlign: 'right',
                      }}>
                        {isVisible ? item.pct : 0}%
                      </span>
                    </div>
                    <ProgressBar pct={item.pct} visible={isVisible} color={color} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
        .skill-category {
          cursor: default;
        }
      `}</style>
    </section>
  );
}
