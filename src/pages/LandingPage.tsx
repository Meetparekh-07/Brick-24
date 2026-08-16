import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { AboutSection } from '../components/AboutSection'
import { StatsSection } from '../components/StatsSection'
import { ChallengeSection } from '../components/ChallengeSection'
import { Timeline } from '../components/Timeline'
import { PrizeSection } from '../components/PrizeSection'
import { MentorsSection } from '../components/MentorsSection'
import { SponsorsSection } from '../components/SponsorsSection'
import { RulesSection } from '../components/RulesSection'
import { FAQ } from '../components/FAQ'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
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
      </main>
      <Footer />
    </>
  )
}
