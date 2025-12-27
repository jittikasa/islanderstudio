import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState('')
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Live clock - quirky touch
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shellist', label: 'Shellist' },
    { path: '/polamoment', label: 'PolaMoment' },
    { path: '/support', label: 'Support' },
  ]

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">islander</span>
          <span className="header__logo-dot">.</span>
        </Link>

        <nav className="header__nav">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`header__nav-link ${
                    location.pathname === link.path ? 'header__nav-link--active' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__right">
          <span className="header__time">{time}</span>

          <button
            className={`header__menu-btn ${menuOpen ? 'header__menu-btn--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="header__menu-line"></span>
            <span className="header__menu-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`header__overlay ${menuOpen ? 'header__overlay--open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`header__mobile-menu ${menuOpen ? 'header__mobile-menu--open' : ''}`}>
        <nav className="header__mobile-nav">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`header__mobile-link ${
                location.pathname === link.path ? 'header__mobile-link--active' : ''
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="header__mobile-link-text">{link.label}</span>
              <span className="header__mobile-link-arrow">→</span>
            </Link>
          ))}
        </nav>

        <div className="header__mobile-footer">
          <a href="mailto:support@islanderstudio.app" className="header__mobile-email">
            support@islanderstudio.app
          </a>
          <p className="header__mobile-copyright">
            islander studio, 2025
          </p>
        </div>
      </div>
    </header>
  )
}
