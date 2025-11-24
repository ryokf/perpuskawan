import { type FC, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminTable from '../../components/admin/AdminTable';

interface User {
    [key: string]: unknown;
    id: number;
    username: string;
    email: string;
    role: string;
    joinDate: string;
}

const AdminUsers: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Mock data
    const [users] = useState<User[]>([
        { id: 1, username: 'john_doe', email: 'john@example.com', role: 'User', joinDate: '2024-01-15' },
        { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'User', joinDate: '2024-02-20' },
        { id: 3, username: 'admin_user', email: 'admin@example.com', role: 'Admin', joinDate: '2023-12-01' },
    ]);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        {
            key: 'role',
            label: 'Role',
            render: (_: unknown, row: Record<string, unknown>) => (
                <span className={`px-2 py-1 text-xs rounded ${
                    String(row.role) === 'Admin'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                }`}>
                    {String(row.role)}
                </span>
            ),
        },
        { key: 'joinDate', label: 'Join Date' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader
                    title="Users Management"
                    description="Manage all users in the library"
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Users List</h3>
                            <p className="text-sm text-gray-600">Total: {users.length} users</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm">
                        <AdminTable
                            columns={columns}
                            data={users as unknown as Record<string, unknown>[]}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminUsers;
