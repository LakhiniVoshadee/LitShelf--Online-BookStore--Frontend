import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { getCart, clearCart } from '../../slices/cartSlice';
import { placeOrder, clearCurrentOrder } from '../../slices/orderSlice';
import { getAllBooks } from '../../slices/bookSlice';
import type { BookData } from '../../model/BookData';

export function ShoppingCart() {
    const dispatch = useDispatch<AppDispatch>();
    const { cart, loading: cartLoading } = useSelector((state: RootState) => state.cart);
    const { currentOrder, loading: orderLoading, error: orderError } = useSelector((state: RootState) => state.order);
    const { list: books } = useSelector((state: RootState) => state.books);
    const [cartBooks, setCartBooks] = useState<{ book: BookData; quantity: number }[]>([]);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        dispatch(getCart());
        dispatch(getAllBooks());
    }, [dispatch]);

    useEffect(() => {
        if (cart && books.length > 0) {
            const cartBooksData = cart.items.map(item => {
                const book = books.find(b => b.id === item.bookId);
                return book ? { book, quantity: item.quantity } : null;
            }).filter(Boolean) as { book: BookData; quantity: number }[];

            setCartBooks(cartBooksData);

            const total = cartBooksData.reduce((sum, item) =>
                sum + (item.book.price * item.quantity), 0
            );
            setTotalCost(total);
        }
    }, [cart, books]);

    const handlePlaceOrder = async () => {
        if (!cart || cart.items.length === 0) {
            alert('Your cart is empty');
            return;
        }

        try {
            await dispatch(placeOrder()).unwrap();
            dispatch(clearCart());
            alert('Order placed successfully!');
        } catch (error: any) {
            console.error('Failed to place order:', error);
            alert(error.message || 'Failed to place order. Please try again.');
        }
    };

    const handleClearOrder = () => {
        dispatch(clearCurrentOrder());
    };

    if (cartLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading your cart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                {currentOrder && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-green-800 mb-2">
                                    Order Placed Successfully! 🎉
                                </h2>
                                <p className="text-green-700">
                                    Order ID: <span className="font-semibold">#{currentOrder.orderId}</span>
                                </p>
                                <p className="text-green-700">
                                    Total: <span className="font-semibold">{currentOrder.currency} {currentOrder.totalCost}</span>
                                </p>
                                <p className="text-green-700">
                                    Status: <span className="font-semibold capitalize">{currentOrder.status.replace('_', ' ')}</span>
                                </p>
                            </div>
                            <button
                                onClick={handleClearOrder}
                                className="text-green-600 hover:text-green-800 font-medium"
                            >
                                ✕ Dismiss
                            </button>
                        </div>
                    </div>
                )}

                {orderError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
                        <p className="text-red-700">{orderError}</p>
                    </div>
                )}

                {!cart || cart.items.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8">Add some books to your cart to get started!</p>
                        <a
                            href="/"
                            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            Continue Shopping
                        </a>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Cart Items */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b">
                                <h2 className="text-xl font-semibold text-gray-800">Cart Items ({cart.items.length})</h2>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {cartBooks.map((item, index) => (
                                    <div key={index} className="p-6 flex items-center space-x-4">
                                        <img
                                            src={item.book.coverImage}
                                            alt={item.book.title}
                                            className="w-20 h-28 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">{item.book.title}</h3>
                                            <p className="text-gray-600">by {item.book.author}</p>
                                            <p className="text-sm text-gray-500">{item.book.genre}</p>
                                            <div className="mt-2 flex items-center space-x-4">
                                                <span className="text-lg font-semibold text-orange-600">
                                                    {item.book.currency} {item.book.price}
                                                </span>
                                                <span className="text-gray-600">
                                                    Quantity: {item.quantity}
                                                </span>
                                                <span className="text-lg font-semibold text-gray-900">
                                                    Total: {item.book.currency} {(item.book.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Items ({cart.items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                                    <span>{cartBooks[0]?.book.currency || 'USD'} {totalCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>FREE</span>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between text-xl font-semibold text-gray-900">
                                    <span>Total</span>
                                    <span>{cartBooks[0]?.book.currency || 'USD'} {totalCost.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={orderLoading}
                                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                {orderLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Placing Order...
                                    </div>
                                ) : (
                                    'Place Order'
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}