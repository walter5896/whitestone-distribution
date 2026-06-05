import type { Slab } from "../../types/slab";

export type InventoryFiltersState = {
  search: string;
  materialType: string;
  colorFamily: string;
  thickness: string;
  inventoryType: string;
  finish: string;
  status: Slab["status"] | "all";
};

type InventoryFiltersProps = {
  filters: InventoryFiltersState;
  onFiltersChange: React.Dispatch<React.SetStateAction<InventoryFiltersState>>;
  materialOptions: string[];
  colorOptions: string[];
  thicknessOptions: string[];
  inventoryTypeOptions: string[];
  finishOptions: string[];
};

export function InventoryFilters({
  filters,
  onFiltersChange,
  materialOptions,
  colorOptions,
  thicknessOptions,
  inventoryTypeOptions,
  finishOptions,
}: InventoryFiltersProps) {
  function updateFilter<K extends keyof InventoryFiltersState>(
    key: K,
    value: InventoryFiltersState[K]
  ) {
    onFiltersChange((prev) => ({
      ...prev,
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
      status: "all",
    });
  }

  return (
    <aside className="inventory-sidebar-card">
      <div className="inventory-sidebar-header">
        <p className="inventory-sidebar-label">Refine Results</p>
      </div>

      <div className="inventory-filter-group">
        <label htmlFor="inventory-search">Search by stone</label>
        <input
          id="inventory-search"
          type="text"
          placeholder="Search by stone, material, color, finish, or tag..."
          value={filters.search}
          onChange={(event) => updateFilter("search", event.target.value)}
        />
      </div>

      <div className="inventory-filter-group">
        <label htmlFor="material-type">Material</label>
        <select
          id="material-type"
          value={filters.materialType}
          onChange={(event) => updateFilter("materialType", event.target.value)}
        >
          <option value="all">All Materials</option>
          {materialOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="inventory-filter-group">
        <label htmlFor="color-family">Color Family</label>
        <select
          id="color-family"
          value={filters.colorFamily}
          onChange={(event) => updateFilter("colorFamily", event.target.value)}
        >
          <option value="all">All Colors</option>
          {colorOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="inventory-filter-group">
        <label htmlFor="thickness">Thickness</label>
        <select
          id="thickness"
          value={filters.thickness}
          onChange={(event) => updateFilter("thickness", event.target.value)}
        >
          <option value="all">All Thicknesses</option>
          {thicknessOptions.map((option) => (
            <option key={option} value={option}>
              {option}
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
            updateFilter("inventoryType", event.target.value)
          }
        >
          <option value="all">All Types</option>
          {inventoryTypeOptions.map((option) => (
            <option key={option} value={option}>
              <option value={option}>{option}</option>
            </option>
          ))}
        </select>
      </div>

      <div className="inventory-filter-group">
        <label htmlFor="finish">Finish</label>
        <select
          id="finish"
          value={filters.finish}
          onChange={(event) => updateFilter("finish", event.target.value)}
        >
          <option value="all">All Finishes</option>
          {finishOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="inventory-filter-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={filters.status}
          onChange={(event) =>
            updateFilter(
              "status",
              event.target.value as InventoryFiltersState["status"]
            )
          }
        >
          <option value="all">Any Status</option>
          <option value="available">Available</option>
          <option value="limited">Limited</option>
          <option value="on_hold">On Hold</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
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
        <p className="inventory-help-title">Need something specific?</p>
        <p>
          If you do not see what you are looking for, our team can help source
          the right slab for your project.
        </p>
        <a href="/contact" className="inventory-help-link">
          Contact Our Team
        </a>
      </div>
    </aside>
  );
}