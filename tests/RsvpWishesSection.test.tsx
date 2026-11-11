import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RsvpWishesSection from '../src/components/RsvpWishesSection';

describe('RsvpWishesSection Component', () => {
  it('renders form inputs and pre-fills guest name', () => {
    render(<RsvpWishesSection guestName="Anggi Permana" />);
    const nameInput = screen.getByLabelText(/nama/i) as HTMLInputElement;
    expect(nameInput.value).toBe('Anggi Permana');
    expect(screen.getByRole('button', { name: /kirim ucapan/i })).toBeTruthy();
  });

  it('submits a new wish and adds it to the list', async () => {
    render(<RsvpWishesSection guestName="Budi Santoso" />);
    fireEvent.change(screen.getByLabelText(/doa/i), { target: { value: 'Selamat menempuh hidup baru!' } });
    fireEvent.click(screen.getByRole('button', { name: /kirim ucapan/i }));
    await waitFor(() => {
      expect(screen.getByText('Selamat menempuh hidup baru!')).toBeTruthy();
    });
  });
});
