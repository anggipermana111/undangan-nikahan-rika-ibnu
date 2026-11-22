import { describe, it, expect } from 'vitest';
import { weddingData } from '../src/data/wedding-data';

describe('Wedding Data Structure', () => {
  it('should contain complete bride and groom info', () => {
    expect(weddingData.groom.fullName).toBeDefined();
    expect(weddingData.groom.parents).toBeDefined();
    expect(weddingData.bride.fullName).toBeDefined();
    expect(weddingData.bride.parents).toBeDefined();
  });

  it('should have akad and resepsi event details with valid date strings', () => {
    expect(weddingData.events.akad.date).toBeDefined();
    expect(weddingData.events.resepsi.date).toBeDefined();
    expect(new Date(weddingData.events.akad.dateIso).getTime()).not.toBeNaN();
  });

  it('should have bank accounts and gift recipient address', () => {
    expect(weddingData.bankAccounts.length).toBeGreaterThan(0);
    expect(weddingData.bankAccounts[0].accountNumber).toBeDefined();
    expect(weddingData.giftAddress.fullAddress).toBeDefined();
  });

  it('has theme photos and monogram', () => {
    expect(weddingData.monogram).toBe('R I');
    expect(weddingData.coverPhoto).toBe('/images/gallery/01.jpg');
    expect(weddingData.heroPhoto).toBe('/images/gallery/10.jpg');
    expect(weddingData.closingPhoto).toBe('/images/gallery/09.jpg');
    expect(weddingData.events.akad.photo).toBe('/images/gallery/02.jpg');
    expect(weddingData.events.resepsi.photo).toBe('/images/gallery/04.jpg');
    expect(weddingData.bride.photo).toBe('/images/couple/bride.jpg');
    expect(weddingData.groom.photo).toBe('/images/couple/groom.jpg');
  });

  it('lists all 10 gallery photos with unique ids', () => {
    expect(weddingData.gallery).toHaveLength(10);
    expect(new Set(weddingData.gallery.map((p) => p.id)).size).toBe(10);
    weddingData.gallery.forEach((p, i) => {
      expect(p.src).toBe(`/images/gallery/${String(i + 1).padStart(2, '0')}.jpg`);
      expect(p.alt.length).toBeGreaterThan(0);
    });
  });
});
