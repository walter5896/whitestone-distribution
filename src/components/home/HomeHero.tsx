import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export function HomeHero() {
  return (
    <section className="home-hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">
            45 Years of Stone Expertise · Premium Natural Stone
          </p>

          <div className="hero-rule" />

          <h1>Rare Stone, Personally Sourced</h1>

          <div className="hero-rule hero-rule-bottom" />

          <p>
            Whitestone Distribution supplies premium natural stone selected
            through decades of experience, trusted quarry relationships, and a
            sharp eye for rare materials.
          </p>

          <div className="hero-actions">
            <Link to="/live-inventory" className="btn btn-primary">
              Explore Current Inventory
            </Link>

            <a href="tel:8015550199" className="btn btn-secondary">
              <Phone size={17} />
              Call for Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}