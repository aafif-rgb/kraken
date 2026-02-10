import { Link } from 'react-router-dom'
import './NotFoundPage.css'

function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found-bg" aria-hidden="true" />
      <div className="not-found-content">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Lost in the deep</h1>
        <p className="not-found-text">
          This page slipped beneath the surface. Whatever you were looking for isn’t here—or the currents have taken it elsewhere.
        </p>
        <Link to="/" className="not-found-link">
          Return to surface
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
