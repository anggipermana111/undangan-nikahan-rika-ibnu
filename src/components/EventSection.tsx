'use client';

import React from 'react';
import { MapPin, CalendarPlus } from 'lucide-react';
import { WeddingEvent } from '@/types/wedding';
import Card from './ui/Card';
import Sparkles from './ui/Sparkles';
import FadeUp from './FadeUp';

interface EventSectionProps {
  events: {
    akad: WeddingEvent;
    resepsi: WeddingEvent;
  };
}

function createGoogleCalendarUrl(event: WeddingEvent) {
  // Google Calendar expects UTC in YYYYMMDDTHHMMSSZ format
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
}

function EventCard({ event }: { event: WeddingEvent }) {
  return (
    <Card withLeaves withSand className="text-center">
      <div className="aspect-[4/3] w-full overflow-hidden bg-cream-100">
        <img
          src={event.photo}
          alt={`Foto ${event.title}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="px-6 pt-6">
        <h3 className="font-display text-2xl uppercase tracking-wide text-forest-900">{event.title}</h3>
        <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-wider text-ink">{event.date}</p>
        <p className="mt-3 font-sans text-sm text-ink">Pukul : {event.time}</p>
        <p className="mt-3 font-sans text-sm font-semibold text-forest-900">{event.venueName}</p>
        <p className="font-sans text-xs leading-relaxed text-sage-500">{event.venueAddress}</p>
        <div className="mt-5 flex justify-center gap-2">
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-forest-900 px-4 py-2 font-sans text-xs font-semibold text-cream-50 transition-colors hover:bg-forest-700"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Lihat Lokasi
          </a>
          <a
            href={createGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-forest-900 px-4 py-2 font-sans text-xs font-semibold text-forest-900 transition-colors hover:bg-cream-100"
          >
            <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" />
            Kalender
          </a>
        </div>
      </div>
    </Card>
  );
}

export default function EventSection({ events }: EventSectionProps) {
  return (
    <section id="event" className="relative overflow-hidden bg-forest-900 px-5 py-16">
      <Sparkles />
      <FadeUp className="relative z-10 mb-10 px-2">
        <h2 className="font-display text-4xl uppercase leading-none text-cream-50">
          Save
          <span className="ml-2 font-script text-4xl normal-case text-gold-500">The Date</span>
        </h2>
        <div className="mt-3 h-px w-3/4 bg-cream-50/40" />
      </FadeUp>
      <div className="relative z-10 space-y-6">
        <FadeUp delay="fade-up-delay-1">
          <EventCard event={events.akad} />
        </FadeUp>
        <FadeUp delay="fade-up-delay-2">
          <EventCard event={events.resepsi} />
        </FadeUp>
      </div>
    </section>
  );
}
