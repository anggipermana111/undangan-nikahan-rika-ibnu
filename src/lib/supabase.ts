import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export type AttendanceStatus = 'hadir' | 'tidak_hadir';

export interface WishRecord {
  id: string;
  name: string;
  message: string;
  status: AttendanceStatus;
  pax: number;
  created_at: string;
}

// Keep in sync with the CHECK constraints on public.wishes in Supabase.
export const WISH_NAME_MAX = 80;
export const WISH_MESSAGE_MAX = 500;
export const WISH_PAX_MAX = 4;
