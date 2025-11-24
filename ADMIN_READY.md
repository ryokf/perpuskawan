# Admin Panel Access Instructions

## ✅ Setup Selesai!

Halaman admin sekarang sudah bisa diakses melalui routes berikut:

### Admin Routes:
- `/admin` - Dashboard
- `/admin/books` - Books Management
- `/admin/users` - Users Management
- `/admin/categories` - Categories Management
- `/admin/writers` - Writers Management
- `/admin/loans` - Loans Management
- `/admin/reservations` - Reservations Management

## 🔐 Requirements untuk Akses:

1. **User harus login** dengan akun yang memiliki role `staff` atau `admin`
2. Jika belum login, akan redirect ke `/login`
3. Jika user biasa (role: `user`), akan redirect ke home page

## 🧪 Cara Testing:

### Opsi 1: Langsung Akses (Jika API Support)
1. Login dengan akun staff/admin
2. Buka di browser: `http://localhost:5173/admin`
3. Akan menampilkan Admin Dashboard

### Opsi 2: Manual Test (Untuk Development)
Jalankan di browser console saat sudah login:

```javascript
// Untuk test sebagai staff
const user = {
  id: 1,
  username: "staff_user",
  email: "staff@example.com",
  status: "active",
  role: "staff"
};
localStorage.setItem('user', JSON.stringify(user));
localStorage.setItem('authToken', 'dummy_token');

// Kemudian refresh page dan buka /admin
```

## 📋 Check List:

- ✅ AdminRoute middleware sudah dibuat
- ✅ Routes admin sudah ditambahkan ke router
- ✅ Admin pages (7 halaman) sudah dibuat
- ✅ Admin components (Sidebar, Header, Table) sudah dibuat
- ✅ isStaff() function sudah di authService
- ✅ User type sudah support role: 'staff' | 'admin'
- ✅ Security checks sudah implemented

## 🚀 Sekarang Anda Bisa:

1. ✅ Akses Dashboard Admin di `/admin`
2. ✅ Kelola Books di `/admin/books`
3. ✅ Kelola Users di `/admin/users`
4. ✅ Kelola Categories di `/admin/categories`
5. ✅ Kelola Writers di `/admin/writers`
6. ✅ Kelola Loans di `/admin/loans`
7. ✅ Kelola Reservations di `/admin/reservations`

## ⚠️ Catatan Penting:

- Admin panel hanya bisa diakses oleh staff/admin
- Semua data saat ini adalah mock data
- Perlu integrate dengan API untuk data real
- Error handling dan loading states perlu ditambahkan
- Validasi form perlu ditambahkan untuk create/edit forms

## 🔧 Troubleshooting:

### Halaman blank/error
- Check console untuk error messages
- Pastikan routes sudah ditambahkan ke main.tsx
- Verify imports sudah benar

### Redirect ke home saat akses admin
- Login sebagai staff/admin user
- Check localStorage untuk `user` object dengan role: "staff"

### Redirect ke login saat akses admin
- Pastikan sudah login
- Check localStorage untuk `authToken`

Semuanya sudah siap! Halaman admin sekarang bisa diakses! 🎉
