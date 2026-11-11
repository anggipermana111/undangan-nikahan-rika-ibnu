'use client';

import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink, Plus } from 'lucide-react';
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
    // Format: YYYYMMDDTHHMMSSZ
    const startDate = new Date(event.dateIso);
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // +3 hours default

    const formatDateForGCal = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', event.calendarTitle);
    url.searchParams.append('details', event.calendarDescription);
    url.searchParams.append('location', `${event.venueName}, ${event.venueAddress}`);
    url.searchParams.append('dates', `${formatDateForGCal(startDate)}/${formatDateForGCal(endDate)}`);

    return url.toString();
  };

  return (
    <section id="event" className="py-20 px-4 bg-champagne-light/40 text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-primary-700 font-medium mb-3">
          Waktu & Lokasi
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-primary-900 mb-6">
          Hari Bahagia Kami
        </h2>

        {/* Countdown */}
        <div className="mb-16">
          <p className="text-xs font-sans tracking-widest uppercase text-stone-500 mb-4">
            Menuju Hari Bahagia
          </p>
          <CountdownTimer targetDateIso={akad.dateIso} />
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Akad Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-7 border border-primary-200 shadow-lg shadow-primary-900/5 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium uppercase tracking-wider mb-4">
                Sacred Ceremony
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary-900 mb-6">
                {akad.title}
              </h3>

              <div className="space-y-4 mb-6 text-sm text-stone-600">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-800">{akad.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-800">{akad.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-800">{akad.venueName}</p>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">{akad.venueAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-primary-100">
              <a
                href={akad.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-primary-800 hover:bg-primary-900 text-white rounded-xl text-xs font-medium tracking-wider uppercase shadow transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Google Maps</span>
              </a>

              <a
                href={createGoogleCalendarUrl(akad)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-primary-50 text-primary-900 border border-primary-300 rounded-xl text-xs font-medium tracking-wider uppercase transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Simpan Kalender</span>
              </a>
            </div>
          </div>

          {/* Resepsi Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-7 border border-primary-200 shadow-lg shadow-primary-900/5 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium uppercase tracking-wider mb-4">
                Wedding Reception
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary-900 mb-6">
                {resepsi.title}
              </h3>

              <div className="space-y-4 mb-6 text-sm text-stone-600">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-800">{resepsi.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-800">{resepsi.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-800">{resepsi.venueName}</p>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">{resepsi.venueAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-primary-100">
              <a
                href={resepsi.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-primary-800 hover:bg-primary-900 text-white rounded-xl text-xs font-medium tracking-wider uppercase shadow transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Google Maps</span>
              </a>

              <a
                href={createGoogleCalendarUrl(resepsi)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-primary-50 text-primary-900 border border-primary-300 rounded-xl text-xs font-medium tracking-wider uppercase transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Simpan Kalender</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
