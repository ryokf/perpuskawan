import { type FC } from 'react';

interface BookInfoItemProps {
  label: string;
  value: string;
}

const BookInfoItem: FC<BookInfoItemProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
};

export default BookInfoItem;