import { useEffect } from 'react';

interface ToastProps {
    message: string;
    isVisible: boolean;
    duration?: number;
    onClose: () => void;
    type?: 'success' | 'error' | 'info';
}

function Toast({ message, isVisible, duration = 3000, onClose, type = 'success' }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const bgColor = type === 'success' ? 'bg-green-100' : type === 'error' ? 'bg-red-100' : 'bg-blue-100';
    const borderColor = type === 'success' ? 'border-green-500' : type === 'error' ? 'border-red-500' : 'border-blue-500';
    const textColor = type === 'success' ? 'text-green-700' : type === 'error' ? 'text-red-700' : 'text-blue-700';
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

    return (
        <div className={`w-10/12 fixed bottom-24 transform ${bgColor} ${borderColor} ${textColor} px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in`}>
            <span className="text-lg font-bold">{icon}</span>
            <span className="text-sm font-medium">{message}</span>
        </div>
    );
}

export default Toast;
