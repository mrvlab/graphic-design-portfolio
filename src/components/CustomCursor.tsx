'use client';

import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface Ripple {
  x: number;
  y: number;
  id: string;
}

export default function CustomCursor() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  const mousePosition = useRef({ x: 0, y: 0 });
  const isHoveringInteractive = useRef(false);
  const rafId = useRef<number | null>(null);

  const springConfig = { damping: 10, stiffness: 800, mass: 0.3 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    setMounted(true);
    const checkIsDesktop = () => {
      const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isWideScreen = window.innerWidth >= 1024;
      return !isTouchDevice && isWideScreen;
    };

    setIsDesktop(checkIsDesktop());
    const handleResize = () => setIsDesktop(checkIsDesktop());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!mounted || !isDesktop) return;

    const updateCursorPosition = () => {
      x.set(mousePosition.current.x - 202);
      y.set(mousePosition.current.y - 202);

      if (Date.now() % 100 < 50 && !isHoveringInteractive.current) {
        setRipples((prev) => [
          ...prev.slice(-4),
          {
            x: mousePosition.current.x - 202,
            y: mousePosition.current.y - 202,
            id: `ripple-${Date.now()}-${Math.random()}`,
          },
        ]);
      }

      rafId.current = requestAnimationFrame(updateCursorPosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const { cursor } = window.getComputedStyle(element);
        isHoveringInteractive.current = !(
          cursor === 'default' || cursor === 'auto'
        );
        setIsVisible(!isHoveringInteractive.current);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId.current = requestAnimationFrame(updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [mounted, isDesktop, x, y]);

  if (
    typeof window === 'undefined' ||
    !mounted ||
    pathname !== '/home' ||
    !isDesktop
  ) {
    return null;
  }

  const CursorSVG = ({ id }: { id?: string }) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 404 404'
      width='100%'
      height='100%'
      style={{ display: 'block' }}
      aria-hidden='true'
    >
      <defs>
        <radialGradient
          id={id || 'a'}
          cx='-215.1'
          cy='799.2'
          r='1'
          fx='-215.1'
          fy='799.2'
          gradientTransform='matrix(0 136.3 136.3 0 -108735.8 29526.1)'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='.3' stopColor='#ff93a5' stopOpacity='.9' />
          <stop offset='.6' stopColor='#00ff8a' stopOpacity='.8' />
          <stop offset='.9' stopColor='#cfffe9' stopOpacity='0' />
        </radialGradient>
      </defs>
      <circle
        cx='202'
        cy='202'
        r='152'
        fill={`url(#${id || 'a'})`}
        opacity='.9'
      />
    </svg>
  );

  return (
    <>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className='fixed pointer-events-none z-50'
            initial={{ opacity: 0.8, scale: 1, x: ripple.x, y: ripple.y }}
            animate={{ opacity: 0, scale: 1.5, x: ripple.x, y: ripple.y }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              width: '404px',
              height: '404px',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(8px)',
              willChange: 'transform, opacity',
            }}
          >
            <CursorSVG id={`a-${ripple.id}`} />
          </motion.div>
        ))}
      </AnimatePresence>
      <motion.div
        className='fixed pointer-events-none z-50'
        style={{
          x,
          y,
          width: '404px',
          height: '404px',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(28px)',
          willChange: 'transform, opacity',
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ stiffness: 1200, damping: 15, mass: 0.2, duration: 0.05 }}
      >
        <CursorSVG />
      </motion.div>
    </>
  );
}
