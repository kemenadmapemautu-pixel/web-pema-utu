-- =====================================================
-- SCRIPT UNTUK MENGHAPUS SEMUA DATA DI DATABASE
-- =====================================================
-- PERINGATAN: Script ini akan menghapus SEMUA data!
-- Gunakan dengan hati-hati!
-- =====================================================

-- Disable triggers temporarily to avoid conflicts
SET session_replication_role = 'replica';

-- 1. Hapus data dari tabel users (jika ada)
DELETE FROM public.users;

-- 2. Hapus data dari tabel programs (jika ada)
DELETE FROM public.programs WHERE true;

-- 3. Hapus data dari tabel activities (jika ada)
DELETE FROM public.activities WHERE true;

-- 4. Hapus data dari tabel news (jika ada)
DELETE FROM public.news WHERE true;

-- 5. Hapus data dari tabel gallery (jika ada)
DELETE FROM public.gallery WHERE true;

-- 6. Hapus data dari tabel messages/contacts (jika ada)
DELETE FROM public.messages WHERE true;
DELETE FROM public.contacts WHERE true;

-- 7. Hapus data dari tabel ministries (jika ada)
DELETE FROM public.ministries WHERE true;

-- 8. Hapus data dari tabel ministry_teams (jika ada)
DELETE FROM public.ministry_teams WHERE true;

-- 9. Hapus data dari tabel ministry_content (jika ada)
DELETE FROM public.ministry_content WHERE true;

-- 10. Hapus data dari tabel pengurus (jika ada)
DELETE FROM public.pengurus WHERE true;

-- 11. Hapus data dari tabel structure (jika ada)
DELETE FROM public.structure WHERE true;

-- 12. Hapus data dari tabel stats (jika ada)
DELETE FROM public.stats WHERE true;

-- 13. Hapus data dari tabel accounts (jika ada)
DELETE FROM public.accounts WHERE true;

-- 14. Hapus semua user dari auth.users (Supabase Auth)
-- HATI-HATI: Ini akan menghapus semua akun termasuk admin!
DELETE FROM auth.users;

-- Re-enable triggers
SET session_replication_role = 'origin';

-- Reset sequences (auto-increment) jika ada
-- Uncomment jika Anda ingin reset ID counter
-- ALTER SEQUENCE IF EXISTS programs_id_seq RESTART WITH 1;
-- ALTER SEQUENCE IF EXISTS activities_id_seq RESTART WITH 1;
-- ALTER SEQUENCE IF EXISTS news_id_seq RESTART WITH 1;

-- Tampilkan konfirmasi
SELECT 'Semua data telah dihapus!' as status;
