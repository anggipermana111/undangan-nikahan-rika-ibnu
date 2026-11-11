# Design Document: Wedding Invitation Website (Undangan Pernikahan Digital)

**Date**: 2026-11-11  
**Status**: Draft for Review  
**Author**: Antigravity & User  

---

## 1. Intent and The Why
The goal is to create a modern, elegant, and mobile-first wedding invitation website for the user's sibling. It will be shared primarily via messaging apps (WhatsApp) to guests with personalized links (`?to=Nama+Tamu`). The website serves to convey heartfelt invitations, provide accurate logistical event information (dates, venue, Google Maps, calendar links), collect RSVPs and wishes in real time, and offer a seamless digital gift/envelope feature.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- **Personalized Guest Experience**: Auto-detect guest name from query parameters (`?to=...`) and display on cover and greeting.
- **Mobile-First & Ultra Fast**: Optimized for smartphone screens, low data usage, fast asset loading, and smooth scrolling.
- **Audio Autoplay & Control**: Music starts seamlessly upon clicking "Buka Undangan" (satisfying browser gesture policies) with a floating mute/unmute control.
- **Interactive Event Logistics**: Countdown timer to wedding day, Google Maps redirection, and "Add to Google Calendar".
- **Real-Time RSVP & Wishes Feed**: Guests can confirm attendance and submit congratulations/prayers, which appear live on the website (backed by Supabase).
- **Digital Shagun / Envelope**: Bank account & e-wallet numbers with 1-click copy-to-clipboard functionality and physical gift delivery address.
- **Centralized Content Config**: All textual content, event details, photos, and bank accounts are isolated in a single config file (`data/wedding-content.ts`) so content can be swapped effortlessly once the sibling provides finalized data.

### Non-Goals
- Complex administrative dashboards or multi-tenant CMS for now (RSVP data will be viewed directly in Supabase table or exported).
- Payment gateway integration (manual transfer with copy account number is the standard convention).
- Guest authentication/login (invitation links are public-accessible with personalized tokens/parameters).

### Anti-Goals
- Heavy, bloated frameworks or uncompressed media that cause slow loading on mobile connections.
- Auto-playing sound before user interaction (which violates modern mobile browser autoplay policies and causes errors).
- Complicated multi-page navigation that forces mobile users to wait for page loads.

---

## 3. Constraints
- Must run reliably across mobile browsers (Chrome Android, Safari iOS, WhatsApp in-app browser).
- Must adhere to browser autoplay policies: audio only plays on/after the user taps "Buka Undangan".
- Must support graceful degradation: if Supabase credentials are not yet configured during development, RSVP and Wishes must fall back to local mock state without crashing.

---

## 4. Approaches Considered

### Approach 1: Single-Page Dynamic Scroll with Cover Gate & Floating Navbar (Selected)
- **Concept**: Fullscreen cover gate displaying the guest's name and a "Buka Undangan" button. Once tapped, smooth opening transition reveals a single long-scroll page with a persistent floating bottom navigation dock (Home, Couple, Event, Story, Gallery, Gift, RSVP).
- **Pros**: Matches top industry standards (*wekita.id*, *punakawandigital*), intuitive for all ages, zero page-reload delays, perfect audio trigger.
- **Cons**: Requires careful asset optimization (lazy loading) to maintain snappy scroll performance.
- **Decision**: **Selected by User**.

### Approach 2: Story / Slide-Based Presentation (Card-by-Card)
- **Concept**: Content partitioned into fullscreen slides (Instagram Stories style) navigated via swipe or next buttons.
- **Pros**: Highly focused per section.
- **Cons**: Inconvenient for guests wanting quick access to event location or bank account numbers; less intuitive for older relatives.
- **Decision**: Rejected.

### Approach 3: Minimalist Direct Page (No Cover Gate)
- **Concept**: Immediate landing on the main invitation page without an opening ceremony/gate.
- **Pros**: Direct and simple.
- **Cons**: Browsers prevent background audio autoplay without prior user interaction; lacks the emotional ceremonial appeal.
- **Decision**: Rejected.

---

## 5. Architectural & Technical Decisions

### Tech Stack
- **Framework**: Next.js (App Router, React 19/18, TypeScript)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations & Micro-interactions**: Tailwind CSS keyframes + lightweight CSS animations or Framer Motion
- **Database & Realtime Backend**: Supabase (PostgreSQL with Realtime Subscriptions for table `wishes` and `rsvps`)
- **Deployment Target**: Vercel (zero-config, high-speed CDN, free tier)

### Page Structure & Sections
1. **Cover / Gate (Overlay)**:
   - Recipient Name (`?to=...`)
   - Couple Nicknames
   - "Buka Undangan" button (triggers audio play, hides overlay with smooth fade-out/slide-up)
2. **Hero / Header**:
   - Main photo, wedding date, opening prayer/quote (e.g. Ar-Rum: 21)
3. **Mempelai (Couple)**:
   - Groom Profile: photo, full name + title, son of parents, Instagram link
   - Bride Profile: photo, full name + title, daughter of parents, Instagram link
4. **Waktu & Lokasi Acara (Event Schedule)**:
   - Live Countdown Timer (Days, Hours, Minutes, Seconds)
   - Akad Nikah Card: date, time, venue name, address, Google Maps button
   - Resepsi Card: date, time, venue name, address, Google Maps button
   - "Tambahkan ke Kalender" button
5. **Love Story (Perjalanan Cinta)**:
   - Visual timeline (Pertama Bertemu, Komitmen, Lamaran)
6. **Galeri Foto (Gallery)**:
   - Responsive photo grid with lightbox modal preview
7. **Amplop Digital & Kado (Gift Section)**:
   - Bank cards with account number, account holder name, and copy button (toast notification on copy)
   - Physical gift mailing address card with copy address button
8. **RSVP & Buku Ucapan (RSVP & Wishes)**:
   - Form: Nama (prefilled from `?to=`), Kehadiran (Hadir / Berhalangan), Jumlah Tamu, Pesan Doa
   - Live feed of wishes with pagination / scrollable list
9. **Penutup (Closing) & Floating Bottom Navbar**:
   - Thank you note from couple & family
   - Floating navigation pill at bottom for jumping between sections

### Data Architecture
All configurable data is stored in `src/data/wedding-data.ts`:
- Couple details (names, parents, social links, photos)
- Events list (Akad, Resepsi, date strings, Google Maps URLs)
- Love story milestones
- Gallery image paths
- Bank accounts and gift address
- Quotes and greetings

This ensures that whenever the sibling finalizes their photos and details, zero UI code changes are needed.

---

## 6. What's Left to the Builder
- Scaffolding Next.js project with Tailwind CSS.
- Implementing modular React components for each section.
- Setting up the audio player utility with play/pause state and floating toggle.
- Setting up Supabase client with graceful fallback to mock state when environment variables are missing.
- Implementing copy-to-clipboard hook with visual toast feedback.
