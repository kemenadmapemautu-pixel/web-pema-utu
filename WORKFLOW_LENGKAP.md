# 🔄 Workflow Lengkap - Sistem Kementerian PEMA UTU

## 📋 Overview

**Workflow yang benar:**
1. ✅ **Admin** login dengan akun yang sudah ada
2. ✅ **Admin** membuat akun menteri via dashboard
3. ✅ **Menteri** login dengan akun yang dibuat admin
4. ✅ **Menteri** kelola konten dan tim kementerian mereka

**TIDAK ADA hardcoded accounts!** Semua dikelola via dashboard.

---

## 👤 Step 1: Admin Login

### **Login dengan akun admin yang sudah ada**

```
URL: /login
Username: [akun admin yang sudah ada]
Password: [password admin yang sudah ada]
```

**Jika belum ada akun admin**, buat via console (HANYA SEKALI):

```javascript
// HANYA untuk setup awal jika belum ada admin
const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
if (accounts.length === 0) {
    accounts.push({
        username: "admin",
        password: "admin123", // Ganti dengan password yang aman
        name: "Administrator",
        role: "admin",
        id: "admin-" + Date.now()
    });
    localStorage.setItem('accounts', JSON.stringify(accounts));
    console.log('✅ Akun admin berhasil dibuat!');
}
```

---

## 👥 Step 2: Admin Membuat Akun Menteri

### **Via Dashboard Admin:**

1. **Login sebagai admin**
2. **Klik** "Kelola Pengurus & Akun"
3. **Klik** "Tambah Pengurus"
4. **Isi form:**
   - Nama: Nama menteri
   - Jabatan: Menteri [Nama Kementerian]
   - Departemen: **PILIH DARI DROPDOWN** (PENTING!)
   - Tipe: **Menteri**
   - Email, Telepon (optional)
   - **Centang** "Buat Akun Login"
   - Username: contoh `menteri.advokasi`
   - Password: password untuk menteri
5. **Klik "Simpan"**

### **Dropdown Departemen Harus Berisi:**

```
- Kementerian Advokasi dan Hak Mahasiswa
- Kementerian Komunikasi dan Informasi
- Kementerian Pemberdayaan dan Perlindungan Perempuan
- Kementerian Agama
- Kementerian Hubungan Internal dan Eksternal
- Kementerian Pengembangan SDM
- Kementerian Pemuda dan Olahraga
- Kementerian Pariwisata dan Seni Budaya
- Kementerian Pendidikan dan Akademik
- Kementerian Kesehatan Masyarakat
- Kementerian Sosial dan Lingkungan Hidup
- Kementerian Ekonomi Kreatif
```

**⚠️ PENTING:** Nama departemen harus **EXACT MATCH** dengan nama kementerian!

---

## 🎯 Step 3: Menteri Login

### **Login dengan akun yang dibuat admin:**

```
URL: /login
Username: [username yang dibuat admin]
Password: [password yang dibuat admin]
```

### **Dashboard Menteri:**

Setelah login, menteri akan melihat **3 menu**:

1. **Kelola Konten Kementerian** (Indigo)
   - Edit deskripsi, visi, misi
   - Tambah/edit program kerja

2. **Kelola Tim Kementerian** (Purple)
   - Tambah wakil menteri
   - Tambah staff

3. **Data Saya** (Orange)
   - Edit profil pribadi
   - Upload foto
   - Edit bio, kontak, media sosial

---

## 📝 Step 4: Menteri Lengkapi Profil

### **A. Edit Profil Pribadi**

1. **Klik** "Data Saya"
2. **Upload foto** profil
3. **Isi bio/deskripsi**
4. **Isi kontak** (email, telepon)
5. **Isi media sosial** (Instagram, LinkedIn, Twitter)
6. **Klik "Simpan Profil"**

**Hasil:** Profil muncul di halaman publik kementerian ✅

---

### **B. Edit Konten Kementerian**

1. **Klik** "Kelola Konten Kementerian"
2. **Edit deskripsi** kementerian (untuk hero banner)
3. **Edit visi**
4. **Edit misi:**
   - Klik "Tambah Misi" untuk menambah
   - Edit teks setiap misi
   - Klik trash icon untuk hapus
5. **Edit program kerja:**
   - Klik "Tambah Program" untuk menambah
   - Edit teks setiap program
   - Klik trash icon untuk hapus
6. **Klik "Simpan Semua Perubahan"**
7. **Klik "Preview Halaman"** untuk melihat hasil

**Hasil:** Konten custom muncul di halaman publik ✅

---

### **C. Kelola Tim Kementerian**

#### **Tambah Wakil Menteri:**

1. **Klik** "Kelola Tim Kementerian"
2. **Di section "Wakil Menteri"**, klik "Tambah Wakil Menteri"
3. **Pilih** "Wakil Menteri" sebagai posisi
4. **Upload foto**
5. **Isi data:**
   - Nama lengkap
   - Email dan telepon
   - Deskripsi singkat
   - Media sosial
6. **Klik "Simpan"**

#### **Tambah Staff:**

1. **Di section "Staff"**, klik "Tambah Staff"
2. **Pilih** "Staff" sebagai posisi
3. **Upload foto**
4. **Isi data:**
   - Nama lengkap
   - Media sosial
5. **Klik "Simpan"**

**Hasil:** Tim muncul di halaman publik kementerian ✅

---

## 🌐 Step 5: Verifikasi di Halaman Publik

1. **Buka** `/ministry/[nama-kementerian]`
   - Contoh: `/ministry/advokasi-hak-mahasiswa`
2. **Refresh** halaman (Ctrl+Shift+R)
3. **Cek apakah muncul:**
   - ✅ Konten custom (visi, misi, program)
   - ✅ Profil menteri (foto, bio, kontak)
   - ✅ Wakil menteri
   - ✅ Staff
   - ✅ Link media sosial berfungsi

---

## 🧪 Testing dengan Data Dummy

### **Untuk testing, gunakan `populate-test-data.html`:**

**File ini HANYA populate:**
- ✅ Data profil menteri (pengurusList)
- ✅ Data tim kementerian (ministryTeams)
- ❌ **TIDAK** membuat akun login

**Workflow testing:**

1. **Admin buat akun menteri** via dashboard (manual)
2. **Jalankan** `populate-test-data.html` → klik "Setup Data Minimal"
3. **Link akun dengan profil:**
   - Pastikan `username` di akun = `username` di pengurusList
   - Pastikan `id` di akun = `id` di pengurusList
   - Pastikan `department` di akun = `departemen` di pengurusList
4. **Login sebagai menteri**
5. **Test semua fitur**

---

## 🔑 Data Structure Integration

### **accounts (dibuat oleh admin):**
```json
{
  "username": "menteri.advokasi",
  "password": "hashed_password",
  "name": "Budi Santoso",
  "role": "menteri",
  "id": "menteri-001",
  "department": "Kementerian Advokasi dan Hak Mahasiswa"
}
```

### **pengurusList (dibuat oleh admin + edit oleh menteri):**
```json
{
  "id": "menteri-001",
  "nama": "Budi Santoso",
  "jabatan": "Menteri Advokasi dan Hak Mahasiswa",
  "departemen": "Kementerian Advokasi dan Hak Mahasiswa",
  "username": "menteri.advokasi",
  "foto": "url",
  "deskripsi": "bio",
  "email": "email",
  "telepon": "phone",
  "tipe": "menteri",
  "hasAccount": true,
  "socialMedia": {...}
}
```

### **ministryTeams (dibuat oleh menteri):**
```json
{
  "ministryName": "Kementerian Advokasi dan Hak Mahasiswa",
  "ministerId": "menteri-001",
  "members": [...]
}
```

### **ministryContents (dibuat oleh menteri):**
```json
{
  "ministryId": "menteri-001",
  "ministryName": "Kementerian Advokasi dan Hak Mahasiswa",
  "description": "...",
  "vision": "...",
  "mission": [...],
  "programs": [...]
}
```

**Key Matching Fields:**
- `accounts.id` = `pengurusList.id` = `ministryTeams.ministerId` = `ministryContents.ministryId`
- `accounts.username` = `pengurusList.username`
- `accounts.department` = `pengurusList.departemen` = `ministryTeams.ministryName` = `ministryContents.ministryName`

---

## ⚠️ PENTING: Nama Departemen

**Nama departemen HARUS EXACT MATCH:**

| Field | Source | Must Match |
|-------|--------|-----------|
| `accounts.department` | Admin input | ✅ |
| `pengurusList.departemen` | Admin input | ✅ |
| `ministryTeams.ministryName` | Auto from user | ✅ |
| `ministryContents.ministryName` | Auto from user | ✅ |
| `MinistryPage props.ministryName` | Hardcoded | ✅ |

**Contoh BENAR:**
```
"Kementerian Advokasi dan Hak Mahasiswa"
```

**Contoh SALAH:**
```
"kementerian advokasi dan hak mahasiswa"  ❌ (lowercase)
"Kementerian Advokasi"  ❌ (tidak lengkap)
"Kementerian Advokasi & Hak Mahasiswa"  ❌ (& bukan "dan")
```

---

## 📊 Complete Flow Diagram

```
ADMIN
  ├─ Login dengan akun existing
  ├─ Buka "Kelola Pengurus & Akun"
  ├─ Tambah Pengurus (Menteri)
  │   ├─ Set role: "menteri"
  │   ├─ Set departemen: [pilih dari dropdown]
  │   └─ Centang "Buat Akun Login"
  └─ Save
      └─> Buat data di:
          ├─ accounts (untuk login)
          └─ pengurusList (profil dasar)

MENTERI
  ├─ Login dengan akun yang dibuat admin
  ├─ Dashboard Menteri (3 menu)
  ├─ Edit Profil (Data Saya)
  │   └─> Update pengurusList
  ├─ Edit Konten (Kelola Konten)
  │   └─> Create/Update ministryContents
  └─ Edit Tim (Kelola Tim)
      └─> Create/Update ministryTeams

PUBLIC PAGE
  ├─ Load dari pengurusList (profil menteri)
  ├─ Load dari ministryContents (konten custom)
  └─ Load dari ministryTeams (wakil & staff)
  └─> DISPLAY ✅
```

---

## ✅ Checklist Lengkap

### **Admin:**
- [ ] Login dengan akun existing
- [ ] Buka "Kelola Pengurus & Akun"
- [ ] Tambah menteri untuk setiap kementerian
- [ ] Pastikan departemen EXACT MATCH
- [ ] Centang "Buat Akun Login"
- [ ] Berikan username dan password ke menteri

### **Menteri:**
- [ ] Login dengan akun yang diberikan admin
- [ ] Dashboard muncul dengan 3 menu
- [ ] Lengkapi profil di "Data Saya"
- [ ] Edit konten di "Kelola Konten"
- [ ] Tambah tim di "Kelola Tim"
- [ ] Verifikasi di halaman publik

### **Testing:**
- [ ] Profil menteri muncul di halaman publik
- [ ] Konten custom muncul
- [ ] Tim (wakil & staff) muncul
- [ ] Link media sosial berfungsi
- [ ] Edit profil langsung update di public page

---

## 🔍 Debug Checklist

Jika ada masalah, cek:

```javascript
// 1. Cek akun yang login
console.log('Logged in:', JSON.parse(localStorage.getItem('currentUser')));

// 2. Cek profil di pengurusList
const pengurus = JSON.parse(localStorage.getItem('pengurusList'));
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log('Profile:', pengurus.find(p => p.id === currentUser.id));

// 3. Cek matching names
console.log('Account dept:', currentUser.department);
console.log('Profile dept:', pengurus.find(p => p.id === currentUser.id).departemen);
// Harus EXACT SAMA!
```

---

## 🎯 Summary

**Workflow benar:**
1. Admin login → Buat akun menteri via dashboard
2. Menteri login → Lengkapi profil, konten, tim
3. Public page → Load semua data → Display

**TIDAK hardcoded accounts!**
**Semua via dashboard!**

**File `populate-test-data.html` HANYA untuk testing data, BUKAN untuk buat akun!**

---

**Sistem sekarang mengikuti best practice production!** ✅
