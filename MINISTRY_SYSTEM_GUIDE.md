# Panduan Sistem Kementerian PEMA UTU

## Deskripsi Sistem
Sistem kementerian ini memungkinkan setiap menteri untuk mengelola tim kementerian mereka sendiri (Wakil Menteri dan Staff) melalui dashboard admin. Data tim yang ditambahkan akan otomatis tampil di halaman publik kementerian masing-masing.

## 12 Kementerian yang Tersedia

1. **Kementerian Advokasi dan Hak Mahasiswa**
   - URL: `/ministry/advokasi-hak-mahasiswa`
   - Fokus: Advokasi kebijakan dan hak mahasiswa

2. **Kementerian Komunikasi dan Informasi**
   - URL: `/ministry/komunikasi-informasi`
   - Fokus: Media, publikasi, dan penyebaran informasi

3. **Kementerian Pemberdayaan dan Perlindungan Perempuan**
   - URL: `/ministry/pemberdayaan-perempuan`
   - Fokus: Kesetaraan gender dan pemberdayaan perempuan

4. **Kementerian Agama**
   - URL: `/ministry/agama`
   - Fokus: Kegiatan keagamaan dan spiritual

5. **Kementerian Hubungan Internal dan Eksternal**
   - URL: `/ministry/hubungan-internal-eksternal`
   - Fokus: Networking dan kerjasama

6. **Kementerian Pengembangan SDM**
   - URL: `/ministry/pengembangan-sdm`
   - Fokus: Pelatihan dan pengembangan kompetensi

7. **Kementerian Pemuda dan Olahraga**
   - URL: `/ministry/pemuda-olahraga`
   - Fokus: Kegiatan kepemudaan dan olahraga

8. **Kementerian Pariwisata dan Seni Budaya**
   - URL: `/ministry/pariwisata-seni-budaya`
   - Fokus: Pelestarian budaya dan seni

9. **Kementerian Pendidikan dan Akademik**
   - URL: `/ministry/pendidikan-akademik`
   - Fokus: Peningkatan prestasi akademik

10. **Kementerian Kesehatan Masyarakat**
    - URL: `/ministry/kesehatan-masyarakat`
    - Fokus: Kesehatan dan kesejahteraan mahasiswa

11. **Kementerian Sosial dan Lingkungan Hidup**
    - URL: `/ministry/sosial-lingkungan-hidup`
    - Fokus: Pengabdian masyarakat dan lingkungan

12. **Kementerian Ekonomi Kreatif**
    - URL: `/ministry/ekonomi-kreatif`
    - Fokus: Kewirausahaan dan ekonomi kreatif

## Fitur untuk Menteri

### 1. Kelola Tim Kementerian
Menteri dapat mengakses menu **"Kelola Tim Kementerian"** di dashboard mereka untuk:

- **Menambah Wakil Menteri**
  - Upload foto profil
  - Isi nama lengkap
  - Tambahkan email dan nomor telepon
  - Tulis deskripsi singkat
  - Masukkan akun media sosial (Instagram, LinkedIn, Twitter)

- **Menambah Staff Kementerian**
  - Upload foto profil
  - Isi nama lengkap
  - Tambahkan kontak dan media sosial
  - Tulis deskripsi

- **Edit/Hapus Anggota Tim**
  - Klik tombol edit untuk mengubah data
  - Klik tombol hapus untuk menghapus anggota

### 2. Cara Mengakses
1. Login ke dashboard admin (`/login`)
2. Pilih menu **"Kelola Tim Kementerian"**
3. Pilih apakah ingin menambah Wakil Menteri atau Staff
4. Isi form yang tersedia
5. Upload foto (maksimal 5MB)
6. Klik **"Simpan"**

## Struktur Data

### Data Tim Kementerian
Disimpan di localStorage dengan key: `ministryTeams`

```json
{
  "ministryName": "Nama Kementerian",
  "ministerId": "ID Menteri",
  "members": [
    {
      "id": "unique-id",
      "name": "Nama Lengkap",
      "role": "wakil" | "staff",
      "email": "email@example.com",
      "phone": "+62812345678",
      "photo": "base64-image",
      "description": "Deskripsi singkat",
      "socialMedia": {
        "instagram": "@username",
        "linkedin": "linkedin.com/in/username",
        "twitter": "@username"
      }
    }
  ]
}
```

## Tampilan Publik

Setiap halaman kementerian menampilkan:

1. **Hero Section** - Banner dengan nama kementerian
2. **Visi & Misi** - Tujuan dan misi kementerian
3. **Profil Menteri** - Foto, nama, kontak, dan deskripsi menteri
4. **Wakil Menteri** - Grid card wakil menteri dengan foto dan kontak
5. **Staff Kementerian** - Grid card staff dengan foto
6. **Program Kerja** - Daftar program kerja kementerian

## Files yang Dibuat

### Admin Components
- `src/pages/admin/MinistryTeamManagement.tsx` - Dashboard untuk kelola tim

### Public Pages
- `src/pages/MinistryPage.tsx` - Template page kementerian
- `src/pages/ministries/AdvokasiHakMahasiswa.tsx`
- `src/pages/ministries/KomunikasiInformasi.tsx`
- `src/pages/ministries/PemberdayaanPerempuan.tsx`
- `src/pages/ministries/Agama.tsx`
- `src/pages/ministries/HubunganInternalEksternal.tsx`
- `src/pages/ministries/PengembanganSDM.tsx`
- `src/pages/ministries/PemudaOlahraga.tsx`
- `src/pages/ministries/PariwisataSeniBudaya.tsx`
- `src/pages/ministries/PendidikanAkademik.tsx`
- `src/pages/ministries/KesehatanMasyarakat.tsx`
- `src/pages/ministries/SosialLingkunganHidup.tsx`
- `src/pages/ministries/EkonomiKreatif.tsx`

### Modified Files
- `src/App.tsx` - Added routes untuk semua halaman kementerian
- `src/pages/admin/Dashboard.tsx` - Added menu untuk menteri

## Catatan Penting

1. **Role Akses**
   - Hanya user dengan role `"menteri"` yang bisa mengakses menu Kelola Tim Kementerian
   - Admin dapat melihat semua data tapi tidak mengubah tim kementerian
   - Halaman kementerian publik dapat diakses semua orang

2. **Data Storage**
   - Semua data disimpan di localStorage browser
   - Foto disimpan dalam format base64
   - Maksimal ukuran foto: 5MB

3. **Relasi Data**
   - Data menteri diambil dari `pengurusList` di localStorage
   - Data tim kementerian disimpan terpisah di `ministryTeams`
   - Relasi menggunakan `ministerId` dan `ministryName`

## Pengembangan Lebih Lanjut

Untuk mengubah konten kementerian (visi, misi, program kerja):
1. Buka file kementerian di folder `src/pages/ministries/`
2. Edit props yang dikirim ke `MinistryPage`:
   - `vision` - Ubah visi kementerian
   - `mission` - Ubah array misi
   - `programs` - Ubah array program kerja

Contoh:
```tsx
<MinistryPage
  ministryKey="advokasi"
  ministryName="Kementerian Advokasi dan Hak Mahasiswa"
  description="Deskripsi singkat"
  vision="Visi kementerian"
  mission={[
    "Misi 1",
    "Misi 2",
    "Misi 3"
  ]}
  programs={[
    "Program 1",
    "Program 2",
    "Program 3"
  ]}
/>
```

## Support

Untuk pertanyaan atau masalah terkait sistem kementerian, hubungi admin sistem.
