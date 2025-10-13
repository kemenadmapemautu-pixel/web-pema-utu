# 📱 Social Media Input Guide - Profile Edit

## ✨ Fitur Baru: Social Media Input dengan Icons

**Updated:** 2025-10-10  
**Feature:** Smart social media input dengan icon branded & auto-detect

---

## 🎨 Design Baru

### **Input Fields:**

**1. Instagram** 📸
- Icon: Pink Instagram logo
- Placeholder: `@username atau instagram.com/username`
- Color: Pink (#ec4899)
- Icon position: Label & inside input (left)

**2. LinkedIn** 💼
- Icon: Blue LinkedIn logo  
- Placeholder: `linkedin.com/in/username`
- Color: Blue (#2563eb)
- Icon position: Label & inside input (left)

**3. Twitter/TikTok** 🐦
- Icon: Sky blue Twitter logo
- Placeholder: `@username atau tiktok.com/@username`
- Color: Sky Blue (#0ea5e9)
- **Auto-detect:** Label berubah jadi "TikTok" jika URL mengandung 'tiktok'
- Icon position: Label & inside input (left)

---

## 🔍 Auto-Detection Feature

### **Twitter vs TikTok:**

**Input:** `@username` → **Label:** Twitter  
**Input:** `tiktok.com/@username` → **Label:** TikTok ✓

Sistem otomatis mendeteksi berdasarkan kata "tiktok" di URL.

**Detection Logic:**
```typescript
{profileData.socialMedia.twitter?.includes('tiktok') ? 'TikTok' : 'Twitter'}
```

**Visual Feedback:**
- Jika TikTok terdeteksi: Muncul pesan "✓ TikTok terdeteksi"
- Label berubah otomatis

---

## 📝 Format Input Yang Diterima

### **Instagram:**

✅ **Valid formats:**
```
@khavibadrian26
instagram.com/khavibadrian26
https://instagram.com/khavibadrian26
https://www.instagram.com/khavibadrian26
```

### **LinkedIn:**

✅ **Valid formats:**
```
linkedin.com/in/khavibadrian
https://linkedin.com/in/khavibadrian
https://www.linkedin.com/in/khavibadrian
```

### **Twitter:**

✅ **Valid formats:**
```
@khavibadrian
twitter.com/khavibadrian
https://twitter.com/khavibadrian
x.com/khavibadrian
```

### **TikTok:**

✅ **Valid formats:**
```
@khavibadrian
tiktok.com/@khavibadrian
https://tiktok.com/@khavibadrian
https://www.tiktok.com/@khavibadrian
```

---

## 🎯 Cara Penggunaan

### **Untuk Pengurus:**

1. **Login** ke dashboard
2. **Buka** "Edit Profil"
3. **Scroll** ke bagian "Media Sosial"
4. **Input** username atau link sosial media

**Instagram:**
```
Input: @khavibadrian26
atau
Input: instagram.com/khavibadrian26
```

**LinkedIn:**
```
Input: linkedin.com/in/khavibadrian
```

**Twitter:**
```
Input: @khavibadrian
```

**TikTok:**
```
Input: tiktok.com/@khavibadrian
(Label otomatis berubah jadi "TikTok")
```

5. **Klik** "Simpan Perubahan"

---

## 💡 Tips

### **Best Practices:**

✅ **DO:**
- Gunakan format lengkap (URL) untuk clarity
- Pastikan username benar (tanpa typo)
- Test link sebelum save
- Gunakan @ untuk Twitter/TikTok jika username saja

❌ **DON'T:**
- Jangan gunakan spasi
- Jangan gunakan karakter special (kecuali @, /)
- Jangan input link yang salah

### **Recommendations:**

**Instagram:**
- Preferred: `instagram.com/username`
- Alternative: `@username`

**LinkedIn:**
- Preferred: `linkedin.com/in/username`
- **Always** gunakan full URL (lebih professional)

**Twitter:**
- Preferred: `@username`
- Alternative: `twitter.com/username`

**TikTok:**
- Preferred: `tiktok.com/@username`
- Alternative: `@username` (tapi label masih Twitter)

---

## 🎨 Visual Design

### **Layout:**

```
┌─────────────────────────────────────────────────┐
│  Media Sosial                                   │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ 📸 Insta │  │ 💼 LinkIn│  │ 🐦 Twitter│      │
│  │          │  │          │  │           │      │
│  │ [📸___] │  │ [💼___] │  │ [🐦___]  │      │
│  │ @user    │  │ link...  │  │ @user     │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
```

**Colors:**
- Instagram: Pink `#ec4899`
- LinkedIn: Blue `#2563eb`
- Twitter: Sky `#0ea5e9`

**Icon Size:** 16px (h-4 w-4)

**Icon Position:**
- Label: Next to text
- Input: Left side with padding

---

## 🔧 Technical Details

### **Component Structure:**

```tsx
<div className="space-y-2">
  <Label className="flex items-center gap-2">
    <Instagram className="h-4 w-4 text-pink-500" />
    Instagram
  </Label>
  <div className="relative">
    <Instagram className="absolute left-3 top-3 h-4 w-4 text-pink-500" />
    <Input
      placeholder="@username atau instagram.com/username"
      className="pl-10"
    />
  </div>
</div>
```

### **Icons Used (Lucide React):**

```typescript
import { Instagram, Linkedin, Twitter } from "lucide-react";
```

**Note:** TikTok menggunakan Twitter icon dengan auto-detect label.

---

## 📊 Before vs After

### **Before:**

```
Instagram
[________________]
@username

LinkedIn  
[________________]
linkedin.com/in/username

Twitter
[________________]
@username
```

### **After:**

```
📸 Instagram
[📸 @username atau instagram.com/username_______]

💼 LinkedIn
[💼 linkedin.com/in/username__________________]

🐦 Twitter (atau TikTok jika detect)
[🐦 @username atau tiktok.com/@username______]
✓ TikTok terdeteksi (jika ada)
```

---

## ✅ Features Summary

| Feature | Status |
|---------|--------|
| Instagram icon | ✅ Pink branded icon |
| LinkedIn icon | ✅ Blue branded icon |
| Twitter icon | ✅ Sky blue branded icon |
| Icon in label | ✅ Yes |
| Icon in input | ✅ Yes, left side |
| Auto-detect TikTok | ✅ Yes, by URL |
| Visual feedback | ✅ "✓ TikTok terdeteksi" |
| Better placeholders | ✅ More descriptive |
| Input padding | ✅ pl-10 for icon space |

---

## 🐛 Known Limitations

1. **TikTok icon:** Menggunakan Twitter icon (Lucide React tidak punya TikTok)
2. **Validation:** Belum ada validation URL format
3. **Link verification:** Tidak verify apakah link benar-benar ada

### **Future Enhancements:**

- [ ] Add TikTok custom icon
- [ ] URL validation
- [ ] Link verification (check if profile exists)
- [ ] Show preview card saat hover
- [ ] Open link in new tab button

---

## 🧪 Test Cases

### **Test 1: Instagram Input**

**Input:** `@khavibadrian26`  
**Expected:** Icon pink, tersimpan dengan benar

### **Test 2: LinkedIn Input**

**Input:** `linkedin.com/in/khavibadrian`  
**Expected:** Icon blue, tersimpan dengan benar

### **Test 3: Twitter Input**

**Input:** `@khavibadrian`  
**Expected:** Label "Twitter", icon sky blue

### **Test 4: TikTok Auto-detect**

**Input:** `tiktok.com/@khavibadrian`  
**Expected:** Label berubah jadi "TikTok", muncul "✓ TikTok terdeteksi"

### **Test 5: Save & Reload**

1. Input semua social media
2. Klik "Simpan Perubahan"
3. Refresh page
4. **Expected:** Data tersimpan & ter-load dengan benar

---

## 📞 Support

Jika ada masalah:

1. Check console (F12) untuk errors
2. Verify data di localStorage: `localStorage.getItem('pengurusList')`
3. Contact developer dengan screenshot

---

## 📚 Related Documentation

- `README_PEMA_UTU.md` - Main documentation
- `SECURITY_GUIDE.md` - Security best practices
- Profile Edit feature documentation

---

---

## 🔗 Clickable Social Media Links (Cabinet Page)

### **Feature: Auto-format & Clickable Links**

Sosial media di halaman **Cabinet** sekarang:
- ✅ Menggunakan **icon asli** (Instagram, LinkedIn, Twitter)
- ✅ **Clickable** - buka di tab baru
- ✅ **Auto-format URL** dari berbagai format input
- ✅ **Hover effect** - icon external link muncul
- ✅ **Color change** on hover

### **Visual Design:**

```
📸 instagram.com/khavibadrian26 🔗
   ↑ Pink icon   ↑ Text         ↑ External link (on hover)
   
💼 linkedin.com/in/khavibadrian 🔗
   ↑ Blue icon   ↑ Text          ↑ External link (on hover)
   
🐦 @KhaviBadrian26_ 🔗
   ↑ Sky icon    ↑ Text     ↑ External link (on hover)
```

### **Auto-format Logic:**

**Instagram:**
- `@username` → `https://instagram.com/username`
- `instagram.com/username` → `https://instagram.com/username`
- `https://instagram.com/username` → as is

**LinkedIn:**
- `linkedin.com/in/username` → `https://linkedin.com/in/username`
- `https://linkedin.com/in/username` → as is

**Twitter:**
- `@username` → `https://twitter.com/username`
- `twitter.com/username` → `https://twitter.com/username`
- `x.com/username` → `https://x.com/username`

**TikTok:**
- `tiktok.com/@username` → `https://tiktok.com/@username`

### **Hover Effects:**

- Text berubah warna sesuai platform
- External link icon muncul (fade in)
- Cursor berubah jadi pointer
- Smooth transitions

---

**Last Updated:** 2025-10-10 09:10 WIB  
**Version:** 1.4  
**Features:** 
- Social Media Input with Branded Icons
- Clickable Links on Cabinet Page with Auto-format
