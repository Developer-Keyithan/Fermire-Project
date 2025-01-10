import './OrderOverview.css'

function OrderOverview() {
    return (
        <div className='order-overview-container'>
            <div className="left-section">
                <div className="chosen-coupon">
                    <h2>{ }</h2>
                    <p>{ }</p>
                </div>

                <input className='promo-code' type="text" placeholder='If you have a promo code? Enter the promo code.' />

                <div className="chosen-card">
                    <div className='cards-content'>
                        <h3 className='card-name'>{}</h3>
                        <div className="card-data">
                            <p><strong>Card Number:</strong> {}</p>
                            <p><strong>Expire Date:</strong> {}</p>
                        </div>
                    </div>

                    {/* <div className='cards-type'>
                        <img src={card} alt={alt} />
                    </div> */}
                </div>

                <div className="chosen-address">
                    <i>{ }</i>
                    <div className='delivery-address'>
                        <p>{ }</p>
                        <p><strong>District:</strong>{ }</p>
                        <p><strong>Contact No:</strong> +94 { }</p>
                    </div>
                </div>
            </div>

            <div className="right-section">
                <p><strong>Total Price:</strong> Rs. { }</p>
                <div className="final-price">
                    <h1>Final Price</h1>
                    <p>= Rs. { }</p>
                </div>
                <button className='order-btn'>Place Order</button>
            </div>
        </div>
    )
}

export default OrderOverview
