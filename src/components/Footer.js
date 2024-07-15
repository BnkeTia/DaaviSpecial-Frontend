// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="containe mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
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
        <div className="flex justify-center space-x-6 mt-4">
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
        <div className="text-center text-gray-400 mt-4">
          &copy; {new Date().getFullYear()} DAAVI SPECIAL. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;


// // src/components/Footer.js
// import React from 'react';
// import '../assets/styles/Footer.css';

// const Footer = () => {
//     return (
//         <footer className="footer">
//             <p>&copy; BnKeTia 2024 DAAVI SPECIAL. All rights reserved.</p>
//         </footer>
//     );
// };

// export default Footer;
