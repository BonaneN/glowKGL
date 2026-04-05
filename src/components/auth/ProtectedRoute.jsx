import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const ProtectedRoute = ({ children, minRole }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex items-center justify-center bg-white rounded-[2rem] shadow-sm border border-gray-100/60 px-8 py-4 animate-pulse">
                    <span className="text-4xl md:text-5xl font-black text-night-bordeaux tracking-tight">Glow</span>
                    <span className="text-4xl md:text-5xl font-black text-blush-rose tracking-tight">KGL</span>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (minRole === 'admin' && !user.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
