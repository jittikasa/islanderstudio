import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import SEO from '../components/SEO'
import LoadingSpinner from '../components/LoadingSpinner'
import { PostCardSkeleton } from '../components/Skeleton'
import { getBlogPosts, getCategories, getTags, urlFor } from '../lib/api'
import { formatReadingTime } from '../lib/readingTime'
import './Blog.css'

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams()

  // State
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filters from URL
  const activeCategory = searchParams.get('category') || ''
  const activeTag = searchParams.get('tag') || ''
  const activeApp = searchParams.get('app') || ''
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')
  const debouncedSearch = useDebounce(searchInput, 300)

  // Fetch categories and tags on mount
  useEffect(() => {
    async function fetchFilters() {
      try {
        const [categoriesData, tagsData] = await Promise.all([
          getCategories(),
          getTags()
        ])
        setCategories(categoriesData || [])
        // Get top 10 tags by post count
        const sortedTags = (tagsData || [])
          .sort((a, b) => (b.post_count || 0) - (a.post_count || 0))
          .slice(0, 10)
        setTags(sortedTags)
      } catch (err) {
        console.error('Error fetching filters:', err)
      }
    }
    fetchFilters()
  }, [])

  // Fetch posts when filters change
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const data = await getBlogPosts({
          category: activeCategory || undefined,
          tag: activeTag || undefined,
          app: activeApp || undefined,
          search: debouncedSearch || undefined
        })
        setPosts(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching blog posts:', err)
        setError('Unable to load blog posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [activeCategory, activeTag, activeApp, debouncedSearch])

  // Update URL when search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedSearch) {
      params.set('search', debouncedSearch)
    } else {
      params.delete('search')
    }
    setSearchParams(params, { replace: true })
  }, [debouncedSearch])

  // Filter handlers
  const setCategory = useCallback((slug) => {
    const params = new URLSearchParams(searchParams)
    if (slug) {
      params.set('category', slug)
    } else {
      params.delete('category')
    }
    setSearchParams(params)
  }, [searchParams, setSearchParams])

  const setTag = useCallback((slug) => {
    const params = new URLSearchParams(searchParams)
    if (slug) {
      params.set('tag', slug)
    } else {
      params.delete('tag')
    }
    setSearchParams(params)
  }, [searchParams, setSearchParams])

  const clearFilters = useCallback(() => {
    setSearchInput('')
    setSearchParams({})
  }, [setSearchParams])

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const hasActiveFilters = activeCategory || activeTag || activeApp || debouncedSearch

  // Refs for scroll-triggered animations
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  // In-view detection
  const headerInView = useInView(headerRef, { once: true, margin: '-50px' })
  const gridInView = useInView(gridRef, { once: true, margin: '-100px' })

  // Get app display name
  const getAppDisplayName = (appName) => {
    const names = {
      'shellist': 'Shellist',
      'polamoment': 'PolaMoment'
    }
    return names[appName] || appName
  }

  // Loading state with skeleton loaders (only show on initial load)
  if (loading && posts.length === 0) {
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
        <div className="blog-grid blog-skeleton-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
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

      <div className="blog-header" ref={headerRef}>
        <motion.h1
          className="blog-title"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Blog
        </motion.h1>
        <motion.p
          className="blog-subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Thoughts, updates, and stories from islander Studio
        </motion.p>
      </div>

      {/* Search and Filters */}
      <div className="blog-filters">
        {/* Search Input */}
        <div className="blog-search">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
            aria-label="Search blog posts"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="search-clear"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        {categories.length > 0 && (
          <div className="filter-section">
            <span className="filter-label">Categories:</span>
            <div className="filter-pills">
              <button
                onClick={() => setCategory('')}
                className={`filter-pill ${!activeCategory ? 'active' : ''}`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.slug)}
                  className={`filter-pill ${activeCategory === cat.slug ? 'active' : ''}`}
                  style={activeCategory === cat.slug && cat.color ? { backgroundColor: cat.color, borderColor: cat.color } : {}}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tag Pills */}
        {tags.length > 0 && (
          <div className="filter-section">
            <span className="filter-label">Tags:</span>
            <div className="filter-pills">
              {activeTag && (
                <button
                  onClick={() => setTag('')}
                  className="filter-pill clear-tag"
                >
                  <X size={14} /> {activeTag}
                </button>
              )}
              {tags.filter(t => t.slug !== activeTag).map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setTag(tag.slug)}
                  className={`filter-pill tag-pill ${activeTag === tag.slug ? 'active' : ''}`}
                >
                  #{tag.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* App filter indicator */}
        {activeApp && (
          <div className="app-filter-banner">
            <span>Showing posts related to <strong>{getAppDisplayName(activeApp)}</strong></span>
            <button onClick={clearFilters} className="clear-app-filter">
              <X size={14} /> Clear
            </button>
          </div>
        )}

        {/* Active filters summary */}
        {hasActiveFilters && !activeApp && (
          <div className="active-filters">
            <span className="active-filters-label">
              Showing {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              {debouncedSearch && ` matching "${debouncedSearch}"`}
            </span>
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="blog-empty">
          <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Oops!</p>
          <p>{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!error && !loading && posts.length === 0 && (
        <div className="blog-empty">
          {hasActiveFilters ? (
            <>
              <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>No posts found</p>
              <p>Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="btn-clear-filters">
                Clear filters
              </button>
            </>
          ) : (
            <>
              <p style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>Coming Soon</p>
              <p>We're preparing something special. Check back soon for updates, stories, and insights from islander Studio.</p>
            </>
          )}
        </div>
      )}

      {/* Posts Grid */}
      {posts.length > 0 && (
        <div className="blog-grid" ref={gridRef}>
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.05 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
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
                    {post.readingTime && (
                      <>
                        <span className="meta-dot">·</span>
                        <span className="blog-card-reading-time">
                          {formatReadingTime(post.readingTime)}
                        </span>
                      </>
                    )}
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
                  <div className="blog-card-footer">
                    {post.authorName && (
                      <span className="blog-card-author">by {post.authorName}</span>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="blog-card-tags">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="blog-card-tag">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Loading indicator for filter changes */}
      {loading && posts.length > 0 && (
        <div className="blog-loading-overlay">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}
