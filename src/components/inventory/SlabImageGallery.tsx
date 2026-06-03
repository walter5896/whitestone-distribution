import type { Slab } from "../../types/slab";

type SlabImageGalleryProps = {
  slab: Slab;
};

export function SlabImageGallery({ slab }: SlabImageGalleryProps) {
  return (
    <div className="slab-gallery">
      <img src={slab.imageUrl} alt={slab.name} className="slab-gallery-main" />

      <div className="slab-gallery-thumbs">
        <img src={slab.imageUrl} alt={`${slab.name} detail 1`} className="slab-thumb" />
        <img src={slab.imageUrl} alt={`${slab.name} detail 2`} className="slab-thumb" />
        <img src={slab.imageUrl} alt={`${slab.name} detail 3`} className="slab-thumb" />
      </div>
    </div>
  );
}