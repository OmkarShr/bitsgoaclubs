import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ClubCard = ({ club }) => {
    const images = [
        club.image1,
        club.image2
    ].filter(img => img && img !== 'N/A' && img !== 'None');

    // Fallback if no images
    if (images.length === 0) {
        images.push('https://via.placeholder.com/400x300?text=BITS+Goa+Club');
    }

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval;
        if (isHovered && images.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isHovered, images.length]);

    const nextImage = (e) => {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <Link to={`/club/${club.id}`} className="block h-full">
            <motion.div
                className="group relative h-[450px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                whileHover={{ y: -5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Carousel */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImageIndex}
                            src={images[currentImageIndex]}
                            alt={club.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-sm uppercase tracking-wider">
                        {club.category || 'General'}
                    </div>

                    {/* Carousel Controls (visible on hover) */}
                    {images.length > 1 && (
                        <div className={`absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                            <button onClick={prevImage} className="p-1 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={nextImage} className="p-1 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    {club.abbreviation && (
                        <span className="text-xs font-bold text-blue-600 mb-2 block">
                            {club.abbreviation}
                        </span>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors">
                        {club.name}
                    </h3>

                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed mb-4 flex-grow">
                        {club.description || "Discover more about this club..."}
                    </p>

                    {/* Footer */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">Know More</span>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 text-gray-400 group-hover:text-blue-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m21 12H3"></path></svg>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ClubCard;
