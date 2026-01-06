import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
            {/* Subtle Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container relative z-10 px-6 text-center">

                {/* Large Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <img
                        src="/logo.png"
                        alt="BITS Goa Logo"
                        className="h-32 md:h-48 lg:h-56 w-auto mx-auto object-contain drop-shadow-xl"
                    />
                </motion.div>

                {/* Animated Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-10"
                >
                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Official Club Portfolio</span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-gray-900"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="block text-gray-400 font-bold tracking-widest text-xl md:text-3xl mb-4">BITS PILANI GOA</span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-blue-700 pb-2">
                        STUDENT CLUBS
                    </span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Discover the heartbeat of campus life. <br />
                    From <span className="font-medium text-yellow-600">Culture</span> to <span className="font-medium text-blue-600">Tech</span>, find your passion here.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <a
                        href="#clubs"
                        className="group relative px-10 py-4 bg-gray-900 text-white font-bold rounded-full overflow-hidden transition-all hover:shadow-xl hover:shadow-blue-900/20"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Explore Clubs
                            <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
