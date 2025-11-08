import { type FC } from 'react';

interface ReviewItemProps {
  avatarUrl: string;
  name: string;
  rating: number;
  date: string;
  text: string;
}

const ReviewItem: FC<ReviewItemProps> = ({ avatarUrl, name, rating, date, text }) => {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <img src={avatarUrl} alt={name} className="w-8 h-8 rounded-full" />
          <span className="font-medium text-sm">{name}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="text-yellow-400">⭐</span>
            <span className="ml-1 text-sm">{rating}/5</span>
          </div>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
};

export default ReviewItem;