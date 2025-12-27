import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import SEO, { StructuredData, organizationSchema, websiteSchema } from '../components/SEO'
import './Home.css'

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeCard, setActiveCard] = useState(null)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const containerRef = useRef(null)

  // Mouse tracking for 3D card effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
      status: 'Live',
      color: '#4A90A4',
      icon: '/shellist/images/icons/logo.png',
      description: 'A habit tracker that visualizes your progress as a growing pearl chain. Beautiful, private, and designed to make building habits feel like collecting treasures.',
      appStoreUrl: 'https://apps.apple.com/us/app/shellist/id6755242144'
    },
    {
      id: 'polamoment',
      name: 'PolaMoment',
      tagline: 'Capture vintage memories',
      category: 'Photography',
      status: 'Coming Soon',
      color: '#D93025',
      icon: '/pola-assets/Icon-1024.png',
      description: 'Turn your iPhone into a vintage Polaroid camera. Instant photos with that distinctive retro charm.',
      appStoreUrl: null
    }
  ]

  return (
    <>
      <SEO
        title="islander. - Apps crafted with soul"
        description="Thoughtfully designed iOS apps that blend artistry with functionality. Discover Shellist for habit tracking and PolaMoment for vintage photography."
        url="https://islanderstudio.app"
      />
      <StructuredData data={[organizationSchema, websiteSchema]} />

      <div className="home" ref={containerRef}>
        {/* Hero Section */}
        <section className="home__hero">
          <div className="home__hero-content">
            <span className="home__hero-label">islander studio</span>
            <h1 className="home__hero-title">
              Apps crafted<br />
              with <span className="home__hero-highlight">soul</span>
            </h1>
            <p className="home__hero-subtitle">
              Thoughtfully designed iOS experiences<br />
              for everyday moments
            </p>
          </div>

          <div className="home__hero-meta">
            <div className="home__hero-stat">
              <span className="home__hero-stat-number">2</span>
              <span className="home__hero-stat-label">Apps</span>
            </div>
            <div className="home__hero-stat">
              <span className="home__hero-stat-number">2025</span>
              <span className="home__hero-stat-label">Thailand</span>
            </div>
          </div>
        </section>

        {/* Apps Grid */}
        <section className="home__apps">
          <div className="home__apps-header">
            <h2 className="home__section-title">Our Apps</h2>
            <span className="home__section-count">{apps.length} projects</span>
          </div>

          <div className="home__apps-grid">
            {apps.map((app, index) => (
              <Link
                key={app.id}
                to={`/${app.id}`}
                className={`home__app-card ${activeCard === index ? 'home__app-card--active' : ''}`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  '--card-x': mousePos.x,
                  '--card-y': mousePos.y,
                  '--app-color': app.color
                }}
              >
                <div className="home__app-card-inner">
                  <div className="home__app-card-header">
                    <div className="home__app-icon-wrapper">
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="home__app-icon"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>
                    <span
                      className={`home__app-status ${
                        app.status === 'Live' ? 'home__app-status--live' : 'home__app-status--soon'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="home__app-card-content">
                    <span className="home__app-category">{app.category}</span>
                    <h3 className="home__app-name">{app.name}</h3>
                    <p className="home__app-tagline">{app.tagline}</p>
                    <p className="home__app-description">{app.description}</p>
                  </div>

                  <div className="home__app-card-footer">
                    <span className="home__app-link">
                      View project
                      <span className="home__app-arrow">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* About Widget */}
        <section className="home__about">
          <div className="home__about-grid">
            <div className="home__widget home__widget--about">
              <h3 className="home__widget-title">About</h3>
              <p className="home__widget-text">
                We're a small studio creating iOS apps that respect your privacy and delight in use.
                Every app is designed with intention, built with care.
              </p>
            </div>

            <div className="home__widget home__widget--contact">
              <h3 className="home__widget-title">Contact</h3>
              <button
                className="home__email-btn"
                onClick={handleCopyEmail}
              >
                <span className="home__email-text">support@islanderstudio.app</span>
                <span className="home__email-action">
                  {copiedEmail ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </div>

            <div className="home__widget home__widget--links">
              <h3 className="home__widget-title">Links</h3>
              <div className="home__quick-links">
                <Link to="/support" className="home__quick-link">
                  Support <span>→</span>
                </Link>
                <Link to="/privacy" className="home__quick-link">
                  Privacy <span>→</span>
                </Link>
              </div>
            </div>

            <div className="home__widget home__widget--values">
              <h3 className="home__widget-title">Values</h3>
              <ul className="home__values-list">
                <li>Privacy first</li>
                <li>Thoughtful design</li>
                <li>No subscriptions*</li>
              </ul>
              <span className="home__values-note">*where possible</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
