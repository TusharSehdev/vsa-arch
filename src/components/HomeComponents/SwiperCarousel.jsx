import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion, AnimatePresence } from "framer-motion";

const slidesData = [
  {
    imageSrc:
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/Urban+Design-Masterplanning/Victoria+Garden/master+plan/final+view+2+COLONY.webp",
    title: "Victoria Garden",
    subtitle: "Urban Design",
    description:
      "A comprehensive master-planned community featuring modern residential spaces integrated with natural surroundings.",
  },
  // {
  //   imageSrc:
  //     "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/Urban+Design-Masterplanning/Victoria+Garden/render01+ps.webp",
  //   title: "Ameek's Paradise",
  //   subtitle: "Urban Design",
  //   description:
  //     "An innovative urban development that combines contemporary architecture with sustainable design principles.",
  // },
  {
    imageSrc:
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/Commercial/BAR/BAR01+ps01.webp",
    title: "The Gym Khanna Club",
    subtitle: "Commercial Design",
    description:
      "A sophisticated lounge space designed for relaxation and social interaction with premium materials and ambient lighting.",
  },
  {
    imageSrc:
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/Office+interiors/305.webp",
    title: "Office Waiting Lounge",
    subtitle: "Interior Design",
    description:
      "A professional yet welcoming reception area that balances functionality with aesthetic appeal for business environments.",
  },
  {
    imageSrc:
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/residential/UE-II/2.webp",
    title: "Modern Residence",
    subtitle: "Residential Design",
    description:
      "A contemporary home that maximizes space and light while offering elegant living spaces for modern lifestyles.",
  },
  {
    imageSrc:
      "https://vsa-architect.s3.ap-south-1.amazonaws.com/Website+3D/residential/Bali+Travels/grayyyy.webp",
    title: "Fluidic Bedroom Interior",
    subtitle: "Interior Design",
    description:
      "A serene bedroom sanctuary that combines flowing design elements with comfortable, luxurious materials.",
  },
];

function SwiperCarousel() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Navigate to specific slide
  const goToSlide = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index + 1); // +1 because of loop mode
    }
  };

  // Nav button variants
  const buttonVariants = {
    hidden: { opacity: 0.3, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: {
      opacity: 1,
      scale: 1.05,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  };

  // Track index changes
  const handleSlideChange = (swiper) => {
    // Account for looped slides
    let realIndex = swiper.realIndex;
    setActiveIndex(realIndex);
  };

  return (
    <div
      className="relative overflow-hidden group h-screen w-full"
      style={{ marginBottom: "-1px", height: "100vh", maxHeight: "100vh" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Swiper
        ref={swiperRef}
        spaceBetween={0}
        centeredSlides={true}
        effect={"fade"}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        loop={true}
        pagination={{
          clickable: true,
          type: "bullets",
          el: ".custom-pagination",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        modules={[Autoplay, EffectFade, Pagination]}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full">
            <div className="absolute inset-0 bg-black/20"></div>
            <img
              src={slide.imageSrc}
              alt={`${slide.title}`}
              className="w-full h-full object-cover object-center transition-transform duration-10000 transform scale-100 group-hover:scale-105"
            />

            <motion.div
              className="absolute inset-0 flex flex-col justify-end pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="container mx-auto px-6 lg:px-10 mb-20 md:mb-28 lg:mb-32">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl"
                  >
                    <div className="overflow-hidden">
                      <motion.span
                        className="inline-block text-sm md:text-base uppercase tracking-wider bg-primary/80 backdrop-blur-sm text-white py-1 px-3 rounded mb-2"
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {slidesData[activeIndex].subtitle}
                      </motion.span>
                    </div>

                    <div className="overflow-hidden">
                      <motion.h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3"
                        initial={{ y: 40 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {slidesData[activeIndex].title}
                      </motion.h2>
                    </div>

                    <div className="overflow-hidden">
                      <motion.p
                        className="text-sm md:text-base lg:text-lg text-white/90 max-w-xl"
                        initial={{ y: 40 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {slidesData[activeIndex].description}
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-between px-4 md:px-10">
        <motion.button
          className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm text-white border border-white/20 transition-all z-10"
          onClick={() => swiperRef.current.swiper.slidePrev()}
          variants={buttonVariants}
          initial="hidden"
          animate={isHovering ? "visible" : "hidden"}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>

        <motion.button
          className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm text-white border border-white/20 transition-all z-10"
          onClick={() => swiperRef.current.swiper.slideNext()}
          variants={buttonVariants}
          initial="hidden"
          animate={isHovering ? "visible" : "hidden"}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>

      {/* Custom Pagination */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-2">
            {slidesData.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  activeIndex === index ? "bg-primary w-8" : "bg-white/50"
                }`}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0.7, scale: 0.9 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0.7,
                  scale: activeIndex === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.2 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwiperCarousel;
