import { useState, useEffect } from 'react'
import { client } from '../../lib/sanity'
import './ContentManager.css'

export default function AuthorManager() {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    bio: ''
  })

  useEffect(() => {
    fetchAuthors()
  }, [])

  async function fetchAuthors() {
    try {
      const data = await client.fetch('*[_type == "author"] | order(name asc)')
      setAuthors(data)
    } catch (error) {
      console.error('Error fetching authors:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const newAuthor = {
        _type: 'author',
        name: formData.name,
        slug: {
          _type: 'slug',
          current: formData.name.toLowerCase().replace(/\s+/g, '-')
        },
        bio: formData.bio
      }

      await client.create(newAuthor)

      setFormData({ name: '', bio: '' })
      setShowForm(false)
      fetchAuthors()
      alert('Author created successfully!')
    } catch (error) {
      console.error('Error creating author:', error)
      alert('Failed to create author. Check console for details.')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this author?')) return

    try {
      await client.delete(id)
      fetchAuthors()
      alert('Author deleted successfully!')
    } catch (error) {
      console.error('Error deleting author:', error)
      alert('Failed to delete author.')
    }
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              rows="4"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <button type="submit" className="submit-btn">Create Author</button>
        </form>
      )}

      <div className="content-list">
        {authors.length === 0 ? (
          <p className="empty-state">No authors yet. Create your first author!</p>
        ) : (
          authors.map((author) => (
            <div key={author._id} className="content-item">
              <div className="item-info">
                <h3>{author.name}</h3>
                {author.bio && <p>{author.bio}</p>}
              </div>
              <button
                onClick={() => handleDelete(author._id)}
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
