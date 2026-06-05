import { supabase } from "./supabaseClient";
import { mapSupabaseSlab, type SupabaseSlab } from "./slabMapper";

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