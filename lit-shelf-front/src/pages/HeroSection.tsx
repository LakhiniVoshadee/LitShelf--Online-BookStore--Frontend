import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const [isMounted, setIsMounted] = useState(false);
    const navigate = useNavigate();
    const isAuth = localStorage.getItem("isAuth") === "true";

    useEffect(() => {
        setIsMounted(true);
        if (isAuth) {
            navigate('/homePage');
        } else {
            navigate('/');
        }
    }, [isAuth, navigate]);

    const handleGetStarted = () => {
        navigate('/signup');
    };

    const features = [
        {
            icon: "📚",
            title: "Personal Library",
            description: "Organize all your books and notes in one place with custom shelves."
        },
        {
            icon: "🔖",
            title: "Smart Bookmarks",
            description: "Save and categorize important passages with intelligent tagging."
        },
        {
            icon: "✍️",
            title: "Margin Notes",
            description: "Add your thoughts directly alongside the text with our annotation system."
        }
    ];


    return (
        <div className="bg-white">
            <section className="relative min-h-screen w-full overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-full h-full">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-orange-50 to-white" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-orange-50 to-transparent opacity-70" />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-center">
                    <div className="container mx-auto px-4 sm:px-6 md:px-16 py-16 md:py-20">
                        <motion.div
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
                            initial="hidden"
                            animate={isMounted ? "visible" : "hidden"}
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } }
                            }}
                        >
                            {/* Left column */}
                            <div className="space-y-6 md:space-y-8 order-2 lg:order-1 mt-8 lg:mt-0">
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                                        }
                                    }}
                                >
                                    <div className="flex items-center mb-3 md:mb-4">
                                        <span className="text-orange-500 font-medium text-lg md:text-xl">📘</span>
                                        <span className="text-orange-500 font-medium text-lg md:text-xl ml-2">Chapter 01</span>
                                    </div>
                                    <div className="h-1 w-48 md:w-64 bg-gradient-to-r from-orange-500 to-orange-300 mb-4 md:mb-6" />
                                </motion.div>

                                <motion.div
                                    className="space-y-4 md:space-y-6"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
                                        }
                                    }}
                                >
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                        Your Personal
                                        <span className="text-orange-500"> Book</span>
                                    </h1>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                        <span className="text-orange-500">Journal</span> App
                                    </h1>
                                    
                                    <p className="text-gray-600 text-lg md:text-xl max-w-lg">
                                        Capture your thoughts, track your reading journey, and discover new insights with our intuitive book journaling platform. Perfect for book lovers and note-takers alike.
                                    </p>
                                    
                                    <div className="pt-4">
                                        <button 
                                            onClick={handleGetStarted}
                                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                                        >
                                            Get Started Now
                                        </button>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right column - Book image */}
                            <motion.div
                                className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
                                variants={{
                                    hidden: { opacity: 0, y: 40 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }
                                    }
                                }}
                            >
                                <div className="relative w-full max-w-md lg:max-w-none">
                                    <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-orange-400 to-orange-200 rounded-2xl -z-10" />
                                    <div className="relative overflow-hidden rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                                        <img
                                            src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                            alt="Book journal app preview"
                                            className="w-full h-auto object-cover rounded-xl"
                                        />
                                    </div>
                                    
                                    {/* Floating elements */}
                                    <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-xl shadow-lg">
                                        <div className="text-orange-500 text-2xl">📚</div>
                                        <div className="text-xs text-gray-600 mt-1">1000+ Books</div>
                                    </div>
                                    
                                    <div className="absolute -top-4 right-8 bg-white p-2 rounded-full shadow-lg">
                                        <div className="bg-orange-100 p-2 rounded-full">
                                            <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <div className={`hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-1000 delay-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
                    <a href="#features" className="animate-bounce flex flex-col items-center">
                        <span className="text-sm text-gray-600 mb-2">Scroll to Explore</span>
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </a>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 md:px-16">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Features You'll <span className="text-orange-500">Love</span>
                        </h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto mb-6"></div>
                        <p className="text-gray-600 text-lg">
                            Discover powerful tools designed to enhance your reading and note-taking experience.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100 hover:border-orange-100"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center mb-5">
                                    <span className="text-2xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                                <div className="mt-6">
                                    <div className="w-10 h-1 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 md:py-28 bg-gray-850">
                <div className="container mx-auto px-4 sm:px-6 md:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="relative h-96 bg-transparent rounded-xl overflow-hidden border border-white backdrop-blur-2xl"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-9xl text-white/20">📚</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-850/80 to-transparent" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-['Bruno_Ace_SC'] mb-8">
                                <span className="text-white">The Future of</span> <span className="text-amber-400">Reading</span>
                            </h2>
                            <p className="text-gray-300 mb-8 text-lg leading-relaxed font-['Assistant']">
                                BookNexus bridges the gap between physical books and digital convenience. Our platform captures the tactile joy of reading while adding powerful digital tools for researchers, students, and avid readers. Highlight, annotate, and connect ideas across your entire library.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-4 bg-amber-500 text-gray-900 font-['Bruno_Ace_SC'] rounded-lg hover:bg-amber-400 transition-all"
                                >
                                    Explore Features
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-4 border-2 border-white text-white font-['Bruno_Ace_SC'] rounded-lg hover:bg-white hover:text-gray-900 transition-all"
                                >
                                    Join Our Readers
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HeroSection;