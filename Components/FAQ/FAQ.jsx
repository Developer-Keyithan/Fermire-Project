import React from 'react'
import './FAQ.css'

import { RxCross2 } from "react-icons/rx";

const FAQ = () => {
    return (
        <div className='FAQ-container'>
            <h1>FAQs</h1>
            <div className='faqs'>
                <div className='left-container'>
                    <div className='question-and-answer'>
                        <i><RxCross2 /></i>
                        <div>
                            <h3>What if I’m not satisfied with my order?</h3>
                            <p>If you’re unhappy with your purchase, please contact our customer support, and we’ll assist with refunds or exchanges based on our policy.</p>
                        </div>
                    </div>

                    <div className='question-and-answer'>
                        <i><RxCross2 /></i>
                        <div>
                            <h3>What if I’m not satisfied with my order?</h3>
                            <p>If you’re unhappy with your purchase, please contact our customer support, and we’ll assist with refunds or exchanges based on our policy.</p>
                        </div>
                    </div>

                    <div className='question-and-answer'>
                        <i><RxCross2 /></i>
                        <div>
                            <h3>What areas do you deliver to?</h3>
                            <p>If you’re unhappy with your purchase, please contact our customer support, and we’ll assist with refunds or exchanges based on our policy.</p>
                        </div>
                    </div>
                </div>

                <div className='right-container'>
                    <div className='question-and-answer'>
                        <i><RxCross2 /></i>
                        <div>
                            <h3>Can I contact the farmer directly?</h3>
                            <p>If you’re unhappy with your purchase, please contact our customer support, and we’ll assist with refunds or exchanges based on our policy.</p>
                        </div>
                    </div>

                    <div className='question-and-answer'>
                        <i><RxCross2 /></i>
                        <div>
                            <h3>Is my payment information secure?</h3>
                            <p>If you’re unhappy with your purchase, please contact our customer support, and we’ll assist with refunds or exchanges based on our policy.</p>
                        </div>
                    </div>

                    <div className='question-and-answer'>
                        <i><RxCross2 /></i>
                        <div>
                            <h3>Do you offer bulk buying options?</h3>
                            <p>If you’re unhappy with your purchase, please contact our customer support, and we’ll assist with refunds or exchanges based on our policy.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ
