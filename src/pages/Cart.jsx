import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../utils/api';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-24 h-24 mx-auto mb-8 bg-soft-apricot/20 rounded-full flex items-center justify-center text-blush-rose">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-night-bordeaux mb-4">Your bag is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-xs mx-auto font-medium">Looks like you haven't added any beauty secrets to your bag yet.</p>
                    <Link
                        to="/products"
                        className="inline-block px-8 py-4 bg-night-bordeaux text-white rounded-2xl font-bold hover:bg-blush-rose transition-all shadow-xl active:scale-95"
                    >
                        Start Shopping
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFF9F9] py-12 px-4 md:px-8">
            <div className="container-custom">
                <header className="mb-12">
                    <h1 className="text-4xl font-heading font-black text-night-bordeaux mb-2">Shopping Bag</h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                        {totalItems} {totalItems === 1 ? 'Item' : 'Items'} Selected
                    </p>
                </header>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white rounded-[2rem] p-6 shadow-soft flex items-center gap-6 group relative border border-transparent hover:border-blush-rose/10 transition-all"
                                >
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                                        <img
                                            src={api.getImageUrl(item.product_image)}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-black text-blush-rose uppercase tracking-widest">
                                                    {item.category}
                                                </span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                    {item.shop_location || 'Beauty HQ'}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-heading font-black text-night-bordeaux mb-1">{item.name}</h3>

                                            <div className="flex items-center gap-4 mt-2">
                                                <div className="flex items-center gap-1.5 py-1 px-2 bg-gray-50 rounded-lg border border-gray-100">
                                                    <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
                                                    </svg>
                                                    <span className="text-[10px] font-black text-night-bordeaux/60 uppercase tracking-tight">{item.delivery_option}</span>
                                                </div>
                                                <p className="text-night-bordeaux font-black text-sm">
                                                    RWF {(item.final_price || item.price).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center bg-gray-100/50 backdrop-blur-sm rounded-xl p-1 border border-gray-200">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blush-rose transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>
                                                <span className="w-8 text-center font-black text-night-bordeaux text-sm">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blush-rose transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-berry-crush/5 text-berry-crush hover:bg-berry-crush hover:text-white transition-all group/remove"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl sticky top-32 border border-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cotton-candy/10 rounded-full blur-3xl -z-10" />

                            <h2 className="text-2xl font-heading font-black text-night-bordeaux mb-8">Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-500 font-bold text-sm">
                                    <span>Bag Subtotal</span>
                                    <span>RWF {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="p-3 bg-soft-apricot/10 rounded-xl border border-soft-apricot/20">
                                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-wider leading-relaxed text-center">
                                        Delivery & Pick-up terms are <br /> specified per individual product
                                    </p>
                                </div>
                                <div className="h-px bg-gray-100 my-4" />
                                <div className="flex justify-between items-end">
                                    <span className="font-black text-night-bordeaux text-lg">Total</span>
                                    <div className="text-right">
                                        <span className="block text-2xl font-black text-blush-rose">
                                            RWF {subtotal.toLocaleString()}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">VAT Included</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-5 bg-night-bordeaux text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-blush-rose transition-all shadow-xl hover:scale-[1.02] active:scale-95">
                                Checkout Now
                            </button>

                            <p className="mt-6 text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                                Secure payments processed by <br /> GlowKGL Gateway
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
