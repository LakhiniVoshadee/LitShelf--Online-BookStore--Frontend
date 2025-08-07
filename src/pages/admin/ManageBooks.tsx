import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type {AppDispatch, RootState} from "../../store/store";
import { getAllBooks } from "../../slices/bookSlice";
import { saveBook, getBookById, updateBook, deleteBook, searchBooksByTitle, searchBooksByGenre } from "../../api";
import type { BookData } from "../../api";

interface BookItemProps {
    book: BookData;
    onEdit: (book: BookData) => void;
    onDelete: (id: number) => void;
}

const BookItem = ({ book, onEdit, onDelete }: BookItemProps) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                        <p className="text-sm text-gray-600">by {book.author}</p>
                        <p className="text-sm text-gray-600">Genre: {book.genre}</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                            {book.price} {book.currency}
                        </p>
                        <p className="text-sm text-gray-600">Stock: {book.stock}</p>
                    </div>
                    {book.coverImage && (
                        <img 
                            src={book.coverImage} 
                            alt={book.title}
                            className="h-20 w-14 object-cover rounded"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/150';
                            }}
                        />
                    )}
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                    <button
                        onClick={() => onEdit(book)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(book.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                    >
                        {showDetails ? 'Hide Details' : 'View Details'}
                    </button>
                </div>

                {showDetails && (
                    <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
                        <p><span className="font-medium">Publisher:</span> {book.publisher}</p>
                        <p><span className="font-medium">Published:</span> {book.publicationYear}</p>
                        <p><span className="font-medium">Pages:</span> {book.pages}</p>
                        <p><span className="font-medium">Language:</span> {book.language}</p>
                        <p className="mt-2 text-gray-700">{book.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export function ManageBooks() {
    const dispatch = useDispatch<AppDispatch>();
    const books = useSelector((state: RootState) => state.books.list);
    const error = useSelector((state: RootState) => state.books.error);
    const [loading, setLoading] = useState(true);
    const [searchId, setSearchId] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [searchGenre, setSearchGenre] = useState("");
    const [searchedBook, setSearchedBook] = useState<BookData | null>(null);
    const [searchedBooks, setSearchedBooks] = useState<BookData[]>([]);
    const [searchType, setSearchType] = useState<'id' | 'title' | 'genre'>('id');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState<BookData | null>(null);

    useEffect(() => {
        dispatch(getAllBooks()).then(() => setLoading(false));
    }, [dispatch]);

    const handleSearch = async () => {
        try {
            setSearchedBook(null);
            setSearchedBooks([]);
            
            if (searchType === 'id') {
                if (!searchId || isNaN(parseInt(searchId))) {
                    alert("Please enter a valid book ID");
                    return;
                }
                const data = await getBookById(parseInt(searchId));
                setSearchedBook(data);
            } 
            else if (searchType === 'title' && searchTitle.trim()) {
                const data = await searchBooksByTitle(searchTitle);
                setSearchedBooks(Array.isArray(data) ? data : [data]);
            }
            else if (searchType === 'genre' && searchGenre.trim()) {
                const data = await searchBooksByGenre(searchGenre);
                setSearchedBooks(Array.isArray(data) ? data : [data]);
            }
            else {
                alert(`Please enter a valid ${searchType}`);
            }
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || "Failed to fetch books";
            alert(errorMsg);
            setSearchedBook(null);
            setSearchedBooks([]);
        }
    };
    
    const clearSearch = () => {
        setSearchId("");
        setSearchTitle("");
        setSearchGenre("");
        setSearchedBook(null);
        setSearchedBooks([]);
        setSearchType('id');
    };

    const handleAdd = () => {
        setShowAddModal(true);
    };

    const handleEdit = (book: BookData) => {
        setSelectedBook(book);
        setShowEditModal(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await deleteBook(id);
                dispatch(getAllBooks());
                if (searchedBook && searchedBook.id === id) {
                    setSearchedBook(null);
                }
            } catch (err: any) {
                alert(err.response?.data?.error || "Failed to delete book");
            }
        }
    };

    const handleSave = async (book: BookData) => {
        try {
            await saveBook(book);
            dispatch(getAllBooks());
            setShowAddModal(false);
        } catch (err: any) {
            alert(err.response?.data?.error || "Failed to add book");
        }
    };

    const handleUpdate = async (updatedBook: BookData) => {
        try {
            await updateBook(updatedBook.id, updatedBook);
            dispatch(getAllBooks());
            if (searchedBook && searchedBook.id === updatedBook.id) {
                setSearchedBook(updatedBook);
            }
            setShowEditModal(false);
        } catch (err: any) {
            alert(err.response?.data?.error || "Failed to update book");
        }
    };

    if (loading) {
        return <div className="text-center p-8 text-gray-600">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-600">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-8" style={{ paddingTop: "80px" }}>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Manage Books</h1>
            <div className="mb-6 space-y-4">
                <div className="flex items-center space-x-4">
                    <select 
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value as 'id' | 'title' | 'genre')}
                        className="p-2 border rounded-md"
                    >
                        <option value="id">Search by ID</option>
                        <option value="title">Search by Title</option>
                        <option value="genre">Search by Genre</option>
                    </select>
                    
                    {searchType === 'id' && (
                        <input
                            type="text"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            placeholder="Enter book ID"
                            className="p-2 border rounded-md flex-1"
                        />
                    )}
                    
                    {searchType === 'title' && (
                        <input
                            type="text"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            placeholder="Enter book title"
                            className="p-2 border rounded-md flex-1"
                        />
                    )}
                    
                    {searchType === 'genre' && (
                        <input
                            type="text"
                            value={searchGenre}
                            onChange={(e) => setSearchGenre(e.target.value)}
                            placeholder="Enter genre"
                            className="p-2 border rounded-md flex-1"
                        />
                    )}
                    
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Search
                    </button>
                    
                    <button
                        onClick={clearSearch}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Clear
                    </button>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Add New Book
                </button>
            </div>

            {searchedBook ? (
                <div className="mt-4 p-4 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Search Result</h3>
                    <BookItem 
                        book={searchedBook} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                    />
                </div>
            ) : searchedBooks.length > 0 ? (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-4">Search Results ({searchedBooks.length} found)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchedBooks.map((book) => (
                            <BookItem 
                                key={book.id} 
                                book={book} 
                                onEdit={handleEdit} 
                                onDelete={handleDelete} 
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <BookItem 
                            key={book.id} 
                            book={book} 
                            onEdit={handleEdit} 
                            onDelete={handleDelete} 
                        />
                    ))}
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.author}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.genre}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.price} {book.currency}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.stock}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button
                                    onClick={() => handleEdit(book)}
                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(book.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showAddModal && (
                <BookFormModal
                    onClose={() => setShowAddModal(false)}
                    onSave={handleSave}
                    title="Add New Book"
                />
            )}

            {showEditModal && selectedBook && (
                <BookFormModal
                    book={selectedBook}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleUpdate}
                    title="Edit Book"
                />
            )}
        </div>
    );
}

interface BookFormModalProps {
    book?: BookData;
    onClose: () => void;
    onSave: (book: BookData) => void;
    title: string;
}

function BookFormModal({ book, onClose, onSave, title }: BookFormModalProps) {
    const [formData, setFormData] = useState<BookData>(
        book || {
            id: 0,
            title: "",
            author: "",
            genre: "",
            price: 0,
            currency: "USD",
            coverImage: "",
            publicationYear: new Date().getFullYear(),
            publisher: "",
            description: "",
            pages: 0,
            language: "English",
            stock: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "id" || name === "price" || name === "publicationYear" || name === "pages" || name === "stock"
                ? parseInt(value) || 0
                : value,
        }));
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!formData.id || !formData.title || !formData.author || !formData.genre || !formData.price || !formData.currency || !formData.coverImage || !formData.publicationYear || !formData.publisher || !formData.description || !formData.pages || !formData.language || !formData.stock) {
            alert("All fields are required");
            return;
        }
        onSave({
            ...formData,
            createdAt: book?.createdAt || new Date(),
            updatedAt: new Date(),
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto max-h-[80vh]">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="id">ID</label>
                        <input
                            type="number"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            disabled={!!book}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="author">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="genre">Genre</label>
                        <input
                            type="text"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="currency">Currency</label>
                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="coverImage">Cover Image URL</label>
                        <input
                            type="text"
                            name="coverImage"
                            value={formData.coverImage}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="publicationYear">Publication Year</label>
                        <input
                            type="number"
                            name="publicationYear"
                            value={formData.publicationYear}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="publisher">Publisher</label>
                        <input
                            type="text"
                            name="publisher"
                            value={formData.publisher}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pages">Pages</label>
                        <input
                            type="number"
                            name="pages"
                            value={formData.pages}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="language">Language</label>
                        <input
                            type="text"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="stock">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}