import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Modal = ({ isOpen, onClose, images, startIndex }) => {
  const [swiper, setSwiper] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading state when modal opens or images change
    if (isOpen) {
      setIsLoading(true);
      setCurrentIndex(startIndex);
    }
  }, [isOpen, startIndex, images]);

  if (!isOpen || !images.length) return null;

  const handleSlideChange = (swiperInstance) => {
    setCurrentIndex(swiperInstance.activeIndex);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Close button */}
        <motion.button
          className="absolute top-5 right-5 z-50 bg-black/50 backdrop-blur-sm rounded-full p-2.5 text-white hover:bg-white hover:text-black transition-all duration-300"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <IoMdClose size={24} />
        </motion.button>
        
        {/* Navigation controls */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-40">
          <motion.button 
            className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center pointer-events-auto"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => swiper?.slidePrev()}
          >
            <IoIosArrowBack size={28} />
          </motion.button>
          
          <motion.button 
            className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center pointer-events-auto"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => swiper?.slideNext()}
          >
            <IoIosArrowForward size={28} />
          </motion.button>
        </div>
        
        {/* Counter indicator */}
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5 text-white text-sm z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {currentIndex + 1} / {images.length}
        </motion.div>

        {/* Swiper container */}
        <div className="relative w-full h-full max-w-7xl max-h-[90vh] px-4 md:px-12">
          <Swiper
            onSwiper={setSwiper}
            initialSlide={startIndex}
            spaceBetween={0}
            slidesPerView={1}
            navigation={false}
            pagination={false}
            modules={[Navigation, Pagination, A11y, Keyboard]}
            keyboard={{ enabled: true }}
            className="w-full h-full"
            onSlideChange={handleSlideChange}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center p-4">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    </div>
                  )}
                  <motion.img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="max-w-full max-h-full object-contain rounded shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.9 : 1 }}
                    transition={{ duration: 0.3 }}
                    onLoad={() => index === currentIndex && setIsLoading(false)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
