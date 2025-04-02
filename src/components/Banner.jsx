import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Banner = ({ title, subtitle }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const bannerRef = React.useRef(null);

  useEffect(() => {
    if (!bannerRef.current) return;
    
    const updateDimensions = () => {
      if (bannerRef.current) {
        const { width, height } = bannerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    const handleMouseMove = (e) => {
      const { left, top } = bannerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - left,
        y: e.clientY - top
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    bannerRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (bannerRef.current) {
        bannerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <motion.div 
      ref={bannerRef}
      className="relative w-full bg-white dark:bg-[#1a1a1a] py-16 md:py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl"
          style={{
            left: `${mousePosition.x - 400}px`,
            top: `${mousePosition.y - 400}px`,
            width: '800px',
            height: '800px',
            opacity: 0.6,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s ease'
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default Banner; 