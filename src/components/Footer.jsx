import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import './Footer.css'

// Decorative flourish SVG
function FooterFlourish() {
  return (
    <svg className="footer-editorial__flourish" viewBox="0 0 200 24" fill="none">
      <path
        d="M0 12 Q25 2 50 12 T100 12 T150 12 T200 12"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="footer-editorial__flourish-path"
      />
      <circle cx="100" cy="12" r="3" fill="currentColor" className="footer-editorial__flourish-dot" />
      <circle cx="50" cy="12" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="150" cy="12" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

// Small pressed flower decoration
function PressedFlower() {
  return (
    <svg className="footer-editorial__flower" viewBox="0 0 32 40" fill="none">
      <path d="M16 38 Q16 25 16 15" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="16" cy="10" rx="6" ry="8" fill="currentColor" opacity="0.4" />
      <ellipse cx="11" cy="14" rx="4" ry="6" fill="currentColor" opacity="0.3" transform="rotate(-25 11 14)" />
      <ellipse cx="21" cy="14" rx="4" ry="6" fill="currentColor" opacity="0.3" transform="rotate(25 21 14)" />
      <circle cx="16" cy="11" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="footer-editorial"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="footer-editorial__container">
        {/* Top decorative flourish */}
        <motion.div
          className="footer-editorial__divider"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FooterFlourish />
        </motion.div>

        {/* Main content */}
        <div className="footer-editorial__content">
          {/* Brand */}
          <motion.div
            className="footer-editorial__brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/" className="footer-editorial__logo">
              Jittika
            </Link>
            <p className="footer-editorial__tagline">
              Designer & Maker
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            className="footer-editorial__nav"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/shellist" className="footer-editorial__link">Shellist</Link>
            <span className="footer-editorial__separator">&#183;</span>
            <Link to="/polamoment" className="footer-editorial__link">PolaMoment</Link>
            <span className="footer-editorial__separator">&#183;</span>
            <Link to="/blog" className="footer-editorial__link">Journal</Link>
            <span className="footer-editorial__separator">&#183;</span>
            <Link to="/privacy" className="footer-editorial__link">Privacy</Link>
          </motion.nav>

          {/* Email with copy feedback */}
          <motion.a
            href="mailto:hello@jittika.com"
            className="footer-editorial__email"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            hello@jittika.com
          </motion.a>
        </div>

        {/* Bottom section with ephemera */}
        <motion.div
          className="footer-editorial__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Small ephemera decoration */}
          <div className="footer-editorial__ephemera">
            <PressedFlower />
          </div>

          <p className="footer-editorial__made">
            Made with love in Phuket
          </p>

          <p className="footer-editorial__copyright">
            &copy; {currentYear} Jittika Sakulchit
          </p>
        </motion.div>

        {/* Final ornament */}
        <motion.div
          className="footer-editorial__end-ornament"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <span>&#10045;</span>
        </motion.div>
      </div>
    </motion.footer>
  )
}
