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
  const [dragging, setDragging] = useState(null)
  const [postcardStamps, setPostcardStamps] = useState([])
  const [selectedStamp, setSelectedStamp] = useState(null)
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
    if (dragging && dragging.type === 'sticker' && containerRef.current) {
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

  const handleMouseUp = useCallback((e) => {
    if (dragging && dragging.type === 'sticker' && postcardRef.current) {
      const postcardRect = postcardRef.current.getBoundingClientRect()
      const isOverPostcard =
        e.clientX >= postcardRect.left &&
        e.clientX <= postcardRect.right &&
        e.clientY >= postcardRect.top &&
        e.clientY <= postcardRect.bottom

      if (isOverPostcard) {
        const x = ((e.clientX - postcardRect.left) / postcardRect.width) * 100
        const y = ((e.clientY - postcardRect.top) / postcardRect.height) * 100

        const newStamp = {
          uniqueId: `stamp-${Date.now()}`,
          src: dragging.sticker.src,
          x: Math.max(0, Math.min(90, x)),
          y: Math.max(0, Math.min(90, y)),
          rotation: Math.random() * 30 - 15,
          scale: 0.4,
        }

        setPostcardStamps(prev => [...prev, newStamp])
      }
    }
    setDragging(null)
  }, [dragging])

  const handleStampClick = (e, uniqueId) => {
    e.stopPropagation()
    setSelectedStamp(uniqueId)
  }

  const handleRotateStamp = (direction) => {
    if (!selectedStamp) return
    setPostcardStamps(prev => prev.map(stamp =>
      stamp.uniqueId === selectedStamp
        ? { ...stamp, rotation: stamp.rotation + (direction === 'left' ? -15 : 15) }
        : stamp
    ))
  }

  const handleScaleStamp = (direction) => {
    if (!selectedStamp) return
    setPostcardStamps(prev => prev.map(stamp =>
      stamp.uniqueId === selectedStamp
        ? { ...stamp, scale: Math.max(0.2, Math.min(1, stamp.scale + (direction === 'up' ? 0.1 : -0.1))) }
        : stamp
    ))
  }

  const handleDeleteStamp = () => {
    if (!selectedStamp) return
    setPostcardStamps(prev => prev.filter(stamp => stamp.uniqueId !== selectedStamp))
    setSelectedStamp(null)
  }

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
            {/* Interactive Postcard */}
            <div className="home__postcard-wrapper">
              {/* Striped Border Frame */}
              <div
                ref={postcardRef}
                className="home__postcard-border"
                onClick={() => setSelectedStamp(null)}
              >
                <div className="home__postcard">
                  {/* Twine String */}
                  <div className="home__postcard-twine">
                    <div className="home__postcard-twine-vertical"></div>
                    <div className="home__postcard-twine-bow">
                      <div className="home__postcard-twine-bow-left"></div>
                      <div className="home__postcard-twine-bow-right"></div>
                      <div className="home__postcard-twine-bow-knot"></div>
                    </div>
                  </div>

                  {/* Postmark Stamp */}
                  <div className="home__postcard-postmark">
                    <div className="home__postcard-postmark-circle">
                      <div className="home__postcard-postmark-star">★</div>
                      <div className="home__postcard-postmark-text">POST</div>
                      <div className="home__postcard-postmark-text home__postcard-postmark-text--bottom">DES 01</div>
                    </div>
                    <div className="home__postcard-postmark-waves">
                      <svg width="75" height="24" viewBox="0 0 75 24" fill="none">
                        <path d="M0 5 Q3.5 1, 7 5 T14 5 T21 5 T28 5 T35 5 T42 5 T49 5 T56 5 T63 5 T70 5 T75 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        <path d="M0 10 Q3.5 6, 7 10 T14 10 T21 10 T28 10 T35 10 T42 10 T49 10 T56 10 T63 10 T70 10 T75 10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        <path d="M0 15 Q3.5 11, 7 15 T14 15 T21 15 T28 15 T35 15 T42 15 T49 15 T56 15 T63 15 T70 15 T75 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        <path d="M0 20 Q3.5 16, 7 20 T14 20 T21 20 T28 20 T35 20 T42 20 T49 20 T56 20 T63 20 T70 20 T75 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>

                  <div className="home__postcard-content">
                    <div className="home__postcard-left">
                      {/* Landscape Scene */}
                      <div className="home__postcard-sky"></div>
                      <div className="home__postcard-sun"></div>
                      <div className="home__postcard-hills">
                        <div className="home__postcard-hill home__postcard-hill--1"></div>
                        <div className="home__postcard-hill home__postcard-hill--2"></div>
                        <div className="home__postcard-hill home__postcard-hill--3"></div>
                      </div>
                    </div>
                    <div className="home__postcard-right">
                      {/* Rabbit Stamp */}
                      <div className="home__postcard-stamp-rabbit">
                        <div className="home__postcard-stamp-perforated">
                          <div className="home__postcard-rabbit">
                            <div className="home__postcard-rabbit-ear home__postcard-rabbit-ear--left"></div>
                            <div className="home__postcard-rabbit-ear home__postcard-rabbit-ear--right"></div>
                            <div className="home__postcard-rabbit-head">
                              <div className="home__postcard-rabbit-eye home__postcard-rabbit-eye--left"></div>
                              <div className="home__postcard-rabbit-eye home__postcard-rabbit-eye--right"></div>
                              <div className="home__postcard-rabbit-nose"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* "To :" Label and Address Lines */}
                      <div className="home__postcard-address">
                        <div className="home__postcard-to">To :</div>
                        <div className="home__postcard-lines">
                          <div className="home__postcard-line"></div>
                          <div className="home__postcard-line"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Placed Stamps on Postcard */}
                  {postcardStamps.map(stamp => (
                    <div
                      key={stamp.uniqueId}
                      className={`home__postcard-stamp-placed ${selectedStamp === stamp.uniqueId ? 'selected' : ''}`}
                      style={{
                        left: `${stamp.x}%`,
                        top: `${stamp.y}%`,
                        transform: `translate(-50%, -50%) rotate(${stamp.rotation}deg) scale(${stamp.scale})`,
                      }}
                      onClick={(e) => handleStampClick(e, stamp.uniqueId)}
                    >
                      <img src={stamp.src} alt="stamp" draggable={false} />
                    </div>
                  ))}

                  {/* Drop zone hint */}
                  {postcardStamps.length === 0 && (
                    <div className="home__postcard-hint">
                      <span>Drag floating stickers here!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stamp Controls */}
            {selectedStamp && (
              <div className="home__postcard-controls">
                <button onClick={() => handleRotateStamp('left')} title="Rotate left">↺</button>
                <button onClick={() => handleRotateStamp('right')} title="Rotate right">↻</button>
                <button onClick={() => handleScaleStamp('down')} title="Smaller">−</button>
                <button onClick={() => handleScaleStamp('up')} title="Bigger">+</button>
                <button onClick={handleDeleteStamp} className="delete" title="Delete">🗑️</button>
              </div>
            )}

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
