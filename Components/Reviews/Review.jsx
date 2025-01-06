import './Review.css'

import sampleData from '../../Data/ReviewData';
import ReviewCart from '../Review Cart/ReviewCart';
import Pagination from '../Pagination/Pagination';

function Review() {
    return (
        <div className='review-container'>
            <h2>Reviews</h2>
            <div className='review-carts'>
                {sampleData.map((item) => (
                    <ReviewCart key={item.id} {...item} />
                ))}
            </div>
            < Pagination />
        </div>
    );
}

export default Review;
