# Rx Challenger Website — Project Context

## What This Is

Rx Challenger is a **static HTML/CSS/JS website** (no framework, no build system) for a gamified healthcare learning platform. Hosted on GitHub Pages at `https://rxchallenger.github.io/`.

## Tech Stack

- **Pure static HTML** — 6 pages, hand-written (no templating)
- **CSS** — Bootstrap 4/5 grid + custom `theme.css` (27KB) + `stylesheet.css` (Inter font import)
- **JS** — jQuery 2.1.0, Owl Carousel, ScrollReveal, Waypoints, CounterUp, Popper.js
- **Fonts** — Inter (Google Fonts, all weights 100–900) — aligned with IMC Hub ecosystem
- **Analytics** — Google Analytics (gtag.js, ID: `G-TPCC6T9RZ7`)
- **No package.json, no npm, no build step**

## Design System (Post-June 2026 Redesign)

Dark-first design aligned with IMC Hub (`https://imc-hub.github.io/`).

### Color Palette (CSS custom properties in `theme.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#000000` | Page background |
| `--bg-secondary` | `#121212` | Section backgrounds |
| `--bg-card` | `#161616` | Card surfaces |
| `--bg-card-hover` | `#1e1e1e` | Card hover state |
| `--text-primary` | `#ffffff` | Headings |
| `--text-secondary` | `#a0a0a0` | Body text |
| `--text-muted` | `#666666` | Sub-footer, meta text |
| `--accent` | `#dc2626` | CTAs, highlights, active states |
| `--accent-hover` | `#ef4444` | Button hover |
| `--border` | `#2a2a2a` | Card/section borders |

### Typography

- **Font:** Inter (Google Fonts), weights 100–900
- **Hero h1:** 56px / 900 weight / -1px letter-spacing
- **Section h2:** 38px / 800 weight / -0.5px letter-spacing
- **Body:** 15px / 28px line-height
- **Nav:** 13px / uppercase / 1px letter-spacing

### Border Radius

`--radius-sm: 8px` | `--radius-md: 12px` | `--radius-lg: 16px` | `--radius-xl: 24px`

### Key CSS Classes

- `.reveal` / `.reveal.visible` — Scroll-triggered fade-in with Intersection Observer
- `.reveal-delay-1` through `.reveal-delay-5` — Staggered animation delays
- `.main-button` — Outlined red button (transparent bg, red border)
- `.main-button-slider` — Solid red button with glow shadow
- `.features-item` — Dark card with hover lift + red top border glow
- `.why-card` / `.audience-card` — Simpler dark cards with icon + text

## File Structure

```
rxchallenger_website/
|-- CLAUDE.md                  # This file
|-- index.html                 # Homepage (hero, features, why, journey, audience, testimonials, CTA)
|-- about.html                 # About page
|-- contact.html               # Contact page
|-- faq.html                   # FAQ (with FAQPage JSON-LD)
|-- privacypolicy.html         # Privacy policy (unchanged)
|-- terms.html                 # Terms (unchanged)
|-- robots.txt
|-- sitemap.xml
|-- app-ads.txt
|-- googlecebb3f7c60e5209f.html  # Google site verification
|-- favicon.ico
|-- download/
|   |-- rxchallenger v1.0.0.2.exe
|-- assets/
    |-- css/
    |   |-- theme.css          # MAIN stylesheet — all custom styles (27KB)
    |   |-- stylesheet.css     # Inter font @import only (168 bytes)
    |   |-- bootstrap.min.css  # Bootstrap framework
    |   |-- font-awesome.css   # Font Awesome icons
    |   |-- owl-carousel.css   # Carousel styles
    |   |-- flex-slider.css    # Included but unused
    |-- js/
    |   |-- custom.js          # Main JS — carousel, sticky nav, smooth scroll, Intersection Observer
    |   |-- jquery-2.1.0.min.js
    |   |-- bootstrap.min.js
    |   |-- popper.js
    |   |-- owl-carousel.js
    |   |-- scrollreveal.min.js
    |   |-- waypoints.min.js
    |   |-- jquery.counterup.min.js
    |   |-- imgfix.min.js
    |-- images/                 # All PNG assets + .import files (Godot metadata)
    |-- fonts/                  # Icon fonts (Flaticon, FontAwesome, FlexSlider, Slick)
```

## Page Structure (All Pages)

1. Skip link (`<a href="#main-content" class="skip-link">`)
2. Sticky header (`<header class="header-area header-sticky">`) with logo "RxChallenger" and nav
3. `<main id="main-content">` with page content
4. Footer (`<footer id="contact-us">`) with social links + sub-footer links
5. Scripts: jQuery → Popper → Bootstrap → Owl Carousel → ScrollReveal → Waypoints → CounterUp → imgfix → custom.js
6. Inline `<script>` for cookie consent + event tracking + scroll depth

## Homepage Sections (index.html)

1. **Hero** (`#welcome`) — 100vh, grid pattern bg, radial red glow, **centered** h1 + subtitle + 2 CTAs
2. **Download Badges** — Google Play + Windows badges with hover scale
3. **Features** (`#features`) — 3 cards: Real Prescriptions, Cloud Progress, Tooltip Assistance
4. **Why Rx Challenger** (`#why`) — 3 cards: Gamified Learning, Real-World Scenarios, Career Readiness
5. **Promotion** (`#promotion`) — App screenshot + 3 detailed feature items (Patient History, Chief Complaints, Diagnosis)
6. **Learning Journey** (`#journey`) — 4-step timeline with numbered red dots
7. **Audience** (`#audience`) — 6 cards: Students, Graduates, Managers, Pharmacists, Interns, Schools
8. **Testimonials** (`#testimonials`) — Owl Carousel with 4 reviews, gold stars, red author borders
9. **CTA Section** — "Ready to Level Up?" with download buttons

## Important Notes

- **Logo markup:** `Rx<span>Challenger</span>` — "Challenger" gets `color: var(--accent)` (red) via CSS
- **Cookie consent:** Uses `localStorage.cookie_consent`, inline script creates banner dynamically. Both Accept (`.main-button-slider`) and Decline (`.main-button`) buttons share consistent `padding`, `font-size`, and `border-radius: 50px` via `.cookie-banner` CSS rules
- **Event tracking:** Elements with `data-event` attribute auto-track via delegated click listener
- **Scroll depth:** Tracks 25/50/75/100% milestones via scroll event listener
- **SEO:** JSON-LD structured data on every page (SoftwareApplication, Organization, FAQPage, etc.)
- **CSP:** Content-Security-Policy meta tag allows Google Tag Manager, Google Fonts, Google Analytics
- **No inline styles on pages** — all styling via `theme.css` custom properties
- **`.import` files** in `assets/images/` and `assets/fonts/` are Godot engine metadata — do not delete

## Deployment

- Hosted on GitHub Pages (`rxchallenger.github.io`)
- Push to `main` branch deploys automatically
- No build step — static files served directly

## Conventions for Future Changes

- Use CSS custom properties from `theme.css` — don't hardcode colors
- Use `.reveal` class + Intersection Observer for scroll animations (not ScrollReveal library)
- Maintain `prefers-reduced-motion` support for all animations
- Keep skip links and `aria-label` attributes for accessibility
- Preserve JSON-LD structured data when modifying page content
- Test mobile responsiveness at 991px, 810px, and 480px breakpoints
