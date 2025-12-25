import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ShellistOriginal() {
  useEffect(() => {
    // Load Shellist CSS files
    const cssFiles = [
      '/shellist/css/aos.css',
      '/shellist/css/normalize.css',
      '/shellist/css/slinky.min.css',
      '/shellist/css/slinky-mobile-theme.css',
      '/shellist/css/font-awesome.min.css',
      'https://unpkg.com/swiper/swiper-bundle.min.css',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
      '/shellist/css/main.css',
      '/shellist/css/reset.css',
      '/shellist/css/miwlo.css',
      '/shellist/css/responsive.css'
    ]

    const linkElements = cssFiles.map(href => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.setAttribute('data-shellist-style', 'true')
      document.head.appendChild(link)
      return link
    })

    // Load JavaScript libraries in order
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.setAttribute('data-shellist-script', 'true')
        script.onload = resolve
        script.onerror = reject
        document.body.appendChild(script)
      })
    }

    const initScripts = async () => {
      try {
        // Load jQuery first
        await loadScript('https://code.jquery.com/jquery-3.6.0.min.js')

        // Load Bootstrap
        await loadScript('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js')

        // Load other libraries in parallel
        await Promise.all([
          loadScript('/shellist/js/vendor/modernizr-3.11.2.min.js'),
          loadScript('/shellist/js/parallax.min.js'),
          loadScript('/shellist/js/aos.js'),
          loadScript('https://unpkg.com/swiper/swiper-bundle.min.js'),
          loadScript('/shellist/js/font-awesome.min.js'),
          loadScript('/shellist/js/slinky.min.js')
        ])

        // Load app.js last
        await loadScript('/shellist/js/app.js')

        // Initialize AOS if available
        if (window.AOS) {
          window.AOS.init({
            duration: 800,
            once: true
          })
        }
      } catch (error) {
        console.error('Error loading Shellist scripts:', error)
      }
    }

    initScripts()

    // Cleanup function
    return () => {
      // Remove added CSS
      linkElements.forEach(link => link.remove())

      // Remove added scripts
      document.querySelectorAll('[data-shellist-script="true"]').forEach(script => script.remove())
    }
  }, [])

  return (
    <>
      {/* Shellist Header */}
      <header className="header-area-desktop miwlo-white-bg miwlo-header-black">
        <div className="container">
          <div className="row">
            <div className="col">
              <nav className="navbar navbar-expand-md miwlo-initial-navbar" role="navigation" aria-label="Main navigation">
                <a className="navbar-brand" href="#" aria-label="Shellist home">
                  <img src="/shellist/images/Shellist-logo.png" alt="Shellist" />
                </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ms-auto" role="menubar">
                    <li className="menu-item" role="none">
                      <a className="active" href="#" role="menuitem" aria-current="page">Home</a>
                    </li>
                    <li className="menu-item" role="none">
                      <Link to="/support" role="menuitem">Support</Link>
                    </li>
                  </ul>

                  <ul className="button-wrapper" style={{display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 0 25px', padding: 0, listStyle: 'none'}}>
                    <li style={{margin: 0}}>
                      <a href="#" className="instagram-link" style={{width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#333333', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s'}}>
                        <i className="fab fa-instagram" style={{fontSize: '20px'}}></i>
                      </a>
                    </li>
                    <li style={{margin: 0}}>
                      <a href="#" className="miwlo-btn-pill download-app-btn" style={{backgroundColor: '#F2F0E6', color: '#000', padding: '10px 20px', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s', whiteSpace: 'nowrap', border: 'none', outline: 'none'}}>
                        <img src="/shellist/images/Shellist-logo.png" alt="Shellist" style={{width: '26px', height: '26px'}} />
                        Download App
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className="miwlo-header-area-mobile">
        <div className="miwlo-header-mobile">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <ul className="active">
                  <li>
                    <a className="mobile-logo" href="#"><img src="/shellist/images/Shellist-logo.png" alt="Shellist" /></a>
                  </li>
                  <li className="mobile-header-btn-wrapper">
                    <a href="#" className="instagram-link" style={{width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#333333', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none'}}>
                      <i className="fab fa-instagram" style={{fontSize: '20px'}}></i>
                    </a>
                  </li>
                  <li className="mobile-header-btn-wrapper">
                    <a href="#" className="miwlo-btn-pill download-app-btn" style={{backgroundColor: '#F2F0E6', color: '#000', padding: '8px 16px', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', whiteSpace: 'nowrap'}}>
                      <img src="/shellist/images/Shellist-logo.png" alt="Shellist" style={{width: '24px', height: '24px'}} />
                      Download App
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                      </span>
                    </a>
                    <ul>
                      <li><a href="#">Home</a></li>
                      <li><Link to="/support">Support</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="miwlo-app-landing-banner-wrap">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-7 align-self-center">
              <div className="miwlo-app-landing-banner-text">
                <h1 data-aos="fade-up" data-aos-delay="1000">Build Habits<br />Like Pearls</h1>
                <p data-aos="fade-up" data-aos-delay="1200">Transform your life one habit at a time. Track your daily progress with beautiful pearl visualizations, powerful analytics, and motivational tools that make habit building feel like a treasure hunt.</p>
                <div data-aos="fade-up" data-aos-delay="1400" className="miwlo-app-landing-btn-wrap d-lg-flex">
                  <a className="miwlo-btn-pill btn-black d-flex align-items-center" href="#" data-app-store="pending" aria-label="Download Shellist on the App Store">
                    <div className="icon">
                      <i className="fab fa-apple" aria-hidden="true"></i>
                    </div>
                    <div>Download Shellist</div>
                  </a>
                  <a className="miwlo-btn-border btn-black d-flex align-items-center" href="#" aria-label="Coming soon on Google Play" aria-disabled="true">
                    <div className="icon">
                      <i className="fab fa-google-play" aria-hidden="true"></i>
                    </div>
                    <div>
                      <span>Coming soon on</span>
                      Google Play
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="miwlo-app-landing-banner-right">
                <img className="mobile" src="/shellist/images/screenshots/Screens-2.png" alt="Shellist app interface" data-aos="fade-up" data-aos-delay="1000" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="miwlo-features-wrap feature-one">
        <div className="container">
          <div className="row">
            <div className="col-lg col-md">
              <div className="miwlo-feature-img-wrapper">
                <div className="miwlo-feature-img miwlo-parallax">
                  <div className="layer" data-depth="0.1">
                    <div data-aos="fade-up" data-aos-delay="300">
                      <img data-parallax='{"y" : 30}' className="mobile" src="/shellist/images/screenshots/Screens-1.png" alt="Shellist app showing habit progress tracking" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg col-md offset-xl-2 offset-md-1 align-self-center">
              <div className="miwlo-features-text-wrapper">
                <h3 data-aos="fade-up" data-aos-delay="300">Track Progress<br />That Feels Natural</h3>
                <p data-aos="fade-up" data-aos-delay="400">Your habits visualized as pearl chains that grow with every completion. Watch your consistency build over time with streak tracking, detailed analytics, and satisfying haptic feedback that makes each check-in rewarding.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial/Vision Board Section */}
      <div className="miwlo-app-testimonial-wrap">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="miwlo-app-testimonial-text" data-aos="fade-left" data-aos-delay="300">
                <h2>Vision Meets Daily Action</h2>
                <p>Connect your aspirations to your actions. Define who you want to become, then build the daily habits that bridge the gap. Your vision board becomes actionable when paired with consistent micro-commitments that compound over time.</p>
              </div>
            </div>
            <div className="col-md-6 align-self-center">
              <div className="miwlo-app-testimonial-text text-center" data-aos="fade-right" data-aos-delay="300">
                <div className="miwlo-testimonial-text-icon miwlo-parallax">
                  <div className="layer" data-depth="1">
                    <div data-parallax='{"y" : 30}'>
                      <img src="/shellist/images/icons/quote-alt.png" alt="Decorative quote icon" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <img src="/shellist/images/screenshots/Screens-4.png" alt="Shellist vision board feature" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
