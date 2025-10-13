# 🏛️ PEMA UTU - Website Kabinet Samgrahita

**Persatuan Eksekutif Mahasiswa Universitas Teuku Umar**  
**Kabinet Samgrahita 2024-2025**

---

## 📖 Tentang Project

Website interaktif untuk PEMA UTU Kabinet Samgrahita yang menampilkan:

- ✅ Profil Pimpinan & Menteri
- ✅ Informasi 12 Kementerian
- ✅ Sistem Login & Dashboard Admin
- ✅ Manajemen Akun Pengurus
- ✅ Download Kartu Akun (NEW!)
- ✅ Galeri & Berita
- ✅ Responsive Design

---

## 🚀 Fitur Utama

### **1. Dashboard Admin**

- Kelola data pengurus (18 orang: 6 pimpinan + 12 menteri)
- Auto-populate data pengurus dengan 1 klik
- CRUD operations untuk pengurus
- Manajemen akun login
- **Download kartu akun** untuk distribusi kredensial

### **2. Sistem Autentikasi**

- Login untuk Admin & Pengurus
- Role-based access (admin, pimpinan, menteri)
- Protected routes
- Session management

### **3. Halaman Publik**

- Landing page dengan hero section
- Profil pimpinan (6 orang)
- 12 halaman kementerian dengan detail
- Galeri foto kegiatan
- Responsive & modern UI

### **4. Download Kartu Akun (FITUR BARU!) 📥**

- Generate kartu akun dalam format PNG
- Design branded PEMA UTU
- Berisi username & password
- Siap kirim via WhatsApp/Email
- Auto-download dengan nama file unik

---

## 🛠️ Tech Stack

- **Framework:** React + TypeScript
- **Build Tool:** Vite
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router
- **State Management:** React Context API
- **Storage:** localStorage

---

## 📦 Installation

### **Prerequisites:**

- Node.js 18+ 
- npm atau bun

### **Setup:**

```bash
# Clone repository
git clone <YOUR_GIT_URL>

# Navigate to project
cd web-pema-utu

# Install dependencies
npm install
# atau
bun install

# Run development server
npm run dev
# atau
bun run dev
```

**Development URL:** `http://localhost:5173`

---

## 🔑 Kredensial Login

⚠️ **SECURITY WARNING:** Credentials berikut **HANYA untuk development/testing**. **WAJIB diganti** untuk production!

### **Admin (Development Only):**

```
Username: adminpemautu
Password: Luckystrike26
```

🔒 **Production:** Ganti password via console atau database sebelum deploy!

### **Pengurus:**

Format username: `Pim_[nama]_[nomor]` atau `Men_[nama]_[nomor]`  
Password: 8 digit terakhir NIM

**Contoh:**
```
Username: Men_mkhavibadrian_01
Password: 06020069
```

⚠️ **Security:** Kirim credentials via **private channel** (WhatsApp personal, Email). Jangan post di public!

**Lihat:** 
- `LOGIN_GUIDE.md` untuk daftar lengkap
- `SECURITY_GUIDE.md` untuk best practices keamanan

---

## 📚 Dokumentasi

| File | Deskripsi |
|------|-----------|
| `CARA_POPULATE_DATA.md` | Cara populate data pengurus & akun |
| `LOGIN_GUIDE.md` | Panduan login & troubleshooting |
| `SECURITY_GUIDE.md` | **🔐 Security best practices & guidelines** |
| `ADMIN_CREDENTIALS_UPDATE.md` | Update kredensial admin |
| `FIX_ADMIN_LOGIN.md` | Fix masalah login admin |
| `DOWNLOAD_KARTU_AKUN_GUIDE.md` | **Panduan lengkap download kartu akun** |
| `QUICK_GUIDE_DOWNLOAD_KARTU.txt` | **Quick reference download kartu** |
| `DATA_PENGURUS_CORRECT.md` | Data pengurus yang benar |
| `MINISTRY_SYSTEM_GUIDE.md` | Sistem kementerian |

---

## 🎯 Quick Start Guide

### **Untuk Admin:**

1. **Login sebagai admin:**
   ```
   URL: http://localhost:5173/login
   Username: adminpemautu
   Password: Luckystrike26
   ```

2. **Populate data pengurus:**
   ```
   Dashboard → Kelola Pengurus & Akun
   Klik: "Populate Data Pengurus 2024-2025"
   ```

3. **Download kartu akun pengurus:**
   ```
   Lihat tabel pengurus
   Klik tombol hijau (Download) di kolom Action
   Kartu otomatis terdownload sebagai PNG
   ```

4. **Kirim kartu ke pengurus via WhatsApp/Email**

### **Untuk Pengurus:**

1. **Terima kartu akun dari admin**

2. **Login:**
   ```
   URL: http://localhost:5173/login
   Gunakan username & password dari kartu
   ```

3. **Akses dashboard sesuai role**

---

## 🎨 Fitur Download Kartu Akun

### **Cara Menggunakan:**

1. Login sebagai admin
2. Buka "Kelola Pengurus & Akun"
3. Cari pengurus dengan badge "✅ Punya Akun"
4. Klik tombol **hijau Download** 📥
5. File PNG otomatis terdownload!

### **Isi Kartu:**

```
┌─────────────────────────────────────┐
│  PEMA UTU                           │
│  Kabinet Samgrahita 2024-2025       │
├─────────────────────────────────────┤
│  Nama:     [Nama Lengkap]           │
│  Jabatan:  [Jabatan]                │
│  NIM:      [NIM]                    │
│                                     │
│  Username: [username_login]         │
│  Password: [password_login]         │
│                                     │
│  ⚠️ Simpan dengan aman!             │
└─────────────────────────────────────┘
```

**Ukuran:** 800 x 500 px  
**Format:** PNG  
**Nama File:** `Akun_[Nama]_[Username].png`

**Lihat:** `DOWNLOAD_KARTU_AKUN_GUIDE.md` untuk panduan lengkap

---

## 📁 Struktur Project

```
web-pema-utu/
├── public/                  # Static assets
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout/
│   │   └── ui/             # shadcn/ui components
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin pages
│   │   │   ├── PengurusManagement.tsx  # Kelola pengurus
│   │   │   └── MinistryTeamManagement.tsx
│   │   ├── ministries/     # 12 halaman kementerian
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   └── ...
│   ├── App.tsx
│   └── main.tsx
├── reset-admin.html         # Deprecated (security)
├── populate-test-data.html  # Test utility
├── CARA_POPULATE_DATA.md
├── LOGIN_GUIDE.md
├── DOWNLOAD_KARTU_AKUN_GUIDE.md  # BARU!
├── QUICK_GUIDE_DOWNLOAD_KARTU.txt # BARU!
└── package.json
```

---

## 🔐 Security Notes

### **localStorage Keys:**

```javascript
"pengurusList"    // List 18 pengurus
"accounts"        // List akun login (1 admin + 18 pengurus)
"isAuthenticated" // Boolean login status
"currentUser"     // Current logged in user
```

### **Best Practices:**

1. ✅ Jangan commit `.env` ke Git
2. ✅ Ganti password setelah login pertama
3. ✅ Jangan share kredensial di public chat
4. ✅ Delete kartu akun setelah distribusi (opsional)
5. ✅ Backup data secara berkala
6. ✅ Use HTTPS in production

---

## 🐛 Troubleshooting

### **Admin tidak bisa login:**

**Solusi:**
1. Buka browser console (F12)
2. Run console script (lihat `FIX_ADMIN_LOGIN.md`)
3. Atau contact developer

### **Data pengurus kosong:**

**Solusi:**
1. Login admin
2. Buka: "Kelola Pengurus & Akun"
3. Klik: "Populate Data Pengurus 2024-2025"
4. Atau lihat: `CARA_POPULATE_DATA.md`

### **Download kartu tidak jalan:**

**Solusi:**
1. Refresh page
2. Check browser settings untuk pop-up/download
3. Clear cache & try again
4. Lihat: `DOWNLOAD_KARTU_AKUN_GUIDE.md`

---

## 📊 Data Pengurus

### **Total:** 19 Akun

**1 Admin:**
- Username: `adminpemautu`
- Password: `Luckystrike26`

**6 Pimpinan:**
1. Putra Rahmat - Presiden Mahasiswa
2. Yayas Hariadi - Wakil Presiden
3. M.R. Ansharullah - Sekjen
4. Scherly Susanti - Wakil Sekjen
5. Miftahul Ananda - Bendahara
6. Fuja Hermawati - Wakil Bendahara

**12 Menteri:**
1. M. Khavi Badrian - Advokasi & Hak Mahasiswa
2. Riki Saputra - Komunikasi & Informasi
3. Putri Nola Munthe - Pemberdayaan Perempuan
4. Ananda Ulil Albab - Agama
5. Syahrul Ramazani - Hubungan Internal & Eksternal
6. Chairul Amri - Pengembangan SDM
7. Syahrul Maulidin - Pemuda & Olahraga
8. Ihya Ulmuslimah - Pariwisata & Seni Budaya
9. Delfa Zebua - Pendidikan & Akademik
10. Mutiara Hasnah - Kesehatan Masyarakat
11. Musrizal - Sosial & Lingkungan Hidup
12. Deni Sahputra - Ekonomi Kreatif

---

## 🚀 Deployment

### **Build for Production:**

```bash
npm run build
# atau
bun run build
```

Build output akan ada di folder `dist/`

### **Preview Production Build:**

```bash
npm run preview
# atau
bun run preview
```

### **Deploy Options:**

1. **Vercel** (Recommended)
   - Connect GitHub repo
   - Auto deploy on push
   - Zero config

2. **Netlify**
   - Drag & drop `dist/` folder
   - Or connect Git repo

3. **GitHub Pages**
   - Configure `vite.config.ts`
   - Run build & deploy

---

## 🆕 Update Log

### **v1.2 - 2025-10-10**
- ✅ **NEW:** Fitur download kartu akun untuk pengurus
- ✅ Canvas-based image generation
- ✅ Branded design PEMA UTU
- ✅ Auto-download dengan filename unik
- ✅ Dokumentasi lengkap (DOWNLOAD_KARTU_AKUN_GUIDE.md)

### **v1.1 - 2025-10-10**
- ✅ Update kredensial admin
- ✅ Fix login system
- ✅ Reset admin utility
- ✅ Comprehensive documentation

### **v1.0 - Initial Release**
- ✅ Dashboard admin
- ✅ Pengurus management
- ✅ Auto-populate data
- ✅ Login system
- ✅ Public pages
- ✅ Ministry pages

---

## 📞 Support

Jika ada pertanyaan atau masalah:

1. **Cek dokumentasi** di folder docs/
2. **Buka browser console** (F12) untuk error
3. **Screenshot** error untuk troubleshooting
4. **Contact** developer dengan detail error

---

## 📝 License

Copyright © 2024 PEMA UTU - Kabinet Samgrahita  
All rights reserved.

---

## ✨ Contributors

- **Developer:** [Your Name]
- **Content:** PEMA UTU Team
- **Design:** PEMA UTU Branding Team

---

**Last Updated:** 2025-10-10 08:38 WIB  
**Version:** 1.2  
**Status:** ✅ Production Ready

---

**🎉 Selamat menggunakan sistem PEMA UTU!**

Untuk panduan lengkap download kartu akun, lihat:
👉 **DOWNLOAD_KARTU_AKUN_GUIDE.md**
👉 **QUICK_GUIDE_DOWNLOAD_KARTU.txt**
