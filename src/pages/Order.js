// src/pages/Order.js
import React, { useState } from 'react';
import '../assets/styles/Order.css';
import Layout from '../components/Layout';

const Order = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        orderDetails: '',
    });

    const [staffLogin, setStaffLogin] = useState({
        username: '',
        password: '',
    });

    const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false);
    const [orders, setOrders] = useState([
        // Example orders. Replace with actual data fetching logic.
        { id: 1, name: 'John Doe', details: '2 x Fufu and Light Soup' },
        { id: 2, name: 'Jane Smith', details: '1 x Omotuo Special' },
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setStaffLogin({
            ...staffLogin,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission, e.g., send data to a backend server
        console.log('Order submitted:', formData);
    };

    const handleStaffLogin = (e) => {
        e.preventDefault();
        // Here you can handle staff login, e.g., authenticate with a backend server
        // For demo purposes, we assume any username and password is correct.
        if (staffLogin.username && staffLogin.password) {
            setIsStaffLoggedIn(true);
        }
    };

    return (
        <Layout>
        <div className="order-container pt-[100px]">
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

            <h2>Staff Login</h2>
            {!isStaffLoggedIn ? (
                <form onSubmit={handleStaffLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={staffLogin.username}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={staffLogin.password}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div className="orders-list">
                    <h2>Customer Orders</h2>
                    <ul>
                        {orders.map((order) => (
                            <li key={order.id}>
                                <p><strong>Name:</strong> {order.name}</p>
                                <p><strong>Order:</strong> {order.details}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        </Layout>
    );
};

export default Order;
