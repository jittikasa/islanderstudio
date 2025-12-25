import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ShellistOriginal from './pages/ShellistOriginal'
import PolaMomentOriginal from './pages/PolaMomentOriginal'
import Privacy from './pages/Privacy'
import Support from './pages/Support'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shellist" element={<ShellistOriginal />} />
          <Route path="/polamoment" element={<PolaMomentOriginal />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
