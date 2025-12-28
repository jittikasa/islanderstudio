import { useState, useEffect } from 'react'
import { client } from '../../lib/sanity'
import './ContentManager.css'

export default function CategoryManager() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const data = await client.fetch('*[_type == "category"] | order(title asc)')
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const newCategory = {
        _type: 'category',
        title: formData.title,
        slug: {
          _type: 'slug',
          current: formData.title.toLowerCase().replace(/\s+/g, '-')
        },
        description: formData.description
      }

      await client.create(newCategory)

      setFormData({ title: '', description: '' })
      setShowForm(false)
      fetchCategories()
      alert('Category created successfully!')
    } catch (error) {
      console.error('Error creating category:', error)
      alert('Failed to create category. Check console for details.')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      await client.delete(id)
      fetchCategories()
      alert('Category deleted successfully!')
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Failed to delete category.')
    }
  }

  if (loading) {
    return <div className="loading">Loading categories...</div>
  }

  return (
    <div className="content-manager">
      <div className="manager-header">
        <h2>Categories</h2>
        <button onClick={() => setShowForm(!showForm)} className="add-btn">
          {showForm ? 'Cancel' : '+ New Category'}
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
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button type="submit" className="submit-btn">Create Category</button>
        </form>
      )}

      <div className="content-list">
        {categories.length === 0 ? (
          <p className="empty-state">No categories yet. Create your first category!</p>
        ) : (
          categories.map((category) => (
            <div key={category._id} className="content-item">
              <div className="item-info">
                <h3>{category.title}</h3>
                {category.description && <p>{category.description}</p>}
              </div>
              <button
                onClick={() => handleDelete(category._id)}
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
