// Cart.tsx
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from "next/image";
import RatingCart from '../Rating Cart/RatingCart';
import { IoCartOutline } from 'react-icons/io5';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Added Wishlist icons
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

interface ProductData {
    _id?: string;
    image: string | StaticImageData;
    name: string;
    productName: string;
    deliveryType: string;
    price: {
        newPrice: string;
        oldPrice: string;
    };
    rating: number;
    productImages: [{ imageUrl: string }];
}

interface CartProps {
    data: ProductData;
}

const Cart: React.FC<CartProps> = ({ data }) => {
    const router = useRouter();
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleAddToCart = async () => {
        const id = data._id;
        try {
            const user = await axios.get('/api/cookie');

            if (user.status !== 200 || !user.data?.user?.id) {
                return toast.error('If you want to add an item to your cart, you must login or register');
            }

            const response = await axios.post('/api/cart', {
                userId: user.data.user.id,
                productId: id,
                value: 1,
                unit: 'kg',
            });

            if (response.status === 200) {
                toast.success("Item added to cart");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    toast.error('If you want to add an item to your cart, you must login or register');
                } else {
                    toast.error("Unable to add cart item");
                }
            } else {
                toast.error("Unable to add cart item");
            }
        }
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent product click
        setIsWishlisted(!isWishlisted);
        if (!isWishlisted) {
            toast.success("Added to Wishlist");
        } else {
            toast.info("Removed from Wishlist");
        }
    };

    const image = typeof data.productImages[0].imageUrl === 'string' ? data.productImages[0].imageUrl : data.productImages[0].imageUrl;

    const handleProduct = () => {
        const id = data._id;
        router.push(`/overview/${id}`);
    };

    return (
        <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full cursor-pointer border border-gray-100 hover:border-primary/20 hover:-translate-y-1">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div onClick={handleProduct}>
                <div className="w-full h-64 overflow-hidden relative">
                    <Image
                        src={image}
                        alt={data.productName}
                        fill
                        className='object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Wishlist Button */}
                    <button
                        onClick={handleWishlistToggle}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                    >
                        {isWishlisted ? <AiFillHeart className="text-xl text-red-500" /> : <AiOutlineHeart className="text-xl" />}
                    </button>
                </div>
                <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">{data.productName}</h2>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <span className="text-xl font-bold text-primary">Rs. {data.price.newPrice}</span>
                        {data.price.oldPrice && <span className="text-sm text-gray-400 line-through decoration-red-400">Rs. {data.price.oldPrice}</span>}
                    </div>
                    <div className="">
                        <RatingCart rating={data.rating || 3.5} />
                    </div>
                </div>
            </div>

            <div className="px-4 pb-4">
                <button
                    onClick={handleAddToCart}
                    className='w-full flex items-center justify-center gap-2 bg-primary text-white hover:bg-secondaryButtonColor hover:text-white font-medium py-2 rounded-lg transition-all duration-300 transform active:scale-95 shadow-md'
                >
                    Add to Cart <IoCartOutline className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default Cart;