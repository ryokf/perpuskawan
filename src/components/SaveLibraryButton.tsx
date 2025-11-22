import { useState } from 'react';
import type { DetailBook } from '../types/Book';
import Toast from './Toast';

function SaveLibraryButton({ book }: { book: DetailBook }  ) {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

    const handleSaveToLibrary = () => {
        const savedBooks = localStorage.getItem('savedBooks');
        const checkExisting = savedBooks ? JSON.parse(savedBooks).map((item: { book: { id: number } }) => item.book.id).includes(book.id) : false;
        if (checkExisting) {
            setToastMessage("Buku sudah ada di perpustakaan!");
            setToastType('error');
            setShowToast(true);
            return;
        }
        const books = savedBooks ? JSON.parse(savedBooks) : [];
        if (book) {
            books.push({"book": book});
            localStorage.setItem('savedBooks', JSON.stringify(books));
            setToastMessage('Buku berhasil disimpan!');
            setToastType('success');
            setShowToast(true);
        }
    }
    return (
        <>
            <button
                onClick={handleSaveToLibrary}
                className="flex-1 py-3 border border-blue-600 rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition-colors"
            >
                Save
            </button>
            <Toast 
                message={toastMessage} 
                isVisible={showToast} 
                onClose={() => setShowToast(false)}
                type={toastType}
            />
        </>
    )
}

export default SaveLibraryButton