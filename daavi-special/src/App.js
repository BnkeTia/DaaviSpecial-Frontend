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
                <Header />
                <main>
                    <Routes>
                        <Route path="/" exact component={Home} />
                        <Route path="/about" component={<About />} />
                        <Route path="/menu" component={Menu} />
                        <Route path="/order" component={Order} />
                        <Route path="/contact" component={Contact} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
