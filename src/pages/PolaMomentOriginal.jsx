import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, Apple } from 'lucide-react'
import './PolaMomentOriginal.css'

const PrivacyLockIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="privacy-icon">
    <rect x="20" y="30" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M24 30 L24 22 C24 17.6 27.6 14 32 14 C36.4 14 40 17.6 40 22 L40 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="32" cy="40" r="3" fill="currentColor"/>
    <path d="M32 43 L32 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export default function PolaMomentOriginal() {
  const scrollToSection = (id) => (e) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="polamoment-page">
      {/* Hero Section */}
      <section className="pola-hero">
        <div className="pola-hero-bg">
          <div className="pola-blob pola-blob-1"></div>
          <div className="pola-blob pola-blob-2"></div>
        </div>

        <div className="pola-hero-content">
          <div className="pola-badge">iOS • Camera App</div>
          <h1 className="pola-hero-title">
            PolaMoment<span className="pola-dot">.</span>
          </h1>
          <p className="pola-hero-subtitle">Capture the Magic</p>
          <p className="pola-hero-description">
            Transform your iPhone into a vintage Polaroid camera. Create instant memories with that iconic retro aesthetic we all love.
          </p>

          {/* Camera Visual with Polaroid Animation */}
          <div className="pola-camera-wrap">
            <img src="/polamoment/Cam.svg" alt="PolaMoment Camera" className="pola-camera" />

            {/* Animated Polaroids */}
            <div className="pola-photos">
              <div className="pola-photo pola-photo-1">
                <div className="polaroid">
                  <div className="polaroid-image">
                    <img src="/polamoment/Image-1.jpeg" alt="" />
                  </div>
                  <div className="polaroid-footer"></div>
                </div>
              </div>

              <div className="pola-photo pola-photo-2">
                <div className="polaroid">
                  <div className="polaroid-image">
                    <img src="/polamoment/Image-2.jpeg" alt="" />
                  </div>
                  <div className="polaroid-footer"></div>
                </div>
              </div>

              <div className="pola-photo pola-photo-3">
                <div className="polaroid">
                  <div className="polaroid-image">
                    <img src="/polamoment/Image-3.jpeg" alt="" />
                  </div>
                  <div className="polaroid-footer"></div>
                </div>
              </div>
            </div>
          </div>

          <a href="#story" onClick={scrollToSection('story')} className="pola-scroll-btn">
            <span>EXPLORE</span>
            <span className="scroll-icon">
              <ArrowDown size={16} />
            </span>
          </a>
        </div>
      </section>

      {/* The Story Section */}
      <section id="story" className="pola-story">
        <div className="pola-container">
          <div className="pola-story-grid">
            <div className="pola-story-text">
              <div className="pola-label">The Story</div>
              <h2 className="pola-section-title">Nostalgia Meets Technology</h2>
              <div className="pola-divider"></div>
              <div className="pola-story-content">
                <p>
                  <span className="pola-dropcap">R</span>emember the excitement of shaking a fresh Polaroid and watching your memory slowly appear? That magic feeling of instant photography is now at your fingertips.
                </p>
                <p>
                  PolaMoment<span className="pola-accent">.</span> brings back the charm of vintage Polaroid cameras to your iPhone. Create authentic-looking instant photos with that distinctive white border, warm tones, and slightly faded aesthetic that made Polaroids so iconic.
                </p>
                <p>
                  Whether you're capturing moments with friends, documenting your travels, or just expressing your creativity, PolaMoment<span className="pola-accent">.</span> makes every photo feel special.
                </p>
              </div>

              <div className="pola-features-list">
                <div className="pola-feature-item">
                  <div className="pola-feature-dot"></div>
                  <div>
                    <h4>Vintage Filters</h4>
                    <p>Authentic retro effects that transform your photos instantly</p>
                  </div>
                </div>
                <div className="pola-feature-item">
                  <div className="pola-feature-dot"></div>
                  <div>
                    <h4>No Subscriptions</h4>
                    <p>One-time purchase, unlimited memories forever</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pola-story-visual">
              <div className="pola-stack">
                <div className="pola-stack-bg pola-stack-bg-1"></div>
                <div className="pola-stack-bg pola-stack-bg-2"></div>
                <div className="pola-stack-card">
                  <div className="pola-stack-image">
                    <img src="/polamoment/Icon-1024.png" alt="PolaMoment" />
                  </div>
                  <div className="pola-stack-caption">
                    <p>Timeless memories, one click away</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Highlight */}
      <section className="pola-privacy">
        <div className="pola-container pola-text-center">
          <div className="pola-privacy-icon">
            <PrivacyLockIcon />
          </div>
          <h2 className="pola-section-title-light">Your Privacy Matters</h2>
          <p className="pola-privacy-text">
            We don't collect, store, or share any of your data. All photos stay on your device. No cloud storage, no analytics, no tracking. Just you and your memories.
          </p>
          <Link to="/privacy" className="pola-btn-light">
            Read Privacy Policy
          </Link>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="pola-download">
        <div className="pola-container pola-text-center">
          <div className="pola-badge">Available on iOS</div>
          <h2 className="pola-section-title">Start Creating Today</h2>
          <p className="pola-download-text">
            Download PolaMoment<span className="pola-accent">.</span> and start capturing vintage-style Polaroid photos on your iPhone right away.
          </p>

          <a href="#" className="pola-btn-download">
            <Apple size={28} className="pola-apple-icon" />
            <div className="pola-download-label">
              <div className="pola-download-pre">Download on the</div>
              <div className="pola-download-main">App Store</div>
            </div>
          </a>

          <p className="pola-download-note">
            Requires iOS 14.0 or later • Compatible with iPhone
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="pola-footer">
        <div className="pola-container">
          <div className="pola-footer-content">
            <div className="pola-footer-brand">
              <div className="pola-footer-logo">
                PolaMoment<span className="pola-dot">.</span>
              </div>
              <p className="pola-footer-tagline">Vintage Polaroid camera for your iPhone</p>
            </div>
            <div className="pola-footer-links">
              <Link to="/privacy" className="pola-footer-link">Privacy Policy</Link>
              <a href="mailto:privacy@polamoment.app" className="pola-footer-link">Contact</a>
            </div>
          </div>
          <div className="pola-footer-bottom">
            <p>© 2025 PolaMoment<span className="pola-dot">.</span> All rights reserved.</p>
            <p className="pola-footer-quote">Making memories instant again, one photo at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
