# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (defaults to :3000, auto-increments if occupied)
npm run build    # production build + type-check
npm run lint     # ESLint via next lint
npm run start    # serve the production build
```

There are no tests configured yet.

## Stack

- **Next.js 15 (App Router)** — all pages are Server Components by default; add `"use client"` only when state/hooks are needed (see `components/Nav.tsx`)
- **Tailwind CSS v4** — configured via `@theme {}` block in `app/globals.css` (CSS-native config), not just `tailwind.config.ts`. Both files define the same tokens; `globals.css` is the authoritative source for runtime CSS variables
- **`next/font/google`** — Bevan and Bebas Neue are loaded in `app/layout.tsx` and injected as CSS variables (`--font-bevan`, `--font-bebas`) on `<html>`. Rockwell Extra Bold is a system font with no Google Fonts equivalent — applied via inline `style` props throughout

## Brand Design System

| Token | Value | Tailwind class |
|-------|-------|---------------|
| Primary Gold | `#AF7618` | `text-gold`, `bg-gold`, `border-gold` |
| Deep Black | `#080706` | `text-deep-black`, `bg-deep-black` |
| Athletic White | `#E3E3E3` | `text-athletic-white` |
| Bebas Neue | Google Font | `font-bebas` — section labels, nav, CTAs |
| Bevan | Google Font | `font-bevan` — available but sparingly used |
| Rockwell Extra Bold | System | `style={{ fontFamily: "'Rockwell Extra Bold', Georgia, serif" }}` — hero headlines only |
| Body | Calibri | default body, no utility class needed |

All pages use a dark background (`#080706`) with gold headlines/CTAs and white/muted body text.

## Architecture

### Page → Vertical mapping

Each route corresponds to one of the three business verticals:

| Route | Vertical | Key conversion goal |
|-------|----------|-------------------|
| `/` | All three | Awareness → split traffic to the right vertical |
| `/academy` | Training camps | Register for a camp (Stripe / RegFox embed — not yet wired) |
| `/store` | Merch & gear | Add to cart (Shopify — not yet wired) |
| `/recruiting` | Recruiting exposure | Add $75 highlight reel upsell at checkout |
| `/about` | Brand story | Trust-building; no direct conversion CTA |

### Shared layout

`app/layout.tsx` owns the `<Nav>` and the `<footer>` (email capture + social links). The footer email form is currently unconnected — it needs a Klaviyo/Mailchimp POST endpoint added as a Server Action or API route.

### Font variable pattern

Because Rockwell Extra Bold isn't available via `next/font`, it's applied with inline `style` props directly on headline elements. Don't refactor this to a Tailwind class — the font stack won't resolve correctly on systems without the font unless the fallback chain is intact.

### Planned integrations (not yet implemented)

- **Camp registration:** RegFox or Jack Athletic embed on `/academy#register`
- **E-commerce:** Shopify buy button or subdomain on `/store`
- **Email:** Klaviyo — forms on Home, footer, and `/store` waitlist need Server Actions wired to Klaviyo's API
- **CMS:** Sanity or Notion-as-CMS for the camp schedule (currently hardcoded arrays in each page file)
