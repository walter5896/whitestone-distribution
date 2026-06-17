import { Link } from "react-router-dom";
import { CheckCircle2, Phone, Ruler } from "lucide-react";

export function FabricatorCallout() {
  return (
    <section className="fabricator-callout">
      <div className="container fabricator-grid">
        <div>
          <p className="eyebrow">For Fabricators</p>
          <h2>Trade-Friendly Stone Access Without the Corporate Runaround.</h2>
          <p>
            Whitestone works directly with fabricators who need competitive
            pricing, confidential communication, reliable availability, and a
            supplier who understands that your customer relationship matters.
          </p>

          <p>
            Request trade pricing, confirm bundle availability, coordinate
            pickup or delivery, and speak directly with a team that knows the
            material, the jobsite, and the pressure of keeping a project moving.
          </p>

          <div className="fabricator-feature-list">
            <span>
              <CheckCircle2 size={18} /> Confidential trade pricing
            </span>
            <span>
              <Ruler size={18} /> Lot, bundle, slab, and material details
            </span>
            <span>
              <Phone size={18} /> Direct call-first availability confirmation
            </span>
          </div>

          <Link to="/fabricators" className="btn btn-primary">
            Request Fabricator Access
          </Link>
        </div>

        <div className="fabricator-visual">
          <span>Premium Slab Yard / Trade Pickup Visual</span>
        </div>
      </div>
    </section>
  );
}