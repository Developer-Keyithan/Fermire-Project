import './RatingCart.css'
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

interface RatingCartProps {
  rating: number;
}

const RatingCart: React.FC<RatingCartProps> = ({ rating }) => {

  return (
    <div className="rating">
        <IoStar />
        <IoStar />
        <IoStar />
        <IoStarHalf />
        <IoStarOutline />
    </div>
  );
};

export default RatingCart;
