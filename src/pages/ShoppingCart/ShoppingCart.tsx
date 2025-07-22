/*interface ShoppingCartProps {
    itemsList: CartItem[];
}*/

import {useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";

export function ShoppingCart() {

    const {items} = useSelector((state: RootState) => state.cart);

    return (
        <div className="flex justify-center items-center px-4 py-8 bg-gray-100 min-h-screen">
            <div
                className="w-full max-w-screen-2xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <table className="min-w-full border-collapse">
                    <thead>
                    <tr className="bg-gradient-to-r from-[#0d1b2a] to-[#1b263b] text-white">
                        <th className="text-sm font-medium px-6 py-4 text-left border-b border-gray-300">ID</th>
                        <th className="text-sm font-medium px-6 py-4 text-left border-b border-gray-300">Name</th>
                        <th className="text-sm font-medium px-6 py-4 text-left border-b border-gray-300">Unit Price</th>
                        <th className="text-sm font-medium px-6 py-4 text-left border-b border-gray-300">Quantity</th>
                        <th className="text-sm font-medium px-6 py-4 text-left border-b border-gray-300">Total Price
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="p-6 bg-gray-50 text-center text-sm text-gray-500 font-medium">
                                No items to display
                            </td>
                        </tr>
                    ) : (
                        items.map((item , index) => (
                            <tr
                                key={item.book.id}
                                className={`${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-150'
                                } hover:bg-[#1b263b]/10 transition-colors duration-200 border-b border-gray-200`}
                            >
                                <td className="px-6 py-4 text-gray-700 text-sm">{item.book.id}</td>
                                <td className="px-6 py-4 text-gray-700 text-sm font-medium">{item.book.title}</td>
                                <td className="px-6 py-4 text-gray-700 text-sm">
                                    {item.book.price.toFixed(2)} {item.book.currency}
                                </td>
                                <td className="px-6 py-4 text-gray-700 text-sm">{item.bookCount}</td>
                                <td className="px-6 py-4 text-gray-700 text-sm font-medium">
                                    {(item.book.price * item.bookCount).toFixed(2)} {item.book.currency}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}