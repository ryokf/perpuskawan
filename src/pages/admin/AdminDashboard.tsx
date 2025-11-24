import { type FC, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

const AdminDashboard: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const stats = [
        { label: 'Total Books', value: '1,234', icon: '📚', color: 'bg-blue-500' },
        { label: 'Active Users', value: '456', icon: '👥', color: 'bg-green-500' },
        { label: 'Pending Loans', value: '89', icon: '📤', color: 'bg-yellow-500' },
        { label: 'Reservations', value: '23', icon: '📋', color: 'bg-purple-500' },
    ];

    const recentActivities = [
        { id: 1, type: 'Loan', description: 'User "John Doe" borrowed "The Great Gatsby"', timestamp: '2 hours ago' },
        { id: 2, type: 'Reservation', description: 'User "Jane Smith" reserved "1984"', timestamp: '5 hours ago' },
        { id: 3, type: 'Return', description: 'User "Bob Johnson" returned "Pride and Prejudice"', timestamp: '1 day ago' },
        { id: 4, type: 'New Book', description: 'Admin added new book "To Kill a Mockingbird"', timestamp: '2 days ago' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader
                    title="Dashboard"
                    description="Welcome back to the admin panel"
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                            >
                                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4`}>
                                    {stat.icon}
                                </div>
                                <p className="text-gray-600 text-sm">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {recentActivities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                <span className={`inline-block px-2 py-1 text-xs rounded mr-2 ${
                                                    activity.type === 'Loan' ? 'bg-blue-100 text-blue-800' :
                                                    activity.type === 'Reservation' ? 'bg-purple-100 text-purple-800' :
                                                    activity.type === 'Return' ? 'bg-green-100 text-green-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {activity.type}
                                                </span>
                                            </p>
                                            <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                                        </div>
                                        <span className="text-xs text-gray-500">{activity.timestamp}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
