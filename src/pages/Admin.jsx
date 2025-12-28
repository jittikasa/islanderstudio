import { useEffect, useState } from 'react'
import './Admin.css'

export default function Admin() {
  const [studioUrl, setStudioUrl] = useState('')

  useEffect(() => {
    // Try localhost first (if studio is running locally)
    // Otherwise use Sanity's manage interface
    const localStudio = 'http://localhost:3333'
    const manageSanity = 'https://sanity.io/manage/personal/project/8hngvmaz'

    // Check if local studio is running
    fetch(localStudio)
      .then(() => setStudioUrl(localStudio))
      .catch(() => setStudioUrl(manageSanity))
  }, [])

  return (
    <div className="admin-wrapper">
      <div className="admin-header">
        <h1>Islander Studio Admin</h1>
        <p>Blog Content Management</p>
      </div>

      {studioUrl ? (
        <iframe
          src={studioUrl}
          className="admin-iframe"
          title="Sanity Studio"
          allow="clipboard-write"
        />
      ) : (
        <div className="admin-loading">
          <p>Loading admin panel...</p>
        </div>
      )}

      <div className="admin-footer">
        <a href="/" className="back-to-site">← Back to Site</a>
        <span className="admin-hint">
          Tip: You can also access the admin at{' '}
          <a href="https://sanity.io/manage/personal/project/8hngvmaz" target="_blank" rel="noopener noreferrer">
            sanity.io
          </a>
        </span>
      </div>
    </div>
  )
}
