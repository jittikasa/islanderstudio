import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './PolaMoment.css'

export default function PolaMoment() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageErrors, setImageErrors] = useState({})

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  const features = [
    {
      number: '01',
      title: 'Authentic Aesthetic',
      description: 'Experience the nostalgic charm of vintage instant photography with every shot.'
    },
    {
      number: '02',
      title: 'Vintage Filters',
      description: 'Transform your photos with carefully crafted filters that recreate classic film stocks.'
    },
    {
      number: '03',
      title: 'Instant Capture',
      description: 'Point, shoot, and watch your photo develop. The magic of instant photography.'
    },
    {
      number: '04',
      title: 'Classic Frames',
      description: 'Your photos come with authentic Polaroid borders, ready to share or print.'
    },
    {
      number: '05',
      title: 'Share Memories',
      description: 'Share your Polaroid-style photos instantly to social media or send to friends.'
    },
    {
      number: '06',
      title: 'iOS Native',
      description: 'Built for iOS with support for the latest camera features and seamless integration.'
    }
  ]

  return (
    <div className={`pola ${isLoaded ? 'pola--loaded' : ''}`}>
      {/* Hero Section */}
      <section className="pola__hero">
        <div className="pola__hero-content">
          <div className="pola__hero-text">
            <span className="pola__label">Coming Soon</span>
            <h1 className="pola__title">
              PolaMoment<span className="pola__dot">.</span>
            </h1>
            <p className="pola__tagline">Capture the magic</p>
            <p className="pola__description">
              Transform your iPhone into a vintage Polaroid camera. Create instant
              memories with that iconic retro aesthetic we all love.
            </p>
          </div>

          <div className="pola__hero-visual">
            <div className="pola__camera-wrapper">
              {!imageErrors.camera && (
                <img
                  src="/pola-assets/Cam.svg"
                  alt="PolaMoment Camera"
                  className="pola__camera"
                  onError={() => handleImageError('camera')}
                />
              )}

              {/* Polaroid Stack */}
              <div className="pola__polaroids">
                <div className="pola__polaroid pola__polaroid--1">
                  <div className="pola__polaroid-inner">
                    {!imageErrors.img1 ? (
                      <img
                        src="/pola-assets/Image-1.jpeg"
                        alt=""
                        className="pola__polaroid-img"
                        onError={() => handleImageError('img1')}
                      />
                    ) : (
                      <div className="pola__polaroid-placeholder" />
                    )}
                  </div>
                </div>
                <div className="pola__polaroid pola__polaroid--2">
                  <div className="pola__polaroid-inner">
                    {!imageErrors.img2 ? (
                      <img
                        src="/pola-assets/Image-2.jpeg"
                        alt=""
                        className="pola__polaroid-img"
                        onError={() => handleImageError('img2')}
                      />
                    ) : (
                      <div className="pola__polaroid-placeholder" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pola__features">
        <div className="pola__section-header">
          <div className="pola__section-title">
            <span className="pola__section-number">№</span>
            <h2>Features</h2>
          </div>
          <span className="pola__section-count">{features.length} things we love</span>
        </div>

        <div className="pola__features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="pola__feature"
              style={{ '--index': index }}
            >
              <span className="pola__feature-number">{feature.number}</span>
              <h3 className="pola__feature-title">{feature.title}</h3>
              <p className="pola__feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Section */}
      <section className="pola__privacy">
        <div className="pola__privacy-card">
          <span className="pola__privacy-icon">*</span>
          <h2 className="pola__privacy-title">Your privacy matters</h2>
          <p className="pola__privacy-text">
            We don't collect, store, or share any of your data. All photos stay on
            your device. No cloud storage, no analytics, no tracking.
          </p>
          <Link to="/privacy" className="pola__privacy-link">
            Read privacy policy <span>→</span>
          </Link>
        </div>
      </section>

      {/* Download Section */}
      <section className="pola__download">
        <div className="pola__download-card">
          <span className="pola__download-label">iOS App</span>
          <h2 className="pola__download-title">Start creating today</h2>
          <p className="pola__download-text">
            Download PolaMoment and start capturing vintage-style photos on your iPhone.
          </p>
          <button className="pola__download-btn" disabled>
            <span className="pola__download-btn-text">
              <span className="pola__download-btn-small">Download on the</span>
              <span className="pola__download-btn-large">App Store</span>
            </span>
          </button>
          <p className="pola__download-note">
            Requires iOS 14.0 or later
          </p>
        </div>
      </section>
    </div>
  )
}
