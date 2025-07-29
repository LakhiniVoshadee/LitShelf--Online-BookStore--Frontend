import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [, setHoveredFeature] = useState(0);
    const navigate = useNavigate();
    const isAuth_1 = localStorage.getItem("isAuth");
    const isAuthBoolean = isAuth_1 === "true" ? true : false;

    useEffect(() => {
        setIsMounted(true);
        handleLoginPage();
    }, [isAuthBoolean, navigate]);

    function handleLoginPage() {
        if (isAuthBoolean) {
            navigate('/homePage')
        } else {
            navigate('/')
        }
    }

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
        <div
            style={{
                backgroundImage: 'url("../src/assets/background.png")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
            }}
        >
            <section className="relative min-h-screen w-full overflow-hidden bg-transparent-900">

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[40%] max-w-2xl h-full">
                        <motion.img
                            src="../../src/assets/gradient.png"
                            alt="Decorative gradient"
                            className="w-full h-full object-cover opacity-80"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 0.8, x: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                </div>

                <div className="relative z-20 h-full flex flex-col justify-center">
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
                                        <span className="text-white font-['Bruno_Ace_SC'] text-lg md:text-xl">📘</span>
                                        <span className="text-white font-['Bruno_Ace_SC'] text-lg md:text-xl ml-2">Chapter 01</span>
                                    </div>
                                    <div className="h-0.5 w-48 md:w-64 bg-gradient-to-r from-amber-700 to-amber-500 mb-4 md:mb-6" />
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
                                    <h2 className="text-white font-['Bruno_Ace_SC'] text-2xl md:text-3xl tracking-wider">
                                        READ IT. NOTE IT.
                                    </h2>
                                    <h2 className="text-white font-['Bruno_Ace_SC'] text-2xl md:text-3xl tracking-wider">
                                        FIND IT. USE IT.
                                    </h2>
                                </motion.div>
                            </div>

                            {/* Right column */}
                            <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
                                <motion.h1
                                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-['Bruno_Ace_SC'] tracking-tight text-white"
                                    variants={{
                                        hidden: { opacity: 0, y: 40 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
                                        }
                                    }}
                                >
                                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">YOUR</span>
                                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">DIGITAL LIBRARY</span>
                                </motion.h1>

                                <motion.p
                                    className="text-lg md:text-xl font-['Assistant'] text-gray-300 max-w-md md:max-w-lg"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
                                        }
                                    }}
                                >
                                    BookNexus is the ultimate companion for serious readers. Catalog your collection, annotate texts, and discover connections across your entire library with our powerful research tools.
                                </motion.p>

                                <motion.div
                                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }
                                        }
                                    }}
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group relative overflow-hidden px-8 py-4 bg-transparent backdrop-blur-sm border-2 border-amber-500 text-white rounded-lg"
                                    >
                                        <span className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                                        <span className="relative z-10 font-['Bruno_Ace_SC'] text-sm sm:text-base tracking-wider flex items-center">
                                            START READING
                                            <span className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">📖</span>
                                        </span>
                                    </motion.button>

                                    <a href="#features" className="lg:hidden flex items-center text-white/80 hover:text-white text-sm group transition-colors">
                                        <span>Library Features</span>
                                        <span className="ml-2 h-3 w-3 group-hover:translate-y-1 transition-transform">🔽</span>
                                    </a>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className={`hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-1000 delay-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
                    <a href="#features" className="animate-bounce flex flex-col items-center">
                        <span className="text-sm text-white/80 mb-2">Continue Reading</span>
                        <span className="text-2xl text-white/60">📘</span>
                    </a>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 md:py-28 bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 md:px-16">
                    <motion.h2
                        className="text-center text-4xl md:text-5xl font-['Bruno_Ace_SC'] mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        Built for <span className="text-amber-400">Serious Readers</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="relative p-8 bg-gray-850 rounded-xl border border-gray-700 hover:border-amber-500/30 transition-all duration-300"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                onMouseEnter={() => {
                                    setHoveredFeature(index);
                                }}
                                onMouseLeave={() => setHoveredFeature(0)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                                <div className="relative z-10">
                                    <div className="feature-icon mb-6 text-4xl">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-['Bruno_Ace_SC'] mb-4">{feature.title}</h3>
                                    <p className="text-gray-300 font-['Assistant']">{feature.description}</p>
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