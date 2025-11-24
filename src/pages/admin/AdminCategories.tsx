import { type FC, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminTable from '../../components/admin/AdminTable';

interface Category {
    [key: string]: unknown;
    id: number;
    name: string;
    bookCount: number;
}

const AdminCategories: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [categories] = useState<Category[]>([
        { id: 1, name: 'Fiction', bookCount: 156 },
        { id: 2, name: 'Non-Fiction', bookCount: 89 },
        { id: 3, name: 'Science', bookCount: 45 },
        { id: 4, name: 'History', bookCount: 67 },
    ]);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Category Name' },
        { key: 'bookCount', label: 'Books Count' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader
                    title="Categories Management"
                    description="Manage book categories"
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Categories List</h3>
                            <p className="text-sm text-gray-600">Total: {categories.length} categories</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            + Add Category
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm">
                        <AdminTable
                            columns={columns}
                            data={categories as unknown as Record<string, unknown>[]}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminCategories;
