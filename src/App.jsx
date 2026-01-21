import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'
import ProtectedRoute from './components/ProtectedRoute'

// Eagerly loaded pages (critical path)
import Home from './pages/Home'
import Shellist from './pages/Shellist'
import PolaMoment from './pages/PolaMoment'
import NotFound from './pages/NotFound'

// Lazily loaded pages (code splitting)
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Support = lazy(() => import('./pages/Support'))
const BackgroundShowcase = lazy(() => import('./pages/BackgroundShowcase'))

// Admin pages (separate chunk)
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AdminPage = lazy(() => import('./pages/AdminPage'))

// Loading fallback component
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <LoadingSpinner size="lg" />
      <p style={{ color: 'var(--stone)', fontSize: '0.875rem' }}>Loading...</p>
    </div>
  )
}

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login'
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }, [location.pathname, prefersReducedMotion])

  return (
    <div className="app">
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {!isAdminRoute && <Header />}
      <main className="main-content" id="main-content" tabIndex={-1}>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/shellist" element={<Shellist />} />
                  <Route path="/polamoment" element={<PolaMoment />} />
                  <Route path="/blog" element={
                    <ErrorBoundary message="Unable to load the blog. Please try again.">
                      <Blog />
                    </ErrorBoundary>
                  } />
                  <Route path="/blog/:slug" element={
                    <ErrorBoundary message="Unable to load this blog post. Please try again.">
                      <BlogPost />
                    </ErrorBoundary>
                  } />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/bg" element={<BackgroundShowcase />} />

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/login" element={<AdminLogin />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute>
                        <ErrorBoundary message="Unable to load the admin dashboard. Please try again.">
                          <AdminDashboard />
                        </ErrorBoundary>
                      </ProtectedRoute>
                    }
                  />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default App