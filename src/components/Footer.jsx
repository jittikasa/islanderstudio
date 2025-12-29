import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('support@islanderstudio.app')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      window.location.href = 'mailto:support@islanderstudio.app'
    }
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-text">
                <span className="footer__logo-i">
                  <span className="footer__logo-letter">i</span>
                  <img
                    src="/branding/Logomark-dark.png"
                    alt=""
                    className="footer__logo-mark"
                  />
                </span>
                <span className="footer__logo-slander">slander</span>
                <span className="footer__logo-dot"></span>
              </span>
            </Link>
            <p className="footer__tagline">
              Crafted with soul for everyday moments.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4 className="footer__heading">Apps</h4>
              <ul className="footer__list">
                <li>
                  <Link to="/shellist" className="footer__link">
                    Shellist
                    <span className="footer__link-badge footer__link-badge--live">Live</span>
                  </Link>
                </li>
                <li>
                  <Link to="/polamoment" className="footer__link">
                    PolaMoment
                    <span className="footer__link-badge footer__link-badge--soon">Soon</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__heading">Resources</h4>
              <ul className="footer__list">
                <li>
                  <Link to="/blog" className="footer__link">Blog</Link>
                </li>
                <li>
                  <Link to="/support" className="footer__link">Support</Link>
                </li>
                <li>
                  <Link to="/privacy" className="footer__link">Privacy</Link>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__heading">Connect</h4>
              <ul className="footer__list">
                <li>
                  <button
                    className="footer__link footer__link--copy"
                    onClick={handleCopyEmail}
                  >
                    <span className="footer__link-email">support@islanderstudio.app</span>
                    <span className={`footer__link-copy-text ${copied ? 'footer__link-copy-text--copied' : ''}`}>
                      {copied ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            {currentYear} Islander Studio
          </p>
          <div className="footer__bottom-right">
            <Link to="/admin" className="footer__admin-link">
              Admin
            </Link>
            <p className="footer__made">
              Made with care in Phuket, Thailand
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
