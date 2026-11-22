'use client';

import React from 'react';
import { Instagram } from 'lucide-react';
import { CouplePerson, WeddingData } from '@/types/wedding';
import FadeUp from './FadeUp';

interface CoupleSectionProps {
  data: WeddingData;
}

function PersonCard({ person, label }: { person: CouplePerson; label: string }) {
  return (
    <div className="flex flex-col items-center justify-between h-full bg-white/70 backdrop-blur-md rounded-3xl p-5 sm:p-8 border border-white/90 shadow-lg shadow-[#1e3325]/5 hover:shadow-xl transition-all duration-300">
      <span className="px-4 py-1.5 bg-[#2d4234] text-white rounded-full text-[10px] tracking-widest uppercase font-sans font-semibold shadow-sm mb-4">
        {label}
      </span>

      <div className="my-auto text-center w-full">
        <h3 className="font-serif text-[1.45rem] sm:text-3xl md:text-4xl font-semibold text-[#1e3325] mb-2 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
          {person.fullName}
        </h3>
        <p className="text-xs uppercase tracking-wider text-[#43624f] mb-2 font-medium font-sans">
          {person.orderInFamily}
        </p>
        <p className="text-sm text-stone-600 font-sans leading-relaxed">
          {person.parents}
        </p>
      </div>

      {person.instagram && (
        <a
          href={`https://instagram.com/${person.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-xs text-[#2c4033] bg-white hover:bg-[#edf4f0] px-5 py-2.5 rounded-full border border-[#b8d4c4]/60 transition-all font-sans shadow-sm"
        >
          <Instagram className="w-4 h-4 text-[#3b5945]" />
          <span className="font-medium">@{person.instagram}</span>
        </a>
      )}
    </div>
  );
}

export default function CoupleSection({ data }: CoupleSectionProps) {
  const { groom, bride } = data;

  return (
    <section id="couple" className="relative py-24 px-4 text-center overflow-hidden bg-transparent">
      <div className="relative max-w-4xl mx-auto z-10">
        {/* Opening / Bismillah */}
        <FadeUp>
          <p className="font-script text-4xl sm:text-5xl text-[#1e3325] mb-2 leading-tight">
            Bismillahirrahmanirrahim
          </p>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#3f5d4a] font-semibold font-sans mb-8">
            Walimatul Ursy
          </p>
        </FadeUp>

        {/* Quote Card */}
        <FadeUp delay="fade-up-delay-1" className="mb-14">
          <div className="max-w-lg mx-auto bg-white/70 backdrop-blur-md rounded-3xl px-7 py-6 border border-white/80 shadow-lg shadow-[#1e3325]/5">
            <p className="font-serif italic text-sm sm:text-base text-[#2b3a30] leading-relaxed mb-3">
              &ldquo;{data.quote.text}&rdquo;
            </p>
            <span className="text-[11px] font-sans tracking-[0.2em] text-[#3f5d4a] font-bold uppercase">
              — {data.quote.source} —
            </span>
          </div>
        </FadeUp>

        {/* Section Label */}
        <FadeUp delay="fade-up-delay-2">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#3f5d4a] font-semibold font-sans mb-2">
            Mempelai
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1e3325] font-normal mb-16">
            Calon Pengantin
          </h2>
        </FadeUp>

        {/* Bride first, then Groom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 max-w-3xl mx-auto items-stretch px-2 sm:px-0">
          <FadeUp delay="fade-up-delay-3" className="h-full">
            <PersonCard person={bride} label="The Bride" />
          </FadeUp>
          <FadeUp delay="fade-up-delay-4" className="h-full">
            <PersonCard person={groom} label="The Groom" />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
