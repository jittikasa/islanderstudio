import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPostsByApp, urlFor } from '../lib/api'
import SEO, { StructuredData, polamomentAppSchema } from '../components/SEO'
import './PolaMoment.css'

export default function PolaMoment() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageErrors, setImageErrors] = useState({})
  const [blogPosts, setBlogPosts] = useState([])

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
            <span className="pola__label">Coming Soon</span>
            <h1 className="pola__title">
              PolaMoment<span className="pola__dot">.</span>
            </h1>
            <p className="pola__tagline">Capture the magic</p>
            <p className="pola__description">
              Transform your iPhone into a vintage Polaroid camera. Create instant
              memories with that iconic retro aesthetic we all love.
            </p>
          </div>

          <div className="pola__hero-visual">
            <div className="pola__camera-wrapper">
              {!imageErrors.camera && (
                <img
                  src="/pola-assets/Cam.svg"
                  alt="PolaMoment Camera"
                  className="pola__camera"
                  onError={() => handleImageError('camera')}
                />
              )}

              {/* Polaroid Stack */}
              <div className="pola__polaroids">
                <div className="pola__polaroid pola__polaroid--1">
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
                </div>
                <div className="pola__polaroid pola__polaroid--2">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pola__features">
        <div className="pola__section-header">
          <div className="pola__section-title">
            <span className="section-number">№</span>
            <h2>Features</h2>
          </div>
          <span className="pola__section-count">{features.length} things we love</span>
        </div>

        <div className="pola__features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="pola__feature"
              style={{ '--index': index }}
            >
              <span className="pola__feature-number">{feature.number}</span>
              <h3 className="pola__feature-title">{feature.title}</h3>
              <p className="pola__feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      {blogPosts.length > 0 && (
        <section className="pola__blog">
          <div className="pola__section-header">
            <div className="pola__section-title">
              <span className="section-number">№</span>
              <h2>Related Reading</h2>
            </div>
            <Link to="/blog" className="pola__blog-view-all">
              View all <span>→</span>
            </Link>
          </div>

          <div className="pola__blog-grid">
            {blogPosts.map((post) => (
              <Link
                key={post._id}
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
            ))}
          </div>
        </section>
      )}

      {/* Privacy Section */}
      <section className="pola__privacy">
        <div className="pola__privacy-card">
          <span className="pola__privacy-icon">*</span>
          <h2 className="pola__privacy-title">Your data stays yours</h2>
          <p className="pola__privacy-text">
            Sync across devices with your own iCloud—we never see it. No third-party
            analytics, no tracking, no data selling.
          </p>
          <Link to="/privacy" className="pola__privacy-link">
            Read privacy policy <span>→</span>
          </Link>
        </div>
      </section>

      {/* Download Section */}
      <section className="pola__download">
        <div className="pola__download-card">
          <span className="pola__download-label">iOS App</span>
          <span className="pola__download-icon">📷</span>
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
        </div>
      </section>
      </div>
    </>
  )
}
