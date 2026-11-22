'use client';

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FadeUpProps {
  children: React.ReactNode;
  delay?: string;
  className?: string;
  threshold?: number;
}

export default function FadeUp({ children, delay = '', className = '', threshold }: FadeUpProps) {
  const { ref, isVisible } = useScrollAnimation(threshold !== undefined ? { threshold } : {});
  return (
    <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} ${delay} ${className}`}>
      {children}
    </div>
  );
}
