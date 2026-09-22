import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// When Supabase env vars are not provided, this stays null and the app falls
// back to a local mock data service (see lib/appointments.ts). No API keys
// are hardcoded here — configure VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
// in a local .env file to enable the real backend.
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
