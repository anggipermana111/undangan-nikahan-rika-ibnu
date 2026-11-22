import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

const insertResult = { data: null as unknown, error: null as unknown };
const insertSpy = vi.fn();
const listResult = { data: [] as unknown[], error: null as unknown };
const realtime = { handler: null as null | ((payload: { new: unknown }) => void) };

vi.mock('@/lib/supabase', () => {
  const channel = {
    on: (_event: unknown, _filter: unknown, cb: (payload: { new: unknown }) => void) => {
      realtime.handler = cb;
      return channel;
    },
    subscribe: () => channel,
  };
  const client = {
    from: () => ({
      select: () => ({
        order: () => ({ limit: () => Promise.resolve(listResult) }),
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

function makeWishes(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: `w${i + 1}`,
    name: `Tamu ${i + 1}`,
    message: `Pesan ${i + 1}`,
    status: 'hadir',
    pax: 1,
    created_at: new Date(Date.now() - i * 60_000).toISOString(),
  }));
}

describe('RsvpWishesSection Component', () => {
  beforeEach(() => {
    insertSpy.mockClear();
    insertResult.data = null;
    insertResult.error = null;
    listResult.data = [];
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

  it('paginates wishes 5 per page', async () => {
    listResult.data = makeWishes(12);
    render(<RsvpWishesSection />);
    await screen.findByText('Pesan 1');
    expect(screen.getByText('1 / 3')).toBeTruthy();
    expect(screen.queryByText('Pesan 6')).toBeNull();
    const prev = screen.getByRole('button', { name: /halaman sebelumnya/i }) as HTMLButtonElement;
    const next = screen.getByRole('button', { name: /halaman berikutnya/i }) as HTMLButtonElement;
    expect(prev.disabled).toBe(true);
    fireEvent.click(next);
    expect(screen.getByText('Pesan 6')).toBeTruthy();
    expect(screen.queryByText('Pesan 1')).toBeNull();
    expect(screen.getByText('2 / 3')).toBeTruthy();
    fireEvent.click(next);
    expect(screen.getByText('Pesan 11')).toBeTruthy();
    expect(next.disabled).toBe(true);
    fireEvent.click(prev);
    expect(screen.getByText('2 / 3')).toBeTruthy();
  });

  it('hides the pager when there is only one page', async () => {
    listResult.data = makeWishes(3);
    render(<RsvpWishesSection />);
    await screen.findByText('Pesan 1');
    expect(screen.queryByRole('button', { name: /halaman berikutnya/i })).toBeNull();
  });

  it('returns to page 1 after submitting from a later page', async () => {
    listResult.data = makeWishes(12);
    insertResult.data = {
      id: 'new', name: 'Budi', message: 'Ucapan baru', status: 'hadir', pax: 1,
      created_at: new Date().toISOString(),
    };
    render(<RsvpWishesSection guestName="Budi" />);
    await screen.findByText('Pesan 1');
    fireEvent.click(screen.getByRole('button', { name: /halaman berikutnya/i }));
    fireEvent.click(screen.getByRole('button', { name: /halaman berikutnya/i }));
    expect(screen.getByText('3 / 3')).toBeTruthy();
    fireEvent.change(screen.getByLabelText(/doa/i), { target: { value: 'Ucapan baru' } });
    fireEvent.click(screen.getByRole('button', { name: /kirim/i }));
    await screen.findByText('Ucapan baru', { selector: 'p' });
    expect(screen.getByText('1 / 3')).toBeTruthy();
  });

  it('returns to page 1 when a realtime wish arrives while on a later page', async () => {
    listResult.data = makeWishes(12);
    render(<RsvpWishesSection />);
    await screen.findByText('Pesan 1');
    fireEvent.click(screen.getByRole('button', { name: /halaman berikutnya/i }));
    fireEvent.click(screen.getByRole('button', { name: /halaman berikutnya/i }));
    expect(screen.getByText('3 / 3')).toBeTruthy();
    act(() => {
      realtime.handler!({
        new: { id: 'rt1', name: 'Tamu Live', message: 'Ucapan realtime', status: 'hadir', pax: 1, created_at: new Date().toISOString() },
      });
    });
    expect(screen.getByText('Ucapan realtime')).toBeTruthy();
    expect(screen.getByText('1 / 3')).toBeTruthy();
  });
});
