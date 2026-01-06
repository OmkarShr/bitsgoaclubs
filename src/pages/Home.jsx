import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import Hero from '../components/Hero';
import ClubCard from '../components/ClubCard';
import clubsData from '../data/clubs.json';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    const filteredClubs = useMemo(() => {
        return clubsData.filter(club => {
            const matchesCategory = filter === 'All' || club.category === filter;
            const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                club.abbreviation?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, filter]);

    const categories = ['All', 'Cultural', 'Technical', 'Sports', 'Others'];

    return (
        <div className="relative z-10 bg-gray-50/50 min-h-screen">
            <Hero />

            <section id="clubs" className="py-24 container mx-auto px-6 relative">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <motion.h2
                            className="text-4xl font-bold text-gray-900 mb-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            Explore Communities
                        </motion.h2>
                        <p className="text-gray-500 max-w-md text-lg">
                            Find your tribe from over {clubsData.length} active student clubs and departments.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        {/* Search Bar */}
                        <div className="relative group w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search clubs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-6 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Categories Pills */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md ${filter === cat
                                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 transform scale-105'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {filteredClubs.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-3xl mx-auto max-w-2xl border border-gray-100 shadow-sm">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Search size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No clubs found</h3>
                        <p className="text-gray-500 max-w-xs mx-auto">We couldn't find any clubs matching "{searchTerm}" in the {filter} category.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setFilter('All'); }}
                            className="mt-6 text-blue-600 font-medium hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredClubs.map((club, index) => (
                            <motion.div
                                key={club.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                            >
                                <ClubCard club={club} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
