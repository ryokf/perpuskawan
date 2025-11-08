import { type FC } from 'react';

interface NotificationFilterProps {
    filters: string[];
    activeFilter: string;
    onFilterChange: (filter: string) => void;
    unreadCount?: number;
}

const NotificationFilter: FC<NotificationFilterProps> = ({
    filters,
    activeFilter,
    onFilterChange,
    unreadCount
}) => {
    return (
        <div className="flex items-center gap-4 border-b mt-2">
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onFilterChange(filter)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${activeFilter === filter
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    {filter}
                    {filter === 'All' && unreadCount && unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                            {unreadCount}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default NotificationFilter;