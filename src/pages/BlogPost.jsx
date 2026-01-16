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

// Content renderer that handles both HTML and Markdown
function BlogContent({ content }) {
  if (!content) return null

  const renderedContent = useMemo(() => {
    // If content looks like markdown, parse it
    if (isMarkdown(content)) {
      return marked(content)
    }
    // Otherwise assume it's HTML
    return content
  }, [content])

  return (
    <div
      className="blog-html-content"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
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
          <Link to="/blog" className="back-link">
            <ArrowLeft size={18} />
            Back to Blog
          </Link>

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
      </div>
    </div>
  )
}
