import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CTASection() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted email:', email);
    };

    return (
        <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Ready to Transform Your Note-Taking?
                    </h2>
                    <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                        Join thousands of users who are already boosting their productivity with our app.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-grow px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-white/70"
                                required
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                            >
                                Get Started Free
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="bg-gray-800 text-white pt-6 pb-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm">
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-2 flex items-center">
                            <span className="text-green-400">Lit</span>Shelf
                        </h3>
                        <p className="text-gray-400 max-w-xs">
                            Discover, share, and explore the world of literature with fellow book lovers.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12">
                        <div>
                            <h4 className="text-orange-400 font-semibold mb-2">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Browse Books</a></li>
                                <li><a href="#" className="hover:text-white">My Library</a></li>
                                <li><a href="#" className="hover:text-white">Reading Lists</a></li>
                                <li><a href="#" className="hover:text-white">Book Reviews</a></li>
                                <li><a href="#" className="hover:text-white">Author Profiles</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-orange-400 font-semibold mb-2">Community</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Book Clubs</a></li>
                                <li><a href="#" className="hover:text-white">Discussion Forums</a></li>
                                <li><a href="#" className="hover:text-white">Reading Challenges</a></li>
                                <li><a href="#" className="hover:text-white">Author Events</a></li>
                                <li><a href="#" className="hover:text-white">Newsletter</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-orange-400 font-semibold mb-2">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Help Center</a></li>
                                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-xs">
                    &copy; 2025 LitShelf. All rights reserved. Made with ♥ for book lovers.
                </div>
            </div>
        </footer>
    );
}