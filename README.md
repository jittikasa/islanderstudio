# 🏝️ Islander Studio

> Crafting beautiful iOS applications that inspire and delight.

Official website for Islander Studio, home of **Shellist** and **PolaMoment**.

## 🎨 Design Philosophy

Islander Studio is built with a **Tropical Modernism** aesthetic:
- **Bold typography** with distinctive font choices (Syne, DM Serif Display, Crimson Pro)
- **Tropical color palette** blending palm greens, ocean blues, and sunset corals
- **Editorial layouts** with asymmetric grids and generous white space
- **Smooth animations** and micro-interactions for delightful user experience

## 🚀 Tech Stack

- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Custom CSS with CSS Variables
- **Backend:** Cloudflare Workers + D1 (SQLite) + R2 (Storage)
- **Deployment:** Cloudflare Pages
- **SEO:** Optimized meta tags, semantic HTML

## 📱 Our Apps

### Shellist
Build habits like pearls. Transform your life one habit at a time with beautiful pearl visualizations, powerful analytics, and motivational tools.

**Features:**
- Pearl chain visualization
- Smart analytics & insights
- Vision board integration
- Privacy-first design
- Widget support

### PolaMoment
Capture vintage-style Polaroid photos on your iOS device. Transform everyday moments into timeless memories.

**Features:**
- Authentic Polaroid aesthetic
- Vintage filters & effects
- Instant photo magic
- Beautiful memory sharing

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
islanderstudio/
├── src/
│   ├── components/      # Reusable components (Header, Footer)
│   ├── pages/           # Route pages (Home, Shellist, PolaMoment, Blog, etc.)
│   ├── lib/             # Utilities (Sanity client)
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # App entry point
│   └── index.css        # Global styles & design system
├── public/              # Static assets
├── sanity-schema/       # Sanity CMS schema files & setup guide
├── index.html           # HTML template
├── workers/             # Cloudflare Workers API
└── package.json         # Dependencies & scripts
```

## 🎨 Design System

### Color Palette

```css
--palm-green: #2D5F3F      /* Primary actions */
--ocean-deep: #1A3A52      /* Dark accents */
--sunset-coral: #E85D54    /* Secondary actions */
--lagoon-teal: #4A90A4     /* Highlights */
--sand-warm: #F4EDE4       /* Backgrounds */
--shell-white: #FDFBF7     /* Main background */
```

### Typography

- **Display:** Syne (800/700/600)
- **Headings:** DM Serif Display (400)
- **Body:** Crimson Pro (400/600)

### Spacing System

Based on 8px grid:
- xs: 8px
- sm: 16px
- md: 24px
- lg: 40px
- xl: 64px
- 2xl: 96px
- 3xl: 128px

## 📝 Blog & Content Management

Islander Studio uses **Sanity CMS** (headless CMS) for blog content management.

### Why Sanity?

- ✅ **Generous free tier** (50k documents, 1M API requests/month)
- ✅ **Cloud-hosted** (no server setup needed)
- ✅ **Great React integration** (built for modern frameworks)
- ✅ **Real-time content studio** (nice editing experience)
- ✅ **Free CDN** for images/assets

### Setting Up the Blog

1. **Create a Sanity Project:**

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Create a new Sanity Studio project
sanity init

# Follow the prompts:
# - Project name: "Islander Studio Blog"
# - Dataset: "production"
# - Template: "Clean project with no predefined schema"
```

2. **Add the Schemas:**

Copy the schema files from `sanity-schema/` to your Sanity Studio project:

```bash
# Copy schemas
cp sanity-schema/*.js path/to/your-sanity-studio/schemas/
```

Update your Sanity Studio's `schemas/index.js`:

```javascript
import post from './post'
import author from './author'
import category from './category'

export const schemaTypes = [post, author, category]
```

3. **Deploy Sanity Studio:**

```bash
# In your Sanity Studio project directory
sanity deploy
```

This gives you a URL like: `https://your-project.sanity.studio`

4. **Configure Environment Variables:**

Create a `.env` file in the project root:

```env
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

Get your project ID from:
- Sanity dashboard: https://sanity.io/manage
- Or from `sanity.json` in your Sanity Studio project

5. **Create Blog Content:**

- Go to your deployed Sanity Studio URL
- Create an Author (yourself)
- Create some Categories (e.g., "Updates", "Tutorials")
- Create Blog Posts with title, content, images, etc.
- Click "Publish"

6. **View Your Blog:**

Start the dev server and visit `/blog`:

```bash
npm run dev
# Visit http://localhost:5173/blog
```

For detailed setup instructions, see `sanity-schema/README.md`.

## 🌐 Deployment

### Cloudflare Pages

See `docs/DEPLOYMENT.md` for full deployment guide.

**Quick summary:**
1. Frontend deploys to Cloudflare Pages (auto-deploy on push to `main`)
2. API runs on Cloudflare Workers at `api.islanderstudio.app`
3. Database: Cloudflare D1 (SQLite at edge)
4. Storage: Cloudflare R2 (for media uploads)

## 📄 Pages

- **/** - Homepage with app showcase
- **/shellist** - Shellist app detail page
- **/polamoment** - PolaMoment app detail page
- **/blog** - Blog listing page (powered by Sanity CMS)
- **/blog/:slug** - Individual blog post page
- **/privacy** - Privacy Policy
- **/support** - Support & FAQ

## 🔒 Privacy

All Islander Studio apps are built with privacy first:
- Local data storage
- Optional iCloud sync
- No tracking or analytics
- No data selling
- Complete user control

See our [Privacy Policy](/privacy) for details.

## 📧 Contact

- **Email:** support@islanderstudio.app
- **Website:** https://islanderstudio.app

## 📝 License

© 2025 Islander Studio. All rights reserved.

---

**Made with care for app lovers everywhere** 🏝️
