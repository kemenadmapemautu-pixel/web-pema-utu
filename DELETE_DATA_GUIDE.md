# Panduan Menghapus Data dari Database

Panduan untuk menghapus data yang tersimpan di Supabase Dashboard.

## ⚠️ PERINGATAN

**PENTING:** Menghapus data adalah tindakan yang **TIDAK DAPAT DIBATALKAN**. Pastikan Anda yakin sebelum melanjutkan!

## Pilihan 1: Hapus Semua Data Users

Script ini akan menghapus:
- Semua data dari tabel `public.users`
- Semua akun dari `auth.users` (Supabase Auth)
- **SEMUA AKUN LOGIN AKAN HILANG** (termasuk admin!)

### Langkah-langkah:

1. **Buka Supabase Dashboard**
   - URL: https://app.supabase.com
   - Login dan pilih project: `wzgyvsuwyjccnjswmual`

2. **Buka SQL Editor**
   - Klik menu **SQL Editor** di sidebar kiri
   - Klik **New Query**

3. **Copy & Jalankan Script**
   - Copy seluruh isi file: `supabase/migrations/delete_users_only.sql`
   - Paste ke SQL Editor
   - Klik **Run** atau tekan `Ctrl+Enter`

4. **Verifikasi**
   - Buka **Table Editor** > `users` - Harus kosong
   - Buka **Authentication** > **Users** - Harus kosong

5. **Buat Admin Baru**
   - Setelah data terhapus, Anda perlu membuat admin baru
   - Ikuti panduan di `QUICK_START.md` Langkah 2

## Pilihan 2: Hapus Semua Data (Semua Tabel)

Script ini akan menghapus:
- Semua data dari SEMUA tabel
- Semua akun login
- Programs, Activities, News, Gallery, dll.

### Langkah-langkah:

1. **Buka Supabase Dashboard** (sama seperti di atas)

2. **Buka SQL Editor**

3. **Copy & Jalankan Script**
   - Copy seluruh isi file: `supabase/migrations/delete_all_data.sql`
   - Paste ke SQL Editor
   - Klik **Run**

4. **Verifikasi**
   - Semua tabel harus kosong
   - Tidak ada user di Authentication

## Pilihan 3: Hapus Data Secara Manual (Lebih Aman)

Jika Anda ingin lebih hati-hati, hapus data secara manual:

### A. Hapus Users via Dashboard

1. **Buka Authentication > Users**
2. Untuk setiap user:
   - Klik titik tiga (...) di sebelah kanan
   - Pilih **Delete user**
   - Konfirmasi penghapusan
3. Ulangi untuk semua user

### B. Hapus Data dari Tabel

1. **Buka Table Editor**
2. Pilih tabel (misalnya: `users`)
3. Untuk setiap row:
   - Klik row yang ingin dihapus
   - Klik icon **Delete** (trash)
   - Konfirmasi penghapusan

### C. Hapus dengan Query Manual

Untuk tabel tertentu, jalankan query:

```sql
-- Hapus semua users
DELETE FROM public.users;

-- Hapus semua programs
DELETE FROM public.programs;

-- Hapus semua activities
DELETE FROM public.activities;

-- dst...
```

## Pilihan 4: Hapus User Tertentu Saja

Jika hanya ingin menghapus user tertentu:

### Via SQL:

```sql
-- Hapus berdasarkan email
DELETE FROM public.users WHERE email = 'user@example.com';
DELETE FROM auth.users WHERE email = 'user@example.com';

-- Hapus berdasarkan username
DELETE FROM public.users WHERE username = 'username123';

-- Hapus berdasarkan ID
DELETE FROM public.users WHERE id = 'uuid-here';
DELETE FROM auth.users WHERE id = 'uuid-here';
```

### Via Aplikasi:

1. Login sebagai admin
2. Akses `/admin/users`
3. Klik icon **Trash** di user yang ingin dihapus
4. Konfirmasi penghapusan

## Setelah Menghapus Data

### Jika Menghapus Semua Users:

1. **Buat Admin Baru**
   ```sql
   -- Di SQL Editor Supabase
   -- 1. Buat user di Authentication > Users terlebih dahulu
   -- 2. Kemudian jalankan:
   
   UPDATE auth.users
   SET raw_user_meta_data = jsonb_build_object(
     'username', 'admin',
     'name', 'Administrator',
     'role', 'admin'
   )
   WHERE email = 'admin@pemautu.com';

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

2. **Login dengan Admin Baru**
   - Buka aplikasi
   - Login dengan email & password admin baru
   - Mulai buat user lagi

### Jika Menghapus Semua Data:

1. Database kembali ke kondisi awal (kosong)
2. Tabel masih ada, hanya datanya yang hilang
3. Anda bisa mulai input data dari awal

## Backup Data (Opsional)

Sebelum menghapus, Anda bisa backup data terlebih dahulu:

### Via SQL Export:

1. Buka **SQL Editor**
2. Jalankan query untuk export:
   ```sql
   -- Export users
   SELECT * FROM public.users;
   ```
3. Copy hasil ke Excel/CSV

### Via Supabase Dashboard:

1. Buka **Table Editor**
2. Pilih tabel
3. Klik **Export** (jika tersedia)
4. Download sebagai CSV

### Via pg_dump (Advanced):

```bash
# Jika punya akses ke database connection string
pg_dump -h db.wzgyvsuwyjccnjswmual.supabase.co \
        -U postgres \
        -d postgres \
        --table=public.users \
        > backup_users.sql
```

## Troubleshooting

### Error: "permission denied"
- Pastikan Anda login sebagai owner project
- Coba disable RLS sementara:
  ```sql
  ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
  -- Hapus data
  DELETE FROM public.users;
  -- Enable kembali
  ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
  ```

### Error: "violates foreign key constraint"
- Ada relasi dengan tabel lain
- Hapus data dari tabel child terlebih dahulu
- Atau gunakan CASCADE:
  ```sql
  DELETE FROM public.users CASCADE;
  ```

### Data tidak terhapus dari auth.users
- Harus dihapus manual via Authentication > Users
- Atau gunakan Supabase Admin API
- Script SQL mungkin tidak punya permission

## Rekomendasi

### Untuk Development:
- ✅ Boleh hapus semua data sesering mungkin
- ✅ Gunakan script `delete_all_data.sql`
- ✅ Test ulang dari awal

### Untuk Production:
- ❌ **JANGAN** hapus semua data
- ✅ Hapus user tertentu saja jika perlu
- ✅ Selalu backup terlebih dahulu
- ✅ Gunakan soft delete (tambah kolom `deleted_at`)

## Script yang Tersedia

1. **delete_users_only.sql**
   - Hapus semua users
   - Paling sering digunakan
   - Aman untuk development

2. **delete_all_data.sql**
   - Hapus semua data dari semua tabel
   - Untuk reset total
   - Gunakan dengan hati-hati

## Kesimpulan

Untuk menghapus data dashboard:

**Cara Tercepat:**
1. Buka Supabase Dashboard > SQL Editor
2. Copy isi `delete_users_only.sql`
3. Run query
4. Buat admin baru
5. Selesai!

**Cara Teraman:**
1. Backup data terlebih dahulu
2. Hapus manual via Dashboard
3. Verifikasi satu per satu

Pilih metode sesuai kebutuhan Anda! 🗑️
