import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [globallyBookedSlots, setGloballyBookedSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        if (!user) return;
        setLoading(true);
        // User specific bookings
        const localBookings = JSON.parse(localStorage.getItem(`bookings_${user.username}`) || '[]');
        setBookings(localBookings);

        // Global slots tracking
        const globalSlots = JSON.parse(localStorage.getItem('glowKGL_global_slots') || '[]');
        setGloballyBookedSlots(globalSlots);

        setLoading(false);
    };

    useEffect(() => {
        const globalSlots = JSON.parse(localStorage.getItem('glowKGL_global_slots') || '[]');
        setGloballyBookedSlots(globalSlots);
        if (user) {
            fetchBookings();
        } else {
            setBookings([]);
        }
    }, [user]);

    const isSlotBooked = (artistId, date, time) => {
        return globallyBookedSlots.some(slot =>
            slot.artistId === artistId && slot.date === date && slot.time === time
        );
    };

    const createBooking = async (bookingData) => {
        if (isSlotBooked(bookingData.artistId, bookingData.date, bookingData.time)) {
            throw new Error('This slot is already reserved');
        }

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 300));

        const newBooking = { ...bookingData, id: Date.now(), status: 'upcoming' };

        // Update user bookings
        const updatedBookings = [newBooking, ...bookings];
        setBookings(updatedBookings);
        if (user) {
            localStorage.setItem(`bookings_${user.username}`, JSON.stringify([newBooking, ...JSON.parse(localStorage.getItem(`bookings_${user.username}`) || '[]')]));
        }

        // Update global slots
        const newGlobalSlot = { artistId: bookingData.artistId, date: bookingData.date, time: bookingData.time };
        const updatedGlobal = [...globallyBookedSlots, newGlobalSlot];
        setGloballyBookedSlots(updatedGlobal);
        localStorage.setItem('glowKGL_global_slots', JSON.stringify(updatedGlobal));

        setLoading(false);
        return { success: true, booking: newBooking };
    };

    const cancelBooking = async (bookingId) => {
        try {
            const bookingToCancel = bookings.find(b => b.id === bookingId);

            setBookings(prev => prev.filter(b => b.id !== bookingId));
            if (user) {
                const currentLocal = JSON.parse(localStorage.getItem(`bookings_${user.username}`) || '[]');
                localStorage.setItem(`bookings_${user.username}`, JSON.stringify(currentLocal.filter(b => b.id !== bookingId)));
            }

            // Also remove from global slots if found
            if (bookingToCancel) {
                const updatedGlobal = globallyBookedSlots.filter(s =>
                    !(s.artistId === bookingToCancel.artistId && s.date === bookingToCancel.date && s.time === bookingToCancel.time)
                );
                setGloballyBookedSlots(updatedGlobal);
                localStorage.setItem('glowKGL_global_slots', JSON.stringify(updatedGlobal));
            }

            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const upcomingCount = bookings.filter(b => b.status === 'upcoming' || !b.status).length;

    return (
        <BookingContext.Provider value={{
            bookings,
            loading,
            error,
            fetchBookings,
            createBooking,
            cancelBooking,
            isSlotBooked,
            upcomingCount
        }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
