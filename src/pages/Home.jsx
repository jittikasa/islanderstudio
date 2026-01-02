import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import SEO, { StructuredData, organizationSchema, websiteSchema } from '../components/SEO'
import './Home.css'

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [hoveredApp, setHoveredApp] = useState(null)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [stickers, setStickers] = useState([
    { id: 1, x: 78, y: 12, rotation: 5, scale: 1, category: 'Studio', name: 'islander.', tagline: 'Crafted with soul', year: '2025', color: '#4CAF50', icon: '🌴', serial: 'IS-001' },
    { id: 2, x: 5, y: 55, rotation: -12, scale: 0.9, category: 'App', name: 'Shellist', tagline: 'Shell notes', year: '2025', color: '#FFAB91', icon: '🐚', serial: 'IS-002' },
    { id: 3, x: 88, y: 70, rotation: 8, scale: 0.85, category: 'App', name: 'PolaMoment', tagline: 'Capture moments', year: '2026', color: '#78909C', icon: '📷', serial: 'IS-003' },
    { id: 4, x: 3, y: 25, rotation: -8, scale: 0.9, category: 'App', name: 'Daily Ritual', tagline: 'Mindful habits', year: '2026', color: '#FFB74D', icon: '🕯️', serial: 'IS-004' },
  ])
  const [dragging, setDragging] = useState(null)
  const containerRef = useRef(null)
  const postcardRef = useRef(null)

  useEffect(() => {
    setLoaded(true)
  }, [])

  // Handle sticker drag
  const handleStickerMouseDown = useCallback((e, stickerId) => {
    e.preventDefault()
    const sticker = stickers.find(s => s.id === stickerId)
    setDragging({ type: 'sticker', id: stickerId, sticker })
  }, [stickers])

  const handleMouseMove = useCallback((e) => {
    if (!dragging) return

    if (dragging.type === 'sticker' && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      setStickers(prev => prev.map(s =>
        s.id === dragging.id
          ? { ...s, x: Math.max(0, Math.min(95, x)), y: Math.max(0, Math.min(55, y)) }
          : s
      ))
    }
  }, [dragging])

  const handleMouseUp = useCallback(() => {
    setDragging(null)
  }, [])

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [dragging, handleMouseMove, handleMouseUp])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('support@islanderstudio.app')
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (err) {
      window.location.href = 'mailto:support@islanderstudio.app'
    }
  }

  const apps = [
    {
      id: 'shellist',
      name: 'Shellist',
      tagline: 'Build habits like pearls',
      category: 'Productivity',
      status: 'live',
      year: '2025',
      icon: '/shellist/images/App Icon.png',
      color: '#4A90A4',
      description: 'A habit tracker that visualizes your progress as a growing pearl chain.',
    },
    {
      id: 'polamoment',
      name: 'PolaMoment',
      tagline: 'Capture vintage memories',
      category: 'Photography',
      status: 'soon',
      year: '2025',
      icon: '/pola-assets/Icon-1024.png',
      color: '#D93025',
      description: 'Turn your iPhone into a vintage Polaroid camera.',
    }
  ]

  return (
    <>
      <SEO
        title="islander Studio — Apps crafted with soul"
        description="A boutique iOS studio creating thoughtfully designed mobile experiences. Discover Shellist and PolaMoment."
        url="https://islanderstudio.app"
      />
      <StructuredData data={[organizationSchema, websiteSchema]} />

      <div
        className={`home ${loaded ? 'home--loaded' : ''}`}
        ref={containerRef}
      >
        {/* Floating Mini Stamp Cards */}
        <div className="home__stickers">
          {stickers.map((sticker, index) => (
            <div
              key={sticker.id}
              className={`home__sticker home__sticker--stamp ${dragging?.id === sticker.id ? 'home__sticker--dragging' : ''}`}
              style={{
                left: `${sticker.x}%`,
                top: `${sticker.y}%`,
                '--rotation': `${sticker.rotation}deg`,
                '--scale': sticker.scale,
                '--delay': `${index * 0.1}s`,
                '--stamp-color': sticker.color,
              }}
              onMouseDown={(e) => handleStickerMouseDown(e, sticker.id)}
              data-tooltip="Drag me!"
            >
              <div className="home__floating-stamp">
                <div className="home__floating-stamp-perforated">
                  <div className="home__floating-stamp-inner">
                    <div className="home__floating-stamp-content">
                      <div className="home__floating-stamp-icon">
                        <span>{sticker.icon}</span>
                      </div>
                      <h4 className="home__floating-stamp-name">{sticker.name}</h4>
                      <p className="home__floating-stamp-tagline">{sticker.category}</p>
                    </div>
                    <div className="home__floating-stamp-footer">
                      <span className="home__floating-stamp-year">{sticker.year}</span>
                      <span className="home__floating-stamp-serial">{sticker.serial}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Section */}
        <section className="home__hero">
          <div className="home__hero-content">
            <div className="home__hero-badge">
              <span className="home__hero-badge-dot"></span>
              Studio Collection
            </div>

            <h1 className="home__hero-title">
              Apps crafted<br />
              with <span className="home__hero-accent">soul</span>
            </h1>

            <p className="home__hero-text">
              A small iOS studio, creating mobile experiences that feel personal,
              considered, and quietly delightful.
            </p>

            <div className="home__hero-actions">
              <a href="#collection" className="btn btn-primary">
                View Collection
                <span>↓</span>
              </a>
              <button
                className="btn btn-outline"
                onClick={handleCopyEmail}
              >
                {copiedEmail ? 'Copied!' : 'Say Hello'}
              </button>
            </div>
          </div>

          <div className="home__hero-meta">
            <div className="home__hero-stat">
              <span className="home__hero-stat-value">02</span>
              <span className="home__hero-stat-label">Apps</span>
            </div>
            <div className="home__hero-stat">
              <span className="home__hero-stat-value">TH</span>
              <span className="home__hero-stat-label">Phuket</span>
            </div>
            <div className="home__hero-stat">
              <span className="home__hero-stat-value">25</span>
              <span className="home__hero-stat-label">Year</span>
            </div>

            {/* Interactive Postcard */}
            <div className="home__postcard-wrapper">
              {/* Back postcard (partially visible) */}
              <div className="home__postcard-back"></div>

              {/* Front postcard */}
              <div className="home__postcard-border">
                <div className="home__postcard" ref={postcardRef}>
                  {/* Left side - Message Area */}
                  <div className="home__postcard-left">
                    <div className="home__postcard-message">
                      <p className="home__postcard-message-text">
                        Crafting apps with soul,<br />
                        one pixel at a time.
                      </p>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="home__postcard-divider"></div>

                  {/* Right side - Postmark & Address */}
                  <div className="home__postcard-right">
                    {/* Stamp placeholder and Postmark */}
                    <div className="home__postcard-header">
                      <div className="home__postcard-postmark">
                        <svg className="home__postcard-postmark-waves" viewBox="0 0 60 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 4 Q 5 1, 10 4 T 20 4 T 30 4 T 40 4 T 50 4 T 60 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                          <path d="M0 11 Q 5 8, 10 11 T 20 11 T 30 11 T 40 11 T 50 11 T 60 11" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                          <path d="M0 18 Q 5 15, 10 18 T 20 18 T 30 18 T 40 18 T 50 18 T 60 18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                          <path d="M0 25 Q 5 22, 10 25 T 20 25 T 30 25 T 40 25 T 50 25 T 60 25" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        </svg>
                        <div className="home__postcard-postmark-circle">
                          <span className="home__postcard-postmark-star">★</span>
                          <span className="home__postcard-postmark-text">POST</span>
                          <span className="home__postcard-postmark-text home__postcard-postmark-text--bottom">DEC 01</span>
                        </div>
                      </div>
                      <div className="home__postcard-stamp-placeholder">
                        <span>PLACE</span>
                        <span>STAMP</span>
                        <span>HERE</span>
                      </div>
                    </div>

                    {/* Address Section */}
                    <div className="home__postcard-address">
                      <div className="home__postcard-to">To :</div>
                      <div className="home__postcard-lines">
                        <div className="home__postcard-line"></div>
                        <div className="home__postcard-line"></div>
                        <div className="home__postcard-line"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* App Collection */}
        <section className="home__collection" id="collection">
          <div className="home__collection-header">
            <div className="home__collection-title">
              <span className="home__collection-number">№</span>
              <h2>App Collection</h2>
            </div>
            <p className="home__collection-count">{apps.length} stamps</p>
          </div>

          <div className="home__stamps">
            {apps.map((app, index) => (
              <Link
                key={app.id}
                to={`/${app.id}`}
                className={`home__stamp ${hoveredApp === index ? 'home__stamp--hovered' : ''}`}
                onMouseEnter={() => setHoveredApp(index)}
                onMouseLeave={() => setHoveredApp(null)}
                style={{
                  '--index': index,
                  '--app-color': app.color,
                }}
              >
                <div className="home__stamp-inner">
                  {/* Stamp Header */}
                  <div className="home__stamp-header">
                    <span className="home__stamp-category">{app.category}</span>
                    <span className={`home__stamp-status tag tag--${app.status}`}>
                      {app.status === 'live' ? 'Live' : 'Soon'}
                    </span>
                  </div>

                  {/* Stamp Content */}
                  <div className="home__stamp-content">
                    <div className="home__stamp-icon">
                      <img
                        src={app.icon}
                        alt={app.name}
                        onError={(e) => { e.target.style.opacity = 0 }}
                      />
                    </div>
                    <h3 className="home__stamp-name">{app.name}</h3>
                    <p className="home__stamp-tagline">{app.tagline}</p>
                  </div>

                  {/* Stamp Footer */}
                  <div className="home__stamp-footer">
                    <span className="home__stamp-year">{app.year}</span>
                    <span className="home__stamp-arrow">
                      View <span>→</span>
                    </span>
                  </div>

                  {/* Decorative elements */}
                  <div className="home__stamp-decoration">
                    <span className="home__stamp-serial">IS-{String(index + 1).padStart(3, '0')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Widget Grid */}
        <section className="home__widgets">
          <div className="home__widgets-header">
            <h2>About the Studio</h2>
          </div>

          <div className="home__widgets-grid">
            {/* About Widget */}
            <div className="widget home__widget home__widget--about">
              <span className="widget__label">Who we are</span>
              <h3 className="widget__title">islander Studio</h3>
              <p className="widget__content">
                A tiny studio creating iOS apps that spark joy in everyday moments.
              </p>
            </div>

            {/* Philosophy Widget */}
            <div className="widget home__widget home__widget--philosophy">
              <span className="widget__label">Philosophy</span>
              <ul className="home__values-list">
                <li>
                  <span className="home__values-marker">+</span>
                  Design-first approach
                </li>
                <li>
                  <span className="home__values-marker">+</span>
                  Privacy by default
                </li>
                <li>
                  <span className="home__values-marker">+</span>
                  No subscriptions*
                </li>
              </ul>
              <span className="home__values-note">*when possible</span>
            </div>

            {/* Contact Widget */}
            <div className="widget home__widget home__widget--contact">
              <span className="widget__label">Get in touch</span>
              <button
                className="home__contact-btn"
                onClick={handleCopyEmail}
              >
                <span className="home__contact-email">
                  support@islanderstudio.app
                </span>
                <span className={`home__contact-action ${copiedEmail ? 'home__contact-action--copied' : ''}`}>
                  {copiedEmail ? '✓ Copied' : 'Copy'}
                </span>
              </button>
            </div>

            {/* Links Widget */}
            <div className="widget home__widget home__widget--links">
              <span className="widget__label">Quick links</span>
              <nav className="home__quick-links">
                <Link to="/support" className="link-arrow">
                  Support <span>→</span>
                </Link>
                <Link to="/privacy" className="link-arrow">
                  Privacy <span>→</span>
                </Link>
              </nav>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
