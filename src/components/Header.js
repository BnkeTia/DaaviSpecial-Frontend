// src/components/Header.jsx
import '../assets/styles/Header.css';
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/redux-users/myUserSlice';

const Header = () => {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.myuser);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleClick = () => setNav(!nav);

  return (
    <nav className="fixed z-10 w-full bg-white shadow-lg">
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
          {isAuthenticated ? (
            <>
              <span className="text-gray-800">Hello, {user.username}</span>
              <button onClick={handleLogout} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Login</NavLink>
              <NavLink to="/register" className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">Register</NavLink>
            </>
          )}
        </div>
        <div className="md:hidden" onClick={handleClick}>
          {!nav ? <MenuIcon className="w-8 h-8 text-gray-800" /> : <XIcon className="w-8 h-8 text-gray-800" />}
        </div>
      </div>
      <div className={`md:hidden ${nav ? 'block' : 'hidden'} max-md:mb-7 max-md:mr-[15px]`}>
        <NavLink to="/" className="block px-4 py-2 text-gray-800 hover:text-red-600" style={({ isActive }) => ({ color: isActive ? "#FF5733" : "" })}>Home</NavLink>
        <NavLink to="/menu" className="block px-4 py-2 text-gray-800 hover:text-red-600" style={({ isActive }) => ({ color: isActive ? "#FF5733" : "" })}>Menu</NavLink>
        <NavLink to="/about" className="block px-4 py-2 text-gray-800 hover:text-red-600" style={({ isActive }) => ({ color: isActive ? "#FF5733" : "" })}>About</NavLink>
        <NavLink to="/contact" className="block px-4 py-2 text-gray-800 hover:text-red-600" style={({ isActive }) => ({ color: isActive ? "#FF5733" : "" })}>Contact</NavLink>
        <NavLink to="/order" className="block px-4 py-2 mx-2 mt-2 text-center text-white bg-red-600 rounded w-full hover:bg-red-700">Order Now</NavLink>
        {isAuthenticated ? (
          <>
            <span className="block px-4 py-2 text-gray-800">Hello, {user.username}</span>
            <button onClick={handleLogout} className="block w-full px-4 py-2 mt-2 text-center text-white bg-blue-600 rounded hover:bg-blue-700">Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="block px-4 py-2 mx-2 mt-2 text-center text-white bg-blue-600 rounded w-full hover:bg-blue-700">Logins</NavLink>
            <NavLink to="/register" className="block px-4 py-2 mx-2 mt-2 text-center text-white bg-green-600 rounded w-full hover:bg-green-700">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
