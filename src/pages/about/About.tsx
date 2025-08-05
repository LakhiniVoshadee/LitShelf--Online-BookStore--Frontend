import { Link } from "react-router-dom";

export function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-orange-400 rounded-full opacity-10 animate-bounce"></div>
            </div>

            <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl shadow-2xl mb-8">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                        About <span className="text-orange-600">LitShelf</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Your digital sanctuary for discovering extraordinary literature and building meaningful connections through the power of books.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Story Section */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                        <div className="order-2 lg:order-1">
                            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-orange-100">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    LitShelf was born from a simple belief: that every book has the power to transport, transform, and inspire. Founded in 2024, we set out to create more than just an online bookstore—we envisioned a digital sanctuary where book lovers could discover their next great read.
                                </p>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    From timeless classics that have shaped generations to contemporary masterpieces pushing literary boundaries, we curate a collection that celebrates the diversity and richness of human storytelling.
                                </p>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-orange-100 p-3 rounded-xl">
                                        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                        </svg>
                                    </div>
                                    <p className="text-gray-700 font-medium">Carefully curated collection of quality literature</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-8 transform rotate-3 shadow-2xl">
                                    <div className="bg-white rounded-2xl p-6 transform -rotate-3">
                                        <div className="text-center">
                                            <div className="text-6xl mb-4">📚</div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">12,000+</h3>
                                            <p className="text-gray-600">Books Available</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-orange-100">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">👥</div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">50,000+</h3>
                                        <p className="text-gray-600 text-sm">Happy Readers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-2xl">
                            <div className="bg-white/20 rounded-2xl p-4 w-fit mb-6">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-orange-100 leading-relaxed">
                                To make quality literature accessible to everyone, fostering a global community of readers who share a passion for storytelling and continuous learning through books.
                            </p>
                        </div>
                        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-orange-100">
                            <div className="bg-orange-100 rounded-2xl p-4 w-fit mb-6">
                                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-700 leading-relaxed">
                                To become the world's most trusted digital library, where every reader finds their perfect book and every book finds its perfect reader.
                            </p>
                        </div>
                    </div>

                    {/* Values Section */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-orange-100 mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Stand For</h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                Our core values guide everything we do, from book curation to customer service.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center group">
                                <div className="bg-orange-100 group-hover:bg-orange-200 rounded-2xl p-6 w-fit mx-auto mb-4 transition-colors duration-300">
                                    <svg className="w-10 h-10 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
                                <p className="text-gray-600">Every book in our collection is carefully selected for its literary merit and reader value.</p>
                            </div>
                            <div className="text-center group">
                                <div className="bg-orange-100 group-hover:bg-orange-200 rounded-2xl p-6 w-fit mx-auto mb-4 transition-colors duration-300">
                                    <svg className="w-10 h-10 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Diversity</h3>
                                <p className="text-gray-600">We celebrate diverse voices and stories from authors of all backgrounds and perspectives.</p>
                            </div>
                            <div className="text-center group">
                                <div className="bg-orange-100 group-hover:bg-orange-200 rounded-2xl p-6 w-fit mx-auto mb-4 transition-colors duration-300">
                                    <svg className="w-10 h-10 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Accessibility</h3>
                                <p className="text-gray-600">Making great literature accessible to everyone, regardless of location or circumstance.</p>
                            </div>
                        </div>
                    </div>

                    {/* Technology Stack */}
                    {/*<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12 mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built with Modern Technology</h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                LitShelf is powered by cutting-edge technology to ensure a smooth, secure, and enjoyable reading experience.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                            {[
                                { name: 'React', color: 'bg-blue-100 text-blue-700' },
                                { name: 'TypeScript', color: 'bg-blue-100 text-blue-700' },
                                { name: 'Node.js', color: 'bg-green-100 text-green-700' },
                                { name: 'MongoDB', color: 'bg-green-100 text-green-700' },
                                { name: 'Express', color: 'bg-gray-100 text-gray-700' },
                                { name: 'Redux', color: 'bg-purple-100 text-purple-700' },
                                { name: 'Tailwind', color: 'bg-cyan-100 text-cyan-700' },
                                { name: 'JWT Auth', color: 'bg-orange-100 text-orange-700' }
                            ].map((tech, index) => (
                                <div key={index} className={`${tech.color} px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 hover:scale-105 hover:shadow-md`}>
                                    {tech.name}
                                </div>
                            ))}
                        </div>
                    </div>
*/}
                    {/* Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                        {[
                            { number: '12K+', label: 'Books Available', icon: '📚' },
                            { number: '50K+', label: 'Happy Readers', icon: '👥' },
                            { number: '500+', label: 'Authors Featured', icon: '✍️' },
                            { number: '24/7', label: 'Customer Support', icon: '🛟' }
                        ].map((stat, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-xl border border-orange-100 hover:shadow-2xl transition-shadow duration-300">
                                <div className="text-4xl mb-3">{stat.icon}</div>
                                <div className="text-3xl font-bold text-orange-600 mb-2">{stat.number}</div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 lg:p-12 text-center text-white shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Start Your Literary Journey?
                        </h2>
                        <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of book lovers who have already discovered their next favorite read on LitShelf.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/"
                                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Browse Books
                            </Link>
                            <Link
                                to="/contact"
                                className="bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}