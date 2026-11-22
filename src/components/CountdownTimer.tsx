'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDateIso: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function CountdownTimer({ targetDateIso }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(targetDateIso).getTime() - new Date().getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateIso]);

  if (timeLeft.isPast) {
    return (
      <div className="rounded-2xl border border-cream-100 bg-cream-50 px-4 py-5 text-center font-display text-lg text-forest-900">
        Hari Bahagia Telah Tiba
      </div>
    );
  }

  const items = [
    { label: 'Hari', value: mounted ? timeLeft.days : 0 },
    { label: 'Jam', value: mounted ? timeLeft.hours : 0 },
    { label: 'Menit', value: mounted ? timeLeft.minutes : 0 },
    { label: 'Detik', value: mounted ? timeLeft.seconds : 0 },
  ];

  return (
    <div className="mx-auto grid max-w-xs grid-cols-4 gap-3">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <span className="font-display text-3xl text-forest-900">{String(item.value).padStart(2, '0')}</span>
          <span className="mt-1 font-sans text-[11px] text-sage-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
