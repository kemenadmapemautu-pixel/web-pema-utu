# 🚀 Cara Populate Data Pengurus

## ✅ Cara Mudah - Klik Tombol di Dashboard

### **Step 1: Login sebagai Admin**
```
URL: /login
Username: adminpemautu
Password: Luckystrike26
```

### **Step 2: Buka "Kelola Pengurus & Akun"**
```
Dashboard Admin → Kelola Pengurus & Akun
```

### **Step 3: Klik Tombol Populate**

Ada 2 lokasi tombol:

**A. Di Header (jika table kosong):**
```
┌────────────────────────────────────────┐
│ Daftar Pengurus                        │
│ [Populate Data Pengurus 2024-2025]     │ ← Klik di sini
│ [Buat Akun] [Tambah Pengurus]          │
└────────────────────────────────────────┘
```

**B. Di Tengah Table (empty state):**
```
┌────────────────────────────────────────┐
│                                        │
│  📋 Belum ada data pengurus            │
│                                        │
│  Klik tombol di bawah untuk populate   │
│  data pengurus PEMA UTU 2024-2025      │
│                                        │
│  [Populate Data Pengurus 2024-2025]    │ ← Klik di sini
│                                        │
│  (18 pengurus: 6 pimpinan + 12 menteri)│
│                                        │
└────────────────────────────────────────┘
```

### **Step 4: Data Langsung Muncul!**
```
✅ Toast notification: "Data Berhasil Di-populate!"
✅ Table langsung isi 18 pengurus
✅ 19 akun siap login (1 admin + 18 pengurus)
```

---

## 📊 Data Yang Di-populate

### **Total: 19 Akun**

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
1. M. Khavi Badrian - Advokasi (01)
2. Riki Saputra - Kominfo (02)
3. Putri Nola Munthe - P3 (03)
4. Ananda Ulil Albab - Agama (04)
5. Syahrul Ramazani - Hubungan (05)
6. Chairul Amri - Pengembangan SDM (06)
7. Syahrul Maulidin - Pemuda & Olahraga (07)
8. Ihya Ulmuslimah - Pariwisata (08)
9. Delfa Zebua - Pendidikan (09)
10. Mutiara Hasnah - Kesehatan (10)
11. Musrizal - Sosial & Lingkungan (11)
12. Deni Sahputra - Ekonomi Kreatif (12)

---

## 🧪 Test Login Setelah Populate

### **Test Admin:**
```
URL: /login
Username: adminpemautu
Password: Luckystrike26
Result: ✅ Dashboard Admin
```

### **Test Presiden:**
```
Username: Pim_putrarahmat_001
Password: 06020152
Result: ✅ Dashboard Pimpinan
```

### **Test Menteri:**
```
Username: Men_mkhavibadrian_01
Password: 06020069
Result: ✅ Dashboard Menteri
```

---

## 🔄 Jika Tombol Tidak Muncul

### **Kemungkinan: Data sudah ada**

Cek table:
- Jika kosong tapi tombol tidak muncul: refresh page

### **Force Re-populate:**

```javascript
// Test: Login manual via console
const testAccount = {
  username: "adminpemautu",
  password: "Luckystrike26",
  role: "admin",
  name: "Administrator",
  id: "admin-001"
};

localStorage.setItem("isAuthenticated", "true");
localStorage.setItem("currentUser", JSON.stringify(testAccount));

// Refresh page → Harus sudah login!
```

---

## ✅ Checklist
{{ ... }}
Setelah populate, pastikan:

- [x] Table menampilkan 18 pengurus
- [x] Toast notification muncul
- [x] Tombol "Populate" hilang (karena data sudah ada)
- [x] Semua pengurus punya badge "✅ Punya Akun"
- [x] Bisa login dengan akun pengurus

---

## 🎯 Troubleshooting

### **Q: Tombol tidak muncul?**
**A:** Data sudah ada di localStorage. Refresh page atau clear localStorage.

### **Q: Data tidak muncul setelah klik?**
**A:** Check browser console untuk error. Refresh page.

### **Q: Akun tidak bisa login?**
**A:** Pastikan populate sudah berhasil (check console log: "✅ Populated 18 pengurus + 1 admin account")

### **Q: Ingin populate ulang?**
**A:** Clear localStorage dulu, baru klik populate lagi.

---

## 🚀 Quick Guide

```
1. Login admin
2. Buka "Kelola Pengurus & Akun"
3. Klik tombol ungu "Populate Data Pengurus 2024-2025"
4. ✅ Selesai! 18 pengurus + 19 akun siap!
```

**Super mudah! Satu klik, semua data langsung ada!** 🎉
