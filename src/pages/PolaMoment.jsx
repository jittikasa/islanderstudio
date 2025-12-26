import { Link } from 'react-router-dom'
import './PolaMoment.css'

const PrivacyLockIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="pola-privacy-icon">
    <rect x="20" y="30" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M24 30 L24 22 C24 17.6 27.6 14 32 14 C36.4 14 40 17.6 40 22 L40 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="32" cy="40" r="3" fill="currentColor"/>
    <path d="M32 43 L32 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const AppleIcon = ({ size = 28 }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 20 24" fill="currentColor" className="pola-apple-icon">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
)

export default function PolaMoment() {
  return (
    <div className="pola-page">
      {/* Hero Section */}
      <header className="pola-hero">
        {/* Decorative Background */}
        <div className="pola-hero-bg">
          <div className="pola-hero-blur-1"></div>
          <div className="pola-hero-blur-2"></div>
        </div>

        <div className="pola-hero-content pola-container">
          <div className="pola-badge">
            iOS • Camera App
          </div>
          <h1 className="pola-title">
            PolaMoment<span className="pola-title-dot">.</span>
          </h1>
          <p className="pola-subtitle">
            Capture the Magic
          </p>
          <p className="pola-description">
            Transform your iPhone into a vintage Polaroid camera. Create instant memories with that iconic retro aesthetic we all love.
          </p>

          {/* Camera Visual with Polaroid Animation */}
          <div className="pola-camera-wrapper pola-fade-in-up pola-delay-3">
            <img src="/polamoment/Cam.svg" alt="PolaMoment Camera" className="pola-camera-img" />

            {/* Animated Polaroids */}
            <div className="pola-polaroids-container">
              {/* Polaroid 1 - Christmas Gifts */}
              <div className="pola-polaroid pola-polaroid-eject pola-delay-20">
                <div className="pola-polaroid-frame">
                  <div className="pola-polaroid-photo">
                    <img src="/polamoment/Image-1.jpeg" alt="" />
                    <div className="pola-polaroid-overlay"></div>
                  </div>
                  <div className="pola-polaroid-bottom"></div>
                </div>
              </div>

              {/* Polaroid 2 - Food Platter */}
              <div className="pola-polaroid pola-polaroid-eject pola-delay-35">
                <div className="pola-polaroid-frame">
                  <div className="pola-polaroid-photo">
                    <img src="/polamoment/Image-2.jpeg" alt="" />
                    <div className="pola-polaroid-overlay"></div>
                  </div>
                  <div className="pola-polaroid-bottom"></div>
                </div>
              </div>

              {/* Polaroid 3 - Black Cat */}
              <div className="pola-polaroid pola-polaroid-eject pola-delay-50">
                <div className="pola-polaroid-frame">
                  <div className="pola-polaroid-photo">
                    <img src="/polamoment/Image-3.jpeg" alt="" />
                    <div className="pola-polaroid-overlay"></div>
                  </div>
                  <div className="pola-polaroid-bottom"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* The Story Section */}
        <section id="story" className="pola-story">
          <div className="pola-container">
            <div className="pola-grid pola-grid-2">
              <div className="pola-fade-in-up pola-delay-2">
                <div className="pola-section-label">The Story</div>
                <h2 className="pola-section-title pola-section-title-lg">Nostalgia Meets Technology</h2>
                <div className="pola-divider pola-slide-in pola-delay-3"></div>
                <div className="pola-text-content">
                  <p className="pola-fade-in-up pola-delay-4">
                    <span className="pola-drop-cap">R</span>emember the excitement of shaking a fresh Polaroid and watching your memory slowly appear? That magic feeling of instant photography is now at your fingertips.
                  </p>
                  <p className="pola-fade-in-up pola-delay-5">
                    PolaMoment<span className="pola-text-bold-red">.</span> brings back the charm of vintage Polaroid cameras to your iPhone. Create authentic-looking instant photos with that distinctive white border, warm tones, and slightly faded aesthetic that made Polaroids so iconic.
                  </p>
                  <p className="pola-fade-in-up pola-delay-6">
                    Whether you're capturing moments with friends, documenting your travels, or just expressing your creativity, PolaMoment<span className="pola-text-bold-red">.</span> makes every photo feel special.
                  </p>
                </div>

                {/* Features Highlights */}
                <div className="pola-features">
                  <div className="pola-feature-item pola-fade-in-up pola-delay-7">
                    <div className="pola-feature-icon">
                      <div className="pola-feature-dot"></div>
                    </div>
                    <div>
                      <h4 className="pola-feature-title">Vintage Filters</h4>
                      <p className="pola-feature-desc">Authentic retro effects that transform your photos instantly</p>
                    </div>
                  </div>
                  <div className="pola-feature-item pola-fade-in-up pola-delay-8">
                    <div className="pola-feature-icon">
                      <div className="pola-feature-dot pola-delay-5"></div>
                    </div>
                    <div>
                      <h4 className="pola-feature-title">No Subscriptions</h4>
                      <p className="pola-feature-desc">One-time purchase, unlimited memories forever</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pola-fade-in pola-delay-5">
                {/* Multiple Polaroid Stack Effect */}
                <div className="pola-stack-wrapper">
                  <div className="pola-stack-layer-1"></div>
                  <div className="pola-stack-layer-2"></div>
                  <div className="pola-stack-main">
                    <div className="pola-stack-photo">
                      <div className="pola-stack-gradient"></div>
                      <img src="/polamoment/Icon-1024.png" alt="PolaMoment" className="pola-stack-icon" />
                    </div>
                    <div className="pola-stack-caption">
                      <p className="pola-stack-text">Timeless memories, one click away</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Highlight */}
        <section className="pola-privacy">
          <div className="pola-container pola-privacy-content">
            <div className="pola-privacy-icon-wrapper pola-fade-in-up pola-delay-2">
              <div className="pola-privacy-icon-hover">
                <PrivacyLockIcon />
              </div>
            </div>
            <h2 className="pola-privacy-title pola-fade-in-up pola-delay-3">Your Privacy Matters</h2>
            <p className="pola-privacy-text pola-fade-in-up pola-delay-4">
              We don't collect, store, or share any of your data. All photos stay on your device. No cloud storage, no analytics, no tracking. Just you and your memories.
            </p>
            <Link
              to="/privacy"
              className="pola-privacy-btn pola-fade-in-up pola-delay-5"
            >
              Read Privacy Policy
            </Link>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="pola-download">
          <div className="pola-container pola-download-content">
            <div className="pola-download-badge pola-fade-in-up pola-delay-2">
              Available on iOS
            </div>
            <h2 className="pola-download-title pola-fade-in-up pola-delay-3">Start Creating Today</h2>
            <p className="pola-download-text pola-fade-in-up pola-delay-4">
              Download PolaMoment<span className="pola-text-bold-red">.</span> and start capturing vintage-style Polaroid photos on your iPhone right away.
            </p>

            <a
              href="#"
              className="pola-download-btn pola-fade-in-up pola-delay-5"
            >
              <AppleIcon size={28} />
              <div className="pola-download-btn-text">
                <div className="pola-download-btn-small">Download on the</div>
                <div className="pola-download-btn-large">App Store</div>
              </div>
            </a>

            <p className="pola-download-note pola-fade-in pola-delay-6">
              Requires iOS 14.0 or later • Compatible with iPhone
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
