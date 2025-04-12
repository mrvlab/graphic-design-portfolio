'use client';

import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number>(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);

    const updatePosition = (e: MouseEvent) => {
      if (!isDesktop) return;

      rafIdRef.current = requestAnimationFrame(() => {
        cursorRef.current?.style.setProperty(
          'transform',
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
        );
      });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('resize', checkIfDesktop);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className='fixed pointer-events-none z-50 mix-blend-difference text-white font-bold'
    >
      scroll
    </div>
  );
};

export default CustomCursor;
