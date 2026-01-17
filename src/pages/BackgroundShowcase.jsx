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
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Gradients for ribbon depth */}
            <linearGradient id="blueDeep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7592AA"/>
              <stop offset="100%" stopColor="#8BA5B8"/>
            </linearGradient>

            <linearGradient id="blueMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9BB5C6"/>
              <stop offset="100%" stopColor="#A8C2D2"/>
            </linearGradient>

            <linearGradient id="blueLight" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B8CCD9"/>
              <stop offset="100%" stopColor="#C8D9E5"/>
            </linearGradient>

            <linearGradient id="bluePale" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D0DFE9"/>
              <stop offset="100%" stopColor="#DCE8F0"/>
            </linearGradient>

            <linearGradient id="cream" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EDE5DA"/>
              <stop offset="100%" stopColor="#E5DCD0"/>
            </linearGradient>

            <linearGradient id="creamLight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5EEE5"/>
              <stop offset="100%" stopColor="#EDE5DA"/>
            </linearGradient>
          </defs>

          {/* Base background */}
          <rect x="0" y="0" width="1440" height="900" fill="#F0EBE3"/>

          {/* ============================================
              LAYER 1 - Deepest / Back ribbons
              ============================================ */}
          <g className="ribbon-layer ribbon-layer--1">
            {/* Large sweeping cream ribbon - flows from top-left corner diagonally */}
            <path
              d="M-200,-50
                 C100,50 200,150 180,300
                 C160,450 280,550 320,700
                 C360,850 280,950 180,1000
                 L-50,1000
                 C50,900 100,800 80,650
                 C60,500 -50,400 -80,250
                 C-110,100 -100,0 -200,-50
                 Z"
              fill="url(#cream)"
              className="ribbon"
            />

            {/* Deep blue ribbon sweeping from upper left */}
            <path
              d="M50,-100
                 C250,0 380,100 400,280
                 C420,460 320,580 380,750
                 C440,920 320,1000 200,1050
                 L80,1050
                 C180,950 280,850 240,700
                 C200,550 280,420 260,280
                 C240,140 150,50 50,-100
                 Z"
              fill="url(#blueLight)"
              className="ribbon"
            />
          </g>

          {/* ============================================
              LAYER 2 - Mid-back ribbons
              ============================================ */}
          <g className="ribbon-layer ribbon-layer--2">
            {/* Wide sweeping blue ribbon - S-curve from left edge */}
            <path
              d="M-100,150
                 C150,120 300,200 350,380
                 C400,560 280,680 350,850
                 C420,1020 280,1100 150,1100
                 L-100,1100
                 C0,1000 100,900 60,750
                 C20,600 120,480 80,350
                 C40,220 -50,180 -100,150
                 Z"
              fill="url(#blueMid)"
              className="ribbon"
            />

            {/* Cream accent ribbon flowing through middle */}
            <path
              d="M200,-50
                 C450,50 550,180 520,380
                 C490,580 620,700 680,880
                 C740,1060 600,1100 480,1100
                 L350,1100
                 C450,1000 560,880 520,720
                 C480,560 380,460 400,300
                 C420,140 320,50 200,-50
                 Z"
              fill="url(#creamLight)"
              className="ribbon"
            />
          </g>

          {/* ============================================
              LAYER 3 - Middle ribbons (most prominent)
              ============================================ */}
          <g className="ribbon-layer ribbon-layer--3">
            {/* Bold blue ribbon - main focal sweep from left */}
            <path
              d="M-80,380
                 C180,340 380,420 450,580
                 C520,740 400,860 500,1000
                 L280,1000
                 C200,880 300,780 250,640
                 C200,500 50,440 -80,380
                 Z"
              fill="url(#blueDeep)"
              className="ribbon ribbon--prominent"
            />

            {/* Light blue ribbon from right side - graceful S-curve */}
            <path
              d="M1540,80
                 C1300,120 1150,60 1020,180
                 C890,300 980,450 920,620
                 C860,790 1000,880 980,1000
                 L1150,1000
                 C1120,880 1020,780 1080,620
                 C1140,460 1060,320 1180,200
                 C1300,80 1420,120 1540,80
                 Z"
              fill="url(#blueLight)"
              className="ribbon"
            />

            {/* Mid blue ribbon from top right */}
            <path
              d="M1200,-50
                 C1050,50 950,20 850,140
                 C750,260 850,400 780,560
                 C710,720 850,820 800,950
                 L950,950
                 C980,840 880,740 940,600
                 C1000,460 920,320 1020,200
                 C1120,80 1280,100 1380,-50
                 L1200,-50
                 Z"
              fill="url(#blueMid)"
              className="ribbon"
            />
          </g>

          {/* ============================================
              LAYER 4 - Front ribbons
              ============================================ */}
          <g className="ribbon-layer ribbon-layer--4">
            {/* Pale blue ribbon wrapping from right */}
            <path
              d="M1540,280
                 C1320,260 1180,340 1120,480
                 C1060,620 1160,720 1100,860
                 C1040,1000 1180,1050 1300,1000
                 L1540,1000
                 L1540,850
                 C1400,880 1280,820 1320,700
                 C1360,580 1280,480 1340,380
                 C1400,280 1500,300 1540,280
                 Z"
              fill="url(#bluePale)"
              className="ribbon"
            />

            {/* Small cream accent - bottom left */}
            <path
              d="M-50,650
                 C100,620 200,700 180,820
                 C160,940 80,1000 -50,1000
                 L-50,650
                 Z"
              fill="url(#cream)"
              opacity="0.8"
              className="ribbon"
            />

            {/* Deep blue accent - top right corner */}
            <path
              d="M1100,-50
                 C1180,20 1280,0 1380,80
                 C1480,160 1420,280 1500,380
                 L1540,380
                 L1540,-50
                 L1100,-50
                 Z"
              fill="url(#blueDeep)"
              opacity="0.6"
              className="ribbon"
            />
          </g>

          {/* ============================================
              LAYER 5 - Foreground accent ribbons
              ============================================ */}
          <g className="ribbon-layer ribbon-layer--5">
            {/* Thin flowing accent ribbon - adds movement */}
            <path
              d="M-50,500
                 C150,480 280,540 320,650
                 C360,760 260,850 320,950
                 L200,950
                 C160,870 220,790 200,700
                 C180,610 80,560 -50,500
                 Z"
              fill="#8FAFC2"
              opacity="0.5"
              className="ribbon"
            />

            {/* Light accent on right */}
            <path
              d="M1540,500
                 C1380,520 1300,460 1250,560
                 C1200,660 1280,740 1240,840
                 C1200,940 1300,1000 1400,980
                 L1540,950
                 L1540,500
                 Z"
              fill="#C5D6E2"
              opacity="0.6"
              className="ribbon"
            />
          </g>
        </svg>

        {/* Paper texture overlay */}
        <div className="wave-texture" />
      </div>
    </>
  )
}
