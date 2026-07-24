'use client';

import { useEffect, useRef } from 'react';

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COUNT = 20;
    const MAX_DIST = 140;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; opacity: number }[] = [];
    let rafId = 0;
    let lastFrame = 0;
    const FPS_CAP = 24;
    const FRAME_INTERVAL = 1000 / FPS_CAP;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    }

    function animate(now: number) {
      rafId = requestAnimationFrame(animate);
      const elapsed = now - lastFrame;
      if (elapsed < FRAME_INTERVAL) return;
      lastFrame = now - (elapsed % FRAME_INTERVAL);

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const c = isLight ? '0, 153, 168' : '0, 229, 255';

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${c}, ${p.opacity})`;
        ctx!.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MAX_DIST * MAX_DIST) {
            const dist = Math.sqrt(distSq);
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(${c}, ${(1 - dist / MAX_DIST) * 0.1})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); init(); }, 300);
    }

    resize();
    init();
    rafId = requestAnimationFrame(animate);

    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas id="neural-canvas" ref={canvasRef} aria-hidden="true" role="presentation" />;
}
