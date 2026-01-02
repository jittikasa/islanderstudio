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
    { id: 5, type: 'beach-stamp', x: 70, y: 40, rotation: 5, scale: 1 },
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
        {/* Floating Stickers */}
        <div className="home__stickers">
          {stickers.map((sticker, index) => (
            <div
              key={sticker.id}
              className={`home__sticker ${sticker.type === 'beach-stamp' ? 'home__sticker--stamp' : ''} ${dragging?.id === sticker.id ? 'home__sticker--dragging' : ''}`}
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
              {sticker.type === 'beach-stamp' ? (
                <div className="home__floating-stamp">
                  <div className="home__floating-stamp-perforated">
                    <div className="home__floating-stamp-inner">
                      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Sky - gradient from light to deeper blue */}
                        <defs>
                          <linearGradient id="skyGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#87CEEB" />
                            <stop offset="100%" stopColor="#5BA8C8" />
                          </linearGradient>
                          <linearGradient id="oceanGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1E90FF" />
                            <stop offset="50%" stopColor="#4169E1" />
                            <stop offset="100%" stopColor="#0077BE" />
                          </linearGradient>
                          <linearGradient id="sandGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#F4E5C2" />
                            <stop offset="100%" stopColor="#E8D4A0" />
                          </linearGradient>
                        </defs>

                        {/* Sky */}
                        <rect width="100" height="45" fill="url(#skyGrad2)"/>

                        {/* Sun */}
                        <circle cx="75" cy="15" r="8" fill="#FFD700" opacity="0.9"/>
                        <circle cx="75" cy="15" r="10" fill="#FFD700" opacity="0.3"/>

                        {/* Fluffy clouds */}
                        <g opacity="0.85">
                          <circle cx="18" cy="12" r="5" fill="#FFFFFF"/>
                          <circle cx="24" cy="11" r="6" fill="#FFFFFF"/>
                          <circle cx="30" cy="12" r="5" fill="#FFFFFF"/>
                        </g>

                        {/* Ocean - layered waves */}
                        <rect y="45" width="100" height="35" fill="url(#oceanGrad2)"/>

                        {/* Wave foam - white caps */}
                        <path d="M0 58 Q 10 55, 20 58 T 40 58 T 60 58 T 80 58 T 100 58"
                              stroke="#E0F7FA" strokeWidth="2" fill="none" opacity="0.7"/>
                        <path d="M0 62 Q 15 59, 30 62 T 60 62 T 90 62 T 100 62"
                              stroke="#B3E5FC" strokeWidth="2.5" fill="none" opacity="0.6"/>
                        <path d="M0 68 Q 12 65, 24 68 T 48 68 T 72 68 T 96 68"
                              stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.8"/>

                        {/* Breaking waves at shore */}
                        <path d="M0 76 Q 8 73, 16 76 T 32 76 T 48 76 T 64 76 T 80 76 T 100 76"
                              stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.9"/>

                        {/* Sandy beach */}
                        <path d="M0 80 Q 25 76, 50 78 T 100 82 L100 120 L0 120 Z" fill="url(#sandGrad2)"/>

                        {/* Beach texture details */}
                        <ellipse cx="70" cy="95" rx="3" ry="2" fill="#D4C4A0" opacity="0.4"/>
                        <ellipse cx="85" cy="100" rx="2.5" ry="1.5" fill="#D4C4A0" opacity="0.3"/>

                        {/* Coconut Palm Tree - THE HERO */}
                        <g>
                          {/* Trunk with curve */}
                          <path d="M22 120 Q 24 100, 22 80 Q 21 60, 23 40 Q 24 30, 25 22"
                                stroke="#8B6F47" strokeWidth="4" fill="none" strokeLinecap="round"/>

                          {/* Trunk texture rings */}
                          <path d="M20 110 Q 24 110, 25 110" stroke="#6B5437" strokeWidth="0.8" fill="none" opacity="0.5"/>
                          <path d="M20 95 Q 24 95, 25 95" stroke="#6B5437" strokeWidth="0.8" fill="none" opacity="0.5"/>
                          <path d="M21 75 Q 24 75, 25 75" stroke="#6B5437" strokeWidth="0.8" fill="none" opacity="0.5"/>
                          <path d="M21 55 Q 24 55, 25 55" stroke="#6B5437" strokeWidth="0.8" fill="none" opacity="0.5"/>

                          {/* Palm fronds - large and dramatic */}
                          <ellipse cx="12" cy="18" rx="11" ry="22" fill="#2D5016" transform="rotate(-50 12 18)"/>
                          <ellipse cx="15" cy="16" rx="10" ry="20" fill="#3A6B2C" transform="rotate(-50 15 16)"/>

                          <ellipse cx="25" cy="12" rx="12" ry="24" fill="#2D5016" transform="rotate(-10 25 12)"/>
                          <ellipse cx="25" cy="12" rx="10" ry="21" fill="#3A6B2C" transform="rotate(-10 25 12)"/>

                          <ellipse cx="36" cy="16" rx="11" ry="23" fill="#2D5016" transform="rotate(45 36 16)"/>
                          <ellipse cx="35" cy="15" rx="10" ry="20" fill="#3A6B2C" transform="rotate(45 35 15)"/>

                          <ellipse cx="20" cy="14" rx="9" ry="19" fill="#4A7C3C" transform="rotate(-30 20 14)"/>
                          <ellipse cx="30" cy="14" rx="9" ry="19" fill="#4A7C3C" transform="rotate(30 30 14)"/>

                          {/* Coconuts */}
                          <circle cx="24" cy="24" r="2.5" fill="#8B6F47"/>
                          <circle cx="27" cy="26" r="2.3" fill="#8B6F47"/>
                        </g>

                        {/* Small beach hut in distance */}
                        <g opacity="0.85">
                          <rect x="72" y="68" width="12" height="10" fill="#D4A574"/>
                          <path d="M70 68 L78 60 L86 68 Z" fill="#C85A3F"/>
                        </g>

                        {/* Seagull */}
                        <path d="M50 30 Q 52 28, 54 30" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <img src={sticker.src} alt="" />
              )}
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
                  {/* Postmark Stamp with Wavy Lines */}
                  <div className="home__postcard-postmark-group">
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
