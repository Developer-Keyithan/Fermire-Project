import { useState } from "react";
import "./ChosenProduct.css";
import cartItems from "../../Data/ProductData";

const ChosenProduct = () => {
    const [quantities, setQuantities] = useState(
        cartItems.map(() => 1)
    );

    const handleIncrement = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index] += 1;
        setQuantities(newQuantities);
    };

    const handleDecrement = (index) => {
        const newQuantities = [...quantities];
        if (newQuantities[index] > 1) newQuantities[index] -= 1;
        setQuantities(newQuantities);
    };

    return (
        <div style={{ padding: "20px" }}>
            {cartItems.map((item, index) => (
                <div key={item.id} className="chosen-product-container">
                    <img src={item.image} alt={item.name} className="image" />
                    <div className="details">
                        <h3>{item.name}</h3>
                        <p>Price: Rs.{item.newPrice} Per kg</p>
                        <div className="controls">
                            <button onClick={() => handleDecrement(index)}>-</button>
                            <span>{quantities[index]}</span>
                            <button onClick={() => handleIncrement(index)}>+</button>
                        </div>
                        <div className="sub-total-and-cancel-btn">
                            <p>Sub Total: Rs. {item.newPrice * quantities[index]}</p>
                            <button className="cancel-button">Cancel</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChosenProduct;
