import { useEffect, useState, useRef, useCallback } from 'react';
import type { Book } from '../types/Book';
import { Link } from 'react-router';
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
  }, [activeCategory, searchQuery, fetchBooks]);

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

  console.log('Books in HomePage:', books);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Main Portal Area */}
        <div className="flex-1 min-w-0">
          {/* Hero Banner */}
          <div className="flex flex-col-reverse md:flex-row items-center mb-8 justify-between bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-3xl p-6 md:p-10 border border-blue-100/50 shadow-sm">
            <div className="w-full md:w-3/5 mt-4 md:mt-0">
              <h1 className="text-2xl md:text-4xl font-extrabold text-blue-900 leading-tight mb-3 text-center md:text-left">
                Mau Pinjam Buku Apa Hari ini?
              </h1>
              <p className="text-gray-600 text-center md:text-left text-sm md:text-base mb-5 max-w-lg">
                Temukan ribuan koleksi buku menarik dan pinjam dengan mudah langsung dari portal digital Anda.
              </p>
              <div className="flex justify-center md:justify-start gap-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">100+ Kategori</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">Proses Cepat</span>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <img src="hero.png" alt="Hero" className="w-32 md:w-40 object-contain drop-shadow-lg" />
            </div>
          </div>

          {/* Search bar & filter tabs */}
          <SearchBar onChange={onSearch} />

          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Book Catalog Section */}
          <section className="mt-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {displayedBooks.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center mt-8">
                <div className="animate-pulse text-blue-600 font-medium flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memuat buku lainnya...
                </div>
              </div>
            )}
            
            <div ref={observerTarget} className="mt-8 h-4" />
            
            {displayedBooks.length > 0 && currentPage * BOOKS_PER_PAGE >= books.length && (
              <div className="text-center mt-8 text-gray-400 text-sm py-4 border-t border-gray-100">
                Semua buku telah ditampilkan
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Desktop Info & Recommendations Sidebar */}
        <aside className="hidden lg:flex flex-col w-80 flex-shrink-0 space-y-6">
          
          {/* Widget 1: Ringkasan Pinjaman */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm">
            <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Status Peminjaman
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Pinjaman Aktif</span>
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">2 Buku</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Dalam Antrean</span>
                <span className="text-sm font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">1 Buku</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500">Koleksi Disimpan</span>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">5 Buku</span>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-medium">
                  <span>Kuota Pinjam</span>
                  <span>2 / 5 Buku</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 shadow-inner">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 2: Tanya AI Librarian */}
          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-6 text-white shadow-md border border-indigo-955 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="px-2.5 py-0.5 bg-blue-500 text-[10px] font-bold tracking-wider uppercase rounded-full mb-3 inline-block">AI Assistant</span>
            <h3 className="text-base font-bold mb-2">Punya Pertanyaan tentang Buku?</h3>
            <p className="text-xs text-blue-200 mb-4 leading-relaxed">
              Tanyakan ringkasan, ulasan, atau rekomendasi buku secara instan ke AI Librarian.
            </p>
            <Link 
              to="/library"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-blue-900 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors shadow"
            >
              Coba Sekarang
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Widget 3: Rekomendasi Buku Terpopuler */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm">
            <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.252.6 1.833l-3.97 2.88a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.88a1 1 0 00-1.176 0l-3.97 2.88c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.88c-.76-.58-.364-1.833.6-1.833h4.907a1 1 0 00.95-.69l1.519-4.674z" />
              </svg>
              Rekomendasi Terpopuler
            </h2>
            <div className="space-y-4">
              {books.slice(0, 3).map((recBook) => (
                <Link
                  to={`/book/${recBook.id}`}
                  key={recBook.id}
                  className="flex gap-3 group items-center hover:bg-gray-50/80 p-1.5 rounded-xl transition-all duration-200"
                >
                  <img
                    src={recBook.photo}
                    alt={recBook.title}
                    className="w-12 h-16 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-gray-800 truncate leading-snug group-hover:text-blue-600 transition-colors">
                      {recBook.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 truncate mt-0.5">By {recBook.writer?.name || 'Penulis'}</p>
                    <span className={`inline-block text-[9px] font-semibold mt-1 px-2 py-0.5 rounded-full ${
                      recBook.isAvailable 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {recBook.isAvailable ? 'Tersedia' : 'Antre'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default HomePage;