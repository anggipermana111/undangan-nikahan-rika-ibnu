'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryPhoto } from '@/types/wedding';
import SectionTitle from './ui/SectionTitle';
import FadeUp from './FadeUp';

interface GallerySectionProps {
  images: GalleryPhoto[];
}

const SWIPE_MIN_PX = 50;

export default function GallerySection({ images }: GallerySectionProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const count = images?.length ?? 0;

  const close = useCallback(() => setSelectedIdx(null), []);
  const prev = useCallback(
    () => setSelectedIdx((i) => (i === null ? i : (i - 1 + count) % count)),
    [count]
  );
  const next = useCallback(
    () => setSelectedIdx((i) => (i === null ? i : (i + 1) % count)),
    [count]
  );

  useEffect(() => {
    if (selectedIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIdx, close, prev, next]);

  const isOpen = selectedIdx !== null;
  useEffect(() => {
    if (!isOpen) return;
    // Lock page scroll behind the overlay and move focus into it; restore both on close
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [isOpen]);

  if (count === 0) return null;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    const end = e.changedTouches?.[0]?.clientX;
    touchStartX.current = null;
    if (start === null || end === undefined) return;
    const dx = end - start;
    if (dx <= -SWIPE_MIN_PX) next();
    else if (dx >= SWIPE_MIN_PX) prev();
  };
  const stop = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    fn();
  };

  return (
    <section id="gallery" className="relative bg-cream-50 px-4 py-16">
      <FadeUp className="mb-8">
        <SectionTitle title="Our" script="Gallery" />
      </FadeUp>

      <div className="grid grid-cols-2 gap-3">
        {images.map((photo, index) => (
          <FadeUp key={photo.id} threshold={0.05} delay={`fade-up-delay-${(index % 2) + 1}`}>
            <button
              type="button"
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setSelectedIdx(index);
              }}
              aria-label={`Buka foto ${photo.alt}`}
              className="block aspect-[3/4] w-full overflow-hidden rounded-2xl bg-cream-100 shadow-md"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </button>
          </FadeUp>
        ))}
      </div>

      {selectedIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galeri foto"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
        >
          <button
            ref={closeBtnRef}
            onClick={stop(close)}
            aria-label="Tutup foto"
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2.5 text-white hover:bg-white/30"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={stop(prev)}
            aria-label="Foto sebelumnya"
            className="absolute left-3 rounded-full bg-white/20 p-3 text-white hover:bg-white/30"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            src={images[selectedIdx].src}
            alt={images[selectedIdx].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[82vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />
          <button
            onClick={stop(next)}
            aria-label="Foto berikutnya"
            className="absolute right-3 rounded-full bg-white/20 p-3 text-white hover:bg-white/30"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}
