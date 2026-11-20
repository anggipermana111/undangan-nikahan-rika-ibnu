'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ExternalLink, CalendarPlus } from 'lucide-react';
import { WeddingEvent } from '@/types/wedding';
import CountdownTimer from './CountdownTimer';

interface EventSectionProps {
  events: {
    akad: WeddingEvent;
    resepsi: WeddingEvent;
  };
}

export default function EventSection({ events }: EventSectionProps) {
  const { akad, resepsi } = events;

  const createGoogleCalendarUrl = (event: WeddingEvent) => {
    const startTime = event.dateIso.replace(/[-:]/g, '').split('+')[0] + 'Z';
    const endDate = new Date(new Date(event.dateIso).getTime() + 4 * 60 * 60 * 1000);
    const endTime = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.calendarTitle,
      dates: `${startTime}/${endTime}`,
      details: event.calendarDescription,
      location: `${event.venueName}, ${event.venueAddress}`,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <section id="event" className="relative py-24 px-4 bg-[#f2f7f5] text-center overflow-hidden">
      {/* Sky & Clouds Wash */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
        style={{ backgroundImage: `url('/themes/dreamy/sky.webp')` }}
      />

      <div className="relative max-w-4xl mx-auto z-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#3f5d4a] font-medium font-sans mb-2">
          Waktu & Lokasi
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1e3325] mb-6">
          Save The Date
        </h2>

        {/* Countdown Timer */}
        <div className="mb-16">
          <p className="text-xs font-sans tracking-[0.25em] uppercase text-stone-500 mb-5 font-medium">
            Menuju Hari Bahagia
          </p>
          <CountdownTimer targetDateIso={akad.dateIso} />
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Akad Nikah Card */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-8 border border-[#cde0d5] shadow-xl shadow-[#1e3325]/5 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3.5 py-1 bg-[#edf4f0] text-[#2d4234] rounded-full text-[10px] font-sans font-semibold uppercase tracking-widest mb-4">
                Sacred Ceremony
              </div>
              <h3 className="font-serif text-3xl font-semibold text-[#1e3325] mb-6">
                {akad.title}
              </h3>

              <div className="space-y-4 mb-8 text-sm text-stone-600 font-sans">
                <div className="flex items-start gap-3.5">
                  <CalendarIcon className="w-5 h-5 text-[#3b5945] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1e3325]">
                      {akad.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#3b5945] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-700">
                      {akad.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#3b5945] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1e3325]">
                      {akad.venueName}
                    </p>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {akad.venueAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#e2ece6]">
              <a
                href={akad.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#2d4234] hover:bg-[#1e2f24] text-white rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-colors shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-200" />
                <span>Petunjuk Arah</span>
              </a>
              <a
                href={createGoogleCalendarUrl(akad)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#edf4f0] hover:bg-[#dce9e1] text-[#2d4234] border border-[#cbdcd2] rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-colors"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simpan Kalender</span>
                <span className="sm:hidden">Kalender</span>
              </a>
            </div>
          </div>

          {/* Resepsi Card */}
          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-8 border border-[#cde0d5] shadow-xl shadow-[#1e3325]/5 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3.5 py-1 bg-[#edf4f0] text-[#2d4234] rounded-full text-[10px] font-sans font-semibold uppercase tracking-widest mb-4">
                Celebration
              </div>
              <h3 className="font-serif text-3xl font-semibold text-[#1e3325] mb-6">
                {resepsi.title}
              </h3>

              <div className="space-y-4 mb-8 text-sm text-stone-600 font-sans">
                <div className="flex items-start gap-3.5">
                  <CalendarIcon className="w-5 h-5 text-[#3b5945] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1e3325]">
                      {resepsi.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#3b5945] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-700">
                      {resepsi.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#3b5945] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1e3325]">
                      {resepsi.venueName}
                    </p>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {resepsi.venueAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#e2ece6]">
              <a
                href={resepsi.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#2d4234] hover:bg-[#1e2f24] text-white rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-colors shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-200" />
                <span>Petunjuk Arah</span>
              </a>
              <a
                href={createGoogleCalendarUrl(resepsi)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#edf4f0] hover:bg-[#dce9e1] text-[#2d4234] border border-[#cbdcd2] rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-colors"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simpan Kalender</span>
                <span className="sm:hidden">Kalender</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
