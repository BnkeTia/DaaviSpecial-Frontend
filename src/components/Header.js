// src/components/Header.js

import '../assets/styles/Header.css';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
// import logo from '../assets/logo.png'; // daavi a logo file

const Header = () => {
  const [nav, setNav] = useState(false);

  const handleClick = () => setNav(!nav);

  return (
    <nav className="fixed z-10 w-full bg-white shadow-lg">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center">
          {/* <img src={logo} alt="Daavi Special" className="h-12" /> */}
          <Link to="/" className="ml-4 text-2xl font-bold text-gray-800">DAAVI SPECIAL</Link>
        </div>
        <div className="items-center hidden space-x-4 md:flex">
          <Link to="/" className="text-gray-800 hover:text-red-600">Home</Link>
          <Link to="/menu" className="text-gray-800 hover:text-red-600">Menu</Link>
          <Link to="/about" className="text-gray-800 hover:text-red-600">About</Link>
          <Link to="/contact" className="text-gray-800 hover:text-red-600">Contact</Link>
          <Link to="/order" className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">Order Now</Link>
        </div>
        <div className="md:hidden" onClick={handleClick}>
          {!nav ? <MenuIcon className="w-8 h-8 text-gray-800" /> : <XIcon className="w-8 h-8 text-gray-800" />}
        </div>
      </div>
      <div className={`md:hidden ${nav ? 'block' : 'hidden'}`}>
        <Link to="/" className="block px-4 py-2 text-gray-800 hover:text-red-600">Home</Link>
        <Link to="/menu" className="block px-4 py-2 text-gray-800 hover:text-red-600">Menu</Link>
        <Link to="/about" className="block px-4 py-2 text-gray-800 hover:text-red-600">About</Link>
        <Link to="/contact" className="block px-4 py-2 text-gray-800 hover:text-red-600">Contact</Link>
        <button className="w-full px-4 py-2 mt-2 text-white bg-red-600 rounded hover:bg-red-700">Order Now</button>
      </div>
    </nav>
  );
}

export default Header;



