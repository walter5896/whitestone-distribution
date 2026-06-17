import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export function HomeCTA() {
  return (
    <section className="home-cta">
      <div className="container home-cta-inner">
        <div>
          <p className="eyebrow">Pricing, Holds, and Pre-Arrival Options</p>
          <h2>See something worth holding?</h2>
          <p>
            Whitestone confirms pricing and availability directly so homeowners,
            builders, designers, and fabricators get accurate answers based on
            current inventory, bundle details, trade status, and project timing.
          </p>
          <p>
            Call to discuss slab holds, pre-arrival opportunities, confidential
            trade pricing, or next-step guidance from someone who knows the
            material.
          </p>
        </div>

        <div className="home-cta-actions">
          <a href="tel:8015550199" className="btn btn-primary">
            <Phone size={18} />
            Call Whitestone
          </a>

          <Link to="/live-inventory" className="btn btn-secondary">
            Browse Inventory
          </Link>
        </div>
      </div>
    </section>
  );
}