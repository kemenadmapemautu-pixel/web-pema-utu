# 🔐 Update Kredensial Admin PEMA UTU

## ✅ KREDENSIAL ADMIN SUDAH DIUBAH!

**Tanggal Update:** 2025-10-10

---

## 🔑 Kredensial Admin Baru

### **Login Admin:**

```
Username: adminpemautu
Password: Luckystrike26
```

**⚠️ PENTING:** Password case-sensitive! Gunakan huruf kapital "L" dan angka "26"

---

## 📝 Perubahan Yang Dilakukan

### **Before:**
```
Username: admin
Password: admin123
```

### **After:**
```
Username: adminpemautu
Password: Luckystrike26
```

---

## 📁 File Yang Diupdate

| File | Status | Perubahan |
|------|--------|-----------|
| `PengurusManagement.tsx` | ✅ Updated | Admin account in populate function |
| `Login.tsx` | ✅ Updated | Info box credentials |
| `LOGIN_GUIDE.md` | ✅ Updated | All admin references |
| `CARA_POPULATE_DATA.md` | ✅ Updated | All admin references |
| `ADMIN_CREDENTIALS_UPDATE.md` | ✅ Created | This documentation |

---

## 🧪 Test Login Admin

### **Step 1: Buka Halaman Login**
```
URL: http://localhost:5173/login
(atau URL development Anda)
```

### **Step 2: Masukkan Kredensial Baru**
```
Username: adminpemautu
Password: Luckystrike26
```

### **Step 3: Klik Login**
```
Expected Result:
✅ Toast: "Login Berhasil! Selamat datang, Administrator (admin)"
✅ Redirect ke: /admin/dashboard
✅ Dapat akses penuh ke semua menu admin
```

---

## 🔄 Cara Re-populate Data (Jika Perlu)

Jika Anda sudah pernah populate dengan kredensial lama, **wajib clear & re-populate**:

### **Step 1: Clear Data Lama**

Buka browser console (F12), jalankan:

```javascript
// Clear localStorage
localStorage.removeItem('pengurusList');
localStorage.removeItem('accounts');
localStorage.removeItem('isAuthenticated');
localStorage.removeItem('currentUser');

console.log('✅ Data lama terhapus!');
```

### **Step 2: Refresh Page**

```
Refresh browser (F5 atau Ctrl+R)
```

### **Step 3: Login Admin Baru**

```
Username: adminpemautu
Password: Luckystrike26
```

### **Step 4: Populate Data**

```
1. Buka menu "Kelola Pengurus & Akun"
2. Klik tombol "Populate Data Pengurus 2024-2025"
3. ✅ Data ter-populate dengan admin credentials yang baru!
```

---

## 📊 Struktur Akun Setelah Populate

### **Total: 19 Akun**

```
1 Admin
├── Username: adminpemautu
├── Password: Luckystrike26
└── Role: admin

6 Pimpinan
├── Format username: Pim_[nama]_[nomor]
├── Password: 8 digit terakhir NIM
└── Role: pimpinan

12 Menteri
├── Format username: Men_[nama]_[nomor]
├── Password: 8 digit terakhir NIM
└── Role: menteri
```

---

## 🎯 Verifikasi Update Berhasil

### **Checklist:**

- [ ] File `PengurusManagement.tsx` line 493-494 sudah `adminpemautu` / `Luckystrike26`
- [ ] Halaman login menampilkan kredensial baru di info box
- [ ] Clear localStorage lama
- [ ] Login dengan kredensial baru berhasil
- [ ] Populate data berhasil
- [ ] Akun admin tersimpan di localStorage dengan kredensial baru
- [ ] Bisa logout dan login ulang dengan kredensial baru

---

## 🐛 Troubleshooting

### **Problem: "Username atau password salah"**

**Solution:**
1. Pastikan username: `adminpemautu` (huruf kecil semua)
2. Pastikan password: `Luckystrike26` (huruf L kapital, angka 26)
3. Tidak ada spasi di depan/belakang

### **Problem: Login berhasil tapi akun masih "admin"/"admin123"**

**Solution:**
1. Data lama masih ada di localStorage
2. Wajib clear localStorage dan re-populate
3. Lihat section "Cara Re-populate Data" di atas

### **Problem: Setelah populate, admin masih kredensial lama**

**Solution:**
1. Cek apakah file `PengurusManagement.tsx` sudah di-save
2. Restart dev server: `npm run dev`
3. Clear localStorage dan populate ulang

---

## 🔍 Cara Cek Akun di localStorage

Buka browser console (F12), jalankan:

```javascript
// Cek semua akun
const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
const adminAccount = accounts.find(acc => acc.role === "admin");

console.log("Admin Account:", adminAccount);
// Expected Output:
// {
//   id: "admin-001",
//   username: "adminpemautu",
//   password: "Luckystrike26",
//   role: "admin",
//   name: "Administrator",
//   position: "Administrator",
//   department: ""
// }
```

---

## ⚠️ Keamanan

### **Best Practices:**

1. **Jangan share password** di public repository
2. **Jangan commit** file dengan hardcoded password ke GitHub
3. **Gunakan environment variables** untuk production
4. **Change password** secara berkala
5. **Enable 2FA** jika tersedia (untuk future development)

### **Untuk Production:**

```
1. Ubah password ke yang lebih kuat
2. Implementasi hashing (bcrypt)
3. Implementasi rate limiting untuk login
4. Implementasi session timeout
5. Implementasi audit log
```

---

## 📞 Kontak Support

Jika ada masalah dengan kredensial admin:

1. Cek dokumentasi ini
2. Clear localStorage dan re-populate
3. Restart dev server
4. Contact developer jika masih bermasalah

---

## ✅ Summary

| Item | Value |
|------|-------|
| **Username Lama** | admin |
| **Password Lama** | admin123 |
| **Username Baru** | adminpemautu |
| **Password Baru** | Luckystrike26 |
| **Status Update** | ✅ Complete |
| **Files Updated** | 5 files |
| **Test Status** | ✅ Ready to test |

---

**🎉 Update kredensial admin selesai! Silakan test login dengan kredensial baru!** ✅

---

**Last Updated:** 2025-10-10 08:20 WIB  
**Version:** 1.0  
**Status:** ✅ ACTIVE
