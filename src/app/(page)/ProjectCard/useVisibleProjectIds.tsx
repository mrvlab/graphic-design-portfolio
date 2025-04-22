import { useState, useEffect, useRef } from 'react';

export function useVisibleProjectIds() {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      // Scroll direction detection
      const goingDown = scrollY > prevScrollY.current;
      setIsScrollingDown(goingDown);
      prevScrollY.current = scrollY;

      const projects = Array.from(
        document.querySelectorAll('[id^="project-"]')
      ) as HTMLElement[];

      const total = projects.length;
      if (!total) return;

      const viewTop = window.innerHeight * 0.05;
      const viewBottom = window.innerHeight * 0.95;
      const viewCenter = (viewTop + viewBottom) / 2;

      const projectData = projects.map((el, index) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        return {
          index,
          center: elCenter,
          distanceToCenter: Math.abs(elCenter - viewCenter),
        };
      });

      const centered = projectData.reduce((a, b) =>
        a.distanceToCenter < b.distanceToCenter ? a : b
      );
      const mainIndex = centered.index;

      const isAtTop = scrollY < 10;
      const isAtBottom =
        window.innerHeight + scrollY >= document.body.scrollHeight - 10;

      let visible: number[];

      if (isAtTop) {
        visible = [0, 1, 2];
      } else if (isAtBottom) {
        visible = [total - 3, total - 2, total - 1];
      } else {
        // Show centered project + 1 before and 1 after
        visible = [mainIndex - 1, mainIndex, mainIndex + 1];
      }

      const clamped = visible.filter((i) => i >= 0 && i < total).slice(0, 3);

      // Fallback fill to always have 3 items
      while (clamped.length < 3) {
        const candidate = Math.max(0, Math.min(...clamped) - 1);
        if (!clamped.includes(candidate)) {
          clamped.unshift(candidate);
        } else {
          break;
        }
      }

      clamped.sort((a, b) => a - b);
      setVisibleProjects(clamped);
    };

    onScroll(); // Initial run
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { visibleProjects, isScrollingDown };
}
