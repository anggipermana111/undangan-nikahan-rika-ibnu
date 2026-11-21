'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { weddingData } from '@/data/wedding-data';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic<{ animationData: any; loop?: boolean; style?: React.CSSProperties }>(
  () => import('lottie-react').then((mod) => mod.Lottie as any),
  { ssr: false }
);

interface CoverGateProps {
  guestName?: string;
  onOpen: () => void;
}

export default function CoverGate({ guestName, onOpen }: CoverGateProps) {
  const displayGuestName = guestName && guestName.trim() !== '' ? guestName.trim() : 'Tamu Undangan';
  const [birdData, setBirdData] = useState<object | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load bird lottie JSON
  useEffect(() => {
    fetch('/lottie/birds.json')
      .then((r) => r.json())
      .then((data) => setBirdData(data))
      .catch(() => null);
  }, []);

  // Parallax scroll handler
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between text-center select-none overflow-hidden"
    >
      {/* ── LAYER 1: Single full cover background ── */}
      <div
        className="parallax-layer inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/themes/dreamy/main-bg.webp')`,
          transform: `translateY(${scrollY * 0.05}px)`,
          top: '-5%',
          bottom: '-5%',
          left: 0,
          right: 0,
        }}
      />

      {/* ── LAYER 2: Lottie bird animation ── */}
      {birdData && (
        <div
          className="parallax-layer z-10"
          style={{ top: '18%', left: 0, right: 0, height: '120px' }}
        >
          <Lottie
            animationData={birdData}
            loop
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}

      {/* ── TOP LABEL ── */}
      <div className="relative pt-14 z-20 animate-fade-in px-4">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.4em] text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] font-sans">
          The Wedding of
        </p>
      </div>

      {/* ── CENTER CONTENT ── */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-xs sm:max-w-sm mx-auto px-5 my-auto">
        {/* Arch Photo Frame */}
        <div
          className="relative mb-5 shadow-2xl border-[3px] border-white/90"
          style={{
            width: '200px',
            height: '268px',
            borderRadius: '9999px 9999px 1.5rem 1.5rem',
            overflow: 'hidden',
          }}
        >
          <img
            src="/images/cover-photo.jpeg"
            alt="Rika & Ibnu"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e3325]/50 via-transparent to-transparent" />
        </div>

        {/* Couple Names (Rika duluan baru Ibnu, warna putih dengan drop-shadow jelas) */}
        <h1 className="font-script text-5xl sm:text-6xl text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] mb-1">
          {weddingData.bride.nickName} & {weddingData.groom.nickName}
        </h1>
        <p className="text-[11px] uppercase tracking-[0.35em] text-white font-semibold font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mb-5">
          03 . 12 . 2026
        </p>

        {/* Guest Name Box (glassmorphism) */}
        <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/80 shadow-lg shadow-[#1e3325]/10 mb-5">
          <p className="text-[10px] font-sans text-[#3b5945] tracking-widest mb-1 uppercase font-semibold">
            Kepada Yth.
          </p>
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1c2e22] break-words leading-snug">
            {displayGuestName}
          </h2>
          <p className="text-[9px] text-stone-500 italic mt-1">
            Mohon maaf bila ada kesalahan penulisan nama
          </p>
        </div>

        {/* Open Button */}
        <button
          onClick={onOpen}
          aria-label="Buka Undangan"
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#2d4234] hover:bg-[#1e2f24] active:scale-95 text-white font-sans font-semibold text-xs tracking-[0.25em] uppercase rounded-full shadow-xl shadow-[#1e3325]/30 hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
          <span>Buka Undangan</span>
          <svg className="w-3.5 h-3.5 text-emerald-300 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {/* ── HASHTAG FOOTER ── */}
      <div className="relative pb-5 z-20 text-[11px] text-white font-sans tracking-[0.3em] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        <p>{weddingData.hashtag ?? '#RikaIbnu2026'}</p>
      </div>
    </div>
  );
}
