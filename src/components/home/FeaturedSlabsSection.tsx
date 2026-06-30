import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Ruler, Tag } from "lucide-react";
import { getFeaturedSlabs } from "../../lib/slabQueries";
import type { Slab } from "../../types/slab";

export function FeaturedSlabsSection() {
  const [slabs, setSlabs] = useState<Slab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadFeaturedSlabs() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const featuredSlabs = await getFeaturedSlabs(3);
        setSlabs(featuredSlabs);
      } catch (error) {
        console.error("Failed to load featured slabs:", error);
        setErrorMessage(
          "Featured inventory could not be loaded right now. Please view the live inventory page for current availability."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadFeaturedSlabs();
  }, []);

  return (
    <section className="featured-slabs-section">
      <div className="container">
        <div className="featured-header">
          <p className="eyebrow">Featured Inventory</p>
          <h2>Rare Slabs Worth Seeing First</h2>
          <p>
            A rotating selection of premium slabs chosen for movement, quality,
            rarity, and project potential. Call to confirm availability, pricing,
            and hold options.
          </p>
        </div>

        {isLoading && (
          <div className="inventory-empty">
            <h2>Loading featured slabs...</h2>
            <p>Pulling current inventory highlights from Whitestone Distribution.</p>
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="inventory-empty">
            <h2>Featured inventory unavailable</h2>
            <p>{errorMessage}</p>

            <Link to="/live-inventory" className="btn btn-primary">
              View Live Inventory
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {!isLoading && !errorMessage && slabs.length === 0 && (
          <div className="inventory-empty">
            <h2>No featured slabs selected.</h2>
            <p>
              Featured inventory will appear here once slabs are marked as
              featured in the admin dashboard.
            </p>

            <Link to="/live-inventory" className="btn btn-primary">
              View Live Inventory
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {!isLoading && !errorMessage && slabs.length > 0 && (
          <>
            <div className="featured-slab-grid">
              {slabs.map((slab) => (
                <article key={slab.id} className="featured-slab-card">
                  <Link to={`/live-inventory/${slab.slug}`}>
                    <img
                      src={slab.imageUrl}
                      alt={slab.name}
                      className="featured-slab-image"
                    />
                  </Link>

                  <div className="featured-slab-body">
                    <p className="featured-slab-type">{slab.materialType}</p>

                    <h3>
                      <Link to={`/live-inventory/${slab.slug}`}>
                        {slab.name}
                      </Link>
                    </h3>

                    <div className="featured-slab-specs">
                      <span>
                        <Ruler size={15} />
                        {slab.dimensions || "Dimensions by request"}
                      </span>

                      <span>{slab.thickness || "Thickness available"}</span>

                      <span>
                        <Tag size={15} />
                        {slab.finish || "Finish available"}
                      </span>
                    </div>

                    {slab.styleTags.length > 0 && (
                      <div className="featured-slab-tags">
                        {slab.styleTags.slice(0, 2).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    )}

                    <p>
                      Call to confirm availability, bundle details, and current
                      pricing.
                    </p>

                    <Link
                      to={`/live-inventory/${slab.slug}`}
                      className="featured-slab-link"
                    >
                      View Slab Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="featured-footer-action">
              <Link to="/live-inventory" className="btn btn-primary">
                View Full Live Inventory
                <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
