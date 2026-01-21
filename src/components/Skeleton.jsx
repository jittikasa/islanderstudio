import './Skeleton.css'

/**
 * Skeleton loader component for content placeholders
 * Prevents layout shift during loading
 */
export default function Skeleton({
  variant = 'text', // text, circular, rectangular, card
  width,
  height,
  className = '',
  lines = 1,
  animation = 'pulse' // pulse, wave, none
}) {
  // For multi-line text skeletons
  if (variant === 'text' && lines > 1) {
    return (
      <div className={`skeleton-group ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`skeleton skeleton-text skeleton-${animation}`}
            style={{
              width: i === lines - 1 ? '60%' : '100%',
              height
            }}
          />
        ))}
      </div>
    )
  }

  const style = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={`skeleton skeleton-${variant} skeleton-${animation} ${className}`}
      style={style}
    />
  )
}

/**
 * Post card skeleton for blog listing
 */
export function PostCardSkeleton() {
  return (
    <div className="skeleton-post-card">
      <Skeleton variant="rectangular" className="skeleton-post-image" />
      <div className="skeleton-post-content">
        <div className="skeleton-post-meta">
          <Skeleton width={80} height={20} />
          <Skeleton width={100} height={20} />
        </div>
        <Skeleton variant="text" height={28} />
        <Skeleton variant="text" lines={2} />
        <div className="skeleton-post-footer">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton width={100} height={16} />
        </div>
      </div>
    </div>
  )
}

/**
 * Blog post detail skeleton
 */
export function PostDetailSkeleton() {
  return (
    <div className="skeleton-post-detail">
      <Skeleton variant="rectangular" className="skeleton-hero-image" />
      <div className="skeleton-post-header">
        <Skeleton width={100} height={24} />
        <Skeleton variant="text" height={48} className="skeleton-title" />
        <Skeleton variant="text" lines={2} className="skeleton-excerpt" />
        <div className="skeleton-author-row">
          <Skeleton variant="circular" width={48} height={48} />
          <div>
            <Skeleton width={120} height={20} />
            <Skeleton width={80} height={16} />
          </div>
        </div>
      </div>
      <div className="skeleton-post-body">
        <Skeleton variant="text" lines={4} />
        <Skeleton variant="rectangular" height={200} className="skeleton-inline-image" />
        <Skeleton variant="text" lines={3} />
      </div>
    </div>
  )
}

/**
 * Stats card skeleton for dashboard
 */
export function StatsCardSkeleton() {
  return (
    <div className="skeleton-stats-card">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="skeleton-stats-content">
        <Skeleton width={60} height={32} />
        <Skeleton width={100} height={16} />
      </div>
    </div>
  )
}
