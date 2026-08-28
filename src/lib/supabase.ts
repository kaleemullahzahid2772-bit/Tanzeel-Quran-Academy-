import { createClient } from "@supabase/supabase-js";

let rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
if (rawUrl && !rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
  rawUrl = `https://${rawUrl}.supabase.co`;
}

const supabaseUrl =
  rawUrl || "https://izzdvkmoycjufucjqkix.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_3gfw0kGd4APVh9Gsnhd_eQ_NJHZBLNw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

