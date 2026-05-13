# Site Overhaul Plan
**thomaswesleyb.github.io** — Branch: `overhaul`

This document specifies a complete overhaul of the personal website. It is written for a Claude
instance executing the changes without prior conversation context. Read the entire document before
making any changes. The sections are ordered to build understanding; implementation order is given
at the end.

---

## 1. Who This Site Is For

**T. Wesley Bailey** is a technical geopolitical intelligence analyst. His profile is unusual because
he sits at the intersection of two disciplines that rarely overlap: rigorous software engineering and
applied geopolitical analysis focused on Russian and Eurasian security.

Key facts from the current codebase:
- Johns Hopkins SAIS MA student, International Relations — AI Policy and National Security track
- Russian Language Intern at CSIS (Center for Strategic and International Studies) — conducting
  open-source Russian-language research for a government client
- Former Software Engineer 2 at Cvent (2022–2025) — built and fine-tuned an AI writing assistant,
  developed RAG-based AI consumer rendering for a virtual concierge, worked on multi-language
  platform
- Undergraduate at Sewanee: The University of the South — Computer Science + Russian (2018–2022)
- Built russianidioms.com — a database app for Russian idioms with user submission and study features

**The audience** for this site: government clients, think tanks, research institutions, defense
contractors, academic collaborators, and potential employers in the national security / intelligence
space who will judge credibility quickly. The site needs to establish Wesley as analytically rigorous
and technically credible — not as a job-seeker or student.

**Tone**: Precise, substantive, understated. No startup energy, no motivational copy, no "I'm
passionate about." Describe what he does and can do, not how he feels about it.

---

## 2. Current Codebase State

**Stack**: React 18 + TypeScript + Vite + Tailwind CSS 3 + react-router-dom 7

```
thomaswesleyb.github.io/
├── .github/workflows/gh-pages.yml     # Active deployment workflow (keep, fix pins)
├── github/workflows/deploy.yml        # ORPHANED — wrong dir, delete this entire directory
├── index.html                         # Minimal, missing all SEO meta
├── package.json
├── vite.config.ts                     # Minimal, no build optimization
├── tailwind.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── eslint.config.js
├── public/
│   └── vite.svg                       # Default Vite favicon, replace
├── src/
│   ├── App.tsx                        # Router shell, 5 routes
│   ├── main.tsx                       # ReactDOM.createRoot, StrictMode
│   ├── vite-env.d.ts
│   ├── App.css                        # Empty, delete
│   ├── styles/
│   │   └── index.css                  # Tailwind directives + global CSS
│   ├── assets/
│   │   └── russianidioms.png          # 108 KB at 1978×1813px, needs optimization
│   ├── components/
│   │   ├── Navbar.tsx                 # Has invisible mobile button bug
│   │   └── Footer.tsx                 # Dead Twitter link, wrong year
│   └── pages/
│       ├── Home.tsx                   # "Hello I'm Wesley" hero
│       ├── About.tsx                  # Single paragraph
│       ├── Projects.tsx               # One project card
│       ├── Experience.tsx             # react-vertical-timeline-component, @ts-ignore
│       └── Contact.tsx                # Broken form (empty handleSubmit)
```

---

## 3. Site Architecture

### Navigation

Keep the 5-page SPA structure. Rename one route:

| Current label | New label | Route     |
|---------------|-----------|-----------|
| Home          | Home      | `/`       |
| About         | About     | `/about`  |
| Projects      | Work      | `/work`   |
| Experience    | Experience| `/experience` |
| Contact       | Contact   | `/contact`|

Update the route path in `App.tsx` from `/projects` to `/work` and rename `Projects.tsx` to
`Work.tsx`. Update all `<Link to="/projects">` references to `/work`.

### New Components Needed

- `src/components/Timeline.tsx` — custom timeline to replace `react-vertical-timeline-component`
- `src/components/MetaTags.tsx` — dynamic `<head>` tags using `react-helmet-async`
- `src/components/WorkCard.tsx` — card for Work page items (projects + research)

---

## 4. Design System

The current pure-black (#000000) design is close to right but feels unfinished. Refine rather than
replace. The aesthetic should suggest analytical precision — structured, readable, with deliberate
use of monospace for metadata.

### Color Palette

Define these as CSS custom properties in `src/styles/index.css` and as Tailwind extensions in
`tailwind.config.js`. Do not hardcode hex values in component files.

```
--color-bg:          #0a0a0a    /* near-black, main background */
--color-surface:     #111111    /* slightly lighter, cards/panels */
--color-border:      #1e1e1e    /* subtle borders */
--color-text:        #e2e8f0    /* primary text (slate-200 equivalent) */
--color-muted:       #64748b    /* secondary text (slate-500 equivalent) */
--color-accent:      #3b82f6    /* blue-500 — links, interactive elements */
--color-accent-dim:  #1d4ed8    /* blue-700 — hover states */
```

In `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      bg: '#0a0a0a',
      surface: '#111111',
      border: '#1e1e1e',
      'text-primary': '#e2e8f0',
      'text-muted': '#64748b',
      accent: '#3b82f6',
    }
  }
}
```

### Typography

Keep Inter (already in use). Add **JetBrains Mono** for metadata, dates, labels, and technical
callouts. Load it from Google Fonts — add the `<link>` tags to `index.html`.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Apply in CSS:
```css
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
}
```

Add a Tailwind utility class `font-mono` mapped to `var(--font-mono)` via the config.

Use `font-mono` for: dates, role/institution labels in timeline, metadata tags, any numerical data.

### Spacing and Layout

- Max content width: `max-w-4xl` (896px) centered — narrower than current for better readability
- Section vertical padding: `py-20` on desktop, `py-12` on mobile
- Section top border: a single `1px solid var(--color-border)` line to divide sections
- No decorative flourishes, gradients, or background patterns

### Interaction

Links and interactive elements: `color: var(--color-accent)`, `transition-colors duration-150`.
No color flash, no heavy animations. Hover states only — no scroll animations or entrance effects.

---

## 5. Bug Fixes (Required — Do All of These)

These are correctness and security fixes. Do not skip any.

### 5.1 Delete orphaned workflow directory

```
Delete: /github/   (the entire directory at repo root — it is NOT .github/)
```

This directory has no effect (wrong location) and is misleading.

### 5.2 Fix all external links — add rel="noopener noreferrer"

Every `<a target="_blank">` in the codebase must have `rel="noopener noreferrer"`. Affected files:
- `src/components/Footer.tsx` — LinkedIn, GitHub links
- `src/pages/Experience.tsx` — all institution links
- `src/pages/Work.tsx` (renamed from Projects.tsx) — russianidioms.com link

### 5.3 Fix invisible mobile menu button

`src/components/Navbar.tsx:12` — change `text-black` to `text-white`.

### 5.4 Remove @ts-ignore from Experience.tsx

The `react-vertical-timeline-component` library is being removed entirely (see Section 6.1). The
`@ts-ignore` goes away with it.

### 5.5 Remove unused prop-types dependency

Run: `npm uninstall prop-types`

### 5.6 Delete empty App.css

Delete `src/App.css`. Remove its import from any file that imports it (there are none currently,
but verify).

### 5.7 Fix footer copyright year

`src/components/Footer.tsx:4` — change `2024` to `2025`.

### 5.8 Remove dead Twitter link

`src/components/Footer.tsx:8` — remove the Twitter `<a>` element entirely.

### 5.9 Close mobile menu on navigation

`src/components/Navbar.tsx` — add `onClick={() => setIsOpen(false)}` to each `<Link>` in the
mobile menu (`ul.md:hidden`).

### 5.10 Add Escape key handler to mobile menu

In `Navbar.tsx`, add a `useEffect` that listens for `keydown` on `Escape` and calls
`setIsOpen(false)`. Clean up the listener on unmount.

### 5.11 Add ARIA attributes to mobile menu button

The hamburger `<button>` needs:
```tsx
aria-label={isOpen ? 'Close menu' : 'Open menu'}
aria-expanded={isOpen}
aria-controls="mobile-menu"
```
The mobile `<ul>` needs `id="mobile-menu"`.

### 5.12 Fix global CSS link focus style

`src/styles/index.css:40-43` — the current rule applies an outline on `:hover` which is wrong
(outlines are for focus). Fix:

```css
a:hover {
  color: var(--color-accent-dim);
}

a:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 2px;
}
```

### 5.13 Remove unused h1 CSS rule

`src/styles/index.css:67-70` — the `h1` rule and its media query are dead (no bare `<h1>` elements
exist; headings use Tailwind classes). Delete lines 67–76.

### 5.14 Add 404 page for GitHub Pages SPA routing

Create `public/404.html` with the standard GitHub Pages SPA redirect script:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script>
    // GitHub Pages SPA 404 redirect
    // Redirect paths like /about to /?/about so the SPA router can handle them
    const path = window.location.pathname;
    const query = window.location.search;
    const hash = window.location.hash;
    const redirectUrl = window.location.origin + '/?path=' +
      encodeURIComponent(path + query) + hash;
    window.location.replace(redirectUrl);
  </script>
</head>
<body></body>
</html>
```

And in `index.html`, add before the closing `</head>` the redirect handler:

```html
<script>
  // Handle GitHub Pages SPA redirect from 404.html
  (function() {
    const query = window.location.search;
    if (query.startsWith('?path=')) {
      const path = decodeURIComponent(query.slice(6));
      window.history.replaceState(null, '', path);
    }
  })();
</script>
```

---

## 6. Dependency Changes

### 6.1 Remove react-vertical-timeline-component

This library adds ~25KB to the bundle, requires `@ts-ignore`, and its visual style doesn't match
the new design direction. Replace with a custom `Timeline` component (spec in Section 8.3).

```
npm uninstall react-vertical-timeline-component
```

Remove from `Experience.tsx`:
```tsx
// @ts-ignore
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
```

### 6.2 Add react-helmet-async

For per-page `<title>` and meta tags.

```
npm install react-helmet-async
```

Wrap `<App>` in `<HelmetProvider>` in `src/main.tsx`:

```tsx
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
```

### 6.3 No other new dependencies

Do not add animation libraries, UI component libraries, icon libraries, or charting libraries.
Use inline SVGs for any icons needed. Tailwind covers all styling needs.

---

## 7. SEO and Metadata

### 7.1 index.html

Replace the current minimal `<head>` with:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0a0a0a" />

  <!-- Default meta (overridden per page by react-helmet-async) -->
  <title>T. Wesley Bailey</title>
  <meta name="description" content="Technical geopolitical intelligence analyst specializing in Russian and Eurasian security, open-source intelligence, and AI applications in national security." />
  <meta name="author" content="T. Wesley Bailey" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="T. Wesley Bailey" />
  <meta property="og:description" content="Technical geopolitical intelligence analyst specializing in Russian and Eurasian security, OSINT, and AI in national security." />
  <meta property="og:url" content="https://thomaswesleyb.github.io" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Favicon (replace vite.svg) -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <!-- SPA redirect handler -->
  <script>
    (function() {
      const query = window.location.search;
      if (query.startsWith('?path=')) {
        const path = decodeURIComponent(query.slice(6));
        window.history.replaceState(null, '', path);
      }
    })();
  </script>
</head>
```

### 7.2 MetaTags component

Create `src/components/MetaTags.tsx`:

```tsx
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title: string;
  description: string;
  path: string;
}

const BASE_URL = 'https://thomaswesleyb.github.io';
const SITE_TITLE = 'T. Wesley Bailey';

export function MetaTags({ title, description, path }: MetaTagsProps) {
  const fullTitle = `${title} | ${SITE_TITLE}`;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
```

Add `<MetaTags>` to every page component (specs in Section 9).

### 7.3 robots.txt and sitemap

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://thomaswesleyb.github.io/sitemap.xml
```

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://thomaswesleyb.github.io/</loc><priority>1.0</priority></url>
  <url><loc>https://thomaswesleyb.github.io/about</loc><priority>0.9</priority></url>
  <url><loc>https://thomaswesleyb.github.io/work</loc><priority>0.8</priority></url>
  <url><loc>https://thomaswesleyb.github.io/experience</loc><priority>0.8</priority></url>
  <url><loc>https://thomaswesleyb.github.io/contact</loc><priority>0.6</priority></url>
</urlset>
```

### 7.4 Favicon

Replace `public/vite.svg` with a `public/favicon.svg`. The favicon should be a simple
monogram — "WB" in Inter, white on transparent background. Use a minimal SVG like:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#0a0a0a"/>
  <text x="16" y="22" font-family="Inter,sans-serif" font-size="14" font-weight="700"
    fill="#e2e8f0" text-anchor="middle">WB</text>
</svg>
```

---

## 8. Component Rewrites

### 8.1 Navbar.tsx — Full Rewrite

**Current problems**: invisible mobile button, no ARIA, no Escape handler, empty brand name,
links don't close mobile menu.

**New behavior**:
- Brand: "WB" monogram text (or initials) linking to `/`
- Desktop: right-aligned nav links
- Mobile: hamburger with proper ARIA, Escape key close, links close menu on click
- Active route highlighted (use `useLocation` + check `pathname`)
- Sticky: `position: sticky; top: 0; z-index: 50` with slight backdrop blur
- No border bottom — the dark background is enough separation

**Structure**:
```tsx
<nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-border">
  <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
    <Link to="/" className="font-mono text-sm text-text-muted hover:text-text-primary transition-colors">
      twesleyb
    </Link>
    {/* Desktop links */}
    <ul className="hidden md:flex gap-8">
      {/* NavLink items */}
    </ul>
    {/* Mobile hamburger + drawer */}
  </div>
</nav>
```

Brand text: use the string `twesleyb` in `font-mono` — this is the GitHub username and reinforces
the technical identity. Style it as muted, not the same visual weight as the nav links.

Nav links: `Home`, `About`, `Work`, `Experience`, `Contact`. Active state: `text-text-primary`
(bright); inactive: `text-text-muted`; hover: `text-text-primary transition-colors`.

### 8.2 Footer.tsx — Full Rewrite

**Remove**: Twitter link, "All rights reserved" (unnecessary for personal site).
**Add**: Email link (use `mailto:` — no address revealed in this document; use a placeholder that
  the user can fill in, marked with a `// TODO:` comment).

**New structure**:
```tsx
<footer className="border-t border-border mt-auto">
  <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
    <p className="font-mono text-xs text-text-muted">
      © {new Date().getFullYear()} T. Wesley Bailey
    </p>
    <div className="flex gap-6">
      <a href="https://www.linkedin.com/in/bailey-wesley/"
         target="_blank" rel="noopener noreferrer"
         className="text-text-muted hover:text-text-primary transition-colors text-sm">
        LinkedIn
      </a>
      <a href="https://github.com/thomaswesleyb"
         target="_blank" rel="noopener noreferrer"
         className="text-text-muted hover:text-text-primary transition-colors text-sm">
        GitHub
      </a>
      {/* TODO: add email link when address confirmed */}
    </div>
  </div>
</footer>
```

### 8.3 Timeline.tsx — New Component (replaces react-vertical-timeline-component)

A minimal vertical timeline. Left side: date range in `font-mono text-xs text-text-muted`.
Right side: role, institution (linked), description.

```tsx
interface TimelineEntry {
  period: string;
  role: string;
  institution: string;
  institutionUrl: string;
  bullets: string[];
}

interface TimelineProps {
  entries: TimelineEntry[];
}
```

Visual structure (each entry):
```
[period]    [role]
            [institution ↗]
            • bullet
            • bullet
```

Vertical line: `border-l border-border` running down the left of the content column.
Each entry connected with a small dot: `w-2 h-2 rounded-full bg-accent`.

No animation, no colored cards, no shadows. Just clean typographic hierarchy.

### 8.4 WorkCard.tsx — New Component

A card for the Work page. Two types of work: **software** and **research**. Both use the same card
component with a `type` prop that affects a small label tag.

```tsx
interface WorkCardProps {
  type: 'software' | 'research';
  title: string;
  description: string;
  tags: string[];          // e.g. ['OSINT', 'Python', 'Russian']
  href?: string;           // external link if applicable
  imageUrl?: string;       // optional screenshot/thumbnail
  imageAlt?: string;
}
```

Card structure:
- Optional image at top (if `imageUrl`, show it with `loading="lazy" decoding="async"`)
- Small type badge: `font-mono text-xs` pill — `text-accent bg-accent/10`
- Title + optional external link icon
- Description paragraph
- Tag chips in `font-mono text-xs text-text-muted`

---

## 9. Page Rewrites

### 9.1 Home.tsx — Full Rewrite

The hero should establish identity immediately without being verbose.

```tsx
<MetaTags
  title="Home"
  description="T. Wesley Bailey — technical geopolitical intelligence analyst specializing in Russian and Eurasian security, OSINT, and AI applications in national security."
  path="/"
/>
<section className="min-h-screen flex flex-col justify-center max-w-4xl mx-auto px-6">
  <p className="font-mono text-sm text-text-muted mb-4">
    T. Wesley Bailey
  </p>
  <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight mb-6">
    Technical geopolitical<br />intelligence analyst
  </h1>
  <p className="text-text-muted text-lg max-w-xl leading-relaxed mb-8">
    Bridging software engineering and open-source intelligence. Focused on Russian and Eurasian
    security, AI applications in national security, and language-enabled analysis.
  </p>
  <div className="flex gap-4">
    <Link to="/work" className="...">View Work</Link>
    <Link to="/contact" className="...">Contact</Link>
  </div>
</section>
```

Button styles:
- Primary (`View Work`): `px-5 py-2.5 bg-accent text-white rounded text-sm font-medium hover:bg-accent-dim transition-colors`
- Secondary (`Contact`): `px-5 py-2.5 border border-border text-text-muted rounded text-sm font-medium hover:text-text-primary hover:border-text-muted transition-colors`

No background image, no gradient, no animated text. Let the typography carry the page.

### 9.2 About.tsx — Full Rewrite

Two sections: a brief bio and a skills/expertise breakdown.

**Meta**:
```tsx
<MetaTags
  title="About"
  description="Background and expertise of T. Wesley Bailey — CSIS researcher, SAIS MA candidate, and former software engineer with Russian language capability."
  path="/about"
/>
```

**Bio paragraph** (rewrite from scratch — current is too generic):

> T. Wesley Bailey is an MA candidate at the Johns Hopkins School of Advanced International Studies,
> concentrating in AI Policy and National Security. He is concurrently a Russian Language Intern at
> the Center for Strategic and International Studies, where he conducts open-source intelligence
> research in Russian for a U.S. government client.
>
> His prior work as a Software Engineer at Cvent included building AI writing assistants and
> RAG-based consumer interfaces, giving him practical experience with the systems he now analyzes
> in a policy context. He holds a BA in Computer Science and Russian from Sewanee: The University
> of the South.

**Expertise areas** — display as a clean 2×N grid of labeled items. Each item: a short label and
one-line description. Use `font-mono` for labels.

| Label | Description |
|-------|-------------|
| `OSINT` | Open-source intelligence in Russian and English |
| `AI & ML` | Language models, RAG systems, writing assistants |
| `Russian Language` | Professional working proficiency |
| `National Security Policy` | AI governance, Eurasian security, irregular warfare |
| `Software Engineering` | TypeScript, Python, React, distributed systems |
| `Data Analysis` | Structured analysis of unstructured text sources |

Render as a grid, not a list. No icons. Labels in `font-mono text-xs text-accent`, descriptions in
`text-sm text-text-muted`.

### 9.3 Work.tsx — New (replaces Projects.tsx)

This page presents both software projects and research/analytical work under one umbrella. Keep the
URL at `/work` (updated from `/projects`).

**Meta**:
```tsx
<MetaTags
  title="Work"
  description="Selected software projects and research by T. Wesley Bailey."
  path="/work"
/>
```

**Section header**: "Work" with a subtitle: "Selected software and research"

**Current project to carry forward**:
- **Russian Idioms** — type: `software`, link: https://russianidioms.com
  - Tags: `['Russian', 'TypeScript', 'Full-Stack']`
  - Description: "A database application for Russian idiomatic expressions. Users can submit new
    idioms, study existing ones, and build personal collections."
  - Image: `russianidioms.png` — optimize this image before use (see Section 10)

**Placeholder for research work** (add a card but mark it clearly):
Leave a commented-out `WorkCard` with a note:
```tsx
{/* TODO: Add research/analytical work cards as projects develop */}
```

Do not fabricate research outputs. If there's nothing to show yet, a single well-presented software
project is better than invented content.

### 9.4 Experience.tsx — Full Rewrite

Remove `react-vertical-timeline-component`. Use the new `Timeline` component.

**Meta**:
```tsx
<MetaTags
  title="Experience"
  description="Professional and academic background of T. Wesley Bailey."
  path="/experience"
/>
```

**Timeline data** — hardcode as a typed array in the component:

```tsx
const entries: TimelineEntry[] = [
  {
    period: '2025 – present',
    role: 'Russian Language Intern',
    institution: 'Center for Strategic and International Studies',
    institutionUrl: 'https://www.csis.org/programs/warfare-irregular-threats-and-terrorism-program',
    bullets: [
      'Conducts open-source Russian-language intelligence research for a U.S. government client',
      'Supports the Warfare, Irregular Threats, and Terrorism Program',
    ],
  },
  {
    period: '2025 – present',
    role: 'MA Candidate, International Relations',
    institution: 'Johns Hopkins School of Advanced International Studies',
    institutionUrl: 'https://sais.jhu.edu/',
    bullets: [
      'Concentration: AI Policy and National Security',
    ],
  },
  {
    period: '2022 – 2025',
    role: 'Software Engineer II',
    institution: 'Cvent, Inc.',
    institutionUrl: 'https://www.cvent.com/',
    bullets: [
      'Developed and fine-tuned an AI writing assistant for event marketing',
      'Built consumer rendering layer for a RAG-based AI virtual concierge',
      'Worked on multi-language platform and sessions/speakers product',
    ],
  },
  {
    period: '2018 – 2022',
    role: 'BA, Computer Science and Russian',
    institution: 'Sewanee: The University of the South',
    institutionUrl: 'https://new.sewanee.edu/',
    bullets: [],
  },
];
```

### 9.5 Contact.tsx — Full Rewrite

**Current problem**: `handleSubmit` is empty. On a static GitHub Pages site, form submission
requires either a third-party form service or a mailto link. Use **Formspree** (free tier, no
backend required).

**Implementation**:
1. Create a free account at formspree.io and create a form. The form endpoint will be
   `https://formspree.io/f/{form_id}`. Mark this endpoint as a `TODO` in the code.
2. Use the native HTML `<form action="..." method="POST">` approach (no JavaScript required for
   basic submission). Add `data-netlify` is NOT needed since this is GitHub Pages.
3. For a better UX, use the Formspree React hook `@formspree/react` — but do NOT add this as a
   dependency to avoid supply chain risk on a minimal site. Instead, use a simple `fetch()` call
   with the standard Formspree JSON API.

**Meta**:
```tsx
<MetaTags
  title="Contact"
  description="Get in touch with T. Wesley Bailey."
  path="/contact"
/>
```

**Form implementation pattern** (controlled React component):

```tsx
type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormState>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('https://formspree.io/f/REPLACE_WITH_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };
  // ...
}
```

**Form fields**: Each input must have an associated `<label>` with matching `htmlFor` / `id`.
Style labels as `font-mono text-xs text-text-muted uppercase tracking-wide mb-1`.

**Form states**:
- `idle`: Show the form
- `submitting`: Disable button, show "Sending…" text
- `success`: Hide form, show: "Message received. I'll follow up shortly."
- `error`: Keep form, show error message below button

**Alternative to Formspree**: If the user prefers not to use a third-party service, remove the
form entirely and replace with a direct mailto instruction:
```tsx
<p>Contact me directly at <a href="mailto:TODO@example.com">TODO@example.com</a></p>
```
Mark the email address as `TODO`.

**Form input styling** (consistent across all inputs):
```
w-full px-3 py-2 bg-surface border border-border rounded text-text-primary
text-sm placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent
```

---

## 10. Asset Optimization

### russianidioms.png

The existing `src/assets/russianidioms.png` is 108 KB at 1978×1813px. It is displayed at ~400px
wide maximum. Optimization steps:

1. Resize to 800×800px max (sufficient for 2× retina at 400px display)
2. Convert to WebP format
3. Keep original PNG as fallback
4. Use `<picture>` in `WorkCard.tsx`:

```tsx
<picture>
  <source srcSet={imageUrl.replace('.png', '.webp')} type="image/webp" />
  <img src={imageUrl} alt={imageAlt} loading="lazy" decoding="async"
       className="w-full h-48 object-cover rounded-t" />
</picture>
```

Use `sharp` (Node CLI) or `squoosh` CLI to convert. Do not install sharp as a dependency — run
once as a dev command. Place the output in `src/assets/russianidioms.webp`.

If image conversion tooling is not available in the environment, note the requirement in a
`// TODO:` comment and proceed with the existing PNG, but add `loading="lazy" decoding="async"`.

---

## 11. Vite Config

Update `vite.config.ts` for production optimization:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
        },
      },
    },
  },
});
```

---

## 12. Global CSS Cleanup

Replace the contents of `src/styles/index.css` with a clean version:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
  --color-bg: #0a0a0a;
  --color-surface: #111111;
  --color-border: #1e1e1e;
  --color-text: #e2e8f0;
  --color-muted: #64748b;
  --color-accent: #3b82f6;
  --color-accent-dim: #1d4ed8;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

a:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 2px;
}

button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

Note: Remove the Vite default `button` styles (background, border, hover effects) — Tailwind
handles button styling per-component.

---

## 13. App.tsx Changes

1. Update `import Experience from "./pages/Experience.tsx"` — remove the `.tsx` extension
   (non-standard, TypeScript resolves without it)
2. Change `/projects` route to `/work` and import `Work` instead of `Projects`
3. Add `import 'src/styles/index.css'` at top if not already imported elsewhere
   (check `main.tsx` — it should be there)

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-bg">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
```

---

## 14. GitHub Actions Workflow

The active workflow at `.github/workflows/gh-pages.yml` uses unpinned action tags (`@v4`).
Per security best practices, pin to full commit SHAs. Look up current SHAs for:
- `actions/checkout`
- `actions/setup-node`
- `actions/configure-pages`
- `actions/upload-pages-artifact`
- `actions/deploy-pages`

Use the `gh` CLI or GitHub API to get the current SHA for each action's latest tag, then update the
workflow with pinned SHAs and version comments:

```yaml
uses: actions/checkout@<full-sha>  # v4
```

Also upgrade the workflow to Node 22 (current LTS):
```yaml
node-version: 22
```

Remove the `run: ls` debug step (line 34 in current file) — it serves no purpose in CI.

---

## 15. TypeScript Config

In `tsconfig.app.json`, ensure these are set:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true
  }
}
```

These flags are consistent with the project's TypeScript standards and the existing `strict: true`
in the tsconfig. Enabling them may surface type errors in the existing code — fix any that appear
rather than suppressing them.

---

## 16. Items That Require User Input

The following cannot be completed without information from the user. Mark each with a `// TODO:`
comment pointing to this section:

1. **Contact form endpoint**: Formspree form ID — user must create a Formspree account and paste
   the form ID. Comment: `// TODO: Replace REPLACE_WITH_FORM_ID with Formspree form ID (see docs/overhaul.md §16)`

2. **Email address**: For footer and/or contact page alternative. Comment: `// TODO: Add email address`

3. **Research/analytical work**: The Work page has a placeholder. As research outputs accumulate
   (papers, analyses, briefs, OSINT reports), they should be added as `WorkCard` entries with
   `type="research"`.

4. **Twitter/X handle**: If the user has or creates an account, add it to the footer. Currently
   omitted.

5. **Profile photo**: Optional but useful for the About page. If provided, add a small circular
   headshot to the About page header. Do not add a placeholder.

---

## 17. What NOT To Do

These are explicitly out of scope and should be rejected even if they seem like improvements:

- **No dark/light mode toggle** — the site is dark-only; a toggle adds complexity for no benefit
  given the persona
- **No scroll animations or entrance effects** — they reduce perceived performance and don't fit
  the analytical tone
- **No particle backgrounds, gradient meshes, or decorative SVGs** — visual noise
- **No blog/CMS integration** — out of scope; if writing becomes a major feature it warrants its
  own planning
- **No analytics** — do not add Google Analytics, Plausible, or any tracking without explicit
  user approval
- **No PWA/service worker** — unnecessary complexity for a portfolio
- **No i18n** — site is English only
- **No UI component library** (shadcn, Radix, Headless UI) — Tailwind + custom components suffice
  for this site's complexity
- **No additional pages** beyond the 5 defined — do not create a `/writing`, `/publications`, or
  `/cv` page without explicit instruction
- **Do not invent content** — do not fabricate research papers, projects, certifications, or
  credentials. If a section needs content that isn't available, leave it empty with a `// TODO:` comment

---

## 18. Implementation Order

Execute in this sequence to minimize broken states:

1. **Delete orphaned files**: Remove `/github/` directory and `src/App.css`
2. **Dependency changes**: `npm uninstall prop-types react-vertical-timeline-component`,
   `npm install react-helmet-async`
3. **Global CSS**: Replace `src/styles/index.css`
4. **Tailwind config**: Add custom colors
5. **index.html**: Full replacement with SEO meta + font links + SPA handler
6. **public/**: Add `favicon.svg`, `robots.txt`, `sitemap.xml`, `404.html`
7. **main.tsx**: Wrap with `HelmetProvider`
8. **MetaTags component**: Create `src/components/MetaTags.tsx`
9. **Timeline component**: Create `src/components/Timeline.tsx`
10. **WorkCard component**: Create `src/components/WorkCard.tsx`
11. **Navbar**: Full rewrite including all bug fixes (§5.3, §5.9, §5.10, §5.11)
12. **Footer**: Full rewrite (§5.7, §5.8)
13. **Home page**: Full rewrite
14. **About page**: Full rewrite
15. **Work page**: Create (rename from Projects), apply §5.2 fix
16. **Experience page**: Full rewrite using Timeline component, remove @ts-ignore
17. **Contact page**: Full rewrite with functional form
18. **App.tsx**: Update routes
19. **Vite config**: Add build optimization
20. **TypeScript config**: Add strict flags, fix any surfaced errors
21. **GitHub Actions workflow**: Pin action SHAs, upgrade to Node 22
22. **Verification**: Run `npm run build` — must produce zero TypeScript errors and zero ESLint
    warnings before considering the work done

---

## 19. Acceptance Criteria

The overhaul is complete when all of the following are true:

- [ ] `npm run build` exits 0 with no TypeScript errors
- [ ] `npm run lint` exits 0 with no warnings
- [ ] No `@ts-ignore` or `@ts-nocheck` directives exist in source files
- [ ] All external `<a target="_blank">` links have `rel="noopener noreferrer"`
- [ ] Mobile menu button is visible and has correct ARIA attributes
- [ ] All form inputs have associated `<label>` elements
- [ ] Contact form submits to Formspree (or has clear `// TODO:` if endpoint not yet configured)
- [ ] `react-vertical-timeline-component` and `prop-types` are not in `package.json`
- [ ] `react-helmet-async` is in `package.json`
- [ ] `/work` route works; `/projects` route is gone
- [ ] `public/robots.txt`, `public/sitemap.xml`, `public/404.html` exist
- [ ] `index.html` has description, og:title, og:description meta tags
- [ ] Footer copyright year is dynamic (`new Date().getFullYear()`)
- [ ] No dead links (the Twitter `#` link is removed)
- [ ] The `/github/` orphan directory is deleted
