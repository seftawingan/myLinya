import 'expo-sqlite/localStorage/install';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dukvavnmyxsidgcsrjox.supabase.co';
const supabasePublishableKey = 'sb_secret_4AT9ZL_2PazNmh_yut6_kA_BsEhWe84';

export default createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
