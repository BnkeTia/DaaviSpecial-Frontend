// src/pages/Menu.js
import React from 'react';
import '../assets/styles/Menu.css';

const menuItems = [
    {
        id: 1,
        name: 'Fufu and Light Soup',
        description: 'Classic Ghanaian dish with Fufu, Lightsoup, Fish,chicken, Meat or Pork.',
        price: 'GHS 30',
        image: '../assets/images/fufu.jpg',
    },
    {
        id: 2,
        name: 'Omotuo special',
        description: 'Rice balls, soup(groundnut or Palmnut), Fish, Snail, Chicken, or Meat.',
        price: 'GHS 25',
        image: '../assets/images/omotuo.jpg',
    },
    {
        id: 3,
        name: 'Banku and Tilapia',
        description: 'Banku, onions, shito, red pepper, and grilled tilapia.',
        price: 'GHS 40',
        image: '../assets/images/bankutl.jpg',
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
