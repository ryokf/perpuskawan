import { type FC, useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

interface BookListItemProps {
    id: number;
    title: string;
    writer?: {
        name: string;
    };
    isAvailable: boolean;
    photo: string;
    duedate?: string;
    category: {
        category: string
    };
    deletable?: boolean;
    isCollectionItem?: boolean;
}

const BookListItem: FC<BookListItemProps> = ({ id, title, writer, isAvailable, photo, duedate, category, deletable, isCollectionItem }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationType, setConfirmationType] = useState<'borrow' | 'cancel' | 'delete'>('borrow');

    const isOverdue = duedate ? new Date(duedate) < new Date() : false;
    const formattedDueDate = duedate ? new Date(duedate).toLocaleDateString() : null;

    const handleDeleteSavedBook = () => {
        const savedBooks = localStorage.getItem('savedBooks');
        if (savedBooks) {
            const books = JSON.parse(savedBooks);
            const filteredBooks = books.filter((item: { book: { id: number; }; }) => item.book.id !== id);
            localStorage.setItem('savedBooks', JSON.stringify(filteredBooks));
        }
        window.location.reload();
    }

    const handleDeleteClick = () => {
        setConfirmationType('delete');
        setShowConfirmation(true);
    }

    const handleConfirmDelete = () => {
        setShowConfirmation(false);
        handleDeleteSavedBook();
    }

    const buttonClickHandler = () => {
        setShowConfirmation(true);
        if (isCollectionItem) {
            setConfirmationType('borrow');
        } else {
            setConfirmationType('cancel');
        }
    }

    const handleConfirmAction = () => {
        setShowConfirmation(false);
        if (confirmationType === 'borrow') {
            // Handle borrow action
            console.log('Borrowing book:', title);
        } else if (confirmationType === 'cancel') {
            // Handle cancel action
            console.log('Canceling reservation for:', title);
        }
    }

    const getConfirmationProps = () => {
        switch (confirmationType) {
            case 'borrow':
                return {
                    title: 'Confirm Borrow',
                    message: `Do you want to borrow "${title}"?`,
                    confirmText: 'Borrow',
                    isDangerous: false
                };
            case 'cancel':
                return {
                    title: 'Cancel Reservation',
                    message: `Are you sure you want to cancel the reservation for "${title}"?`,
                    confirmText: 'Cancel Reservation',
                    isDangerous: true
                };
            case 'delete':
                return {
                    title: 'Delete Book',
                    message: `Are you sure you want to remove "${title}" from your collection?`,
                    confirmText: 'Delete',
                    isDangerous: true
                };
            default:
                return {
                    title: '',
                    message: '',
                    confirmText: 'Confirm',
                    isDangerous: false
                };
        }
    }

    const confirmationProps = getConfirmationProps();

    return (
        <>
            <a href={`/books/${id}`} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                <img
                    src={photo}
                    alt={title}
                    className="w-20 aspect-3/4 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                        <p className='text-xs text-blue-500 font-medium'>{category.category}</p>
                        {deletable && (
                            <button
                                className='text-sm text-gray-400 hover:text-gray-600 transition-colors'
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteClick();
                                }}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 truncate">{title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{writer?.name || 'Unknown Author'}</p>
                    {/* <div className="flex items-center my-2">
                        <span className="text-yellow-400 text-xs">⭐</span>
                        <span className="ml-1 text-xs font-medium">{rating}</span>
                    </div> */}
                    <div className="flex items-center justify-between mt-5">
                        {duedate
                            ? (

                                <span className={`text-xs ${isOverdue ? 'text-red-500' : 'text-gray-600'}`}>
                                    Due Date : {formattedDueDate || '-'}
                                </span>
                            )
                            : (
                                <div className="flex items-center gap-2 justify-between w-full">
                                    {
                                        isAvailable ? (
                                            <span className="text-xs text-green-500">
                                                Available
                                            </span>
                                        ) : (
                                            <span className="text-xs text-amber-500">
                                                Waiting for 2 person
                                            </span>
                                        )
                                    }
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            buttonClickHandler();
                                        }}
                                        className={`${isCollectionItem ? ' bg-blue-600  hover:bg-blue-700 ' : 'bg-red-500 hover:bg-red-600'} transition-colors px-2 py-0.5 text-xs text-white rounded-lg`}
                                    >
                                        {isCollectionItem ? 'Borrow' : 'Cancel'}
                                    </button>
                                </div>
                            )
                        }

                    </div>
                </div>
            </a>

            <ConfirmationModal
                isOpen={showConfirmation}
                title={confirmationProps.title}
                message={confirmationProps.message}
                confirmText={confirmationProps.confirmText}
                cancelText="Cancel"
                isDangerous={confirmationProps.isDangerous}
                onConfirm={confirmationType === 'delete' ? handleConfirmDelete : handleConfirmAction}
                onCancel={() => setShowConfirmation(false)}
            />
        </>
    );
};

export default BookListItem;