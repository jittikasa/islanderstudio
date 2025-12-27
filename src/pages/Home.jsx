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
      subtitle: 'One pearl at a time',
      category: 'Productivity',
      year: '2024',
      platform: 'iOS',
      status: 'Available',
      color: '#4A90A4',
      accentColor: '#E6F2F5',
      description: 'A habit tracker that visualizes your progress as a growing pearl chain. Beautiful, private, and designed to make building habits feel like collecting treasures.',
      appStoreUrl: 'https://apps.apple.com/us/app/shellist/id6755242144'
    },
    polamoment: {
      id: 'polamoment',
      name: 'PolaMoment',
      tagline: 'Capture vintage memories',
      subtitle: 'Like it\'s 1999',
      category: 'Photography',
      year: '2025',
      platform: 'iOS',
      status: 'Coming Soon',
      color: '#D93025',
      accentColor: '#FAFAF5',
      description: 'Turn your iPhone into a vintage Polaroid camera. Instant photos with that distinctive retro charm, complete with shake-to-develop animations.',
      appStoreUrl: null
    }
  }

  const currentApp = apps[selectedApp]
  const appList = Object.values(apps)
  const currentIndex = appList.findIndex(a => a.id === selectedApp)

  const nextApp = () => {
    const next = appList[(currentIndex + 1) % appList.length]
    setSelectedApp(next.id)
  }

  const prevApp = () => {
    const prev = appList[(currentIndex - 1 + appList.length) % appList.length]
    setSelectedApp(prev.id)
  }

  return (
    <>
      <SEO
        title="Islander Studio - Crafted with soul for everyday moments"
        description="Thoughtfully designed iOS apps that blend artistry with functionality. Discover Shellist for habit tracking and PolaMoment for vintage photography."
        url="https://islanderstudio.app"
        keywords="iOS apps, mobile apps, Shellist, habit tracker, PolaMoment, polaroid camera, indie apps, boutique app studio"
      />
      <StructuredData data={[organizationSchema, websiteSchema]} />

      <main className="portfolio-layout">
        {/* Fixed Navigation Header */}
        <nav className="portfolio-nav">
          <Link to="/" className="studio-name">islanderStudio</Link>
          <div className="nav-links">
            <Link to="/support" className="nav-link">Support</Link>
            <a
              href="https://github.com/jittikasa"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              GitHub
            </a>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="portfolio-content">
          {/* Left: App Showcase */}
          <section className="showcase-area">
            <div className="app-display-large">
              <div className="display-frame" style={{ '--app-color': currentApp.color }}>
                <AppScreenshotDisplay appId={currentApp.id} />
              </div>

              {/* Floating app icon */}
              <div className="floating-icon" style={{ '--app-color': currentApp.color }}>
                <AppIconDisplay appId={currentApp.id} size={80} />
              </div>
            </div>

            {/* App selector dots */}
            <div className="app-selector">
              {appList.map((app) => (
                <button
                  key={app.id}
                  className={`selector-dot ${selectedApp === app.id ? 'active' : ''}`}
                  onClick={() => setSelectedApp(app.id)}
                  style={{ '--dot-color': app.color }}
                  aria-label={`View ${app.name}`}
                />
              ))}
            </div>
          </section>

          {/* Right: App Details */}
          <section className="details-area">
            <div className="details-content">
              {/* Category badge */}
              <div className="category-badge" style={{ background: currentApp.color }}>
                {currentApp.category}
              </div>

              {/* App name */}
              <h1 className="app-name">
                {currentApp.name}
                <span className="app-year">{currentApp.year}</span>
              </h1>

              {/* Tagline */}
              <p className="app-tagline">{currentApp.tagline}</p>

              {/* Meta info */}
              <div className="meta-grid">
                <div className="meta-item">
                  <span className="meta-label">Platform</span>
                  <span className="meta-value">{currentApp.platform}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Status</span>
                  <span className="meta-value">{currentApp.status}</span>
                </div>
              </div>

              {/* Description */}
              <p className="app-description">{currentApp.description}</p>

              {/* Actions */}
              <div className="app-actions">
                {currentApp.appStoreUrl ? (
                  <>
                    <a
                      href={currentApp.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn primary"
                      style={{ background: currentApp.color }}
                    >
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.05 15.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 10.25 3.51 2.59 9.05 2.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 2.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      Download
                    </a>
                    <Link to={`/${currentApp.id}`} className="action-btn secondary">
                      Details →
                    </Link>
                  </>
                ) : (
                  <Link to={`/${currentApp.id}`} className="action-btn primary" style={{ background: currentApp.color }}>
                    Learn More →
                  </Link>
                )}
              </div>

              {/* Navigation arrows */}
              <div className="app-navigation">
                <button onClick={prevApp} className="nav-arrow" aria-label="Previous app">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <span className="nav-counter">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(appList.length).padStart(2, '0')}
                </span>
                <button onClick={nextApp} className="nav-arrow" aria-label="Next app">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Decorative element */}
            <div className="decorative-graphic">
              <img
                src={`/branding/Graphics/${currentApp.id === 'shellist' ? 'shell' : 'moon'}.png`}
                alt=""
              />
            </div>
          </section>
        </div>

        {/* Bottom: Studio tagline */}
        <footer className="portfolio-footer">
          <p className="studio-tagline">
            Crafted with soul for everyday moments
          </p>
        </footer>
      </main>
    </>
  )
}
