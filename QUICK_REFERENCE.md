# 📊 Perpuskawan Project - Quick Reference Guide

## 🎯 Quick Navigation

### Services Available
```
bookService.ts
├── getAllBooks()              → Book[]
├── fetchBookData(id, query)   → Book[]
└── getDetailBook(id)          → DetailBook | null

authService.ts
├── login(credentials)         → AuthResponse
├── register(data)             → AuthResponse
├── logout()                   → void
├── getToken()                 → string | null
├── isAuthenticated()          → boolean
└── isStaff()                  → boolean ← Check user.status === 'staff'

categoryService.ts
└── getAllCategories()         → Category[]

loanServices.ts
└── getLoansData()             → Loan[]
```

---

## 🏛️ Type Definitions

### Book Type (for lists/tables)
```typescript
type Book = {
  id: number;
  title: string;
  writer: { name: string };
  rating?: number;
  isAvailable: boolean;
  photo: string;
}
```

### DetailBook Type (for single book view)
```typescript
type DetailBook = Book & {
  description?: string;
  category: { id: number; category: string };
  language?: string;
  borrowedCount?: number;
  queueCount?: number;
}
```

### Auth Type
```typescript
type User = {
  id: number;
  username: string;
  email: string;
  status: 'user' | 'staff';  // ← Role untuk admin check
}

type AuthResponse = {
  success: boolean;
  message: string;
  data?: User;
}
```

---

## 🎨 Admin Pages (7 Total)

| Page | URL | Status | Data Source |
|------|-----|--------|-------------|
| Dashboard | /admin | ✅ | Mock data |
| Books | /admin/books | ✅ ⭐ | API `getAllBooks()` |
| Users | /admin/users | ✅ | Mock data |
| Categories | /admin/categories | ✅ | Mock data |
| Writers | /admin/writers | ✅ | Mock data |
| Loans | /admin/loans | ✅ | Mock data |
| Reservations | /admin/reservations | ✅ | Mock data |

⭐ = Newly integrated with real API data

---

## 🔄 Common Patterns

### Fetching Data in Admin Pages
```typescript
import { getAllBooks } from '../../services/bookService';
import type { Book } from '../../types/Book';

const [books, setBooks] = useState<Book[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const fetchBooks = async () => {
        try {
            const data = await getAllBooks();
            setBooks(data);
        } catch (err) {
            setError('Failed to load');
        } finally {
            setLoading(false);
        }
    };
    fetchBooks();
}, []);

// Then check: if (loading) { ... } else if (error) { ... }
```

### Custom Column Rendering
```typescript
const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    {
        key: 'writer',
        label: 'Writer',
        render: (_, row) => {
            const writer = row.writer as { name: string } | undefined;
            return writer?.name || '-';
        },
    },
];
```

### Delete with Confirmation
```typescript
const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
const [selectedBook, setSelectedBook] = useState<Book | null>(null);

const handleDeleteBook = (book) => {
    setSelectedBook(book);
    setShowDeleteConfirm(true);
};

const confirmDelete = () => {
    // TODO: Call API to delete
    setBooks(books.filter(b => b.id !== selectedBook?.id));
    setShowDeleteConfirm(false);
};

// Then: <ConfirmationModal isOpen={showDeleteConfirm} ... />
```

---

## 📱 Component Props Reference

### AdminTable
```typescript
interface AdminTableProps {
    columns: {
        key: string;
        label: string;
        render?: (value, row) => ReactNode;
    }[];
    data: Record<string, unknown>[];
    isLoading?: boolean;
    onEdit?: (row) => void;
    onDelete?: (row) => void;
    onView?: (row) => void;
}
```

### AdminSidebar
```typescript
interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}
```

### AdminHeader
```typescript
interface AdminHeaderProps {
    title: string;
    description?: string;
    onMenuClick: () => void;
}
```

### ConfirmationModal
```typescript
interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    isDangerous: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}
```

---

## 🛡️ Authentication Flow

```
1. User visits /login
2. LoginForm submits credentials
3. authService.login(credentials) called
4. API returns { token, user }
5. localStorage.setItem('authToken', token)
6. localStorage.setItem('user', JSON.stringify(user))
7. Redirect to home/dashboard
8. AdminRoute checks:
   - isAuthenticated() ✓
   - isStaff() ✓ (user.status === 'staff')
9. Access to admin panel granted
```

---

## 🚫 Common Mistakes to Avoid

### ❌ Wrong
```typescript
// ❌ Treating writer as string
<td>{book.writer}</td>  // Shows [object Object]

// ❌ Checking string status
isAuthenticated = user.role === 'admin'  // Wrong field

// ❌ Not handling optional writer
<td>{book.writer.name}</td>  // Crashes if undefined
```

### ✅ Correct
```typescript
// ✅ Access writer.name
<td>{book.writer?.name || '-'}</td>

// ✅ Check correct field
isStaff = user.status === 'staff'

// ✅ Safe access
{
    render: (_, row) => {
        const writer = row.writer as { name: string } | undefined;
        return writer?.name || '-';
    },
}
```

---

## 🔌 API Integration Checklist

### Current Implementation
- ✅ GET /books - Integrated
- ❌ POST /books - Not implemented
- ❌ PUT /books/{id} - Not implemented
- ❌ DELETE /books/{id} - Not implemented
- ✅ GET /auth/login - Integrated
- ✅ POST /auth/register - Integrated
- ✅ GET /books/{id} - Available in service

### To Complete CRUD:
```typescript
// Add to bookService.ts
async function createBook(data: BookInput): Promise<Book | null> {
    const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: { /* ... */ },
        body: JSON.stringify(data),
    });
    return response.ok ? response.json() : null;
}

async function updateBook(id: number, data: BookInput): Promise<Book | null> {
    const response = await fetch(`${API_URL}/books/${id}`, {
        method: 'PUT',
        headers: { /* ... */ },
        body: JSON.stringify(data),
    });
    return response.ok ? response.json() : null;
}

async function deleteBook(id: number): Promise<boolean> {
    const response = await fetch(`${API_URL}/books/${id}`, {
        method: 'DELETE',
        headers: { /* ... */ },
    });
    return response.ok;
}
```

---

## 📚 File Structure Reference

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminHeader.tsx      ← Page header
│   │   ├── AdminSidebar.tsx     ← Navigation (7 items)
│   │   └── AdminTable.tsx       ← Reusable table
│   ├── ChatPanel.tsx
│   ├── ConfirmationModal.tsx
│   ├── Toast.tsx
│   └── ...
├── pages/
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminBooks.tsx       ⭐ ← Recently integrated
│   │   ├── AdminUsers.tsx
│   │   ├── AdminCategories.tsx
│   │   ├── AdminWriters.tsx
│   │   ├── AdminLoans.tsx
│   │   └── AdminReservations.tsx
│   └── ...
├── services/
│   ├── authService.ts           ← Auth & role check
│   ├── bookService.ts           ⭐ ← Used by AdminBooks
│   ├── categoryService.ts
│   └── loanServices.ts
├── types/
│   ├── Auth.ts                  ← User type
│   ├── Book.ts                  ⭐ ← Book & DetailBook
│   └── Loan.ts
├── middleware/
│   ├── AdminRoute.tsx           ← Admin protection
│   ├── PrivateRoute.tsx
│   └── PublicRoute.tsx
└── config/
    └── apiUrl.ts
```

---

## 🎯 Development Tips

### Quick Admin Book Check
```typescript
// In AdminBooks.tsx
console.log('Books loaded:', books);
console.log('Sample writer:', books[0]?.writer);
console.log('Is available:', books[0]?.isAvailable);
```

### Test Column Rendering
```typescript
// Verify in browser DevTools
const row = { id: 1, writer: { name: 'John' }, isAvailable: true };
const writer = row.writer as { name: string } | undefined;
console.log(writer?.name);  // "John"
```

### Check Auth Status
```typescript
// In browser console
localStorage.getItem('user')           // View user object
JSON.parse(localStorage.getItem('user')).status  // Check role
```

---

## 🚀 Next Priority Tasks

### 1. Form Implementation (Week 1)
- [ ] Add/Edit book form validation
- [ ] Form state management
- [ ] Success/error toast notifications

### 2. API CRUD Operations (Week 1-2)
- [ ] POST /books implementation
- [ ] PUT /books/{id} implementation
- [ ] DELETE /books/{id} implementation
- [ ] Error handling & retry logic

### 3. Apply Pattern to Other Pages (Week 2)
- [ ] AdminUsers with user service
- [ ] AdminCategories with category service
- [ ] AdminWriters with writer service
- [ ] AdminLoans with loan service
- [ ] AdminReservations with reservation service

### 4. Table Enhancements (Week 3)
- [ ] Pagination
- [ ] Search/Filter
- [ ] Sorting
- [ ] Bulk select/delete

---

## 📞 Troubleshooting

### Admin page shows "No books found"
1. Check network in DevTools (Network tab)
2. Verify API endpoint is correct in `config/apiUrl.ts`
3. Check auth token in localStorage
4. Check console for error messages

### Writer shows as [object Object]
1. Verify writer.name is being accessed
2. Check custom render function in columns
3. Add console.log to debug

### Loading spinner never disappears
1. Check if API call is hanging
2. Verify error state (should show error message)
3. Check network timeout
4. Check browser console for errors

---

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| PROJECT_ANALYSIS.md | Complete project overview |
| ADMIN_BOOKS_INTEGRATION.md | Detailed AdminBooks guide |
| INTEGRATION_SUMMARY.md | Quick summary of changes |
| QUICK_REFERENCE.md | This file |

---

**Last Updated**: November 24, 2025
**Status**: ✅ Production Ready (Reads)
**Next Phase**: CRUD Operations Implementation
