# КРАЙ — design direction

## Context and register

Ukrainian-language cultural atlas, portfolio concept. Brand/editorial register. One continuous documentary journey, no backend or product dashboard. The supplied user brief is the product authority.

## North star

A field atlas left open on a mountain: monumental condensed type, cinematic mist, precise cartographic marginalia, tactile print surfaces. The signature is the enormous КРАЙ masthead floating over layers of Carpathian ridges.

## Tokens and runtime ownership

Canonical runtime tokens live in `src/app/globals.css` under `:root`; this document records their intent.

- Paper `#e9e7dc`; ink `#242a23`; moss `#555b40`; forest `#202920`; ember `#a9422c`; pale ink `#aaa99a`.
- Display: locally hosted Space Grotesk Variable, 500–600; secondary editorial: EB Garamond Variable, 400 italic/500; body: Plus Jakarta Sans Variable, 400–600; utility: Space Grotesk Variable in compact uppercase with generous tracking. No monospace role.
- Page gutter: clamp(22px, 4.2vw, 76px). Body 14–17px. Utility 10–12px. Editorial titles 64–160px. Hero 31vw with mobile-specific sizing.
- No general card primitive, rounded panel system, gradients as decoration, or stock dashboard grids.

## Composition

Fullscreen panoramic cover → asymmetric field notes → mountain feature → dark contour map → location triptych → calm meadow spread → audio index → woodcut folklore → elevation journey → cultural artifact → contact sheet → giant closing statement.

## Behavior and accessibility

Navigation uses page anchors; mobile menu is a disclosure. Map points support click, hover and focus and display a persistent selected preview. Audio is explicitly a visual demonstration without recordings. Story dialogs use native modal focus management and Escape dismissal. Archive categories filter locally and show counts. Reduced motion disables parallax/reveals. Native scrolling, operable themed scrollbars, visible focus, no custom cursor replacing the native pointer.

## Imagery

Generated concept imagery is stored in public/images. It is interpreted, not documentary evidence. All dimensions reserved. Main photographic assets load locally; image generation provenance recorded separately.

## Verification

Typecheck and static export build; Playwright desktop/mobile visual inspection and interaction tests; keyboard, reduced-motion, image loading and horizontal-overflow checks.
