import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export function HomeHero() {
  return (
    <section className="home-hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">Premium Stone. Delivered with Pride.</p>

          <div className="hero-rule" />

          <h1>Premium Stone Distribution</h1>

          <div className="hero-rule hero-rule-bottom" />

          <p>
            Whitestone Distribution is your trusted source for premium natural
            and engineered stone. Browse current inventory and call directly for
            pricing, availability, and reservation.
          </p>

          <div className="hero-actions">
            <Link to="/live-inventory" className="btn btn-primary">
              Explore Our Stone Collection
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