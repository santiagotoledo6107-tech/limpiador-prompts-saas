import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yudgoigmenjtolaxxidm.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_mjbdbwuixjN0QNgT69KCmg_Mn5tLQNl';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);