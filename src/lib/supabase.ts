import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export interface RsvpRecord {
  id?: string;
  name: string;
  status: 'hadir' | 'tidak_hadir';
  pax: number;
  message: string;
  created_at?: string;
}

export interface WishRecord {
  id: string;
  name: string;
  message: string;
  status: 'hadir' | 'tidak_hadir';
  created_at: string;
}

// Initial mock wishes (kosongkan sesuai permintaan)
export const defaultWishes: WishRecord[] = [];
