# BigSam (Gadex®) — High-Performance Full-Stack Portfolio

<p align="left">
  <img src="https://img.shields.io/badge/Brand-Gadex%C2%AE-E84511?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/Engineer-BigSam%20(Samuel)-111111?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Production%20Ready-2ea44f?style=for-the-badge" />
</p>

An editorial, Swiss-inspired, high-performance portfolio engineered for **BigSam** (Brand: **Gadex®**), a Full-Stack Engineer specializing in scalable web systems, resilient backend APIs, and modern frontend interfaces. Built strictly according to the reference video design system with ultra-precise typography, split-tone displays, Framer Motion transitions, and responsive mobile architecture.

---

## 🚀 Live Demo & Links

- **Repository:** [github.com/akanbisamuel045-tech/BigSam-Portfolio](https://github.com/akanbisamuel045-tech/BigSam-Portfolio)
- **WhatsApp Direct Line:** [+234 916 057 5724](https://wa.me/2349160575724)
- **Email:** [akanbisamuel045@gmail.com](mailto:akanbisamuel045@gmail.com)
- **Location:** Remote — Worldwide

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 15+ (App Router, Server & Client Components)
- **Language:** TypeScript (Strict typing, zero `any`, strict null checks)
- **Styling:** Tailwind CSS (v3.4+) with custom design tokens:
  - Primary Accent: `#E84511` (Burnt Orange) / `#D9380A` (Deep Orange)
  - Canvas Surface: `#F6F6F6` (Editorial Light Canvas)
  - Dark Surface: `#111111` (Carbon Black) / `#1A1A1A` (Charcoal)
  - Border Lines: `#E2E2E2` / `#DCDCDC`
- **Animations:** Framer Motion (Split-tone scroll reveals, accordion height collapse, staggered grids, sliding button hover fills)
- **Typography:** `Plus Jakarta Sans` (Display Headline weights 700/800) and `Inter` (Body weights 400/500) via `next/font/google`
- **Icons:** Lucide React & custom SVG geometric crosshairs

---

## 📂 Multi-Page Application Architecture

```
src/
├── app/
│   ├── layout.tsx         # Root layout (MetadataBase, OpenGraph, Twitter, Favicon, Navbar, Footer)
│   ├── page.tsx           # Home page (11 pure sequential editorial sections)
│   ├── about/page.tsx     # /about (4-Image Strip, Stats, Achievements, Career & Collaborators, Bento, FAQ, CTA)
│   ├── services/page.tsx  # /services (6 Stacked full-width cards, tags, interactive hover highlights, CTA)
│   ├── articles/page.tsx  # /articles (2-Column editorial article archive, author metadata, CTA)
│   ├── contact/page.tsx   # /contact (CONTACT ME hero, 2x2 Info Cards, dark direct message form to WhatsApp, FAQ, CTA)
│   └── not-found.tsx      # Custom editorial 404 Not Found page
├── components/
│   ├── home/              # HeroSection, BrandMarquee, ImpactSection, ServicesSection, ProjectsGrid, ProcessSection, WhyChooseMeBento, TestimonialsSection, PricingSection, InsightsPreview
│   ├── layout/            # Navbar, NavigationDrawer, Footer, CtaBanner
│   ├── shared/            # FaqAccordion (Reusable expandable Q&A accordion)
│   └── ui/                # ArrowButton, SectionHeader, GridCrosshair, etc.
├── data/
│   └── portfolioData.ts   # Centralized data store (single source of truth for all content)
└── lib/
    └── utils.ts           # clsx and tailwind-merge helper
```

---

## ⚙️ Content Customization Guide

All text, services, projects, client brands, career history, and contact endpoints are managed dynamically in:
```
src/data/portfolioData.ts
```

### Adding or Updating Projects
Edit the `portfolioData.projects` array in [`src/data/portfolioData.ts`](file:///c:/Users/USER/Desktop/PORTFOLIO/src/data/portfolioData.ts):
```typescript
{
  id: "project-slug",
  number: "01",
  title: "Your Project Title",
  category: "Full-Stack Web App",
  year: "2026",
  image: "/assets/your-project-cover.jpg",
  client: "Client Name",
  tags: ["Next.js", "TypeScript", "PostgreSQL"],
  liveUrl: "https://your-project.com",
  githubUrl: "https://github.com/...",
}
```

### Adding New Images & Asset Processing
Drop your original images into `raw-assets/` and run the edge-aware asset processing script:
```bash
npm run process-assets
```
This automatically processes and exports transparent cutouts and web-optimized images into `public/assets/`.

---

## 🎛️ Full-Stack Admin CMS & Control Center (`/admin`)

The portfolio includes a production-grade visual Content Management System (CMS) and studio control center located at `/admin`.

### 1. Authentication & Access
- **Admin Gateway:** Navigate to [`/admin`](http://localhost:3000/admin). Unauthenticated sessions are automatically intercepted by Next.js Edge Middleware and redirected to [`/admin/login`](http://localhost:3000/admin/login).
- **Default Master Passphrase:** `gadex2026`
- **Environment Configuration:**
  - Create or edit `.env.local` to define your custom production password:
    ```bash
    ADMIN_PASSWORD="your-strong-secret-passphrase"
    ```
  - On **Vercel**, add `ADMIN_PASSWORD` under **Project Settings > Environment Variables**.
- **Session Security:** Sessions are stored via a secure, `HttpOnly`, `SameSite=Lax` cookie (`gadex_admin_session`) cryptographically validated against `ADMIN_PASSWORD`.

---

### 2. The 9 Visual CMS Editor Tabs

The Admin Control Center is divided into 9 dedicated tabs:

| Tab | Name | Scope & Capabilities |
| :--- | :--- | :--- |
| **01** | **System Overview** | Live system health metrics, quick navigation shortcuts to public pages, **Download JSON Backup**, **Import/Restore JSON**, and **TypeScript Source Generator**. |
| **02** | **Identity & Hero** | Personal details (name, role, email, phone, location, booking URL, social channels) and Hero Featured Project card. |
| **03** | **Stats & Brand Marquee** | Live counter metrics (projects completed, happy clients, years experience, satisfaction rating) and client brand marquee logos with drag-less reordering. |
| **04** | **Services Editor** | Complete CRUD and reordering for Services `001`–`006` with dynamic tag pills and image URLs. |
| **05** | **Portfolio Projects** | Full CRUD for case studies with 5-position staggered layout configuration (`medium-left`, `small-right`, `full-wide`, `small-left`, `medium-right`) matching the Home page editorial grid. |
| **06** | **Process & Bento Grid** | 4-step engineering workflow cards (`01`–`04`) with icon selectors (`sparkle`, `asterisk`, `bolt`, `plus`) and why-choose-me Bento grid cards. |
| **07** | **Pricing & Reviews** | Dual-model pricing plans (`Project-Based` vs `Monthly Retainer`) feature lists and verified client testimonial reviews with star rating selectors. |
| **08** | **About, Awards & Career** | Split-tone engineering philosophy headline, `/about` stats, industry awards/honors, and professional career timeline items. |
| **09** | **Articles & FAQs** | Editorial articles archive (title, excerpt, category, author, date, image) and expandable accordion FAQ knowledgebase. |

---

### 3. Dual-Persistence & Live Broadcast Engine

- **Dual-Persistence Model:**
  - When you click **SAVE ALL CHANGES** (or press `Ctrl+S`), changes are persisted to `cms-db.json` (or dynamic runtime memory in serverless edge environments) and immediately formatted into `src/data/portfolioData.ts`.
- **Instant Cross-Tab Live Synchronization:**
  - Changes instantly broadcast via Web `BroadcastChannel` (`gadex_cms_channel`) and `CustomEvent` listeners. All open public tabs update in real-time without requiring a page reload.
- **Data Portability & Backup Tools:**
  - **Download JSON Backup:** Generates timestamped `.json` exports (`gadex-cms-backup-YYYY-MM-DD.json`) of the complete CMS state.
  - **Import JSON Restore:** Restores historical backups with strict 13-key schema validation (`personalInfo`, `heroFeaturedProject`, `stats`, `clientLogos`, `services`, `projects`, `processSteps`, `testimonials`, `pricing`, `achievements`, `career`, `articles`, `faqs`).
  - **TypeScript Source Generator:** Generates production-ready, strictly typed TypeScript code matching `src/data/portfolioData.ts` with one-click **Copy to Clipboard** and **Download .ts** options.

---

## 💻 Local Development & Build Commands

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

3. **Validate TypeScript (0 errors):**
   ```bash
   npm run type-check
   # or
   npx tsc --noEmit
   ```

4. **Run Linter:**
   ```bash
   npm run lint
   ```

5. **Production Build:**
   ```bash
   npm run build
   ```

6. **Start Production Server:**
   ```bash
   npm run start
   ```

---

## 🌐 Deploy to Vercel

The application is fully optimized for Vercel edge deployment:
1. Push your changes to GitHub (`git push origin main`).
2. Import the `BigSam-Portfolio` repository in [Vercel](https://vercel.com/new).
3. The default Next.js build settings (`npm run build`, output: `.next`) will automatically detect and deploy all static pages.

---

## 📄 License & Credits

- **Engineer:** BigSam (Samuel) — Gadex®
- **Design Inspiration:** Swiss Modern Editorial & Architectural Portfolio Aesthetics
- © 2026 Gadex®. All rights reserved.
