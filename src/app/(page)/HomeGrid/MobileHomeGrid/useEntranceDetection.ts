import { useState, useEffect } from 'react';

/**
 * Detects when user has entered the site by watching for 'user-has-entered' class
 */
export function useEntranceDetection() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const checkEntered = () => {
      setHasEntered(
        document.documentElement.classList.contains('user-has-entered')
      );
    };

    checkEntered();

    const observer = new MutationObserver(checkEntered);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return hasEntered;
}
