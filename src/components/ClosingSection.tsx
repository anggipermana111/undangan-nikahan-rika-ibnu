'use client';

import React from 'react';
import { WeddingData } from '@/types/wedding';
import LeafCorners from './ui/LeafCorners';
import GoldSand from './ui/GoldSand';
import FadeUp from './FadeUp';

interface ClosingSectionProps {
  data: WeddingData;
}

export default function ClosingSection({ data }: ClosingSectionProps) {
  return (
    <section id="closing" className="relative overflow-hidden bg-cream-50 pb-40 text-center">
      <div className="relative h-[420px] bg-cream-100">
        <img
          src={data.closingPhoto}
          alt={`${data.bride.nickName} & ${data.groom.nickName}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream-50" />
      </div>
      <FadeUp className="relative z-10 -mt-10 px-8">
        <h2 className="font-display text-xl uppercase tracking-widest text-forest-900">Terima Kasih</h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-sage-500">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan
          memberikan doa restu. Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.
        </p>
        <p className="mt-6 font-script text-5xl text-gold-500">
          {data.bride.nickName} &amp; {data.groom.nickName}
        </p>
        {data.hashtag && (
          <p className="mt-4 font-sans text-xs font-semibold tracking-[0.3em] text-forest-900">{data.hashtag}</p>
        )}
      </FadeUp>
      <LeafCorners />
      <GoldSand />
    </section>
  );
}
