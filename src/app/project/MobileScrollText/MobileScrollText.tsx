import React from 'react';

const MobileScrollText = ({
  isFirstSectionVisible,
}: {
  isFirstSectionVisible: boolean;
}) => {
  const isVisible = !isFirstSectionVisible;

  return (
    <div
      className={`flex flex-col justify-end items-center text-center lg:hidden fixed inset-0 min-h-screen lg:min-h-dvh flex-1 bg-transparent pointer-events-none select-none py-2.5 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} z-50 mix-blend-difference text-white font-bold`}
    >
      Scroll
    </div>
  );
};

export default MobileScrollText;
