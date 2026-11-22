'use client';

import React, { useEffect, useRef } from 'react';
import { VolumeX, Disc } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  audioSrc: string;
}

export default function AudioPlayer({ isPlaying, onToggle, audioSrc }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Audio playback prevented or failed:', error);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="none"
      />
      <button
        onClick={onToggle}
        aria-label={isPlaying ? 'Pause Audio' : 'Play Audio'}
        className="fixed bottom-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-forest-900/90 text-cream-50 shadow-lg backdrop-blur transition-transform hover:scale-105 active:scale-95"
        style={{ right: 'max(1.25rem, calc((100vw - 440px) / 2 + 1.25rem))' }}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Disc className="h-5 w-5 animate-spin-slow" />
            <span className="absolute h-1.5 w-1.5 rounded-full bg-gold-500" />
          </div>
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </button>
    </>
  );
}
