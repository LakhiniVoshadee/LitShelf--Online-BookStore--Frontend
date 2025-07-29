import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSignInAlt, faUserPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const isAuth = localStorage.getItem("isAuth") === "true";

    const handleLogin = () => {
        navigate("/login");
        setIsMobileMenuOpen(false);
    };

    const handleRegister = () => {
        navigate("/login");
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.setItem("isAuth", "false");
        localStorage.removeItem("token");
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        navigate("/");
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Features", href: "#features" },
        { name: "About", href: "#about" },
    ];

    return (
        <motion.nav
            className={`fixed w-full z-50 font-sans ${isScrolled ? 'bg-gradient-to-r from-gray-50 to-gray-100/95 backdrop-blur-lg shadow-lg' : 'bg-white/95'} border-b border-gray-200 transition-all duration-300`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div className="container mx-auto px-4 sm:px-6 md:px-16 py-3 flex items-center justify-between">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center"
                >
                    <a href="/" className="text-2xl font-bold text-black tracking-tight flex items-center">
                        <span className="text-orange-500 mr-2">📚</span>LitShelf
                    </a>
                </motion.div>

                <div className="hidden md:flex items-center space-x-8">
                    {!isAuth && navItems.map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.href}
                            className="relative text-black hover:text-orange-500 text-base font-medium tracking-wide group transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                            {item.name}
                            <motion.span
                                className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"
                                initial={{ width: 0 }}
                                whileHover={{ width: '100%' }}
                            />
                        </motion.a>
                    ))}

                    <motion.div className="flex space-x-4 ml-8">
                        {!isAuth ? (
                            <>
                                <motion.button
                                    onClick={handleLogin}
                                    className="px-5 py-2.5 text-sm font-medium text-black border border-gray-300 rounded-full hover:bg-gray-100 hover:text-orange-500 transition-colors flex items-center shadow-sm"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                                    Login
                                </motion.button>
                                <motion.button
                                    onClick={handleRegister}
                                    className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                                    Register
                                </motion.button>
                            </>
                        ) : (
                            <motion.button
                                onClick={handleLogout}
                                className="px-5 py-2.5 text-sm font-medium text-black border border-gray-300 rounded-full hover:bg-gray-100 hover:text-orange-500 transition-colors flex items-center shadow-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                Logout
                            </motion.button>
                        )}
                    </motion.div>
                </div>

                <div className="md:hidden flex items-center space-x-4">
                    <motion.button
                        className="text-black hover:text-orange-500 focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
                    </motion.button>
                    <motion.a href="#" className="relative text-black hover:text-orange-500">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                        </svg>
                        <span className="absolute -top-1 -right-1 text-orange-500 bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">3</span>
                    </motion.a>
                    <motion.a href="#" className="text-black hover:text-orange-500">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </motion.a>
                    <motion.a href="#" className="text-black hover:text-orange-500">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 10.5h-1.5V9H10v4.5H8.5V12H7v1.5h4V12zm3.5 0H14V9h-1.5v6H17v-2h-1.5z"/>
                        </svg>
                    </motion.a>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="md:hidden bg-gradient-to-b from-gray-50 to-gray-100/95 backdrop-blur-lg shadow-lg"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex flex-col space-y-4">
                                {!isAuth && navItems.map((item, index) => (
                                    <motion.a
                                        key={index}
                                        href={item.href}
                                        className="text-black hover:text-orange-500 py-3 border-b border-gray-200 text-base font-medium tracking-wide"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}
                                <div className="flex flex-col space-y-4 pt-4">
                                    {!isAuth ? (
                                        <>
                                            <motion.button
                                                onClick={handleLogin}
                                                className="w-full px-5 py-2.5 text-sm font-medium text-center text-black border border-gray-300 rounded-full hover:bg-gray-100 hover:text-orange-500 transition-colors shadow-sm"
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: navItems.length * 0.1 }}
                                            >
                                                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                                                Login
                                            </motion.button>
                                            <motion.button
                                                onClick={handleRegister}
                                                className="w-full px-5 py-2.5 text-sm font-medium text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: navItems.length * 0.1 + 0.1 }}
                                            >
                                                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                                                Register
                                            </motion.button>
                                        </>
                                    ) : (
                                        <motion.button
                                            onClick={handleLogout}
                                            className="w-full px-5 py-2.5 text-sm font-medium text-center text-black border border-gray-300 rounded-full hover:bg-gray-100 hover:text-orange-500 transition-colors shadow-sm"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: navItems.length * 0.1 }}
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                            Logout
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}