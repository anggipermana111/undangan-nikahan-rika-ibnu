import React from 'react';
import { Heart } from 'lucide-react';
import { StoryMilestone } from '@/types/wedding';

interface LoveStorySectionProps {
  data: StoryMilestone[];
}

export default function LoveStorySection({ data }: LoveStorySectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="story" className="relative py-24 px-4 bg-[#fbfdfc] text-center overflow-hidden">
      {/* Decorative Tree Branch */}
      <div 
        className="absolute top-0 right-0 w-72 h-36 bg-contain bg-no-repeat pointer-events-none opacity-30"
        style={{ backgroundImage: `url('/themes/dreamy/tree.webp')` }}
      />

      <div className="relative max-w-2xl mx-auto z-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#3f5d4a] font-medium font-sans mb-2">
          Kisah Kami
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1e3325] mb-4">
          A Little Story Called Us
        </h2>
        <p className="font-script text-2xl text-[#5b7a66] mb-16">
          How our journey began...
        </p>

        {/* Timeline with Arch Card Style */}
        <div className="relative border-l-2 border-[#b8d4c4] ml-4 sm:ml-28 space-y-12 text-left">
          {data.map((item, index) => (
            <div key={index} className="relative pl-8 sm:pl-10">
              {/* Bullet Node */}
              <div className="absolute -left-[17px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#edf4f0] border-2 border-[#3b5945] shadow-sm">
                <Heart className="w-3.5 h-3.5 text-[#2d4234] fill-[#84a991]" />
              </div>

              {/* Card Container */}
              <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-7 rounded-3xl border border-[#d6e5dd] shadow-md shadow-[#1e3325]/5 hover:shadow-lg transition-all duration-300">
                {/* Year Badge */}
                <span className="inline-block px-3 py-1 bg-[#edf4f0] text-[#2d4234] font-sans font-semibold text-xs tracking-wider uppercase rounded-full mb-3">
                  {item.year}
                </span>

                {/* Title & Story */}
                <h3 className="font-serif text-2xl font-semibold text-[#1e3325] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed font-sans">
                  {item.story}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
