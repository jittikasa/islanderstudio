import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function AdminPage() {
  const { isAuthenticated, loading, setToken } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [error, setError] = useState(null)

  // Handle OAuth callback with token in URL
  useEffect(() => {
    const token = searchParams.get('token')
    const expires = searchParams.get('expires')
    const email = searchParams.get('email')
    const errorParam = searchParams.get('error')

    if (errorParam) {
      const errorMessages = {
        'unauthorized_email': 'Your email is not authorized to access this admin panel.',
        'token_exchange_failed': 'Failed to authenticate with Google. Please try again.',
        'userinfo_failed': 'Failed to get user information from Google.',
        'server_error': 'An error occurred. Please try again.',
        'missing_code': 'Authentication was cancelled or failed.'
      }
      setError(errorMessages[errorParam] || 'Authentication failed. Please try again.')
      // Clear error from URL
      setSearchParams({})
    }

    if (token && expires) {
      // Store email if provided
      if (email) {
        localStorage.setItem('admin_email', email)
      }
      // Trigger auth context to set token
      setToken(token, expires)
      // Clear params from URL
      setSearchParams({})
    }
  }, [searchParams, setSearchParams, setToken])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <p>Loading...</p>
      </div>
    )
  }

  // Show dashboard if logged in, login if not
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin error={error} />
}
