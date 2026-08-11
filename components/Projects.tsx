'use client';

import { useRef, type MouseEvent } from 'react';
import Image from 'next/image';
import { Fingerprint, HeartPulse, Bot, BarChart4, Code2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { profile } from '@/data/profile';

const projectIcons: Record<string, React.ReactNode> = {
  PROJECT_01: <Fingerprint size={32} />,
  PROJECT_02: <HeartPulse size={32} />,
  PROJECT_03: <Bot size={32} />,
  PROJECT_04: <BarChart4 size={32} />,
};

function getIcon(num: string): React.ReactNode {
  return projectIcons[num] || <Code2 size={32} />;
}

function ProjectCard({
  project,
  index,
  t,
}: {
  project: (typeof profile.projects)[number];
  index: number;
  t: (key: string) => string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, var(--primary-dim), transparent 60%)`;
    glow.style.opacity = '1';
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    glow.style.opacity = '0';
  }

  return (
    <div
      ref={cardRef}
      className="project-card reveal"
      data-tilt
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 140, 80, 0.15)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        transformStyle: 'preserve-3d',
        cursor: 'default',
        boxShadow: '0 0 30px rgba(255, 80, 40, 0.1)',
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Glow overlay */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.15s ease',
          zIndex: 1,
        }}
      />

      {/* Image area with macOS frame */}
      <div
        className="project-img-container"
        style={{
          position: 'relative',
          height: 240,
          overflow: 'hidden',
          background: 'rgba(15, 34, 41, 0.9)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* macOS Top Bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 28,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6,
          zIndex: 10,
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
        </div>

        <div className="project-img-wrapper" style={{ position: 'absolute', top: 28, left: 0, right: 0, bottom: 0, transition: 'transform 0.35s ease' }}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(255,140,80,0.1), transparent)',
            }}>
              <div style={{
                color: '#ff6b4a', opacity: 0.5,
                animation: 'icon-float 3s ease-in-out infinite',
              }}>
                {getIcon(project.num)}
              </div>
            </div>
          )}
          {/* Subtle dark gradient overlay to unify styles */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(15,34,41,0.9) 0%, rgba(15,34,41,0.2) 60%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '32px 28px', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: '2px',
            color: '#ff6b4a',
            marginBottom: 16,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff6b4a', boxShadow: '0 0 10px #ff6b4a' }} />
          {project.num.replace('_', ' ')}
        </div>

        <h3
          className="project-title"
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: 12,
            lineHeight: 1.3,
            transition: 'color 0.3s ease',
          }}
        >
          {t(`project.${project.num}.title`) !== `project.${project.num}.title` ? t(`project.${project.num}.title`) : project.title}
        </h3>

        <p
          style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            marginBottom: 20,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {t(`project.${project.num}.desc`) !== `project.${project.num}.desc` ? t(`project.${project.num}.desc`) : project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="tag-pill"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.5px',
                padding: '6px 14px',
                borderRadius: 100,
                background: 'rgba(255, 100, 60, 0.12)',
                border: '1px solid rgba(255, 140, 80, 0.25)',
                color: '#ffb399',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects">
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          width: '100%',
        }}
      >
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
          <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.4em', alignSelf: 'flex-start', marginTop: '10px' }}>03</span>
          <h2>{t('projects.label')}</h2>
          <span style={{
            flex: 1, height: 2,
            background: 'linear-gradient(90deg, var(--primary), transparent)',
          }} />
        </div>

        <p className="section-sub">{t('projects.sub')}</p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
          className="projects-grid"
        >
          {profile.projects.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} t={t} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .project-card:hover {
          transform: translateY(-8px) perspective(800px) rotateX(0deg) rotateY(0deg) !important;
          box-shadow: 0 15px 50px rgba(255, 80, 40, 0.2) !important;
        }
        .project-card:hover .project-img-wrapper {
          transform: scale(1.05);
        }
        .project-card:hover .project-title {
          background: linear-gradient(90deg, #fff, #ffb399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .tag-pill:hover {
          background: rgba(255, 100, 60, 0.25) !important;
          color: #fff !important;
        }
        @media (max-width: 1024px) {
          :global(.projects-grid) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          :global(.projects-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
