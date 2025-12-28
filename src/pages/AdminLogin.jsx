import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import SEO from '../components/SEO'
import './AdminLogin.css'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (login(password)) {
      navigate('/admin')
    } else {
      setError('Invalid password')
      setPassword('')
    }
  }

  return (
    <div className="admin-login-page">
      <SEO
        title="Admin Login - Islander Studio"
        description="Admin access only"
        path="/admin/login"
      />
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h1>Admin Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
