'use client';

import { useEffect, useRef, useState } from 'react';
import { useHasEnteredSite } from '@/app/project/utils/useHasEnteredSite';

type IHomeGridCursor = {
  enterSiteText: string;
};

const HomeGridCursor = ({ enterSiteText }: IHomeGridCursor) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number>(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const hasUserEntered = useHasEnteredSite();

  useEffect(() => {
    const checkResize = () => setIsDesktop(window.innerWidth >= 1024);

    const updateCursor = (e: MouseEvent) => {
      if (!isDesktop) return;
      rafIdRef.current = requestAnimationFrame(() => {
        cursorRef.current?.style.setProperty(
          'transform',
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
        );
      });
    };

    checkResize();
    window.addEventListener('resize', checkResize);
    window.addEventListener('mousemove', updateCursor);

    return () => {
      window.removeEventListener('resize', checkResize);
      window.removeEventListener('mousemove', updateCursor);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [isDesktop]);

  if (!isDesktop || hasUserEntered) return null;

  return (
    <>
      <style jsx global>{`
        body,
        body * {
          cursor: none !important;
        }
      `}</style>

      <div
        ref={cursorRef}
        className="fixed left-0 top-0 pointer-events-none z-100 mix-blend-difference text-white"
        style={{ willChange: 'transform' }}
      >
        {enterSiteText}
      </div>
    </>
  );
};

export default HomeGridCursor;
