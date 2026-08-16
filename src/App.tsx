import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { AboutSection } from './components/AboutSection'
import { StatsSection } from './components/StatsSection'
import { ChallengeSection } from './components/ChallengeSection'
import { Timeline } from './components/Timeline'
import { PrizeSection } from './components/PrizeSection'
import { MentorsSection } from './components/MentorsSection'
import { SponsorsSection } from './components/SponsorsSection'
import { RulesSection } from './components/RulesSection'
import { FAQ } from './components/FAQ'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { RegisterPage } from './pages/RegisterPage'
import { ResultsPage } from './pages/ResultsPage'

function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <StatsSection />
      <ChallengeSection />
      <Timeline />
      <PrizeSection />
      <MentorsSection />
      <SponsorsSection />
      <RulesSection />
      <FAQ />
      <FinalCTA />
    </>
  )
}

// Hash scroll handler component
function HashScrollHandler() {
  const location = useLocation()

  useEffect(() => {
    // Only handle on home page
    if (location.pathname === '/') {
      const { hash } = location
      if (hash) {
        // Wait for DOM to settle
        const element = document.querySelector(hash)
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        }
      } else {
        // Scroll to top if no hash
        window.scrollTo(0, 0)
      }
    }
  }, [location])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <HashScrollHandler />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
