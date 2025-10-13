# 🎯 Panduan Lengkap Kontrol Penuh Menteri atas Halaman Kementerian

## ✨ Fitur Baru: Kontrol Penuh Kementerian

Sekarang **setiap menteri** dapat **mengatur halaman kementerian mereka sendiri** secara penuh, termasuk:

### 1. **Kelola Konten Kementerian** 📝
- ✅ Edit Deskripsi Kementerian
- ✅ Edit Visi
- ✅ Edit Misi (tambah/hapus/edit)
- ✅ Edit Program Kerja (tambah/hapus/edit)

### 2. **Kelola Tim Kementerian** 👥
- ✅ Tambah/Edit/Hapus Wakil Menteri
- ✅ Tambah/Edit/Hapus Staff
- ✅ Upload foto profil tim
- ✅ Kelola kontak dan media sosial tim

---

## 🚀 Cara Menggunakan

### A. **Kelola Konten Kementerian**

#### 1. Login sebagai Menteri
```
URL: /login
Username: (akun menteri Anda)
Password: (password Anda)
```

#### 2. Akses Menu "Kelola Konten Kementerian"
Di dashboard, Anda akan melihat 3 menu:
- **Kelola Konten Kementerian** (warna indigo) ← Klik ini
- **Kelola Tim Kementerian** (warna ungu)
- **Data Saya** (warna orange)

#### 3. Edit Deskripsi
- **Field:** "Deskripsi Kementerian"
- **Tampil di:** Hero section (banner utama) halaman kementerian
- **Tips:** Buat deskripsi singkat dan menarik (1-2 kalimat)

**Contoh:**
```
"Memperjuangkan hak-hak mahasiswa dan memberikan advokasi untuk kepentingan mahasiswa UTU"
```

#### 4. Edit Visi
- **Field:** "Visi"
- **Tampil di:** Card Visi & Misi
- **Tips:** Tulis visi yang jelas dan inspiratif

**Contoh:**
```
"Menjadi wadah advokasi yang kuat dalam memperjuangkan hak dan kepentingan seluruh mahasiswa UTU dengan prinsip keadilan dan transparansi"
```

#### 5. Edit Misi
- **Action:** Tambah/Edit/Hapus misi
- **Cara:**
  - Klik **"Tambah Misi"** untuk menambah misi baru
  - Edit text di setiap field misi
  - Klik tombol **trash (🗑️)** untuk hapus misi
- **Tampil di:** Card Visi & Misi sebagai numbered list

**Contoh Misi:**
```
1. Melakukan advokasi terhadap kebijakan kampus yang berkaitan dengan mahasiswa
2. Memberikan pendampingan dan konsultasi hukum bagi mahasiswa
3. Menjembatani komunikasi antara mahasiswa dengan pihak kampus
4. Melakukan sosialisasi hak dan kewajiban mahasiswa
5. Mengawasi implementasi kebijakan kampus yang menyangkut mahasiswa
```

#### 6. Edit Program Kerja
- **Action:** Tambah/Edit/Hapus program
- **Cara:**
  - Klik **"Tambah Program"** untuk menambah program baru
  - Edit text di setiap field program
  - Klik tombol **trash (🗑️)** untuk hapus program
- **Tampil di:** Section "Program Kerja" sebagai grid cards

**Contoh Program:**
```
1. Legal Clinic - Layanan konsultasi hukum gratis
2. Workshop Hak dan Kewajiban Mahasiswa
3. Kampanye Anti Kekerasan Kampus
4. Pendampingan Kasus Mahasiswa
5. Forum Diskusi Kebijakan Kampus
6. Publikasi Panduan Hak Mahasiswa
```

#### 7. Simpan Perubahan
- Klik tombol **"Simpan Semua Perubahan"** di bagian bawah
- Toast notification akan muncul: "Berhasil Disimpan! ✅"
- Perubahan **langsung tampil** di halaman publik

#### 8. Preview Halaman
- Klik tombol **"Preview Halaman"** di header
- Akan membuka halaman publik kementerian Anda di tab baru
- Lihat hasil perubahan yang sudah disimpan

---

### B. **Kelola Tim Kementerian**

#### 1. Tambah Wakil Menteri
1. Di dashboard, klik **"Kelola Tim Kementerian"**
2. Di section "Wakil Menteri", klik **"Tambah Wakil Menteri"**
3. Pilih **"Wakil Menteri"** sebagai posisi
4. **Upload foto** (max 5MB, JPG/PNG)
5. Isi data:
   - Nama lengkap (required)
   - Email
   - Nomor telepon
   - Deskripsi singkat
   - Media sosial (Instagram, LinkedIn, Twitter)
6. Klik **"Simpan"**

**Data yang tampil di halaman publik:**
- Foto dalam card besar
- Nama dan posisi
- Deskripsi
- Kontak (email, telepon)
- Link media sosial aktif

#### 2. Tambah Staff
1. Di section "Staff Kementerian", klik **"Tambah Staff"**
2. Pilih **"Staff"** sebagai posisi
3. Isi data sama seperti wakil menteri
4. Klik **"Simpan"**

**Data yang tampil di halaman publik:**
- Foto dalam card kecil
- Nama dan posisi
- Link media sosial

#### 3. Edit Anggota Tim
1. Klik icon **pensil (✏️)** di card anggota
2. Edit data yang diinginkan
3. Klik **"Simpan"**

#### 4. Hapus Anggota Tim
1. Klik icon **trash (🗑️)** di card anggota
2. Konfirmasi penghapusan
3. Data terhapus dari database

---

## 📊 Struktur Data

### 1. Ministry Content (Konten Kementerian)
**LocalStorage Key:** `ministryContents`

```json
{
  "ministryId": "user-id-123",
  "ministryName": "Kementerian Advokasi dan Hak Mahasiswa",
  "description": "Deskripsi kementerian...",
  "vision": "Visi kementerian...",
  "mission": [
    "Misi 1",
    "Misi 2",
    "Misi 3"
  ],
  "programs": [
    "Program 1",
    "Program 2",
    "Program 3"
  ]
}
```

### 2. Ministry Team (Tim Kementerian)
**LocalStorage Key:** `ministryTeams`

```json
{
  "ministryName": "Kementerian Advokasi dan Hak Mahasiswa",
  "ministerId": "user-id-123",
  "members": [
    {
      "id": "member-1",
      "name": "Ahmad Fadhil",
      "role": "wakil",
      "email": "ahmad@example.com",
      "phone": "+62812345678",
      "photo": "data:image/jpeg;base64,...",
      "description": "Deskripsi...",
      "socialMedia": {
        "instagram": "@ahmadfadhil",
        "linkedin": "linkedin.com/in/ahmadfadhil",
        "twitter": "@ahmadfadhil"
      }
    }
  ]
}
```

---

## 🎨 Tampilan di Halaman Publik

### Layout Halaman Kementerian (dari atas ke bawah):

1. **Hero Section** (Banner utama)
   - Nama Kementerian
   - Deskripsi (dari "Kelola Konten")
   - Icon kementerian

2. **Visi & Misi** (2 cards side by side)
   - Card Visi (dari "Kelola Konten")
   - Card Misi (dari "Kelola Konten")

3. **Profil Menteri** (1 card besar)
   - Foto menteri (dari profil pengurus)
   - Nama dan jabatan
   - Deskripsi/Bio
   - Kontak dan media sosial

4. **Wakil Menteri** (Grid 3 kolom)
   - Cards wakil menteri (dari "Kelola Tim")
   - Foto, nama, posisi, deskripsi
   - Kontak dan media sosial

5. **Staff Kementerian** (Grid 4 kolom)
   - Cards staff (dari "Kelola Tim")
   - Foto, nama, posisi
   - Media sosial

6. **Program Kerja** (Grid 2 kolom)
   - Cards program (dari "Kelola Konten")
   - Numbered dengan background gradient

---

## 🔄 Workflow Lengkap

### Skenario: Setup Halaman Kementerian Baru

#### Step 1: Setup Konten
1. Login sebagai menteri
2. Buka **"Kelola Konten Kementerian"**
3. Edit deskripsi, visi, misi, dan program kerja
4. Simpan perubahan
5. Preview halaman untuk cek hasil

#### Step 2: Setup Tim
1. Buka **"Kelola Tim Kementerian"**
2. Tambah 1-2 Wakil Menteri
3. Tambah 3-5 Staff
4. Upload foto semua anggota tim
5. Isi kontak dan media sosial

#### Step 3: Verifikasi
1. Logout dan akses halaman publik
2. URL: `/ministry/[nama-kementerian]`
3. Pastikan semua konten tampil dengan benar
4. Test link media sosial

---

## 💡 Tips & Best Practices

### Konten
- ✅ **Deskripsi:** Singkat dan jelas (max 2 kalimat)
- ✅ **Visi:** Inspiratif dan forward-looking
- ✅ **Misi:** 3-7 poin, spesifik dan actionable
- ✅ **Program:** 5-10 program, gunakan nama yang menarik

### Tim
- ✅ **Foto:** Gunakan foto formal/semi-formal, resolusi bagus
- ✅ **Deskripsi:** Highlight expertise dan pengalaman
- ✅ **Media Sosial:** Isi minimal Instagram (paling engaging)

### Update Berkala
- 📅 Review konten setiap 3 bulan
- 📅 Update program kerja sesuai progress
- 📅 Update tim jika ada perubahan struktur

---

## 🔒 Access Control

### Siapa yang Bisa Edit?
- ✅ **Menteri:** Full control atas kementerian sendiri
- ❌ **Admin:** Tidak bisa edit konten/tim kementerian
- ❌ **Menteri Lain:** Tidak bisa edit kementerian lain
- ✅ **Publik:** Read-only access ke halaman kementerian

### Keamanan
- Data tersimpan per `ministryId` (user ID menteri)
- Relasi berdasarkan `ministryName` (nama department user)
- Tidak bisa akses data kementerian lain

---

## 📱 Dashboard Menu untuk Menteri

Setelah login, menteri akan melihat 3 menu utama:

### 1. **Kelola Konten Kementerian** 📝
- Color: Indigo
- Icon: FileText
- URL: `/admin/ministry-content`
- Fungsi: Edit visi, misi, deskripsi, program

### 2. **Kelola Tim Kementerian** 👥
- Color: Purple
- Icon: Users
- URL: `/admin/ministry-team`
- Fungsi: Kelola wakil menteri & staff

### 3. **Data Saya** ⚙️
- Color: Orange
- Icon: Settings
- URL: `/admin/profile`
- Fungsi: Edit profil pribadi menteri

---

## 🎯 Use Cases

### Use Case 1: Menteri Baru Mulai Dari Nol
1. Login pertama kali
2. Lengkapi profil pribadi di "Data Saya"
3. Setup konten kementerian (visi, misi, program)
4. Rekrut dan tambahkan wakil menteri
5. Rekrut dan tambahkan staff
6. Share URL kementerian ke mahasiswa

### Use Case 2: Update Program Kerja
1. Login ke dashboard
2. Buka "Kelola Konten Kementerian"
3. Scroll ke section "Program Kerja"
4. Edit program yang sudah ada
5. Tambah program baru jika ada
6. Hapus program yang sudah selesai
7. Simpan perubahan

### Use Case 3: Pergantian Wakil Menteri
1. Login ke dashboard
2. Buka "Kelola Tim Kementerian"
3. Hapus wakil menteri lama
4. Tambah wakil menteri baru
5. Upload foto dan isi data lengkap
6. Simpan

---

## 🆘 Troubleshooting

### Q: Perubahan tidak muncul di halaman publik?
**A:** 
- Pastikan sudah klik "Simpan Semua Perubahan"
- Refresh halaman publik (Ctrl+F5)
- Clear browser cache
- Check console untuk error

### Q: Foto tidak bisa diupload?
**A:**
- Pastikan ukuran < 5MB
- Format: JPG, PNG, GIF
- Compress foto jika terlalu besar

### Q: Menu "Kelola Konten" tidak muncul?
**A:**
- Pastikan login dengan role "menteri"
- Check `currentUser.role` di console browser
- Logout dan login ulang

### Q: Data hilang setelah refresh?
**A:**
- Check localStorage tidak penuh
- Jangan gunakan mode incognito
- Backup data secara berkala

---

## 📊 Checklist Setup Kementerian

### Fase 1: Konten Dasar
- [ ] Deskripsi kementerian sudah diisi
- [ ] Visi sudah diisi dan inspiring
- [ ] Misi sudah ada minimal 3 poin
- [ ] Program kerja sudah ada minimal 5 program

### Fase 2: Tim
- [ ] Profil menteri lengkap (foto, bio, kontak)
- [ ] Minimal 1 wakil menteri ditambahkan
- [ ] Minimal 3 staff ditambahkan
- [ ] Semua foto sudah diupload
- [ ] Kontak dan media sosial sudah diisi

### Fase 3: Verifikasi
- [ ] Preview halaman publik sudah dicek
- [ ] Semua konten tampil dengan benar
- [ ] Link media sosial berfungsi
- [ ] Layout responsive di mobile

### Fase 4: Publikasi
- [ ] URL kementerian sudah dishare
- [ ] Announce di media sosial
- [ ] Inform mahasiswa tentang halaman baru

---

## 🎉 Kesimpulan

Dengan sistem ini, **setiap menteri memiliki kontrol penuh** atas:
- ✅ Konten halaman kementerian
- ✅ Tim kementerian (wakil & staff)
- ✅ Program kerja dan aktivitas

**Tidak perlu** minta admin untuk:
- ❌ Edit visi/misi
- ❌ Tambah program kerja
- ❌ Tambah anggota tim
- ❌ Update konten kementerian

**Semuanya bisa dilakukan sendiri dengan mudah!** 🚀

---

## 📞 Support

Untuk bantuan lebih lanjut:
- 📧 Email: admin@pema-utu.ac.id
- 💬 WhatsApp: +62xxx-xxxx-xxxx
- 📚 Dokumentasi: [MINISTRY_SYSTEM_GUIDE.md](MINISTRY_SYSTEM_GUIDE.md)
