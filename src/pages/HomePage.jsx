import Hero from '../components/Hero'
import HomeIntro from '../components/HomeIntro'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import PageCTA from '../components/PageCTA'
import { useLayout } from '../context/LayoutContext'

function HomePage() {
  const { isInHero } = useLayout()

  return (
    <>
      <Hero isInHero={isInHero} />
      <HomeIntro />
      <Services standalone limit={3} />
      <Portfolio standalone limit={3} />
      <PageCTA
        title="Ready to start?"
        description="Tell us about your project. We’d love to hear from you."
        buttonText="Get in touch"
        buttonLink="/contact"
      />
    </>
  )
}

export default HomePage
