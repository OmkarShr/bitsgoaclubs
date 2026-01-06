import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Keep useLocation for generic route info if needed, or remove if unused. kept for transition keys
import { HashLink as Link } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top on route change if not a hash link
    useEffect(() => {
        if (!location.hash) {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <div className="min-h-screen flex flex-col relative text-gray-800 bg-white selection:bg-yellow-200 selection:text-black">

            {/* Floating Navbar */}
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mx-auto container px-4 sm:px-6">
                    <div className={`rounded-xl px-6 py-3 flex justify-between items-center transition-all duration-300 ${scrolled ? 'glass-nav shadow-md' : 'bg-white/50 backdrop-blur-sm'}`}>
                        <Link to="/#top" smooth className="flex items-center gap-3 group">
                            <img src="/logo.png" alt="BITS Goa Logo" className="h-10 w-auto object-contain" />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:block">
                            <ul className="flex space-x-8">
                                {['Home', 'Clubs', 'About'].map((item) => {
                                    const to = item === 'Home' ? '/#top' : item === 'Clubs' ? '/#clubs' : '/#top'; // About maps to top/hero for now as requested
                                    return (
                                        <li key={item}>
                                            <Link
                                                smooth
                                                to={to}
                                                className="relative text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors py-2 group uppercase tracking-wider"
                                            >
                                                {item}
                                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full" />
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-gray-800"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed top-24 left-4 right-4 z-40 md:hidden glass-panel rounded-xl overflow-hidden bg-white shadow-xl"
                    >
                        <ul className="flex flex-col p-6 space-y-4">
                            {['Home', 'Clubs', 'About'].map((item) => {
                                const to = item === 'Home' ? '/#top' : item === 'Clubs' ? '/#clubs' : '/#top';
                                return (
                                    <li key={item}>
                                        <Link
                                            smooth
                                            to={to}
                                            className="block text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-grow pt-24 px-4 relative z-10" id="top">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            <footer className="relative z-10 border-t border-gray-200 py-12 mt-20 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <img src="/logo.png" alt="BITS Goa Logo" className="h-12 mx-auto mb-6 opacity-80 grayscale hover:grayscale-0 transition-all" />
                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                        BITS Pilani Goa Campus
                    </h3>
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Student Clubs. <br />
                        Developed by <span className="font-semibold text-gray-800">Omkar Shrikanth</span>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
