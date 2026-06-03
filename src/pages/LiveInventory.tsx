import { InventoryFilters } from "../components/inventory/InventoryFilters";
import { InventoryGrid } from "../components/inventory/InventoryGrid";
import { PricingNotice } from "../components/inventory/PricingNotice";
import { mockSlabs } from "../data/mockSlabs";
import { useInventoryFilters } from "../hooks/useInventoryFilters";

export function LiveInventory() {
  const { filters, setFilters, filteredSlabs, resetFilters } =
    useInventoryFilters(mockSlabs);

  return (
    <>
      <section className="inventory-page-hero">
        <div className="container">
          <p className="eyebrow">Live Inventory</p>
          <h1>Browse Current Slabs</h1>
          <p>
            Search available stone by material, color, thickness, finish, and
            availability. Public inventory is visible, while pricing is handled
            directly by phone.
          </p>
        </div>
      </section>

      <section className="inventory-page">
        <div className="container inventory-layout">
          <InventoryFilters
            filters={filters}
            onChange={setFilters}
            onReset={resetFilters}
          />

          <div>
            <PricingNotice />

            <div className="inventory-results-header">
              <div>
                <p className="eyebrow">Inventory Results</p>
                <h2>{filteredSlabs.length} slabs shown</h2>
              </div>
              <p>
                Call to confirm pricing, availability, and reservation details.
              </p>
            </div>

            <InventoryGrid slabs={filteredSlabs} />
          </div>
        </div>
      </section>
    </>
  );
}