import { useState } from 'react';
import './style.css';
import { IoClose } from "react-icons/io5";
import visaCard from "../../Assets/visa-card.png"
import masterCard from "../../Assets/master-card.png"
import Image from 'next/image';

import BOCBank from '../../Assets/BOC-bank.png'
import ComBank from '../../Assets/Commercial-bank.png'
import DFCCBank from '../../Assets/DFCC-bank.jpg'
import HNBBank from '../../Assets/HNB-bank.jpg'
import NDBBank from '../../Assets/NDB Bank.jpg'
import NSBBank from '../../Assets/NSB-bank.png'
import peoplesBank from "../../Assets/People's-bank.png"
import sampathBank from '../../Assets/Sampath-bank.jpg'
import seylanBank from '../../Assets/Seylan-bank.png'



interface FormState {
    bankName: string;
    branch: string;
    cardNumber: string;
    cvv: string;
    date: string;
    month: string;
    cardType: string;
}

interface CardFormProps {
    handleClose: () => void;
}

const CardForm: React.FC<CardFormProps> = ({ handleClose }) => {

    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCVV] = useState('');
    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');

    const [formState, setFormState] = useState<FormState>({
        bankName: '',
        branch: '',
        cardNumber: '',
        cvv: '',
        date: '',
        month: '',
        cardType: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formState.cardNumber || !/^\d{16}$/.test(formState.cardNumber.toString())) {
            newErrors.cardNumber = 'Card number must be 16 digits';
        }
        if (!formState.cvv || !/^\d{3}$/.test(formState.cvv.toString())) {
            newErrors.cvv = 'CVV must be 3 digits';
        }
        if (!formState.date || !/^\d{2}$/.test(formState.date.toString())) {
            newErrors.date = 'Date must be 2 digits';
        }
        if (!formState.month || !/^\d{2}$/.test(formState.month.toString())) {
            newErrors.month = 'Month must be 2 digits';
        }
        if (!formState.date || !formState.month) {
            newErrors.expireDate = 'Expiration date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Form Submitted:', formState);
        } else {
            console.log('Validation Errors:', errors);
        }
    };

    const handleBankSelect = (bankName: string) => {
        setFormState((prevState) => ({ ...prevState, bankName }));
    };

    const handleCardTypeSelect = (cardType: string) => {
        setFormState((prevState) => ({ ...prevState, cardType }));
    };

    return (
        <div className='relative'>
            <form className='w-full p-5 border-[1px] rounded-lg border-gray-400 bg-white' onSubmit={handleSubmit}>
                <p className='text-xl font-semibold pt-5 pb-10 text-center'>Add New Card</p>

                <fieldset className='flex flex-col gap-3 transition-all ease-in-out duration-300'>

                    <div>
                        <p>Who is your card peovider?</p>
                        <div className='grid grid-cols-5 gap-2 mt-2'>
                            <div
                                onClick={() => handleBankSelect('BOC Bank')}
                                className={`relative h-[100px] w-full rounded-md px-2 border-[1px] border-green-900 cursor-pointer hover:scale-110 transition ease-in-out duration-300 ${formState.bankName === 'BOC Bank' ? 'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-green-900 after:opacity-70' : ''} overflow-hidden`}
                            >
                                <Image
                                    src={BOCBank}
                                    alt="BOC bank"
                                    className="h-full w-full object-contain rounded-md"
                                />
                            </div>

                            <div
                                onClick={() => handleBankSelect('Commercial Bank')}
                                className={`relative h-[100px] w-full rounded-md px-2 border-[1px] border-green-900 cursor-pointer hover:scale-110 transition ease-in-out duration-300 ${formState.bankName === 'Commercial Bank' ? 'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-green-900 after:opacity-70' : ''} overflow-hidden`}
                            >
                                <Image
                                    src={ComBank}
                                    alt="Commercial bank"
                                    className="h-full w-full object-contain rounded-md"
                                />
                            </div>

                            <div
                                onClick={() => handleBankSelect('DFCC Bank')}
                                className={`relative h-[100px] w-full rounded-md px-2 border-[1px] border-green-900 cursor-pointer hover:scale-110 transition ease-in-out duration-300 ${formState.bankName === 'DFCC Bank' ? 'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-green-900 after:opacity-70' : ''} overflow-hidden`}
                            >
                                <Image
                                    src={DFCCBank}
                                    alt="DFCC bank"
                                    className="h-full w-full object-contain rounded-md"
                                />
                            </div>
                            
                            <div
                                onClick={() => handleBankSelect('HNB Bank')}
                                className={`relative h-[100px] w-full rounded-md px-2 border-[1px] border-green-900 cursor-pointer hover:scale-110 transition ease-in-out duration-300 ${formState.bankName === 'HNB Bank' ? 'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-green-900 after:opacity-70' : ''} overflow-hidden`}
                            >
                                <Image
                                    src={HNBBank}
                                    alt="HNB bank"
                                    className="h-full w-full object-contain rounded-md"
                                />
                            </div>

                            <div
                                onClick={() => handleBankSelect('NDB Bank')}
                                className={`relative h-[100px] w-full rounded-md px-2 border-[1px] border-green-900 cursor-pointer hover:scale-110 transition ease-in-out duration-300 ${formState.bankName === 'NDB Bank' ? 'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-green-900 after:opacity-70' : ''} overflow-hidden`}
                            >
                                <Image
                                    src={NDBBank}
                                    alt="NDB bank"
                                    className="h-full w-full object-contain rounded-md"
                                />
                            </div>

                            <div
                                onClick={() => handleBankSelect('NSB Bank')}
                                className={`relative h-[100px] w-full rounded-md px-2 border-[1px] border-green-900 cursor-pointer hover:scale-110 transition ease-in-out duration-300 ${formState.bankName === 'NSB Bank' ? 'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-green-900 after:opacity-70' : ''} overflow-hidden`}
                            >
                                <Image
                                    src={NSBBank}
                                    alt="NSB bank"
                                    className="h-full w-full object-contain rounded-md"
                                />
                            </div>

                            <div
                                onClick={() => handleBankSelect('Peoples Bank')}
                                className={`relative h-[100px] w-full rounded-md px-2 border-[1px] border-green-900 cursor-pointer hover:scale-110 transition ease-in-out duration-300 ${formState.bankName === 'Peoples Bank' ? 'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-green-900 after:opacity-70' : ''} overflow-hidden`}
                            >
                                <Image
                                    src={peoplesBank}
                                    alt="Peoples bank"
                                    className="h-full w-full object-contain rounded-md"
                                />
                            </div>

                            <div
                                onClick={() => handleBankSelect('Sampath Bank')}
                                className={`relative h-[100px] w-full rounded-md px-2 border-[1px] border-green-900 cursor-pointer hover:scale-110 transition ease-in-out duration-300 ${formState.bankName === 'Sampath Bank' ? 'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-green-900 after:opacity-70' : ''} overflow-hidden`}
                            >
                                <Image
                                    src={sampathBank}
                                    alt="Sampath bank"
                                    className="h-full w-full object-contain rounded-md"
                                />
                            </div>

                            <div
                                onClick={() => handleBankSelect('Seylan Bank')}
                                className={`relative h-[100px] w-full rounded-md px-2 border-[1px] border-green-900 cursor-pointer hover:scale-110 transition ease-in-out duration-300 ${formState.bankName === 'Seylan Bank' ? 'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-green-900 after:opacity-70' : ''} overflow-hidden`}
                            >
                                <Image
                                    src={seylanBank}
                                    alt="Seylan bank"
                                    className="h-full w-full object-contain rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-2 mt-6'>

                        <div className='w-3/5 flex gap-2'>
                            <div className='w-2/3'>
                                <input
                                    type="number"
                                    placeholder="Card Number"
                                    value={formState.cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    className={`border-[1px] ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-sm py-1 px-3 focus:outline-green-900 w-full`}
                                />
                                {errors.cardNumber && <p style={{ color: 'red' }}>{errors.cardNumber}</p>}
                            </div>

                            <div className='w-1/3'>
                                <input
                                    type="number"
                                    placeholder="CVV"
                                    value={formState.cvv}
                                    onChange={(e) => setCVV(e.target.value)}
                                    className={`border-[1px] ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-sm py-1 px-3 focus:outline-green-900 w-full`}
                                />
                                {errors.cvv && <p style={{ color: 'red' }}>{errors.cvv}</p>}
                            </div>
                        </div>
                        <div className='w-2/5'>
                            <div className='flex gap-1 items-center'>
                                <input
                                    type="number"
                                    placeholder="DD"
                                    value={formState.date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className={`border-[1px] ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-sm py-1 px-3 focus:outline-green-900 w-full`}
                                />
                                <p>/</p>
                                <input
                                    type="number"
                                    placeholder="MM"
                                    value={formState.month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    className={`border-[1px] ${errors.month ? 'border-red-500' : 'border-gray-300'} rounded-sm py-1 px-3 focus:outline-green-900 w-full`}
                                />
                            </div>
                            {errors.expireDate && <p style={{ color: 'red' }}>{errors.expireDate}</p>}
                        </div>
                    </div>

                    <div className='mt-5'>
                        <p>This Card is a</p>
                        <div className='flex gap-5 mt-2'>
                            <Image src={visaCard} alt="Visa Card" onClick={() => handleCardTypeSelect('Visa Card')} className={`w-[150px] h-[100px] object-cover border-[1px] border-green-900 rounded-md hover:scale-105 ${formState.cardType === 'Visa Card' ? 'bg-green-500 border-green-500': ''}      transition ease-in-out duration-300 cursor-pointer`}></Image>
                            <Image src={masterCard} alt="Master Card" onClick={() => handleCardTypeSelect('Master Card')} className={`w-[150px] h-[100px] object-cover border-[1px] border-green-900 rounded-md hover:scale-105 ${formState.cardType === 'Master Card' ? 'bg-green-500 border-green-500': ''}      transition ease-in-out duration-300 cursor-pointer`}></Image>
                        </div>
                    </div>
                </fieldset>

                <button
                    className='w-full rounded-sm py-2 cursor-pointer bg-green-900 text-white hover:bg-green-800 transition ease-in-out duration-300 mt-5'
                    type="submit"
                >
                    Save Card
                </button>
            </form>
            <button className="absolute top-[8px] right-[8px] text-xl hover:bg-red-800 hover:text-white rounded-full transition ease-in-out duration-300 p-[1px]" onClick={handleClose}>
                <IoClose />
            </button>
        </div>
    );
};

export default CardForm;
