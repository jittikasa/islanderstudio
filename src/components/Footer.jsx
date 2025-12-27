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
      // Fallback for older browsers
      window.location.href = 'mailto:support@islanderstudio.app'
    }
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-text">islander</span>
              <span className="footer__logo-dot">.</span>
            </Link>
            <p className="footer__tagline">
              Crafting apps with soul.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4 className="footer__heading">Apps</h4>
              <ul className="footer__list">
                <li>
                  <Link to="/shellist" className="footer__link">
                    Shellist
                    <span className="footer__link-badge">Live</span>
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
                    <span className="footer__link-copy-text">
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
            {currentYear} islander studio
          </p>
          <p className="footer__made">
            Made in <span className="footer__location">Thailand</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
