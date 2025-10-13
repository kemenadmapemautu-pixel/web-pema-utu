# 📚 Data Fakultas dan Program Studi UTU (Resmi)

## 🎓 Universitas Teuku Umar

Data lengkap 6 Fakultas dan 23 Program Studi yang tersedia di sistem.

---

## 📋 Daftar Lengkap

### **1. Fakultas Pertanian** (4 Program Studi)

1. Program Studi Agribisnis
2. Program Studi Agroteknologi
3. Program Studi Teknologi Hasil Pertanian
4. Program Studi Peternakan

---

### **2. Fakultas Ekonomi & Bisnis** (4 Program Studi)

1. Program Studi Ekonomi Pembangunan
2. Program Studi Manajemen
3. Program Studi Akuntansi
4. Program Studi Bisnis Digital

---

### **3. Fakultas Ilmu Kesehatan** (3 Program Studi)

1. Program Studi Kesehatan Masyarakat
2. Program Studi Gizi
3. Program Studi Keselamatan dan Kesehatan Kerja

---

### **4. Fakultas Teknik** (4 Program Studi)

1. Program Studi Teknik Sipil
2. Program Studi Teknik Mesin
3. Program Studi Teknik Industri
4. Program Studi Teknologi Informasi

---

### **5. Fakultas Perikanan & Ilmu Kelautan** (4 Program Studi)

1. Program Studi Perikanan
2. Program Studi Akuakultur (Budidaya Perairan)
3. Program Studi Manajemen Sumber Daya Akuatik (Manajemen Sumber Daya Perairan)
4. Program Studi Ilmu Kelautan

---

### **6. Fakultas Ilmu Sosial & Ilmu Politik** (4 Program Studi)

1. Program Studi Ilmu Administrasi Negara
2. Program Studi Ilmu Komunikasi
3. Program Studi Sosiologi
4. Program Studi Ilmu Hukum

---

## 📊 Statistik

**Total:**
- **6 Fakultas**
- **23 Program Studi**

**Breakdown:**
- Fakultas Pertanian: 4 prodi
- Fakultas Ekonomi & Bisnis: 4 prodi
- Fakultas Ilmu Kesehatan: 3 prodi
- Fakultas Teknik: 4 prodi
- Fakultas Perikanan & Ilmu Kelautan: 4 prodi
- Fakultas Ilmu Sosial & Ilmu Politik: 4 prodi

---

## 💻 Implementasi di Sistem

Data ini digunakan untuk **dropdown cascade** di form Kelola Pengurus & Akun:

1. Admin pilih **Fakultas** dari dropdown (6 pilihan)
2. Dropdown **Program Studi** otomatis update sesuai fakultas
3. Admin pilih **Program Studi** yang sesuai

### **Contoh Flow:**

```
Admin pilih: "Fakultas Teknik"
    ↓
Dropdown Prodi tampil 4 opsi:
├─ Program Studi Teknik Sipil
├─ Program Studi Teknik Mesin
├─ Program Studi Teknik Industri
└─ Program Studi Teknologi Informasi
    ↓
Admin pilih: "Program Studi Teknologi Informasi"
    ↓
✅ Data tersimpan dengan benar
```

---

## 🔄 Update Data

Jika ada perubahan fakultas atau program studi:

1. Edit file: `src/pages/admin/PengurusManagement.tsx`
2. Update konstanta: `FAKULTAS_PRODI_MAP`
3. Tambah/edit/hapus fakultas atau prodi
4. Save → Data otomatis update di dropdown

### **Format Data:**

```typescript
const FAKULTAS_PRODI_MAP: Record<string, string[]> = {
  "Nama Fakultas": [
    "Program Studi 1",
    "Program Studi 2",
    "Program Studi 3"
  ],
  // ... fakultas lainnya
};
```

---

## ✅ Validasi Data

**Cek konsistensi:**
- ✅ Semua nama fakultas unique
- ✅ Semua nama prodi unique per fakultas
- ✅ Format nama konsisten ("Program Studi [Nama]")
- ✅ Total 23 prodi tersebar di 6 fakultas

**Quality Check:**
- ✅ Tidak ada typo
- ✅ Tidak ada duplikasi
- ✅ Nama sesuai resmi UTU
- ✅ Cascade dropdown berfungsi dengan baik

---

## 📝 Catatan Khusus

### **Fakultas Perikanan & Ilmu Kelautan:**

Beberapa prodi punya nama alternatif (dalam kurung):

1. **Program Studi Akuakultur (Budidaya Perairan)**
   - Nama resmi: Akuakultur
   - Alias: Budidaya Perairan

2. **Program Studi Manajemen Sumber Daya Akuatik (Manajemen Sumber Daya Perairan)**
   - Nama resmi: Manajemen Sumber Daya Akuatik
   - Alias: Manajemen Sumber Daya Perairan

Kedua format ditampilkan untuk memudahkan identifikasi.

---

## 🎯 Penggunaan di Sistem

### **1. Form Tambah Pengurus (Pimpinan/Menteri)**

Saat admin tambah pengurus:
- Field **Fakultas**: Dropdown dengan 6 pilihan
- Field **Program Studi**: Dropdown cascade (berubah sesuai fakultas)

### **2. Data Profil Pengurus**

Data disimpan di `localStorage.pengurusList`:
```json
{
  "fakultas": "Fakultas Teknik",
  "prodi": "Program Studi Teknologi Informasi"
}
```

### **3. Tampilan di Website**

Data fakultas dan prodi ditampilkan di:
- Halaman profil pimpinan
- Halaman profil menteri
- Halaman cabinet (struktur organisasi)

---

## 🔍 Search & Filter

Data ini bisa digunakan untuk:
- **Filter** pengurus berdasarkan fakultas
- **Search** pengurus berdasarkan prodi
- **Statistik** sebaran pengurus per fakultas
- **Report** representasi mahasiswa per fakultas

---

## ✅ Data Verified

Data ini sudah **diverifikasi** dan sesuai dengan struktur resmi Universitas Teuku Umar.

**Last Updated:** 2025-10-10  
**Source:** Data Resmi UTU  
**Status:** ✅ Verified & Implemented

---

**Data siap digunakan di sistem PEMA UTU!** 🎓
