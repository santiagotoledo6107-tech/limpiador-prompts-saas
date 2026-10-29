import { createClient } from '@supabase/supabase-js';

// Fuerza el uso de la URL válida si la variable de entorno viene vacía o inválida
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrl = (rawUrl && rawUrl.startsWith('http')) 
  ? rawUrl 
  : 'https://yudgoigmenjtolaxxidm.supabase.co';

const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseAnonKey = (rawKey && rawKey.length > 10) 
  ? rawKey 
  : 'sb_publishable_mjbdbwuixjN0QNgT69KCmg_Mn5tLQNl'; // o tu clave completa

export const supabase = createClient(supabaseUrl, supabaseAnonKey);