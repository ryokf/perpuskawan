import { type FC } from 'react';
import { useNavigate } from 'react-router';

interface BookResult {
    id: string;
    title: string;
    image: string;
    rating: number;
    availableBooks: number;
    category: string;
}

const SearchResultPage: FC = () => {
    const navigate = useNavigate();

    const searchResults: BookResult[] = [
        {
            id: '1',
            title: 'Fisika Kelas XI',
            image: 'https://picsum.photos/200/300',
            rating: 4.9,
            availableBooks: 6,
            category: 'Erlangga',
        },
        {
            id: '2',
            title: 'Fisika Teknik',
            image: 'https://picsum.photos/200/300',
            rating: 4.9,
            availableBooks: 4,
            category: 'Duniabaru',
        },
        {
            id: '3',
            title: 'Pengantar Fisika Modern',
            image: 'https://picsum.photos/200/300',
            rating: 4.9,
            availableBooks: 5,
            category: 'Duniabaru',
        },
        {
            id: '4',
            title: 'Fisika Dasar',
            image: 'https://picsum.photos/200/300',
            rating: 4.8,
            availableBooks: 3,
            category: 'Arisi',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
                <div className="flex items-center gap-3 px-4 py-3 max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 text-gray-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search books, writers, ISBN..."
                            className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <button className="p-2 -mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-20 pb-20 px-4 max-w-4xl mx-auto">
                <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
                    {searchResults.map((book) => (
                        <div
                            key={book.id}
                            onClick={() => navigate(`/book/${book.id}`)}
                            className="flex gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100"
                        >
                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-20 h-28 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{book.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">{book.category}</p>
                                <div className="flex items-center gap-1 mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-900">{book.rating}</span>
                                </div>
                                <p className="text-sm text-blue-600">{book.availableBooks} book available</p>
                            </div>
                            <button className="self-center p-2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default SearchResultPage;