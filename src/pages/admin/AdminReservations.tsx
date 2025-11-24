import { type FC, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminTable from '../../components/admin/AdminTable';

interface Reservation {
    [key: string]: unknown;
    id: number;
    username: string;
    bookTitle: string;
    reservationDate: string;
    status: string;
}

const AdminReservations: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [reservations] = useState<Reservation[]>([
        { id: 1, username: 'john_doe', bookTitle: 'The Hobbit', reservationDate: '2024-11-10', status: 'Pending' },
        { id: 2, username: 'jane_smith', bookTitle: 'The Lord of the Rings', reservationDate: '2024-11-12', status: 'Ready' },
        { id: 3, username: 'bob_johnson', bookTitle: 'Dune', reservationDate: '2024-11-08', status: 'Pending' },
    ]);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'username', label: 'User' },
        { key: 'bookTitle', label: 'Book Title' },
        { key: 'reservationDate', label: 'Reservation Date' },
        {
            key: 'status',
            label: 'Status',
            render: (_: unknown, row: Record<string, unknown>) => (
                <span className={`px-2 py-1 text-xs rounded ${
                    String(row.status) === 'Ready'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
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
                    title="Reservations Management"
                    description="Manage book reservations"
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Reservations List</h3>
                            <p className="text-sm text-gray-600">Total: {reservations.length} reservations</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm">
                        <AdminTable
                            columns={columns}
                            data={reservations as unknown as Record<string, unknown>[]}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminReservations;
