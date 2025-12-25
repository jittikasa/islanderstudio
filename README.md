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
- **Deployment:** Netlify
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
│   ├── pages/           # Route pages (Home, Shellist, PolaMoment, etc.)
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # App entry point
│   └── index.css        # Global styles & design system
├── public/              # Static assets
├── index.html           # HTML template
├── netlify.toml         # Netlify configuration
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

## 🌐 Deployment

### Netlify (Recommended)

1. **Connect to Netlify:**
   - Push this repo to GitHub
   - Connect your GitHub repo to Netlify
   - Netlify auto-detects build settings from `netlify.toml`

2. **Configure Domain:**
   - Add `islanderstudio.app` as custom domain
   - Netlify handles SSL automatically

3. **Deploy:**
   - Pushes to `main` branch auto-deploy
   - Build command: `npm run build`
   - Publish directory: `dist`

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains your production build
# Upload to any static hosting service
```

## 📄 Pages

- **/** - Homepage with app showcase
- **/shellist** - Shellist app detail page
- **/polamoment** - PolaMoment app detail page
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
