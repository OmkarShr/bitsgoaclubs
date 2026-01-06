import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clubsData from '../data/clubs.json';

const Hero = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Extract all valid images
        const allImages = clubsData.flatMap(club => [club.image1, club.image2])
            .filter(img => img && img !== 'N/A' && img !== 'None' && !img.includes('placeholder'));
        // Shuffle and pick a subset to avoid heaviness
        setImages(allImages.sort(() => 0.5 - Math.random()).slice(0, 30));
    }, []);

    const MarqueeRow = ({ direction = 1, speed = 20 }) => (
        <div className="flex overflow-hidden relative w-full mb-4 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            <motion.div
                className="flex gap-4 min-w-full"
                animate={{ x: direction === 1 ? [0, -1000] : [-1000, 0] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
            >
                {[...images, ...images].map((img, idx) => (
                    <div key={idx} className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden shadow-sm">
                        <img src={img} alt="Club Moment" className="w-full h-full object-cover" />
                    </div>
                ))}
            </motion.div>
            <motion.div
                className="flex gap-4 min-w-full absolute left-full top-0 ml-4"
                animate={{ x: direction === 1 ? [0, -1000] : [-1000, 0] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
            >
                {[...images, ...images].map((img, idx) => (
                    <div key={`dup-${idx}`} className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden shadow-sm">
                        <img src={img} alt="Club Moment" className="w-full h-full object-cover" />
                    </div>
                ))}
            </motion.div>
        </div>
    );

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-white">

            {/* Background Marquee Layer */}
            <div className="absolute inset-0 z-0 flex flex-col justify-center transform -rotate-6 scale-110 pointer-events-none select-none mask-image-gradient">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-10" /> {/* Top/Bottom Fade */}
                <div className="absolute inset-0 bg-white/60 z-10 backdrop-blur-[2px]" /> {/* Overlay to keep text readable */}

                {images.length > 0 && (
                    <>
                        <MarqueeRow speed={40} direction={1} />
                        <MarqueeRow speed={50} direction={-1} />
                        <MarqueeRow speed={45} direction={1} />
                    </>
                )}
            </div>

            {/* Subtle Background Elements (Glows) */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-400/20 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />


            <div className="container relative z-20 px-6 text-center mt-12">

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
                        className="h-32 md:h-48 lg:h-56 w-auto mx-auto object-contain drop-shadow-2xl"
                    />
                </motion.div>

                {/* Animated Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-gray-200 shadow-lg backdrop-blur-md mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-widest">Official Club Portfolio</span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-gray-900 drop-shadow-sm"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="block text-gray-500 font-bold tracking-widest text-xl md:text-3xl mb-2">BITS PILANI GOA</span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-blue-700 pb-2">
                        STUDENT CLUBS
                    </span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Discover the heartbeat of campus life. <br />
                    From <span className="text-yellow-700 font-bold">Culture</span> to <span className="text-blue-700 font-bold">Tech</span>, find your passion here.
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
                        className="group relative px-10 py-4 bg-gray-900 text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-900/30"
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
