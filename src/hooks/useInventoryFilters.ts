import { useMemo, useState } from "react";
import type { InventoryFiltersState } from "../components/inventory/InventoryFilters";
import type { Slab } from "../types/slab";

const defaultFilters: InventoryFiltersState = {
  search: "",
  materialType: "all",
  colorFamily: "all",
  thickness: "all",
  inventoryType: "all",
  finish: "all",
  status: "all",
};

export function useInventoryFilters(slabs: Slab[]) {
  const [filters, setFilters] = useState<InventoryFiltersState>(defaultFilters);

  const filteredSlabs = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();

    return slabs.filter((slab) => {
      const searchableText = [
        slab.name,
        slab.materialType,
        slab.colorFamily,
        slab.thickness,
        slab.dimensions,
        slab.finish,
        slab.status,
        slab.inventoryType,
        slab.description,
        ...slab.styleTags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !searchTerm || searchableText.includes(searchTerm);

      const matchesMaterial =
        filters.materialType === "all" ||
        slab.materialType === filters.materialType;

      const matchesColor =
        filters.colorFamily === "all" ||
        slab.colorFamily === filters.colorFamily;

      const matchesThickness =
        filters.thickness === "all" || slab.thickness === filters.thickness;

      const matchesInventoryType =
        filters.inventoryType === "all" ||
        slab.inventoryType === filters.inventoryType;

      const matchesFinish =
        filters.finish === "all" || slab.finish === filters.finish;

      const matchesStatus =
        filters.status === "all" || slab.status === filters.status;

      return (
        matchesSearch &&
        matchesMaterial &&
        matchesColor &&
        matchesThickness &&
        matchesInventoryType &&
        matchesFinish &&
        matchesStatus
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
