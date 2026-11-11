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
});
