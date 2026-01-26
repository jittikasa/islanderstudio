import { useState, useEffect } from 'react'
import { API_URL } from '../../lib/config'
import './ContentManager.css'

export default function AuthorManager() {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    email: '',
    image_url: ''
  })

  useEffect(() => {
    fetchAuthors()
  }, [])

  useEffect(() => {
    if (editingAuthor) {
      setFormData({
        name: editingAuthor.name || '',
        bio: editingAuthor.bio || '',
        email: editingAuthor.email || '',
        image_url: editingAuthor.image_url || ''
      })
      setShowForm(true)
    }
  }, [editingAuthor])

  async function fetchAuthors() {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/authors`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch authors')
      }

      const data = await response.json()
      setAuthors(data.authors || [])
    } catch (error) {
      console.error('Error fetching authors:', error)
      alert('Failed to load authors')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const token = localStorage.getItem('admin_token')
      const url = editingAuthor
        ? `${API_URL}/api/authors/${editingAuthor.id}`
        : `${API_URL}/api/authors`

      const response = await fetch(url, {
        method: editingAuthor ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to save author')
      }

      setFormData({ name: '', bio: '', email: '', image_url: '' })
      setShowForm(false)
      setEditingAuthor(null)
      fetchAuthors()
      alert(editingAuthor ? 'Author updated successfully!' : 'Author created successfully!')
    } catch (error) {
      console.error('Error saving author:', error)
      alert('Failed to save author')
    }
  }

  async function handleDelete(author) {
    if (!confirm(`Are you sure you want to delete "${author.name}"?`)) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/authors/${author.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete author')
      }

      fetchAuthors()
      alert('Author deleted successfully!')
    } catch (error) {
      console.error('Error deleting author:', error)
      alert('Failed to delete author')
    }
  }

  function handleEdit(author) {
    setEditingAuthor(author)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingAuthor(null)
    setFormData({ name: '', bio: '', email: '', image_url: '' })
  }

  if (loading) {
    return <div className="loading">Loading authors...</div>
  }

  return (
    <div className="content-manager">
      <div className="manager-header">
        <h2>Authors</h2>
        <button onClick={() => setShowForm(!showForm)} className="add-btn">
          {showForm ? 'Cancel' : '+ New Author'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="content-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Author name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="author@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              rows="4"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Short bio about the author"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image_url">Profile Image URL</label>
            <input
              type="url"
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://example.com/profile.jpg"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {editingAuthor ? 'Update Author' : 'Create Author'}
            </button>
          </div>
        </form>
      )}

      <div className="content-list">
        {authors.length === 0 ? (
          <p className="empty-state">No authors yet. Create your first author!</p>
        ) : (
          authors.map((author) => (
            <div key={author.id} className="content-item">
              <div className="item-info">
                <h3>{author.name}</h3>
                {author.email && <p className="author-email">{author.email}</p>}
                {author.bio && <p>{author.bio}</p>}
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(author)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(author)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
