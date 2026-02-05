import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="our-story" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
