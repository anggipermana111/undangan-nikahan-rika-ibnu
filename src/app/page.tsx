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
    <div className="relative min-h-screen text-stone-800 bg-champagne-light/20 selection:bg-primary-200">
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

        {/* Closing Footer */}
        <footer className="py-24 px-4 bg-primary-900 text-white text-center pb-28">
          <div className="max-w-md mx-auto space-y-6">
            <div className="flex justify-center">
              <Heart className="w-8 h-8 text-primary-300 fill-primary-400" />
            </div>
            <p className="text-sm text-stone-300 leading-relaxed font-serif italic">
              &ldquo;Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.&rdquo;
            </p>
            <p className="text-xs uppercase tracking-[0.25em] text-champagne-DEFAULT">
              Kami yang berbahagia
            </p>
            <h3 className="font-serif text-3xl font-medium text-white tracking-wide">
              {weddingData.groom.nickName} & {weddingData.bride.nickName}
            </h3>
            <p className="text-xs text-stone-400 pt-8 border-t border-primary-800 tracking-wider">
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
    <Suspense fallback={<div className="min-h-screen bg-champagne-light flex items-center justify-center font-serif">Memuat Undangan...</div>}>
      <WeddingContent />
    </Suspense>
  );
}
