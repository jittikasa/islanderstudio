import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { getPostsByApp, urlFor } from '../lib/api'
import SEO, { StructuredData, polamomentAppSchema } from '../components/SEO'
import './PolaMoment.css'

export default function PolaMoment() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageErrors, setImageErrors] = useState({})
  const [blogPosts, setBlogPosts] = useState([])

  // Refs for scroll-triggered animations
  const featuresRef = useRef(null)
  const blogRef = useRef(null)
  const privacyRef = useRef(null)
  const downloadRef = useRef(null)

  // In-view detection
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' })
  const blogInView = useInView(blogRef, { once: true, margin: '-100px' })
  const privacyInView = useInView(privacyRef, { once: true, margin: '-100px' })
  const downloadInView = useInView(downloadRef, { once: true, margin: '-100px' })

  // Parallax for hero elements
  const { scrollY } = useScroll()
  const cameraY = useTransform(scrollY, [0, 500], [0, 40])
  const polaroid1Y = useTransform(scrollY, [0, 500], [0, 70])
  const polaroid2Y = useTransform(scrollY, [0, 500], [0, 50])

  useEffect(() => {
    setIsLoaded(true)

    // Fetch related blog posts
    async function fetchBlogPosts() {
      try {
        const posts = await getPostsByApp('polamoment', 2)
        setBlogPosts(posts)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      }
    }

    fetchBlogPosts()
  }, [])

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  const features = [
    {
      number: '01',
      title: 'Authentic Aesthetic',
      description: 'Experience the nostalgic charm of vintage instant photography with every shot.'
    },
    {
      number: '02',
      title: 'Vintage Filters',
      description: 'Transform your photos with carefully crafted filters that recreate classic film stocks.'
    },
    {
      number: '03',
      title: 'Instant Capture',
      description: 'Point, shoot, and watch your photo develop. The magic of instant photography.'
    },
    {
      number: '04',
      title: 'Classic Frames',
      description: 'Your photos come with authentic Polaroid borders, ready to share or print.'
    },
    {
      number: '05',
      title: 'Share Memories',
      description: 'Share your Polaroid-style photos instantly to social media or send to friends.'
    },
    {
      number: '06',
      title: 'iOS Native',
      description: 'Built for iOS with support for the latest camera features and seamless integration.'
    }
  ]

  return (
    <>
      <SEO
        title="PolaMoment - Vintage Polaroid Camera for iPhone | islander Studio"
        description="Transform your iPhone into a vintage Polaroid camera. Create instant memories with authentic retro filters, classic frames, and that iconic aesthetic we all love."
        url="https://islanderstudio.app/polamoment"
        image="https://islanderstudio.app/pola-assets/Icon-1024.png"
        keywords="polaroid camera app, vintage camera, instant photography, retro photo filters, polaroid frames, iOS camera app, vintage photos, nostalgic photography"
      />
      <StructuredData data={polamomentAppSchema} />

      <div className={`pola ${isLoaded ? 'pola--loaded' : ''}`}>
      {/* Hero Section */}
      <section className="pola__hero">
        <div className="pola__hero-content">
          <div className="pola__hero-text">
            <motion.span
              className="pola__label"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Coming Soon
            </motion.span>
            <motion.h1
              className="pola__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              PolaMoment<span className="pola__dot">.</span>
            </motion.h1>
            <motion.p
              className="pola__tagline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              Capture the magic
            </motion.p>
            <motion.p
              className="pola__description"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              Transform your iPhone into a vintage Polaroid camera. Create instant
              memories with that iconic retro aesthetic we all love.
            </motion.p>
          </div>

          <div className="pola__hero-visual">
            <div className="pola__camera-wrapper">
              {!imageErrors.camera && (
                <motion.img
                  src="/pola-assets/Cam.svg"
                  alt="PolaMoment Camera"
                  className="pola__camera"
                  onError={() => handleImageError('camera')}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ y: cameraY }}
                />
              )}

              {/* Polaroid Stack */}
              <div className="pola__polaroids">
                <motion.div
                  className="pola__polaroid pola__polaroid--1"
                  initial={{ opacity: 0, y: 40, rotate: -15 }}
                  animate={{ opacity: 1, y: 0, rotate: -8 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ y: polaroid1Y }}
                >
                  <div className="pola__polaroid-inner">
                    {!imageErrors.img1 ? (
                      <img
                        src="/pola-assets/Image-1.jpeg"
                        alt=""
                        className="pola__polaroid-img"
                        onError={() => handleImageError('img1')}
                      />
                    ) : (
                      <div className="pola__polaroid-placeholder" />
                    )}
                  </div>
                </motion.div>
                <motion.div
                  className="pola__polaroid pola__polaroid--2"
                  initial={{ opacity: 0, y: 50, rotate: 20 }}
                  animate={{ opacity: 1, y: 0, rotate: 12 }}
                  transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{ y: polaroid2Y }}
                >
                  <div className="pola__polaroid-inner">
                    {!imageErrors.img2 ? (
                      <img
                        src="/pola-assets/Image-2.jpeg"
                        alt=""
                        className="pola__polaroid-img"
                        onError={() => handleImageError('img2')}
                      />
                    ) : (
                      <div className="pola__polaroid-placeholder" />
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pola__features" ref={featuresRef}>
        <motion.div
          className="pola__section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="pola__section-title">
            <span className="section-number">№</span>
            <h2>Features</h2>
          </div>
          <span className="pola__section-count">{features.length} things we love</span>
        </motion.div>

        <div className="pola__features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="pola__feature"
              style={{ '--index': index }}
              initial={{ opacity: 0, y: 40 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
            >
              <span className="pola__feature-number">{feature.number}</span>
              <h3 className="pola__feature-title">{feature.title}</h3>
              <p className="pola__feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      {blogPosts.length > 0 && (
        <section className="pola__blog" ref={blogRef}>
          <motion.div
            className="pola__section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={blogInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="pola__section-title">
              <span className="section-number">№</span>
              <h2>Related Reading</h2>
            </div>
            <Link to="/blog?app=polamoment" className="pola__blog-view-all">
              View all posts <span>→</span>
            </Link>
          </motion.div>

          <div className="pola__blog-grid">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={blogInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug.current}`}
                  className="pola__blog-card"
                >
                  {post.mainImage && (
                    <div className="pola__blog-image">
                      <img
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.mainImage.alt || post.title}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="pola__blog-content">
                    {post.categories && post.categories.length > 0 && (
                      <span className="pola__blog-category">
                        {post.categories[0]}
                      </span>
                    )}
                    <h3 className="pola__blog-title">{post.title}</h3>
                    {post.excerpt && (
                      <p className="pola__blog-excerpt">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Privacy Section */}
      <section className="pola__privacy" ref={privacyRef}>
        <motion.div
          className="pola__privacy-card"
          initial={{ opacity: 0, y: 40 }}
          animate={privacyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <span className="pola__privacy-icon">*</span>
          <h2 className="pola__privacy-title">Your data stays yours</h2>
          <p className="pola__privacy-text">
            Sync across devices with your own iCloud—we never see it. No third-party
            analytics, no tracking, no data selling.
          </p>
          <Link to="/privacy" className="pola__privacy-link">
            Read privacy policy <span>→</span>
          </Link>
        </motion.div>
      </section>

      {/* Download Section */}
      <section className="pola__download" ref={downloadRef}>
        <motion.div
          className="pola__download-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={downloadInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
        >
          <span className="pola__download-label">iOS App</span>
          <motion.span
            className="pola__download-icon"
            initial={{ scale: 0 }}
            animate={downloadInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 300 }}
          >
            📷
          </motion.span>
          <h2 className="pola__download-title">Start creating today</h2>
          <p className="pola__download-text">
            Download PolaMoment and start capturing vintage-style photos on your iPhone.
          </p>
          <button className="btn-download-app" disabled>
            <svg width="18" height="22" viewBox="0 0 20 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Download on App Store
          </button>
          <p className="pola__download-note">
            Requires iOS 14.0 or later
          </p>
        </motion.div>
      </section>
      </div>
    </>
  )
}
