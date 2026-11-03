'use client';

// ============================================================================
// AN FOCUS — Scroll Reveal Component
// IntersectionObserver-based reveal animation wrapper.
// Respects prefers-reduced-motion. GSAP-free (for now).
// ============================================================================

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/lib/cn';

interface ScrollRevealProps {
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;       // ms
  duration?: number;     // ms
  threshold?: number;    // 0–1
  children: ReactNode;
  className?: string;
}

// ── Initial transform offsets per direction ──────────────────────────────
const directionOffset: Record<string, string> = {
  up: 'translate3d(0, 48px, 0)',
  down: 'translate3d(0, -48px, 0)',
  left: 'translate3d(48px, 0, 0)',
  right: 'translate3d(-48px, 0, 0)',
  fade: 'translate3d(0, 0, 0)',
};

export default function ScrollReveal({
  direction = 'up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  children,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) {
      // If reduced motion preferred, show immediately
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [threshold, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={cn('will-change-[transform,opacity]', className)}
      style={
        prefersReducedMotion
          ? undefined
          : {
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? 'translate3d(0, 0, 0)'
                : directionOffset[direction],
              transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
            }
      }
    >
      {children}
    </div>
  );
}
