import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';

export const supabase = createClient<Database>(
    String(process.env.REACT_APP_SUPABASE_API_URL),
    String(process.env.REACT_APP_SUPABASE_API_KEY),
);
