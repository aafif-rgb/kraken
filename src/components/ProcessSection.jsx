import './ProcessSection.css'

const steps = [
  { number: '01', title: 'Discover', text: 'We listen. Tell us your vision, goals, and constraints. We shape the concept and creative direction.' },
  { number: '02', title: 'Produce', text: 'On set or on location, we capture the story. Cinematic, intentional, real.' },
  { number: '03', title: 'Craft', text: 'Editing, color, sound. We refine every frame until it hits the mark.' },
  { number: '04', title: 'Deliver', text: 'Final assets, on time. Your story goes out into the world.' },
]

const ProcessSection = () => {
  return (
    <section className="process-section">
      <div className="process-container">
        <h2 className="process-title">How we work</h2>
        <p className="process-intro">
          From first conversation to final delivery, we keep the process clear and collaborative.
        </p>
        <div className="process-grid">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <span className="process-number">{step.number}</span>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-text">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
