import { useState, useEffect, useRef } from 'react'
import './Contact.css'
import { EmailIcon, PhoneIcon, LocationIcon } from './icons'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const contactRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (contactRef.current) {
      observer.observe(contactRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    
    // Add subtle animation feedback
    const form = e.target
    form.style.transform = 'scale(0.98)'
    setTimeout(() => {
      form.style.transform = 'scale(1)'
      alert('Thank you for your message! We will get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
    }, 200)
  }

  return (
    <section id="contact" className="contact" ref={contactRef}>
      <div className="section-title-hero" aria-hidden="true">Contact</div>
      <div className="contact-container">
        <div className="section-header">
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">
            Let's start a conversation.
          </p>
        </div>
        <div className="section-content contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <EmailIcon className="contact-icon-svg" />
              </div>
              <div>
                <h3>Email</h3>
                <p>hello@kraken.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <PhoneIcon className="contact-icon-svg" />
              </div>
              <div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <LocationIcon className="contact-icon-svg" />
              </div>
              <div>
                <h3>Location</h3>
                <p>New York, NY</p>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
