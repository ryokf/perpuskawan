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
        <div className="min-h-screen bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Koleksi Saya</h1>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                    Wishlist Buku
                </span>
            </div>

            {books.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <p className="text-sm text-gray-500 font-medium">Belum ada buku yang disimpan.</p>
                    <p className="text-xs text-gray-400 mt-1">Simpan buku favorit Anda untuk mempermudah peminjaman nanti.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {books.map((book) => (
                        <BookListItem
                            key={book.id}
                            {...{ ...book.book, deletable: true }}
                            duedate={book.returnDate}
                            isCollectionItem={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CollectionPage;