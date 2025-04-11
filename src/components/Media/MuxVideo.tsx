// components/MuxVideo.tsx
'use client';

import MuxPlayer from '@mux/mux-player-react';
import '@mux/mux-player';
import '@mux/mux-player/themes/minimal';
import clsx from 'clsx';
import { useEffect, useState, useRef, ComponentRef } from 'react';

type MuxVideoProps = {
  playbackId: string;
  className?: string;
};

export default function MuxVideo({ playbackId, className }: MuxVideoProps) {
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<ComponentRef<typeof MuxPlayer>>(null);

  useEffect(() => {
    setIsMounted(true);

    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const player = videoRef.current;
        if (player) {
          if (entry.isIntersecting) {
            setTimeout(() => {
              player.play?.();
            }, 0);
          } else {
            player.pause?.();
          }
        }
      });
    }, options);

    const element = videoRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <MuxPlayer
      ref={videoRef}
      playbackId={playbackId}
      streamType='on-demand'
      autoPlay
      muted
      loop
      preload='auto'
      theme='minimal'
      className={clsx(
        'mux-player-ui-none [--media-control-display:none]',
        className
      )}
      style={
        {
          width: '100%',
          height: '100%',
          '--controls-backdrop-color': 'transparent',
        } as React.CSSProperties
      }
    />
  );
}
