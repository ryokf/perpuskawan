import { type FC } from 'react';

interface CategoryTabsProps {
    categories: { id: number; category: string; icons: string }[];
    activeCategory: number;
    onCategoryChange: (category: number) => void;
}

const CategoryTabs: FC<CategoryTabsProps> = ({ categories, activeCategory, onCategoryChange }) => {
    return (
        <div className="flex gap-8 px-4 mt-2">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeCategory === category.id
                            ? 'text-blue-600 border-blue-600'
                            : 'text-gray-500 border-transparent hover:text-gray-800 hover:border-gray-300'
                        }`}
                >
                    {category.category}
                </button>
            ))}
        </div>
    );
};

export default CategoryTabs;