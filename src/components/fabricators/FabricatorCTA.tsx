import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export function FabricatorCTA() {
  return (
    <section className="fabricator-cta-section">
      <div className="container fabricator-cta-card">
        <div>
          <p className="eyebrow">Direct Access</p>
          <h2>Need pricing or want to hold a slab?</h2>
          <p>
            Browse the live inventory first, then call directly to confirm
            pricing, current availability, and reservation details.
          </p>
        </div>

        <div className="fabricator-cta-actions">
          <Link to="/live-inventory" className="btn btn-primary">
            View Inventory
          </Link>

          <a href="tel:8014009496" className="btn btn-secondary">
            <Phone size={18} />
            Call Whitestone
          </a>
        </div>
      </div>
    </section>
  );
}
