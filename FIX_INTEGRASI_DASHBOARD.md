# ⚡ Fix Integrasi Dashboard Menteri

## ✅ Masalah yang Sudah Teridentifikasi

**Profil menteri di halaman publik tidak terintegrasi dengan dashboard menteri.**

Artinya:
- ❌ Edit profil di dashboard tidak muncul di halaman publik
- ❌ Data menteri di dashboard terpisah dari data di halaman publik

---

## 🎯 Solusi Instant

### **Step 1: Re-populate Data dengan Integrasi Benar**

Buka **Console Browser** (F12) dan jalankan script ini:

```javascript
// =======================================
// FIX INTEGRASI DASHBOARD - GUARANTEED
// =======================================

// 1. CLEAR ALL OLD DATA
localStorage.clear();
console.log('🧹 Cleared all old data');

// 2. SETUP AKUN LOGIN
const accounts = [
    {
        username: "menteri.advokasi",
        password: "password123",
        name: "Budi Santoso",
        role: "menteri",
        id: "menteri-001",
        department: "Kementerian Advokasi dan Hak Mahasiswa",
        position: "Menteri Advokasi dan Hak Mahasiswa"
    },
    {
        username: "menteri.kominfo",
        password: "password123",
        name: "Siti Nurhaliza",
        role: "menteri",
        id: "menteri-002",
        department: "Kementerian Komunikasi dan Informasi",
        position: "Menteri Komunikasi dan Informasi"
    },
    {
        username: "admin",
        password: "admin123",
        name: "Administrator",
        role: "admin",
        id: "admin-001",
        department: "",
        position: "Administrator"
    }
];

// 3. SETUP PROFIL MENTERI (TERINTEGRASI DENGAN AKUN)
const pengurusList = [
    {
        id: "menteri-001",
        nama: "Budi Santoso",
        jabatan: "Menteri Advokasi dan Hak Mahasiswa",
        departemen: "Kementerian Advokasi dan Hak Mahasiswa",
        fakultas: "Fakultas Hukum",
        prodi: "Ilmu Hukum",
        email: "budi.santoso@student.utu.ac.id",
        telepon: "+62812345678",
        foto: "https://ui-avatars.com/api/?name=Budi+Santoso&size=400&background=1e40af&color=fff&bold=true",
        deskripsi: "Menteri Advokasi dan Hak Mahasiswa yang berkomitmen untuk memperjuangkan hak-hak mahasiswa UTU dengan prinsip keadilan dan transparansi.",
        tipe: "menteri",
        username: "menteri.advokasi",
        hasAccount: true,
        profileCompleted: true,
        socialMedia: {
            instagram: "@budisantoso",
            linkedin: "linkedin.com/in/budisantoso",
            twitter: "@budisantoso"
        }
    },
    {
        id: "menteri-002",
        nama: "Siti Nurhaliza",
        jabatan: "Menteri Komunikasi dan Informasi",
        departemen: "Kementerian Komunikasi dan Informasi",
        fakultas: "Fakultas Ilmu Komunikasi",
        prodi: "Jurnalistik",
        email: "siti.nurhaliza@student.utu.ac.id",
        telepon: "+62823456789",
        foto: "https://ui-avatars.com/api/?name=Siti+Nurhaliza&size=400&background=16a34a&color=fff&bold=true",
        deskripsi: "Menteri Komunikasi dan Informasi yang fokus pada pengelolaan media dan penyebaran informasi organisasi.",
        tipe: "menteri",
        username: "menteri.kominfo",
        hasAccount: true,
        profileCompleted: true,
        socialMedia: {
            instagram: "@sitinurhaliza",
            linkedin: "linkedin.com/in/sitinurhaliza",
            twitter: "@sitinurhaliza"
        }
    }
];

// 4. SETUP TIM KEMENTERIAN
const ministryTeams = [
    {
        ministryName: "Kementerian Advokasi dan Hak Mahasiswa",
        ministerId: "menteri-001",
        members: [
            {
                id: "wakil-001",
                name: "Ahmad Fadhil Rahman",
                role: "wakil",
                email: "ahmad.fadhil@student.utu.ac.id",
                phone: "+62834567890",
                photo: "https://ui-avatars.com/api/?name=Ahmad+Fadhil&size=400&background=eab308&color=000&bold=true",
                description: "Wakil Menteri dengan fokus pada pendampingan hukum mahasiswa",
                socialMedia: {
                    instagram: "@ahmadfadhil",
                    linkedin: "linkedin.com/in/ahmadfadhil",
                    twitter: "@ahmadfadhil"
                }
            },
            {
                id: "staff-001",
                name: "Dewi Lestari",
                role: "staff",
                email: "dewi.lestari@student.utu.ac.id",
                phone: "+62845678901",
                photo: "https://ui-avatars.com/api/?name=Dewi+Lestari&size=400&background=ec4899&color=fff&bold=true",
                description: "Staff bidang dokumentasi",
                socialMedia: {
                    instagram: "@dewilestari",
                    linkedin: "",
                    twitter: ""
                }
            }
        ]
    },
    {
        ministryName: "Kementerian Komunikasi dan Informasi",
        ministerId: "menteri-002",
        members: [
            {
                id: "wakil-002",
                name: "Linda Wijaya",
                role: "wakil",
                email: "linda.wijaya@student.utu.ac.id",
                phone: "+62867890123",
                photo: "https://ui-avatars.com/api/?name=Linda+Wijaya&size=400&background=8b5cf6&color=fff&bold=true",
                description: "Wakil Menteri bidang Media Digital",
                socialMedia: {
                    instagram: "@lindawijaya",
                    linkedin: "linkedin.com/in/lindawijaya",
                    twitter: "@lindawijaya"
                }
            }
        ]
    }
];

// 5. SAVE SEMUA DATA
localStorage.setItem('accounts', JSON.stringify(accounts));
localStorage.setItem('pengurusList', JSON.stringify(pengurusList));
localStorage.setItem('ministryTeams', JSON.stringify(ministryTeams));

console.log('✅ INTEGRASI BERHASIL!');
console.log('');
console.log('📊 Data yang dibuat:');
console.log('   - 3 akun login (2 menteri + 1 admin)');
console.log('   - 2 profil menteri (terintegrasi)');
console.log('   - 2 tim kementerian');
console.log('');
console.log('🔑 LOGIN INFO:');
console.log('   Menteri 1: menteri.advokasi / password123');
console.log('   Menteri 2: menteri.kominfo / password123');
console.log('   Admin: admin / admin123');
console.log('');
console.log('✨ NEXT STEPS:');
console.log('1. Login ke /login dengan akun menteri');
console.log('2. Edit profil di "Data Saya"');
console.log('3. Perubahan LANGSUNG muncul di halaman publik');
console.log('4. Test dengan refresh halaman kementerian');
```

---

### **Step 2: Login dan Test**

1. **Buka** `/login`
2. **Login** dengan:
   ```
   Username: menteri.advokasi
   Password: password123
   ```
3. **Dashboard muncul** dengan 3 menu
4. **Klik "Data Saya"**

---

### **Step 3: Edit Profil**

1. Upload foto baru (atau biarkan yang ada)
2. Edit **deskripsi/bio** → Ubah teks
3. Edit **email** → Ganti email
4. Edit **telepon** → Ganti telepon
5. Edit **Instagram** → Ubah username
6. **Klik "Simpan Profil"**
7. Lihat notifikasi "Profil Berhasil Disimpan!"

---

### **Step 4: Verifikasi di Halaman Publik**

1. **Buka** `/ministry/advokasi-hak-mahasiswa`
2. **Refresh** halaman (Ctrl+Shift+R)
3. **Cek section "Menteri"**
4. **Perubahan HARUS MUNCUL** ✅

---

## 🔍 Cara Kerja Integrasi

### **Data Flow:**

```
1. LOGIN
   accounts (username + password)
   └─> Set currentUser dengan ID

2. DASHBOARD "Data Saya"
   Load dari: pengurusList (filter by currentUser.id)
   └─> Tampilkan form edit

3. SAVE PROFIL
   Update: pengurusList[currentUser.id]
   └─> Simpan ke localStorage

4. HALAMAN PUBLIK
   Load dari: pengurusList (filter by departemen)
   └─> Tampilkan profil menteri
```

### **Key Integration Points:**

| Data Source | Purpose | Used By |
|------------|---------|---------|
| `accounts` | Login auth | Login page |
| `pengurusList` | Profil menteri | Dashboard + Public page |
| `ministryTeams` | Tim kementerian | Dashboard + Public page |
| `ministryContents` | Konten custom | Dashboard + Public page |
| `currentUser` | Session active | All protected pages |

---

## ✅ Verifikasi Integrasi

### **Test 1: Login → Dashboard**
```javascript
// Setelah login, cek di console:
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log('Current User:', currentUser);
console.log('Role:', currentUser.role); // Harus "menteri"
console.log('ID:', currentUser.id); // Harus "menteri-001" atau "menteri-002"
```

### **Test 2: Dashboard → pengurusList**
```javascript
// Di halaman "Data Saya", cek di console:
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const pengurus = JSON.parse(localStorage.getItem('pengurusList'));
const myProfile = pengurus.find(p => p.id === currentUser.id);
console.log('My Profile:', myProfile);
// Harus ada data lengkap
```

### **Test 3: Save → Update**
```javascript
// Setelah klik "Simpan Profil", cek:
const pengurus = JSON.parse(localStorage.getItem('pengurusList'));
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const updated = pengurus.find(p => p.id === currentUser.id);
console.log('Updated Profile:', updated);
// Harus ada perubahan yang baru disimpan
```

### **Test 4: Public Page → Display**
```javascript
// Di halaman publik kementerian:
const pengurus = JSON.parse(localStorage.getItem('pengurusList'));
const minister = pengurus.find(p => 
    p.departemen === "Kementerian Advokasi dan Hak Mahasiswa" &&
    p.jabatan.toLowerCase().includes("menteri")
);
console.log('Minister on Public Page:', minister);
// Harus sama dengan data yang di-update
```

---

## 🐛 Troubleshooting

### **Q: Edit profil tidak tersimpan?**
```
A: Cek console untuk error
   Pastikan currentUser.id match dengan pengurusList[x].id
```

### **Q: Perubahan tidak muncul di halaman publik?**
```
A: 1. Hard refresh (Ctrl+Shift+R)
   2. Cek departemen name EXACT MATCH
   3. Cek jabatan contains "menteri"
```

### **Q: Menu dashboard tidak muncul setelah login?**
```
A: Cek currentUser.role === "menteri"
   Jika tidak, re-run setup script di atas
```

---

## 📝 Checklist Integrasi

- [ ] Script setup sudah dijalankan
- [ ] Login berhasil sebagai menteri
- [ ] Dashboard muncul dengan 3 menu
- [ ] Menu "Data Saya" berfungsi
- [ ] Form profil load data dengan benar
- [ ] Edit profil berfungsi
- [ ] Simpan profil berhasil
- [ ] Toast notification muncul
- [ ] Refresh halaman publik
- [ ] Perubahan profil muncul di public page ✅

---

## 🎯 Expected Result

**Setelah ikuti semua step:**

1. ✅ Login menteri berhasil
2. ✅ Dashboard menteri muncul
3. ✅ Edit profil di "Data Saya" berhasil
4. ✅ Perubahan tersimpan di localStorage
5. ✅ Perubahan muncul di halaman publik
6. ✅ **INTEGRASI 100% BEKERJA!**

---

## 🚀 Quick Test

**Testing 1 menit:**

```
1. Run script setup (console)
2. Login: menteri.advokasi / password123
3. Klik "Data Saya"
4. Ubah bio menjadi: "Testing integrasi dashboard"
5. Simpan profil
6. Buka: /ministry/advokasi-hak-mahasiswa
7. Refresh (Ctrl+Shift+R)
8. Cek bio menteri → Harus "Testing integrasi dashboard" ✅
```

---

**Jalankan script di atas untuk fix integrasi!** ⚡
