-- =====================================================
-- RESET DATABASE - HAPUS SEMUA DATA & BUAT ADMIN BARU
-- =====================================================
-- Script ini akan:
-- 1. Menghapus semua data users
-- 2. Menghapus semua auth users
-- 3. Siap untuk membuat admin baru
-- =====================================================

-- STEP 1: Tampilkan peringatan
DO $$
BEGIN
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'PERINGATAN: Anda akan menghapus SEMUA data!';
  RAISE NOTICE 'Tindakan ini TIDAK DAPAT DIBATALKAN!';
  RAISE NOTICE '==============================================';
END $$;

-- STEP 2: Hitung jumlah data yang akan dihapus
DO $$
DECLARE
  user_count INTEGER;
  auth_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO user_count FROM public.users;
  SELECT COUNT(*) INTO auth_count FROM auth.users;
  
  RAISE NOTICE 'Data yang akan dihapus:';
  RAISE NOTICE '- Users di public.users: %', user_count;
  RAISE NOTICE '- Auth users: %', auth_count;
  RAISE NOTICE '==============================================';
END $$;

-- STEP 3: Disable RLS untuk memastikan semua data terhapus
ALTER TABLE IF EXISTS public.users DISABLE ROW LEVEL SECURITY;

-- STEP 4: Hapus data dari tabel users
DELETE FROM public.users;

-- STEP 5: Hapus semua auth users
-- CATATAN: Ini memerlukan permission khusus
-- Jika error, hapus manual via Authentication > Users di dashboard
DELETE FROM auth.users;

-- STEP 6: Enable RLS kembali
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;

-- STEP 7: Tampilkan konfirmasi
DO $$
BEGIN
  RAISE NOTICE '==============================================';
  RAISE NOTICE '✓ Semua data berhasil dihapus!';
  RAISE NOTICE '==============================================';
  RAISE NOTICE 'LANGKAH SELANJUTNYA:';
  RAISE NOTICE '1. Buka Authentication > Users di Supabase Dashboard';
  RAISE NOTICE '2. Klik "Add User" > "Create new user"';
  RAISE NOTICE '3. Isi email & password untuk admin';
  RAISE NOTICE '4. Centang "Auto Confirm User"';
  RAISE NOTICE '5. Klik "Create User"';
  RAISE NOTICE '6. Jalankan script create_admin.sql';
  RAISE NOTICE '==============================================';
END $$;

-- Verifikasi: Tampilkan jumlah data setelah dihapus
SELECT 
  'public.users' as table_name,
  COUNT(*) as remaining_rows
FROM public.users
UNION ALL
SELECT 
  'auth.users' as table_name,
  COUNT(*) as remaining_rows
FROM auth.users;
