import { createClient } from "@supabase/supabase-js";

/*const supabaseUrl = {'https://dlzrbdvxxsfduuhsysiu.supabase.co'}
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;*/

export const supabase = createClient("https://dlzrbdvxxsfduuhsysiu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsenJiZHZ4eHNmZHV1aHN5c2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5Nzg2MzAsImV4cCI6MjAwMTU1NDYzMH0.dRcQkL5lgv7E_EnJN2T9BAn-zYzy87CxyOKE1r2aG7E");
