# Retheme Wekita-Style (Forest Green & Cream) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the wedding invitation to follow the layout and ornament style of the wekita.id reference, using a forest-green / cream / muted-gold palette, without changing the working data, RSVP and audio logic.

**Architecture:** Retheme in place. Data (`src/data/wedding-data.ts`), hooks, Supabase logic and audio stay. New design tokens and fonts, a small set of presentational ornament components under `src/components/ui/`, three new sections (Hero, Quote, Closing), and visual rewrites of the existing sections. The page becomes a single phone-width column.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS 3.4, `next/font/google`, Vitest + Testing Library (jsdom), sharp (asset scripts only), puppeteer-core + Microsoft Edge (screenshots only), pnpm.

**Spec:** `docs/superpowers/specs/2026-11-22-retheme-wekita-style-design.md`

## Global Constraints

- Work on branch `main`. `backup/tema-dreamy-v1` must not be modified.
- Package manager: pnpm only (`pnpm add`, `pnpm remove`, `pnpm test`). Do not create `package-lock.json`.
- Palette (exact hex): `forest-900 #1F3A34`, `forest-700 #2E4F47`, `cream-50 #F5EFE4`, `cream-100 #EDE4D3`, `gold-500 #B89B5E`, `ink #1C2A26`, `sage-500 #6B7F73`. No other raw hex values in components.
- Fonts: Cinzel (`font-display`), Cormorant Garamond (`font-serif`), Pinyon Script (`font-script`), Quicksand (`font-sans`).
- Page column width: `max-w-[440px]`, centered.
- Order of couple everywhere: Bride (Rika) first, then Groom (Ibnu).
- No asset copied or hot-linked from wekita.id.
- `src/lib/supabase.ts`, `src/hooks/*`, Supabase schema and the Supabase calls inside `RsvpWishesSection.tsx` are not changed.
- Content text (verse, love story, names, addresses, bank numbers) is not changed.
- All motion disabled under `prefers-reduced-motion: reduce`.
- Helper scripts (asset generation, photo processing, screenshots) live in the session scratchpad, never in the repo. Load sharp from the absolute path `<repo>/node_modules/.pnpm/node_modules/sharp` and call `sharp.cache(false)` and read inputs with `fs.readFileSync` (Windows file-lock issue seen earlier).
- Commit messages end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Do not push until Task 15.

## Review Focus

1. Very long `?to=` guest name (80+ characters) on a 375×667 screen: name must clamp to 2 lines and the "Buka Undangan" button must stay visible. Pinned in Task 6.
2. Wishes list changes while the guest is on page 2+ (own submit or realtime insert): the guest must land on page 1 and see the new wish; page index must never point past the last page. Pinned in Task 13.
3. Keyboard on the gallery lightbox: Esc closes, ArrowLeft/ArrowRight navigate, and the key listener is removed when the lightbox closes. Pinned in Task 11.
4. A photo that fails to load must not collapse its frame: every photo frame has a fixed aspect ratio and a `bg-cream-100` placeholder. Pinned in Task 8.
5. A guest with reduced-motion enabled must not see sparkles, sway or fade-up transitions. Pinned in Task 3.

---

## File Map

| Path | Responsibility | Task |
|---|---|---|
| `public/themes/forest/*.webp` | Generated ornaments | 1 |
| `public/images/gallery/01.jpg`…`10.jpg`, `public/images/couple/{bride,groom}.jpg` | Processed photos | 2 |
| `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/globals.css` | Tokens, fonts, global CSS | 3 |
| `src/types/wedding.ts`, `src/data/wedding-data.ts` | Data shape and values | 4 |
| `src/components/ui/{Card,SectionTitle,WatercolorHeader,LeafCorners,GoldSand,Sparkles}.tsx` | Presentational ornaments | 5 |
| `src/components/CoverGate.tsx` | Gate screen | 6 |
| `src/components/{HeroSection,QuoteSection,CountdownTimer}.tsx` | Hero, verse, countdown | 7 |
| `src/components/CoupleSection.tsx` | Bride and groom cards | 8 |
| `src/components/EventSection.tsx` | Save the date, event cards | 9 |
| `src/components/LoveStorySection.tsx` | Love story | 10 |
| `src/components/GallerySection.tsx` | Grid + lightbox | 11 |
| `src/components/GiftSection.tsx` | Digital envelope accordion | 12 |
| `src/components/RsvpWishesSection.tsx` | RSVP form + paginated wishes | 13 |
| `src/components/{ClosingSection,AudioPlayer}.tsx`, `src/app/page.tsx`, cleanup, `public/og-image.jpg` | Assembly | 14 |
| — | Screenshots, user review, push | 15 |

---

### Task 1: Generate ornament assets (USER CHECKPOINT)

**Files:**
- Create: `public/themes/forest/watercolor-top.webp`, `leaf-left.webp`, `leaf-right.webp`, `gold-sand.webp`, `sprig.webp`, `outer-bg.webp`
- Scratch only: `<scratchpad>/assets/raw/*.png`, `<scratchpad>/assets/process.cjs`

**Interfaces:**
- Produces: the six files above at exactly these paths. Later tasks reference them by URL `/themes/forest/<name>.webp`.

- [ ] **Step 1: Generate raw images**

Use the available image-generation tool (Figma MCP `generate_image`; load its schema with ToolSearch first). Generate one image per prompt, PNG, and save to `<scratchpad>/assets/raw/<name>.png`:

| name | size | prompt |
|---|---|---|
| `watercolor-top` | 1080×1350 | "Abstract watercolor wash, deep forest green #1F3A34 and #2E4F47 with soft lighter sage blooms, heavy at the top edge, fading irregularly into pure white at the bottom half, paper texture, no objects, no text" |
| `leaf-left` | 800×800 | "Botanical pencil line-art sketch of dry wild grass and slender leaves growing from the bottom-left corner, single color muted sage #6B7F73 ink on pure white background, delicate hand-drawn, no text" |
| `leaf-right` | — | Do not generate. Created in Step 2 by mirroring `leaf-left`. |
| `gold-sand` | 1600×300 | "Horizontal strip of glittering gold sand with fine sparkles, warm muted gold #B89B5E, uneven soft top edge, pure white background above, no text" |
| `sprig` | 400×400 | "Small single sprig of leaves, minimal botanical line drawing, muted gold #B89B5E ink on pure white background, centered, no text" |
| `outer-bg` | 1600×1000 | "Soft out-of-focus forest green background, deep green #1F3A34 with subtle darker vignette and faint bokeh, no objects, no text" |

If the tool is not available or fails twice for one prompt, stop and report to the user. Do not fall back to images from the internet.

- [ ] **Step 2: Post-process to transparent WebP**

Create `<scratchpad>/assets/process.cjs`:

```js
const path = require('path');
const fs = require('fs');
const REPO = process.argv[2];
const sharp = require(path.join(REPO, 'node_modules/.pnpm/node_modules/sharp'));
sharp.cache(false);
const RAW = path.join(__dirname, 'raw');
const OUT = path.join(REPO, 'public/themes/forest');
fs.mkdirSync(OUT, { recursive: true });

// White -> transparent: alpha = 255 - luminance (keeps ink/paint, drops paper)
async function whiteToAlpha(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i + 3] = Math.max(0, Math.min(255, Math.round((255 - lum) * 1.6)));
  }
  return sharp(data, { raw: info });
}

(async () => {
  const read = (n) => fs.readFileSync(path.join(RAW, `${n}.png`));

  const water = await whiteToAlpha(read('watercolor-top'));
  await water.resize({ width: 1080 }).webp({ quality: 80, alphaQuality: 80 }).toFile(path.join(OUT, 'watercolor-top.webp'));

  const leaf = await (await whiteToAlpha(read('leaf-left'))).resize({ width: 480 }).png().toBuffer();
  await sharp(leaf).webp({ quality: 85 }).toFile(path.join(OUT, 'leaf-left.webp'));
  await sharp(leaf).flop().webp({ quality: 85 }).toFile(path.join(OUT, 'leaf-right.webp'));

  const sand = await whiteToAlpha(read('gold-sand'));
  await sand.resize({ width: 1080 }).webp({ quality: 80 }).toFile(path.join(OUT, 'gold-sand.webp'));

  const sprig = await whiteToAlpha(read('sprig'));
  await sprig.resize({ width: 160 }).webp({ quality: 85 }).toFile(path.join(OUT, 'sprig.webp'));

  await sharp(read('outer-bg')).resize({ width: 1600 }).blur(20).webp({ quality: 70 }).toFile(path.join(OUT, 'outer-bg.webp'));

  for (const f of fs.readdirSync(OUT)) console.log(f, fs.statSync(path.join(OUT, f)).size);
})();
```

Run: `node "<scratchpad>/assets/process.cjs" "C:/Users/DEV/Documents/Self project/Undangan nikahan"`
Expected: six files listed, each under 300 KB.

- [ ] **Step 3: Build a review sheet and show the user**

Compose all six assets onto a cream (`#F5EFE4`) canvas and one copy onto forest (`#1F3A34`) so transparency is visible. Save to `<scratchpad>/assets/review.png`, view it with the Read tool, and show it to the user.

Expected: user approves, or names assets to regenerate. Repeat Steps 1–3 for rejected assets only. Do not continue to Task 3+ visual work without approval (Task 2 may run in parallel).

- [ ] **Step 4: Commit**

```bash
git add public/themes/forest
git commit -m "feat: add generated forest theme ornament assets

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Process photos (USER CHECKPOINT)

**Files:**
- Create: `public/images/gallery/01.jpg` … `10.jpg`, `public/images/couple/bride.jpg`, `public/images/couple/groom.jpg`
- Scratch only: `<scratchpad>/photos/process.cjs`, `<scratchpad>/photos/sheet.jpg`

**Interfaces:**
- Produces: photo URLs used by Task 4:
  - `/images/gallery/01.jpg` … `/images/gallery/10.jpg` (source files sorted by name)
  - `/images/couple/bride.jpg`, `/images/couple/groom.jpg`

Source order (sorted by filename in `Foto Rika Ibnu/`):
`01` = `Photo.jpeg` (studio, suit & gown, B&W) · `02` = `09.38.52` (outdoor standing) · `03` = `09.38.53` (outdoor standing, variant) · `04` = `09.38.58` (outdoor walking hand-in-hand) · `05` = `09.39.04` (maroon tops, floor) · `06` = `09.39.12` · `07` = `09.39.13` · `08` = `09.39.18` · `09` = `09.39.20` · `10` = `09.39.22`.

- [ ] **Step 1: Write the processing script**

Create `<scratchpad>/photos/process.cjs`:

```js
const path = require('path');
const fs = require('fs');
const REPO = process.argv[2];
const sharp = require(path.join(REPO, 'node_modules/.pnpm/node_modules/sharp'));
sharp.cache(false);
const SRC = path.join(REPO, 'Foto Rika Ibnu');
const GAL = path.join(REPO, 'public/images/gallery');
const CPL = path.join(REPO, 'public/images/couple');
fs.mkdirSync(GAL, { recursive: true });
fs.mkdirSync(CPL, { recursive: true });

(async () => {
  const files = fs.readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
  if (files.length !== 10) throw new Error(`expected 10 photos, got ${files.length}`);
  for (const [i, f] of files.entries()) {
    const out = path.join(GAL, `${String(i + 1).padStart(2, '0')}.jpg`);
    await sharp(fs.readFileSync(path.join(SRC, f)))
      .rotate()
      .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(out);
    console.log(out, f);
  }

  // Bride (right half) and groom (left half) from the studio photo, 3:4
  const studio = await sharp(fs.readFileSync(path.join(SRC, files[0]))).rotate().toBuffer();
  const { width, height } = await sharp(studio).metadata();
  const cropW = Math.floor(width / 2);
  const cropH = Math.min(height, Math.round((cropW * 4) / 3));
  for (const [name, left] of [['groom', 0], ['bride', width - cropW]]) {
    await sharp(studio)
      .extract({ left, top: 0, width: cropW, height: cropH })
      .resize({ width: 720, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(CPL, `${name}.jpg`));
  }
})();
```

- [ ] **Step 2: Run it**

Run: `node "<scratchpad>/photos/process.cjs" "C:/Users/DEV/Documents/Self project/Undangan nikahan"`
Expected: 10 gallery lines printed, no error; `public/images/couple/` holds `bride.jpg` and `groom.jpg`.

- [ ] **Step 3: Contact sheet with proposed placement, show the user**

Build `<scratchpad>/photos/sheet.jpg` (tiles 220×290, 6 per row) with a caption under each tile: `01 cover`, `02 akad`, `04 resepsi`, `09 closing`, `10 hero`, `bride`, `groom`, others `gallery`. View it with Read and show it to the user.

Expected: user approves the placement, or gives a different mapping. If the bride/groom crop cuts a face, adjust `left`/`cropW` for that one crop and rerun.

- [ ] **Step 4: Commit**

```bash
git add public/images/gallery public/images/couple
git commit -m "feat: add processed gallery and couple photos

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Design tokens, fonts, global CSS

**Files:**
- Modify: `tailwind.config.ts` (whole `theme.extend`)
- Modify: `src/app/layout.tsx` (fonts, `<html>`/`<body>` classes)
- Modify: `src/app/globals.css` (whole file)
- Test: `tests/theme.test.ts` (new)

**Interfaces:**
- Produces Tailwind classes used by all later tasks: `bg-forest-900`, `bg-forest-700`, `bg-cream-50`, `bg-cream-100`, `text-gold-500`, `text-ink`, `text-sage-500`, `font-display`, `font-serif`, `font-script`, `font-sans`, `animate-sway`, `animate-sparkle`, `fade-up`/`visible`/`fade-up-delay-1..5`, `xs:` breakpoint (400px).

- [ ] **Step 1: Write the failing test**

Create `tests/theme.test.ts`:

```ts
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
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/theme.test.ts`
Expected: FAIL (`colors.forest` undefined).

- [ ] **Step 3: Replace `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      colors: {
        forest: { 700: '#2E4F47', 900: '#1F3A34' },
        cream: { 50: '#F5EFE4', 100: '#EDE4D3' },
        gold: { 500: '#B89B5E' },
        ink: '#1C2A26',
        sage: { 500: '#6B7F73' },
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'Georgia', 'serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        script: ['var(--font-pinyon)', 'cursive'],
        sans: ['var(--font-quicksand)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Replace `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background: #1F3A34;
  color: #1C2A26;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #F5EFE4; }
::-webkit-scrollbar-thumb { background: #1F3A34; border-radius: 9999px; }

/* ===== Scroll reveal ===== */
.fade-up {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-up.visible { opacity: 1; transform: translateY(0); }
.fade-up-delay-1 { transition-delay: 0.1s; }
.fade-up-delay-2 { transition-delay: 0.2s; }
.fade-up-delay-3 { transition-delay: 0.3s; }
.fade-up-delay-4 { transition-delay: 0.45s; }
.fade-up-delay-5 { transition-delay: 0.6s; }

/* ===== Keyframes ===== */
@keyframes sway {
  0%, 100% { transform: rotate(0deg); }
  50%      { transform: rotate(2deg); }
}
@keyframes sparkle {
  0%, 100% { opacity: 0; transform: translateY(0); }
  50%      { opacity: 0.9; transform: translateY(-14px); }
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes slide-up {
  from { opacity: 0; transform: translate(-50%, 16px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
}

.animate-sway     { animation: sway 7s ease-in-out infinite; }
.animate-sparkle  { animation: sparkle 6s ease-in-out infinite; }
.animate-fade-in  { animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }

@media (prefers-reduced-motion: reduce) {
  .animate-sway,
  .animate-sparkle,
  .animate-fade-in,
  .animate-slide-up,
  .animate-spin-slow { animation: none !important; }
  .animate-sparkle { opacity: 0 !important; }
  .fade-up { opacity: 1 !important; transform: none !important; transition: none !important; }
  html { scroll-behavior: auto !important; }
}
```

- [ ] **Step 5: Update fonts in `src/app/layout.tsx`**

Replace the three font imports and declarations (lines 1–24 of the current file) with:

```tsx
import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Pinyon_Script, Quicksand } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pinyon",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});
```

Replace the `<html>`/`<body>` JSX at the bottom with:

```tsx
    <html
      lang="id"
      className={`scroll-smooth ${cinzel.variable} ${cormorant.variable} ${pinyon.variable} ${quicksand.variable}`}
    >
      <body className="antialiased font-sans text-ink bg-forest-900 selection:bg-gold-500/30">
        {children}
      </body>
    </html>
```

Keep `SITE_URL`, `TITLE`, `DESCRIPTION` and `metadata` unchanged. In `viewport`, change `themeColor: "#2d4234"` to `themeColor: "#1F3A34"`.

- [ ] **Step 6: Run tests to verify they pass**

Run: `pnpm vitest run tests/theme.test.ts`
Expected: PASS (3 tests).

Run: `npx tsc --noEmit`
Expected: no output.

- [ ] **Step 7: Commit**

```bash
git add tailwind.config.ts src/app/layout.tsx src/app/globals.css tests/theme.test.ts
git commit -m "feat: add forest theme tokens, fonts and reduced-motion rules

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Data shape and values

**Files:**
- Modify: `src/types/wedding.ts`
- Modify: `src/data/wedding-data.ts`
- Test: `tests/data.test.ts`

**Interfaces:**
- Consumes: photo URLs from Task 2.
- Produces (used by Tasks 6–14):
  - `WeddingEvent.photo: string`
  - `WeddingData.coverPhoto: string`, `heroPhoto: string`, `closingPhoto: string`, `monogram: string`
  - `weddingData.monogram === 'R I'`
  - `weddingData.gallery.length === 10`

- [ ] **Step 1: Add failing tests**

Append inside the `describe` block of `tests/data.test.ts`:

```ts
  it('has theme photos and monogram', () => {
    expect(weddingData.monogram).toBe('R I');
    expect(weddingData.coverPhoto).toBe('/images/gallery/01.jpg');
    expect(weddingData.heroPhoto).toBe('/images/gallery/10.jpg');
    expect(weddingData.closingPhoto).toBe('/images/gallery/09.jpg');
    expect(weddingData.events.akad.photo).toBe('/images/gallery/02.jpg');
    expect(weddingData.events.resepsi.photo).toBe('/images/gallery/04.jpg');
    expect(weddingData.bride.photo).toBe('/images/couple/bride.jpg');
    expect(weddingData.groom.photo).toBe('/images/couple/groom.jpg');
  });

  it('lists all 10 gallery photos with unique ids', () => {
    expect(weddingData.gallery).toHaveLength(10);
    expect(new Set(weddingData.gallery.map((p) => p.id)).size).toBe(10);
    weddingData.gallery.forEach((p, i) => {
      expect(p.src).toBe(`/images/gallery/${String(i + 1).padStart(2, '0')}.jpg`);
      expect(p.alt.length).toBeGreaterThan(0);
    });
  });
```

If Task 2's user review changed the mapping, use the approved mapping in both this test and Step 4.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/data.test.ts`
Expected: FAIL (`monogram` is undefined; `gallery` has length 6).

- [ ] **Step 3: Update `src/types/wedding.ts`**

In `interface WeddingEvent`, after `calendarDescription: string;` add:

```ts
  photo: string;
```

In `interface WeddingData`, after the `dateLong: string;` line add:

```ts
  /** Monogram letters shown on the cover, e.g. "R I" */
  monogram: string;
  coverPhoto: string;
  heroPhoto: string;
  closingPhoto: string;
```

- [ ] **Step 4: Update `src/data/wedding-data.ts`**

- `groom.photo` → `'/images/couple/groom.jpg'`
- `bride.photo` → `'/images/couple/bride.jpg'`
- After `dateLong: '3 Desember 2026',` add:

```ts
  monogram: 'R I',
  coverPhoto: '/images/gallery/01.jpg',
  heroPhoto: '/images/gallery/10.jpg',
  closingPhoto: '/images/gallery/09.jpg',
```

- In `events.akad`, after `calendarDescription` add `photo: '/images/gallery/02.jpg',`
- In `events.resepsi`, after `calendarDescription` add `photo: '/images/gallery/04.jpg',`
- Replace the whole `gallery: [...]` array with:

```ts
  gallery: [
    { id: '1', src: '/images/gallery/01.jpg', alt: 'Rika & Ibnu, potret studio' },
    { id: '2', src: '/images/gallery/02.jpg', alt: 'Rika & Ibnu di padang rumput' },
    { id: '3', src: '/images/gallery/03.jpg', alt: 'Rika & Ibnu di bawah pepohonan' },
    { id: '4', src: '/images/gallery/04.jpg', alt: 'Rika & Ibnu berjalan bergandengan' },
    { id: '5', src: '/images/gallery/05.jpg', alt: 'Rika & Ibnu duduk santai' },
    { id: '6', src: '/images/gallery/06.jpg', alt: 'Rika & Ibnu di studio putih' },
    { id: '7', src: '/images/gallery/07.jpg', alt: 'Rika & Ibnu, siluet bayangan' },
    { id: '8', src: '/images/gallery/08.jpg', alt: 'Rika & Ibnu, potret hitam putih' },
    { id: '9', src: '/images/gallery/09.jpg', alt: 'Rika & Ibnu berdampingan' },
    { id: '10', src: '/images/gallery/10.jpg', alt: 'Rika & Ibnu berdiri bersama' },
  ],
```

- [ ] **Step 5: Run tests**

Run: `pnpm vitest run tests/data.test.ts && npx tsc --noEmit`
Expected: data tests PASS (5). `tsc` passes (old components still compile; they ignore the new fields).

- [ ] **Step 6: Commit**

```bash
git add src/types/wedding.ts src/data/wedding-data.ts tests/data.test.ts
git commit -m "feat: add theme photos, monogram and full gallery to wedding data

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Ornament UI components

**Files:**
- Create: `src/components/ui/Card.tsx`, `SectionTitle.tsx`, `WatercolorHeader.tsx`, `LeafCorners.tsx`, `GoldSand.tsx`, `Sparkles.tsx`
- Test: `tests/ui.test.tsx` (new)

**Interfaces:**
- Consumes: asset URLs from Task 1, tokens from Task 3.
- Produces (default exports):
  - `Card({ variant?: 'cream' | 'forest'; withLeaves?: boolean; withSand?: boolean; className?: string; children: React.ReactNode })` — root has `data-variant`.
  - `SectionTitle({ kicker?: string; title: string; script?: string; tone?: 'dark' | 'light'; as?: 'h1' | 'h2' })`
  - `WatercolorHeader({ className?: string })`
  - `LeafCorners({ className?: string })`
  - `GoldSand({ className?: string })`
  - `Sparkles({ count?: number })` — renders `min(count ?? 12, 12)` dots.
  - All decorative images use `alt=""` and `aria-hidden="true"`.

- [ ] **Step 1: Write the failing test**

Create `tests/ui.test.tsx`:

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/ui.test.tsx`
Expected: FAIL (cannot resolve `../src/components/ui/Card`).

- [ ] **Step 3: Create the components**

`src/components/ui/LeafCorners.tsx`:

```tsx
interface LeafCornersProps {
  className?: string;
}

export default function LeafCorners({ className = '' }: LeafCornersProps) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 ${className}`}>
      <img
        src="/themes/forest/leaf-left.webp"
        alt=""
        aria-hidden="true"
        className="absolute bottom-6 left-0 w-28 origin-bottom-left animate-sway"
      />
      <img
        src="/themes/forest/leaf-right.webp"
        alt=""
        aria-hidden="true"
        className="absolute bottom-6 right-0 w-28 origin-bottom-right animate-sway"
      />
    </div>
  );
}
```

`src/components/ui/GoldSand.tsx`:

```tsx
interface GoldSandProps {
  className?: string;
}

export default function GoldSand({ className = '' }: GoldSandProps) {
  return (
    <img
      src="/themes/forest/gold-sand.webp"
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full ${className}`}
    />
  );
}
```

`src/components/ui/WatercolorHeader.tsx`:

```tsx
interface WatercolorHeaderProps {
  className?: string;
}

export default function WatercolorHeader({ className = '' }: WatercolorHeaderProps) {
  return (
    <img
      src="/themes/forest/watercolor-top.webp"
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 z-0 w-full object-cover object-top ${className}`}
    />
  );
}
```

`src/components/ui/Sparkles.tsx`:

```tsx
// Fixed positions so server and client render the same markup.
const DOTS = [
  { top: '8%', left: '12%', delay: '0s', size: 3 },
  { top: '15%', left: '78%', delay: '1.2s', size: 2 },
  { top: '24%', left: '40%', delay: '2.4s', size: 2 },
  { top: '33%', left: '88%', delay: '0.6s', size: 3 },
  { top: '42%', left: '6%', delay: '3s', size: 2 },
  { top: '50%', left: '60%', delay: '1.8s', size: 3 },
  { top: '58%', left: '25%', delay: '4.2s', size: 2 },
  { top: '66%', left: '82%', delay: '2.1s', size: 2 },
  { top: '74%', left: '48%', delay: '3.6s', size: 3 },
  { top: '82%', left: '15%', delay: '0.9s', size: 2 },
  { top: '88%', left: '70%', delay: '2.7s', size: 3 },
  { top: '94%', left: '35%', delay: '4.8s', size: 2 },
];

interface SparklesProps {
  count?: number;
}

export default function Sparkles({ count = 12 }: SparklesProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {DOTS.slice(0, Math.min(count, DOTS.length)).map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cream-50 animate-sparkle"
          style={{ top: d.top, left: d.left, width: d.size, height: d.size, animationDelay: d.delay }}
        />
      ))}
    </div>
  );
}
```

`src/components/ui/SectionTitle.tsx`:

```tsx
interface SectionTitleProps {
  kicker?: string;
  title: string;
  script?: string;
  tone?: 'dark' | 'light';
  as?: 'h1' | 'h2';
}

export default function SectionTitle({ kicker, title, script, tone = 'dark', as = 'h2' }: SectionTitleProps) {
  const Heading = as;
  const titleColor = tone === 'light' ? 'text-cream-50' : 'text-forest-900';
  const kickerColor = tone === 'light' ? 'text-cream-50/70' : 'text-sage-500';
  return (
    <div className="text-center">
      {kicker && (
        <p className={`mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.35em] ${kickerColor}`}>
          {kicker}
        </p>
      )}
      <Heading className={`font-display text-3xl uppercase tracking-wide ${titleColor}`}>{title}</Heading>
      {script && <p className="-mt-1 font-script text-4xl text-gold-500">{script}</p>}
    </div>
  );
}
```

`src/components/ui/Card.tsx`:

```tsx
import React from 'react';
import LeafCorners from './LeafCorners';
import GoldSand from './GoldSand';

interface CardProps {
  variant?: 'cream' | 'forest';
  withLeaves?: boolean;
  withSand?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Card({
  variant = 'cream',
  withLeaves = false,
  withSand = false,
  className = '',
  children,
}: CardProps) {
  const tone = variant === 'cream' ? 'bg-cream-50 text-ink' : 'bg-forest-900 text-cream-50';
  const bottomSpace = withLeaves || withSand ? 'pb-28' : '';
  return (
    <div
      data-variant={variant}
      className={`relative overflow-hidden rounded-[2rem] shadow-xl shadow-black/15 ${tone} ${className}`}
    >
      <div className={`relative z-10 ${bottomSpace}`}>{children}</div>
      {withLeaves && <LeafCorners />}
      {withSand && <GoldSand />}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm vitest run tests/ui.test.tsx && npx tsc --noEmit`
Expected: PASS (4 tests), no tsc output.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui tests/ui.test.tsx
git commit -m "feat: add forest theme ornament components

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Cover gate

**Files:**
- Modify: `src/components/CoverGate.tsx` (replace whole file)
- Test: `tests/CoverGate.test.tsx`

**Interfaces:**
- Consumes: `weddingData.coverPhoto`, `monogram`, `bride.nickName`, `groom.nickName`; `WatercolorHeader`, `LeafCorners`, `GoldSand`.
- Produces: `CoverGate({ guestName?: string; onOpen: () => void })` (unchanged signature). Guest name element has `data-testid="guest-name"`.

- [ ] **Step 1: Add failing tests**

Append inside the `describe` block of `tests/CoverGate.test.tsx`:

```tsx
  it('shows the monogram and couple nicknames', () => {
    render(<CoverGate guestName="Anggi" onOpen={() => {}} />);
    expect(screen.getByLabelText(/monogram r i/i)).toBeTruthy();
    expect(screen.getByText(/rika & ibnu/i)).toBeTruthy();
  });

  it('clamps a very long guest name to two lines', () => {
    const longName = 'Bapak Haji Muhammad Abdurrahman Wahid Kusumawardhana Beserta Keluarga Besar Tercinta';
    render(<CoverGate guestName={longName} onOpen={() => {}} />);
    const el = screen.getByTestId('guest-name');
    expect(el.textContent).toBe(longName);
    expect(el.className).toMatch(/line-clamp-2/);
    expect(el.className).toMatch(/break-words/);
    expect(screen.getByRole('button', { name: /buka undangan/i })).toBeTruthy();
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/CoverGate.test.tsx`
Expected: FAIL (no element with label "monogram r i").

- [ ] **Step 3: Replace `src/components/CoverGate.tsx`**

```tsx
'use client';

import React from 'react';
import { weddingData } from '@/data/wedding-data';
import WatercolorHeader from './ui/WatercolorHeader';
import LeafCorners from './ui/LeafCorners';
import GoldSand from './ui/GoldSand';

interface CoverGateProps {
  guestName?: string;
  onOpen: () => void;
}

export default function CoverGate({ guestName, onOpen }: CoverGateProps) {
  const displayGuestName = guestName && guestName.trim() !== '' ? guestName.trim() : 'Tamu Undangan';
  const [first, second] = weddingData.monogram.split(' ');

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-forest-900">
      <div className="relative flex h-full w-full max-w-[440px] flex-col items-center overflow-hidden bg-cream-50 text-center">
        <WatercolorHeader className="h-[58%]" />

        <div className="relative z-10 mt-[12vh] flex flex-col items-center px-8">
          {/* Capsule photo */}
          <div className="relative h-[300px] w-[210px] overflow-hidden rounded-full border-4 border-cream-50 bg-cream-100 shadow-2xl">
            <img
              src={weddingData.coverPhoto}
              alt={`${weddingData.bride.nickName} & ${weddingData.groom.nickName}`}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-8 flex flex-col items-center text-cream-50">
              <p
                aria-label={`Monogram ${weddingData.monogram}`}
                className="font-display text-5xl leading-none tracking-widest"
              >
                <span>{first}</span>
                <span className="mx-1 font-script text-3xl text-gold-500">&</span>
                <span>{second}</span>
              </p>
              <p className="mt-2 font-serif text-sm italic tracking-wide">
                {weddingData.bride.nickName} &amp; {weddingData.groom.nickName}
              </p>
            </div>
          </div>

          <p className="mt-8 font-sans text-sm text-sage-500">Kepada Bapak/Ibu/Saudara/i</p>
          <h2
            data-testid="guest-name"
            className="mt-2 line-clamp-2 break-words font-serif text-2xl font-semibold leading-snug text-forest-900"
          >
            {displayGuestName}
          </h2>
          <p className="mt-1 text-[10px] italic text-sage-500">Mohon maaf bila ada kesalahan penulisan nama</p>

          <button
            onClick={onOpen}
            aria-label="Buka Undangan"
            className="mt-6 rounded-full bg-forest-900 px-8 py-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-cream-50 shadow-lg shadow-forest-900/30 transition-all hover:bg-forest-700 active:scale-95"
          >
            Buka Undangan
          </button>
        </div>

        <LeafCorners />
        <GoldSand />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests**

Run: `pnpm vitest run tests/CoverGate.test.tsx`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/CoverGate.tsx tests/CoverGate.test.tsx
git commit -m "feat: restyle cover gate with capsule photo and monogram

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Hero, Quote and Countdown

**Files:**
- Create: `src/components/HeroSection.tsx`, `src/components/QuoteSection.tsx`
- Modify: `src/components/CountdownTimer.tsx` (JSX only, lines from `if (timeLeft.isPast)` to end)
- Test: `tests/HeroSection.test.tsx` (new), `tests/CountdownTimer.test.tsx` (unchanged, must still pass)

**Interfaces:**
- Consumes: `WeddingData`, `CountdownTimer`, `SectionTitle`, `WatercolorHeader`, `Sparkles`, `FadeUp`.
- Produces:
  - `HeroSection({ data: WeddingData })`, root `<section id="hero">`, `<h1>` contains bride and groom nicknames.
  - `QuoteSection({ quote: WeddingData['quote'] })`, root `<section id="quote">`.

- [ ] **Step 1: Write the failing test**

Create `tests/HeroSection.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from '../src/components/HeroSection';
import QuoteSection from '../src/components/QuoteSection';
import { weddingData } from '../src/data/wedding-data';

describe('HeroSection', () => {
  it('renders couple names in the h1 and the akad date', () => {
    render(<HeroSection data={weddingData} />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toMatch(/Rika/);
    expect(h1.textContent).toMatch(/Ibnu/);
    expect(h1.textContent!.indexOf('Rika')).toBeLessThan(h1.textContent!.indexOf('Ibnu'));
    expect(screen.getByText(weddingData.events.akad.date)).toBeTruthy();
    expect(screen.getByText(/the wedding of/i)).toBeTruthy();
  });
});

describe('QuoteSection', () => {
  it('renders the verse and its source', () => {
    render(<QuoteSection quote={weddingData.quote} />);
    expect(screen.getByText(new RegExp(weddingData.quote.source.replace('.', '\\.')))).toBeTruthy();
    expect(screen.getByText(/pasangan-pasangan untukmu/)).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/HeroSection.test.tsx`
Expected: FAIL (cannot resolve `HeroSection`).

- [ ] **Step 3: Create `src/components/HeroSection.tsx`**

```tsx
'use client';

import React from 'react';
import { WeddingData } from '@/types/wedding';
import CountdownTimer from './CountdownTimer';
import WatercolorHeader from './ui/WatercolorHeader';
import FadeUp from './FadeUp';

interface HeroSectionProps {
  data: WeddingData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const { bride, groom, events } = data;
  return (
    <section id="hero" className="relative overflow-hidden bg-cream-50 text-center">
      <div className="relative h-[540px] bg-cream-100">
        <img
          src={data.heroPhoto}
          alt={`${bride.nickName} & ${groom.nickName}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/75 via-forest-900/35 to-cream-50" />
        <WatercolorHeader className="opacity-80" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.35em] text-cream-50">
            The Wedding of
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-gold-500 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
            <span className="block">{bride.nickName}</span>
            <span className="block font-script text-4xl normal-case">&amp;</span>
            <span className="block">{groom.nickName}</span>
          </h1>
        </div>
      </div>

      <div className="relative px-6 pb-16 pt-4">
        <FadeUp>
          <p className="mb-6 font-sans text-sm text-ink">Kami berharap Anda menjadi bagian dari hari istimewa kami.</p>
          <CountdownTimer targetDateIso={events.akad.dateIso} />
          <div className="mx-auto my-6 h-px w-40 bg-gold-500/60" />
          <p className="font-display text-base text-forest-900">{events.akad.date}</p>
        </FadeUp>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `src/components/QuoteSection.tsx`**

```tsx
'use client';

import React from 'react';
import { WeddingData } from '@/types/wedding';
import SectionTitle from './ui/SectionTitle';
import Sparkles from './ui/Sparkles';
import FadeUp from './FadeUp';

interface QuoteSectionProps {
  quote: WeddingData['quote'];
}

export default function QuoteSection({ quote }: QuoteSectionProps) {
  return (
    <section id="quote" className="relative overflow-hidden bg-forest-900 px-8 py-16 text-center text-cream-50">
      <Sparkles />
      <FadeUp className="relative z-10">
        <img src="/themes/forest/sprig.webp" alt="" aria-hidden="true" className="mx-auto mb-4 w-12" />
        <SectionTitle title="Our Special Day" tone="light" />
        <p className="mt-6 font-serif text-base italic leading-relaxed text-cream-50/90">
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="mt-4 font-sans text-xs font-semibold tracking-[0.2em] text-gold-500">({quote.source})</p>
      </FadeUp>
    </section>
  );
}
```

- [ ] **Step 5: Restyle `CountdownTimer` JSX**

Replace everything from `if (timeLeft.isPast) {` to the end of the file with:

```tsx
  if (timeLeft.isPast) {
    return (
      <div className="rounded-2xl border border-cream-100 bg-cream-50 px-4 py-5 text-center font-display text-lg text-forest-900">
        Hari Bahagia Telah Tiba
      </div>
    );
  }

  const items = [
    { label: 'Hari', value: mounted ? timeLeft.days : 0 },
    { label: 'Jam', value: mounted ? timeLeft.hours : 0 },
    { label: 'Menit', value: mounted ? timeLeft.minutes : 0 },
    { label: 'Detik', value: mounted ? timeLeft.seconds : 0 },
  ];

  return (
    <div className="mx-auto grid max-w-xs grid-cols-4 gap-3">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <span className="font-display text-3xl text-forest-900">{String(item.value).padStart(2, '0')}</span>
          <span className="mt-1 font-sans text-[11px] text-sage-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 6: Run tests**

Run: `pnpm vitest run tests/HeroSection.test.tsx tests/CountdownTimer.test.tsx`
Expected: PASS (2 + 2 tests).

- [ ] **Step 7: Commit**

```bash
git add src/components/HeroSection.tsx src/components/QuoteSection.tsx src/components/CountdownTimer.tsx tests/HeroSection.test.tsx
git commit -m "feat: add hero and quote sections, restyle countdown

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Couple section

**Files:**
- Modify: `src/components/CoupleSection.tsx` (replace whole file)
- Test: `tests/CoupleSection.test.tsx`

**Interfaces:**
- Consumes: `WeddingData`, `CouplePerson`, `Card`, `SectionTitle`, `FadeUp`.
- Produces: `CoupleSection({ data: WeddingData })`, root `<section id="couple">`. Photo `alt` is `Foto <nickName>`. The verse is no longer rendered here (moved to `QuoteSection`).

- [ ] **Step 1: Add failing tests**

Append inside the `describe` block of `tests/CoupleSection.test.tsx`:

```tsx
  it('renders bride before groom with photos in fixed-ratio placeholder frames', () => {
    render(<CoupleSection data={weddingData} />);
    const bridePhoto = screen.getByAltText(`Foto ${weddingData.bride.nickName}`);
    const groomPhoto = screen.getByAltText(`Foto ${weddingData.groom.nickName}`);
    expect(bridePhoto.compareDocumentPosition(groomPhoto) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    for (const img of [bridePhoto, groomPhoto]) {
      const frame = img.parentElement as HTMLElement;
      expect(frame.className).toMatch(/aspect-\[3\/4\]/);
      expect(frame.className).toMatch(/bg-cream-100/);
    }
  });

  it('renders instagram links for both', () => {
    render(<CoupleSection data={weddingData} />);
    expect(screen.getByRole('link', { name: `@${weddingData.bride.instagram}` }).getAttribute('href'))
      .toBe(`https://instagram.com/${weddingData.bride.instagram}`);
    expect(screen.getByRole('link', { name: `@${weddingData.groom.instagram}` })).toBeTruthy();
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/CoupleSection.test.tsx`
Expected: FAIL (no element with alt "Foto Rika").

- [ ] **Step 3: Replace `src/components/CoupleSection.tsx`**

```tsx
'use client';

import React from 'react';
import { Instagram } from 'lucide-react';
import { CouplePerson, WeddingData } from '@/types/wedding';
import Card from './ui/Card';
import SectionTitle from './ui/SectionTitle';
import FadeUp from './FadeUp';

interface CoupleSectionProps {
  data: WeddingData;
}

function PersonCard({ person, label }: { person: CouplePerson; label: string }) {
  return (
    <Card withLeaves className="px-6 pt-8 text-center">
      <p className="font-display text-lg text-forest-900">{label}</p>
      <div className="relative mx-auto mt-5 aspect-[3/4] w-56 overflow-hidden rounded-[1.5rem] bg-cream-100 shadow-lg">
        <img
          src={person.photo}
          alt={`Foto ${person.nickName}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-900/70 via-transparent to-transparent" />
        <span className="pointer-events-none absolute inset-x-0 bottom-3 font-script text-4xl text-cream-50">
          {person.nickName}
        </span>
      </div>
      <h3 className="mt-6 font-serif text-3xl italic text-forest-900">{person.fullName}</h3>
      <p className="mt-2 font-sans text-sm text-sage-500">{person.orderInFamily}</p>
      <p className="font-sans text-sm text-sage-500">{person.parents}</p>
      {person.instagram && (
        <a
          href={`https://instagram.com/${person.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest-900 px-4 py-2 font-sans text-xs text-cream-50 transition-colors hover:bg-forest-700"
        >
          <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
          <span>@{person.instagram}</span>
        </a>
      )}
    </Card>
  );
}

export default function CoupleSection({ data }: CoupleSectionProps) {
  const { groom, bride } = data;
  return (
    <section id="couple" className="relative bg-cream-50 px-5 py-16">
      <FadeUp>
        <p className="mb-2 text-center font-script text-3xl text-gold-500">Bismillahirrahmanirrahim</p>
        <SectionTitle kicker="Mempelai" title="Calon Pengantin" />
      </FadeUp>
      <div className="mt-10 space-y-6">
        <FadeUp delay="fade-up-delay-1">
          <PersonCard person={bride} label="The Bride" />
        </FadeUp>
        <p aria-hidden="true" className="text-center font-script text-5xl text-gold-500">&amp;</p>
        <FadeUp delay="fade-up-delay-2">
          <PersonCard person={groom} label="The Groom" />
        </FadeUp>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests**

Run: `pnpm vitest run tests/CoupleSection.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/CoupleSection.tsx tests/CoupleSection.test.tsx
git commit -m "feat: restyle couple section with photo cards

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Event section

**Files:**
- Modify: `src/components/EventSection.tsx` (replace whole file)
- Test: `tests/EventSection.test.tsx`

**Interfaces:**
- Consumes: `WeddingEvent` (with `photo`), `Card`, `Sparkles`, `FadeUp`.
- Produces: `EventSection({ events: { akad: WeddingEvent; resepsi: WeddingEvent } })`, root `<section id="event">`. Countdown is no longer rendered here (moved to Hero).

- [ ] **Step 1: Add failing test**

Append inside the `describe` block of `tests/EventSection.test.tsx`:

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/EventSection.test.tsx`
Expected: FAIL (no link named "Lihat Lokasi").

- [ ] **Step 3: Replace `src/components/EventSection.tsx`**

```tsx
'use client';

import React from 'react';
import { MapPin, CalendarPlus } from 'lucide-react';
import { WeddingEvent } from '@/types/wedding';
import Card from './ui/Card';
import Sparkles from './ui/Sparkles';
import FadeUp from './FadeUp';

interface EventSectionProps {
  events: {
    akad: WeddingEvent;
    resepsi: WeddingEvent;
  };
}

function createGoogleCalendarUrl(event: WeddingEvent) {
  // Google Calendar expects UTC in YYYYMMDDTHHMMSSZ format
  const startDate = new Date(event.dateIso);
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);
  const formatGCalTime = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.calendarTitle,
    dates: `${formatGCalTime(startDate)}/${formatGCalTime(endDate)}`,
    details: event.calendarDescription,
    location: `${event.venueName}, ${event.venueAddress}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function EventCard({ event }: { event: WeddingEvent }) {
  return (
    <Card withLeaves withSand className="text-center">
      <div className="aspect-[4/3] w-full overflow-hidden bg-cream-100">
        <img
          src={event.photo}
          alt={`Foto ${event.title}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="px-6 pt-6">
        <h3 className="font-display text-2xl uppercase tracking-wide text-forest-900">{event.title}</h3>
        <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-wider text-ink">{event.date}</p>
        <p className="mt-3 font-sans text-sm text-ink">Pukul : {event.time}</p>
        <p className="mt-3 font-sans text-sm font-semibold text-forest-900">{event.venueName}</p>
        <p className="font-sans text-xs leading-relaxed text-sage-500">{event.venueAddress}</p>
        <div className="mt-5 flex justify-center gap-2">
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-forest-900 px-4 py-2 font-sans text-xs font-semibold text-cream-50 transition-colors hover:bg-forest-700"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Lihat Lokasi
          </a>
          <a
            href={createGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-forest-900 px-4 py-2 font-sans text-xs font-semibold text-forest-900 transition-colors hover:bg-cream-100"
          >
            <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" />
            Kalender
          </a>
        </div>
      </div>
    </Card>
  );
}

export default function EventSection({ events }: EventSectionProps) {
  return (
    <section id="event" className="relative overflow-hidden bg-forest-900 px-5 py-16">
      <Sparkles />
      <FadeUp className="relative z-10 mb-10 px-2">
        <h2 className="font-display text-4xl uppercase leading-none text-cream-50">
          Save
          <span className="ml-2 font-script text-4xl normal-case text-gold-500">The Date</span>
        </h2>
        <div className="mt-3 h-px w-3/4 bg-cream-50/40" />
      </FadeUp>
      <div className="relative z-10 space-y-6">
        <FadeUp delay="fade-up-delay-1">
          <EventCard event={events.akad} />
        </FadeUp>
        <FadeUp delay="fade-up-delay-2">
          <EventCard event={events.resepsi} />
        </FadeUp>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests**

Run: `pnpm vitest run tests/EventSection.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/EventSection.tsx tests/EventSection.test.tsx
git commit -m "feat: restyle event section as save-the-date cards

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Love story section

**Files:**
- Modify: `src/components/LoveStorySection.tsx` (replace whole file)
- Test: `tests/LoveStorySection.test.tsx` (new)

**Interfaces:**
- Consumes: `StoryMilestone[]`, `SectionTitle`, `Sparkles`, `FadeUp`.
- Produces: `LoveStorySection({ data: StoryMilestone[] })`, root `<section id="story">`, returns `null` for empty data.

- [ ] **Step 1: Write the failing test**

Create `tests/LoveStorySection.test.tsx`:

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/LoveStorySection.test.tsx`
Expected: FAIL (no h2 named "Love Story"; current heading is "A Little Story").

- [ ] **Step 3: Replace `src/components/LoveStorySection.tsx`**

```tsx
'use client';

import React from 'react';
import { StoryMilestone } from '@/types/wedding';
import SectionTitle from './ui/SectionTitle';
import Sparkles from './ui/Sparkles';
import FadeUp from './FadeUp';

interface LoveStorySectionProps {
  data: StoryMilestone[];
}

export default function LoveStorySection({ data }: LoveStorySectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="story" className="relative overflow-hidden bg-forest-900 px-8 py-16 text-center text-cream-50">
      <Sparkles />
      <div className="relative z-10">
        <FadeUp>
          <SectionTitle title="Love Story" tone="light" />
        </FadeUp>
        <div className="mt-10 space-y-10">
          {data.map((item, index) => (
            <FadeUp key={item.title} delay={`fade-up-delay-${Math.min(index + 1, 5)}`}>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream-50/60">{item.year}</p>
              <h3 className="mt-1 font-display text-lg uppercase tracking-wider text-gold-500">{item.title}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-cream-50/85">{item.story}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests**

Run: `pnpm vitest run tests/LoveStorySection.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/LoveStorySection.tsx tests/LoveStorySection.test.tsx
git commit -m "feat: restyle love story on forest block

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Gallery with keyboard and swipe lightbox

**Files:**
- Modify: `src/components/GallerySection.tsx` (replace whole file)
- Test: `tests/GallerySection.test.tsx` (replace whole file)

**Interfaces:**
- Consumes: `GalleryPhoto[]`, `SectionTitle`, `FadeUp`.
- Produces: `GallerySection({ images: GalleryPhoto[] })`, root `<section id="gallery">`. Lightbox is `role="dialog"` with `aria-label="Galeri foto"`; buttons labelled `Close Lightbox`, `Previous Image`, `Next Image`.

- [ ] **Step 1: Write the failing tests**

Replace `tests/GallerySection.test.tsx` with:

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/GallerySection.test.tsx`
Expected: FAIL (no dialog role).

- [ ] **Step 3: Replace `src/components/GallerySection.tsx`**

```tsx
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryPhoto } from '@/types/wedding';
import SectionTitle from './ui/SectionTitle';
import FadeUp from './FadeUp';

interface GallerySectionProps {
  images: GalleryPhoto[];
}

const SWIPE_MIN_PX = 50;

export default function GallerySection({ images }: GallerySectionProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const count = images?.length ?? 0;

  const close = useCallback(() => setSelectedIdx(null), []);
  const prev = useCallback(
    () => setSelectedIdx((i) => (i === null ? i : (i - 1 + count) % count)),
    [count]
  );
  const next = useCallback(
    () => setSelectedIdx((i) => (i === null ? i : (i + 1) % count)),
    [count]
  );

  useEffect(() => {
    if (selectedIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIdx, close, prev, next]);

  if (count === 0) return null;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    const end = e.changedTouches?.[0]?.clientX;
    touchStartX.current = null;
    if (start === null || end === undefined) return;
    const dx = end - start;
    if (dx <= -SWIPE_MIN_PX) next();
    else if (dx >= SWIPE_MIN_PX) prev();
  };
  const stop = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    fn();
  };

  return (
    <section id="gallery" className="relative bg-cream-50 px-4 py-16">
      <FadeUp className="mb-8">
        <SectionTitle title="Our" script="Gallery" />
      </FadeUp>

      <div className="grid grid-cols-2 gap-3">
        {images.map((photo, index) => (
          <FadeUp key={photo.id} threshold={0.05} delay={`fade-up-delay-${(index % 2) + 1}`}>
            <button
              type="button"
              onClick={() => setSelectedIdx(index)}
              aria-label={`Buka foto ${photo.alt}`}
              className="block aspect-[3/4] w-full overflow-hidden rounded-2xl bg-cream-100 shadow-md"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </button>
          </FadeUp>
        ))}
      </div>

      {selectedIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galeri foto"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
        >
          <button
            onClick={stop(close)}
            aria-label="Close Lightbox"
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2.5 text-white hover:bg-white/30"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={stop(prev)}
            aria-label="Previous Image"
            className="absolute left-3 rounded-full bg-white/20 p-3 text-white hover:bg-white/30"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            src={images[selectedIdx].src}
            alt={images[selectedIdx].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[82vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />
          <button
            onClick={stop(next)}
            aria-label="Next Image"
            className="absolute right-3 rounded-full bg-white/20 p-3 text-white hover:bg-white/30"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 4: Run tests**

Run: `pnpm vitest run tests/GallerySection.test.tsx`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/GallerySection.tsx tests/GallerySection.test.tsx
git commit -m "feat: restyle gallery grid, add keyboard and swipe lightbox

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Digital envelope accordion

**Files:**
- Modify: `src/components/GiftSection.tsx` (replace whole file)
- Test: `tests/GiftSection.test.tsx` (replace whole file)

**Interfaces:**
- Consumes: `BankAccount[]`, `GiftAddress`, `useCopyToClipboard`, `Card`, `Sparkles`, `FadeUp`.
- Produces: `GiftSection({ bankAccounts: BankAccount[]; giftAddress: GiftAddress })`, root `<section id="gift">`. Toggle button text "Klik Disini" with `aria-expanded`; details container `id="gift-details"`.

- [ ] **Step 1: Write the failing tests**

Replace `tests/GiftSection.test.tsx` with:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GiftSection from '../src/components/GiftSection';
import { weddingData } from '../src/data/wedding-data';

function renderGift() {
  render(<GiftSection bankAccounts={weddingData.bankAccounts} giftAddress={weddingData.giftAddress} />);
}

describe('GiftSection Component', () => {
  it('hides bank details until "Klik Disini" is pressed', () => {
    renderGift();
    const toggle = screen.getByRole('button', { name: /klik disini/i });
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByText(weddingData.bankAccounts[0].accountNumber)).toBeNull();
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText(weddingData.bankAccounts[0].accountNumber)).toBeTruthy();
    expect(screen.getByText(weddingData.giftAddress.fullAddress)).toBeTruthy();
  });

  it('copies an account number and shows toast feedback', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    renderGift();
    fireEvent.click(screen.getByRole('button', { name: /klik disini/i }));
    fireEvent.click(screen.getAllByRole('button', { name: /salin nomor rekening/i })[0]);
    const matches = await screen.findAllByText(/berhasil disalin/i);
    expect(matches.length).toBeGreaterThan(0);
    expect(writeText).toHaveBeenCalledWith(weddingData.bankAccounts[0].accountNumber);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/GiftSection.test.tsx`
Expected: FAIL (no button "Klik Disini").

- [ ] **Step 3: Replace `src/components/GiftSection.tsx`**

```tsx
'use client';

import React, { useState } from 'react';
import { Copy, Check, Gift } from 'lucide-react';
import { BankAccount, GiftAddress } from '@/types/wedding';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import Card from './ui/Card';
import Sparkles from './ui/Sparkles';
import FadeUp from './FadeUp';

interface GiftSectionProps {
  bankAccounts: BankAccount[];
  giftAddress: GiftAddress;
}

function CopyButton({ copied, onClick, label }: { copied: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-forest-900 px-4 py-2 font-sans text-xs font-semibold text-cream-50 transition-all hover:bg-forest-700 active:scale-95"
    >
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
      {copied ? 'Tersalin' : 'Copy'}
    </button>
  );
}

export default function GiftSection({ bankAccounts, giftAddress }: GiftSectionProps) {
  const [open, setOpen] = useState(false);
  const { copiedText, copy } = useCopyToClipboard();
  const addressText = `${giftAddress.recipientName} (${giftAddress.phoneNumber})\n${giftAddress.fullAddress}`;

  return (
    <section id="gift" className="relative overflow-hidden bg-forest-900 px-5 py-16">
      <Sparkles />
      <FadeUp className="relative z-10">
        <Card className="px-6 py-10 text-center">
          <img src="/themes/forest/sprig.webp" alt="" aria-hidden="true" className="mx-auto mb-3 w-10" />
          <h2 className="font-script text-4xl text-forest-900">Amplop Digital</h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-sage-500">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda
            kasih, Anda dapat memberi kado secara cashless.
          </p>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="gift-details"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-900 px-6 py-2.5 font-sans text-xs font-semibold text-cream-50 shadow-md transition-all hover:bg-forest-700 active:scale-95"
          >
            <Gift className="h-4 w-4" aria-hidden="true" />
            Klik Disini
          </button>

          {open && (
            <div id="gift-details" className="mt-8 space-y-4 text-left animate-fade-in">
              {bankAccounts.map((account) => (
                <div key={account.accountNumber} className="rounded-2xl border border-cream-100 bg-white/60 p-5">
                  <p className="font-display text-lg text-forest-900">{account.bankName}</p>
                  <p className="mt-2 font-mono text-xl tracking-wider text-ink">{account.accountNumber}</p>
                  <p className="font-sans text-sm text-sage-500">a.n {account.accountHolder}</p>
                  <CopyButton
                    copied={copiedText === account.accountNumber}
                    onClick={() => copy(account.accountNumber)}
                    label="Salin Nomor Rekening"
                  />
                </div>
              ))}

              <div className="rounded-2xl border border-cream-100 bg-white/60 p-5 font-sans text-sm">
                <p className="font-display text-lg text-forest-900">Kirim Kado</p>
                <p className="mt-2 text-xs text-sage-500">Nama Penerima</p>
                <p className="text-ink">{giftAddress.recipientName}</p>
                <p className="mt-2 text-xs text-sage-500">No. HP</p>
                <p className="text-ink">{giftAddress.phoneNumber}</p>
                <p className="mt-2 text-xs text-sage-500">Alamat</p>
                <p className="leading-relaxed text-ink">{giftAddress.fullAddress}</p>
                {giftAddress.notes && <p className="mt-2 text-xs italic text-sage-500">{giftAddress.notes}</p>}
                <CopyButton copied={copiedText === addressText} onClick={() => copy(addressText)} label="Salin Alamat Kado" />
              </div>
            </div>
          )}
        </Card>
      </FadeUp>

      {copiedText && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-forest-900 px-6 py-3 font-sans text-xs text-cream-50 shadow-2xl animate-slide-up"
        >
          <Check className="h-4 w-4 text-gold-500" aria-hidden="true" />
          Berhasil disalin!
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 4: Run tests**

Run: `pnpm vitest run tests/GiftSection.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/GiftSection.tsx tests/GiftSection.test.tsx
git commit -m "feat: restyle gift section as digital envelope accordion

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 13: RSVP restyle and pagination

**Files:**
- Modify: `src/components/RsvpWishesSection.tsx`
- Test: `tests/RsvpWishesSection.test.tsx`

**Interfaces:**
- Consumes: everything already imported from `@/lib/supabase` (unchanged), `Card`, `Sparkles`.
- Produces: `RsvpWishesSection({ guestName?: string })`, root `<section id="rsvp">`. Exported constant `WISHES_PAGE_SIZE = 5`. Pager buttons labelled `Halaman sebelumnya` / `Halaman berikutnya`, indicator text `<current> / <total>`.

The Supabase effect, `handleSubmit` insert call and error handling stay exactly as they are. Only these change: page state, list rendering, and class names.

- [ ] **Step 1: Make the mock list configurable and add failing tests**

In `tests/RsvpWishesSection.test.tsx`:

1. Below `const insertSpy = vi.fn();` add:

```tsx
const listResult = { data: [] as unknown[], error: null as unknown };
```

2. In the mock, replace
`order: () => ({ limit: () => Promise.resolve({ data: [], error: null }) }),`
with
`order: () => ({ limit: () => Promise.resolve(listResult) }),`

3. In `beforeEach`, add `listResult.data = [];`

4. Add a helper below the imports:

```tsx
function makeWishes(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: `w${i + 1}`,
    name: `Tamu ${i + 1}`,
    message: `Pesan ${i + 1}`,
    status: 'hadir',
    pax: 1,
    created_at: new Date(Date.now() - i * 60_000).toISOString(),
  }));
}
```

5. Append inside the `describe` block:

```tsx
  it('paginates wishes 5 per page', async () => {
    listResult.data = makeWishes(12);
    render(<RsvpWishesSection />);
    await screen.findByText('Pesan 1');
    expect(screen.getByText('1 / 3')).toBeTruthy();
    expect(screen.queryByText('Pesan 6')).toBeNull();
    const prev = screen.getByRole('button', { name: /halaman sebelumnya/i }) as HTMLButtonElement;
    const next = screen.getByRole('button', { name: /halaman berikutnya/i }) as HTMLButtonElement;
    expect(prev.disabled).toBe(true);
    fireEvent.click(next);
    expect(screen.getByText('Pesan 6')).toBeTruthy();
    expect(screen.queryByText('Pesan 1')).toBeNull();
    expect(screen.getByText('2 / 3')).toBeTruthy();
    fireEvent.click(next);
    expect(screen.getByText('Pesan 11')).toBeTruthy();
    expect(next.disabled).toBe(true);
    fireEvent.click(prev);
    expect(screen.getByText('2 / 3')).toBeTruthy();
  });

  it('hides the pager when there is only one page', async () => {
    listResult.data = makeWishes(3);
    render(<RsvpWishesSection />);
    await screen.findByText('Pesan 1');
    expect(screen.queryByRole('button', { name: /halaman berikutnya/i })).toBeNull();
  });

  it('returns to page 1 after submitting from a later page', async () => {
    listResult.data = makeWishes(12);
    insertResult.data = {
      id: 'new', name: 'Budi', message: 'Ucapan baru', status: 'hadir', pax: 1,
      created_at: new Date().toISOString(),
    };
    render(<RsvpWishesSection guestName="Budi" />);
    await screen.findByText('Pesan 1');
    fireEvent.click(screen.getByRole('button', { name: /halaman berikutnya/i }));
    fireEvent.click(screen.getByRole('button', { name: /halaman berikutnya/i }));
    expect(screen.getByText('3 / 3')).toBeTruthy();
    fireEvent.change(screen.getByLabelText(/doa/i), { target: { value: 'Ucapan baru' } });
    fireEvent.click(screen.getByRole('button', { name: /kirim/i }));
    await screen.findByText('Ucapan baru', { selector: 'p' });
    expect(screen.getByText('1 / 3')).toBeTruthy();
  });
```

The last test's submit button name: the button label stays `Kirim Ucapan & Konfirmasi` (matches `/kirim/i`).

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run tests/RsvpWishesSection.test.tsx`
Expected: the 3 old tests PASS, the 3 new tests FAIL (no "1 / 3").

- [ ] **Step 3: Add pagination state and logic**

In `src/components/RsvpWishesSection.tsx`:

1. Change `import { Send, CheckCircle2, MessageSquare, Users, AlertCircle } from 'lucide-react';` to:

```tsx
import { Send, CheckCircle2, Users, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from './ui/Card';
import Sparkles from './ui/Sparkles';
```

2. Below `const SUBMIT_COOLDOWN_MS = 30_000;` add:

```tsx
export const WISHES_PAGE_SIZE = 5;
```

3. Below `const [loading, setLoading] = useState(isSupabaseConfigured);` add:

```tsx
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(wishes.length / WISHES_PAGE_SIZE));
  // Clamp so a shrinking list never leaves us past the last page
  const currentPage = Math.min(page, totalPages - 1);
  const visibleWishes = wishes.slice(currentPage * WISHES_PAGE_SIZE, (currentPage + 1) * WISHES_PAGE_SIZE);
```

4. In `handleSubmit`, directly after `setWishes((prev) => prependUnique(prev, data as WishRecord));` add:

```tsx
    setPage(0);
```

- [ ] **Step 4: Replace the returned JSX**

Replace everything from `  return (` (the component's return) to the end of the file with:

```tsx
  const label = 'mb-2 block font-sans text-xs font-semibold text-ink';
  const field =
    'w-full rounded-xl border border-cream-100 bg-white px-4 py-3 font-sans text-sm text-ink focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-700/20';

  return (
    <section id="rsvp" className="relative overflow-hidden bg-forest-900 px-5 py-16">
      <Sparkles />
      <div className="relative z-10">
        <Card className="px-6 py-10">
          <img src="/themes/forest/sprig.webp" alt="" aria-hidden="true" className="mx-auto mb-3 w-10" />
          <h2 className="text-center font-script text-4xl text-forest-900">Ucapkan Sesuatu</h2>
          <p className="mt-2 text-center font-sans text-xs text-sage-500">
            Konfirmasi kehadiran dan kirimkan doa terbaik untuk kedua mempelai.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className={label}>Nama Lengkap</label>
              <input
                id="name"
                type="text"
                required
                maxLength={WISH_NAME_MAX}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className={field}
              />
            </div>

            <div>
              <label htmlFor="message" className={label}>Doa &amp; Ucapan</label>
              <textarea
                id="message"
                required
                rows={4}
                maxLength={WISH_MESSAGE_MAX}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Berikan ucapan & doa untuk Rika & Ibnu"
                className={`${field} resize-none`}
              />
              <p className="mt-1 text-right font-sans text-[10px] text-sage-500">
                {message.length}/{WISH_MESSAGE_MAX}
              </p>
            </div>

            <div>
              <span className={label}>Konfirmasi Kehadiran</span>
              <div className="grid grid-cols-2 gap-2">
                {(['hadir', 'tidak_hadir'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    aria-pressed={status === s}
                    className={`rounded-xl border py-2.5 font-sans text-xs font-semibold transition-all ${
                      status === s
                        ? 'border-forest-900 bg-forest-900 text-cream-50'
                        : 'border-cream-100 bg-white text-sage-500 hover:border-forest-700'
                    }`}
                  >
                    {s === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                  </button>
                ))}
              </div>
            </div>

            {status === 'hadir' && (
              <div>
                <label htmlFor="pax" className={label}>Jumlah Tamu</label>
                <div className="relative">
                  <select
                    id="pax"
                    value={pax}
                    onChange={(e) => setPax(Number(e.target.value))}
                    className={`${field} appearance-none`}
                  >
                    {Array.from({ length: WISH_PAX_MAX }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} Orang</option>
                    ))}
                  </select>
                  <Users className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sage-500" aria-hidden="true" />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || cooldown}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest-900 py-3 font-sans text-sm font-semibold text-cream-50 shadow-md transition-all hover:bg-forest-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {buttonLabel}
            </button>
          </form>

          {submitted && (
            <div role="status" className="mt-5 flex items-center gap-3 rounded-xl border border-forest-700/30 bg-forest-900/5 p-4 font-sans text-xs text-forest-900 animate-fade-in">
              <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Terima kasih! Ucapan dan konfirmasi kehadiran Anda telah berhasil tersimpan.</span>
            </div>
          )}

          {error && (
            <div role="alert" className="mt-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 font-sans text-xs text-red-800 animate-fade-in">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-10 border-t border-cream-100 pt-6">
            <h3 className="font-display text-sm uppercase tracking-wider text-forest-900">
              Doa &amp; Ucapan ({wishes.length})
            </h3>

            <div className="mt-4 space-y-5">
              {loading ? (
                <p className="py-6 text-center font-sans text-sm text-sage-500">Memuat doa &amp; ucapan...</p>
              ) : wishes.length === 0 ? (
                <p className="py-6 text-center font-sans text-sm text-sage-500">
                  Belum ada doa &amp; ucapan. Jadilah yang pertama memberikan doa restu untuk kedua mempelai!
                </p>
              ) : (
                visibleWishes.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-900 font-display text-sm text-cream-50">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="truncate font-sans text-sm font-semibold text-ink">{item.name}</h4>
                        <span className="font-sans text-[10px] text-gold-500">
                          • {item.status === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                        </span>
                      </div>
                      <span className="font-sans text-[10px] text-sage-500">{formatRelativeTime(item.created_at)}</span>
                      <p className="mt-1 whitespace-pre-line break-words font-sans text-sm leading-relaxed text-ink">
                        {item.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {!loading && totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4 font-sans text-sm text-ink">
                <button
                  type="button"
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  aria-label="Halaman sebelumnya"
                  className="rounded-full p-1.5 hover:bg-cream-100 disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <span>{currentPage + 1} / {totalPages}</span>
                <button
                  type="button"
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
                  aria-label="Halaman berikutnya"
                  className="rounded-full p-1.5 hover:bg-cream-100 disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run tests**

Run: `pnpm vitest run tests/RsvpWishesSection.test.tsx && npx tsc --noEmit`
Expected: PASS (6 tests), no tsc output.

- [ ] **Step 6: Commit**

```bash
git add src/components/RsvpWishesSection.tsx tests/RsvpWishesSection.test.tsx
git commit -m "feat: restyle RSVP form and paginate wishes 5 per page

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 14: Closing section, page assembly, cleanup, OG image

**Files:**
- Create: `src/components/ClosingSection.tsx`
- Modify: `src/app/page.tsx` (replace whole file), `src/components/AudioPlayer.tsx` (button className/style)
- Delete: `src/components/FloatingNavbar.tsx`, `public/lottie/birds.json`, `public/themes/dreamy/main-bg.webp`, `public/themes/dreamy/gift-bg.webp`, `public/images/cover-photo.jpeg`, `public/images/photo-1.jpg`, `photo-3.jpg`, `photo-4.jpg`, `photo-5.jpg`, `photo-6.jpg`, `photo-8.jpg`
- Modify: `package.json`, `pnpm-lock.yaml` (remove `lottie-react`)
- Regenerate: `public/og-image.jpg`
- Test: `tests/PageIntegration.test.tsx` (replace whole file)

**Interfaces:**
- Consumes: every section from Tasks 6–13, `weddingData`.
- Produces: `ClosingSection({ data: WeddingData })`, root `<section id="closing">`.

- [ ] **Step 1: Write the failing integration test**

Replace `tests/PageIntegration.test.tsx` with:

```tsx
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
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/PageIntegration.test.tsx`
Expected: FAIL (section ids differ; `navigation` still present).

- [ ] **Step 3: Create `src/components/ClosingSection.tsx`**

```tsx
'use client';

import React from 'react';
import { WeddingData } from '@/types/wedding';
import LeafCorners from './ui/LeafCorners';
import GoldSand from './ui/GoldSand';
import FadeUp from './FadeUp';

interface ClosingSectionProps {
  data: WeddingData;
}

export default function ClosingSection({ data }: ClosingSectionProps) {
  return (
    <section id="closing" className="relative overflow-hidden bg-cream-50 pb-40 text-center">
      <div className="relative h-[420px] bg-cream-100">
        <img
          src={data.closingPhoto}
          alt={`${data.bride.nickName} & ${data.groom.nickName}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream-50" />
      </div>
      <FadeUp className="relative z-10 -mt-10 px-8">
        <h2 className="font-display text-xl uppercase tracking-widest text-forest-900">Terima Kasih</h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-sage-500">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan
          memberikan doa restu. Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.
        </p>
        <p className="mt-6 font-script text-5xl text-gold-500">
          {data.bride.nickName} &amp; {data.groom.nickName}
        </p>
        {data.hashtag && (
          <p className="mt-4 font-sans text-xs font-semibold tracking-[0.3em] text-forest-900">{data.hashtag}</p>
        )}
      </FadeUp>
      <LeafCorners />
      <GoldSand />
    </section>
  );
}
```

- [ ] **Step 4: Replace `src/app/page.tsx`**

```tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { weddingData } from '@/data/wedding-data';
import CoverGate from '@/components/CoverGate';
import AudioPlayer from '@/components/AudioPlayer';
import HeroSection from '@/components/HeroSection';
import QuoteSection from '@/components/QuoteSection';
import CoupleSection from '@/components/CoupleSection';
import EventSection from '@/components/EventSection';
import LoveStorySection from '@/components/LoveStorySection';
import GallerySection from '@/components/GallerySection';
import GiftSection from '@/components/GiftSection';
import RsvpWishesSection from '@/components/RsvpWishesSection';
import ClosingSection from '@/components/ClosingSection';

function WeddingContent() {
  const searchParams = useSearchParams();
  const [guestName, setGuestName] = useState<string>('Tamu Undangan');
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!searchParams) return;
    const to = searchParams.get('to');
    if (to && to.trim() !== '') setGuestName(to.trim());
  }, [searchParams]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Desktop backdrop outside the phone-width column */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-forest-900 bg-cover bg-center"
        style={{ backgroundImage: "url('/themes/forest/outer-bg.webp')" }}
      />

      {!isOpen && <CoverGate guestName={guestName} onOpen={handleOpen} />}

      <div className="relative mx-auto min-h-screen w-full max-w-[440px] bg-cream-50 shadow-2xl">
        <AudioPlayer
          isPlaying={isPlaying}
          onToggle={() => setIsPlaying((prev) => !prev)}
          audioSrc={weddingData.audioSrc}
        />
        <main className={isOpen ? 'animate-fade-in' : 'h-0 overflow-hidden opacity-0'}>
          <HeroSection data={weddingData} />
          <QuoteSection quote={weddingData.quote} />
          <CoupleSection data={weddingData} />
          <EventSection events={weddingData.events} />
          <LoveStorySection data={weddingData.loveStory} />
          <GallerySection images={weddingData.gallery} />
          <GiftSection bankAccounts={weddingData.bankAccounts} giftAddress={weddingData.giftAddress} />
          <RsvpWishesSection guestName={guestName} />
          <ClosingSection data={weddingData} />
        </main>
      </div>
    </div>
  );
}

export default function WeddingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-forest-900 font-display text-lg text-cream-50">
          Memuat Undangan...
        </div>
      }
    >
      <WeddingContent />
    </Suspense>
  );
}
```

- [ ] **Step 5: Restyle `AudioPlayer` button**

In `src/components/AudioPlayer.tsx`, replace the `<button ...>` opening tag's `className` with the following and add the `style` prop so the button sits inside the column's right edge on desktop:

```tsx
        className="fixed bottom-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-forest-900/90 text-cream-50 shadow-lg backdrop-blur transition-transform hover:scale-105 active:scale-95"
        style={{ right: 'max(1.25rem, calc((100vw - 440px) / 2 + 1.25rem))' }}
```

Inside the button, replace the two icon class strings:
- `"w-6 h-6 animate-spin-slow text-[#2d4234]"` → `"h-5 w-5 animate-spin-slow"`
- `"absolute w-2 h-2 rounded-full bg-emerald-500"` → `"absolute h-1.5 w-1.5 rounded-full bg-gold-500"`
- `"w-5 h-5 text-stone-500"` → `"h-5 w-5"`

- [ ] **Step 6: Delete old files and the Lottie dependency**

```bash
git rm -q src/components/FloatingNavbar.tsx public/lottie/birds.json \
  public/themes/dreamy/main-bg.webp public/themes/dreamy/gift-bg.webp \
  public/images/cover-photo.jpeg public/images/photo-1.jpg public/images/photo-3.jpg \
  public/images/photo-4.jpg public/images/photo-5.jpg public/images/photo-6.jpg public/images/photo-8.jpg
pnpm remove lottie-react
```

Then confirm nothing still references them:

Run: `git grep -nE "FloatingNavbar|lottie|themes/dreamy|photo-[0-9]|cover-photo" -- src; git grep -nE "#[0-9a-fA-F]{6}" -- src/components`
Expected: no output. (A raw hex match means a component still has an un-tokenized color; replace it with the matching token from Global Constraints.)

- [ ] **Step 7: Regenerate `public/og-image.jpg`**

Create `<scratchpad>/og.cjs`:

```js
const path = require('path');
const fs = require('fs');
const REPO = process.argv[2];
const sharp = require(path.join(REPO, 'node_modules/.pnpm/node_modules/sharp'));
sharp.cache(false);
const p = (rel) => path.join(REPO, rel);

(async () => {
  const bg = await sharp(fs.readFileSync(p('public/themes/forest/outer-bg.webp'))).resize(1200, 630, { fit: 'cover' }).toBuffer();
  const W = 400, H = 570, R = W / 2;
  const photo = await sharp(fs.readFileSync(p('public/images/gallery/01.jpg')))
    .resize({ width: W, height: H, fit: 'cover', position: 'top' }).toBuffer();
  const mask = Buffer.from(`<svg width="${W}" height="${H}"><rect width="${W}" height="${H}" rx="${R}" ry="${R}" fill="#fff"/></svg>`);
  const capsule = await sharp(photo).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  const border = Buffer.from(`<svg width="${W + 12}" height="${H + 12}"><rect width="${W + 12}" height="${H + 12}" rx="${R + 6}" ry="${R + 6}" fill="#F5EFE4"/></svg>`);
  const left = Math.round((1200 - W) / 2);
  await sharp(bg)
    .composite([
      { input: border, left: left - 6, top: 24 },
      { input: capsule, left, top: 30 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(p('public/og-image.jpg'));
  console.log(fs.statSync(p('public/og-image.jpg')).size);
})();
```

Run: `node "<scratchpad>/og.cjs" "C:/Users/DEV/Documents/Self project/Undangan nikahan"`
Expected: a size under 150000 printed. View `public/og-image.jpg` with Read: capsule photo centered on dark green, cream border.

- [ ] **Step 8: Run the full suite, typecheck and build**

Run: `pnpm test`
Expected: all test files PASS.

Run: `npx tsc --noEmit`
Expected: no output. If `.next/types` errors mention deleted routes, run `rm -rf .next` and rerun.

Run: `rm -rf .next && npx next build`
Expected: `✓ Compiled successfully`, route `/` static.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: assemble forest theme page, add closing section, drop navbar and lottie

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 15: Visual verification and release (USER CHECKPOINT)

**Files:**
- Scratch only: `<scratchpad>/shots/shot.cjs`, `<scratchpad>/shots/*.png`

- [ ] **Step 1: Start the production server**

Run (background): `npx next start -p 3100`
Expected: `Ready` line with port 3100.

- [ ] **Step 2: Capture screenshots**

Create `<scratchpad>/shots/shot.cjs` (puppeteer-core is installed in `/tmp/ff`; reinstall with `npm i puppeteer-core@23.11.1` there if missing, and run the script from that directory so it resolves):

```js
const puppeteer = require('puppeteer-core');
const OUT = process.argv[2];
const URL = 'http://localhost:3100/?to=Bapak%20Anggi%20Permana%20%26%20Keluarga';
(async () => {
  const b = await puppeteer.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: 'new',
  });
  for (const [w, h] of [[375, 667], [412, 915], [1280, 800]]) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: h, isMobile: w < 800, hasTouch: w < 800 });
    await p.goto(URL, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1500));
    await p.screenshot({ path: `${OUT}/${w}-00-cover.png` });
    await p.click('button[aria-label="Buka Undangan"]');
    await new Promise((r) => setTimeout(r, 1500));
    await p.evaluate(() => document.querySelectorAll('audio').forEach((a) => a.pause()));
    const ids = ['hero', 'quote', 'couple', 'event', 'story', 'gallery', 'gift', 'rsvp', 'closing'];
    for (const [i, id] of ids.entries()) {
      await p.evaluate((id) => document.getElementById(id).scrollIntoView(), id);
      await p.evaluate(() => document.querySelectorAll('.fade-up').forEach((e) => e.classList.add('visible')));
      await new Promise((r) => setTimeout(r, 900));
      await p.screenshot({ path: `${OUT}/${w}-${String(i + 1).padStart(2, '0')}-${id}.png` });
    }
    await p.close();
  }
  await b.close();
})();
```

Run: `cd /tmp/ff && node "<scratchpad>/shots/shot.cjs" "<scratchpad>/shots"`
Expected: 30 PNG files.

- [ ] **Step 3: Build contact sheets and self-check**

Combine the 412-wide shots into sheets of 5 (same method used for the reference). View every sheet and the 375 cover with Read. Check:
- 375 cover: full guest name clamps to 2 lines, "Buka Undangan" button fully visible without scrolling.
- No horizontal scroll, no text over busy photo areas without contrast.
- Leaves and sand sit at card bottoms and do not cover text or buttons.
- 1280: column centered, outer background visible, music button inside the column edge.
- Overall impression matches the reference sheets (`/tmp/ref/sheet0.png`, `sheet1.png`).

Fix any issue in the owning component, rerun Task 14 Step 8, recapture.

- [ ] **Step 4: Show the user and wait for approval**

Show the contact sheets to the user. Wait for explicit approval before pushing. Apply requested changes, rerun tests/build, recapture, show again.

- [ ] **Step 5: Stop the server and push**

Stop the `next start` background process. Then:

```bash
git push origin main
```

Expected: push succeeds; Vercel deploys. Verify live: `curl -s -o /dev/null -w "%{http_code}" https://undangan-nikahan-rika-ibnu.vercel.app/themes/forest/watercolor-top.webp` returns `200`.

- [ ] **Step 6: Hand off live RSVP test to the user**

Ask the user to: send one wish from a phone, confirm it appears on another device, confirm the row in Supabase Table Editor, and check the WhatsApp preview using `?v=3`.
