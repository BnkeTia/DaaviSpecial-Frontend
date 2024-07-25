import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import chinese from "../assets/images/chinese.jpg";
import italian from "../assets/images/italian.jpg";

const Payment = () => {
    const location = useLocation();
    const { orderID, total } = location.state || {};

    // Ensure total is a number with a default value of 0
    const formattedTotal = (total && !isNaN(total)) ? total.toFixed(2) : '0.00';

    return (
        <Layout>
            <main className="pt-24 min-h-screen bg-gray-100">
                <div className="container px-4 mx-auto">
                    {/* Hero Section */}
                    <section className="px-2 mb-12 bg-gradient-to-r from-blue-500 to-purple-600 bg-center bg-cover py-20 rounded-lg shadow-lg" style={{ backgroundImage: `url(${italian})` }}>
                        <div className="text-center text-white">
                            <h1 className="text-4xl font-bold md:text-5xl">Payment Details</h1>
                            <p className="mt-4 text-lg md:text-xl text-red-900 font-bold">Complete your purchase with a secure and easy payment process.</p>
                        </div>
                    </section>

                    {/* Order Summary Section */}
                    <section className="bg-white p-8 rounded-lg shadow-lg mb-12 border border-gray-200">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                        <div className="mb-6 flex items-center justify-between border-b border-gray-300 pb-4">
                            <div>
                                <h3 className="text-lg font-medium text-gray-700">Order ID</h3>
                                <p className="text-xl font-bold text-gray-800">#{orderID}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-700">Total Amount</h3>
                                <p className="text-xl font-bold text-green-600">${formattedTotal}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-6">Review your order details before proceeding to payment. Ensure all information is correct to avoid any issues with your transaction.</p>
                    </section>

                    {/* Payment Form Section */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Payment Details</h2>
                        <form>
                            {/* Cardholder Name */}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="cardName">
                                    Cardholder Name
                                </label>
                                <input
                                    type="text"
                                    id="cardName"
                                    name="cardName"
                                    className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Name on Card"
                                />
                            </div>

                            {/* Card Number */}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="cardNumber">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Card Number"
                                />
                            </div>

                            {/* Expiry Date */}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="expiryDate">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="MM/YY"
                                />
                            </div>

                            {/* CVV */}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="cvv">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="CVV"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    Pay Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default Payment;
