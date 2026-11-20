'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryPhoto } from '@/types/wedding';

interface GallerySectionProps {
  images: GalleryPhoto[];
}

export default function GallerySection({ images }: GallerySectionProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

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

  return (
    <section id="gallery" className="relative py-24 px-4 bg-[#f3f8f6] text-center overflow-hidden">
      {/* Sky wash */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
        style={{ backgroundImage: `url('/themes/dreamy/sky.webp')` }}
      />

      <div className="relative max-w-5xl mx-auto z-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#3f5d4a] font-medium font-sans mb-2">
          Momen Bahagia
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1e3325] mb-4">
          Our Precious Moments
        </h2>
        <p className="font-script text-2xl text-[#5b7a66] mb-14">
          Capturing our endless love
        </p>

        {/* Photo Grid with Elegant Arch Curves */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-5">
          {images.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[3/4] rounded-t-full rounded-b-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1.5 bg-stone-200 border-2 border-white"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                {photo.caption && (
                  <p className="text-white text-xs text-left font-serif drop-shadow-md">
                    {photo.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedIdx !== null && (
          <div
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-in"
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
              className="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl flex flex-col items-center"
            >
              <img
                src={images[selectedIdx].src}
                alt={images[selectedIdx].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
              {images[selectedIdx].caption && (
                <p className="mt-3 text-stone-200 text-sm font-serif italic text-center">
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
      </div>
    </section>
  );
}
