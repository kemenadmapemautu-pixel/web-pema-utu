# Panduan Smooth Scroll Navigation

## Fitur yang Ditambahkan

Sistem navigasi smooth scroll yang memungkinkan menu footer untuk scroll otomatis ke section tertentu di halaman.

## File yang Dimodifikasi

### 1. `src/lib/scrollUtils.ts` (Baru)
Utility functions untuk smooth scrolling:
- `scrollToSection(sectionId)` - Scroll ke section dengan ID tertentu
- `scrollToTop()` - Scroll ke atas halaman
- `navigateAndScroll(path, sectionId)` - Navigate dan scroll

### 2. `src/pages/Home.tsx`
Ditambahkan ID pada setiap section:
- `id="beranda"` - Hero section
- `id="keunggulan"` - Highlights section  
- `id="akses-cepat"` - Quick access section

Ditambahkan auto-scroll logic menggunakan `sessionStorage`.

### 3. `src/components/Layout/Footer.tsx`
- Menggunakan `useNavigate` dari react-router-dom
- Semua link diubah menjadi button dengan `onClick` handler
- Implementasi `handleScrollLink()` function

## Cara Kerja

1. **Klik menu di footer** → Trigger `handleScrollLink(path, sectionId)`
2. **Jika sudah di halaman yang sama** → Langsung scroll ke section
3. **Jika beda halaman** → Simpan section ID ke `sessionStorage` → Navigate ke halaman
4. **Di halaman tujuan** → `useEffect` membaca `sessionStorage` → Auto scroll ke section

## Cara Menambahkan Section Baru

### Di halaman manapun (contoh: Home.tsx):

```tsx
<section id="nama-section" className="...">
  {/* Konten section */}
</section>
```

### Di Footer.tsx:

```tsx
<button 
  onClick={() => handleScrollLink('/', 'nama-section')}
  className="text-sm text-white/80 hover:text-gold transition-smooth"
>
  Nama Menu
</button>
```

## Contoh Penggunaan

```tsx
// Scroll ke section di halaman yang sama
handleScrollLink('/', 'beranda')

// Navigate ke halaman lain tanpa scroll
handleScrollLink('/about')

// Navigate ke halaman lain DAN scroll ke section tertentu
handleScrollLink('/programs', 'program-unggulan')
```

## Tips

- Pastikan ID section unik di setiap halaman
- Gunakan kebab-case untuk ID (contoh: `akses-cepat`, `program-unggulan`)
- Offset scroll default adalah 80px (untuk navbar)
- Delay auto-scroll adalah 300ms (bisa disesuaikan)

## Testing

1. Jalankan development server: `npm run dev`
2. Klik menu "Beranda" di footer
3. Halaman harus smooth scroll ke hero section
4. Coba dari halaman lain untuk test cross-page navigation
