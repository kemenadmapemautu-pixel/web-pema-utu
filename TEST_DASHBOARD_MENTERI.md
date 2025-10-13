# 🧪 Testing Dashboard Menteri - Panduan Lengkap

## ✅ Yang Sudah Berhasil
- Halaman kementerian menampilkan profil menteri ✅
- Wakil menteri dan staff muncul ✅

## 🎯 Testing Integrasi Dashboard

### **Step 1: Setup Data (Jika Belum)**

Buka `populate-test-data.html` → Klik "Setup Data Minimal"

Ini akan membuat:
- ✅ 2 profil menteri di `pengurusList`
- ✅ 2 tim kementerian di `ministryTeams`
- ✅ 3 akun login di `accounts` (2 menteri + 1 admin)

---

### **Step 2: Login Sebagai Menteri**

**URL:** `/login`

**Akun Menteri 1:**
```
Username: menteri.advokasi
Password: password123
Role: Menteri Advokasi dan Hak Mahasiswa
```

**Akun Menteri 2:**
```
Username: menteri.kominfo
Password: password123
Role: Menteri Komunikasi dan Informasi
```

**Akun Admin (untuk testing):**
```
Username: admin
Password: admin123
Role: Administrator
```

---

### **Step 3: Cek Dashboard Menteri**

Setelah login sebagai menteri, Anda harus melihat **3 menu**:

#### 1️⃣ **Kelola Konten Kementerian** (Indigo)
- Edit deskripsi
- Edit visi
- Edit misi
- Edit program kerja

#### 2️⃣ **Kelola Tim Kementerian** (Purple)
- Tambah/Edit/Hapus Wakil Menteri
- Tambah/Edit/Hapus Staff

#### 3️⃣ **Data Saya** (Orange)
- Edit profil pribadi menteri
- Upload foto
- Edit bio, kontak, media sosial

---

### **Step 4: Test Edit Profil Menteri**

1. **Klik** "Data Saya"
2. **Upload foto** baru (atau gunakan yang ada)
3. **Edit bio/deskripsi**
4. **Isi kontak** (email, telepon)
5. **Isi media sosial** (Instagram, LinkedIn, Twitter)
6. **Klik "Simpan Profil"**
7. **Buka halaman kementerian** (contoh: `/ministry/advokasi-hak-mahasiswa`)
8. **Refresh halaman**
9. **Cek apakah perubahan muncul** ✅

---

### **Step 5: Test Edit Konten Kementerian**

1. **Klik** "Kelola Konten Kementerian"
2. **Edit deskripsi** kementerian
3. **Edit visi**
4. **Tambah/Edit misi**
5. **Tambah/Edit program kerja**
6. **Klik "Simpan Semua Perubahan"**
7. **Klik "Preview Halaman"** (akan buka tab baru)
8. **Cek apakah konten custom muncul** ✅

---

### **Step 6: Test Kelola Tim**

1. **Klik** "Kelola Tim Kementerian"
2. **Tambah Wakil Menteri baru**
   - Upload foto
   - Isi nama, email, telepon
   - Isi deskripsi
   - Isi media sosial
   - Klik "Simpan"
3. **Tambah Staff baru**
   - Upload foto
   - Isi nama
   - Isi media sosial
   - Klik "Simpan"
4. **Buka halaman kementerian**
5. **Refresh halaman**
6. **Cek apakah wakil/staff baru muncul** ✅

---

## 🔄 Flow Integrasi Data

### **Alur Data:**

```
MENTERI LOGIN
    ↓
DASHBOARD MENTERI
    ├─ Edit Profil (Data Saya)
    │   └─ Save ke pengurusList
    │       └─ Update: foto, bio, kontak, sosmed
    │
    ├─ Edit Konten (Kelola Konten)
    │   └─ Save ke ministryContents
    │       └─ Update: deskripsi, visi, misi, program
    │
    └─ Edit Tim (Kelola Tim)
        └─ Save ke ministryTeams
            └─ Update: wakil menteri, staff
    ↓
HALAMAN PUBLIK KEMENTERIAN
    ├─ Load dari pengurusList (profil menteri)
    ├─ Load dari ministryContents (konten custom)
    └─ Load dari ministryTeams (wakil & staff)
    ↓
TAMPIL DI WEBSITE ✅
```

---

## 🔍 Debug Integrasi

### **Cek Data di Console:**

```javascript
// 1. Cek akun yang sedang login
console.log('Current User:', JSON.parse(localStorage.getItem('currentUser')));

// 2. Cek profil menteri di pengurusList
const pengurus = JSON.parse(localStorage.getItem('pengurusList'));
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const myProfile = pengurus.find(p => p.id === currentUser.id);
console.log('My Profile:', myProfile);

// 3. Cek tim kementerian
const teams = JSON.parse(localStorage.getItem('ministryTeams'));
const myTeam = teams.find(t => t.ministerId === currentUser.id);
console.log('My Team:', myTeam);

// 4. Cek konten custom
const contents = JSON.parse(localStorage.getItem('ministryContents'));
const myContent = contents ? contents.find(c => c.ministryId === currentUser.id) : null;
console.log('My Custom Content:', myContent);
```

---

## ✅ Checklist Testing

### **Profil Menteri:**
- [ ] Login berhasil
- [ ] Dashboard menteri muncul
- [ ] Menu "Data Saya" muncul
- [ ] Bisa edit profil
- [ ] Upload foto berhasil
- [ ] Simpan profil berhasil
- [ ] Perubahan muncul di halaman publik

### **Konten Kementerian:**
- [ ] Menu "Kelola Konten" muncul
- [ ] Bisa edit deskripsi
- [ ] Bisa edit visi
- [ ] Bisa tambah/hapus misi
- [ ] Bisa tambah/hapus program
- [ ] Simpan konten berhasil
- [ ] Preview halaman berfungsi
- [ ] Konten custom muncul di halaman publik

### **Tim Kementerian:**
- [ ] Menu "Kelola Tim" muncul
- [ ] Bisa tambah wakil menteri
- [ ] Bisa tambah staff
- [ ] Upload foto tim berhasil
- [ ] Simpan tim berhasil
- [ ] Tim baru muncul di halaman publik

---

## 🐛 Troubleshooting

### **Q: Menu menteri tidak muncul setelah login?**
```
A: Cek role di console:
   console.log(JSON.parse(localStorage.getItem('currentUser')));
   
   Role harus "menteri"
   Department harus sesuai dengan nama kementerian
```

### **Q: Edit profil tidak muncul di halaman publik?**
```
A: Cek apakah ID menteri sama:
   - ID di accounts
   - ID di pengurusList
   - ID di currentUser
   
   Semua harus match!
```

### **Q: Konten custom tidak muncul?**
```
A: 1. Pastikan sudah klik "Simpan Semua Perubahan"
   2. Hard refresh halaman (Ctrl+Shift+R)
   3. Cek di console: localStorage.getItem('ministryContents')
```

### **Q: Tim tidak muncul di halaman publik?**
```
A: 1. Pastikan ministryName sama persis
   2. Cek: 
      - ministryTeams.ministryName
      - pengurusList.departemen
      - Props ministryName di component
   3. Harus EXACT MATCH (case sensitive)
```

---

## 📊 Data Structure Reference

### **accounts (Login):**
```json
{
  "username": "menteri.advokasi",
  "password": "password123",
  "name": "Budi Santoso",
  "role": "menteri",
  "id": "menteri-001",
  "department": "Kementerian Advokasi dan Hak Mahasiswa",
  "position": "Menteri Advokasi dan Hak Mahasiswa"
}
```

### **pengurusList (Profil Menteri):**
```json
{
  "id": "menteri-001",
  "nama": "Budi Santoso",
  "jabatan": "Menteri Advokasi dan Hak Mahasiswa",
  "departemen": "Kementerian Advokasi dan Hak Mahasiswa",
  "foto": "url",
  "email": "email",
  "telepon": "phone",
  "deskripsi": "bio",
  "tipe": "menteri",
  "username": "menteri.advokasi",
  "socialMedia": {...}
}
```

### **ministryTeams (Tim):**
```json
{
  "ministryName": "Kementerian Advokasi dan Hak Mahasiswa",
  "ministerId": "menteri-001",
  "members": [...]
}
```

### **ministryContents (Konten Custom):**
```json
{
  "ministryId": "menteri-001",
  "ministryName": "Kementerian Advokasi dan Hak Mahasiswa",
  "description": "...",
  "vision": "...",
  "mission": [...],
  "programs": [...]
}
```

---

## 🎯 Expected Behavior

### **Skenario Lengkap:**

1. **Menteri login** → Redirect ke dashboard
2. **Edit profil** → Data saved ke pengurusList
3. **Edit konten** → Data saved ke ministryContents
4. **Edit tim** → Data saved ke ministryTeams
5. **User buka halaman publik** → Load dari localStorage
6. **Semua data muncul** → Profil + Konten + Tim ✅

### **Key Points:**
- ID harus match di semua data structure
- Nama kementerian harus EXACT sama
- Data di dashboard = Data di halaman publik
- Real-time update (setelah refresh)

---

## 🚀 Quick Test Script

Run ini di console untuk cek integrasi:

```javascript
// Quick Integration Test
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const pengurus = JSON.parse(localStorage.getItem('pengurusList') || '[]');
const teams = JSON.parse(localStorage.getItem('ministryTeams') || '[]');
const contents = JSON.parse(localStorage.getItem('ministryContents') || '[]');

console.log('=== INTEGRATION TEST ===');
console.log('1. Logged in as:', currentUser?.name, '-', currentUser?.role);
console.log('2. My profile exists?', pengurus.some(p => p.id === currentUser?.id));
console.log('3. My team exists?', teams.some(t => t.ministerId === currentUser?.id));
console.log('4. My custom content exists?', contents.some(c => c.ministryId === currentUser?.id));
console.log('5. Department match?', pengurus.find(p => p.id === currentUser?.id)?.departemen === currentUser?.department);

if (currentUser?.role === 'menteri') {
    console.log('✅ Status: MENTERI');
    console.log('📋 Available menus: Kelola Konten, Kelola Tim, Data Saya');
} else if (currentUser?.role === 'admin') {
    console.log('✅ Status: ADMIN');
    console.log('📋 Available menus: All admin menus');
} else {
    console.log('❌ Not logged in');
}
```

---

## ✅ Summary

**Untuk testing integrasi lengkap:**

1. ✅ Setup data via `populate-test-data.html`
2. ✅ Login sebagai menteri
3. ✅ Edit profil di "Data Saya"
4. ✅ Edit konten di "Kelola Konten"
5. ✅ Edit tim di "Kelola Tim"
6. ✅ Buka halaman publik kementerian
7. ✅ Refresh dan cek semua data muncul

**Data flow:**
- Dashboard Edit → localStorage Save → Public Page Load → Display ✅

**Jika ada masalah, jalankan debug script di atas!** 🔍
