import { type FC, useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminTable from '../../components/admin/AdminTable';
import { getAllUsers } from '../../services/userManagementService';

interface User {
    [key: string]: unknown;
    id: number;
    username: string;
    email: string;
    status?: string;
}

const AdminUsers: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const fetchedUsers = await getAllUsers();
                setUsers(fetchedUsers || []);
                setError(null);
            } catch (err) {
                setError('Failed to load users');
                console.error('Error loading users:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        {
            key: 'status',
            label: 'Status',
            render: (_: unknown, row: Record<string, unknown>) => {
                const status = String(row.status || 'user');
                return (
                    <span className={`px-2 py-1 text-xs rounded ${
                        status === 'staff' || status === 'admin'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                    }`}>
                        {status}
                    </span>
                );
            },
        },
    ];

    if (loading) {
        return (
            <div className="flex h-screen bg-gray-100">
                <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading users...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen bg-gray-100">
                <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-600 font-semibold mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader
                    title="Users Management"
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
                        {users.length > 0 ? (
                            <AdminTable
                                columns={columns}
                                data={users as unknown as Record<string, unknown>[]}
                            />
                        ) : (
                            <div className="p-6 text-center text-gray-600">
                                No users found
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminUsers;
