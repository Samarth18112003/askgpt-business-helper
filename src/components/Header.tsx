
import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div 
              className="inline-block mb-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium tracking-wider"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              BUSINESS AI ADVISOR
            </motion.div>
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Grow Your Business With AI
            </motion.h1>
            <motion.p 
              className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Get personalized technical advice, growth strategies, and tool recommendations 
              tailored specifically for your business.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
