import { Link } from 'react-router-dom'

export default function PolaMoment() {
  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#FAFAF5',
      color: '#292524',
      paddingTop: '100px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    hero: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '2rem'
    },
    heroContent: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    badge: {
      display: 'inline-block',
      marginBottom: '1.5rem',
      padding: '0.5rem 1rem',
      border: '1px solid #D93025',
      color: '#D93025',
      fontSize: '0.75rem',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      fontWeight: '700',
      borderRadius: '9999px',
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    title: {
      fontFamily: 'Georgia, serif',
      fontSize: 'clamp(3rem, 8vw, 7rem)',
      fontWeight: '500',
      lineHeight: '1.1',
      marginBottom: '2rem',
      color: '#1c1917'
    },
    titleDot: {
      color: '#D93025'
    },
    subtitle: {
      fontFamily: 'Georgia, serif',
      fontStyle: 'italic',
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      color: '#57534e',
      marginBottom: '1.5rem'
    },
    description: {
      maxWidth: '42rem',
      margin: '0 auto 3rem',
      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
      color: '#44403c',
      lineHeight: '1.625'
    },
    cameraWrapper: {
      maxWidth: '28rem',
      margin: '0 auto 3rem',
      position: 'relative'
    },
    cameraImg: {
      width: '100%',
      height: 'auto',
      display: 'block'
    },
    section: {
      padding: '6rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    sectionDark: {
      backgroundColor: '#292524',
      color: 'white',
      padding: '6rem 2rem',
      textAlign: 'center'
    },
    sectionWhite: {
      backgroundColor: 'white',
      padding: '6rem 2rem',
      textAlign: 'center'
    },
    sectionTitle: {
      fontFamily: 'Georgia, serif',
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      marginBottom: '1.5rem',
      color: '#1c1917'
    },
    sectionTitleWhite: {
      fontFamily: 'Georgia, serif',
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      marginBottom: '1.5rem',
      color: 'white'
    },
    sectionText: {
      maxWidth: '48rem',
      margin: '0 auto 2rem',
      fontSize: '1.25rem',
      lineHeight: '1.625',
      color: '#d6d3d1'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '3rem'
    },
    card: {
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      textAlign: 'left'
    },
    cardIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      display: 'block'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: '#1c1917'
    },
    cardText: {
      fontSize: '1.125rem',
      lineHeight: '1.7',
      color: '#57534e',
      margin: 0
    },
    btn: {
      display: 'inline-block',
      padding: '0.75rem 2rem',
      backgroundColor: 'white',
      color: '#292524',
      borderRadius: '9999px',
      fontWeight: '500',
      textDecoration: 'none',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'all 0.3s'
    },
    btnLarge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1.25rem 2.5rem',
      backgroundColor: '#121212',
      color: 'white',
      borderRadius: '9999px',
      fontSize: '1.125rem',
      fontWeight: '500',
      textDecoration: 'none',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    downloadNote: {
      marginTop: '2rem',
      fontSize: '0.875rem',
      color: '#78716c'
    },
    storyGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '4rem',
      alignItems: 'center',
      textAlign: 'left'
    },
    storyText: {
      fontSize: '1.125rem',
      color: '#57534e',
      lineHeight: '1.625',
      marginBottom: '1rem'
    },
    features: {
      marginTop: '2rem'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      marginBottom: '0.75rem'
    },
    featureIcon: {
      width: '1.25rem',
      height: '1.25rem',
      borderRadius: '9999px',
      backgroundColor: 'rgba(217, 48, 37, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      marginTop: '0.25rem'
    },
    featureDot: {
      width: '0.5rem',
      height: '0.5rem',
      borderRadius: '9999px',
      backgroundColor: '#D93025'
    },
    featureTitle: {
      fontWeight: '600',
      color: '#1c1917',
      marginBottom: '0.25rem'
    },
    featureDesc: {
      fontSize: '0.875rem',
      color: '#57534e',
      margin: 0
    },
    polaroidStack: {
      position: 'relative',
      maxWidth: '400px',
      margin: '0 auto'
    },
    polaroid: {
      backgroundColor: 'white',
      padding: '1.25rem',
      boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
      borderRadius: '0.125rem'
    },
    polaroidPhoto: {
      aspectRatio: '1/1',
      backgroundColor: '#f5f5f4',
      borderRadius: '0.125rem',
      marginBottom: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    polaroidIcon: {
      width: '10rem',
      height: '10rem',
      objectFit: 'contain'
    },
    polaroidCaption: {
      height: '5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Georgia, serif',
      fontStyle: 'italic',
      color: '#57534e'
    }
  }

  // Responsive grid for medium screens
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    styles.storyGrid.gridTemplateColumns = 'repeat(2, 1fr)'
  }

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>
            iOS • Camera App
          </div>
          <h1 style={styles.title}>
            PolaMoment<span style={styles.titleDot}>.</span>
          </h1>
          <p style={styles.subtitle}>
            Capture the Magic
          </p>
          <p style={styles.description}>
            Transform your iPhone into a vintage Polaroid camera. Create instant memories with that iconic retro aesthetic we all love.
          </p>

          {/* Camera Visual */}
          <div style={styles.cameraWrapper}>
            <img
              src="/polamoment/Cam.svg"
              alt="PolaMoment Camera"
              style={styles.cameraImg}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        </div>
      </header>

      <main>
        {/* Features Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Instant Photo Magic</h2>
          <p style={{...styles.description, color: '#57534e'}}>
            Everything you loved about Polaroid, reimagined for modern iOS.
          </p>

          <div style={styles.grid}>
            <div style={styles.card}>
              <span style={styles.cardIcon}>📸</span>
              <h3 style={styles.cardTitle}>Authentic Polaroid Aesthetic</h3>
              <p style={styles.cardText}>
                Experience the nostalgic charm of vintage instant photography. Every photo captures that distinctive Polaroid look and feel.
              </p>
            </div>

            <div style={styles.card}>
              <span style={styles.cardIcon}>🎨</span>
              <h3 style={styles.cardTitle}>Vintage Filters & Effects</h3>
              <p style={styles.cardText}>
                Transform your photos with carefully crafted filters that recreate classic Polaroid film stocks and color palettes.
              </p>
            </div>

            <div style={styles.card}>
              <span style={styles.cardIcon}>⚡</span>
              <h3 style={styles.cardTitle}>Instant Capture</h3>
              <p style={styles.cardText}>
                Point, shoot, and watch your photo develop. Experience the magic of instant photography in the digital age.
              </p>
            </div>

            <div style={styles.card}>
              <span style={styles.cardIcon}>🖼️</span>
              <h3 style={styles.cardTitle}>Classic Polaroid Frames</h3>
              <p style={styles.cardText}>
                Your photos come with authentic Polaroid borders, ready to share or print. Timeless style, digital convenience.
              </p>
            </div>

            <div style={styles.card}>
              <span style={styles.cardIcon}>💝</span>
              <h3 style={styles.cardTitle}>Share Beautiful Memories</h3>
              <p style={styles.cardText}>
                Share your Polaroid-style photos instantly to social media or send them to friends who appreciate the aesthetic.
              </p>
            </div>

            <div style={styles.card}>
              <span style={styles.cardIcon}>📱</span>
              <h3 style={styles.cardTitle}>Modern iOS Integration</h3>
              <p style={styles.cardText}>
                Built for iOS with support for the latest camera features, widgets, and seamless integration with your photo library.
              </p>
            </div>
          </div>
        </section>

        {/* The Story Section */}
        <section style={{...styles.section, backgroundColor: '#FAFAF5', borderTop: '1px solid #e7e5e4'}}>
          <div style={styles.storyGrid}>
            <div>
              <div style={{fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', color: '#78716c', textTransform: 'uppercase', marginBottom: '0.75rem'}}>
                The Story
              </div>
              <h2 style={{...styles.sectionTitle, marginBottom: '1.5rem'}}>Nostalgia Meets Technology</h2>
              <div style={{width: '4rem', height: '0.25rem', backgroundColor: '#D93025', marginBottom: '1.5rem'}}></div>

              <p style={styles.storyText}>
                Remember the excitement of shaking a fresh Polaroid and watching your memory slowly appear? That magic feeling of instant photography is now at your fingertips.
              </p>
              <p style={styles.storyText}>
                PolaMoment<span style={{color: '#D93025', fontWeight: '700'}}>.</span> brings back the charm of vintage Polaroid cameras to your iPhone. Create authentic-looking instant photos with that distinctive white border, warm tones, and slightly faded aesthetic that made Polaroids so iconic.
              </p>
              <p style={styles.storyText}>
                Whether you're capturing moments with friends, documenting your travels, or just expressing your creativity, PolaMoment<span style={{color: '#D93025', fontWeight: '700'}}>.</span> makes every photo feel special.
              </p>

              <div style={styles.features}>
                <div style={styles.featureItem}>
                  <div style={styles.featureIcon}>
                    <div style={styles.featureDot}></div>
                  </div>
                  <div>
                    <h4 style={styles.featureTitle}>Vintage Filters</h4>
                    <p style={styles.featureDesc}>Authentic retro effects that transform your photos instantly</p>
                  </div>
                </div>
                <div style={styles.featureItem}>
                  <div style={styles.featureIcon}>
                    <div style={styles.featureDot}></div>
                  </div>
                  <div>
                    <h4 style={styles.featureTitle}>No Subscriptions</h4>
                    <p style={styles.featureDesc}>One-time purchase, unlimited memories forever</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.polaroidStack}>
              <div style={styles.polaroid}>
                <div style={styles.polaroidPhoto}>
                  <img
                    src="/polamoment/Icon-1024.png"
                    alt="PolaMoment"
                    style={styles.polaroidIcon}
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
                <div style={styles.polaroidCaption}>
                  <p style={{margin: 0}}>Timeless memories, one click away</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section style={styles.sectionDark}>
          <div style={{fontSize: '4rem', marginBottom: '1.5rem'}}>🔒</div>
          <h2 style={styles.sectionTitleWhite}>Your Privacy Matters</h2>
          <p style={styles.sectionText}>
            We don't collect, store, or share any of your data. All photos stay on your device. No cloud storage, no analytics, no tracking. Just you and your memories.
          </p>
          <Link to="/privacy" style={styles.btn}>
            Read Privacy Policy
          </Link>
        </section>

        {/* Download Section */}
        <section style={styles.sectionWhite}>
          <div style={{...styles.badge, backgroundColor: 'rgba(217, 48, 37, 0.05)'}}>
            Available on iOS
          </div>
          <h2 style={{...styles.sectionTitle, fontSize: 'clamp(2rem, 6vw, 3.75rem)'}}>Start Creating Today</h2>
          <p style={{...styles.description, color: '#57534e', marginBottom: '3rem'}}>
            Download PolaMoment<span style={{color: '#D93025', fontWeight: '700'}}>.</span> and start capturing vintage-style Polaroid photos on your iPhone right away.
          </p>

          <a href="#" style={styles.btnLarge}>
            <svg width="28" height="33" viewBox="0 0 20 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <div style={{textAlign: 'left'}}>
              <div style={{fontSize: '0.75rem', opacity: 0.8}}>Download on the</div>
              <div style={{fontWeight: '700'}}>App Store</div>
            </div>
          </a>

          <p style={styles.downloadNote}>
            Requires iOS 14.0 or later • Compatible with iPhone
          </p>
        </section>
      </main>
    </div>
  )
}
