'use client';

import React from 'react';
import { WeddingData } from '@/types/wedding';
import SectionTitle from './ui/SectionTitle';
import Sparkles from './ui/Sparkles';
import FadeUp from './FadeUp';

interface QuoteSectionProps {
  quote: WeddingData['quote'];
}

export default function QuoteSection({ quote }: QuoteSectionProps) {
  return (
    <section id="quote" className="relative overflow-hidden bg-forest-900 px-8 py-16 text-center text-cream-50">
      <Sparkles />
      <FadeUp className="relative z-10">
        <img src="/themes/forest/sprig.webp" alt="" aria-hidden="true" className="mx-auto mb-4 w-12" />
        <SectionTitle title="Our Special Day" tone="light" />
        <p className="mt-6 font-serif text-base italic leading-relaxed text-cream-50/90">
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="mt-4 font-sans text-xs font-semibold tracking-[0.2em] text-gold-500">({quote.source})</p>
      </FadeUp>
    </section>
  );
}
