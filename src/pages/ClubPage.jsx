import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram, Linkedin, Globe, MessageCircle, Github, MapPin, Users } from 'lucide-react';
import clubsData from '../data/clubs.json';

const ClubPage = () => {
    const { id } = useParams();
    const club = clubsData.find(c => c.id === id);

    if (!club) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-800">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">Club Not Found</h2>
                    <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
                </div>
            </div>
        );
    }

    const heroImage = club.image1 || club.image2 || 'https://via.placeholder.com/1200x600?text=No+Image';

    return (
        <div className="min-h-screen pb-20 relative bg-white">

            {/* Immersive Hero Header */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <img
                        src={heroImage}
                        alt={club.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                </motion.div>

                <div className="absolute top-28 left-6 z-20">
                    <Link to="/" className="flex items-center text-gray-700 hover:text-gray-900 transition-colors bg-white/80 p-3 rounded-full backdrop-blur-md shadow-sm group hover:bg-white border border-gray-100">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="ml-3 font-medium pr-2">Back to Clubs</span>
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-10">
                    <div className="container mx-auto">
                        <div className="flex gap-2 mb-4">
                            {club.abbreviation && (
                                <motion.span
                                    className="inline-block px-4 py-1 bg-white/90 rounded-full text-blue-700 font-bold tracking-widest uppercase shadow-sm"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    {club.abbreviation}
                                </motion.span>
                            )}
                            <motion.span
                                className="inline-block px-4 py-1 bg-yellow-400 text-black font-bold tracking-widest uppercase rounded-full shadow-sm"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                {club.category || 'General'}
                            </motion.span>
                        </div>

                        <motion.h1
                            className="text-4xl md:text-7xl font-black mb-6 leading-none tracking-tight text-gray-900 drop-shadow-sm"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {club.name}
                        </motion.h1>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-1 h-8 bg-blue-600 rounded-full" />
                                <h2 className="text-3xl font-bold text-gray-900">About the Club</h2>
                            </div>

                            <div className="prose prose-lg text-gray-600 max-w-none">
                                {club.description ? (
                                    club.description.split('\n').map((paragraph, idx) => (
                                        <p key={idx} className="leading-relaxed mb-6">
                                            {paragraph}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-400 italic">
                                        No description available for this club.
                                    </p>
                                )}
                            </div>
                        </motion.div>

                        {/* Gallery Section */}
                        {club.image2 && club.image2 !== club.image1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Club Activities</h3>
                                <div className="relative rounded-2xl overflow-hidden h-[500px] shadow-lg">
                                    <img src={club.image2} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <motion.div
                            className="bg-gray-50 rounded-3xl p-8 sticky top-28 border border-gray-100 shadow-sm"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                                <Users size={20} className="text-blue-600" />
                                <span>Connect Details</span>
                            </h3>

                            <div className="space-y-4">
                                {club.instagram && (
                                    <SocialLink
                                        href={club.instagram}
                                        icon={<Instagram size={20} />}
                                        label="Follow on Instagram"
                                        sublabel="@instagram"
                                        color="hover:bg-pink-50 border-gray-200"
                                        textColor="text-gray-800 hover:text-pink-600"
                                        iconColor="text-pink-600"
                                    />
                                )}
                                {club.linkedin && (
                                    <SocialLink
                                        href={club.linkedin}
                                        icon={<Linkedin size={20} />}
                                        label="Connect on LinkedIn"
                                        sublabel="Professional Network"
                                        color="hover:bg-blue-50 border-gray-200"
                                        textColor="text-gray-800 hover:text-blue-600"
                                        iconColor="text-blue-600"
                                    />
                                )}
                                {club.whatsapp && club.whatsapp !== 'None' && club.whatsapp !== 'N/A' && (
                                    <SocialLink
                                        href={club.whatsapp}
                                        icon={<MessageCircle size={20} />}
                                        label="Join WhatsApp Group"
                                        sublabel="Stay Updated"
                                        color="hover:bg-green-50 border-gray-200"
                                        textColor="text-gray-800 hover:text-green-600"
                                        iconColor="text-green-600"
                                    />
                                )}
                                {club.other_social && (
                                    <SocialLink
                                        href={club.other_social}
                                        icon={<Globe size={20} />}
                                        label="Visit Website / Other"
                                        sublabel="More Info"
                                        color="hover:bg-gray-100 border-gray-200"
                                        textColor="text-gray-800 hover:text-black"
                                        iconColor="text-gray-600"
                                    />
                                )}
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <div className="flex items-center gap-3 text-gray-500 text-sm">
                                    <MapPin size={16} />
                                    <span>Bits Pilani Goa Campus</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SocialLink = ({ href, icon, label, sublabel, color, textColor, iconColor }) => {
    // Handle cases where href might not be a full URL
    const url = href.startsWith('http') ? href :
        href.startsWith('@') ? `https://instagram.com/${href.substring(1)}` :
            href.includes('instagram.com') ? href :
                `https://${href}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-4 p-4 rounded-2xl border bg-white transition-all duration-300 group ${color} shadow-sm hover:shadow-md`}
        >
            <div className={`p-3 rounded-xl bg-gray-50 ${iconColor} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <div>
                <span className={`block font-bold transition-colors ${textColor}`}>{label}</span>
                <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">{sublabel}</span>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                <ArrowLeft size={16} className="rotate-180 text-gray-400" />
            </div>
        </a>
    );
};

export default ClubPage;
