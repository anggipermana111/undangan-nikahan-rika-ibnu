'use client';

import React from 'react';
import { WeddingData } from '@/types/wedding';
import CountdownTimer from './CountdownTimer';
import WatercolorHeader from './ui/WatercolorHeader';
import FadeUp from './FadeUp';

interface HeroSectionProps {
  data: WeddingData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const { bride, groom, events } = data;
  return (
    <section id="hero" className="relative overflow-hidden bg-cream-50 text-center">
      <div className="relative h-[540px] bg-cream-100">
        <img
          src={data.heroPhoto}
          alt={`${bride.nickName} & ${groom.nickName}`}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        {/* Even dark tint for name contrast, then fade into the cream content below */}
        <div className="absolute inset-0 bg-forest-900/35" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-cream-50" />
        <WatercolorHeader className="-translate-y-[30%] opacity-80" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-16">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.35em] text-cream-50">
            The Wedding of
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-gold-500 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
            <span className="block">{bride.nickName}</span>
            <span className="block font-script text-4xl normal-case">&amp;</span>
            <span className="block">{groom.nickName}</span>
          </h1>
        </div>
      </div>

      <div className="relative px-6 pb-16 pt-4">
        <FadeUp>
          <p className="mb-6 font-sans text-sm text-ink">Kami berharap Anda menjadi bagian dari hari istimewa kami.</p>
          <CountdownTimer targetDateIso={events.akad.dateIso} />
          <div className="mx-auto my-6 h-px w-40 bg-gold-500/60" />
          <p className="font-display text-base text-forest-900">{events.akad.date}</p>
        </FadeUp>
      </div>
    </section>
  );
}
