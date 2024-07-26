import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import chinese from '../assets/images/chinese.jpg';
import axiosDannyInstance from '../app/utils/dannysaxios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedOrderDetails = Cookies.get('selectedOrderDetails');
        if (storedOrderDetails) {
            setOrderDetails(JSON.parse(storedOrderDetails));
        }
    }, []);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!cardNumber || !expiryDate || !cvv) {
            setError('Please fill out all fields.');
            return;
        }

        setLoading(true);
        setError('');

        const paymentPayload = {
            order_id: orderDetails.orderID,
            amount: orderDetails.overallTotal.toFixed(2),
            payment_method: paymentMethod,
            status: 'Pending'
        };

        try {
            const response = await axiosDannyInstance.post('https://daavispecial-backend.onrender.com/api/payments/', paymentPayload);
            if (response.status === 201) {
                toast.success("Payment was successful", {
                    position: "top-center",
                    className: "toast-message",
                });
                navigate('/thank-you');
            }
        } catch (err) {
            setError('Payment failed. Please try again.');
            toast.error("Payment failed. Please try again.", {
                position: "bottom-left",
                className: "toast-message",
            });
        } finally {
            setLoading(false);
        }
    };

    if (!orderDetails) {
        return (
            <Layout>
                <main className="min-h-screen pt-24 bg-gray-50">
                    <div className="container px-4 mx-auto">
                        <section className="px-2 py-12 mb-12 bg-yellow-900 bg-center bg-cover rounded-lg shadow-lg" style={{ backgroundImage: `url(${chinese})` }}>
                            <div className="text-center">
                                <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">Payment</h1>
                            </div>
                        </section>
                        <p className="text-center text-gray-600">No order details found. Please go back to the orders page and select an order to proceed with payment.</p>
                    </div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>
            <main className="min-h-screen pt-24 bg-gray-50 max-w-[screen] overflow-scroll">
                <div className="container px-4 mx-auto">
                    <section className="px-2 py-12 mb-12 bg-yellow-900 bg-center bg-cover rounded-lg shadow-lg" style={{ backgroundImage: `url(${chinese})` }}>
                        <div className="text-center">
                            <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">Payment</h1>
                        </div>
                    </section>
                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <h2 className="mb-4 text-2xl font-bold text-gray-800">Order Summary</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Item</th>
                                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Quantity</th>
                                        <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orderDetails.summary.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{item.name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">{item.quantity}</td>
                                            <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">${item.price.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="2" className="px-4 py-2 text-lg font-semibold text-right text-gray-800">Overall Total:</td>
                                        <td className="px-4 py-2 text-lg font-semibold text-gray-800">${orderDetails.overallTotal.toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <form onSubmit={handlePayment} className="p-6 mt-8 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <h2 className="mb-4 text-2xl font-bold text-gray-800">Payment Details</h2>
                        {error && <p className="mb-4 text-red-600">{error}</p>}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="relative">
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="1234 5678 9012 3456"
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="123"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                className="w-full px-6 py-3 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg shadow-md sm:w-auto hover:bg-blue-700"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Pay Now'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </Layout>
    );
};

export default Payment;
