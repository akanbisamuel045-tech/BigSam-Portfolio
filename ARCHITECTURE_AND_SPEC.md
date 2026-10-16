# GADEX® / SAMUEL — FULL-STACK ENGINEER PORTFOLIO SPECIFICATION

## 1. Project Overview & Identity
A pixel-accurate, high-performance recreation of the "Portfoliob®" multi-page editorial portfolio template built for **Samuel** (Brand: **Gadex®**), a **Full-Stack Engineer**.
- **Owner:** Samuel
- **Brand:** Gadex®
- **Role:** Full-Stack Engineer
- **Email:** akanbisamuel045@gmail.com
- **Phone:** +234 916 057 5724
- **Location:** Remote — Worldwide
- **GitHub:** https://github.com/akanbisamuel045-tech
- **WhatsApp Direct Booking:** https://wa.me/2349160575724
- **Core Stats:** 5+ Projects Completed | 4+ Years Experience | 98% Client Satisfaction | 12 Global Collaborations

The application is engineered in **15 sequential stages**. Each stage requires passing strict Build, Type-Check (`npx tsc --noEmit`), Lint (`npm run lint`), and Runtime/Visual Verification checks before proceeding.

---

## 2. Tech Stack & Libraries
- **Framework:** Next.js 15+ (App Router, TypeScript)
- **Styling:** Tailwind CSS (v3.4+ / v4) + Vanilla CSS Variables
- **Animations:** Framer Motion (scroll-triggered split-tone text, count-up numbers, full-screen drawer transitions, accordion height collapse)
- **Icons:** Lucide React + custom geometric SVGs (crosshairs, sparkles, asterisks)
- **Fonts:** `Plus Jakarta Sans` (weights: 500, 600, 700, 800) and `Inter` (weights: 400, 500, 600) via `next/font/google`
- **Utilities:** `clsx`, `tailwind-merge`

---

## 3. Global Design Tokens & Color Palette
- **Primary Accent (Burnt Orange):** `#E84511` (Gradient stop: `#D9380A`)
- **Light Background Canvas:** `#F6F6F6`
- **Pure White Surface (Light Cards):** `#FFFFFF`
- **Matte Carbon Black Surface:** `#111111`
- **Dark Card Surface:** `#1A1A1A`
- **Drawer Overlay Surface:** `#140B08`
- **Muted Split-Tone Text:** `#8E8E8E`
- **Hairline Grid Borders:**
  - On Orange Hero & Navbar: `rgba(255, 255, 255, 0.16)`
  - On Light Background: `#E2E2E2`
  - On Dark Background: `#262626`

---

## 4. Multi-Page Routes
1. `/` — Home (11 complete sections: Hero, Marquee, Impact, Services 001–004, Editorial Projects Grid, Process, Bento, Testimonials, Pricing toggle, Insights preview, CTA banner, and Footer)
2. `/about` — About Us (Editorial photo strip, philosophy, outline stats, honors & achievements, career journey, checkerboard client grid, bento, and FAQ)
3. `/services` — Services Page (Full 6 stacked interactive service cards + skill pills + booking CTA)
4. `/articles` — Articles / Blog Page (6 categorized editorial tech articles)
5. `/contact` — Contact Me Page (2x2 info grid, dark interactive contact form linking to WhatsApp/Email, and expandable FAQ accordion)

---

## 5. Directory Structure
```text
src/
├── app/
│   ├── layout.tsx          # Global fonts, Navbar, Footer, smooth scroll wrapper
│   ├── page.tsx            # Home Page (11 sections)
│   ├── globals.css         # Design tokens, variables & smooth scrolling
│   ├── about/page.tsx      # About Us Page
│   ├── services/page.tsx   # Services Page
│   ├── articles/page.tsx   # Articles / Blog Page
│   └── contact/page.tsx    # Contact Me Page
├── components/
│   ├── ui/
│   │   ├── SectionHeader.tsx     # Badge + Split-tone scroll reveal heading
│   │   ├── ArrowButton.tsx       # Bordered button with orange sliding ↗ box
│   │   ├── GridCrosshair.tsx     # + intersection marker
│   │   └── GadexLogo.tsx         # SVG/Image Gadex® brand mark
│   ├── layout/
│   │   ├── Navbar.tsx            # 5-column top orange bar
│   │   ├── FullScreenMenu.tsx    # Dark overlay drawer menu
│   │   ├── CtaBanner.tsx         # Shared "Let's Create Together" floating form banner
│   │   └── Footer.tsx            # Shared newsletter + giant Gadex® / Samuel® footer
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── BrandMarquee.tsx
│   │   ├── ImpactSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ProjectsGrid.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── WhyChooseMeBento.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── PricingSection.tsx
│   │   └── InsightsPreview.tsx
│   └── shared/
│       └── FaqAccordion.tsx      # 6-item expandable FAQ list
├── data/
│   └── portfolioData.ts          # Single source of truth for all personal data
├── lib/
│   └── utils.ts                  # cn() className merger utility
└── assets/ (in public/)
    ├── hero-portrait.png         # Full chest-up transparent cutout
    ├── samuel-avatar.png         # 400x400 tight head/shoulder crop on #E84511
    ├── samuel-impact.png         # 800x1000 stylized warm/editorial portrait
    ├── gadex-logo.png            # Transparent brand logo
    └── gadex-logo-white.png      # White monochrome brand logo
```

---

## 6. Mandatory Stage-Gate Protocol
At the end of EVERY stage, the agent must execute:
1. **Type Check:** `npx tsc --noEmit` (Must return 0 errors)
2. **Linter Check:** `npm run lint` (Must return 0 fatal warnings/errors)
3. **Build Check:** `npm run build` (Ensures pages and bundles compile cleanly)
4. **Runtime & Layout Verification:** Confirm responsive behavior across Mobile (375px), Tablet (768px), and Desktop (1440px), verify all links (wa.me, mailto:, internal routes), and confirm zero React hydration mismatches.
5. **Stage Report:** Output concise "STAGE X VERIFICATION REPORT" and wait for user permission before proceeding.
