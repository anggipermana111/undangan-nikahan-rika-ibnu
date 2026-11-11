import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AudioPlayer from '../src/components/AudioPlayer';

describe('AudioPlayer Component', () => {
  it('renders floating audio control button', () => {
    render(<AudioPlayer isPlaying={false} onToggle={() => {}} audioSrc="/audio/wedding-song.mp3" />);
    expect(screen.getByLabelText(/audio/i)).toBeTruthy();
  });

  it('fires onToggle when clicked', () => {
    const handleToggle = vi.fn();
    render(<AudioPlayer isPlaying={true} onToggle={handleToggle} audioSrc="/audio/wedding-song.mp3" />);
    fireEvent.click(screen.getByLabelText(/audio/i));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
