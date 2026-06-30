import type { Dispatch, SetStateAction } from "react";
import type { Slab } from "../../types/slab";

export type InventoryFiltersState = {
  search: string;
  materialType: string;
  colorFamily: string;
  thickness: string;
  inventoryType: Slab["inventoryType"] | "all";
  finish: string;
  status: Slab["status"] | "all";
};

type InventoryFiltersProps = {
  filters: InventoryFiltersState;
  onFiltersChange: Dispatch<SetStateAction<InventoryFiltersState>>;
  materialOptions: string[];
  colorOptions: string[];
  thicknessOptions?: string[];
  inventoryTypeOptions?: string[];
  finishOptions?: string[];
  statusOptions?: string[];
};

const fallbackThicknessOptions = ["2cm", "3cm"];
const fallbackInventoryTypeOptions = ["full_slab", "remnant"];
const fallbackFinishOptions = ["Polished", "Leathered", "Honed"];
const fallbackStatusOptions = ["available", "limited", "on_hold", "sold"];

function formatOptionLabel(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function InventoryFilters({
  filters,
  onFiltersChange,
  materialOptions,
  colorOptions,
  thicknessOptions = fallbackThicknessOptions,
  inventoryTypeOptions = fallbackInventoryTypeOptions,
  finishOptions = fallbackFinishOptions,
  statusOptions = fallbackStatusOptions,
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
      finish: "all",
      status: "available",
    });
  }

  return (
    <aside className="inventory-sidebar-card">
      <div className="inventory-sidebar-header">
        <h2 className="inventory-sidebar-label">Refine Results</h2>
      </div>

      <div className="inventory-filter-group">
        <label htmlFor="inventory-search">Search by Stone</label>
        <input
          id="inventory-search"
          type="search"
          value={filters.search}
          placeholder="Search by stone, material, color, finish, or tag..."
          onChange={(event) => updateFilter("search", event.target.value)}
        />
      </div>

      <div className="inventory-filter-group">
        <label htmlFor="inventory-material">Material</label>
        <select
          id="inventory-material"
          value={filters.materialType}
          onChange={(event) => updateFilter("materialType", event.target.value)}
        >
          <option value="all">All Materials</option>
          {materialOptions.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
      </div>

      <div className="inventory-filter-group">
        <label htmlFor="inventory-color">Color Family</label>
        <select
          id="inventory-color"
          value={filters.colorFamily}
          onChange={(event) => updateFilter("colorFamily", event.target.value)}
        >
          <option value="all">All Colors</option>
          {colorOptions.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className="inventory-filter-group">
        <label htmlFor="inventory-thickness">Thickness</label>
        <select
          id="inventory-thickness"
          value={filters.thickness}
          onChange={(event) => updateFilter("thickness", event.target.value)}
        >
          <option value="all">All Thicknesses</option>
          {thicknessOptions.map((thickness) => (
            <option key={thickness} value={thickness}>
              {thickness}
            </option>
          ))}
        </select>
      </div>

      <div className="inventory-filter-group">
        <label htmlFor="inventory-type">Inventory Type</label>
        <select
          id="inventory-type"
          value={filters.inventoryType}
          onChange={(event) =>
            updateFilter(
              "inventoryType",
              event.target.value as InventoryFiltersState["inventoryType"]
            )
          }
        >
          <option value="all">All Types</option>
          {inventoryTypeOptions.map((inventoryType) => (
            <option key={inventoryType} value={inventoryType}>
              {formatOptionLabel(inventoryType)}
            </option>
          ))}
        </select>
      </div>

      <div className="inventory-filter-group">
        <label htmlFor="inventory-finish">Finish</label>
        <select
          id="inventory-finish"
          value={filters.finish}
          onChange={(event) => updateFilter("finish", event.target.value)}
        >
          <option value="all">All Finishes</option>
          {finishOptions.map((finish) => (
            <option key={finish} value={finish}>
              {finish}
            </option>
          ))}
        </select>
      </div>

      <div className="inventory-filter-group">
        <label htmlFor="inventory-status">Status</label>
        <select
          id="inventory-status"
          value={filters.status}
          onChange={(event) =>
            updateFilter(
              "status",
              event.target.value as InventoryFiltersState["status"]
            )
          }
        >
          <option value="all">All Statuses</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {formatOptionLabel(status)}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="inventory-reset-button"
        onClick={resetFilters}
      >
        Reset Filters
      </button>

      <div className="inventory-help-card">
        <h3 className="inventory-help-title">Need something specific?</h3>
        <p>
          If you do not see what you are looking for, our team can help source
          the right material for your project.
        </p>
        <a href="/contact" className="inventory-help-link">
          Contact Our Team
        </a>
      </div>
    </aside>
  );
}
