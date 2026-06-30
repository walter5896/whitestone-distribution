import { Link } from "react-router-dom";
import { ArrowRight, Ruler } from "lucide-react";
import type { Slab } from "../../types/slab";
import { SlabStatusBadge } from "./SlabStatusBadge";

type InventoryCardProps = {
  slab: Slab;
};

function InventoryCard({ slab }: InventoryCardProps) {
  return (
    <article className="inventory-list-card">
      <Link
        to={`/live-inventory/${slab.slug}`}
        className="inventory-list-image-wrap"
      >
        <img
          src={slab.imageUrl}
          alt={slab.name}
          className="inventory-list-image"
        />
      </Link>

      <div className="inventory-list-body">
        <div className="inventory-list-meta">
          <span>{slab.materialType}</span>
          <SlabStatusBadge status={slab.status} />
        </div>

        <h3>
          <Link to={`/live-inventory/${slab.slug}`}>{slab.name}</Link>
        </h3>

        <p>{slab.description}</p>

        <div className="inventory-spec-grid">
          <span>
            <Ruler size={15} />
            {slab.thickness}
          </span>
          <span>{slab.dimensions}</span>
          <span>{slab.finish}</span>
          <span>
            {slab.inventoryType === "full_slab" ? "Full Slab" : "Remnant"}
          </span>
        </div>

        <div className="inventory-tags">
          {slab.styleTags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="inventory-list-actions">
          <Link
            to={`/live-inventory/${slab.slug}`}
            className="btn btn-secondary"
          >
            View Details
            <ArrowRight size={16} />
          </Link>

          <a href="tel:8014009496" className="btn btn-primary">
            Call for Pricing
          </a>
        </div>
      </div>
    </article>
  );
}

export { InventoryCard };
export default InventoryCard;
