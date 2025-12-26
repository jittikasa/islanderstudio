import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ShellistOriginal from './pages/ShellistOriginal'
import PolaMomentOriginal from './pages/PolaMomentOriginal'
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
          <Route path="/shellist" element={<ShellistOriginal />} />
          <Route path="/polamoment" element={<PolaMomentOriginal />} />
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
