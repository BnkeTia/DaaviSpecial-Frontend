// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-6 text-white bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">DAAVI SPECIAL</h1>
            <p className="text-gray-400">Best place to satisfy your cravings</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
            <Link to="/menu" className="text-gray-400 hover:text-white">Menu</Link>
            <Link to="/about" className="text-gray-400 hover:text-white">About</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaInstagram size={24} />
          </a>
        </div>
        <div className="mt-4 text-center text-gray-400">
          &copy; {new Date().getFullYear()} DAAVI SPECIAL. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
