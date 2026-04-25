---
name: Serene Remembrance
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#434840'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#73796f'
  outline-variant: '#c3c8bd'
  surface-tint: '#496640'
  primary: '#334f2b'
  on-primary: '#ffffff'
  primary-container: '#4a6741'
  on-primary-container: '#c2e4b4'
  inverse-primary: '#afd0a1'
  secondary: '#5f5f55'
  on-secondary: '#ffffff'
  secondary-container: '#e5e3d6'
  on-secondary-container: '#65655b'
  tertiary: '#404b39'
  on-tertiary: '#ffffff'
  tertiary-container: '#576350'
  on-tertiary-container: '#d1dfc6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#caecbc'
  primary-fixed-dim: '#afd0a1'
  on-primary-fixed: '#062104'
  on-primary-fixed-variant: '#324e2a'
  secondary-fixed: '#e5e3d6'
  secondary-fixed-dim: '#c8c7ba'
  on-secondary-fixed: '#1c1c14'
  on-secondary-fixed-variant: '#47473e'
  tertiary-fixed: '#d9e7ce'
  tertiary-fixed-dim: '#becbb3'
  on-tertiary-fixed: '#141e0f'
  on-tertiary-fixed-variant: '#3e4a38'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2e0'
typography:
  arabic-display:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.8'
  translation-lg:
    fontFamily: Newsreader
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  nav-item:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 600px
  edge-margin: 1.5rem
  gutter: 1rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---
 
## Brand & Style
 
This design system is built on the principles of **Minimalism** and spiritual clarity. The personality is meditative, unobtrusive, and reverent, designed to fade into the background so the user can focus entirely on the *dhikr* (remembrance). 
 
The emotional response should be one of tranquility and "Sakinah" (calmness). By utilizing significant whitespace and a restricted organic palette, the UI reduces cognitive load. It avoids flashy transitions or heavy decorative elements, favoring a "paper-like" digital experience that feels timeless and respectful of its religious context.
 
## Colors
 
The palette is inspired by nature and traditional manuscripts. 
- **Primary:** A deep, muted Sage Green used for key actions and focal points.
- **Secondary:** A warm "Parchment" white for card surfaces to reduce the harshness of pure white.
- **Tertiary:** A dusty Moss Green for inactive states or subtle accents.
- **Neutral:** A "Warm Smoke" white for global backgrounds.
 
In **Dark Mode**, the system shifts to deep charcoal greens and desaturated forest tones to maintain eye comfort during pre-dawn (Fajr) or evening prayers.
 
## Typography
 
This design system uses a dual-font approach to balance tradition with modern utility. 
- **Newsreader** (Serif) is used for Arabic text and English translations to provide an elegant, literary feel. The Arabic script requires a generous `line-height` (1.8x) to ensure diacritics (harakat) are perfectly legible and do not overlap.
- **Manrope** (Sans-serif) handles functional UI elements, metadata, and labels, providing a clean, modern contrast that ensures the app feels like a contemporary tool.
 
## Layout & Spacing
 
The layout follows a **Fixed Grid** philosophy optimized for mobile-first consumption. On larger screens, the content remains centered in a narrow 600px column to mimic the proportions of a book or handheld scroll, preventing eye strain.
 
Spacing is generous. We use a "breathe-first" approach where vertical rhythm is prioritized over information density. Each *dhikr* verse is treated as a singular moment, separated by `stack-lg` margins to ensure the user isn't overwhelmed by the list.
 
## Elevation & Depth
 
Hierarchy is achieved through **Tonal Layers** and **Low-contrast Outlines** rather than heavy shadows. 
- Surfaces use subtle shifts in background color (e.g., a card being 2% darker or lighter than the base background).
- When a "lift" is necessary, use an ultra-diffused shadow: `0px 4px 20px rgba(0, 0, 0, 0.04)`.
- Use soft, 1px borders in a color only slightly different from the background to define boundaries without creating visual noise.
 
## Shapes
 
The shape language is **Rounded**, reflecting the organic and soft nature of the brand. Sharp corners are avoided to maintain a "friendly" and "safe" aesthetic. 
- Primary containers (Cards) use `rounded-lg` (1rem).
- Interactive elements like buttons and progress indicators use `rounded-xl` (1.5rem).
- Small functional elements (Chips) use a full pill shape.
 
## Components
 
- **Dhikir Card:** The core component. Features a large serif Arabic text block, followed by a secondary-colored divider and the translation. Use ample internal padding (2rem).
- **Tasbih Counter (Floating Action):** A large, tactile circular button at the bottom right. It uses the Primary color with a subtle inner glow to signify it's the main interaction point.
- **Progress Ring:** A minimalist, thin-stroke circle at the top of the card indicating how many repetitions remain for the current verse.
- **Navigation:** A simple bottom-bar with 3-4 minimalist line icons (Morning, Evening, Settings, Favorites). No labels; use a small dot indicator for the active state.
- **Toggle Switches:** Used for Light/Dark mode and Audio/Transliteration settings. These should be soft-tinted, avoiding high-contrast "on" states—prefer the Primary green for the active track.
- **Chips:** Small, rounded-pill indicators for "Sahih" or "Source" metadata, using the Tertiary color with a low-opacity background.