'use client';

import { useEffect, useRef, useState, useMemo, useCallback, type ReactNode } from 'react';
import { Network, Code2, BarChart4, Settings, Brain, Cpu, TrendingUp, MessageSquare,
  Terminal, Zap, Calculator, Table, Database, GitBranch, Camera, Trophy, FileText,
  Link, BookOpen, Library, Hash, Palette, ScanText, Workflow,
  Rocket, Wrench, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { profile } from '@/data/profile';

const iconMap: Record<string, ReactNode> = {
  network: <Network size={22} />,
  code: <Code2 size={22} />,
  chart: <BarChart4 size={22} />,
  settings: <Settings size={22} />,
};

const skillIcons: Record<string, ReactNode> = {
  TensorFlow: <Brain size={17} />, PyTorch: <Cpu size={17} />, 'Scikit-learn': <TrendingUp size={17} />, Keras: <Brain size={17} />,
  'Deep Learning': <Brain size={17} />, NLP: <MessageSquare size={17} />, 'Power BI': <BarChart4 size={17} />, 'Data Viz': <TrendingUp size={17} />,
  Python: <Terminal size={17} />, 'C/C++': <Zap size={17} />, MATLAB: <Calculator size={17} />, SQL: <Database size={17} />,
  Pandas: <Table size={17} />, Matplotlib: <TrendingUp size={17} />,
  Git: <GitBranch size={17} />, OpenCV: <Camera size={17} />, Kaggle: <Trophy size={17} />, Colab: <FileText size={17} />,
  LangChain: <Link size={17} />, LangGraph: <Workflow size={17} />, LlamaIndex: <BookOpen size={17} />, 'RAG Core': <Library size={17} />,
  NumPy: <Hash size={17} />, Seaborn: <Palette size={17} />, OCR: <ScanText size={17} />, n8n: <Zap size={17} />,
  FastAPI: <Rocket size={17} />, Jupyter: <FileText size={17} />, Simulink: <Wrench size={17} />, 'Prompt Eng.': <Sparkles size={17} />,
};

function ProgressBar({ pct, visible, delay = 0 }: { pct: number; visible: boolean; delay?: number }) {
  return (
    <div style={{
      position: 'relative',
      height: 6,
      background: 'rgba(255,255,255,0.06)',
      borderRadius: 100,
      overflow: 'hidden',
      flex: 1,
    }}>
      <div className="progress-fill" style={{
        position: 'absolute',
        left: 0, top: 0, bottom: 0,
        width: visible ? `${pct}%` : '0%',
        background: `linear-gradient(90deg, #ff6b4a, #ff3d3d)`,
        borderRadius: 100,
        transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        boxShadow: `0 0 8px rgba(255,107,74,0.4)`,
        overflow: 'hidden',
      }}>
        {visible && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            transform: 'translateX(-100%)',
            animation: `shimmer 600ms ease-out ${delay + 1000}ms forwards`,
          }} />
        )}
      </div>
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
        <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.4em', alignSelf: 'flex-start', marginTop: '10px' }}>02</span>
        <h2>{t('skills.label')}</h2>
        <span style={{
          flex: 1, height: 2,
          background: 'linear-gradient(90deg, var(--primary), transparent)',
        }} />
      </div>

      {/* Scrollable Pills Row -> Changed to Marquee */}
      <div style={{ width: '100%', marginBottom: 56, overflow: 'hidden' }}>
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            gap: 12,
            width: 'max-content',
            animation: 'marquee-scroll 40s linear infinite',
            padding: '4px 0',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'running';
          }}
        >
          {[0, 1].map((copy) =>
            allSkills.map((skill, index) => (
            <span
              key={`${skill.name}-${index}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 18px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,140,80,0.15)',
                borderRadius: 100,
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                transition: 'var(--transition-fast)',
                backdropFilter: 'blur(10px)',
                cursor: 'default',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <span style={{ 
                display: 'flex', flexShrink: 0, alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28, borderRadius: '50%',
                background: 'rgba(255, 100, 60, 0.25)',
                color: '#ff825c'
              }} aria-hidden="true">
                {skillIcons[skill.name] || <Terminal size={17} />}
              </span>
              {skill.name}
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
              className="skill-category glass-panel"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 140, 80, 0.15)',
                boxShadow: '0 0 40px rgba(255, 80, 40, 0.05)',
                borderRadius: '16px',
                padding: 28,
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 15px 70px rgba(255, 80, 40, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 80, 40, 0.05)';
              }}
            >
              {/* Top Gradient Border */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, #ff6b4a, transparent)' }} />
              {/* Category header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: `1px solid rgba(255,255,255,0.05)`,
              }}>
                <div style={{
                  width: 44, height: 44,
                  background: 'rgba(255, 100, 60, 0.25)',
                  borderRadius: '50%',
                  color: '#ff825c',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }} aria-hidden="true">
                  {iconMap[category.icon] || <Code2 size={22} />}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--text)',
                    letterSpacing: '0.5px',
                  }}>
                    {key}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
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
                {category.items.map((item, index) => (
                  <div key={item.name} className="skill-row" style={{
                    padding: '8px 12px',
                    margin: '-8px -12px',
                    borderRadius: '8px',
                    transition: 'background 0.2s ease',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 7,
                    }}>
                      <span style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        fontFamily: 'var(--font-mono)', fontSize: 12,
                        color: 'var(--text)',
                      }}>
                        <span className="skill-icon-badge" style={{ 
                          display: 'flex', flexShrink: 0, alignItems: 'center', justifyContent: 'center',
                          width: 28, height: 28, borderRadius: '50%',
                          background: 'rgba(255, 100, 60, 0.25)',
                          color: '#ff825c',
                          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }} aria-hidden="true">
                          {skillIcons[item.name] || <Terminal size={17} />}
                        </span>
                        {item.name}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#ff6b4a',
                        letterSpacing: '0.5px',
                        minWidth: 32,
                        textAlign: 'right',
                      }}>
                        {item.pct}%
                      </span>
                    </div>
                    <ProgressBar pct={item.pct} visible={isVisible} delay={index * 80} />
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
          gap: 24px;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .skill-row:hover {
          background: rgba(255, 255, 255, 0.04) !important;
        }
        .skill-row:hover .skill-icon-badge {
          transform: scale(1.08);
          background: rgba(255, 100, 60, 0.35) !important;
          color: #ff9d82 !important;
        }
        .hidden-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hidden-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
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
