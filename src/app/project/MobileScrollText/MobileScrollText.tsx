import React from 'react';

const MobileScrollText = ({ showScrollText }: { showScrollText: boolean }) => {
  // For backward compatibility, we'll use the old prop name but with the new logic
  const isVisible = showScrollText;

  return (
    <div
      className={`flex flex-col justify-end items-center text-center lg:hidden fixed inset-0 h-[calc(100dvh-var(--mobile-nav-home-height))] mt-auto lg:min-h-dvh flex-1 bg-transparent pointer-events-none select-none py-2.5 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} z-50 mix-blend-difference text-white font-bold`}
    >
      Scroll
    </div>
  );
};

export default MobileScrollText;
