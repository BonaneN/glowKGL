import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';


const ProductDetailsModal = ({ productId, onClose }) => {
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);
    const { addToCart, cartItems } = useCart();

    const cartItem = cartItems.find(item => item.id === productId);
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const data = await api.get(`/products/${productId}/product-details/`);
                setProduct(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };
        if (productId) fetchProductDetails();
    }, [productId]);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            setDeleteLoading(true);
            await api.delete(`/products/${productId}/delete-product/`);
            onClose(true); // Signal that product was deleted
        } catch (err) {
            alert(err.message || 'Failed to delete product');
        } finally {
            setDeleteLoading(false);
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
        exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    if (!productId) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={overlayVariants}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            >
                {/* Backdrop Blur Overlay */}
                <div
                    className="absolute inset-0 bg-night-bordeaux/40 backdrop-blur-md"
                    onClick={() => onClose()}
                />

                <motion.div
                    variants={modalVariants}
                    className="relative w-full max-w-4xl bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                >
                    {/* Close Button */}
                    <button
                        onClick={() => onClose()}
                        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center text-night-bordeaux transition-all hover:rotate-90"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {loading ? (
                        <div className="w-full h-96 flex items-center justify-center">
                            <div className="flex items-center justify-center bg-white rounded-[2rem] shadow-sm border border-gray-100/60 px-8 py-4 animate-pulse">
                                <span className="text-4xl md:text-5xl font-black text-night-bordeaux tracking-tight">Glow</span>
                                <span className="text-4xl md:text-5xl font-black text-blush-rose tracking-tight">KGL</span>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="w-full p-20 text-center">
                            <h2 className="text-2xl font-black text-berry-crush mb-4">Error</h2>
                            <p className="text-gray-600 mb-8">{error}</p>
                            <button onClick={onClose} className="px-8 py-3 bg-night-bordeaux text-white rounded-full font-bold">Close</button>
                        </div>
                    ) : (
                        <>
                            {/* Left: Image Section */}
                            <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative group">
                                {product.product_image ? (
                                    <img
                                        src={api.getImageUrl(product.product_image)}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-soft-apricot/30 to-cotton-candy/30 flex items-center justify-center">
                                        <svg className="w-32 h-32 text-blush-rose/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                )}
                                {product.discount_percentage > 0 && (
                                    <div className="absolute top-8 left-8 px-5 py-2 bg-berry-crush text-white font-black rounded-full shadow-2xl">
                                        SAVE {Math.round(product.discount_percentage)}%
                                    </div>
                                )}
                            </div>

                            {/* Right: Info Section */}
                            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                                <div className="space-y-8">
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-blush-rose/10 text-blush-rose text-[10px] font-black rounded-full uppercase tracking-widest mb-4">
                                            {product.category || 'Beauty'}
                                        </span>
                                        <h2 className="text-4xl font-heading font-black text-night-bordeaux leading-tight">
                                            {product.name}
                                        </h2>
                                    </div>

                                    {/* Specs with Icons */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-cotton-candy/20 flex items-center justify-center shrink-0">
                                                <svg className="w-6 h-6 text-blush-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price</p>
                                                <p className="font-black text-night-bordeaux text-lg">
                                                    RWF {parseFloat(product.final_price || product.price).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-soft-apricot/20 flex items-center justify-center shrink-0">
                                                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pick up</p>
                                                <p className="font-bold text-night-bordeaux line-clamp-1">{product.shop_location || 'Beauty HQ'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 col-span-2">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Delivery Option</p>
                                                <p className="font-bold text-night-bordeaux">{product.delivery_option}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 col-span-2">
                                            <div className="w-12 h-12 rounded-2xl bg-cotton-candy/20 flex items-center justify-center shrink-0">
                                                <svg className="w-6 h-6 text-blush-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Product Story</p>
                                                <p className="font-medium text-gray-600 italic leading-relaxed">
                                                    "{product.description || product.short_description || 'No story provided for this beauty essential.'}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex flex-col gap-4">
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="w-full h-16 bg-night-bordeaux text-white rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-4 hover:bg-night-bordeaux/90 transition-all shadow-xl hover:-translate-y-1 relative group overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-blush-rose/20 to-berry-crush/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                            <div className="relative flex items-center gap-4">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                <span>{quantityInCart > 0 ? `Add More (${quantityInCart} in bag)` : 'Add to Beauty Bag'}</span>
                                            </div>
                                        </button>

                                        {user && user.isAdmin && (
                                            <button
                                                onClick={handleDelete}
                                                disabled={deleteLoading}
                                                className="w-full py-4 text-berry-crush font-bold hover:bg-berry-crush/5 rounded-2xl transition-all flex items-center justify-center gap-2"
                                            >
                                                {deleteLoading ? (
                                                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-berry-crush border-t-transparent" />
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                )}
                                                {deleteLoading ? 'Removing...' : 'Admin: Remove from Collection'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductDetailsModal;
