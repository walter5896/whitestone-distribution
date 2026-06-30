import type { ReactNode } from "react";
import { Boxes, Hash, Phone, Ruler, Tag, Weight } from "lucide-react";
import type { Slab } from "../../types/slab";
import { PricingNotice } from "./PricingNotice";
import { SlabStatusBadge } from "./SlabStatusBadge";

type SlabDetailsPanelProps = {
  slab: Slab;
};

type SupplierSpec = {
  label: string;
  value: string;
  icon?: ReactNode;
};

function formatInventoryType(inventoryType: Slab["inventoryType"]) {
  return inventoryType === "full_slab" ? "Full Slab" : "Remnant";
}

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
    return `${slabCount} slab${slabCount === 1 ? "" : "s"} | ${cleanValue}`;
  }

  return cleanValue;
}

export function SlabDetailsPanel({ slab }: SlabDetailsPanelProps) {
  const availableSlabs = getAvailableSlabSummary(slab.slabNumbers);

  const supplierSpecs = [
    slab.bundleId
      ? {
          label: "Bundle ID",
          value: slab.bundleId,
          icon: <Boxes size={17} />,
        }
      : null,
    slab.blockId
      ? {
          label: "Block ID",
          value: slab.blockId,
          icon: <Hash size={17} />,
        }
      : null,
    slab.qualityGrade
      ? {
          label: "Quality / Grade",
          value: slab.qualityGrade,
        }
      : null,
    slab.averageSize
      ? {
          label: "Average Size",
          value: slab.averageSize,
          icon: <Ruler size={17} />,
        }
      : null,
    slab.areaSqft
      ? {
          label: "Area",
          value: slab.areaSqft,
        }
      : null,
    slab.weight
      ? {
          label: "Weight",
          value: slab.weight,
          icon: <Weight size={17} />,
        }
      : null,
    availableSlabs
      ? {
          label: "Slab Numbers / Count",
          value: availableSlabs,
        }
      : null,
  ].filter(Boolean) as SupplierSpec[];

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
          <strong>{slab.materialType || "Not listed"}</strong>
        </div>

        <div>
          <span>Color Family</span>
          <strong>{slab.colorFamily || "Not listed"}</strong>
        </div>

        <div>
          <span>Thickness</span>
          <strong>{slab.thickness || "Not listed"}</strong>
        </div>

        <div>
          <span>Dimensions</span>
          <strong>{slab.dimensions || "Not listed"}</strong>
        </div>

        <div>
          <span>Finish</span>
          <strong>{slab.finish || "Not listed"}</strong>
        </div>

        <div>
          <span>Inventory Type</span>
          <strong>{formatInventoryType(slab.inventoryType)}</strong>
        </div>
      </div>

      {supplierSpecs.length > 0 && (
        <div className="slab-supplier-block">
          <h2>Supplier Inventory Details</h2>

          <div className="slab-supplier-spec-list">
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
        </div>
      )}

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
          Call directly for current pricing, availability, bundle details, and
          reservation options.
        </p>

        <div className="slab-actions">
          <a href="tel:8014009496" className="btn btn-primary">
            <Phone size={18} />
            Call for Pricing or to Reserve
          </a>
        </div>
      </div>
    </aside>
  );
}