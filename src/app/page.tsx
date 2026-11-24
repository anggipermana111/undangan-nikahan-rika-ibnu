'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { weddingData } from '@/data/wedding-data';
import CoverGate from '@/components/CoverGate';
import AudioPlayer from '@/components/AudioPlayer';
import HeroSection from '@/components/HeroSection';
import QuoteSection from '@/components/QuoteSection';
import CoupleSection from '@/components/CoupleSection';
import EventSection from '@/components/EventSection';
import LoveStorySection from '@/components/LoveStorySection';
import GallerySection from '@/components/GallerySection';
import GiftSection from '@/components/GiftSection';
import RsvpWishesSection from '@/components/RsvpWishesSection';
import ClosingSection from '@/components/ClosingSection';

function WeddingContent() {
  const searchParams = useSearchParams();
  const [guestName, setGuestName] = useState<string>('Tamu Undangan');
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!searchParams) return;
    const to = searchParams.get('to');
    if (to && to.trim() !== '') setGuestName(to.trim());
  }, [searchParams]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Desktop backdrop outside the phone-width column */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-forest-900 bg-cover bg-center"
        style={{ backgroundImage: "url('/themes/forest/outer-bg.webp')" }}
      />

      {!isOpen && <CoverGate guestName={guestName} onOpen={handleOpen} />}

      <div className="relative mx-auto min-h-screen w-full max-w-[440px] bg-cream-50 shadow-2xl">
        <AudioPlayer
          isPlaying={isPlaying}
          onToggle={() => setIsPlaying((prev) => !prev)}
          audioSrc={weddingData.audioSrc}
        />
        {/* inert keeps the hidden invitation out of Tab order and screen readers until opened */}
        <main inert={!isOpen} className={isOpen ? 'animate-fade-in' : 'h-0 overflow-hidden opacity-0'}>
          <HeroSection data={weddingData} />
          <QuoteSection quote={weddingData.quote} />
          <CoupleSection data={weddingData} />
          <EventSection events={weddingData.events} />
          <LoveStorySection data={weddingData.loveStory} />
          <GallerySection images={weddingData.gallery} />
          <GiftSection bankAccounts={weddingData.bankAccounts} giftAddress={weddingData.giftAddress} />
          <RsvpWishesSection guestName={guestName} />
          <ClosingSection data={weddingData} />
        </main>
      </div>
    </div>
  );
}

export default function WeddingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-forest-900 font-display text-lg text-cream-50">
          Memuat Undangan...
        </div>
      }
    >
      <WeddingContent />
    </Suspense>
  );
}
