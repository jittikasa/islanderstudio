import { Component } from 'react'
import './ErrorBoundary.css'

/**
 * Error Boundary component for graceful error handling
 * Catches JavaScript errors anywhere in the child component tree
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({ errorInfo })

    // Could send to error tracking service here
    // e.g., Sentry.captureException(error)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-boundary-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="error-boundary-title">Something went wrong</h2>
            <p className="error-boundary-message">
              {this.props.message || "We're sorry, but something unexpected happened. Please try again."}
            </p>
            <div className="error-boundary-actions">
              <button
                onClick={this.handleRetry}
                className="error-boundary-btn error-boundary-btn-primary"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="error-boundary-btn error-boundary-btn-secondary"
              >
                Go to Home
              </button>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <details className="error-boundary-details">
                <summary>Error Details</summary>
                <pre>{this.state.error.toString()}</pre>
                {this.state.errorInfo && (
                  <pre>{this.state.errorInfo.componentStack}</pre>
                )}
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * HOC to wrap components with error boundary
 */
export function withErrorBoundary(WrappedComponent, fallback = null) {
  return function WithErrorBoundary(props) {
    return (
      <ErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    )
  }
}
