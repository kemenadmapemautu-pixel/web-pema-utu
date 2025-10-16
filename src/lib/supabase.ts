import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Using localStorage fallback mode.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseEnabled = () => {
  return supabase !== null;
};

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  name: string;
  role: 'admin' | 'pimpinan' | 'menteri';
  position?: string;
  department?: string;
  kementerian?: string;
  created_at: string;
  updated_at: string;
}