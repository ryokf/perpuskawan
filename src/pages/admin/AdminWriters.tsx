import { type FC, useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminTable from '../../components/admin/AdminTable';
import { getAllWriters } from '../../services/writerService';

interface Writer {
    [key: string]: unknown;
    id: number;
    name: string;
}

const AdminWriters: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [writers, setWriters] = useState<Writer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWriters = async () => {
            try {
                setLoading(true);
                const fetchedWriters = await getAllWriters();
                setWriters(fetchedWriters || []);
                setError(null);
            } catch (err) {
                setError('Failed to load writers');
                console.error('Error loading writers:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWriters();
    }, []);

    const columns = [
        { key: 'id', label: 'ID' },
        {
            key: 'name',
            label: 'Writer Name',
            render: (_: unknown, row: Record<string, unknown>) => {
                const writerName = String(row.name || 'Unknown');
                return <span className="font-medium text-gray-900">{writerName}</span>;
            },
        },
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
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
                                <p className="mt-4 text-gray-600">Loading writers...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-red-900 font-semibold">Error Loading Writers</h4>
                                    <p className="text-red-700 text-sm mt-1">{error}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setError(null);
                                        setLoading(true);
                                        const fetch = async () => {
                                            try {
                                                const data = await getAllWriters();
                                                setWriters(data || []);
                                                setError(null);
                                            } catch (err: unknown) {
                                                setError('Failed to load writers');
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
                    ) : writers.length === 0 ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <p className="text-gray-600 text-lg">No writers found</p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    + Add Writer
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
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
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminWriters;
