'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, CalendarPlus } from 'lucide-react';
import { WeddingEvent } from '@/types/wedding';
import CountdownTimer from './CountdownTimer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface EventSectionProps {
  events: {
    akad: WeddingEvent;
    resepsi: WeddingEvent;
  };
}

function FadeUpDiv({ children, delay = '', className = '' }: { children: React.ReactNode; delay?: string; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`fade-up ${isVisible ? 'visible' : ''} ${delay} ${className}`}>
      {children}
    </div>
  );
}

export default function EventSection({ events }: EventSectionProps) {
  const { akad, resepsi } = events;

  const createGoogleCalendarUrl = (event: WeddingEvent) => {
    // Parse tanggal ISO dengan benar ke UTC untuk Google Calendar format YYYYMMDDTHHMMSSZ
    const startDate = new Date(event.dateIso);
    const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

    const formatGCalTime = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.calendarTitle,
      dates: `${formatGCalTime(startDate)}/${formatGCalTime(endDate)}`,
      details: event.calendarDescription,
      location: `${event.venueName}, ${event.venueAddress}`,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <section id="event" className="relative py-24 px-4 text-center overflow-hidden bg-white">
      {/* Floral top divider */}
      <div
        className="absolute top-0 inset-x-0 h-20 bg-top bg-repeat-x bg-contain pointer-events-none opacity-25 z-10"
        style={{ backgroundImage: `url('/themes/dreamy/foregroundFlower.webp')` }}
      />

      {/* Tree branch top-right */}
      <div
        className="absolute top-0 right-0 w-72 h-40 bg-contain bg-no-repeat pointer-events-none opacity-30"
        style={{
          backgroundImage: `url('/themes/dreamy/tree.webp')`,
          transform: 'scaleX(-1)',
        }}
      />

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Section header */}
        <FadeUpDiv>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#3f5d4a] font-semibold font-sans mb-2">
            Waktu & Tempat
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1e3325] font-normal mb-4">
            Save The Date
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-[#5b7a66] mb-10">
            3 Desember 2026
          </p>
        </FadeUpDiv>

        {/* Countdown */}
        <FadeUpDiv delay="fade-up-delay-1" className="mb-16">
          <p className="text-xs font-sans tracking-[0.3em] uppercase text-stone-500 mb-5 font-medium">
            Menghitung Hari
          </p>
          <CountdownTimer targetDateIso={akad.dateIso} />
        </FadeUpDiv>

        {/* Divider ornament */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#b8d4c4] to-transparent max-w-32" />
          <div className="text-[#2d4234] text-lg">✦</div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#b8d4c4] to-transparent max-w-32" />
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Akad Nikah */}
          <FadeUpDiv delay="fade-up-delay-2">
            <div className="bg-[#f0f7f3] rounded-3xl p-8 border border-[#c4dece] shadow-lg shadow-[#1e3325]/5 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#2d4234] flex items-center justify-center shadow-md shrink-0">
                  <CalendarIcon className="w-5 h-5 text-emerald-200" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#3f5d4a] font-sans font-semibold">Sacred Ceremony</span>
                  <h3 className="font-serif text-2xl font-semibold text-[#1e3325] leading-tight">
                    {akad.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 mb-7 text-sm text-stone-600 font-sans flex-1">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-4 h-4 text-[#3b5945] shrink-0" />
                  <span className="font-semibold text-[#1e3325]">{akad.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#3b5945] shrink-0" />
                  <span>{akad.time}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#3b5945] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1e3325]">{akad.venueName}</p>
                    <p className="text-xs text-stone-500 leading-relaxed">{akad.venueAddress}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-5 border-t border-[#c4dece]/70">
                <a
                  href={akad.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#2d4234] hover:bg-[#1e2f24] text-white rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Petunjuk Arah</span>
                </a>
                <a
                  href={createGoogleCalendarUrl(akad)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-[#edf4f0] text-[#2d4234] border border-[#c4dece] rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-colors"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>Kalender</span>
                </a>
              </div>
            </div>
          </FadeUpDiv>

          {/* Resepsi */}
          <FadeUpDiv delay="fade-up-delay-3">
            <div className="bg-[#f0f7f3] rounded-3xl p-8 border border-[#c4dece] shadow-lg shadow-[#1e3325]/5 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#2d4234] flex items-center justify-center shadow-md shrink-0">
                  <CalendarIcon className="w-5 h-5 text-emerald-200" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#3f5d4a] font-sans font-semibold">Celebration</span>
                  <h3 className="font-serif text-2xl font-semibold text-[#1e3325] leading-tight">
                    {resepsi.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 mb-7 text-sm text-stone-600 font-sans flex-1">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-4 h-4 text-[#3b5945] shrink-0" />
                  <span className="font-semibold text-[#1e3325]">{resepsi.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#3b5945] shrink-0" />
                  <span>{resepsi.time}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#3b5945] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1e3325]">{resepsi.venueName}</p>
                    <p className="text-xs text-stone-500 leading-relaxed">{resepsi.venueAddress}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-5 border-t border-[#c4dece]/70">
                <a
                  href={resepsi.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#2d4234] hover:bg-[#1e2f24] text-white rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Petunjuk Arah</span>
                </a>
                <a
                  href={createGoogleCalendarUrl(resepsi)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-[#edf4f0] text-[#2d4234] border border-[#c4dece] rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-colors"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>Kalender</span>
                </a>
              </div>
            </div>
          </FadeUpDiv>
        </div>
      </div>

      {/* Bottom greenery */}
      <div
        className="absolute bottom-0 inset-x-0 h-20 bg-bottom bg-repeat-x bg-contain pointer-events-none opacity-20 z-0"
        style={{ backgroundImage: `url('/themes/dreamy/greenery.webp')` }}
      />
    </section>
  );
}
