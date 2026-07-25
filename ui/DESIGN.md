---
name: Real Magic Identity
colors:
  surface: '#fff8f7'
  surface-dim: '#f7d1cc'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0ee'
  surface-container: '#ffe9e6'
  surface-container-high: '#ffe2dd'
  surface-container-highest: '#ffdad5'
  on-surface: '#2a1613'
  on-surface-variant: '#5f3e3a'
  inverse-surface: '#422b27'
  inverse-on-surface: '#ffedea'
  outline: '#956e68'
  outline-variant: '#eabcb5'
  surface-tint: '#c00005'
  primary: '#bc0005'
  on-primary: '#ffffff'
  primary-container: '#ea0008'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb4a9'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e2'
  on-secondary-container: '#646464'
  tertiary: '#0058bc'
  on-tertiary: '#ffffff'
  tertiary-container: '#0070eb'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4a9'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930003'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a41'
  on-tertiary-fixed-variant: '#004493'
  background: '#fff8f7'
  on-background: '#2a1613'
  surface-variant: '#ffdad5'
  coke-red: '#F40009'
  carbon-black: '#1A1A1A'
  silver-lining: '#F2F2F2'
  pure-white: '#FFFFFF'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1440px
---

## Brand & Style

The design system embodies the "Real Magic" philosophy, pivoting from a traditional beverage provider to a "Total Beverage Company." The visual narrative is **Corporate / Modern** with a high-end lifestyle editorial edge. It prioritizes clarity, optimism, and innovation.

The brand personality is:
*   **Vibrant:** High-energy accents paired with pristine whitespace.
*   **Premium:** A focus on sophisticated typography and high-fidelity photography.
*   **Data-Driven:** Utilizing clean UI structures that suggest efficiency and real-time connectivity.

The style leans into **Minimalism** with subtle **Glassmorphism** to reflect the effervescence and transparency of the product range. We avoid cluttered legacy patterns in favor of "breathable" layouts that allow iconic brand assets to stand as the primary focus.

## Colors

The palette is anchored by the iconic **Coca-Cola Red (#F40009)**, used strategically for calls to action, brand markers, and key interactive states. To achieve a "lifestyle-oriented" feel, the system uses a high-contrast foundation of `pure-white` and `carbon-black`.

- **Primary:** Coca-Cola Red is the emotional heart of the UI.
- **Secondary:** Carbon Black provides grounding and authority for typography.
- **Neutral:** A spectrum of soft greys (like `silver-lining`) creates depth without adding visual noise.
- **Accessibility:** Ensure all text-on-red and red-on-white combinations meet WCAG AA standards for contrast.

## Typography

This design system uses **Hanken Grotesk** as a high-quality substitute for the proprietary `TCCC Unity`. It offers a similar geometric balance that is both friendly and institutional.

- **Headlines:** Set in Bold or Extra Bold weights to establish a clear information architecture.
- **Body:** Set in Regular weight with generous line height (1.5x - 1.6x) to ensure readability and a "premium" feel.
- **Data/Technical:** **JetBrains Mono** is introduced for labels, meta-data, and AI-driven infrastructure identifiers to signal the "data-fed ecosystem" of the modern Coca-Cola enterprise.
- **Scale:** Large display type should be used sparingly for maximum impact on hero sections.

## Layout & Spacing

The layout follows a **Fixed Grid** approach for desktop to maintain editorial control over whitespace, transitioning to a fluid model for tablet and mobile.

- **Desktop (1440px+):** 12-column grid with 24px gutters and 64px outer margins.
- **Tablet (768px - 1439px):** 8-column grid with 20px gutters and 32px margins.
- **Mobile (< 767px):** 4-column grid with 16px gutters and 16px margins.

Whitespace is treated as a design element. "Total Beverage" sections should utilize large vertical padding (80px - 120px) to separate different product categories (Sparkling, Hydration, Nutrition).

## Elevation & Depth

To reflect the "Real Magic" aesthetic, depth is created through **Tonal Layers** and **Glassmorphism** rather than traditional heavy shadows.

- **Surface Tiers:** Use subtle shifts in background color (White to Silver-Lining) to define content areas.
- **Frosted Overlays:** For navigation bars and modal backgrounds, use a backdrop blur (20px) with 80% opacity white. This mimics the condensation on a cold beverage, a subtle nod to the product.
- **Shadows:** When necessary, use "Ambient Shadows"—ultra-diffused (30px-50px blur), very low opacity (5-10%), with a tiny hint of red tinting in the shadow color to unify it with the brand.

## Shapes

The shape language is **Rounded**, drawing inspiration from the "Contour Bottle" and the industrial design of the "Freestyle 3.0" dispensers.

- **Primary Radius:** 0.5rem (8px) for cards and input fields.
- **Large Radius:** 1rem (16px) for major container sections and lifestyle imagery.
- **Iconography:** Icons should feature rounded caps and corners to remain approachable and soft.
- **Product Frames:** Photography of bottles or cans should always be framed in containers that respect the primary or large radius values.

## Components

- **Buttons:** Primary buttons are Solid Red with White text, using a `rounded-lg` radius. Hover states should darken the red slightly. Secondary buttons use a "ghost" style with a 1px `carbon-black` border.
- **Input Fields:** Minimalist design with a 1px `silver-lining` border that turns `coke-red` on focus. Labels use the `label-md` mono font to lean into the technical "data-driven" aspect.
- **Cards:** White backgrounds with a very subtle 1px border or a faint ambient shadow. Image-heavy cards should use "bleed" layouts where the photo reaches the top and side edges.
- **Chips/Status:** Used for beverage categories (e.g., "Zero Sugar," "Limited Edition"). These should use the `label-md` typography and pill-shaped corners.
- **Progress Bars:** Thin, sleek lines using `coke-red` to track data-driven metrics or loading states, reflecting the AI-driven infrastructure.
- **Dividers:** Horizontal lines should be thin (1px) and use `silver-lining`, providing clean section breaks without visual weight.