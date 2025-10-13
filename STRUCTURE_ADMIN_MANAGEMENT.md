# Kelola Struktur Organisasi - Admin Dashboard

## Overview

Fitur baru yang memungkinkan admin untuk mengatur tampilan hierarki organisasi di halaman publik melalui dashboard admin. Admin dapat mengubah teks, layout, dan konfigurasi visual tanpa perlu edit code.

## Akses Fitur

### URL
- **Admin Dashboard**: `/admin/structure`
- **Public Page**: `/structure`

### Permissions
- ✅ **Admin**: Full access (edit konfigurasi)
- ❌ **Pimpinan/Menteri**: Read-only (lihat di public page)
- ❌ **Public**: Read-only (lihat di public page)

## Fitur yang Dapat Diatur

### 1. **Judul Pimpinan**
- **Field**: `leadershipTitle`
- **Default**: "Pimpinan Kabinet"
- **Tampil di**: Box gold di hierarki organisasi
- **Contoh**: "Pengurus Inti", "Dewan Pimpinan", dll

### 2. **Subtitle Pimpinan**
- **Field**: `leadershipSubtitle`
- **Default**: "Presiden & Wakil Presiden"
- **Tampil di**: Teks kecil di bawah judul pimpinan
- **Contoh**: "Ketua & Wakil Ketua", "Presiden & Wapres", dll

### 3. **Garis Penghubung**
- **Field**: `showConnector`
- **Default**: `true`
- **Tampil di**: Garis vertikal antara pimpinan dan menteri
- **Opsi**: Show/Hide (checkbox)

### 4. **Jumlah Kolom Grid Menteri**
- **Field**: `ministerGridCols`
- **Default**: `3`
- **Tampil di**: Layout grid untuk box menteri
- **Opsi**: 2, 3, atau 4 kolom

### 5. **Teks Informasi**
- **Field**: `infoText`
- **Default**: "Struktur organisasi berdasarkan data kabinet aktif"
- **Tampil di**: Teks di bawah hierarki organisasi
- **Contoh**: Custom message untuk user

## Cara Menggunakan

### Langkah 1: Akses Menu
1. Login sebagai admin
2. Buka Dashboard Admin
3. Klik card "Kelola Struktur Organisasi" (icon Building2, warna kuning)

### Langkah 2: Edit Konfigurasi
1. Klik tombol "Edit Konfigurasi" di kanan atas
2. Form akan aktif untuk diedit
3. Ubah field yang diinginkan:
   - **Judul Pimpinan**: Ketik teks baru
   - **Subtitle**: Ketik teks baru
   - **Garis Penghubung**: Check/uncheck
   - **Kolom Grid**: Pilih dari dropdown (2/3/4)
   - **Teks Info**: Ketik teks baru

### Langkah 3: Preview
- Preview real-time tampil di sebelah kanan
- Lihat perubahan sebelum disimpan
- Pastikan tampilan sesuai keinginan

### Langkah 4: Simpan atau Batal
- **Simpan**: Klik "Simpan" untuk apply perubahan
- **Batal**: Klik "Batal" untuk discard perubahan
- **Reset**: Klik "Reset ke Default" untuk kembalikan ke setting awal

## Data Storage

### localStorage Key
```javascript
"structureConfig"
```

### Data Structure
```typescript
{
  id: "structure-config",
  leadershipTitle: string,
  leadershipSubtitle: string,
  showConnector: boolean,
  ministerGridCols: number,
  infoText: string,
  updatedAt: string (ISO date),
  updatedBy: string (admin name)
}
```

### Default Values
```javascript
{
  id: "structure-config",
  leadershipTitle: "Pimpinan Kabinet",
  leadershipSubtitle: "Presiden & Wakil Presiden",
  showConnector: true,
  ministerGridCols: 3,
  infoText: "Struktur organisasi berdasarkan data kabinet aktif",
  updatedAt: "2024-10-09T...",
  updatedBy: "Admin"
}
```

## Integration dengan Public Page

### StructureNew.tsx
```typescript
// Load config dari localStorage
const [structureConfig, setStructureConfig] = useState({...});

useEffect(() => {
  const savedConfig = localStorage.getItem("structureConfig");
  if (savedConfig) {
    setStructureConfig(JSON.parse(savedConfig));
  }
}, []);

// Gunakan config di render
<div className="font-bold">{structureConfig.leadershipTitle}</div>
<div className="text-sm">{structureConfig.leadershipSubtitle}</div>
```

## UI Components

### Admin Page (StructureManagement.tsx)

#### Layout
```
┌─────────────────────────────────────────┐
│  [← Kembali]  Kelola Struktur Org  [Edit]│
├─────────────────┬───────────────────────┤
│ Configuration   │      Preview          │
│                 │                       │
│ [Form Fields]   │  [Live Preview]       │
│                 │                       │
│ [Reset Button]  │  [Info Card]          │
│                 │                       │
│ Last Updated    │                       │
└─────────────────┴───────────────────────┘
```

#### Form Fields
- Input text untuk judul & subtitle
- Checkbox untuk connector
- Dropdown untuk grid columns
- Textarea untuk info text
- Button: Save, Cancel, Reset

#### Preview Section
- Real-time preview dengan data dummy
- Menampilkan persis seperti di public page
- Info card dengan catatan

### Public Page (StructureNew.tsx)

#### Tampilan
```
┌─────────────────────────────────────────┐
│         Hierarki Organisasi             │
├─────────────────────────────────────────┤
│                                         │
│      ┌─────────────────────┐           │
│      │  [Leadership Title] │ ← Gold    │
│      │   [Subtitle]        │           │
│      └─────────────────────┘           │
│               │ ← Connector             │
│      ┌────────┴────────┐               │
│      │                 │               │
│  ┌───▼───┐  ┌───▼───┐  ┌───▼───┐      │
│  │Menteri│  │Menteri│  │Menteri│ ← Blue│
│  └───────┘  └───────┘  └───────┘      │
│                                         │
│  [Info Text]                            │
└─────────────────────────────────────────┘
```

## Responsive Design

### Mobile (< 768px)
- Grid menteri: 2 kolom (fixed)
- Form: Full width
- Preview: Below form

### Tablet (768px - 1024px)
- Grid menteri: Sesuai config (2/3/4)
- Form & Preview: Side by side

### Desktop (> 1024px)
- Grid menteri: Sesuai config (2/3/4)
- Form & Preview: Side by side dengan max-width

## Validation & Error Handling

### Input Validation
- ✅ Judul tidak boleh kosong
- ✅ Subtitle tidak boleh kosong
- ✅ Grid columns harus 2-4
- ✅ Info text tidak boleh kosong

### Error Messages
- Toast notification untuk success/error
- Form validation sebelum save
- Fallback ke default jika data corrupt

## Security

### Access Control
- Route protected dengan `AdminOnlyRoute`
- Hanya admin yang bisa edit
- Public page read-only

### Data Integrity
- Validation sebelum save
- Backup config sebelum update
- Audit trail (updatedAt, updatedBy)

## Testing Checklist

- [ ] Admin bisa akses `/admin/structure`
- [ ] Non-admin tidak bisa akses
- [ ] Form edit berfungsi dengan baik
- [ ] Preview update real-time
- [ ] Save menyimpan ke localStorage
- [ ] Cancel discard perubahan
- [ ] Reset kembalikan ke default
- [ ] Public page load config dari localStorage
- [ ] Public page fallback ke default jika tidak ada config
- [ ] Responsive di semua ukuran layar
- [ ] Toast notification muncul
- [ ] Last updated info akurat

## Troubleshooting

### Config Tidak Tersimpan
- Check localStorage quota
- Check browser permissions
- Clear cache dan reload

### Preview Tidak Update
- Check React state management
- Verify tempConfig vs config
- Check useEffect dependencies

### Public Page Tidak Berubah
- Hard refresh (Ctrl+Shift+R)
- Check localStorage di browser DevTools
- Verify config key: "structureConfig"

## Future Enhancements

1. **Multiple Themes**: Pilihan warna untuk boxes
2. **Custom Icons**: Upload icon untuk pimpinan/menteri
3. **Animation**: Smooth transition saat expand/collapse
4. **Export**: Download organization chart sebagai image
5. **History**: Undo/redo changes
6. **Templates**: Pre-made templates untuk quick setup
7. **Multi-language**: Support bahasa Indonesia & Inggris

## API Documentation

### Save Config
```typescript
const saveConfig = (config: StructureConfig) => {
  localStorage.setItem("structureConfig", JSON.stringify(config));
};
```

### Load Config
```typescript
const loadConfig = (): StructureConfig | null => {
  const saved = localStorage.getItem("structureConfig");
  return saved ? JSON.parse(saved) : null;
};
```

### Reset Config
```typescript
const resetConfig = () => {
  const defaultConfig = { /* default values */ };
  localStorage.setItem("structureConfig", JSON.stringify(defaultConfig));
};
```

## Deployment Notes

- ✅ No database required (localStorage only)
- ✅ No API calls needed
- ✅ Works offline
- ✅ No external dependencies
- ✅ Backward compatible

## Support

Jika ada masalah atau pertanyaan:
1. Check dokumentasi ini
2. Check browser console untuk errors
3. Verify localStorage data
4. Contact developer team
