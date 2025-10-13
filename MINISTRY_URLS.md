# Daftar URL Kementerian PEMA UTU

## Halaman Utama Kementerian
**URL Direktori Kementerian:** `/ministries`
- Menampilkan daftar semua 12 kementerian dengan deskripsi singkat
- Link navigasi ke halaman detail masing-masing kementerian

## URL Individual Kementerian

### 1. Kementerian Advokasi dan Hak Mahasiswa
**URL:** `/ministry/advokasi-hak-mahasiswa`
- Fokus: Advokasi dan perlindungan hak mahasiswa
- Icon: ⚖️

### 2. Kementerian Komunikasi dan Informasi
**URL:** `/ministry/komunikasi-informasi`
- Fokus: Komunikasi, media, dan penyebaran informasi
- Icon: 📢

### 3. Kementerian Pemberdayaan dan Perlindungan Perempuan
**URL:** `/ministry/pemberdayaan-perempuan`
- Fokus: Pemberdayaan dan perlindungan perempuan
- Icon: 👩

### 4. Kementerian Agama
**URL:** `/ministry/agama`
- Fokus: Kegiatan keagamaan dan spiritual
- Icon: 🕌

### 5. Kementerian Hubungan Internal dan Eksternal
**URL:** `/ministry/hubungan-internal-eksternal`
- Fokus: Networking dan kerjasama
- Icon: 🤝

### 6. Kementerian Pengembangan SDM
**URL:** `/ministry/pengembangan-sdm`
- Fokus: Pelatihan dan pengembangan kompetensi
- Icon: 🎓

### 7. Kementerian Pemuda dan Olahraga
**URL:** `/ministry/pemuda-olahraga`
- Fokus: Kegiatan kepemudaan dan olahraga
- Icon: ⚽

### 8. Kementerian Pariwisata dan Seni Budaya
**URL:** `/ministry/pariwisata-seni-budaya`
- Fokus: Seni budaya dan pariwisata
- Icon: 🎭

### 9. Kementerian Pendidikan dan Akademik
**URL:** `/ministry/pendidikan-akademik`
- Fokus: Peningkatan prestasi akademik
- Icon: 📚

### 10. Kementerian Kesehatan Masyarakat
**URL:** `/ministry/kesehatan-masyarakat`
- Fokus: Kesehatan dan kesejahteraan
- Icon: 🏥

### 11. Kementerian Sosial dan Lingkungan Hidup
**URL:** `/ministry/sosial-lingkungan-hidup`
- Fokus: Pengabdian masyarakat dan lingkungan
- Icon: 🌱

### 12. Kementerian Ekonomi Kreatif
**URL:** `/ministry/ekonomi-kreatif`
- Fokus: Kewirausahaan dan ekonomi kreatif
- Icon: 💼

## URL Admin (Hanya untuk Menteri)

### Dashboard Kelola Tim Kementerian
**URL:** `/admin/ministry-team`
- Akses: Hanya untuk user dengan role "menteri"
- Fitur:
  - Tambah/Edit/Hapus Wakil Menteri
  - Tambah/Edit/Hapus Staff Kementerian
  - Upload foto profil tim
  - Kelola kontak dan media sosial

## Cara Mengakses

### Untuk Pengunjung (Publik)
1. Buka website PEMA UTU
2. Klik menu **"Kementerian"** di navigation bar
3. Pilih kementerian yang ingin dilihat
4. Atau akses langsung via URL di atas

### Untuk Menteri (Admin)
1. Login ke dashboard (`/login`)
2. Di dashboard, klik menu **"Kelola Tim Kementerian"**
3. Tambah/edit data Wakil Menteri dan Staff
4. Data yang ditambahkan otomatis tampil di halaman publik kementerian

## Navigasi Cepat

Berikut link langsung ke beberapa halaman penting:

- **Direktori Kementerian:** [/ministries](/ministries)
- **Dashboard Admin:** [/admin/dashboard](/admin/dashboard)
- **Kelola Tim (Menteri):** [/admin/ministry-team](/admin/ministry-team)
- **Login Admin:** [/login](/login)

## Integrasi dengan Sistem Lain

### Data Menteri
Data menteri diambil dari sistem pengurus (localStorage: `pengurusList`).
Kriteria pencocokan:
- `departemen` sesuai dengan nama kementerian
- `jabatan` mengandung kata "menteri" (bukan "wakil")

### Data Tim Kementerian
Data tim disimpan terpisah (localStorage: `ministryTeams`).
Struktur data mencakup:
- Wakil Menteri (role: "wakil")
- Staff (role: "staff")
- Foto, kontak, dan media sosial

## Tips Pengembangan

### Mengubah Konten Kementerian
Edit file di `src/pages/ministries/[NamaKementerian].tsx`
Contoh:
```tsx
<MinistryPage
  vision="Visi baru..."
  mission={["Misi 1", "Misi 2"]}
  programs={["Program 1", "Program 2"]}
/>
```

### Menambah Kementerian Baru
1. Buat file baru di `src/pages/ministries/`
2. Tambahkan data ke `src/data/ministriesData.ts`
3. Tambahkan route di `src/App.tsx`
4. Import dan tambahkan routing

### Styling Kustom
Setiap halaman kementerian menggunakan:
- Gradient primary/gold untuk hero section
- Card components untuk konten
- Responsive grid untuk tim dan program

## Support

Untuk pertanyaan teknis atau pengembangan lebih lanjut, hubungi tim developer atau admin sistem.
