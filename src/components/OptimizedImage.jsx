import { useState, useRef, useEffect } from 'react'

/**
 * OptimizedImage component
 * - Lazy loading with native loading="lazy"
 * - Width/height to prevent CLS
 * - Optional placeholder/blur effect
 * - Fade in animation on load
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  sizes,
  srcSet,
  placeholder,
  objectFit = 'cover',
  priority = false,
  onLoad,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)

  // Check if image is already loaded (from cache)
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true)
    }
  }, [])

  const handleLoad = (e) => {
    setIsLoaded(true)
    onLoad?.(e)
  }

  const handleError = () => {
    setHasError(true)
  }

  // Calculate aspect ratio for container
  const aspectRatio = width && height ? width / height : undefined

  return (
    <div
      className={`optimized-image-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...(aspectRatio && {
          aspectRatio: `${width} / ${height}`,
        }),
      }}
    >
      {/* Placeholder background */}
      {placeholder && !isLoaded && !hasError && (
        <div
          className="optimized-image-placeholder"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: placeholder,
          }}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div
          className="optimized-image-error"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--cloud)',
            color: 'var(--stone)',
            fontSize: '0.875rem',
          }}
        >
          <span>Image unavailable</span>
        </div>
      )}

      {/* Image */}
      {!hasError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          decoding={decoding}
          sizes={sizes}
          srcSet={srcSet}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
          {...props}
        />
      )}
    </div>
  )
}

/**
 * Generate srcSet for responsive images
 * @param {string} baseUrl - Base URL (with placeholder for width)
 * @param {number[]} widths - Array of widths to generate
 * @returns {string} srcSet string
 */
export function generateSrcSet(baseUrl, widths = [400, 800, 1200, 1600]) {
  return widths
    .map(w => `${baseUrl.replace('{width}', w)} ${w}w`)
    .join(', ')
}

/**
 * Generate sizes attribute for common layouts
 */
export const imageSizes = {
  // Full width on mobile, max 1200px on desktop
  fullWidth: '(max-width: 1200px) 100vw, 1200px',
  // Half width on desktop, full on mobile
  halfWidth: '(max-width: 768px) 100vw, 50vw',
  // Card thumbnail
  thumbnail: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  // Blog post featured image
  blogFeatured: '(max-width: 800px) 100vw, 800px',
}
