import { supabase } from "./supabaseClient";
import { mapSupabaseSlab, type SupabaseSlab } from "./slabMapper";

const slabSelect = `
  *,
  slab_images (*)
`;

export async function getActiveSlabs() {
  const { data, error } = await supabase
    .from("slabs")
    .select(slabSelect)
    .eq("is_active", true)
    .order("is_featured", { ascending: false })
    .order("is_new_arrival", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as SupabaseSlab[]).map(mapSupabaseSlab);
}

export async function getFeaturedSlabs(limit = 3) {
  const { data, error } = await supabase
    .from("slabs")
    .select(slabSelect)
    .eq("is_active", true)
    .eq("is_featured", true)
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data as SupabaseSlab[]).map(mapSupabaseSlab);
}

export async function getSlabBySlug(slug: string) {
  const { data, error } = await supabase
    .from("slabs")
    .select(slabSelect)
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapSupabaseSlab(data as SupabaseSlab);
}