import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Boxes, Hash, Ruler } from "lucide-react";
import type { Slab } from "../../types/slab";
import { SlabStatusBadge } from "./SlabStatusBadge";

type InventoryCardProps = {
  slab: Slab;
};

type SupplierSpec = {
  label: string;
  value: string;
  icon?: ReactNode;
};

function getAvailableSlabSummary(slabNumbers: string) {
  const cleanValue = slabNumbers.trim();

  if (!cleanValue) {
    return "";
  }

  const lowerValue = cleanValue.toLowerCase();

  if (lowerValue.includes("slab")) {
    return cleanValue;
  }

  const slabCount = cleanValue
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean).length;

  if (slabCount > 0) {
    return `${slabCount} slab${slabCount === 1 ? "" : "s"}`;
  }

  return cleanValue;
}

function InventoryCard({ slab }: InventoryCardProps) {
  const availableSlabs = getAvailableSlabSummary(slab.slabNumbers);

  const supplierSpecs = [
    slab.bundleId
      ? {
          label: "Bundle",
          value: slab.bundleId,
          icon: <Boxes size={15} />,
        }
      : null,
    slab.blockId
      ? {
          label: "Block",
          value: slab.blockId,
          icon: <Hash size={15} />,
        }
      : null,
    slab.qualityGrade
      ? {
          label: "Quality",
          value: slab.qualityGrade,
        }
      : null,
    slab.averageSize
      ? {
          label: "Avg. Size",
          value: slab.averageSize,
          icon: <Ruler size={15} />,
        }
      : null,
    availableSlabs
      ? {
          label: "Available",
          value: availableSlabs,
        }
      : null,
  ].filter(Boolean) as SupplierSpec[];

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
          loading="lazy"
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
            {slab.thickness || "Thickness TBD"}
          </span>
          <span>{slab.dimensions || "Dimensions TBD"}</span>
          <span>{slab.finish || "Finish TBD"}</span>
          <span>
            {slab.inventoryType === "full_slab" ? "Full Slab" : "Remnant"}
          </span>
        </div>

        {supplierSpecs.length > 0 && (
          <div className="inventory-supplier-specs">
            {supplierSpecs.map((spec) => (
              <div key={`${spec.label}-${spec.value}`}>
                <span>
                  {spec.icon}
                  {spec.label}
                </span>
                <strong>{spec.value}</strong>
              </div>
            ))}
          </div>
        )}

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