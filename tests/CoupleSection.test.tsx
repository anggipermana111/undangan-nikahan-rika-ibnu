import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CoupleSection from '../src/components/CoupleSection';
import { weddingData } from '../src/data/wedding-data';

describe('CoupleSection Component', () => {
  it('renders groom and bride full names and parents', () => {
    render(<CoupleSection data={weddingData} />);
    expect(screen.getByText(weddingData.groom.fullName)).toBeTruthy();
    expect(screen.getByText(weddingData.bride.fullName)).toBeTruthy();
    expect(screen.getByText(new RegExp(weddingData.groom.parents, 'i'))).toBeTruthy();
    expect(screen.getByText(new RegExp(weddingData.bride.parents, 'i'))).toBeTruthy();
  });
});
