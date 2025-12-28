import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import LoadingSpinner from '../components/LoadingSpinner'
import { getBlogPosts, urlFor } from '../lib/sanity'
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
        setError('Unable to load blog posts. Please check your Sanity configuration.')
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
          title="Blog - Islander Studio"
          description="Thoughts, updates, and stories from Islander Studio"
          path="/blog"
        />
        <div className="blog-loading">
          <LoadingSpinner />
          <p>Loading blog posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="blog-page">
        <SEO
          title="Blog - Islander Studio"
          description="Thoughts, updates, and stories from Islander Studio"
          path="/blog"
        />
        <div className="blog-error">
          <h1>Blog</h1>
          <div className="error-message">
            <p>{error}</p>
            <p className="error-hint">
              Make sure you've set up your Sanity project and added the environment variables.
              See <code>sanity-schema/README.md</code> for setup instructions.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-page">
      <SEO
        title="Blog - Islander Studio"
        description="Thoughts, updates, and stories from Islander Studio. Read about our apps, design philosophy, and everyday moments."
        path="/blog"
      />

      <div className="blog-header">
        <h1 className="blog-title">Blog</h1>
        <p className="blog-subtitle">
          Thoughts, updates, and stories from Islander Studio
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="blog-empty">
          <p>No blog posts yet. Check back soon!</p>
          <p className="empty-hint">
            Create your first post in your Sanity Studio.
          </p>
        </div>
      ) : (
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
      )}
    </div>
  )
}
