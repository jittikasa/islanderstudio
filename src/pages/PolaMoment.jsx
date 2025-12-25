import './AppPage.css'

export default function PolaMoment() {
  return (
    <div className="app-page polamoment-page">
      {/* Hero */}
      <section className="app-hero polaroid-gradient">
        <div className="container">
          <div className="app-hero-content">
            <div className="app-hero-text fade-in-up">
              <div className="app-badge-large" style={{ background: '#D93025' }}>
                Photography
              </div>
              <h1 className="app-hero-title">
                Capture Moments,
                <br />
                Keep Memories
              </h1>
              <p className="app-hero-description">
                Transform everyday moments into timeless memories with PolaMoment.
                Experience the charm of vintage Polaroid photography on your iOS
                device—authentic aesthetics, instant magic, and photos worth cherishing.
              </p>
              <div className="app-hero-actions">
                <a href="#" className="btn btn-secondary btn-large">
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Coming Soon on App Store
                </a>
              </div>
              <p className="app-status-badge">
                <span className="status-dot"></span>
                In Testing • Launching Soon
              </p>
            </div>
            <div className="app-hero-visual fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="app-mockup polaroid-mockup">
                <div className="polaroid-stack">
                  <div className="polaroid-photo"></div>
                  <div className="polaroid-photo"></div>
                  <div className="polaroid-photo"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section app-features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Instant Photo Magic</h2>
            <p className="section-subtitle">
              Everything you loved about Polaroid, reimagined for modern iOS.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📸</div>
              <h3 className="feature-title">Authentic Polaroid Aesthetic</h3>
              <p className="feature-description">
                Experience the nostalgic charm of vintage instant photography.
                Every photo captures that distinctive Polaroid look and feel.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3 className="feature-title">Vintage Filters & Effects</h3>
              <p className="feature-description">
                Transform your photos with carefully crafted filters that
                recreate classic Polaroid film stocks and color palettes.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Instant Capture</h3>
              <p className="feature-description">
                Point, shoot, and watch your photo develop. Experience the
                magic of instant photography in the digital age.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🖼️</div>
              <h3 className="feature-title">Classic Polaroid Frames</h3>
              <p className="feature-description">
                Your photos come with authentic Polaroid borders, ready to
                share or print. Timeless style, digital convenience.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💝</div>
              <h3 className="feature-title">Share Beautiful Memories</h3>
              <p className="feature-description">
                Share your Polaroid-style photos instantly to social media or
                send them to friends who appreciate the aesthetic.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Modern iOS Integration</h3>
              <p className="feature-description">
                Built for iOS with support for the latest camera features,
                widgets, and seamless integration with your photo library.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section experience-section polaroid-bg">
        <div className="container">
          <div className="experience-content">
            <h2 className="section-title">The Joy of Instant Photography</h2>
            <p className="experience-text">
              PolaMoment brings back the magic of waiting for your photo to develop,
              the excitement of shaking a Polaroid, and the joy of having a
              physical-looking keepsake of your favorite moments.
            </p>
            <p className="experience-text">
              We've meticulously recreated the look, feel, and experience of
              classic Polaroid cameras while leveraging modern iOS capabilities
              for the best of both worlds.
            </p>
            <div className="experience-features">
              <div className="experience-item">
                <span className="check-icon">✓</span>
                <span>Authentic development animation</span>
              </div>
              <div className="experience-item">
                <span className="check-icon">✓</span>
                <span>Vintage color science</span>
              </div>
              <div className="experience-item">
                <span className="check-icon">✓</span>
                <span>Classic Polaroid sounds</span>
              </div>
              <div className="experience-item">
                <span className="check-icon">✓</span>
                <span>Modern camera quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="section app-cta-section">
        <div className="container">
          <div className="app-cta-card polaroid-cta">
            <h2 className="app-cta-title">Coming Soon to the App Store</h2>
            <p className="app-cta-description">
              PolaMoment is currently in testing. We're putting the finishing touches
              on bringing vintage Polaroid magic to your iPhone.
            </p>
            <div className="app-cta-actions">
              <a href="mailto:support@islanderstudio.app?subject=PolaMoment%20Waitlist" className="btn btn-secondary btn-large">
                Join the Waitlist
              </a>
              <p className="app-cta-note">
                Be the first to know when PolaMoment launches
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
