// src/pages/Order.js
import React, { useState } from 'react';
import '../assets/styles/Order.css';

const Order = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        orderDetails: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission, e.g., send data to a backend server
        console.log('Order submitted:', formData);
    };

    return (
        <div className="order-container">
            <h1>Place Your Order</h1>
            <form onSubmit={handleSubmit} className="order-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="orderDetails">Order Details:</label>
                    <textarea
                        id="orderDetails"
                        name="orderDetails"
                        value={formData.orderDetails}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit Order</button>
            </form>
        </div>
    );
};

export default Order;
