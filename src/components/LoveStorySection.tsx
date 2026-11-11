import React from 'react';
import { Heart } from 'lucide-react';
import { StoryMilestone } from '@/types/wedding';

interface LoveStorySectionProps {
  data: StoryMilestone[];
}

export default function LoveStorySection({ data }: LoveStorySectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="story" className="py-20 px-4 bg-white/70 text-center">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-primary-700 font-medium mb-3">
          Kisah Kami
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-primary-900 mb-14">
          Love Story
        </h2>

        {/* Timeline */}
        <div className="relative border-l-2 border-primary-200 ml-4 sm:ml-32 space-y-12 text-left">
          {data.map((item, index) => (
            <div key={index} className="relative pl-8 sm:pl-10">
              {/* Bullet Node */}
              <div className="absolute -left-[17px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 border-2 border-primary-500 shadow-sm">
                <Heart className="w-3.5 h-3.5 text-primary-700 fill-primary-400" />
              </div>

              {/* Year Badge */}
              <span className="inline-block px-3 py-1 bg-primary-100/70 text-primary-900 font-serif font-bold text-sm rounded-full mb-2">
                {item.year}
              </span>

              {/* Title & Story */}
              <h3 className="font-serif text-xl font-semibold text-primary-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {item.story}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
