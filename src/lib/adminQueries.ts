import { supabase } from "./supabaseClient";
import { mapSupabaseSlab, type SupabaseSlab } from "./slabMapper";
import type { Slab } from "../types/slab";

/* =========================
   STORAGE
========================= */

const SLAB_IMAGE_BUCKET = "slab-images";
const MAX_IMAGE_SIZE_MB = 10;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

export type AdminImageUploadResult = {
  path: string;
  publicUrl: string;
};

function sanitizeStorageName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getFileExtension(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension || extension === fileName.toLowerCase()) {
    return "jpg";
  }

  return extension;
}

export async function uploadAdminSlabImage(
  file: File,
  slabSlugOrName: string
): Promise<AdminImageUploadResult> {
  if (!file) {
    throw new Error("No image file was selected.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files can be uploaded.");
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(`Image must be smaller than ${MAX_IMAGE_SIZE_MB}MB.`);
  }

  const cleanFolderName =
    sanitizeStorageName(slabSlugOrName) || "unassigned-slab";

  const cleanOriginalName =
    sanitizeStorageName(file.name.replace(/\.[^/.]+$/, "")) || "slab-image";

  const extension = getFileExtension(file.name);
  const uniqueFileName = `${Date.now()}-${cleanOriginalName}.${extension}`;
  const filePath = `${cleanFolderName}/${uniqueFileName}`;

  const { data, error } = await supabase.storage
    .from(SLAB_IMAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from(SLAB_IMAGE_BUCKET)
    .getPublicUrl(data.path);

  if (!publicUrlData.publicUrl) {
    throw new Error("Image uploaded, but a public URL could not be generated.");
  }

  return {
    path: data.path,
    publicUrl: publicUrlData.publicUrl,
  };
}

/* =========================
   INQUIRIES
========================= */

export type InquiryStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "closed"
  | "archived";

export type AdminInquiry = {
  id: string;
  inquiry_type: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string | null;
  status: InquiryStatus | string | null;
  created_at: string;
};

export async function getAdminInquiries() {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as AdminInquiry[];
}

export async function updateInquiryStatus(
  inquiryId: string,
  status: InquiryStatus
) {
  const { data, error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", inquiryId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as AdminInquiry;
}

export async function deleteInquiry(inquiryId: string) {
  const { error } = await supabase
    .from("inquiries")
    .delete()
    .eq("id", inquiryId);

  if (error) {
    throw new Error(error.message);
  }
}

/* =========================
   ADMIN SLABS
========================= */

type AdminSupabaseSlab = SupabaseSlab & {
  internal_notes?: string | null;
};

export type AdminSlab = Slab & {
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  internalNotes: string;
  primaryImageUrl: string;
};

export type AdminSlabUpdatePayload = Partial<{
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
  internal_notes: string | null;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_active: boolean;
  style_tags: string[] | null;
  primary_image_url: string | null;
}>;

export type AdminSlabCreatePayload = {
  slug: string;
  name: string;
  material_type: string;
  color_family?: string | null;
  thickness?: string | null;
  dimensions?: string | null;
  finish?: string | null;
  status?: Slab["status"];
  inventory_type?: Slab["inventoryType"];
  description?: string | null;
  internal_notes?: string | null;
  is_featured?: boolean;
  is_new_arrival?: boolean;
  is_active?: boolean;
  style_tags?: string[] | null;
  primary_image_url?: string | null;
};

function mapAdminSlab(row: AdminSupabaseSlab): AdminSlab {
  return {
    ...mapSupabaseSlab(row),
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    internalNotes: row.internal_notes ?? "",
    primaryImageUrl: row.primary_image_url ?? "",
  };
}

export async function getAdminSlabs() {
  const { data, error } = await supabase
    .from("slabs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as AdminSupabaseSlab[]).map(mapAdminSlab);
}

export async function createAdminSlab(payload: AdminSlabCreatePayload) {
  const now = new Date().toISOString();

  const cleanSlug = payload.slug.trim().toLowerCase();
  const cleanName = payload.name.trim();
  const cleanMaterialType = payload.material_type.trim();

  if (!cleanSlug || !cleanName || !cleanMaterialType) {
    throw new Error("Slug, name, and material type are required.");
  }

  const { data, error } = await supabase
    .from("slabs")
    .insert({
      slug: cleanSlug,
      name: cleanName,
      material_type: cleanMaterialType,
      color_family: payload.color_family ?? null,
      thickness: payload.thickness ?? null,
      dimensions: payload.dimensions ?? null,
      finish: payload.finish ?? null,
      status: payload.status ?? "available",
      inventory_type: payload.inventory_type ?? "full_slab",
      description: payload.description ?? null,
      internal_notes: payload.internal_notes ?? null,
      is_featured: payload.is_featured ?? false,
      is_new_arrival: payload.is_new_arrival ?? false,
      is_active: payload.is_active ?? true,
      style_tags: payload.style_tags ?? [],
      primary_image_url: payload.primary_image_url ?? null,
      created_at: now,
      updated_at: now,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapAdminSlab(data as AdminSupabaseSlab);
}

export async function updateAdminSlab(
  slabId: string,
  updates: AdminSlabUpdatePayload
) {
  const { data, error } = await supabase
    .from("slabs")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", slabId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapAdminSlab(data as AdminSupabaseSlab);
}

export async function updateAdminSlabStatus(
  slabId: string,
  status: Slab["status"]
) {
  return updateAdminSlab(slabId, { status });
}

export async function updateAdminSlabFeatured(
  slabId: string,
  isFeatured: boolean
) {
  return updateAdminSlab(slabId, { is_featured: isFeatured });
}

export async function updateAdminSlabNewArrival(
  slabId: string,
  isNewArrival: boolean
) {
  return updateAdminSlab(slabId, { is_new_arrival: isNewArrival });
}

export async function updateAdminSlabActive(
  slabId: string,
  isActive: boolean
) {
  return updateAdminSlab(slabId, { is_active: isActive });
}