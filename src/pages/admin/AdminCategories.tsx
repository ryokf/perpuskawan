import { type FC, useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminTable from '../../components/admin/AdminTable';
import { getAllCategories } from '../../services/categoryService';

interface Category {
    [key: string]: unknown;
    id: number;
    category?: string;
    name?: string;
}

const AdminCategories: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const fetchedCategories = await getAllCategories();
                setCategories(fetchedCategories || []);
                setError(null);
            } catch (err) {
                setError('Failed to load categories');
                console.error('Error loading categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const columns = [
        { key: 'id', label: 'ID' },
        {
            key: 'category',
            label: 'Category Name',
            render: (_: unknown, row: Record<string, unknown>) => {
                const categoryName = String(row.category || row.name || 'Unknown');
                return <span className="font-medium text-gray-900">{categoryName}</span>;
            },
        },
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
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
                                <p className="mt-4 text-gray-600">Loading categories...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-red-900 font-semibold">Error Loading Categories</h4>
                                    <p className="text-red-700 text-sm mt-1">{error}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setError(null);
                                        setLoading(true);
                                        const fetch = async () => {
                                            try {
                                                const data = await getAllCategories();
                                                setCategories(data || []);
                                                setError(null);
                                            } catch (err: unknown) {
                                                setError('Failed to load categories: ' + String(err));
                                            } finally {
                                                setLoading(false);
                                            }
                                        };
                                        fetch();
                                    }}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium"
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <p className="text-gray-600 text-lg">No categories found</p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    + Add Category
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminCategories;
