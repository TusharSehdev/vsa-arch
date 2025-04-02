import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, images, startIndex }) => {
  const [swiper, setSwiper] = useState(null);

  if (!isOpen || !images.length) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative max-w-full max-h-full p-4 flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white bg-gray-700/90 rounded-full p-2 text-2xl z-50"
        >
          <IoMdClose />
        </button>
        <Swiper
          onSwiper={setSwiper}
          initialSlide={startIndex}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, A11y]}
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <div className="flex items-center justify-center w-full h-full">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="object-contain max-w-full max-h-full"
                  style={{ objectFit: "contain", backgroundColor: "#1a1a1a" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Modal;
