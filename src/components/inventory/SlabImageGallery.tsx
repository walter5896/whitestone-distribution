import { useEffect, useMemo, useState } from "react";
import type { Slab } from "../../types/slab";

type SlabImageGalleryProps = {
  slab: Slab;
};

function getUniqueImages(images: string[]) {
  return images.filter(
    (image, index, array) => image && array.indexOf(image) === index
  );
}

export function SlabImageGallery({ slab }: SlabImageGalleryProps) {
  const galleryImages = useMemo(() => {
    const realImages = slab.images
      .filter((image) => image.isVisible)
      .sort((a, b) => {
        if (a.isPrimary !== b.isPrimary) {
          return Number(b.isPrimary) - Number(a.isPrimary);
        }

        return a.sortOrder - b.sortOrder;
      })
      .map((image) => image.imageUrl);

    /**
     * Real database-controlled images now drive the gallery.
     * Since every slab currently has one primary image record,
     * thumbnails will stay hidden until the admin adds more images.
     */
    if (realImages.length > 0) {
      return getUniqueImages(realImages);
    }

    /**
     * Emergency fallback only.
     * This prevents a broken gallery if a slab somehow has no image records yet.
     */
    return getUniqueImages([slab.imageUrl]);
  }, [slab]);

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  useEffect(() => {
    setSelectedImage(galleryImages[0]);
  }, [galleryImages]);

  return (
    <div className="slab-gallery">
      <div className="slab-gallery-main">
        <img src={selectedImage} alt={slab.name} />
      </div>

      {galleryImages.length > 1 && (
        <div className="slab-gallery-thumbs">
          {galleryImages.slice(0, 4).map((image, index) => (
            <button
              key={image}
              type="button"
              className={`slab-thumb ${
                selectedImage === image ? "slab-thumb-active" : ""
              }`}
              onClick={() => setSelectedImage(image)}
              aria-label={`View ${slab.name} image ${index + 1}`}
            >
              <img src={image} alt={`${slab.name} detail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
