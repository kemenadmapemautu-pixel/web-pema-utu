# 🧪 Setup Data Testing - Halaman Kementerian

## ❗ PENTING: Mengapa Konten Tidak Muncul?

Halaman kementerian membutuhkan data dari **localStorage browser**. Jika belum ada data, maka:
- ❌ Profil menteri tidak muncul
- ❌ Wakil menteri tidak muncul
- ❌ Staff tidak muncul
- ✅ Konten default (visi, misi, program) tetap muncul

## 🔧 Solusi: Setup Data Testing

### Option 1: Manual via Console Browser (Tercepat)

1. **Buka halaman kementerian** (contoh: `/ministry/advokasi-hak-mahasiswa`)
2. **Tekan F12** untuk buka Developer Tools
3. **Klik tab "Console"**
4. **Copy-paste code berikut:**

```javascript
// ====================
// SETUP DATA MENTERI
// ====================

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
    foto: "https://ui-avatars.com/api/?name=Budi+Santoso&size=400&background=1e40af&color=fff",
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
    foto: "https://ui-avatars.com/api/?name=Siti+Nurhaliza&size=400&background=16a34a&color=fff",
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

localStorage.setItem('pengurusList', JSON.stringify(pengurusList));
console.log('✅ Data menteri berhasil ditambahkan!');

// ====================
// SETUP DATA TIM KEMENTERIAN
// ====================

const ministryTeams = [
  {
    ministryName: "Kementerian Advokasi dan Hak Mahasiswa",
    ministerId: "menteri-001",
    members: [
      {
        id: "wakil-001",
        name: "Ahmad Fadhil",
        role: "wakil",
        email: "ahmad.fadhil@student.utu.ac.id",
        phone: "+62834567890",
        photo: "https://ui-avatars.com/api/?name=Ahmad+Fadhil&size=400&background=eab308&color=000",
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
        photo: "https://ui-avatars.com/api/?name=Dewi+Lestari&size=400&background=ec4899&color=fff",
        description: "Staff Kementerian",
        socialMedia: {
          instagram: "@dewilestari",
          linkedin: "",
          twitter: ""
        }
      },
      {
        id: "staff-002",
        name: "Rudi Hartono",
        role: "staff",
        email: "rudi.hartono@student.utu.ac.id",
        phone: "+62856789012",
        photo: "https://ui-avatars.com/api/?name=Rudi+Hartono&size=400&background=3b82f6&color=fff",
        description: "Staff Kementerian",
        socialMedia: {
          instagram: "@rudihartono",
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
        photo: "https://ui-avatars.com/api/?name=Linda+Wijaya&size=400&background=8b5cf6&color=fff",
        description: "Wakil Menteri bidang Media Digital",
        socialMedia: {
          instagram: "@lindawijaya",
          linkedin: "linkedin.com/in/lindawijaya",
          twitter: "@lindawijaya"
        }
      },
      {
        id: "staff-003",
        name: "Andi Setiawan",
        role: "staff",
        email: "andi.setiawan@student.utu.ac.id",
        phone: "+62878901234",
        photo: "https://ui-avatars.com/api/?name=Andi+Setiawan&size=400&background=10b981&color=fff",
        description: "Staff Desain Grafis",
        socialMedia: {
          instagram: "@andisetiawan",
          linkedin: "",
          twitter: ""
        }
      }
    ]
  }
];

localStorage.setItem('ministryTeams', JSON.stringify(ministryTeams));
console.log('✅ Data tim kementerian berhasil ditambahkan!');

// ====================
// VERIFIKASI
// ====================

console.log('📊 Total Pengurus:', JSON.parse(localStorage.getItem('pengurusList')).length);
console.log('📊 Total Tim Kementerian:', JSON.parse(localStorage.getItem('ministryTeams')).length);
console.log('✅ Setup data berhasil! Refresh halaman untuk melihat hasilnya.');
```

5. **Tekan Enter**
6. **Refresh halaman** (F5 atau Ctrl+R)
7. **Konten sekarang muncul!** ✅

---

### Option 2: Via Dashboard Admin (Cara Proper)

#### Step 1: Setup Akun Menteri
```javascript
// Paste di Console Browser
const accounts = [
  {
    username: "menteri.advokasi",
    password: "password123",
    name: "Budi Santoso",
    role: "menteri",
    id: "menteri-001",
    department: "Kementerian Advokasi dan Hak Mahasiswa"
  }
];
localStorage.setItem('accounts', JSON.stringify(accounts));
console.log('✅ Akun menteri berhasil dibuat!');
```

#### Step 2: Login & Setup
1. Login di `/login`
   - Username: `menteri.advokasi`
   - Password: `password123`

2. **Lengkapi Profil** di "Data Saya"
   - Upload foto
   - Isi bio dan kontak

3. **Kelola Konten** di "Kelola Konten Kementerian"
   - Edit visi, misi (optional - sudah ada default)

4. **Kelola Tim** di "Kelola Tim Kementerian"
   - Tambah Wakil Menteri
   - Tambah Staff

---

## 🧪 Testing Checklist

Setelah setup data, cek halaman kementerian:

### ✅ Yang Harus Muncul:

**Hero Section:**
- [ ] Nama Kementerian tampil
- [ ] Deskripsi tampil

**Visi & Misi:**
- [ ] Card Visi tampil dengan teks
- [ ] Card Misi tampil dengan numbered list

**Profil Menteri:**
- [ ] Foto menteri tampil (atau placeholder)
- [ ] Nama menteri tampil
- [ ] Jabatan tampil
- [ ] Deskripsi tampil (jika ada)
- [ ] Email tampil (jika ada)
- [ ] Telepon tampil (jika ada)
- [ ] Link media sosial tampil dan berfungsi

**Wakil Menteri:** (jika ada)
- [ ] Grid wakil menteri tampil
- [ ] Foto tampil
- [ ] Nama dan posisi tampil
- [ ] Kontak tampil
- [ ] Media sosial tampil

**Staff:** (jika ada)
- [ ] Grid staff tampil
- [ ] Foto tampil
- [ ] Nama tampil

**Program Kerja:**
- [ ] Grid program tampil
- [ ] Numbered list tampil

---

## 🔍 Debug Guide

### Cek Data di Console:

```javascript
// Cek data pengurus (menteri)
console.log('Pengurus:', JSON.parse(localStorage.getItem('pengurusList')));

// Cek data tim kementerian
console.log('Tim:', JSON.parse(localStorage.getItem('ministryTeams')));

// Cek konten custom (jika sudah diedit menteri)
console.log('Konten Custom:', JSON.parse(localStorage.getItem('ministryContents')));
```

### Troubleshooting:

**Q: Profil menteri tidak muncul?**
```javascript
// Cek apakah nama departemen cocok
const pengurus = JSON.parse(localStorage.getItem('pengurusList'));
console.log('Departemen menteri:', pengurus.map(p => p.departemen));
// Harus cocok dengan ministryName di props
```

**Q: Wakil/Staff tidak muncul?**
```javascript
// Cek apakah nama kementerian cocok
const teams = JSON.parse(localStorage.getItem('ministryTeams'));
console.log('Nama kementerian:', teams.map(t => t.ministryName));
// Harus cocok persis dengan ministryName di props
```

**Q: Konten visi/misi tidak muncul?**
```
- Konten default dari props SELALU muncul
- Jika menteri sudah edit, konten custom akan replace default
- Cek di console: localStorage.getItem('ministryContents')
```

---

## 📝 Data Template Lengkap

### Untuk 12 Kementerian:

```javascript
const fullData = {
  pengurus: [
    // Menteri 1
    {
      id: "menteri-001",
      nama: "Nama Menteri 1",
      jabatan: "Menteri [Nama Kementerian]",
      departemen: "Kementerian [Nama Lengkap]",
      foto: "URL_FOTO",
      email: "email@student.utu.ac.id",
      telepon: "+628xxxxx",
      deskripsi: "Bio menteri...",
      tipe: "menteri",
      socialMedia: {
        instagram: "@username",
        linkedin: "url",
        twitter: "@username"
      }
    },
    // ... 11 menteri lainnya
  ],
  
  teams: [
    {
      ministryName: "Kementerian [Nama Lengkap]",
      ministerId: "menteri-001",
      members: [
        {
          id: "unique-id",
          name: "Nama",
          role: "wakil", // atau "staff"
          email: "email",
          phone: "phone",
          photo: "url",
          description: "desc",
          socialMedia: {
            instagram: "@username",
            linkedin: "url",
            twitter: "@username"
          }
        }
      ]
    },
    // ... 11 kementerian lainnya
  ]
};
```

---

## 🎯 Quick Test Command

Copy paste ini untuk setup cepat 2 kementerian:

```javascript
// Quick Setup - 2 Kementerian
localStorage.setItem('pengurusList', JSON.stringify([{id:"m1",nama:"Budi Santoso",jabatan:"Menteri Advokasi dan Hak Mahasiswa",departemen:"Kementerian Advokasi dan Hak Mahasiswa",foto:"https://ui-avatars.com/api/?name=Budi+Santoso&size=400&background=1e40af&color=fff",email:"budi@student.utu.ac.id",telepon:"+62812345678",deskripsi:"Menteri Advokasi",tipe:"menteri",socialMedia:{instagram:"@budi",linkedin:"",twitter:""}},{id:"m2",nama:"Siti Nurhaliza",jabatan:"Menteri Komunikasi dan Informasi",departemen:"Kementerian Komunikasi dan Informasi",foto:"https://ui-avatars.com/api/?name=Siti+Nurhaliza&size=400&background=16a34a&color=fff",email:"siti@student.utu.ac.id",telepon:"+62823456789",deskripsi:"Menteri Kominfo",tipe:"menteri",socialMedia:{instagram:"@siti",linkedin:"",twitter:""}}]));

localStorage.setItem('ministryTeams', JSON.stringify([{ministryName:"Kementerian Advokasi dan Hak Mahasiswa",ministerId:"m1",members:[{id:"w1",name:"Ahmad Fadhil",role:"wakil",email:"ahmad@student.utu.ac.id",phone:"+62834567890",photo:"https://ui-avatars.com/api/?name=Ahmad+Fadhil&size=400&background=eab308&color=000",description:"Wakil Menteri",socialMedia:{instagram:"@ahmad",linkedin:"",twitter:""}},{id:"s1",name:"Dewi Lestari",role:"staff",email:"dewi@student.utu.ac.id",phone:"+62845678901",photo:"https://ui-avatars.com/api/?name=Dewi+Lestari&size=400&background=ec4899&color=fff",description:"Staff",socialMedia:{instagram:"@dewi",linkedin:"",twitter:""}}]},{ministryName:"Kementerian Komunikasi dan Informasi",ministerId:"m2",members:[{id:"w2",name:"Linda Wijaya",role:"wakil",email:"linda@student.utu.ac.id",phone:"+62867890123",photo:"https://ui-avatars.com/api/?name=Linda+Wijaya&size=400&background=8b5cf6&color=fff",description:"Wakil Menteri",socialMedia:{instagram:"@linda",linkedin:"",twitter:""}}]}]));

console.log('✅ Setup berhasil! Refresh halaman.');
```

---

## ✅ Summary

**Untuk melihat konten di halaman kementerian:**

1. **Setup data via console** (Option 1 - tercepat)
2. **Atau login sebagai menteri** dan kelola via dashboard (Option 2 - proper)
3. **Refresh halaman** kementerian
4. **Semua konten muncul!** ✅

**Default behavior:**
- Visi, Misi, Program → Tampil dari props (default)
- Menteri, Wakil, Staff → Tampil dari localStorage
- Jika menteri sudah edit konten → Custom content replace default

**Documented by:** TEST_DATA_SETUP.md
