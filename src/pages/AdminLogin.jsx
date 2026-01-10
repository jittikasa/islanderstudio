import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import './AdminLogin.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_token_expires', data.expiresAt);

      // Redirect to admin
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your password.');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <SEO
        title="Admin Login - Islander Studio"
        description="Admin access only"
        path="/admin/login"
      />
      <div className="admin-login__container">
        <div className="admin-login__logo">
          <img
            src="/Islander Studio — Branding Identity/Logos/Logo-light.png"
            alt="Islander Studio"
            className="admin-login__logo-img"
          />
        </div>

        <h1 className="admin-login__title">Blog Admin</h1>
        <div className="admin-login__divider"></div>

        <form className="admin-login__form" onSubmit={handleSubmit}>
          <div className="admin-login__field">
            <label htmlFor="password" className="admin-login__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="admin-login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your admin password"
              required
              autoFocus
            />
          </div>

          <div className="admin-login__remember">
            <label className="admin-login__checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          {error && (
            <div className="admin-login__error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-login__submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <div className="admin-login__footer">
          Powered by Islander Studio
        </div>
      </div>
    </div>
  );
}
