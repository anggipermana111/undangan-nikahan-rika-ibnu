import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CoupleSection from '../src/components/CoupleSection';
import { weddingData } from '../src/data/wedding-data';

describe('CoupleSection Component', () => {
  it('renders groom and bride full names and parents', () => {
    render(<CoupleSection data={weddingData} />);
    expect(screen.getByText(weddingData.groom.fullName)).toBeTruthy();
    expect(screen.getByText(weddingData.bride.fullName)).toBeTruthy();
    expect(screen.getByText(new RegExp(weddingData.groom.parents, 'i'))).toBeTruthy();
    expect(screen.getByText(new RegExp(weddingData.bride.parents, 'i'))).toBeTruthy();
  });

  it('renders bride before groom with photos in fixed-ratio placeholder frames', () => {
    render(<CoupleSection data={weddingData} />);
    const bridePhoto = screen.getByAltText(`Foto ${weddingData.bride.nickName}`);
    const groomPhoto = screen.getByAltText(`Foto ${weddingData.groom.nickName}`);
    expect(bridePhoto.compareDocumentPosition(groomPhoto) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    for (const img of [bridePhoto, groomPhoto]) {
      const frame = img.parentElement as HTMLElement;
      expect(frame.className).toMatch(/aspect-\[3\/4\]/);
      expect(frame.className).toMatch(/bg-cream-100/);
    }
  });

  it('renders instagram links for both', () => {
    render(<CoupleSection data={weddingData} />);
    expect(screen.getByRole('link', { name: `@${weddingData.bride.instagram}` }).getAttribute('href'))
      .toBe(`https://instagram.com/${weddingData.bride.instagram}`);
    expect(screen.getByRole('link', { name: `@${weddingData.groom.instagram}` })).toBeTruthy();
  });
});
