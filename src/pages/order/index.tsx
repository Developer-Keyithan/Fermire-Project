import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import AddOne from '../../../Components/Add One/AddOne';
import AddressCart from '../../../Components/Address Cart/AddressCart';
import CardsCart from '../../../Components/Cards Cart/CardsCart';
import OrderOverview from '../../../Components/OrderOverview/OrderOverview';
import Coupon from '../../../Components/Coupon/Coupon';
import DeliveryAddressForm from '../../../Components/Delivery Address Form/DeliveryAddressForm';
import CardForm from '../../../Components/cardForm/index';
import { RiUnpinFill } from 'react-icons/ri';

interface Product {
    unit: string;
    finalQuantity: number;
    price: { newPrice: number };
    name: string;
    pricePerKg: number;
    agricationMethod: string;
    productName: string;
    productDescription: string;
    productImages?: { imageUrl: string }[];
}

function OrderPage() {
    const [showDeliveryForm, setShowDeliveryForm] = useState(false);
    const [showCardForm, setShowCardForm] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [unitSelection, setUnitSelection] = useState<{ [key: number]: string }>({});

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (id) {
                    const response = await axios.post('/api/product/get-product', { productId: id });
                    setProducts(response.data.product);
                } else {
                    const storedData = localStorage.getItem("checkoutItems");
                    if (storedData) {
                        setProducts(JSON.parse(storedData));
                    }
                }
            } catch (err) {
                setError('Failed to fetch product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (index: number, change: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((product, i) =>
                i === index ? { ...product, finalQuantity: Math.max(1, product.finalQuantity + change) } : product
            )
        );
    };

    const handleRemoveProduct = (index: number) => {
        setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
    };

    const handleUnitChange = (index: number, unit: string) => {
        setProducts((prevProducts) =>
            prevProducts.map((product, i) =>
                i === index ? { ...product, unit } : product
            )
        );
    };

    const calculateSubtotal = (product: Product) => {
        const price = product.price?.newPrice || product.pricePerKg;
        const quantity = product.finalQuantity;
        const unit = product.unit; // Get updated unit directly from product

        return unit === "kg" ? price * quantity : (price / 1000) * quantity; // If grams, divide by 1000
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className='sticky top-0'>
                <Navbar />
                <hr />
            </div>

            <div className="mx-60 mb-5 rounded-b-[20px] overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between gap-5 mt-5 px-[1px]">
                    <div className="flex flex-col gap-5 w-full md:w-[56.9%]">
                        <div className="flex gap-5">
                            <AddOne textContent="Add New Delivery Address" onClick={() => setShowDeliveryForm(true)} />
                            <AddOne textContent="Add New Card" onClick={() => setShowCardForm(true)} />
                        </div>

                        <div className="w-full mt-5">
                            <h2 className="text-xl font-semibold">Payment Method</h2>
                            <div className="flex justify-around gap-5 mt-5">
                                <button className="button-primary w-full h-10 text-base">Cash on Delivery</button>
                                <button className="button-primary w-full h-10 text-base">Card Payment</button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 ring-1 ring-gray-500 p-4 rounded-md">
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <div key={index} className="ring-1 ring-gray-500 p-4 rounded">
                                        <div className="w-full h-max flex gap-4 overflow-hidden">
                                            <div className='h-full w-1/4 overflow-hidden'>
                                                <Image
                                                    src={product.productImages?.[0]?.imageUrl || '/default-image.jpg'}
                                                    alt={product.productName || product.name || 'Product'}
                                                    width={200}
                                                    height={200}
                                                    objectFit="cover"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className='w-3/4'>
                                                <h1 className='font-semibold text-2xl'>{product.productName || product.name}</h1>
                                                <div className="flex justify-between">
                                                    <p><strong className='font-semibold'>Agrication Method:</strong> {product.agricationMethod}</p>
                                                    <p><strong className='font-semibold'>Price Per kg:</strong> {product.price?.newPrice || product.pricePerKg}</p>
                                                </div>
                                                <div className="flex items-center gap-2 mt-3">
                                                    <button onClick={() => handleQuantityChange(index, -1)} className="px-2 py-1 border rounded">-</button>
                                                    <p className='text-center w-20 py-1 rounded border'>{product.finalQuantity}</p>
                                                    <button onClick={() => handleQuantityChange(index, 1)} className="px-2 py-1 border rounded">+</button>
                                                    <label className='flex gap-2 ml-4 cursor-pointer' htmlFor={`gram-${index}`}>
                                                        <input
                                                            type="radio"
                                                            id={`gram-${index}`}
                                                            name={`unit-${index}`}
                                                            checked={product.unit === "gram"}
                                                            onChange={() => handleUnitChange(index, "gram")}
                                                            className='cursor-pointer accent-primaryColor'
                                                        /> gram
                                                    </label>
                                                    <label className='flex gap-2 ml-4 cursor-pointer' htmlFor={`kg-${index}`}>
                                                        <input
                                                            type="radio"
                                                            id={`kg-${index}`}
                                                            name={`unit-${index}`}
                                                            checked={product.unit === "kg"}
                                                            onChange={() => handleUnitChange(index, "kg")}
                                                            className='cursor-pointer accent-primaryColor'
                                                        /> kg
                                                    </label>

                                                </div>
                                                <div className='flex justify-between items-center mt-5'>
                                                    <p><span className='font-semibold'>Sub Total: </span>{calculateSubtotal(product, index).toFixed(2)}</p>
                                                    <button
                                                        onClick={() => handleRemoveProduct(index)}
                                                        className='flex gap-3 items-center px-4 py-1 bg-red-600 text-white rounded hover:bg-red-800 transition ease-in-out duration-500'
                                                    >
                                                        <RiUnpinFill /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No products found</div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <AddressCart />
                        <CardsCart />
                        <Coupon />
                    </div>
                </div>

                <div className="bottom-container mt-5">
                    <OrderOverview />
                </div>

                {showDeliveryForm && (
                    <div className="fixed inset-0 flex justify-center items-center px-[30vw] backdrop-blur-lg">
                        <div className="relative bg-white rounded-lg">
                            <DeliveryAddressForm handleClose={() => setShowDeliveryForm(false)} />
                        </div>
                    </div>
                )}

                {showCardForm && (
                    <div className="fixed inset-0 flex justify-center items-center px-[30vw] backdrop-blur-lg">
                        <div className="relative bg-white rounded-lg">
                            <CardForm handleClose={() => setShowCardForm(false)} />
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default OrderPage;
