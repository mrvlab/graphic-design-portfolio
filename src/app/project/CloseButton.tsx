'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface CloseButtonProps {
  className?: string;
  id: string;
  ariaHidden?: boolean;
}

const CloseButton = ({
  className,
  id,
  ariaHidden = false,
}: CloseButtonProps) => {
  const router = useRouter();

  // Navigate back to home or projects when closing a project
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/project/')) {
      const previousPath = document.referrer;
      const fromPath = previousPath.includes('/home') ? '/home' : '/projects';
      window.history.replaceState({ from: fromPath }, '');
    }
  }, []);

  const handleClose = () => {
    const state = window.history.state;
    if (state?.from) {
      router.push(state.from);
    } else {
      router.push('/home');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClose();
    }
  };

  return (
    <button
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      className={className}
      aria-label={`Close and return to previous page (${id})`}
      role='button'
      tabIndex={0}
      id={id}
      aria-hidden={ariaHidden}
    >
      Close
    </button>
  );
};

export default CloseButton;
