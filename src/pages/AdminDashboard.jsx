import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import api from '../utils/api';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [categories, setCategories] = useState({ products: [], artists: [] });
    const [newCategory, setNewCategory] = useState({ name: '', type: 'products' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Redirect if not admin
    if (!user || !user.isAdmin) {
        return <Navigate to="/" />;
    }

    const fetchCategories = async () => {
        try {
            // Verified: /products/list-categories/
            const pData = await api.get('/products/list-categories/').catch(() => []);
            // Verified from 404: /artists/categories/
            const aData = await api.get('/artists/categories/').catch(() => []);
            setCategories({
                products: Array.isArray(pData) ? pData : [],
                artists: Array.isArray(aData) ? aData : []
            });
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const endpoint = newCategory.type === 'products'
                ? '/products/add-category/'
                : '/artists/add-category/';

            await api.post(endpoint, { name: newCategory.name });
            setSuccess(`Category "${newCategory.name}" added to ${newCategory.type}!`);
            setNewCategory({ ...newCategory, name: '' });
            fetchCategories();
        } catch (err) {
            console.error('Error adding category:', err);

            // Prioritize structured data from api.js
            const fieldErrors = err.data;
            if (fieldErrors && typeof fieldErrors === 'object') {
                const errorMsg = Object.entries(fieldErrors)
                    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                    .join(' | ');
                setError(errorMsg || 'Failed to add category');
            } else {
                setError(err.message || 'Failed to add category');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-soft-apricot/10 py-20">
            <div className="container-custom">
                <header className="mb-12">
                    <h1 className="text-5xl font-heading font-bold text-night-bordeaux mb-4">Super Admin Dashboard</h1>
                    <p className="text-lg text-gray-600">Manage your GlowKGL categories and content</p>
                </header>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Add Category Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl shadow-xl p-8"
                    >
                        <h2 className="text-2xl font-bold text-night-bordeaux mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-blush-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add New Category
                        </h2>

                        <form onSubmit={handleAddCategory} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name</label>
                                <input
                                    type="text"
                                    value={newCategory.name}
                                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blush-rose focus:ring-2 focus:ring-blush-rose/20 outline-none transition-all"
                                    placeholder="e.g., Luxury Oils"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Type</label>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setNewCategory({ ...newCategory, type: 'products' })}
                                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${newCategory.type === 'products' ? 'bg-night-bordeaux text-white' : 'bg-gray-100 text-gray-500'}`}
                                    >
                                        Products
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNewCategory({ ...newCategory, type: 'artists' })}
                                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${newCategory.type === 'artists' ? 'bg-night-bordeaux text-white' : 'bg-gray-100 text-gray-500'}`}
                                    >
                                        Artists
                                    </button>
                                </div>
                            </div>

                            {error && <p className="text-berry-crush text-sm font-medium bg-berry-crush/5 p-3 rounded-lg border border-berry-crush/20">{error}</p>}
                            {success && <p className="text-green-600 text-sm font-medium bg-green-50 p-3 rounded-lg border border-green-200">{success}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-blush-rose to-berry-crush text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] disabled:opacity-50"
                            >
                                {loading ? 'Adding...' : 'Add Category'}
                            </button>
                        </form>
                    </motion.div>

                    {/* Current Categories View */}
                    <div className="space-y-8">
                        {/* Product Categories */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-lg p-8"
                        >
                            <h3 className="text-xl font-bold text-night-bordeaux mb-4 flex items-center justify-between">
                                Product Categories
                                <span className="text-xs font-normal bg-soft-apricot text-night-bordeaux px-2 py-1 rounded-full">{categories.products.length} Items</span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.products.length > 0 ? categories.products.map(cat => (
                                    <span key={cat.id || cat.name} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700 font-medium">{cat.name}</span>
                                )) : <p className="text-gray-400 italic text-sm">No product categories yet</p>}
                            </div>
                        </motion.div>

                        {/* Artist Categories */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-lg p-8"
                        >
                            <h3 className="text-xl font-bold text-night-bordeaux mb-4 flex items-center justify-between">
                                Artist Specialties
                                <span className="text-xs font-normal bg-soft-apricot text-night-bordeaux px-2 py-1 rounded-full">{categories.artists.length} Items</span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.artists.length > 0 ? categories.artists.map(cat => (
                                    <span key={cat.id || cat.name} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700 font-medium">{cat.name}</span>
                                )) : <p className="text-gray-400 italic text-sm">No artist specialties yet</p>}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
