import './LoadingSpinner.css'

export default function LoadingSpinner({ size = 'md', color = 'primary' }) {
  return (
    <div className={`loading-spinner loading-spinner-${size} loading-spinner-${color}`}>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
    </div>
  )
}
