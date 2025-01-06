import './ProductCart.css';
import { useState } from 'react';
import RatingCart from '../Rating Cart/RatingCart';
import Button from '../Button/Button';

import { IoIosArrowBack, IoIosArrowForward, IoIosRemove, IoIosAdd } from "react-icons/io";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';

function ProductCart({ image, relatedImage1, relatedImage2, relatedImage3, relatedImage4, relatedImage5, name, description, rating, district, freshness, AgricationMethod, newPrice, oldPrice }) {

    const [quantity, setQuantity] = useState(100);
    const [unit, setUnit] = useState('grams');

    const totalPrice = unit === 'grams' ? quantity * newPrice / 1000 : quantity * newPrice;

    const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100 * 2) / 2;

    const handleQuantityClick = (amount, unitType) => {
        setQuantity(amount);
        setUnit(unitType);
    };

    const adjustQuantity = (adjustment) => {
        let newQuantity;
        if (unit === 'grams') {
            newQuantity = quantity + (adjustment * 50);
        } else if (unit === 'kilograms') {
            newQuantity = quantity + (adjustment * 1);
        }

        if (newQuantity < 0) newQuantity = 0;
        setQuantity(newQuantity);
    };

    const handleSelectUnit = (event) => {
        setUnit(event.target.value);
    };

    return (
        <div className='productcart-container'>
            <div className="product-images">
                <div className="main-image">
                    <img className='main-img' src={image} alt="" />
                </div>
                <div className="related-images">
                    <button><IoIosArrowBack /></button>
                    <div className="related-image">
                        <img className='related-img' src={relatedImage1} alt="" />
                    </div>
                    <div className="related-image">
                        <img className='related-img' src={relatedImage2} alt="" />
                    </div>
                    <div className="related-image">
                        <img className='related-img' src={relatedImage3} alt="" />
                    </div>
                    <div className="related-image">
                        <img className='related-img' src={relatedImage4} alt="" />
                    </div>
                    <div className="related-image">
                        <img className='related-img' src={relatedImage5} alt="" />
                    </div>
                    <button><IoIosArrowForward /></button>
                </div>
            </div>

            <div className="product-overview-content">
                <h1>{name}</h1>
                <p>{description}</p>

                <div className='product-content-icons'>
                    <i><RatingCart /></i>
                    <div className="extra-icons">
                        <i><IoShareSocialSharp /></i>
                        <i><FaRegHeart /></i>
                    </div>
                </div>

                <div className="extra-product-info">
                    <p>From: {district}</p>
                    <p>Freshness: {freshness}</p>
                    <p>Agriculture Method: {AgricationMethod}</p>
                </div>

                <div className="price">
                    <h1>Rs. {newPrice}</h1>
                    <p><span>Rs. {oldPrice}</span><b> -{discount}%</b></p>
                </div>

                <div className="quantity">
                    <h2>Quantity</h2>
                    <div className="select-quantity">
                        <button onClick={() => handleQuantityClick(200, 'grams')}>200 grams</button>
                        <button onClick={() => handleQuantityClick(250, 'grams')}>250 grams</button>
                        <button onClick={() => handleQuantityClick(500, 'grams')}>500 grams</button>
                        <button onClick={() => handleQuantityClick(1, 'kilograms')}>1 kilogram</button>
                        <button onClick={() => handleQuantityClick(2, 'kilograms')}>2 kilograms</button>
                        <button onClick={() => handleQuantityClick(3, 'kilograms')}>3 kilograms</button>
                        <button onClick={() => handleQuantityClick(5, 'kilograms')}>5 kilograms</button>
                    </div>
                    <div className="enter-quantity">
                        <div className='quantity-display'>
                            <button className='decrease' onClick={() => adjustQuantity(-1)}><IoIosRemove /></button>
                            <p contentEditable suppressContentEditableWarning onBlur={(e) => {
                                const newQuantity = parseInt(e.target.textContent, 10) || (unit === 'grams' ? 100 : 1);
                                setQuantity(newQuantity);
                            }}
                            >{quantity}</p>
                            <button className='increase' onClick={() => adjustQuantity(1)}><IoIosAdd /></button>
                        </div>
                        <label><input type="radio" name="quantityUnit" checked={unit === 'grams'} onChange={() => setUnit('grams')} />Grams</label>
                        <label><input type="radio" name="quantityUnit" checked={unit === 'kilograms'} onChange={() => setUnit('kilograms')} />Kilograms</label>
                    </div>
                </div>

                <div className="product-buying-options">
                    <h2>Total Price: Rs. {totalPrice.toFixed(2)}</h2>
                    <div className="buy-btns">
                        <Link to="/Order"><Button textContent="Buy Now" style={{ background: '#007546' }} /></Link>
                        <Button textContent="Add to Cart" style={{ background: '#FF8000' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCart;
