import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Auth = ({ initialMode = 'login' }) => {
    const [isLogin, setIsLogin] = useState(initialMode === 'login');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const heroImage = "https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=2070&auto=format&fit=crop";

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    useEffect(() => {
        if (location.pathname === '/login') setIsLogin(true);
        if (location.pathname === '/register') setIsLogin(false);
    }, [location.pathname]);

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        window.history.pushState({}, '', !isLogin ? '/login' : '/register');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                if (!formData.username || !formData.password) {
                    setError('Please fill in all fields');
                    setLoading(false);
                    return;
                }
                const result = await login(formData.username, formData.password);
                if (!result.success) setError(result.message || 'Login failed');
            } else {
                if (!formData.username || !formData.email || !formData.password || !formData.password2) {
                    setError('All fields are required');
                    setLoading(false);
                    return;
                }
                if (formData.password !== formData.password2) {
                    setError('Passwords do not match');
                    setLoading(false);
                    return;
                }

                const result = await register({
                    ...formData,
                    first_name: formData.username,
                    last_name: formData.username
                });

                if (result.success) {
                    setIsLogin(true);
                    setError('Account created! Please sign in.');
                } else {
                    setError(result.message || 'Registration failed');
                }
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-6 overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}>

            <div className="absolute inset-0 bg-night-bordeaux/40 backdrop-blur-[10px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-[480px] bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-10 lg:p-14 transition-all ring-1 ring-white/20"
            >
                {/* Brand Logo Header */}
                <div className="flex justify-center mb-10">
                    <div className="px-8 py-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 flex items-center justify-center transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                        <span className="font-heading text-2xl md:text-3xl font-black text-night-bordeaux whitespace-nowrap">
                            Beauty<span className="text-blush-rose">Verse</span>
                        </span>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {isLogin ? (
                        <motion.div
                            key="login-form-view"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-10">
                                <h1 className="text-3xl font-heading font-black text-night-bordeaux mb-2 tracking-tight">Log in to the community</h1>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                    Welcome back to the GlowKGL community.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blush-rose transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blush-rose/30 transition-all font-medium text-night-bordeaux placeholder:text-gray-400 shadow-inner"
                                    />
                                </div>

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blush-rose transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blush-rose/30 transition-all font-medium text-night-bordeaux placeholder:text-gray-400 shadow-inner"
                                    />
                                </div>

                                <div className="flex justify-end pt-1">
                                    <button type="button" className="text-xs font-bold text-gray-400 hover:text-night-bordeaux transition-colors font-sans">
                                        Forgot password?
                                    </button>
                                </div>

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center text-xs font-bold text-berry-crush bg-berry-crush/5 py-3 rounded-xl"
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4.5 bg-night-bordeaux text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all hover:bg-night-bordeaux/90 disabled:opacity-50 mt-4 h-14"
                                >
                                    {loading ? 'Entering...' : 'LOG IN'}
                                </button>
                            </form>

                            <div className="mt-10 text-center border-t border-gray-100 pt-8">
                                <p className="text-gray-400 text-sm font-medium">
                                    Don't have an account?
                                    <button
                                        onClick={toggleMode}
                                        className="ml-2 text-night-bordeaux font-black hover:text-blush-rose transition-colors"
                                    >
                                        Click here to register
                                    </button>
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="register-form-view"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-10">
                                <h1 className="text-3xl font-heading font-black text-night-bordeaux mb-2 tracking-tight">Create account</h1>
                                <p className="text-gray-500 text-sm font-medium">
                                    Join us to start your beauty journey with the GlowKGL community.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blush-rose/30 transition-all font-medium text-night-bordeaux placeholder:text-gray-400 shadow-sm"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blush-rose/30 transition-all font-medium text-night-bordeaux placeholder:text-gray-400 shadow-sm"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blush-rose/30 transition-all font-medium text-night-bordeaux placeholder:text-gray-400 shadow-sm"
                                    />
                                    <input
                                        type="password"
                                        name="password2"
                                        placeholder="Confirm"
                                        value={formData.password2}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blush-rose/30 transition-all font-medium text-night-bordeaux placeholder:text-gray-400 shadow-sm"
                                    />
                                </div>

                                {error && <p className="text-center text-xs font-bold text-berry-crush bg-berry-crush/5 py-3 rounded-xl">{error}</p>}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-night-bordeaux text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all mt-4 h-14"
                                >
                                    {loading ? 'Creating...' : 'Register now'}
                                </button>
                            </form>

                            <div className="mt-10 text-center border-t border-gray-100 pt-8">
                                <p className="text-gray-400 text-sm font-medium">
                                    Already have an account?
                                    <button
                                        onClick={toggleMode}
                                        className="ml-2 text-night-bordeaux font-black hover:text-blush-rose transition-colors"
                                    >
                                        Click here to log In
                                    </button>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Auth;
