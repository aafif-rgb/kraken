import PageHero from '../components/PageHero'
import Portfolio from '../components/Portfolio'
import PageCTA from '../components/PageCTA'

function PortfolioPage() {
  return (
    <>
      <PageHero
        title="Portfolio"
        subtitle="A selection of our work across video production, photography, and brand content. Real moments, real stories."
      />
      <Portfolio standalone />
      <PageCTA
        title="Have a project in mind?"
        description="We’d love to hear about your next project and how we can help bring it to life."
        buttonText="Let's talk"
        buttonLink="/contact"
      />
    </>
  )
}

export default PortfolioPage
