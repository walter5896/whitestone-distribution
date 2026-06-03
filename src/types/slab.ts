export type SlabStatus = "available" | "on_hold" | "sold" | "limited";

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
  imageUrl: string;
};