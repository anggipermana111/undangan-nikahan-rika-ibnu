'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import { weddingData } from '@/data/wedding-data';

interface CoverGateProps {
  guestName?: string;
  onOpen: () => void;
}

export default function CoverGate({ guestName, onOpen }: CoverGateProps) {
  const displayGuestName = guestName && guestName.trim() !== '' ? guestName.trim() : 'Tamu Undangan';

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between items-center text-center select-none overflow-hidden bg-[#eaf4f7]">
      {/* Sky & Cloud Panoramic Background (Dreamy Parallax Art) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-95 transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('/themes/dreamy/sky.webp')` }}
      />

      {/* Hanging Big Tree Top Silhouette */}
      <div 
        className="absolute -top-6 -left-10 w-[120%] h-48 bg-contain bg-no-repeat pointer-events-none opacity-90 z-10"
        style={{ backgroundImage: `url('/themes/dreamy/tree.webp')` }}
      />

      {/* Soft Pink Watercolor Clouds */}
      <div 
        className="absolute top-20 right-0 w-72 h-44 bg-contain bg-no-repeat pointer-events-none opacity-70 z-0 animate-float-slow"
        style={{ backgroundImage: `url('/themes/dreamy/pink-cloud.webp')` }}
      />

      {/* Top Tagline */}
      <div className="relative pt-12 z-20 animate-fade-in px-4">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#3d5a49] font-medium drop-shadow-sm font-sans">
          The Wedding Celebration of
        </p>
      </div>

      {/* Center Arch Card with Arch Cutout & Arch Frame */}
      <div className="relative z-20 flex flex-col items-center max-w-xs sm:max-w-sm w-full mx-auto px-4 my-auto">
        {/* Arch Photo Container */}
        <div className="relative w-52 sm:w-60 h-72 sm:h-80 rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white/90 mb-5 bg-[#c5d8cf]">
          <img
            src="/images/photo-1.jpg"
            alt="Ibnu & Rika"
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 inset-x-0 text-white font-script text-2xl tracking-wide drop-shadow-md">
            Ibnu & Rika
          </div>
        </div>

        {/* Couple Names Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1f3326] tracking-wide font-normal mb-1">
          {weddingData.groom.nickName} & {weddingData.bride.nickName}
        </h1>

        <p className="text-xs uppercase tracking-[0.3em] text-[#4b6754] font-medium font-sans mb-5">
          Kamis, 03 Desember 2026
        </p>

        {/* Recipient Glass Box */}
        <div className="w-full bg-white/75 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/80 shadow-lg shadow-[#2c4033]/10 mb-5">
          <p className="text-[10px] font-sans text-stone-500 tracking-wider mb-1 uppercase font-medium">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1c2e22] mb-1 break-words">
            {displayGuestName}
          </h2>
          <p className="text-[10px] text-stone-500 italic max-w-xs mx-auto">
            Mohon maaf apabila ada kesalahan penulisan nama & gelar
          </p>
        </div>

        {/* Open Button (Pill Elegance) */}
        <button
          onClick={onOpen}
          aria-label="Buka Undangan"
          className="group inline-flex items-center gap-2.5 px-7 py-3 bg-[#2d4234] hover:bg-[#1e2f24] active:scale-95 text-white font-sans font-medium text-xs tracking-[0.2em] uppercase rounded-full shadow-lg shadow-[#2d4234]/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <Mail className="w-4 h-4 transition-transform group-hover:scale-110 text-emerald-200" />
          <span>Buka Undangan</span>
        </button>
      </div>

      {/* Bottom Lush Greenery Illustration */}
      <div 
        className="absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-bottom bg-repeat-x bg-contain pointer-events-none opacity-90 z-10"
        style={{ backgroundImage: `url('/themes/dreamy/greenery.webp')` }}
      />

      {/* Footer Hashtag */}
      <div className="relative pb-6 z-20 text-[11px] text-[#2c4334] font-sans tracking-widest font-semibold drop-shadow">
        <p>{weddingData.hashtag ?? '#IbnuRika2026'}</p>
      </div>
    </div>
  );
}
