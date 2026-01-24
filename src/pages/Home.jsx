import { motion } from 'motion/react'
import SEO, { StructuredData, organizationSchema, websiteSchema } from '../components/SEO'
import './Home.css'

export default function Home() {
  return (
    <>
      <SEO
        title="Jittika — Designer & Maker"
        description="Hi, I'm Jittika. A designer and maker creating thoughtful digital experiences from Phuket, Thailand. Coming soon."
        url="https://jittika.com"
      />
      <StructuredData data={[organizationSchema, websiteSchema]} />

      <div className="coming-soon">
        {/* Subtle background gradient */}
        <div className="coming-soon__bg" />

        <motion.div
          className="coming-soon__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative ornament */}
          <motion.span
            className="coming-soon__ornament"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            ✦
          </motion.span>

          {/* Name */}
          <motion.h1
            className="coming-soon__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Jittika
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="coming-soon__tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Designer & Maker
          </motion.p>

          {/* Divider */}
          <motion.div
            className="coming-soon__divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />

          {/* Coming Soon */}
          <motion.p
            className="coming-soon__status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Coming Soon
          </motion.p>

          {/* Location */}
          <motion.p
            className="coming-soon__location"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Phuket, Thailand
          </motion.p>

          {/* Email */}
          <motion.a
            href="mailto:hello@jittika.com"
            className="coming-soon__email"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            hello@jittika.com
          </motion.a>
        </motion.div>

        {/* Bottom ornament */}
        <motion.span
          className="coming-soon__bottom-ornament"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          ✦
        </motion.span>
      </div>
    </>
  )
}
