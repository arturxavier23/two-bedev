// cliente do supabase
// usa as variaveis de ambiente do .env
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// so cria o cliente se tiver as variaveis configuradas
// no CI/CD nao tem .env entao fica null
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;