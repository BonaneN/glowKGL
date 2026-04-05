import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

// Decode a JWT payload without a library — tokens are just base64 JSON
function decodeToken(token) {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded) {
                setUser({
                    loggedIn: true,
                    username: decoded.username,
                    email: decoded.email,
                    roles: decoded.roles || [],
                    isAdmin: (decoded.roles || []).includes('admin'),
                    isSeller: (decoded.roles || []).includes('seller'),
                    isArtist: (decoded.roles || []).includes('artist'),
                });
            }
        }
        setLoading(false);

        const handleAuthError = () => logout();
        window.addEventListener('auth-401', handleAuthError);
        return () => window.removeEventListener('auth-401', handleAuthError);
    }, []);

    const login = async (username, password) => {
        try {
            const data = await api.post('/users/login-user/', { username, password });
            if (data.access) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);

                const decoded = decodeToken(data.access);
                const roles = decoded?.roles || [];

                setUser({
                    loggedIn: true,
                    username: decoded?.username || username,
                    email: decoded?.email || '',
                    roles,
                    isAdmin: roles.includes('admin'),
                    isSeller: roles.includes('seller'),
                    isArtist: roles.includes('artist'),
                });
                return { success: true };
            }
            throw new Error('Invalid login response');
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const register = async (userData) => {
        try {
            await api.post('/users/create-account/', userData);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('glowKGLCart');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
