import { useState } from 'react'
import AddProduct from '../../AddProduct/AddProduct'
import { MdDelete, MdEdit, MdSave } from 'react-icons/md'
import { toast } from 'react-toastify'
import Calendar from '../../Calendar/Calendar'
import '../../../src/app/globals.css'
import { FaRegStopCircle } from 'react-icons/fa'

interface Product {
    id: string
    productImage: string
    productName: string
    description: string
    price: string
    listedAt: string
    lastModify: string
    availableStock: string
    stockUnit: string
    harvestedAt: string
    categories: string[]
    isRecommended: boolean
}

const Products = () => {
    const [isAddProductOpen, setIsAddProductOpen] = useState(false)
    const [products, setProducts] = useState<Product[]>([
        {
            id: 'qwertyui',
            productImage: '',
            productName: 'Tomato',
            description: 'Fresh organic tomatoes from local farms',
            price: '1200',
            listedAt: '15 Jan 2025',
            lastModify: '10 Feb 2025',
            availableStock: '500',
            stockUnit: 'kg',
            harvestedAt: '10 Feb 2025',
            categories: ['Vegetables', 'Fruits'],
            isRecommended: true
        },
        {
            id: 'asdfghjk',
            productImage: '',
            productName: 'Potato',
            description: 'Premium quality potatoes',
            price: '1000',
            listedAt: '20 Jan 2025',
            lastModify: '12 Feb 2025',
            availableStock: '600',
            stockUnit: 'kg',
            harvestedAt: '12 Feb 2025',
            categories: ['Vegetables', 'Grains'],
            isRecommended: false
        }
    ])

    const [editingProductId, setEditingProductId] = useState<string | null>(null)
    const [calendarProductId, setCalendarProductId] = useState<string | null>(null)

    const categoryOptions = [
        "Fruits", "Vegetables", "Cereals", "Legumes", "Tubers", "Oilseeds",
        "Cotton", "Tobacco", "Beverages", "Forage", "Herbs", "Flowers",
        "Grains", "Citrus", "Spice", "Dairy", "Meat"
    ]

    const handleEditProduct = (id: string) => {
        if (editingProductId === id) {
            toast.success(`Product updated successfully!`)
            setEditingProductId(null)
            setCalendarProductId(null)
        } else {
            setEditingProductId(id)
        }
    }

    const handleChange = (id: string, field: string, value: string) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, [field]: value } : product
        ))
    }

    const handleCategoryChange = (id: string, category: string, isChecked: boolean) => {
        setProducts(products.map(product =>
            product.id === id
                ? {
                    ...product,
                    categories: isChecked
                        ? [...product.categories, category]
                        : product.categories.filter(cat => cat !== category)
                }
                : product
        ))
    }

    const handleStockUnitChange = (id: string, unit: string) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, stockUnit: unit } : product
        ))
    }

    const handleDateSelect = (productId: string, date: Date) => {
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
        handleChange(productId, 'harvestedAt', formattedDate)
        setCalendarProductId(null)
    }

    const handleDeleteProduct = (id: string) => {
        setProducts(products.filter(product => product.id !== id))
        toast.success('Product deleted successfully!')
    }

    const toggleRecommendation = (id: string) => {
        setProducts(products.map(product =>
            product.id === id
                ? { ...product, isRecommended: !product.isRecommended }
                : product
        ))
    }

    return (
        <div className='my-8'>
            <button
                onClick={() => setIsAddProductOpen(true)}
                className='bg-gray-100 py-2 px-8 rounded hover:bg-primaryColor hover:text-white transition-all duration-300'
            >
                + Add a New Product
            </button>

            {isAddProductOpen && (
                <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-[1000]'>
                    <AddProduct handleClose={() => setIsAddProductOpen(false)} />
                </div>
            )}

            <div className='flex flex-col gap-6 mt-8'>
                <h3 className='font-bold text-2xl text-gray-800'>Your Products</h3>

                {products.map((product) => (
                    <div key={product.id} className='relative bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow'>
                        {editingProductId === product.id ? (
                            // Edit Form
                            <div className='space-y-6'>
                                <div className="flex gap-4">
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            Product Image
                                        </label>
                                        <div className="w-40 h-40 bg-gray-100 rounded-lg overflow-hidden">
                                            <img
                                                src={product.productImage || '/default-product.png'}
                                                alt="Product preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="mt-2 text-sm hidden" // Hide the default input button
                                            id="upload-input"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (event) => {
                                                        if (event.target?.result) {
                                                            handleChange(product.id, "productImage", event.target.result.toString());
                                                        }
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                        <label htmlFor="upload-input" className="mt-2 flex items-center justify-between cursor-pointer text-primaryColor">
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                            </svg>
                                            Upload Image
                                        </label>
                                    </div>


                                    <div className='w-full'>
                                        <div className='flex flex-col gap-4'>
                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                                    Product Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primaryColor focus:border-transparent"
                                                    value={product.productName}
                                                    onChange={(e) => handleChange(product.id, 'productName', e.target.value)}
                                                />
                                            </div>

                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                                    Description
                                                </label>
                                                <textarea
                                                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primaryColor focus:border-transparent"
                                                    value={product.description}
                                                    rows={3}
                                                    onChange={(e) => handleChange(product.id, 'description', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mt-2'>
                                                Categories
                                            </label>
                                            <div className="grid grid-cols-2 md:grid-cols-8 gap-2">
                                                {categoryOptions.map((category) => (
                                                    <label key={category} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={product.categories.includes(category)}
                                                            onChange={(e) => handleCategoryChange(product.id, category, e.target.checked)}
                                                            className='h-4 w-4 accent-primaryColor border-gray-300 rounded'
                                                        />
                                                        <span className='text-sm text-gray-700'>{category}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                                    Price (LKR)
                                                </label>
                                                <input
                                                    type="number"
                                                    className="w-full px-3 py-2 border rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-2 focus:ring-primaryColor"
                                                    value={product.price}
                                                    onChange={(e) => handleChange(product.id, 'price', e.target.value)}
                                                />
                                            </div>

                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                                    Available Stock
                                                </label>
                                                <div className='flex gap-4'>
                                                    <input
                                                        type="number"
                                                        className="w-full px-3 py-2 border rounded-md [appearance:textfield] focus:ring-2 focus:ring-primaryColor"
                                                        value={product.availableStock}
                                                        onChange={(e) => handleChange(product.id, 'availableStock', e.target.value)}
                                                    />
                                                    <div className='flex gap-2 items-center'>
                                                        <label className='flex items-center gap-1'>
                                                            <input
                                                                type="radio"
                                                                name="stockUnit"
                                                                value="kg"
                                                                checked={product.stockUnit === 'kg'}
                                                                onChange={() => handleStockUnitChange(product.id, 'kg')}
                                                                className='h-4 w-4 accent-primaryColor'
                                                            />
                                                            <span className='text-sm'>kg</span>
                                                        </label>
                                                        <label className='flex items-center gap-1'>
                                                            <input
                                                                type="radio"
                                                                name="stockUnit"
                                                                value="g"
                                                                checked={product.stockUnit === 'g'}
                                                                onChange={() => handleStockUnitChange(product.id, 'g')}
                                                                className='h-4 w-4 accent-primaryColor'
                                                            />
                                                            <span className='text-sm'>gram</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                                    Harvest Date
                                                </label>
                                                <div className='relative'>
                                                    <button
                                                        type='button'
                                                        className='w-full px-3 py-2 text-left bg-white border rounded-md shadow-sm focus:ring-2 focus:ring-primaryColor'
                                                        onClick={() => setCalendarProductId(product.id)}
                                                    >
                                                        {product.harvestedAt}
                                                    </button>
                                                    {calendarProductId === product.id && (
                                                        <div className="absolute bottom-16 mb-3 right-0 z-10">
                                                            <Calendar
                                                                onDateSelect={(date) => handleDateSelect(product.id, date)}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-end gap-3'>
                                    <button
                                        onClick={() => setEditingProductId(null)}
                                        className='px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleEditProduct(product.id)}
                                        className='px-4 py-2 bg-primaryColor text-white rounded-md hover:bg-blue-600 flex items-center gap-2'
                                    >
                                        <MdSave className='w-5 h-5' />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Display View
                            <div>
                                <div className='flex gap-6'>
                                    <div className='w-40 h-40 bg-gray-100 rounded-lg overflow-hidden shrink-0'>
                                        <img
                                            src={product.productImage}
                                            alt={product.productName}
                                            className='w-full h-full object-cover'
                                        />
                                    </div>

                                    <div className='flex-1'>
                                        <div className='flex items-start'>
                                            <h4 className='text-xl font-bold text-gray-900'>{product.productName}</h4>

                                        </div>

                                        <p className='text-gray-600 mb-4'>{product.description}</p>

                                        <div className='flex flex-wrap gap-2 mb-4'>
                                            {product.categories.map((category) => (
                                                <span
                                                    key={category}
                                                    className='px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full'
                                                >
                                                    {category}
                                                </span>
                                            ))}
                                        </div>

                                        <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
                                            <div>
                                                <p className='text-sm text-gray-500'>Price</p>
                                                <p className='font-medium'>LKR {product.price}</p>
                                            </div>
                                            <div>
                                                <p className='text-sm text-gray-500'>Stock</p>
                                                <p className='font-medium'>{product.availableStock} {product.stockUnit}</p>
                                            </div>
                                            <div>
                                                <p className='text-sm text-gray-500'>Harvested</p>
                                                <p className='font-medium'>{product.harvestedAt}</p>
                                            </div>
                                            <div>
                                                <p className='text-sm text-gray-500'>Listed</p>
                                                <p className='font-medium'>{product.listedAt}</p>
                                            </div>
                                            <div>
                                                <p className='text-sm text-gray-500'>Last Updated</p>
                                                <p className='font-medium'>{product.lastModify}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='absolute top-4 right-4 flex items-center gap-2'>
                                    <span className={`px-3 py-1 text-sm rounded-full w-max ${product.isRecommended
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {product.isRecommended ? 'Product Recommended' : 'Product Not Recommended'}
                                    </span>
                                    •
                                    <div className='flex gap-1'>
                                        <button
                                            onClick={() => toggleRecommendation(product.id)}
                                            className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${product.isRecommended
                                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                }`}
                                        >
                                            <span className='text-sm'>
                                                {product.isRecommended ? 'Stop Recommending' : 'Start Recommending'}
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className='btn-container flex items-center justify-center px-2 py-1 bg-red-700 text-white rounded-full cursor-pointer'
                                        >
                                            <MdDelete className='w-4 h-4' />
                                            <span className='text-sm'>Delete</span>
                                        </button>
                                        <button
                                            onClick={() => handleEditProduct(product.id)}
                                            className='btn-container flex items-center justify-center px-2 py-1 bg-primaryColor text-white rounded-full cursor-pointer'
                                        >
                                            <MdEdit className='w-4 h-4' />
                                            <span className='text-sm'>Edit</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products