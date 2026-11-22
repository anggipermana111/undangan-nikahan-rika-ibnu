import React from 'react';
import LeafCorners from './LeafCorners';
import GoldSand from './GoldSand';

interface CardProps {
  variant?: 'cream' | 'forest';
  withLeaves?: boolean;
  withSand?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Card({
  variant = 'cream',
  withLeaves = false,
  withSand = false,
  className = '',
  children,
}: CardProps) {
  const tone = variant === 'cream' ? 'bg-cream-50 text-ink' : 'bg-forest-900 text-cream-50';
  const bottomSpace = withLeaves || withSand ? 'pb-28' : '';
  return (
    <div
      data-variant={variant}
      className={`relative overflow-hidden rounded-[2rem] shadow-xl shadow-black/15 ${tone} ${className}`}
    >
      <div className={`relative z-10 ${bottomSpace}`}>{children}</div>
      {withLeaves && <LeafCorners />}
      {withSand && <GoldSand />}
    </div>
  );
}
