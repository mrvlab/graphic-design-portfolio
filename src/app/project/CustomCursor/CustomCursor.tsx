'use client';

import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
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
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

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
