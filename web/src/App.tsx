import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation, Footer } from './components'
import HomePage from './pages/HomePage'
import PackagesPage from './pages/PackagesPage'
import ContactPage from './pages/ContactPage'
import PackageDetailsPage from './pages/PackageDetailsPage'
import VisaPage from './pages/VisaPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/packages/:id" element={<PackageDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/visa" element={<VisaPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App