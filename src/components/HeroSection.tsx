import React from 'react';
import { WeddingData } from '@/types/wedding';

interface HeroSectionProps {
  data: WeddingData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-24 overflow-hidden bg-[#f4f8f7]">
      {/* Dreamy Sky & Clouds Background */}
      <div 
        className="absolute inset-0 bg-cover bg-top opacity-50 pointer-events-none"
        style={{ backgroundImage: `url('/themes/dreamy/sky.webp')` }}
      />

      {/* Top Tree Branch Silhouette */}
      <div 
        className="absolute -top-4 -right-10 w-96 h-48 bg-contain bg-no-repeat pointer-events-none opacity-85"
        style={{ backgroundImage: `url('/themes/dreamy/tree.webp')` }}
      />

      <div className="relative max-w-xl mx-auto z-10 flex flex-col items-center">
        {/* Arch Photo Frame (Centerpiece like dreamyParallax) */}
        <div className="relative w-48 sm:w-56 h-64 sm:h-72 rounded-t-full rounded-b-2xl overflow-hidden shadow-xl border-4 border-white mb-6 bg-stone-200">
          <img
            src="/images/photo-2.jpg"
            alt="Ibnu & Rika"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
        </div>

        <p className="text-[11px] uppercase tracking-[0.35em] text-[#3d5a49] font-medium font-sans mb-3">
          Walimatul Ursy
        </p>

        <h1 className="font-serif text-5xl sm:text-6xl text-[#1e3325] tracking-wide font-normal mb-3 leading-none">
          {data.groom.nickName} & {data.bride.nickName}
        </h1>

        <p className="font-script text-2xl sm:text-3xl text-[#5b7a66] mb-5">
          Forever & Always
        </p>

        <div className="inline-block px-6 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-[#a8c4b2]/50 text-xs sm:text-sm tracking-[0.25em] text-[#2d4234] font-medium uppercase mb-10 shadow-sm">
          {data.events.akad.date}
        </div>

        {/* Sacred Quote Card */}
        <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#c4dacf]/60 shadow-lg shadow-[#1e3325]/5 text-stone-600 max-w-md mx-auto">
          <p className="font-serif italic text-sm sm:text-base leading-relaxed mb-4 text-[#2b3a30]">
            &ldquo;{data.quote.text}&rdquo;
          </p>
          <span className="text-[11px] font-sans tracking-[0.25em] text-[#3f5d4a] font-bold uppercase block">
            — {data.quote.source} —
          </span>
        </div>
      </div>

      {/* Bottom Greenery Accent */}
      <div 
        className="absolute -bottom-6 inset-x-0 h-24 bg-bottom bg-repeat-x bg-contain pointer-events-none opacity-40 z-0"
        style={{ backgroundImage: `url('/themes/dreamy/greenery.webp')` }}
      />
    </section>
  );
}
