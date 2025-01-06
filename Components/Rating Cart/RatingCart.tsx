import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

interface RatingCartProps {
  rating: number;
}

const RatingCart: React.FC<RatingCartProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="rating">
      {[...Array(fullStars)].map((_, index) => <i key={index}><IoStar /></i>)}
      {[...Array(halfStars)].map((_, index) => <i key={index}><IoStarHalf /></i>)}
      {[...Array(emptyStars)].map((_, index) => <i key={index}><IoStarOutline /></i>)}
    </div>
  );
};

export default RatingCart;
