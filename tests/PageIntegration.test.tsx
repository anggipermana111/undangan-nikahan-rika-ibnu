import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WeddingPage from '../src/app/page';

describe('Wedding Invitation Full Page Integration', () => {
  it('renders cover gate initially', () => {
    render(<WeddingPage />);
    expect(screen.getByRole('button', { name: /buka undangan/i })).toBeTruthy();
  });

  it('shows every section in order after opening', () => {
    const { container } = render(<WeddingPage />);
    fireEvent.click(screen.getByRole('button', { name: /buka undangan/i }));
    expect(screen.queryByRole('button', { name: /buka undangan/i })).toBeNull();
    const ids = Array.from(container.querySelectorAll('main section[id]')).map((s) => s.id);
    expect(ids).toEqual(['hero', 'quote', 'couple', 'event', 'story', 'gallery', 'gift', 'rsvp', 'closing']);
    expect(screen.getByRole('heading', { name: /terima kasih/i })).toBeTruthy();
    expect(screen.queryByRole('navigation')).toBeNull();
  });

  it('keeps the hidden invitation out of keyboard and screen reader reach until opened', () => {
    const { container } = render(<WeddingPage />);
    const main = container.querySelector('main') as HTMLElement;
    expect(main.hasAttribute('inert')).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: /buka undangan/i }));
    expect(main.hasAttribute('inert')).toBe(false);
  });
});
