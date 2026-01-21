import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shellist', label: 'Shellist' },
    { path: '/polamoment', label: 'PolaMoment' },
    { path: '/blog', label: 'Blog' },
    { path: '/support', label: 'Support' },
  ]

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">
            <span className="header__logo-i">
              <span className="header__logo-letter">i</span>
              <img
                src="/branding/Logomark-dark.png"
                alt=""
                className="header__logo-mark"
              />
            </span>
            <span className="header__logo-slander">slander</span>
            <span className="header__logo-dot"></span>
          </span>
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list" role="list">
            {navLinks.map((link) => {
              const isActive = link.path === '/'
                ? location.pathname === link.path
                : location.pathname.startsWith(link.path)

              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`header__nav-link ${
                      isActive ? 'header__nav-link--active' : ''
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="header__right">
          <a href="mailto:support@islanderstudio.app" className="header__contact-btn">
            Say Hello
          </a>

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
      <div
        className={`header__mobile-menu ${menuOpen ? 'header__mobile-menu--open' : ''}`}
        role="dialog"
        aria-label="Mobile navigation menu"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <div className="header__mobile-header">
          <span className="header__logo-text header__logo-text--mobile">
            <span className="header__logo-i">
              <span className="header__logo-letter">i</span>
              <img
                src="/branding/Logomark-dark.png"
                alt=""
                className="header__logo-mark"
              />
            </span>
            <span className="header__logo-slander">slander</span>
            <span className="header__logo-dot"></span>
          </span>
        </div>

        <nav className="header__mobile-nav" aria-label="Mobile navigation">
          {navLinks.map((link, index) => {
            const isActive = link.path === '/'
              ? location.pathname === link.path
              : location.pathname.startsWith(link.path)

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`header__mobile-link ${
                  isActive ? 'header__mobile-link--active' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                aria-current={isActive ? 'page' : undefined}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span className="header__mobile-link-text">{link.label}</span>
                <span className="header__mobile-link-arrow" aria-hidden="true">→</span>
              </Link>
            )
          })}
        </nav>

        <div className="header__mobile-footer">
          <a href="mailto:support@islanderstudio.app" className="header__mobile-email">
            support@islanderstudio.app
          </a>
          <p className="header__mobile-tagline">
            Crafted with soul for everyday moments
          </p>
        </div>
      </div>
    </header>
  )
}
