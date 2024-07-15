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
    <nav className="bg-white shadow-lg fixed w-full z-10">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          {/* <img src={logo} alt="Daavi Special" className="h-12" /> */}
          <Link to="/" className="text-2xl font-bold text-gray-800 ml-4">DAAVI SPECIAL</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-gray-800 hover:text-red-600">Home</Link>
          <Link to="/menu" className="text-gray-800 hover:text-red-600">Menu</Link>
          <Link to="/about" className="text-gray-800 hover:text-red-600">About</Link>
          <Link to="/contact" className="text-gray-800 hover:text-red-600">Contact</Link>
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Order Now</button>
        </div>
        <div className="md:hidden" onClick={handleClick}>
          {!nav ? <MenuIcon className="h-8 w-8 text-gray-800" /> : <XIcon className="h-8 w-8 text-gray-800" />}
        </div>
      </div>
      <div className={`md:hidden ${nav ? 'block' : 'hidden'}`}>
        <Link to="/" className="block px-4 py-2 text-gray-800 hover:text-red-600">Home</Link>
        <Link to="/menu" className="block px-4 py-2 text-gray-800 hover:text-red-600">Menu</Link>
        <Link to="/about" className="block px-4 py-2 text-gray-800 hover:text-red-600">About</Link>
        <Link to="/contact" className="block px-4 py-2 text-gray-800 hover:text-red-600">Contact</Link>
        <button className="w-full bg-red-600 text-white px-4 py-2 mt-2 rounded hover:bg-red-700">Order Now</button>
      </div>
    </nav>
  );
}

export default Header;



// const Header = () => {
//     return (
//         <header>
//             <nav>
//                 <ul>
//                     <li><Link to="/">Home</Link></li>
//                     <li><Link to="/about">About</Link></li>
//                     <li><Link to="/menu">Menu</Link></li>
//                     <li><Link to="/order">Order</Link></li>
//                     <li><Link to="/contact">Contact</Link></li>
//                 </ul>
//             </nav>
//         </header>
//     );
// };

// export default Header;
