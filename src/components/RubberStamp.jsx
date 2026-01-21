import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import './RubberStamp.css'

/**
 * RubberStamp - Headlines that slam down like a rubber stamp
 * Creates a satisfying impact with bounce and ink spread effect
 */
export default function RubberStamp({
  children,
  as: Component = 'h2',
  className = '',
  delay = 0,
  color = 'var(--midnight-sky)',
  inkColor = 'var(--misty-morning)',
  once = true,
  showInkSplatter = true
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-100px' })

  // Motion component for the element
  const MotionComponent = motion[Component] || motion.div

  return (
    <div ref={ref} className={`rubber-stamp ${className}`}>
      {/* Ink splatter effect - appears on impact */}
      {showInkSplatter && (
        <motion.div
          className="rubber-stamp__ink"
          style={{ '--ink-color': inkColor }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? {
            scale: [0, 1.5, 1.2],
            opacity: [0, 0.4, 0]
          } : { scale: 0, opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + 0.1,
            ease: [0.16, 1, 0.3, 1]
          }}
        />
      )}

      {/* Main stamp text */}
      <MotionComponent
        className="rubber-stamp__text"
        style={{ color }}
        initial={{
          y: -80,
          scale: 1.1,
          opacity: 0,
          rotateX: -15
        }}
        animate={isInView ? {
          y: [null, 4, -2, 0],
          scale: [1.1, 0.98, 1.01, 1],
          opacity: 1,
          rotateX: 0
        } : {
          y: -80,
          scale: 1.1,
          opacity: 0,
          rotateX: -15
        }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.34, 1.56, 0.64, 1], // Bouncy ease
          y: {
            duration: 0.6,
            delay,
            times: [0, 0.6, 0.8, 1],
            ease: [0.34, 1.56, 0.64, 1]
          },
          scale: {
            duration: 0.6,
            delay,
            times: [0, 0.6, 0.8, 1]
          }
        }}
      >
        {children}
      </MotionComponent>

      {/* Ink texture overlay - subtle grain on the text */}
      <motion.div
        className="rubber-stamp__texture"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2, delay: delay + 0.2 }}
      />

      {/* Impact ring */}
      <motion.div
        className="rubber-stamp__ring"
        style={{ '--ring-color': inkColor }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? {
          scale: [0.8, 1.3],
          opacity: [0.5, 0]
        } : { scale: 0.8, opacity: 0 }}
        transition={{
          duration: 0.4,
          delay: delay + 0.15,
          ease: 'easeOut'
        }}
      />
    </div>
  )
}

/**
 * Simpler inline stamp effect for smaller text
 */
export function StampText({
  children,
  className = '',
  delay = 0,
  once = true
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  return (
    <motion.span
      ref={ref}
      className={`stamp-text ${className}`}
      initial={{ y: -30, opacity: 0, scale: 1.05 }}
      animate={isInView ? {
        y: [null, 2, 0],
        opacity: 1,
        scale: [1.05, 0.98, 1]
      } : { y: -30, opacity: 0, scale: 1.05 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.34, 1.56, 0.64, 1]
      }}
    >
      {children}
    </motion.span>
  )
}
