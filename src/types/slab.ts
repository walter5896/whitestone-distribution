export type SlabStatus = "available" | "on_hold" | "sold" | "limited";

export type SlabImageType = "primary" | "gallery" | "detail" | "inspiration";

export type SlabImage = {
  id: string;
  slabId: string;
  imageUrl: string;
  altText: string;
  imageType: SlabImageType;
  sortOrder: number;
  isPrimary: boolean;
  isVisible: boolean;
};

export type Slab = {
  id: string;
  slug: string;
  name: string;
  materialType: string;
  colorFamily: string;
  thickness: string;
  dimensions: string;
  finish: string;
  status: SlabStatus;
  inventoryType: "full_slab" | "remnant";
  isNewArrival: boolean;
  isFeatured: boolean;
  styleTags: string[];
  description: string;
  visualClass: string;

  /**
   * Backward-compatible primary image.
   * Existing cards/pages can still use slab.imageUrl.
   */
  imageUrl: string;

  /**
   * Full gallery image system.
   * Controlled by the slab_images table.
   */
  images: SlabImage[];
};
