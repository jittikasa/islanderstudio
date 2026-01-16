import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { marked } from 'marked'
import SEO, { StructuredData } from '../components/SEO'
import LoadingSpinner from '../components/LoadingSpinner'
import { getBlogPost, urlFor } from '../lib/api'
import './BlogPost.css'

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
})

// Detect if content is markdown (starts with ## or has markdown patterns)
function isMarkdown(content) {
  if (!content) return false
  const markdownPatterns = [
    /^#{1,6}\s/m,           // Headers
    /^\*\*[^*]+\*\*/m,      // Bold
    /^\*[^*]+\*/m,          // Italic
    /^-\s/m,                // Unordered list
    /^\d+\.\s/m,            // Ordered list
    /^\[.+\]\(.+\)/m,       // Links
    /^>\s/m,                // Blockquotes
    /^```/m,                // Code blocks
  ]
  return markdownPatterns.some(pattern => pattern.test(content))
}

// CTA Block - copied exactly from Shellist.jsx
function CTABlock({ relatedApps }) {
  const hasShellist = relatedApps?.includes('shellist')
  const hasPolaMoment = relatedApps?.includes('polamoment')

  // Shellist CTA - exact copy from Shellist.jsx
  if (hasShellist) {
    return (
      <section className="post-cta">
        <div className="post-cta-card">
          <span className="post-cta-label">iOS App</span>
          <span className="post-cta-icon">🐚</span>
          <h2 className="post-cta-title">Start Building Better Habits</h2>
          <p className="post-cta-text">
            Download Shellist and watch your transformation unfold, one pearl at a time.
          </p>
          <a href="https://apps.apple.com/us/app/shellist/id6755242144" className="btn-download-app">
            <svg width="18" height="22" viewBox="0 0 20 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Download on App Store
          </a>
          <p className="post-cta-note">
            Available for iPhone and iPad • iOS 17.0 or later • $2.99 USD
          </p>
        </div>
      </section>
    )
  }

  // PolaMoment CTA
  if (hasPolaMoment) {
    return (
      <section className="post-cta">
        <div className="post-cta-card">
          <span className="post-cta-label">Coming Soon</span>
          <span className="post-cta-icon">📸</span>
          <h2 className="post-cta-title">Capture Moments That Matter</h2>
          <p className="post-cta-text">
            Experience instant photography reimagined for the digital age.
          </p>
          <Link to="/polamoment" className="btn-download-app">
            Learn More
          </Link>
          <p className="post-cta-note">
            Available for iPhone and iPad • iOS 17.0 or later
          </p>
        </div>
      </section>
    )
  }

  // Default
  return (
    <section className="post-cta">
      <div className="post-cta-card">
        <span className="post-cta-label">islander Studio</span>
        <span className="post-cta-icon">✨</span>
        <h2 className="post-cta-title">Explore Our Apps</h2>
        <p className="post-cta-text">
          Discover apps crafted with soul for everyday moments.
        </p>
        <Link to="/" className="btn-download-app">
          View Our Apps
        </Link>
      </div>
    </section>
  )
}

// Content renderer that handles both HTML and Markdown
function BlogContent({ content }) {
  const renderedContent = useMemo(() => {
    if (!content) return ''
    // If content looks like markdown, parse it
    if (isMarkdown(content)) {
      return marked(content)
    }
    // Otherwise assume it's HTML
    return content
  }, [content])

  if (!content) return null

  return (
    <div
      className="blog-html-content"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const articleRef = useRef(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getBlogPost(slug)
        if (!data) {
          setError('Post not found')
        } else {
          setPost(data)
        }
      } catch (err) {
        console.error('Error fetching blog post:', err)
        setError('Unable to load blog post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  // Reading progress tracker
  useEffect(() => {
    function updateReadingProgress() {
      if (!articleRef.current) return

      const article = articleRef.current
      const articleTop = article.offsetTop
      const articleHeight = article.offsetHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY

      const progress = Math.min(
        Math.max(
          ((scrollY - articleTop + windowHeight * 0.5) / articleHeight) * 100,
          0
        ),
        100
      )

      setReadingProgress(progress)
    }

    window.addEventListener('scroll', updateReadingProgress, { passive: true })
    updateReadingProgress()

    return () => window.removeEventListener('scroll', updateReadingProgress)
  }, [post])

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
      <div className="blog-post-page">
        <SEO title="Loading... - islander Studio Blog" path={`/blog/${slug}`} />
        <div className="post-loading">
          <LoadingSpinner />
          <p>Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="blog-post-page">
        <SEO title="Post Not Found - islander Studio Blog" path={`/blog/${slug}`} />
        <div className="post-error">
          <h1>Post Not Found</h1>
          <p>Sorry, we couldn't find the post you're looking for.</p>
          <Link to="/blog" className="back-link">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  // Get SEO values with fallbacks
  const seoTitle = post.seo?.metaTitle || post.title
  const seoDescription = post.seo?.metaDescription || post.excerpt || post.title
  const seoImage = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined
  const canonicalUrl = post.seo?.canonicalUrl || `https://islanderstudio.app/blog/${slug}`

  // BlogPosting Schema
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: seoTitle,
    description: seoDescription,
    image: seoImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.authorName || 'islander Studio',
    },
    publisher: {
      '@type': 'Organization',
      name: 'islander Studio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://islanderstudio.app/branding/Logo-primary.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    ...(post.readingTime && { timeRequired: `PT${post.readingTime}M` }),
    ...(post.seo?.keywords && { keywords: post.seo.keywords.join(', ') }),
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://islanderstudio.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://islanderstudio.app/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://islanderstudio.app/blog/${slug}`,
      },
    ],
  }

  return (
    <div className="blog-post-page">
      {/* Reading Progress Bar */}
      <div
        className="reading-progress"
        style={{ width: `${readingProgress}%` }}
        aria-hidden="true"
      />

      <SEO
        title={`${seoTitle} - islander Studio Blog`}
        description={seoDescription}
        url={canonicalUrl}
        image={seoImage}
        type="article"
        keywords={post.seo?.keywords?.join(', ')}
        robots={post.seo?.noIndex ? 'noindex, nofollow' : undefined}
      />
      <StructuredData data={blogPostingSchema} />
      <StructuredData data={breadcrumbSchema} />

      <div className="post-container">
        {/* Hero Header */}
        <header className="post-hero">
          {post.categories && post.categories.length > 0 && (
            <div className="post-categories">
              {post.categories.map((category, index) => (
                <span key={index} className="post-category">
                  {category}
                </span>
              ))}
            </div>
          )}

          {post.relatedApps && post.relatedApps.length > 0 && (
            <div className="post-related-apps">
              {post.relatedApps.map((app, index) => (
                <Link
                  key={index}
                  to={`/${app}`}
                  className="post-related-app-badge"
                >
                  Related to {app === 'shellist' ? 'Shellist' : 'PolaMoment'}
                </Link>
              ))}
            </div>
          )}

          <h1 className="post-title">{post.title}</h1>

          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="post-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="post-meta">
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <>
                <span className="meta-separator" />
                <span className="post-updated">Updated {formatDate(post.updatedAt)}</span>
              </>
            )}
            {post.authorName && (
              <>
                <span className="meta-separator" />
                <span className="post-author">by {post.authorName}</span>
              </>
            )}
            {post.readingTime && (
              <>
                <span className="meta-separator" />
                <span className="post-reading-time">{post.readingTime} min read</span>
              </>
            )}
          </div>

          {post.mainImage && (
            <div className="post-featured-image">
              <img
                src={urlFor(post.mainImage).width(1200).url()}
                alt={post.mainImage.alt || post.title}
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <article className="post-article" ref={articleRef}>
          <div className="post-content">
            {post.excerpt && (
              <p className="post-excerpt">{post.excerpt}</p>
            )}

            <BlogContent content={post.body} />
          </div>
        </article>

        {/* Dynamic CTA Block - outside post-content to avoid link style override */}
        <CTABlock relatedApps={post.relatedApps} />

        {/* Back to Blog - at bottom */}
        <div className="post-back-bottom">
          <Link to="/blog" className="back-link">
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
