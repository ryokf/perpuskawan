import { type FC } from 'react';

const SearchBar: FC = () => {
    return (
        <div className="relative flex-1 max-w-2xl border border-gray-400 rounded-full overflow-hidden">
            <input
                type="text"
                placeholder="Search any books"
                className="w-full py-2 pl-10 pr-4 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute w-5 h-5 text-gray-400 left-3 top-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </div>
    );
};

export default SearchBar;