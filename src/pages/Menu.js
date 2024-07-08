// src/pages/Menu.js
import React from 'react';
import '../assets/styles/Menu.css';
import fufuImage from '../assets/images/fufu.jpg';
import omotuoImage from '../assets/images/omotuo.jpg';
import bankuImage from '../assets/images/bankutil.jpg';

const menuItems = [
    {
        id: 1,
        name: 'Fufu and Light Soup',
        description: 'Classic Ghanaian dish with Fufu, Lightsoup, Fish, Chicken, Meat, or Pork.',
        price: 'GHS 30',
        image: fufuImage,
    },
    {
        id: 2,
        name: 'Omotuo Special',
        description: 'Rice balls, soup (groundnut or palmnut), Fish, Snail, Chicken, or Meat.',
        price: 'GHS 25',
        image: omotuoImage,
    },
    {
        id: 3,
        name: 'Banku and Tilapia',
        description: 'Banku, onions, shito, red pepper, and grilled tilapia.',
        price: 'GHS 40',
        image: bankuImage,
    },
    // Add more menu items as needed
];

const Menu = () => {
    return (
        <div className="menu-container">
            <h1>Our Menu</h1>
            <div className="menu-items">
                {menuItems.map((item) => (
                    <div key={item.id} className="menu-item">
                        <img src={item.image} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p className="menu-item-price">{item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
