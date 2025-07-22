import { Link } from "react-router-dom";

export function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl w-full text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 transition-all duration-300">About Me</h1>
                <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                        I'm a passionate developer with a focus on building modern, user-friendly web applications. With expertise in front-end and back-end technologies, I strive to create solutions that are both functional and visually appealing.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h2>
                    <ul className="flex flex-wrap justify-center gap-3 mb-6">
                        <li className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 hover:bg-blue-200">
                            React
                        </li>
                        <li className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 hover:bg-blue-200">
                            Tailwind CSS
                        </li>
                        <li className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 hover:bg-blue-200">
                            JavaScript
                        </li>
                        <li className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 hover:bg-blue-200">
                            Node.js
                        </li>
                    </ul>
                    <Link
                        to="/contact"
                        className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-lg font-medium"
                    >
                        Get in Touch
                    </Link>
                </div>
            </div>
        </div>
    );
}