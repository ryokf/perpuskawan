import { type FC } from 'react';

import { type Book } from '../types/Book';
import LazyImage from './LazyImage';

type BookCardProps = Book;

const BookCard: FC<BookCardProps> = ({id, title, isAvailable, photo, writer }) => {
  return (
    <a href={`/books/${id}`} className="overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <LazyImage src={photo} alt={title} className="object-cover w-full aspect-3/4" placeholderClassName="aspect-3/4" />
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 truncate">{title}</h3>
        <p className="text-xs text-gray-400 mt-0.5">{writer.name}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-xs text-yellow-400">⭐</span>
            <span className="ml-1 text-sm text-gray-400 font-medium">5</span>
          </div>
          <span className={`text-xs ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>
            {isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>
    </a>
  );
};

export default BookCard;
