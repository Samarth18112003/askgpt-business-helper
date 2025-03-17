
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 mt-16 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-500">
            © {currentYear} Business AI Advisor. All rights reserved.
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Powered by advanced AI technology
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
