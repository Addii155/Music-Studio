// src/components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto bg-gray-800 text-center">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="text-gray-400 hover:text-white mx-4">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white mx-4">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
