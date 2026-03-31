// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Make sure your .env variables are correctly set
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Supabase URL or Key is missing. Check your .env file.')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)