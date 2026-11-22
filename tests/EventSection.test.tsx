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

  it('renders maps and calendar links plus a photo for each event', () => {
    render(<EventSection events={weddingData.events} />);
    const maps = screen.getAllByRole('link', { name: /lihat lokasi/i });
    expect(maps).toHaveLength(2);
    expect(maps[0].getAttribute('href')).toBe(weddingData.events.akad.mapsUrl);
    const cal = screen.getAllByRole('link', { name: /kalender/i });
    expect(cal).toHaveLength(2);
    cal.forEach((a) => expect(a.getAttribute('href')).toMatch(/^https:\/\/calendar\.google\.com\/calendar\/render\?/));
    expect(screen.getByAltText(`Foto ${weddingData.events.akad.title}`)).toBeTruthy();
    expect(screen.getByAltText(`Foto ${weddingData.events.resepsi.title}`)).toBeTruthy();
  });
});
