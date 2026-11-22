import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CoverGate from '../src/components/CoverGate';

describe('CoverGate Component', () => {
  it('renders recipient name when provided', () => {
    render(<CoverGate guestName="Bapak Budi & Keluarga" onOpen={() => {}} />);
    expect(screen.getByText('Bapak Budi & Keluarga')).toBeTruthy();
  });

  it('falls back to default guest name when empty or undefined', () => {
    render(<CoverGate guestName="" onOpen={() => {}} />);
    expect(screen.getByText('Tamu Undangan')).toBeTruthy();
  });

  it('triggers onOpen callback when Buka Undangan button is clicked', () => {
    const handleOpen = vi.fn();
    render(<CoverGate guestName="Anggi Permana" onOpen={handleOpen} />);
    const button = screen.getByRole('button', { name: /buka undangan/i });
    fireEvent.click(button);
    expect(handleOpen).toHaveBeenCalledTimes(1);
  });

  it('shows the monogram and couple nicknames', () => {
    render(<CoverGate guestName="Anggi" onOpen={() => {}} />);
    expect(screen.getByLabelText(/monogram r i/i)).toBeTruthy();
    expect(screen.getByText(/rika & ibnu/i)).toBeTruthy();
  });

  it('clamps a very long guest name to two lines', () => {
    const longName = 'Bapak Haji Muhammad Abdurrahman Wahid Kusumawardhana Beserta Keluarga Besar Tercinta';
    render(<CoverGate guestName={longName} onOpen={() => {}} />);
    const el = screen.getByTestId('guest-name');
    expect(el.textContent).toBe(longName);
    expect(el.className).toMatch(/line-clamp-2/);
    expect(el.className).toMatch(/break-words/);
    expect(screen.getByRole('button', { name: /buka undangan/i })).toBeTruthy();
  });

  it('keeps the open button reachable on short in-app browser viewports', () => {
    render(<CoverGate guestName="Anggi" onOpen={() => {}} />);
    const column = screen.getByTestId('cover-column');
    expect(column.className).toMatch(/overflow-y-auto/);
    const capsule = screen.getByAltText(/rika & ibnu/i).parentElement as HTMLElement;
    expect(capsule.className).toMatch(/svh/);
  });
});
