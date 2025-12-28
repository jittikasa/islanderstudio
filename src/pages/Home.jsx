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
      icon: '/shellist/images/App Icon.png',
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
        title="Islander Studio - Crafted with soul for everyday moments"
        description="Thoughtfully designed iOS apps that blend artistry with functionality. Discover Shellist for habit tracking and PolaMoment for vintage photography."
        url="https://islanderstudio.app"
      />
      <StructuredData data={[organizationSchema, websiteSchema]} />

      <div className="home" ref={containerRef}>
        {/* Hero Section */}
        <section className="home__hero">
          <div className="home__hero-content">
            <h1 className="home__hero-title">
              Crafted with <span className="home__hero-highlight">soul</span><br />
              for everyday moments
            </h1>
            <p className="home__hero-subtitle">
              A boutique iOS studio creating thoughtfully designed<br className="home__hero-break" />
              mobile experiences that respect your time and spark joy.
            </p>
            <div className="home__hero-cta">
              <a href="#apps" className="home__hero-btn home__hero-btn--primary">
                Explore Apps
              </a>
              <a href="mailto:support@islanderstudio.app" className="home__hero-btn home__hero-btn--secondary">
                Say Hello
              </a>
            </div>
          </div>

          <div className="home__hero-visual">
            <img
              src="/branding/Graphics/coconuttree.png"
              alt=""
              className="home__hero-graphic home__hero-graphic--tree"
            />
            <img
              src="/branding/Graphics/sun.png"
              alt=""
              className="home__hero-graphic home__hero-graphic--sun"
            />
          </div>
        </section>

        {/* Apps Grid */}
        <section className="home__apps" id="apps">
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

        {/* Values Section */}
        <section className="home__values-section">
          <div className="home__values-header">
            <h2 className="home__section-title">What We Believe</h2>
          </div>

          <div className="home__values-grid">
            <div className="home__value-card">
              <span className="home__value-icon">
                <img src="/branding/Graphics/flower.png" alt="" />
              </span>
              <h3 className="home__value-title">Design First</h3>
              <p className="home__value-text">
                Beautiful design isn't a luxury—it's essential. Form and function are inseparable.
              </p>
            </div>

            <div className="home__value-card">
              <span className="home__value-icon">
                <img src="/branding/Graphics/starfish.png" alt="" />
              </span>
              <h3 className="home__value-title">Delightful Details</h3>
              <p className="home__value-text">
                Small moments of joy make ordinary tasks extraordinary. We obsess over the little things.
              </p>
            </div>

            <div className="home__value-card">
              <span className="home__value-icon">
                <img src="/branding/Graphics/shell.png" alt="" />
              </span>
              <h3 className="home__value-title">Human-Centered</h3>
              <p className="home__value-text">
                We design for humans, not metrics. Apps that respect attention and protect privacy.
              </p>
            </div>

            <div className="home__value-card">
              <span className="home__value-icon">
                <img src="/branding/Graphics/moon.png" alt="" />
              </span>
              <h3 className="home__value-title">Timeless Design</h3>
              <p className="home__value-text">
                Trends fade; good design endures. Classic aesthetics with contemporary edge.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="home__contact">
          <div className="home__contact-content">
            <h2 className="home__contact-title">Let's Connect</h2>
            <p className="home__contact-text">
              Questions, feedback, or just want to say hello? We'd love to hear from you.
            </p>
            <button
              className="home__contact-btn"
              onClick={handleCopyEmail}
            >
              <span className="home__contact-email">support@islanderstudio.app</span>
              <span className={`home__contact-action ${copiedEmail ? 'home__contact-action--copied' : ''}`}>
                {copiedEmail ? 'Copied!' : 'Copy Email'}
              </span>
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
