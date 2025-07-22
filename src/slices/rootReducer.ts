import {combineReducers} from "redux";
import bookReducer from "./bookSlice.ts";
import cartReducer from "./cartSlice.ts";

export const rootReducer = combineReducers(
    {
        books: bookReducer,//
        cart: cartReducer

    }
);

export type RootReducerState = ReturnType<typeof rootReducer>;