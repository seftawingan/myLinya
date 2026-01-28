import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://dukvavnmyxsidgcsrjox.supabase.co';
const supabasePublishableKey = 'sb_secret_4AT9ZL_2PazNmh_yut6_kA_BsEhWe84';

export default createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});