import { type FC, useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminTable from '../../components/admin/AdminTable';
import { getAllLoans } from '../../services/loanServices';

interface Loan {
    [key: string]: unknown;
    id: number;
    user?: { username?: string };
    book?: { title?: string };
    loan_date?: string;
    return_date?: string;
    isDone?: boolean;
}

const AdminLoans: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                setLoading(true);
                const fetchedLoans = await getAllLoans();
                setLoans(fetchedLoans || []);
                setError(null);
            } catch (err) {
                setError('Failed to load loans');
                console.error('Error loading loans:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

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
            key: 'loan_date',
            label: 'Borrow Date',
            render: (_: unknown, row: Record<string, unknown>) => {
                const date = String(row.loan_date || '-');
                return <span className="text-gray-600">{date.split('T')[0]}</span>;
            },
        },
        {
            key: 'return_date',
            label: 'Due Date',
            render: (_: unknown, row: Record<string, unknown>) => {
                const date = String(row.return_date || '-');
                return <span className="text-gray-600">{date.split('T')[0]}</span>;
            },
        },
        {
            key: 'isDone',
            label: 'Status',
            render: (_: unknown, row: Record<string, unknown>) => {
                const isDone = row.isDone === true;
                const status = isDone ? 'Returned' : 'Active';
                return (
                    <span className={`px-2 py-1 text-xs rounded font-medium ${
                        isDone
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-green-100 text-green-800'
                    }`}>
                        {status}
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
                    title="Loans Management"
                    description="Manage book loans and returns"
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />

                <main className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
                                <p className="mt-4 text-gray-600">Loading loans...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-red-900 font-semibold">Error Loading Loans</h4>
                                    <p className="text-red-700 text-sm mt-1">{error}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setError(null);
                                        setLoading(true);
                                        const fetch = async () => {
                                            try {
                                                const data = await getAllLoans();
                                                setLoans(data || []);
                                                setError(null);
                                            } catch (err: unknown) {
                                                setError('Failed to load loans: ' + String(err));
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
                    ) : loans.length === 0 ? (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-gray-600 text-lg">No loans found</p>
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminLoans;
