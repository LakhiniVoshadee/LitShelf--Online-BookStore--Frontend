import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';

export function NavBar() {
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cart } = useSelector((state: RootState) => state.cart);

    const cartItemCount = cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('role');
        setUsername(storedUsername);
        setRole(storedRole);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        window.location.href = '/auth';
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-orange-100">
            <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 sm:px-8 lg:px-10">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <img src={logo} alt="LitShelf Logo" className="h-12 w-auto rounded-full shadow-md" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-gray-900 text-2xl font-bold tracking-wide transition-colors duration-300 hover:text-orange-600 cursor-pointer">
                            LitShelf<span className="text-orange-500">.</span>
                        </h1>
                        <p className="text-xs text-gray-500 font-medium">Digital Library</p>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div
                    className="lg:hidden flex flex-col justify-center cursor-pointer space-y-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center space-x-3 list-none m-0 p-0">
                    <li>
                        <Link
                            className="text-gray-700 hover:text-orange-600 p-3 rounded-xl transition-all duration-300 relative overflow-hidden hover:bg-orange-50 group flex items-center justify-center"
                            to="/"
                            title="Home"
                        >
                            <svg className="w-6 h-6 group-hover:scale-125 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                            </svg>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-gray-700 hover:text-orange-600 p-3 rounded-xl transition-all duration-300 relative overflow-hidden hover:bg-orange-50 group flex items-center justify-center"
                            to="/about"
                            title="About Us"
                        >
                            <svg className="w-6 h-6 group-hover:scale-125 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                            </svg>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-gray-700 hover:text-orange-600 p-3 rounded-xl transition-all duration-300 relative overflow-hidden hover:bg-orange-50 group flex items-center justify-center"
                            to="/contact"
                            title="Contact Us"
                        >
                            <svg className="w-6 h-6 group-hover:scale-125 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                        </Link>
                    </li>
                    {role === 'customer' && (
                        <li>
                            <Link
                                className="text-gray-700 hover:text-orange-600 p-3 rounded-xl transition-all duration-300 relative overflow-hidden hover:bg-orange-50 group flex items-center justify-center"
                                to="/shopping-cart"
                                title="Shopping Cart"
                            >
                                <div className="relative">
                                    <svg className="w-6 h-6 group-hover:scale-125 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 7h-3V6c0-2.21-1.79-4-4-4S8 3.79 8 6v1H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 6c0-1.1.9-2 2-2s2 .9 2 2v1h-4V6zm0 9c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm6 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z"/>
                                    </svg>
                                    {cartItemCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-bounce">
                                            {cartItemCount > 99 ? '99+' : cartItemCount}
                                        </span>
                                    )}
                                </div>
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                            </Link>
                        </li>
                    )}
                    {role === 'admin' && (
                        <>
                            <li>
                                <Link
                                    className="text-gray-700 hover:text-orange-600 p-3 rounded-xl transition-all duration-300 relative overflow-hidden hover:bg-orange-50 group flex items-center justify-center"
                                    to="/admin/dashboard"
                                    title="Admin Dashboard"
                                >
                                    <svg className="w-6 h-6 group-hover:scale-125 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                                    </svg>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-gray-700 hover:text-orange-600 p-3 rounded-xl transition-all duration-300 relative overflow-hidden hover:bg-orange-50 group flex items-center justify-center"
                                    to="/admin/books"
                                    title="Manage Books"
                                >
                                    <svg className="w-6 h-6 group-hover:scale-125 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                                    </svg>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-gray-700 hover:text-orange-600 p-3 rounded-xl transition-all duration-300 relative overflow-hidden hover:bg-orange-50 group flex items-center justify-center"
                                    to="/admin/users"
                                    title="Manage Users"
                                >
                                    <svg className="w-6 h-6 group-hover:scale-125 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-4h3l1 4h2l-1-4h3v4h2v-6H4v6zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2z"/>
                                    </svg>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Auth Section */}
                <div className="flex items-center space-x-4">
                    {username ? (
                        <div className="flex items-center space-x-4">
                            <div className="hidden sm:flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-900 text-sm font-semibold">{username}</span>
                                    <span className="text-gray-500 text-xs capitalize">{role}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                                title="Logout"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/auth"
                            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                            title="Sign In"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
                            </svg>
                        </Link>
                    )}
                </div>
            </nav>

            {/* Mobile Menu */}
            <ul
                className={`lg:hidden fixed top-[84px] left-0 w-full flex-col bg-white/95 backdrop-blur-lg text-center transition-all duration-300 shadow-xl border-t border-orange-100 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <li className="border-b border-gray-100">
                    <Link
                        className="text-gray-700 hover:text-orange-600 text-base font-medium py-4 px-6 transition-all duration-300 hover:bg-orange-50 flex items-center justify-center space-x-3"
                        to="/"
                        onClick={toggleMobileMenu}
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                        <span>Home</span>
                    </Link>
                </li>
                <li className="border-b border-gray-100">
                    <Link
                        className="text-gray-700 hover:text-orange-600 text-base font-medium py-4 px-6 transition-all duration-300 hover:bg-orange-50 flex items-center justify-center space-x-3"
                        to="/about"
                        onClick={toggleMobileMenu}
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg>
                        <span>About</span>
                    </Link>
                </li>
                <li className="border-b border-gray-100">
                    <Link
                        className="text-gray-700 hover:text-orange-600 text-base font-medium py-4 px-6 transition-all duration-300 hover:bg-orange-50 flex items-center justify-center space-x-3"
                        to="/contact"
                        onClick={toggleMobileMenu}
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        <span>Contact</span>
                    </Link>
                </li>
                {role === 'customer' && (
                    <li className="border-b border-gray-100">
                        <Link
                            className="text-gray-700 hover:text-orange-600 text-base font-medium py-4 px-6 transition-all duration-300 hover:bg-orange-50 flex items-center justify-center space-x-3"
                            to="/shopping-cart"
                            onClick={toggleMobileMenu}
                        >
                            <div className="relative">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 7h-3V6c0-2.21-1.79-4-4-4S8 3.79 8 6v1H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 6c0-1.1.9-2 2-2s2 .9 2 2v1h-4V6zm0 9c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm6 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z"/>
                                </svg>
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        {cartItemCount > 99 ? '99+' : cartItemCount}
                                    </span>
                                )}
                            </div>
                            <span>My Cart</span>
                        </Link>
                    </li>
                )}
                {role === 'admin' && (
                    <>
                        <li className="border-b border-gray-100">
                            <Link
                                className="text-gray-700 hover:text-orange-600 text-base font-medium py-4 px-6 transition-all duration-300 hover:bg-orange-50 flex items-center justify-center space-x-3"
                                to="/admin/dashboard"
                                onClick={toggleMobileMenu}
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                                </svg>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="border-b border-gray-100">
                            <Link
                                className="text-gray-700 hover:text-orange-600 text-base font-medium py-4 px-6 transition-all duration-300 hover:bg-orange-50 flex items-center justify-center space-x-3"
                                to="/admin/books"
                                onClick={toggleMobileMenu}
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                                </svg>
                                <span>Manage Books</span>
                            </Link>
                        </li>
                        <li className="border-b border-gray-100">
                            <Link
                                className="text-gray-700 hover:text-orange-600 text-base font-medium py-4 px-6 transition-all duration-300 hover:bg-orange-50 flex items-center justify-center space-x-3"
                                to="/admin/users"
                                onClick={toggleMobileMenu}
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-4h3l1 4h2l-1-4h3v4h2v-6H4v6zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2z"/>
                                </svg>
                                <span>Manage Users</span>
                            </Link>
                        </li>
                    </>
                )}

                {/* Mobile User Info */}
                {username && (
                    <li className="bg-gray-50 p-4">
                        <div className="flex items-center justify-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                                {username.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-900 font-semibold">{username}</span>
                                <span className="text-gray-500 text-sm capitalize">{role}</span>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}