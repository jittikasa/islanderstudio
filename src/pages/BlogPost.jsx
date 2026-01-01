import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SEO, { StructuredData } from '../components/SEO'
import LoadingSpinner from '../components/LoadingSpinner'
import { getBlogPost, urlFor } from '../lib/api'
import './BlogPost.css'

// Portable Text renderer for Sanity rich text
function PortableText({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) return null

  return blocks.map((block, index) => {
    // Handle text blocks
    if (block._type === 'block') {
      const style = block.style || 'normal'
      const children = block.children?.map((child, childIndex) => {
        if (child.marks?.includes('strong')) {
          return <strong key={childIndex}>{child.text}</strong>
        }
        if (child.marks?.includes('em')) {
          return <em key={childIndex}>{child.text}</em>
        }
        if (child.marks?.includes('code')) {
          return <code key={childIndex}>{child.text}</code>
        }
        return child.text
      })

      switch (style) {
        case 'h1':
          return <h1 key={index}>{children}</h1>
        case 'h2':
          return <h2 key={index}>{children}</h2>
        case 'h3':
          return <h3 key={index}>{children}</h3>
        case 'h4':
          return <h4 key={index}>{children}</h4>
        case 'blockquote':
          return <blockquote key={index}>{children}</blockquote>
        default:
          return <p key={index}>{children}</p>
      }
    }

    // Handle images
    if (block._type === 'image') {
      return (
        <div key={index} className="post-image">
          <img
            src={urlFor(block).width(1200).url()}
            alt={block.alt || 'Blog post image'}
          />
          {block.alt && <p className="image-caption">{block.alt}</p>}
        </div>
      )
    }

    return null
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
        <SEO title="Loading... - Islander Studio Blog" path={`/blog/${slug}`} />
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
        <SEO title="Post Not Found - Islander Studio Blog" path={`/blog/${slug}`} />
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
      name: post.authorName || 'Islander Studio',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Islander Studio',
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
      <SEO
        title={`${seoTitle} - Islander Studio Blog`}
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
        <Link to="/blog" className="back-link">
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        <article className="post-article">
          <header className="post-header">
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
                  <span className="meta-separator">•</span>
                  <span className="post-updated">Updated {formatDate(post.updatedAt)}</span>
                </>
              )}
              {post.authorName && (
                <>
                  <span className="meta-separator">•</span>
                  <span className="post-author">by {post.authorName}</span>
                </>
              )}
              {post.readingTime && (
                <>
                  <span className="meta-separator">•</span>
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

          <div className="post-content">
            {post.excerpt && (
              <p className="post-excerpt">{post.excerpt}</p>
            )}

            <PortableText blocks={post.body} />
          </div>

          {post.authorName && (
            <footer className="post-footer">
              <div className="author-info">
                {post.authorImage && (
                  <img
                    src={urlFor(post.authorImage).width(80).height(80).url()}
                    alt={post.authorName}
                    className="author-avatar"
                  />
                )}
                <div className="author-details">
                  <p className="author-name">{post.authorName}</p>
                  {post.authorBio && (
                    <p className="author-bio">{post.authorBio}</p>
                  )}
                </div>
              </div>
            </footer>
          )}
        </article>
      </div>
    </div>
  )
}
