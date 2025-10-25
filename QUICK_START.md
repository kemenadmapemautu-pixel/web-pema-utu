# Quick Start Guide - User Management

Panduan cepat untuk mulai menggunakan fitur manajemen user.

## Langkah 1: Setup Database (5 menit)

1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Login dan pilih project: `wzgyvsuwyjccnjswmual`
3. Klik **SQL Editor** di sidebar
4. Klik **New Query**
5. Copy isi file `supabase/migrations/20250125_create_users_table.sql`
6. Paste dan klik **Run**
7. Tunggu hingga muncul "Success. No rows returned"

## Langkah 2: Buat Admin Pertama (3 menit)

1. Di Supabase Dashboard, klik **Authentication** > **Users**
2. Klik **Add User** > **Create new user**
3. Isi:
   - Email: `admin@pemautu.com` (atau email Anda)
   - Password: `admin123` (ganti dengan password kuat)
   - Auto Confirm User: **Centang**
4. Klik **Create User**
5. Kembali ke **SQL Editor**
6. Jalankan query ini (ganti email jika perlu):

```sql
-- Set user sebagai admin
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'username', 'admin',
  'name', 'Administrator',
  'role', 'admin'
)
WHERE email = 'admin@pemautu.com';

-- Insert ke tabel users
INSERT INTO public.users (id, email, username, name, role)
SELECT 
  id, 
  email, 
  'admin', 
  'Administrator', 
  'admin'
FROM auth.users
WHERE email = 'admin@pemautu.com'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';
```

## Langkah 3: Login ke Aplikasi (1 menit)

1. Buka aplikasi: `http://localhost:8082`
2. Klik **Login** atau akses `/login`
3. Login dengan:
   - Email: `admin@pemautu.com`
   - Password: `admin123`
4. Klik **Login**

## Langkah 4: Buat User Baru (2 menit)

1. Setelah login, akses `/admin/users`
2. Klik tombol **Buat Akun Baru**
3. Isi form:
   - Email: `menteri@pemautu.com`
   - Username: `menteri1`
   - Nama: `Menteri Pendidikan`
   - Password: `password123`
   - Konfirmasi Password: `password123`
   - Role: **Menteri**
   - Kementerian: `Kementerian Pendidikan`
4. Klik **Buat Akun**
5. User baru akan muncul di daftar

## Langkah 5: Verifikasi (1 menit)

1. Logout dari akun admin
2. Login dengan akun baru:
   - Email: `menteri@pemautu.com`
   - Password: `password123`
3. Jika berhasil login, setup selesai! ✅

## Struktur Menu Admin

Setelah login sebagai admin, Anda bisa akses:

```
/admin/
├── dashboard          # Dashboard admin
├── users             # Manajemen user (BARU)
├── create-account    # Buat akun baru (BARU)
├── programs          # Manajemen program
├── activities        # Manajemen kegiatan
├── news              # Manajemen berita
├── gallery           # Manajemen galeri
└── profile           # Edit profil
```

## Tips

### Membuat User dengan Role Berbeda

**Admin:**
```
Role: Admin
Jabatan: Administrator
Department: IT
```

**Pimpinan:**
```
Role: Pimpinan
Jabatan: Ketua PEMA UTU
Department: Kepemimpinan
```

**Menteri:**
```
Role: Menteri
Jabatan: Menteri
Kementerian: [Nama Kementerian]
```

### Reset Password User

Jika user lupa password:

1. Buka Supabase Dashboard > Authentication > Users
2. Cari user yang ingin direset
3. Klik titik tiga (...) > **Send password recovery**
4. User akan menerima email reset password

### Menghapus User

1. Akses `/admin/users`
2. Klik icon **Trash** di baris user
3. Konfirmasi penghapusan
4. User akan dihapus dari database

## Troubleshooting Cepat

### ❌ Error: "Supabase not configured"
**Solusi:** Cek file `.env`, pastikan ada:
```
VITE_SUPABASE_URL=https://wzgyvsuwyjccnjswmual.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

### ❌ Error: "relation public.users does not exist"
**Solusi:** Migration belum dijalankan. Ulangi Langkah 1.

### ❌ User tidak bisa login
**Solusi:** 
1. Cek apakah user sudah confirmed di Supabase
2. Cek apakah data ada di tabel `users`
3. Coba reset password

### ❌ "Permission denied for table users"
**Solusi:** RLS policies belum aktif. Pastikan migration dijalankan lengkap.

## Next Steps

Setelah setup selesai:

1. ✅ Buat user untuk semua anggota PEMA UTU
2. ✅ Atur role sesuai jabatan
3. ✅ Test login dengan berbagai akun
4. ✅ Mulai gunakan fitur-fitur lain

## Keamanan

⚠️ **PENTING:**
- Ganti password default `admin123` dengan password kuat
- Jangan share credentials admin
- Aktifkan email confirmation di Supabase
- Backup database secara berkala

## Bantuan

Dokumentasi lengkap:
- `SETUP_DATABASE.md` - Setup database detail
- `USER_MANAGEMENT_FEATURE.md` - Dokumentasi fitur lengkap
- `README.md` - Informasi project

Supabase Docs: https://supabase.com/docs
