import { Phone, Tag } from "lucide-react";
import type { Slab } from "../../types/slab";
import { PricingNotice } from "./PricingNotice";
import { SlabStatusBadge } from "./SlabStatusBadge";

type SlabDetailsPanelProps = {
  slab: Slab;
};

export function SlabDetailsPanel({ slab }: SlabDetailsPanelProps) {
  return (
    <aside className="slab-details-panel">
      <div className="slab-panel-header">
        <div>
          <p className="eyebrow">{slab.materialType}</p>
          <h1>{slab.name}</h1>
        </div>

        <SlabStatusBadge status={slab.status} />
      </div>

      <p className="slab-description">{slab.description}</p>

      <div className="slab-spec-list">
        <div>
          <span>Material</span>
          <strong>{slab.materialType}</strong>
        </div>

        <div>
          <span>Color Family</span>
          <strong>{slab.colorFamily}</strong>
        </div>

        <div>
          <span>Thickness</span>
          <strong>{slab.thickness}</strong>
        </div>

        <div>
          <span>Dimensions</span>
          <strong>{slab.dimensions}</strong>
        </div>

        <div>
          <span>Finish</span>
          <strong>{slab.finish}</strong>
        </div>

        <div>
          <span>Inventory Type</span>
          <strong>
            {slab.inventoryType === "full_slab" ? "Full Slab" : "Remnant"}
          </strong>
        </div>
      </div>

      {slab.styleTags.length > 0 && (
        <div className="slab-tags-block">
          <h2>
            <Tag size={18} />
            Style Tags
          </h2>

          <div className="inventory-tags">
            {slab.styleTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      )}

      <PricingNotice />

      <div className="slab-action-card">
        <h2>Interested in this slab?</h2>
        <p>
          Call directly for current pricing, availability, and reservation
          details.
        </p>

        <div className="slab-actions">
          <a href="tel:8015550199" className="btn btn-primary">
            <Phone size={18} />
            Call for Pricing or to Reserve
          </a>
        </div>
      </div>
    </aside>
  );
}