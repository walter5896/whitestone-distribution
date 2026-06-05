import { supabase } from "./supabaseClient";
import { mapSupabaseSlab, type SupabaseSlab } from "./slabMapper";

export type AdminInquiry = {
  id: string;
  inquiry_type: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string | null;
  status: string | null;
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

export async function getAdminSlabs() {
  const { data, error } = await supabase
    .from("slabs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as SupabaseSlab[]).map(mapSupabaseSlab);
}