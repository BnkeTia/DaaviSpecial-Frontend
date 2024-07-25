// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/styles/index.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Menu from './pages/Menu.js';
import Order from './pages/Order.js';
import Contact from './pages/Contact.js';
import CategoryItems from './features/daavi/components/CategoryItems.js';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from './features/daavi/myDaaviSlice.jsx';
import Register from './features/redux-users/components/Register.js';
import Login from './features/redux-users/components/Login.js';
import MyOrders from './pages/MyOrders.jsx';
import Payment from './pages/Payment.js';

function App() {

    // const dispatch = useDispatch();
    // const { categories } = useSelector((store) => store.mydaavi);

    // useEffect(() => {
    //     // if (categories.length === 0) {
    //         dispatch(getCategories());
    //     // }
    // }, [dispatch]);

    // console.log('from homePage ', categories)
    return (
        <Router>
           
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/my-order" element={<MyOrders />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/category/:slug" element={<CategoryItems/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/payment" element={<Payment/>} />
                    </Routes>
            
        </Router>
    );
}

export default App;
