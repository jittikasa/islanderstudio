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
        {/* Parallel flowing wave stripes */}
        <svg
          className="wave-stripes"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Blue stripe gradients - varying intensity */}
            <linearGradient id="blue1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8AADC4"/>
              <stop offset="50%" stopColor="#7FA5BC"/>
              <stop offset="100%" stopColor="#8AADC4"/>
            </linearGradient>

            <linearGradient id="blue2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9BBACE"/>
              <stop offset="50%" stopColor="#8FB0C6"/>
              <stop offset="100%" stopColor="#9BBACE"/>
            </linearGradient>

            <linearGradient id="blue3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A8C5D6"/>
              <stop offset="50%" stopColor="#9CBBCE"/>
              <stop offset="100%" stopColor="#A8C5D6"/>
            </linearGradient>

            <linearGradient id="blue4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7A9FB8"/>
              <stop offset="50%" stopColor="#6E95AE"/>
              <stop offset="100%" stopColor="#7A9FB8"/>
            </linearGradient>

            {/* Cream stripe gradients */}
            <linearGradient id="cream1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5F0E8"/>
              <stop offset="50%" stopColor="#EDE6DC"/>
              <stop offset="100%" stopColor="#F5F0E8"/>
            </linearGradient>

            <linearGradient id="cream2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EBE4D8"/>
              <stop offset="50%" stopColor="#E3DACF"/>
              <stop offset="100%" stopColor="#EBE4D8"/>
            </linearGradient>

            <linearGradient id="cream3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8F4EE"/>
              <stop offset="50%" stopColor="#F0EAE0"/>
              <stop offset="100%" stopColor="#F8F4EE"/>
            </linearGradient>

            {/* Soft edge filter for watercolor effect */}
            <filter id="softEdge" x="-5%" y="-5%" width="110%" height="110%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
            </filter>
          </defs>

          {/* Base background */}
          <rect x="0" y="0" width="1440" height="900" fill="#F8F5F0"/>

          {/* Flowing parallel stripes - all curve in same direction */}
          <g className="stripe-group">

            {/* Stripe 1 - Blue (leftmost) */}
            <path
              className="stripe stripe--1"
              d="M-200,-100
                 Q100,100 150,350
                 Q200,600 100,900
                 L-50,900
                 Q50,600 0,350
                 Q-50,100 -200,-100
                 Z"
              fill="url(#blue2)"
            />

            {/* Stripe 2 - Cream */}
            <path
              className="stripe stripe--2"
              d="M-50,-100
                 Q250,100 300,350
                 Q350,600 250,900
                 L100,900
                 Q200,600 150,350
                 Q100,100 -50,-100
                 Z"
              fill="url(#cream1)"
            />

            {/* Stripe 3 - Blue */}
            <path
              className="stripe stripe--3"
              d="M100,-100
                 Q400,100 450,350
                 Q500,600 400,900
                 L250,900
                 Q350,600 300,350
                 Q250,100 100,-100
                 Z"
              fill="url(#blue1)"
            />

            {/* Stripe 4 - Cream */}
            <path
              className="stripe stripe--4"
              d="M250,-100
                 Q550,100 620,350
                 Q690,600 580,900
                 L400,900
                 Q510,600 450,350
                 Q390,100 250,-100
                 Z"
              fill="url(#cream2)"
            />

            {/* Stripe 5 - Blue (prominent middle) */}
            <path
              className="stripe stripe--5"
              d="M400,-100
                 Q720,100 800,350
                 Q880,600 760,900
                 L580,900
                 Q700,600 630,350
                 Q560,100 400,-100
                 Z"
              fill="url(#blue4)"
            />

            {/* Stripe 6 - Cream */}
            <path
              className="stripe stripe--6"
              d="M580,-100
                 Q900,100 1000,350
                 Q1100,600 960,900
                 L760,900
                 Q900,600 820,350
                 Q740,100 580,-100
                 Z"
              fill="url(#cream1)"
            />

            {/* Stripe 7 - Blue */}
            <path
              className="stripe stripe--7"
              d="M760,-100
                 Q1080,100 1180,350
                 Q1280,600 1140,900
                 L960,900
                 Q1100,600 1010,350
                 Q920,100 760,-100
                 Z"
              fill="url(#blue3)"
            />

            {/* Stripe 8 - Cream */}
            <path
              className="stripe stripe--8"
              d="M960,-100
                 Q1280,100 1380,350
                 Q1480,600 1340,900
                 L1140,900
                 Q1280,600 1200,350
                 Q1120,100 960,-100
                 Z"
              fill="url(#cream3)"
            />

            {/* Stripe 9 - Blue */}
            <path
              className="stripe stripe--9"
              d="M1140,-100
                 Q1460,100 1540,350
                 Q1620,600 1500,900
                 L1340,900
                 Q1460,600 1380,350
                 Q1300,100 1140,-100
                 Z"
              fill="url(#blue2)"
            />

            {/* Stripe 10 - Cream (rightmost) */}
            <path
              className="stripe stripe--10"
              d="M1340,-100
                 Q1640,100 1700,350
                 Q1760,600 1660,900
                 L1500,900
                 Q1600,600 1540,350
                 Q1480,100 1340,-100
                 Z"
              fill="url(#cream2)"
            />

            {/* Stripe 11 - Blue edge */}
            <path
              className="stripe stripe--11"
              d="M1500,-100
                 L1700,-100
                 L1700,900
                 L1660,900
                 Q1760,600 1700,350
                 Q1640,100 1500,-100
                 Z"
              fill="url(#blue1)"
            />

          </g>
        </svg>

        {/* Paper texture overlay */}
        <div className="wave-texture" />
      </div>
    </>
  )
}
