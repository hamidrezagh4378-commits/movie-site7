# AGENTS.md — Lumière Beauty (Vite + React SPA)

## Setup (Base44 sandbox)
- `docker compose -f docker-compose.base44.yml up -d --build` — serves the app on host port 3000 (container 5173).
- `npm install` runs at container startup from `package.json`; there is no lockfile.
- No backend/database — all state (cart, wishlist, orders, demo account) persists in browser localStorage.

## Verify the app works
- `curl http://localhost:3000/` returns the Vite-served `index.html`.
- Open the preview: header + hero + carousels should render; add to cart updates the bag count.
- Preview-only host allowlist lives in `vite.config.js`, gated on `BASE44_PREVIEW_MODE === "1"`; with the flag unset, default Vite behavior is preserved.

## Quirks
- Product images are hotlinked Unsplash URLs (`src/data/catalog.js`); a styled monogram fallback renders on load failure. Replace with real product photography before launch.
- All site copy/promos/policies live in `src/data/content.js` (marked as sample/demo content — do not state real claims).
- Sample promo codes: GLOW15 (15%), WELCOME10 (10%). Shipping: $6.95 flat, free over $75, express $14.95.
- Google Fonts (Playfair Display + Jost) load from fonts.googleapis.com at runtime.
