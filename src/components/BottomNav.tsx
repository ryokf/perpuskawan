import { type FC, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router';

interface NavItem {
    name: string;
    link: string
    icon: ReactNode;
    active: boolean;
}
const BottomNav: FC = () => {
    const navItems: NavItem[] = [
        {
            name: 'Home',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            link: '/',
            active: true
        },
        {
            name: 'Library',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            link: '/library',
            active: false
        },
        {
            name: 'Notification',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            ),
            link: '/notifications',
            active: false
        },
        {
            name: 'Profile',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            link: '/profile',
            active: false
        }
    ];
    const { pathname } = useLocation();

    return (
        <nav className="rounded-full mx-4 mb-2 fixed bottom-0 left-0 right-0 bg-white shadow-md z-[9999]" style={{ boxShadow: '0 0 8px rgba(0,0,0,0.15)' }}>
            <div className="flex items-center justify-around">
                {navItems.map((item) => {
                    const active = item.link === '/' ? pathname === '/' : pathname.startsWith(item.link);
                    return (
                        <Link
                            to={item.link}
                            key={item.name}
                            className="flex flex-col items-center py-3 px-5"
                        >
                            <div className={active ? 'text-blue-600' : 'text-gray-400'}>
                                {item.icon}
                            </div>
                            <span className={`mt-1 text-xs ${active ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;