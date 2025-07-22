import {Link} from "react-router-dom";
import logo from '../../../assets/IMG_E6003.png.jpg';
import {useEffect, useState} from "react";

export function NavBar() {
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('role');
        setUsername(storedUsername);
        setRole(storedRole);
    }, []);
    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0d1b2a] to-[#1b263b] shadow-lg">
            <nav className="max-w-6xl mx-auto flex justify-between items-center py-4 px-8">
                <div className="flex items-center">
                    <img src={logo} alt="MyApp Logo" className="h-[50px] w-auto rounded-full mr-2.5"/>
                    <p className="text-white text-2xl font-bold uppercase tracking-wide transition-colors duration-300 hover:text-gray-300">
                        SHOP<span className="text-orange-500">.</span>
                    </p>
                </div>

                <div className="hidden md:flex flex-col cursor-pointer space-y-1.5 lg:hidden" id="mobile-menu">
                    <span className="w-6 h-0.5 bg-white transition-transform duration-400"></span>
                    <span className="w-6 h-0.5 bg-white transition-opacity duration-400"></span>
                    <span className="w-6 h-0.5 bg-white transition-transform duration-400"></span>
                </div>

                <ul className="hidden lg:flex items-center list-none m-0 p-0">
                    {
                        role === 'customer' && (
                            <>
                                <li>
                                    <Link
                                        className="text-white text-base font-medium px-4 py-2 mx-2 rounded-md transition-all duration-300 relative overflow-hidden hover:bg-[#415A77]/20 hover:text-gray-200 group"
                                        to="/"
                                    >
                                        Home
                                        <span
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-white text-base font-medium px-4 py-2 mx-2 rounded-md transition-all duration-300 relative overflow-hidden hover:bg-[#415A77]/20 hover:text-gray-200 group"
                                        to="/about"
                                    >
                                        About
                                        <span
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-white text-base font-medium px-4 py-2 mx-2 rounded-md transition-all duration-300 relative overflow-hidden hover:bg-[#415A77]/20 hover:text-gray-200 group"
                                        to="/projects"
                                    >
                                        Projects
                                        <span
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-white text-base font-medium px-4 py-2 mx-2 rounded-md transition-all duration-300 relative overflow-hidden hover:bg-[#415A77]/20 hover:text-gray-200 group"
                                        to="/contact"
                                    >
                                        Contact
                                        <span
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-white text-base font-medium px-4 py-2 mx-2 rounded-md transition-all duration-300 relative overflow-hidden hover:bg-[#415A77]/20 hover:text-gray-200 group"
                                        to="/shopping-cart"
                                    >
                                        My Cart
                                        <span
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
                                    </Link>
                                </li>
                            </>
                        )
                    }
                </ul>

                <button
                    className="bg-blue-500 text-white border-none px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-600">
                    {username ? (
                        <p className="text-2xl text-white no-underline">{username}</p>

                    ) : (
                        <Link to="/login" className="text-white no-underline">Sign In</Link>
                    )
                    }

                </button>
            </nav>

            {/* Mobile Menu */}
            <ul className="hidden lg:hidden fixed top-[80px] left-[-100%] w-full flex-col bg-[#0d1b2a] text-center transition-all duration-300 shadow-[0_10px_27px_rgba(0,0,0,0.05)] data-[active=true]:left-0">
                <li className="py-4">
                    <Link
                        className="text-white text-base font-medium block transition-colors duration-300 hover:text-blue-400"
                        to="/">Home</Link>
                </li>
                <li className="py-4">
                    <Link
                        className="text-white text-base font-medium block transition-colors duration-300 hover:text-blue-400"
                        to="/about">About</Link>
                </li>
                <li className="py-4">
                    <Link
                        className="text-white text-base font-medium block transition-colors duration-300 hover:text-blue-400"
                        to="/projects">Projects</Link>
                </li>
                <li className="py-4">
                    <Link
                        className="text-white text-base font-medium block transition-colors duration-300 hover:text-blue-400"
                        to="/contact">Contact</Link>
                </li>
            </ul>
        </div>
    );
}