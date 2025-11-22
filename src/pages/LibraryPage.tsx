import { type FC, useEffect, useState} from 'react';
import LibraryTabs from '../components/LibraryTabs';
import BookListItem from '../components/BookListItem';
import getLoansData from '../services/loanServices';
import type { Loan } from '../types/Loan';

const LibraryPage: FC = () => {
    const [activeTab, setActiveTab] = useState('Saved list');
    const [books, setBooks] = useState<Loan[]>([]);
    const tabs = ['Saved list', 'On borrow', 'Returned'];

    const fetchLoansData = async (activeTab: string) => {
        const data = await getLoansData()
        if (activeTab === 'On borrow') {
            const filteredData = data.filter((loan: Loan) => !loan.isDone);
            setBooks(filteredData);
            return;
        }
        if (activeTab === 'Returned') {
            const filteredData = data.filter((loan: Loan) => loan.isDone);
            setBooks(filteredData);
            return;
        }
    }

    useEffect(() => {
        if (activeTab === 'On borrow' || activeTab === 'Returned') {
            fetchLoansData(activeTab);
        } else {
            const data = localStorage.getItem('savedBooks');
            console.log('Retrieved savedBooks from localStorage:', JSON.parse(data || '[]'));
            setBooks(data ? JSON.parse(data) : []);
        }
    }, [activeTab]);

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
                {
                    books.length === 0 && (
                        <p className="text-center text-gray-500 mt-10">No books found in this section.</p>
                    )
                }
                <div className="space-y-3 mt-4">
                    {books.map((book) => (
                        <BookListItem
                            key={book.id}
                            {...{...book.book, deletable: activeTab === 'Saved list' }}
                            duedate={book.returnDate}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default LibraryPage;