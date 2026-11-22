'use client';

import React from 'react';
import { Instagram } from 'lucide-react';
import { CouplePerson, WeddingData } from '@/types/wedding';
import Card from './ui/Card';
import SectionTitle from './ui/SectionTitle';
import FadeUp from './FadeUp';

interface CoupleSectionProps {
  data: WeddingData;
}

function PersonCard({ person, label }: { person: CouplePerson; label: string }) {
  return (
    <Card withLeaves className="px-6 pt-8 text-center">
      <p className="font-display text-lg text-forest-900">{label}</p>
      <div className="relative mx-auto mt-5 aspect-[3/4] w-56 overflow-hidden rounded-[1.5rem] bg-cream-100 shadow-lg">
        <img
          src={person.photo}
          alt={`Foto ${person.nickName}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-900/70 via-transparent to-transparent" />
        <span className="pointer-events-none absolute inset-x-0 bottom-3 font-script text-4xl text-cream-50">
          {person.nickName}
        </span>
      </div>
      <h3 className="mt-6 font-serif text-3xl italic text-forest-900">{person.fullName}</h3>
      <p className="mt-2 font-sans text-sm text-sage-500">{person.orderInFamily}</p>
      <p className="font-sans text-sm text-sage-500">{person.parents}</p>
      {person.instagram && (
        <a
          href={`https://instagram.com/${person.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest-900 px-4 py-2 font-sans text-xs text-cream-50 transition-colors hover:bg-forest-700"
        >
          <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
          <span>@{person.instagram}</span>
        </a>
      )}
    </Card>
  );
}

export default function CoupleSection({ data }: CoupleSectionProps) {
  const { groom, bride } = data;
  return (
    <section id="couple" className="relative bg-cream-50 px-5 py-16">
      <FadeUp>
        <p className="mb-2 text-center font-script text-3xl text-gold-500">Bismillahirrahmanirrahim</p>
        <SectionTitle kicker="Mempelai" title="Calon Pengantin" />
      </FadeUp>
      <div className="mt-10 space-y-6">
        <FadeUp delay="fade-up-delay-1">
          <PersonCard person={bride} label="The Bride" />
        </FadeUp>
        <p aria-hidden="true" className="text-center font-script text-5xl text-gold-500">&amp;</p>
        <FadeUp delay="fade-up-delay-2">
          <PersonCard person={groom} label="The Groom" />
        </FadeUp>
      </div>
    </section>
  );
}
