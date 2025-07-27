import axios from "axios";

export const backendApi = axios.create({ baseURL: 'http://localhost:3001/api' });

// Add a request interceptor
backendApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export interface BookData {
    id: number;
    title: string;
    author: string;
    genre: string;
    price: number;
    currency: string;
    coverImage: string;
    publicationYear: number;
    publisher: string;
    description?: string;
    pages: number;
    language: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export const getAllBooks = async () => {
    const response = await backendApi.get("/books/all");
    return response.data;
};

export const getBookById = async (id: number) => {
    const response = await backendApi.get(`/books/${id}`);
    return response.data;
};

export const saveBook = async (book: BookData) => {
    const response = await backendApi.post("/books/save", book);
    return response.data;
};

export const updateBook = async (id: number, data: Partial<BookData>) => {
    const response = await backendApi.put(`/books/update/${id}`, data);
    return response.data;
};

export const deleteBook = async (id: number) => {
    const response = await backendApi.delete(`/books/delete/${id}`);
    return response.data;
};

export interface UserDto {
    id: number;
    username: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const getAllUsers = async () => {
    const response = await backendApi.get("/auth/users");
    return response.data;
};

export const getUserById = async (id: number) => {
    const response = await backendApi.get(`/auth/users/${id}`);
    return response.data;
};

export const updateUser = async (id: number, data: Partial<UserDto>) => {
    const response = await backendApi.put(`/auth/users/${id}`, data);
    return response.data;
};

export const deleteUser = async (id: number) => {
    const response = await backendApi.delete(`/auth/users/${id}`);
    return response.data;
};