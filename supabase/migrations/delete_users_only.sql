-- =====================================================
-- SCRIPT UNTUK MENGHAPUS DATA USERS SAJA
-- =====================================================
-- Script ini hanya menghapus data users, tidak menghapus tabel
-- =====================================================

-- Disable RLS temporarily untuk memastikan semua data terhapus
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Hapus semua data dari tabel users
DELETE FROM public.users;

-- Hapus semua user dari auth.users (Supabase Auth)
-- PERINGATAN: Ini akan menghapus SEMUA akun login!
DELETE FROM auth.users;

-- Enable RLS kembali
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Tampilkan konfirmasi
SELECT 'Semua data users telah dihapus!' as status;
SELECT 'Anda perlu membuat admin user baru untuk login kembali' as reminder;
