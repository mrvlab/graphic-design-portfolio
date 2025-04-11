'use client';

import React, { useState, useEffect } from 'react';

export const ScrollProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const projectPage = document.getElementById('project-page');
      if (!projectPage) return;

      const percentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      setScrollPercentage(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);
    updateScroll();

    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  return <div className=''>{Math.round(scrollPercentage)}%</div>;
};
