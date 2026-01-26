import { useState, useEffect } from 'react'
import { Trash2, GitMerge, X } from 'lucide-react'
import { mergeTags, bulkDeleteTags } from '../../lib/api'
import { API_URL } from '../../lib/config'
import './ContentManager.css'
import './TagManager.css'

export default function TagManager() {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTag, setEditingTag] = useState(null)
  const [formData, setFormData] = useState({
    title: ''
  })

  // Selection and merge state
  const [selectedTags, setSelectedTags] = useState([])
  const [showMergeModal, setShowMergeModal] = useState(false)
  const [mergeTargetId, setMergeTargetId] = useState('')
  const [isMerging, setIsMerging] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete tag')
      }

      fetchTags()
      alert('Tag deleted successfully!')
    } catch (error) {
      console.error('Error deleting tag:', error)
      alert(error.message || 'Failed to delete tag')
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

  // Selection handlers
  function toggleTagSelection(tagId) {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  function selectAllTags() {
    if (selectedTags.length === tags.length) {
      setSelectedTags([])
    } else {
      setSelectedTags(tags.map(t => t.id))
    }
  }

  function clearSelection() {
    setSelectedTags([])
    setMergeTargetId('')
  }

  // Merge handlers
  function openMergeModal() {
    if (selectedTags.length < 2) {
      alert('Select at least 2 tags to merge')
      return
    }
    setMergeTargetId(selectedTags[0])
    setShowMergeModal(true)
  }

  async function handleMerge() {
    if (!mergeTargetId) {
      alert('Please select a target tag')
      return
    }

    setIsMerging(true)
    try {
      const result = await mergeTags(selectedTags, mergeTargetId)
      alert(`Successfully merged ${result.mergedCount} tag(s)`)
      setShowMergeModal(false)
      clearSelection()
      fetchTags()
    } catch (error) {
      console.error('Error merging tags:', error)
      alert(error.message || 'Failed to merge tags')
    } finally {
      setIsMerging(false)
    }
  }

  // Bulk delete handlers
  async function handleBulkDeleteUnused() {
    const unusedTags = tags.filter(t => t.post_count === 0)
    if (unusedTags.length === 0) {
      alert('No unused tags to delete')
      return
    }

    if (!confirm(`Delete ${unusedTags.length} unused tag(s)? This cannot be undone.`)) {
      return
    }

    setIsDeleting(true)
    try {
      const result = await bulkDeleteTags({ unusedOnly: true })
      alert(`Deleted ${result.deletedCount} unused tag(s)`)
      clearSelection()
      fetchTags()
    } catch (error) {
      console.error('Error deleting tags:', error)
      alert(error.message || 'Failed to delete tags')
    } finally {
      setIsDeleting(false)
    }
  }

  async function handleBulkDeleteSelected() {
    const selectedUnused = selectedTags.filter(id => {
      const tag = tags.find(t => t.id === id)
      return tag && tag.post_count === 0
    })

    if (selectedUnused.length === 0) {
      alert('No selected tags can be deleted (all are in use)')
      return
    }

    const usedCount = selectedTags.length - selectedUnused.length
    const message = usedCount > 0
      ? `Delete ${selectedUnused.length} unused tag(s)? (${usedCount} in-use tag(s) will be skipped)`
      : `Delete ${selectedUnused.length} tag(s)?`

    if (!confirm(message + ' This cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    try {
      const result = await bulkDeleteTags({ tagIds: selectedTags })
      let msg = `Deleted ${result.deletedCount} tag(s)`
      if (result.skippedTags && result.skippedTags.length > 0) {
        msg += `. Skipped (in use): ${result.skippedTags.join(', ')}`
      }
      alert(msg)
      clearSelection()
      fetchTags()
    } catch (error) {
      console.error('Error deleting tags:', error)
      alert(error.message || 'Failed to delete tags')
    } finally {
      setIsDeleting(false)
    }
  }

  const unusedCount = tags.filter(t => t.post_count === 0).length
  const selectedUnusedCount = selectedTags.filter(id => {
    const tag = tags.find(t => t.id === id)
    return tag && tag.post_count === 0
  }).length

  if (loading) {
    return <div className="loading">Loading tags...</div>
  }

  return (
    <div className="content-manager tag-manager">
      <div className="manager-header">
        <h2>Tags</h2>
        <div className="header-actions">
          {unusedCount > 0 && (
            <button
              onClick={handleBulkDeleteUnused}
              className="delete-unused-btn"
              disabled={isDeleting}
            >
              <Trash2 size={16} />
              Delete {unusedCount} Unused
            </button>
          )}
          <button onClick={() => setShowForm(!showForm)} className="add-btn">
            {showForm ? 'Cancel' : '+ New Tag'}
          </button>
        </div>
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

      {/* Selection Actions Bar */}
      {selectedTags.length > 0 && (
        <div className="selection-bar">
          <span className="selection-count">
            {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
          </span>
          <div className="selection-actions">
            <button
              onClick={openMergeModal}
              className="action-btn merge-btn"
              disabled={selectedTags.length < 2}
            >
              <GitMerge size={16} />
              Merge
            </button>
            <button
              onClick={handleBulkDeleteSelected}
              className="action-btn delete-btn"
              disabled={isDeleting || selectedUnusedCount === 0}
            >
              <Trash2 size={16} />
              Delete ({selectedUnusedCount})
            </button>
            <button onClick={clearSelection} className="action-btn clear-btn">
              <X size={16} />
              Clear
            </button>
          </div>
        </div>
      )}

      <div className="content-list">
        {tags.length === 0 ? (
          <p className="empty-state">No tags yet. Create your first tag!</p>
        ) : (
          <>
            <div className="list-header">
              <label className="select-all">
                <input
                  type="checkbox"
                  checked={selectedTags.length === tags.length && tags.length > 0}
                  onChange={selectAllTags}
                />
                <span>Select all</span>
              </label>
            </div>
            {tags.map((tag) => (
              <div
                key={tag.id}
                className={`content-item tag-item ${selectedTags.includes(tag.id) ? 'selected' : ''}`}
              >
                <label className="tag-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => toggleTagSelection(tag.id)}
                  />
                </label>
                <div className="item-info">
                  <h3>{tag.title}</h3>
                  <p className="post-meta">
                    <span className="tag-slug">/{tag.slug}</span>
                    <span className={`tag-count ${tag.post_count === 0 ? 'unused' : ''}`}>
                      {tag.post_count} post{tag.post_count !== 1 ? 's' : ''}
                    </span>
                  </p>
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
                    disabled={tag.post_count > 0}
                    title={tag.post_count > 0 ? 'Cannot delete: tag is in use' : 'Delete tag'}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Merge Modal */}
      {showMergeModal && (
        <div className="modal-overlay" onClick={() => setShowMergeModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Merge Tags</h3>
              <button onClick={() => setShowMergeModal(false)} className="modal-close">
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p>Merge {selectedTags.length} tags into one. All posts will be updated to use the target tag.</p>

              <div className="form-group">
                <label>Target Tag (will be kept)</label>
                <select
                  value={mergeTargetId}
                  onChange={(e) => setMergeTargetId(e.target.value)}
                  className="merge-select"
                >
                  {selectedTags.map(id => {
                    const tag = tags.find(t => t.id === id)
                    return (
                      <option key={id} value={id}>
                        {tag?.title} ({tag?.post_count} posts)
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className="merge-preview">
                <p className="merge-preview-label">Tags to merge (will be deleted):</p>
                <ul className="merge-source-list">
                  {selectedTags
                    .filter(id => id !== mergeTargetId)
                    .map(id => {
                      const tag = tags.find(t => t.id === id)
                      return (
                        <li key={id}>
                          {tag?.title} <span className="tag-count">({tag?.post_count} posts)</span>
                        </li>
                      )
                    })}
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setShowMergeModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleMerge}
                className="submit-btn"
                disabled={isMerging}
              >
                {isMerging ? 'Merging...' : 'Merge Tags'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
