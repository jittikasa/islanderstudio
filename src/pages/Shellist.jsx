import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { getPostsByApp, urlFor } from '../lib/api'
import SEO, { StructuredData, shellistAppSchema } from '../components/SEO'
import './Shellist.css'

export default function Shellist() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [blogPosts, setBlogPosts] = useState([])

  // Refs for scroll-triggered animations
  const featuresRef = useRef(null)
  const showcaseRef = useRef(null)
  const stepsRef = useRef(null)
  const blogRef = useRef(null)
  const privacyRef = useRef(null)
  const ctaRef = useRef(null)
  const heroImageRef = useRef(null)

  // In-view detection
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' })
  const showcaseInView = useInView(showcaseRef, { once: true, margin: '-100px' })
  const stepsInView = useInView(stepsRef, { once: true, margin: '-100px' })
  const blogInView = useInView(blogRef, { once: true, margin: '-100px' })
  const privacyInView = useInView(privacyRef, { once: true, margin: '-100px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' })

  // Parallax for hero image
  const { scrollY } = useScroll()
  const heroImageY = useTransform(scrollY, [0, 500], [0, 80])

  useEffect(() => {
    setIsLoaded(true)

    // Fetch related blog posts
    async function fetchBlogPosts() {
      try {
        const posts = await getPostsByApp('shellist', 2)
        setBlogPosts(posts)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      }
    }

    fetchBlogPosts()
  }, [])

  const features = [
    {
      number: '01',
      title: 'Pearl Chain Visualization',
      description: 'Watch your progress grow like a string of pearls. Each habit completion adds to your beautiful chain.'
    },
    {
      number: '02',
      title: 'Powerful Analytics',
      description: 'Understand your patterns with comprehensive insights. View heatmap calendars and track streaks.'
    },
    {
      number: '03',
      title: 'Vision Board',
      description: 'Bring your dreams to life with customizable vision boards. Add photos and create daily inspiration.'
    },
    {
      number: '04',
      title: 'Smart Categories',
      description: 'Group habits into 8 beautiful color-coded themes: Mindfulness, Fitness, Learning, and more.'
    },
    {
      number: '05',
      title: 'Privacy First',
      description: 'All your data stays on your device. Optional iCloud sync, no tracking, no ads.'
    },
    {
      number: '06',
      title: 'Widget Support',
      description: 'Track progress from your home screen with beautiful iOS widgets showing streaks at a glance.'
    }
  ]

  const steps = [
    {
      number: '01',
      title: 'Create Your Habits',
      description: 'Tap the shell button to add a new habit. Choose a name, category, frequency, and target.'
    },
    {
      number: '02',
      title: 'Track Your Progress',
      description: 'Mark habits complete with a tap. Watch your pearl chain grow and earn milestones.'
    },
    {
      number: '03',
      title: 'Achieve Your Goals',
      description: 'Review analytics, celebrate achievements, and adjust your approach. Build habits that stick.'
    }
  ]

  return (
    <>
      <SEO
        title="Shellist - Habit Tracker with Pearl Visualizations | islander Studio"
        description="Build habits like pearls. Transform your life one habit at a time with beautiful pearl visualizations, powerful analytics, vision boards, and motivational tools. Available on iOS."
        url="https://islanderstudio.app/shellist"
        image="https://islanderstudio.app/shellist/images/App Icon.png"
        keywords="habit tracker, habit app, pearl chain, habit tracking, productivity app, iOS habits, daily habits, goal tracking, streak tracker, habit builder"
      />
      <StructuredData data={shellistAppSchema} />

      <div className={`shellist ${isLoaded ? 'shellist--loaded' : ''}`}>
      {/* Hero Section */}
      <section className="shellist__hero">
        <div className="shellist__hero-content">
          <div className="shellist__hero-text">
            <motion.span
              className="shellist__label"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Habit Tracking
            </motion.span>
            <motion.h1
              className="shellist__title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Shellist
            </motion.h1>
            <motion.p
              className="shellist__tagline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              Build habits like pearls
            </motion.p>
            <motion.p
              className="shellist__description"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              Transform your life one habit at a time. Track your daily progress
              with beautiful pearl visualizations and motivational tools.
            </motion.p>
            <motion.div
              className="shellist__hero-actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="https://apps.apple.com/us/app/shellist/id6755242144" className="btn-download-app">
                <svg width="18" height="22" viewBox="0 0 20 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Download on App Store
              </a>
            </motion.div>
          </div>

          <motion.div
            className="shellist__hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: heroImageY }}
            ref={heroImageRef}
          >
            <img
              src="/shellist/images/screenshots/Screens-2.webp"
              alt="Shellist app interface showing habit tracking"
              className="shellist__hero-image"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="shellist__features" ref={featuresRef}>
        <motion.div
          className="shellist__section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="shellist__section-title">
            <span className="section-number">№</span>
            <h2>Features</h2>
          </div>
          <span className="shellist__section-count">{features.length} things we love</span>
        </motion.div>

        <div className="shellist__features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="shellist__feature"
              style={{ '--index': index }}
              initial={{ opacity: 0, y: 40 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
            >
              <span className="shellist__feature-number">{feature.number}</span>
              <h3 className="shellist__feature-title">{feature.title}</h3>
              <p className="shellist__feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* App Showcase */}
      <section className="shellist__showcase" ref={showcaseRef}>
        <motion.img
          src="/shellist/images/screenshots/Screens-3.webp"
          alt="Shellist app features overview"
          className="shellist__showcase-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={showcaseInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
        />
      </section>

      {/* How It Works */}
      <section className="shellist__steps" ref={stepsRef}>
        <motion.div
          className="shellist__section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={stepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="shellist__section-title">
            <span className="section-number">№</span>
            <h2>How It Works</h2>
          </div>
          <span className="shellist__section-count">Simple to start</span>
        </motion.div>

        <div className="shellist__steps-grid">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="shellist__step"
              style={{ '--index': index }}
              initial={{ opacity: 0, y: 40 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
            >
              <span className="shellist__step-number">{step.number}</span>
              <h3 className="shellist__step-title">{step.title}</h3>
              <p className="shellist__step-description">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      {blogPosts.length > 0 && (
        <section className="shellist__blog" ref={blogRef}>
          <motion.div
            className="shellist__section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={blogInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="shellist__section-title">
              <span className="section-number">№</span>
              <h2>Related Reading</h2>
            </div>
            <Link to="/blog?app=shellist" className="shellist__blog-view-all">
              View all posts <span>→</span>
            </Link>
          </motion.div>

          <div className="shellist__blog-grid">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={blogInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug.current}`}
                  className="shellist__blog-card"
                >
                  {post.mainImage && (
                    <div className="shellist__blog-image">
                      <img
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.mainImage.alt || post.title}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="shellist__blog-content">
                    {post.categories && post.categories.length > 0 && (
                      <span className="shellist__blog-category">
                        {post.categories[0]}
                      </span>
                    )}
                    <h3 className="shellist__blog-title">{post.title}</h3>
                    {post.excerpt && (
                      <p className="shellist__blog-excerpt">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Privacy Section */}
      <section className="shellist__privacy" ref={privacyRef}>
        <motion.div
          className="shellist__privacy-card"
          initial={{ opacity: 0, y: 40 }}
          animate={privacyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <span className="shellist__privacy-icon">*</span>
          <h2 className="shellist__privacy-title">Your data stays yours</h2>
          <p className="shellist__privacy-text">
            Sync across devices with your own iCloud—we never see it. No third-party
            analytics, no tracking, no data selling.
          </p>
          <Link to="/privacy" className="shellist__privacy-link">
            Read privacy policy <span>→</span>
          </Link>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="shellist__cta" ref={ctaRef}>
        <motion.div
          className="shellist__cta-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={ctaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
        >
          <span className="shellist__cta-label">iOS App</span>
          <motion.span
            className="shellist__cta-icon"
            initial={{ scale: 0 }}
            animate={ctaInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 300 }}
          >
            🐚
          </motion.span>
          <h2 className="shellist__cta-title">Start Building Better Habits</h2>
          <p className="shellist__cta-text">
            Download Shellist and watch your transformation unfold, one pearl at a time.
          </p>
          <a href="https://apps.apple.com/us/app/shellist/id6755242144" className="btn-download-app">
            <svg width="18" height="22" viewBox="0 0 20 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Download on App Store
          </a>
          <p className="shellist__cta-note">
            Available for iPhone and iPad • iOS 17.0 or later • $2.99 USD
          </p>
        </motion.div>
      </section>
      </div>
    </>
  )
}
