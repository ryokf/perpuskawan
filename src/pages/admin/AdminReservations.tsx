import { type FC, useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminTable from '../../components/admin/AdminTable';
import { getAllReservations } from '../../services/reservationService';

interface Reservation {
    [key: string]: unknown;
    id: number;
    user?: { username?: string };
    book?: { title?: string };
    reservation_date?: string;
    status?: string;
}

const AdminReservations: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true);
                const fetchedReservations = await getAllReservations();
                setReservations(fetchedReservations || []);
                setError(null);
            } catch (err) {
                setError('Failed to load reservations');
                console.error('Error loading reservations:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'ready':
                return 'bg-green-100 text-green-800';
            case 'cancel':
                return 'bg-red-100 text-red-800';
            case 'pending':
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        {
            key: 'user',
            label: 'User',
            render: (_: unknown, row: Record<string, unknown>) => {
                const user = row.user as Record<string, unknown> | undefined;
                const username = user?.username ? String(user.username) : 'Unknown User';
                return <span className="text-gray-900">{username}</span>;
            },
        },
        {
            key: 'book',
            label: 'Book Title',
            render: (_: unknown, row: Record<string, unknown>) => {
                const book = row.book as Record<string, unknown> | undefined;
                const title = book?.title ? String(book.title) : 'Unknown Book';
                return <span className="font-medium text-gray-900">{title}</span>;
            },
        },
        {
            key: 'reservation_date',
            label: 'Reservation Date',
            render: (_: unknown, row: Record<string, unknown>) => {
                const date = String(row.reservation_date || '-');
                return <span className="text-gray-600">{date.split('T')[0]}</span>;
            },
        },
        {
            key: 'status',
            label: 'Status',
            render: (_: unknown, row: Record<string, unknown>) => {
                const status = String(row.status || 'pending');
                return (
                    <span className={`px-2 py-1 text-xs rounded font-medium ${getStatusColor(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                );
            },
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
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
                                <p className="mt-4 text-gray-600">Loading reservations...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-red-900 font-semibold">Error Loading Reservations</h4>
                                    <p className="text-red-700 text-sm mt-1">{error}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setError(null);
                                        setLoading(true);
                                        const fetch = async () => {
                                            try {
                                                const data = await getAllReservations();
                                                setReservations(data || []);
                                                setError(null);
                                            } catch (err: unknown) {
                                                setError('Failed to load reservations: ' + String(err));
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
                    ) : reservations.length === 0 ? (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-gray-600 text-lg">No reservations found</p>
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminReservations;
