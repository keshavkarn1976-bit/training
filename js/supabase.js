const { createClient } = window.supabase;

const supabaseClient = createClient(
    window.APP_CONFIG.supabase.url,
    window.APP_CONFIG.supabase.key
);

window.supabaseClient = supabaseClient;
