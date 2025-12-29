import { useState, useEffect } from 'react'
import PostcardBuilder from '../components/PostcardBuilder'
import SEO from '../components/SEO'
import './PostcardStudio.css'

export default function PostcardStudio() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <SEO
        title="Postcard Studio — Islander Studio"
        description="Create beautiful custom postcards with drag-and-drop stamps and stickers. A fun, interactive experience by Islander Studio."
        url="https://islanderstudio.app/postcard-studio"
      />

      <div className={`postcard-studio ${loaded ? 'postcard-studio--loaded' : ''}`}>
        {/* Hero Section */}
        <section className="postcard-studio__hero">
          <div className="postcard-studio__hero-content">
            <span className="postcard-studio__badge">
              <span className="postcard-studio__badge-dot"></span>
              Interactive Experience
            </span>

            <h1 className="postcard-studio__title">
              Postcard<br />
              <span className="postcard-studio__accent">Studio</span>
            </h1>

            <p className="postcard-studio__description">
              Design your own custom postcards with drag-and-drop
              stamps and stickers. Express yourself creatively!
            </p>

            <div className="postcard-studio__features">
              <div className="postcard-studio__feature">
                <span className="postcard-studio__feature-icon">🎨</span>
                <span className="postcard-studio__feature-text">Drag & Drop</span>
              </div>
              <div className="postcard-studio__feature">
                <span className="postcard-studio__feature-icon">🔄</span>
                <span className="postcard-studio__feature-text">Rotate & Resize</span>
              </div>
              <div className="postcard-studio__feature">
                <span className="postcard-studio__feature-icon">💾</span>
                <span className="postcard-studio__feature-text">Export & Share</span>
              </div>
            </div>
          </div>
        </section>

        {/* Postcard Builder */}
        <PostcardBuilder />

        {/* Tips Section */}
        <section className="postcard-studio__tips">
          <div className="postcard-studio__tips-container">
            <h3>Pro Tips</h3>
            <div className="postcard-studio__tips-grid">
              <div className="postcard-studio__tip">
                <span className="tip-number">1</span>
                <p>Drag stamps and stickers from the left panel onto your postcard</p>
              </div>
              <div className="postcard-studio__tip">
                <span className="tip-number">2</span>
                <p>Click any placed stamp to select it and use the controls to rotate or resize</p>
              </div>
              <div className="postcard-studio__tip">
                <span className="tip-number">3</span>
                <p>Layer multiple stamps to create unique compositions</p>
              </div>
              <div className="postcard-studio__tip">
                <span className="tip-number">4</span>
                <p>Export your creation and share it with friends!</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
