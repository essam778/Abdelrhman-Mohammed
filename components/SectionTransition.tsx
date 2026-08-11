"use client";

import React, { createContext, useContext, useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface TransitionContextType {
  startTransition: (targetId: string) => void;
  activeSectionId: string;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useSectionTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useSectionTransition must be used within a SectionTransitionProvider");
  }
  return context;
};

const ColumnWithCurves = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', backgroundColor: 'var(--bg)' }}>
      {/* Top Curve (pointing upwards) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'absolute', bottom: '100%', left: 0, width: '100%', height: '15vh',
          fill: 'var(--bg)', pointerEvents: 'none'
        }}
      >
        <path d="M 0 100 C 30 0, 70 0, 100 100 Z" />
      </svg>

      {/* Bottom Curve (pointing downwards) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'absolute', top: '100%', left: 0, width: '100%', height: '15vh',
          fill: 'var(--bg)', pointerEvents: 'none'
        }}
      >
        <path d="M 0 0 C 30 100, 70 100, 100 0 Z" />
      </svg>
    </div>
  );
};

export const SECTIONS = ['#hero', '#about', '#skills', '#projects', '#experience', '#contact'];

export const SectionTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSectionId, setActiveSectionId] = useState(SECTIONS[0]);
  const isTransitioning = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const ladderRefs = useRef<(HTMLDivElement | null)[]>([]);

  const startTransition = (targetId: string) => {
    if (isTransitioning.current) return;

    const newIndex = SECTIONS.indexOf(targetId);
    if (newIndex === -1 || targetId === activeSectionId) return;

    isTransitioning.current = true;

    // Enable pointer events to block clicks during transition
    if (overlayRef.current) {
      overlayRef.current.style.pointerEvents = "auto";
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Change the active section!
        setActiveSectionId(targetId);

        // Reset scroll position to top for the new section
        window.scrollTo(0, 0);
        
        // Wait a tiny bit, then retract
        setTimeout(() => {
          retractLadders();
        }, 150);
      },
    });

    // Descent animation: Panels slide down one by one
    tl.to(ladderRefs.current, {
      y: "0%",
      duration: 0.7,
      stagger: 0.08,
      ease: "power2.inOut",
    });
  };

  const retractLadders = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = "none";
        }
      },
    });

    // Retract animation: Panels slide back up in reverse order
    tl.to(ladderRefs.current, {
      y: "-115%", // Translate past viewport plus the 15vh curve
      duration: 0.7,
      stagger: {
        each: 0.08,
        from: "end", // Reverse order
      },
      ease: "power2.inOut",
    });
  };

  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;
      
      const currentIndex = SECTIONS.indexOf(activeSectionId);
      
      // Check boundaries
      const isAtTop = window.scrollY <= 0;
      const isAtBottom = Math.ceil(window.scrollY + window.innerHeight) >= document.body.scrollHeight;

      if (e.deltaY > 0 && isAtBottom) { // Scrolling down at bottom
        e.preventDefault(); 
        if (currentIndex < SECTIONS.length - 1) {
          startTransition(SECTIONS[currentIndex + 1]);
        }
      } else if (e.deltaY < 0 && isAtTop) { // Scrolling up at top
        e.preventDefault(); 
        if (currentIndex > 0) {
          startTransition(SECTIONS[currentIndex - 1]);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning.current) return;
      
      const currentIndex = SECTIONS.indexOf(activeSectionId);
      
      const isAtTop = window.scrollY <= 0;
      const isAtBottom = Math.ceil(window.scrollY + window.innerHeight) >= document.body.scrollHeight;

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      if (deltaY > 50 && isAtBottom) {
        e.preventDefault();
        if (currentIndex < SECTIONS.length - 1) {
          touchStartY = touchEndY; 
          startTransition(SECTIONS[currentIndex + 1]);
        }
      } else if (deltaY < -50 && isAtTop) {
        e.preventDefault();
        if (currentIndex > 0) {
          touchStartY = touchEndY; 
          startTransition(SECTIONS[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeSectionId]);

  return (
    <TransitionContext.Provider value={{ startTransition, activeSectionId }}>
      {children}

      {/* Ladder Transitions Overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none', display: 'flex'
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              ladderRefs.current[i] = el;
            }}
            style={{
              width: '16.667%', height: '100vh', position: 'relative', flexShrink: 0,
              transform: "translateY(-115%)"
            }}
          >
            <ColumnWithCurves />
          </div>
        ))}
      </div>
    </TransitionContext.Provider>
  );
};
