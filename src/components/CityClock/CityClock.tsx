'use client';

import { useState, useEffect } from 'react';
import { vercelStegaSplit } from '@vercel/stega';
import { getCityFromTimezone } from '@/utils/timezones';

const FALLBACK_TIMEZONE = 'Europe/Madrid';

type ICityClock = {
  location?: string | null;
  timezone?: string | null;
};

const CityClock = ({ location, timezone }: ICityClock) => {
  const [time, setTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  const tz = (timezone ? vercelStegaSplit(timezone).cleaned : null) || FALLBACK_TIMEZONE;
  const displayLocation = location || getCityFromTimezone(tz);

  useEffect(() => {
    const formatTime = () =>
      new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(new Date());

    setMounted(true);
    setTime(formatTime());

    const interval = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(interval);
  }, [tz]);

  return (
    <>
      <span>{displayLocation}</span>
      <span>{mounted ? time : '--:-- --'}</span>
    </>
  );
};

export default CityClock;
