import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user has a valid token
    const token = localStorage.getItem('admin_token')
    if (token) {
      // Verify token is still valid
      verifyToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  async function verifyToken(token) {
    try {
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        // Token invalid, clear it
        localStorage.removeItem('admin_token')
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      localStorage.removeItem('admin_token')
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (password, rememberMe = false) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, rememberMe })
      })

      const data = await response.json()

      if (response.ok && data.token) {
        localStorage.setItem('admin_token', data.token)
        setIsAuthenticated(true)
        return true
      }

      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = async () => {
    const token = localStorage.getItem('admin_token')

    if (token) {
      try {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } catch (error) {
        console.error('Logout request failed:', error)
      }
    }

    setIsAuthenticated(false)
    localStorage.removeItem('admin_token')
  }

  const value = {
    isAuthenticated,
    login,
    logout,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
