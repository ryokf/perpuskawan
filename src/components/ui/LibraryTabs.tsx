import { type FC } from 'react';

interface LibraryTabsProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const LibraryTabs: FC<LibraryTabsProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex bg-gray-100 rounded-lg">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors
            ${activeTab === tab
                            ? 'text-white bg-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default LibraryTabs;