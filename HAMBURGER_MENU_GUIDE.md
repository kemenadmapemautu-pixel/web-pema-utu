# Panduan Hamburger Menu Navigation

## Fitur yang Ditambahkan

Hamburger menu (ikon 3 garis) di samping tombol Dashboard/Login untuk menampilkan semua menu page dalam slide-out panel.

## Implementasi

### File yang Dimodifikasi: `src/components/Layout/Navigation.tsx`

**Perubahan:**

1. **Import Sheet Component**
   ```tsx
   import {
     Sheet,
     SheetContent,
     SheetDescription,
     SheetHeader,
     SheetTitle,
     SheetTrigger,
   } from "@/components/ui/sheet";
   ```

2. **Tambah State untuk Sheet**
   ```tsx
   const [isSheetOpen, setIsSheetOpen] = useState(false);
   ```

3. **Tambah Menu Items Lengkap**
   - Beranda
   - Tentang
   - Kabinet
   - Struktur Organisasi (baru)
   - Visi & Misi (baru)
   - Program Kerja
   - Kegiatan (baru)
   - Galeri (baru)
   - Warta Pema
   - Kontak

4. **Hamburger Menu Button**
   - Posisi: Di samping tombol Dashboard/Login (desktop only)
   - Icon: Menu (3 garis horizontal)
   - Trigger: Membuka slide-out panel dari kanan

## Cara Kerja

1. **Desktop View:**
   - Hamburger menu muncul di samping tombol Dashboard/Login
   - Klik icon → Panel slide dari kanan
   - Menampilkan semua menu dengan icon

2. **Mobile View:**
   - Tetap menggunakan hamburger menu yang sudah ada
   - Tidak ada perubahan pada mobile navigation

3. **Auto Close:**
   - Panel otomatis tertutup saat menu diklik
   - Bisa ditutup dengan klik di luar panel atau tombol X

## Styling

- **Panel Width:** Default (sesuai SheetContent)
- **Background:** Mengikuti theme (light/dark mode)
- **Active State:** Menu aktif ditandai dengan warna gold dan background
- **Hover Effect:** Smooth transition dengan highlight gold
- **Icons:** Setiap menu memiliki icon yang relevan

## Customization

### Menambah Menu Baru:

```tsx
const navItems = [
  // ... menu lainnya
  {
    name: "Menu Baru",
    path: "/menu-baru",
    icon: IconName  // Import dari lucide-react
  }
];
```

### Mengubah Posisi Hamburger:

Edit di Navigation.tsx baris 85-122:
```tsx
<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
  {/* Customization di sini */}
</Sheet>
```

### Mengubah Tampilan Panel:

```tsx
<SheetContent side="right"> {/* bisa: left, right, top, bottom */}
  {/* Content */}
</SheetContent>
```

## Testing

1. Jalankan: `npm run dev`
2. Buka di desktop view
3. Klik icon hamburger di samping Dashboard/Login
4. Panel harus slide dari kanan
5. Test semua menu link
6. Pastikan auto-close bekerja

## Screenshot Reference

```
┌─────────────────────────────────────┐
│ Logo    [Dashboard] [☰]             │
└─────────────────────────────────────┘
                        ↓
                   Klik ini untuk
                   buka menu panel
```

## Keunggulan

✅ Akses cepat ke semua halaman
✅ Tidak memenuhi navbar dengan banyak menu
✅ Clean & modern UI
✅ Responsive design
✅ Smooth animation
✅ Icon untuk setiap menu
