import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { BookData } from "../../../model/BookData.ts";
import type { AppDispatch, RootState } from "../../../store/store.ts";
import { addToCart } from "../../../slices/cartSlice.ts";

interface BookProps {
    data: BookData;
}

export function Book({ data }: BookProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.cart);
    const [quantity, setQuantity] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const role = localStorage.getItem('role');

    const handleAddToCart = async () => {
        if (role !== 'customer') {
            alert('Only customers can add items to cart');
            return;
        }

        try {
            await dispatch(addToCart({ bookId: data.id, quantity })).unwrap();
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error: any) {
            console.error('Failed to add to cart:', error);
            alert(error.message || 'Failed to add item to cart');
        }
    };

    const handleImageLoad = () => {
        setImageLoading(false);
        setImageError(false);
    };

    const handleImageError = () => {
        setImageLoading(false);
        setImageError(true);
    };

    // Function to get the correct image path
    const getImageSrc = () => {
        if (imageError) {
            // Return default book cover when image fails to load
            return "/src/assets/books/default-book.jpg";
        }

        if (!data.coverImage) {
            return "/src/assets/books/default-book.jpg";
        }

        // If coverImage is just a filename, prepend the assets path
        if (!data.coverImage.startsWith('http') && !data.coverImage.startsWith('/')) {
            return `/src/assets/books/${data.coverImage}`;
        }

        // If it's already a full path or URL, use as is
        return data.coverImage;
    };

    return (
        <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200 w-80 overflow-hidden">
            {/* Book Cover */}
            <div className="relative">
                <div className="aspect-[3/4] overflow-hidden bg-gray-50">
                    {imageLoading && (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                        </div>
                    )}

                    <img
                        src={getImageSrc()}
                        alt={data.title}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                            imageLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        loading="lazy"
                    />

                    {/* Fallback when image fails to load */}
                    {imageError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500">
                            <svg className="w-16 h-16 mb-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                            </svg>
                            <span className="text-sm font-medium">No Cover Available</span>
                            <span className="text-xs text-gray-400 mt-1">{data.title}</span>
                        </div>
                    )}
                </div>

                {/* Genre Badge */}
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/90 text-gray-700 backdrop-blur-sm">
                        {data.genre}
                    </span>
                </div>

                {/* Stock Status */}
                <div className="absolute top-3 right-3">
                    {data.stock > 0 ? (
                        <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                    ) : (
                        <div className="w-3 h-3 bg-red-400 rounded-full border-2 border-white shadow-sm"></div>
                    )}
                </div>
            </div>

            {/* Book Information */}
            <div className="p-5 space-y-4">
                {/* Title and Author */}
                <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 leading-tight">
                        {data.title}
                    </h3>
                    <p className="text-sm text-gray-600">by {data.author}</p>
                </div>

                {/* Price and Stock */}
                <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-gray-900">
                        {data.currency} {data.price}
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                        {data.stock > 0 ? `${data.stock} in stock` : 'Out of stock'}
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {data.description}
                </p>

                {/* Book Details */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex justify-between">
                        <span>Publisher</span>
                        <span className="text-gray-700 font-medium truncate ml-2">{data.publisher}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Year</span>
                        <span className="text-gray-700 font-medium">{data.publicationYear}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Pages</span>
                        <span className="text-gray-700 font-medium">{data.pages}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Language</span>
                        <span className="text-gray-700 font-medium">{data.language}</span>
                    </div>
                </div>

                {/* Customer Actions */}
                {role === 'customer' && data.stock > 0 && (
                    <div className="space-y-3 pt-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Quantity</label>
                            <select
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-20 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                            >
                                {Array.from({ length: Math.min(data.stock, 10) }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={loading}
                            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 disabled:cursor-not-allowed text-sm"
                        >
                            {loading ? 'Adding...' : 'Add to Cart'}
                        </button>

                        {/* Success Message */}
                        {showSuccess && (
                            <div className="flex items-center justify-center space-x-2 text-green-700 bg-green-50 py-2 px-3 rounded-md text-sm">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                </svg>
                                <span>Added to cart successfully!</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Out of Stock Button */}
                {role === 'customer' && data.stock === 0 && (
                    <div className="pt-4">
                        <button
                            disabled
                            className="w-full bg-gray-100 text-gray-500 font-medium py-2.5 px-4 rounded-md cursor-not-allowed text-sm"
                        >
                            Out of Stock
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}