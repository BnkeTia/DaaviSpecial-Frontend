// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home.js';
import About from './pages/About';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Contact from './pages/Contact';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" exact component={Home} />
                        <Route path="/about" component={About} />
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
