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
      data-tilt
      onMouseMove={handleMouseMove}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
        handleMouseLeave();
      }}
      style={{
        position: 'relative',
        background: 'var(--surface)',
        border: '2px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        transition: 'var(--transition)',
        transformStyle: 'preserve-3d',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-hover)';
        e.currentTarget.style.boxShadow = 'var(--shadow)';
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

      {/* Image area */}
      <div
        style={{
          position: 'relative',
          height: 240,
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${index % 2 === 0 ? 'rgba(0,240,255,0.12)' : 'rgba(124,58,237,0.12)'}, ${index % 2 === 0 ? 'rgba(124,58,237,0.06)' : 'rgba(0,240,255,0.06)'})`,
        }}
      >
        {/* Circuit board pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.12, zIndex: 1,
          backgroundImage: `
            linear-gradient(90deg, var(--primary) 1px, transparent 1px),
            linear-gradient(rgba(0,240,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          pointerEvents: 'none',
        }} />
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
          }}>
            <div style={{
              color: 'var(--primary)', opacity: 0.5,
              animation: 'icon-float 3s ease-in-out infinite',
            }}>
              {getIcon(project.num)}
            </div>
          </div>
        )}
        {/* Bottom fade gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(transparent, var(--surface))',
          zIndex: 1, pointerEvents: 'none',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: 28, position: 'relative', zIndex: 2 }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            letterSpacing: '2px',
            color: 'var(--primary)',
            marginBottom: 12,
          }}
        >
          {project.num.replace('_', ' ')}
        </div>

        <h3
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: 8,
            lineHeight: 1.3,
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
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.5px',
                padding: '5px 12px',
                borderRadius: 100,
                background: 'var(--bg)',
                color: 'var(--primary)',
                border: '2px solid var(--primary)',
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
        <div className="section-label">
          <span className="label-num">03</span>
          <span>{t('projects.label')}</span>
        </div>

        <h2 className="section-title">{t('projects.title')}</h2>
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
