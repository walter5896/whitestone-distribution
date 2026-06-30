import { supabase } from "./supabaseClient";

export type CreateInquiryPayload = {
  inquiryType: string;
  name: string;
  phone?: string;
  email?: string;
  message?: string;
};

export async function createInquiry(payload: CreateInquiryPayload) {
  const { error } = await supabase.from("inquiries").insert({
    inquiry_type: payload.inquiryType,
    name: payload.name,
    phone: payload.phone || null,
    email: payload.email || null,
    message: payload.message || null,
    status: "new",
  });

  if (error) {
    throw new Error(error.message);
  }
}
