import { type FC, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminTable from '../../components/admin/AdminTable';
import ConfirmationModal from '../../components/ConfirmationModal';

interface Book {
    id: number;
    title: string;
    writer: string;
    category: string;
    available: number;
    total: number;
}

const AdminBooks: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'add' | 'edit'>('add');
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Mock data
    const [books, setBooks] = useState<Book[]>([
        { id: 1, title: 'The Great Gatsby', writer: 'F. Scott Fitzgerald', category: 'Fiction', available: 5, total: 10 },
        { id: 2, title: '1984', writer: 'George Orwell', category: 'Dystopian', available: 3, total: 8 },
        { id: 3, title: 'To Kill a Mockingbird', writer: 'Harper Lee', category: 'Fiction', available: 7, total: 10 },
    ]);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'title', label: 'Title' },
        { key: 'writer', label: 'Writer' },
        { key: 'category', label: 'Category' },
        {
            key: 'available',
            label: 'Availability',
            render: (_: unknown, row: Record<string, unknown>) => {
                const available = String(row.available);
                const total = String(row.total);
                return (
                    <span className={`px-2 py-1 text-xs rounded ${
                        Number(row.available) > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {available}/{total}
                    </span>
                );
            },
        },
    ];

    const handleAddBook = () => {
        setModalType('add');
        setSelectedBook(null);
        setShowModal(true);
    };

    const handleEditBook = (book: Record<string, unknown>) => {
        setModalType('edit');
        setSelectedBook(book as unknown as Book);
        setShowModal(true);
    };

    const handleDeleteBook = (book: Record<string, unknown>) => {
        setSelectedBook(book as unknown as Book);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        if (selectedBook) {
            setBooks(books.filter(b => b.id !== selectedBook.id));
        }
        setShowDeleteConfirm(false);
    };

    const handleSaveBook = () => {
        setShowModal(false);
        // Handle save logic
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader
                    title="Books Management"
                    description="Manage all books in the library"
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />

                <main className="flex-1 overflow-y-auto p-6">
                    {/* Header with Add Button */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Books List</h3>
                            <p className="text-sm text-gray-600">Total: {books.length} books</p>
                        </div>
                        <button
                            onClick={handleAddBook}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            + Add Book
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <AdminTable
                            columns={columns}
                            data={books as unknown as Record<string, unknown>[]}
                            onEdit={handleEditBook}
                            onDelete={handleDeleteBook}
                        />
                    </div>
                </main>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteConfirm}
                title="Delete Book"
                message={`Are you sure you want to delete "${selectedBook?.title}"? This action cannot be undone.`}
                confirmText="Delete"
                isDangerous={true}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteConfirm(false)}
            />

            {/* Add/Edit Modal - Placeholder */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            {modalType === 'add' ? 'Add New Book' : 'Edit Book'}
                        </h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Book Title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <input
                                type="text"
                                placeholder="Writer Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                                <option>Select Category</option>
                                <option>Fiction</option>
                                <option>Non-Fiction</option>
                                <option>Science</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Total Copies"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveBook}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBooks;
