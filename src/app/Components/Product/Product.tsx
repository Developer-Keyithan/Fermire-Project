// Products.tsx
import { useState } from 'react';
import { StaticImageData } from "next/image";
import Cart from '../Cart/Cart';
import { LuFilter } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";

interface product {
    id: string;
    image: string | StaticImageData;
    name: string;
    productName: string;
    price: {
        newPrice: string;
        oldPrice: string;
    };
    productImages: [{
        imageUrl: string;
    }];
    rating: number;
    deliveryType: string;
}

interface FilterProps {
    data: product[];
}

const Products: React.FC<FilterProps> = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [maxPrice, setMaxPrice] = useState(1800);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    const handleFilterClick = (filter: string) => {
        setActiveFilters((prevFilters) => {
            if (prevFilters.includes(filter)) {
                return prevFilters.filter(item => item !== filter);
            } else {
                return [...prevFilters, filter];
            }
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Search is handled by real-time filtering now, but prevent form submit
    };

    const filteredData = data.filter(item => {
        // 1. Search Filter
        const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase());

        // 2. Category Filter (Assuming 'activeFilters' contains category names)
        // Note: Data might not have 'category' field explicitly defined in interface yet, 
        // but likely needed. If not present, this condition effectively does nothing if filters are active 
        // unless we match against product Name or description. 
        // Let's assume strict filtering if category exists, else lax.
        // For now, if activeFilters has items, we check if productName contains any of them (as a fallback).
        const matchesCategory = activeFilters.length === 0 || activeFilters.some(filter =>
            // @ts-ignore: Assuming category might exist in data at runtime or matching name
            (item.category && item.category === filter) ||
            item.productName.toLowerCase().includes(filter.toLowerCase()) ||
            (filter === 'In-Stock') // Placeholder logic
        );

        // 3. Price Filter
        const priceStr = String(item.price.newPrice || '0');
        const price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
        const matchesPrice = !isNaN(price) ? price <= maxPrice : true;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
        <div className='container mx-auto px-4 py-8 min-h-screen'>
            {/* Search and Top Bar */}
            <div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
                <div className='w-full md:w-1/2 relative'>
                    <form onSubmit={handleSearch} className="relative w-full">
                        <input
                            type="search"
                            id="search-bar"
                            placeholder='Search Your Likes...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full pl-5 pr-12 py-3 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300'
                        />
                        <button type='submit' className='absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-green-800 transition-colors duration-300'>
                            <BiSearch className='text-xl' />
                        </button>
                    </form>
                </div>

                <div className='flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0'>
                    {/* Category / Quick Filters */}
                    {['Vegetables', 'Fruits', 'Grains', 'Fresh', 'Spices'].map((cat) => (
                        <button
                            key={cat}
                            type='button'
                            onClick={() => handleFilterClick(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeFilters.includes(cat)
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className='flex flex-col lg:flex-row gap-8'>
                {/* Sidebar Filters */}
                <div className='lg:w-1/4 space-y-6'>
                    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className='font-semibold text-lg text-gray-800 flex items-center gap-2'><LuFilter /> Filters</h3>
                            {activeFilters.length > 0 && (
                                <button onClick={() => setActiveFilters([])} className="text-xs text-red-500 hover:underline">Clear all</button>
                            )}
                        </div>

                        {/* Filter Groups */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-600 mb-2">Category</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Organic', 'Free Delivery', 'In-Stock'].map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => handleFilterClick(filter)}
                                            className={`text-xs px-3 py-1 border rounded-md transition-colors ${activeFilters.includes(filter) ? 'border-primary text-primary bg-primary/5' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-600 mb-2">Price Range</h4>
                                <div className="px-2">
                                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                                        <span>Rs. 50</span>
                                        <span>Rs. {maxPrice}</span>
                                    </div>
                                    <input
                                        type="range"
                                        className='w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary'
                                        min="50"
                                        max="1800"
                                        step="50"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className='lg:w-3/4'>
                    <div className="mb-4 flex flex-wrap gap-2 items-center">
                        {activeFilters.length > 0 && <span className="text-sm text-gray-500 mr-2">Active:</span>}
                        {activeFilters.map((filter, index) => (
                            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                                {filter}
                                <button onClick={() => handleFilterClick(filter)} className="hover:text-green-700 ml-1"><RxCross2 /></button>
                            </span>
                        ))}
                    </div>

                    {filteredData.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                            {filteredData.map((item, index) => (
                                <Cart key={index} data={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                            <p className="text-lg">No products found matching your filters.</p>
                            <button onClick={() => { setActiveFilters([]); setSearchTerm(''); setMaxPrice(1800); }} className="mt-4 text-primary hover:underline">Clear Filters</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;