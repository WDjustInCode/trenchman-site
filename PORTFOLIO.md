# Trenchman Academy

**Full-stack marketing site for a position-specific football training brand**

*Next.js 15 · Tailwind CSS v4 · Shopify Storefront API · TypeScript*

---

## Overview

Trenchman Academy trains offensive and defensive linemen — grades 3 through 12 — at a level the position has never had before. The brand spans three business verticals: a camp registration pipeline, a merch and gear store, and a recruiting exposure program.

I built the full site from scratch: design system, production logo, component architecture, and live Shopify integration.

---

## The Problem

The client had a strong brand identity and a growing coaching operation but no web presence to support it. Camp registration was happening informally, gear sales had no storefront, and recruiting services had nowhere to point prospects. The site needed to serve three distinct conversion goals under one cohesive brand.

---

## What I Built

**A multi-vertical marketing site** structured around three routes — `/academy`, `/store`, and `/recruiting` — each with its own conversion goal, plus a home page that splits traffic between them.

**A live Shopify storefront** connected to the Shopify Storefront API. Products pull in real-time from named collections (`gear`, `apparel`, `camp-tickets`). Camp dates, locations, age groups, and available spots are stored as Shopify metafields and surfaced dynamically on the schedule — no hardcoded data, no CMS required. Checkout is handled entirely by Shopify via a cart mutation that redirects to a hosted checkout URL.

**A complete design system** built on Tailwind CSS v4's CSS-native config (`@theme {}` blocks), with custom brand tokens for gold (`#AF7618`), deep black (`#080706`), and athletic white. The client developed the brand identity using AI tools — I took that direction and produced the production logomark: a clean SVG with two color variants (gold and black) optimized for nav, footer, and favicon contexts. Typography layers three typefaces — Rockwell Extra Bold for hero headlines, Bebas Neue for labels and CTAs, and Calibri for body — each applied with a deliberate fallback strategy.

**Four home page variants** for client design review — dark, dark-alt, light, and light-alt — each with a matching nav style (sticky vs. absolute, gradient behaviors, logo sizing). A `ConditionalRootChrome` wrapper suppresses the global nav and footer on standalone variant pages so they can manage their own chrome.

---

## Key Technical Decisions

**Server Components by default.** Every page is an async Server Component fetching live Shopify data. `"use client"` is scoped only to interactive elements like the add-to-cart button and nav dropdown — keeping the JS bundle lean.

**`force-dynamic` on Shopify routes.** Next.js would otherwise statically cache Shopify responses at build time. Opted for runtime fetches so inventory, pricing, and camp availability are always current.

**Metafield-driven camp schedule.** Camp data lives in Shopify as product metafields rather than a separate CMS or hardcoded array. This lets the client manage the schedule entirely from the Shopify admin without touching the codebase.

**Parallel collection fetches.** The store page fetches `gear` and `apparel` collections concurrently with `Promise.all` — single round-trip, no waterfall.

---

## Features

- Live product grid with `best-seller` tag badges and direct Shopify checkout
- Dynamic camp schedule sorted by date, built from Shopify product metafields
- Tiered pricing cards (General / Premium / Elite 1-on-1) wired to Shopify variants
- 3D tilt-on-hover vertical strip using CSS `perspective` transforms
- Sticky and absolute nav variants with a transparent hover bridge to prevent premature dropdown dismiss
- Responsive footer with a two-column logo layout and email capture form (Klaviyo integration pending)
- Camp + Gear bundle upsell cross-linking Academy and Store

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Commerce | Shopify Storefront API (`@shopify/storefront-api-client`) |
| Language | TypeScript |
| Fonts | `next/font/google` (Bebas Neue, Bevan) + system (Rockwell Extra Bold) |
| Hosting | Vercel |
