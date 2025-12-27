import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SEO, { StructuredData, organizationSchema, websiteSchema } from '../components/SEO'
import './Home.css'

export default function Home() {
  const [selectedApp, setSelectedApp] = useState('shellist')
  const [visualStyle, setVisualStyle] = useState('default')

  const apps = {
    shellist: {
      id: 'shellist',
      name: 'Shellist',
      tagline: 'Build habits like pearls',
      category: 'Productivity',
      releaseDate: '2024-01-15',
      platform: 'iOS 17.0+',
      status: 'Available',
      description: 'Transform your life one habit at a time with beautiful pearl visualizations, powerful analytics, and motivational tools that make habit building feel like a treasure hunt.',
      features: [
        'Pearl chain visualization',
        'Smart analytics & insights',
        'Vision board integration',
        'Privacy-first design',
        'Widget support'
      ],
      icon: '🐚',
      color: 'var(--coconut-shell)',
      appStoreUrl: 'https://apps.apple.com/us/app/shellist/id6755242144'
    },
    polamoment: {
      id: 'polamoment',
      name: 'PolaMoment',
      tagline: 'Capture vintage memories',
      category: 'Photography',
      releaseDate: 'Coming Soon',
      platform: 'iOS 17.0+',
      status: 'In Development',
      description: 'Capture vintage-style Polaroid photos on your iOS device. Transform everyday moments into timeless memories with authentic Polaroid aesthetics, filters, and that distinctive instant photo charm.',
      features: [
        'Authentic Polaroid aesthetic',
        'Vintage filters & effects',
        'Instant photo magic',
        'Share beautiful memories'
      ],
      icon: '📸',
      color: 'var(--sunset-glow)',
      appStoreUrl: null
    }
  }

  const currentApp = apps[selectedApp]

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        setSelectedApp(prev => prev === 'shellist' ? 'polamoment' : 'shellist')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <SEO
        title="Islander Studio - Crafted with soul for everyday moments"
        description="Thoughtfully designed iOS apps that blend artistry with functionality. Discover Shellist for habit tracking and PolaMoment for vintage photography."
        url="https://islanderstudio.app"
        keywords="iOS apps, mobile apps, Shellist, habit tracker, PolaMoment, polaroid camera, indie apps, boutique app studio, thoughtful design"
      />
      <StructuredData data={[organizationSchema, websiteSchema]} />

      <div className="home-grid">
        {/* Left Panel - Content */}
        <div className="content-panel">
          <div className="breadcrumb">
            <Link to="/">islanderStudio</Link>
            <span className="separator">/</span>
            <span>apps</span>
          </div>

          <div className="project-intro">
            <h1 className="project-title">Crafted with soul</h1>
            <div className="project-description">
              <p>
                Islander Studio is a boutique iOS app studio creating thoughtfully designed mobile experiences.
                Each app is crafted with intention, blending artistry with functionality.
              </p>
              <p>
                We believe great apps aren't just functional—they're delightful experiences that respect
                your time, protect your privacy, and spark joy in everyday moments.
              </p>
            </div>

            <div className="instruction">
              <div className="instruction-icon">
                <img src="/branding/Graphics/coconuttree.png" alt="" />
              </div>
              <p>Select an app to see the details</p>
            </div>
          </div>

          {/* App Metadata Panel */}
          {currentApp && (
            <div className="metadata-panel">
              <h3 className="metadata-title">{currentApp.name}</h3>

              <div className="metadata-grid">
                <div className="metadata-item">
                  <span className="metadata-label">Category</span>
                  <span className="metadata-value">{currentApp.category}</span>
                </div>

                <div className="metadata-item">
                  <span className="metadata-label">Status</span>
                  <span className="metadata-value">{currentApp.status}</span>
                </div>

                <div className="metadata-item">
                  <span className="metadata-label">Platform</span>
                  <span className="metadata-value">{currentApp.platform}</span>
                </div>

                <div className="metadata-item">
                  <span className="metadata-label">Released</span>
                  <span className="metadata-value">{currentApp.releaseDate}</span>
                </div>
              </div>

              <div className="metadata-description">
                <p>{currentApp.description}</p>
              </div>

              <div className="metadata-features">
                <span className="metadata-label">Key Features</span>
                <ul>
                  {currentApp.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              {currentApp.appStoreUrl && (
                <div className="metadata-actions">
                  <a
                    href={currentApp.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Download on App Store
                  </a>
                  <Link to={`/${currentApp.id}`} className="btn btn-outline">
                    Learn More
                  </Link>
                </div>
              )}

              {!currentApp.appStoreUrl && (
                <div className="metadata-actions">
                  <Link to={`/${currentApp.id}`} className="btn btn-primary">
                    Learn More
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Panel - App Showcase */}
        <div className="showcase-panel">
          {/* App Grid */}
          <div className="app-grid">
            {Object.values(apps).map((app) => (
              <button
                key={app.id}
                className={`app-card ${selectedApp === app.id ? 'selected' : ''}`}
                onClick={() => setSelectedApp(app.id)}
                style={{ '--app-color': app.color }}
              >
                <div className="app-icon">{app.icon}</div>
                <div className="app-name">{app.name}</div>
              </button>
            ))}
          </div>

          {/* App Display Area */}
          <div className="app-display">
            <div className="app-canvas" style={{ borderColor: currentApp.color }}>
              <div className="app-visual">
                <div className="app-icon-large">{currentApp.icon}</div>
                <h2>{currentApp.name}</h2>
                <p className="app-tagline">{currentApp.tagline}</p>
              </div>
            </div>
          </div>

          {/* Side Ribbon */}
          <div className="ribbon" style={{ background: currentApp.color }}>
            <span className="ribbon-text">{currentApp.category.toUpperCase()}</span>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="footer-controls">
          <div className="controls-left">
            <Link to="/support" className="control-link">Give Feedback</Link>
          </div>

          <div className="controls-right">
            <button
              className="nav-btn"
              onClick={() => setSelectedApp('shellist')}
              disabled={selectedApp === 'shellist'}
            >
              Previous
            </button>
            <span className="collection-indicator">
              {selectedApp === 'shellist' ? '01' : '02'} / 02
            </span>
            <button
              className="nav-btn"
              onClick={() => setSelectedApp('polamoment')}
              disabled={selectedApp === 'polamoment'}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
