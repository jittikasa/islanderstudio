import { Link } from 'react-router-dom'

export default function PolaMoment() {
  // Super minimal version - just text to prove routing works
  return (
    <div style={{
      padding: '150px 20px 50px',
      minHeight: '100vh',
      backgroundColor: '#FAFAF5',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        {/* Hero */}
        <div style={{textAlign: 'center', marginBottom: '80px'}}>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            border: '1px solid #D93025',
            borderRadius: '50px',
            color: '#D93025',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '2px',
            marginBottom: '24px'
          }}>
            iOS • CAMERA APP
          </div>

          <h1 style={{
            fontSize: '72px',
            fontWeight: '500',
            margin: '0 0 24px',
            color: '#1c1917',
            lineHeight: '1.1'
          }}>
            PolaMoment<span style={{color: '#D93025'}}>.</span>
          </h1>

          <p style={{
            fontSize: '32px',
            fontStyle: 'italic',
            color: '#57534e',
            margin: '0 0 24px'
          }}>
            Capture the Magic
          </p>

          <p style={{
            fontSize: '20px',
            color: '#44403c',
            maxWidth: '600px',
            margin: '0 auto 48px',
            lineHeight: '1.6'
          }}>
            Transform your iPhone into a vintage Polaroid camera. Create instant memories with that iconic retro aesthetic we all love.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '80px'
        }}>
          <div style={{padding: '32px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>📸</div>
            <h3 style={{fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: '#1c1917'}}>Authentic Polaroid Aesthetic</h3>
            <p style={{fontSize: '16px', color: '#57534e', margin: 0, lineHeight: '1.6'}}>
              Experience the nostalgic charm of vintage instant photography. Every photo captures that distinctive Polaroid look and feel.
            </p>
          </div>

          <div style={{padding: '32px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>🎨</div>
            <h3 style={{fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: '#1c1917'}}>Vintage Filters & Effects</h3>
            <p style={{fontSize: '16px', color: '#57534e', margin: 0, lineHeight: '1.6'}}>
              Transform your photos with carefully crafted filters that recreate classic Polaroid film stocks and color palettes.
            </p>
          </div>

          <div style={{padding: '32px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>⚡</div>
            <h3 style={{fontSize: '24px', fontWeight: '700', marginBottom: '12px', color: '#1c1917'}}>Instant Capture</h3>
            <p style={{fontSize: '16px', color: '#57534e', margin: 0, lineHeight: '1.6'}}>
              Point, shoot, and watch your photo develop. Experience the magic of instant photography in the digital age.
            </p>
          </div>
        </div>

        {/* Privacy Section */}
        <div style={{
          backgroundColor: '#292524',
          color: 'white',
          padding: '80px 32px',
          borderRadius: '12px',
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <div style={{fontSize: '64px', marginBottom: '24px'}}>🔒</div>
          <h2 style={{fontSize: '48px', fontWeight: '500', marginBottom: '24px', color: 'white'}}>Your Privacy Matters</h2>
          <p style={{fontSize: '20px', maxWidth: '700px', margin: '0 auto 32px', lineHeight: '1.6', color: '#d6d3d1'}}>
            We don't collect, store, or share any of your data. All photos stay on your device. No cloud storage, no analytics, no tracking. Just you and your memories.
          </p>
          <Link to="/privacy" style={{
            display: 'inline-block',
            padding: '16px 32px',
            backgroundColor: 'white',
            color: '#292524',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px'
          }}>
            Read Privacy Policy
          </Link>
        </div>

        {/* Download Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '80px 32px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            border: '1px solid #D93025',
            borderRadius: '50px',
            backgroundColor: 'rgba(217, 48, 37, 0.05)',
            color: '#D93025',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '2px',
            marginBottom: '24px'
          }}>
            AVAILABLE ON iOS
          </div>

          <h2 style={{fontSize: '56px', fontWeight: '500', marginBottom: '24px', color: '#1c1917'}}>Start Creating Today</h2>
          <p style={{fontSize: '20px', color: '#57534e', maxWidth: '700px', margin: '0 auto 48px', lineHeight: '1.6'}}>
            Download PolaMoment<span style={{color: '#D93025', fontWeight: '700'}}>.</span> and start capturing vintage-style Polaroid photos on your iPhone right away.
          </p>

          <a href="#" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '20px 40px',
            backgroundColor: '#121212',
            color: 'white',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            <svg width="24" height="28" viewBox="0 0 20 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <div style={{textAlign: 'left'}}>
              <div style={{fontSize: '12px', opacity: 0.8}}>Download on the</div>
              <div style={{fontWeight: '700'}}>App Store</div>
            </div>
          </a>

          <p style={{marginTop: '32px', fontSize: '14px', color: '#78716c'}}>
            Requires iOS 14.0 or later • Compatible with iPhone
          </p>
        </div>
      </div>
    </div>
  )
}
