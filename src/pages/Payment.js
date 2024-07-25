import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import chinese from '../assets/images/chinese.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosDannyInstance from '../app/utils/dannysaxios';

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
            await axiosDannyInstance.post('https://daavispecial-backend.onrender.com/api/payments/', paymentPayload);
            navigate('/thank-you');
        } catch (err) {
            setError('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!orderDetails) {
        return (
            <Layout>
                <main className="pt-24 min-h-screen bg-gray-50">
                    <div className="container px-4 mx-auto">
                        <section className="px-2 mb-12 bg-yellow-900 bg-center bg-cover py-12 rounded-lg shadow-lg" style={{ backgroundImage: `url(${chinese})` }}>
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
            <main className="pt-24 min-h-screen bg-gray-50">
                <div className="container px-4 mx-auto">
                    <section className="px-2 mb-12 bg-yellow-900 bg-center bg-cover py-12 rounded-lg shadow-lg" style={{ backgroundImage: `url(${chinese})` }}>
                        <div className="text-center">
                            <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">Payment</h1>
                        </div>
                    </section>
                    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                        <h2 className="mb-4 text-2xl font-bold text-gray-800">Order Summary</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orderDetails.summary.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="2" className="px-6 py-3 text-right text-lg font-semibold text-gray-800">Overall Total:</td>
                                        <td className="px-6 py-3 text-lg font-semibold text-gray-800">${orderDetails.overallTotal.toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <form onSubmit={handlePayment} className="mt-8 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Details</h2>
                        {error && <p className="text-red-600 mb-4">{error}</p>}
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                            <div className="relative">
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="123"
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
                                <select
                                    id="paymentMethod"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="PayPal">PayPal</option>
                                    {/* Add more payment options if needed */}
                                </select>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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


// import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import Layout from '../components/Layout';
// import chinese from '../assets/images/chinese.jpg';
// import axios from 'axios';

// const Payment = () => {
//     const [orderDetails, setOrderDetails] = useState(null);
//     const [paymentMethod, setPaymentMethod] = useState('Credit Card');
//     const [cardNumber, setCardNumber] = useState('');
//     const [expiryDate, setExpiryDate] = useState('');
//     const [cvv, setCvv] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const storedOrderDetails = Cookies.get('selectedOrderDetails');
//         if (storedOrderDetails) {
//             setOrderDetails(JSON.parse(storedOrderDetails));
//         }
//     }, []);

//     const handlePayment = async (e) => {
//         e.preventDefault();

//         if (!cardNumber || !expiryDate || !cvv) {
//             setError('Please fill out all fields.');
//             return;
//         }

//         setLoading(true);
//         setError('');

//         const paymentPayload = {
//             id: 'unique-payment-id', // Ideally, generate or retrieve this ID dynamically
//             order_id: orderDetails.orderID,
//             amount: orderDetails.overallTotal.toFixed(2),
//             payment_method: paymentMethod,
//             status: 'Pending',
//             created_at: new Date().toISOString()
//         };

//         try {
//             await axios.post('https://daavispecial-backend.onrender.com/api/payments/', paymentPayload);
//             // Handle success, e.g., redirect to a confirmation page
//         } catch (err) {
//             setError('Payment failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!orderDetails) {
//         return (
//             <Layout>
//                 <main className="pt-24 min-h-screen bg-gray-50">
//                     <div className="container px-4 mx-auto">
//                         <section className="px-2 mb-12 bg-yellow-900 bg-center bg-cover py-12 rounded-lg shadow-lg" style={{ backgroundImage: `url(${chinese})` }}>
//                             <div className="text-center">
//                                 <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">Payment</h1>
//                             </div>
//                         </section>
//                         <p className="text-center text-gray-600">No order details found. Please go back to the orders page and select an order to proceed with payment.</p>
//                     </div>
//                 </main>
//             </Layout>
//         );
//     }

//     return (
//         <Layout>
//             <main className="pt-24 min-h-screen bg-gray-50">
//                 <div className="container px-4 mx-auto">
//                     <section className="px-2 mb-12 bg-yellow-900 bg-center bg-cover py-12 rounded-lg shadow-lg" style={{ backgroundImage: `url(${chinese})` }}>
//                         <div className="text-center">
//                             <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">Payment</h1>
//                         </div>
//                     </section>
//                     <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
//                         <h2 className="mb-4 text-2xl font-bold text-gray-800">Order Summary</h2>
//                         <div className="overflow-x-auto">
//                             <table className="min-w-full divide-y divide-gray-200">
//                                 <thead className="bg-gray-50">
//                                     <tr>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                     {orderDetails.summary.map((item, index) => (
//                                         <tr key={index}>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                                 <tfoot>
//                                     <tr>
//                                         <td colSpan="2" className="px-6 py-3 text-right text-lg font-semibold text-gray-800">Overall Total:</td>
//                                         <td className="px-6 py-3 text-lg font-semibold text-gray-800">${orderDetails.overallTotal.toFixed(2)}</td>
//                                     </tr>
//                                 </tfoot>
//                             </table>
//                         </div>
//                     </div>
//                     <form onSubmit={handlePayment} className="mt-8 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
//                         <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Details</h2>
//                         {error && <p className="text-red-600 mb-4">{error}</p>}
//                         <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
//                             <div className="relative">
//                                 <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
//                                 <input
//                                     type="text"
//                                     id="cardNumber"
//                                     value={cardNumber}
//                                     onChange={(e) => setCardNumber(e.target.value)}
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                     placeholder="1234 5678 9012 3456"
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
//                                 <input
//                                     type="text"
//                                     id="expiryDate"
//                                     value={expiryDate}
//                                     onChange={(e) => setExpiryDate(e.target.value)}
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                     placeholder="MM/YY"
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
//                                 <input
//                                     type="text"
//                                     id="cvv"
//                                     value={cvv}
//                                     onChange={(e) => setCvv(e.target.value)}
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                     placeholder="123"
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
//                                 <select
//                                     id="paymentMethod"
//                                     value={paymentMethod}
//                                     onChange={(e) => setPaymentMethod(e.target.value)}
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 >
//                                     <option value="Credit Card">Credit Card</option>
//                                     <option value="PayPal">PayPal</option>
//                                     {/* Add more payment options if needed */}
//                                 </select>
//                             </div>
//                         </div>
//                         <div className="mt-6">
//                             <button
//                                 type="submit"
//                                 className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 disabled={loading}
//                             >
//                                 {loading ? 'Processing...' : 'Pay Now'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </main>
//         </Layout>
//     );
// };

// export default Payment;

