// components/MuxVideo.tsx
'use client';

import MuxPlayer from '@mux/mux-player-react';

type MuxVideoProps = {
  playbackId: string;
};

export default function MuxVideo({ playbackId }: MuxVideoProps) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      streamType='on-demand'
      autoPlay
      muted
      loop
      className='mux-player-ui-none'
      style={{ width: '100%', height: 'auto' }}
    />
  );
}
