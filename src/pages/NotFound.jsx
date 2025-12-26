import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './NotFound.css'

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="not-found">
      <div className="not-found-background">
        <div
          className="floating-island island-1"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        >
          🏝️
        </div>
        <div
          className="floating-island island-2"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
          }}
        >
          🌴
        </div>
        <div
          className="floating-island island-3"
          style={{
            transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
          }}
        >
          🥥
        </div>
      </div>

      <div className="not-found-content">
        <div className="error-code">
          <span className="digit">4</span>
          <span className="digit digit-special">0</span>
          <span className="digit">4</span>
        </div>

        <h1 className="error-title">Lost at Sea</h1>

        <p className="error-description">
          Looks like you've drifted off course. This page doesn't exist in our
          archipelago, but we can help you find your way back to shore.
        </p>

        <div className="error-actions">
          <Link to="/" className="btn btn-primary btn-elevated">
            <span>Return Home</span>
            <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/support" className="btn btn-outline btn-elevated">
            <span>Get Help</span>
          </Link>
        </div>

        <div className="quick-links">
          <p className="quick-links-label">Popular destinations:</p>
          <div className="quick-links-grid">
            <Link to="/shellist" className="quick-link">
              <span className="quick-link-icon">🐚</span>
              <span>Shellist</span>
            </Link>
            <Link to="/polamoment" className="quick-link">
              <span className="quick-link-icon">📸</span>
              <span>PolaMoment</span>
            </Link>
            <Link to="/privacy" className="quick-link">
              <span className="quick-link-icon">🔒</span>
              <span>Privacy</span>
            </Link>
            <Link to="/support" className="quick-link">
              <span className="quick-link-icon">💬</span>
              <span>Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
