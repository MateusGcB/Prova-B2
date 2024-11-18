// src/utils/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Substitua pela URL e chave do seu projeto no Supabase
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
