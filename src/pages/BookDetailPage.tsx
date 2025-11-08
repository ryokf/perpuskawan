import { type FC, useState } from 'react';
import { useNavigate } from 'react-router';
import BookInfoItem from '../components/BookInfoItem';
import ReviewItem from '../components/ReviewItem';
import BorrowConfirmation from '../components/BorrowConfirmation';

const BookDetailPage: FC = () => {
    const navigate = useNavigate();
    const [showBorrowConfirmation, setShowBorrowConfirmation] = useState(false);

    const handleBorrow = () => {
        setShowBorrowConfirmation(true);
    };

    const handleConfirmBorrow = () => {
        // Handle borrow confirmation
        setShowBorrowConfirmation(false);
    };

    const handleCancel = () => {
        setShowBorrowConfirmation(false);
    }; return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-10 bg-white">
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 text-gray-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="p-2 -mr-2 text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="pt-6 pb-24 px-5">
                {/* Book Cover */}
                <div className="relative aspect-3/4 overflow-hidden p-12  ">
                    <img
                        src="https://picsum.photos/800/600"
                        alt="Sejarah Filsafat Barat"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>

                {/* Book Info */}
                <div className="pb-6">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        Category
                    </span>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Sejarah Filsafat Barat
                    </h1>
                    <p className="text-gray-600 text-sm mb-6">
                        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </p>

                    {/* Book Details Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <BookInfoItem label="Queue" value="0 Person" />
                        <BookInfoItem label="Borrowed by" value="240 Person" />
                        <BookInfoItem label="Publisher" value="Erlangga" />
                        <BookInfoItem label="Writer" value="Sandra Cisneros" />
                        <BookInfoItem label="Language" value="Indonesia" />
                    </div>

                    <button className="text-blue-600 text-sm font-medium">
                        View more detail
                    </button>
                </div>

                {/* Reviews Section */}
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-lg font-semibold">Review</h2>
                            <p className="text-sm text-gray-500">61 (mostly good)</p>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        <ReviewItem
                            avatarUrl="https://i.pravatar.cc/150?u=jenny"
                            name="Jenny Lim"
                            rating={5}
                            date="August 15, 2024 08:20"
                            text="This app has been a game-changer for my reading habits! I love the wide selection of book..."
                        />
                        <ReviewItem
                            avatarUrl="https://i.pravatar.cc/150?u=michael"
                            name="Michael Liao"
                            rating={5}
                            date="August 15, 2024 11:45"
                            text="Great selection of books and an easy rental process. However, I wish there were more detail..."
                        />
                    </div>

                    <button className="mt-4 text-blue-600 text-sm font-medium">
                        View more comments
                    </button>
                </div>
            </main>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 rounded-t-xl shadow-[0_-8px_16px_rgba(0,0,0,0.06)]">
                <div className="grid grid-cols-6 gap-2">
                    <button className="flex-1 py-3 border border-blue-600 rounded-lg text-blue-600 font-medium">
                        Save
                    </button>
                    <button className="flex-1 py-3 border border-blue-600 rounded-lg text-blue-600 font-medium">
                        AI
                    </button>
                    <button
                        onClick={handleBorrow}
                        className="flex-1 py-3 bg-blue-600 rounded-lg text-white font-medium col-span-4">
                        Borrow now
                    </button>
                </div>
            </div>

            <BorrowConfirmation
                isOpen={showBorrowConfirmation}
                onConfirm={handleConfirmBorrow}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default BookDetailPage;