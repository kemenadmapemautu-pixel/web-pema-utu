# Quick Start - Testing Sistem Kementerian

## 🚀 Langkah Cepat Testing

### 1. Setup Akun Menteri (Jika Belum Ada)

Untuk testing, Anda perlu akun dengan role "menteri". Buat via console browser:

```javascript
// Buka Console Browser (F12)
// Tambahkan akun menteri ke localStorage

const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
accounts.push({
  username: 'menteri.advokasi@pema.com',
  password: 'password123',
  name: 'Budi Santoso',
  role: 'menteri'
});
localStorage.setItem('accounts', JSON.stringify(accounts));

// Tambahkan profil menteri ke pengurus list
const pengurus = JSON.parse(localStorage.getItem('pengurusList') || '[]');
pengurus.push({
  id: 'menteri-001',
  nama: 'Budi Santoso',
  jabatan: 'Menteri Advokasi dan Hak Mahasiswa',
  departemen: 'Kementerian Advokasi dan Hak Mahasiswa',
  email: 'menteri.advokasi@pema.com',
  telepon: '+62812345678',
  foto: '', // Bisa diisi nanti
  tipe: 'menteri',
  username: 'menteri.advokasi@pema.com',
  hasAccount: true,
  profileCompleted: true
});
localStorage.setItem('pengurusList', JSON.stringify(pengurus));
```

### 2. Login Sebagai Menteri

1. Buka `/login`
2. Login dengan:
   - Username: `menteri.advokasi@pema.com`
   - Password: `password123`
3. Anda akan diredirect ke dashboard

### 3. Test Dashboard Menu

Di dashboard menteri, Anda akan melihat 2 menu:
- ✅ **Kelola Tim Kementerian** (warna ungu)
- ✅ **Data Saya** (warna orange)

### 4. Test Kelola Tim Kementerian

**A. Tambah Wakil Menteri:**
1. Klik menu **"Kelola Tim Kementerian"**
2. Di section "Wakil Menteri", klik **"Tambah Wakil Menteri"**
3. Dialog akan muncul
4. Isi form:
   - Pastikan "Wakil Menteri" dipilih
   - Upload foto (optional)
   - Nama: "Ahmad Fadhil"
   - Email: "ahmad@example.com"
   - Telepon: "+62812345678"
   - Deskripsi: "Wakil Menteri dengan pengalaman..."
   - Instagram: "@ahmadfadhil"
5. Klik **"Simpan"**
6. Card wakil menteri akan muncul

**B. Tambah Staff:**
1. Di section "Staff Kementerian", klik **"Tambah Staff"**
2. Pilih "Staff" sebagai posisi
3. Isi data staff (lebih sederhana dari wakil menteri)
4. Klik **"Simpan"**
5. Card staff akan muncul

**C. Edit Anggota Tim:**
1. Klik icon **pensil** di card anggota tim
2. Edit data yang diinginkan
3. Klik **"Simpan"**

**D. Hapus Anggota Tim:**
1. Klik icon **trash** di card anggota tim
2. Konfirmasi penghapusan
3. Card akan hilang

### 5. Test Halaman Publik

**A. Halaman Direktori Kementerian:**
1. Logout dari dashboard (atau buka tab baru)
2. Buka `/ministries`
3. Akan muncul grid 12 kementerian
4. Klik salah satu kementerian

**B. Halaman Detail Kementerian:**
1. Buka `/ministry/advokasi-hak-mahasiswa`
2. Akan muncul:
   - ✅ Hero banner
   - ✅ Visi & Misi
   - ✅ Profil Menteri (Budi Santoso)
   - ✅ Wakil Menteri yang sudah ditambahkan
   - ✅ Staff yang sudah ditambahkan
   - ✅ Program Kerja
3. Klik link media sosial (akan buka di tab baru)

### 6. Test All 12 Ministries

Akses URL berikut untuk test semua halaman:

```
/ministry/advokasi-hak-mahasiswa
/ministry/komunikasi-informasi
/ministry/pemberdayaan-perempuan
/ministry/agama
/ministry/hubungan-internal-eksternal
/ministry/pengembangan-sdm
/ministry/pemuda-olahraga
/ministry/pariwisata-seni-budaya
/ministry/pendidikan-akademik
/ministry/kesehatan-masyarakat
/ministry/sosial-lingkungan-hidup
/ministry/ekonomi-kreatif
```

### 7. Test Navigation Menu

1. Klik **menu hamburger** (☰) di header desktop
2. Atau buka di mobile untuk melihat mobile menu
3. Pastikan ada menu **"Kementerian"** dengan icon 🏢
4. Klik menu "Kementerian" → akan ke `/ministries`

### 8. Test Access Control

**A. Test Minister Route:**
1. Logout dari akun menteri
2. Coba akses `/admin/ministry-team` tanpa login
3. Akan redirect ke `/login`
4. Login dengan akun non-menteri (admin/pimpinan)
5. Coba akses `/admin/ministry-team`
6. Akan redirect ke `/admin/dashboard`

**B. Test Public Access:**
1. Tanpa login, akses `/ministries`
2. Tanpa login, akses `/ministry/advokasi-hak-mahasiswa`
3. Kedua halaman harus bisa diakses

## 🔍 Testing Checklist

### Functional Testing
- [ ] Login sebagai menteri berhasil
- [ ] Dashboard menteri menampilkan menu "Kelola Tim"
- [ ] Bisa tambah Wakil Menteri dengan foto
- [ ] Bisa tambah Staff dengan foto
- [ ] Bisa edit anggota tim
- [ ] Bisa hapus anggota tim
- [ ] Data tersimpan di localStorage
- [ ] Toast notification muncul saat CRUD
- [ ] Halaman `/ministries` menampilkan 12 kementerian
- [ ] Setiap halaman kementerian load dengan benar
- [ ] Profil menteri muncul di halaman publik
- [ ] Wakil Menteri yang ditambahkan muncul di halaman publik
- [ ] Staff yang ditambahkan muncul di halaman publik
- [ ] Link media sosial berfungsi
- [ ] Navigation menu "Kementerian" ada dan berfungsi

### UI/UX Testing
- [ ] Layout responsive di desktop
- [ ] Layout responsive di tablet
- [ ] Layout responsive di mobile
- [ ] Card hover effects bekerja
- [ ] Dialog/Modal berfungsi dengan baik
- [ ] Image upload preview muncul
- [ ] Empty states tampil dengan baik
- [ ] Loading states berfungsi
- [ ] Error messages jelas

### Access Control Testing
- [ ] Non-menteri tidak bisa akses `/admin/ministry-team`
- [ ] Publik bisa akses semua halaman ministry
- [ ] Redirect ke login jika tidak authenticated

## 🐛 Common Issues & Solutions

### Issue 1: Menu "Kelola Tim" Tidak Muncul
**Solusi:**
- Pastikan login dengan role "menteri"
- Check `currentUser.role === "menteri"` di console

### Issue 2: Foto Upload Tidak Muncul
**Solusi:**
- Pastikan file size < 5MB
- Pastikan format gambar (JPG, PNG, dll)
- Check console untuk error

### Issue 3: Data Tidak Tersimpan
**Solusi:**
- Check localStorage tidak penuh
- Check console untuk error
- Clear localStorage dan test ulang

### Issue 4: Profil Menteri Tidak Muncul
**Solusi:**
- Pastikan data menteri ada di `pengurusList`
- Pastikan `departemen` cocok dengan nama kementerian
- Pastikan `jabatan` mengandung kata "menteri"

### Issue 5: Tim Tidak Muncul di Halaman Publik
**Solusi:**
- Check `ministryTeams` di localStorage
- Pastikan `ministryName` cocok dengan nama kementerian
- Refresh halaman

## 📊 Expected Results

### LocalStorage After Testing
Setelah testing berhasil, cek localStorage:

```javascript
// Check accounts
console.log(JSON.parse(localStorage.getItem('accounts')));

// Check pengurus (ministers)
console.log(JSON.parse(localStorage.getItem('pengurusList')));

// Check ministry teams
console.log(JSON.parse(localStorage.getItem('ministryTeams')));
```

Expected data structure:
- `accounts`: Array dengan akun menteri
- `pengurusList`: Array dengan profil menteri
- `ministryTeams`: Array dengan tim kementerian (wakil & staff)

## ✅ Testing Complete

Jika semua checklist di atas passed, sistem ministry sudah berfungsi dengan baik dan siap untuk production! 🎉

## 🆘 Need Help?

Jika ada error atau bug:
1. Check browser console untuk error messages
2. Check localStorage untuk data integrity
3. Review file yang relevan:
   - `src/pages/admin/MinistryTeamManagement.tsx`
   - `src/pages/MinistryPage.tsx`
   - `src/App.tsx`
4. Review documentation:
   - `MINISTRY_SYSTEM_GUIDE.md`
   - `MINISTRY_URLS.md`
