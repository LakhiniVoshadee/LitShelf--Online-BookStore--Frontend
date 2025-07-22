import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {BookData} from "../model/BookData.ts";
import {backendApi} from "../api.ts";

interface BookState {
    list: BookData[],
    error: string | null | undefined
}

const initialState: BookState = {
    list: [],
    error: null
}

export const getAllBooks = createAsyncThunk(
    'book/getAllBooks',
    async () => {
        /* const response = await fetch('./product-data.json');
         return await response.json();*/

        const response =  await backendApi.get("/books/all");
        return await response.data;
    }
)

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getAllBooks.pending, () => {
            alert("Products are still loading");
        }).addCase(getAllBooks.fulfilled, (state, action) => {
            state.list = action.payload; // Set the product list with fetched data

        }).addCase(getAllBooks.rejected, (state, action) => {
            state.error = action.error.message; // Set the error message
            alert("Error loading" + state.error)

        })
    }


});

export default bookSlice.reducer; // Export the reducer to be used in the store