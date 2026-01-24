import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import './Header.css'

// Small decorative flower SVG for accents
function TinyFlower({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" width="16" height="16">
      <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.8" />
      <ellipse cx="8" cy="4" rx="2" ry="3" fill="currentColor" opacity="0.5" />
      <ellipse cx="8" cy="12" rx="2" ry="3" fill="currentColor" opacity="0.5" />
      <ellipse cx="4" cy="8" rx="3" ry="2" fill="currentColor" opacity="0.5" />
      <ellipse cx="12" cy="8" rx="3" ry="2" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

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
    { path: '/blog', label: 'Journal' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <header className={`header-editorial ${scrolled ? 'header-editorial--scrolled' : ''}`}>
      <div className="header-editorial__container">
        {/* Logo with script font */}
        <Link to="/" className="header-editorial__logo">
          <motion.span
            className="header-editorial__logo-text"
            whileHover={{ letterSpacing: '0.08em' }}
            transition={{ duration: 0.3 }}
          >
            Jittika
          </motion.span>
        </Link>

        {/* Desktop Nav with elegant underlines */}
        <nav className="header-editorial__nav" aria-label="Main navigation">
          <ul className="header-editorial__nav-list" role="list">
            {navLinks.map((link) => {
              const isActive = link.path === '/'
                ? location.pathname === link.path
                : location.pathname.startsWith(link.path)

              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`header-editorial__nav-link ${
                      isActive ? 'header-editorial__nav-link--active' : ''
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="header-editorial__nav-text">{link.label}</span>
                    <span className="header-editorial__nav-underline" />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Decorative accent */}
          <TinyFlower className="header-editorial__accent" />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`header-editorial__menu-btn ${menuOpen ? 'header-editorial__menu-btn--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="header-editorial__menu-line"></span>
          <span className="header-editorial__menu-line"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="header-editorial__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu - Page flip animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="header-editorial__mobile-menu"
            initial={{ x: '100%', rotateY: -15 }}
            animate={{ x: 0, rotateY: 0 }}
            exit={{ x: '100%', rotateY: -15 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200,
            }}
            role="dialog"
            aria-label="Mobile navigation menu"
            aria-modal="true"
          >
            {/* Paper texture pattern */}
            <div className="header-editorial__mobile-paper" />

            <div className="header-editorial__mobile-header">
              <span className="header-editorial__logo-text">Jittika</span>
              <button
                className="header-editorial__close-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <span>&times;</span>
              </button>
            </div>

            <nav className="header-editorial__mobile-nav" aria-label="Mobile navigation">
              {navLinks.map((link, index) => {
                const isActive = link.path === '/'
                  ? location.pathname === link.path
                  : location.pathname.startsWith(link.path)

                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`header-editorial__mobile-link ${
                        isActive ? 'header-editorial__mobile-link--active' : ''
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            <motion.div
              className="header-editorial__mobile-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <TinyFlower className="header-editorial__mobile-flower" />
              <a href="mailto:hello@jittika.com" className="header-editorial__mobile-email">
                hello@jittika.com
              </a>
              <p className="header-editorial__mobile-tagline">
                Designer & Maker from Phuket
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
