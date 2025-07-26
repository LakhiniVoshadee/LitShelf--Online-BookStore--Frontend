import {useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";

export function ShoppingCart() {
    const {items} = useSelector((state: RootState) => state.cart);

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + item.book.price * item.bookCount, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white px-4 py-10 flex justify-center">
            <div className="w-full max-w-4xl">
                {/* Cart Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Shopping Cart</h1>
                    <p className="text-gray-500 text-base">{items.length} {items.length === 1 ? "item" : "items"} in your cart</p>
                </div>
                {/* Cart Items */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    {items.length === 0 ? (
                        <div className="py-12 text-center text-lg text-gray-500 font-medium">
                            No items to display
                        </div>
                    ) : (
                        <ul>
                            {items.map((item) => (
                                <li key={item.book.id} className="flex flex-col md:flex-row items-center md:items-start gap-5 border-b last:border-none py-6">
                                    {/* Book Image/Icon */}
                                    <div className="w-24 h-24 flex items-center justify-center rounded-xl bg-orange-100">
                                        {/* Replace with real cover if available */}
                                        <span className="text-orange-400 text-3xl">
                                            <svg width="36" height="36" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6 4v16a2 2 0 002 2h8V2H8a2 2 0 00-2 2zm8 0v16H8V4h6zm2-2h-8a4 4 0 00-4 4v16a4 4 0 004 4h8a4 4 0 004-4V6a4 4 0 00-4-4z"/>
                                            </svg>
                                        </span>
                                    </div>
                                    {/* Book Info */}
                                    <div className="flex-1 w-full">
                                        <div className="flex gap-2 items-center mb-2">
                                            <span className="bg-orange-100 text-orange-600 font-semibold px-3 py-1 rounded-lg text-xs">{item.book.genre}</span>
                                            <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-lg text-xs">
                                                In Stock: {item.book.stock}
                                            </span>
                                        </div>
                                        <h2 className="text-lg font-bold text-gray-900 mb-1">{item.book.title}</h2>
                                        <div className="text-gray-700 mb-2">by {item.book.author}</div>
                                        <div className="flex gap-6 text-gray-500 text-xs mb-2">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                                    <path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" />
                                                </svg>
                                                {item.book.publicationYear}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                                    <path d="M5 4h14v16H5V4zm2 2v12M17 6v12" />
                                                </svg>
                                                {item.book.pages} pages
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                                    <path d="M6 4v16a2 2 0 002 2h8V2H8a2 2 0 00-2 2zm8 0v16H8V4h6zm2-2h-8a4 4 0 00-4 4v16a4 4 0 004 4h8a4 4 0 004-4V6a4 4 0 00-4-4z"/>
                                                </svg>
                                                {item.book.publisher}
                                            </span>
                                        </div>
                                        <div className="text-orange-600 font-bold text-xl mb-1">${item.book.price.toFixed(2)}</div>
                                        <div className="text-gray-500 text-sm mb-2">
                                            ${(item.book.price * item.bookCount).toFixed(2)} total
                                        </div>
                                    </div>
                                    {/* Quantity Info */}
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-xl font-semibold">{item.bookCount}</span>
                                        <span className="text-gray-400 text-xs">Qty</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* Order Summary */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                    <div className="flex justify-between text-base mb-2">
                        <span>Subtotal ({items.length} {items.length === 1 ? "item" : "items"})</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base mb-2">
                        <span>Shipping</span>
                        <span className="text-green-600 font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between text-base mb-2">
                        <span>Tax</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold text-orange-600 mt-4 mb-6">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold text-lg shadow flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M12 17v4M8 21h8m-4-4a5 5 0 100-10 5 5 0 000 10z"/>
                        </svg>
                        Secure Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}