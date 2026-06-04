import { useEffect, useMemo, useState } from "react";
import { InventoryFilters } from "../components/inventory/InventoryFilters";
import type { InventoryFiltersState } from "../components/inventory/InventoryFilters";
import { InventoryGrid } from "../components/inventory/InventoryGrid";
import { PricingNotice } from "../components/inventory/PricingNotice";
import { getActiveSlabs } from "../lib/slabQueries";
import type { Slab } from "../types/slab";

const defaultFilters: InventoryFiltersState = {
  search: "",
  materialType: "all",
  colorFamily: "all",
  thickness: "all",
  inventoryType: "all",
  status: "all",
};

export function LiveInventory() {
  const [slabs, setSlabs] = useState<Slab[]>([]);
  const [filters, setFilters] = useState<InventoryFiltersState>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadSlabs() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const liveSlabs = await getActiveSlabs();
        setSlabs(liveSlabs);
      } catch (error) {
        console.error("Failed to load live inventory:", error);
        setErrorMessage(
          "We could not load the live inventory right now. Please try again shortly."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadSlabs();
  }, []);

  const materialOptions = useMemo(() => {
    return Array.from(new Set(slabs.map((slab) => slab.materialType)))
      .filter(Boolean)
      .sort();
  }, [slabs]);

  const colorOptions = useMemo(() => {
    return Array.from(new Set(slabs.map((slab) => slab.colorFamily)))
      .filter(Boolean)
      .sort();
  }, [slabs]);

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

      const matchesStatus =
        filters.status === "all" || slab.status === filters.status;

      return (
        matchesSearch &&
        matchesMaterial &&
        matchesColor &&
        matchesThickness &&
        matchesInventoryType &&
        matchesStatus
      );
    });
  }, [slabs, filters]);

  return (
    <>
      <section className="page-hero inventory-hero">
        <div className="container page-hero-inner">
          <p className="eyebrow">Live Inventory</p>
          <h1>Browse Current Stone Slabs</h1>
          <p>
            View available inventory, compare materials, and call directly for
            current pricing, availability, and reservation details.
          </p>
        </div>
      </section>

      <section className="inventory-page-section">
        <div className="container">
          <PricingNotice />

          <InventoryFilters
            filters={filters}
            onFiltersChange={setFilters}
            materialOptions={materialOptions}
            colorOptions={colorOptions}
          />

          {isLoading && (
            <div className="inventory-empty">
              <h2>Loading live inventory...</h2>
              <p>
                Pulling current slab availability from Whitestone Distribution.
              </p>
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="inventory-empty">
              <h2>Inventory unavailable</h2>
              <p>{errorMessage}</p>
            </div>
          )}

          {!isLoading && !errorMessage && (
            <InventoryGrid slabs={filteredSlabs} />
          )}
        </div>
      </section>
    </>
  );
}