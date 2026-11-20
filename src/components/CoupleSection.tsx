import React from 'react';
import { Instagram } from 'lucide-react';
import { WeddingData } from '@/types/wedding';

interface CoupleSectionProps {
  data: WeddingData;
}

export default function CoupleSection({ data }: CoupleSectionProps) {
  const { groom, bride } = data;

  return (
    <section id="couple" className="relative py-24 px-4 bg-[#fbfdfc] text-center overflow-hidden">
      {/* Decorative Tree Branch */}
      <div 
        className="absolute top-0 left-0 w-80 h-40 bg-contain bg-no-repeat pointer-events-none opacity-40"
        style={{ backgroundImage: `url('/themes/dreamy/tree.webp')` }}
      />

      <div className="relative max-w-4xl mx-auto z-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#3f5d4a] font-medium font-sans mb-2">
          Pasangan Mempelai
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1e3325] mb-4">
          Groom & Bride
        </h2>
        <p className="text-sm text-stone-600 max-w-md mx-auto mb-16 leading-relaxed font-sans">
          {data.coverGreeting}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Groom Card */}
          <div className="flex flex-col items-center bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-[#d6e5dd]/80 shadow-md">
            <div className="relative mb-6">
              {/* Arch Photo Shape */}
              <div className="w-52 h-68 rounded-t-full rounded-b-3xl overflow-hidden border-4 border-white shadow-xl shadow-[#1e3325]/10 bg-stone-100">
                <img
                  src={groom.photo}
                  alt={groom.fullName}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#2d4234] text-white rounded-full text-[10px] tracking-widest uppercase font-sans font-semibold shadow-md">
                The Groom
              </div>
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[#1e3325] mb-1">
              {groom.fullName}
            </h3>
            <p className="text-xs uppercase tracking-wider text-[#43624f] mb-3 font-medium font-sans">
              {groom.orderInFamily}
            </p>
            <p className="text-sm text-stone-600 mb-5 max-w-xs font-sans">
              {groom.parents}
            </p>

            {groom.instagram && (
              <a
                href={`https://instagram.com/${groom.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#2c4033] bg-[#edf4f0] hover:bg-[#dce9e1] px-4 py-2 rounded-full border border-[#cbdcd2] transition-all font-sans"
              >
                <Instagram className="w-3.5 h-3.5 text-[#3b5945]" />
                <span>@{groom.instagram}</span>
              </a>
            )}
          </div>

          {/* Bride Card */}
          <div className="flex flex-col items-center bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-[#d6e5dd]/80 shadow-md">
            <div className="relative mb-6">
              {/* Arch Photo Shape */}
              <div className="w-52 h-68 rounded-t-full rounded-b-3xl overflow-hidden border-4 border-white shadow-xl shadow-[#1e3325]/10 bg-stone-100">
                <img
                  src={bride.photo}
                  alt={bride.fullName}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#2d4234] text-white rounded-full text-[10px] tracking-widest uppercase font-sans font-semibold shadow-md">
                The Bride
              </div>
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[#1e3325] mb-1">
              {bride.fullName}
            </h3>
            <p className="text-xs uppercase tracking-wider text-[#43624f] mb-3 font-medium font-sans">
              {bride.orderInFamily}
            </p>
            <p className="text-sm text-stone-600 mb-5 max-w-xs font-sans">
              {bride.parents}
            </p>

            {bride.instagram && (
              <a
                href={`https://instagram.com/${bride.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#2c4033] bg-[#edf4f0] hover:bg-[#dce9e1] px-4 py-2 rounded-full border border-[#cbdcd2] transition-all font-sans"
              >
                <Instagram className="w-3.5 h-3.5 text-[#3b5945]" />
                <span>@{bride.instagram}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
