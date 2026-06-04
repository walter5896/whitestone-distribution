import type { Slab } from "../types/slab";

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
};

export function mapSupabaseSlab(row: SupabaseSlab): Slab {
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
    imageUrl: row.primary_image_url ?? "/images/slabs/taj-mahal-quartzite.png",
  };
}