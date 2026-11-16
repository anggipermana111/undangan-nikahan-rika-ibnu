import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EventSection from '../src/components/EventSection';
import { weddingData } from '../src/data/wedding-data';

describe('EventSection Component', () => {
  it('renders Akad and Resepsi event titles and venue names', () => {
    render(<EventSection events={weddingData.events} />);
    expect(screen.getByText(weddingData.events.akad.title)).toBeTruthy();
    expect(screen.getByText(weddingData.events.resepsi.title)).toBeTruthy();
    expect(screen.getAllByText(weddingData.events.akad.venueName).length).toBeGreaterThan(0);
    expect(screen.getAllByText(weddingData.events.resepsi.venueName).length).toBeGreaterThan(0);
  });
});
