import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../store/store.ts";
import { getAllBooks } from "../../slices/bookSlice.ts";
import { Book } from "../../view/common/Book/Book.tsx";

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

    useEffect(() => {
        dispatch(getAllBooks());
    }, [dispatch]);

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

            {/* Book Card Grid */}
            <section className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">Popular Books</h2>
                <div className="flex flex-wrap justify-center items-start gap-7">
                    {list.length > 0 ? (
                        list.map((book) => <Book key={book.id} data={book} />)
                    ) : (
                        <p className="text-gray-500 text-lg">No books available. Please try again later.</p>
                    )}
                </div>
            </section>
        </div>
    );
}