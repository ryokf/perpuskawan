# Admin Panel Setup Guide

## Integrasi Routes

Tambahkan routes berikut ke file routing utama Anda (misalnya `App.tsx` atau `main.tsx`):

```tsx
import AdminRoute from './middleware/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBooks from './pages/admin/AdminBooks';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCategories from './pages/admin/AdminCategories';
import AdminWriters from './pages/admin/AdminWriters';
import AdminLoans from './pages/admin/AdminLoans';
import AdminReservations from './pages/admin/AdminReservations';

// Add these to your router:
<Route path="/admin" element={<AdminRoute Component={AdminDashboard} />} />
<Route path="/admin/books" element={<AdminRoute Component={AdminBooks} />} />
<Route path="/admin/users" element={<AdminRoute Component={AdminUsers} />} />
<Route path="/admin/categories" element={<AdminRoute Component={AdminCategories} />} />
<Route path="/admin/writers" element={<AdminRoute Component={AdminWriters} />} />
<Route path="/admin/loans" element={<AdminRoute Component={AdminLoans} />} />
<Route path="/admin/reservations" element={<AdminRoute Component={AdminReservations} />} />
```

## Struktur File

```
src/
├── middleware/
│   └── AdminRoute.tsx (NEW - protects admin pages)
├── pages/
│   └── admin/
│       ├── AdminDashboard.tsx (NEW)
│       ├── AdminBooks.tsx (NEW)
│       ├── AdminUsers.tsx (NEW)
│       ├── AdminCategories.tsx (NEW)
│       ├── AdminWriters.tsx (NEW)
│       ├── AdminLoans.tsx (NEW)
│       └── AdminReservations.tsx (NEW)
└── components/
    └── admin/
        ├── AdminSidebar.tsx (NEW)
        ├── AdminHeader.tsx (NEW)
        ├── AdminTable.tsx (NEW)
        └── index.ts (NEW)
```

## Persyaratan Akses

1. User harus sudah authenticated
2. User harus memiliki role `staff` atau `admin`
3. Informasi role disimpan di localStorage di bawah key `user`
4. Object user harus memiliki field `role`

## Format User Object

```json
{
  "id": 1,
  "username": "admin_user",
  "email": "admin@example.com",
  "status": "active",
  "role": "admin"
}
```

atau

```json
{
  "id": 2,
  "username": "staff_user",
  "email": "staff@example.com",
  "status": "active",
  "role": "staff"
}
```

## Testing

### Untuk mengakses admin panel:

1. Login dengan akun yang memiliki role `staff` atau `admin`
2. Navigasi ke `http://localhost:5173/admin`
3. Seharusnya Anda akan melihat admin dashboard

### Untuk test pembatasan akses:

1. Login dengan akun regular user (role: `user`)
2. Navigasi ke `http://localhost:5173/admin`
3. Seharusnya akan redirect ke home page

## Fitur Admin Panel

### Dashboard
- Statistik ringkas (Total Books, Active Users, Pending Loans, Reservations)
- Recent Activity feed

### Books Management
- List semua buku
- Add new book
- Edit book
- Delete book (dengan konfirmasi)
- Status availability

### Users Management
- List semua users
- View user info (username, email, role, join date)

### Categories Management
- Manage kategori buku
- Add/Edit/Delete kategori
- View jumlah buku per kategori

### Writers Management
- Manage penulis/author
- Add/Edit/Delete writers
- View jumlah buku yang ditulis

### Loans Management
- Monitor semua peminjaman
- Track borrow date dan due date
- Identify overdue loans
- Manage return process

### Reservations Management
- Manage reservasi buku
- Track status reservasi
- Pending dan Ready reservations

## Komponen Reusable

### AdminTable
```tsx
<AdminTable
  columns={columns}
  data={data}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onView={handleView}
/>
```

Props:
- `columns`: Array of column definitions
- `data`: Array of data to display
- `isLoading`: Boolean
- `onEdit`: Callback function
- `onDelete`: Callback function
- `onView`: Callback function

## Next Steps

1. Integrate dengan API untuk real data
2. Add pagination dan filtering
3. Add search functionality
4. Implement bulk actions
5. Add export to CSV/PDF
6. Add chart visualizations
7. Add user activity logs
8. Add system settings
9. Add audit trail
10. Implement real-time updates

## Notes

- Semua data saat ini adalah mock data
- Perlu integrasi dengan API untuk data real
- Add error handling yang proper
- Add loading states untuk API calls
- Consider real-time updates menggunakan WebSocket

## Troubleshooting

### Admin page redirect ke home
- Check apakah user sudah login
- Check apakah user memiliki role `staff` atau `admin`
- Check localStorage untuk user object

### Blank dashboard
- Check console untuk errors
- Verify routes sudah ditambahkan dengan benar
- Ensure middleware AdminRoute sudah imported

### Table tidak menampilkan data
- Check format data sesuai dengan columns
- Verify columns definition benar
- Check render functions jika ada custom rendering
