import { useState } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const [activeCategory, setActiveCategory] = useState('Fiction');

  // Sample data
  const categories = ['Fiction', 'Non Fiction', 'Comic'];
  const popularBooks = [
    {
      id: 'book1',
      title: 'Sejarah Filsafat Barat',
      category: 'Non Fiction',
      rating: 5,
      available: true,
      imageUrl: 'https://picsum.photos/200/300'
    },
    {
      id: 'book2',
      title: 'Filsafat untuk Pemula',
      category: 'Non Fiction',
      rating: 4.5,
      available: false,
      imageUrl: 'https://picsum.photos/200/301'
    },
    {
      id: 'book3',
      title: 'Introduction to Philosophy',
      category: 'Non Fiction',
      rating: 4.8,
      available: true,
      imageUrl: 'https://picsum.photos/200/302'
    }
  ];

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
          onCategoryChange={setActiveCategory}
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
            {popularBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </section>
      </main>

    </div>
  )
}

export default HomePage
