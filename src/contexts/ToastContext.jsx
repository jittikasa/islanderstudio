import { createContext, useContext, useState, useCallback } from 'react'
import Toast from '../components/Toast'

const ToastContext = createContext(null)

/**
 * Toast Provider component
 * Provides global toast notification functionality
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, options = {}) => {
    const id = Date.now() + Math.random()
    const toast = {
      id,
      message,
      variant: options.variant || 'info', // success, error, info, warning
      duration: options.duration ?? 5000, // Default 5 seconds
      dismissible: options.dismissible ?? true,
    }

    setToasts(prev => [...prev, toast])

    // Auto-dismiss after duration (if duration > 0)
    if (toast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  // Convenience methods
  const success = useCallback((message, options = {}) => {
    return addToast(message, { ...options, variant: 'success' })
  }, [addToast])

  const error = useCallback((message, options = {}) => {
    return addToast(message, { ...options, variant: 'error' })
  }, [addToast])

  const info = useCallback((message, options = {}) => {
    return addToast(message, { ...options, variant: 'info' })
  }, [addToast])

  const warning = useCallback((message, options = {}) => {
    return addToast(message, { ...options, variant: 'warning' })
  }, [addToast])

  const value = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  )
}

/**
 * Hook to use toast notifications
 */
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export default ToastContext
