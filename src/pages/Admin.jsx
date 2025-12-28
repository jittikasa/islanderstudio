import { useEffect, useState } from 'react'
import './Admin.css'

export default function Admin() {
  const [studioUrl, setStudioUrl] = useState('')
  const [canIframe, setCanIframe] = useState(true)

  useEffect(() => {
    // Try localhost first (if studio is running locally)
    const localStudio = 'http://localhost:3333'

    // Check if local studio is running
    fetch(localStudio)
      .then(() => {
        setStudioUrl(localStudio)
        setCanIframe(true)
      })
      .catch(() => {
        // Local studio not running, can't iframe Sanity's web interface
        setCanIframe(false)
      })
  }, [])

  const sanityManageUrl = 'https://sanity.io/manage/personal/project/8hngvmaz'

  if (!canIframe) {
    return (
      <div className="admin-wrapper">
        <div className="admin-header">
          <h1>Islander Studio Admin</h1>
          <p>Blog Content Management</p>
        </div>

        <div className="admin-redirect">
          <div className="admin-card">
            <h2>Manage Your Blog</h2>
            <p>Click below to open Sanity Studio and manage your blog content:</p>
            <a
              href={sanityManageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-button"
            >
              Open Sanity Studio →
            </a>
            <div className="admin-features">
              <p>✓ Upload images</p>
              <p>✓ Create & edit blog posts</p>
              <p>✓ Manage authors & categories</p>
            </div>
          </div>
        </div>

        <div className="admin-footer">
          <a href="/" className="back-to-site">← Back to Site</a>
        </div>
      </div>
    )
  }

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
      </div>
    </div>
  )
}
