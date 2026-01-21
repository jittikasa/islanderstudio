import { useState, useEffect } from 'react'
import ColorPicker from './ColorPicker'
import './ContentManager.css'
import './CategoryManager.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export default function CategoryManager() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    color: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }

      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      alert('Failed to load categories')
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

      const url = editingCategory
        ? `${API_URL}/api/categories/${editingCategory.id}`
        : `${API_URL}/api/categories`

      const response = await fetch(url, {
        method: editingCategory ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          slug: slug,
          description: formData.description,
          color: formData.color || null
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save category')
      }

      setFormData({ title: '', description: '', color: '' })
      setShowForm(false)
      setEditingCategory(null)
      fetchCategories()
      alert(editingCategory ? 'Category updated successfully!' : 'Category created successfully!')
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Failed to save category')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete category')
      }

      fetchCategories()
      alert('Category deleted successfully!')
    } catch (error) {
      console.error('Error deleting category:', error)
      alert(error.message || 'Failed to delete category')
    }
  }

  function handleEdit(category) {
    setFormData({
      title: category.title,
      description: category.description || '',
      color: category.color || ''
    })
    setEditingCategory(category)
    setShowForm(true)
  }

  function handleCancel() {
    setFormData({ title: '', description: '', color: '' })
    setEditingCategory(null)
    setShowForm(false)
  }

  if (loading) {
    return <div className="loading">Loading categories...</div>
  }

  return (
    <div className="content-manager category-manager">
      <div className="manager-header">
        <h2>Categories</h2>
        <button onClick={() => setShowForm(!showForm)} className="add-btn">
          {showForm ? 'Cancel' : '+ New Category'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="content-form">
          <div className="form-row">
            <div className="form-group form-group--flex">
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
              <ColorPicker
                value={formData.color}
                onChange={(color) => setFormData({ ...formData, color })}
                label="Color"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button type="submit" className="submit-btn">
            {editingCategory ? 'Update Category' : 'Create Category'}
          </button>
          {editingCategory && (
            <button type="button" onClick={handleCancel} className="cancel-btn" style={{ marginLeft: '1rem' }}>
              Cancel
            </button>
          )}
        </form>
      )}

      <div className="content-list">
        {categories.length === 0 ? (
          <p className="empty-state">No categories yet. Create your first category!</p>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="content-item category-item">
              {category.color && (
                <span
                  className="category-color-indicator"
                  style={{ backgroundColor: category.color }}
                />
              )}
              <div className="item-info">
                <h3>{category.title}</h3>
                {category.description && <p>{category.description}</p>}
                <p className="post-meta">
                  <span className="category-slug">/{category.slug}</span>
                  {category.color && (
                    <span className="category-color-value">{category.color}</span>
                  )}
                </p>
              </div>
              <div className="item-actions">
                <button
                  onClick={() => handleEdit(category)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
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
