import type {CartItem} from "../model/CartItem.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {BookData} from "../model/BookData.ts";

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state: CartState, action: PayloadAction<BookData>) {

            const existingItem = state.items.find((item) => item.book.id === action.payload.id) // Find the item in the cart with the same ID
            if (!existingItem) { // If the item doesn't exist, add it to the cart
                state.items.push({book: action.payload, bookCount: 1}); // Add the item to the cart with a count of 1
            }
        },

        increaseQuantity(state: CartState, action: PayloadAction<number>) { // Increase the quantity of an item

            const item = state.items.find((existingItem) => existingItem.book.id === action.payload);
            if (item) {
                item.bookCount += 1; // Increase the item count
            }
        },
        decreaseQuantity(state: CartState, action: PayloadAction<number>) {  // Decrease the quantity of an item
            const item = state.items.find((existingItem) => existingItem.book.id === action.payload);
            if (item && item.bookCount > 1) { // Check if the item count is greater than 1
                item.bookCount -= 1;

            }
        }
    }
});


export const {addItemToCart, increaseQuantity, decreaseQuantity} = cartSlice.actions;

export default cartSlice.reducer;