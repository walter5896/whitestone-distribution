import { Link } from "react-router-dom";
import { ArrowRight, Ruler, Tag } from "lucide-react";
import { mockSlabs } from "../../data/mockSlabs";

export function FeaturedSlabsSection() {
  const slabs = mockSlabs.slice(0, 3);

  return (
    <section className="featured-slabs-section">
      <div className="container">
        <div className="featured-header">
          <p className="eyebrow">Featured Slabs</p>
          <h2>Current Inventory Highlights</h2>
          <p>
            A selection of slabs currently available. Inventory changes daily —
            call to confirm availability, pricing, and slab holds.
          </p>
        </div>

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
                  <Link to={`/live-inventory/${slab.slug}`}>{slab.name}</Link>
                </h3>

                <div className="featured-slab-specs">
                  <span>
                    <Ruler size={15} />
                    {slab.dimensions}
                  </span>
                  <span>{slab.thickness}</span>
                  <span>
                    <Tag size={15} />
                    {slab.finish}
                  </span>
                </div>

                <div className="featured-slab-tags">
                  {slab.styleTags.slice(0, 2).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

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
      </div>
    </section>
  );
}