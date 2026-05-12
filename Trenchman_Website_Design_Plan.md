# Trenchman Academy — Website Design Plan

## Context

The client is building a football lineman academy and gear business under the **Trenchman Academy** brand. A competitive analysis of the 5 leading lineman-specific businesses reveals that multi-revenue-stream architecture is universal among top performers — no successful company relies on camps alone. The goal of this website is to unify the brand's top 3 business verticals into a single cohesive digital presence that converts visitors into camp registrants, gear buyers, and long-term community members, while laying the infrastructure for future franchise/licensing scale.

---

## Brand Design System (from `/public` assets)

All design decisions should flow from the established brand kit:

| Token | Value |
|-------|-------|
| Primary Gold | `#AF7618` |
| Deep Black | `#080706` |
| Athletic White | `#E3E3E3` |
| Headline Font | Rockwell Extra Bold |
| Secondary Headline | Bevan |
| Subhead / Section Title | Bebas Neue |
| Body Copy | Calibri / system serif fallback |

Aesthetic direction: dark backgrounds (`#080706`), gold headlines and CTAs, white for body text — bold, athletic, identity-driven. Mirrors the flyer's "Built for the Athletes Who Fight in the Trenches" energy.

---

## Top 3 Business Verticals

Based on the competitive analysis, the three highest-leverage verticals are:

1. **Training / Camp Registration** — core revenue, credibility engine
2. **Merch & Gear Sales** — passive income, brand flywheel, community signal
3. **Recruiting Exposure Services** — highest willingness-to-pay driver, future-scaling anchor

---

## Site Architecture

### Global
- **Nav:** `Academy` | `Gear Store` | `Recruiting` | `About` | `Register Now` (gold CTA button)
- **Footer:** Social links (IG, X, YouTube), email capture ("Join the Trench"), coach contact
- Mobile-first: most parents/athletes browse on phone

---

### Page 1 — Home (/)

**Hero**
- Full-bleed dark background, large Rockwell Extra Bold headline: *"Built for the Athletes Who Fight in the Trenches."*
- Subhead (Bebas Neue): grades, location, price anchor
- Two CTAs side by side: `Register for a Camp` (gold) + `Shop Gear` (outlined white)
- Background: subtle texture or stadium photo in dark overlay
- Use flyer.png as design reference for hierarchy and tone

**3-Vertical Strip** (below hero)
Three equal-width cards, gold icon + Bebas Neue label:
1. **Academy** — "Position-specific training. Grades 3–12."
2. **Gear Store** — "Represent the Trench."
3. **Recruiting** — "Get in front of college coaches."

**Social Proof Rail**
- Athlete testimonials, coach credentials, any media logos

**Upcoming Camps Feed**
- Card list: city / date / spots remaining / Register button

**Email Capture**
- "Join the Trench" — name + email → Mailchimp or Klaviyo list

---

### Page 2 — Academy (/academy)

**Purpose:** Convert camp-curious visitors into registrants.

**Sections:**
1. **Hero** — "Train Where the Trenches Are Won" + camp overview
2. **How It Works** — 3-step visual (Register → Show Up → Level Up)
3. **Camp Schedule Table** — Date / Location / Age Group / Price / Spots Left / CTA
4. **Pricing Tiers**
   - General Admission: $150–$175
   - Premium (includes video package): $225–$275
   - Elite 1-on-1 Session: $300–$400
5. **Coach Profiles** — Photo, credentials, playing background (credibility anchor)
6. **FAQ** — age groups, what to bring, refund policy
7. **Register CTA** → Stripe or third-party registration form (e.g., Jack Athletic, RegFox)

---

### Page 3 — Gear Store (/store)

**Purpose:** Passive revenue + brand identity reinforcement.

**Sections:**
1. **Hero** — "Gear for the Trenches" — dark background, product hero shot
2. **Product Grid** — Apparel first (tees, hoodies, hats), equipment second
3. **Bundle Upsell** — "Camp + Gear Bundle" (save $X) prominently featured
4. **Future: Proprietary Equipment** — Placeholder section: "Training Tools Coming Soon" — captures email waitlist

**Tech:** Shopify storefront embedded or standalone, or Fourthwall for lower-overhead merch fulfillment (similar to BSN/Sideline Store model used by Trench Academy competitor).

---

### Page 4 — Recruiting (/recruiting)

**Purpose:** Highest perceived-value upsell; future scaling engine.

**Sections:**
1. **Hero** — "Get Seen. Get Recruited." — speak to parent anxiety directly
2. **What's Included**
   - Athlete film at every camp
   - Individually edited highlight reel ($65–$100 add-on, or bundled in premium tier)
   - Performance data sheet distributed to college coaches
   - College coach attendance list (social proof)
3. **How It Works** — visual 3-step: Film → Edit → Distribute
4. **College Coach Network** — logos or names of coaches who attend / receive film
5. **Media Partnerships** (future) — placeholder for Rivals, 247Sports, On3 logos once secured
6. **Add-On Upsell CTA** — "Add Highlight Reel to Your Registration — $75"

**Future Scaling Hook (below fold):**
- "Are you a coach or trainer? Bring Trenchman Academy to your city." → franchise/licensing inquiry form (email capture only at this stage)

---

### Page 5 — About (/about)

- Founder/coach story + credentials (NFL/college playing background front and center)
- Brand mission statement
- "Why Linemen" — the cultural identity hook
- Press / media mentions (as they accumulate)

---

## Conversion & Upsell Architecture

The site should be designed around a **low entry price → high-margin upsell** funnel:

```
Camp Registration ($150–175)
  └─ + Video Package ($75)        ← add at checkout
  └─ + Gear Bundle ($40–60)       ← add at checkout
  └─ → 1-on-1 Session ($300+)    ← follow-up email post-camp
  └─ → Recurring Training         ← future vertical
```

---

## Tech Stack Recommendation

| Layer | Tool | Reason |
|-------|------|--------|
| Marketing site | Next.js (App Router) + Tailwind | Fast, SEO-friendly, easy to host on Vercel |
| E-commerce | Shopify (embedded buy button or subdomain) | Handles inventory, payments, shipping without custom build |
| Camp registration | RegFox or Jack Athletic | Purpose-built for sports camp registration + payment |
| Email | Klaviyo | Best for e-commerce + event flows; integrates with Shopify |
| CMS (content) | Sanity or Notion-as-CMS | Lets client update camp schedule without a developer |

---

## Future Scaling Provisions (built in from day 1)

- **Franchise inquiry form** on `/recruiting` page — captures coach/trainer interest
- **City landing pages** template (e.g., `/camps/charlotte`, `/camps/atlanta`) — SEO + travel camp scale
- **Athlete profile pages** (future) — creates a recruiting database product
- **Subscription / membership tier** placeholder — year-round digital training content

---

## Critical Files to Create

```
/
├── app/
│   ├── page.tsx                  (Home)
│   ├── academy/page.tsx
│   ├── store/page.tsx
│   ├── recruiting/page.tsx
│   └── about/page.tsx
├── components/
│   ├── Nav.tsx
│   ├── HeroSection.tsx
│   ├── CampCard.tsx
│   ├── ProductGrid.tsx
│   └── EmailCapture.tsx
├── public/
│   ├── flyer.png                 (existing)
│   ├── trenchman-branding-1.png  (existing)
│   ├── trenchman-branding-2.png  (existing)
│   └── trenchman-logo.svg        (existing)
└── tailwind.config.ts            (brand tokens)
```

---

## Verification

1. **Design QA:** Render Home, Academy, Store, Recruiting pages — confirm gold/black/white palette, correct font hierarchy, mobile responsiveness
2. **Funnel test:** Register → add video upsell → add gear bundle → complete checkout (test mode)
3. **Email capture:** Submit "Join the Trench" form → confirm entry appears in Klaviyo/Mailchimp list
4. **Camp schedule:** Update a camp date via CMS → confirm it reflects on `/academy` without redeployment
5. **SEO check:** Each page has unique `<title>`, meta description, and OG image using brand assets
