import { useState, useEffect } from 'react'
import { API_URL } from '../../lib/config'
import './ContentManager.css'

export default function AppManager() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingApp, setEditingApp] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    displayName: '',
    description: '',
    url: '',
    iconUrl: '',
    color: ''
  })

  useEffect(() => {
    fetchApps()
  }, [])

  async function fetchApps() {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/apps`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch apps')
      }

      const data = await response.json()
      setApps(data.apps || [])
    } catch (error) {
      console.error('Error fetching apps:', error)
      alert('Failed to load apps')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const token = localStorage.getItem('admin_token')

      const url = editingApp
        ? `${API_URL}/api/apps/${editingApp.id}`
        : `${API_URL}/api/apps`

      const response = await fetch(url, {
        method: editingApp ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save app')
      }

      resetForm()
      fetchApps()
      alert(editingApp ? 'App updated successfully!' : 'App created successfully!')
    } catch (error) {
      console.error('Error saving app:', error)
      alert(error.message || 'Failed to save app')
    }
  }

  async function handleDelete(app) {
    if (!confirm(`Are you sure you want to delete "${app.display_name}"?`)) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/apps/${app.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete app')
      }

      fetchApps()
      alert('App deleted successfully!')
    } catch (error) {
      console.error('Error deleting app:', error)
      alert(error.message || 'Failed to delete app')
    }
  }

  function handleEdit(app) {
    setFormData({
      name: app.name || '',
      displayName: app.display_name || '',
      description: app.description || '',
      url: app.url || '',
      iconUrl: app.icon_url || '',
      color: app.color || ''
    })
    setEditingApp(app)
    setShowForm(true)
  }

  function resetForm() {
    setFormData({
      name: '',
      displayName: '',
      description: '',
      url: '',
      iconUrl: '',
      color: ''
    })
    setEditingApp(null)
    setShowForm(false)
  }

  if (loading) {
    return <div className="loading">Loading apps...</div>
  }

  return (
    <div className="content-manager">
      <div className="manager-header">
        <h2>Apps</h2>
        <button onClick={() => setShowForm(!showForm)} className="add-btn">
          {showForm ? 'Cancel' : '+ New App'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="content-form">
          <div className="form-group">
            <label htmlFor="name">Internal Name * (lowercase, no spaces)</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
              required
              placeholder="e.g., shellist, polamoment"
            />
            <small>Used in URLs and code references</small>
          </div>

          <div className="form-group">
            <label htmlFor="displayName">Display Name *</label>
            <input
              type="text"
              id="displayName"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              required
              placeholder="e.g., Shellist, PolaMoment"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the app"
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">Landing Page URL</label>
            <input
              type="url"
              id="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://islanderstudio.app/shellist"
            />
          </div>

          <div className="form-group">
            <label htmlFor="iconUrl">Icon URL</label>
            <input
              type="url"
              id="iconUrl"
              value={formData.iconUrl}
              onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
              placeholder="https://example.com/app-icon.png"
            />
          </div>

          <div className="form-group">
            <label htmlFor="color">Brand Color</label>
            <input
              type="text"
              id="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              placeholder="#FF5733 or rgb(255, 87, 51)"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={resetForm} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {editingApp ? 'Update App' : 'Create App'}
            </button>
          </div>
        </form>
      )}

      <div className="content-list">
        {apps.length === 0 ? (
          <p className="empty-state">No apps yet. Create your first app!</p>
        ) : (
          apps.map((app) => (
            <div key={app.id} className="content-item">
              <div className="item-info">
                <h3>{app.display_name}</h3>
                <p className="post-meta">Internal name: {app.name}</p>
                {app.description && <p>{app.description}</p>}
                {app.url && (
                  <p className="post-meta">
                    URL: <a href={app.url} target="_blank" rel="noopener noreferrer">{app.url}</a>
                  </p>
                )}
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(app)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(app)} className="delete-btn">
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
