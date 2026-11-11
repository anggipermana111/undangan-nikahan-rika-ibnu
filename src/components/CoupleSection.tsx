import React from 'react';
import { Instagram } from 'lucide-react';
import { WeddingData } from '@/types/wedding';

interface CoupleSectionProps {
  data: WeddingData;
}

export default function CoupleSection({ data }: CoupleSectionProps) {
  const { groom, bride } = data;

  return (
    <section id="couple" className="py-20 px-4 bg-white/60 text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-primary-700 font-medium mb-3">
          Pasangan Mempelai
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-primary-900 mb-4">
          Groom & Bride
        </h2>
        <p className="text-sm text-stone-600 max-w-lg mx-auto mb-16 leading-relaxed">
          {data.coverGreeting}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Groom Card */}
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-48 h-64 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-white shadow-xl shadow-primary-900/10">
                <img
                  src={groom.photo}
                  alt={groom.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-800 text-white rounded-full text-xs tracking-widest uppercase font-medium shadow-md">
                The Groom
              </div>
            </div>

            <h3 className="font-serif text-2xl font-semibold text-primary-900 mb-2">
              {groom.fullName}
            </h3>
            <p className="text-xs uppercase tracking-wider text-primary-700 mb-2 font-medium">
              {groom.orderInFamily}
            </p>
            <p className="text-sm text-stone-600 mb-4 max-w-xs">
              {groom.parents}
            </p>

            {groom.instagram && (
              <a
                href={`https://instagram.com/${groom.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary-800 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-200 hover:bg-primary-100 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@{groom.instagram}</span>
              </a>
            )}
          </div>

          {/* Bride Card */}
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-48 h-64 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-white shadow-xl shadow-primary-900/10">
                <img
                  src={bride.photo}
                  alt={bride.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-800 text-white rounded-full text-xs tracking-widest uppercase font-medium shadow-md">
                The Bride
              </div>
            </div>

            <h3 className="font-serif text-2xl font-semibold text-primary-900 mb-2">
              {bride.fullName}
            </h3>
            <p className="text-xs uppercase tracking-wider text-primary-700 mb-2 font-medium">
              {bride.orderInFamily}
            </p>
            <p className="text-sm text-stone-600 mb-4 max-w-xs">
              {bride.parents}
            </p>

            {bride.instagram && (
              <a
                href={`https://instagram.com/${bride.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary-800 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-200 hover:bg-primary-100 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@{bride.instagram}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
