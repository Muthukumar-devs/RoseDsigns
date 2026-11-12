# RoseDsigns — Creative, Branding & Advertising Landing Page

A responsive, interactive, and luxury-editorial landing page designed and developed for **RoseDsigns**, a premier creative design and digital marketing agency based in Perth, Western Australia.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4 (Turbopack)**.

---

## 🌟 Live References & Brand Foundations

* **Official Website:** [https://rosedsigns.com/](https://rosedsigns.com/)
* **Tagline:** *"Ideas that make your brand bloom."*
* **Core Disciplines:** `BRANDING ✧ WEBSITES ✧ CONTENT ✧ DIGITAL MARKETING ✧ BRANDS THAT BLOOM`

---

## 🎨 Design System & Visual Identity

### 1. Color Palette (Tailwind CSS v4 `@theme inline`)
* **Primary Tones:**
  * **Ivory (`#F7F3EC`):** Warm, tactile default background reminiscent of archival cotton paper.
  * **Rose Black (`#171514`):** High-contrast, rich black for typography and primary actions.
  * **Antique Rose (`#A76570`):** Signature accent tone for badges, highlights, and active elements.
  * **Dusty Blush (`#D9B1AE`):** Soft ambient glow and selection highlight.
* **Secondary & Supporting Tones:**
  * **Burgundy (`#672D39`):** Editorial serif emphasis and hover states.
  * **British Green (`#183B32`):** Organic botanical grounding.
  * **Antique Gold (`#B08A57`):** Refined border accents and diamond markers.
  * **Warm Grey (`#E8E2D8`) & Stone (`#C9C1B8`):** Subtle borders and dividers.

### 2. Typography Hierarchy
* **Headings / Display (Bodoni / Didot Style):**
  * `Playfair_Display` & `Cormorant_Garamond` via `next/font/google` (`font-serif`, `font-heading`).
* **Body / Interface (Clean Modern Sans-Serif):**
  * `Inter` via `next/font/google` (`font-sans`).

---

## 🚀 Key Sections & Interactive Features

1. **Navigation Bar (`components/Navbar.tsx`):**
   * Frosted glass header with sticky position and backdrop blur.
   * Brand monogram and typography.
   * Smooth-scrolling anchor links (`#work`, `#services`, `#studio`, `#contact`).
   * Responsive slide-out mobile drawer with touch-friendly navigation.

2. **Hero Section (`components/Hero.tsx`):**
   * High-impact editorial headline: *"Ideas that make your brand bloom."*
   * **The Edit / Selected Work:** Interactive switcher highlighting real client campaigns with live metrics (e.g. *A2B Yokine Navaratri reel — 129K+ views*).
   * Direct video player modal with accessible controls and YouTube embed.

3. **Discipline Ribbon (`components/Ribbon.tsx`):**
   * Seamless marquee animation with hover-pause functionality.

4. **Portfolio & Case Studies (`components/Portfolio.tsx`):**
   * Detailed case studies for **A2B Perth**, **Thirai Flicks**, and **Biriyani Box**.
   * Multi-slide gallery per project with pagination counters (`01 / 04`) and navigation buttons.
   * Video trailer / reel launch integration.
   * Direct links to live client websites and social channels (Harrisdale & Yokine Instagram/Facebook feeds).
   * **On the Horizon:** Teaser cards for upcoming documentary and culinary projects (*Reflections*, *Palayam Peppers*).

5. **Services & Capabilities (`components/Services.tsx`):**
   * Expandable accordion detailing the 8 authentic agency capabilities.
   * Deliverables breakdown per service.
   * **Deep UX Link:** Clicking *"Discuss this service ↗"* smoothly scrolls to the contact section, auto-selects that service's pill, and pre-populates the inquiry box.

6. **The Studio & Philosophy (`components/StudioPhilosophy.tsx`):**
   * Bespoke luxury editorial tabletop photography (`studio-brand-showcase.jpg`).
   * 3-Step Methodology: `01 / Discover`, `02 / Create`, `03 / Connect`.
   * Brand Motif Anatomy: The Rose, The Letter D, The Curve, and The Diamond (`❖`).
   * Link to the official Google Drive Brand Guidelines kit.

7. **Client Praise (`components/Testimonials.tsx`):**
   * Editorial quote showcase from leadership at A2B Perth, Thirai Flicks, and Biriyani Box with territory and view count badges.

8. **Frequently Asked Questions (`components/FAQ.tsx`):**
   * Clean accordion addressing turnaround times, dual design/dev capabilities, international collaboration, and deliverables.

9. **Interactive Project Brief Generator (`components/ContactBrief.tsx`):**
   * Multi-select service pills.
   * Real-time client-side `.txt` file compiler and instant download (`RoseDsigns-Project-Brief.txt`).
   * Direct email and inquiry touchpoints.

10. **Footer (`components/Footer.tsx`):**
    * Brand wordmark, headquarters details, sitemap links, and smooth back-to-top button.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** Next.js 16.4.6 (App Router)
* **Library:** React 19.3.0
* **Styling:** Tailwind CSS 4.3.3 + Turbopack CSS loader
* **Language:** TypeScript 5 (Strict mode)
* **Fonts:** `next/font/google` (`Playfair_Display`, `Cormorant_Garamond`, `Inter`)
* **Linter:** ESLint 9 (`eslint-config-next`)

---

## 💻 Getting Started Locally

### Prerequisites
* Node.js 18.17+ or 20+

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd landingPage

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

### Code Quality Check
```bash
npm run lint
```
*(Verified: 0 errors, 0 warnings)*

---

© 2026 RoseDsigns. Crafted for the Web Design & Development Specialist Technical Assessment.
