import { type FC, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminTable from '../../components/admin/AdminTable';

interface Loan {
    [key: string]: unknown;
    id: number;
    username: string;
    bookTitle: string;
    borrowDate: string;
    dueDate: string;
    status: string;
}

const AdminLoans: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [loans] = useState<Loan[]>([
        { id: 1, username: 'john_doe', bookTitle: 'The Great Gatsby', borrowDate: '2024-11-01', dueDate: '2024-11-15', status: 'Active' },
        { id: 2, username: 'jane_smith', bookTitle: '1984', borrowDate: '2024-11-05', dueDate: '2024-11-19', status: 'Active' },
        { id: 3, username: 'bob_johnson', bookTitle: 'Pride and Prejudice', borrowDate: '2024-10-01', dueDate: '2024-10-15', status: 'Overdue' },
    ]);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'username', label: 'User' },
        { key: 'bookTitle', label: 'Book Title' },
        { key: 'borrowDate', label: 'Borrow Date' },
        { key: 'dueDate', label: 'Due Date' },
        {
            key: 'status',
            label: 'Status',
            render: (_: unknown, row: Record<string, unknown>) => (
                <span className={`px-2 py-1 text-xs rounded ${
                    String(row.status) === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                }`}>
                    {String(row.status)}
                </span>
            ),
        },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader
                    title="Loans Management"
                    description="Manage book loans and returns"
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Loans List</h3>
                            <p className="text-sm text-gray-600">Total: {loans.length} loans</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm">
                        <AdminTable
                            columns={columns}
                            data={loans as unknown as Record<string, unknown>[]}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLoans;
