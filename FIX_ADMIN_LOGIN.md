# 🔧 Fix Admin Login - PEMA UTU

## ❌ Problem: Akun Admin Belum Bisa Login

**Kredensial yang benar:**
```
Username: adminpemautu
Password: Luckystrike26
```

---

## 🚀 Solusi Tercepat (Recommended)

### **Metode 1: Manual via Browser Console (RECOMMENDED)**

### **Step-by-Step:**

**1. Buka Browser Console**
```
Tekan F12 atau Ctrl+Shift+I
Pilih tab "Console"
```

**2. Copy-Paste Script Ini:**

```javascript
// COPY PASTE SCRIPT INI KE CONSOLE (F12)

console.log('🔧 Starting admin reset...');

// Step 1: Clear old data
localStorage.removeItem('pengurusList');
localStorage.removeItem('accounts');
localStorage.removeItem('isAuthenticated');
localStorage.removeItem('currentUser');
localStorage.removeItem('loginUsers');
console.log('✅ Step 1: Old data cleared');

// Step 2: Create admin account
const adminAccount = {
  id: "admin-001",
  username: "adminpemautu",
  password: "Luckystrike26",
  role: "admin",
  name: "Administrator",
  position: "Administrator",
  department: ""
};

const accounts = [adminAccount];
localStorage.setItem('accounts', JSON.stringify(accounts));
console.log('✅ Step 2: Admin account created');
console.log('Admin:', adminAccount);

// Step 3: Auto login
const adminUser = {
  username: "adminpemautu",
  name: "Administrator",
  role: "admin",
  id: "admin-001",
  position: "Administrator",
  department: ""
};

localStorage.setItem("isAuthenticated", "true");
localStorage.setItem("currentUser", JSON.stringify(adminUser));
console.log('✅ Step 3: Auto login successful');

console.log('🎉 Admin reset complete!');
console.log('Refreshing page...');

// Refresh
setTimeout(() => {
  location.reload();
}, 1000);
```

**3. Tekan Enter**

**4. Halaman akan refresh otomatis**

**5. Anda sudah login sebagai admin!**

---

## 🧪 Metode 2: Manual Login Setelah Clear

**Step 1: Clear localStorage**
```javascript
localStorage.clear();
location.reload();
```

**Step 2: Buka halaman login**
```
http://localhost:5173/login
```

**Step 3: Login dengan kredensial baru**
```
Username: adminpemautu
Password: Luckystrike26
```

**Step 4: Setelah login, populate data**
```
Dashboard → Kelola Pengurus & Akun
Klik "Populate Data Pengurus 2024-2025"
```

---

## 🔍 Diagnosis: Kenapa Admin Tidak Bisa Login?

### **Penyebab Umum:**

1. **Data lama masih ada** (admin/admin123)
2. **localStorage belum di-clear**
3. **Key mismatch** (loginUsers vs accounts)
4. **Typo password** (case-sensitive!)

### **Cek Status:**

Jalankan di console:

```javascript
// Cek accounts
const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
console.log('Total accounts:', accounts.length);
console.log('Accounts:', accounts);

// Cek admin
const admin = accounts.find(acc => acc.role === 'admin');
console.log('Admin account:', admin);

// Expected Output:
// Admin account: {
//   username: "adminpemautu",
//   password: "Luckystrike26",
//   role: "admin",
//   ...
// }
```

### **Jika Admin Masih "admin"/"admin123":**

```javascript
// WAJIB clear dan setup ulang!
localStorage.clear();

// Buat admin baru
const accounts = [{
  id: "admin-001",
  username: "adminpemautu",
  password: "Luckystrike26",
  role: "admin",
  name: "Administrator",
  position: "Administrator",
  department: ""
}];

localStorage.setItem('accounts', JSON.stringify(accounts));
console.log('✅ Admin fixed!');
```

---

## ⚠️ Common Mistakes

### **1. Password Case-Sensitive!**

❌ **SALAH:**
```
luckystrike26  (huruf kecil semua)
LUCKYSTRIKE26  (huruf besar semua)
Luckystrike 26 (ada spasi)
```

✅ **BENAR:**
```
Luckystrike26  (L kapital, 26 angka)
```

### **2. Username Harus Lowercase**

❌ **SALAH:**
```
AdminPemaUtu
ADMINPEMAUTU
admin pema utu
```

✅ **BENAR:**
```
adminpemautu  (huruf kecil semua, no space)
```

### **3. Jangan Lupa Clear Data Lama**

Jika sudah pernah populate dengan admin lama:
```javascript
// WAJIB clear dulu!
localStorage.removeItem('accounts');
localStorage.removeItem('pengurusList');
```

---

## 📋 Checklist Troubleshooting

Ikuti checklist ini step-by-step:

- [ ] 1. Buka console (F12)
- [ ] 2. Cek accounts di localStorage
- [ ] 3. Pastikan admin username = "adminpemautu"
- [ ] 4. Pastikan admin password = "Luckystrike26"
- [ ] 5. Jika salah, clear localStorage
- [ ] 6. Run script setup admin dari metode 2
- [ ] 7. Refresh page
- [ ] 8. Test login
- [ ] 9. Jika berhasil, populate data pengurus
- [ ] 10. Done! ✅

---

## 🎯 Quick Test

### **Test 1: Cek Admin Account**

```javascript
const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
const admin = accounts.find(a => a.role === 'admin');

if (admin?.username === 'adminpemautu' && admin?.password === 'Luckystrike26') {
  console.log('✅ Admin credentials CORRECT!');
} else {
  console.log('❌ Admin credentials WRONG!');
  console.log('Current:', admin);
}
```

### **Test 2: Force Login**

```javascript
// Force login tanpa cek password
localStorage.setItem('isAuthenticated', 'true');
localStorage.setItem('currentUser', JSON.stringify({
  username: "adminpemautu",
  name: "Administrator",
  role: "admin",
  id: "admin-001"
}));

console.log('✅ Force login successful! Refreshing...');
location.reload();
```

---

## 🆘 Still Not Working?

### **Nuclear Option: Complete Reset**

```javascript
// ⚠️ INI AKAN HAPUS SEMUA DATA!

// 1. Clear EVERYTHING
localStorage.clear();
sessionStorage.clear();

// 2. Setup fresh admin
const adminAccount = {
  id: "admin-001",
  username: "adminpemautu",
  password: "Luckystrike26",
  role: "admin",
  name: "Administrator",
  position: "Administrator",
  department: ""
};

localStorage.setItem('accounts', JSON.stringify([adminAccount]));

// 3. Auto login
localStorage.setItem('isAuthenticated', 'true');
localStorage.setItem('currentUser', JSON.stringify({
  username: "adminpemautu",
  name: "Administrator",
  role: "admin",
  id: "admin-001"
}));

// 4. Reload
console.log('🎉 Complete reset done!');
location.href = '/admin/dashboard';
```

---

## 📞 Contact Support

Jika masih tidak bisa setelah semua metode di atas:

1. Screenshot error di console
2. Screenshot halaman login
3. Copy output dari:
   ```javascript
   console.log(localStorage.getItem('accounts'));
   console.log(localStorage.getItem('isAuthenticated'));
   console.log(localStorage.getItem('currentUser'));
   ```
4. Contact developer

---

## ✅ Verification

Setelah fix, pastikan:

```javascript
// Run this to verify:
const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
const admin = accounts.find(a => a.role === 'admin');

console.log('=== VERIFICATION ===');
console.log('✅ Total accounts:', accounts.length);
console.log('✅ Admin username:', admin?.username);
console.log('✅ Admin password:', admin?.password);
console.log('✅ Expected: adminpemautu / Luckystrike26');

if (admin?.username === 'adminpemautu' && admin?.password === 'Luckystrike26') {
  console.log('🎉 ADMIN IS CORRECT! You can login now!');
} else {
  console.log('❌ ADMIN IS WRONG! Run reset script again!');
}
```

---

## 🎉 Success Criteria

Login admin berhasil jika:

- ✅ Toast muncul: "Login Berhasil! Selamat datang, Administrator (admin)"
- ✅ Redirect ke /admin/dashboard
- ✅ Dapat akses ke menu admin
- ✅ Username di header: "Administrator"
- ✅ Bisa populate data pengurus

---

**Last Updated:** 2025-10-10 08:25 WIB  
**Status:** ✅ TESTED & VERIFIED  
**Difficulty:** ⭐⭐ (Mudah dengan utility)
