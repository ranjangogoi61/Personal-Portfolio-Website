# Ranjan Gogoi — Portfolio

Dark-theme portfolio for a freelance frontend developer: React 19, Vite 7, Tailwind CSS 4, Framer Motion and a lightweight Three.js hero (auto-disabled on low-power devices and when reduced motion is on).

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
npm run preview    # serve the production build
npm run typecheck
```

Node 20 or newer.

## Contact form (Formspree)

The form posts to Formspree. Create a free form at https://formspree.io, then set:

```
VITE_FORMSPREE_FORM_ID=<your form id or full https://formspree.io/f/... URL>
```

- Local: copy `.env.example` to `.env`.
- Hosting: add the same variable in the host's Environment Variables settings **before** building (Vite reads it at build time, so redeploy after changing it).

Without it, the form shows a "not configured" message and visitors can still use WhatsApp / email.

## Deploy (free)

### Vercel (recommended)

1. vercel.com → Add New → Project → import this GitHub repo.
2. Framework is auto-detected as Vite (build `npm run build`, output `dist`). `vercel.json` already handles SPA routing.
3. Add `VITE_FORMSPREE_FORM_ID` under Environment Variables, then Deploy.

### Render (Static Site)

1. Render → New → Static Site → connect this repo.
2. Build command: `npm install && npm run build` — Publish directory: `dist`.
3. Add `VITE_FORMSPREE_FORM_ID` as an environment variable.
4. Redirects/Rewrites tab: add `/*` → `/index.html` (Rewrite) so unknown URLs fall back to the app.

## Project structure

```
src/
  components/   Navbar, Hero (+ Hero3DScene), About, Services, Projects, Skills, Contact, Footer
  components/ui Toast, Tooltip, Card (shadcn-style primitives actually used)
  hooks/        low-power / reduced-motion detection, toast
  assets/projects/  project card images (.webp)
  pages/        home, not-found
public/         favicon, resume PDF
scripts/generate-resume.mjs   regenerates public/ranjan-gogoi-resume.pdf  (npm run resume)
```

## Editing content

All text lives inside the section components under `src/components/`. The resume PDF is generated from `scripts/generate-resume.mjs` — edit it and run `npm run resume`.
