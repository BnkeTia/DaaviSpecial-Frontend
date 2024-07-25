import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import chinese from "../assets/images/chinese.jpg";
import italian from "../assets/images/italian.jpg";


const PaymentPage = () => {
    const location = useLocation();
    const { orderID, total } = location.state || {};

    // Ensure total is a number with a default value of 0
    const formattedTotal = (total && !isNaN(total)) ? total.toFixed(2) : '0.00';

    return (
        <Layout>
            <main className="pt-24 min-h-screen bg-gray-50">
                <div className="container px-4 mx-auto">
                    <section className="px-2 mb-12 bg-yellow-900 bg-center bg-cover py-12 rounded-lg shadow-lg" style={{ backgroundImage: `url(${italian})` }}>
                        <div className="text-center">
                            <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">Payment</h1>
                        </div>
                    </section>
                    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order #{orderID}</h2>
                        <p className="text-lg font-semibold text-gray-800 mb-4">Total Amount: ${formattedTotal}</p>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardName">
                                    Cardholder Name
                                </label>
                                <input
                                    type="text"
                                    id="cardName"
                                    name="cardName"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Name on Card"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Card Number"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="CVV"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default PaymentPage;


// import React, { useState } from 'react';
// import axios from 'axios';
// import Layout from '../components/Layout';
// import Cookies from 'js-cookie';

// const PaymentPage = () => {
//     const [orderId, setOrderId] = useState('');
//     const [amount, setAmount] = useState('');
//     const [paymentMethod, setPaymentMethod] = useState('Credit Card');
//     const [status, setStatus] = useState('Pending');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleOrderIdChange = (e) => setOrderId(e.target.value);
//     const handleAmountChange = (e) => setAmount(e.target.value);
//     const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!orderId || !amount || !paymentMethod) {
//             setError('All fields are required.');
//             return;
//         }

//         const payload = {
//             order_id: orderId,
//             amount: amount,
//             payment_method: paymentMethod,
//             status: status
//         };

//         try {
//             const response = await axios.post('https://daavispecial-backend.onrender.com/api/payments/', payload);
//             setSuccess('Payment successful!');
//             setError('');
//         } catch (error) {
//             setError('Payment failed. Please try again.');
//             setSuccess('');
//         }
//     };

//     return (
//         <Layout>
//             <main className="pt-24 min-h-screen bg-gray-50">
//                 <div className="container px-4 mx-auto">
//                     <section className="px-2 mb-12 bg-blue-900 bg-center bg-cover py-12 rounded-lg shadow-lg">
//                         <div className="text-center">
//                             <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">Make a Payment</h1>
//                         </div>
//                     </section>
//                     <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
//                         {error && <p className="mb-4 text-red-600">{error}</p>}
//                         {success && <p className="mb-4 text-green-600">{success}</p>}
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-4">
//                                 <label htmlFor="orderId" className="block text-gray-700 font-bold mb-2">Order ID</label>
//                                 <input
//                                     type="text"
//                                     id="orderId"
//                                     value={orderId}
//                                     onChange={handleOrderIdChange}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">Amount</label>
//                                 <input
//                                     type="text"
//                                     id="amount"
//                                     value={amount}
//                                     onChange={handleAmountChange}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="paymentMethod" className="block text-gray-700 font-bold mb-2">Payment Method</label>
//                                 <select
//                                     id="paymentMethod"
//                                     value={paymentMethod}
//                                     onChange={handlePaymentMethodChange}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                                     required
//                                 >
//                                     <option value="Credit Card">Credit Card</option>
//                                     <option value="PayPal">PayPal</option>
//                                     <option value="Bank Transfer">Bank Transfer</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <button
//                                     type="submit"
//                                     className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
//                                 >
//                                     Make Payment
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </main>
//         </Layout>
//     );
// };

// export default PaymentPage;
