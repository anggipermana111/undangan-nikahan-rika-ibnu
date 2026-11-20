'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { weddingData } from '@/data/wedding-data';
import CoverGate from '@/components/CoverGate';
import AudioPlayer from '@/components/AudioPlayer';
import HeroSection from '@/components/HeroSection';
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
    <div className="relative min-h-screen text-stone-800 bg-[#f7f9f8] selection:bg-emerald-100 selection:text-emerald-900">
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

      {/* Main Wedding Content Container */}
      <main className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <HeroSection data={weddingData} />
        <CoupleSection data={weddingData} />
        <EventSection events={weddingData.events} />
        <LoveStorySection data={weddingData.loveStory} />
        <GallerySection images={weddingData.gallery} />
        <GiftSection bankAccounts={weddingData.bankAccounts} giftAddress={weddingData.giftAddress} />
        <RsvpWishesSection guestName={guestName} />

        {/* Closing Footer with Dreamy Forest Tone */}
        <footer className="relative py-24 px-4 bg-[#1e2f24] text-white text-center pb-28 overflow-hidden">
          {/* Subtle floral/greenery footer decoration */}
          <div 
            className="absolute top-0 inset-x-0 h-20 bg-top bg-repeat-x bg-contain opacity-20 pointer-events-none"
            style={{ backgroundImage: `url('/themes/dreamy/greenery.webp')` }}
          />

          <div className="relative max-w-md mx-auto space-y-6 z-10">
            <div className="flex justify-center">
              <Heart className="w-7 h-7 text-emerald-300 fill-emerald-400/40" />
            </div>
            <p className="text-sm text-stone-300 leading-relaxed font-serif italic">
              &ldquo;Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.&rdquo;
            </p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-200 font-sans font-semibold">
              Kami yang berbahagia
            </p>
            <h3 className="font-serif text-3xl font-medium text-white tracking-wide">
              {weddingData.groom.nickName} & {weddingData.bride.nickName}
            </h3>
            <p className="text-[11px] text-stone-400 pt-8 border-t border-white/10 tracking-wider font-sans">
              Beserta Seluruh Keluarga Besar
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function WeddingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#eaf4f7] flex items-center justify-center font-serif text-[#1e3325]">Memuat Undangan...</div>}>
      <WeddingContent />
    </Suspense>
  );
}
