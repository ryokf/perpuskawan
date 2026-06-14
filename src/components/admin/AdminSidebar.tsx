import { type FC } from 'react';
import { Link, useLocation } from 'react-router';

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const AdminSidebar: FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
    const location = useLocation();

    const menuItems = [
        { label: 'Dashboard', path: '/admin', icon: '📊' },
        { label: 'Books', path: '/admin/books', icon: '📚' },
        { label: 'Users', path: '/admin/users', icon: '👥' },
        { label: 'Categories', path: '/admin/categories', icon: '🏷️' },
        { label: 'Writers', path: '/admin/writers', icon: '✍️' },
        { label: 'Loans', path: '/admin/loans', icon: '📤' },
        { label: 'Reservations', path: '/admin/reservations', icon: '📋' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed right-0 top-0 h-full w-64 rounded-l-2xl bg-white transform transition-transform duration-300 z-40 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Admin</h1>
                    <p className="text-gray-400 text-sm mt-1">Pinjam Buku</p>
                </div>

                <nav className="mt-8">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                                isActive(item.path)
                                    ? 'bg-blue-600 border-l-4 border-blue-400 text-white'
                                    : 'hover:bg-gray-800'
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <button className="w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm font-medium">
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
