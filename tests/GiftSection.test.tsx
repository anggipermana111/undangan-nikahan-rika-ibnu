import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GiftSection from '../src/components/GiftSection';
import { weddingData } from '../src/data/wedding-data';

describe('GiftSection Component', () => {
  it('renders bank details and copy buttons', () => {
    render(<GiftSection bankAccounts={weddingData.bankAccounts} giftAddress={weddingData.giftAddress} />);
    expect(screen.getByText(weddingData.bankAccounts[0].accountNumber)).toBeTruthy();
    expect(screen.getAllByRole('button', { name: /salin/i }).length).toBeGreaterThan(0);
  });

  it('displays toast feedback upon copying', async () => {
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    render(<GiftSection bankAccounts={weddingData.bankAccounts} giftAddress={weddingData.giftAddress} />);
    fireEvent.click(screen.getAllByRole('button', { name: /salin/i })[0]);
    const matches = await screen.findAllByText(/berhasil disalin/i);
    expect(matches.length).toBeGreaterThan(0);
  });
});
