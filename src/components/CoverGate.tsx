'use client';

import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { weddingData } from '@/data/wedding-data';
interface CoverGateProps {
  guestName?: string;
  onOpen: () => void;
}

export default function CoverGate({ guestName, onOpen }: CoverGateProps) {
  const displayGuestName = guestName && guestName.trim() !== '' ? guestName.trim() : 'Tamu Undangan';

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-champagne-light via-primary-50 to-champagne-light text-stone-800 text-center select-none overflow-hidden">
      {/* Decorative floral background ornament */}
      <div className="absolute inset-0 bg-[radial-gradient(#d2bab0_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

      {/* Top Header */}
      <div className="relative pt-8 animate-fade-in">
        <p className="text-xs uppercase tracking-[0.3em] text-primary-700 font-medium">
          The Wedding Celebration of
        </p>
      </div>

      {/* Center Hero Card */}
      <div className="relative flex flex-col items-center max-w-sm w-full my-auto py-8">
        {/* Monogram */}
        <div className="w-16 h-16 rounded-full border border-primary-300 flex items-center justify-center mb-6 shadow-sm bg-white/70 backdrop-blur-sm">
          <Heart className="w-6 h-6 text-primary-600 fill-primary-200" />
        </div>

        {/* Couple Names */}
        <h1 className="font-serif text-4xl sm:text-5xl text-primary-900 tracking-wide font-normal mb-2">
          {weddingData.groom.nickName} & {weddingData.bride.nickName}
        </h1>

        <p className="text-sm font-sans tracking-widest text-stone-500 mb-8">
          28 . 11 . 2026
        </p>

        {/* Recipient Box */}
        <div className="w-full bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-primary-200/60 shadow-lg shadow-primary-900/5 mb-8">
          <p className="text-xs font-sans text-stone-500 tracking-wider mb-2 uppercase">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="font-serif text-2xl font-semibold text-primary-900 mb-2 break-words">
            {displayGuestName}
          </h2>
          <p className="text-xs text-stone-500 italic max-w-xs mx-auto">
            Mohon maaf apabila ada kesalahan pada penulisan nama dan gelar
          </p>
        </div>

        {/* Open Invitation Button */}
        <button
          onClick={onOpen}
          aria-label="Buka Undangan"
          className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-primary-800 hover:bg-primary-900 text-white font-medium text-sm tracking-widest uppercase rounded-full shadow-lg shadow-primary-900/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Buka Undangan</span>
        </button>
      </div>

      {/* Bottom Footer Quote */}
      <div className="relative pb-6 text-xs text-stone-400 tracking-wider">
        <p>{weddingData.hashtag ?? `#${weddingData.groom.nickName}${weddingData.bride.nickName}Forever`}</p>
      </div>
    </div>
  );
}
