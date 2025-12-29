import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shellist from './pages/Shellist'
import PolaMoment from './pages/PolaMoment'
import PostcardStudio from './pages/PostcardStudio'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Privacy from './pages/Privacy'
import Support from './pages/Support'
import NotFound from './pages/NotFound'

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shellist" element={<Shellist />} />
          <Route path="/polamoment" element={<PolaMoment />} />
          <Route path="/postcard-studio" element={<PostcardStudio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
