import { useState, useEffect } from 'react';

/**
 * Detects when user has entered the site by watching for 'user-has-entered' class
 */
export function useEntranceDetection() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const actuallyEntered =
      document.documentElement.classList.contains('user-has-entered');
    setHasEntered(actuallyEntered);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const hasEnteredNow =
            document.documentElement.classList.contains('user-has-entered');
          setHasEntered(hasEnteredNow);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return hasEntered;
}


