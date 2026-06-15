import { type FC, useState } from 'react';
import NotificationFilter from '../components/NotificationFilter';
import NotificationItem from '../components/NotificationItem';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    type: 'info' | 'success' | 'warning';
}

const NotificationPage: FC = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    // Sample data - replace with real data later
    const notifications: Notification[] = [
        {
            id: '1',
            title: 'Book Return Reminder',
            message: 'Your borrowed book "Sejarah Filsafat Barat" is due tomorrow. Please return it to avoid late fees.',
            time: '2 hours ago',
            isRead: false,
            type: 'warning'
        },
        {
            id: '2',
            title: 'Book Available',
            message: 'The book "Fisika Dasar" you requested is now available for borrowing.',
            time: '5 hours ago',
            isRead: true,
            type: 'success'
        },
        {
            id: '3',
            title: 'New Book Added',
            message: 'A new book "Pengantar Fisika Modern" has been added to our collection.',
            time: '1 day ago',
            isRead: true,
            type: 'info'
        }
    ];

    const filters = ['All', 'Unread', 'Read'];
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const getFilteredNotifications = () => {
        switch (activeFilter) {
            case 'Unread':
                return notifications.filter(n => !n.isRead);
            case 'Read':
                return notifications.filter(n => n.isRead);
            default:
                return notifications;
        }
    };

    return (
        <div className="min-h-screen bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Notifikasi</h1>
                    {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {unreadCount} Baru
                        </span>
                    )}
                </div>
                {unreadCount > 0 && (
                    <button className="text-xs text-blue-600 font-bold hover:text-blue-700 transition-colors cursor-pointer">
                        Tandai semua dibaca
                    </button>
                )}
            </div>

            <div className="mb-4">
                <NotificationFilter
                    filters={filters}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    unreadCount={unreadCount}
                />
            </div>

            <main className="space-y-3 pt-2">
                {getFilteredNotifications().map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        {...notification}
                    />
                ))}

                {getFilteredNotifications().length === 0 && (
                    <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <p className="text-sm text-gray-500 font-medium">Tidak ada notifikasi ditemukan</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default NotificationPage;