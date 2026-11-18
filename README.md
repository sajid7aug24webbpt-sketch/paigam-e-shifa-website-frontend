# Paigam-e-Shifa — Website + Admin (Frontend)

Standalone Next.js 14 (App Router) + React + TypeScript + Tailwind CSS rebuild of the
Paigam-e-Shifa website and admin panel. No store features — the Dawakhana store was
removed from the original site and is intentionally not rebuilt here.

## Setup

```bash
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL to your Flask backend
npm install
npm run dev                  # http://localhost:3000
npm run build
npm run start                # production, port 3000
```

## Environment

| Variable | Default | Notes |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api` | Flask backend base URL |
| `NEXT_PUBLIC_SITE_URL` | `https://paigam-e-shifa.example` | **Placeholder — set the real domain after hosting.** Used by sitemap.xml, robots.txt and Open Graph URLs. |

## How the admin is reached

There is **no admin link anywhere** on the public site (no header button, mobile-menu
entry or footer link). Staff open the admin by typing `/admin` in the browser address
bar. Sign in with a staff username + password; accounts with `mustChangePassword` are
forced to set a new password first. There is no unauthenticated password reset — a
Super Admin resets a staff password from Admin → Users.

## Routes

Public: `/`, `/ruhani-ilaj`, `/services`, `/about`, `/posts`, `/posts/[slug]`,
`/blog`, `/blog/[slug]`, `/whatsapp`, `/youtube`, `/location`, `/rabta`.
Admin: `/admin` (login / dashboard), `/admin/posts`, `/admin/posts/new`,
`/admin/posts/[id]/edit`, `/admin/categories`, `/admin/tags`, `/admin/media`,
`/admin/trash`, `/admin/users` (Super Admin only), `/admin/settings`.

Public pages fetch posts from the API and degrade gracefully: if the backend is not
running, `next build` still passes and the pages render with an empty posts section.

## Docker

```bash
docker build -t paigam-e-shifa-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://host.docker.internal:5000/api paigam-e-shifa-frontend
```

## Verified facts only

All clinic facts on the site come from the verified record: Paigam-e-Shifa,
Ruhani + Hakeem Clinic, Hakeem Hafiz Muhammad Tahir (D.M.H.S • F.T.J • PhD),
Tajpura, House No. 37, Gali No. 16, Lahore Cantt, District Lahore,
hours 10:00 AM – 9:00 PM (days not specified), website phone 0320 2022226,
YouTube Jamiatulquba @JamiaTulQuba (2.4K subscribers), WhatsApp channel
علم و علاج / Ilm o Ilaj (216 followers). Ruhani Ilaj is presented as a spiritual
practice, not a medical treatment; no cure guarantees, no medical claims,
no fake reviews or counts.
