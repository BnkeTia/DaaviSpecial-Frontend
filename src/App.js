// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/styles/index.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Menu from './pages/Menu.js';
import Order from './pages/Order.js';
import Contact from './pages/Contact.js';

function App() {
    return (
        <Router>
            <div>
                {/* <Header /> */}
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
                {/* <Footer /> */}
            </div>
        </Router>
    );
}

export default App;
