import { useState, useEffect } from 'react'
import { client } from '../../lib/sanity'
import './ContentManager.css'

export default function PostManager() {
  const [posts, setPosts] = useState([])
  const [authors, setAuthors] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    body: '',
    authorId: '',
    categoryIds: [],
    publishedAt: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [postsData, authorsData, categoriesData] = await Promise.all([
        client.fetch('*[_type == "post"] | order(publishedAt desc) { ..., "authorName": author->name }'),
        client.fetch('*[_type == "author"] | order(name asc)'),
        client.fetch('*[_type == "category"] | order(title asc)')
      ])
      setPosts(postsData)
      setAuthors(authorsData)
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!formData.authorId) {
      alert('Please select an author')
      return
    }

    try {
      const newPost = {
        _type: 'post',
        title: formData.title,
        slug: {
          _type: 'slug',
          current: formData.title.toLowerCase().replace(/\s+/g, '-')
        },
        excerpt: formData.excerpt,
        body: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: formData.body
              }
            ]
          }
        ],
        author: {
          _type: 'reference',
          _ref: formData.authorId
        },
        categories: formData.categoryIds.map(id => ({
          _type: 'reference',
          _ref: id
        })),
        publishedAt: new Date(formData.publishedAt).toISOString()
      }

      await client.create(newPost)

      setFormData({
        title: '',
        excerpt: '',
        body: '',
        authorId: '',
        categoryIds: [],
        publishedAt: new Date().toISOString().split('T')[0]
      })
      setShowForm(false)
      fetchData()
      alert('Post created successfully!')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post. Check console for details.')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      await client.delete(id)
      fetchData()
      alert('Post deleted successfully!')
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post.')
    }
  }

  function handleCategoryToggle(categoryId) {
    setFormData(prev => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter(id => id !== categoryId)
        : [...prev.categoryIds, categoryId]
    }))
  }

  if (loading) {
    return <div className="loading">Loading posts...</div>
  }

  return (
    <div className="content-manager">
      <div className="manager-header">
        <h2>Blog Posts</h2>
        <button onClick={() => setShowForm(!showForm)} className="add-btn">
          {showForm ? 'Cancel' : '+ New Post'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="content-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt *</label>
            <textarea
              id="excerpt"
              rows="3"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Short description of the post"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="body">Content *</label>
            <textarea
              id="body"
              rows="10"
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              placeholder="Write your blog post content here..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author *</label>
            <select
              id="author"
              value={formData.authorId}
              onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
              required
            >
              <option value="">Select an author</option>
              {authors.map(author => (
                <option key={author._id} value={author._id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Categories</label>
            <div className="checkbox-group">
              {categories.map(category => (
                <label key={category._id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.categoryIds.includes(category._id)}
                    onChange={() => handleCategoryToggle(category._id)}
                  />
                  {category.title}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="publishedAt">Publish Date *</label>
            <input
              type="date"
              id="publishedAt"
              value={formData.publishedAt}
              onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Create Post</button>
        </form>
      )}

      <div className="content-list">
        {posts.length === 0 ? (
          <p className="empty-state">No posts yet. Create your first post!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="content-item">
              <div className="item-info">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="post-meta">
                  <span>By {post.authorName}</span>
                  {post.publishedAt && (
                    <span> • {new Date(post.publishedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDelete(post._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
