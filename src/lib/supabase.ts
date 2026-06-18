import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://Fridgify.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_wo6HIg2un0zLC7fgboiM5A_UIwvD38c";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
