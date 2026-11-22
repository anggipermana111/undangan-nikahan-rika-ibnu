import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GiftSection from '../src/components/GiftSection';
import { weddingData } from '../src/data/wedding-data';

function renderGift() {
  render(<GiftSection bankAccounts={weddingData.bankAccounts} giftAddress={weddingData.giftAddress} />);
}

describe('GiftSection Component', () => {
  it('hides bank details until "Klik Disini" is pressed', () => {
    renderGift();
    const toggle = screen.getByRole('button', { name: /klik disini/i });
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByText(weddingData.bankAccounts[0].accountNumber)).toBeNull();
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText(weddingData.bankAccounts[0].accountNumber)).toBeTruthy();
    expect(screen.getByText(weddingData.giftAddress.fullAddress)).toBeTruthy();
  });

  it('copies an account number and shows toast feedback', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    renderGift();
    fireEvent.click(screen.getByRole('button', { name: /klik disini/i }));
    fireEvent.click(screen.getAllByRole('button', { name: /salin nomor rekening/i })[0]);
    const matches = await screen.findAllByText(/berhasil disalin/i);
    expect(matches.length).toBeGreaterThan(0);
    expect(writeText).toHaveBeenCalledWith(weddingData.bankAccounts[0].accountNumber);
  });
});
