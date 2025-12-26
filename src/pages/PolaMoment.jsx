import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function PolaMoment() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [imageErrors, setImageErrors] = useState({})

  useEffect(() => {
    setIsLoaded(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FAF8F3 0%, #F5F0E8 100%)',
      paddingTop: '80px',
      fontFamily: 'Georgia, "Times New Roman", serif',
      color: '#1a1a1a',
      overflow: 'hidden',
      position: 'relative'
    },
    bgElements: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      opacity: 0.4,
      zIndex: 0
    },
    bgCircle1: {
      position: 'absolute',
      width: '600px',
      height: '600px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(217,48,37,0.15) 0%, transparent 70%)',
      top: '-200px',
      right: '-100px',
      filter: 'blur(80px)',
      animation: 'float 20s ease-in-out infinite'
    },
    bgCircle2: {
      position: 'absolute',
      width: '500px',
      height: '500px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(42,37,33,0.08) 0%, transparent 70%)',
      bottom: '-150px',
      left: '-150px',
      filter: 'blur(60px)',
      animation: 'float 15s ease-in-out infinite reverse'
    },
    container: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 clamp(20px, 5vw, 80px)'
    },
    hero: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingBottom: '80px',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
    },
    heroContent: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '60px',
      alignItems: 'center'
    },
    heroText: {
      maxWidth: '680px'
    },
    heroLabel: {
      display: 'inline-block',
      padding: '8px 20px',
      border: '2px solid #D93025',
      borderRadius: '40px',
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      color: '#D93025',
      marginBottom: '40px',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: 'rgba(217,48,37,0.05)',
      backdropFilter: 'blur(10px)',
      width: 'fit-content',
      animation: isLoaded ? 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
    },
    heroTitle: {
      fontSize: 'clamp(48px, 8vw, 72px)',
      fontWeight: '400',
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
      marginBottom: '20px',
      fontFamily: '"Playfair Display", Georgia, serif',
      color: '#0a0a0a',
      animation: isLoaded ? 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards' : 'none'
    },
    titleDot: {
      color: '#D93025',
      fontSize: '1.2em',
      display: 'inline-block',
      animation: isLoaded ? 'pulse 2s ease-in-out infinite' : 'none'
    },
    heroSubtitle: {
      fontSize: 'clamp(20px, 3vw, 32px)',
      fontStyle: 'italic',
      fontWeight: '300',
      color: '#4a4a4a',
      marginBottom: '20px',
      animation: isLoaded ? 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards' : 'none'
    },
    heroDescription: {
      fontSize: 'clamp(16px, 2vw, 20px)',
      lineHeight: '1.6',
      color: '#2a2a2a',
      fontFamily: 'Georgia, serif',
      animation: isLoaded ? 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s backwards' : 'none'
    },
    // Camera Visual
    cameraWrapper: {
      position: 'relative',
      maxWidth: '500px',
      margin: '0 auto',
      animation: isLoaded ? 'fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s backwards' : 'none'
    },
    cameraImg: {
      width: '100%',
      height: 'auto',
      display: imageErrors.camera ? 'none' : 'block'
    },
    polaroidsContainer: {
      position: 'absolute',
      top: '15%',
      left: '50%',
      transform: 'translateX(-45%)',
      width: '42%',
      pointerEvents: 'none',
      zIndex: 50
    },
    polaroid: {
      position: 'absolute',
      width: '100%'
    },
    polaroidFrame: {
      backgroundColor: 'white',
      padding: '0.75rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      borderRadius: '2px'
    },
    polaroidPhoto: {
      aspectRatio: '1 / 1',
      marginBottom: '0.75rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid #f3f4f6',
      backgroundColor: '#f5f5f4'
    },
    polaroidImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    polaroidOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.05), transparent)'
    },
    polaroidBottom: {
      height: '2.5rem'
    },
    featuresSection: {
      padding: '120px 0',
      position: 'relative'
    },
    sectionTitle: {
      fontSize: 'clamp(32px, 5vw, 48px)',
      fontWeight: '400',
      letterSpacing: '-0.02em',
      marginBottom: '16px',
      fontFamily: '"Playfair Display", Georgia, serif',
      color: '#0a0a0a'
    },
    sectionSubtitle: {
      fontSize: 'clamp(16px, 2vw, 20px)',
      color: '#4a4a4a',
      marginBottom: '60px',
      fontStyle: 'italic'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px',
      marginBottom: '80px'
    },
    featureCard: {
      padding: '50px 40px',
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(20px)',
      borderRadius: '12px',
      border: '1px solid rgba(217,48,37,0.1)',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      cursor: 'default'
    },
    featureCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 60px rgba(217,48,37,0.15)',
      borderColor: 'rgba(217,48,37,0.3)'
    },
    featureIcon: {
      fontSize: '56px',
      marginBottom: '24px',
      display: 'block',
      filter: 'grayscale(0.2)'
    },
    featureTitle: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '16px',
      color: '#0a0a0a',
      fontFamily: 'system-ui, sans-serif',
      letterSpacing: '-0.01em'
    },
    featureDescription: {
      fontSize: '17px',
      lineHeight: '1.7',
      color: '#4a4a4a',
      fontFamily: 'Georgia, serif'
    },
    privacySection: {
      padding: '100px 0',
      background: 'linear-gradient(135deg, #2a2521 0%, #1a1614 100%)',
      color: '#FAF8F3'
    },
    privacyIcon: {
      fontSize: '80px',
      marginBottom: '30px',
      display: 'block',
      textAlign: 'center',
      filter: 'drop-shadow(0 4px 20px rgba(217,48,37,0.3))'
    },
    privacyTitle: {
      fontSize: 'clamp(36px, 6vw, 64px)',
      fontWeight: '400',
      marginBottom: '30px',
      textAlign: 'center',
      fontFamily: '"Playfair Display", Georgia, serif',
      color: '#FAF8F3'
    },
    privacyText: {
      fontSize: 'clamp(18px, 2.5vw, 22px)',
      lineHeight: '1.8',
      maxWidth: '800px',
      margin: '0 auto 50px',
      textAlign: 'center',
      color: '#d4d0c8',
      fontFamily: 'Georgia, serif'
    },
    privacyButton: {
      display: 'inline-block',
      padding: '18px 48px',
      background: '#FAF8F3',
      color: '#1a1614',
      borderRadius: '50px',
      fontSize: '16px',
      fontWeight: '600',
      textDecoration: 'none',
      fontFamily: 'system-ui, sans-serif',
      letterSpacing: '0.5px',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 4px 20px rgba(217,48,37,0.2)'
    },
    downloadSection: {
      padding: '120px 0',
      background: 'linear-gradient(135deg, #FAF8F3 0%, #ffffff 100%)',
      textAlign: 'center'
    },
    downloadBadge: {
      display: 'inline-block',
      padding: '10px 24px',
      border: '2px solid #D93025',
      borderRadius: '40px',
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '2.5px',
      textTransform: 'uppercase',
      color: '#D93025',
      marginBottom: '40px',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: 'rgba(217,48,37,0.08)'
    },
    downloadTitle: {
      fontSize: 'clamp(32px, 5vw, 56px)',
      fontWeight: '400',
      marginBottom: '24px',
      fontFamily: '"Playfair Display", Georgia, serif',
      color: '#0a0a0a',
      letterSpacing: '-0.02em'
    },
    downloadText: {
      fontSize: 'clamp(18px, 2.5vw, 24px)',
      lineHeight: '1.7',
      color: '#4a4a4a',
      maxWidth: '700px',
      margin: '0 auto 60px',
      fontFamily: 'Georgia, serif'
    },
    downloadButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '16px',
      padding: '22px 50px',
      background: '#1a1614',
      color: '#FAF8F3',
      borderRadius: '50px',
      fontSize: '18px',
      fontWeight: '600',
      textDecoration: 'none',
      fontFamily: 'system-ui, sans-serif',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 8px 30px rgba(26,22,20,0.3)'
    },
    downloadNote: {
      marginTop: '40px',
      fontSize: '15px',
      color: '#6a6a6a',
      fontFamily: 'system-ui, sans-serif'
    },
    appleIcon: {
      width: '28px',
      height: '32px'
    }
  }

  // Responsive grid layout
  if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
    styles.heroContent.gridTemplateColumns = '1fr 1fr'
  }

  const features = [
    { icon: '📸', title: 'Authentic Polaroid Aesthetic', description: 'Experience the nostalgic charm of vintage instant photography. Every photo captures that distinctive Polaroid look and feel.' },
    { icon: '🎨', title: 'Vintage Filters & Effects', description: 'Transform your photos with carefully crafted filters that recreate classic Polaroid film stocks and color palettes.' },
    { icon: '⚡', title: 'Instant Capture', description: 'Point, shoot, and watch your photo develop. Experience the magic of instant photography in the digital age.' },
    { icon: '🖼️', title: 'Classic Polaroid Frames', description: 'Your photos come with authentic Polaroid borders, ready to share or print. Timeless style, digital convenience.' },
    { icon: '💝', title: 'Share Beautiful Memories', description: 'Share your Polaroid-style photos instantly to social media or send them to friends who appreciate the aesthetic.' },
    { icon: '📱', title: 'Modern iOS Integration', description: 'Built for iOS with support for the latest camera features, widgets, and seamless integration with your photo library.' }
  ]

  return (
    <div style={styles.page}>
      <div style={styles.bgElements}>
        <div style={styles.bgCircle1}></div>
        <div style={styles.bgCircle2}></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.95); }
        }
        @keyframes polaroidEject {
          0% { opacity: 0; transform: translateY(0) rotate(0deg) scale(0.9); filter: blur(2px); }
          15% { opacity: 1; transform: translateY(15px) rotate(1deg) scale(0.95); filter: blur(0); }
          30% { transform: translateY(40px) rotate(-3deg) scale(1); }
          50% { transform: translateY(75px) rotate(2deg) scale(1.02); }
          70% { opacity: 1; transform: translateY(110px) rotate(-2deg) scale(1); }
          85% { opacity: 1; transform: translateY(140px) rotate(1deg) scale(0.98); }
          100% { opacity: 1; transform: translateY(170px) rotate(0deg) scale(0.95); }
        }
        .polaroid-1 { animation: polaroidEject 3.5s cubic-bezier(0.34, 1.56, 0.64, 1) 2s infinite; }
        .polaroid-2 { animation: polaroidEject 3.5s cubic-bezier(0.34, 1.56, 0.64, 1) 3.5s infinite; }
        .polaroid-3 { animation: polaroidEject 3.5s cubic-bezier(0.34, 1.56, 0.64, 1) 5s infinite; }
        @media (hover: hover) {
          button:hover, a:hover { transform: scale(1.05); box-shadow: 0 12px 40px rgba(217,48,37,0.3); }
        }
        @media (max-width: 1023px) {
          .camera-wrapper { max-width: 400px; margin-top: 40px; }
        }
      `}</style>

      <div style={styles.container}>
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <div style={styles.heroText}>
              <div style={styles.heroLabel}>iOS • Camera App</div>
              <h1 style={styles.heroTitle}>
                PolaMoment<span style={styles.titleDot}>.</span>
              </h1>
              <p style={styles.heroSubtitle}>Capture the Magic</p>
              <p style={styles.heroDescription}>
                Transform your iPhone into a vintage Polaroid camera. Create instant memories with that iconic retro aesthetic we all love.
              </p>
            </div>

            <div style={styles.cameraWrapper} className="camera-wrapper">
              <img
                src="/polamoment/Cam.svg"
                alt="PolaMoment Camera"
                style={styles.cameraImg}
                onError={() => handleImageError('camera')}
              />
              {!imageErrors.camera && (
                <div style={styles.polaroidsContainer}>
                  <div style={styles.polaroid} className="polaroid-1">
                    <div style={styles.polaroidFrame}>
                      <div style={styles.polaroidPhoto}>
                        {!imageErrors.img1 ? (
                          <img src="/polamoment/Image-1.jpeg" alt="" style={styles.polaroidImg} onError={() => handleImageError('img1')} />
                        ) : (
                          <div style={{width: '100%', height: '100%', background: 'linear-gradient(135deg, #f5f5f4, #e7e5e4)'}}></div>
                        )}
                        <div style={styles.polaroidOverlay}></div>
                      </div>
                      <div style={styles.polaroidBottom}></div>
                    </div>
                  </div>

                  <div style={styles.polaroid} className="polaroid-2">
                    <div style={styles.polaroidFrame}>
                      <div style={styles.polaroidPhoto}>
                        {!imageErrors.img2 ? (
                          <img src="/polamoment/Image-2.jpeg" alt="" style={styles.polaroidImg} onError={() => handleImageError('img2')} />
                        ) : (
                          <div style={{width: '100%', height: '100%', background: 'linear-gradient(135deg, #f5f5f4, #e7e5e4)'}}></div>
                        )}
                        <div style={styles.polaroidOverlay}></div>
                      </div>
                      <div style={styles.polaroidBottom}></div>
                    </div>
                  </div>

                  <div style={styles.polaroid} className="polaroid-3">
                    <div style={styles.polaroidFrame}>
                      <div style={styles.polaroidPhoto}>
                        {!imageErrors.img3 ? (
                          <img src="/polamoment/Image-3.jpeg" alt="" style={styles.polaroidImg} onError={() => handleImageError('img3')} />
                        ) : (
                          <div style={{width: '100%', height: '100%', background: 'linear-gradient(135deg, #f5f5f4, #e7e5e4)'}}></div>
                        )}
                        <div style={styles.polaroidOverlay}></div>
                      </div>
                      <div style={styles.polaroidBottom}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <section style={styles.featuresSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Instant Photo Magic</h2>
          <p style={styles.sectionSubtitle}>Everything you loved about Polaroid, reimagined for modern iOS.</p>
          <div style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{ ...styles.featureCard, ...(hoveredCard === index ? styles.featureCardHover : {}) }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <span style={styles.featureIcon}>{feature.icon}</span>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.privacySection}>
        <div style={styles.container}>
          <div style={styles.privacyIcon}>🔒</div>
          <h2 style={styles.privacyTitle}>Your Privacy Matters</h2>
          <p style={styles.privacyText}>
            We don't collect, store, or share any of your data. All photos stay on your device. No cloud storage, no analytics, no tracking. Just you and your memories.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link to="/privacy" style={styles.privacyButton}>Read Privacy Policy</Link>
          </div>
        </div>
      </section>

      <section style={styles.downloadSection}>
        <div style={styles.container}>
          <div style={styles.downloadBadge}>Available on iOS</div>
          <h2 style={styles.downloadTitle}>Start Creating Today</h2>
          <p style={styles.downloadText}>
            Download PolaMoment<span style={{ color: '#D93025', fontWeight: '700' }}>.</span> and start capturing vintage-style Polaroid photos on your iPhone right away.
          </p>
          <a href="#" style={styles.downloadButton}>
            <svg style={styles.appleIcon} viewBox="0 0 20 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', opacity: 0.8, fontWeight: '400' }}>Download on the</div>
              <div style={{ fontSize: '20px', fontWeight: '700' }}>App Store</div>
            </div>
          </a>
          <p style={styles.downloadNote}>Requires iOS 14.0 or later • Compatible with iPhone</p>
        </div>
      </section>
    </div>
  )
}
