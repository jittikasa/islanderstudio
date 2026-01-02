import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import LoadingSpinner from '../components/LoadingSpinner'
import { getBlogPosts, urlFor } from '../lib/api'
import './Blog.css'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getBlogPosts()
        setPosts(data)
      } catch (err) {
        console.error('Error fetching blog posts:', err)
        setError('Unable to load blog posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="blog-page">
        <SEO
          title="Blog - islander Studio"
          description="Thoughts, updates, and stories from islander Studio"
          path="/blog"
        />
        <div className="blog-loading">
          <LoadingSpinner />
          <p>Loading blog posts...</p>
        </div>
      </div>
    )
  }

  if (error || posts.length === 0) {
    return (
      <div className="blog-page">
        <SEO
          title="Blog - islander Studio"
          description="Thoughts, updates, and stories from islander Studio"
          path="/blog"
        />
        <div className="blog-header">
          <h1 className="blog-title">Blog</h1>
          <p className="blog-subtitle">
            Thoughts, updates, and stories from islander Studio
          </p>
        </div>
        <div className="blog-empty">
          <p style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>Coming Soon</p>
          <p>We're preparing something special. Check back soon for updates, stories, and insights from islander Studio.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-page">
      <SEO
        title="Blog - islander Studio"
        description="Thoughts, updates, and stories from islander Studio. Read about our apps, design philosophy, and everyday moments."
        path="/blog"
      />

      <div className="blog-header">
        <h1 className="blog-title">Blog</h1>
        <p className="blog-subtitle">
          Thoughts, updates, and stories from islander Studio
        </p>
      </div>

      <div className="blog-grid">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/blog/${post.slug.current}`}
              className="blog-card"
            >
              {post.mainImage && (
                <div className="blog-card-image">
                  <img
                    src={urlFor(post.mainImage).width(600).height(400).url()}
                    alt={post.mainImage.alt || post.title}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  {post.categories && post.categories.length > 0 && (
                    <span className="blog-card-category">
                      {post.categories[0]}
                    </span>
                  )}
                </div>
                <h2 className="blog-card-title">{post.title}</h2>
                {post.excerpt && (
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                )}
                {post.authorName && (
                  <p className="blog-card-author">by {post.authorName}</p>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
