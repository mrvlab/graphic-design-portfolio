'use client';

import { useEffect, useRef, useState } from 'react';
import { useHasEnteredSite } from '@/app/project/utils/useHasEnteredSite';

type IHomeGridCursor = {
  enterSiteText: string;
};
const DESKTOP_BREAKPOINT = 1024;

const HomeGridCursor = ({ enterSiteText }: IHomeGridCursor) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number>(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const hasUserEntered = useHasEnteredSite();

  useEffect(() => {
    // Check screen size
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Update cursor position
    const updateCursorPosition = (e: MouseEvent) => {
      if (!isDesktop) return;

      rafIdRef.current = requestAnimationFrame(() => {
        if (cursorRef.current) {
          const x = e.clientX;
          const y = e.clientY;
          cursorRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        }
      });
    };

    window.addEventListener('mousemove', updateCursorPosition);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', updateCursorPosition);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Only hide system cursor when user hasn't entered yet */}
      {!hasUserEntered && (
        <style jsx global>{`
          body,
          body * {
            cursor: none !important;
          }
        `}</style>
      )}

      {/* Only show custom cursor text when user hasn't entered yet */}
      {!hasUserEntered && (
        <div
          ref={cursorRef}
          className="fixed left-0 top-0 pointer-events-none z-100 mix-blend-difference text-white"
          style={{ willChange: 'transform' }}
        >
          {enterSiteText}
        </div>
      )}
    </>
  );
};

export default HomeGridCursor;
