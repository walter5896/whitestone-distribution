import type { Slab } from "../../types/slab";
import InventoryCard from "./InventoryCard";

type InventoryGridProps = {
  slabs: Slab[];
};

function InventoryGrid({ slabs }: InventoryGridProps) {
  if (slabs.length === 0) {
    return (
      <div className="inventory-empty">
        <h2>No slabs found</h2>
        <p>Try adjusting the filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="inventory-list-grid">
      {slabs.map((slab) => (
        <InventoryCard key={slab.id} slab={slab} />
      ))}
    </div>
  );
}

export { InventoryGrid };
export default InventoryGrid;