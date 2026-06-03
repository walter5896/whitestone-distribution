import { useMemo, useState } from "react";
import type { Slab } from "../types/slab";
import type { InventoryFiltersState } from "../components/inventory/InventoryFilters";

const defaultFilters: InventoryFiltersState = {
  search: "",
  materialType: "all",
  colorFamily: "all",
  thickness: "all",
  status: "all",
  inventoryType: "all",
};

export function useInventoryFilters(slabs: Slab[]) {
  const [filters, setFilters] = useState<InventoryFiltersState>(defaultFilters);

  const filteredSlabs = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();

    return slabs.filter((slab) => {
      const matchesSearch =
        !searchTerm ||
        slab.name.toLowerCase().includes(searchTerm) ||
        slab.materialType.toLowerCase().includes(searchTerm) ||
        slab.colorFamily.toLowerCase().includes(searchTerm) ||
        slab.styleTags.some((tag) => tag.toLowerCase().includes(searchTerm));

      const matchesMaterial =
        filters.materialType === "all" ||
        slab.materialType === filters.materialType;

      const matchesColor =
        filters.colorFamily === "all" ||
        slab.colorFamily === filters.colorFamily;

      const matchesThickness =
        filters.thickness === "all" || slab.thickness === filters.thickness;

      const matchesStatus =
        filters.status === "all" || slab.status === filters.status;

      const matchesInventoryType =
        filters.inventoryType === "all" ||
        slab.inventoryType === filters.inventoryType;

      return (
        matchesSearch &&
        matchesMaterial &&
        matchesColor &&
        matchesThickness &&
        matchesStatus &&
        matchesInventoryType
      );
    });
  }, [filters, slabs]);

  function resetFilters() {
    setFilters(defaultFilters);
  }

  return {
    filters,
    setFilters,
    filteredSlabs,
    resetFilters,
  };
}