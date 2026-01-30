import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://dukvavnmyxsidgcsrjox.supabase.co';
const supabasePublishableKey = 'sb_publishable_XCGw0WgzoJM5Bx6m0JRLew_t-TsuuaN';

export default createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});