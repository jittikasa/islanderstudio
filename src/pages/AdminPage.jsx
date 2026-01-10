import { useAuth } from '../contexts/AuthContext'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function AdminPage() {
  const { isAuthenticated, loading } = useAuth()

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
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />
}
