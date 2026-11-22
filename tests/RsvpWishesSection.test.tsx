import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const insertResult = { data: null as unknown, error: null as unknown };
const insertSpy = vi.fn();

vi.mock('@/lib/supabase', () => {
  const channel = { on: () => channel, subscribe: () => channel };
  const client = {
    from: () => ({
      select: () => ({
        order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }),
      }),
      insert: (row: unknown) => {
        insertSpy(row);
        return { select: () => ({ single: () => Promise.resolve(insertResult) }) };
      },
    }),
    channel: () => channel,
    removeChannel: () => {},
  };
  return {
    supabase: client,
    isSupabaseConfigured: true,
    WISH_NAME_MAX: 80,
    WISH_MESSAGE_MAX: 500,
    WISH_PAX_MAX: 4,
  };
});

import RsvpWishesSection from '../src/components/RsvpWishesSection';

describe('RsvpWishesSection Component', () => {
  beforeEach(() => {
    insertSpy.mockClear();
    insertResult.data = null;
    insertResult.error = null;
  });

  it('renders form inputs and pre-fills guest name', () => {
    render(<RsvpWishesSection guestName="Anggi Permana" />);
    const nameInput = screen.getByLabelText(/nama/i) as HTMLInputElement;
    expect(nameInput.value).toBe('Anggi Permana');
    expect(screen.getByRole('button', { name: /kirim ucapan/i })).toBeTruthy();
  });

  it('submits a new wish to Supabase and adds it to the list', async () => {
    insertResult.data = {
      id: 'abc',
      name: 'Budi Santoso',
      message: 'Selamat menempuh hidup baru!',
      status: 'hadir',
      pax: 1,
      created_at: new Date().toISOString(),
    };
    render(<RsvpWishesSection guestName="Budi Santoso" />);
    fireEvent.change(screen.getByLabelText(/doa/i), { target: { value: 'Selamat menempuh hidup baru!' } });
    fireEvent.click(screen.getByRole('button', { name: /kirim ucapan/i }));
    await waitFor(() => {
      expect(screen.getByText('Selamat menempuh hidup baru!')).toBeTruthy();
    });
    expect(insertSpy).toHaveBeenCalledWith({
      name: 'Budi Santoso',
      message: 'Selamat menempuh hidup baru!',
      status: 'hadir',
      pax: 1,
    });
  });

  it('shows an error and does not add the wish when Supabase insert fails', async () => {
    insertResult.error = { message: 'new row violates row-level security policy' };
    render(<RsvpWishesSection guestName="Budi Santoso" />);
    fireEvent.change(screen.getByLabelText(/doa/i), { target: { value: 'Ucapan gagal' } });
    fireEvent.click(screen.getByRole('button', { name: /kirim ucapan/i }));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeTruthy();
    });
    expect(screen.queryByText('Ucapan gagal', { selector: 'p' })).toBeNull();
  });
});
