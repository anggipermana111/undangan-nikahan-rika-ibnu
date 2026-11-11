# Wedding Invitation Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-performance, mobile-first, and elegant wedding invitation website with dynamic personalized greeting (`?to=...`), ceremonial cover gate with sound trigger, countdown timer, event logistics (Google Maps & Calendar), photo gallery with lightbox, digital envelope with 1-click copy, and real-time RSVP & wishes feed.

**Architecture:** Next.js (App Router) + Tailwind CSS single-page layout. State management handles cover overlay dismissal and audio playback. Data configuration is centralized in `src/data/wedding-data.ts`. RSVP and wishes use Supabase with real-time subscriptions and an automatic mock fallback when environment variables are not supplied.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Lucide React, Supabase JS, Vitest / React Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-11-wedding-invitation-design.md`

## Global Constraints

- Mobile-first responsive layout (optimized for smartphone viewports 360px - 430px wide while maintaining desktop elegance).
- Autoplay compliance: Audio must ONLY play after user interaction (tapping "Buka Undangan").
- Zero hardcoded couple content in UI components; all content must strictly source from `src/data/wedding-data.ts`.
- Supabase integration must not crash if `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` are unset; must seamlessly fall back to local mock state.
- Copy-to-clipboard functionality must provide visual feedback (toast notification).

## Review Focus

1. **Guest name missing or empty in query string (`?to=` or missing)**: Cover gate should fall back gracefully to `"Tamu Undangan"` without errors or blank text.
2. **Audio playback blocked or failed by browser**: Must catch promise rejection gracefully without throwing unhandled exceptions or breaking the UI flow.
3. **Invalid or past dates in countdown timer**: Countdown must display zeros or "Hari Bahagia Telah Tiba!" instead of negative numbers.
4. **Copy-to-clipboard failure in insecure origins (HTTP or unsupported iframe)**: Must have fallback `document.execCommand('copy')` if `navigator.clipboard` is unavailable.
5. **Network failure on RSVP submission**: Show clear error message or local optimistic feedback so user experience is not disrupted.

---

### Task 1: Next.js + Tailwind CSS Scaffolding & Test Setup

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js` or `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, `vitest.config.ts`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`
- Test: `tests/smoke.test.ts`

**Interfaces:**
- Produces: Base running Next.js application with Tailwind CSS and Vitest runner configured.

- [ ] **Step 1: Write smoke test for test runner**
```typescript
// tests/smoke.test.ts
import { describe, it, expect } from 'vitest';

describe('Environment Smoke Test', () => {
  it('should run tests successfully', () => {
    expect(true).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails (missing vitest/dependencies)**
Run: `npx vitest run tests/smoke.test.ts`
Expected: FAIL (command not found or missing module)

- [ ] **Step 3: Scaffold Next.js project with Tailwind CSS, Lucide React, and Vitest**
Initialize project files, install dependencies (`next`, `react`, `react-dom`, `lucide-react`, `tailwindcss`, `@supabase/supabase-js`, `vitest`, `@testing-library/react`, `jsdom`). Configure `globals.css` with Google Fonts (Cinzel / Playfair Display / Plus Jakarta Sans) and base theme colors.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/smoke.test.ts`
Expected: PASS

- [ ] **Step 5: Verify build**
Run: `npm run build`
Expected: PASS with compiled `.next` output.

- [ ] **Step 6: Commit**
```bash
git add .
git commit -m "chore: scaffold Next.js project with Tailwind CSS and Vitest"
```

---

### Task 2: Centralized Wedding Data Schema & Content Config

**Files:**
- Create: `src/types/wedding.ts`
- Create: `src/data/wedding-data.ts`
- Test: `tests/data.test.ts`

**Interfaces:**
- Produces: Type definition `WeddingData` and default configuration constant `weddingData` used by all subsequent UI components.

- [ ] **Step 1: Write test verifying schema and data structure**
```typescript
// tests/data.test.ts
import { describe, it, expect } from 'vitest';
import { weddingData } from '../src/data/wedding-data';

describe('Wedding Data Structure', () => {
  it('should contain complete bride and groom info', () => {
    expect(weddingData.groom.fullName).toBeDefined();
    expect(weddingData.groom.parents).toBeDefined();
    expect(weddingData.bride.fullName).toBeDefined();
    expect(weddingData.bride.parents).toBeDefined();
  });

  it('should have akad and resepsi event details with valid date strings', () => {
    expect(weddingData.events.akad.date).toBeDefined();
    expect(weddingData.events.resepsi.date).toBeDefined();
    expect(new Date(weddingData.events.akad.dateIso).getTime()).not.toBeNaN();
  });

  it('should have bank accounts and gift recipient address', () => {
    expect(weddingData.bankAccounts.length).toBeGreaterThan(0);
    expect(weddingData.bankAccounts[0].accountNumber).toBeDefined();
    expect(weddingData.giftAddress.fullAddress).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/data.test.ts`
Expected: FAIL (module not found)

- [ ] **Step 3: Implement `src/types/wedding.ts` and `src/data/wedding-data.ts`**
Define interfaces for `CouplePerson`, `WeddingEvent`, `StoryMilestone`, `BankAccount`, `GiftAddress`, `WeddingData`. Populate `src/data/wedding-data.ts` with aesthetic Indonesian wedding placeholders (Dedy & Tiara / Shandy & Dina aesthetic) so the UI looks complete immediately.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/data.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/types/wedding.ts src/data/wedding-data.ts tests/data.test.ts
git commit -m "feat: add wedding data types and centralized content configuration"
```

---

### Task 3: Cover Gate Component & Recipient Parameter Parsing

**Files:**
- Create: `src/components/CoverGate.tsx`
- Test: `tests/CoverGate.test.tsx`

**Interfaces:**
- Consumes: `weddingData` from `src/data/wedding-data.ts`
- Produces: `<CoverGate onOpen={handleOpen} guestName={guestName} />`

- [ ] **Step 1: Write test for CoverGate component**
```typescript
// tests/CoverGate.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CoverGate from '../src/components/CoverGate';

describe('CoverGate Component', () => {
  it('renders recipient name when provided', () => {
    render(<CoverGate guestName="Bapak Budi & Keluarga" onOpen={() => {}} />);
    expect(screen.getByText('Bapak Budi & Keluarga')).toBeInTheDocument();
  });

  it('falls back to default guest name when empty or undefined', () => {
    render(<CoverGate guestName="" onOpen={() => {}} />);
    expect(screen.getByText('Tamu Undangan')).toBeInTheDocument();
  });

  it('triggers onOpen callback when Buka Undangan button is clicked', () => {
    const handleOpen = vi.fn();
    render(<CoverGate guestName="Anggi Permana" onOpen={handleOpen} />);
    const button = screen.getByRole('button', { name: /buka undangan/i });
    fireEvent.click(button);
    expect(handleOpen).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/CoverGate.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `src/components/CoverGate.tsx`**
Build full-screen overlay component with wedding couple title, elegant floral/ornamental framing, guest recipient card ("Kepada Yth. Bapak/Ibu/Saudara/i: [guestName]"), and "Buka Undangan" button with mail/envelope icon.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/CoverGate.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/CoverGate.tsx tests/CoverGate.test.tsx
git commit -m "feat: implement CoverGate component with dynamic guest recipient"
```

---

### Task 4: Background Audio Player with Floating Toggle

**Files:**
- Create: `src/components/AudioPlayer.tsx`
- Test: `tests/AudioPlayer.test.tsx`

**Interfaces:**
- Produces: `<AudioPlayer isPlaying={isPlaying} onToggle={togglePlay} audioSrc={audioSrc} />`

- [ ] **Step 1: Write test for AudioPlayer component**
```typescript
// tests/AudioPlayer.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AudioPlayer from '../src/components/AudioPlayer';

describe('AudioPlayer Component', () => {
  it('renders floating audio control button', () => {
    render(<AudioPlayer isPlaying={false} onToggle={() => {}} audioSrc="/audio/wedding-song.mp3" />);
    expect(screen.getByLabelText(/audio/i)).toBeInTheDocument();
  });

  it('fires onToggle when clicked', () => {
    const handleToggle = vi.fn();
    render(<AudioPlayer isPlaying={true} onToggle={handleToggle} audioSrc="/audio/wedding-song.mp3" />);
    fireEvent.click(screen.getByLabelText(/audio/i));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/AudioPlayer.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `src/components/AudioPlayer.tsx`**
Create audio player component managing HTML5 `<audio>` element with spinning vinyl animation when active, mute/play icon toggle, and error-handling wrapper catching `play()` rejection.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/AudioPlayer.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/AudioPlayer.tsx tests/AudioPlayer.test.tsx
git commit -m "feat: implement AudioPlayer with floating toggle and error handling"
```

---

### Task 5: Hero Section & Couple Profile Section

**Files:**
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/CoupleSection.tsx`
- Test: `tests/CoupleSection.test.tsx`

**Interfaces:**
- Consumes: `weddingData.groom`, `weddingData.bride`, `weddingData.quote`
- Produces: `<HeroSection />`, `<CoupleSection />`

- [ ] **Step 1: Write test for CoupleSection**
```typescript
// tests/CoupleSection.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CoupleSection from '../src/components/CoupleSection';
import { weddingData } from '../src/data/wedding-data';

describe('CoupleSection Component', () => {
  it('renders groom and bride full names and parents', () => {
    render(<CoupleSection data={weddingData} />);
    expect(screen.getByText(weddingData.groom.fullName)).toBeInTheDocument();
    expect(screen.getByText(weddingData.bride.fullName)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(weddingData.groom.parents, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(weddingData.bride.parents, 'i'))).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/CoupleSection.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `src/components/HeroSection.tsx` and `src/components/CoupleSection.tsx`**
Build Hero Section displaying couple initials, date banner, and religious quote (Ar-Rum 21). Build Couple Section with portrait frames, names, parent credentials, and Instagram link pills.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/CoupleSection.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/HeroSection.tsx src/components/CoupleSection.tsx tests/CoupleSection.test.tsx
git commit -m "feat: implement HeroSection and CoupleSection components"
```

---

### Task 6: Event Schedule, Countdown Timer & Calendar / Maps Actions

**Files:**
- Create: `src/components/CountdownTimer.tsx`
- Create: `src/components/EventSection.tsx`
- Test: `tests/CountdownTimer.test.tsx`
- Test: `tests/EventSection.test.tsx`

**Interfaces:**
- Consumes: `weddingData.events`
- Produces: `<CountdownTimer targetDateIso={date} />`, `<EventSection data={weddingData.events} />`

- [ ] **Step 1: Write test for CountdownTimer**
```typescript
// tests/CountdownTimer.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CountdownTimer from '../src/components/CountdownTimer';

describe('CountdownTimer Component', () => {
  it('renders days, hours, minutes, and seconds labels', () => {
    // Target date in the future
    const futureDate = new Date(Date.now() + 86400000 * 30).toISOString();
    render(<CountdownTimer targetDateIso={futureDate} />);
    expect(screen.getByText(/hari/i)).toBeInTheDocument();
    expect(screen.getByText(/jam/i)).toBeInTheDocument();
    expect(screen.getByText(/menit/i)).toBeInTheDocument();
    expect(screen.getByText(/detik/i)).toBeInTheDocument();
  });

  it('renders completion message when date is in the past', () => {
    const pastDate = new Date(Date.now() - 86400000).toISOString();
    render(<CountdownTimer targetDateIso={pastDate} />);
    expect(screen.getByText(/hari bahagia telah tiba/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/CountdownTimer.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `src/components/CountdownTimer.tsx` and `src/components/EventSection.tsx`**
Implement countdown hook/component with 1-second interval. Build Event cards for Akad and Resepsi featuring date badges, time ranges, location name, full address, direct link button to Google Maps, and "Simpan ke Google Calendar" generator link.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/CountdownTimer.test.tsx tests/EventSection.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/CountdownTimer.tsx src/components/EventSection.tsx tests/CountdownTimer.test.tsx tests/EventSection.test.tsx
git commit -m "feat: implement CountdownTimer and EventSection with Maps and Calendar integrations"
```

---

### Task 7: Love Story Timeline & Gallery with Lightbox

**Files:**
- Create: `src/components/LoveStorySection.tsx`
- Create: `src/components/GallerySection.tsx`
- Test: `tests/GallerySection.test.tsx`

**Interfaces:**
- Consumes: `weddingData.loveStory`, `weddingData.gallery`
- Produces: `<LoveStorySection data={weddingData.loveStory} />`, `<GallerySection images={weddingData.gallery} />`

- [ ] **Step 1: Write test for GallerySection**
```typescript
// tests/GallerySection.test.tsx
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
    expect(screen.getByLabelText(/close lightbox/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/GallerySection.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `src/components/LoveStorySection.tsx` and `src/components/GallerySection.tsx`**
Implement vertical love story timeline with milestone icons. Implement responsive photo grid gallery with click-to-enlarge lightbox modal including close and next/prev navigation.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/GallerySection.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/LoveStorySection.tsx src/components/GallerySection.tsx tests/GallerySection.test.tsx
git commit -m "feat: implement LoveStorySection and GallerySection with lightbox modal"
```

---

### Task 8: Digital Envelope & Gift Section with Copy Feedback

**Files:**
- Create: `src/hooks/useCopyToClipboard.ts`
- Create: `src/components/GiftSection.tsx`
- Test: `tests/GiftSection.test.tsx`

**Interfaces:**
- Consumes: `weddingData.bankAccounts`, `weddingData.giftAddress`
- Produces: `<GiftSection bankAccounts={weddingData.bankAccounts} giftAddress={weddingData.giftAddress} />`

- [ ] **Step 1: Write test for GiftSection and copy hook**
```typescript
// tests/GiftSection.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GiftSection from '../src/components/GiftSection';
import { weddingData } from '../src/data/wedding-data';

describe('GiftSection Component', () => {
  it('renders bank details and copy buttons', () => {
    render(<GiftSection bankAccounts={weddingData.bankAccounts} giftAddress={weddingData.giftAddress} />);
    expect(screen.getByText(weddingData.bankAccounts[0].accountNumber)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /salin/i }).length).toBeGreaterThan(0);
  });

  it('displays toast feedback upon copying', async () => {
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    render(<GiftSection bankAccounts={weddingData.bankAccounts} giftAddress={weddingData.giftAddress} />);
    fireEvent.click(screen.getAllByRole('button', { name: /salin/i })[0]);
    expect(await screen.findByText(/berhasil disalin/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/GiftSection.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `useCopyToClipboard` hook and `src/components/GiftSection.tsx`**
Create hook with clipboard fallback. Build bank card elements with ATM card styling (bank logo/badge, account number, holder name) and physical gift delivery address card. Add self-dismissing toast notification on copy.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/GiftSection.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/hooks/useCopyToClipboard.ts src/components/GiftSection.tsx tests/GiftSection.test.tsx
git commit -m "feat: implement GiftSection with copy-to-clipboard toast feedback"
```

---

### Task 9: RSVP & Live Wishes Feed with Supabase / Fallback Adapter

**Files:**
- Create: `src/lib/supabase.ts`
- Create: `src/components/RsvpWishesSection.tsx`
- Test: `tests/RsvpWishesSection.test.tsx`

**Interfaces:**
- Produces: `<RsvpWishesSection guestName={guestName} />`

- [ ] **Step 1: Write test for RSVP form and wishes display**
```typescript
// tests/RsvpWishesSection.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RsvpWishesSection from '../src/components/RsvpWishesSection';

describe('RsvpWishesSection Component', () => {
  it('renders form inputs and pre-fills guest name', () => {
    render(<RsvpWishesSection guestName="Anggi Permana" />);
    const nameInput = screen.getByLabelText(/nama/i) as HTMLInputElement;
    expect(nameInput.value).toBe('Anggi Permana');
    expect(screen.getByRole('button', { name: /kirim ucapan/i })).toBeInTheDocument();
  });

  it('submits a new wish and adds it to the list', async () => {
    render(<RsvpWishesSection guestName="Budi Santoso" />);
    fireEvent.change(screen.getByLabelText(/doa/i), { target: { value: 'Selamat menempuh hidup baru!' } });
    fireEvent.click(screen.getByRole('button', { name: /kirim ucapan/i }));
    await waitFor(() => {
      expect(screen.getByText('Selamat menempuh hidup baru!')).toBeInTheDocument();
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/RsvpWishesSection.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `src/lib/supabase.ts` and `src/components/RsvpWishesSection.tsx`**
Implement Supabase client with safe fallback: if env vars are missing, use local state / localStorage adapter. Build RSVP form (Name, Status: Hadir/Tidak Hadir, Pax Count, Message) and responsive wishes card list with avatars and relative timestamps ("baru saja", "2 jam yang lalu").

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/RsvpWishesSection.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/lib/supabase.ts src/components/RsvpWishesSection.tsx tests/RsvpWishesSection.test.tsx
git commit -m "feat: implement RsvpWishesSection with real-time support and local fallback"
```

---

### Task 10: Floating Bottom Dock Navigation & Page Integration

**Files:**
- Create: `src/components/FloatingNavbar.tsx`
- Modify: `src/app/page.tsx`
- Test: `tests/PageIntegration.test.tsx`

**Interfaces:**
- Consumes: All components from Tasks 2-9
- Produces: Complete working wedding invitation website page at `/`.

- [ ] **Step 1: Write integration test**
```typescript
// tests/PageIntegration.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WeddingPage from '../src/app/page';

describe('Wedding Invitation Full Page Integration', () => {
  it('renders cover gate initially', () => {
    render(<WeddingPage />);
    expect(screen.getByRole('button', { name: /buka undangan/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run tests/PageIntegration.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `src/components/FloatingNavbar.tsx` and integrate all sections into `src/app/page.tsx`**
Build bottom floating dock pill with icons for Home, Pasangan, Acara, Galeri, Kado, dan Ucapan. Wire up `page.tsx` with `useSearchParams` for `?to=...`, handle gate open state, audio play trigger, and smooth scrolling anchor links.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run tests/PageIntegration.test.tsx`
Expected: PASS

- [ ] **Step 5: Run full test suite and build**
Run: `npx vitest run` and `npm run build`
Expected: All tests PASS and build succeeds without errors.

- [ ] **Step 6: Commit**
```bash
git add src/components/FloatingNavbar.tsx src/app/page.tsx tests/PageIntegration.test.tsx
git commit -m "feat: complete wedding invitation page integration with floating dock navbar"
```
