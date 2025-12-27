import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import SEO, { StructuredData, organizationSchema, websiteSchema } from '../components/SEO'
import { AppIconDisplay } from '../components/AppIcon'
import { AppScreenshotDisplay } from '../components/AppScreenshot'
import './Home.css'

export default function Home() {
  const [selectedApp, setSelectedApp] = useState('shellist')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef(null)

  const apps = {
    shellist: {
      id: 'shellist',
      name: 'Shellist',
      tagline: 'Build habits like pearls',
      category: 'Productivity',
      year: '2024',
      color: '#4A90A4',
      graphic: 'shell.png',
      description: 'A habit tracker that visualizes your progress as a growing pearl chain. Beautiful, private, and designed to make building habits feel like collecting treasures.',
      appStoreUrl: 'https://apps.apple.com/us/app/shellist/id6755242144'
    },
    polamoment: {
      id: 'polamoment',
      name: 'PolaMoment',
      tagline: 'Capture vintage memories',
      category: 'Photography',
      year: '2025',
      color: '#D93025',
      graphic: 'moon.png',
      description: 'Turn your iPhone into a vintage Polaroid camera. Instant photos with that distinctive retro charm, complete with shake-to-develop animations.',
      appStoreUrl: null
    }
  }

  const currentApp = apps[selectedApp]

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  return (
    <>
      <SEO
        title="islanderStudio — Crafted with soul for everyday moments"
        description="Thoughtfully designed iOS apps that blend artistry with functionality. Discover Shellist for habit tracking and PolaMoment for vintage photography."
        url="https://islanderstudio.app"
      />
      <StructuredData data={[organizationSchema, websiteSchema]} />

      <div className="home-container">
        {/* Tropical background graphics with parallax */}
        <div
          className="tropical-bg"
          style={{
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`
          }}
        >
          <img
            src="/branding/Graphics/coconuttree.png"
            alt=""
            className="bg-tree"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
          <img
            src="/branding/Graphics/starfish.png"
            alt=""
            className="bg-star"
            style={{ transform: `translateY(${scrollY * -0.2}px) rotate(${scrollY * 0.05}deg)` }}
          />
          <img
            src="/branding/Graphics/sun.png"
            alt=""
            className="bg-sun"
            style={{ transform: `rotate(${scrollY * 0.1}deg)` }}
          />
        </div>

        {/* Header */}
        <header className="site-header">
          <Link to="/" className="logo-link">
            <img src="/branding/Logos/Logo-primary.png" alt="islanderStudio" className="logo" />
          </Link>
          <nav className="main-nav">
            <Link to="/support" className="nav-item">Support</Link>
            <a href="https://github.com/jittikasa" target="_blank" rel="noopener noreferrer" className="nav-item">
              GitHub
            </a>
          </nav>
        </header>

        {/* Hero section */}
        <section
          ref={heroRef}
          className={`hero-section ${isVisible ? 'visible' : ''}`}
        >
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-line">Apps crafted</span>
              <span className="title-line">with <span className="highlight-text">soul</span></span>
            </h1>
            <p className="hero-subtitle">
              Thoughtfully designed iOS experiences<br />
              for everyday moments
            </p>
          </div>

          {/* Featured app showcase */}
          <div className="featured-app">
            <div className="app-phone">
              <div
                className="phone-frame"
                style={{
                  transform: `translateY(${mousePos.y * -0.3}px) rotateY(${mousePos.x * 0.5}deg)`
                }}
              >
                <AppScreenshotDisplay appId={currentApp.id} />
              </div>
              <div
                className="phone-icon"
                style={{
                  transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`
                }}
              >
                <AppIconDisplay appId={currentApp.id} size={72} />
              </div>

              {/* Floating particles */}
              <div className="particles">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="particle"
                    style={{
                      left: `${20 + i * 15}%`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: `${3 + i * 0.5}s`
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="app-info-card">
              <span className="app-category" style={{ background: currentApp.color }}>
                {currentApp.category}
              </span>
              <h2 className="app-title">{currentApp.name}</h2>
              <p className="app-tagline">{currentApp.tagline}</p>
              <p className="app-description">{currentApp.description}</p>

              <div className="app-actions">
                {currentApp.appStoreUrl ? (
                  <a
                    href={currentApp.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-primary"
                  >
                    <span>Download on App Store</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1v10m0 0l3-3m-3 3L5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M1 12v2a1 1 0 001 1h12a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </a>
                ) : (
                  <button className="cta-secondary" disabled>
                    <span>Coming Soon</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
                <Link to={`/${currentApp.id}`} className="cta-link">
                  Learn more →
                </Link>
              </div>

              {/* Decorative graphic */}
              <div
                className="card-graphic"
                style={{
                  transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px) rotate(${mousePos.x * 0.2}deg)`
                }}
              >
                <img src={`/branding/Graphics/${currentApp.graphic}`} alt="" />
              </div>
            </div>
          </div>

          {/* App switcher */}
          <div className="app-switcher">
            {Object.values(apps).map((app) => (
              <button
                key={app.id}
                className={`app-tab ${selectedApp === app.id ? 'active' : ''}`}
                onClick={() => setSelectedApp(app.id)}
                style={{ '--tab-color': app.color }}
              >
                <div className="tab-icon">
                  <AppIconDisplay appId={app.id} size={32} />
                </div>
                <span>{app.name}</span>
                {selectedApp === app.id && (
                  <div className="tab-indicator" style={{ background: app.color }} />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="site-footer">
          <p className="footer-tagline">Crafted with soul for everyday moments</p>
          <div className="footer-links">
            <Link to="/support">Support</Link>
            <Link to="/privacy">Privacy</Link>
            <a href="mailto:support@islanderstudio.app">Contact</a>
          </div>
        </footer>
      </div>
    </>
  )
}
