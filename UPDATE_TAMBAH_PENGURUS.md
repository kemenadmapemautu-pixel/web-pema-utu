# ✅ Update: Tambah Pengurus & Buat Akun Sekaligus

## 🎯 Perubahan

**SEBELUM:**
- ❌ Tambah pengurus terpisah dari buat akun
- ❌ Ada checkbox "Buat Akun Login"
- ❌ Proses terpisah, bisa lupa

**SEKARANG:**
- ✅ Tambah pengurus langsung include buat akun
- ✅ Otomatis generate username & password
- ✅ Satu proses, tidak bisa terlewat
- ✅ Admin bisa edit username & password sebelum save

---

## 📝 Cara Kerja Baru

### **1. Admin Klik "Tambah Pengurus"**

Form akan muncul dengan field:
- Nama Lengkap
- Jabatan
- Email & Telepon
- Fakultas & Prodi
- **Departemen** (untuk menteri - HARUS EXACT!)
- **Username** (auto-generate setelah isi nama)
- **Password** (auto-generate, bisa diedit)

### **2. Admin Isi Form**

**Saat admin mengetik nama:**
```
Nama: Budi Santoso
↓ (otomatis)
Username: men_budisantoso_123
Password: abc12345 (random)
```

**Admin bisa edit username & password sebelum save!**

### **3. Admin Klik "Tambah Menteri"**

**Yang terjadi:**
1. ✅ Data pengurus disimpan ke `pengurusList`
2. ✅ Akun login disimpan ke `accounts`
3. ✅ Toast notification muncul dengan kredensial

**Toast menampilkan:**
```
✅ Pengurus & Akun Berhasil Dibuat!

Budi Santoso telah ditambahkan sebagai menteri

Kredensial Login:
Username: men_budisantoso_123
Password: abc12345

⚠️ Catat kredensial ini dan berikan ke Budi Santoso
```

**Toast muncul selama 15 detik** agar admin bisa copy!

---

## 🔑 Fitur Auto-Generate

### **Username Generation:**
```javascript
Pola: [prefix]_[nama]_[timestamp]

Menteri: men_budisantoso_123
Pimpinan: pim_sitinurhaliza_456
```

### **Password Generation:**
```javascript
Random 8 karakter: abc12345
```

**Admin bisa edit keduanya sebelum save!**

---

## 📋 Field di Form

### **Semua Pengurus:**
- Nama Lengkap *
- Jabatan *
- Email *
- Telepon *
- Fakultas * (untuk pimpinan & menteri)
- Prodi * (untuk pimpinan & menteri)

### **Khusus Menteri:**
- **Departemen *** (HARUS EXACT dengan nama kementerian!)
  - Contoh: `Kementerian Advokasi dan Hak Mahasiswa`
  - Warning: ⚠️ Harus EXACT dengan nama kementerian di sistem!

### **Akun Login (Otomatis):**
- **Username *** (auto-generate, bisa diedit)
- **Password *** (auto-generate, bisa diedit, ada show/hide)

### **Optional:**
- Foto Profil
- Deskripsi/Visi Misi
- Riwayat Organisasi
- Periode

---

## 💾 Data Yang Tersimpan

### **1. pengurusList (localStorage)**
```json
{
  "id": "1234567890",
  "nama": "Budi Santoso",
  "jabatan": "Menteri Advokasi dan Hak Mahasiswa",
  "departemen": "Kementerian Advokasi dan Hak Mahasiswa",
  "email": "budi@student.utu.ac.id",
  "telepon": "+62812345678",
  "tipe": "menteri",
  "username": "men_budisantoso_123",
  "password": "abc12345",
  "hasAccount": true,
  "profileCompleted": false
}
```

### **2. accounts (localStorage) - Untuk Login**
```json
{
  "id": "1234567890",
  "username": "men_budisantoso_123",
  "password": "abc12345",
  "role": "menteri",
  "name": "Budi Santoso",
  "position": "Menteri Advokasi dan Hak Mahasiswa",
  "department": "Kementerian Advokasi dan Hak Mahasiswa"
}
```

**Kedua data ini auto-sync!**

---

## ✅ Keuntungan

### **Untuk Admin:**
- ✅ **Lebih cepat** - Satu proses, tidak dua kali
- ✅ **Tidak lupa** - Akun otomatis dibuat
- ✅ **Lebih aman** - Username & password langsung ter-generate
- ✅ **Fleksibel** - Bisa edit sebelum save

### **Untuk Sistem:**
- ✅ **Data konsisten** - pengurusList dan accounts selalu sync
- ✅ **Tidak ada orphan data** - Setiap pengurus pasti punya akun
- ✅ **Lebih mudah maintain** - Satu source of truth

---

## 🔄 Workflow Lengkap

```
ADMIN
  ↓
Klik "Tambah Pengurus"
  ↓
Pilih Tipe: Menteri
  ↓
Isi Nama: "Budi Santoso"
  ↓ (otomatis)
Username: "men_budisantoso_123" (bisa diedit)
Password: "abc12345" (bisa diedit)
  ↓
Isi Departemen: "Kementerian Advokasi dan Hak Mahasiswa"
  ↓
Lengkapi field lain (email, telepon, dll)
  ↓
Klik "Tambah Menteri"
  ↓
✅ TERSIMPAN:
   - Data profil di pengurusList
   - Akun login di accounts
  ↓
Toast muncul dengan kredensial
  ↓
Admin copy dan berikan ke menteri
  ↓
Menteri login dengan kredensial tersebut
  ↓
✅ SELESAI!
```

---

## ⚠️ Penting!

### **1. Nama Departemen HARUS EXACT**

**BENAR:**
```
Kementerian Advokasi dan Hak Mahasiswa
```

**SALAH:**
```
kementerian advokasi dan hak mahasiswa  ❌ (lowercase)
Kementerian Advokasi  ❌ (tidak lengkap)
Kementerian Advokasi & Hak Mahasiswa  ❌ (& bukan "dan")
```

**Kenapa?** Nama ini digunakan untuk:
- Matching dengan `ministryTeams`
- Matching dengan `ministryContents`
- Tampil di halaman publik kementerian

### **2. Catat Kredensial**

Admin HARUS mencatat username & password yang ditampilkan di toast, lalu berikan ke menteri yang bersangkutan.

### **3. Password Bisa Diubah**

Menteri bisa mengubah password nanti via dashboard (jika fitur change password sudah ada).

---

## 🧪 Testing

### **Test 1: Tambah Menteri Baru**

1. Login sebagai admin
2. Klik "Kelola Pengurus & Akun"
3. Klik "Tambah Pengurus"
4. Pilih "Menteri"
5. Isi nama: "Test Menteri"
6. Lihat username auto-generate: "men_testmenteri_xxx"
7. Lihat password auto-generate: "xxxxxxxx"
8. Edit password jika mau
9. Isi departemen: "Kementerian Advokasi dan Hak Mahasiswa"
10. Lengkapi field lain
11. Klik "Tambah Menteri"
12. Toast muncul dengan kredensial
13. ✅ Cek localStorage `accounts` - akun harus ada

### **Test 2: Login dengan Akun Baru**

1. Logout dari admin
2. Login dengan username & password yang dibuat
3. ✅ Dashboard menteri harus muncul
4. ✅ 3 menu harus ada (Kelola Konten, Kelola Tim, Data Saya)

### **Test 3: Edit Pengurus**

1. Edit pengurus yang sudah ada
2. Username & password tetap ada di form
3. Bisa diedit jika perlu
4. Save
5. ✅ Perubahan tersimpan di accounts juga

---

## 📊 Checklist

- [x] Form tambah pengurus include username & password
- [x] Auto-generate username saat nama diisi
- [x] Auto-generate password random
- [x] Admin bisa edit username & password
- [x] Show/hide password button
- [x] Save ke pengurusList
- [x] Save ke accounts (sync)
- [x] Toast notification dengan kredensial
- [x] Toast duration 15 detik
- [x] Warning untuk departemen EXACT match
- [x] Documentation complete

---

## ✅ Status: COMPLETED

**Fitur "Tambah Pengurus & Buat Akun Sekaligus" sudah selesai!**

Sekarang admin bisa tambah pengurus menteri dan akun loginnya dibuat otomatis dalam satu proses! 🎉
