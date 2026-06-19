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
  finish: "all",
  status: "all",
};

type SortOption = "newest" | "name-asc" | "name-desc";

export function LiveInventory() {
  const [slabs, setSlabs] = useState<Slab[]>([]);
  const [filters, setFilters] = useState<InventoryFiltersState>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

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

  const thicknessOptions = useMemo(() => {
    return Array.from(new Set(slabs.map((slab) => slab.thickness)))
      .filter(Boolean)
      .sort();
  }, [slabs]);

  const inventoryTypeOptions = useMemo(() => {
    return Array.from(new Set(slabs.map((slab) => slab.inventoryType)))
      .filter(Boolean)
      .sort();
  }, [slabs]);

  const finishOptions = useMemo(() => {
    return Array.from(new Set(slabs.map((slab) => slab.finish)))
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
  }, [slabs, filters]);

  const sortedSlabs = useMemo(() => {
    const cloned = [...filteredSlabs];

    if (sortBy === "name-asc") {
      cloned.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "name-desc") {
      cloned.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (sortBy === "newest") {
      cloned.sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) {
          return Number(b.isFeatured) - Number(a.isFeatured);
        }

        if (a.isNewArrival !== b.isNewArrival) {
          return Number(b.isNewArrival) - Number(a.isNewArrival);
        }

        return a.name.localeCompare(b.name);
      });
    }

    return cloned;
  }, [filteredSlabs, sortBy]);

  const resultLabel = isLoading
    ? "Loading slabs..."
    : `${sortedSlabs.length} slab${sortedSlabs.length === 1 ? "" : "s"} available`;

  return (
    <>
      <section className="inventory-page-hero">
        <div className="inventory-page-hero-bg" aria-hidden="true">
          <img
            src="/images/materials/featured/featured-quartzite-slab.png"
            alt=""
          />
        </div>

        <div className="container inventory-page-hero-inner">
          <div className="inventory-page-hero-copy">
            <p className="eyebrow">Live Inventory</p>

            <div className="inventory-hero-rule" />

            <h1>Browse Current Stone Slabs</h1>

            <p>
              Explore slabs available now, compare materials, and call directly
              for current pricing, availability, and reservation details.
            </p>
          </div>
        </div>
      </section>

      <section className="inventory-page-section">
        <div className="container inventory-page-container">
          <div className="inventory-layout">
            <aside className="inventory-sidebar-column">
              <div className="inventory-sidebar-sticky">
                <InventoryFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  materialOptions={materialOptions}
                  colorOptions={colorOptions}
                  thicknessOptions={thicknessOptions}
                  inventoryTypeOptions={inventoryTypeOptions}
                  finishOptions={finishOptions}
                />
              </div>
            </aside>

            <main className="inventory-main-column">
              <div className="inventory-main-top">
                <PricingNotice />
              </div>

              <div className="inventory-toolbar">
                <div className="inventory-results-count">{resultLabel}</div>

                <div className="inventory-toolbar-controls">
                  <label htmlFor="inventory-sort">Sort by</label>

                  <select
                    id="inventory-sort"
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(event.target.value as SortOption)
                    }
                  >
                    <option value="newest">Newest</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>
              </div>

              {isLoading && (
                <div className="inventory-empty">
                  <h2>Loading Live Inventory...</h2>
                  <p>
                    Pulling current slab availability from Whitestone
                    Distribution.
                  </p>
                </div>
              )}

              {!isLoading && errorMessage && (
                <div className="inventory-empty">
                  <h2>Inventory Unavailable</h2>
                  <p>{errorMessage}</p>
                </div>
              )}

              {!isLoading && !errorMessage && (
                <InventoryGrid slabs={sortedSlabs} />
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
}