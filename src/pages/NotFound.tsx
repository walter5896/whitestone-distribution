import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="page-section">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">
          Back Home
        </Link>
      </div>
    </section>
  );
}
