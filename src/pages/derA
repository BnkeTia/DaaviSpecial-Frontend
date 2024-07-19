import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    const [orders, setOrders] = useState([]);
    const [submissionStatus, setSubmissionStatus] = useState('');

    useEffect(() => {
        if (isStaffLoggedIn) {
            fetchOrders();
        }
    }, [isStaffLoggedIn]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('https://daavispecial-backend.onrender.com/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://daavispecial-backend.onrender.com/api/orders', formData);
            console.log('Order submitted:', formData);
            setSubmissionStatus('Order submitted successfully, we will contact you soon');
        } catch (error) {
            console.error('Error submitting order:', error);
            setSubmissionStatus('Failed to submit order, please try again later.');
        }
    };

    const handleStaffLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://daavispecial-backend.onrender.com/api/staff/login', staffLogin);
            if (response.data.success) {
                setIsStaffLoggedIn(true);
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during staff login:', error);
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

                {submissionStatus && <p className="submission-status">{submissionStatus}</p>}

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
