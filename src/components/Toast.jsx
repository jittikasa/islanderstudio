import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import './Toast.css'

/**
 * Toast notification component
 * Displays stacked toast messages with auto-dismiss
 */
export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={() => onDismiss(toast.id)}
        />
      ))}
    </div>
  )
}

function ToastItem({ toast, onDismiss }) {
  const { message, variant, dismissible } = toast

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const Icon = icons[variant] || icons.info

  return (
    <div
      className={`toast toast-${variant}`}
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
    >
      <div className="toast-icon">
        <Icon size={20} />
      </div>
      <div className="toast-content">
        <p className="toast-message">{message}</p>
      </div>
      {dismissible && (
        <button
          className="toast-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss notification"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
