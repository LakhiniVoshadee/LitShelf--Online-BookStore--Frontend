import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { backendApi } from "../api.ts";

export interface OrderItem {
    bookId: number;
    quantity: number;
}

export interface Order {
    _id: string;
    orderId: number;
    userId: number;
    items: OrderItem[];
    totalCost: number;
    currency: string;
    status: 'pending_payment' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}

interface OrderState {
    orders: Order[];
    currentOrder: Order | null;
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
};

export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async () => {
        const response = await backendApi.post('/orders/place');
        return response.data;
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearCurrentOrder(state) {
            state.currentOrder = null;
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action: PayloadAction<Order>) => {
                state.loading = false;
                state.currentOrder = action.payload;
                state.orders.push(action.payload);
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to place order';
            });
    }
});

export const { clearCurrentOrder, clearError } = orderSlice.actions;
export default orderSlice.reducer;