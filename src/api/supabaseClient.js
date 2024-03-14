import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://omdkujdejztbviithjai.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZGt1amRlanp0YnZpaXRoamFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAzNzk4MDcsImV4cCI6MjAyNTk1NTgwN30.IzELU1SN5TSKZVOOBgDbvxzGshTdS0GIwpAoJANp0LE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
