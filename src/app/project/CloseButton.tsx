'use client';

import { useRouter } from 'next/navigation';

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

  const handleClose = () => {
    router.back();
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
