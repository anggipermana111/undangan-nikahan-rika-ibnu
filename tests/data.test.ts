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
});
