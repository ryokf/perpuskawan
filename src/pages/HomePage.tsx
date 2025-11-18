import { useEffect, useState, useRef, useCallback } from 'react';
import type { Book } from '../types/Book';
import CategoryTabs from '../components/CategoryTabs';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import { fetchBookData } from '../services/bookService';
import { getAllCategories } from '../services/categoryService';

const BOOKS_PER_PAGE = 12;

function HomePage() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBooks = useCallback(async (categoryId: number, query: string) => {
    setIsLoading(true);
    setCurrentPage(1);
    const booksData = await fetchBookData(categoryId, query);
    setBooks(booksData);
    setDisplayedBooks(booksData.slice(0, BOOKS_PER_PAGE));
    setIsLoading(false);
  }, []);

  const fetchCategories = async () => {
    const categoriesData = await getAllCategories();
    setCategories(categoriesData);
  };

  // Load more books when scrolling to bottom
  const loadMoreBooks = useCallback(() => {
    if (isLoading || currentPage * BOOKS_PER_PAGE >= books.length) return;
    
    const nextPage = currentPage + 1;
    const newDisplayedBooks = books.slice(0, nextPage * BOOKS_PER_PAGE);
    setDisplayedBooks(newDisplayedBooks);
    setCurrentPage(nextPage);
  }, [books, currentPage, isLoading]);

  // Setup Intersection Observer for infinite scroll
  useEffect(() => {
    if (!observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreBooks();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [loadMoreBooks]);

  useEffect(() => {
    fetchBooks(activeCategory, searchQuery);
  }, [activeCategory, fetchBooks]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    setActiveCategory(categoryId);
  };

  let typingTimer: number;
  const onSearch = (query: string) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      setSearchQuery(query);
      fetchBooks(activeCategory, query);
    }, 500);
    
    console.log("Search query:", query);
  }

  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      <main className="container px-5 mx-auto pb-24">
        <div className="flex items-center mb-6 justify-between">
          <h1 className="text-2xl font-bold mb-6">Mau Pinjam Buku Apa Hari ini?</h1>
          <img src="hero.png" alt="" />
        </div>

        <SearchBar
          onChange={onSearch}
        />

        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <section className="mt-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {displayedBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center mt-8">
              <div className="text-gray-500">Loading more books...</div>
            </div>
          )}
          
          {/* Infinite scroll trigger */}
          <div ref={observerTarget} className="mt-8 h-4" />
          
          {/* End of list message */}
          {displayedBooks.length > 0 && currentPage * BOOKS_PER_PAGE >= books.length && (
            <div className="text-center mt-8 text-gray-500">No more books to load</div>
          )}
        </section>
      </main>
    </div>
  );
}

export default HomePage;