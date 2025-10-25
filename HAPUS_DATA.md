# Cara Cepat Menghapus Data Dashboard

## 🚀 Langkah Cepat (5 Menit)

### 1. Buka Supabase Dashboard
- URL: https://app.supabase.com
- Login dan pilih project: `wzgyvsuwyjccnjswmual`

### 2. Hapus Semua Data Users

**Opsi A: Via SQL Editor (Recommended)**

1. Klik **SQL Editor** di sidebar
2. Klik **New Query**
3. Copy script ini:

```sql
-- Disable RLS
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Hapus semua users
DELETE FROM public.users;
DELETE FROM auth.users;

-- Enable RLS kembali
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

SELECT 'Data berhasil dihapus!' as status;
```

4. Klik **Run** atau tekan `Ctrl+Enter`
5. Selesai! ✅

**Opsi B: Via File SQL**

1. Klik **SQL Editor** > **New Query**
2. Copy isi file: `supabase/migrations/delete_users_only.sql`
3. Paste dan Run
4. Selesai! ✅

### 3. Buat Admin Baru

Setelah data terhapus, buat admin baru:

1. Klik **Authentication** > **Users**
2. Klik **Add User** > **Create new user**
3. Isi:
   - Email: `admin@pemautu.com`
   - Password: `admin123` (atau password kuat)
   - Auto Confirm User: **Centang**
4. Klik **Create User**

### 4. Set User Sebagai Admin

1. Kembali ke **SQL Editor**
2. Copy script ini (ganti email jika perlu):

```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object(
  'username', 'admin',
  'name', 'Administrator',
  'role', 'admin'
)
WHERE email = 'admin@pemautu.com';

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
SET role = 'admin';

SELECT 'Admin berhasil dibuat!' as status;
```

3. Run script
4. Selesai! ✅

### 5. Login ke Aplikasi

1. Buka: `http://localhost:8082/login`
2. Login dengan:
   - Email: `admin@pemautu.com`
   - Password: `admin123`
3. Berhasil! 🎉

## 📁 File SQL yang Tersedia

| File | Fungsi |
|------|--------|
| `delete_users_only.sql` | Hapus semua users saja |
| `delete_all_data.sql` | Hapus semua data dari semua tabel |
| `reset_database.sql` | Reset database lengkap dengan notifikasi |
| `create_admin.sql` | Buat admin user baru |

## ⚡ One-Liner Commands

### Hapus Users via SQL:
```sql
DELETE FROM public.users; DELETE FROM auth.users;
```

### Hapus User Tertentu:
```sql
DELETE FROM public.users WHERE email = 'user@example.com';
DELETE FROM auth.users WHERE email = 'user@example.com';
```

### Cek Jumlah Users:
```sql
SELECT COUNT(*) FROM public.users;
SELECT COUNT(*) FROM auth.users;
```

## 🔍 Verifikasi

Setelah hapus data, cek:

1. **Table Editor** > `users` → Harus kosong
2. **Authentication** > **Users** → Harus kosong
3. Atau run query:
   ```sql
   SELECT * FROM public.users;
   SELECT * FROM auth.users;
   ```

## ⚠️ Catatan Penting

- ✅ Data yang dihapus **TIDAK BISA** dikembalikan
- ✅ Backup data jika perlu sebelum hapus
- ✅ Setelah hapus, Anda harus buat admin baru
- ✅ Semua user tidak bisa login setelah data dihapus

## 📚 Dokumentasi Lengkap

Untuk panduan detail, lihat:
- `DELETE_DATA_GUIDE.md` - Panduan lengkap semua metode
- `QUICK_START.md` - Setup dari awal
- `USER_MANAGEMENT_FEATURE.md` - Dokumentasi fitur

## 🆘 Troubleshooting

### Error: "permission denied"
```sql
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
-- Lalu coba hapus lagi
```

### Auth users tidak terhapus
- Hapus manual via **Authentication** > **Users**
- Klik titik tiga (...) > **Delete user**

### Ingin hapus semua data (bukan hanya users)
- Gunakan file: `delete_all_data.sql`
- Atau hapus manual per tabel

---

**Selesai!** Data dashboard Anda sudah bersih dan siap digunakan dari awal. 🎯
