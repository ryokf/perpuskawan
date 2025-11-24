# Admin Panel Documentation

## Overview
Halaman admin adalah panel manajemen lengkap yang hanya bisa diakses oleh staff/admin. Panel ini memungkinkan pengelolaan berbagai aspek perpustakaan.

## Struktur Admin Panel

### 1. **Routes yang Tersedia**

Tambahkan routes berikut ke file routing utama:

```tsx
// Import AdminRoute middleware
import AdminRoute from './middleware/AdminRoute';

// Import admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBooks from './pages/admin/AdminBooks';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCategories from './pages/admin/AdminCategories';
import AdminWriters from './pages/admin/AdminWriters';
import AdminLoans from './pages/admin/AdminLoans';
import AdminReservations from './pages/admin/AdminReservations';

// Routes:
<Route path="/admin" element={<AdminRoute Component={AdminDashboard} />} />
<Route path="/admin/books" element={<AdminRoute Component={AdminBooks} />} />
<Route path="/admin/users" element={<AdminRoute Component={AdminUsers} />} />
<Route path="/admin/categories" element={<AdminRoute Component={AdminCategories} />} />
<Route path="/admin/writers" element={<AdminRoute Component={AdminWriters} />} />
<Route path="/admin/loans" element={<AdminRoute Component={AdminLoans} />} />
<Route path="/admin/reservations" element={<AdminRoute Component={AdminReservations} />} />
```

### 2. **Komponen Admin**

#### AdminRoute (Middleware)
- Memeriksa apakah user sudah authenticated
- Memeriksa apakah user memiliki role 'staff' atau 'admin'
- Redirect ke home jika bukan staff
- Redirect ke login jika belum authenticated

#### AdminSidebar
- Sidebar navigasi dengan 7 menu utama
- Responsive (toggle di mobile)
- Active state untuk menu yang aktif
- Logout button di bawah

#### AdminHeader
- Header dengan judul dan deskripsi halaman
- Menu toggle button untuk mobile
- Notification dan settings button (placeholder)

#### AdminTable
- Reusable table component
- Mendukung custom render untuk setiap kolom
- Actions buttons (View, Edit, Delete)
- Loading state
- Empty state

### 3. **Halaman-halaman Admin**

#### Dashboard
- Menampilkan statistik ringkas:
  - Total Books
  - Active Users
  - Pending Loans
  - Reservations
- Recent Activity feed
- Quick overview of library metrics

#### Books Management
- List semua buku
- Add new book
- Edit book
- Delete book (dengan konfirmasi)
- Menampilkan availability status

#### Users Management
- List semua users
- Menampilkan user role
- User information (username, email, join date)

#### Categories Management
- Manage book categories
- Add/Edit/Delete categories
- Menampilkan jumlah buku per kategori

#### Writers Management
- Manage book writers/authors
- Add/Edit/Delete writers
- Menampilkan jumlah buku yang ditulis

#### Loans Management
- Monitor semua peminjaman buku
- Track borrow date dan due date
- Identify overdue loans
- Manage return process

#### Reservations Management
- Manage book reservations
- Track reservation status
- Pending dan Ready reservations

## Security Features

1. **AdminRoute Middleware**
   - Only accessible by staff/admin users
   - Redirects unauthorized users to home
   - Redirects unauthenticated users to login

2. **User Role System**
   - User types: 'user', 'staff', 'admin'
   - Stored in localStorage
   - Checked before accessing admin pages

## Implementation Details

### User Role Check
```typescript
// In authService.ts
const isStaff = (): boolean => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;
    
    try {
        const user = JSON.parse(userStr);
        return user.role === 'staff' || user.role === 'admin';
    } catch {
        return false;
    }
};
```

### Protected Routes
```tsx
// Usage
<Route path="/admin" element={<AdminRoute Component={AdminDashboard} />} />
```

## Future Enhancements

1. Add pagination to tables
2. Add search and filter functionality
3. Add sorting to table columns
4. Implement actual API calls
5. Add bulk actions (delete multiple items)
6. Add export to CSV/PDF
7. Add chart visualization
8. Add user activity logs
9. Add system settings page
10. Add audit trail

## Testing

To test admin access:
1. Login with a staff/admin account
2. Navigate to /admin
3. Confirm you can access all admin pages
4. Try to access admin pages with regular user account (should redirect)

## Notes

- All mock data is currently hardcoded
- API integration needed for real data
- Add proper error handling
- Add loading states for API calls
- Consider adding real-time updates
