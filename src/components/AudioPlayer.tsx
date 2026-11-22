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
        className="fixed top-5 right-5 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#cde0d5] text-[#2d4234] shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Disc className="w-6 h-6 animate-spin-slow text-[#2d4234]" />
            <span className="absolute w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-stone-500" />
        )}
      </button>
    </>
  );
}
