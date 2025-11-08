import { type FC } from 'react';

interface BorrowConfirmationProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const BorrowConfirmation: FC<BorrowConfirmationProps> = ({ isOpen, onCancel, onConfirm }) => {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={isOpen ? onCancel : undefined}
                aria-hidden={!isOpen}
            />

            {/* Modal */}
            <div
                role="dialog"
                aria-modal="true"
                className={`fixed bottom-0.5 bg-white rounded-t-2xl p-6 z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-[110%]'}`}
            >
                <div className="flex flex-col items-center text-center">
                    {/* Illustration */}
                    <div className="w-32 h-32 mb-4">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V16M8 12H16" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                            <path d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z" stroke="#2563eb" strokeWidth="2" />
                            <circle cx="12" cy="12" r="8" stroke="#2563eb" strokeWidth="2" />
                        </svg>
                    </div>

                    <h3 className="text-xl font-semibold mb-2">Borrow this book now?</h3>
                    <p className="text-gray-600 text-sm mb-6">
                        Are you sure to borrow this book? Once you borrow, you must scan the QR to the librarian!
                    </p>

                    <div className="flex w-full gap-3">
                        <button
                            onClick={onCancel}
                            className="flex-1 py-3 px-6 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-3 px-6 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700"
                        >
                            Yes, borrow
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BorrowConfirmation;