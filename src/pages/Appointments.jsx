import React from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { Link } from 'react-router-dom';


const Appointments = () => {
    const { bookings, loading, cancelBooking } = useBooking();

    return (
        <div className="min-h-screen bg-[#FCF8F4] pt-32 pb-20 px-4">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <span className="inline-block px-4 py-1.5 bg-soft-apricot/30 border border-soft-apricot rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-blush-rose mb-6">
                        Your Schedule
                    </span>
                    <h1 className="text-4xl md:text-5xl font-heading font-black text-night-bordeaux">
                        Booked Appointments
                    </h1>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-24">
                        <div className="flex items-center justify-center bg-white rounded-[2rem] shadow-sm border border-gray-100/60 px-8 py-4 animate-pulse">
                            <span className="text-4xl md:text-5xl font-black text-night-bordeaux tracking-tight">Glow</span>
                            <span className="text-4xl md:text-5xl font-black text-blush-rose tracking-tight">KGL</span>
                        </div>
                    </div>
                ) : bookings.length > 0 ? (
                    <div className="space-y-6">
                        {bookings.map((booking, index) => (
                            <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-white rounded-[2rem] p-8 shadow-premium border border-gray-100/50 hover:border-blush-rose/20 transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                    {/* Left Side: Information Rows */}
                                    <div className="flex items-center gap-8 w-full">
                                        {/* Artist Image Chip */}
                                        <div className="hidden sm:block w-24 h-24 rounded-3xl overflow-hidden shadow-lg border-2 border-white ring-1 ring-gray-100 flex-none">
                                            <img
                                                src={booking.artistImage || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200'}
                                                alt={booking.artistName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col gap-1.5 text-center md:text-left">
                                            <h3 className="text-2xl font-bold font-heading text-night-bordeaux tracking-tight"> {booking.artistName} </h3>

                                            <div className="text-blush-rose font-bold text-sm uppercase tracking-widest"> {booking.artistBrand || 'Premier Artist'} </div>

                                            <div className="text-night-bordeaux/60 font-medium text-sm flex items-center justify-center md:justify-start gap-2">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                                {booking.service || 'Bespoke Treatment'}
                                            </div>

                                            <div className="text-gray-400 font-medium text-sm flex items-center justify-center md:justify-start gap-2">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                                {booking.artistLocation || 'Kigali, Rwanda'}
                                            </div>

                                            <div className="mt-2 flex items-center justify-center md:justify-start gap-3">
                                                <div className="px-4 py-1.5 bg-cotton-candy/30 text-night-bordeaux rounded-xl text-[10px] font-black uppercase tracking-widest border border-cotton-candy/50">
                                                    {booking.date}
                                                </div>
                                                <div className="px-4 py-1.5 bg-soft-apricot/30 text-blush-rose rounded-xl text-[10px] font-black uppercase tracking-widest border border-soft-apricot/50">
                                                    {booking.time}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center pr-4">
                                        <button
                                            onClick={() => cancelBooking(booking.id)}
                                            className="group/btn flex items-center gap-3 px-6 py-4 bg-gray-50 hover:bg-berry-crush/10 text-gray-400 hover:text-berry-crush rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 border border-gray-100 active:scale-95"
                                            title="Cancel Appointment"
                                        >
                                            <svg className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            <span className="md:hidden lg:inline">Cancel</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3.5rem] shadow-premium border border-dashed border-soft-apricot/40">
                        <h3 className="text-2xl font-black text-night-bordeaux mb-4">No appointments found</h3>
                        <p className="text-gray-400 font-medium mb-10">Discover our professionals and book your first session.</p>
                        <Link
                            to="/professionals"
                            className="inline-block px-10 py-4 bg-gradient-to-r from-blush-rose to-berry-crush text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
                        >
                            Explore Professionals
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;
