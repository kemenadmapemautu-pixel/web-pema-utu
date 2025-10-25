# Fitur Manajemen User

Dokumentasi lengkap untuk fitur manajemen user yang terintegrasi dengan Supabase.

## Overview

Sistem ini memungkinkan admin untuk mengelola akun pengguna yang tersimpan di database Supabase. Semua akun akan tersimpan secara permanen dan dapat digunakan untuk login ke sistem.

## Fitur Utama

### 1. **Penyimpanan di Database**
- Semua akun tersimpan di Supabase (PostgreSQL)
- Autentikasi menggunakan Supabase Auth
- Data profil tersimpan di tabel `public.users`
- Password di-hash secara otomatis oleh Supabase

### 2. **Manajemen User** (`/admin/users`)

Halaman ini menampilkan:
- Daftar semua user dalam bentuk tabel
- Informasi: Nama, Username, Email, Role, Jabatan, Kementerian
- Badge warna untuk role:
  - **Admin**: Merah (destructive)
  - **Pimpinan**: Biru (default)
  - **Menteri**: Abu-abu (secondary)

Aksi yang tersedia:
- **Edit**: Mengedit profil user (coming soon)
- **Delete**: Menghapus user dengan konfirmasi
- **Create**: Tombol untuk membuat user baru

### 3. **Buat Akun Baru** (`/admin/create-account`)

Form untuk membuat akun baru dengan field:

#### Field Wajib:
- **Email**: Format email valid, unique
- **Username**: Min 3 karakter, hanya huruf/angka/underscore, unique
- **Nama Lengkap**: Nama lengkap user
- **Password**: Minimal 6 karakter
- **Konfirmasi Password**: Harus sama dengan password
- **Role**: Pilihan Admin, Pimpinan, atau Menteri

#### Field Opsional:
- **Jabatan**: Contoh: Ketua, Wakil Ketua
- **Departemen**: Contoh: Departemen Pendidikan
- **Kementerian**: Wajib diisi jika role = Menteri

#### Validasi:
- Email dan username dicek ketersediaannya di database
- Password minimal 6 karakter
- Konfirmasi password harus cocok
- Kementerian wajib untuk role Menteri

### 4. **Autentikasi**

Sistem menggunakan dual-mode authentication:

#### Mode Supabase (Recommended):
- Login menggunakan email & password
- Session tersimpan di Supabase
- Auto-refresh token
- Lebih aman dan scalable

#### Mode Fallback (localStorage):
- Digunakan jika Supabase tidak tersedia
- Data tersimpan di browser
- Untuk development/testing

## Struktur File

```
src/
├── lib/
│   ├── supabase.ts          # Konfigurasi Supabase client
│   └── database.ts          # Helper functions untuk CRUD user
├── pages/
│   └── admin/
│       ├── UserManagement.tsx    # Halaman daftar user
│       └── CreateAccount.tsx     # Halaman buat akun baru
├── contexts/
│   └── AuthContext.tsx      # Context untuk autentikasi
└── App.tsx                  # Routing

supabase/
└── migrations/
    └── 20250125_create_users_table.sql  # SQL migration
```

## API Functions

File `src/lib/database.ts` menyediakan fungsi-fungsi:

### `createUser(userData: CreateUserData)`
Membuat user baru di Supabase Auth dan tabel users.

```typescript
const result = await createUser({
  email: "user@example.com",
  password: "password123",
  username: "johndoe",
  name: "John Doe",
  role: "menteri",
  kementerian: "Kementerian Pendidikan"
});
```

### `getAllUsers()`
Mengambil semua user dari database.

```typescript
const { users } = await getAllUsers();
```

### `getUserById(userId: string)`
Mengambil data user berdasarkan ID.

```typescript
const { user } = await getUserById("uuid-here");
```

### `updateUser(userId: string, updates: UpdateUserData)`
Update data user.

```typescript
await updateUser("uuid-here", {
  name: "New Name",
  position: "Ketua"
});
```

### `deleteUser(userId: string)`
Hapus user dari database.

```typescript
await deleteUser("uuid-here");
```

### `isUsernameAvailable(username: string)`
Cek apakah username tersedia.

```typescript
const { available } = await isUsernameAvailable("johndoe");
```

### `isEmailAvailable(email: string)`
Cek apakah email tersedia.

```typescript
const { available } = await isEmailAvailable("user@example.com");
```

## Database Schema

### Tabel: `public.users`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY, FK to auth.users(id) | User ID |
| email | text | UNIQUE, NOT NULL | Email user |
| username | text | UNIQUE, NOT NULL | Username |
| name | text | NOT NULL | Nama lengkap |
| role | text | NOT NULL, CHECK | Role: admin/pimpinan/menteri |
| position | text | NULLABLE | Jabatan |
| department | text | NULLABLE | Departemen |
| kementerian | text | NULLABLE | Nama kementerian |
| created_at | timestamp | NOT NULL, DEFAULT now() | Waktu dibuat |
| updated_at | timestamp | NOT NULL, DEFAULT now() | Waktu update terakhir |

### Indexes

- `idx_users_email` on `email`
- `idx_users_username` on `username`
- `idx_users_role` on `role`

### Triggers

1. **on_auth_user_created**: Otomatis membuat profil di `public.users` saat user baru dibuat di `auth.users`
2. **set_updated_at**: Otomatis update `updated_at` saat data diubah

## Row Level Security (RLS)

Policies yang diterapkan:

1. **Users can view own profile**: User bisa melihat profil sendiri
2. **Admins can view all profiles**: Admin bisa melihat semua profil
3. **Admins can insert users**: Hanya admin yang bisa membuat user baru
4. **Users can update own profile**: User bisa update profil sendiri, admin bisa update semua
5. **Admins can delete users**: Hanya admin yang bisa menghapus user

## Cara Penggunaan

### 1. Setup Database
Ikuti panduan di `SETUP_DATABASE.md`

### 2. Buat Admin Pertama
Buat admin user pertama melalui Supabase Dashboard

### 3. Login sebagai Admin
Login ke aplikasi menggunakan akun admin

### 4. Buat User Baru
1. Akses `/admin/users`
2. Klik tombol "Buat Akun Baru"
3. Isi form dengan lengkap
4. Klik "Buat Akun"

### 5. Kelola User
- Lihat daftar user di `/admin/users`
- Edit atau hapus user sesuai kebutuhan

## Security Best Practices

1. **Password Strength**: 
   - Minimal 6 karakter (bisa ditingkatkan)
   - Gunakan kombinasi huruf, angka, dan simbol

2. **Role Management**:
   - Batasi jumlah admin
   - Berikan role sesuai kebutuhan

3. **Email Verification**:
   - Aktifkan email confirmation di Supabase Dashboard
   - Settings > Authentication > Email Auth > Enable email confirmations

4. **Password Reset**:
   - Supabase menyediakan fitur reset password otomatis
   - User bisa reset via email

## Troubleshooting

### User tidak bisa dibuat
- Cek apakah migration sudah dijalankan
- Cek apakah email/username sudah digunakan
- Lihat console browser untuk error detail

### User tidak muncul di daftar
- Refresh halaman
- Cek apakah RLS policies sudah benar
- Cek apakah user login sebagai admin

### Error "Supabase not configured"
- Cek file `.env`
- Pastikan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` terisi

## Future Enhancements

Fitur yang bisa ditambahkan:

1. **Edit User**: Halaman untuk edit profil user
2. **Bulk Actions**: Hapus multiple user sekaligus
3. **Export**: Export daftar user ke CSV/Excel
4. **Search & Filter**: Cari user berdasarkan nama/email/role
5. **Pagination**: Untuk daftar user yang banyak
6. **User Activity Log**: Track aktivitas user
7. **Password Policy**: Aturan password yang lebih ketat
8. **2FA**: Two-factor authentication
9. **Role Permissions**: Custom permissions per role
10. **User Status**: Active/Inactive/Suspended

## Support

Jika ada pertanyaan atau masalah:
1. Cek dokumentasi Supabase: https://supabase.com/docs
2. Lihat error di browser console
3. Cek logs di Supabase Dashboard
