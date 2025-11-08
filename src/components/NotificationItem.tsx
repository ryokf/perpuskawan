import { type FC } from 'react';

interface NotificationItemProps {
    id: string;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    type: 'info' | 'success' | 'warning';
}

const NotificationItem: FC<NotificationItemProps> = ({ title, message, time, isRead, type }) => {
    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200';
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    const getIconByType = () => {
        switch (type) {
            case 'success':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                );
            default:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    return (
        <div className={`p-4 border rounded-lg mb-3 ${getTypeStyles()} ${!isRead ? 'border-l-4' : ''}`}>
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                    {getIconByType()}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium ${!isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                        {title}
                    </h3>
                    <p className={`mt-1 text-sm ${!isRead ? 'text-gray-800' : 'text-gray-500'}`}>
                        {message}
                    </p>
                    <span className="mt-2 text-xs text-gray-500">{time}</span>
                </div>
            </div>
        </div>
    );
};

export default NotificationItem;