import { useState, useEffect } from 'react'
import PostEditor from './PostEditor'
import { useToast } from '../../contexts/ToastContext'
import './ContentManager.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export default function PostManager({ initialAction, onActionComplete }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showEditor, setShowEditor] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [filter, setFilter] = useState('all') // all, draft, published
  const toast = useToast()

  // Handle initial action from dashboard quick actions
  useEffect(() => {
    if (initialAction === 'new') {
      setShowEditor(true)
      setEditingPost(null)
      if (onActionComplete) {
        onActionComplete()
      }
    }
  }, [initialAction, onActionComplete])

  useEffect(() => {
    fetchPosts()
  }, [filter])

  async function fetchPosts() {
    try {
      const token = localStorage.getItem('admin_token')
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      const filterParam = filter !== 'all' ? `?status=${filter}` : ''
      const response = await fetch(`${API_URL}/api/posts${filterParam}`, { headers })

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(postData) {
    try {
      const token = localStorage.getItem('admin_token')
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      // Transform snake_case to camelCase for API
      const apiData = {
        title: postData.title,
        slug: postData.slug,
        excerpt: postData.excerpt,
        body: postData.body,
        authorId: postData.author_id,
        categories: postData.category_ids,
        tags: postData.tag_ids,
        relatedApps: postData.app_ids,
        mainImageUrl: postData.main_image_url,
        mainImageAlt: postData.main_image_alt,
        featured: postData.featured,
        contentStatus: postData.content_status,
        publishedAt: postData.published_at,
        seo: {
          metaTitle: postData.seo_meta_title,
          metaDescription: postData.seo_meta_description,
          focusKeyword: postData.seo_focus_keyword,
          keywords: postData.seo_additional_keywords,
          canonicalUrl: postData.seo_canonical_url,
          ogTitle: postData.seo_og_title,
          ogDescription: postData.seo_og_description,
          ogImageUrl: postData.seo_og_image_url,
          ogType: postData.seo_og_type,
          noIndex: postData.seo_hide_from_search,
        }
      }

      const url = editingPost
        ? `${API_URL}/api/posts/${editingPost.id}`
        : `${API_URL}/api/posts`

      const method = editingPost ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(apiData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save post')
      }

      toast.success(editingPost ? 'Post updated successfully!' : 'Post created successfully!')
      setShowEditor(false)
      setEditingPost(null)
      fetchPosts()
    } catch (error) {
      toast.error(error.message || 'Failed to save post')
    }
  }

  async function handleDelete(post) {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) {
      return
    }

    try {
      const token = localStorage.getItem('admin_token')
      const headers = {
        'Authorization': `Bearer ${token}`
      }

      const response = await fetch(`${API_URL}/api/posts/${post.id}`, {
        method: 'DELETE',
        headers
      })

      if (!response.ok) {
        throw new Error('Failed to delete post')
      }

      toast.success('Post deleted successfully!')
      fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    }
  }

  function handleEdit(post) {
    setEditingPost(post)
    setShowEditor(true)
  }

  function handleCancel() {
    setShowEditor(false)
    setEditingPost(null)
  }

  if (loading) {
    return <div className="loading">Loading posts...</div>
  }

  if (showEditor) {
    return (
      <PostEditor
        post={editingPost}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    )
  }

  return (
    <div className="content-manager">
      <div className="manager-header">
        <h2>Blog Posts</h2>
        <div className="header-actions">
          <div className="filter-buttons">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={filter === 'draft' ? 'active' : ''}
              onClick={() => setFilter('draft')}
            >
              Drafts
            </button>
            <button
              className={filter === 'published' ? 'active' : ''}
              onClick={() => setFilter('published')}
            >
              Published
            </button>
          </div>
          <button
            onClick={() => setShowEditor(true)}
            className="add-btn"
          >
            + New Post
          </button>
        </div>
      </div>

      <div className="content-list">
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts found. Create your first post!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="content-item content-item--with-image">
              {post.main_image_url && (
                <div className="item-thumbnail">
                  <img src={post.main_image_url} alt={post.main_image_alt || post.title} />
                </div>
              )}
              <div className="item-info">
                <div className="item-header">
                  <h3>{post.title}</h3>
                  <span className={`status-badge status-${post.content_status}`}>
                    {post.content_status}
                  </span>
                </div>
                <p className="excerpt">{post.excerpt}</p>
                <div className="post-meta">
                  <span>By {post.author_name || 'Unknown'}</span>
                  {post.published_at && (
                    <span> • {new Date(post.published_at).toLocaleDateString()}</span>
                  )}
                  {post.reading_time && (
                    <span> • {post.reading_time} min read</span>
                  )}
                  {post.featured && (
                    <span className="featured-badge">⭐ Featured</span>
                  )}
                </div>
                {post.categories && post.categories.length > 0 && (
                  <div className="post-tags">
                    {post.categories.map(cat => (
                      <span key={cat} className="tag">{cat}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="item-actions">
                <button
                  onClick={() => handleEdit(post)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {posts.length > 0 && (
        <div className="list-footer">
          <p>Showing {posts.length} post{posts.length !== 1 ? 's' : ''}</p>
        </div>
      )}
    </div>
  )
}
