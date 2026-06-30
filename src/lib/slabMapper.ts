import type { Slab, SlabImage, SlabImageType } from "../types/slab";

export type SupabaseSlabImage = {
  id: string;
  slab_id: string;
  image_url: string;
  alt_text: string | null;
  image_type: SlabImageType | null;
  sort_order: number | null;
  is_primary: boolean | null;
  is_visible: boolean | null;
  created_at?: string;
};

export type SupabaseSlab = {
  id: string;
  slug: string;
  name: string;
  material_type: string;
  color_family: string | null;
  thickness: string | null;
  dimensions: string | null;
  finish: string | null;
  status: Slab["status"];
  inventory_type: Slab["inventoryType"];
  description: string | null;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_active: boolean;
  style_tags: string[] | null;
  primary_image_url: string | null;
  created_at: string;
  updated_at: string;

  /**
   * Supplier-style inventory fields.
   */
  bundle_id: string | null;
  block_id: string | null;
  quality_grade: string | null;
  average_size: string | null;
  area_sqft: string | null;
  weight: string | null;
  slab_numbers: string | null;

  slab_images?: SupabaseSlabImage[] | null;
};

function mapSupabaseSlabImage(row: SupabaseSlabImage): SlabImage {
  return {
    id: row.id,
    slabId: row.slab_id,
    imageUrl: row.image_url,
    altText: row.alt_text ?? "",
    imageType: row.image_type ?? "gallery",
    sortOrder: row.sort_order ?? 0,
    isPrimary: row.is_primary ?? false,
    isVisible: row.is_visible ?? true,
  };
}

function sortSlabImages(images: SlabImage[]) {
  return [...images].sort((a, b) => {
    if (a.isPrimary !== b.isPrimary) {
      return Number(b.isPrimary) - Number(a.isPrimary);
    }

    return a.sortOrder - b.sortOrder;
  });
}

export function mapSupabaseSlab(row: SupabaseSlab): Slab {
  const mappedImages = sortSlabImages(
    (row.slab_images ?? [])
      .map(mapSupabaseSlabImage)
      .filter((image) => image.isVisible && image.imageUrl)
  );

  const primaryImage =
    mappedImages.find((image) => image.isPrimary)?.imageUrl ??
    mappedImages[0]?.imageUrl ??
    row.primary_image_url ??
    "/images/slabs/taj-mahal-quartzite.png";

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    materialType: row.material_type,
    colorFamily: row.color_family ?? "",
    thickness: row.thickness ?? "",
    dimensions: row.dimensions ?? "",
    finish: row.finish ?? "",
    status: row.status,
    inventoryType: row.inventory_type,
    isNewArrival: row.is_new_arrival,
    isFeatured: row.is_featured,
    styleTags: row.style_tags ?? [],
    description: row.description ?? "",
    visualClass: "",

    bundleId: row.bundle_id ?? "",
    blockId: row.block_id ?? "",
    qualityGrade: row.quality_grade ?? "",
    averageSize: row.average_size ?? "",
    areaSqft: row.area_sqft ?? "",
    weight: row.weight ?? "",
    slabNumbers: row.slab_numbers ?? "",

    imageUrl: primaryImage,
    images: mappedImages,
  };
}