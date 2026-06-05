import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SlabDetailsPanel } from "../components/inventory/SlabDetailsPanel";
import { SlabImageGallery } from "../components/inventory/SlabImageGallery";
import { InventoryCard } from "../components/inventory/InventoryCard";
import { getActiveSlabs, getSlabBySlug } from "../lib/slabQueries";
import type { Slab } from "../types/slab";

export function SlabDetail() {
  const { slug } = useParams();

  const [slab, setSlab] = useState<Slab | null>(null);
  const [allSlabs, setAllSlabs] = useState<Slab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadSlabDetail() {
      if (!slug) {
        setIsLoading(false);
        setErrorMessage("Missing slab link.");
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const [selectedSlab, activeSlabs] = await Promise.all([
          getSlabBySlug(slug),
          getActiveSlabs(),
        ]);

        setSlab(selectedSlab);
        setAllSlabs(activeSlabs);
      } catch (error) {
        console.error("Failed to load slab detail:", error);
        setSlab(null);
        setErrorMessage(
          "This slab could not be loaded. It may have been removed, sold, or the link may no longer be valid."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadSlabDetail();
  }, [slug]);

  const similarSlabs = useMemo(() => {
    if (!slab) {
      return [];
    }

    return allSlabs
      .filter(
        (item) =>
          item.id !== slab.id &&
          (item.materialType === slab.materialType ||
            item.colorFamily === slab.colorFamily ||
            item.styleTags.some((tag) => slab.styleTags.includes(tag)))
      )
      .slice(0, 3);
  }, [allSlabs, slab]);

  if (isLoading) {
    return (
      <section className="page-section">
        <div className="container">
          <p className="eyebrow">Loading Slab</p>
          <h1>Loading slab details...</h1>
          <p>Pulling current slab information from live inventory.</p>
        </div>
      </section>
    );
  }

  if (!slab) {
    return (
      <section className="page-section">
        <div className="container">
          <p className="eyebrow">Slab Not Found</p>
          <h1>This slab could not be found.</h1>
          <p>
            {errorMessage ||
              "It may have been removed, sold, or the link may no longer be valid."}
          </p>
          <Link to="/live-inventory" className="btn btn-primary">
            Back to Live Inventory
          </Link>
        </div>
      </section>
    );
  }

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