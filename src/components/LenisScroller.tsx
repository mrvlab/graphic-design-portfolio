'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export default function LenisScroller() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Disable Lenis on home page to avoid conflicts with Framer Motion scroll snapping
    if (pathname === '/') {
      return;
    }

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
  }, [pathname]);

  return null; // This component does not render anything itself
}
