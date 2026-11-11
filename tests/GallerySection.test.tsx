import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GallerySection from '../src/components/GallerySection';

const mockImages = [
  { id: '1', src: '/photos/photo1.jpg', alt: 'Momen 1' },
  { id: '2', src: '/photos/photo2.jpg', alt: 'Momen 2' },
];

describe('GallerySection Component', () => {
  it('renders gallery images', () => {
    render(<GallerySection images={mockImages} />);
    expect(screen.getAllByRole('img').length).toBe(mockImages.length);
  });

  it('opens lightbox preview when an image is clicked', () => {
    render(<GallerySection images={mockImages} />);
    fireEvent.click(screen.getAllByRole('img')[0]);
    expect(screen.getByLabelText(/close lightbox/i)).toBeTruthy();
  });
});
