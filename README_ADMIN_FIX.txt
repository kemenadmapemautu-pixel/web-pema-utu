╔══════════════════════════════════════════════════════════╗
║                                                          ║
║     🔧 FIX ADMIN LOGIN - PEMA UTU KABINET SAMGRAHITA    ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

PROBLEM: Akun admin tidak bisa login

Username: adminpemautu
Password: Luckystrike26

═══════════════════════════════════════════════════════════

🚀 SOLUSI TERCEPAT:

═══════════════════════════════════════════════════════════════

METODE 1: COPY-PASTE SCRIPT (RECOMMENDED!) ⭐⭐⭐⭐⭐
────────────────────────────────────────────────────────────

1. Buka halaman web app

2. Tekan F12 (buka console)

localStorage.clear();
localStorage.setItem('accounts', JSON.stringify([{
  id: "admin-001",
  username: "adminpemautu",
  password: "Luckystrike26",
  role: "admin",
  name: "Administrator",
  position: "Administrator",
  department: ""
}]));
localStorage.setItem('isAuthenticated', 'true');
localStorage.setItem('currentUser', JSON.stringify({
  username: "adminpemautu",
  name: "Administrator",
  role: "admin",
  id: "admin-001"
}));
location.reload();

DONE! ✅

═══════════════════════════════════════════════════════════

METODE 2: MANUAL LOGIN (STANDARD) ⭐⭐⭐
────────────────────────────────────────────────────────────

1. Tekan F12, paste di console:
   localStorage.clear();

2. Refresh page (F5)
3. Buka /login

4. Login:
   Username: adminpemautu
   Password: Luckystrike26

5. Setelah login, buka "Kelola Pengurus & Akun"

6. Klik "Populate Data Pengurus 2024-2025"

DONE! ✅

═══════════════════════════════════════════════════════════

⚠️  PENTING:

• Password CASE-SENSITIVE! (L harus kapital!)
• Username harus lowercase semua
• Jangan ada spasi

✅ BENAR:
   Username: adminpemautu
   Password: Luckystrike26

❌ SALAH:
   Password: luckystrike26  (L kecil)
   Password: LUCKYSTRIKE26  (semua kapital)
   Password: Luckystrike 26 (ada spasi)

═══════════════════════════════════════════════════════════

📁 FILE PENTING:

• FIX_ADMIN_LOGIN.md       → Console scripts & troubleshooting
• SECURITY_GUIDE.md       → Security best practices
• ADMIN_CREDENTIALS_UPDATE.md → Dokumentasi update

⚠️  reset-admin.html DEPRECATED (security risk!)

═══════════════════════════════════════════════════════════

🆘 MASIH TIDAK BISA?

1. Cek file: FIX_ADMIN_LOGIN.md
2. Gunakan metode 1 (reset utility)
3. Contact developer dengan screenshot

═══════════════════════════════════════════════════════════

Last Updated: 2025-10-10 08:25 WIB
Status: ✅ READY TO USE
