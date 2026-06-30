import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export function FabricatorHero() {
  return (
    <section className="fabricators-hero">
      <div className="container fabricators-hero-grid">
        <div>
          <p className="eyebrow">For Fabricators</p>
          <h1>Fast Slab Access for Trade Professionals.</h1>
          <p>
            Whitestone Distribution is built for fabricators who need current
            slab availability, clear material details, direct communication, and
            competitive pricing without digging through a generic contractor
            website.
          </p>

          <div className="fabricators-hero-actions">
            <Link to="/live-inventory" className="btn btn-primary">
              Browse Live Inventory
            </Link>

            <a href="tel:8014009496" className="btn btn-secondary">
              <Phone size={17} />
              Call to Reserve
            </a>
          </div>
        </div>

        <div className="fabricators-hero-visual">
          <span>Trade-Focused Slab Inventory</span>
        </div>
      </div>
    </section>
  );
}
