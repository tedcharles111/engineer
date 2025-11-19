import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// User management
export const auth = supabase.auth;

// Database operations for projects
export const projectsTable = supabase.from('projects');
export const chatHistoryTable = supabase.from('chat_history');
