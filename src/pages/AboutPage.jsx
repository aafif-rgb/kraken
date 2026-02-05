import PageHero from '../components/PageHero'
import KrakenStorySection from '../components/KrakenStorySection'
import About from '../components/About'
import ValuesSection from '../components/ValuesSection'
import PageCTA from '../components/PageCTA'

function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Story"
        subtitle="We’re a video production and photography studio built on craft, intention, and the belief that the best stories come from the deep."
      />
      <KrakenStorySection />
      <About standalone />
      <ValuesSection />
      <PageCTA
        title="Work with us"
        description="Ready to create something together? Get in touch and let’s start the conversation."
        buttonText="Contact us"
        buttonLink="/contact"
      />
    </>
  )
}

export default AboutPage
