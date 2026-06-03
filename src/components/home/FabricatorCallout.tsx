import { Link } from "react-router-dom";
import { CheckCircle2, Phone, Ruler } from "lucide-react";

export function FabricatorCallout() {
  return (
    <section className="fabricator-callout">
      <div className="container fabricator-grid">
        <div>
          <p className="eyebrow">For Fabricators</p>
          <h2>Fast Slab Access for Trade Professionals.</h2>
          <p>
            Built for fabricators who need current availability, clear slab
            details, direct communication, and competitive pricing without
            digging through a generic contractor site.
          </p>

          <div className="fabricator-feature-list">
            <span>
              <CheckCircle2 size={18} /> Current availability
            </span>
            <span>
              <Ruler size={18} /> Dimensions, thickness, and finish
            </span>
            <span>
              <Phone size={18} /> Call-first reservation
            </span>
          </div>

          <Link to="/fabricators" className="btn btn-primary">
            Fabricator Access
          </Link>
        </div>

        <div className="fabricator-visual">
          <span>Slab Yard / Warehouse Visual</span>
        </div>
      </div>
    </section>
  );
}