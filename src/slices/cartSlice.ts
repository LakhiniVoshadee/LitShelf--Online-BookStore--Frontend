import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { backendApi } from "../api.ts";


export interface CartItem {
    bookId: number;
    quantity: number;
}

export interface Cart {
    _id: string;
    userId: number;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
}

interface CartState {
    cart: Cart | null;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    cart: null,
    loading: false,
    error: null
};

// Async thunk to add item to cart via backend
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ bookId, quantity }: { bookId: number; quantity: number }) => {
        const response = await backendApi.post('/cart/add', {
            bookId,
            quantity
        });
        return response.data;
    }
);

// Async thunk to get cart from backend
export const getCart = createAsyncThunk(
    'cart/getCart',
    async () => {
        const response = await backendApi.get('/cart');
        return response.data;
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart(state) {
            state.cart = null;
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add item to cart';
            })
            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action: PayloadAction<Cart>) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cart';
            });
    }
});

export const { clearCart, clearError } = cartSlice.actions;
export default cartSlice.reducer;