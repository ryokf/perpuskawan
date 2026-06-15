import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import BottomNav from './components/BottomNav';
import { logout } from './services/authService';

const Layout = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [pathname]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { 
            name: 'Home', 
            link: '/',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        { 
            name: 'Collections', 
            link: '/collections',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        { 
            name: 'Library', 
            link: '/library',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        { 
            name: 'Notifications', 
            link: '/notifications',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            )
        },
        { 
            name: 'Profile', 
            link: '/profile',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row">
            {/* Desktop Left Sidebar (Visible on md and up) */}
            <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-white border-r border-gray-200 z-50">
                {/* Branding */}
                <div className="px-6 py-6 border-b border-gray-100 flex items-center gap-3">
                    <img src="/Logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                    <div>
                        <h1 className="text-lg font-bold text-blue-600 leading-none">Pinjam Buku</h1>
                        <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Library Portal</span>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navItems.map((item) => {
                        const isActive = item.link === '/' ? pathname === '/' : pathname.startsWith(item.link);
                        return (
                            <Link
                                key={item.name}
                                to={item.link}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-600 shadow-sm font-semibold'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                }`}
                            >
                                <span className={isActive ? 'text-blue-600' : 'text-gray-400'}>
                                    {item.icon}
                                </span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info & Logout (Bottom of Sidebar) */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-3 px-2 py-2 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm shadow-inner uppercase">
                            {user?.name ? user.name.substring(0, 2) : 'US'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-sm font-semibold text-gray-800 truncate leading-tight">{user?.name || 'User Member'}</h2>
                            <p className="text-xs text-gray-400 truncate">{user?.email || 'member@perpus.com'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-xl text-sm font-medium text-red-600 bg-white hover:bg-red-50 hover:border-red-200 transition-all duration-200 cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout Portal
                    </button>
                </div>
            </aside>

            {/* Mobile View Layout (Visible under md breakpoint) */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Top Header */}
                <header className="md:hidden bg-white shadow-sm sticky top-0 z-50 px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/Logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                        <h1 className="text-xl font-bold text-blue-600">Pinjam Buku</h1>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
                    <Outlet />
                </main>

                <BottomNav />
            </div>
        </div>
    );
};

export default Layout;