import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import AuthorManager from '../components/admin/AuthorManager'
import CategoryManager from '../components/admin/CategoryManager'
import TagManager from '../components/admin/TagManager'
import AppManager from '../components/admin/AppManager'
import PostManager from '../components/admin/PostManager'
import MediaLibrary from '../components/admin/MediaLibrary'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('posts')
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <div className="admin-dashboard">
      <SEO
        title="Admin Dashboard - Islander Studio"
        description="Content management dashboard"
        path="/admin"
      />

      <div className="admin-header">
        <h1>Content Management</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button
          className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`}
          onClick={() => setActiveTab('media')}
        >
          Media
        </button>
        <button
          className={`tab-btn ${activeTab === 'authors' ? 'active' : ''}`}
          onClick={() => setActiveTab('authors')}
        >
          Authors
        </button>
        <button
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button
          className={`tab-btn ${activeTab === 'tags' ? 'active' : ''}`}
          onClick={() => setActiveTab('tags')}
        >
          Tags
        </button>
        <button
          className={`tab-btn ${activeTab === 'apps' ? 'active' : ''}`}
          onClick={() => setActiveTab('apps')}
        >
          Apps
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'posts' && <PostManager />}
        {activeTab === 'media' && <MediaLibrary />}
        {activeTab === 'authors' && <AuthorManager />}
        {activeTab === 'categories' && <CategoryManager />}
        {activeTab === 'tags' && <TagManager />}
        {activeTab === 'apps' && <AppManager />}
      </div>
    </div>
  )
}
