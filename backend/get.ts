import { Database } from "@/utils/database";
import { SupabaseClient } from "@supabase/supabase-js";

export const checkIfHashExists = async (
  supabaseClient: SupabaseClient<Database>,
  params: {
    hash: string;
  },
) => {
  const { count, error } = await supabaseClient
    .from("short_url_table")
    .select("*", { count: "exact" })
    .eq("short_url_hash", params.hash);

  if (error) throw error;

  return Boolean(count);
};

export const getShortLink = async (
  supabaseClient: SupabaseClient<Database>,
  hash: string,
) => {
  const { data, error } = await supabaseClient
    .from("short_url_table")
    .select("*")
    .eq("short_url_hash", hash)
    .maybeSingle();

  if (error || !data) throw error;

  return data;
};
