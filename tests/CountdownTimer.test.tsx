import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CountdownTimer from '../src/components/CountdownTimer';

describe('CountdownTimer Component', () => {
  it('renders days, hours, minutes, and seconds labels', () => {
    // Target date in the future
    const futureDate = new Date(Date.now() + 86400000 * 30).toISOString();
    render(<CountdownTimer targetDateIso={futureDate} />);
    expect(screen.getByText(/hari/i)).toBeTruthy();
    expect(screen.getByText(/jam/i)).toBeTruthy();
    expect(screen.getByText(/menit/i)).toBeTruthy();
    expect(screen.getByText(/detik/i)).toBeTruthy();
  });

  it('renders completion message when date is in the past', () => {
    const pastDate = new Date(Date.now() - 86400000).toISOString();
    render(<CountdownTimer targetDateIso={pastDate} />);
    expect(screen.getByText(/hari bahagia telah tiba/i)).toBeTruthy();
  });
});
