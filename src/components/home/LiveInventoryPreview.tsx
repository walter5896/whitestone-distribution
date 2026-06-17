import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getActiveSlabs } from "../../lib/slabQueries";
import type { Slab } from "../../types/slab";
import { SectionHeading } from "../ui/SectionHeading";

function getStatusLabel(status: string) {
  switch (status) {
    case "available":
      return "Available";
    case "on_hold":
      return "On Hold";
    case "sold":
      return "Sold";
    case "limited":
      return "Limited";
    default:
      return status;
  }
}

export function LiveInventoryPreview() {
  const [slabs, setSlabs] = useState<Slab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadInventoryPreview() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const activeSlabs = await getActiveSlabs();
        setSlabs(activeSlabs.slice(0, 4));
      } catch (error) {
        console.error("Failed to load inventory preview:", error);
        setErrorMessage(
          "Inventory preview could not be loaded right now. Please visit the live inventory page for current availability."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadInventoryPreview();
  }, []);

  return (
    <section className="home-section inventory-preview-section">
      <div className="container">
        <SectionHeading
          eyebrow="Live Inventory Preview"
          title="Current Slabs, Ready to Browse"
          description="Preview available material selected from Whitestone’s live inventory. Pricing, bundle details, holds, and pre-arrival opportunities are confirmed directly with our team."
        />

        {isLoading && (
          <div className="inventory-empty">
            <h2>Loading inventory preview...</h2>
            <p>Pulling current slab availability from Whitestone Distribution.</p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="inventory-empty">
            <h2>Inventory preview unavailable</h2>
            <p>{errorMessage}</p>
            <Link to="/live-inventory" className="btn btn-primary">
              View Live Inventory
            </Link>
          </div>
        )}

        {!isLoading && !errorMessage && slabs.length === 0 && (
          <div className="inventory-empty">
            <h2>No active slabs available yet.</h2>
            <p>
              Inventory will appear here once slabs are added and marked active
              in the admin dashboard.
            </p>
            <Link to="/live-inventory" className="btn btn-primary">
              View Live Inventory
            </Link>
          </div>
        )}

        {!isLoading && !errorMessage && slabs.length > 0 && (
          <>
            <div className="inventory-preview-grid">
              {slabs.map((slab) => (
                <Link
                  key={slab.id}
                  to={`/live-inventory/${slab.slug}`}
                  className="inventory-card"
                >
                  <img
                    src={slab.imageUrl}
                    alt={slab.name}
                    className="inventory-card-image"
                  />

                  <div className="inventory-card-body">
                    <div className="inventory-card-topline">
                      <span>{slab.materialType}</span>
                      <span className={`status-dot status-${slab.status}`} />
                    </div>

                    <h3>{slab.name}</h3>

                    <p>
                      {slab.thickness || "Thickness available"} ·{" "}
                      {slab.dimensions || "Dimensions available"} ·{" "}
                      {slab.finish || "Finish available"}
                    </p>

                    <div className="inventory-card-footer">
                      <span>{getStatusLabel(slab.status)}</span>
                      <ArrowRight size={17} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="center-action">
              <Link to="/live-inventory" className="btn btn-primary">
                View All Live Inventory
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}