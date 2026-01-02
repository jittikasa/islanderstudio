import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import SEO, { StructuredData, organizationSchema, websiteSchema } from '../components/SEO'
import './Home.css'

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [hoveredApp, setHoveredApp] = useState(null)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [stickers, setStickers] = useState([
    { id: 1, x: 85, y: 15, rotation: -8, scale: 1, category: 'Nature', name: 'Palm Tree', tagline: 'Tropical vibes', year: '2025', color: '#4CAF50', icon: '🌴', serial: 'IS-002' },
    { id: 2, x: 75, y: 8, rotation: 12, scale: 0.8, category: 'Nature', name: 'Sunny Day', tagline: 'Bright & warm', year: '2025', color: '#FFD54F', icon: '☀️', serial: 'IS-001' },
    { id: 3, x: 5, y: 60, rotation: -15, scale: 0.9, category: 'Nature', name: 'Hibiscus', tagline: 'Island bloom', year: '2025', color: '#E91E63', icon: '🌺', serial: 'IS-003' },
    { id: 4, x: 92, y: 75, rotation: 20, scale: 0.85, category: 'Ocean', name: 'Seashell', tagline: 'Beach treasure', year: '2025', color: '#FFAB91', icon: '🐚', serial: 'IS-004' },
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
          ? { ...s, x: Math.max(0, Math.min(95, x)), y: Math.max(0, Math.min(90, y)) }
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
        title="Islander Studio — Apps crafted with soul"
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
                    <div className="home__floating-stamp-header">
                      <span className="home__floating-stamp-category">{sticker.category}</span>
                    </div>
                    <div className="home__floating-stamp-content">
                      <div className="home__floating-stamp-icon">
                        <span>{sticker.icon}</span>
                      </div>
                      <h4 className="home__floating-stamp-name">{sticker.name}</h4>
                      <p className="home__floating-stamp-tagline">{sticker.tagline}</p>
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
              A boutique iOS studio from Thailand, creating
              thoughtfully designed mobile experiences that
              spark joy in everyday moments.
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
                  {/* Twine String */}
                  <div className="home__postcard-twine">
                    <div className="home__postcard-twine-vertical"></div>
                  </div>

                  {/* Postmark Stamp */}
                  <div className="home__postcard-postmark">
                    <div className="home__postcard-postmark-circle">
                      <span className="home__postcard-postmark-star">★</span>
                      <span className="home__postcard-postmark-text">POST</span>
                      <span className="home__postcard-postmark-text home__postcard-postmark-text--bottom">DEC 01</span>
                    </div>
                  </div>

                  <svg className="home__postcard-postmark-waves" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 8 Q 7 3, 14 8 T 28 8 T 42 8 T 56 8 T 70 8 T 84 8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M0 16 Q 7 11, 14 16 T 28 16 T 42 16 T 56 16 T 70 16 T 84 16" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M0 24 Q 7 19, 14 24 T 28 24 T 42 24 T 56 24 T 70 24 T 84 24" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M0 32 Q 7 27, 14 32 T 28 32 T 42 32 T 56 32 T 70 32 T 84 32" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>

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
              <h3 className="widget__title">Islander Studio</h3>
              <p className="widget__content">
                A tiny studio creating iOS apps that respect your privacy
                and delight in use. Based in Phuket, Thailand.
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
