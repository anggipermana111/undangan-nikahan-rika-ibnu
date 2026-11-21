'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { weddingData } from '@/data/wedding-data';
import CoverGate from '@/components/CoverGate';
import AudioPlayer from '@/components/AudioPlayer';
import CoupleSection from '@/components/CoupleSection';
import EventSection from '@/components/EventSection';
import LoveStorySection from '@/components/LoveStorySection';
import GallerySection from '@/components/GallerySection';
import GiftSection from '@/components/GiftSection';
import RsvpWishesSection from '@/components/RsvpWishesSection';
import FloatingNavbar from '@/components/FloatingNavbar';
import { Heart } from 'lucide-react';

function WeddingContent() {
  const searchParams = useSearchParams();
  const [guestName, setGuestName] = useState<string>('Tamu Undangan');
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!searchParams) return;
    const to = searchParams.get('to');
    if (to && to.trim() !== '') {
      setGuestName(to.trim());
    }
  }, [searchParams]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
  };

  const handleToggleAudio = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#dbeef7] via-[#eaf4f7] to-[#dbeef7] selection:bg-emerald-100 selection:text-emerald-900">
      {/* Cover Gate Overlay */}
      {!isOpen && (
        <CoverGate guestName={guestName} onOpen={handleOpen} />
      )}

      {/* Floating Audio Controller */}
      <AudioPlayer
        isPlaying={isPlaying}
        onToggle={handleToggleAudio}
        audioSrc={weddingData.audioSrc}
      />

      {/* Floating Bottom Dock (only visible when opened) */}
      {isOpen && <FloatingNavbar />}

      {/* Main Wedding Content */}
      <main className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>

        {/* 1. Couple Section — first section seen after opening */}
        <CoupleSection data={weddingData} />

        {/* 2. Event & Countdown */}
        <EventSection events={weddingData.events} />

        {/* 3. Love Story — after event, before gallery */}
        <LoveStorySection data={weddingData.loveStory} />

        {/* 4. Gallery */}
        <GallerySection images={weddingData.gallery} />

        {/* 5. Gift & Digital Envelope */}
        <GiftSection bankAccounts={weddingData.bankAccounts} giftAddress={weddingData.giftAddress} />

        {/* 6. RSVP & Wishes */}
        <RsvpWishesSection guestName={guestName} />

        {/* 7. Footer */}
        <footer className="relative py-20 px-4 bg-[#1e2f24] text-white text-center pb-28 overflow-hidden">
          {/* Greenery top overlay */}
          <div
            className="absolute top-0 inset-x-0 h-20 bg-top bg-repeat-x bg-contain pointer-events-none opacity-30"
            style={{ backgroundImage: `url('/themes/dreamy/greenery.webp')` }}
          />
          {/* Big tree left silhouette */}
          <div
            className="absolute bottom-0 left-0 w-44 h-72 bg-contain bg-no-repeat bg-left-bottom pointer-events-none opacity-20"
            style={{ backgroundImage: `url('/themes/dreamy/big-tree.webp')` }}
          />
          {/* Big tree right silhouette (mirrored) */}
          <div
            className="absolute bottom-0 right-0 w-44 h-72 bg-contain bg-no-repeat bg-right-bottom pointer-events-none opacity-20"
            style={{
              backgroundImage: `url('/themes/dreamy/big-tree.webp')`,
              transform: 'scaleX(-1)',
            }}
          />

          <div className="relative max-w-md mx-auto space-y-6 z-10">
            {/* Heart ornament */}
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-emerald-300 fill-emerald-400/40" />
              </div>
            </div>

            <p className="font-script text-4xl sm:text-5xl text-white leading-tight">
              {weddingData.groom.nickName} & {weddingData.bride.nickName}
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-white/20 max-w-16" />
              <span className="text-emerald-300 text-sm">✦</span>
              <div className="h-px flex-1 bg-white/20 max-w-16" />
            </div>

            <p className="text-sm text-stone-300 leading-relaxed font-sans max-w-xs mx-auto">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
            </p>

            <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-200 font-sans font-semibold">
              Kami yang berbahagia
            </p>

            <p className="text-[11px] uppercase tracking-[0.4em] text-[#2d4234] font-sans font-bold">
              {weddingData.hashtag}
            </p>

            <div className="pt-6 border-t border-white/10">
              <p className="text-[10px] text-stone-500 tracking-wider font-sans">
                Beserta Seluruh Keluarga Besar
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function WeddingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#dbeef7] flex items-center justify-center font-serif text-[#1e3325] text-xl">Memuat Undangan...</div>}>
      <WeddingContent />
    </Suspense>
  );
}
