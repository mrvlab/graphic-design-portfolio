'use client';

import { useState, useEffect } from 'react';
import { getCityFromTimezone } from '@/utils/timezones';

type ICityClock = {
  location?: string | null;
  timezone?: string | null;
};

const CityClock = ({ location, timezone = 'Europe/Madrid' }: ICityClock) => {
  const [time, setTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  const displayLocation =
    location || getCityFromTimezone(timezone || 'Europe/Madrid');

  useEffect(() => {
    const formatTime = () => {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone || 'Europe/Madrid',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(new Date());
    };

    setMounted(true);
    setTime(formatTime());

    const interval = setInterval(() => {
      setTime(formatTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <>
      <span>{displayLocation}</span>
      <span>{mounted ? time : '--:-- --'}</span>
    </>
  );
};

export default CityClock;
