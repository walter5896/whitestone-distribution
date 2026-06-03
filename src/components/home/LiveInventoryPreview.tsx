import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { mockSlabs } from "../../data/mockSlabs";
import { SectionHeading } from "../ui/SectionHeading";

function getStatusLabel(status: string) {
  switch (status) {
    case "available":
      return "Available";
    case "on_hold":
      return "On Hold";
    case "sold":
      return "Sold";
    case "limited":
      return "Limited";
    default:
      return status;
  }
}

export function LiveInventoryPreview() {
  return (
    <section className="home-section inventory-preview-section">
      <div className="container">
        <SectionHeading
          eyebrow="Live Inventory Preview"
          title="Current Slabs, Ready to Browse"
          description="A preview of available inventory. Pricing and reservation are confirmed directly by phone."
        />

        <div className="inventory-preview-grid">
          {mockSlabs.map((slab) => (
            <Link
              key={slab.id}
              to={`/live-inventory/${slab.slug}`}
              className="inventory-card"
            >
              <img src={slab.imageUrl} alt={slab.name} className="inventory-card-image" />

              <div className="inventory-card-body">
                <div className="inventory-card-topline">
                  <span>{slab.materialType}</span>
                  <span className={`status-dot status-${slab.status}`} />
                </div>
                <h3>{slab.name}</h3>
                <p>
                  {slab.thickness} · {slab.dimensions} · {slab.finish}
                </p>
                <div className="inventory-card-footer">
                  <span>{getStatusLabel(slab.status)}</span>
                  <ArrowRight size={17} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="center-action">
          <Link to="/live-inventory" className="btn btn-primary">
            View All Live Inventory
          </Link>
        </div>
      </div>
    </section>
  );
}