import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../store/store.ts";
import { getAllBooks } from "../../slices/bookSlice.ts";
import { Book } from "../../view/common/Book/Book.tsx";

export function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { list, error } = useSelector((state: RootState) => state.books);

    useEffect(() => {
        dispatch(getAllBooks());
    }, [dispatch]);

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg">Error loading books: {error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20">
            <div className="flex flex-wrap justify-center items-start gap-6 mx-auto px-4">
                {list.length > 0 ? (
                    list.map((book) => <Book key={book.id} data={book} />)
                ) : (
                    <p className="text-gray-500 text-lg">No books available. Please try again later.</p>
                )}
            </div>
        </div>
    );
}