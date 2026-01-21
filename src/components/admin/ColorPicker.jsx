import { useState, useRef, useEffect } from 'react'
import './ColorPicker.css'

// Preset colors that match the Islander Studio palette
const PRESET_COLORS = [
  '#6366f1', // Indigo
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#ef4444', // Red
  '#f97316', // Orange
  '#eab308', // Yellow
  '#22c55e', // Green
  '#14b8a6', // Teal
  '#06b6d4', // Cyan
  '#3b82f6', // Blue
  '#64748b', // Slate
  '#1e293b', // Dark slate
]

export default function ColorPicker({ value, onChange, label = 'Color' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [customColor, setCustomColor] = useState(value || '')
  const containerRef = useRef(null)

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Sync custom color with value
  useEffect(() => {
    setCustomColor(value || '')
  }, [value])

  function handlePresetClick(color) {
    onChange(color)
    setIsOpen(false)
  }

  function handleCustomColorChange(e) {
    const color = e.target.value
    setCustomColor(color)
    onChange(color)
  }

  function handleClear() {
    onChange('')
    setCustomColor('')
    setIsOpen(false)
  }

  return (
    <div className="color-picker" ref={containerRef}>
      <label className="color-picker__label">{label}</label>
      <div className="color-picker__input-wrapper">
        <button
          type="button"
          className="color-picker__trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value ? (
            <span
              className="color-picker__swatch"
              style={{ backgroundColor: value }}
            />
          ) : (
            <span className="color-picker__empty">No color</span>
          )}
          <span className="color-picker__value">{value || 'Select color'}</span>
        </button>

        {value && (
          <button
            type="button"
            className="color-picker__clear"
            onClick={handleClear}
            title="Clear color"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <div className="color-picker__dropdown">
          <div className="color-picker__presets">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                className={`color-picker__preset ${value === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handlePresetClick(color)}
                title={color}
              />
            ))}
          </div>

          <div className="color-picker__custom">
            <label className="color-picker__custom-label">Custom:</label>
            <div className="color-picker__custom-input">
              <input
                type="color"
                value={customColor || '#6366f1'}
                onChange={handleCustomColorChange}
                className="color-picker__native"
              />
              <input
                type="text"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value)
                  if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                    onChange(e.target.value)
                  }
                }}
                placeholder="#000000"
                className="color-picker__hex"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
