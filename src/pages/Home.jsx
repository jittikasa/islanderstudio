import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import SEO, { StructuredData, organizationSchema, websiteSchema } from '../components/SEO'
import './Home.css'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const observerRef = useRef(null)

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    const animatedElements = document.querySelectorAll('.animate-on-scroll')
    animatedElements.forEach((el) => observerRef.current.observe(el))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return (
    <>
      <SEO
        title="Islander Studio - Crafting Beautiful iOS Apps"
        description="Islander Studio creates thoughtfully designed mobile experiences that blend artistry with functionality. Discover Shellist for habit tracking and PolaMoment for vintage photography."
        url="https://islanderstudio.app"
        keywords="iOS apps, mobile apps, Shellist, habit tracker, PolaMoment, polaroid camera, indie apps, app development"
      />
      <StructuredData data={[organizationSchema, websiteSchema]} />

      <div className="home">
        {/* Hero Section */}
      <section className="hero">
        <div
          className="hero-background"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge fade-in">
              <span className="hero-badge-icon">🏝️</span>
              <span>Crafting Beautiful iOS Apps</span>
            </div>
            <h1 className="hero-title fade-in-up">
              Where Design
              <br />
              Meets <span className="text-gradient">Delight</span>
            </h1>
            <p className="hero-description fade-in-up" style={{ animationDelay: '0.2s' }}>
              Islander Studio creates thoughtfully designed mobile experiences
              that blend artistry with functionality. Each app is a journey,
              crafted with care and built to inspire.
            </p>
            <div className="hero-cta fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/shellist" className="btn btn-primary btn-elevated">
                <span>Explore Shellist</span>
                <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/polamoment" className="btn btn-outline btn-elevated">
                <span>Discover PolaMoment</span>
                <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="hero-decoration"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </section>

      {/* Apps Showcase */}
      <section className="apps-showcase section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Our Apps</h2>
            <p className="section-subtitle">
              Two distinct experiences, one shared philosophy: beautiful design,
              thoughtful features, and respect for your privacy.
            </p>
          </div>

          {/* Shellist Card */}
          <div className="app-card app-card-large shellist-card animate-on-scroll" style={{ animationDelay: '0.1s' }}>
            <div className="app-card-content">
              <div className="app-card-header">
                <span className="app-badge" style={{ background: '#4A90A4' }}>
                  Habit Tracking
                </span>
                <h3 className="app-card-title">Shellist</h3>
              </div>
              <p className="app-card-description">
                Build habits like pearls. Transform your life one habit at a
                time with beautiful pearl visualizations, powerful analytics,
                and motivational tools that make habit building feel like a
                treasure hunt.
              </p>
              <ul className="app-features">
                <li>🐚 Pearl chain visualization</li>
                <li>📊 Smart analytics & insights</li>
                <li>🎯 Vision board integration</li>
                <li>🔒 Privacy-first design</li>
              </ul>
              <div className="app-card-actions">
                <Link to="/shellist" className="btn btn-primary">
                  Learn More
                </Link>
                <a
                  href="https://apps.apple.com/us/app/shellist/id6755242144"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-store-badge"
                  aria-label="Download Shellist on the App Store"
                >
                  <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="120" height="40" rx="8" fill="#000000"/>
                    <text x="60" y="14" fontFamily="system-ui, -apple-system" fontSize="9" fill="#ffffff" textAnchor="middle" fontWeight="400">Download on the</text>
                    <text x="60" y="28" fontFamily="system-ui, -apple-system" fontSize="16" fill="#ffffff" textAnchor="middle" fontWeight="600">App Store</text>
                  </svg>
                </a>
              </div>
            </div>
            <div className="app-card-visual shellist-visual">
              <div className="visual-decoration coastal-theme">
                <div className="pearl pearl-1"></div>
                <div className="pearl pearl-2"></div>
                <div className="pearl pearl-3"></div>
                <div className="wave wave-1"></div>
                <div className="wave wave-2"></div>
              </div>
            </div>
          </div>

          {/* PolaMoment Card */}
          <div className="app-card app-card-large polamoment-card animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <div className="app-card-visual polamoment-visual">
              <div className="visual-decoration polaroid-theme">
                <div className="polaroid polaroid-1"></div>
                <div className="polaroid polaroid-2"></div>
                <div className="polaroid polaroid-3"></div>
                <div className="film-grain"></div>
              </div>
            </div>
            <div className="app-card-content">
              <div className="app-card-header">
                <span className="app-badge" style={{ background: '#D93025' }}>
                  Photography
                </span>
                <h3 className="app-card-title">PolaMoment</h3>
              </div>
              <p className="app-card-description">
                Capture vintage-style Polaroid photos on your iOS device.
                Transform everyday moments into timeless memories with authentic
                Polaroid aesthetics, filters, and that distinctive instant photo charm.
              </p>
              <ul className="app-features">
                <li>📸 Authentic Polaroid aesthetic</li>
                <li>🎨 Vintage filters & effects</li>
                <li>⚡ Instant photo magic</li>
                <li>💝 Share beautiful memories</li>
              </ul>
              <div className="app-card-actions">
                <Link to="/polamoment" className="btn btn-secondary">
                  Learn More
                </Link>
                <div className="app-store-badge app-store-badge-disabled">
                  <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="120" height="40" rx="8" fill="#9CA3AF"/>
                    <text x="60" y="14" fontFamily="system-ui, -apple-system" fontSize="9" fill="#ffffff" textAnchor="middle" fontWeight="400">Coming soon on</text>
                    <text x="60" y="28" fontFamily="system-ui, -apple-system" fontSize="16" fill="#ffffff" textAnchor="middle" fontWeight="600">App Store</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy section">
        <div className="container">
          <div className="philosophy-grid">
            <div className="philosophy-content animate-on-scroll">
              <h2 className="philosophy-title">
                Crafted with Care,
                <br />
                Built for You
              </h2>
              <p className="philosophy-text">
                At Islander Studio, we believe that great apps aren't just
                functional—they're delightful experiences that respect your time,
                protect your privacy, and spark joy in everyday moments.
              </p>
              <p className="philosophy-text">
                Every pixel, every interaction, every feature is thoughtfully
                designed to make your digital life a little more beautiful.
              </p>
            </div>
            <div className="philosophy-values">
              <div className="value-card animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                <div className="value-icon">🎨</div>
                <h4 className="value-title">Design First</h4>
                <p className="value-description">
                  Beauty and usability aren't mutually exclusive—they're essential partners.
                </p>
              </div>
              <div className="value-card animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                <div className="value-icon">🔒</div>
                <h4 className="value-title">Privacy Focused</h4>
                <p className="value-description">
                  Your data stays yours. No tracking, no selling, no compromises.
                </p>
              </div>
              <div className="value-card animate-on-scroll" style={{ animationDelay: '0.3s' }}>
                <div className="value-icon">✨</div>
                <h4 className="value-title">Delightful Details</h4>
                <p className="value-description">
                  Small moments of joy make everyday tasks feel special.
                </p>
              </div>
              <div className="value-card animate-on-scroll" style={{ animationDelay: '0.4s' }}>
                <div className="value-icon">🌱</div>
                <h4 className="value-title">Built to Last</h4>
                <p className="value-description">
                  Quality over quantity. We build apps we're proud to support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <div className="cta-card animate-on-scroll">
            <h2 className="cta-title">Ready to Explore?</h2>
            <p className="cta-description">
              Discover beautifully crafted iOS apps that make everyday moments special.
            </p>
            <div className="cta-buttons">
              <Link to="/shellist" className="btn btn-primary btn-elevated">
                <span>Try Shellist</span>
                <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/polamoment" className="btn btn-outline btn-elevated">
                <span>Explore PolaMoment</span>
                <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
