'use client';

import React from 'react';
import { StoryMilestone } from '@/types/wedding';
import SectionTitle from './ui/SectionTitle';
import Sparkles from './ui/Sparkles';
import FadeUp from './FadeUp';

interface LoveStorySectionProps {
  data: StoryMilestone[];
}

export default function LoveStorySection({ data }: LoveStorySectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="story" className="relative overflow-hidden bg-forest-900 px-8 py-16 text-center text-cream-50">
      <Sparkles />
      <div className="relative z-10">
        <FadeUp>
          <SectionTitle title="Love Story" tone="light" />
        </FadeUp>
        <div className="mt-10 space-y-10">
          {data.map((item, index) => (
            <FadeUp key={item.title} delay={`fade-up-delay-${Math.min(index + 1, 5)}`}>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream-50/60">{item.year}</p>
              <h3 className="mt-1 font-display text-lg uppercase tracking-wider text-gold-500">{item.title}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-cream-50/85">{item.story}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
