---
name: CareerForge AI
colors:
  surface: '#0a1324'
  surface-dim: '#0a1324'
  surface-bright: '#30394b'
  surface-container-lowest: '#050e1e'
  surface-container-low: '#121c2c'
  surface-container: '#172030'
  surface-container-high: '#212a3b'
  surface-container-highest: '#2c3547'
  on-surface: '#dae2fa'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dae2fa'
  inverse-on-surface: '#283042'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#76daa0'
  primary: '#76daa0'
  on-primary: '#003920'
  primary-container: '#51b57e'
  on-primary-container: '#004226'
  inverse-primary: '#006d41'
  secondary: '#d5c4b3'
  on-secondary: '#392f23'
  secondary-container: '#514538'
  on-secondary-container: '#c3b2a2'
  tertiary: '#7ed0fd'
  on-tertiary: '#003549'
  tertiary-container: '#58acd7'
  on-tertiary-container: '#003e55'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#92f7bb'
  primary-fixed-dim: '#76daa0'
  on-primary-fixed: '#002110'
  on-primary-fixed-variant: '#005230'
  secondary-fixed: '#f2dfce'
  secondary-fixed-dim: '#d5c4b3'
  on-secondary-fixed: '#231a0f'
  on-secondary-fixed-variant: '#514538'
  tertiary-fixed: '#c3e8ff'
  tertiary-fixed-dim: '#7ed0fd'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c68'
  background: '#0a1324'
  on-background: '#dae2fa'
  surface-variant: '#2c3547'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-label:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  container-max: 1440px
  gutter: 24px
---

## Brand & Style
The design system is engineered for a high-performance career intelligence platform, blending the precision of enterprise SaaS with the forward-leaning aesthetic of modern AI tools. The brand personality is professional yet visionary, aiming to instill confidence in students while providing administrators with a powerful, data-dense environment.

The visual style is **Corporate Modern with Glassmorphic accents**, heavily inspired by the "Linear" aesthetic. The shift to a **Dark Mode** foundation creates a high-focus, premium environment that emphasizes technical sophistication and AI-driven precision. It utilizes a layered approach where depth is communicated through subtle transparency and luminous accents, evoking a sense of "intelligence" and "clarity" within a complex data landscape.

## Colors
The palette is rooted in a professional dark mode to provide a focused, low-strain reading environment for long-form data analysis.

- **Primary (Seafoam Mint):** A vibrant, energetic green used for primary actions, success states, and "AI Verified" indicators. It represents growth and digital innovation, providing a high-visibility "pop" against the dark surfaces.
- **Secondary (Champagne Cream):** A soft, luminous neutral used for subtle highlights and high-contrast text elements, providing a warm, sophisticated balance to the cool dark surfaces.
- **Tertiary (Sky Blue):** Used for data visualization, technical metadata, and interactive hover states to maintain a fresh, modern, and tech-forward feel.
- **Neutral:** A range of deep slates and greys provide the structural foundation for surfaces and containers.

**Gradients & Glass:** Use soft, multi-stop linear gradients sparingly for "hero" AI components. Glassmorphism should be applied to overlays and sidebars with a dark-based blur to create a sense of depth and immersion without sacrificing legibility.

## Typography
This design system utilizes **Inter** for its systematic, neutral, and highly readable qualities. To enhance the futuristic "AI" feel, a secondary monospaced font (Space Mono or similar) may be used for technical metadata or ID strings.

- **Headings:** Use tight letter spacing (-0.01em to -0.02em) and SemiBold/Bold weights to create a commanding hierarchy.
- **Body:** Standardized on a 16px base for optimal readability in data-heavy dashboard contexts.
- **Labels:** Use uppercase for small UI labels (e.g., table headers, category tags) to differentiate from interactive text.

## Layout & Spacing
The layout follows a **Fixed-Fluid hybrid grid**. Dashboards use a fixed left-hand navigation (240px) with a fluid content area that caps at 1440px to prevent excessive line lengths.

- **Grid:** 12-column layout for desktop with 24px gutters.
- **Rhythm:** An 8px linear scale is used for all padding and margins. 
- **Mobile:** Transition to a single-column stack with 16px horizontal margins. Navigation moves to a bottom-bar or a glassmorphic burger menu.

## Elevation & Depth
In dark mode, depth is created through "layered glass" and tonal shifting rather than traditional shadows.

1.  **Level 0 (Background):** Deepest surface (Deep Slate).
2.  **Level 1 (Surface):** Subtle elevation using a slightly lighter container color with a 1px border of `neutral / 0.1` for definition.
3.  **Level 2 (Glass Cards):** Semi-transparent dark background with `backdrop-filter: blur(12px)` and a subtle top-light inner stroke.
4.  **Shadows:** Shadows are used sparingly as "glows." Use low-opacity primary or neutral tints to suggest lift and focus on active elements.

## Shapes
The shape language is consistently rounded to humanize the high-tech aesthetic. 

- **Standard Elements:** 16px (`1rem`) corner radius for cards, modals, and large containers.
- **Small Elements:** 8px (`0.5rem`) for buttons and input fields.
- **Tags/Chips:** Fully pill-shaped for quick visual scanning.

## Components
- **Buttons:** Primary buttons use the primary Seafoam Mint. Secondary buttons are "Ghost" style with a 1px border and subtle hover states that brighten the border.
- **Cards:** Glassmorphic containers or dark-toned cards with a 1px inner stroke (border) of `neutral / 0.15`. Headings within cards should be Bold.
- **Inputs:** Darker than the background or matching the surface-container color with a subtle 1px border. Focus state triggers a Primary glow.
- **AI Insight Chips:** Use a Primary to Tertiary gradient border to signify "Generated by AI."
- **Progress Bars:** Thin (4px) with the primary Seafoam Mint for completion status, set against a dark neutral track.
- **Sidebar:** A vertical navigation bar with active states indicated by a vertical Primary line on the left and a subtle tonal shift in the background.