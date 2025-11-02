import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

export interface ContactForm {
  id?: string;
  full_name: string;
  email: string;
  company?: string;
  message: string;
  created_at?: string;
  updated_at?: string;
}

export interface CandidateApplication {
  id?: string;
  full_name: string;
  citizenship: string;
  phone: string;
  email: string;
  main_role: string;
  business_sector: string;
  job_title: string;
  current_employer: string;
  linkedin_url: string;
  cv_file_path?: string;
  cv_file_name?: string;
  cv_file_size?: number;
  cv_file_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserProfile {
  id: string;
  full_name?: string;
  profile_photo_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthUser {
  id: string;
  email?: string;
  created_at?: string;
}