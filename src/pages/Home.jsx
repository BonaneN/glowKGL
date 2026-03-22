import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    // Image paths
    const images = {
        hero: "https://plus.unsplash.com/premium_photo-1661404164814-9d3c137097aa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        services: {
            hair: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800",
            makeup: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800",
            skincare: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
            nails: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800"
        },
        products: {
            skincare: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
            makeup: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
            haircare: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400",
            fragrance: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400"
        },
        professionals: {
            hair: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
            makeup: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
            skin: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
            nails: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
        }
    };

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section with Background Image */}
            <section
                className="relative min-h-[85vh] flex items-center overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${images.hero})` }}
            >
                {/* Stronger overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-night-bordeaux/95 via-berry-crush/90 to-blush-rose/85"></div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 leading-tight text-center md:text-left">
                            Your Beauty,
                            <span className="block bg-gradient-to-r from-soft-apricot via-cotton-candy to-soft-apricot bg-clip-text text-transparent">
                                Elevated
                            </span>
                        </h1>
                        <p className="text-lg md:text-2xl text-white mb-10 font-light text-center md:text-left">
                            Discover premium products and expert professionals curated for your unique beauty journey
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                to="/products"
                                className="group px-10 py-5 bg-gradient-to-r from-cotton-candy to-blush-rose text-white rounded-full font-bold text-lg transition-all hover:shadow-2xl hover:scale-105 hover:from-blush-rose hover:to-berry-crush flex items-center justify-center gap-2 w-full sm:w-auto min-w-[220px]"
                            >
                                Explore Products
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link
                                to="/professionals"
                                className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/50 rounded-full font-bold text-lg transition-all hover:bg-white hover:text-night-bordeaux hover:shadow-2xl hover:scale-105 w-full sm:w-auto min-w-[220px] flex items-center justify-center"
                            >
                                Book Expert
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* GlowKGL Difference - Blush Rose Background */}
            <section className="py-20 bg-blush-rose/10">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-heading font-bold text-night-bordeaux mb-4">
                            The GlowKGL Difference
                        </h2>
                        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                            We're not just a marketplace—we're your trusted beauty companion
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                title: 'Verified Excellence',
                                desc: 'All professionals are certified and customer-reviewed',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Premium Selection',
                                desc: 'Handpicked products from trusted beauty brands',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Seamless Experience',
                                desc: 'Book appointments and shop with ease',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Dedicated Support',
                                desc: 'Our team is here to help you every step of the way',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                )
                            }
                        ].map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cotton-candy to-blush-rose rounded-full text-white mb-4 shadow-lg">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-night-bordeaux mb-2">{benefit.title}</h3>
                                <p className="text-gray-700 text-sm">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Categories - Soft Apricot Background */}
            <section className="py-20 bg-soft-apricot/20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-5xl font-heading font-bold text-night-bordeaux mb-4">
                            Our Services
                        </h2>
                        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                            Professional beauty services tailored to your needs
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-6 mb-12">
                        {[
                            { title: 'Hair Styling', image: images.services.hair },
                            { title: 'Makeup Artistry', image: images.services.makeup },
                            { title: 'Skincare', image: images.services.skincare },
                            { title: 'Nail Care', image: images.services.nails }
                        ].map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-3 shadow-lg hover:shadow-2xl transition-all">
                                    <div
                                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                                        style={{ backgroundImage: `url(${service.image})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-night-bordeaux/90 via-berry-crush/50 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <h3 className="text-xl font-heading font-bold text-white">{service.title}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            to="/services"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blush-rose text-white rounded-full font-semibold hover:bg-berry-crush transition-all hover:shadow-xl"
                        >
                            Explore More Services
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Product Categories - Cotton Candy Background */}
            <section className="py-20 bg-cotton-candy/10">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-5xl font-heading font-bold text-night-bordeaux mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                            Premium beauty products for every need
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-6 mb-12">
                        {[
                            { title: 'Skincare', image: images.products.skincare },
                            { title: 'Makeup', image: images.products.makeup },
                            { title: 'Hair Care', image: images.products.haircare },
                            { title: 'Fragrance', image: images.products.fragrance }
                        ].map((category, index) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative overflow-hidden rounded-2xl aspect-[5/4] shadow-lg hover:shadow-2xl transition-all group-hover:-translate-y-2">
                                    <div
                                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                                        style={{ backgroundImage: `url(${category.image})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-night-bordeaux/80 to-transparent flex items-end p-6">
                                        <h3 className="text-2xl font-heading font-bold text-white">{category.title}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blush-rose text-white rounded-full font-semibold hover:bg-berry-crush transition-all hover:shadow-xl"
                        >
                            Explore More Products
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Our Professionals - Berry Crush Background */}
            <section className="py-20 bg-berry-crush/10">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-5xl font-heading font-bold text-night-bordeaux mb-4">
                            Our Professionals
                        </h2>
                        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                            Meet our certified beauty experts
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { name: 'Hair Specialists', service: 'Hair styling, treatment and coloring.', image: images.professionals.hair },
                            { name: 'Makeup Artists', service: 'Simple, bridal and event Makeup.', image: images.professionals.makeup },
                            { name: 'Skin Experts', service: 'Facial, body skin and skincare.', image: images.professionals.skin },
                            { name: 'Nail Technicians', service: 'Manicure, pedicure and nail art.', image: images.professionals.nails }
                        ].map((professional, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                                    <div className="relative w-full aspect-[4/5] overflow-hidden">
                                        <div
                                            className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                                            style={{ backgroundImage: `url(${professional.image})` }}
                                        ></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-night-bordeaux/60 to-transparent"></div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-heading font-bold text-night-bordeaux text-lg mb-1">{professional.name}</h3>
                                        <p className="text-sm text-gray-600 mb-3">{professional.service}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join GlowKGL Community */}
            <section className="py-24 bg-gradient-to-br from-soft-apricot to-cotton-candy/60 text-night-bordeaux relative overflow-hidden">

                <div className="absolute top-0 right-0 w-96 h-96 bg-blush-rose/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-berry-crush/20 rounded-full blur-3xl"></div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                            Join the GlowKGL Community
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-700 mb-10 font-light">
                            Become part of a vibrant community of beauty enthusiasts, professionals, and brands.
                            Connect with like-minded individuals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/register"
                                className="px-12 py-5 bg-gradient-to-r from-blush-rose to-berry-crush text-white rounded-full font-bold text-lg hover:from-berry-crush hover:to-night-bordeaux transition-all shadow-2xl hover:scale-105"
                            >
                                Join the community
                            </Link>
                            <Link
                                to="/professionals"
                                className="px-12 py-5 bg-white text-night-bordeaux border-2 border-night-bordeaux/20 rounded-full font-semibold text-lg hover:bg-night-bordeaux hover:text-white transition-all shadow-xl hover:scale-105"
                            >
                                Become an artist
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                            <div>
                                <div className="text-4xl font-bold mb-2">50+</div>
                                <div className="text-sm text-black/80 uppercase tracking-wider">Professionals</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">100+</div>
                                <div className="text-sm text-black/80 uppercase tracking-wider">Products</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">50+</div>
                                <div className="text-sm text-black/80 uppercase tracking-wider">Happy Clients</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default Home;
