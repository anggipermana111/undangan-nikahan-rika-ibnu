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
      <div className="py-6 px-4 bg-primary-100/50 rounded-2xl border border-primary-200 text-center text-primary-900 font-serif text-lg font-medium">
        ✨ Hari Bahagia Telah Tiba ✨
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
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-sm sm:max-w-md mx-auto">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-primary-200 shadow-sm"
        >
          <span className="font-serif text-2xl sm:text-3xl font-semibold text-primary-900">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-500 font-medium mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
