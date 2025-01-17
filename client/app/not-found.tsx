"use client"
import React from 'react';
import { FiHome } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-100 text-center">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="mb-6"
      >
        <motion.h1 
          className="text-6xl font-extrabold text-secondary"
          initial={{ y: -50 }} 
          animate={{ y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          404
        </motion.h1>
        <motion.p 
          className="text-2xl font-semibold text-gray-800 mt-2"
          initial={{ y: 50 }} 
          animate={{ y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          Page Under Construction
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="mb-8"
      >
      </motion.div>

      <motion.p 
        className="text-lg text-gray-600 mb-4"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        We are working hard to bring this page live. Please check back later!
      </motion.p>

      <motion.a 
        href="/" 
        className="text-white bg-secondary hover:bg-primary py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiHome className="mr-2" />
        Back to Home
      </motion.a>
    </div>
  );
};

export default NotFoundPage;
