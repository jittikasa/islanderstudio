import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const isShellistPage = location.pathname === '/shellist'
  const isPolaMomentPage = location.pathname === '/polamoment'

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <div className="logo-wrapper">
            <Link to="/" className="logo">
              <span className="logo-text">Islander</span>
              <span className="logo-accent">Studio</span>
            </Link>
            {isShellistPage && (
              <div className="logo-app-section">
                <span className="logo-separator">×</span>
                <span className="logo-app-name">Shellist</span>
              </div>
            )}
            {isPolaMomentPage && (
              <div className="logo-app-section">
                <span className="logo-separator">×</span>
                <span className="logo-app-name">PolaMoment</span>
                <span className="logo-app-dot">.</span>
              </div>
            )}
          </div>

          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li>
              <Link
                to="/"
                className={location.pathname === '/' ? 'active' : ''}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shellist"
                className={location.pathname === '/shellist' ? 'active' : ''}
              >
                Shellist
              </Link>
            </li>
            <li>
              <Link
                to="/polamoment"
                className={location.pathname === '/polamoment' ? 'active' : ''}
              >
                PolaMoment
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className={location.pathname === '/support' ? 'active' : ''}
              >
                Support
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
