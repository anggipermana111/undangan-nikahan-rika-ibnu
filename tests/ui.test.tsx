import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../src/components/ui/Card';
import SectionTitle from '../src/components/ui/SectionTitle';
import Sparkles from '../src/components/ui/Sparkles';

describe('UI ornaments', () => {
  it('Card renders children with variant and optional ornaments', () => {
    const { container } = render(
      <Card variant="forest" withLeaves withSand>
        <p>Isi kartu</p>
      </Card>
    );
    expect(screen.getByText('Isi kartu')).toBeTruthy();
    const root = container.firstElementChild as HTMLElement;
    expect(root.dataset.variant).toBe('forest');
    // 2 leaf images + 1 sand image, all decorative
    const decorative = container.querySelectorAll('img[aria-hidden="true"]');
    expect(decorative.length).toBe(3);
    decorative.forEach((img) => expect(img.getAttribute('alt')).toBe(''));
  });

  it('Card without ornaments renders no images', () => {
    const { container } = render(<Card><p>x</p></Card>);
    expect(container.querySelectorAll('img').length).toBe(0);
    expect((container.firstElementChild as HTMLElement).dataset.variant).toBe('cream');
  });

  it('SectionTitle renders kicker, heading and script line', () => {
    render(<SectionTitle kicker="Waktu & Tempat" title="Save" script="The Date" />);
    expect(screen.getByText('Waktu & Tempat')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: /save/i })).toBeTruthy();
    expect(screen.getByText('The Date')).toBeTruthy();
  });

  it('Sparkles caps the dot count at 12', () => {
    const { container } = render(<Sparkles count={40} />);
    expect(container.querySelectorAll('span').length).toBe(12);
  });
});
