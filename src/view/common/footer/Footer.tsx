import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png';

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 px-5 shadow-2xl">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-6">
                            <img src={logo} alt="LitShelf Logo" className="h-12 w-auto rounded-full mr-4" />
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                                LitShelf
                            </h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Your digital sanctuary for discovering extraordinary books. From timeless classics to contemporary masterpieces, find your next great read at LitShelf.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                               className="group bg-gray-800 hover:bg-orange-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                                <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.1L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                                </svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                               className="group bg-gray-800 hover:bg-orange-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                                <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/>
                                </svg>
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                               className="group bg-gray-800 hover:bg-orange-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                                <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                    <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"/>
                                </svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                               className="group bg-gray-800 hover:bg-orange-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                                <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.8 9.9 67.6 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-orange-400">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-4 h-0.5 bg-orange-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-4 h-0.5 bg-orange-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-4 h-0.5 bg-orange-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/auth" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-4 h-0.5 bg-orange-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Sign In
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Book Categories */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-orange-400">Book Categories</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-4 h-0.5 bg-orange-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Fiction
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-4 h-0.5 bg-orange-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Non-Fiction
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-4 h-0.5 bg-orange-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Science Fiction
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-4 h-0.5 bg-orange-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Biography
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group">
                                    <span className="w-0 group-hover:w-4 h-0.5 bg-orange-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                    Mystery & Thriller
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-orange-400">Customer Support</h4>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-orange-500 p-2 rounded-lg">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-300 text-sm">Phone Support</p>
                                    <p className="text-white text-sm font-medium">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-orange-500 p-2 rounded-lg">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-300 text-sm">Email Support</p>
                                    <p className="text-white text-sm font-medium">support@litshelf.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-orange-500 p-2 rounded-lg">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-300 text-sm">Visit Our Store</p>
                                    <p className="text-white text-sm font-medium">123 Book Street, City</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Subscription */}
                <div className="border-t border-gray-700 pt-12 mb-12">
                    <div className="text-center mb-8">
                        <h4 className="text-2xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                            📚 Stay Updated with LitShelf
                        </h4>
                        <p className="text-gray-300 text-sm max-w-2xl mx-auto">
                            Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and literary events.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full sm:flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        />
                        <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-6">
                            <p className="text-gray-400 text-sm">
                                © {new Date().getFullYear()} LitShelf. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-green-400 text-xs font-medium">Online Store Active</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Link to="/privacy" className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300">
                                Terms of Service
                            </Link>
                            <Link to="/cookies" className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-300">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600"></div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full opacity-5 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400 rounded-full opacity-5 animate-pulse delay-1000"></div>
            </div>
        </footer>
    );
}