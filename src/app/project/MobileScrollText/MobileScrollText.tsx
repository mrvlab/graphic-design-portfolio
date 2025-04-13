import React from 'react';

const MobileScrollText = ({
  isFirstSectionVisible,
  hasScrolled,
}: {
  isFirstSectionVisible: boolean;
  hasScrolled: boolean;
}) => {
  return (
    <div
      className={`flex flex-col justify-end items-center text-center lg:hidden fixed inset-0 min-h-screen lg:min-h-dvh flex-1 bg-transparent pointer-events-none select-none py-2.5 transition-opacity duration-300 ${isFirstSectionVisible && hasScrolled ? 'opacity-0' : 'opacity-100'} z-50 mix-blend-difference text-white font-bold`}
    >
      Scroll
    </div>
  );
};

export default MobileScrollText;
