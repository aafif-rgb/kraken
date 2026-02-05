import './ValuesSection.css'

const values = [
  { title: 'Intentional', text: 'Every frame has a purpose. We don’t shoot for the sake of it—we build stories that mean something.' },
  { title: 'Real', text: 'Documentary and editorial at heart. We capture genuine moments and authentic emotion.' },
  { title: 'Bold', text: 'High contrast, moody, cinematic. We’re not afraid of the dark or the dramatic.' },
  { title: 'Collaborative', text: 'Your vision and our craft. We work with you from concept to delivery.' },
]

const ValuesSection = () => {
  return (
    <section className="values-section">
      <div className="values-container">
        <h2 className="values-title">What we believe</h2>
        <p className="values-intro">
          Our approach is built on a few principles that guide every project.
        </p>
        <div className="values-grid">
          {values.map((item, index) => (
            <div key={index} className="value-card">
              <h3 className="value-card-title">{item.title}</h3>
              <p className="value-card-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesSection
