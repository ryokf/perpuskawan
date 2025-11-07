import { type FC } from 'react';

import { type Book } from '../../types/Book';

type BookCardProps = Book;

const BookCard: FC<BookCardProps> = ({ title, category, rating, available, imageUrl }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <img src={imageUrl} alt={title} className="object-cover w-full aspect-3/4" />
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 truncate">{title}</h3>
        <p className="mt-1 text-xs text-gray-500">{category}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-yellow-400">⭐</span>
            <span className="ml-1 text-xs font-medium">{rating}</span>
          </div>
          <span className={`text-xs ${available ? 'text-green-500' : 'text-red-500'}`}>
            {available ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;