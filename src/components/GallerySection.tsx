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
    <section id="gallery" className="py-20 px-4 bg-champagne-light/30 text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-primary-700 font-medium mb-3">
          Momen Bahagia
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-primary-900 mb-4">
          Our Gallery
        </h2>
        <p className="text-sm text-stone-500 mb-12 max-w-md mx-auto">
          Setiap momen adalah bait puisi cinta yang terabadikan dalam lembaran kisah kami.
        </p>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {images.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 bg-stone-100"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                {photo.caption && (
                  <p className="text-white text-xs text-left font-serif line-clamp-1 drop-shadow-md">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-in"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevImage}
              aria-label="Previous Image"
              className="absolute left-4 z-50 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Preview Image */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-xl flex flex-col items-center"
            >
              <img
                src={images[selectedIdx].src}
                alt={images[selectedIdx].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              {images[selectedIdx].caption && (
                <p className="mt-3 text-stone-300 text-sm font-serif italic text-center">
                  {images[selectedIdx].caption}
                </p>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={nextImage}
              aria-label="Next Image"
              className="absolute right-4 z-50 p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
