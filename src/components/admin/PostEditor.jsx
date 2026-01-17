import { useState, useEffect, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { marked } from 'marked'
import './PostEditor.css'

// Helper to detect if content is markdown (has markdown syntax but no HTML tags)
function isMarkdown(content) {
  if (!content) return false
  const hasMarkdownSyntax = /^#{1,6}\s|^\*\*|^\*\s|^-\s|^\d+\.\s|^\[.*\]\(.*\)|^>\s/m.test(content)
  const hasHtmlTags = /<[a-z][\s\S]*>/i.test(content)
  return hasMarkdownSyntax && !hasHtmlTags
}

// Convert markdown to HTML
function markdownToHtml(content) {
  if (!content) return ''
  if (isMarkdown(content)) {
    return marked.parse(content)
  }
  return content
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

// Featured Image Selection Modal
function FeaturedImageModal({ isOpen, onClose, onSelect, apiUrl }) {
  const [activeTab, setActiveTab] = useState('library')
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      fetchMedia()
    }
  }, [isOpen])

  async function fetchMedia() {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${apiUrl}/api/media`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setMedia(data.media || [])
      }
    } catch (error) {
      console.error('Error fetching media:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleFileUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const token = localStorage.getItem('admin_token')
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`${apiUrl}/api/media`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setMedia([data.media, ...media])
        setSelectedImage(data.media)
        setActiveTab('library')
      } else {
        alert('Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  function handleSelectImage() {
    if (selectedImage) {
      onSelect(selectedImage.url, selectedImage.alt_text || selectedImage.filename)
      onClose()
      setSelectedImage(null)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content featured-image-modal" onClick={e => e.stopPropagation()}>
        <h3>Select Featured Image</h3>

        <div className="modal-tabs">
          <button
            type="button"
            className={activeTab === 'library' ? 'active' : ''}
            onClick={() => setActiveTab('library')}
          >
            Media Library
          </button>
          <button
            type="button"
            className={activeTab === 'upload' ? 'active' : ''}
            onClick={() => setActiveTab('upload')}
          >
            Upload New
          </button>
        </div>

        {activeTab === 'library' && (
          <div className="media-grid-modal">
            {loading ? (
              <div className="loading-text">Loading media...</div>
            ) : media.length === 0 ? (
              <div className="empty-text">No images in library. Upload one!</div>
            ) : (
              media.map((image) => (
                <div
                  key={image.id}
                  className={`media-grid-item ${selectedImage?.id === image.id ? 'selected' : ''}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image.url} alt={image.alt_text || image.filename} />
                  {selectedImage?.id === image.id && (
                    <div className="selected-check">✓</div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="upload-tab">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className="upload-area"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Click to select an image'}
            </button>
          </div>
        )}

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleSelectImage}
            disabled={!selectedImage}
          >
            Use Selected Image
          </button>
        </div>
      </div>
    </div>
  )
}

// Image upload component
function ImageUploadModal({ isOpen, onClose, onInsert, apiUrl }) {
  const [imageUrl, setImageUrl] = useState('')
  const [altText, setAltText] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  if (!isOpen) return null

  async function handleFileUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const token = localStorage.getItem('admin_token')
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`${apiUrl}/api/media`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setImageUrl(data.url)
        setAltText(file.name.replace(/\.[^/.]+$/, ''))
      } else {
        alert('Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  function handleInsert() {
    if (imageUrl) {
      onInsert(imageUrl, altText)
      setImageUrl('')
      setAltText('')
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>Insert Image</h3>

        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            className="btn-secondary"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Choose File'}
          </button>
        </div>

        <div className="form-group">
          <label>Or paste image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label>Alt Text</label>
          <input
            type="text"
            value={altText}
            onChange={e => setAltText(e.target.value)}
            placeholder="Describe the image"
          />
        </div>

        {imageUrl && (
          <div className="image-preview">
            <img src={imageUrl} alt={altText} style={{ maxWidth: '100%', maxHeight: '200px' }} />
          </div>
        )}

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleInsert}
            disabled={!imageUrl}
          >
            Insert Image
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PostEditor({ post, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    body: '',
    author_id: '',
    category_ids: [],
    tag_ids: [],
    app_ids: [],
    main_image_url: '',
    main_image_alt: '',
    featured: false,
    content_status: 'draft',
    published_at: new Date().toISOString().split('T')[0],
    // SEO fields
    seo_meta_title: '',
    seo_meta_description: '',
    seo_focus_keyword: '',
    seo_additional_keywords: '',
    seo_canonical_url: '',
    seo_og_title: '',
    seo_og_description: '',
    seo_og_image_url: '',
    seo_og_type: 'article',
    seo_hide_from_search: false,
    ...post
  })

  const [authors, setAuthors] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [apps, setApps] = useState([])
  const [activeTab, setActiveTab] = useState('content')
  const [saving, setSaving] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showFeaturedImageModal, setShowFeaturedImageModal] = useState(false)
  const [editorMode, setEditorMode] = useState('visual') // 'visual' or 'code'

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your blog post...',
      }),
    ],
    content: markdownToHtml(formData.body) || '',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, body: editor.getHTML() }))
    },
  })

  useEffect(() => {
    fetchReferenceData()
  }, [])

  useEffect(() => {
    if (editor && post?.body) {
      editor.commands.setContent(markdownToHtml(post.body))
    }
  }, [editor, post])

  // Auto-generate slug from title
  useEffect(() => {
    if (!post && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.title, post])

  async function fetchReferenceData() {
    try {
      const token = localStorage.getItem('admin_token')
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      const [authorsRes, categoriesRes, tagsRes, appsRes] = await Promise.all([
        fetch(`${API_URL}/api/authors`, { headers }),
        fetch(`${API_URL}/api/categories`, { headers }),
        fetch(`${API_URL}/api/tags`, { headers }),
        fetch(`${API_URL}/api/apps`, { headers })
      ])

      const [authorsData, categoriesData, tagsData, appsData] = await Promise.all([
        authorsRes.json(),
        categoriesRes.json(),
        tagsRes.json(),
        appsRes.json()
      ])

      setAuthors(authorsData.authors || [])
      setCategories(categoriesData.categories || [])
      setTags(tagsData.tags || [])
      setApps(appsData.apps || [])
    } catch (error) {
      console.error('Failed to fetch reference data:', error)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)

    try {
      await onSave(formData)
    } catch (error) {
      alert('Failed to save post: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  function handleCheckboxToggle(field, id) {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(id)
        ? prev[field].filter(i => i !== id)
        : [...prev[field], id]
    }))
  }

  function insertImage(url, alt) {
    if (editor) {
      editor.chain().focus().setImage({ src: url, alt: alt || '' }).run()
    }
  }

  function addLink() {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run()
    }
  }

  function handleCodeBodyChange(e) {
    const value = e.target.value
    setFormData(prev => ({ ...prev, body: value }))
  }

  function switchToVisualMode() {
    if (editor && formData.body) {
      editor.commands.setContent(markdownToHtml(formData.body))
    }
    setEditorMode('visual')
  }

  function switchToCodeMode() {
    // Sync current editor content to formData before switching
    if (editor) {
      setFormData(prev => ({ ...prev, body: editor.getHTML() }))
    }
    setEditorMode('code')
  }

  // Character count helpers
  const metaTitleLength = formData.seo_meta_title?.length || 0
  const metaDescLength = formData.seo_meta_description?.length || 0

  return (
    <form onSubmit={handleSubmit} className="post-editor">
      <div className="editor-header">
        <h2>{post ? 'Edit Post' : 'New Post'}</h2>
        <div className="editor-actions">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>

      <div className="editor-tabs">
        <button
          type="button"
          className={activeTab === 'content' ? 'active' : ''}
          onClick={() => setActiveTab('content')}
        >
          Content
        </button>
        <button
          type="button"
          className={activeTab === 'seo' ? 'active' : ''}
          onClick={() => setActiveTab('seo')}
        >
          SEO
        </button>
        <button
          type="button"
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="editor-content">
        {/* CONTENT TAB */}
        {activeTab === 'content' && (
          <div className="tab-panel">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Enter post title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="slug">URL Slug *</label>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                placeholder="url-friendly-slug"
              />
              <small>https://islanderstudio.app/blog/{formData.slug || 'your-slug'}</small>
            </div>

            <div className="form-group">
              <label htmlFor="excerpt">Excerpt *</label>
              <textarea
                id="excerpt"
                rows="3"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
                placeholder="Short description (120-160 characters recommended)"
              />
              <small>{formData.excerpt?.length || 0} characters</small>
            </div>

            <div className="form-group">
              <label>Body Content *</label>
              <div className="editor-mode-toggle">
                <button
                  type="button"
                  className={editorMode === 'visual' ? 'active' : ''}
                  onClick={switchToVisualMode}
                >
                  Visual Editor
                </button>
                <button
                  type="button"
                  className={editorMode === 'code' ? 'active' : ''}
                  onClick={switchToCodeMode}
                >
                  HTML/Markdown
                </button>
              </div>

              {editorMode === 'visual' ? (
                <>
                  <div className="editor-toolbar">
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className={editor?.isActive('bold') ? 'active' : ''}
                    >
                      Bold
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleItalic().run()}
                      className={editor?.isActive('italic') ? 'active' : ''}
                    >
                      Italic
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={editor?.isActive('heading', { level: 2 }) ? 'active' : ''}
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                      className={editor?.isActive('heading', { level: 3 }) ? 'active' : ''}
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleBulletList().run()}
                      className={editor?.isActive('bulletList') ? 'active' : ''}
                    >
                      Bullet List
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                      className={editor?.isActive('orderedList') ? 'active' : ''}
                    >
                      Numbered List
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                      className={editor?.isActive('blockquote') ? 'active' : ''}
                    >
                      Quote
                    </button>
                    <button
                      type="button"
                      onClick={addLink}
                      className={editor?.isActive('link') ? 'active' : ''}
                    >
                      Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowImageModal(true)}
                    >
                      Image
                    </button>
                  </div>
                  <EditorContent editor={editor} className="tiptap-editor" />
                </>
              ) : (
                <>
                  <textarea
                    className="code-editor"
                    value={formData.body}
                    onChange={handleCodeBodyChange}
                    placeholder="Enter HTML or Markdown content..."
                    rows={20}
                  />
                  <small>You can use HTML tags or Markdown syntax. Content will be rendered on the blog page.</small>
                </>
              )}
            </div>

            <ImageUploadModal
              isOpen={showImageModal}
              onClose={() => setShowImageModal(false)}
              onInsert={insertImage}
              apiUrl={API_URL}
            />

            <div className="form-group featured-image-section">
              <label>Featured Image</label>
              <div className="featured-image-content">
                {formData.main_image_url ? (
                  <div className="featured-image-preview">
                    <img src={formData.main_image_url} alt={formData.main_image_alt || 'Featured image'} />
                    <button
                      type="button"
                      className="remove-featured-image"
                      onClick={() => setFormData({ ...formData, main_image_url: '', main_image_alt: '' })}
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="featured-image-placeholder">
                    No image selected
                  </div>
                )}
                <div className="featured-image-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowFeaturedImageModal(true)}
                  >
                    {formData.main_image_url ? 'Change Image' : 'Select Image'}
                  </button>
                </div>
              </div>
              <div className="featured-image-url-input">
                <input
                  type="url"
                  id="main_image_url"
                  value={formData.main_image_url}
                  onChange={(e) => setFormData({ ...formData, main_image_url: e.target.value })}
                  placeholder="Or paste image URL directly"
                />
              </div>
              <div className="form-group">
                <label htmlFor="main_image_alt">Image Alt Text</label>
                <input
                  type="text"
                  id="main_image_alt"
                  value={formData.main_image_alt}
                  onChange={(e) => setFormData({ ...formData, main_image_alt: e.target.value })}
                  placeholder="Describe the image for accessibility"
                />
              </div>
            </div>

            <FeaturedImageModal
              isOpen={showFeaturedImageModal}
              onClose={() => setShowFeaturedImageModal(false)}
              onSelect={(url, alt) => setFormData({ ...formData, main_image_url: url, main_image_alt: alt })}
              apiUrl={API_URL}
            />
          </div>
        )}

        {/* SEO TAB */}
        {activeTab === 'seo' && (
          <div className="tab-panel">
            <div className="seo-preview">
              <h3>Search Engine Preview</h3>
              <div className="google-preview">
                <div className="preview-title">
                  {formData.seo_meta_title || formData.title || 'Your Page Title'}
                </div>
                <div className="preview-url">
                  https://islanderstudio.app/blog/{formData.slug || 'your-slug'}
                </div>
                <div className="preview-description">
                  {formData.seo_meta_description || formData.excerpt || 'Add a meta description...'}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="seo_meta_title">Meta Title</label>
              <input
                type="text"
                id="seo_meta_title"
                value={formData.seo_meta_title}
                onChange={(e) => setFormData({ ...formData, seo_meta_title: e.target.value })}
                placeholder="Custom title for search results (50-60 chars)"
              />
              <small className={metaTitleLength > 60 ? 'warning' : ''}>
                {metaTitleLength}/60 characters {metaTitleLength > 60 && '(too long!)'}
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="seo_meta_description">Meta Description</label>
              <textarea
                id="seo_meta_description"
                rows="3"
                value={formData.seo_meta_description}
                onChange={(e) => setFormData({ ...formData, seo_meta_description: e.target.value })}
                placeholder="Compelling description for search results (150-160 chars)"
              />
              <small className={metaDescLength > 160 ? 'warning' : ''}>
                {metaDescLength}/160 characters {metaDescLength > 160 && '(too long!)'}
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="seo_focus_keyword">Focus Keyword</label>
              <input
                type="text"
                id="seo_focus_keyword"
                value={formData.seo_focus_keyword}
                onChange={(e) => setFormData({ ...formData, seo_focus_keyword: e.target.value })}
                placeholder="Primary keyword you're targeting"
              />
            </div>

            <div className="form-group">
              <label htmlFor="seo_additional_keywords">Additional Keywords</label>
              <input
                type="text"
                id="seo_additional_keywords"
                value={formData.seo_additional_keywords}
                onChange={(e) => setFormData({ ...formData, seo_additional_keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
              />
              <small>Comma-separated</small>
            </div>

            <div className="form-group">
              <label htmlFor="seo_canonical_url">Canonical URL</label>
              <input
                type="url"
                id="seo_canonical_url"
                value={formData.seo_canonical_url}
                onChange={(e) => setFormData({ ...formData, seo_canonical_url: e.target.value })}
                placeholder="https://example.com/original-post"
              />
              <small>Only set if content was originally published elsewhere</small>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.seo_hide_from_search}
                  onChange={(e) => setFormData({ ...formData, seo_hide_from_search: e.target.checked })}
                />
                Hide from search engines (noindex)
              </label>
            </div>

            <h3>Social Sharing (Open Graph)</h3>

            <div className="form-group">
              <label htmlFor="seo_og_title">OG Title</label>
              <input
                type="text"
                id="seo_og_title"
                value={formData.seo_og_title}
                onChange={(e) => setFormData({ ...formData, seo_og_title: e.target.value })}
                placeholder="Title for social media shares"
              />
            </div>

            <div className="form-group">
              <label htmlFor="seo_og_description">OG Description</label>
              <textarea
                id="seo_og_description"
                rows="2"
                value={formData.seo_og_description}
                onChange={(e) => setFormData({ ...formData, seo_og_description: e.target.value })}
                placeholder="Description for social media shares"
              />
            </div>

            <div className="form-group">
              <label htmlFor="seo_og_image_url">OG Image URL</label>
              <input
                type="url"
                id="seo_og_image_url"
                value={formData.seo_og_image_url}
                onChange={(e) => setFormData({ ...formData, seo_og_image_url: e.target.value })}
                placeholder="https://example.com/og-image.jpg (1200x630px recommended)"
              />
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="tab-panel">
            <div className="form-group">
              <label htmlFor="author_id">Author *</label>
              <select
                id="author_id"
                value={formData.author_id}
                onChange={(e) => setFormData({ ...formData, author_id: e.target.value })}
                required
              >
                <option value="">Select an author</option>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Categories</label>
              <div className="checkbox-group">
                {categories.map(category => (
                  <label key={category.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.category_ids.includes(category.id)}
                      onChange={() => handleCheckboxToggle('category_ids', category.id)}
                    />
                    {category.title}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Tags</label>
              <div className="checkbox-group">
                {tags.map(tag => (
                  <label key={tag.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.tag_ids.includes(tag.id)}
                      onChange={() => handleCheckboxToggle('tag_ids', tag.id)}
                    />
                    {tag.title}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Related Apps</label>
              <div className="checkbox-group">
                {apps.map(app => (
                  <label key={app.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.app_ids.includes(app.id)}
                      onChange={() => handleCheckboxToggle('app_ids', app.id)}
                    />
                    {app.display_name}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="content_status">Content Status</label>
              <select
                id="content_status"
                value={formData.content_status}
                onChange={(e) => setFormData({ ...formData, content_status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="in_review">In Review</option>
                <option value="seo_optimized">SEO Optimized</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="published_at">Publish Date</label>
              <input
                type="date"
                id="published_at"
                value={formData.published_at}
                onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                Featured Post
              </label>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}
