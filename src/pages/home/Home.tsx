import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../../store/store.ts";
import { getAllBooks } from "../../slices/bookSlice.ts";
import { Book } from "../../view/common/Book/Book.tsx";
import { searchBooksByTitle, searchBooksByGenre } from "../../api";

// You can move these to a config or fetch from API if you want real data!
const stats = [
    { label: "Books", value: "12K+" },
    { label: "Readers", value: "50K+" },
    { label: "Authors", value: "500+" }
];

const categories = [
    { label: "All Books", count: "12,341", icon: <span className="inline-block w-7 h-7 rounded bg-gradient-to-br from-purple-400 to-blue-300 mr-2"></span>, active: false },
    { label: "Fiction", count: "2,341", icon: <span className="inline-block w-7 h-7 rounded bg-gradient-to-br from-orange-400 to-orange-300 mr-2"></span>, active: true },
    // Add more categories as needed
];

export function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { list, error } = useSelector((state: RootState) => state.books);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState<'title' | 'genre'>('title');
    const [searchError, setSearchError] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [displayBooks, setDisplayBooks] = useState(list);
    const [allGenres, setAllGenres] = useState<string[]>([]);

    useEffect(() => {
        dispatch(getAllBooks());
    }, [dispatch]);

    useEffect(() => {
        const genres = Array.from(new Set(list.map(book => book.genre)));
        setAllGenres(genres);
    }, [list]);

    const handleSearch = async () => {
        setIsSearching(true);
        setSearchError('');
        try {
            if (searchType === 'title') {
                const result = await searchBooksByTitle(searchTerm);
                setDisplayBooks(result);
            } else {
                const result = await searchBooksByGenre(searchTerm);
                setDisplayBooks(result);
            }
        } catch (error) {
            setSearchError('Error searching books');
        } finally {
            setIsSearching(false);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setDisplayBooks(list);
    };

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg">Error loading books: {error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-10 bg-gradient-to-br from-orange-50 to-white">
            {/* Hero Section */}
            <section className="pt-16 pb-10 px-4 flex flex-col items-center relative overflow-hidden">
                {/* Top Left Accent Circle */}
                <div className="absolute left-[-80px] top-[60px] w-[240px] h-[240px] bg-orange-100 rounded-full opacity-70 z-0"></div>
                {/* Top Right Accent Circle */}
                <div className="absolute right-[-90px] top-[10px] w-[200px] h-[200px] bg-orange-100 rounded-full opacity-70 z-0"></div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 relative z-10 mb-4">
                    Discover Your Next <span className="text-orange-600">Great Read</span>
                </h1>
                <p className="text-lg text-gray-600 text-center mb-7 relative z-10 max-w-2xl">
                    Explore thousands of carefully curated books from every genre. Find your perfect story and embark on new adventures.
                </p>
                <div className="flex gap-3 mb-10 relative z-10">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all">
                        Browse Books
                    </button>
                    <button className="bg-white border-2 border-orange-500 text-orange-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-orange-50 transition-all">
                        View Categories
                    </button>
                </div>
                {/* Stats */}
                <div className="flex gap-12 justify-center items-center mb-10 relative z-10">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center">
                            <span className="text-orange-600 font-extrabold text-2xl md:text-3xl">{stat.value}</span>
                            <span className="text-gray-700 font-medium text-lg">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section className="mb-16 px-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-900 mb-8">Browse by Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {categories.map((cat) => (
                        <div
                            key={cat.label}
                            className={`flex flex-col items-center justify-center rounded-2xl px-8 py-7 shadow transition-all ${
                                cat.active
                                    ? "bg-orange-500 text-white font-bold"
                                    : "bg-white text-gray-800 hover:bg-orange-100"
                            }`}
                        >
                            {cat.icon}
                            <span className="text-lg font-semibold">{cat.label}</span>
                            <span className="text-sm mt-1">{cat.count}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Search Section */}
            <section className="max-w-4xl mx-auto px-4 mb-12">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Your Next Read</h2>
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            {searchType === 'genre' ? (
                                <select
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="">Select a genre</option>
                                    {allGenres.map((genre) => (
                                        <option key={genre} value={genre}>
                                            {genre}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    placeholder={`Search by ${searchType}...`}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            )}
                        </div>
                        <div className="flex space-x-2">
                            <select
                                value={searchType}
                                onChange={(e) => {
                                    setSearchType(e.target.value as 'title' | 'genre');
                                    setSearchTerm('');
                                }}
                                className="block w-32 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                                <option value="title">By Title</option>
                                <option value="genre">By Genre</option>
                            </select>
                            <button
                                onClick={handleSearch}
                                disabled={isSearching}
                                className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 flex items-center"
                            >
                                {isSearching ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Searching...
                                    </>
                                ) : (
                                    'Search'
                                )}
                            </button>
                            {searchTerm && (
                                <button
                                    onClick={handleClearSearch}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                    {searchError && (
                        <div className="text-red-500 text-sm mt-2">{searchError}</div>
                    )}
                </div>
            </section>

            {/* Book Card Grid */}
            <section className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
                    {searchTerm ? 'Search Results' : 'Popular Books'}
                </h2>
                {isSearching ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayBooks.length > 0 ? (
                            displayBooks.map((book) => <Book key={book.id} data={book} />)
                        ) : searchTerm ? (
                            <div className="col-span-full text-center py-10">
                                <p className="text-gray-500 text-lg">No books found matching your search. Try different keywords.</p>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-lg">No books available. Please try again later.</p>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}