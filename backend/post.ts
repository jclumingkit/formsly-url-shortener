import { Database } from "@/utils/database";
import { SupabaseClient } from "@supabase/supabase-js";

export const createShortLink = async (
  supabaseClient: SupabaseClient<Database>,
  params: {
    url: string;
    hash: string;
  },
) => {
  const { url, hash } = params;

  const newShortLink = {
    short_url_original_url: url,
    short_url_hash: hash,
    short_url_short_url: `${process.env.NEXT_PUBLIC_HOST}/${hash}`,
  };

  const { data, error } = await supabaseClient
    .from("short_url_table")
    .insert(newShortLink)
    .select()
    .maybeSingle();

  if (error) throw error;

  return data;
};
