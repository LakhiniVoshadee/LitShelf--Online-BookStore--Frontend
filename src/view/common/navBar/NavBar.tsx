import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png';
import { useEffect, useState } from "react";

export function NavBar() {
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('role');
        setUsername(storedUsername);
        setRole(storedRole);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#ffffff] to-[#ffffff] shadow-lg">
            <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 sm:px-8 lg:px-10">
                <div className="flex items-center space-x-6">
                    <img src={logo} alt="SHOP Logo" className="h-12 w-auto rounded-full" />
                    <h1 className="text-black text-2xl font-bold  tracking-wide transition-colors duration-300 hover:text-orange-400">
                        LitShelf<span className="text-orange-500">.</span>
                    </h1>
                </div>

                {/* Mobile Menu Toggle */}
                <div
                    className="lg:hidden flex flex-col justify-center cursor-pointer space-y-1.5"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center space-x-8 list-none m-0 p-0">
                    {role === 'customer' && (
                        <>
                            <li>
                                <Link
                                    className="text-black text-lg font-medium px-4 py-2 rounded-md transition-all duration-300 relative overflow-hidden hover:bg-[#415A77]/30 hover:text-gray-100 group"
                                    to="/"
                                >
                                    Home
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-black text-lg font-medium px-4 py-2 rounded-md transition-all duration-300 relative overflow-hidden hover:bg-[#415A77]/30 hover:text-gray-100 group"
                                    to="/about"
                                >
                                    About
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-black text-lg font-medium px-4 py-2 rounded-md transition-all duration-300 relative overflow-hidden hover:bg-[#415A77]/30 hover:text-gray-100 group"
                                    to="/projects"
                                >
                                    Projects
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-black text-lg font-medium px-4 py-2 rounded-md transition-all duration-300 relative overflow-hidden hover:bg-[#415A77]/30 hover:text-gray-100 group"
                                    to="/contact"
                                >
                                    Contact
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-black text-lg font-medium px-4 py-2 rounded-md transition-all duration-300 relative overflow-hidden hover:bg-[#415A77]/30 hover:text-gray-100 group"
                                    to="/shopping-cart"
                                >
                                    My Cart
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Auth Button */}
                <button
                    className="bg-orange-500 text-white px-6 py-2 rounded-md text-lg font-semibold transition-all duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    aria-label={username ? `Logged in as ${username}` : "Sign In"}
                >
                    {username ? (
                        <span className="text-white">{username}</span>
                    ) : (
                        <Link to="/auth" className="text-white no-underline">Sign In</Link>
                    )}
                </button>
            </nav>

            {/* Mobile Menu */}
            <ul
                className={`lg:hidden fixed top-[80px] left-[-100%] w-full flex-col bg-[#0d1b2a] text-center transition-all duration-300 shadow-[0_10px_27px_rgba(0,0,0,0.1)] ${isMobileMenuOpen ? 'left-0' : ''}`}
            >
                <li className="py-5 border-b border-[#1b263b]">
                    <Link
                        className="text-white text-lg font-medium block transition-colors duration-300 hover:text-orange-400"
                        to="/"
                        onClick={toggleMobileMenu}
                    >
                        Home
                    </Link>
                </li>
                <li className="py-5 border-b border-[#1b263b]">
                    <Link
                        className="text-white text-lg font-medium block transition-colors duration-300 hover:text-orange-400"
                        to="/about"
                        onClick={toggleMobileMenu}
                    >
                        About
                    </Link>
                </li>
                <li className="py-5 border-b border-[#1b263b]">
                    <Link
                        className="text-white text-lg font-medium block transition-colors duration-300 hover:text-orange-400"
                        to="/projects"
                        onClick={toggleMobileMenu}
                    >
                        Projects
                    </Link>
                </li>
                <li className="py-5 border-b border-[#1b263b]">
                    <Link
                        className="text-white text-lg font-medium block transition-colors duration-300 hover:text-orange-400"
                        to="/contact"
                        onClick={toggleMobileMenu}
                    >
                        Contact
                    </Link>
                </li>
                {role === 'customer' && (
                    <li className="py-5">
                        <Link
                            className="text-white text-lg font-medium block transition-colors duration-300 hover:text-orange-400"
                            to="/shopping-cart"
                            onClick={toggleMobileMenu}
                        >
                            My Cart
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
}