import { useState, useRef, useCallback } from 'react'
import './PostcardBuilder.css'

export default function PostcardBuilder() {
  const [placedStamps, setPlacedStamps] = useState([])
  const [draggingStamp, setDraggingStamp] = useState(null)
  const [selectedStamp, setSelectedStamp] = useState(null)
  const canvasRef = useRef(null)

  // Available stamps and stickers
  const availableStamps = [
    { id: 'sun', type: 'sticker', emoji: '☀️', name: 'Sun' },
    { id: 'palm', type: 'sticker', emoji: '🌴', name: 'Palm Tree' },
    { id: 'flower', type: 'sticker', emoji: '🌺', name: 'Flower' },
    { id: 'shell', type: 'sticker', emoji: '🐚', name: 'Shell' },
    { id: 'wave', type: 'sticker', emoji: '🌊', name: 'Wave' },
    { id: 'island', type: 'stamp', emoji: '🏝️', name: 'Island' },
    { id: 'heart', type: 'stamp', emoji: '❤️', name: 'Heart' },
    { id: 'star', type: 'stamp', emoji: '⭐', name: 'Star' },
    { id: 'smile', type: 'stamp', emoji: '😊', name: 'Smile' },
    { id: 'camera', type: 'stamp', emoji: '📷', name: 'Camera' },
    { id: 'plane', type: 'stamp', emoji: '✈️', name: 'Plane' },
    { id: 'compass', type: 'stamp', emoji: '🧭', name: 'Compass' },
  ]

  const handleDragStart = (e, stamp) => {
    setDraggingStamp(stamp)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (!draggingStamp || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const newStamp = {
      ...draggingStamp,
      uniqueId: `${draggingStamp.id}-${Date.now()}`,
      x: Math.max(0, Math.min(95, x)),
      y: Math.max(0, Math.min(95, y)),
      rotation: Math.random() * 20 - 10,
      scale: 1,
    }

    setPlacedStamps([...placedStamps, newStamp])
    setDraggingStamp(null)
  }

  const handleStampClick = (uniqueId) => {
    setSelectedStamp(uniqueId)
  }

  const handleRotate = (direction) => {
    if (!selectedStamp) return
    setPlacedStamps(placedStamps.map(stamp =>
      stamp.uniqueId === selectedStamp
        ? { ...stamp, rotation: stamp.rotation + (direction === 'left' ? -15 : 15) }
        : stamp
    ))
  }

  const handleScale = (direction) => {
    if (!selectedStamp) return
    setPlacedStamps(placedStamps.map(stamp =>
      stamp.uniqueId === selectedStamp
        ? { ...stamp, scale: Math.max(0.5, Math.min(2, stamp.scale + (direction === 'up' ? 0.1 : -0.1))) }
        : stamp
    ))
  }

  const handleDelete = () => {
    if (!selectedStamp) return
    setPlacedStamps(placedStamps.filter(stamp => stamp.uniqueId !== selectedStamp))
    setSelectedStamp(null)
  }

  const handleClear = () => {
    setPlacedStamps([])
    setSelectedStamp(null)
  }

  const handleExport = () => {
    // Simple download functionality - could be enhanced with html2canvas
    alert('Export feature coming soon! For now, take a screenshot.')
  }

  return (
    <div className="postcard-builder">
      <div className="postcard-builder__container">
        {/* Stamp Palette */}
        <div className="postcard-builder__palette">
          <div className="postcard-builder__palette-header">
            <h3>Stamps & Stickers</h3>
            <p>Drag onto postcard</p>
          </div>

          <div className="postcard-builder__stamps">
            {availableStamps.map(stamp => (
              <div
                key={stamp.id}
                className={`postcard-builder__stamp-item ${stamp.type}`}
                draggable
                onDragStart={(e) => handleDragStart(e, stamp)}
              >
                <span className="postcard-builder__stamp-emoji">{stamp.emoji}</span>
                <span className="postcard-builder__stamp-name">{stamp.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Postcard Canvas */}
        <div className="postcard-builder__canvas-wrapper">
          <div className="postcard-builder__canvas-header">
            <h2>Your Postcard</h2>
            <div className="postcard-builder__actions">
              <button onClick={handleClear} className="btn-small btn-outline">
                Clear All
              </button>
              <button onClick={handleExport} className="btn-small btn-primary">
                Export
              </button>
            </div>
          </div>

          <div
            ref={canvasRef}
            className="postcard-builder__canvas"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => setSelectedStamp(null)}
          >
            {/* Striped Border */}
            <div className="postcard-canvas__border">
              <div className="postcard-canvas__inner">
                {/* Postcard Background */}
                <div className="postcard-canvas__background">
                  <div className="postcard-canvas__left">
                    {/* Landscape */}
                    <div className="postcard-canvas__sky"></div>
                    <div className="postcard-canvas__sun-default"></div>
                    <div className="postcard-canvas__hills">
                      <div className="postcard-canvas__hill postcard-canvas__hill--1"></div>
                      <div className="postcard-canvas__hill postcard-canvas__hill--2"></div>
                      <div className="postcard-canvas__hill postcard-canvas__hill--3"></div>
                    </div>
                  </div>

                  <div className="postcard-canvas__right">
                    {/* Postmark */}
                    <div className="postcard-canvas__postmark">
                      <div className="postcard-canvas__postmark-circle">
                        <div className="postcard-canvas__postmark-star">★</div>
                        <div className="postcard-canvas__postmark-text">POST</div>
                        <div className="postcard-canvas__postmark-text-small">DES 01</div>
                      </div>
                      <div className="postcard-canvas__postmark-waves">
                        <svg width="50" height="20" viewBox="0 0 50 20" fill="none">
                          <path d="M0 4 Q2.5 1, 5 4 T10 4 T15 4 T20 4 T25 4 T30 4 T35 4 T40 4 T45 4 T50 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                          <path d="M0 8 Q2.5 5, 5 8 T10 8 T15 8 T20 8 T25 8 T30 8 T35 8 T40 8 T45 8 T50 8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                          <path d="M0 12 Q2.5 9, 5 12 T10 12 T15 12 T20 12 T25 12 T30 12 T35 12 T40 12 T45 12 T50 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        </svg>
                      </div>
                    </div>

                    {/* Address Lines */}
                    <div className="postcard-canvas__address">
                      <div className="postcard-canvas__to">To :</div>
                      <div className="postcard-canvas__lines">
                        <div className="postcard-canvas__line"></div>
                        <div className="postcard-canvas__line"></div>
                        <div className="postcard-canvas__line"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Placed Stamps */}
                {placedStamps.map(stamp => (
                  <div
                    key={stamp.uniqueId}
                    className={`postcard-canvas__placed-stamp ${selectedStamp === stamp.uniqueId ? 'selected' : ''}`}
                    style={{
                      left: `${stamp.x}%`,
                      top: `${stamp.y}%`,
                      transform: `translate(-50%, -50%) rotate(${stamp.rotation}deg) scale(${stamp.scale})`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleStampClick(stamp.uniqueId)
                    }}
                  >
                    <span className="stamp-emoji">{stamp.emoji}</span>
                  </div>
                ))}

                {/* Drop zone hint */}
                {placedStamps.length === 0 && (
                  <div className="postcard-canvas__hint">
                    <p>👆 Drag stamps and stickers here!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls for selected stamp */}
          {selectedStamp && (
            <div className="postcard-builder__controls">
              <div className="postcard-builder__controls-group">
                <label>Rotate:</label>
                <button onClick={() => handleRotate('left')}>↺</button>
                <button onClick={() => handleRotate('right')}>↻</button>
              </div>
              <div className="postcard-builder__controls-group">
                <label>Size:</label>
                <button onClick={() => handleScale('down')}>−</button>
                <button onClick={() => handleScale('up')}>+</button>
              </div>
              <div className="postcard-builder__controls-group">
                <button onClick={handleDelete} className="btn-delete">
                  🗑️ Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
