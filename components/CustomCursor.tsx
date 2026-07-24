'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const trail = trailRef.current;
    if (!dot || !trail) return;

    let mx = 0, my = 0;
    let tx = 0, ty = 0;

    function onMouseMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      dot!.style.left = mx + 'px';
      dot!.style.top = my + 'px';
    }

    function animate() {
      tx += (mx - tx) * 0.12;
      ty += (my - ty) * 0.12;
      trail!.style.left = tx + 'px';
      trail!.style.top = ty + 'px';
      requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', onMouseMove);
    animate();

    const hoverEls = document.querySelectorAll('a, button, [data-tilt], .skill-chip, .skill-category, .detail-row, .ctrl-btn, .social-link, .cert-card, .project-card');
    function onEnter(this: HTMLElement) {
      trail!.style.width = '56px';
      trail!.style.height = '56px';
      trail!.style.borderColor = 'var(--secondary)';
      trail!.style.background = 'rgba(124, 58, 237, 0.05)';
    }
    function onLeave(this: HTMLElement) {
      trail!.style.width = '40px';
      trail!.style.height = '40px';
      trail!.style.borderColor = 'var(--primary)';
      trail!.style.background = 'rgba(0, 240, 255, 0.03)';
    }

    for (const el of Array.from(hoverEls)) {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      for (const el of Array.from(hoverEls)) {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      }
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-trail" ref={trailRef} />
    </>
  );
}
