# Islander Studio

> Crafting beautiful iOS applications that inspire and delight.

Official website for Islander Studio, home of **Shellist** and **PolaMoment**.

## Design Philosophy

Islander Studio is built with a **Tropical Modernism** aesthetic:
- **Bold typography** with distinctive font choices (Syne, DM Serif Display, Crimson Pro)
- **Tropical color palette** blending palm greens, ocean blues, and sunset corals
- **Editorial layouts** with asymmetric grids and generous white space
- **Smooth animations** and micro-interactions for delightful user experience

## Tech Stack

- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Custom CSS with CSS Variables
- **Backend:** Cloudflare Workers + D1 (SQLite) + R2 (Storage)
- **Deployment:** Cloudflare Pages

## Our Apps

### Shellist
Build habits like pearls. Transform your life one habit at a time with beautiful pearl visualizations, powerful analytics, and motivational tools.

### PolaMoment
Capture vintage-style Polaroid photos on your iOS device. Transform everyday moments into timeless memories.

## Development

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
islanderstudio/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Route pages
│   ├── lib/             # Utilities and API client
│   ├── App.jsx          # Main app with routing
│   └── index.css        # Global styles
├── public/              # Static assets
├── workers/             # Cloudflare Workers API
├── data/                # Local SQLite database
└── content/             # Blog content drafts
```

## Blog & Content Management

Islander Studio uses a custom CMS built on Cloudflare's edge stack:

- **D1 Database** - SQLite at the edge for posts, categories, tags, and authors
- **R2 Storage** - Object storage for media uploads
- **Workers API** - Serverless API for content management
- **Admin Dashboard** - Built-in admin UI at `/admin`

### Local Development

```bash
# Initialize local database
npm run db:init

# Seed with sample data
npm run db:seed

# Start workers dev server (in workers/ directory)
cd workers && npm run dev
```

## Deployment

### Cloudflare Pages

See `docs/DEPLOYMENT.md` for full deployment guide.

**Quick summary:**
1. Frontend deploys to Cloudflare Pages (auto-deploy on push to `main`)
2. API runs on Cloudflare Workers at `api.islanderstudio.app`
3. Database: Cloudflare D1 (SQLite at edge)
4. Storage: Cloudflare R2 (for media uploads)

## Pages

- **/** - Homepage with app showcase
- **/shellist** - Shellist app detail page
- **/polamoment** - PolaMoment app detail page
- **/blog** - Blog listing page
- **/blog/:slug** - Individual blog post page
- **/privacy** - Privacy Policy
- **/terms** - Terms of Service
- **/support** - Support & FAQ
- **/admin** - Admin dashboard (protected)

## Privacy

All Islander Studio apps are built with privacy first:
- Local data storage
- Optional iCloud sync
- No tracking or analytics
- No data selling

See our [Privacy Policy](https://islanderstudio.app/privacy) for details.

## Contact

- **Email:** support@islanderstudio.app
- **Website:** https://islanderstudio.app

## License

© 2025 Islander Studio. All rights reserved.
