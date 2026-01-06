import { useState, useEffect } from 'react'
import './ContentManager.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export default function TagManager() {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTag, setEditingTag] = useState(null)
  const [formData, setFormData] = useState({
    title: ''
  })

  useEffect(() => {
    fetchTags()
  }, [])

  async function fetchTags() {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/tags`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch tags')
      }

      const data = await response.json()
      setTags(data.tags || [])
    } catch (error) {
      console.error('Error fetching tags:', error)
      alert('Failed to load tags')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const token = localStorage.getItem('admin_token')

      // Generate slug from title
      const slug = formData.title.toLowerCase().replace(/\s+/g, '-')

      const url = editingTag
        ? `${API_URL}/api/tags/${editingTag.id}`
        : `${API_URL}/api/tags`

      const response = await fetch(url, {
        method: editingTag ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          slug: slug
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save tag')
      }

      setFormData({ title: '' })
      setShowForm(false)
      setEditingTag(null)
      fetchTags()
      alert(editingTag ? 'Tag updated successfully!' : 'Tag created successfully!')
    } catch (error) {
      console.error('Error saving tag:', error)
      alert('Failed to save tag')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this tag?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/tags/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete tag')
      }

      fetchTags()
      alert('Tag deleted successfully!')
    } catch (error) {
      console.error('Error deleting tag:', error)
      alert('Failed to delete tag')
    }
  }

  function handleEdit(tag) {
    setFormData({
      title: tag.title
    })
    setEditingTag(tag)
    setShowForm(true)
  }

  function handleCancel() {
    setFormData({ title: '' })
    setEditingTag(null)
    setShowForm(false)
  }

  if (loading) {
    return <div className="loading">Loading tags...</div>
  }

  return (
    <div className="content-manager">
      <div className="manager-header">
        <h2>Tags</h2>
        <button onClick={() => setShowForm(!showForm)} className="add-btn">
          {showForm ? 'Cancel' : '+ New Tag'}
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
              placeholder="e.g., React, TypeScript, Web Development"
            />
          </div>

          <button type="submit" className="submit-btn">
            {editingTag ? 'Update Tag' : 'Create Tag'}
          </button>
          {editingTag && (
            <button type="button" onClick={handleCancel} className="cancel-btn" style={{ marginLeft: '1rem' }}>
              Cancel
            </button>
          )}
        </form>
      )}

      <div className="content-list">
        {tags.length === 0 ? (
          <p className="empty-state">No tags yet. Create your first tag!</p>
        ) : (
          tags.map((tag) => (
            <div key={tag.id} className="content-item">
              <div className="item-info">
                <h3>{tag.title}</h3>
                <p className="post-meta">Slug: {tag.slug}</p>
              </div>
              <div className="item-actions">
                <button
                  onClick={() => handleEdit(tag)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tag.id)}
                  className="delete-btn"
                >
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
