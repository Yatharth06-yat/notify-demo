# IoTify — Premium IoT Landing Page

A production-ready React 19 + Vite + Tailwind CSS landing page for "IoTify",
featuring a dark, glassmorphic, futuristic design with the NVIDIA Jetson Nano
neon illustration as the hero centerpiece.

## Tech Stack

**Front end** — React 19, Vite, Tailwind CSS, Framer Motion, Recharts,
Lucide React. GSAP and React Icons are installed and available.

**Back end** — PostgreSQL behind a small JSON API in `api/`, deployed as a
single Vercel Serverless Function and mounted straight onto the Vite dev
server so `npm run dev` runs the identical code. Sessions are HS256 JWTs;
passwords are scrypt-hashed. `pg` is the only runtime dependency the API adds.

## Getting Started

The landing pages need nothing but `npm install`. The booking form and the
admin portal need a database:

```bash
npm install
cp .env.example .env      # set DATABASE_URL and JWT_SECRET
npm run db:migrate        # create the tables
npm run db:create-admin -- you@example.com 'a-strong-password' 'Your Name'
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`), and
sign in to the portal at `/admin`. Full walkthrough in **ADMIN_SETUP.md**.

To create a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```
api/
  [...path].js        Every /api/* route, as one serverless function
  _lib/
    router.js          Route table and handlers
    db.js              Postgres pool and type parsers
    auth.js            scrypt hashing, JWT, roles and permissions
    resources.js       Field validation + camelCase <-> snake_case mapping
    http.js            Body parsing and typed HTTP errors
db/
  schema.sql          Tables, constraints and indexes (idempotent)
scripts/
  migrate.js          npm run db:migrate
  create-admin.js     npm run db:create-admin
src/
  components/
    Navbar.jsx        Sticky glass navbar with active-link underline
    Hero.jsx           Two-column hero, Jetson Nano image on the right
    Stats.jsx          Glassmorphism stats bar (4 metrics)
    Solutions.jsx       6 solution cards grid
    Footer.jsx          Footer with link columns + socials
    BackgroundField.jsx Ambient grid, glows, particles, circuit lines
  assets/
    images/
      jetson.png        Uploaded NVIDIA Jetson Nano neon illustration
  lib/
    api.js              Browser client for the API (fetch + session token)
    useCollection.js    Cached, polling collection reads
  components/admin/
    ui.jsx              Shared admin primitives (Button, Field, Badge, …)
  styles/
    index.css           Tailwind layers, site classes, and the admin design tokens
  App.jsx
  main.jsx
index.html
tailwind.config.js
postcss.config.js
vite.config.js
package.json
```

## Notes

- The Jetson Nano image is used exactly as provided — uncropped, full aspect
  ratio preserved, positioned on the right side of the hero with a subtle
  mouse-parallax tilt and floating animation.
- All colors, spacing, and typography follow the brief's token system
  (Space Grotesk for headings, Inter for body, Orbitron for stats).
- No Bootstrap, no Material UI, no Next.js — Tailwind utility classes only.
