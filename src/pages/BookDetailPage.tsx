import { type FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import BookInfoItem from '../components/BookInfoItem';
import ReviewItem from '../components/ReviewItem';
import BorrowConfirmation from '../components/BorrowConfirmation';
import ChatPanel from '../components/ChatPanel';
import { getDetailBook } from '../services/bookService';
import type { DetailBook } from '../types/Book';
// import type { Book } from '../types/Book';
import SaveLibraryButton from '../components/SaveLibraryButton';
import { createLoan } from '../services/loanServices';
import { createReservation } from '../services/reservationService';

const BookDetailPage: FC = () => {
    const navigate = useNavigate();
    const [showBorrowConfirmation, setShowBorrowConfirmation] = useState(false);
    const [showChatPanel, setShowChatPanel] = useState(false);
    const [book, setBook] = useState<DetailBook | null>(null);
    const params = useParams();
    const bookId = Number(params.id); // Replace with actual book ID as needed

    const fetchBookDetail = async (bookId: number) => {
        const data = await getDetailBook(bookId);
        setBook(data);
    }

    useEffect(() => {
        // Assuming bookId is 1 for demonstration; replace with actual ID as needed
        fetchBookDetail(bookId);
    }, [bookId]);

    console.log('Book detail:', book);

    const handleBorrow = () => {
        setShowBorrowConfirmation(true);
    };

    const handleConfirmBorrow = async () => {
        // Handle borrow confirmation
        if (book) {
            if (book.isAvailable) {
                const result = await createLoan(book.id);
                if (result) {
                    alert('Book borrowed successfully!');
                } else {
                    alert('Failed to borrow the book. Please try again.');
                }
            }else{
                const result = await createReservation(book.id);
                if (result) {
                    alert('Book borrowed successfully!');
                } else {
                    alert('Failed to borrow the book. Please try again.');
                }
            }
        }
        setShowBorrowConfirmation(false);
    };

    const handleCancel = () => {
        setShowBorrowConfirmation(false);
    };

    return (
        <div className="min-h-screen bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            
            {/* Back Button / Page Header */}
            <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Kembali</span>
                </button>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                        Detail Buku
                    </span>
                </div>
            </div>

            {/* Split Grid Layout on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Left Column: Cover & Actions */}
                <div className="md:col-span-5 flex flex-col space-y-6">
                    {/* Book Cover */}
                    <div className="relative w-full aspect-[3/4] max-w-sm mx-auto bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shadow-md group hover:shadow-lg transition-shadow duration-300">
                        <img
                            src={book?.photo || 'https://via.placeholder.com/300x400?text=No+Image'}
                            alt={book?.title || "Book Cover"}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                    </div>

                    {/* Book Actions */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/50 space-y-3 shadow-sm">
                        <div className="flex gap-2">
                            {book && <SaveLibraryButton book={book} />}
                            <button
                                onClick={() => setShowChatPanel(true)}
                                className="flex-1 py-3 border border-blue-600 rounded-xl text-blue-600 font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Tanya AI
                            </button>
                        </div>
                        <button
                            onClick={handleBorrow}
                            className={`w-full py-3.5 rounded-xl font-bold text-sm shadow transition-all duration-200 cursor-pointer ${
                                book?.isAvailable
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                            }`}
                        >
                            {book?.isAvailable ? 'Pinjam Buku Sekarang' : 'Daftar Antrean'}
                        </button>
                    </div>
                </div>

                {/* Right Column: Metadata & Reviews */}
                <div className="md:col-span-7 flex flex-col space-y-6">
                    {/* Primary Info */}
                    <div>
                        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full tracking-wide">
                            {book?.category.category || 'Kategori'}
                        </span>
                        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                            {book?.title || 'Book Title'}
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                            {book?.description || "Deskripsi buku tidak tersedia."}
                        </p>
                    </div>

                    {/* Specifications Cards Grid */}
                    <div className="border-t border-gray-100 pt-6">
                        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Spesifikasi Buku</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <BookInfoItem label="Status Antrean" value={`${book?.queueCount == 0 ? "Tidak Ada" : `${book?.queueCount} Orang`}`} />
                            <BookInfoItem label="Dipinjam Oleh" value="240 Orang" />
                            <BookInfoItem label="Penulis" value={book?.writer?.name || "Anonim"} />
                            <BookInfoItem label="Bahasa" value={book?.language || "Indonesia"} />
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="border-t border-gray-100 pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-base font-bold text-gray-800 uppercase tracking-wider">Ulasan Pembaca</h2>
                                <p className="text-xs text-gray-400 mt-0.5">61 Ulasan (Sebagian besar positif)</p>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-100">
                            <ReviewItem
                                avatarUrl="https://i.pravatar.cc/150?u=jenny"
                                name="Jenny Lim"
                                rating={5}
                                date="August 15, 2024 08:20"
                                text="Aplikasi ini sangat membantu kegiatan membaca saya! Saya sangat menyukai pilihan bukunya..."
                            />
                            <ReviewItem
                                avatarUrl="https://i.pravatar.cc/150?u=michael"
                                name="Michael Liao"
                                rating={5}
                                date="August 15, 2024 11:45"
                                text="Pilihan bukunya lengkap dan proses peminjaman sangat cepat serta mudah. Rekomended!"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Borrow Confirmation Modal */}
            <BorrowConfirmation
                isBookAvailable={book?.isAvailable || false}
                queueCount={3}
                isOpen={showBorrowConfirmation}
                onConfirm={handleConfirmBorrow}
                onCancel={handleCancel}
            />

            {/* AI Chat Panel */}
            {book && (
                <ChatPanel
                    isOpen={showChatPanel}
                    onClose={() => setShowChatPanel(false)}
                    bookTitle={book.title}
                    bookAuthor={book.writer?.name}
                />
            )}
        </div>
    );
};

export default BookDetailPage;