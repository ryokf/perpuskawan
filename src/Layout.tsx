import { Outlet, Link, useLocation } from 'react-router';
import BottomNav from './components/BottomNav';

const Layout = () => {
    const { pathname } = useLocation();
    
    // Daftar menu untuk versi Desktop
    const navItems = [
        { name: 'Home', link: '/' },
        { name: 'Collections', link: '/collections' },
        { name: 'Library', link: '/library' },
        { name: 'Notifications', link: '/notifications' },
        { name: 'Profile', link: '/profile' }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header: Top Navbar untuk Desktop, Header Biasa untuk Mobile */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-5 py-4 flex items-center justify-between">
                    {/* Logo & Judul */}
                    <div className="flex items-center gap-3">
                        <img src="/Logo.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
                        <h1 className="text-xl md:text-2xl font-bold text-blue-600">Pinjam Buku</h1>
                    </div>
                    
                    {/* Menu Navigasi Desktop (Disembunyikan di Mobile) */}
                    <nav className="hidden md:flex gap-8">
                        {navItems.map((item) => {
                            const isActive = item.link === '/' ? pathname === '/' : pathname.startsWith(item.link);
                            return (
                                <Link 
                                    key={item.name} 
                                    to={item.link}
                                    className={`font-medium transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-500'}`}
                                >
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </header>

            {/* Area Konten Utama */}
            <div className="container mx-auto max-w-7xl">
                <Outlet />
            </div>

            <BottomNav />
        </div>
    )
}

export default Layout;