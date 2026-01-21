import { useState, useEffect } from 'react'
import { FileText, Users, Tag, FolderOpen, Layers, Clock, Edit, Plus } from 'lucide-react'
import { getDashboardStats, getRecentDashboardPosts } from '../../lib/api'
import './DashboardOverview.css'

function StatCard({ icon: Icon, label, value, subValue, color = 'blue' }) {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card__icon">
        <Icon size={24} />
      </div>
      <div className="stat-card__content">
        <span className="stat-card__value">{value}</span>
        <span className="stat-card__label">{label}</span>
        {subValue && <span className="stat-card__sub">{subValue}</span>}
      </div>
    </div>
  )
}

function formatDate(dateString) {
  if (!dateString) return 'Never'
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

export default function DashboardOverview({ onNavigate }) {
  const [stats, setStats] = useState(null)
  const [recentPosts, setRecentPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [statsData, postsData] = await Promise.all([
          getDashboardStats(),
          getRecentDashboardPosts(5)
        ])
        setStats(statsData)
        setRecentPosts(postsData)
        setError(null)
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="dashboard-overview dashboard-overview--loading">
        <div className="loading-spinner" />
        <p>Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-overview dashboard-overview--error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    )
  }

  return (
    <div className="dashboard-overview">
      {/* Stats Cards */}
      <section className="dashboard-section">
        <h2 className="dashboard-section__title">Overview</h2>
        <div className="stats-grid">
          <StatCard
            icon={FileText}
            label="Total Posts"
            value={stats?.posts?.total || 0}
            subValue={stats?.posts?.thisWeek > 0 ? `+${stats.posts.thisWeek} this week` : null}
            color="blue"
          />
          <StatCard
            icon={Clock}
            label="Published"
            value={stats?.posts?.published || 0}
            color="green"
          />
          <StatCard
            icon={Edit}
            label="Drafts"
            value={stats?.posts?.drafts || 0}
            color="orange"
          />
          <StatCard
            icon={Users}
            label="Authors"
            value={stats?.authors || 0}
            color="purple"
          />
          <StatCard
            icon={FolderOpen}
            label="Categories"
            value={stats?.categories || 0}
            color="teal"
          />
          <StatCard
            icon={Tag}
            label="Tags"
            value={stats?.tags || 0}
            color="pink"
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="dashboard-section">
        <h2 className="dashboard-section__title">Quick Actions</h2>
        <div className="quick-actions">
          <button
            className="quick-action quick-action--primary"
            onClick={() => onNavigate('posts', 'new')}
          >
            <Plus size={20} />
            <span>New Post</span>
          </button>
          <button
            className="quick-action"
            onClick={() => onNavigate('media')}
          >
            <Layers size={20} />
            <span>Media Library</span>
          </button>
          <button
            className="quick-action"
            onClick={() => onNavigate('categories')}
          >
            <FolderOpen size={20} />
            <span>Manage Categories</span>
          </button>
          <button
            className="quick-action"
            onClick={() => onNavigate('tags')}
          >
            <Tag size={20} />
            <span>Manage Tags</span>
          </button>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="dashboard-section">
        <div className="dashboard-section__header">
          <h2 className="dashboard-section__title">Recent Posts</h2>
          <button
            className="dashboard-section__link"
            onClick={() => onNavigate('posts')}
          >
            View all
          </button>
        </div>
        <div className="recent-posts">
          {recentPosts.length === 0 ? (
            <div className="recent-posts__empty">
              <p>No posts yet</p>
              <button onClick={() => onNavigate('posts', 'new')}>
                Create your first post
              </button>
            </div>
          ) : (
            <ul className="recent-posts__list">
              {recentPosts.map((post) => (
                <li key={post.id} className="recent-posts__item">
                  <div className="recent-posts__info">
                    <span className="recent-posts__title">{post.title}</span>
                    <span className="recent-posts__meta">
                      {post.author_name && <span>{post.author_name}</span>}
                      <span className="recent-posts__time">
                        {formatDate(post.updated_at)}
                      </span>
                    </span>
                  </div>
                  <span className={`status-badge status-badge--${post.status}`}>
                    {post.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
