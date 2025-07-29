import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import type { formUser, LoginFormUser, VerifyUser } from "../models/User.ts";
import { getUser, loginUser, saveUser, verifyUserService } from "../service/userService.ts";
import * as React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch } from "react-redux";
import { login } from "../Store/slice/AuthSlice.ts";
import { useNavigate } from "react-router-dom";

export default function AuthSystem() {
    const MySwal = withReactContent(Swal);
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userForm, setUserForm] = useState<formUser>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [verifyUser, setVerifyUser] = useState<VerifyUser>({
        email: "",
        verificationCode: 0
    });

    const [loginForm, setLoginForm] = useState<LoginFormUser>({
        email: "",
        password: ""
    });

    const showErrorAlert = (title: string, html: string) => {
        return MySwal.fire({
            title: `<strong>${title}</strong>`,
            html: `<i>${html}</i>`,
            icon: 'error',
            background: '#1F2937',
            color: '#F3F4F6',
            confirmButtonText: 'OK',
            confirmButtonColor: '#F59E0B',
            buttonsStyling: false,
            customClass: {
                container: 'dark',
                popup: 'bg-gray-800 rounded-xl border border-gray-700',
                title: 'text-2xl font-bold text-white',
                htmlContainer: 'text-gray-300',
                confirmButton: 'bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/20'
            }
        });
    };

    const showSuccessAlert = (title: string, html: string) => {
        return MySwal.fire({
            title: `<strong>${title}</strong>`,
            html: `<i>${html}</i>`,
            icon: 'success',
            background: '#1F2937',
            color: '#F3F4F6',
            confirmButtonText: 'OK',
            confirmButtonColor: '#F59E0B',
            buttonsStyling: false,
            customClass: {
                container: 'dark',
                popup: 'bg-gray-800 rounded-xl border border-gray-700',
                title: 'text-2xl font-bold text-white',
                htmlContainer: 'text-gray-300',
                confirmButton: 'bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/20'
            }
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserForm(prev => ({ ...prev, [name]: value }));
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = (): boolean => {
        if (!/^\S+@\S+\.\S+$/.test(userForm.email)) {
            showErrorAlert("Invalid Email", "Please enter a valid email address.");
            return false;
        }

        if (userForm.password.length < 6) {
            showErrorAlert("Password Too Short", "Password must be at least 6 characters long.");
            return false;
        }

        if (userForm.password !== userForm.confirmPassword) {
            showErrorAlert("Password Mismatch", "Your passwords do not match. Please try again.");
            return false;
        }

        if (!userForm.name || !userForm.email || !userForm.password || !userForm.confirmPassword) {
            showErrorAlert("Validation Error", "All fields are required.");
            return false;
        }

        return true;
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log("Login attempt:", loginForm.email);
            const response = await getUser(loginForm);
            console.log(response);

            const email = response.email;
            const userId = response.id;
            localStorage.setItem('email', email);
            localStorage.setItem('userId', userId);

            if (response.isVerified === false) {
                await showErrorAlert("Your email Not Verified", "Check your email for the verification code.");
                setUserForm({ name: response.name, email: email, password: "", confirmPassword: "" });
                setShowVerification(true);
            }

            if (!loginForm.email || !loginForm.password) {
                showErrorAlert("Missing Credentials", "Please enter both email and password");
                return;
            }

            const token = await loginUser(loginForm);

            if (!token) {
                showErrorAlert("Login Failed", "Invalid email or password. Please try again.");
                return;
            }

            localStorage.setItem('token', token);
            dispatch(login());

            await showSuccessAlert(
                "Login Successful",
                "Welcome back! You are now logged in."
            );

            setLoginForm({ email: "", password: "" });
            navigate('/homePage');
        } catch (error) {
            console.error("Login error:", error);
            showErrorAlert(
                "Login Error",
                "An unexpected error occurred. Please try again later."
            );
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!validateForm()) return;
            const newUser: formUser = {
                name: userForm.name,
                email: userForm.email.toLowerCase(),
                password: userForm.password,
                confirmPassword: userForm.confirmPassword
            };

            const response = await saveUser(newUser);
            console.log(verifyUser);
            if (response.status === 200) {
                await showSuccessAlert("Registration Successful", "Check your email for the verification code.");
                setShowVerification(true);
            } else {
                showErrorAlert("Registration Failed", response.data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            showErrorAlert("Registration Error", "There was an error during registration. Please try again later.");
        }
    };

    const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^\d$/.test(value) || value === "") {
            const newCode = [...verificationCode];
            newCode[index] = value;
            setVerificationCode(newCode);

            if (value && index < verificationCode.length - 1) {
                const nextInput = document.getElementById(`verification-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleVerifySubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Verification attempt:");
        try {
            const generatedCode = verificationCode.join("");
            const email = userForm.email.toLowerCase();
            const newVerifyUser: VerifyUser = {
                email: email,
                verificationCode: parseInt(generatedCode)
            };

            setVerifyUser(newVerifyUser);
            const response = await verifyUserService(newVerifyUser);

            if (response.status === 200) {
                await showSuccessAlert("Verification Successful", "Your account has been verified successfully!");
                resetForms();
            } else {
                showErrorAlert("Verification Failed", response.data.message || "Verification failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during verification:", error);
            showErrorAlert("Verification Error", "There was an error during verification. Please try again later.");
        }
    };

    const resetForms = () => {
        setShowVerification(false);
        setVerifyUser({ email: "", verificationCode: 0 });
        setVerificationCode(["", "", "", "", "", ""]);
        setUserForm({ name: "", email: "", password: "", confirmPassword: "" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-beige-100 to-beige-200 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-block bg-orange-500 rounded-full p-2 mb-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">LitShelf</h1>
                    <p className="text-gray-600">Your digital library awaits</p>
                </div>

                <div className="flex mb-6">
                    <button
                        onClick={() => setActiveTab("login")}
                        className={`flex-1 py-3 font-medium text-lg transition-colors ${activeTab === "login" ? "text-gray-800 border-b-2 border-orange-500" : "text-gray-500"}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setActiveTab("register")}
                        className={`flex-1 py-3 font-medium text-lg transition-colors ${activeTab === "register" ? "text-gray-800 border-b-2 border-orange-500" : "text-gray-500"}`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Login Form */}
                <AnimatePresence mode="wait">
                    {activeTab === "login" && (
                        <motion.form
                            onSubmit={handleLoginSubmit}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-xl p-6 shadow-lg"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Login</h2>

                            <div className="mb-4">
                                <label className="block text-gray-600 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={loginForm.email}
                                        onChange={handleLoginChange}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                                        placeholder="lakshmi@gmail.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-600 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={loginForm.password}
                                        onChange={handleLoginChange}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors duration-200"
                            >
                                Sign In
                            </button>

                            <div className="mt-4 text-center">
                                <a href="#" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Register Form */}
                <AnimatePresence mode="wait">
                    {activeTab === "register" && (
                        <motion.form
                            onSubmit={handleRegisterSubmit}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-xl p-6 shadow-lg"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Sign Up</h2>

                            <div className="mb-4">
                                <label className="block text-gray-600 mb-2">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={userForm.name}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-600 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userForm.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                                        placeholder="lakshmi@gmail.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-600 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={userForm.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-600 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={userForm.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors duration-200"
                            >
                                Create Account
                            </button>

                            <div className="mt-4 text-center text-sm text-gray-600">
                                Or continue with
                            </div>
                            <div className="flex justify-between mt-4">
                                <button className="w-1/2 mr-2 bg-white border border-gray-300 text-gray-800 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100">
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                        <path d="M1 1h22v22H1z" fill="none"/>
                                    </svg>
                                    Google
                                </button>
                                <button className="w-1/2 ml-2 bg-white border border-gray-300 text-gray-800 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100">
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path d="M22.58 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#3B5998"/>
                                    </svg>
                                    Facebook
                                </button>
                            </div>
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => navigate('/')}
                                    className="text-sm text-orange-500 hover:text-orange-600 transition-colors"
                                >
                                    Go Back
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Verification Modal */}
                <AnimatePresence>
                    {showVerification && (
                        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", damping: 20 }}
                                className="bg-gray-800 rounded-xl p-6 sm:p-8 w-full max-w-md mx-4 shadow-2xl border border-gray-700"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">Verify Your Email</h3>
                                </div>

                                <div className="text-gray-300 mb-6 sm:mb-8">
                                    <p>We've sent a 6-digit verification code to:</p>
                                    <p className="font-medium text-white mt-1 text-sm sm:text-base">{userForm.email}</p>
                                    <p className="mt-2 text-xs sm:text-sm">Please check your inbox and enter the code below.</p>
                                </div>

                                <form onSubmit={handleVerifySubmit}>
                                    <div className="grid grid-cols-6 gap-2 sm:gap-3 mb-6 sm:mb-8">
                                        {verificationCode.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`verification-${index}`}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleVerificationChange(e, index)}
                                                className="w-full aspect-square text-center text-xl sm:text-2xl font-bold bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                                                required
                                            />
                                        ))}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-yellow-500/20 flex items-center justify-center text-sm sm:text-base"
                                    >
                                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                                        Verify Account
                                    </button>
                                </form>

                                <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-400">
                                    Didn't receive the code? <button className="text-yellow-400 hover:text-yellow-300">Resend</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}