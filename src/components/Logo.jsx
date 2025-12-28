import { Link } from 'react-router-dom'
import './Logo.css'

export default function Logo({
  variant = 'default',
  size = 'medium',
  className = '',
  linkTo = '/'
}) {
  const Component = linkTo ? Link : 'div'
  const props = linkTo ? { to: linkTo } : {}

  return (
    <Component
      {...props}
      className={`logo logo--${variant} logo--${size} ${className}`}
      aria-label="islander."
    >
      <span className="logo__text">islander</span>
      <span className="logo__dot">.</span>
    </Component>
  )
}
