# 📥 Panduan Download Kartu Akun Pengurus

## ✨ Fitur Baru: Download Kartu Akun

Admin sekarang dapat **download kartu akun** untuk setiap pengurus dalam format **gambar PNG** yang siap dikirim melalui WhatsApp, Email, atau media sosial lainnya.

---

## 🎯 Kegunaan

Fitur ini memudahkan admin untuk:

1. ✅ **Distribusi kredensial** - Kirim username & password ke pengurus dengan aman
2. ✅ **Dokumentasi** - Simpan backup kredensial dalam format visual
3. ✅ **Profesional** - Kartu akun dengan desain menarik & branded PEMA UTU
4. ✅ **Praktis** - Langsung download, tidak perlu copy-paste manual

---

## 📋 Cara Menggunakan

### **Step 1: Login sebagai Admin**

```
URL: /login
Username: adminpemautu
Password: Luckystrike26
```

### **Step 2: Buka Halaman Kelola Pengurus**

```
Dashboard Admin → Kelola Pengurus & Akun
```

### **Step 3: Download Kartu Akun**

Untuk setiap pengurus yang **sudah punya akun** (ditandai badge "✅ Punya Akun"):

1. Lihat kolom **Action** di kanan
2. Klik tombol **hijau dengan icon Download** 📥
3. Kartu akun otomatis terdownload sebagai file PNG

**Nama file:** `Akun_[Nama]_[Username].png`

Contoh: `Akun_Putra_Rahmat_Pim_putrarahmat_001.png`

---

## 🎨 Desain Kartu Akun

Kartu akun berisi:

### **Header Section:**
- 🏛️ Logo: **PEMA UTU**
- 📅 Periode: **Kabinet Samgrahita 2024-2025**
- 🎨 Background: Gradient ungu-pink

### **Content Section:**
- 👤 **Nama:** Nama lengkap pengurus
- 💼 **Jabatan:** Posisi/jabatan
- 🆔 **NIM:** Nomor Induk Mahasiswa

### **Credentials Section:**
- 🔑 **Username:** Username login
- 🔒 **Password:** Password login (highlighted merah)

### **Footer:**
- ⚠️ Peringatan keamanan

**Ukuran:** 800 x 500 pixels (ideal untuk share)

---

## 📤 Cara Kirim ke Pengurus

### **Via WhatsApp:**

1. Download kartu akun
2. Buka WhatsApp
3. Kirim gambar ke pengurus
4. Tambahkan pesan:
   ```
   Selamat datang di PEMA UTU! 🎉
   
   Berikut kredensial login dashboard Anda.
   Silakan login di: [URL website]
   
   Jangan bagikan akun ini ke orang lain!
   ```

### **Via Email:**

1. Download kartu akun
2. Attach file PNG
3. Subject: "Kredensial Login Dashboard PEMA UTU"
4. Body: Instruksi login & link website

### **Via Telegram/Line:**

1. Download kartu akun
2. Send as image/document
3. Tambahkan caption dengan link login

---

## 🔍 Tombol Action di Tabel

Untuk pengurus yang **sudah punya akun**, ada 4 tombol:

| Icon | Warna | Fungsi | Keterangan |
|------|-------|--------|------------|
| ✏️ **Pencil** | Biru | Edit Data | Edit profil pengurus |
| 📥 **Download** | Hijau | Download Kartu | **FITUR BARU!** Download kartu akun |
| 🔑 **Key** | Orange | Hapus Akun | Hapus akun login saja |
| 🗑️ **Trash** | Merah | Hapus Semua | Hapus profil & akun |

**Catatan:** Tombol Download hanya muncul jika pengurus sudah punya akun!

---

## 📊 Download Massal (Semua Pengurus)

Jika ingin download kartu untuk **semua pengurus sekaligus**:

### **Manual (Recommended):**

1. Klik download satu per satu untuk 18 pengurus
2. Semua file akan tersimpan di folder Downloads
3. Buat folder khusus untuk organize

### **Alternatif (Script Console):**

Jalankan script ini di browser console (F12) untuk download semua:

```javascript
// Download semua kartu akun sekaligus
const pengurusList = JSON.parse(localStorage.getItem('pengurusList') || '[]');
const pengurusWithAccounts = pengurusList.filter(p => p.hasAccount);

console.log(`Will download ${pengurusWithAccounts.length} cards...`);

pengurusWithAccounts.forEach((pengurus, index) => {
  setTimeout(() => {
    // Trigger click on download button
    const buttons = document.querySelectorAll('[title="Download Kartu Akun"]');
    if (buttons[index]) {
      buttons[index].click();
      console.log(`Downloaded: ${pengurus.nama}`);
    }
  }, index * 1000); // 1 second delay between downloads
});
```

**Delay 1 detik** antar download untuk menghindari browser block!

---

## ⚠️ Troubleshooting

### **Problem: Tombol Download tidak muncul**

**Solusi:**
- Pastikan pengurus sudah punya badge "✅ Punya Akun"
- Jika belum, klik tombol "Populate Data Pengurus 2024-2025"
- Refresh page

### **Problem: Download tidak jalan**

**Solusi:**
1. Cek browser settings untuk pop-up/download
2. Allow download dari website
3. Cek folder Downloads

### **Problem: Gambar kosong/blank**

**Solusi:**
- Refresh page dan coba lagi
- Clear browser cache
- Gunakan browser lain (Chrome recommended)

### **Problem: Password tidak muncul di kartu**

**Solusi:**
- Data pengurus belum lengkap
- Re-populate data
- Cek di console: `localStorage.getItem('pengurusList')`

---

## 🎯 Tips & Best Practices

### **Keamanan:**

1. ✅ **Jangan share kartu di grup publik**
2. ✅ **Kirim langsung ke personal chat pengurus**
3. ✅ **Hapus file setelah dikirim** (jika tidak perlu backup)
4. ✅ **Ingatkan pengurus untuk ganti password** setelah login pertama

### **Organisasi File:**

```
Downloads/
├── Kartu_Akun_PEMA_2024/
│   ├── Pimpinan/
│   │   ├── Akun_Putra_Rahmat_Pim_putrarahmat_001.png
│   │   ├── Akun_Yayas_Hariadi_Pim_yayashariadi_002.png
│   │   └── ...
│   └── Menteri/
│       ├── Akun_M_Khavi_Badrian_Men_mkhavibadrian_01.png
│       ├── Akun_Riki_Saputra_Men_rikisaputra_02.png
│       └── ...
```

### **Distribusi:**

1. **Batch kirim per departemen** (Pimpinan dulu, lalu Menteri)
2. **Track siapa yang sudah login** via dashboard
3. **Follow up** pengurus yang belum login dalam 3 hari
4. **Reminder** ganti password setelah login pertama

---

## 📸 Preview Kartu Akun

**Sample Output:**

```
╔═══════════════════════════════════════════════╗
║     🎨 Gradient Background (Purple-Pink)      ║
║  ┌─────────────────────────────────────────┐  ║
║  │         PEMA UTU                        │  ║
║  │   Kabinet Samgrahita 2024-2025          │  ║
║  ├─────────────────────────────────────────┤  ║
║  │                                         │  ║
║  │  Putra Rahmat                           │  ║
║  │  Presiden Mahasiswa                     │  ║
║  │  NIM: 2105906020152                     │  ║
║  │  ─────────────────────────────────────  │  ║
║  │                                         │  ║
║  │  Username:  Pim_putrarahmat_001         │  ║
║  │  Password:  06020152                    │  ║
║  │                                         │  ║
║  │  ⚠️ Simpan dengan aman!                 │  ║
║  └─────────────────────────────────────────┘  ║
╚═══════════════════════════════════════════════╝
```

---

## 🔄 Update Log

**Version 1.0** - 2025-10-10
- ✅ Fitur download kartu akun per pengurus
- ✅ Design branded PEMA UTU
- ✅ Auto-generate filename
- ✅ Canvas-based image generation
- ✅ Format PNG 800x500px

---

## 📞 Support

Jika ada masalah:

1. Screenshot error
2. Cek browser console (F12)
3. Contact developer
4. Lihat file: `README_ADMIN_FIX.txt`

---

## ✅ Checklist Distribusi Akun

Setelah populate & download:

- [ ] Download kartu semua pimpinan (6 orang)
- [ ] Download kartu semua menteri (12 orang)
- [ ] Organize file ke folder per departemen
- [ ] Kirim ke masing-masing pengurus via WA/Email
- [ ] Track & confirm receipt
- [ ] Reminder ganti password
- [ ] Delete file kartu setelah distribusi (opsional)
- [ ] Backup 1 copy di secure storage (opsional)

---

**Last Updated:** 2025-10-10 08:38 WIB  
**Status:** ✅ ACTIVE & TESTED  
**Feature:** Download Account Card for Staff Members
