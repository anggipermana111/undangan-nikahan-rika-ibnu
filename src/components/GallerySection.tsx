'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryPhoto } from '@/types/wedding';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface GallerySectionProps {
  images: GalleryPhoto[];
}

function FadeUpPhoto({ children, delay = '' }: { children: React.ReactNode; delay?: string }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });
  return (
    <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} ${delay}`}>
      {children}
    </div>
  );
}

export default function GallerySection({ images }: GallerySectionProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => setSelectedIdx(index);
  const closeLightbox = () => setSelectedIdx(null);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % images.length);
  };

  // Assign heights: tall / medium alternating pattern for masonry feel
  const heightClasses = [
    'aspect-[2/3]', // tall
    'aspect-[3/4]', // medium-tall
    'aspect-[2/3]', // tall
    'aspect-[3/4]', // medium-tall
    'aspect-[2/3]',
    'aspect-[3/4]',
    'aspect-[2/3]',
  ];

  return (
    <section id="gallery" className="relative py-24 px-4 text-center overflow-hidden bg-transparent">
      {/* Sky wash */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
        style={{ backgroundImage: `url('/themes/dreamy/sky.webp')` }}
      />

      {/* Top tree branch */}
      <img
        src="/themes/dreamy/tree.webp"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 w-72 max-w-[45%] pointer-events-none opacity-35 object-contain object-top-left select-none"
      />

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Header */}
        <div ref={headerRef} className={`fade-up ${headerVisible ? 'visible' : ''} mb-14`}>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#3f5d4a] font-semibold font-sans mb-2">
            Momen Bahagia
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1e3325] font-normal mb-3">
            Our Gallery
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-[#5b7a66]">
            Precious moments together
          </p>
        </div>

        {/* Curated Grid Arch Photo Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {images.map((photo, index) => (
            <FadeUpPhoto
              key={photo.id}
              delay={`fade-up-delay-${(index % 3) + 1}`}
            >
              <div
                onClick={() => openLightbox(index)}
                className="group relative w-full aspect-[3/4] cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 bg-stone-100 border-[3px] border-white"
                style={{ borderRadius: '9999px 9999px 1.5rem 1.5rem' }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3325]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  {photo.caption && (
                    <p className="text-white text-xs text-left font-serif italic drop-shadow-md leading-snug">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            </FadeUpPhoto>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-in-fast"
        >
          <button
            onClick={closeLightbox}
            aria-label="Close Lightbox"
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={prevImage}
            aria-label="Previous Image"
            className="absolute left-4 z-50 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl max-h-[88vh] flex flex-col items-center"
          >
            <img
              src={images[selectedIdx].src}
              alt={images[selectedIdx].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-3xl shadow-2xl"
            />
            {images[selectedIdx].caption && (
              <p className="mt-4 text-stone-200 text-sm font-serif italic text-center">
                {images[selectedIdx].caption}
              </p>
            )}
          </div>
          <button
            onClick={nextImage}
            aria-label="Next Image"
            className="absolute right-4 z-50 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Bottom greenery */}
      <img
        src="/themes/dreamy/greenery.webp"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 w-full pointer-events-none opacity-70 z-0 select-none object-cover object-bottom"
        style={{ height: '96px' }}
      />
    </section>
  );
}
