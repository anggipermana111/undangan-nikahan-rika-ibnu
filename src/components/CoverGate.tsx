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
      style={{ background: '#c8e8f4' }}
    >
      {/* ── LAYER 1: Sky background (slowest parallax) ── */}
      <div
        className="parallax-layer inset-0 bg-cover bg-top"
        style={{
          backgroundImage: `url('/themes/dreamy/sky.webp')`,
          transform: `translateY(${scrollY * 0.08}px)`,
          top: '-5%',
          bottom: '-5%',
          left: 0,
          right: 0,
        }}
      />

      {/* ── LAYER 2: Pink clouds (slow drift) ── */}
      <div
        className="parallax-layer animate-float-slow opacity-80"
        style={{
          backgroundImage: `url('/themes/dreamy/pink-cloud.webp')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '340px',
          height: '200px',
          top: '8%',
          right: '-2%',
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />
      {/* Second cloud, left side */}
      <div
        className="parallax-layer animate-float-medium opacity-50"
        style={{
          backgroundImage: `url('/themes/dreamy/pink-cloud.webp')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '220px',
          height: '140px',
          top: '14%',
          left: '-3%',
          transform: `translateY(${scrollY * 0.03}px) scaleX(-1)`,
        }}
      />

      {/* ── LAYER 3: Tree top overlay ── */}
      <div
        className="parallax-layer animate-sway opacity-90"
        style={{
          backgroundImage: `url('/themes/dreamy/tree.webp')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '110%',
          height: '220px',
          top: '-10px',
          left: '-5%',
          transformOrigin: 'top left',
          transform: `translateY(${scrollY * 0.12}px)`,
        }}
      />

      {/* ── LAYER 4: Lottie bird animation ── */}
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
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.4em] text-[#1e3325] font-semibold drop-shadow-sm font-sans">
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
            src="/images/photo-3.jpg"
            alt="Ibnu & Rika"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e3325]/50 via-transparent to-transparent" />
        </div>

        {/* Couple Names */}
        <h1 className="font-script text-5xl sm:text-6xl text-[#1e3325] leading-tight drop-shadow-sm mb-1">
          {weddingData.groom.nickName} & {weddingData.bride.nickName}
        </h1>
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#2d4234] font-medium font-sans mb-5">
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

      {/* ── LAYER 5: Big tree left ── */}
      <div
        className="parallax-layer opacity-85"
        style={{
          backgroundImage: `url('/themes/dreamy/big-tree.webp')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom left',
          width: '220px',
          height: '400px',
          bottom: 0,
          left: 0,
          transform: `translateY(${scrollY * 0.18}px)`,
        }}
      />

      {/* ── LAYER 6: Greenery silhouette bottom (fastest) ── */}
      <div
        className="parallax-layer opacity-95"
        style={{
          backgroundImage: `url('/themes/dreamy/greenery.webp')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom center',
          height: '100px',
          bottom: 0,
          left: 0,
          right: 0,
          transform: `translateY(${scrollY * 0.22}px)`,
        }}
      />

      {/* ── HASHTAG FOOTER ── */}
      <div className="relative pb-5 z-20 text-[11px] text-[#1e3325] font-sans tracking-[0.3em] font-bold drop-shadow">
        <p>{weddingData.hashtag ?? '#IbnuRika2026'}</p>
      </div>
    </div>
  );
}
