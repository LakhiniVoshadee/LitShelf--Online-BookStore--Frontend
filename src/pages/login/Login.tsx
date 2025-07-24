/*
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";

type LoginFormData = {
    email: string;
    password: string;
}

export function Login() {

    const  navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const onSubmit = (data: LoginFormData) => {
        console.log("Login submitted successfully:", data);
        alert(`Login submitted!\nEmail: ${data.email}\nPassword: ${data.password}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Login</h1>
                <div className="mt-1 mb-4">
                    <button onClick={()=> navigate("/")} className="text-sm text-stone-800 hover:text-blue-950 underline">Go Back</button>
                </div>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            placeholder="Enter your email"
                            {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long"
                                }
                            })}
                        />
                        {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 mt-4"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-6">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-600 transition-colors duration-200">Sign Up</a>
                </p>
            </div>
        </div>
    );
}*/

import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {backendApi} from "../../api.ts";
import type {UserData} from "../../model/UserData.ts";
import {getUserFromToken} from "../../auth/auth.ts";


type FormData = {
    username: string;
    password: string;
};

export function Login() {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<FormData>();

    const authenticateUser = async (data: FormData) => {
        try {
            const userCredentials = {
                username: data.username,  // assuming your backend uses "username" for email
                password: data.password
            };

            const response = await backendApi.post('/auth/login', userCredentials); // Replace with your API endpoint
            const accessToken = response.data.accesstoken;
            const refreshToken = response.data.refreshtoken;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

             const user: UserData = getUserFromToken(accessToken);  // Replace with your API endpoint
             localStorage.setItem('username', user?.username as string);
             localStorage.setItem('role', user?.role as string);

            alert("Successfully logged in!");
            navigate('/');
        } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
            <div className="w-full max-w-sm bg-white border border-green-300 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-green-800 underline decoration-2 mb-6 text-center">
                    Sign In
                </h2>
                <div className="mt-1 mb-4">
                    <button onClick={() => navigate("/")}
                            className="text-sm text-green-600 hover:text-green-900 underline">
                        Go Back
                    </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(authenticateUser)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-green-700">
                            Email
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register("username")}
                            className="mt-1 block w-full border border-green-200 rounded-md text-sm shadow-sm focus:ring-green-500 focus:border-green-500"
                            placeholder="username"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-green-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            className="mt-1 block w-full border border-green-200 rounded-md text-sm shadow-sm focus:ring-green-500 focus:border-green-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}