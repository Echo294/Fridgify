import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://iyhwshjvvflxjkpgxzmz.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5aHdzaGp2dmZseGprcGd4em16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MDA2MTUsImV4cCI6MjA5NzM3NjYxNX0.Wj8zE4xKOGxcRb_SmsNwM30GN7w2bHzGqpqNhzL7YiU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// This is the Supabase client for the Fridgify app.
