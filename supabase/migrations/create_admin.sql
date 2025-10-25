-- =====================================================
-- CREATE ADMIN USER
-- =====================================================
-- Script ini membuat admin user setelah reset database
-- 
-- PENTING: Sebelum menjalankan script ini:
-- 1. Buat user baru di Authentication > Users di Supabase Dashboard
-- 2. Ganti 'admin@pemautu.com' dengan email yang Anda buat
-- 3. Jalankan script ini
-- =====================================================

-- GANTI EMAIL INI dengan email admin yang baru dibuat!
-- Cari dan replace 'admin@pemautu.com' dengan email Anda

-- Set metadata untuk user
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'username', 'admin',
  'name', 'Administrator',
  'role', 'admin'
)
WHERE email = 'admin@pemautu.com';

-- Insert ke tabel users
INSERT INTO public.users (id, email, username, name, role, position)
SELECT 
  id, 
  email, 
  'admin', 
  'Administrator', 
  'admin',
  'System Administrator'
FROM auth.users
WHERE email = 'admin@pemautu.com'
ON CONFLICT (id) DO UPDATE
SET 
  role = 'admin',
  username = 'admin',
  name = 'Administrator',
  position = 'System Administrator';

-- Verifikasi admin berhasil dibuat
SELECT 
  id,
  email,
  username,
  name,
  role,
  position,
  created_at
FROM public.users
WHERE email = 'admin@pemautu.com';

-- Tampilkan pesan sukses
SELECT '✓ Admin user berhasil dibuat!' as status,
       'Login dengan email: admin@pemautu.com' as info;
