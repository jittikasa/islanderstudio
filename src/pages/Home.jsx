import { Link } from 'react-router-dom'
import { useState } from 'react'
import SEO, { StructuredData, organizationSchema, websiteSchema } from '../components/SEO'
import { AppIconDisplay } from '../components/AppIcon'
import { AppScreenshotDisplay } from '../components/AppScreenshot'
import './Home.css'

export default function Home() {
  const [selectedApp, setSelectedApp] = useState('shellist')

  const apps = {
    shellist: {
      id: 'shellist',
      name: 'Shellist',
      tagline: 'Build habits like pearls',
      category: 'Productivity',
      year: '2024',
      color: '#4A90A4',
      graphic: 'shell.png',
      description: 'A habit tracker that visualizes your progress as a growing pearl chain. Beautiful, private, and designed to make building habits feel like collecting treasures.',
      appStoreUrl: 'https://apps.apple.com/us/app/shellist/id6755242144'
    },
    polamoment: {
      id: 'polamoment',
      name: 'PolaMoment',
      tagline: 'Capture vintage memories',
      category: 'Photography',
      year: '2025',
      color: '#D93025',
      graphic: 'moon.png',
      description: 'Turn your iPhone into a vintage Polaroid camera. Instant photos with that distinctive retro charm, complete with shake-to-develop animations.',
      appStoreUrl: null
    }
  }

  const currentApp = apps[selectedApp]

  return (
    <>
      <SEO
        title="islanderStudio — Crafted with soul for everyday moments"
        description="Thoughtfully designed iOS apps that blend artistry with functionality. Discover Shellist for habit tracking and PolaMoment for vintage photography."
        url="https://islanderstudio.app"
      />
      <StructuredData data={[organizationSchema, websiteSchema]} />

      <div className="home-container">
        {/* Tropical background graphics */}
        <div className="tropical-bg">
          <img src="/branding/Graphics/coconuttree.png" alt="" className="bg-tree" />
          <img src="/branding/Graphics/starfish.png" alt="" className="bg-star" />
          <img src="/branding/Graphics/sun.png" alt="" className="bg-sun" />
        </div>

        {/* Header */}
        <header className="site-header">
          <Link to="/" className="logo-link">
            <img src="/branding/Logos/Logo-primary.png" alt="islanderStudio" className="logo" />
          </Link>
          <nav className="main-nav">
            <Link to="/support" className="nav-item">Support</Link>
            <a href="https://github.com/jittikasa" target="_blank" rel="noopener noreferrer" className="nav-item">
              GitHub
            </a>
          </nav>
        </header>

        {/* Hero section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Apps crafted<br />
              with <span className="highlight-text">soul</span>
            </h1>
            <p className="hero-subtitle">
              Thoughtfully designed iOS experiences<br />
              for everyday moments
            </p>
          </div>

          {/* Featured app showcase */}
          <div className="featured-app">
            <div className="app-phone">
              <div className="phone-frame">
                <AppScreenshotDisplay appId={currentApp.id} />
              </div>
              <div className="phone-icon">
                <AppIconDisplay appId={currentApp.id} size={72} />
              </div>
            </div>

            <div className="app-info-card">
              <span className="app-category" style={{ background: currentApp.color }}>
                {currentApp.category}
              </span>
              <h2 className="app-title">{currentApp.name}</h2>
              <p className="app-tagline">{currentApp.tagline}</p>
              <p className="app-description">{currentApp.description}</p>

              <div className="app-actions">
                {currentApp.appStoreUrl ? (
                  <a
                    href={currentApp.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-primary"
                  >
                    Download on App Store
                  </a>
                ) : (
                  <button className="cta-secondary" disabled>
                    Coming Soon
                  </button>
                )}
                <Link to={`/${currentApp.id}`} className="cta-link">
                  Learn more →
                </Link>
              </div>

              {/* Decorative graphic */}
              <div className="card-graphic">
                <img src={`/branding/Graphics/${currentApp.graphic}`} alt="" />
              </div>
            </div>
          </div>

          {/* App selector */}
          <div className="app-switcher">
            {Object.values(apps).map((app) => (
              <button
                key={app.id}
                className={`app-tab ${selectedApp === app.id ? 'active' : ''}`}
                onClick={() => setSelectedApp(app.id)}
                style={{ '--tab-color': app.color }}
              >
                <AppIconDisplay appId={app.id} size={32} />
                <span>{app.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="site-footer">
          <p className="footer-tagline">Crafted with soul for everyday moments</p>
          <div className="footer-links">
            <Link to="/support">Support</Link>
            <Link to="/privacy">Privacy</Link>
            <a href="mailto:support@islanderstudio.app">Contact</a>
          </div>
        </footer>
      </div>
    </>
  )
}
