# Handoff: Al Shagara Gum Arabic — Marketing Website (v2)

> **Paste this whole file into Claude Code.** It is a complete brief for building the site in **React + TypeScript**.

---

## 1. Overview
A single-page, responsive marketing website for **Al Shagara Gum Arabic (SGA) — الشجرة للصمغ العربي**, a Sudanese company that:
- sources, solar-dries, cleans, grades and exports **Gum Arabic Hashab** (Acacia senegal),
- produces **solar-dried food powders** (tomato, okra, onion, garlic),
- promotes local manufacturing, stronger agricultural value chains, fewer post-harvest losses, support for farmers and communities, renewable energy and CSR.

Primary goal: generate **B2B quote requests** from food, beverage and pharmaceutical buyers.

## 2. About the design files
`Al Shagara Website v2.html` in this folder is a **design reference built in HTML**. It is a prototype showing the intended look and behaviour; it is **not production code to copy**. Recreate it as a proper React + TypeScript app (see section 3). Open the HTML in a browser to compare against your build at any time. (It depends on a runtime and design-system bundle that are not included, so if it does not render standalone, rely on this README — it is self-sufficient.)

## 3. Fidelity & tech stack
**High-fidelity.** Recreate colours, typography, spacing, radii and interactions as specified.

Recommended stack (no existing codebase):
- **Vite + React 18 + TypeScript** (`npm create vite@latest al-shagara -- --template react-ts`)
- Styling: **CSS Modules** + a global `tokens.css` of CSS custom properties (section 9). No UI framework needed.
- Forms: `react-hook-form` + `zod` for validation (optional but recommended).
- No router needed — a single page with in-page anchor navigation (`#chain`, `#pillars`, `#product`, `#foods`, `#sustainability`, `#people`, `#contact`). Add `html { scroll-behavior: smooth; }`.
- Accessibility: semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), `alt` on all images, a focus-trapped modal, visible focus ring.
- Bilingual: the page is English, LTR, with Arabic secondary labels marked `dir="rtl" lang="ar"`. Structure all copy in a `content.ts` file so a full Arabic RTL version can be added later.

### Suggested file structure
```
src/
  main.tsx
  App.tsx
  styles/tokens.css          # CSS variables (section 9) + @font-face
  styles/global.css          # resets, body, links
  content/content.ts         # ALL copy + data arrays, typed (section 8)
  types.ts
  components/
    Header.tsx
    Hero.tsx
    ValueChain.tsx            # auto-advancing interactive stepper
    Pillars.tsx
    GumArabicFeature.tsx
    DriedFoods.tsx
      ProductPouch.tsx        # CSS-drawn kraft pouch mock
      ComingSoonBanner.tsx
    Sustainability.tsx
    People.tsx
    FacilityGallery.tsx
    ContactSection.tsx
    QuoteModal.tsx
    Footer.tsx
    ui/Button.tsx  ui/Input.tsx  ui/Select.tsx  ui/Textarea.tsx  ui/Eyebrow.tsx  ui/Container.tsx
public/img/...                # images (section 10)
public/fonts/Lusail-*.ttf
```

---

## 4. Global layout rules
- Page background `#f7f3ea` (warm cream). Default text `#13281e`.
- Content container: `max-width: 1320px; margin: 0 auto; padding-inline: 32px`.
- Section vertical padding: `clamp(72px, 9vw, 128px)` (smaller sections `clamp(64px, 8vw, 112px)`).
- Fluid — must work from 360px to 1600px+. Use CSS grid with `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` so columns collapse naturally; no fixed widths on text boxes.
- Headings use `text-wrap: balance`, body paragraphs `text-wrap: pretty`.
- **Eyebrow** style (reused everywhere): 12px, weight 600, `letter-spacing: .12em`, uppercase, colour `#1f6b46` on light / `#fcc326` on dark.

---

## 5. Sections (top to bottom)

### 5.1 Header (`Header.tsx`)
- Not sticky. Container 1320px, `padding: 20px 32px`, flex, `justify-content: space-between`, gap 24px.
- Left: logo `img/logo-sga.jpg` 34×42px `object-fit: cover; mix-blend-mode: multiply` + wordmark "AL SHAGARA" (15px, 700, `letter-spacing:.02em`). Links to `#top`.
- Centre nav (14.5px, 500, `white-space: nowrap`, gap `clamp(14px, 2.4vw, 36px)`), colour `#13281e`, hover `#1f6b46`:
  `Value chain → #chain`, `Mission → #pillars`, `Gum arabic → #product`, `Dried foods → #foods`, `Sustainability → #sustainability`, `People → #people`.
- Right: **"Get a quote"** text button — 14.5px/600, `border-bottom: 2px solid #fcc326`, `padding-bottom: 2px`. **Opens the Quote modal** (5.12).
- Mobile (< 900px): collapse the nav into a hamburger menu / slide-down panel (not in the prototype; implement cleanly).

### 5.2 Hero (`Hero.tsx`, `id="top"`)
- Padding: `clamp(32px,5vw,64px) 32px clamp(56px,7vw,96px)`.
- **H1**: "Natural gum arabic, <span green>sustainably harvested</span> and solar-dried."
  `font-size: clamp(48px, 8.6vw, 132px); line-height: .94; font-weight: 700; letter-spacing: -0.04em; max-width: 1200px`. The span is `#1f6b46`.
- Below (margin-top `clamp(40px,5vw,64px)`): 12-column grid, gap 16px, `align-items: end`:
  - **Cols 1–4**: paragraph (18px/1.6, `#3d4a42`): "We turn the acacia's natural gum into a clean, export-grade product — processed locally with solar energy to support farmers and reduce waste." Then a row: primary **Button lg "Request a quote"** (scrolls to `#contact`) + text link "Follow the chain →" (15px/600, `#1f6b46`, → `#chain`).
  - **Cols 5–7**: image `acacia-tear.jpg`, `aspect-ratio: 3/4`, radius 12px, cover.
  - **Cols 8–12**: image `gum-tears.jpg`, `aspect-ratio: 16/10`, radius 12px; caption below 13px `#5d6a61`: "Hashab · Acacia senegal".
  - Mobile: stack to 1 column (text, then images side by side or stacked).

### 5.3 Value chain — interactive stepper (`ValueChain.tsx`, `id="chain"`)
- Full-width band, background `#13281e`, text white.
- Header row (flex, space-between, wraps): H2 "From branch to buyer, step by step." (`clamp(34px,4.4vw,60px)`, lh 1.02, 700, `-0.03em`, max-width 720px) + helper text (16px, `#b9cbbf`, max-width 380px): "Select a stage to see how the gum moves from the branch to the container."
- **Step tabs**: grid `repeat(auto-fit, minmax(min(100%,150px),1fr))`, `border-top: 1px solid rgba(255,255,255,.16)`. Each tab is a `<button role="tab">`:
  - `padding: 20px 16px 20px 0`, `border-top: 3px solid` (`#fcc326` when active, transparent otherwise), `margin-top: -2px`.
  - Number "01"…"05" in mono 12.5px (active `#fcc326`, inactive `#7f9787`); title 19px/700 (active `#fff`, inactive `#9fb3a6`).
- **Active panel**: 2-col grid (`minmax(min(100%,420px),1fr)`), gap `clamp(32px,5vw,72px)`, centred vertically:
  - Left: image, `aspect-ratio: 16/11`, radius 12px, `object-fit: cover` (fallback bg `#22392c`). Crossfade on change (200ms ease) — optional enhancement.
  - Right: eyebrow (gold) "Stage {n} of 5"; H3 title (`clamp(30px,3.2vw,44px)`, 700); body (18px/1.65, `#cfdcd3`); buttons: **prev** (44×44 circle, `1.5px solid rgba(255,255,255,.3)`, "←", hover bg `rgba(255,255,255,.08)`) and **next** (44×44 circle, bg `#fcc326`, text `#13281e`, "→", hover `#e3a90f`).
- **Behaviour**: auto-advances to the next step **every 2000 ms**, looping 5 → 1. Any click on a tab/prev/next sets that step **and restarts the 2 s timer**. Clear the interval on unmount. Recommended: pause while hovered/focused and when `prefers-reduced-motion: reduce`.
- Steps data — see `valueChainSteps` in section 8.

### 5.4 Mission / pillars (`Pillars.tsx`, `id="pillars"`)
- 2-col grid (`minmax(min(100%,380px),1fr)`), gap `48px 80px`.
- Left column is `position: sticky; top: 32px; align-self: start`: eyebrow "What we stand for"; H2 "Six commitments behind every bag." (`clamp(34px,4vw,54px)`); paragraph (17px, `#4d5a52`): "Sustainable solar-dried foods, made locally — for stronger agriculture and stronger communities."
- Right column: list of 6 rows. Each row: grid `48px 1fr auto`, gap 16px, `align-items: baseline`, `padding: 24px 0`, `border-top: 1px solid #ddd4c2`.
  - Number (mono 13px, `#b07d06`), title (22px/700) + body (15px, `#5d6a61`), Arabic label (15px/500, `#1f6b46`, `dir="rtl"`, nowrap).

### 5.5 Gum Arabic feature (`GumArabicFeature.tsx`, `id="product"`)
- Full-width band, background `#ece4d3`.
- 2-col grid (`minmax(min(100%,400px),1fr)`), gap `clamp(32px,5vw,80px)`.
- Left: two images side by side (gap 16px), each `aspect-ratio: 3/4.4`, radius 12px: `bag-label.jpg`, and `kraft-bags.jpg` offset with `margin-top: 48px`.
- Right: eyebrow "Flagship product"; H2 "Gum Arabic Hashab" (`clamp(36px,4.4vw,60px)`, lh 1); paragraph (17px, `#3d4a42`): "Hand-picked Acacia senegal tears, naturally sun-dried, mechanically cleaned and graded — ready for food, beverage and pharmaceutical manufacturers."
- Spec strip: 3 equal columns, top+bottom border `1px solid #d3c8b2`, inner left borders. Each: label 12.5px `#6b7369`, value 17px/700 — `Origin: Sudan`, `Species: A. senegal`, `Packing: 50 kg bags`.

### 5.6 Solar-dried foods (`DriedFoods.tsx`, `id="foods"`)
- Container section, flex column, gap 48px.
- Eyebrow "Solar-dried foods"; H2 "Local harvests, preserved by the sun." (`clamp(36px,4.4vw,60px)`).
- **Product grid**: `repeat(auto-fill, minmax(min(100%,260px),1fr))`, gap 20px. 4 cards (data in section 8).
  - Card: bg `#fff`, `border: 1px solid #e4dccb`, radius 12px, overflow hidden. Hover: `box-shadow: 0 4px 12px rgba(13,22,38,.08), 0 1px 3px rgba(13,22,38,.05); transform: translateY(-2px)` (transition 120ms).
  - Top visual area: bg `#ece4d3`, `padding: 36px 0 28px`, centred **`<ProductPouch>`** (CSS-drawn kraft pouch):
    - width 56%, `min-height: 220px`, `background: linear-gradient(180deg,#d4b582,#c7a46d)`, `border-radius: 8px 8px 14px 14px`, `box-shadow: 0 10px 24px rgba(60,40,10,.18), inset 0 -6px 12px rgba(0,0,0,.06)`.
    - Top seal strip: 12px tall, `#b8955d`, `border-bottom: 1px dashed rgba(255,255,255,.35)`.
    - Contents (centred column, gap 6px, padding `12px 10px 10px`): SGA logo 20×24 (multiply), "SUN-DRIED" (9px/700, `.14em`, `#3a2c14`), colour window circle (46% wide, `aspect-ratio:1`, `border: 3px solid rgba(255,255,255,.55)`, background = product `swatch`), short name (13px/700 `#13281e`), Arabic name (11px `#3a2c14`, rtl), weight pinned to bottom (mono 10px).
    - **Replace with real pack photography when available** — make `ProductPouch` swappable for an `<img>` via an optional `image` field.
  - Body (`padding: 20px 22px 22px`): title 19px/700 + weight (mono 12.5px `#6b7369`) on one row; description 14.5px `#5d6a61`.
- **Coming-soon banner** (`ComingSoonBanner.tsx`): bg `#13281e`, white text, radius 12px, padding `clamp(28px,4vw,44px)`, 2-col grid (`minmax(min(100%,340px),1fr)`), gap `24px 48px`.
  - Left: pill "COMING SOON" (12px/700, `.1em`, bg `#fcc326`, text `#13281e`, padding `5px 12px`, radius 999px); H3 "Solar-dried farms in the Ailfoon region" (`clamp(26px,2.8vw,36px)`); Arabic subtitle "مزارع التجفيف الشمسي في منطقة العيلفون" (16px/500, `#fcc326`, rtl).
  - Right: paragraph (16.5px/1.65, `#cfdcd3`): "We are building solar-drying farms in Ailfoon to process produce right where it is grown — bringing jobs, renewable energy and less post-harvest waste to the region."
- **Benefits strip**: 3 columns, top+bottom border `#ddd4c2`, inner left borders, `padding: 24px`. Title 17px/700 + text 14.5px `#5d6a61`:
  - "Longer shelf life" — "Dried produce keeps for months without refrigeration."
  - "Nutrients retained" — "Gentle, low-temperature solar drying keeps colour and flavour."
  - "Zero fuel" — "Powered entirely by sunlight — no diesel, no emissions."

### 5.7 Sustainability model (`Sustainability.tsx`, `id="sustainability"`)
Inspired by the farm-gate sustainability model of s4stechnologies.com. Full-width band, bg `#13281e`, white text; inner flex column gap 64px.
1. **Intro**: eyebrow (gold) "Our sustainability model"; H2 "A farm-gate, solar-powered food value chain." (`clamp(36px,4.6vw,64px)`, lh 1); tagline row (16px/500, `#cfdcd3`, wraps, gap `8px 20px`) separated by gold "|": *Reducing food losses | Empowering women farmers | Preventing carbon emissions | Delivering quality to customers*.
2. **3-step model**: grid `minmax(min(100%,300px),1fr)`, gap 24px. Each: image (`aspect-ratio: 4/3`, radius 12px) with a gold number badge (36px circle, `#fcc326`, text `#13281e`, 700, top-left 14px); title 22px/700; body 15.5px `#cfdcd3`. Data: `sustainabilityModel`.
3. **Product features**: small caps label "EVERY PRODUCT WE MAKE IS" (14px/600, `.1em`, `#9fb3a6`); grid `minmax(min(100%,190px),1fr)` with top border `rgba(255,255,255,.16)`; each item: 10px gold dot, title 18px/700, desc 14px `#b9cbbf`, bottom border. Data: `productFeatures`.
4. **Product applications**: 2-col (`minmax(min(100%,400px),1fr)`, gap `40px 80px`). Left: H3 "Product applications" (`clamp(26px,2.6vw,34px)`) + "Our ingredients serve food manufacturers, food service and beverage producers." Right: table-like list, rows `grid 1fr 1.3fr`, `padding: 14px 0`, `border-top: 1px solid rgba(255,255,255,.14)`; use (700) / items (`#cfdcd3`). Data: `applications`.
5. **Impact**: label "OUR IMPACT"; grid `minmax(min(100%,220px),1fr)`, gap 16px; cards bg `rgba(255,255,255,.06)`, border `rgba(255,255,255,.12)`, radius 12px, padding 24px; value (`clamp(36px,3.6vw,48px)`, 700, `#fcc326`) + label (15px `#dbe5de`). **Values are placeholders ("—") — the client will supply real figures.** Optional: count-up animation on scroll into view once real numbers exist.

### 5.8 People & CSR (`People.tsx`, `id="people"`)
- Full-bleed, `min-height: 640px`, content aligned to bottom. Background image `sorting-shed.jpg` (cover) with overlay `linear-gradient(90deg, rgba(15,32,24,.92) 0%, rgba(15,32,24,.7) 45%, rgba(15,32,24,.1) 100%)`.
- Eyebrow (gold) "People & CSR"; H2 "Every grade is sorted by hand, close to home." (`clamp(34px,4.4vw,60px)`, max-width 700px); paragraph (18px, `#dbe5de`, max-width 560px): "We buy directly from farmers and collectors, create seasonal work for women in nearby villages, and train teams in solar drying and post-harvest handling."

### 5.9 Facility gallery (`FacilityGallery.tsx`)
- H2 "Inside our facility" (`clamp(28px,3vw,40px)`) + hint "Scroll →" (14px `#5d6a61`).
- Horizontal scroller: `display:flex; gap:16px; overflow-x:auto; scroll-snap-type:x mandatory`; bleeds off the right edge (section has left padding only). Each figure: width `clamp(240px,28vw,360px)`, image `aspect-ratio: 4/5` radius 12px, caption 14px/500 `#3d4a42`. Data: `gallery`.
- Nice-to-have: prev/next arrow buttons on desktop, drag-to-scroll.

### 5.10 Contact (`ContactSection.tsx`, `id="contact"`)
- Container with bottom margin 64px. Inner card: bg `#1f6b46`, white, radius 12px, padding `clamp(40px,6vw,80px)`, 2-col grid (`minmax(min(100%,380px),1fr)`), gap 40px.
- Left: H2 "Source gum arabic directly from Sudan." (`clamp(32px,4vw,52px)`); paragraph (17px `#d6e8dd`): "Share the grade, volume and destination — we'll reply with specifications and a quote."
- Right: **white form card** (bg `#fff`, text `#13281e`, radius 12px, padding 28px, gap 16px, shadow `0 12px 28px rgba(13,22,38,.12), 0 4px 8px rgba(13,22,38,.06)`):
  - **Full name** (required) — placeholder "Your name"
  - Row (2 cols, wraps): **Email** (required, type email) "name@company.com" · **Phone / WhatsApp** (type tel) "+249 …"
  - **Message** textarea, 4 rows, "Product, grade, volume and destination"
  - Submit: **accent Button lg, full width** "Request a quote".
  - On success replace form with: box bg `rgba(255,255,255,.12)`, radius 8px, padding `14px 18px`: "Thank you. Our sales team will be in touch shortly."
- Below form: link "Follow us on Facebook →" (gold `#fcc326`, 600) → https://www.facebook.com/profile.php?id=61561040212605 (`target="_blank" rel="noopener"`).

### 5.11 Footer (`Footer.tsx`)
- Container, `padding: 24px 32px 40px`, `border-top: 1px solid #ddd4c2`, flex space-between, wraps; 13.5px `#5d6a61`.
- Left: "© 2026 Al Shagara Gum Arabic (SGA) · الشجرة للصمغ العربي". Right: "Product of Sudan". (Use current year dynamically.)

### 5.12 Quote modal (`QuoteModal.tsx`)
- Opened by header "Get a quote". Overlay: `position: fixed; inset: 0; z-index: 50; background: rgba(15,32,24,.55); display: flex; padding: 24px; overflow-y: auto`. Dialog: `margin: auto` (so it never clips on short viewports), bg `#fff`, radius 12px, `max-width: 560px`, width 100%, shadow `0 24px 56px rgba(6,50,95,.18)`.
- Header (padding `28px 28px 0`): H2 "Request a quote" (26px/700) + "Tell us what you need. We reply within two working days." (15px `#5d6a61`); close button 36×36 circle "×" (hover bg `#f1ede3`).
- Form (padding `24px 28px 28px`, gap 16px), 2-col rows that wrap below ~440px:
  - Full name* · Company
  - Email* · Phone
  - Product (select: "Gum Arabic Hashab", "Solar-dried foods", "Other") · Volume (tonnes) "e.g. 20"
  - Destination country "e.g. Germany"
  - Message textarea 3 rows "Grade, packing or delivery requirements"
  - Primary Button lg full-width "Send request"
- Success state: green notice (bg `#eef9f3`, border `#dcf2e6`, text `#1f6b46`, radius 8px): "Thank you. Our sales team will contact you shortly." + outline Button "Close".
- Behaviour: close on overlay click, × button, and **Esc**; trap focus; return focus to trigger; lock body scroll while open; `role="dialog" aria-modal="true" aria-labelledby`.

---

## 6. Shared UI components (from the Single Window design system — recreate)
**Button** — pill (`border-radius: 999px`), font weight 600, `white-space: nowrap`, transitions 120ms `cubic-bezier(.2,0,.2,1)`; press `translateY(.5px)`; focus ring `0 0 0 3px rgba(42,138,91,.35)`.
- Sizes: sm 34px h / `0 16px` / 14px · md 44px / `0 22px` / 16px · lg 52px / `0 30px` / 18px.
- Variants:
  - `primary`: bg `linear-gradient(180deg,#2a8a5b 0%,#1f6b46 55%,#17573a 100%)`, white, border `1px solid #1f6b46`; hover `filter: brightness(1.12)`.
  - `accent`: bg `#fcc326`, text `#13281e`, border `#fcc326`; hover `#e3a90f`.
  - `outline`: bg `#fff`, text `#1f6b46`, `1.5px solid #1f6b46`; hover bg `#eef9f3`.
- Props: `variant`, `size`, `block`, `type`, `onClick`, `disabled`, `children`.

**Input / Select / Textarea** — label above (14px/600, `#13281e`), control height 44px, `border: 1px solid #c0cbd9`, radius 8px, padding `0 12px`, 15–16px text; focus border `#2a8a5b` + focus ring; error state: border `#cc3333`, message 13px `#a32525` below; required asterisk. Select has a custom chevron.

---

## 7. State & behaviour summary
| Component | State | Notes |
|---|---|---|
| `ValueChain` | `activeStep: number` | `setInterval` 2000ms → `(s+1)%5`; any manual select resets timer; cleanup on unmount; pause on hover / reduced motion |
| `QuoteModal` | `isOpen`, `status: 'idle'|'submitting'|'success'|'error'` | open from Header; reset to idle on reopen |
| `ContactSection` | `status` same as above | |
| Forms | field values + errors | validate: name required (min 2), email required + valid, phone optional (`^[+0-9\s()-]{6,}$`), volume optional numeric ≥ 0 |

**Form submission**: the prototype only fakes success. Implement `submitEnquiry(payload: EnquiryPayload): Promise<void>` in `src/api/enquiry.ts` — wire to the client's backend/email service (e.g. Formspree, Resend, EmailJS, or a serverless function). Show a spinner/disabled button while submitting and an error message on failure: "Something went wrong. Please try again or email us directly."

```ts
export interface EnquiryPayload {
  source: 'contact' | 'quote-modal';
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  product?: 'Gum Arabic Hashab' | 'Solar-dried foods' | 'Other';
  volumeTonnes?: number;
  destinationCountry?: string;
  message?: string;
}
```

---

## 8. Content data (`src/content/content.ts`)
```ts
export interface Step { title: string; body: string; image: string }
export interface Pillar { n: string; title: string; ar: string; body: string }
export interface FoodProduct { title: string; short: string; ar: string; weight: string; swatch: string; body: string; image?: string }
export interface ModelStep { n: number; title: string; body: string; image: string }
export interface Feature { title: string; desc: string }
export interface Application { use: string; items: string }
export interface ImpactStat { value: string; label: string }
export interface GalleryItem { image: string; caption: string }

export const valueChainSteps: Step[] = [
  { title: 'Harvest', image: '/img/acacia-tear.jpg', body: 'Tears form where the acacia bark is tapped and are collected by hand once they harden on the branch.' },
  { title: 'Solar drying', image: '/img/sorting-shed-2.jpg', body: 'Gum is spread on tarps in open, shaded sheds and dried by the sun — no fuel, no emissions, less spoilage.' },
  { title: 'Hand sorting', image: '/img/drying-tarps.jpg', body: 'Trained teams sort each batch by size, colour and cleanliness to separate the grades.' },
  { title: 'Cleaning & grading', image: '/img/cleaning-machine.jpg', body: 'Mechanical cleaning removes bark and sand; our lab checks each lot before it is packed.' },
  { title: 'Pack & export', image: '/img/loading-truck.jpg', body: 'Packed in labelled 50 kg bags, palletised and loaded into containers at our own facility.' },
];

export const pillars: Pillar[] = [
  { n: '01', title: 'Local manufacturing', ar: 'التصنيع المحلي', body: 'Drying, cleaning, grading and packing happen in our own facility.' },
  { n: '02', title: 'Stronger value chains', ar: 'تعزيز سلاسل القيمة', body: 'Direct links between farmers, processors and buyers.' },
  { n: '03', title: 'Fewer post-harvest losses', ar: 'تقليل فاقد ما بعد الحصاد', body: 'Fast solar drying and covered storage protect the crop.' },
  { n: '04', title: 'Farmers and communities', ar: 'دعم المزارعين والمجتمعات', body: 'Steady income for growers, collectors and sorting teams.' },
  { n: '05', title: 'Renewable energy', ar: 'الطاقة المتجددة', body: 'The sun does the drying — clean, free and abundant.' },
  { n: '06', title: 'Corporate responsibility', ar: 'المسؤولية المجتمعية', body: 'Reinvesting in skills, livelihoods and acacia landscapes.' },
];

export const foods: FoodProduct[] = [
  { title: 'Dried tomato powder', short: 'Tomato powder', ar: 'بودرة الطماطم المجففة', weight: '250 g', swatch: 'radial-gradient(circle at 35% 35%,#e0664a,#9c2f1f)', body: 'Concentrated flavour and colour for sauces, soups and seasonings.' },
  { title: 'Dried okra powder', short: 'Okra powder', ar: 'بودرة البامية المجففة', weight: '250 g', swatch: 'radial-gradient(circle at 35% 35%,#9bb06a,#5d7436)', body: 'A traditional thickener for stews, ready to use all year round.' },
  { title: 'Dried onion powder', short: 'Onion powder', ar: 'بودرة البصل المجفف', weight: '250 g', swatch: 'radial-gradient(circle at 35% 35%,#f4e6c8,#cfae7a)', body: 'Fine, aromatic powder for cooking, spice blends and food processing.' },
  { title: 'Dried garlic powder', short: 'Garlic powder', ar: 'بودرة الثوم المجفف', weight: '250 g', swatch: 'radial-gradient(circle at 35% 35%,#faf3e3,#d8c6a0)', body: 'Pure garlic, sun-dried and milled — no additives.' },
];

export const sustainabilityModel: ModelStep[] = [
  { n: 1, title: 'Village-level sourcing', image: '/img/sorting-women.jpg', body: 'We buy gum and fresh produce directly from farmers and collectors at the farm gate — fair prices, paid locally, fully traceable.' },
  { n: 2, title: 'Farm-gate solar processing', image: '/img/drying-tarps.jpg', body: 'Produce is dried in clean, solar-powered units close to the farm, then sorted and milled by local teams — many of them women.' },
  { n: 3, title: 'Food & beverage customers', image: '/img/kraft-bags.jpg', body: 'Clean, shelf-stable ingredients reach manufacturers, food service and exporters — with less waste at every step.' },
];

export const productFeatures: Feature[] = [
  { title: 'No added preservatives', desc: 'Dried by the sun, nothing else.' },
  { title: 'Nutrient dense', desc: 'Low-heat drying keeps nutrients and colour.' },
  { title: 'Low carbon footprint', desc: 'Solar energy instead of diesel or gas.' },
  { title: 'Fully traceable', desc: 'Every lot traced back to its source.' },
  { title: 'Empowers women farmers', desc: 'Income for women in sourcing and processing.' },
];

export const applications: Application[] = [
  { use: 'Seasonings & spice blends', items: 'Onion, garlic and tomato powder' },
  { use: 'Soups & sauces', items: 'Tomato and onion powder' },
  { use: 'Stews & traditional dishes', items: 'Okra powder' },
  { use: 'Ready meals', items: 'Onion, garlic, tomato and okra powder' },
  { use: 'Beverages & confectionery', items: 'Gum arabic Hashab' },
  { use: 'Pharmaceuticals', items: 'Gum arabic Hashab' },
];

export const impact: ImpactStat[] = [ // PLACEHOLDERS — client to supply
  { value: '—', label: 'Farmers in our sourcing network' },
  { value: '—', label: 'Women employed in sourcing and processing' },
  { value: '—', label: 'Tonnes of post-harvest losses prevented' },
  { value: '—', label: 'Tonnes of CO₂ avoided with solar drying' },
];

export const gallery: GalleryItem[] = [
  { image: '/img/warehouse-1.jpg', caption: 'Warehouse' },
  { image: '/img/lab-2.jpg', caption: 'Quality lab' },
  { image: '/img/bagging.jpg', caption: 'Bagging line' },
  { image: '/img/pallets.jpg', caption: 'Palletised stock' },
  { image: '/img/facility-exterior.jpg', caption: 'Loading bay' },
  { image: '/img/container-2.jpg', caption: 'Container loading' },
  { image: '/img/hall.jpg', caption: 'Processing hall' },
];

export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61561040212605';
```

---

## 9. Design tokens (`src/styles/tokens.css`)
```css
@font-face { font-family: 'Lusail'; src: url('/fonts/Lusail-Light.ttf') format('truetype'); font-weight: 300; font-display: swap; }
@font-face { font-family: 'Lusail'; src: url('/fonts/Lusail-Regular.ttf') format('truetype'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'Lusail'; src: url('/fonts/Lusail-Medium.ttf') format('truetype'); font-weight: 500; font-display: swap; }
@font-face { font-family: 'Lusail'; src: url('/fonts/Lusail-Bold.ttf') format('truetype'); font-weight: 700; font-display: swap; }
/* IBM Plex Mono via Google Fonts: <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet"> */

:root {
  --font-sans: 'Lusail', system-ui, sans-serif;   /* bilingual Arabic + Latin */
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;

  /* Brand (from the SGA logo: green / gold / red) */
  --green-950: #0f2018;   /* deepest overlay */
  --green-900: #13281e;   /* dark bands, primary text */
  --green-850: #22392c;   /* image fallback on dark */
  --green-700: #1f6b46;   /* brand green: links, eyebrows, contact card */
  --green-650: #17573a;   /* link hover, gradient end */
  --green-600: #2a8a5b;   /* gradient start, focus */
  --green-100: #dcf2e6;
  --green-50:  #eef9f3;
  --gold-500:  #fcc326;   /* accent */
  --gold-600:  #e3a90f;   /* accent hover */
  --gold-700:  #b07d06;   /* numbers on light */
  --red-600:   #cc3333;   /* logo red — errors / rare accents only */

  /* Warm neutrals */
  --cream-50:  #f7f3ea;   /* page bg */
  --cream-100: #f1ede3;   /* subtle hover */
  --sand-200:  #ece4d3;   /* product band bg */
  --sand-300:  #e4dccb;   /* card borders / image fallback */
  --sand-400:  #ddd4c2;   /* hairlines on cream */
  --sand-500:  #d3c8b2;   /* hairlines on sand */
  --ink-700:   #3d4a42;   /* body on light */
  --ink-600:   #4d5a52;
  --ink-500:   #5d6a61;   /* muted */
  --ink-400:   #6b7369;   /* labels */

  /* Text on dark */
  --on-dark-1: #ffffff;
  --on-dark-2: #dbe5de;
  --on-dark-3: #cfdcd3;
  --on-dark-4: #b9cbbf;
  --on-dark-5: #9fb3a6;
  --on-dark-6: #7f9787;

  --border-input: #c0cbd9;

  /* Radii */
  --radius-sm: 8px; --radius-md: 12px; --radius-pill: 999px;
  /* Spacing (4px grid) */
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-5: 24px; --space-6: 32px; --space-7: 40px; --space-8: 48px; --space-9: 64px; --space-10: 80px;
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(13,22,38,.08), 0 1px 2px rgba(13,22,38,.04);
  --shadow-md: 0 4px 12px rgba(13,22,38,.08), 0 1px 3px rgba(13,22,38,.05);
  --shadow-lg: 0 12px 28px rgba(13,22,38,.12), 0 4px 8px rgba(13,22,38,.06);
  --shadow-xl: 0 24px 56px rgba(6,50,95,.18);
  --focus-ring: 0 0 0 3px rgba(42,138,91,.35);
  /* Motion */
  --ease-standard: cubic-bezier(.2,0,.2,1);
  --duration-fast: 120ms; --duration-base: 200ms;

  --container: 1320px;
}
```
**Type scale** (all Lusail unless mono):
- Hero H1 `clamp(48px, 8.6vw, 132px)` / .94 / 700 / -0.04em
- Section H2 `clamp(34px, 4.4vw, 60px)` / 1–1.04 / 700 / -0.03em
- H3 large `clamp(26px, 3.2vw, 44px)` / 1.08 / 700 / -0.02em
- Card title 19–22px / 700 / -0.01em
- Body L 17–18px / 1.6–1.65 · Body 15–16px / 1.55–1.6 · Small 13–14.5px
- Eyebrow 12px / 600 / .12em / uppercase
- Mono numbers 10–13px IBM Plex Mono

**Rules**: no emoji, sentence case everywhere (uppercase only for eyebrows), no decorative infinite animation (the value-chain auto-advance is functional), hairline 1px borders, soft low-spread shadows.

---

## 10. Assets
All photos are the client's own (supplied via WhatsApp). In `img/` in this folder → copy to `public/img/`:
`logo-sga.jpg` (low-res JPEG with lavender bg — **request a vector/PNG logo from the client**), `acacia-tear.jpg`, `gum-tears.jpg`, `sorting-shed.jpg`, `sorting-shed-2.jpg`, `drying-tarps.jpg`, `sorting-women.jpg`, `cleaning-machine.jpg`, `loading-truck.jpg`, `bag-label.jpg`, `kraft-bags.jpg`, `warehouse-1.jpg`, `lab-2.jpg`, `bagging.jpg`, `pallets.jpg`, `facility-exterior.jpg`, `container-2.jpg`, `hall.jpg`.
Optimise to WebP/AVIF with `srcset` (e.g. `vite-imagetools`), `loading="lazy"` below the fold, explicit `width`/`height` or `aspect-ratio` to avoid layout shift.

Fonts: `fonts/Lusail-{Light,Regular,Medium,Bold}.ttf` → `public/fonts/`. IBM Plex Mono from Google Fonts.

## 11. SEO / meta
- `<title>Al Shagara Gum Arabic — Sun-dried gum arabic & solar-dried foods from Sudan</title>`
- Meta description: "Al Shagara (SGA) sources, solar-dries and exports Gum Arabic Hashab and solar-dried food powders from Sudan — supporting farmers, reducing post-harvest losses and using renewable energy."
- Open Graph image: `gum-tears.jpg`. `lang="en"`. Organization JSON-LD with Facebook `sameAs`.

## 12. Open items for the client
- Real impact figures (section 5.7.5).
- Real pack sizes and pack photos for the four powders.
- Contact email/phone/address for the footer and the form's delivery target.
- Vector logo; verified Arabic copy.
- Full Arabic (RTL) version — content is already centralised in `content.ts`.

## 13. Acceptance checklist
- [ ] Matches the HTML reference at 1440px, 1024px, 768px and 375px widths.
- [ ] Value chain auto-advances every 2s; manual selection resets the timer.
- [ ] Quote modal opens from header, closes via overlay/×/Esc, focus trapped, never clipped on short screens.
- [ ] Both forms validate, show submitting/success/error states.
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, no console errors.
- [ ] `npm run build` passes with `strict: true` TypeScript.
