import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const ThankYou = () => {
    return (
        <Layout>
            <main className="pt-24 min-h-screen bg-gray-50">
                <div className="container px-4 mx-auto text-center">
                    <section className="px-2 mb-12 bg-yellow-900 bg-center bg-cover py-12 rounded-lg shadow-lg">
                        <div className="text-center">
                            <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">Thank You!</h1>
                            <p className="text-lg text-white">Your order has been placed successfully.</p>
                        </div>
                    </section>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                        <p className="text-gray-700 mb-4">We have received your payment. You can view your order details and track the shipment from your orders page.</p>
                        <div className="mb-8">
                            <p className="text-lg font-medium text-gray-800">Order Number: <span className="font-semibold">123456789</span></p>
                            <p className="text-lg font-medium text-gray-800">Total Amount: <span className="font-semibold"></span></p>
                        </div>
                        <Link to="/orders" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                            View Orders
                        </Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default ThankYou;
