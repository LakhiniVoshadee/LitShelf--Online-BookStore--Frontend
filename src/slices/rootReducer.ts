import { combineReducers } from "redux";
import bookReducer from "./bookSlice.ts";
import cartReducer from "./cartSlice.ts";
import orderReducer from "./orderSlice.ts";

export const rootReducer = combineReducers({
    books: bookReducer,
    cart: cartReducer,
    order: orderReducer
});

export type RootReducerState = ReturnType<typeof rootReducer>;