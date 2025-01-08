import './AddressCart.css';
import sampleData from '../../Data/AddressData';

import { useEffect, useState } from 'react';

import { TiHome } from "react-icons/ti";
import { MdWork } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

function AddressCardItem({ data, isSelected, onClick }) {
    let icon = '';
    let name = '';
    if (data.type === 'home') {
        icon = <TiHome />;
        name = 'Home';
    } else if (data.type === 'work-place') {
        icon = <MdWork />;
        name = 'Work Place';
    } else {
        icon = <FaLocationDot />;
        name = 'Undefined Delivery Address';
    }

    const formattedAddress = [
        data.no,
        data.street,
        data.town,
        data.division,
    ].filter(Boolean).join(', ');

    return (
        <div
            className={`address-item select ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <div className='address-name'>
                <i>{icon}</i>
                <h3>{name}</h3>
            </div>
            <div className="address-data">
                <p><strong>Address:</strong> {formattedAddress}</p>
                <p><strong>District:</strong> {data.district}</p>
                <p><strong>Contact No:</strong> +94 {data.contact}</p>
            </div>
        </div>
    );
}

function AddressCard() {
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        const defaultIndex = sampleData.findIndex((item) => item.type === 'home');
        if (defaultIndex !== -1) {
            setSelectedIndex(defaultIndex);
        }
    }, []);

    const handleClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <div className='address-card-container'>
            <h2>Saved Delivery Addresses</h2>
            <div className='address-card'>
                {sampleData.map((item, index) => (
                    <AddressCardItem
                        key={index}
                        data={item}
                        isSelected={index === selectedIndex}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default AddressCard;
