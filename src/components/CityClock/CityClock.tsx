'use client';

import { useState, useEffect } from 'react';

type ICityClock = {
  location: string | null | undefined;
};

const formatTime = () => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Madrid',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // AM/PM format
  }).format(new Date());
};

const CityClock = ({ location }: ICityClock) => {
  const [time, setTime] = useState(formatTime()); // Initial time setup

  useEffect(() => {
    // Function to update the time
    const updateTime = () => {
      setTime(formatTime());
    };

    // Set an interval to update the time every second
    const interval = setInterval(updateTime, 1000); // Update every second

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return (
    <div>{location ? `${location} ${time}` : `Madrid, Spain ${time}`}</div>
  );
};

export default CityClock;
