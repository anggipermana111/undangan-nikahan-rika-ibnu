import React from 'react';
import { WeddingData } from '@/types/wedding';

interface HeroSectionProps {
  data: WeddingData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden">
      {/* Background Floral Backdrop Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-champagne-light/70 via-white to-primary-50/50 pointer-events-none" />

      <div className="relative max-w-xl mx-auto z-10">
        <p className="text-xs uppercase tracking-[0.35em] text-primary-700 font-medium mb-4">
          Walimatul Ursy
        </p>

        <h1 className="font-serif text-5xl sm:text-6xl text-primary-900 tracking-wide font-normal mb-6 leading-tight">
          {data.groom.nickName} & {data.bride.nickName}
        </h1>

        <div className="inline-block px-5 py-1.5 border-y border-primary-300 text-xs sm:text-sm tracking-[0.25em] text-stone-600 uppercase mb-8">
          {data.events.akad.date}
        </div>

        {/* Religious Quranic Quote Card */}
        <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-primary-100 shadow-sm text-stone-600 max-w-lg mx-auto">
          <p className="font-serif italic text-sm sm:text-base leading-relaxed mb-4 text-stone-700">
            &ldquo;{data.quote.text}&rdquo;
          </p>
          <span className="text-xs font-sans tracking-widest text-primary-700 font-semibold uppercase">
            — {data.quote.source} —
          </span>
        </div>
      </div>
    </section>
  );
}
