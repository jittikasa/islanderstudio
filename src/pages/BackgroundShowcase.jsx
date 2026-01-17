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
        description="Beach wave background design in scrapbook style"
      />

      <div className={`bg-showcase ${isLoaded ? 'bg-showcase--loaded' : ''}`}>
        {/* Main canvas - the scrapbook page */}
        <div className="wave-canvas">

          {/* Paper texture base layer */}
          <div className="wave-canvas__paper" />

          {/* Sand area - right side with torn paper edge */}
          <div className="wave-sand">
            <div className="wave-sand__texture" />
            {/* Sand grain dots */}
            <div className="wave-sand__grains">
              {[...Array(40)].map((_, i) => (
                <span
                  key={i}
                  className="grain"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    opacity: Math.random() * 0.4 + 0.1,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Foam/Wave area - left side */}
          <div className="wave-foam">
            {/* Layered torn paper edges for organic wave line */}
            <svg className="wave-foam__edge" viewBox="0 0 100 800" preserveAspectRatio="none">
              <defs>
                <filter id="paper-rough">
                  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise"/>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
                <filter id="paper-shadow">
                  <feDropShadow dx="2" dy="0" stdDeviation="2" floodOpacity="0.08" floodColor="#A78A6A"/>
                </filter>
              </defs>

              {/* Main torn edge */}
              <path
                d="M0,0 L55,0
                   C58,20 65,35 60,60
                   C54,90 68,120 62,150
                   C55,185 70,210 63,245
                   C56,280 72,310 65,345
                   C58,380 73,415 66,450
                   C59,485 74,520 67,555
                   C60,590 75,625 68,660
                   C61,695 76,730 69,765
                   L65,800 L0,800 Z"
                fill="#FEFDFB"
                filter="url(#paper-shadow)"
                className="foam-paper"
              />

              {/* Secondary torn layer - slightly offset */}
              <path
                d="M0,0 L50,0
                   C54,25 60,45 55,75
                   C49,110 62,140 56,175
                   C50,210 63,245 57,280
                   C51,315 64,350 58,385
                   C52,420 65,455 59,490
                   C53,525 66,560 60,595
                   C54,630 67,665 61,700
                   C55,735 68,770 62,800
                   L0,800 Z"
                fill="#FFFFFF"
                className="foam-paper-inner"
              />
            </svg>

            {/* Lace doily overlay for foam texture */}
            <div className="wave-foam__lace">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="lace-piece"
                  style={{
                    top: `${i * 8 + Math.random() * 4}%`,
                    left: `${Math.random() * 25 + 5}%`,
                    width: `${Math.random() * 60 + 40}px`,
                    height: `${Math.random() * 30 + 20}px`,
                    transform: `rotate(${Math.random() * 20 - 10}deg)`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>

            {/* Foam bubbles as paper punch holes */}
            <div className="wave-foam__bubbles">
              {[...Array(35)].map((_, i) => (
                <span
                  key={i}
                  className="bubble-hole"
                  style={{
                    left: `${Math.random() * 35 + 5}%`,
                    top: `${Math.random() * 95}%`,
                    width: `${Math.random() * 12 + 6}px`,
                    height: `${Math.random() * 12 + 6}px`,
                    animationDelay: `${Math.random() * 4}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Washi tape decorations */}
          <div className="wave-washi wave-washi--top">
            <span className="washi-pattern" />
          </div>
          <div className="wave-washi wave-washi--bottom">
            <span className="washi-pattern" />
          </div>

          {/* Corner stamp decoration */}
          <div className="wave-stamp">
            <div className="wave-stamp__inner">
              <div className="wave-stamp__content">
                <span className="wave-stamp__icon">🌊</span>
                <span className="wave-stamp__text">OCEAN</span>
                <span className="wave-stamp__subtext">COLLECTION</span>
              </div>
              <div className="wave-stamp__footer">
                <span>2024</span>
                <span>№ 001</span>
              </div>
            </div>
          </div>

          {/* Handwritten annotation */}
          <div className="wave-annotation wave-annotation--top">
            <span className="annotation-text">where foam meets sand</span>
            <span className="annotation-arrow">↙</span>
          </div>

          {/* Photo corner mounts */}
          <div className="photo-corner photo-corner--tl" />
          <div className="photo-corner photo-corner--tr" />
          <div className="photo-corner photo-corner--bl" />
          <div className="photo-corner photo-corner--br" />

          {/* Scattered foam droplets on sand */}
          <div className="wave-droplets">
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="droplet"
                style={{
                  right: `${Math.random() * 35 + 5}%`,
                  top: `${Math.random() * 90 + 5}%`,
                  width: `${Math.random() * 8 + 3}px`,
                  height: `${Math.random() * 8 + 3}px`,
                  opacity: Math.random() * 0.6 + 0.2
                }}
              />
            ))}
          </div>

          {/* Perforated border frame */}
          <div className="wave-frame">
            <div className="wave-frame__edge wave-frame__edge--top" />
            <div className="wave-frame__edge wave-frame__edge--bottom" />
            <div className="wave-frame__edge wave-frame__edge--left" />
            <div className="wave-frame__edge wave-frame__edge--right" />
          </div>
        </div>

        {/* Info card overlay */}
        <div className="bg-showcase__info">
          <div className="bg-showcase__card">
            <div className="bg-showcase__card-header">
              <span className="bg-showcase__label">Background</span>
              <span className="bg-showcase__number">№ 001</span>
            </div>
            <h1 className="bg-showcase__title">Shoreline</h1>
            <p className="bg-showcase__subtitle">Where the ocean whispers to the sand</p>
            <div className="bg-showcase__divider" />
            <div className="bg-showcase__palette">
              <div className="palette-swatch palette-swatch--foam">
                <div className="swatch-color" />
                <span className="swatch-name">Foam</span>
              </div>
              <div className="palette-swatch palette-swatch--sand">
                <div className="swatch-color" />
                <span className="swatch-name">Sand</span>
              </div>
              <div className="palette-swatch palette-swatch--shell">
                <div className="swatch-color" />
                <span className="swatch-name">Shell</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
