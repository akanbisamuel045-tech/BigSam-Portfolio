# GADEX® / BIGSAM — FULL-STACK ADMIN CMS & CONTROL CENTER SPECIFICATION

## 1. Executive Summary
An enterprise-grade, password-protected **Full-Stack Admin CMS (`/admin`)** built directly into the **BigSam / Gadex® Portfolio** (`Next.js App Router`). This Admin Control Center allows Samuel to visually create, edit, reorder, upload images, and delete ANY piece of frontend content in real time without touching code.

## 2. Core Architectural Design
- **Dual-Mode Persistence Engine (`src/lib/cmsStorage.ts`):**
  1. **Local / File-System Persistence:** Reads and writes directly to `src/data/cms-db.json` (automatically seeded from `src/data/portfolioData.ts` on first boot) AND optionally syncs back to `portfolioData.ts`.
  2. **Production Cloud Persistence Ready:** Supports optional GitHub API Auto-Commit (`GITHUB_TOKEN`) or Cloud JSON/KV storage so edits made on a live Vercel deployment persist permanently.
  3. **Instant Cache Revalidation:** Every save triggers Next.js `revalidatePath("/", "layout")` so all 5 frontend pages (`/`, `/about`, `/services`, `/articles`, `/contact`) update immediately.
- **Security & Auth Layer:**
  - HTTP-Only signed session cookie (`gadex_admin_session`) verified via Next.js Middleware (`src/middleware.ts`) and API route guards.
  - Default environment variable `ADMIN_PASSWORD` (with fallback dev passphrase stored in `.env.local`).
- **Aesthetic Alignment:**
  - Styled in the signature **Portfoliob / Gadex®** palette: Matte Carbon Black (`#111111`) sidebar, Dark Card surfaces (`#1A1A1A`), Crisp Off-White (`#F6F6F6`) workspace panels, and Burnt Orange (`#E84511`) interactive accents.

## 3. Complete Admin Route & Component Tree
```text
src/
├── data/
│   ├── portfolioData.ts          # Initial seed & TypeScript schema definitions
│   └── cms-db.json               # Live mutable JSON database powering the frontend & admin
├── lib/
│   ├── cmsStorage.ts             # Server-side read/write/reset/backup engine + revalidatePath
│   ├── auth.ts                   # Session token signing, verification & cookie helpers
│   └── usePortfolioCMS.ts        # Client hook / context for live data & optimistic updates
├── app/
│   ├── api/
│   │   └── admin/
│   │       ├── auth/route.ts     # POST login, DELETE logout, GET session status
│   │       ├── content/route.ts  # GET full CMS data, PUT update section/full data, POST reset/restore
│   │       └── upload/route.ts   # POST multipart image upload & Sharp optimization to public/assets/uploads/
│   └── admin/
│       ├── layout.tsx            # Admin shell (Sidebar navigation, Top status bar, Quick Preview)
│       ├── login/page.tsx        # High-contrast Gadex® Admin Login Gate
│       └── page.tsx              # Unified Multi-Tab Admin Control Center (10 Editor Modules)
└── components/
    └── admin/
        ├── AdminSidebar.tsx      # 10-section navigation + Live Site link + Logout
        ├── AdminHeader.tsx       # Unsaved changes indicator, "Save Changes", "Export JSON", "View Site"
        ├── ImageUploaderModal.tsx# Drag-and-drop image upload + URL input + Live preview
        └── editors/
            ├── OverviewTab.tsx       # System health, section counts, JSON backup/restore
            ├── IdentityHeroTab.tsx   # Name, Brand, Role, Tagline, Bio, Contact, Socials, Hero Project
            ├── StatsClientsTab.tsx   # Live counter numbers (5+, 4+, 98%, 12) & Client Marquee Logos
            ├── ServicesEditorTab.tsx # CRUD + Reorder for 001–006 Services & 5 skill pill tags
            ├── ProjectsEditorTab.tsx # CRUD + Reorder + Layout size selector for Portfolio Projects
            ├── ProcessBentoTab.tsx   # 4 Process Steps editor + Why Choose Me Bento card editor
            ├── PricingReviewsTab.tsx # Monthly/Project pricing tiers + 6 features + Testimonials CRUD
            ├── AboutCareerTab.tsx    # Philosophy text + 4 Achievements/Awards + Career Timeline CRUD
            └── ArticlesFaqTab.tsx    # Blog Articles CRUD + 6 Expandable FAQs CRUD
```

---

## 4. Strict 12-Stage Execution & Verification Protocol

**MANDATORY RULE FOR ANTIGRAVITY AGENT:**
Execute **ONE stage at a time**. During every stage, you must perform:
1. **BUILD:** Implement the stage's files with strict TypeScript types.
2. **TEST:** Run `npx tsc --noEmit`, `npm run lint`, and test API/UI behavior in the browser.
3. **DEBUG & FIX:** Immediately resolve any type errors, hydration warnings, state bugs, or broken imports.
4. **VERIFY:** Output a structured `STAGE X ADMIN VERIFICATION REPORT` and wait for user confirmation before proceeding to Stage X+1.

---

### STAGE 1: Dynamic CMS Storage Engine & Seed Database (`cms-db.json` + `/api/admin/content`)
- **Build:**
  - Create `src/data/cms-db.json` seeded with the exact contents of `portfolioData`.
  - Create `src/lib/cmsStorage.ts` with `getCMSData()`, `updateCMSData(partialOrFullData)`, and `resetCMSDataToDefault()`. Trigger `revalidatePath("/", "layout")` on every write so frontend pages update immediately.
  - Create `src/app/api/admin/content/route.ts` supporting `GET` (fetch current CMS JSON), `PUT` (update full or section-specific CMS data with schema validation), and `POST` (reset to defaults or import JSON backup).
- **Test, Debug & Fix:**
  - Test `GET /api/admin/content` and `PUT /api/admin/content` via curl/browser fetch and verify `src/data/cms-db.json` persists changes cleanly.
  - Run `npx tsc --noEmit` and `npm run lint`.

### STAGE 2: Connect All 5 Frontend Pages to Live Dynamic CMS Data
- **Build:**
  - Create a lightweight `PortfolioDataProvider` (`src/context/PortfolioContext.tsx`) hydrated in `src/app/layout.tsx` from `getCMSData()` (or server-fetched live data) with an automatic helper hook `usePortfolioData()` so every frontend section (`HeroSection`, `ImpactSection`, `ServicesSection`, `ProjectsGrid`, `ProcessSection`, `WhyChooseMeBento`, `TestimonialsSection`, `PricingSection`, `InsightsPreview`, `CtaBanner`, `Footer`, `/about`, `/services`, `/articles`, `/contact`) dynamically renders the live `cms-db.json` state!
- **Test, Debug & Fix:**
  - Modify a test field in `cms-db.json` (or via `PUT /api/admin/content`), refresh `http://localhost:3005/`, and verify the frontend updates instantaneously.
  - Run `npx tsc --noEmit`, `npm run lint`, and `npm run build`.

### STAGE 3: Admin Authentication Gate, Session Security & Login Page (`/admin/login`)
- **Build:**
  - Create `src/lib/auth.ts` and `src/app/api/admin/auth/route.ts` implementing password authentication (`ADMIN_PASSWORD` in `.env.local`, defaulting to `gadex2026` in local dev) with an HTTP-Only cookie (`gadex_admin_session`).
  - Protect `/api/admin/content` (`PUT`/`POST`) and `/admin` routes so unauthenticated visitors are redirected to `/admin/login`.
  - Build `src/app/admin/login/page.tsx` featuring the `<GadexLogo />`, dark `#111111` architectural card, password visibility toggle, error shake animation, and burnt orange `#E84511` login button.
- **Test, Debug & Fix:**
  - Test logging in with a wrong password (verify error message), logging in with `gadex2026` (verify redirect to `/admin`), and logging out.
  - Run `npx tsc --noEmit` and `npm run lint`.

### STAGE 4: Admin Control Center Shell, Sidebar, Top Action Bar & Overview Dashboard (`/admin`)
- **Build:**
  - Build `src/components/admin/AdminSidebar.tsx`, `src/components/admin/AdminHeader.tsx`, and `src/components/admin/editors/OverviewTab.tsx` inside `src/app/admin/page.tsx`.
  - Include a live status badge (`"SYNCED"` vs `"UNSAVED CHANGES"`), a global `"SAVE ALL CHANGES"` button (`#E84511`), `"VIEW LIVE SITE ↗"`, and quick metric cards showing counts of Projects, Services, Articles, Testimonials, and FAQs.
- **Test, Debug & Fix:**
  - Verify desktop sidebar and mobile drawer responsiveness at `http://localhost:3005/admin`.
  - Run `npx tsc --noEmit` and `npm run lint`.

### STAGE 5: Media & Image Upload Pipeline (`/api/admin/upload` & `<ImageUploaderModal />`)
- **Build:**
  - Create `src/app/api/admin/upload/route.ts` allowing the admin to upload PNG/JPG/WebP images from their computer (processed and saved into `public/assets/uploads/` via `sharp` or native `fs/promises`) OR paste any external/Unsplash image URL, OR trigger the portrait background-removal script.
  - Build a reusable `<ImageFieldPicker label="..." value={...} onChange={...} />` component with live image preview, file upload button, and URL input box.
- **Test, Debug & Fix:**
  - Test uploading an image and pasting an image URL inside `/admin`, verifying immediate preview rendering and zero 404 errors.
  - Run `npx tsc --noEmit` and `npm run lint`.

### STAGE 6: Core Identity, Hero Section & Contact Info Editor (`IdentityHeroTab.tsx`)
- **Build:**
  - Build `src/components/admin/editors/IdentityHeroTab.tsx` allowing visual editing of:
    - `firstName` (`SAMUEL`), `displayName` (`BigSam`), `brandName` (`Gadex®`), `footerWordmark`, `role` (`Full-Stack Engineer`), `copyrightYear` (`2026`)
    - `heroTagline`, `shortBio`, `philosophyHeadline` (`black` & `gray`), `philosophySubtext`
    - `email`, `phone`, `phoneRaw`, `location`, `officeHours`, `bookingUrl` (WhatsApp link builder)
    - Image pickers for `heroPortrait`, `avatarImage`, `impactPortrait`, `gadexLogo`
    - `heroFeaturedProject` (`title`, `category`, `image`, `link`)
    - Dynamic list editor for `socialLinks` (Add, Edit, Delete social platforms).
- **Test, Debug & Fix:**
  - Edit the Hero Tagline in `/admin`, click Save, verify `/` reflects the change immediately, then restore.
  - Run `npx tsc --noEmit` and `npm run lint`.

### STAGE 7: Live Metrics Counters & Client Logo Marquee Editor (`StatsClientsTab.tsx`)
- **Build:**
  - Build `src/components/admin/editors/StatsClientsTab.tsx` to edit:
    - All counter numbers & suffixes (`projectsCompleted: 5+`, `happyClients: 10+`, `yearsExperience: 4+`, `clientSatisfaction: 98%`, `globalClients: 12`, `trustBadgeCount`).
    - The `clientLogos` array (add new client brand names, rename, reorder up/down, or delete) powering both the Home Marquee and the `/about` 3x5 Checkerboard Grid.
- **Test, Debug & Fix:**
  - Test updating a stat counter and adding/reordering a client logo in `/admin`.
  - Run `npx tsc --noEmit` and `npm run lint`.

### STAGE 8: Full CRUD & Reorder Manager for Services (`ServicesEditorTab.tsx`)
- **Build:**
  - Build `src/components/admin/editors/ServicesEditorTab.tsx` allowing Samuel to:
    - Add a new Service, delete an existing Service, or move Services up/down (automatically recalculating index numbers `001`, `002`, `003`...).
    - Edit Service `title`, `description`, `link`, `image` (via `<ImageFieldPicker />`), and interactively add/remove/edit the 5 skill pill `tags`.
- **Test, Debug & Fix:**
  - Test editing a service's skill tags and reordering rows; verify both Home (`ServicesSection`) and `/services` reflect the updates.
  - Run `npx tsc --noEmit` and `npm run lint`.

### STAGE 9: Full CRUD, Layout Selector & Reorder Manager for Portfolio Projects (`ProjectsEditorTab.tsx`)
- **Build:**
  - Build `src/components/admin/editors/ProjectsEditorTab.tsx` allowing Samuel to:
    - Create, edit, reorder, and delete portfolio projects.
    - Edit `title`, `category` (`/Full-Stack`, `/Web App`, `/Architecture`, `/SaaS`, `/Backend`), live/GitHub `link`, `image` upload/URL, and select `layoutSize` (`medium-left`, `small-right`, `full-wide`, `small-left`, `medium-right`).
- **Test, Debug & Fix:**
  - Test editing a project card and verify the asymmetric grid on `/` updates cleanly.
  - Run `npx tsc --noEmit` and `npm run lint`.

### STAGE 10: Process Steps, Bento Grid, Pricing Tiers & Testimonials Editor (`ProcessBentoTab.tsx` & `PricingReviewsTab.tsx`)
- **Build:**
  - Build `ProcessBentoTab.tsx`: Edit the 4 dark Process Cards (`step`, `title`, `description`, `icon` selector: `"sparkle" | "asterisk" | "bolt" | "plus"`).
  - Build `PricingReviewsTab.tsx`:
    - Edit both Pricing Tiers (`monthly` and `projectBased`): `packageTitle`, `badge`, `price`, `unit`, `deliveryTime`, `revisions`, `techStack`, and the 6 bullet `features`.
    - Full CRUD (Add, Edit, Reorder, Delete) for Client `testimonials` (`name`, `role`, `avatar`, `rating`, `quote`).
- **Test, Debug & Fix:**
  - Test changing the Project-Based price in `/admin`, save, and verify the interactive Pricing Toggle on `/`.
  - Run `npx tsc --noEmit` and `npm run lint`.

### STAGE 11: About Page (Achievements & Career) + Articles & FAQ CRUD (`AboutCareerTab.tsx` & `ArticlesFaqTab.tsx`)
- **Build:**
  - Build `AboutCareerTab.tsx`: Full CRUD for the 4 dark `achievements` cards (`title`, `organization`, `year`) and `career` timeline items (`company`, `period`, `image`).
  - Build `ArticlesFaqTab.tsx`:
    - Full CRUD for Blog `articles` (`title`, `excerpt`, `category`, `author`, `date`, `image`).
    - Full CRUD & Reorder for the 6 expandable `faqs` (`question`, `answer`).
- **Test, Debug & Fix:**
  - Test adding/editing an Article and an FAQ item; verify `/articles`, `/about`, and `/contact` reflect the changes.
  - Run `npx tsc --noEmit` and `npm run lint`.

### STAGE 12: JSON Backup/Restore, Code Export Generator & Final Production QA
- **Build:**
  - Add 3 power-tools inside the Admin Header & Overview Tab:
    1. **"Download Backup (`cms-backup.json`)"**: Exports the entire portfolio state as a downloadable JSON file.
    2. **"Import / Restore JSON"**: Restores the portfolio from any backup JSON file.
    3. **"Sync & Export TypeScript (`portfolioData.ts`)"**: Automatically writes the latest CMS changes directly back into `src/data/portfolioData.ts` as clean TypeScript code so git commits always stay 100% in sync with visual edits made in `/admin`!
- **Final E2E Audit:**
  - Run `npx tsc --noEmit`, `npm run lint`, and `npm run build`.
  - Test the complete Admin workflow across Desktop and Mobile viewports and push to GitHub `main`.
