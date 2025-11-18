import { type FC } from 'react';

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
}

const BookListItem: FC<BookListItemProps> = ({ title, writer, isAvailable, photo, duedate, category }) => {

    const isOverdue = duedate ? new Date(duedate) < new Date() : false;
    const formattedDueDate = duedate ? new Date(duedate).toLocaleDateString() : null;

    console.log(category)

    return (
        <div className="flex items-center gap-4 p-3 bg-white rounded-lg">
            <img
                src={photo}
                alt={title}
                className="w-20 aspect-3/4 object-cover rounded-md"
            />
            <div className="flex-1 min-w-0">
                <p className='text-xs text-blue-500 font-medium'>{category.category}</p>
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
                                    className="px-2 py-0.5 text-xs text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                                    disabled={!isAvailable}
                                >
                                    {isAvailable ? 'Borrow' : 'Notify Me'}
                                </button>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default BookListItem;