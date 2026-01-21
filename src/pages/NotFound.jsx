import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import SEO from '../components/SEO'
import './NotFound.css'

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [gravityActive, setGravityActive] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e) => {
      if (gravityActive) return // Disable mouse tracking during gravity
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [gravityActive])

  // Trigger gravity effect
  const triggerGravity = () => {
    if (!gravityActive) {
      setGravityActive(true)
      // Reset after animation completes
      setTimeout(() => setGravityActive(false), 3000)
    }
  }

  // Random fall parameters for each element
  const getFallVariants = (index) => ({
    initial: { y: 0, rotate: 0, opacity: 1 },
    fall: {
      y: [0, -20, window.innerHeight + 200],
      rotate: [0, -5 + Math.random() * 10, -30 + Math.random() * 60],
      opacity: [1, 1, 0],
      transition: {
        duration: 1.5 + Math.random() * 0.5,
        delay: index * 0.1,
        ease: [0.55, 0.055, 0.675, 0.19], // Gravity-like easing
        y: {
          duration: 1.5 + Math.random() * 0.5,
          delay: index * 0.1,
          ease: [0.55, 0.055, 0.675, 0.19]
        }
      }
    }
  })

  return (
    <>
      <SEO
        title="404 - Page Not Found | islander Studio"
        description="The page you're looking for doesn't exist or has been moved. Return to islander Studio homepage or explore our apps."
        url="https://islanderstudio.app/404"
      />
      <div className={`notfound ${isLoaded ? 'notfound--loaded' : ''} ${gravityActive ? 'notfound--gravity' : ''}`}>
      <div className="notfound__content">
        {/* Clickable 404 triggers gravity */}
        <div className="notfound__code" onClick={triggerGravity} title="Click me!">
          <motion.span
            className="notfound__digit"
            style={!gravityActive ? { transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` } : {}}
            variants={getFallVariants(0)}
            initial="initial"
            animate={gravityActive ? 'fall' : 'initial'}
          >
            4
          </motion.span>
          <motion.span
            className="notfound__digit notfound__digit--accent"
            style={!gravityActive ? { transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` } : {}}
            variants={getFallVariants(1)}
            initial="initial"
            animate={gravityActive ? 'fall' : 'initial'}
          >
            0
          </motion.span>
          <motion.span
            className="notfound__digit"
            style={!gravityActive ? { transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` } : {}}
            variants={getFallVariants(2)}
            initial="initial"
            animate={gravityActive ? 'fall' : 'initial'}
          >
            4
          </motion.span>
        </div>

        <motion.h1
          className="notfound__title"
          variants={getFallVariants(3)}
          initial="initial"
          animate={gravityActive ? 'fall' : 'initial'}
        >
          Page not found
        </motion.h1>
        <motion.p
          className="notfound__text"
          variants={getFallVariants(4)}
          initial="initial"
          animate={gravityActive ? 'fall' : 'initial'}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          className="notfound__actions"
          variants={getFallVariants(5)}
          initial="initial"
          animate={gravityActive ? 'fall' : 'initial'}
        >
          <Link to="/" className="notfound__btn notfound__btn--primary">
            Go home <span>→</span>
          </Link>
          <Link to="/support" className="notfound__btn notfound__btn--secondary">
            Get help
          </Link>
        </motion.div>

        <motion.div
          className="notfound__links"
          variants={getFallVariants(6)}
          initial="initial"
          animate={gravityActive ? 'fall' : 'initial'}
        >
          <span className="notfound__links-label">Quick links</span>
          <div className="notfound__links-grid">
            <Link to="/shellist" className="notfound__link">Shellist</Link>
            <Link to="/polamoment" className="notfound__link">PolaMoment</Link>
            <Link to="/support" className="notfound__link">Support</Link>
            <Link to="/privacy" className="notfound__link">Privacy</Link>
          </div>
        </motion.div>

        {/* Hint to click */}
        <motion.p
          className="notfound__hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: gravityActive ? 0 : 0.5 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          psst... click the numbers
        </motion.p>
      </div>
      </div>
    </>
  )
}
