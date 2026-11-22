import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoveStorySection from '../src/components/LoveStorySection';
import { weddingData } from '../src/data/wedding-data';

describe('LoveStorySection', () => {
  it('renders every milestone title and story in order', () => {
    render(<LoveStorySection data={weddingData.loveStory} />);
    expect(screen.getByRole('heading', { level: 2, name: /love story/i })).toBeTruthy();
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(weddingData.loveStory.map((m) => m.title));
  });

  it('renders nothing for an empty list', () => {
    const { container } = render(<LoveStorySection data={[]} />);
    expect(container.innerHTML).toBe('');
  });
});
