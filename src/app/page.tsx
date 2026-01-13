'use client'
import { useState, useEffect } from 'react';
import Product from './Components/Product/Product';
import About from './Components/About/About';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Hero from './Components/Hero/Hero';
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LandingPage: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(12);
    const [visibleShowMoreBtn, setVisibleShowMoreBtn] = useState(true);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/product');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const loadMoreProducts = () => {
        setVisibleProducts(visibleProducts + 12);
        setVisibleShowMoreBtn(false);
    };

    const handleViewAll = () => {
        router.push('/products');
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className='relative'>
                <div className="Hero-container mb-12">
                    <Hero />
                </div>
                <div className='container mx-auto px-4 md:px-16 mb-20'>
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-primary pl-4">Featured Products</h2>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white rounded-xl h-96 shadow-sm border border-gray-100 animate-pulse">
                                    <div className="h-64 bg-gray-200 rounded-t-xl"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <Product data={products.slice(0, visibleProducts)} />
                        </div>
                    )}

                    <div className="flex justify-end mt-12">
                        {visibleShowMoreBtn ? (
                            <button
                                onClick={loadMoreProducts}
                                className="flex items-center gap-2 px-8 py-3 bg-white border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                            >
                                Show More <FaArrowRightLong />
                            </button>
                        ) : (
                            <button
                                onClick={handleViewAll}
                                className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                View All Products <FaArrowRightLong />
                            </button>
                        )}
                    </div>
                </div>
                <div className="About-container">
                    <About />
                </div>
            </div>
            <div className='mt-0'>
                <Footer />
            </div>
        </div>
    );
};

export default LandingPage;