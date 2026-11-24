import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import config from '../tailwind.config';

const css = fs.readFileSync(path.resolve(__dirname, '../src/app/globals.css'), 'utf-8');

describe('Theme tokens', () => {
  it('defines the forest palette with exact hex values', () => {
    const colors = config.theme?.extend?.colors as Record<string, Record<string, string> | string>;
    expect(colors.forest).toEqual({ 700: '#2E4F47', 900: '#1F3A34' });
    expect(colors.cream).toEqual({ 50: '#F5EFE4', 100: '#EDE4D3' });
    expect(colors.gold).toEqual({ 500: '#B89B5E' });
    expect(colors.ink).toBe('#1C2A26');
    expect(colors.sage).toEqual({ 500: '#6B7F73' });
    expect(colors.dreamy).toBeUndefined();
    expect(colors.primary).toBeUndefined();
  });

  it('maps the four font roles', () => {
    const fonts = config.theme?.extend?.fontFamily as Record<string, string[]>;
    expect(fonts.display[0]).toBe('var(--font-cinzel)');
    expect(fonts.serif[0]).toBe('var(--font-cormorant)');
    expect(fonts.script[0]).toBe('var(--font-pinyon)');
    expect(fonts.sans[0]).toBe('var(--font-quicksand)');
  });

  it('disables motion under prefers-reduced-motion', () => {
    const block = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
    expect(block.length).toBeGreaterThan(0);
    expect(block).toMatch(/\.animate-sway/);
    expect(block).toMatch(/\.animate-sparkle/);
    expect(block).toMatch(/\.fade-up/);
  });

  it('keeps raw hex colors out of global CSS and layout', () => {
    const layout = fs.readFileSync(path.resolve(__dirname, '../src/app/layout.tsx'), 'utf-8');
    expect(css).not.toMatch(/#[0-9a-fA-F]{6}/);
    expect(layout).not.toMatch(/#[0-9a-fA-F]{6}/);
  });
});
