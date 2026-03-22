# Design System Strategy: The Financial Atelier

## 1. Overview & Creative North Star
The core objective of this design system is to transform the typically clinical and anxiety-inducing world of taxation into an experience of "The Financial Atelier." We are moving away from the "spreadsheet" aesthetic toward a "high-end editorial" feel.

**Creative North Star: The Breathable Ledger**
This system prioritizes "Negative Space as a Feature." Like a luxury travel magazine, the layout should feel curated, not cluttered. We break the rigid, boxy nature of traditional accounting apps by using intentional asymmetry—placing key metrics off-center or allowing imagery and cards to bleed across soft tonal boundaries. The result is an interface that feels sophisticated, effortless, and premium.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a "Warm Minimalist" foundation (`#f8f6f5`), punctuated by a high-energy Primary Red (`#b90036`) that signals action and confidence.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders for sectioning or grouping. 
Boundaries must be defined through:
*   **Background Shifts:** Transitioning from `surface` to `surface-container-low`.
*   **Tonal Transitions:** Using the subtle difference between `surface-container-lowest` (#ffffff) and `surface-container` (#e9e8e7) to define interactive zones.

### Surface Hierarchy & Nesting
Think of the UI as physical layers of fine stationery. 
*   **Level 0 (Base):** `surface` (#f8f6f5).
*   **Level 1 (Sectioning):** `surface-container-low` (#f2f0f0) for grouping related content.
*   **Level 2 (Interaction):** `surface-container-lowest` (#ffffff) for the primary interactive cards or input areas to make them "pop" forward.

### The "Glass & Signature" Rule
To elevate the "Airbnb-inspired" aesthetic, floating navigation bars or modal headers must use **Glassmorphism**. Apply a backdrop-blur (16px–24px) to `surface-container-lowest` at 80% opacity. 
*   **Signature Textures:** For high-impact CTAs (e.g., "File Now"), do not use flat colors. Use a linear gradient from `primary` (#b90036) to `primary-container` (#ff7481) at a 135-degree angle to provide depth and "soul."

---

## 3. Typography: Editorial Authority
The type system pairs **Plus Jakarta Sans** (Display/Headlines) with **Manrope** (Body/Labels) to balance character with extreme legibility.

*   **Display & Headline (Plus Jakarta Sans):** Used for "Hero Moments"—large tax savings numbers or welcome messages. The generous x-height feels modern and approachable.
*   **Body & Title (Manrope):** Chosen for its rhythmic spacing. Use `body-lg` (1rem) for most financial data to ensure users never squint.
*   **The Hierarchy Rule:** Always skip a weight or size in the scale when placing elements near each other (e.g., a `headline-sm` title should be followed by `body-md` text, never `title-lg`) to create an aggressive, sophisticated hierarchy that guides the eye instantly.

---

## 4. Elevation & Depth
In this system, we do not "drop shadows"; we "create atmosphere."

*   **Tonal Layering:** 90% of your hierarchy should be achieved by placing a `surface-container-lowest` (#ffffff) card onto a `surface` (#f8f6f5) background. This creates a natural, soft lift.
*   **Ambient Shadows:** When a card must float (e.g., a bottom sheet or a hovering tooltip), use a shadow with a blur of `40px` and an opacity of `4%` using a tint of `on-surface` (#2e2f2f). It should look like a soft glow, not a dark smudge.
*   **The Ghost Border:** If a container sits on an identical background color (accessibility requirement), use the `outline-variant` token at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components & Interaction

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), `full` roundedness, and `title-sm` (Manrope) for the label.
*   **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
*   **Tertiary:** Transparent background, `primary` text weight at "Semi-Bold."

### Cards & Financial Lists
*   **The "No-Divider" Rule:** Forbid the use of horizontal lines between list items. Instead, use a `3.5` (1.2rem) spacing gap or alternate very subtle background tints.
*   **Card Styling:** Use `xl` (3rem) or `lg` (2rem) corner radius. A card should feel like a smooth, tactile pebble.

### Input Fields
*   **Default State:** `surface-container-low` background, no border.
*   **Focus State:** A "Ghost Border" of `primary` at 20% opacity and a subtle scale-up effect (1.02x) to make the field feel reactive.

### Selection & Filtering (Chips)
*   **Selection Chips:** Use `secondary-container` with `on-secondary-container` text for active states. Use `full` roundedness to mimic the Airbnb search filters.

### Contextual Context: The "Tax Timeline"
Instead of a standard progress bar, use a series of staggered `surface-container-highest` cards with varying heights to create a rhythmic, editorial timeline of the user's fiscal year.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use the `20` (7rem) spacing token for top-level page margins to let the layout breathe.
*   **DO** overlap elements (e.g., a "Tax Saved" badge overlapping the corner of a card) to break the "template" feel.
*   **DO** use `primary` sparingly. It is a "vibrant spark," not a bucket of paint.

### Don't
*   **DON'T** use pure black (#000000) for text. Use `on-surface` (#2e2f2f) to maintain the "soft" aesthetic.
*   **DON'T** use `sm` (0.5rem) roundedness for large containers. It looks dated and "techy." Stay at `lg` or `xl`.
*   **DON'T** cram data. If a screen feels full, it's time to introduce a "Nested Layer" (a slide-over or a progressive disclosure element).

---

## 7. Token Quick Reference
*   **Primary Accent:** `#b90036` (The Pulse)
*   **Background:** `#f8f6f5` (The Canvas)
*   **Main Text:** `#2e2f2f` (The Ink)
*   **Corner Radius:** `xl: 3rem` (The Signature Curve)