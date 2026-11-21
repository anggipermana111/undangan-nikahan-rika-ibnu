'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { StoryMilestone } from '@/types/wedding';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface LoveStorySectionProps {
  data: StoryMilestone[];
}

function FadeUpItem({ children, delay = '' }: { children: React.ReactNode; delay?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} ${delay}`}>
      {children}
    </div>
  );
}

export default function LoveStorySection({ data }: LoveStorySectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="story" className="relative py-24 px-4 text-center overflow-hidden bg-transparent">
      {/* Bg sky tint */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: `url('/themes/dreamy/sky.webp')` }}
      />

      {/* Tree branch decorations */}
      <img
        src="/themes/dreamy/tree.webp"
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 w-72 max-w-[45%] pointer-events-none opacity-25 object-contain object-top-right select-none"
        style={{ transform: 'scaleX(-1)' }}
      />
      <img
        src="/themes/dreamy/big-tree.webp"
        alt=""
        aria-hidden="true"
        className="absolute bottom-10 left-0 w-56 max-w-[35%] pointer-events-none opacity-20 object-contain object-bottom-left select-none"
      />

      <div className="relative max-w-2xl mx-auto z-10">
        {/* Section Header */}
        <FadeUpItem>
          <div className="flex justify-center mb-5">
            <div className="w-10 h-10 rounded-full bg-[#edf4f0] border-2 border-[#3b5945] flex items-center justify-center shadow-sm">
              <Heart className="w-4 h-4 text-[#2d4234] fill-[#84a991]" />
            </div>
          </div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#3f5d4a] font-semibold font-sans mb-2">
            Kisah Cinta Kami
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1e3325] font-normal mb-3">
            A Little Story
          </h2>
          <p className="font-script text-3xl sm:text-4xl text-[#3b5945] mb-14">
            Called Us
          </p>
        </FadeUpItem>

        {/* Timeline */}
        <div className="relative text-left">
          {/* Vertical line */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#2d4234] via-[#b8d4c4] to-transparent z-0" />

          <div className="space-y-10">
            {data.map((item, index) => (
              <FadeUpItem key={index} delay={`fade-up-delay-${index + 1}`}>
                <div className="relative flex gap-6">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-[#edf4f0] border-2 border-[#3b5945] flex items-center justify-center shadow-md">
                    <Heart className="w-4 h-4 text-[#2d4234] fill-[#84a991]" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-3xl px-6 py-5 border border-[#d0e8db] shadow-md shadow-[#1e3325]/5 hover:shadow-lg transition-shadow duration-300">
                    <span className="inline-block px-3 py-1 bg-[#2d4234] text-white font-sans font-semibold text-[10px] tracking-widest uppercase rounded-full mb-3">
                      {item.year}
                    </span>
                    <h3 className="font-serif text-2xl font-semibold text-[#1e3325] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed font-sans">
                      {item.story}
                    </p>
                  </div>
                </div>
              </FadeUpItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
