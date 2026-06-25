# Rx Challenger Website — Project Context

## What This Is

Rx Challenger is a **static HTML/CSS/JS website** (no framework, no build system) for a gamified healthcare learning platform. Hosted on GitHub Pages at `https://rxchallenger.github.io/`.

## Tech Stack

- **Pure static HTML** — 10 pages, hand-written (no templating)
- **CSS** — `critical.css` (inlined above-the-fold) + `design-system.css` (full design system, 33KB)
- **JS** — Single `app.js` (10KB, vanilla — no jQuery, no Bootstrap, no libraries)
- **Fonts** — Inter (Google Fonts, weights 400–900)
- **PWA** — `manifest.json` + `sw.js` (vanilla service worker, no Workbox)
- **Analytics** — Google Analytics (gtag.js, ID: `G-TPCC6T9RZ7`)
- **No package.json, no npm, no build step**

## Design System

Dark-first design aligned with IMC Hub (`https://imc-hub.github.io/`).

### Color Palette (CSS custom properties in `design-system.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-dark-950` | `#050507` | Page background |
| `--color-dark-900` | `#0a0a0f` | Section alt backgrounds |
| `--color-dark-800` | `#111118` | Card surfaces |
| `--color-dark-700` | `#1a1a24` | Card hover / elevated surfaces |
| `--color-gold` | `#f5a623` | Primary accent, CTAs, highlights |
| `--color-gold-light` | `#ffd080` | Gold hover state |
| `--color-text-primary` | `#f0f0f5` | Headings |
| `--color-text-secondary` | `#c8c8d0` | Body text |
| `--color-text-muted` | `#8888a0` | Meta text, subtitles |
| `--color-border` | `#2a2a3a` | Card/section borders |

### Typography

- **Font:** Inter (Google Fonts), weights 400–900
- **Hero h1:** clamp(2.25rem, 5vw, 3.5rem) / 800 weight
- **Section h2:** clamp(1.75rem, 3.5vw, 2.5rem) / 800 weight
- **Body:** 1rem / 1.75 line-height
- **Nav:** 0.9375rem / 500 weight

### Border Radius

`--radius-sm: 0.5rem` | `--radius-md: 0.75rem` | `--radius-lg: 1rem` | `--radius-xl: 1.5rem`

## File Structure

```
rxchallenger_website/
|-- CLAUDE.md                      # This file
|-- index.html                     # Homepage (hero, features, screenshots, benefits,
|                                  #   journey, audience, testimonials, FAQ, CTA)
|-- about.html                     # About page (mission, values)
|-- contact.html                   # Contact page (form + sidebar)
|-- privacy.html                   # Privacy policy
|-- terms.html                     # Terms & conditions
|-- disclaimer.html                # Disclaimer
|-- cookies.html                   # Cookie policy
|-- robots.txt                     # Crawler directives (GPTBot, ClaudeBot, AdsBot-Google)
|-- sitemap.xml                    # All pages + image sitemap
|-- manifest.json                  # PWA manifest (shortcuts: Features, FAQ, Blog)
|-- sw.js                          # Vanilla service worker
|-- offline.html                   # PWA offline fallback
|-- favicon.ico
|-- blog/
|   |-- index.html                 # Blog listing (3 post cards)
|   |-- prescription-abbreviations.html  # Sample article (TOC, reading progress, related)
|-- assets/
    |-- css/
    |   |-- critical.css           # Inlined above-the-fold CSS (7KB)
    |   |-- design-system.css      # Full design system (33KB)
    |-- js/
    |   |-- app.js                 # Vanilla JS (sticky header, reveal, mobile nav,
    |                              #   FAQ accordion, cookie consent, floating social,
    |                              #   PWA prompt, reading progress)
    |-- icons/
    |   |-- apple-touch-icon.png
    |   |-- favicon-32.png
    |   |-- icon-192.png
    |   |-- icon-512.png
    |   |-- icon-maskable.png
    |-- images/                     # PNG assets + .import files (Godot metadata)
```

## Page Structure (All Pages)

1. Skip link (`<a href="#main-content" class="skip-link">`)
2. Sticky header (`<header class="site-header">`) with brand mark + nav + menu-toggle
3. Mobile nav (`<div class="mobile-nav">`) — dialog with close button
4. `<main id="main-content">` with page content
5. Footer (`<footer class="site-footer" id="footer">`) with footer-grid (4 columns on desktop) + footer-bottom
6. Floating social (`<aside class="floating-social">`) — Instagram, Facebook, LinkedIn; visible only when footer is off-screen (IntersectionObserver)
7. Cookie banner (`<div class="cookie-banner">`) — Accept / Preferences / Decline; localStorage-based
8. PWA prompt (`<div class="pwa-prompt">`) — shown on `beforeinstallprompt` event
9. Scripts: `app.js` (deferred) + optional service worker registration

## Brand Markup

```html
<a href="/" class="brand" aria-label="Rx Challenger home">
  <span class="brand-mark" aria-hidden="true">Rx</span>
  Rx <span class="brand-accent">Challenger</span>
</a>
```

- `.brand-mark` — gold background square with "Rx" text
- `.brand-accent` — gold colored text

## Navigation

All pages share the same nav pattern:
```html
<nav class="nav" aria-label="Primary">
  <a href="/#features">Features</a>
  <a href="/#how">How it works</a>
  <a href="/#faq">FAQ</a>
  <a href="/blog/">Blog</a>
  <a href="/contact.html">Contact</a>
</nav>
```

Mobile nav includes a close button and a "Download Free" CTA.

## Homepage Sections (index.html)

1. **Hero** — Full-viewport, grid pattern bg, radial gold glow, h1 + subtitle + 2 CTAs + app screenshot SVG placeholder
2. **Features** (`#features`) — 6 cards in 3×2 grid with icons
3. **Screenshots** (`#screenshots`) — 3 phone mockup SVG placeholders
4. **Benefits** (`#how`) — 2-column layout with numbered steps
5. **Learning Journey** (`#journey`) — 4-step timeline with gold numbered dots
6. **Audience** (`#audience`) — 6 cards: Students, Graduates, Managers, Pharmacists, Interns, Schools
7. **Testimonials** (`#testimonials`) — 4 review cards with star ratings + author avatars
8. **FAQ** (`#faq`) — Accordion with 5 items (grid-template-rows: 0fr → 1fr pattern)
9. **CTA / Download** (`#download`) — "Download Free" with Google Play + Windows badges

## Subpage Pattern

All subpages (about, contact, privacy, terms, disclaimer, cookies) share:
- `.subpage-hero` section with breadcrumb nav
- `.section` > `.container` > `.prose` for legal pages (max-width: 48rem)
- `.section` > `.container` > `.grid-2` for contact page (form + sidebar)
- Same header/footer/floating-social/cookie-banner as homepage

## Blog System

- `blog/index.html` — Listing page with `.blog-card` items (3-column grid)
- `blog/post-slug.html` — Article template with:
  - `.subpage-hero` + breadcrumb
  - `.grid-2` layout: article body (`.article-body`) + sticky sidebar (`.toc`)
  - Reading progress bar (`.reading-progress`)
  - Related articles section (`.grid-3`)
  - JSON-LD `Article` schema

## Key Components

### Reveal-on-scroll
`.reveal` elements start at `opacity:0; transform:translateY(20px)` and transition to visible via IntersectionObserver. Delays: `.delay-100` through `.delay-500`.

### FAQ Accordion
Uses `details`/`summary` or `grid-template-rows: 0fr → 1fr` transition on `.faq-answer`.

### Cookie Consent
- `localStorage.getItem('cookie_consent')` stores `'accepted'` | `'declined'`
- Banner auto-hidden after choice
- Google Analytics only fires after consent

### Floating Social
- Hidden by default via `transform: translateY(100px)`
- IntersectionObserver on `#footer`: when footer leaves viewport, social bar slides up; when footer re-enters, it slides down

### PWA Install Prompt
- `beforeinstallprompt` event stores trigger, shows `.pwa-prompt` dialog
- "Install" button calls `prompt.prompt()`
- "Not now" and close buttons dismiss via `data-pwa-close`

### AdSense Placeholders
`.ad-slot` containers with dashed border min-height — ready for `data-ad-client` / `data-ad-slot` attributes. No actual AdSense IDs are inserted.

## SEO

- **JSON-LD** on every page: `SoftwareApplication`, `Organization`, `WebSite`, `WebPage`, `AboutPage`, `ContactPage`, `CollectionPage`, `Article`
- **OG tags:** type, url, title, description, image (325×325 PNG)
- **Twitter cards:** `summary_large_image`
- **Canonical URLs** on every page
- **robots.txt:** allows GPTBot, ClaudeBot, AdsBot-Google
- **sitemap.xml:** all page URLs + image sitemap annotation

## Accessibility

- Skip link to `#main-content`
- `aria-label` on nav, header icons, social links, cookie dialog
- `aria-current="page"` on active nav item
- `aria-expanded` on mobile menu toggle
- `prefers-reduced-motion` disables all transitions/animations
- Semantic HTML5: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- Color contrast ≥ 4.5:1 for body text

## Important Notes

- **`.import` files** in `assets/images/` are Godot engine metadata — do not delete
- **SVG sprite** is inlined in every page (single `<svg>` with `<defs>` containing `<symbol>` elements)
- **No actual AdSense IDs** are inserted — placeholder `.ad-slot` divs only
- **Blog links** to `pharmacy-exam-prep.html` and `new-graduate-tips.html` are intentional placeholders for future posts
- **App screenshots** are inline SVG placeholders — replace with real PNGs when available

## Deployment

- Hosted on GitHub Pages (`rxchallenger.github.io`)
- Push to `main` branch deploys automatically
- No build step — static files served directly

## Conventions for Future Changes

- Use CSS custom properties from `design-system.css` — don't hardcode colors
- Use `.reveal` class + Intersection Observer for scroll animations (no libraries)
- Maintain `prefers-reduced-motion` support for all animations
- Keep skip links and `aria-label` attributes for accessibility
- Preserve JSON-LD structured data when modifying page content
- Every page must include: mobile-nav, floating-social, cookie-banner, app.js
- Test mobile responsiveness at 820px (mobile nav breakpoint) and 480px
- Blog posts follow the `blog/post-slug.html` template pattern
