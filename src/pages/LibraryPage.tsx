import { type FC, useState } from 'react';
import LibraryTabs from '../components/ui/LibraryTabs';
import BookListItem from '../components/ui/BookListItem';

interface Book {
    id: string;
    title: string;
    author: string;
    rating: number;
    available: boolean;
    imageUrl: string;
}

const LibraryPage: FC = () => {
    const [activeTab, setActiveTab] = useState('Saved list');
    const tabs = ['Saved list', 'On borrow', 'Returned'];

    // Sample data - replace with real data later
    const books: Book[] = [
        {
            id: '1',
            title: 'Fisika Kelas XI',
            author: 'Ni Ketut Lasmi',
            rating: 4.9,
            available: true,
            imageUrl: 'https://picsum.photos/200/300'
        },
        {
            id: '2',
            title: 'Fisika Teknik',
            author: 'Muhammad Arsyad',
            rating: 4.9,
            available: true,
            imageUrl: 'https://picsum.photos/200/301'
        },
        {
            id: '3',
            title: 'Pengantar Fisika Modern',
            author: 'Prof.Dr.Tomo Djudin',
            rating: 4.9,
            available: true,
            imageUrl: 'https://picsum.photos/200/302'
        },
        {
            id: '4',
            title: 'Fisika Dasar',
            author: 'Philip Kristanto',
            rating: 4.8,
            available: true,
            imageUrl: 'https://picsum.photos/200/303'
        }
    ];

    return (
        <div className="min-h-screen">
            <div className="flex items-center justify-between px-5 pb-3">
                <h1 className="text-xl font-semibold">Library</h1>
                <button className="p-2 text-gray-600 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>

            <main className="container mx-auto px-4 pb-24">
                <LibraryTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
                <div className="space-y-3 mt-4">
                    {books.map((book) => (
                        <BookListItem
                            key={book.id}
                            {...book}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default LibraryPage;