import { type FC, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminTable from '../../components/admin/AdminTable';

interface Writer {
    [key: string]: unknown;
    id: number;
    name: string;
    bookCount: number;
    country: string;
}

const AdminWriters: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [writers] = useState<Writer[]>([
        { id: 1, name: 'F. Scott Fitzgerald', bookCount: 12, country: 'USA' },
        { id: 2, name: 'George Orwell', bookCount: 8, country: 'UK' },
        { id: 3, name: 'Harper Lee', bookCount: 5, country: 'USA' },
        { id: 4, name: 'Jane Austen', bookCount: 6, country: 'UK' },
    ]);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Writer Name' },
        { key: 'country', label: 'Country' },
        { key: 'bookCount', label: 'Books Published' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader
                    title="Writers Management"
                    description="Manage book writers/authors"
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Writers List</h3>
                            <p className="text-sm text-gray-600">Total: {writers.length} writers</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            + Add Writer
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm">
                        <AdminTable
                            columns={columns}
                            data={writers as unknown as Record<string, unknown>[]}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminWriters;
