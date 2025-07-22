import type {BookData} from "./BookData.ts";

export interface CartItem{
    book: BookData,
    bookCount: number
}