import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from '../src/components/HeroSection';
import QuoteSection from '../src/components/QuoteSection';
import { weddingData } from '../src/data/wedding-data';

describe('HeroSection', () => {
  it('renders couple names in the h1 and the akad date', () => {
    render(<HeroSection data={weddingData} />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toMatch(/Rika/);
    expect(h1.textContent).toMatch(/Ibnu/);
    expect(h1.textContent!.indexOf('Rika')).toBeLessThan(h1.textContent!.indexOf('Ibnu'));
    expect(screen.getByText(weddingData.events.akad.date)).toBeTruthy();
    expect(screen.getByText(/the wedding of/i)).toBeTruthy();
  });
});

describe('QuoteSection', () => {
  it('renders the verse and its source', () => {
    render(<QuoteSection quote={weddingData.quote} />);
    expect(screen.getByText(new RegExp(weddingData.quote.source.replace('.', '\.')))).toBeTruthy();
    expect(screen.getByText(/pasangan-pasangan untukmu/)).toBeTruthy();
  });
});
