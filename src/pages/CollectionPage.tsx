import { type FC, useEffect, useState } from 'react';
import BookListItem from '../components/BookListItem';
import type { Loan } from '../types/Loan';

const CollectionPage: FC = () => {
    const [books, setBooks] = useState<Loan[]>([]);

    useEffect(() => {

        const data = localStorage.getItem('savedBooks');
        console.log('Retrieved savedBooks from localStorage:', JSON.parse(data || '[]'));
        setBooks(data ? JSON.parse(data) : []);

    }, []);

    return (
        <div className="min-h-screen">
            <div className="flex items-center justify-between px-5 pb-3">
                <h1 className="text-xl font-semibold">Collections</h1>
            </div>

            <main className="container mx-auto px-4 pb-24">
                {
                    books.length === 0 && (
                        <p className="text-center text-gray-500 mt-10">No books found in this section.</p>
                    )
                }
                <div className="space-y-3 mt-4">
                    {books.map((book) => (
                        <BookListItem
                            key={book.id}
                            {...{ ...book.book, deletable: true }}
                            duedate={book.returnDate}
                            isCollectionItem={true}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default CollectionPage;