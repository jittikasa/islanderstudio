import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SEO, { StructuredData, organizationSchema, websiteSchema } from '../components/SEO'
import './Home.css'

export default function Home() {
  const [selectedApp, setSelectedApp] = useState('shellist')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredApp, setHoveredApp] = useState(null)

  const apps = {
    shellist: {
      id: 'shellist',
      name: 'Shellist',
      tagline: 'Build habits like pearls',
      subtitle: 'One pearl at a time',
      category: 'Productivity',
      releaseDate: 'January 2024',
      platform: 'iOS 17.0+',
      status: 'Available Now',
      price: 'Free',
      downloads: '1,000+',
      rating: '4.8',
      description: 'Transform your life one habit at a time with beautiful pearl visualizations, powerful analytics, and motivational tools that make habit building feel like a treasure hunt.',
      features: [
        'Pearl chain visualization that grows with your streaks',
        'Smart analytics dashboard with heatmaps',
        'Vision board with drag-and-drop customization',
        'Privacy-first: all data stored locally',
        'Beautiful iOS widgets for your home screen',
        'Milestone celebrations and achievements'
      ],
      color: '#4A90A4',
      secondaryColor: '#E6F2F5',
      graphic: 'shell.png',
      appStoreUrl: 'https://apps.apple.com/us/app/shellist/id6755242144'
    },
    polamoment: {
      id: 'polamoment',
      name: 'PolaMoment',
      tagline: 'Capture vintage memories',
      subtitle: 'Like it\'s 1999',
      category: 'Photography',
      releaseDate: 'Coming 2025',
      platform: 'iOS 17.0+',
      status: 'In Development',
      price: 'TBA',
      downloads: '—',
      rating: '—',
      description: 'Capture vintage-style Polaroid photos on your iOS device. Transform everyday moments into timeless memories with authentic Polaroid aesthetics, filters, and that distinctive instant photo charm.',
      features: [
        'Authentic Polaroid camera interface',
        'Vintage film filters and effects',
        'Instant photo preview with shake animation',
        'Photo collection with album organization',
        'Share to social media with Polaroid frame',
        'Customizable film styles and borders'
      ],
      color: '#D93025',
      secondaryColor: '#FAFAF5',
      graphic: 'moon.png',
      appStoreUrl: null
    }
  }

  const currentApp = apps[selectedApp]

  // Mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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

      <div className="home-grid" style={{ '--mouse-x': `${mousePosition.x}px`, '--mouse-y': `${mousePosition.y}px` }}>
        {/* Decorative Background Elements */}
        <div className="decorative-bg">
          <img src="/branding/Graphics/coconuttree.png" alt="" className="deco deco-tree" />
          <img src="/branding/Graphics/starfish.png" alt="" className="deco deco-star" />
          <img src="/branding/Graphics/flower.png" alt="" className="deco deco-flower" />
          <div className="grain-overlay"></div>
        </div>

        {/* Left Panel - Content */}
        <div className="content-panel">
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb-link">islanderStudio</Link>
            <span className="separator">/</span>
            <span className="current">apps collection</span>
          </div>

          <div className="project-intro">
            <div className="title-wrapper">
              <h1 className="project-title">
                Crafted with
                <br />
                <span className="title-highlight">soul</span>
              </h1>
              <div className="title-decoration">
                <img src="/branding/Graphics/sun.png" alt="" />
              </div>
            </div>

            <div className="project-description">
              <p>
                A boutique iOS app studio creating thoughtfully designed mobile experiences.
                Each app is a journey, crafted with care for people who appreciate the details.
              </p>
              <p className="tagline-text">
                <span className="quote-mark">"</span>
                We believe great apps aren't just functional—they're delightful experiences
                that respect your time, protect your privacy, and spark joy.
                <span className="quote-mark">"</span>
              </p>
            </div>

            <div className="instruction-card">
              <div className="instruction-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 12V16L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="instruction-text">
                <strong>Select an app</strong> to explore the details
                <br />
                <span className="instruction-hint">← Use arrow keys to navigate →</span>
              </div>
            </div>
          </div>

          {/* App Metadata Panel */}
          <div className="metadata-panel" style={{ '--accent-color': currentApp.color }}>
            <div className="metadata-header">
              <div className="app-title-group">
                <h3 className="metadata-title">{currentApp.name}</h3>
                <p className="metadata-subtitle">{currentApp.subtitle}</p>
              </div>
              <div className="status-badge" style={{ background: currentApp.color }}>
                {currentApp.status}
              </div>
            </div>

            <div className="metadata-grid">
              <div className="metadata-item">
                <span className="metadata-label">Category</span>
                <span className="metadata-value">{currentApp.category}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Platform</span>
                <span className="metadata-value">{currentApp.platform}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Released</span>
                <span className="metadata-value">{currentApp.releaseDate}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Price</span>
                <span className="metadata-value">{currentApp.price}</span>
              </div>
              {currentApp.rating !== '—' && (
                <>
                  <div className="metadata-item">
                    <span className="metadata-label">Rating</span>
                    <span className="metadata-value">
                      <span className="rating-stars">★★★★★</span> {currentApp.rating}
                    </span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Downloads</span>
                    <span className="metadata-value">{currentApp.downloads}</span>
                  </div>
                </>
              )}
            </div>

            <div className="metadata-description">
              <p>{currentApp.description}</p>
            </div>

            <div className="metadata-features">
              <span className="metadata-label">What makes it special</span>
              <ul>
                {currentApp.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="metadata-actions">
              {currentApp.appStoreUrl ? (
                <>
                  <a
                    href={currentApp.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.05 15.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 10.25 3.51 2.59 9.05 2.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 2.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    Download on App Store
                  </a>
                  <Link to={`/${currentApp.id}`} className="btn btn-outline">
                    Learn More →
                  </Link>
                </>
              ) : (
                <Link to={`/${currentApp.id}`} className="btn btn-primary">
                  Learn More →
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - App Showcase */}
        <div className="showcase-panel">
          {/* App Grid with Visual Cards */}
          <div className="app-grid">
            {Object.values(apps).map((app) => (
              <button
                key={app.id}
                className={`app-card ${selectedApp === app.id ? 'selected' : ''} ${hoveredApp === app.id ? 'hovered' : ''}`}
                onClick={() => setSelectedApp(app.id)}
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
                style={{
                  '--card-color': app.color,
                  '--card-bg': app.secondaryColor
                }}
              >
                <div className="app-card-bg">
                  <img src={`/branding/Graphics/${app.graphic}`} alt="" />
                </div>
                <div className="app-card-content">
                  <div className="app-card-title">{app.name}</div>
                  <div className="app-card-tagline">{app.tagline}</div>
                  <div className="app-card-status" style={{ color: app.color }}>
                    {app.status === 'Available Now' ? '● Available' : '○ Coming Soon'}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Large App Display */}
          <div className="app-display">
            <div className="app-canvas" style={{ borderColor: currentApp.color }}>
              <div className="canvas-decoration">
                <img src={`/branding/Graphics/${currentApp.graphic}`} alt="" className="canvas-graphic" />
              </div>
              <div className="app-visual">
                <div className="app-visual-header">
                  <div className="app-icon-placeholder" style={{ background: currentApp.color }}>
                    {currentApp.name.charAt(0)}
                  </div>
                  <div className="app-info">
                    <h2>{currentApp.name}</h2>
                    <p className="app-tagline-large">{currentApp.tagline}</p>
                  </div>
                </div>
                <div className="app-screenshot-placeholder" style={{ background: currentApp.secondaryColor }}>
                  <div className="screenshot-text">
                    <div className="screenshot-icon" style={{ color: currentApp.color }}>
                      {currentApp.id === 'shellist' ? '🐚' : '📸'}
                    </div>
                    <div className="screenshot-label">{currentApp.category}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Category Ribbon */}
          <div className="ribbon" style={{ background: currentApp.color }}>
            <div className="ribbon-content">
              <span className="ribbon-text">{currentApp.category.toUpperCase()}</span>
              <div className="ribbon-dots">
                <span className={selectedApp === 'shellist' ? 'active' : ''}></span>
                <span className={selectedApp === 'polamoment' ? 'active' : ''}></span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="footer-controls">
          <div className="controls-left">
            <Link to="/support" className="control-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 11V8M8 5H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Give Feedback
            </Link>
            <div className="footer-divider"></div>
            <a href="https://github.com/jittikasa" target="_blank" rel="noopener noreferrer" className="control-link">
              Made in Phuket 🏝️
            </a>
          </div>

          <div className="controls-right">
            <button
              className="nav-btn"
              onClick={() => setSelectedApp('shellist')}
              disabled={selectedApp === 'shellist'}
            >
              ← Previous
            </button>
            <div className="collection-indicator">
              <span className="current-index">{selectedApp === 'shellist' ? '01' : '02'}</span>
              <span className="separator">/</span>
              <span className="total">02</span>
            </div>
            <button
              className="nav-btn"
              onClick={() => setSelectedApp('polamoment')}
              disabled={selectedApp === 'polamoment'}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
