import 'expo-sqlite/localStorage/install';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dukvavnmyxsidgcsrjox.supabase.co';
const supabasePublishableKey = 'sb_publishable_XCGw0WgzoJM5Bx6m0JRLew_t-TsuuaN';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
