import './PageHero.css'

const PageHero = ({ title, subtitle }) => {
  return (
    <header className="page-hero">
      <div className="page-hero-inner">
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
      </div>
    </header>
  )
}

export default PageHero
