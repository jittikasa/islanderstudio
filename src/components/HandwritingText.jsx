import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'motion/react'
import './HandwritingText.css'

/**
 * HandwritingText - Reveals text as if being written by hand
 * Uses SVG stroke animation for the handwriting effect
 */
export default function HandwritingText({
  text,
  className = '',
  delay = 0,
  duration = 2,
  fontSize = '2rem',
  color = 'currentColor',
  strokeWidth = 1,
  once = true
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const [pathLength, setPathLength] = useState(0)
  const textRef = useRef(null)

  // Generate unique ID for this instance
  const id = useRef(`handwriting-${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    // Calculate path length after render
    if (textRef.current) {
      const length = textRef.current.getTotalLength?.() || 1000
      setPathLength(length)
    }
  }, [text])

  return (
    <div ref={ref} className={`handwriting ${className}`}>
      <svg
        className="handwriting__svg"
        style={{ fontSize }}
        viewBox="0 0 100 24"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id={id.current}>
            <motion.rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="white"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                duration,
                delay,
                ease: [0.22, 0.61, 0.36, 1]
              }}
              style={{ originX: 0 }}
            />
          </mask>
        </defs>

        {/* Background text (revealed by mask) */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill={color}
          className="handwriting__text"
          mask={`url(#${id.current})`}
        >
          {text}
        </text>

        {/* Stroke animation overlay */}
        <motion.text
          ref={textRef}
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          className="handwriting__stroke"
          initial={{
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            opacity: 1
          }}
          animate={isInView ? {
            strokeDashoffset: 0,
            opacity: [1, 1, 0]
          } : {
            strokeDashoffset: pathLength,
            opacity: 1
          }}
          transition={{
            strokeDashoffset: {
              duration,
              delay,
              ease: [0.22, 0.61, 0.36, 1]
            },
            opacity: {
              duration: duration * 0.3,
              delay: delay + duration * 0.7,
              ease: 'easeOut'
            }
          }}
        >
          {text}
        </motion.text>
      </svg>

      {/* Cursor/pen indicator */}
      <motion.span
        className="handwriting__cursor"
        initial={{ opacity: 0, x: '-100%' }}
        animate={isInView ? {
          opacity: [0, 1, 1, 0],
          x: ['0%', '100%']
        } : { opacity: 0, x: '-100%' }}
        transition={{
          duration,
          delay,
          ease: [0.22, 0.61, 0.36, 1]
        }}
        style={{ color }}
      />
    </div>
  )
}

/**
 * Simpler version using CSS animation with text reveal
 */
export function TypewriterText({
  text,
  className = '',
  delay = 0,
  duration = 1.5,
  once = true
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  return (
    <span ref={ref} className={`typewriter ${className}`}>
      <motion.span
        className="typewriter__text"
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : { width: 0 }}
        transition={{
          duration,
          delay,
          ease: [0.22, 0.61, 0.36, 1]
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="typewriter__cursor"
        initial={{ opacity: 0 }}
        animate={isInView ? {
          opacity: [0, 1, 1, 1, 0]
        } : { opacity: 0 }}
        transition={{
          duration: duration + 0.5,
          delay,
          times: [0, 0.1, 0.5, 0.9, 1]
        }}
      >
        |
      </motion.span>
    </span>
  )
}
