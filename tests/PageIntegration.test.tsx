import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WeddingPage from '../src/app/page';

describe('Wedding Invitation Full Page Integration', () => {
  it('renders cover gate initially', () => {
    render(<WeddingPage />);
    expect(screen.getByRole('button', { name: /buka undangan/i })).toBeTruthy();
  });

  it('unveils invitation content when gate is opened', () => {
    render(<WeddingPage />);
    const openBtn = screen.getByRole('button', { name: /buka undangan/i });
    fireEvent.click(openBtn);
    expect(screen.getByText(/Groom & Bride/i)).toBeTruthy();
  });
});
