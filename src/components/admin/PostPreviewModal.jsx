import { X } from 'lucide-react'
import './PostPreviewModal.css'

function formatDate(dateString) {
  if (!dateString) return 'Not set'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function calculateReadingTime(content) {
  if (!content) return 0
  const text = content.replace(/<[^>]*>/g, '')
  const words = text.trim().split(/\s+/).filter(word => word.length > 0)
  return Math.ceil(words.length / 200)
}

export default function PostPreviewModal({ isOpen, onClose, post, authors = [], categories = [] }) {
  if (!isOpen) return null

  const isDraft = post.content_status !== 'published'
  const readingTime = calculateReadingTime(post.body)
  const authorName = authors.find(a => a.id === post.author_id)?.name || 'Unknown Author'
  const categoryNames = categories
    .filter(c => post.category_ids?.includes(c.id))
    .map(c => c.title)

  return (
    <div className="preview-modal-overlay" onClick={onClose}>
      <div className="preview-modal" onClick={e => e.stopPropagation()}>
        <div className="preview-modal__header">
          <h3>Post Preview</h3>
          <button onClick={onClose} className="preview-modal__close" aria-label="Close preview">
            <X size={24} />
          </button>
        </div>

        <div className="preview-modal__content">
          {/* Draft Watermark */}
          {isDraft && (
            <div className="preview-watermark">
              <span>DRAFT</span>
            </div>
          )}

          {/* Post Preview */}
          <article className="preview-post">
            {/* Featured Image */}
            {post.main_image_url && (
              <div className="preview-post__image">
                <img
                  src={post.main_image_url}
                  alt={post.main_image_alt || post.title}
                />
              </div>
            )}

            {/* Post Header */}
            <header className="preview-post__header">
              <div className="preview-post__meta">
                <time>{formatDate(post.published_at)}</time>
                {readingTime > 0 && (
                  <>
                    <span className="preview-post__dot">·</span>
                    <span>{readingTime} min read</span>
                  </>
                )}
              </div>

              <h1 className="preview-post__title">{post.title || 'Untitled Post'}</h1>

              {post.excerpt && (
                <p className="preview-post__excerpt">{post.excerpt}</p>
              )}

              {categoryNames.length > 0 && (
                <div className="preview-post__categories">
                  {categoryNames.map((name, i) => (
                    <span key={i} className="preview-post__category">{name}</span>
                  ))}
                </div>
              )}

              <div className="preview-post__author">
                <span>By {authorName}</span>
              </div>
            </header>

            {/* Post Content */}
            <div
              className="preview-post__body"
              dangerouslySetInnerHTML={{ __html: post.body || '<p>No content yet...</p>' }}
            />
          </article>
        </div>

        <div className="preview-modal__footer">
          <span className="preview-modal__status">
            Status: <strong>{post.content_status || 'draft'}</strong>
          </span>
          <button onClick={onClose} className="preview-modal__close-btn">
            Close Preview
          </button>
        </div>
      </div>
    </div>
  )
}
