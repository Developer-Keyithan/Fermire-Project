import { useRouter } from 'next/router';
import { StaticImageData } from "next/image";
import './Cart.css';
import RatingCart from '../Rating Cart/RatingCart';
import Toggle from '../Toggle/Toggle';
import { FaRegHeart } from "react-icons/fa";

interface ProductData {
  id: string;
  image: string | StaticImageData;
  name: string;
  deliveryType: string;
  newPrice: string;
  oldPrice: string;
}

interface CartProps {
  data: ProductData;
}

const Cart: React.FC<CartProps> = ({ data }) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/Overview/${data.id}`);
  };

  return (
    <div className="cart" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
      <div className="image">
        <img src={data.image as string} alt={data.name} />
      </div>
      <div className="cart-content">
        <div className="cart-name">
          <h3>{data.name}</h3>
          <p>{data.deliveryType}</p>
        </div>
        <p>
          <h3 className="new-price">Rs. {data.newPrice}</h3>
          <span className="old-price"> {data.oldPrice}</span>
        </p>
        <RatingCart rating={4.5} />
      </div>
      <button className='add-to-cart'>Add to Cart</button>
      <i className='fav-icon'>
        <Toggle icon={<FaRegHeart />} position={{ right: '10px' }} />
      </i>
    </div>
  );
};

export default Cart;
