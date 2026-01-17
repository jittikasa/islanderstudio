import { useState, useEffect } from 'react'
import SEO from '../components/SEO'
import './BackgroundShowcase.css'

export default function BackgroundShowcase() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Generate random bubbles for the foam texture
  const generateBubbles = (count, section) => {
    const bubbles = []
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 12 + 4
      const x = section === 'edge'
        ? Math.random() * 15 + 25 // Near the wave edge
        : Math.random() * 30 + 5  // In the foam body
      const y = Math.random() * 100
      const delay = Math.random() * 4
      const duration = Math.random() * 2 + 2
      bubbles.push(
        <circle
          key={`${section}-${i}`}
          cx={`${x}%`}
          cy={`${y}%`}
          r={size}
          className="bubble"
          style={{
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            opacity: Math.random() * 0.4 + 0.3
          }}
        />
      )
    }
    return bubbles
  }

  // Generate foam droplets on sand
  const generateDroplets = (count) => {
    const droplets = []
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 6 + 2
      const x = Math.random() * 35 + 55 // On the sand side
      const y = Math.random() * 100
      droplets.push(
        <circle
          key={`droplet-${i}`}
          cx={`${x}%`}
          cy={`${y}%`}
          r={size}
          className="droplet"
          style={{
            opacity: Math.random() * 0.5 + 0.2
          }}
        />
      )
    }
    return droplets
  }

  return (
    <>
      <SEO
        title="Background Design | Islander Studio"
        description="Beach wave background design showcase"
      />

      <div className={`bg-showcase ${isLoaded ? 'bg-showcase--loaded' : ''}`}>
        {/* Wave Background */}
        <div className="wave-background">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="wave-svg"
          >
            <defs>
              {/* Sand gradient */}
              <linearGradient id="sandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E8DFD4" />
                <stop offset="50%" stopColor="#F5EEE5" />
                <stop offset="100%" stopColor="#FAF6F0" />
              </linearGradient>

              {/* Foam gradient */}
              <linearGradient id="foamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="70%" stopColor="#FDFCFA" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#F7F4EF" stopOpacity="0.9" />
              </linearGradient>

              {/* Foam edge highlight */}
              <linearGradient id="foamEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FEFEFE" />
              </linearGradient>

              {/* Noise filter for texture */}
              <filter id="foamNoise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.9"
                  numOctaves="4"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="2"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>

              {/* Subtle shadow for depth */}
              <filter id="foamShadow">
                <feDropShadow dx="1" dy="0" stdDeviation="0.5" floodOpacity="0.08" floodColor="#A78A6A"/>
              </filter>
            </defs>

            {/* Sand background */}
            <rect x="0" y="0" width="100" height="100" fill="url(#sandGradient)" />

            {/* Foam droplets on sand */}
            <g className="droplets-group">
              {generateDroplets(25)}
            </g>

            {/* Main wave foam - organic wavy edge */}
            <path
              d="M0,0
                 L35,0
                 C38,5 42,8 40,15
                 C37,22 42,28 39,35
                 C35,42 40,48 38,55
                 C35,62 39,68 37,75
                 C34,82 38,88 36,95
                 L35,100
                 L0,100
                 Z"
              fill="url(#foamGradient)"
              filter="url(#foamShadow)"
              className="foam-body"
            />

            {/* Secondary foam layer for depth */}
            <path
              d="M0,0
                 L32,0
                 C35,7 38,12 36,20
                 C33,28 37,35 35,42
                 C32,50 36,57 34,65
                 C31,73 35,80 33,88
                 L32,100
                 L0,100
                 Z"
              fill="#FFFFFF"
              opacity="0.7"
              className="foam-inner"
            />

            {/* Foam edge highlight */}
            <path
              d="M35,0
                 C38,5 42,8 40,15
                 C37,22 42,28 39,35
                 C35,42 40,48 38,55
                 C35,62 39,68 37,75
                 C34,82 38,88 36,95
                 L35,100"
              fill="none"
              stroke="url(#foamEdge)"
              strokeWidth="1.5"
              className="foam-edge"
            />

            {/* Bubble texture in foam */}
            <g className="bubbles-group">
              {generateBubbles(40, 'body')}
              {generateBubbles(20, 'edge')}
            </g>

            {/* Lacy foam patterns */}
            <g className="lace-patterns">
              <ellipse cx="15%" cy="20%" rx="8" ry="4" fill="#FFFFFF" opacity="0.5" />
              <ellipse cx="10%" cy="35%" rx="6" ry="3" fill="#FFFFFF" opacity="0.4" />
              <ellipse cx="20%" cy="50%" rx="10" ry="5" fill="#FFFFFF" opacity="0.45" />
              <ellipse cx="8%" cy="65%" rx="7" ry="3.5" fill="#FFFFFF" opacity="0.5" />
              <ellipse cx="18%" cy="80%" rx="9" ry="4" fill="#FFFFFF" opacity="0.4" />
              <ellipse cx="12%" cy="90%" rx="6" ry="3" fill="#FFFFFF" opacity="0.5" />
            </g>
          </svg>

          {/* Animated foam overlay */}
          <div className="foam-overlay">
            <div className="foam-particle foam-particle--1"></div>
            <div className="foam-particle foam-particle--2"></div>
            <div className="foam-particle foam-particle--3"></div>
            <div className="foam-particle foam-particle--4"></div>
            <div className="foam-particle foam-particle--5"></div>
          </div>
        </div>

        {/* Content overlay to show the design */}
        <div className="bg-showcase__content">
          <div className="bg-showcase__card">
            <span className="bg-showcase__label">Background Design</span>
            <h1 className="bg-showcase__title">Ocean Wave</h1>
            <p className="bg-showcase__description">
              A CSS/SVG recreation of beach foam meeting sand,
              crafted in Islander Studio's warm, natural palette.
            </p>
            <div className="bg-showcase__colors">
              <div className="color-swatch color-swatch--foam">
                <span>Foam</span>
                <code>#FFFFFF</code>
              </div>
              <div className="color-swatch color-swatch--sand">
                <span>Sand</span>
                <code>#F5EEE5</code>
              </div>
              <div className="color-swatch color-swatch--accent">
                <span>Accent</span>
                <code>#A78A6A</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
