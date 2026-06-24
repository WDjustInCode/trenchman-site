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

The dark pages use a `#080706` background with gold headlines/CTAs and white/muted body text. Light pages use a warm parchment background (`#F4F1EC` / `#ECEAE4`) with deep-black text and gold accents.

## Architecture

### Page → Vertical mapping

Each route corresponds to one of the three business verticals:

| Route | Vertical | Key conversion goal |
|-------|----------|-------------------|
| `/` | All three | Awareness → split traffic to the right vertical |
| `/academy` | Training camps | Register for a camp (Stripe / RegFox embed — not yet wired) |
| `/store` | Merch & gear | Add to cart (Shopify — wired via Storefront API) |
| `/recruiting` | Recruiting exposure | Add $75 highlight reel upsell at checkout |
| `/about` | Brand story | Trust-building; no direct conversion CTA |
| `/contact` | All three | General inquiry form (Resend) |

### Home page variants (design exploration)

Four home page concepts are available for client review, selectable via the "Home" dropdown in every nav:

| Route | Theme | Nav style |
|-------|-------|-----------|
| `/` | Dark (classic) | Sticky dark nav, gold logomark |
| `/home-alt` | Dark Alt 1 | Absolute gradient nav (black→transparent), gold logomark h-14 |
| `/light` | Light | Sticky white nav, black logomark |
| `/light-alt` | Light Alt 1 | Absolute gradient nav (white→transparent), black logomark h-14 |

The alt pages render their own nav inline and are excluded from the root layout's `ConditionalNav`/`ConditionalFooter` (see `components/ConditionalRootChrome.tsx`). Add new excluded paths there when adding standalone page variants.

### Nav components

| Component | Used on | Style |
|-----------|---------|-------|
| `components/Nav.tsx` | All standard dark pages | Sticky, `bg-deep-black/95`, gold logomark `h-9` |
| `components/LightNav.tsx` | `/light` | Sticky, `bg-white/95`, black logomark `h-9` |
| `components/AltNav.tsx` | `/home-alt` | Absolute, gradient dark→transparent, gold logomark `h-14` |
| `components/LightAltNav.tsx` | `/light-alt` | Absolute, gradient white→transparent, black logomark `h-14` |

All four navs share the same Home dropdown (`homeLinks` array) and main `links` array (`Academy`, `About`, `Contact`) — keep them in sync when adding variants or routes. The dropdown uses a transparent bridge `<div>` (`h-2`) between the trigger and panel to prevent `onMouseLeave` from firing during mouse transit.

Each nav also renders `components/ProfileMenu.tsx` (desktop + mobile variants) for athlete sign-in state — see "Athlete profile system" below. Unlike `links`/`homeLinks`, this is **not** duplicated per-nav: all 4 navs import the same component and pass it a `profile` prop and a `theme` ("dark" | "light"), because the profile menu needs live per-request session data (not just a static link array), so quadruplicating it would risk drifting cookie/session logic across files.

### Shared layout

`app/layout.tsx` renders `ConditionalNav` and `ConditionalFooter` (both from `components/ConditionalRootChrome.tsx`), which suppress the root chrome on pages that manage their own nav/footer. The footer email form is currently unconnected — it needs a Klaviyo/Mailchimp POST endpoint added as a Server Action or API route.

The footer uses a two-column layout: `trenchman-logo.svg` (461×481px) on the left, stacked content (tagline, email form, social links) bottom-aligned to its right. On mobile everything stacks vertically.

### Border convention

All card, section, and UI borders use gold (`border-gold`) at `border-2` thickness — no white/muted borders on structural elements. Section dividers (`border-y`) also use `border-gold`. Form inputs use `border-2 border-gold/40`. This matches the flyer aesthetic.

Exception: the home page "About Gallery" section (`app/page.tsx`) uses borderless images with `shadow-xl shadow-black/50` instead — the photo-overlay treatment there reads better without a gold frame.

### TiltImage component

`components/TiltImage.tsx` — 3D tilt-on-hover effect used for the 3-vertical strip icons. Accepts an optional `overlay` prop (default `true`) that controls the `bg-deep-black/20` overlay — pass `overlay={false}` on light-background pages.

### Font variable pattern

Because Rockwell Extra Bold isn't available via `next/font`, it's applied with inline `style` props directly on headline elements. Don't refactor this to a Tailwind class — the font stack won't resolve correctly on systems without the font unless the fallback chain is intact.

### Shopify integration

`lib/shopify.ts` — Storefront API client using `@shopify/storefront-api-client`.

- **Store domain:** `trenchman-academy.myshopify.com` (`NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`)
- **Token:** `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` (public storefront access token)
- **API version:** `2025-07`

Shopify collections (handles must match exactly):

| Handle | Used by | Purpose |
|--------|---------|---------|
| `gear` | `/store` Gear section | Training gear products |
| `apparel` | `/store` Apparel section | Apparel & clothing products |
| `camp-tickets` | `/academy` | Camp registration products |
| `frontpage` | — | Shopify default, unused |

Key functions in `lib/shopify.ts`:
- `getCollectionProducts(handle, first?)` — fetch products in a named collection
- `getProducts(first?)` — fetch all products (not collection-scoped)
- `createCheckout(variantId)` — creates a cart and returns the Shopify `checkoutUrl`

`components/AddToCartButton.tsx` — client component that calls `createCheckout` and redirects to Shopify checkout. Used on both `/store` and `/academy`.

The `/store` page fetches two collections in parallel: `gear` (Gear section) and `apparel` (Apparel section). Products must be in the correct Shopify collection — tag-based filtering is no longer used.

Both `/store` and `/academy` use `export const dynamic = "force-dynamic"` to prevent Next.js from statically caching Shopify data at build time.

**Shopify publishing requirement:** products must be published to the "Online Store" sales channel in the Shopify admin to be returned by the Storefront API. Draft products or products with the sales channel unchecked will not appear.

### Resend integration (contact form)

`app/contact/actions.ts` — Server Action (`sendContactMessage`) that sends contact form submissions via the `resend` npm package.

- **API key:** `RESEND_API_KEY` (server-only, not `NEXT_PUBLIC_*` — read in the Server Action, never sent to the client)
- **Sender:** currently `onboarding@resend.dev` (Resend's sandbox sender — no custom domain verified yet). Swap to a verified domain address once one is set up in the Resend dashboard.
- **Recipient:** hardcoded to a single inbox in `actions.ts`; the submitter's email is set as `replyTo`.
- `app/contact/ContactForm.tsx` — client component wrapping the form; tracks `idle`/`pending`/`success`/`error` state locally and resets the form on success.

### Training pricing (academy page)

The `/academy` page displays three training options with tiered pricing:

| Option | Price | Details |
|--------|-------|---------|
| Camp Registration | $75 | Product-driven via Shopify `camp-tickets` collection |
| Solo Training | $75 | 1-hour 1-on-1 session; premium per-person rate |
| Group Training | $200 | Up to 6 athletes, 4-hour session; ~$33.33/person/hour |

Both solo and group training cards link to `/contact` (contact form). Pricing is hardcoded in `app/academy/page.tsx` and should be updated in the component data array if rates change.

### Athlete profile system

Athletes can create a lightweight profile to track training progress across the three verticals (camp, group, solo). This system is **intentionally not secure** — no real PII is collected, and that's a deliberate tradeoff, not an oversight:

- **Identity:** first initial + last initial + last 4 digits of phone number — nothing else. No names, emails, or birthdates are collected (a fuller schema was considered and rejected specifically to avoid COPPA's parental-consent/security obligations, since many athletes are minors under 13).
- **Sign up / sign in:** `app/sign-up/` and `app/sign-in/` (Server Actions in each `actions.ts`). Duplicate initials+phone combos are allowed by design — if sign-in matches more than one profile, `SignInForm.tsx` renders a disambiguation picker (non-identifying info only: join date, training types) so the athlete can pick the right one.
- **Session:** `lib/session.ts` (`getCurrentProfile`, `setProfileCookie`) + `lib/sessionActions.ts` (`signOut`, kept in a separate `"use server"` file so the function can be imported into the client `ProfileMenu` component without pulling `next/headers` into the client bundle). The session is an **unsigned HttpOnly cookie holding the profile's id directly** — no sessions table. A forged cookie could let someone view another athlete's read-only training history, which is accepted because members never get write access and there's no PII to expose.
- **Profile page:** `app/profile/page.tsx` — redirects to `/sign-in` if there's no valid session; shows session counts per training type plus a `TrainingSessionList`.
- **Database:** Supabase Postgres, connected via the Vercel Storage integration (project `supabase-almond-curtain`). Schema lives in `supabase/schema.sql` (run manually in the Supabase SQL editor — there's no migration tooling). `lib/supabase.ts` is a single **service-role** client (mirrors `lib/shopify.ts`'s pattern of one module-level client + exported typed functions). There's no anon client and no client-side Supabase usage — all access goes through Server Components/Actions, and the cookie check in each route *is* the authorization boundary. Supabase RLS is left default-deny and is effectively bypassed by the service-role key; this is consistent with the already-accepted insecure-auth model, not an oversight.
- **Env vars:** `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (server-only). Set in `.env.local` for local dev and on Vercel (Production/Preview/Development) for deployments. Note: the Vercel↔Supabase integration's automatic env var sync left these two empty when first connected (a known quirk, especially with Supabase's newer publishable/secret key naming) — they were populated manually from the Supabase dashboard's Project Settings → API page rather than relying on the sync. If you ever reconnect or recreate the integration, verify these two aren't silently empty again (`vercel env ls` shows them, but not their values).

### Staff dashboard

`/staff/*` is gated by a single shared password (no per-staff accounts) — appropriate for a small team, but means there's no audit trail of who changed what.

- **Gate:** `middleware.ts` checks for a `staff_session` cookie whose value matches a SHA-256 hash of `STAFF_PASSWORD` (computed via `lib/staffAuth.ts`, which deliberately avoids Node's `crypto` module — Web Crypto via `crypto.subtle` — because middleware runs on the Edge runtime). `lib/staffSession.ts` (`requireStaff`, `setStaffCookie`, `staffSignOut`) is the Node-side counterpart used inside Server Actions; every staff mutation action calls `requireStaff()` itself as defense-in-depth beyond the middleware redirect, since Server Actions can be invoked directly.
- **Login:** `app/staff/login/`.
- **CRUD:** `app/staff/profiles/` (list/create/delete + detail view) and `app/staff/sessions/` (create/edit/delete training sessions, attached to a profile via `TrainingSessionForm.tsx` shared between create and edit). `components/StaffSessionRow.tsx` is the editable row used on the profile detail page — kept separate from the member-facing read-only `TrainingSessionList.tsx` rather than overloading one component with conditional edit affordances.
- **Env var:** `STAFF_PASSWORD` (server-only).

### Planned integrations (not yet implemented)

- **Camp registration:** RegFox or Jack Athletic embed on `/academy#register` (currently uses Shopify `camp-tickets` collection as a placeholder)
- **Email:** Klaviyo — forms on Home, footer, and `/store` waitlist need Server Actions wired to Klaviyo's API (the `/contact` form uses Resend instead, see above)
- **CMS:** Sanity or Notion-as-CMS for the camp schedule (currently hardcoded arrays in each page file)
