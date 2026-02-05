import PageHero from '../components/PageHero'
import Contact from '../components/Contact'

function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Have a project in mind or just want to say hello? We typically respond within 24 hours."
      />
      <Contact standalone />
    </>
  )
}

export default ContactPage
