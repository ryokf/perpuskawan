import { type FC, useEffect, useState, useMemo } from 'react';
import LibraryTabs from '../components/LibraryTabs';
import BookListItem from '../components/BookListItem';
import getLoansData from '../services/loanServices';
import type { Loan } from '../types/Loan';

const LibraryPage: FC = () => {
    const [activeTab, setActiveTab] = useState('Saved list');
    const [books, setBooks] = useState<Loan[]>([]);
    const tabs = ['Saved list', 'On borrow', 'Returned'];

    // Sample data - replace with real data later
    const sample = useMemo(() => [
        {
            id: 1,
            bookId: 1,
            userId: 1,
            isDone: false,
            isLate: false,
            returnDate: '',
            photo: 'https://picsum.photos/200/300',
            isDamaged: false,
            book: {
                id: 1,
                title: 'Fisika Kelas XI',
                writer: {
                    name: 'Suhardi'
                },
                available: false,
                photo: 'https://picsum.photos/200/300',
                category: { id: 1, category: 'Science' },
                description: '',
                queueCount: 0,
                language: '',
                isAvailable: false,
                borrowedCount: 10
            }
        },
        {
            id: 2,
            bookId: 2,
            userId: 1,
            isDone: false,
            isLate: false,
            returnDate: '',
            photo: 'https://picsum.photos/200/301',
            isDamaged: false,
            book: {
                id: 2,
                title: 'Fisika Teknik',
                writer: {
                    name: 'Muhammad Arsyad'
                },
                available: true,
                photo: 'https://picsum.photos/200/301',
                category: { id: 1, category: 'Science' },
                description: '',
                queueCount: 0,
                language: '',
                isAvailable: true,
                borrowedCount: 15
            }
        },
        {
            id: 3,
            bookId: 3,
            userId: 1,
            isDone: false,
            isLate: false,
            returnDate: '',
            photo: 'https://picsum.photos/200/302',
            isDamaged: false,
            book: {
                id: 3,
                title: 'Pengantar Fisika Modern',
                writer: {
                    name: 'Prof.Dr.Tomo Djudin'
                },
                available: true,
                photo: 'https://picsum.photos/200/302',
                category: { id: 1, category: 'Science' },
                description: '',
                queueCount: 0,
                language: '',
                isAvailable: true,
                borrowedCount: 20
            }
        },
        {
            id: 4,
            bookId: 4,
            userId: 1,
            isDone: false,
            isLate: false,
            returnDate: '',
            photo: 'https://picsum.photos/200/303',
            isDamaged: false,
            book: {
                id: 4,
                title: 'Fisika Dasar',
                writer: {
                    name: 'Philip Kristanto'
                },
                available: true,
                photo: 'https://picsum.photos/200/303',
                category: { id: 1, category: 'Science' },
                description: '',
                queueCount: 0,
                language: '',
                isAvailable: true,
                borrowedCount: 25
            }
        }
    ], []);

    const fetchLoansData = async (activeTab: string) => {
        const data = await getLoansData()
        if(activeTab === 'On borrow') {
            const filteredData = data.filter((loan: Loan) => !loan.isDone);
            setBooks(filteredData);
            return;
        }
        if(activeTab === 'Returned') {
            const filteredData = data.filter((loan: Loan) => loan.isDone);
            setBooks(filteredData);
            return;
        }
        setBooks(data); // Replace sample with data from getLoansData when available
    }

    useEffect(() => {
        if (activeTab === 'On borrow' || activeTab === 'Returned') {
            fetchLoansData(activeTab);
        } else {
            // fetchLoansData();
            setBooks(sample);
        }
    }, [activeTab, sample]);

    console.log('Loans data in LibraryPage:', books);

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
                            {...book.book}
                            duedate={book.returnDate}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default LibraryPage;