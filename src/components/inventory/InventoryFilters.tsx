import type { SlabStatus } from "../../types/slab";

export type InventoryFiltersState = {
  search: string;
  materialType: string;
  colorFamily: string;
  thickness: string;
  status: SlabStatus | "all";
  inventoryType: "all" | "full_slab" | "remnant";
};

type InventoryFiltersProps = {
  filters: InventoryFiltersState;
  onChange: (filters: InventoryFiltersState) => void;
  onReset: () => void;
};

export function InventoryFilters({
  filters,
  onChange,
  onReset,
}: InventoryFiltersProps) {
  return (
    <aside className="inventory-filters">
      <div className="filter-header">
        <h2>Filter Inventory</h2>
        <button type="button" onClick={onReset}>
          Reset
        </button>
      </div>

      <label>
        Search
        <input
          type="search"
          placeholder="Taj Mahal, black, quartzite..."
          value={filters.search}
          onChange={(event) =>
            onChange({ ...filters, search: event.target.value })
          }
        />
      </label>

      <label>
        Material
        <select
          value={filters.materialType}
          onChange={(event) =>
            onChange({ ...filters, materialType: event.target.value })
          }
        >
          <option value="all">All Materials</option>
          <option value="Granite">Granite</option>
          <option value="Quartzite">Quartzite</option>
          <option value="Marble">Marble</option>
          <option value="Quartz">Quartz</option>
          <option value="Exotic Stone">Exotic Stone</option>
        </select>
      </label>

      <label>
        Color Family
        <select
          value={filters.colorFamily}
          onChange={(event) =>
            onChange({ ...filters, colorFamily: event.target.value })
          }
        >
          <option value="all">All Colors</option>
          <option value="Cream / Gold">Cream / Gold</option>
          <option value="White / Gold">White / Gold</option>
          <option value="Black / Gold">Black / Gold</option>
          <option value="Green / Blue">Green / Blue</option>
        </select>
      </label>

      <label>
        Thickness
        <select
          value={filters.thickness}
          onChange={(event) =>
            onChange({ ...filters, thickness: event.target.value })
          }
        >
          <option value="all">All Thicknesses</option>
          <option value="2cm">2cm</option>
          <option value="3cm">3cm</option>
        </select>
      </label>

      <label>
        Status
        <select
          value={filters.status}
          onChange={(event) =>
            onChange({
              ...filters,
              status: event.target.value as InventoryFiltersState["status"],
            })
          }
        >
          <option value="all">All Statuses</option>
          <option value="available">Available</option>
          <option value="limited">Limited</option>
          <option value="on_hold">On Hold</option>
          <option value="sold">Sold</option>
        </select>
      </label>

      <label>
        Inventory Type
        <select
          value={filters.inventoryType}
          onChange={(event) =>
            onChange({
              ...filters,
              inventoryType: event.target
                .value as InventoryFiltersState["inventoryType"],
            })
          }
        >
          <option value="all">All Inventory</option>
          <option value="full_slab">Full Slabs</option>
          <option value="remnant">Remnants</option>
        </select>
      </label>
    </aside>
  );
}