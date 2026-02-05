import PageHero from '../components/PageHero'
import Services from '../components/Services'
import ProcessSection from '../components/ProcessSection'
import PageCTA from '../components/PageCTA'

function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="From concept to final cut. We bring your vision to life with video production, photography, post-production, and more."
      />
      <Services standalone />
      <ProcessSection />
      <PageCTA
        title="Ready to start?"
        description="Tell us about your project. We’ll get back within 24 hours."
        buttonText="Get in touch"
        buttonLink="/contact"
      />
    </>
  )
}

export default ServicesPage
