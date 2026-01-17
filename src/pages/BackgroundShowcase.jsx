import { useState, useEffect } from 'react'
import SEO from '../components/SEO'
import './BackgroundShowcase.css'

export default function BackgroundShowcase() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <SEO
        title="Ocean Wave | Islander Studio"
        description="Flowing wave background design"
      />

      <div className={`bg-showcase ${isLoaded ? 'bg-showcase--loaded' : ''}`}>
        {/* Flowing wave ribbons background */}
        <svg
          className="wave-ribbons"
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Soft texture filter */}
            <filter id="softTexture" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G"/>
            </filter>

            {/* Gradient for depth */}
            <linearGradient id="ribbonBlue1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9BB8C9"/>
              <stop offset="50%" stopColor="#A8C4D4"/>
              <stop offset="100%" stopColor="#B5CFE0"/>
            </linearGradient>

            <linearGradient id="ribbonBlue2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7A9DB5"/>
              <stop offset="50%" stopColor="#8BAABB"/>
              <stop offset="100%" stopColor="#9BB8C9"/>
            </linearGradient>

            <linearGradient id="ribbonBlue3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B5CFE0"/>
              <stop offset="50%" stopColor="#C5DAEB"/>
              <stop offset="100%" stopColor="#D1E3F0"/>
            </linearGradient>

            <linearGradient id="ribbonCream1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5EEE5"/>
              <stop offset="50%" stopColor="#EDE4D8"/>
              <stop offset="100%" stopColor="#E8DDD0"/>
            </linearGradient>

            <linearGradient id="ribbonCream2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FAF6F0"/>
              <stop offset="50%" stopColor="#F5EEE5"/>
              <stop offset="100%" stopColor="#EDE4D8"/>
            </linearGradient>
          </defs>

          {/* Base cream background */}
          <rect x="0" y="0" width="1200" height="900" fill="#F7F3EC"/>

          {/* Layer 1 - Back flowing ribbons */}
          <g className="ribbon-layer ribbon-layer--1">
            {/* Large cream ribbon flowing from top-left */}
            <path
              d="M-100,0
                 C200,50 300,200 250,350
                 C200,500 350,550 400,700
                 C450,850 300,900 200,950
                 L-100,950 Z"
              fill="url(#ribbonCream1)"
              className="ribbon ribbon--cream"
            />

            {/* Blue ribbon from top */}
            <path
              d="M100,0
                 C350,80 450,150 400,300
                 C350,450 500,500 550,650
                 C600,800 450,900 350,950
                 L100,950 L100,0 Z"
              fill="url(#ribbonBlue3)"
              className="ribbon ribbon--blue-light"
            />
          </g>

          {/* Layer 2 - Mid flowing ribbons */}
          <g className="ribbon-layer ribbon-layer--2">
            {/* Sweeping blue ribbon */}
            <path
              d="M-50,200
                 C150,180 300,250 350,400
                 C400,550 300,650 400,800
                 C500,950 350,1000 200,1000
                 L-50,1000 Z"
              fill="url(#ribbonBlue2)"
              className="ribbon ribbon--blue-mid"
            />

            {/* Cream accent ribbon */}
            <path
              d="M250,0
                 C500,100 550,200 500,350
                 C450,500 600,600 650,750
                 C700,900 550,950 450,950
                 L300,950 C350,800 250,700 300,550
                 C350,400 200,300 250,150 Z"
              fill="url(#ribbonCream2)"
              className="ribbon ribbon--cream-accent"
            />
          </g>

          {/* Layer 3 - Front flowing ribbons */}
          <g className="ribbon-layer ribbon-layer--3">
            {/* Bold blue flowing ribbon from right */}
            <path
              d="M1300,100
                 C1100,150 900,100 800,250
                 C700,400 850,500 800,650
                 C750,800 900,850 1000,900
                 L1300,900 Z"
              fill="url(#ribbonBlue1)"
              className="ribbon ribbon--blue-right"
            />

            {/* Light blue ribbon wrapping */}
            <path
              d="M1300,300
                 C1050,280 950,350 900,500
                 C850,650 1000,700 950,850
                 L1300,850 Z"
              fill="url(#ribbonBlue3)"
              className="ribbon ribbon--blue-wrap"
            />

            {/* Cream ribbon accent from bottom right */}
            <path
              d="M1300,500
                 C1100,480 1000,550 1050,700
                 C1100,850 950,900 1000,950
                 L1300,950 Z"
              fill="url(#ribbonCream1)"
              className="ribbon ribbon--cream-bottom"
            />
          </g>

          {/* Layer 4 - Foreground accent ribbons */}
          <g className="ribbon-layer ribbon-layer--4">
            {/* Thin blue accent ribbon */}
            <path
              d="M0,400
                 C200,380 350,450 400,550
                 C450,650 350,750 450,850
                 C550,950 400,1000 300,1000
                 L0,1000 Z"
              fill="#8BAEC4"
              opacity="0.7"
              className="ribbon ribbon--accent"
            />

            {/* Top right blue ribbon */}
            <path
              d="M800,0
                 C900,50 1000,30 1100,100
                 C1200,170 1100,250 1200,350
                 L1300,350 L1300,0 Z"
              fill="url(#ribbonBlue2)"
              className="ribbon ribbon--top-right"
            />

            {/* Bottom left cream flow */}
            <path
              d="M0,600
                 C150,580 250,650 200,750
                 C150,850 250,900 200,1000
                 L0,1000 Z"
              fill="#EDE4D8"
              opacity="0.8"
              className="ribbon ribbon--bottom-left"
            />
          </g>

          {/* Subtle texture overlay */}
          <rect
            x="0" y="0"
            width="1200" height="900"
            fill="url(#noisePattern)"
            opacity="0.03"
            style={{ mixBlendMode: 'multiply' }}
          />
        </svg>

        {/* Paper texture overlay */}
        <div className="wave-texture" />
      </div>
    </>
  )
}
