import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPostsByApp, urlFor } from '../lib/sanity'
import SEO, { StructuredData, shellistAppSchema } from '../components/SEO'
import './Shellist.css'

export default function Shellist() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [blogPosts, setBlogPosts] = useState([])

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
        title="Shellist - Habit Tracker with Pearl Visualizations | Islander Studio"
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
            <span className="shellist__label">Habit Tracking</span>
            <h1 className="shellist__title">
              Shellist
            </h1>
            <p className="shellist__tagline">Build habits like pearls</p>
            <p className="shellist__description">
              Transform your life one habit at a time. Track your daily progress
              with beautiful pearl visualizations and motivational tools.
            </p>
            <div className="shellist__hero-actions">
              <a href="https://apps.apple.com/us/app/shellist/id6755242144" className="btn-download-app">
                <svg width="18" height="22" viewBox="0 0 20 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Download on App Store
              </a>
            </div>
          </div>

          <div className="shellist__hero-visual">
            <img
              src="/shellist/images/screenshots/Screens-2.png"
              alt="Shellist app interface showing habit tracking"
              className="shellist__hero-image"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="shellist__features">
        <div className="shellist__section-header">
          <div className="shellist__section-title">
            <span className="shellist__section-number">№</span>
            <h2>Features</h2>
          </div>
          <span className="shellist__section-count">{features.length} things we love</span>
        </div>

        <div className="shellist__features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="shellist__feature"
              style={{ '--index': index }}
            >
              <span className="shellist__feature-number">{feature.number}</span>
              <h3 className="shellist__feature-title">{feature.title}</h3>
              <p className="shellist__feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* App Showcase */}
      <section className="shellist__showcase">
        <img
          src="/shellist/images/screenshots/Screens-3.png"
          alt="Shellist app features overview"
          className="shellist__showcase-image"
        />
      </section>

      {/* How It Works */}
      <section className="shellist__steps">
        <div className="shellist__section-header">
          <div className="shellist__section-title">
            <span className="shellist__section-number">№</span>
            <h2>How It Works</h2>
          </div>
          <span className="shellist__section-count">Simple to start</span>
        </div>

        <div className="shellist__steps-grid">
          {steps.map((step, index) => (
            <div
              key={index}
              className="shellist__step"
              style={{ '--index': index }}
            >
              <span className="shellist__step-number">{step.number}</span>
              <h3 className="shellist__step-title">{step.title}</h3>
              <p className="shellist__step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      {blogPosts.length > 0 && (
        <section className="shellist__blog">
          <div className="shellist__section-header">
            <div className="shellist__section-title">
              <span className="shellist__section-number">№</span>
              <h2>Related Reading</h2>
            </div>
            <Link to="/blog" className="shellist__blog-view-all">
              View all <span>→</span>
            </Link>
          </div>

          <div className="shellist__blog-grid">
            {blogPosts.map((post) => (
              <Link
                key={post._id}
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
            ))}
          </div>
        </section>
      )}

      {/* Privacy Section */}
      <section className="shellist__privacy">
        <div className="shellist__privacy-card">
          <span className="shellist__privacy-icon">*</span>
          <h2 className="shellist__privacy-title">Your privacy matters</h2>
          <p className="shellist__privacy-text">
            We don't collect, store, or share any of your data. All your habits and progress stay on
            your device. No cloud storage, no analytics, no tracking.
          </p>
          <Link to="/privacy" className="shellist__privacy-link">
            Read privacy policy <span>→</span>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="shellist__cta">
        <div className="shellist__cta-card">
          <span className="shellist__cta-label">iOS App</span>
          <span className="shellist__cta-icon">🐚</span>
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
        </div>
      </section>
      </div>
    </>
  )
}
