import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FrappeProvider } from 'frappe-react-sdk'
import { Navigation, Footer } from './components'
import HomePage from './pages/HomePage'
import PackagesPage from './pages/PackagesPage'
import ContactPage from './pages/ContactPage'
import PackageDetails from './pages/PackageDetails'
import VisaPage from './pages/VisaPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <FrappeProvider url='http://localhost:8000'>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/:id" element={<PackageDetails />} />
            <Route path="/hajj/:id" element={<PackageDetails />} />
            <Route path="/umrah/:id" element={<PackageDetails />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/visa" element={<VisaPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </FrappeProvider>
  )
}

export default App