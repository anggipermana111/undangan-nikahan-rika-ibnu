'use client';

import React from 'react';
import { weddingData } from '@/data/wedding-data';
import WatercolorHeader from './ui/WatercolorHeader';
import LeafCorners from './ui/LeafCorners';
import GoldSand from './ui/GoldSand';

interface CoverGateProps {
  guestName?: string;
  onOpen: () => void;
}

export default function CoverGate({ guestName, onOpen }: CoverGateProps) {
  const displayGuestName = guestName && guestName.trim() !== '' ? guestName.trim() : 'Tamu Undangan';
  const [first, second] = weddingData.monogram.split(' ');

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-forest-900">
      <div className="relative flex h-full w-full max-w-[440px] flex-col items-center overflow-hidden bg-cream-50 text-center">
        <WatercolorHeader className="h-[58%]" />

        <div className="relative z-10 mt-[12vh] flex flex-col items-center px-8">
          {/* Capsule photo */}
          <div className="relative h-[300px] w-[210px] overflow-hidden rounded-full border-4 border-cream-50 bg-cream-100 shadow-2xl">
            <img
              src={weddingData.coverPhoto}
              alt={`${weddingData.bride.nickName} & ${weddingData.groom.nickName}`}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-8 flex flex-col items-center text-cream-50">
              <p
                aria-label={`Monogram ${weddingData.monogram}`}
                className="font-display text-5xl leading-none tracking-widest"
              >
                <span>{first}</span>
                <span className="mx-1 font-script text-3xl text-gold-500">&</span>
                <span>{second}</span>
              </p>
              <p className="mt-2 font-serif text-sm italic tracking-wide">
                {weddingData.bride.nickName} &amp; {weddingData.groom.nickName}
              </p>
            </div>
          </div>

          <p className="mt-8 font-sans text-sm text-sage-500">Kepada Bapak/Ibu/Saudara/i</p>
          <h2
            data-testid="guest-name"
            className="mt-2 line-clamp-2 break-words font-serif text-2xl font-semibold leading-snug text-forest-900"
          >
            {displayGuestName}
          </h2>
          <p className="mt-1 text-[10px] italic text-sage-500">Mohon maaf bila ada kesalahan penulisan nama</p>

          <button
            onClick={onOpen}
            aria-label="Buka Undangan"
            className="mt-6 rounded-full bg-forest-900 px-8 py-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-cream-50 shadow-lg shadow-forest-900/30 transition-all hover:bg-forest-700 active:scale-95"
          >
            Buka Undangan
          </button>
        </div>

        <LeafCorners />
        <GoldSand />
      </div>
    </div>
  );
}
