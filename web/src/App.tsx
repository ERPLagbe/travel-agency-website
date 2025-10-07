import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FrappeProvider } from 'frappe-react-sdk'
import { Navigation, Footer, ErrorBoundary } from './components'
import FloatingActionButtons from './components/FloatingActionButtons'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
// import PackagesPage from './pages/PackagesPage' // Commented out as it's not used
import PackageListingPage from './pages/PackageListingPage'
import ContactPage from './pages/ContactPage'
import PackageDetails from './pages/PackageDetails'
import VisaPage from './pages/VisaPage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import BlogDetailsPage from './pages/BlogDetailsPage'
import TermsPage from './pages/TermsPage'
import BranchPage from './pages/BranchPage'

function App() {
  return (
    <ErrorBoundary>
      <FrappeProvider url={import.meta.env.VITE_API_URL || 'http://localhost:8000'}>
        <Router>
          <div className="App">
            <ScrollToTop />
            <Navigation />
            <Routes>
              <Route path="/web" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />

              {/* <Route path="/packages" element={<PackagesPage />} /> */}
              <Route path="/packages/:id" element={<PackageDetails />} />
              <Route path="/category/:itemGroup" element={<PackageListingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/visa" element={<VisaPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailsPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/branches" element={<BranchPage />} />
            </Routes>
            <Footer />
            <FloatingActionButtons />
          </div>
        </Router>
      </FrappeProvider>
    </ErrorBoundary>
  )
}

export default App