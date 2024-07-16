// src/components/Header.js

import '../assets/styles/Header.css';

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
// import logo from '../assets/logo.png'; // daavi a logo file

const Header = () => {
  const [nav, setNav] = useState(false);

  const handleClick = () => setNav(!nav);

  return (
    <nav className="fixed z-10 w-full bg-white shadow-lg ">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center">
          {/* <img src={logo} alt="Daavi Special" className="h-12" /> */}
          <Link to="/" className="ml-4 text-4xl font-bold text-transparent max-md:text-2xl bg-gradient-to-r from-red-500 to-yellow-500 to-green-500 to-blue-500 to-purple-500 bg-clip-text">DAAVI SPECIAL</Link>
        </div>
        <div className="items-center hidden space-x-4 md:flex">
          <NavLink to="/" className="text-gray-800 hover:text-red-600" style={({ isActive }) => ({ color: isActive ? "#FF5733" : "" })}>Home</NavLink>
          <NavLink to="/menu" className="text-gray-800 hover:text-red-600" style={({ isActive }) => ({ color: isActive ? "#FF5733" : "" })}>Menu</NavLink>
          <NavLink to="/about" className="text-gray-800 hover:text-red-600" style={({ isActive }) => ({ color: isActive ? "#FF5733" : "" })}>About</NavLink>
          <NavLink to="/contact" className="text-gray-800 hover:text-red-600" style={({ isActive }) => ({ color: isActive ? "#FF5733" : "" })}>Contact</NavLink>
          <NavLink to="/order" className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700" style={({ isActive }) => ({ color: isActive ? "#FF5733" : "" })}>Order Now</NavLink>
        </div>
        <div className="md:hidden" onClick={handleClick}>
          {!nav ? <MenuIcon className="w-8 h-8 text-gray-800" /> : <XIcon className="w-8 h-8 text-gray-800" />}
        </div>
      </div>
      <div className={`md:hidden ${nav ? 'block' : 'hidden'} max-md:mb-7`}>
        <NavLink to="/" className="block px-4 py-2 text-gray-800 hover:text-red-600" style={({ isActive }) => ({ color: isActive ? "#FF5733" : "" })}>Home</NavLink>
        <NavLink to="/menu" className="block px-4 py-2 text-gray-800 hover:text-red-600" style={({ isActive }) => ({ color: isActive ? "#FF5733" : "" })}>Menu</NavLink>
        <NavLink to="/about" className="block px-4 py-2 text-gray-800 hover:text-red-600" style={({ isActive }) => ({ color: isActive ? "#FF5733" : "" })}>About</NavLink>
        <NavLink to="/contact" className="block px-4 py-2 text-gray-800 hover:text-red-600" style={({ isActive }) => ({ color: isActive ? "#FF5733" : "" })}>Contact</NavLink>
        <NavLink to="/order" className="w-full px-4 py-2 mt-2 ml-4 text-white bg-red-600 rounded hover:bg-red-700">Order Now</NavLink>
      </div>
    </nav>
  );
}

export default Header;



