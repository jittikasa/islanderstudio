import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import SEO, { StructuredData, organizationSchema, websiteSchema } from '../components/SEO'
import './Home.css'

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [hoveredApp, setHoveredApp] = useState(null)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [stickers, setStickers] = useState([
    { id: 1, src: '/branding/Graphics/coconuttree.png', x: 85, y: 15, rotation: -8, scale: 1 },
    { id: 2, src: '/branding/Graphics/sun.png', x: 75, y: 8, rotation: 12, scale: 0.8 },
    { id: 3, src: '/branding/Graphics/flower.png', x: 5, y: 60, rotation: -15, scale: 0.9 },
    { id: 4, src: '/branding/Graphics/shell.png', x: 92, y: 75, rotation: 20, scale: 0.85 },
  ])
  const [stampPosition, setStampPosition] = useState({ x: null, y: null })
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

  // Handle stamp drag
  const handleStampMouseDown = useCallback((e) => {
    e.preventDefault()
    setDragging({ type: 'stamp' })
  }, [])

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
    } else if (dragging.type === 'stamp' && postcardRef.current) {
      const rect = postcardRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      setStampPosition({
        x: Math.max(0, Math.min(85, x)),
        y: Math.max(0, Math.min(75, y))
      })
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
        {/* Floating Stickers */}
        <div className="home__stickers">
          {stickers.map((sticker, index) => (
            <div
              key={sticker.id}
              className={`home__sticker ${dragging === sticker.id ? 'home__sticker--dragging' : ''}`}
              style={{
                left: `${sticker.x}%`,
                top: `${sticker.y}%`,
                '--rotation': `${sticker.rotation}deg`,
                '--scale': sticker.scale,
                '--delay': `${index * 0.1}s`,
              }}
              onMouseDown={(e) => handleStickerMouseDown(e, sticker.id)}
              data-tooltip="Drag me!"
            >
              <img src={sticker.src} alt="" />
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

                  {/* Beach Scene Stamp */}
                  <div
                    className={`home__postcard-stamp ${dragging?.type === 'stamp' ? 'home__postcard-stamp--dragging' : ''}`}
                    onMouseDown={handleStampMouseDown}
                    style={stampPosition.x !== null ? {
                      top: `${stampPosition.y}%`,
                      right: 'auto',
                      left: `${stampPosition.x}%`
                    } : {}}
                  >
                    <div className="home__postcard-stamp-perforated">
                      <div className="home__postcard-stamp-inner">
                        <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Sky background */}
                          <rect width="100" height="120" fill="#FFF5E6"/>

                          {/* Clouds */}
                          <g opacity="0.8">
                            <ellipse cx="25" cy="20" rx="12" ry="8" fill="#7A9AA8"/>
                            <ellipse cx="18" cy="22" rx="8" ry="6" fill="#7A9AA8"/>
                            <ellipse cx="32" cy="22" rx="10" ry="7" fill="#7A9AA8"/>

                            <ellipse cx="70" cy="25" rx="15" ry="10" fill="#7A9AA8"/>
                            <ellipse cx="62" cy="28" rx="10" ry="7" fill="#7A9AA8"/>
                            <ellipse cx="80" cy="28" rx="12" ry="8" fill="#7A9AA8"/>
                          </g>

                          {/* Back hills */}
                          <ellipse cx="80" cy="100" rx="40" ry="30" fill="#6B8E6F"/>
                          <ellipse cx="20" cy="105" rx="35" ry="25" fill="#8BA888"/>

                          {/* House */}
                          <g>
                            {/* House base */}
                            <rect x="55" y="65" width="30" height="35" fill="#F4D4B3"/>
                            <rect x="60" y="65" width="20" height="35" fill="#E8C4A3"/>

                            {/* Roof */}
                            <path d="M52 65 L70 50 L88 65 Z" fill="#E28463"/>
                            <path d="M52 65 L70 50 L70 65 Z" fill="#D97555"/>

                            {/* Roof pattern */}
                            <path d="M54 62 Q 70 52, 86 62" stroke="#C86B50" strokeWidth="1.5" fill="none"/>
                            <path d="M55 65 Q 70 55, 85 65" stroke="#C86B50" strokeWidth="1.5" fill="none"/>

                            {/* Door */}
                            <rect x="65" y="80" width="10" height="20" rx="5" fill="#7A9AA8"/>
                          </g>

                          {/* Coconut Tree (focal point) */}
                          <g>
                            {/* Trunk */}
                            <path d="M28 95 Q 30 75, 28 60 Q 27 45, 29 35" stroke="#7A9AA8" strokeWidth="3.5" fill="none" strokeLinecap="round"/>

                            {/* Palm fronds */}
                            <ellipse cx="20" cy="32" rx="10" ry="18" fill="#8BA888" transform="rotate(-40 20 32)"/>
                            <ellipse cx="28" cy="28" rx="10" ry="20" fill="#8BA888" transform="rotate(-10 28 28)"/>
                            <ellipse cx="36" cy="32" rx="10" ry="18" fill="#8BA888" transform="rotate(40 36 32)"/>
                            <ellipse cx="25" cy="30" rx="9" ry="16" fill="#9BB89A" transform="rotate(-25 25 30)"/>
                            <ellipse cx="31" cy="30" rx="9" ry="16" fill="#9BB89A" transform="rotate(25 31 30)"/>
                          </g>

                          {/* Front hill */}
                          <ellipse cx="50" cy="115" rx="50" ry="20" fill="#B8C78C"/>

                          {/* Wave suggestions at bottom */}
                          <path d="M0 108 Q 8 105, 16 108 T 32 108 T 48 108" stroke="#7A9AA8" strokeWidth="2" fill="none" opacity="0.4"/>
                          <path d="M52 110 Q 60 107, 68 110 T 84 110 T 100 110" stroke="#7A9AA8" strokeWidth="2" fill="none" opacity="0.4"/>
                        </svg>
                      </div>
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
