import { type FC } from 'react';

interface BorrowConfirmationProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    isBookAvailable: boolean;
    queueCount: number;
}

const BorrowConfirmation: FC<BorrowConfirmationProps> = ({ isOpen, onCancel, onConfirm, isBookAvailable, queueCount }) => {
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
                className={`fixed bottom-0.5 left-0 right-0 max-w-md mx-auto bg-white rounded-t-2xl p-6 z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-[110%]'}`}
            >
                <div className="flex flex-col items-center text-center">
                    {/* Illustration */}
                    <div className="w-32 h-32 mb-4">
                        {
                            isBookAvailable ? (
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19M5 12H19" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z" stroke="#2563eb" strokeWidth="2" />
                                    <circle cx="12" cy="12" r="8" stroke="#2563eb" strokeWidth="2" />   
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 8L16 12M16 12L12 16M16 12L8 12M8 12L12 8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z" stroke="#f59e0b" strokeWidth="2" />
                                    <circle cx="12" cy="12" r="8" stroke="#f59e0b" strokeWidth="2" />
                                </svg>
                            )
                        }
                    </div>

                    {isBookAvailable ? (
                        <h3 className="text-xl font-semibold mb-2">Borrow this book now?</h3>
                    ) : (
                        <h3 className="text-xl font-semibold mb-2">Register to the queue?</h3>
                    )}


                    <p className="text-gray-600 text-sm mb-6">
                        {isBookAvailable
                            ? "You can borrow this book immediately. Do you want to proceed?"
                            : `There are currently ${queueCount} people in the queue. Do you want to register?`}
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
                            className={`flex-1 py-3 px-6 rounded-lg font-medium text-white ${isBookAvailable ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-400 hover:bg-amber-500'}`}
                        >
                            Yes, {isBookAvailable ? 'Borrow' : 'Register'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BorrowConfirmation;