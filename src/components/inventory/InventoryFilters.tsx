import type { Dispatch, SetStateAction } from "react";
import type { SlabStatus } from "../../types/slab";

export type InventoryFiltersState = {
  search: string;
  materialType: string;
  colorFamily: string;
  thickness: string;
  inventoryType: string;
  status: SlabStatus | "all";
};

type InventoryFiltersProps = {
  filters: InventoryFiltersState;
  onFiltersChange: Dispatch<SetStateAction<InventoryFiltersState>>;
  materialOptions: string[];
  colorOptions: string[];
};

const thicknessOptions = ["2cm", "3cm"];

const inventoryTypeOptions = [
  {
    label: "Full Slab",
    value: "full_slab",
  },
  {
    label: "Remnant",
    value: "remnant",
  },
];

const statusOptions: Array<{
  label: string;
  value: SlabStatus | "all";
}> = [
  {
    label: "All Statuses",
    value: "all",
  },
  {
    label: "Available",
    value: "available",
  },
  {
    label: "On Hold",
    value: "on_hold",
  },
  {
    label: "Limited",
    value: "limited",
  },
  {
    label: "Sold",
    value: "sold",
  },
];

export function InventoryFilters({
  filters,
  onFiltersChange,
  materialOptions,
  colorOptions,
}: InventoryFiltersProps) {
  function updateFilter<Key extends keyof InventoryFiltersState>(
    key: Key,
    value: InventoryFiltersState[Key]
  ) {
    onFiltersChange((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  }

  function resetFilters() {
    onFiltersChange({
      search: "",
      materialType: "all",
      colorFamily: "all",
      thickness: "all",
      inventoryType: "all",
      status: "all",
    });
  }

  return (
    <section className="inventory-filters" aria-label="Inventory filters">
      <div className="inventory-search">
        <label htmlFor="inventory-search">Search Inventory</label>
        <input
          id="inventory-search"
          type="search"
          placeholder="Search by stone, material, color, finish, or tag..."
          value={filters.search}
          onChange={(event) => updateFilter("search", event.target.value)}
        />
      </div>

      <div className="inventory-filter-grid">
        <div className="filter-control">
          <label htmlFor="material-filter">Material</label>
          <select
            id="material-filter"
            value={filters.materialType}
            onChange={(event) =>
              updateFilter("materialType", event.target.value)
            }
          >
            <option value="all">All Materials</option>
            {materialOptions.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-control">
          <label htmlFor="color-filter">Color Family</label>
          <select
            id="color-filter"
            value={filters.colorFamily}
            onChange={(event) =>
              updateFilter("colorFamily", event.target.value)
            }
          >
            <option value="all">All Colors</option>
            {colorOptions.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-control">
          <label htmlFor="thickness-filter">Thickness</label>
          <select
            id="thickness-filter"
            value={filters.thickness}
            onChange={(event) =>
              updateFilter("thickness", event.target.value)
            }
          >
            <option value="all">All Thicknesses</option>
            {thicknessOptions.map((thickness) => (
              <option key={thickness} value={thickness}>
                {thickness}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-control">
          <label htmlFor="inventory-type-filter">Inventory Type</label>
          <select
            id="inventory-type-filter"
            value={filters.inventoryType}
            onChange={(event) =>
              updateFilter("inventoryType", event.target.value)
            }
          >
            <option value="all">All Types</option>
            {inventoryTypeOptions.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-control">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(event) =>
              updateFilter(
                "status",
                event.target.value as InventoryFiltersState["status"]
              )
            }
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-control filter-control-button">
          <button type="button" className="btn btn-secondary" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>
    </section>
  );
}