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

// Initial mock wishes
export const defaultWishes: WishRecord[] = [
  {
    id: 'mock-1',
    name: 'Budi Santoso & Keluarga',
    message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khoir. Selamat menempuh hidup baru Dedy & Tiara!',
    status: 'hadir',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'mock-2',
    name: 'Alumni Teknik 2016',
    message: 'Happy wedding bro Dedy dan Tiara! Semoga langgeng, sakinah mawaddah warahmah sampai kakek nenek.',
    status: 'hadir',
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'mock-3',
    name: 'Siti Rahmawati',
    message: 'Selamat Tiara sayang! Terharu banget akhirnya berlabuh. Semoga bahagia selalu ya kalian berdua.',
    status: 'tidak_hadir',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];
