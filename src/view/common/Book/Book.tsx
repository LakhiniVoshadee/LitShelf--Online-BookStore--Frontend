import { ModifyCart } from "../ModifyCart/ModifyCart.tsx";
import type { BookData } from "../../../model/BookData.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store.ts";
import { addItemToCart } from "../../../slices/cartSlice.ts";
import { FaRegHeart, FaHeart, FaUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsBook } from "react-icons/bs";

type BookProps = {
    data: BookData;
};

const images: Record<string, string> = import.meta.glob("../../../assets/books/*.{png,jpg,jpeg}", {
    eager: true,
    import: "default",
});

const genreColors: Record<string, string> = {
    Fiction: "bg-orange-100 text-orange-600",
    Fantasy: "bg-purple-100 text-purple-600",
    "Self-Help": "bg-orange-100 text-orange-600",
    Technology: "bg-blue-100 text-blue-600",
    // Add more genre colors as needed
};

export function Book({ data }: BookProps) {
    const dispatch = useDispatch<AppDispatch>();
    const item = useSelector((state: RootState) =>
        state.cart.items.find((cartItem) => cartItem.book.id === data.id)
    );

    // Find the correct image by matching the filename (ignoring path)
    const imageKey = Object.keys(images).find((key) =>
        key.endsWith(data.coverImage) || key.endsWith(data.coverImage.split(".")[0])
    );
    const image = imageKey ? images[imageKey] : null;
    const fallbackImage = "/placeholder-image.jpg"; // Ensure this file exists in public/

    // Stock status
    let stockLabel = "In Stock";
    let stockColor = "bg-green-100 text-green-700";
    if (data.stock === 0) {
        stockLabel = "Out of Stock";
        stockColor = "bg-gray-100 text-gray-500";
    } else if (data.stock < 5) {
        stockLabel = "Low Stock";
        stockColor = "bg-yellow-100 text-yellow-700";
    }

    // Genre color
    const genreClass = genreColors[data.genre] || "bg-gray-100 text-gray-700";

    return (
        <div className="w-full max-w-[370px] mx-auto mb-7">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
                {/* Card Header */}
                <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-b from-orange-50 to-white relative">
                    <div className={`absolute left-5 top-4 px-3 py-1 rounded-lg font-semibold text-xs shadow ${stockColor}`}>
                        {stockLabel}
                    </div>
                    <div className="flex-1 flex justify-center">
                        <BsBook className="text-orange-400 text-[2.2rem]" />
                    </div>
                    <button
                        className="absolute right-5 top-4 bg-white/80 p-2 rounded-full shadow hover:bg-orange-100 transition"
                        aria-label="Favorite"
                    >
                        {item ? <FaHeart className="text-orange-400 text-lg" /> : <FaRegHeart className="text-gray-400 text-lg" />}
                    </button>
                </div>
                {/* Book Cover */}
                <div className="relative w-full h-48 flex items-center justify-center bg-gray-50">
                    <img
                        className="w-28 h-40 object-cover rounded-lg border border-gray-200 shadow-sm"
                        src={image || fallbackImage}
                        alt={data.title}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = fallbackImage;
                            target.classList.add("opacity-50");
                        }}
                    />
                    {/* Quick View Button */}
                    <button className="absolute top-3 left-1/2 -translate-x-1/2 bg-white text-gray-800 font-semibold px-4 py-1 rounded-lg shadow hover:bg-orange-50 transition-all border border-gray-200 text-sm">
                        Quick View
                    </button>
                </div>
                {/* Card Body */}
                <div className="p-5">
                    <div className="flex items-center mb-1 justify-between">
                        <span className={`inline-block ${genreClass} font-bold text-xs px-3 py-1 rounded-md`}>
                            {data.genre}
                        </span>
                        <span className="text-gray-400 text-sm flex items-center gap-1">
                            <svg className="inline-block h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" />
                            </svg>
                            {data.publicationYear}
                        </span>
                    </div>
                    <h3 className="text-gray-900 text-[1.2rem] font-bold mb-1 line-clamp-2 hover:text-orange-500 transition-colors duration-200">
                        {data.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                        <FaUser className="inline-block mr-1" />
                        <span>{data.author}</span>
                    </div>
                    {/* Description */}
                    <p className="text-gray-600 text-[0.98rem] mb-2 line-clamp-2">{data.description}</p>
                    <div className="flex items-center gap-8 mb-3 text-xs text-gray-500">
                        <span>{data.pages} pages</span>
                        <span>{data.language}</span>
                        <span>{data.publisher}</span>
                    </div>
                    {/* Price and Cart */}
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex flex-col">
                            <span className="text-orange-600 font-bold text-[1.45rem]">
                                {data.price.toFixed(2)}
                            </span>
                            <span className="text-gray-500 text-xs">{data.currency}</span>
                        </div>
                        {item ? (
                            <ModifyCart data={{ book: data }} />
                        ) : (
                            <button
                                className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all font-medium text-base shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                                onClick={() => dispatch(addItemToCart(data))}
                                disabled={data.stock === 0}
                            >
                                <MdOutlineShoppingCart className="text-lg" />
                                {data.stock > 0 ? "Add to Cart" : "Out of Stock"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}