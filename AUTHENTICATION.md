# Authentication Middleware Documentation

## 📋 Analisis Keseluruhan Project

### Struktur Project
```
perpuskawan/
├── src/
│   ├── middleware/
│   │   ├── PrivateRoute.tsx       # Melindungi routes yang perlu auth
│   │   ├── PublicRoute.tsx        # Melindungi login/register dari user yang sudah auth
│   │   └── ProtectedRoutes.tsx    # Export semua protected routes
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── LibraryPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── NotificationPage.tsx
│   │   ├── BookDetailPage.tsx
│   │   ├── SearchResultPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── services/
│   │   ├── authService.ts         # Login, register, logout, token management
│   │   ├── bookService.ts
│   │   └── categoryService.ts
│   ├── types/
│   │   ├── Auth.ts                # User, AuthResponse types
│   │   └── Book.ts
│   ├── Layout.tsx                 # Main layout dengan BottomNav
│   └── main.tsx                   # Router dengan middleware
```

### Features yang Sudah Diimplementasikan

#### 1. **Authentication Service** (`authService.ts`)
- `login()` - Login user dan simpan token ke localStorage
- `register()` - Register user baru
- `logout()` - Hapus token dan user data
- `getToken()` - Ambil token dari localStorage
- `isAuthenticated()` - Check apakah user sudah login

#### 2. **Private Route Middleware** (`PrivateRoute.tsx`)
- Melindungi routes yang memerlukan authentication
- Redirect ke `/login` jika belum authenticated
- Digunakan untuk: Home, Library, Profile, Notifications, Book Detail, Search Result

#### 3. **Public Route Middleware** (`PublicRoute.tsx`)
- Melindungi login dan register pages
- Redirect ke `/` (home) jika sudah authenticated
- Digunakan untuk: Login, Register

#### 4. **Protected Routes** (`ProtectedRoutes.tsx`)
- Centralized export untuk semua protected dan public routes
- Memudahkan maintenance

## 🔒 Alur Keamanan

### Scenario 1: User Belum Login
```
1. User akses app → "/" 
2. PrivateRoute check: isAuthenticated()? 
3. Tidak authenticated → Redirect ke "/login"
4. User lihat login page
5. Setelah login sukses → Token disimpan di localStorage
6. Redirect ke "/" (home)
```

### Scenario 2: User Sudah Login
```
1. User akses "/" → PrivateRoute check authenticated
2. Already authenticated → Render HomePage
3. User bisa akses: library, profile, notifications, book detail, search
4. User akses "/login" → PublicRoute check authenticated
5. Already authenticated → Redirect ke "/" (home)
```

### Scenario 3: User Logout
```
1. User di halaman profile
2. Click tombol "Logout"
3. authService.logout() → Clear localStorage (authToken, user)
4. Redirect ke "/login"
5. User tidak bisa akses halaman protected lagi
```

## 📍 Protected Routes

### Halaman yang Memerlukan Login:
| Route | Page | Protection |
|-------|------|-----------|
| `/` | HomePage | ✓ PrivateRoute |
| `/library` | LibraryPage | ✓ PrivateRoute |
| `/profile` | ProfilePage | ✓ PrivateRoute |
| `/notifications` | NotificationPage | ✓ PrivateRoute |
| `/books/:id` | BookDetailPage | ✓ PrivateRoute |
| `/search` | SearchResultPage | ✓ PrivateRoute |

### Halaman yang Bisa Diakses Tanpa Login:
| Route | Page | Protection |
|-------|------|-----------|
| `/login` | LoginPage | ✓ PublicRoute (redirect ke home jika sudah login) |
| `/register` | RegisterPage | ✓ PublicRoute (redirect ke home jika sudah login) |

## 🔑 Token Management

### Penyimpanan Token
```typescript
// Di authService.ts saat login sukses
localStorage.setItem('authToken', token);
localStorage.setItem('user', JSON.stringify(userData));
```

### Penggunaan Token
```typescript
// Di bookService.ts, categoryService.ts
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Penghapusan Token
```typescript
// Di logout
localStorage.removeItem('authToken');
localStorage.removeItem('user');
```

## 🧪 Testing Checklist

### ✅ Sebelum Login
- [ ] Akses `/` → Redirect ke `/login`
- [ ] Akses `/library` → Redirect ke `/login`
- [ ] Akses `/profile` → Redirect ke `/login`
- [ ] Akses `/notifications` → Redirect ke `/login`
- [ ] Akses `/books/1` → Redirect ke `/login`
- [ ] Akses `/search` → Redirect ke `/login`
- [ ] Bisa akses `/login` ✓
- [ ] Bisa akses `/register` ✓

### ✅ Setelah Login
- [ ] Akses `/` → Render HomePage
- [ ] Akses `/library` → Render LibraryPage
- [ ] Akses `/profile` → Render ProfilePage
- [ ] Akses `/notifications` → Render NotificationPage
- [ ] Akses `/books/1` → Render BookDetailPage
- [ ] Akses `/search` → Render SearchResultPage
- [ ] Akses `/login` → Redirect ke `/`
- [ ] Akses `/register` → Redirect ke `/`

### ✅ Logout
- [ ] Click logout di profile page
- [ ] Token dihapus dari localStorage
- [ ] Redirect ke `/login`
- [ ] Tidak bisa akses halaman protected

## 📝 Code Examples

### Mengecek Auth Status
```typescript
import { isAuthenticated, getToken } from '../services/authService';

// Check if user authenticated
if (isAuthenticated()) {
  console.log('User sudah login');
  const token = getToken();
}
```

### Tambah Route Baru dengan Protection
```typescript
// File: middleware/ProtectedRoutes.tsx
export const ProtectedNewPage = () => <PrivateRoute Component={NewPage} />;

// File: main.tsx
{
  path: '/new-page',
  Component: ProtectedNewPage,
}
```

## 🔐 Security Notes

1. **Token Storage**: Token disimpan di localStorage - tidak ideal untuk production
   - Solusi untuk production: gunakan httpOnly cookies
   
2. **Token Expiration**: Backend harus validate token
   - Implementasi refresh token mechanism
   
3. **CORS**: Perhatikan CORS headers dari backend
   - ngrok-skip-browser-warning header sudah di-set

## 🚀 Next Steps (Optional)

1. Tambah "Remember Me" functionality
2. Implementasi token refresh
3. Tambah 2FA (Two-Factor Authentication)
4. Audit trail untuk login/logout
5. Session timeout mechanism
6. Rate limiting untuk login attempts
