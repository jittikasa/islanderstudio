import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import './NotFound.css'

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <SEO
        title="404 - Page Not Found | Islander Studio"
        description="The page you're looking for doesn't exist or has been moved. Return to Islander Studio homepage or explore our apps."
        url="https://islanderstudio.app/404"
      />
      <div className={`notfound ${isLoaded ? 'notfound--loaded' : ''}`}>
      <div className="notfound__content">
        <div className="notfound__code">
          <span
            className="notfound__digit"
            style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
          >
            4
          </span>
          <span
            className="notfound__digit notfound__digit--accent"
            style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
          >
            0
          </span>
          <span
            className="notfound__digit"
            style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
          >
            4
          </span>
        </div>

        <h1 className="notfound__title">Page not found</h1>
        <p className="notfound__text">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="notfound__actions">
          <Link to="/" className="notfound__btn notfound__btn--primary">
            Go home <span>→</span>
          </Link>
          <Link to="/support" className="notfound__btn notfound__btn--secondary">
            Get help
          </Link>
        </div>

        <div className="notfound__links">
          <span className="notfound__links-label">Quick links</span>
          <div className="notfound__links-grid">
            <Link to="/shellist" className="notfound__link">Shellist</Link>
            <Link to="/polamoment" className="notfound__link">PolaMoment</Link>
            <Link to="/support" className="notfound__link">Support</Link>
            <Link to="/privacy" className="notfound__link">Privacy</Link>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
