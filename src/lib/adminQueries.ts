import { supabase } from "./supabaseClient";
import { mapSupabaseSlab, type SupabaseSlab } from "./slabMapper";
import type { Slab } from "../types/slab";

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