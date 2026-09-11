# КРАЙ — цифровий атлас українських Карпат

An original Ukrainian-language, frontend-only editorial concept. Built with Next.js, React and TypeScript, with locally hosted fonts and seven original generated visual assets.

## Run

Requires Node.js 20.9+ and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run build
npm start
```

`build` produces the entirely static `out/` directory. It can be hosted by any static file server. No credentials, database, API, external image service or authentication is required. Stop the dev server before starting the production preview on the same port.

## Experience

- Cinematic mountain cover with pointer and scroll parallax.
- Editorial field notes, Pip Ivan feature, asymmetric location stories and polonyna panorama.
- Custom illustrated topographic map with 11 selectable locations and local category filters.
- Five simulated recordings with animated waveforms; no audio tracks.
- Illustrated folklore story with an accessible reading dialog.
- Elevation profile with scroll-following marker and selectable waypoints.
- Craftsmanship editorial, filterable contact sheet and closing spread.
- Dedicated mobile layouts, keyboard navigation, visible focus and reduced-motion support.

## Source guide

- `src/app/page.tsx`: the continuous editorial journey.
- `src/app/globals.css`: visual tokens, compositions, responsive layouts and motion.
- `src/components/atlas-ui.tsx`: interactive atlas components and small visual primitives.
- `src/lib/atlas.ts`: local places, recordings, archive entries and stories.
- `public/images/`: original optimized WebP imagery and provenance.
- `DESIGN.md`: the durable visual direction.
- `docs/image-prompts.md`: image generation prompt set.

## Verify

```sh
npm run typecheck
npm run format:check
npx playwright install chromium
npm test
npm run build
```

Browser tests cover hydration, map selection, archive filters, recording controls, story dialog dismissal, mobile navigation, image loading and horizontal overflow.

This is an artistic concept. Images are generated interpretations; copy and archive entries are fictional editorial material. Map positioning, route profile, weather and coordinates are illustrative and are not live navigation data.
