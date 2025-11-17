import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import CategoryTabs from '../components/CategoryTabs';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import { fetchBookData } from '../services/bookService';
import { getAllCategories } from '../services/categoryService';

function HomePage() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState([]);

  const fetchBooks = async (categoryId: number) => {
    const booksData = await fetchBookData(categoryId);
    setBooks(booksData);
  }

  const fetchCategories = async () => {
    const categories = await getAllCategories();
    setCategories(categories);
  }

  useEffect(() => {
    fetchBooks(activeCategory);
    fetchCategories();
  }, [activeCategory]);

  const handleCategoryChange = (categoryId: number) => {
    setActiveCategory(categoryId);
    fetchBooks(categoryId);
  }
  
  console.log(activeCategory);

  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      <main className="container px-5 mx-auto pb-24">
        <div className="flex items-center mb-6 justify-between">
          <h1 className="text-2xl font-bold mb-6">Mau Pinjam Buku Apa Hari ini?</h1>
          <img src="hero.png" alt="" />
        </div>

        <SearchBar></SearchBar>

        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* <section className="mt-6">
          <h2 className="text-sm font-medium text-gray-800 mb-4">Explore by categories</h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-3">
            {categories.map((category) => (
              <button
                key={category}
                className="p-4 text-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {category}
              </button>
            ))}
          </div>
        </section> */}

        <section className="mt-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {books.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </section>
      </main>

    </div>
  )
}

export default HomePage
