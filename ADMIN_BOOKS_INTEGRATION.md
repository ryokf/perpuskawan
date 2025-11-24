# AdminBooks Integration Guide

## 📋 Overview

File `AdminBooks.tsx` telah diintegrasikan dengan:
- ✅ **Book Service** (`bookService.ts`) - Menggunakan `getAllBooks()`
- ✅ **Book Types** (`types/Book.ts`) - Menggunakan interface `Book` yang benar
- ✅ **Error & Loading States** - Handling untuk loading, error, dan empty states
- ✅ **Table Component** - Integration dengan `AdminTable` untuk rendering data

---

## 🔄 Data Integration

### Service Function
```typescript
// bookService.ts
getAllBooks(): Promise<Book[]>
```

### Data Type
```typescript
// types/Book.ts
interface Book {
  id: number;
  title: string;
  writer: { name: string };        // ⭐ Object, bukan string
  rating?: number;
  isAvailable: boolean;              // ⭐ Boolean, bukan string
  photo: string;
}
```

### Local Interface Extension
```typescript
// AdminBooks.tsx
interface AdminBook extends Book {
    available?: number;
    total?: number;
}
```

---

## 📊 State Management

| State | Type | Purpose |
|-------|------|---------|
| `sidebarOpen` | boolean | Sidebar visibility untuk mobile |
| `books` | AdminBook[] | Semua buku dari API |
| `loading` | boolean | Loading state saat fetch data |
| `error` | string \| null | Error message jika fetch gagal |
| `showModal` | boolean | Add/Edit modal visibility |
| `modalType` | 'add' \| 'edit' | Modal mode |
| `selectedBook` | AdminBook \| null | Book yang dipilih untuk edit/delete |
| `showDeleteConfirm` | boolean | Delete confirmation modal |

---

## 🎯 Kolom Tabel

### 1. ID
```typescript
{ key: 'id', label: 'ID' }
// Menampilkan: 1, 2, 3, ...
```

### 2. Title
```typescript
{ key: 'title', label: 'Title' }
// Menampilkan: "The Great Gatsby", "1984", ...
```

### 3. Writer (Custom Render)
```typescript
{
    key: 'writer',
    label: 'Writer',
    render: (_: unknown, row: Record<string, unknown>) => {
        const writer = row.writer as { name: string } | undefined;
        return writer?.name || '-';
    },
}
// Menampilkan: "F. Scott Fitzgerald", "George Orwell", ...
// Fallback: '-' jika writer tidak ada
```

### 4. Availability (Custom Render with Badge)
```typescript
{
    key: 'isAvailable',
    label: 'Availability',
    render: (_: unknown, row: Record<string, unknown>) => {
        const isAvailable = Boolean(row.isAvailable);
        return (
            <span className={`px-2 py-1 text-xs rounded font-medium ${
                isAvailable
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
            }`}>
                {isAvailable ? 'Available' : 'Not Available'}
            </span>
        );
    },
}
// Menampilkan: Green badge "Available" atau Red badge "Not Available"
```

---

## 🔁 Lifecycle Flow

### 1. Component Mount
```typescript
useEffect(() => {
    const fetchBooks = async () => {
        // ...
    };
    fetchBooks();
}, []);
```

### 2. Fetch Books
```
Start: setLoading(true)
   ↓
getAllBooks() from API
   ↓
Response: Book[]
   ↓
Success: setBooks(data), setError(null)
   ↓
Error: setError(message)
   ↓
Finally: setLoading(false)
```

### 3. Render States

#### Loading State
```typescript
if (loading) {
    return <LoadingSpinner />;
}
```

#### Error State
```typescript
if (error) {
    return <ErrorMessage />;
}
```

#### Success State
```typescript
return (
    <div>
        <Header />
        {books.length > 0 ? <AdminTable /> : <NoDataMessage />}
    </div>
);
```

---

## 🎨 UI Components Used

### AdminSidebar
- Props: `isOpen`, `onClose`
- Shows: 7 menu items dengan navigation
- Mobile: Toggleable sidebar dengan overlay

### AdminHeader
- Props: `title`, `onMenuClick`
- Shows: Page title dan menu toggle button
- Sticky: Tetap di atas saat scroll

### AdminTable
- Props: `columns`, `data`, `onEdit`, `onDelete`
- Features: Custom column rendering, action buttons
- Responsive: Horizontal scroll untuk data besar

### ConfirmationModal
- Props: `isOpen`, `title`, `message`, `confirmText`, `isDangerous`, `onConfirm`, `onCancel`
- Styling: Red badge untuk dangerous actions
- Shows: Sebelum melakukan delete

---

## 🔧 Handler Functions

### handleAddBook()
```typescript
setModalType('add');
setSelectedBook(null);
setShowModal(true);
```
→ Membuka modal untuk add book baru

### handleEditBook(book)
```typescript
setModalType('edit');
setSelectedBook(book);
setShowModal(true);
```
→ Membuka modal untuk edit book

### handleDeleteBook(book)
```typescript
setSelectedBook(book);
setShowDeleteConfirm(true);
```
→ Membuka confirmation modal untuk delete

### confirmDelete()
```typescript
setBooks(books.filter(b => b.id !== selectedBook.id));
setShowDeleteConfirm(false);
```
→ Hapus book dari state (future: call API)

### handleSaveBook()
```typescript
setShowModal(false);
```
→ Placeholder untuk save logic (future: call API)

---

## 📱 Responsive Behavior

### Desktop (md: 768px+)
- Sidebar: Selalu visible
- Layout: Horizontal dengan sidebar di kiri
- Table: Full width

### Mobile (< 768px)
- Sidebar: Hidden dengan overlay
- Toggle: Menu button di header
- Layout: Stack vertikal

---

## ⚠️ Error Handling

### API Error
```typescript
try {
    const fetchedBooks = await getAllBooks();
    setBooks(fetchedBooks as AdminBook[]);
} catch (err) {
    setError('Failed to load books');
}
```

### Empty State
```typescript
{books.length > 0 ? <AdminTable /> : <div>No books found</div>}
```

### Fallback Values
```typescript
// Writer fallback
writer?.name || '-'

// Availability fallback
Boolean(row.isAvailable)
```

---

## 🚀 Future Improvements

### 1. API Integration untuk Add/Edit/Delete
```typescript
// Current: Local state manipulation
setBooks(books.filter(b => b.id !== selectedBook.id));

// Future: API call
const response = await deleteBook(selectedBook.id);
if (response.success) {
    setBooks(books.filter(b => b.id !== selectedBook.id));
}
```

### 2. Form Validation
```typescript
// Validate before saving
if (!formData.title.trim()) {
    setError('Title is required');
    return;
}
```

### 3. Pagination
```typescript
// Limit items per page
const ITEMS_PER_PAGE = 10;
const paginatedBooks = books.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
```

### 4. Search & Filter
```typescript
const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
);
```

### 5. Bulk Operations
```typescript
// Select multiple books
const [selectedIds, setSelectedIds] = useState<number[]>([]);
// Bulk delete
await Promise.all(selectedIds.map(id => deleteBook(id)));
```

---

## ✅ Type Safety Checklist

- ✅ Using proper `Book` interface from `types/Book.ts`
- ✅ `writer` typed as `{ name: string } | undefined`
- ✅ `isAvailable` typed as `boolean`
- ✅ Custom render functions with proper typing
- ✅ Record<string, unknown> for polymorphic table data
- ✅ Type casting dengan `as` operator

---

## 📚 Related Files

| File | Purpose |
|------|---------|
| `services/bookService.ts` | API calls untuk books |
| `types/Book.ts` | Book type definitions |
| `components/admin/AdminTable.tsx` | Reusable table component |
| `components/admin/AdminSidebar.tsx` | Navigation sidebar |
| `components/admin/AdminHeader.tsx` | Page header |
| `components/ConfirmationModal.tsx` | Confirmation dialog |

---

## 🔗 API Reference

### GET /books
```
Request:
GET /books
Authorization: Bearer {token}

Response:
[
    {
        id: 1,
        title: "The Great Gatsby",
        writer: { name: "F. Scott Fitzgerald" },
        rating: 4.5,
        isAvailable: true,
        photo: "..."
    },
    ...
]
```

---

**Last Updated**: November 24, 2025
**Status**: ✅ Fully Integrated with Book Service and Types
