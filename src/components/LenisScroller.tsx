'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function LenisScroller() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    lenisRef.current = lenis;
    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null; // This component does not render anything itself
}
