import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SlabDetailsPanel } from "../components/inventory/SlabDetailsPanel";
import { SlabImageGallery } from "../components/inventory/SlabImageGallery";
import { InventoryCard } from "../components/inventory/InventoryCard";
import { mockSlabs } from "../data/mockSlabs";

export function SlabDetail() {
  const { slug } = useParams();

  const slab = mockSlabs.find((item) => item.slug === slug);

  if (!slab) {
    return (
      <section className="page-section">
        <div className="container">
          <p className="eyebrow">Slab Not Found</p>
          <h1>This slab could not be found.</h1>
          <p>
            It may have been removed, sold, or the link may no longer be valid.
          </p>
          <Link to="/live-inventory" className="btn btn-primary">
            Back to Live Inventory
          </Link>
        </div>
      </section>
    );
  }

  const similarSlabs = mockSlabs
    .filter(
      (item) =>
        item.id !== slab.id &&
        (item.materialType === slab.materialType ||
          item.colorFamily === slab.colorFamily ||
          item.styleTags.some((tag) => slab.styleTags.includes(tag)))
    )
    .slice(0, 3);

  return (
    <>
      <section className="slab-detail-page">
        <div className="container">
          <Link to="/live-inventory" className="back-link">
            <ArrowLeft size={17} />
            Back to Live Inventory
          </Link>

          <div className="slab-detail-grid">
            <SlabImageGallery slab={slab} />
            <SlabDetailsPanel slab={slab} />
          </div>
        </div>
      </section>

      {similarSlabs.length > 0 && (
        <section className="similar-slabs-section">
          <div className="container">
            <div className="similar-header">
              <p className="eyebrow">Similar Slabs</p>
              <h2>Related Inventory</h2>
              <p>
                Similar options based on material, color family, and style tags.
              </p>
            </div>

            <div className="similar-slabs-grid">
              {similarSlabs.map((similarSlab) => (
                <InventoryCard key={similarSlab.id} slab={similarSlab} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}