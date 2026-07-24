'use client';

import { useRef, type MouseEvent, type ReactNode } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { profile } from '@/data/profile';

const ICONS: Record<string, ReactNode> = {
  PROJECT_01: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 32, height: 32 }}>
      <circle cx="20" cy="20" r="8" />
      <circle cx="20" cy="20" r="14" strokeDasharray="2 3" />
      <circle cx="20" cy="20" r="18" strokeDasharray="3 4" />
      <circle cx="14" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="8" cy="18" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="30" cy="24" r="2" fill="currentColor" stroke="none" />
      <circle cx="16" cy="30" r="1.5" fill="currentColor" stroke="none" />
      <path d="M20 12v-4M20 32v-4M12 20H8M32 20h-4" />
    </svg>
  ),
  PROJECT_02: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 32, height: 32 }}>
      <polyline points="2,24 10,24 14,14 18,28 22,10 26,22 30,18 38,18" />
      <circle cx="20" cy="20" r="15" strokeDasharray="2 3" />
      <circle cx="20" cy="20" r="10" strokeDasharray="3 4" />
    </svg>
  ),
  PROJECT_03: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 32, height: 32 }}>
      <rect x="4" y="6" width="32" height="22" rx="4" />
      <path d="M12 32l6-4h6l6 4" />
      <path d="M13 16h14M13 21h10" />
      <circle cx="8" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="18" cy="4" r="1" fill="currentColor" stroke="none" />
      <circle cx="30" cy="8" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  PROJECT_04: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 32, height: 32 }}>
      <rect x="4" y="16" width="6" height="16" rx="1" />
      <rect x="13" y="10" width="6" height="22" rx="1" />
      <rect x="22" y="4" width="6" height="28" rx="1" />
      <path d="M4 36h32" />
      <circle cx="7" cy="30" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="24" r="1" fill="currentColor" stroke="none" />
      <circle cx="25" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
};

function getIcon(num: string): ReactNode {
  return ICONS[num] || (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 32, height: 32 }}>
      <rect x="8" y="8" width="24" height="24" rx="3" strokeDasharray="2 2" />
      <circle cx="20" cy="20" r="4" />
      <path d="M20 8v-4M20 36v-4M8 20H4M36 20h-4" />
    </svg>
  );
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
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        transition: 'transform 0.15s ease, border-color 0.3s ease, box-shadow 0.3s ease',
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
          height: 220,
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
      <div style={{ padding: 24, position: 'relative', zIndex: 2 }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '2px',
            color: 'var(--primary)',
            marginBottom: 10,
          }}
        >
          {project.num.replace('_', ' ')}
        </div>

        <h3
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: 6,
            lineHeight: 1.3,
          }}
        >
          {t(`project.${project.num}.title`) !== `project.${project.num}.title` ? t(`project.${project.num}.title`) : project.title}
        </h3>

        <p
          style={{
            fontSize: 12,
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: 16,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {t(`project.${project.num}.desc`) !== `project.${project.num}.desc` ? t(`project.${project.num}.desc`) : project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.5px',
                padding: '4px 10px',
                borderRadius: 100,
                background: 'var(--primary-dim)',
                color: 'var(--primary)',
                border: '1px solid rgba(0,240,255,0.08)',
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
