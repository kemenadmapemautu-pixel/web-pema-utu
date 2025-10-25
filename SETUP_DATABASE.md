# Setup Database Supabase

Panduan untuk mengatur database Supabase untuk sistem PEMA UTU.

## Langkah 1: Jalankan Migration

Anda perlu menjalankan SQL migration untuk membuat tabel `users` di Supabase.

### Cara 1: Melalui Supabase Dashboard (Recommended)

1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda: `wzgyvsuwyjccnjswmual`
3. Klik menu **SQL Editor** di sidebar kiri
4. Klik **New Query**
5. Copy seluruh isi file `supabase/migrations/20250125_create_users_table.sql`
6. Paste ke SQL Editor
7. Klik **Run** atau tekan `Ctrl+Enter`

### Cara 2: Menggunakan Supabase CLI

Jika Anda memiliki Supabase CLI terinstall:

```bash
# Login ke Supabase
supabase login

# Link project
supabase link --project-ref wzgyvsuwyjccnjswmual

# Jalankan migration
supabase db push
```

## Langkah 2: Verifikasi Tabel

Setelah migration berhasil, verifikasi bahwa tabel `users` telah dibuat:

1. Buka **Table Editor** di Supabase Dashboard
2. Cari tabel `users`
3. Pastikan kolom-kolom berikut ada:
   - `id` (uuid, primary key)
   - `email` (text, unique)
   - `username` (text, unique)
   - `name` (text)
   - `role` (text)
   - `position` (text, nullable)
   - `department` (text, nullable)
   - `kementerian` (text, nullable)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

## Langkah 3: Buat Admin User Pertama

Setelah tabel dibuat, Anda perlu membuat admin user pertama:

### Opsi A: Melalui Supabase Dashboard

1. Buka **Authentication** > **Users** di Supabase Dashboard
2. Klik **Add User** > **Create new user**
3. Isi:
   - Email: email admin Anda
   - Password: password yang kuat
   - Auto Confirm User: **Yes**
4. Klik **Create User**
5. Setelah user dibuat, buka **SQL Editor**
6. Jalankan query berikut (ganti `EMAIL_ADMIN` dengan email yang baru dibuat):

```sql
-- Update user yang baru dibuat menjadi admin
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'username', 'admin',
  'name', 'Administrator',
  'role', 'admin'
)
WHERE email = 'EMAIL_ADMIN';

-- Insert ke tabel users (jika trigger tidak berjalan)
INSERT INTO public.users (id, email, username, name, role)
SELECT 
  id, 
  email, 
  'admin', 
  'Administrator', 
  'admin'
FROM auth.users
WHERE email = 'EMAIL_ADMIN'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';
```

### Opsi B: Menggunakan Aplikasi

Setelah migration selesai dan admin pertama dibuat via dashboard:

1. Buka aplikasi di browser: `http://localhost:8082`
2. Login dengan email dan password admin yang dibuat
3. Setelah login, Anda bisa mengakses:
   - `/admin/users` - Melihat daftar user
   - `/admin/create-account` - Membuat akun baru

## Fitur yang Tersedia

### 1. Manajemen User (`/admin/users`)
- Melihat daftar semua user
- Menghapus user
- Navigasi ke form create account

### 2. Buat Akun Baru (`/admin/create-account`)
- Form lengkap untuk membuat user baru
- Validasi email dan username (cek ketersediaan)
- Password minimal 6 karakter
- Role: Admin, Pimpinan, atau Menteri
- Field opsional: Jabatan, Departemen, Kementerian

### 3. Row Level Security (RLS)

Database sudah dilengkapi dengan RLS policies:
- User hanya bisa melihat profil sendiri
- Admin bisa melihat semua profil
- Admin bisa membuat, update, dan delete user
- User bisa update profil sendiri

## Troubleshooting

### Error: "relation public.users does not exist"
- Migration belum dijalankan. Ikuti Langkah 1.

### Error: "permission denied for table users"
- RLS policies belum aktif atau ada masalah dengan policies
- Pastikan migration dijalankan dengan benar

### User tidak bisa login
- Pastikan user sudah dikonfirmasi di Supabase Dashboard
- Cek apakah email sudah benar
- Cek apakah data ada di tabel `users`

### Trigger tidak berjalan otomatis
- Jalankan manual insert ke tabel `users` seperti di Opsi A
- Cek apakah trigger `on_auth_user_created` sudah dibuat

## Struktur Database

```
auth.users (Supabase Auth)
├── id (uuid)
├── email
├── encrypted_password
└── raw_user_meta_data (jsonb)

public.users (Custom Table)
├── id (uuid) → references auth.users(id)
├── email (text, unique)
├── username (text, unique)
├── name (text)
├── role (text: admin|pimpinan|menteri)
├── position (text, nullable)
├── department (text, nullable)
├── kementerian (text, nullable)
├── created_at (timestamp)
└── updated_at (timestamp)
```

## Keamanan

1. **Password**: Minimal 6 karakter (bisa ditingkatkan di validasi form)
2. **RLS**: Semua tabel dilindungi dengan Row Level Security
3. **Policies**: Hanya admin yang bisa CRUD user lain
4. **Auth**: Menggunakan Supabase Auth untuk autentikasi

## Next Steps

Setelah setup database selesai:
1. Buat admin user pertama
2. Login ke aplikasi
3. Buat user-user lainnya melalui `/admin/create-account`
4. Atur role dan permission sesuai kebutuhan
