import { type FC } from 'react';

interface BookListItemProps {
    id: string;
    title: string;
    author: string;
    rating: number;
    available: boolean;
    imageUrl: string;
}   

const BookListItem: FC<BookListItemProps> = ({ title, author, rating, available, imageUrl }) => {
    return (
        <div className="flex items-center gap-4 p-3 bg-white rounded-lg">
            <img
                src={imageUrl}
                alt={title}
                className="w-20 aspect-3/4 object-cover rounded-md"
            />
            <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{author}</p>
                <div className="flex items-center my-2">
                    <span className="text-yellow-400 text-xs">⭐</span>
                    <span className="ml-1 text-xs font-medium">{rating}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className={`text-sm ${available ? 'text-blue-600' : 'text-gray-500'}`}>
                        {available ? 'Available' : 'Unavailable'}
                    </span>
                    <div className="">
                        <button
                            className="px-3 py-1 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                            disabled={!available}
                        >
                            {available ? 'Borrow' : 'Notify Me'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookListItem;