import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import GallerySection from '../src/components/GallerySection';

const mockImages = [
  { id: '1', src: '/photos/photo1.jpg', alt: 'Momen 1' },
  { id: '2', src: '/photos/photo2.jpg', alt: 'Momen 2' },
  { id: '3', src: '/photos/photo3.jpg', alt: 'Momen 3' },
];

function openFirst() {
  render(<GallerySection images={mockImages} />);
  fireEvent.click(screen.getAllByRole('img')[0]);
  return screen.getByRole('dialog', { name: /galeri foto/i });
}

describe('GallerySection Component', () => {
  it('renders gallery images', () => {
    render(<GallerySection images={mockImages} />);
    expect(screen.getAllByRole('img').length).toBe(mockImages.length);
  });

  it('opens lightbox preview when an image is clicked', () => {
    const dialog = openFirst();
    expect(within(dialog).getByAltText('Momen 1')).toBeTruthy();
    expect(screen.getByLabelText(/close lightbox/i)).toBeTruthy();
  });

  it('closes on Escape and removes the key listener', () => {
    openFirst();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    // A later arrow key must not reopen or throw
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('navigates with arrow keys and wraps around', () => {
    const dialog = openFirst();
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(within(dialog).getByAltText('Momen 2')).toBeTruthy();
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(within(dialog).getByAltText('Momen 3')).toBeTruthy();
  });

  it('navigates with swipe gestures', () => {
    const dialog = openFirst();
    fireEvent.touchStart(dialog, { touches: [{ clientX: 300 }] });
    fireEvent.touchEnd(dialog, { changedTouches: [{ clientX: 100 }] });
    expect(within(dialog).getByAltText('Momen 2')).toBeTruthy();
    fireEvent.touchStart(dialog, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(dialog, { changedTouches: [{ clientX: 300 }] });
    expect(within(dialog).getByAltText('Momen 1')).toBeTruthy();
  });

  it('ignores short swipes', () => {
    const dialog = openFirst();
    fireEvent.touchStart(dialog, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(dialog, { changedTouches: [{ clientX: 180 }] });
    expect(within(dialog).getByAltText('Momen 1')).toBeTruthy();
  });
});
