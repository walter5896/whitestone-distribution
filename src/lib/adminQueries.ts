import { supabase } from "./supabaseClient";
import { mapSupabaseSlab, type SupabaseSlab } from "./slabMapper";
import type { Slab, SlabImageType } from "../types/slab";

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

function getStoragePathFromPublicUrl(publicUrl: string | null | undefined) {
  if (!publicUrl) {
    return "";
  }

  const bucketMarker = `/storage/v1/object/public/${SLAB_IMAGE_BUCKET}/`;
  const markerIndex = publicUrl.indexOf(bucketMarker);

  if (markerIndex === -1) {
    return "";
  }

  return decodeURIComponent(publicUrl.slice(markerIndex + bucketMarker.length));
}

async function deleteSlabImageFromStorage(publicUrl: string | null | undefined) {
  const imagePath = getStoragePathFromPublicUrl(publicUrl);

  if (!imagePath) {
    return;
  }

  const { error } = await supabase.storage
    .from(SLAB_IMAGE_BUCKET)
    .remove([imagePath]);

  if (error) {
    throw new Error(error.message);
  }
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

const adminSlabSelect = `
  *,
  slab_images (*)
`;

type AdminSupabaseSlab = SupabaseSlab & {
  internal_notes?: string | null;
};

type SupabaseSlabImageRow = {
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

export type CreateAdminSlabImagePayload = {
  slabId: string;
  imageUrl: string;
  altText?: string;
  imageType?: SlabImageType;
  sortOrder?: number;
  isPrimary?: boolean;
  isVisible?: boolean;
};

export type UploadAdminSlabGalleryImagePayload = {
  slabId: string;
  slabSlugOrName: string;
  file: File;
  altText?: string;
  imageType?: SlabImageType;
  isPrimary?: boolean;
};

function mapAdminSlab(row: AdminSupabaseSlab): AdminSlab {
  const publicSlab = mapSupabaseSlab(row);

  return {
    ...publicSlab,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    internalNotes: row.internal_notes ?? "",
    primaryImageUrl: row.primary_image_url ?? publicSlab.imageUrl ?? "",
  };
}

async function getAdminSlabById(slabId: string) {
  const { data, error } = await supabase
    .from("slabs")
    .select(adminSlabSelect)
    .eq("id", slabId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapAdminSlab(data as AdminSupabaseSlab);
}

async function getNextSlabImageSortOrder(slabId: string) {
  const { data, error } = await supabase
    .from("slab_images")
    .select("sort_order")
    .eq("slab_id", slabId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return ((data?.sort_order as number | null | undefined) ?? -1) + 1;
}

async function insertPrimarySlabImage(
  slabId: string,
  imageUrl: string,
  altText: string
) {
  if (!imageUrl) {
    return;
  }

  await supabase
    .from("slab_images")
    .update({
      is_primary: false,
      image_type: "gallery",
    })
    .eq("slab_id", slabId);

  const { error } = await supabase.from("slab_images").insert({
    slab_id: slabId,
    image_url: imageUrl,
    alt_text: altText,
    image_type: "primary",
    sort_order: 0,
    is_primary: true,
    is_visible: true,
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function syncPrimarySlabImageRecord(
  slabId: string,
  nextPrimaryImageUrl: string | null | undefined,
  fallbackAltText: string
) {
  if (!nextPrimaryImageUrl) {
    return;
  }

  const { data: currentPrimary, error: currentPrimaryError } = await supabase
    .from("slab_images")
    .select("*")
    .eq("slab_id", slabId)
    .eq("is_primary", true)
    .maybeSingle();

  if (currentPrimaryError) {
    throw new Error(currentPrimaryError.message);
  }

  const currentPrimaryRow = currentPrimary as SupabaseSlabImageRow | null;

  if (currentPrimaryRow?.image_url === nextPrimaryImageUrl) {
    return;
  }

  if (currentPrimaryRow) {
    const previousImageUrl = currentPrimaryRow.image_url;

    const { error: updateImageError } = await supabase
      .from("slab_images")
      .update({
        image_url: nextPrimaryImageUrl,
        alt_text: currentPrimaryRow.alt_text || fallbackAltText,
        image_type: "primary",
        sort_order: 0,
        is_primary: true,
        is_visible: true,
      })
      .eq("id", currentPrimaryRow.id);

    if (updateImageError) {
      throw new Error(updateImageError.message);
    }

    await deleteSlabImageFromStorage(previousImageUrl);
    return;
  }

  await insertPrimarySlabImage(slabId, nextPrimaryImageUrl, fallbackAltText);
}

export async function getAdminSlabs() {
  const { data, error } = await supabase
    .from("slabs")
    .select(adminSlabSelect)
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

  const createdSlab = data as AdminSupabaseSlab;

  if (payload.primary_image_url) {
    await insertPrimarySlabImage(
      createdSlab.id,
      payload.primary_image_url,
      `${cleanName} primary slab photo`
    );
  }

  return getAdminSlabById(createdSlab.id);
}

export async function updateAdminSlab(
  slabId: string,
  updates: AdminSlabUpdatePayload
) {
  const shouldSyncPrimaryImage = Object.prototype.hasOwnProperty.call(
    updates,
    "primary_image_url"
  );

  const currentSlab = shouldSyncPrimaryImage
    ? await getAdminSlabById(slabId)
    : null;

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

  const updatedRow = data as AdminSupabaseSlab;

  if (shouldSyncPrimaryImage) {
    await syncPrimarySlabImageRecord(
      slabId,
      updates.primary_image_url,
      `${updates.name || currentSlab?.name || updatedRow.name} primary slab photo`
    );
  }

  return getAdminSlabById(slabId);
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

/* =========================
   ADMIN SLAB IMAGES
========================= */

export async function createAdminSlabImage(
  payload: CreateAdminSlabImagePayload
) {
  const cleanImageUrl = payload.imageUrl.trim();

  if (!payload.slabId || !cleanImageUrl) {
    throw new Error("Slab ID and image URL are required.");
  }

  const sortOrder =
    payload.sortOrder ?? (await getNextSlabImageSortOrder(payload.slabId));

  if (payload.isPrimary) {
    await supabase
      .from("slab_images")
      .update({
        is_primary: false,
        image_type: "gallery",
      })
      .eq("slab_id", payload.slabId);
  }

  const { error } = await supabase.from("slab_images").insert({
    slab_id: payload.slabId,
    image_url: cleanImageUrl,
    alt_text: payload.altText?.trim() || null,
    image_type: payload.isPrimary
      ? "primary"
      : payload.imageType ?? "gallery",
    sort_order: sortOrder,
    is_primary: payload.isPrimary ?? false,
    is_visible: payload.isVisible ?? true,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (payload.isPrimary) {
    const { error: slabUpdateError } = await supabase
      .from("slabs")
      .update({
        primary_image_url: cleanImageUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", payload.slabId);

    if (slabUpdateError) {
      throw new Error(slabUpdateError.message);
    }
  }

  return getAdminSlabById(payload.slabId);
}

export async function uploadAdminSlabGalleryImage(
  payload: UploadAdminSlabGalleryImagePayload
) {
  const uploadResult = await uploadAdminSlabImage(
    payload.file,
    payload.slabSlugOrName
  );

  return createAdminSlabImage({
    slabId: payload.slabId,
    imageUrl: uploadResult.publicUrl,
    altText: payload.altText,
    imageType: payload.imageType ?? "gallery",
    isPrimary: payload.isPrimary ?? false,
    isVisible: true,
  });
}

export async function setAdminSlabPrimaryImage(
  slabId: string,
  imageId: string
) {
  const { data: targetImage, error: targetError } = await supabase
    .from("slab_images")
    .select("*")
    .eq("id", imageId)
    .eq("slab_id", slabId)
    .single();

  if (targetError) {
    throw new Error(targetError.message);
  }

  const image = targetImage as SupabaseSlabImageRow;

  const { error: resetError } = await supabase
    .from("slab_images")
    .update({
      is_primary: false,
      image_type: "gallery",
    })
    .eq("slab_id", slabId);

  if (resetError) {
    throw new Error(resetError.message);
  }

  const { error: setPrimaryError } = await supabase
    .from("slab_images")
    .update({
      is_primary: true,
      is_visible: true,
      image_type: "primary",
      sort_order: 0,
    })
    .eq("id", imageId);

  if (setPrimaryError) {
    throw new Error(setPrimaryError.message);
  }

  const { error: slabUpdateError } = await supabase
    .from("slabs")
    .update({
      primary_image_url: image.image_url,
      updated_at: new Date().toISOString(),
    })
    .eq("id", slabId);

  if (slabUpdateError) {
    throw new Error(slabUpdateError.message);
  }

  return getAdminSlabById(slabId);
}

export async function updateAdminSlabImageVisibility(
  slabId: string,
  imageId: string,
  isVisible: boolean
) {
  const { data: targetImage, error: targetError } = await supabase
    .from("slab_images")
    .select("*")
    .eq("id", imageId)
    .eq("slab_id", slabId)
    .single();

  if (targetError) {
    throw new Error(targetError.message);
  }

  const image = targetImage as SupabaseSlabImageRow;

  if (image.is_primary && !isVisible) {
    throw new Error("Primary slab images must stay visible.");
  }

  const { error } = await supabase
    .from("slab_images")
    .update({ is_visible: isVisible })
    .eq("id", imageId);

  if (error) {
    throw new Error(error.message);
  }

  return getAdminSlabById(slabId);
}

export async function updateAdminSlabImageType(
  slabId: string,
  imageId: string,
  imageType: Exclude<SlabImageType, "primary">
) {
  const { error } = await supabase
    .from("slab_images")
    .update({ image_type: imageType })
    .eq("id", imageId)
    .eq("slab_id", slabId)
    .eq("is_primary", false);

  if (error) {
    throw new Error(error.message);
  }

  return getAdminSlabById(slabId);
}

export async function moveAdminSlabImage(
  slabId: string,
  imageId: string,
  direction: "up" | "down"
) {
  const { data, error } = await supabase
    .from("slab_images")
    .select("*")
    .eq("slab_id", slabId)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const images = (data as SupabaseSlabImageRow[]) ?? [];
  const currentIndex = images.findIndex((image) => image.id === imageId);

  if (currentIndex === -1) {
    throw new Error("Image could not be found.");
  }

  const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
  const currentImage = images[currentIndex];
  const swapImage = images[swapIndex];

  if (!swapImage) {
    return getAdminSlabById(slabId);
  }

  const currentSortOrder = currentImage.sort_order ?? currentIndex;
  const swapSortOrder = swapImage.sort_order ?? swapIndex;

  const { error: currentUpdateError } = await supabase
    .from("slab_images")
    .update({ sort_order: swapSortOrder })
    .eq("id", currentImage.id);

  if (currentUpdateError) {
    throw new Error(currentUpdateError.message);
  }

  const { error: swapUpdateError } = await supabase
    .from("slab_images")
    .update({ sort_order: currentSortOrder })
    .eq("id", swapImage.id);

  if (swapUpdateError) {
    throw new Error(swapUpdateError.message);
  }

  return getAdminSlabById(slabId);
}

export async function deleteAdminSlabImage(slabId: string, imageId: string) {
  const { data, error } = await supabase
    .from("slab_images")
    .select("*")
    .eq("id", imageId)
    .eq("slab_id", slabId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const image = data as SupabaseSlabImageRow;

  if (image.is_primary) {
    throw new Error("Set another image as primary before deleting this one.");
  }

  await deleteSlabImageFromStorage(image.image_url);

  const { error: deleteError } = await supabase
    .from("slab_images")
    .delete()
    .eq("id", imageId);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  return getAdminSlabById(slabId);
}

export async function deleteAdminSlab(slabId: string) {
  const slab = await getAdminSlabById(slabId);

  for (const image of slab.images) {
    await deleteSlabImageFromStorage(image.imageUrl);
  }

  const { error: deleteError } = await supabase
    .from("slabs")
    .delete()
    .eq("id", slabId);

  if (deleteError) {
    throw new Error(deleteError.message);
  }
}
