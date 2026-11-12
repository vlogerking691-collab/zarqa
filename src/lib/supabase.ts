import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zysmujaaxwuvmfqbmgdn.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5c211amFheHd1dm1mcWJtZ2RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ0NzI3MjgsImV4cCI6MjExMDA0ODcyOH0.GM3-DTau5h-gNHTLyW6DMdtD1RMlCWAAI_MxqeNfXIg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
