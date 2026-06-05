import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Gem,
  RefreshCcw,
  Search,
  Star,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import {
  getAdminSlabs,
  updateAdminSlabActive,
  updateAdminSlabFeatured,
  updateAdminSlabNewArrival,
  updateAdminSlabStatus,
} from "../../lib/adminQueries";
import type { AdminSlab } from "../../lib/adminQueries";
import type { Slab } from "../../types/slab";

const slabStatuses: Slab["status"][] = [
  "available",
  "limited",
  "on_hold",
  "sold",
];

function formatLabel(value: string | null | undefined) {
  return (value || "")
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

export function AdminSlabs() {
  const [slabs, setSlabs] = useState<AdminSlab[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Slab["status"] | "all">(
    "all"
  );
  const [materialFilter, setMaterialFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function loadSlabs(options?: { showRefreshingState?: boolean }) {
    try {
      if (options?.showRefreshingState) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setErrorMessage("");

      const liveSlabs = await getAdminSlabs();
      setSlabs(liveSlabs);
    } catch (error) {
      console.error("Failed to load admin slabs:", error);
      setErrorMessage(
        "Inventory could not be loaded. Please confirm your admin session and permissions."
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadSlabs();
  }, []);

  const materialOptions = useMemo(() => {
    return Array.from(new Set(slabs.map((slab) => slab.materialType)))
      .filter(Boolean)
      .sort();
  }, [slabs]);

  const filteredSlabs = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return slabs.filter((slab) => {
      const matchesStatus =
        statusFilter === "all" || slab.status === statusFilter;

      const matchesMaterial =
        materialFilter === "all" || slab.materialType === materialFilter;

      const searchableText = [
        slab.name,
        slab.slug,
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
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch || searchableText.includes(normalizedSearch);

      return matchesStatus && matchesMaterial && matchesSearch;
    });
  }, [materialFilter, searchTerm, slabs, statusFilter]);

  const slabCounts = useMemo(() => {
    return slabs.reduce(
      (counts, slab) => {
        counts.total += 1;

        if (slab.isActive) {
          counts.active += 1;
        }

        if (slab.isFeatured) {
          counts.featured += 1;
        }

        if (slab.isNewArrival) {
          counts.newArrivals += 1;
        }

        if (slab.status === "sold") {
          counts.sold += 1;
        }

        return counts;
      },
      {
        total: 0,
        active: 0,
        featured: 0,
        newArrivals: 0,
        sold: 0,
      }
    );
  }, [slabs]);

  async function updateSlabOptimistically(
    slabId: string,
    optimisticUpdate: Partial<AdminSlab>,
    updateRequest: () => Promise<AdminSlab>
  ) {
    const previousSlabs = slabs;

    try {
      setUpdatingId(slabId);
      setErrorMessage("");

      setSlabs((currentSlabs) =>
        currentSlabs.map((slab) =>
          slab.id === slabId ? { ...slab, ...optimisticUpdate } : slab
        )
      );

      const updatedSlab = await updateRequest();

      setSlabs((currentSlabs) =>
        currentSlabs.map((slab) =>
          slab.id === slabId ? updatedSlab : slab
        )
      );
    } catch (error) {
      console.error("Failed to update slab:", error);
      setSlabs(previousSlabs);
      setErrorMessage(
        "The slab could not be updated. Please confirm your admin permissions and try again."
      );
    } finally {
      setUpdatingId("");
    }
  }

  function handleStatusChange(slab: AdminSlab, nextStatus: Slab["status"]) {
    updateSlabOptimistically(slab.id, { status: nextStatus }, () =>
      updateAdminSlabStatus(slab.id, nextStatus)
    );
  }

  function handleFeaturedToggle(slab: AdminSlab) {
    const nextValue = !slab.isFeatured;

    updateSlabOptimistically(slab.id, { isFeatured: nextValue }, () =>
      updateAdminSlabFeatured(slab.id, nextValue)
    );
  }

  function handleNewArrivalToggle(slab: AdminSlab) {
    const nextValue = !slab.isNewArrival;

    updateSlabOptimistically(slab.id, { isNewArrival: nextValue }, () =>
      updateAdminSlabNewArrival(slab.id, nextValue)
    );
  }

  function handleActiveToggle(slab: AdminSlab) {
    const nextValue = !slab.isActive;

    updateSlabOptimistically(slab.id, { isActive: nextValue }, () =>
      updateAdminSlabActive(slab.id, nextValue)
    );
  }

  return (
    <section className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <Link to="/admin" className="back-link">
              <ArrowLeft size={17} />
              Back to Dashboard
            </Link>

            <p className="eyebrow">Admin Inventory</p>
            <h1>Manage Slabs</h1>
            <p>
              Review inventory, update availability, and control which slabs
              appear as active, featured, or new arrivals.
            </p>
          </div>

          <div className="admin-header-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => loadSlabs({ showRefreshingState: true })}
              disabled={isRefreshing || isLoading}
            >
              <RefreshCcw size={16} />
              {isRefreshing ? "Refreshing..." : "Refresh Inventory"}
            </button>

            <Link to="/live-inventory" className="btn btn-secondary">
              View Public Inventory
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="admin-stat-grid">
          <article className="admin-stat-card">
            <Gem size={24} />
            <span>Total Slabs</span>
            <strong>{slabCounts.total}</strong>
          </article>

          <article className="admin-stat-card">
            <ToggleRight size={24} />
            <span>Active</span>
            <strong>{slabCounts.active}</strong>
          </article>

          <article className="admin-stat-card">
            <Star size={24} />
            <span>Featured</span>
            <strong>{slabCounts.featured}</strong>
          </article>

          <article className="admin-stat-card">
            <ToggleLeft size={24} />
            <span>Sold</span>
            <strong>{slabCounts.sold}</strong>
          </article>
        </div>

        <div className="admin-panel admin-inquiries-toolbar">
          <div>
            <p className="eyebrow">Inventory Filter</p>
            <h2>All Slabs</h2>
            <p>
              Showing {filteredSlabs.length} of {slabs.length} inventory items.
            </p>
          </div>

          <div className="admin-inquiry-actions">
            <label>
              Search
              <div className="admin-search-control">
                <Search size={16} />
                <input
                  type="search"
                  value={searchTerm}
                  placeholder="Search slab name, color, material..."
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </label>

            <label className="admin-filter-control">
              Status
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as Slab["status"] | "all")
                }
              >
                <option value="all">All Statuses</option>
                {slabStatuses.map((status) => (
                  <option key={status} value={status}>
                    {formatLabel(status)}
                  </option>
                ))}
              </select>
            </label>

            <label className="admin-filter-control">
              Material
              <select
                value={materialFilter}
                onChange={(event) => setMaterialFilter(event.target.value)}
              >
                <option value="all">All Materials</option>
                {materialOptions.map((material) => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {errorMessage && (
          <div className="admin-state-card admin-error-card">
            <h2>Admin action failed</h2>
            <p>{errorMessage}</p>
          </div>
        )}

        {isLoading && (
          <div className="admin-state-card">
            <h2>Loading inventory...</h2>
            <p>Pulling slab records from Supabase.</p>
          </div>
        )}

        {!isLoading && filteredSlabs.length === 0 && (
          <div className="admin-state-card">
            <Gem size={28} />
            <h2>No slabs found.</h2>
            <p>
              No inventory items match the current search or filter settings.
            </p>
          </div>
        )}

        {!isLoading && filteredSlabs.length > 0 && (
          <div className="admin-slab-management-list">
            {filteredSlabs.map((slab) => {
              const isUpdating = updatingId === slab.id;

              return (
                <article key={slab.id} className="admin-slab-management-card">
                  <div className="admin-slab-management-image-wrap">
                    <img
                      src={slab.imageUrl}
                      alt={slab.name}
                      className="admin-slab-management-image"
                    />
                  </div>

                  <div className="admin-slab-management-body">
                    <div className="admin-slab-management-header">
                      <div>
                        <p className="eyebrow">{slab.materialType}</p>
                        <h2>{slab.name}</h2>
                        <p>
                          {slab.colorFamily} · {slab.thickness} · {slab.finish}
                        </p>
                      </div>

                      <span className="admin-status-pill">
                        {formatLabel(slab.status)}
                      </span>
                    </div>

                    <div className="admin-slab-management-specs">
                      <div>
                        <span>Dimensions</span>
                        <strong>{slab.dimensions || "Not listed"}</strong>
                      </div>

                      <div>
                        <span>Inventory Type</span>
                        <strong>{formatLabel(slab.inventoryType)}</strong>
                      </div>

                      <div>
                        <span>Updated</span>
                        <strong>{formatDate(slab.updatedAt)}</strong>
                      </div>
                    </div>

                    <div className="admin-slab-management-controls">
                      <label>
                        Status
                        <select
                          value={slab.status}
                          disabled={isUpdating}
                          onChange={(event) =>
                            handleStatusChange(
                              slab,
                              event.target.value as Slab["status"]
                            )
                          }
                        >
                          {slabStatuses.map((status) => (
                            <option key={status} value={status}>
                              {formatLabel(status)}
                            </option>
                          ))}
                        </select>
                      </label>

                      <button
                        type="button"
                        className={
                          slab.isActive
                            ? "btn btn-primary"
                            : "btn btn-secondary"
                        }
                        disabled={isUpdating}
                        onClick={() => handleActiveToggle(slab)}
                      >
                        {slab.isActive ? "Active" : "Inactive"}
                      </button>

                      <button
                        type="button"
                        className={
                          slab.isFeatured
                            ? "btn btn-primary"
                            : "btn btn-secondary"
                        }
                        disabled={isUpdating}
                        onClick={() => handleFeaturedToggle(slab)}
                      >
                        {slab.isFeatured ? "Featured" : "Not Featured"}
                      </button>

                      <button
                        type="button"
                        className={
                          slab.isNewArrival
                            ? "btn btn-primary"
                            : "btn btn-secondary"
                        }
                        disabled={isUpdating}
                        onClick={() => handleNewArrivalToggle(slab)}
                      >
                        {slab.isNewArrival ? "New Arrival" : "Not New"}
                      </button>

                      <Link
                        to={`/live-inventory/${slab.slug}`}
                        className="btn btn-secondary"
                      >
                        <Eye size={16} />
                        View Public
                      </Link>
                    </div>

                    <p className="admin-slab-management-note">
                      Full edit mode, image upload, and add-new-slab controls
                      are coming in the next admin pass.
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}