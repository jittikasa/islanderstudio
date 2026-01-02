import { useState, useEffect } from 'react'
import './MediaLibrary.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export default function MediaLibrary({ onSelect, showSelectButton = false }) {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    fetchMedia()
  }, [])

  async function fetchMedia() {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/media`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch media')
      }

      const data = await response.json()
      setMedia(data.media || [])
    } catch (error) {
      console.error('Error fetching media:', error)
      alert('Failed to load media library')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    setUploading(true)

    try {
      const token = localStorage.getItem('admin_token')
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`${API_URL}/api/media`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()

      // Add new media to the list
      setMedia([data.media, ...media])
      alert('Image uploaded successfully!')

      // Reset file input
      e.target.value = ''
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_URL}/api/media/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete image')
      }

      // Remove from list
      setMedia(media.filter(m => m.id !== id))
      if (selectedImage?.id === id) {
        setSelectedImage(null)
      }
      alert('Image deleted successfully!')
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Failed to delete image')
    }
  }

  function handleImageClick(image) {
    setSelectedImage(selectedImage?.id === image.id ? null : image)
  }

  function handleSelectImage() {
    if (selectedImage && onSelect) {
      onSelect(selectedImage)
    }
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  if (loading) {
    return <div className="loading">Loading media library...</div>
  }

  return (
    <div className="media-library">
      <div className="media-header">
        <h2>Media Library</h2>
        <div className="upload-section">
          <label htmlFor="file-upload" className="upload-btn">
            {uploading ? 'Uploading...' : '+ Upload Image'}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {showSelectButton && selectedImage && (
        <div className="selection-bar">
          <div className="selection-info">
            <img src={selectedImage.url} alt={selectedImage.filename} className="selection-thumbnail" />
            <span>{selectedImage.filename}</span>
          </div>
          <button onClick={handleSelectImage} className="select-btn">
            Use Selected Image
          </button>
        </div>
      )}

      <div className="media-grid">
        {media.length === 0 ? (
          <div className="empty-state">
            <p>No images yet. Upload your first image!</p>
          </div>
        ) : (
          media.map((image) => (
            <div
              key={image.id}
              className={`media-item ${selectedImage?.id === image.id ? 'selected' : ''}`}
              onClick={() => handleImageClick(image)}
            >
              <div className="media-image-container">
                <img src={image.url} alt={image.alt_text || image.filename} />
              </div>
              <div className="media-info">
                <div className="media-filename" title={image.filename}>
                  {image.filename}
                </div>
                <div className="media-meta">
                  {formatFileSize(image.size)}
                  {image.width && image.height && ` • ${image.width}×${image.height}`}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(image.id)
                }}
                className="delete-media-btn"
                title="Delete image"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
