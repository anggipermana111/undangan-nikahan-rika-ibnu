'use client';

import React from 'react';
import { Instagram } from 'lucide-react';
import { WeddingData } from '@/types/wedding';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CoupleSectionProps {
  data: WeddingData;
}

function FadeUpDiv({ children, delay = '', className = '' }: { children: React.ReactNode; delay?: string; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} ${delay} ${className}`}>
      {children}
    </div>
  );
}

export default function CoupleSection({ data }: CoupleSectionProps) {
  const { groom, bride } = data;

  return (
    <section id="couple" className="relative py-24 px-4 text-center overflow-hidden bg-[#dbeef7]">
      {/* Sky wash background */}
      <div
        className="absolute inset-0 bg-cover bg-top opacity-60 pointer-events-none"
        style={{ backgroundImage: `url('/themes/dreamy/sky.webp')` }}
      />

      {/* Tree branch top-left */}
      <div
        className="absolute -top-4 -left-10 w-[55%] h-48 bg-contain bg-no-repeat pointer-events-none opacity-50"
        style={{ backgroundImage: `url('/themes/dreamy/tree.webp')` }}
      />
      {/* Tree branch top-right (mirrored) */}
      <div
        className="absolute -top-4 -right-10 w-[40%] h-36 bg-contain bg-no-repeat pointer-events-none opacity-30"
        style={{
          backgroundImage: `url('/themes/dreamy/tree.webp')`,
          transform: 'scaleX(-1)',
        }}
      />

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Opening / Bismillah */}
        <FadeUpDiv>
          <p className="font-script text-4xl sm:text-5xl text-[#1e3325] mb-2 leading-tight">
            Bismillahirrahmanirrahim
          </p>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#3f5d4a] font-semibold font-sans mb-8">
            Walimatul Ursy
          </p>
        </FadeUpDiv>

        {/* Quote Card */}
        <FadeUpDiv delay="fade-up-delay-1" className="mb-14">
          <div className="max-w-lg mx-auto bg-white/70 backdrop-blur-md rounded-3xl px-7 py-6 border border-white/80 shadow-lg shadow-[#1e3325]/5">
            <p className="font-serif italic text-sm sm:text-base text-[#2b3a30] leading-relaxed mb-3">
              &ldquo;{data.quote.text}&rdquo;
            </p>
            <span className="text-[11px] font-sans tracking-[0.2em] text-[#3f5d4a] font-bold uppercase">
              — {data.quote.source} —
            </span>
          </div>
        </FadeUpDiv>

        {/* Section Label */}
        <FadeUpDiv delay="fade-up-delay-2">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#3f5d4a] font-semibold font-sans mb-2">
            Mempelai
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1e3325] font-normal mb-16">
            Calon Pengantin
          </h2>
        </FadeUpDiv>

        {/* Couple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 items-start">
          {/* Groom Card */}
          <FadeUpDiv delay="fade-up-delay-3">
            <div className="flex flex-col items-center">
              {/* Arch photo */}
              <div
                className="relative mb-6 shadow-2xl border-4 border-white bg-stone-100"
                style={{
                  width: '200px',
                  height: '268px',
                  borderRadius: '9999px 9999px 1.5rem 1.5rem',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={groom.photo}
                  alt={groom.fullName}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3325]/30 via-transparent to-transparent" />
                {/* The Groom badge */}
                <div className="absolute bottom-3 inset-x-0 flex justify-center">
                  <span className="px-4 py-1 bg-[#2d4234] text-white rounded-full text-[10px] tracking-widest uppercase font-sans font-semibold shadow-md">
                    The Groom
                  </span>
                </div>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1e3325] mb-1">
                {groom.fullName}
              </h3>
              <p className="text-xs uppercase tracking-wider text-[#43624f] mb-1 font-medium font-sans">
                {groom.orderInFamily} 2 bersaudara
              </p>
              <p className="text-sm text-stone-600 mb-5 font-sans">
                {groom.parents}
              </p>

              {groom.instagram && (
                <a
                  href={`https://instagram.com/${groom.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-[#2c4033] bg-white/80 hover:bg-white px-4 py-2 rounded-full border border-[#b8d4c4]/60 transition-all font-sans shadow-sm"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#3b5945]" />
                  <span>@{groom.instagram}</span>
                </a>
              )}
            </div>
          </FadeUpDiv>

          {/* Bride Card */}
          <FadeUpDiv delay="fade-up-delay-4">
            <div className="flex flex-col items-center">
              {/* Arch photo */}
              <div
                className="relative mb-6 shadow-2xl border-4 border-white bg-stone-100"
                style={{
                  width: '200px',
                  height: '268px',
                  borderRadius: '9999px 9999px 1.5rem 1.5rem',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={bride.photo}
                  alt={bride.fullName}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3325]/30 via-transparent to-transparent" />
                {/* The Bride badge */}
                <div className="absolute bottom-3 inset-x-0 flex justify-center">
                  <span className="px-4 py-1 bg-[#2d4234] text-white rounded-full text-[10px] tracking-widest uppercase font-sans font-semibold shadow-md">
                    The Bride
                  </span>
                </div>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1e3325] mb-1">
                {bride.fullName}
              </h3>
              <p className="text-xs uppercase tracking-wider text-[#43624f] mb-1 font-medium font-sans">
                {bride.orderInFamily} 5 bersaudara
              </p>
              <p className="text-sm text-stone-600 mb-5 font-sans">
                {bride.parents}
              </p>

              {bride.instagram && (
                <a
                  href={`https://instagram.com/${bride.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-[#2c4033] bg-white/80 hover:bg-white px-4 py-2 rounded-full border border-[#b8d4c4]/60 transition-all font-sans shadow-sm"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#3b5945]" />
                  <span>@{bride.instagram}</span>
                </a>
              )}
            </div>
          </FadeUpDiv>
        </div>
      </div>

      {/* Foreground flower bottom decoration */}
      <div
        className="absolute bottom-0 inset-x-0 h-20 bg-bottom bg-repeat-x bg-contain pointer-events-none opacity-40 z-10"
        style={{ backgroundImage: `url('/themes/dreamy/foregroundFlower.webp')` }}
      />
    </section>
  );
}
