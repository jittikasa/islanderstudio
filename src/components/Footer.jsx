import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">Islander Studio</h4>
            <p className="footer-description">
              Crafting beautiful iOS applications that inspire and delight.
              Based in creativity, built with passion.
            </p>
          </div>

          <div className="footer-section">
            <h5 className="footer-heading">Apps</h5>
            <ul className="footer-links">
              <li><Link to="/shellist">Shellist</Link></li>
              <li><Link to="/polamoment">PolaMoment</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h5 className="footer-heading">Company</h5>
            <ul className="footer-links">
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h5 className="footer-heading">Connect</h5>
            <ul className="footer-links">
              <li>
                <a href="mailto:support@islanderstudio.app">
                  support@islanderstudio.app
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Islander Studio. All rights reserved.
          </p>
          <p className="footer-tagline">
            Made with care for app lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  )
}
