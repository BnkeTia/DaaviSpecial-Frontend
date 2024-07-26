import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, getMenus, deleteOrder, setSelectedOrderDetails } from '../features/daavi/myDaaviSlice';
import Layout from '../components/Layout';
import chinese from "../assets/images/chinese.jpg";
import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const userId = Cookies.get("username");
    const dispatch = useDispatch();
    const { myOrders, status, menus } = useSelector((store) => store.mydaavi);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getMenus());
    }, [dispatch, userId]);

    const getMenuDetails = (menuId) => {
        return menus.find(menu => menu.id === menuId) || {};
    };

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
    };

    const calculateOverallTotal = () => {
        return myOrders.reduce((total, order) => total + calculateTotal(order.items), 0);
    };

    const getSummary = () => {
        const summary = myOrders.flatMap(order => order.items.map(item => {
            const menuDetails = getMenuDetails(item.menu);
            return {
                name: menuDetails.name || 'Unknown Item',
                quantity: item.quantity,
                price: parseFloat(item.price)
            };
        }));
        return summary;
    };

    const handleDeleteClick = (orderId) => {
        setSelectedOrder(orderId);
        setShowModal(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedOrder) {
            dispatch(deleteOrder(selectedOrder));
            dispatch(getOrders());
        }
        setShowModal(false);
    };

    const handleDeleteCancel = () => {
        setSelectedOrder(null);
        setShowModal(false);
    };

    const handleProceedToPayment = (order) => {
        const orderDetails = {
            orderID: order.id,
            total: calculateTotal(order.items),
            summary: getSummary(),
            overallTotal: calculateOverallTotal()
        };
        dispatch(setSelectedOrderDetails(orderDetails));
        Cookies.set('selectedOrderDetails', JSON.stringify(orderDetails)); 
        navigate("/payment");
    };

    return (
        <Layout>
            <main className="pt-24 min-h-screen bg-gray-50 max-w-[100%] overflow-scroll">
                <div className="container px-4 mx-auto">
                    <section className="px-2 mb-12 bg-yellow-900 bg-center bg-cover py-12 rounded-lg shadow-lg" style={{ backgroundImage: `url(${chinese})` }}>
                        <div className="text-center">
                            <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">Your Orders</h1>
                        </div>
                    </section>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {status === 'loading' && <p className="text-center text-gray-600">Loading...</p>}
                        {status === 'failed' && <p className="text-center text-red-600">Failed to load orders.</p>}
                        {myOrders.map((order) => (
                            <div key={order.id} className="relative p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-gray-200">
                                <button
                                    onClick={() => handleDeleteClick(order.id)}
                                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                                    title="Delete Order"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                                <h2 className="mb-2 text-lg font-bold text-gray-800">Order #{order.id}</h2>
                                <p className="text-gray-600">Status: <span className={`font-bold ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span></p>
                                <h3 className="mt-4 text-lg font-semibold text-gray-800">Items:</h3>
                                <ul className="space-y-4">
                                    {order.items.map((item) => {
                                        const menuDetails = getMenuDetails(item.menu);
                                        return (
                                            <li key={item.id} className="flex items-center space-x-4 border-b border-gray-200 pb-4">
                                                {menuDetails.image_url && <img src={menuDetails.image_url} alt={menuDetails.name} className="w-16 h-16 rounded-lg object-cover" />}
                                                <div className="flex-1">
                                                    <p className="text-gray-800 font-medium">{menuDetails.name || 'Unknown Item'}</p>
                                                    <p className="text-gray-600">{item.quantity} x ${parseFloat(item.price).toFixed(2)}</p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <p className="mt-4 text-lg font-semibold text-gray-800">Total: ${calculateTotal(order.items).toFixed(2)}</p>
                                <div className="mt-6">
                                    <button
                                        onClick={() => handleProceedToPayment(order)}
                                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                                    >
                                        Proceed to Payment
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-full max-sm:hiddens ">
                        <h2 className="mb-4 text-2xl font-bold text-gray-800">Summary</h2>
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
                                    {getSummary().map((item, index) => (
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
                                        <td className="px-6 py-3 text-lg font-semibold text-gray-800">${calculateOverallTotal().toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h2 className="mb-4 text-lg font-bold text-gray-800">Confirm Delete</h2>
                            <p className="mb-6 text-gray-600">Are you sure you want to delete this order?</p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleDeleteCancel}
                                    className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default MyOrders;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getOrders, getMenus, deleteOrder } from '../features/daavi/myDaaviSlice';
// import Layout from '../components/Layout';
// import chinese from "../assets/images/chinese.jpg";
// import Cookies from "js-cookie";
// import { Link } from 'react-router-dom';

// const MyOrders = () => {
//     const userId = Cookies.get("username");
//     const dispatch = useDispatch();
//     const { myOrders, status, menus } = useSelector((store) => store.mydaavi);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         dispatch(getOrders());
//         dispatch(getMenus());
//     }, [dispatch, userId]);

//     const getMenuDetails = (menuId) => {
//         return menus.find(menu => menu.id === menuId) || {};
//     };

//     const calculateTotal = (items) => {
//         return items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
//     };

//     const calculateOverallTotal = () => {
//         return myOrders.reduce((total, order) => total + calculateTotal(order.items), 0);
//     };

//     const getSummary = () => {
//         const summary = myOrders.flatMap(order => order.items.map(item => {
//             const menuDetails = getMenuDetails(item.menu);
//             return {
//                 name: menuDetails.name || 'Unknown Item',
//                 quantity: item.quantity,
//                 price: parseFloat(item.price)
//             };
//         }));
//         return summary;
//     };

//     const handleDeleteClick = (orderId) => {
//         setSelectedOrder(orderId);
//         setShowModal(true);
//     };

//     const handleDeleteConfirm = () => {
//         if (selectedOrder) {
//             dispatch(deleteOrder(selectedOrder));
//             dispatch(getOrders());
//         }
//         setShowModal(false);
//     };

//     const handleDeleteCancel = () => {
//         setSelectedOrder(null);
//         setShowModal(false);
//     };

//     const some = " ";
//     return (
//         <Layout>
//             <main className="pt-24 min-h-screen bg-gray-50">
//                 <div className="container px-4 mx-auto">
//                     <section className="px-2 mb-12 bg-yellow-900 bg-center bg-cover py-12 rounded-lg shadow-lg" style={{ backgroundImage: `url(${chinese})` }}>
//                         <div className="text-center">
//                             <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">Your Orders</h1>
//                         </div>
//                     </section>
//                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//                         {status === 'loading' && <p className="text-center text-gray-600">Loading...</p>}
//                         {status === 'failed' && <p className="text-center text-red-600">Failed to load orders.</p>}
//                         {myOrders.map((order) => (
//                             <div key={order.id} className="relative p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-gray-200">
//                                 <button
//                                     onClick={() => handleDeleteClick(order.id)}
//                                     className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
//                                     title="Delete Order"
//                                 >
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//                                 </button>
//                                 <h2 className="mb-2 text-lg font-bold text-gray-800">Order #{order.id}</h2>
//                                 <p className="text-gray-600">Status: <span className={`font-bold ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span></p>
//                                 <h3 className="mt-4 text-lg font-semibold text-gray-800">Items:</h3>
//                                 <ul className="space-y-4">
//                                     {order.items.map((item) => {
//                                         const menuDetails = getMenuDetails(item.menu);
//                                         return (
//                                             <li key={item.id} className="flex items-center space-x-4 border-b border-gray-200 pb-4">
//                                                 {menuDetails.image_url && <img src={menuDetails.image_url} alt={menuDetails.name} className="w-16 h-16 rounded-lg object-cover" />}
//                                                 <div className="flex-1">
//                                                     <p className="text-gray-800 font-medium">{menuDetails.name || 'Unknown Item'}</p>
//                                                     <p className="text-gray-600">{item.quantity} x ${parseFloat(item.price).toFixed(2)}</p>
//                                                 </div>
//                                             </li>
//                                         );
//                                     })}
//                                 </ul>
//                                 <p className="mt-4 text-lg font-semibold text-gray-800">Total: ${calculateTotal(order.items).toFixed(2)}</p>
//                                 <div className="mt-6">
//                                     <Link to={{
//                                         pathname: "/payment",
//                                         state: { orderID: order.id, total: calculateTotal(order.items),  summary: getSummary(),
//                                             overallTotal: calculateOverallTotal(), some: "value" }
//                                     }}>
//                                         <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
//                                             Proceed to Payment
//                                         </button>
//                                     </Link>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="mt-12 p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-full max-sm:hidden">
//                         <h2 className="mb-4 text-2xl font-bold text-gray-800">Summary</h2>
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
//                                     {getSummary().map((item, index) => (
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
//                                         <td className="px-6 py-3 text-lg font-semibold text-gray-800">${calculateOverallTotal().toFixed(2)}</td>
//                                     </tr>
//                                 </tfoot>
//                             </table>
//                         </div>
//                     </div>
//                     <div className="max-sm:flex hidden mt-12 bg-papayawhip-dark px-5 py-3">
//                         <span colSpan="2" className=" text-right text-lg font-semibold text-gray-800">Overall Total:</span>
//                         <span className=" text-lg font-semibold text-gray-800">${calculateOverallTotal().toFixed(2)}</span>
//                     </div>
//                 </div>
//                 {/* Modal for delete confirmation */}
//                 {showModal && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h3 className="text-lg font-bold">Confirm Delete</h3>
//                             <p className="mt-2">Are you sure you want to delete this order?</p>
//                             <div className="mt-4 flex justify-end space-x-4">
//                                 <button
//                                     onClick={handleDeleteConfirm}
//                                     className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                                 >
//                                     Confirm
//                                 </button>
//                                 <button
//                                     onClick={handleDeleteCancel}
//                                     className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </main>
//         </Layout>
//     );
// };

// export default MyOrders;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getOrders, getMenus, deleteOrder } from '../features/daavi/myDaaviSlice';
// import Layout from '../components/Layout';
// import chinese from "../assets/images/chinese.jpg";
// import Cookies from "js-cookie";
// import { Link } from 'react-router-dom';

// const MyOrders = () => {
//     const userId = Cookies.get("username");
//     const dispatch = useDispatch();
//     const { myOrders, status, menus } = useSelector((store) => store.mydaavi);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         dispatch(getOrders());
//         dispatch(getMenus());
//     }, [dispatch, userId]);

//     const getMenuDetails = (menuId) => {
//         return menus.find(menu => menu.id === menuId) || {};
//     };

//     const calculateTotal = (items) => {
//         return items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
//     };

//     const calculateOverallTotal = () => {
//         return myOrders.reduce((total, order) => total + calculateTotal(order.items), 0);
//     };

//     const getSummary = () => {
//         const summary = myOrders.flatMap(order => order.items.map(item => {
//             const menuDetails = getMenuDetails(item.menu);
//             return {
//                 name: menuDetails.name || 'Unknown Item',
//                 quantity: item.quantity,
//                 price: parseFloat(item.price)
//             };
//         }));
//         return summary;
//     };

//     const handleDeleteClick = (orderId) => {
//         setSelectedOrder(orderId);
//         setShowModal(true);
//     };

//     const handleDeleteConfirm = () => {
//         if (selectedOrder) {
//             dispatch(deleteOrder(selectedOrder));
//             dispatch(getOrders());
//         }
//         setShowModal(false);
//     };

//     const handleDeleteCancel = () => {
//         setSelectedOrder(null);
//         setShowModal(false);
//     };

//     return (
//         <Layout>
//             <main className="pt-24 min-h-screen bg-gray-50">
//                 <div className="container px-4 mx-auto">
//                     <section className="px-2 mb-12 bg-yellow-900 bg-center bg-cover py-12 rounded-lg shadow-lg" style={{ backgroundImage: `url(${chinese})` }}>
//                         <div className="text-center">
//                             <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">Your Orders</h1>
//                         </div>
//                     </section>
//                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//                         {status === 'loading' && <p className="text-center text-gray-600">Loading...</p>}
//                         {status === 'failed' && <p className="text-center text-red-600">Failed to load orders.</p>}
//                         {myOrders.map((order) => (
//                             <div key={order.id} className="relative p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-gray-200">
//                                 <button
//                                     onClick={() => handleDeleteClick(order.id)}
//                                     className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
//                                     title="Delete Order"
//                                 >
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//                                 </button>
//                                 <h2 className="mb-2 text-lg font-bold text-gray-800">Order #{order.id}</h2>
//                                 <p className="text-gray-600">Status: <span className={`font-bold ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span></p>
//                                 <h3 className="mt-4 text-lg font-semibold text-gray-800">Items:</h3>
//                                 <ul className="space-y-4">
//                                     {order.items.map((item) => {
//                                         const menuDetails = getMenuDetails(item.menu);
//                                         return (
//                                             <li key={item.id} className="flex items-center space-x-4 border-b border-gray-200 pb-4">
//                                                 {menuDetails.image_url && <img src={menuDetails.image_url} alt={menuDetails.name} className="w-16 h-16 rounded-lg object-cover" />}
//                                                 <div className="flex-1">
//                                                     <p className="text-gray-800 font-medium">{menuDetails.name || 'Unknown Item'}</p>
//                                                     <p className="text-gray-600">{item.quantity} x ${parseFloat(item.price).toFixed(2)}</p>
//                                                 </div>
//                                             </li>
//                                         );
//                                     })}
//                                 </ul>
//                                 <p className="mt-4 text-lg font-semibold text-gray-800">Total: ${calculateTotal(order.items).toFixed(2)}</p>
//                                 <div className="mt-6">
//                                     <Link to={{
//                                         pathname: "/payment",
//                                         state: { orderID: order.id, total: calculateTotal(order.items) }
//                                     }}>
//                                         <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
//                                             Proceed to Payment
//                                         </button>
//                                     </Link>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="mt-12 p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-full max-sm:hidden">
//                         <h2 className="mb-4 text-2xl font-bold text-gray-800">Summary</h2>
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
//                                     {getSummary().map((item, index) => (
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
//                                         <td className="px-6 py-3 text-lg font-semibold text-gray-800">${calculateOverallTotal().toFixed(2)}</td>
//                                     </tr>
//                                 </tfoot>
//                             </table>
//                         </div>
//                     </div>
//                     <div className="max-sm:flex hidden mt-12 bg-papayawhip-dark px-5 py-3">
//                         <span colSpan="2" className=" text-right text-lg font-semibold text-gray-800">Overall Total:</span>
//                         <span className=" text-lg font-semibold text-gray-800">${calculateOverallTotal().toFixed(2)}</span>
//                     </div>
//                 </div>
//                 {/* Modal for delete confirmation */}
//                 {showModal && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <h3 className="text-lg font-bold">Confirm Delete</h3>
//                             <p className="mt-2">Are you sure you want to delete this order?</p>
//                             <div className="mt-4 flex justify-end space-x-4">
//                                 <button
//                                     onClick={handleDeleteConfirm}
//                                     className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                                 >
//                                     Confirm
//                                 </button>
//                                 <button
//                                     onClick={handleDeleteCancel}
//                                     className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </main>
//         </Layout>
//     );
// };

// export default MyOrders;

// // 
// // // import React, { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { getOrders, getMenus, deleteOrder } from '../features/daavi/myDaaviSlice';
// // import Layout from '../components/Layout';
// // import chinese from "../assets/images/chinese.jpg";
// // import Cookies from "js-cookie";
// // import { Link } from 'react-router-dom'; 

// // const MyOrders = () => {
// //     const userId = Cookies.get("username");
// //     const dispatch = useDispatch();
// //     const { myOrders, status, menus } = useSelector((store) => store.mydaavi);
// //     const [selectedOrder, setSelectedOrder] = useState(null);
// //     const [showModal, setShowModal] = useState(false);

// //     useEffect(() => {
// //         dispatch(getOrders());
// //         dispatch(getMenus());
// //     }, [dispatch, userId]);

// //     const getMenuDetails = (menuId) => {
// //         return menus.find(menu => menu.id === menuId) || {};
// //     };

// //     const calculateTotal = (items) => {
// //         return items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
// //     };

// //     const calculateOverallTotal = () => {
// //         return myOrders.reduce((total, order) => total + calculateTotal(order.items), 0);
// //     };

// //     const getSummary = () => {
// //         const summary = myOrders.flatMap(order => order.items.map(item => {
// //             const menuDetails = getMenuDetails(item.menu);
// //             return {
// //                 name: menuDetails.name || 'Unknown Item',
// //                 quantity: item.quantity,
// //                 price: parseFloat(item.price)
// //             };
// //         }));
// //         return summary;
// //     };

// //     const handleDeleteClick = (orderId) => {
// //         setSelectedOrder(orderId);
// //         setShowModal(true);
// //     };

// //     const handleDeleteConfirm = () => {
// //         if (selectedOrder) {
// //             dispatch(deleteOrder(selectedOrder));
// //             dispatch(getOrders());
// //         }
// //         setShowModal(false);
// //     };

// //     const handleDeleteCancel = () => {
// //         setSelectedOrder(null);
// //         setShowModal(false);
// //     };

// //     return (
// //         <Layout>
// //             <main className="pt-24 min-h-screen bg-gray-50">
// //                 <div className="container px-4 mx-auto">
// //                     <section className="px-2 mb-12 bg-yellow-900 bg-center bg-cover py-12 rounded-lg shadow-lg" style={{ backgroundImage: `url(${chinese})` }}>
// //                         <div className="text-center">
// //                             <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">Your Orders</h1>
// //                         </div>
// //                     </section>
// //                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
// //                         {status === 'loading' && <p className="text-center text-gray-600">Loading...</p>}
// //                         {status === 'failed' && <p className="text-center text-red-600">Failed to load orders.</p>}
// //                         {myOrders.map((order) => (
// //                             <div key={order.id} className="relative p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-gray-200">
// //                                 <button
// //                                     onClick={() => handleDeleteClick(order.id)}
// //                                     className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
// //                                     title="Delete Order"
// //                                 >
// //                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
// //                                 </button>
// //                                 <h2 className="mb-2 text-lg font-bold text-gray-800">Order #{order.id}</h2>
// //                                 <p className="text-gray-600">Status: <span className={`font-bold ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span></p>
// //                                 <h3 className="mt-4 text-lg font-semibold text-gray-800">Items:</h3>
// //                                 <ul className="space-y-4">
// //                                     {order.items.map((item) => {
// //                                         const menuDetails = getMenuDetails(item.menu);
// //                                         return (
// //                                             <li key={item.id} className="flex items-center space-x-4 border-b border-gray-200 pb-4">
// //                                                 {menuDetails.image_url && <img src={menuDetails.image_url} alt={menuDetails.name} className="w-16 h-16 rounded-lg object-cover" />}
// //                                                 <div className="flex-1">
// //                                                     <p className="text-gray-800 font-medium">{menuDetails.name || 'Unknown Item'}</p>
// //                                                     <p className="text-gray-600">{item.quantity} x ${parseFloat(item.price).toFixed(2)}</p>
// //                                                 </div>
// //                                             </li>
// //                                         );
// //                                     })}
// //                                 </ul>
// //                                 <p className="mt-4 text-lg font-semibold text-gray-800">Total: ${calculateTotal(order.items).toFixed(2)}</p>
// //                             </div>
// //                         ))}
// //                     </div>
// //                     <div className="mt-12 p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-full max-sm:hidden">
// //                         <h2 className="mb-4 text-2xl font-bold text-gray-800">Summary</h2>
// //                         <div className="overflow-x-auto">
// //                             <table className="min-w-full divide-y divide-gray-200">
// //                                 <thead className="bg-gray-50">
// //                                     <tr>
// //                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
// //                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
// //                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
// //                                     </tr>
// //                                 </thead>
// //                                 <tbody className="bg-white divide-y divide-gray-200">
// //                                     {getSummary().map((item, index) => (
// //                                         <tr key={index}>
// //                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
// //                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
// //                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
// //                                         </tr>
// //                                     ))}
// //                                 </tbody>
// //                                 <tfoot>
// //                                     <tr>
// //                                         <td colSpan="2" className="px-6 py-3 text-right text-lg font-semibold text-gray-800">Overall Total:</td>
// //                                         <td className="px-6 py-3 text-lg font-semibold text-gray-800">${calculateOverallTotal().toFixed(2)}</td>
// //                                     </tr>
// //                                 </tfoot>
// //                             </table>
// //                         </div>
// //                     </div>
// //                     <div className="max-sm:flex hidden mt-12 bg-papayawhip-dark px-5 py-3">
// //                         <span colSpan="2" className=" text-right text-lg font-semibold text-gray-800">Overall Total:</span>
// //                         <span className=" text-lg font-semibold text-gray-800">${calculateOverallTotal().toFixed(2)}</span>
// //                     </div>
// //                     <div className="mt-6">
// //                         <Link to="/payment">
// //                             <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
// //                                 Proceed to Payment
// //                             </button>
// //                         </Link>
// //                     </div>
// //                 </div>
// //                 {/* Modal for delete confirmation */}
// //                 {showModal && (
// //                     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
// //                         <div className="bg-white p-6 rounded-lg shadow-lg">
// //                             <h3 className="text-lg font-bold">Confirm Delete</h3>
// //                             <p className="mt-2">Are you sure you want to delete this order?</p>
// //                             <div className="mt-4 flex justify-end space-x-4">
// //                                 <button
// //                                     onClick={handleDeleteConfirm}
// //                                     className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
// //                                 >
// //                                     Confirm
// //                                 </button>
// //                                 <button
// //                                     onClick={handleDeleteCancel}
// //                                     className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
// //                                 >
// //                                     Cancel
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //             </main>
// //         </Layout>
// //     );
// // };

// // export default MyOrders;

// // import React, { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { getOrders, getMenus, deleteOrder } from '../features/daavi/myDaaviSlice';
// // import Layout from '../components/Layout';
// // import chinese from "../assets/images/chinese.jpg";
// // import Cookies from "js-cookie";

// // const MyOrders = () => {
// //     const userId = Cookies.get("username");

// //     const dispatch = useDispatch();
// //     const { myOrders, status, menus } = useSelector((store) => store.mydaavi);
// //     const [selectedOrder, setSelectedOrder] = useState(null);
// //     const [showModal, setShowModal] = useState(false);

// //     useEffect(() => {
// //         dispatch(getOrders());
// //         dispatch(getMenus());
// //     }, [dispatch, userId]);

// //     const getMenuDetails = (menuId) => {
// //         return menus.find(menu => menu.id === menuId) || {};
// //     };

// //     const calculateTotal = (items) => {
// //         return items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
// //     };

// //     const calculateOverallTotal = () => {
// //         return myOrders.reduce((total, order) => total + calculateTotal(order.items), 0);
// //     };

// //     const getSummary = () => {
// //         const summary = myOrders.flatMap(order => order.items.map(item => {
// //             const menuDetails = getMenuDetails(item.menu);
// //             return {
// //                 name: menuDetails.name || 'Unknown Item',
// //                 quantity: item.quantity,
// //                 price: parseFloat(item.price)
// //             };
// //         }));
// //         return summary;
// //     };

// //     const handleDeleteClick = (orderId) => {
// //         setSelectedOrder(orderId);
// //         setShowModal(true);
// //     };

// //     const handleDeleteConfirm = () => {
// //         if (selectedOrder) {
// //             dispatch(deleteOrder(selectedOrder));
// //             dispatch(getOrders());
// //         }
// //         setShowModal(false);
// //     };

// //     const handleDeleteCancel = () => {
// //         setSelectedOrder(null);
// //         setShowModal(false);
// //     };

// //     return (
// //         <Layout>
// //             <main className="pt-24 min-h-screen bg-gray-50">
// //                 <div className="container px-4 mx-auto">
// //                     <section className="px-2 mb-12 bg-yellow-900 bg-center bg-cover py-12 rounded-lg shadow-lg" style={{ backgroundImage: `url(${chinese})` }}>
// //                         <div className="text-center">
// //                             <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">Your Orders</h1>
// //                         </div>
// //                     </section>
// //                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
// //                         {status === 'loading' && <p className="text-center text-gray-600">Loading...</p>}
// //                         {status === 'failed' && <p className="text-center text-red-600">Failed to load orders.</p>}
// //                         {myOrders.map((order) => (
// //                             <div key={order.id} className="relative p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-gray-200">
// //                                 <button
// //                                     onClick={() => handleDeleteClick(order.id)}
// //                                     className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
// //                                     title="Delete Order"
// //                                 >
// //                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
// //                                 </button>
// //                                 <h2 className="mb-2 text-lg font-bold text-gray-800">Order #{order.id}</h2>
// //                                 <p className="text-gray-600">Status: <span className={`font-bold ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span></p>
// //                                 <h3 className="mt-4 text-lg font-semibold text-gray-800">Items:</h3>
// //                                 <ul className="space-y-4">
// //                                     {order.items.map((item) => {
// //                                         const menuDetails = getMenuDetails(item.menu);
// //                                         return (
// //                                             <li key={item.id} className="flex items-center space-x-4 border-b border-gray-200 pb-4">
// //                                                 {menuDetails.image_url && <img src={menuDetails.image_url} alt={menuDetails.name} className="w-16 h-16 rounded-lg object-cover" />}
// //                                                 <div className="flex-1">
// //                                                     <p className="text-gray-800 font-medium">{menuDetails.name || 'Unknown Item'}</p>
// //                                                     <p className="text-gray-600">{item.quantity} x ${parseFloat(item.price).toFixed(2)}</p>
// //                                                 </div>
// //                                             </li>
// //                                         );
// //                                     })}
// //                                 </ul>
// //                                 <p className="mt-4 text-lg font-semibold text-gray-800">Total: ${calculateTotal(order.items).toFixed(2)}</p>
// //                             </div>
// //                         ))}
// //                     </div>
// //                     <div className="mt-12 p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-full max-sm:hidden">
// //                         <h2 className="mb-4 text-2xl font-bold text-gray-800">Summary</h2>
// //                         <div className="overflow-x-auto">
// //                             <table className="min-w-full divide-y divide-gray-200">
// //                                 <thead className="bg-gray-50">
// //                                     <tr>
// //                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
// //                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
// //                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
// //                                     </tr>
// //                                 </thead>
// //                                 <tbody className="bg-white divide-y divide-gray-200">
// //                                     {getSummary().map((item, index) => (
// //                                         <tr key={index}>
// //                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
// //                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
// //                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
// //                                         </tr>
// //                                     ))}
// //                                 </tbody>
// //                                 <tfoot>
// //                                     <tr>
// //                                         <td colSpan="2" className="px-6 py-3 text-right text-lg font-semibold text-gray-800">Overall Total:</td>
// //                                         <td className="px-6 py-3 text-lg font-semibold text-gray-800">${calculateOverallTotal().toFixed(2)}</td>
// //                                     </tr>
// //                                 </tfoot>
// //                             </table>
// //                         </div>
// //                     </div>
// //                     <div className="max-sm:flex hidden mt-12 bg-papayawhip-dark px-5 py-3">
// //                     <span colSpan="2" className=" text-right text-lg font-semibold text-gray-800">Overall Total:</span>
// //                     <span className=" text-lg font-semibold text-gray-800">${calculateOverallTotal().toFixed(2)}</span>
// //                     </div>
// //                 </div>

// //                 {/* Modal */}
// //                 {showModal && (
// //                     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
// //                         <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
// //                             <h3 className="text-lg font-semibold text-gray-800">Confirm Delete</h3>
// //                             <p className="mt-2 text-gray-600">Are you sure you want to delete this order? This action cannot be undone.</p>
// //                             <div className="mt-4 flex justify-end space-x-4">
// //                                 <button
// //                                     onClick={handleDeleteConfirm}
// //                                     className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
// //                                 >
// //                                     Confirm
// //                                 </button>
// //                                 <button
// //                                     onClick={handleDeleteCancel}
// //                                     className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
// //                                 >
// //                                     Cancel
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //             </main>
// //         </Layout>
// //     );
// // };

// // export default MyOrders;





// // import React, { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { getOrders, getMenus } from '../features/daavi/myDaaviSlice';
// // import Layout from '../components/Layout';
// // import chinese from "../assets/images/chinese.jpg";

// // const MyOrders = () => {
// //     const dispatch = useDispatch();
// //     const { myOrders, status, menus } = useSelector((store) => store.mydaavi);

// //     useEffect(() => {
// //         dispatch(getOrders());
// //         dispatch(getMenus());
// //     }, [dispatch]);

// //     const getMenuDetails = (menuId) => {
// //         return menus.find(menu => menu.id === menuId) || {};
// //     };

// //     const calculateTotal = (items) => {
// //         return items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
// //     };

// //     const calculateOverallTotal = () => {
// //         return myOrders.reduce((total, order) => total + calculateTotal(order.items), 0);
// //     };

// //     const getSummary = () => {
// //         const summary = myOrders.flatMap(order => order.items.map(item => {
// //             const menuDetails = getMenuDetails(item.menu);
// //             return {
// //                 name: menuDetails.name || 'Unknown Item',
// //                 quantity: item.quantity,
// //                 price: parseFloat(item.price)
// //             };
// //         }));
// //         return summary;
// //     };

// //     return (
// //         <Layout>
// //             <main className="pt-24 min-h-screen bg-gray-50">
// //                 <div className="container px-4 mx-auto">
// //                     <section className="px-2 mb-12 bg-yellow-900 bg-center bg-cover py-12" style={{ backgroundImage: `url(${chinese})` }}>
// //                         <div className="text-center">
// //                             <h1 className="mb-4 text-2xl font-bold text-white md:text-5xl">Your Orders</h1>
// //                         </div>
// //                     </section>
// //                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
// //                         {status === 'loading' && <p className="text-center text-gray-600">Loading...</p>}
// //                         {status === 'failed' && <p className="text-center text-red-600">Failed to load orders.</p>}
// //                         {myOrders.map((order) => (
// //                             <div key={order.id} className="p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
// //                                 <h2 className="mb-2 text-2xl font-bold text-gray-800">Order #{order.id}</h2>
// //                                 <p className="text-gray-600">Status: <span className={`font-bold ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span></p>
// //                                 <h3 className="mt-4 text-lg font-bold text-gray-800">Items:</h3>
// //                                 <ul className="space-y-4">
// //                                     {order.items.map((item) => {
// //                                         const menuDetails = getMenuDetails(item.menu);
// //                                         return (
// //                                             <li key={item.id} className="flex items-center space-x-4">
// //                                                 {menuDetails.image_url && <img src={menuDetails.image_url} alt={menuDetails.name} className="w-16 h-16 rounded-lg object-cover" />}
// //                                                 <div>
// //                                                     <p className="text-gray-800">{menuDetails.name || 'Unknown Item'}</p>
// //                                                     <p className="text-gray-600">{item.quantity} x ${parseFloat(item.price).toFixed(2)}</p>
// //                                                 </div>
// //                                             </li>
// //                                         );
// //                                     })}
// //                                 </ul>
// //                                 <p className="mt-4 text-lg font-bold text-gray-800">Total: ${calculateTotal(order.items).toFixed(2)}</p>
// //                             </div>
// //                         ))}
// //                     </div>
// //                     <div className="mt-12 p-6 bg-white rounded-lg shadow-lg">
// //                         <h2 className="mb-4 text-2xl font-bold text-gray-800">Summary</h2>
// //                         <div className="overflow-x-auto">
// //                             <table className="min-w-full divide-y divide-gray-200">
// //                                 <thead className="bg-gray-50">
// //                                     <tr>
// //                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
// //                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
// //                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
// //                                     </tr>
// //                                 </thead>
// //                                 <tbody className="bg-white divide-y divide-gray-200">
// //                                     {getSummary().map((item, index) => (
// //                                         <tr key={index}>
// //                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
// //                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
// //                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.price.toFixed(2)}</td>
// //                                         </tr>
// //                                     ))}
// //                                 </tbody>
// //                                 <tfoot>
// //                                     <tr>
// //                                         <td colSpan="2" className="px-6 py-3 text-right text-lg font-bold text-gray-800">Overall Total:</td>
// //                                         <td className="px-6 py-3 text-lg font-bold text-gray-800">${calculateOverallTotal().toFixed(2)}</td>
// //                                     </tr>
// //                                 </tfoot>
// //                             </table>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </main>
// //         </Layout>
// //     );
// // };

// // export default MyOrders;




