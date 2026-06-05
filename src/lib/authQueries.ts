import { supabase } from "./supabaseClient";

export type AdminProfile = {
  id: string;
  user_id: string;
  email: string;
  role: string;
  full_name: string | null;
  created_at: string;
};

export async function signInAdmin(email: string, password: string) {
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) {
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error("Login failed. No user returned.");
  }

  const { data: adminProfile, error: profileError } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("user_id", authData.user.id)
    .single();

  if (profileError || !adminProfile) {
    await supabase.auth.signOut();
    throw new Error("This account is not approved for admin access.");
  }

  return adminProfile as AdminProfile;
}

export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentAdminProfile() {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  const user = sessionData.session?.user;

  if (!user) {
    return null;
  }

  const { data: adminProfile, error: profileError } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (profileError || !adminProfile) {
    return null;
  }

  return adminProfile as AdminProfile;
}