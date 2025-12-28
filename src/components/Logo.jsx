import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Logo.css'

export default function Logo({
  variant = 'default',
  size = 'medium',
  className = '',
  linkTo = '/',
  animate = false,
  animateOnScroll = false
}) {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const Component = linkTo ? Link : 'div'
  const props = linkTo ? { to: linkTo } : {}

  useEffect(() => {
    if (animate) {
      // Trigger animation on mount
      setShouldAnimate(true)
    }
  }, [animate])

  useEffect(() => {
    if (animateOnScroll) {
      const handleScroll = () => {
        // Reveal animation when scrolling back to top
        if (window.scrollY < 100) {
          setShouldAnimate(true)
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [animateOnScroll])

  const animationClass = shouldAnimate && animate ? 'logo--animate-in' : ''
  const scrollClass = animateOnScroll ? 'logo--reveal' : ''

  return (
    <Component
      {...props}
      className={`logo logo--${variant} logo--${size} ${animationClass} ${scrollClass} ${className}`}
      aria-label="islander."
    >
      <span className="logo__text">islander</span>
      <span className="logo__dot">.</span>
    </Component>
  )
}
