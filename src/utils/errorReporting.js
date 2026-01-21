/**
 * Error Reporting Utility
 *
 * Provides centralized error tracking for the application.
 * In production, errors are sent to the API for logging.
 * In development, errors are logged to the console.
 */

const API_URL = import.meta.env.VITE_API_URL || ''

/**
 * Report an error to the error tracking system
 * @param {Error} error - The error object
 * @param {Object} context - Additional context about the error
 * @param {string} context.component - Component where error occurred
 * @param {string} context.action - Action being performed when error occurred
 * @param {Object} context.metadata - Additional metadata
 */
export async function reportError(error, context = {}) {
  const errorData = {
    message: error.message,
    stack: error.stack,
    name: error.name,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    ...context
  }

  // Always log to console in development
  if (import.meta.env.DEV) {
    console.error('Error Reported:', error, 'Context:', context)
    return
  }

  // In production, send to API
  try {
    await fetch(`${API_URL}/api/errors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorData),
    })
  } catch (reportingError) {
    // Silently fail - don't cause more errors while reporting
    console.error('Failed to report error:', reportingError)
  }
}

/**
 * Report a React error boundary catch
 * @param {Error} error - The error that was caught
 * @param {Object} errorInfo - React error info with componentStack
 */
export function reportReactError(error, errorInfo) {
  reportError(error, {
    type: 'react_error_boundary',
    componentStack: errorInfo?.componentStack,
  })
}

/**
 * Report an API error
 * @param {string} endpoint - The API endpoint that failed
 * @param {Response} response - The fetch response
 * @param {Object} requestData - The request data (sanitized)
 */
export async function reportApiError(endpoint, response, requestData = {}) {
  const error = new Error(`API Error: ${response.status} ${response.statusText}`)

  let responseBody
  try {
    responseBody = await response.clone().text()
  } catch {
    responseBody = 'Could not read response body'
  }

  reportError(error, {
    type: 'api_error',
    endpoint,
    status: response.status,
    statusText: response.statusText,
    responseBody: responseBody.substring(0, 500), // Limit size
    requestData: sanitizeRequestData(requestData),
  })
}

/**
 * Remove sensitive data from request before logging
 */
function sanitizeRequestData(data) {
  if (!data || typeof data !== 'object') return data

  const sanitized = { ...data }
  const sensitiveKeys = ['password', 'token', 'secret', 'authorization', 'cookie']

  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
      sanitized[key] = '[REDACTED]'
    }
  }

  return sanitized
}

/**
 * Setup global error handlers
 * Call this once when the app initializes
 */
export function setupGlobalErrorHandlers() {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    reportError(event.reason || new Error('Unhandled Promise Rejection'), {
      type: 'unhandled_rejection',
    })
  })

  // Handle global errors
  window.addEventListener('error', (event) => {
    reportError(event.error || new Error(event.message), {
      type: 'global_error',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    })
  })
}
