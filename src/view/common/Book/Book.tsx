import  { useState } from "react";
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

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 w-80 transform hover:scale-105">
            <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                    src={data.coverImage}
                    alt={data.title}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {data.genre}
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{data.title}</h3>
                <p className="text-gray-600 font-medium">by {data.author}</p>

                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-orange-600">
                        {data.currency} {data.price}
                    </div>
                    <div className="text-sm text-gray-500">
                        Stock: {data.stock}
                    </div>
                </div>

                <p className="text-gray-700 text-sm line-clamp-3">{data.description}</p>

                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                        <span>Publisher:</span>
                        <span>{data.publisher}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Year:</span>
                        <span>{data.publicationYear}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Pages:</span>
                        <span>{data.pages}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Language:</span>
                        <span>{data.language}</span>
                    </div>
                </div>

                {role === 'customer' && data.stock > 0 && (
                    <div className="space-y-3 pt-4 border-t">
                        <div className="flex items-center space-x-3">
                            <label className="text-sm font-medium text-gray-700">Quantity:</label>
                            <select
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            >
                                {Array.from({ length: Math.min(data.stock, 10) }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {loading ? 'Adding...' : 'Add to Cart'}
                        </button>

                        {showSuccess && (
                            <div className="text-green-600 text-sm text-center bg-green-50 py-2 rounded-lg">
                                ✓ Added to cart successfully!
                            </div>
                        )}
                    </div>
                )}

                {role === 'customer' && data.stock === 0 && (
                    <button
                        disabled
                        className="w-full bg-gray-400 text-white font-semibold py-3 rounded-xl cursor-not-allowed"
                    >
                        Out of Stock
                    </button>
                )}
            </div>
        </div>
    );
}